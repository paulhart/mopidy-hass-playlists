import { LitElement, html, css, PropertyValues } from 'lit';
import { customElement, property, state, query } from 'lit/decorators.js';
import { sharedStyles } from './styles/shared-styles';
import { MopidyService } from './services/mopidy-service';
import type { HomeAssistant } from './types/home-assistant';
import type { Playlist, PlaylistDetail, Track, QueueItem } from './models/playlist';
import './components/playlist-list';
import './components/playlist-detail';
import './components/track-item';
import './components/track-search';
import './components/confirm-dialog';
import './components/create-playlist-dialog';

/**
 * Card configuration interface
 */
export interface PlaylistCardConfig {
  type: string;
  entity: string;
  title?: string;
  show_queue_button?: boolean;
  theme?: string;
}

type View = 'list' | 'detail' | 'search';

interface ConfirmDialogElement extends HTMLElement {
  show: () => Promise<boolean>;
  title: string;
  message: string;
  destructive: boolean;
  confirmText: string;
}

interface CreateDialogElement extends HTMLElement {
  show: () => Promise<{ name: string; source: 'empty' | 'queue' } | null>;
}

/**
 * Main Mopidy Playlist Card component
 */
@customElement('mopidy-playlist-card')
export class MopidyPlaylistCard extends LitElement {
  static styles = [sharedStyles, css`
    :host {
      display: block;
    }

    .header-actions {
      display: flex;
      gap: 8px;
    }

    .header-button {
      background: none;
      border: none;
      cursor: pointer;
      padding: 8px;
      color: var(--primary-text-color);
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: background-color 0.2s;
    }

    .header-button:hover {
      background-color: var(--secondary-background-color);
    }

    .header-button ha-icon {
      --mdc-icon-size: 24px;
    }

    .search-dialog {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background-color: var(--card-background-color, #fff);
      z-index: 100;
      display: flex;
      flex-direction: column;
    }

    .search-header {
      display: flex;
      align-items: center;
      padding: 8px 16px;
      border-bottom: 1px solid var(--divider-color, #e0e0e0);
      background-color: var(--app-header-background-color, var(--primary-background-color));
    }

    .search-header h2 {
      flex: 1;
      margin: 0;
      font-size: 1.1em;
    }

    .search-content {
      flex: 1;
      overflow-y: auto;
    }

    .toast {
      position: fixed;
      bottom: 16px;
      left: 50%;
      transform: translateX(-50%);
      background-color: var(--primary-color);
      color: var(--text-primary-color);
      padding: 12px 24px;
      border-radius: 4px;
      z-index: 1000;
      animation: slideUp 0.3s ease;
    }

    @keyframes slideUp {
      from {
        opacity: 0;
        transform: translateX(-50%) translateY(20px);
      }
      to {
        opacity: 1;
        transform: translateX(-50%) translateY(0);
      }
    }
  `];

  @property({ attribute: false }) hass!: HomeAssistant;
  @property({ type: Object }) config!: PlaylistCardConfig;

  @state() private _view: View = 'list';
  @state() private _loading = false;
  @state() private _saving = false;
  @state() private _playlists: Playlist[] = [];
  @state() private _selectedPlaylist: PlaylistDetail | null = null;
  @state() private _queue: QueueItem[] = [];
  @state() private _toast: string | null = null;

  @query('mopidy-confirm-dialog') private _confirmDialog!: ConfirmDialogElement;
  @query('mopidy-create-playlist-dialog') private _createDialog!: CreateDialogElement;

  private _service?: MopidyService;
  private _toastTimeout?: number;

  protected updated(changedProperties: PropertyValues) {
    super.updated(changedProperties);
    
    if (changedProperties.has('hass') && this.hass && this.config) {
      this._service = new MopidyService(this.hass, this.config.entity);
      if (this._view === 'list' && this._playlists.length === 0) {
        this._loadPlaylists();
      }
      this._loadQueue();
    }
  }

  private async _loadPlaylists() {
    if (!this._service) return;
    
    this._loading = true;
    try {
      this._playlists = await this._service.getPlaylists();
    } catch (error) {
      console.error('Error loading playlists:', error);
      this._showToast('Failed to load playlists');
    } finally {
      this._loading = false;
    }
  }

  private async _loadQueue() {
    if (!this._service) return;
    
    try {
      this._queue = await this._service.getQueue();
    } catch (error) {
      console.error('Error loading queue:', error);
    }
  }

  private async _loadPlaylistDetail(uri: string) {
    if (!this._service) return;
    
    this._loading = true;
    try {
      this._selectedPlaylist = await this._service.getPlaylist(uri);
      this._view = 'detail';
    } catch (error) {
      console.error('Error loading playlist:', error);
      this._showToast('Failed to load playlist');
    } finally {
      this._loading = false;
    }
  }

  private _showToast(message: string) {
    this._toast = message;
    if (this._toastTimeout) {
      clearTimeout(this._toastTimeout);
    }
    this._toastTimeout = window.setTimeout(() => {
      this._toast = null;
    }, 3000);
  }

  // Event handlers

  private async _onCreatePlaylist() {
    if (!this._createDialog) return;
    
    const result = await this._createDialog.show();
    if (!result) return;

    this._saving = true;
    try {
      if (result.source === 'queue') {
        await this._service?.saveQueueToPlaylist(result.name);
      } else {
        await this._service?.createPlaylist(result.name);
      }
      this._showToast(`Playlist "${result.name}" created`);
      await this._loadPlaylists();
    } catch (error) {
      console.error('Error creating playlist:', error);
      this._showToast('Failed to create playlist');
    } finally {
      this._saving = false;
    }
  }

  private async _onDeletePlaylist(e: CustomEvent) {
    const { playlist } = e.detail;
    
    if (!this._confirmDialog) return;
    
    this._confirmDialog.title = 'Delete Playlist';
    this._confirmDialog.message = `Are you sure you want to delete "${playlist.name}"? This cannot be undone.`;
    this._confirmDialog.destructive = true;
    this._confirmDialog.confirmText = 'Delete';
    
    const confirmed = await this._confirmDialog.show();
    if (!confirmed) return;

    try {
      await this._service?.deletePlaylist(playlist.uri);
      this._showToast(`Playlist "${playlist.name}" deleted`);
      
      if (this._view === 'detail' && this._selectedPlaylist?.uri === playlist.uri) {
        this._view = 'list';
        this._selectedPlaylist = null;
      }
      
      await this._loadPlaylists();
    } catch (error) {
      console.error('Error deleting playlist:', error);
      this._showToast('Failed to delete playlist');
    }
  }

  private _onSelectPlaylist(e: CustomEvent) {
    const { playlist } = e.detail;
    this._loadPlaylistDetail(playlist.uri);
  }

  private _onBackToList() {
    this._view = 'list';
    this._selectedPlaylist = null;
  }

  private async _onPlayPlaylist(e: CustomEvent) {
    const { playlist } = e.detail;
    try {
      await this._service?.playPlaylist(playlist.uri);
      this._showToast(`Playing "${playlist.name}"`);
    } catch (error) {
      console.error('Error playing playlist:', error);
      this._showToast('Failed to play playlist');
    }
  }

  private async _onPlayTrack(e: CustomEvent) {
    const { track } = e.detail;
    try {
      await this._service?.playTrack(track.uri);
      this._showToast(`Playing "${track.name}"`);
    } catch (error) {
      console.error('Error playing track:', error);
      this._showToast('Failed to play track');
    }
  }

  private async _onRemoveTrack(e: CustomEvent) {
    const { index, tracks } = e.detail;
    if (!this._selectedPlaylist) return;

    this._saving = true;
    try {
      await this._service?.removeFromPlaylist(this._selectedPlaylist.uri, [index]);
      this._selectedPlaylist = {
        ...this._selectedPlaylist,
        tracks,
      };
      this._showToast('Track removed');
    } catch (error) {
      console.error('Error removing track:', error);
      this._showToast('Failed to remove track');
    } finally {
      this._saving = false;
    }
  }

  private async _onSaveChanges(e: CustomEvent) {
    const { playlist, tracks } = e.detail;
    if (!playlist) return;

    this._saving = true;
    try {
      // Clear and rebuild playlist with new order
      await this._service?.clearPlaylist(playlist.uri);
      
      if (tracks.length > 0) {
        const trackUris = tracks.map((t: Track) => t.uri);
        await this._service?.addToPlaylist(playlist.uri, trackUris);
      }
      
      this._selectedPlaylist = {
        ...playlist,
        tracks,
      };
      
      this._showToast('Playlist saved');
    } catch (error) {
      console.error('Error saving playlist:', error);
      this._showToast('Failed to save playlist');
    } finally {
      this._saving = false;
    }
  }

  private _onAddTracks(_e: CustomEvent) {
    this._view = 'search';
  }

  private async _onAddTrack(e: CustomEvent) {
    const { track } = e.detail;
    if (!this._selectedPlaylist) return;

    try {
      await this._service?.addToPlaylist(this._selectedPlaylist.uri, [track.uri]);
      this._showToast(`Added "${track.name}"`);
      // Reload playlist
      await this._loadPlaylistDetail(this._selectedPlaylist.uri);
    } catch (error) {
      console.error('Error adding track:', error);
      this._showToast('Failed to add track');
    }
  }

  private async _onSearch(e: CustomEvent) {
    const { query } = e.detail;
    // For now, we'll use the media browser to search
    // This would need to be implemented based on how Mopidy exposes search
    console.log('Search query:', query);
    // TODO: Implement search through media browser
  }

  private _onCloseSearch() {
    this._view = 'detail';
  }

  setConfig(config: PlaylistCardConfig) {
    if (!config.entity) {
      throw new Error('Entity is required');
    }
    this.config = config;
  }

  getCardSize() {
    return 5;
  }

  render() {
    if (!this.config) {
      return html`<ha-card><div class="error">Configuration error</div></ha-card>`;
    }

    const title = this.config.title || 'Playlist Manager';

    return html`
      <ha-card>
        ${this._view === 'list' ? html`
          <div class="card-header">
            <h1>${title}</h1>
            <div class="header-actions">
              <button class="header-button" @click=${this._onCreatePlaylist} title="Create new playlist">
                <ha-icon icon="mdi:plus"></ha-icon>
              </button>
            </div>
          </div>
          <mopidy-playlist-list
            .playlists=${this._playlists}
            .loading=${this._loading}
            @select-playlist=${this._onSelectPlaylist}
            @delete-playlist=${this._onDeletePlaylist}
            @play-playlist=${this._onPlayPlaylist}
          ></mopidy-playlist-list>
          ${this.config.show_queue_button !== false && this._queue.length > 0 ? html`
            <div class="card-actions">
              <mwc-button @click=${this._onCreatePlaylist}>
                <ha-icon icon="mdi:content-save"></ha-icon>
                Save Queue as Playlist
              </mwc-button>
            </div>
          ` : ''}
        ` : this._view === 'detail' ? html`
          <mopidy-playlist-detail
            .playlist=${this._selectedPlaylist}
            .loading=${this._loading}
            .saving=${this._saving}
            @back=${this._onBackToList}
            @delete-playlist=${this._onDeletePlaylist}
            @play-playlist=${this._onPlayPlaylist}
            @play-track=${this._onPlayTrack}
            @track-remove=${this._onRemoveTrack}
            @save-changes=${this._onSaveChanges}
            @add-tracks=${this._onAddTracks}
          ></mopidy-playlist-detail>
        ` : html`
          <div class="search-dialog">
            <div class="search-header">
              <button class="header-button" @click=${this._onCloseSearch}>
                <ha-icon icon="mdi:arrow-left"></ha-icon>
              </button>
              <h2>Add Tracks to ${this._selectedPlaylist?.name}</h2>
            </div>
            <div class="search-content">
              <mopidy-track-search
                .queue=${this._queue}
                @add-track=${this._onAddTrack}
                @search=${this._onSearch}
              ></mopidy-track-search>
            </div>
          </div>
        `}
      </ha-card>

      <mopidy-confirm-dialog></mopidy-confirm-dialog>
      <mopidy-create-playlist-dialog .queue=${this._queue}></mopidy-create-playlist-dialog>

      ${this._toast ? html`
        <div class="toast">${this._toast}</div>
      ` : ''}
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'mopidy-playlist-card': MopidyPlaylistCard;
  }
}
