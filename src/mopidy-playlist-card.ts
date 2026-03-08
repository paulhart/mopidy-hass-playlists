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

const DEBUG = true;

function log(...args: unknown[]) {
  if (DEBUG) {
    console.log('[MopidyPlaylistCard]', ...args);
  }
}

function logError(...args: unknown[]) {
  console.error('[MopidyPlaylistCard]', ...args);
}

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
  @state() private _searching = false;
  @state() private _playlists: Playlist[] = [];
  @state() private _selectedPlaylist: PlaylistDetail | null = null;
  @state() private _queue: QueueItem[] = [];
  @state() private _searchResults: Track[] = [];
  @state() private _toast: string | null = null;

  @query('mopidy-confirm-dialog') private _confirmDialog!: ConfirmDialogElement;
  @query('mopidy-create-playlist-dialog') private _createDialog!: CreateDialogElement;

  private _service?: MopidyService;
  private _toastTimeout?: number;

  constructor() {
    super();
    log('Card constructor called');
  }

  connectedCallback() {
    super.connectedCallback();
    log('Card connected to DOM');
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    log('Card disconnected from DOM');
  }

  protected updated(changedProperties: PropertyValues) {
    super.updated(changedProperties);
    
    log('updated() called, changed properties:', [...changedProperties.keys()]);
    
    if (changedProperties.has('hass')) {
      log('hass changed, hass object:', this.hass ? 'present' : 'missing');
      if (this.hass) {
        log('hass.states:', Object.keys(this.hass.states || {}));
      }
    }
    
    if (changedProperties.has('config')) {
      log('config changed:', this.config);
    }
    
    if (changedProperties.has('hass') && this.hass && this.config) {
      log('Both hass and config are available, initializing service...');
      this._service = new MopidyService(this.hass, this.config.entity);
      
      if (this._view === 'list' && this._playlists.length === 0) {
        log('Loading playlists from updated()...');
        this._loadPlaylists();
      }
      log('Loading queue from updated()...');
      this._loadQueue();
    }
  }

  private async _loadPlaylists() {
    log('_loadPlaylists called, service:', this._service ? 'available' : 'missing');
    if (!this._service) {
      log('Cannot load playlists - no service');
      return;
    }
    
    this._loading = true;
    log('Setting loading=true, fetching playlists...');
    try {
      this._playlists = await this._service.getPlaylists();
      log('Playlists loaded:', this._playlists.length, this._playlists);
    } catch (error) {
      logError('Error loading playlists:', error);
      this._showToast('Failed to load playlists');
    } finally {
      this._loading = false;
      log('Setting loading=false');
    }
  }

  private async _loadQueue() {
    log('_loadQueue called, service:', this._service ? 'available' : 'missing');
    if (!this._service) return;
    
    try {
      this._queue = await this._service.getQueue();
      log('Queue loaded:', this._queue.length, 'items');
    } catch (error) {
      logError('Error loading queue:', error);
    }
  }

  private async _loadPlaylistDetail(playlist: Playlist) {
    log('_loadPlaylistDetail called with playlist:', playlist);
    if (!this._service) return;
    
    this._loading = true;
    try {
      this._selectedPlaylist = await this._service.getPlaylist(playlist.uri, playlist.mediaContentType);
      log('Playlist detail loaded:', this._selectedPlaylist);
      this._view = 'detail';
      log('View changed to detail');
    } catch (error) {
      logError('Error loading playlist:', error);
      this._showToast('Failed to load playlist');
    } finally {
      this._loading = false;
    }
  }

  private _showToast(message: string) {
    log('Showing toast:', message);
    this._toast = message;
    if (this._toastTimeout) {
      clearTimeout(this._toastTimeout);
    }
    this._toastTimeout = window.setTimeout(() => {
      this._toast = null;
      log('Toast cleared');
    }, 3000);
  }

  // Event handlers

  private async _onCreatePlaylist() {
    log('_onCreatePlaylist called');
    if (!this._createDialog) {
      log('Create dialog not available');
      return;
    }
    
    const result = await this._createDialog.show();
    log('Create dialog result:', result);
    if (!result) return;

    this._saving = true;
    try {
      // First create the empty playlist
      log('Creating playlist:', result.name);
      await this._service?.createPlaylist(result.name);
      
      // If creating from queue, add queue tracks to the new playlist
      if (result.source === 'queue' && this._queue.length > 0) {
        log('Adding', this._queue.length, 'queue tracks to new playlist');
        // Wait a moment for the playlist to be created
        await new Promise(resolve => setTimeout(resolve, 500));
        
        // Reload playlists to get the new playlist URI
        await this._loadPlaylists();
        const newPlaylist = this._playlists.find(p => p.name === result.name);
        
        if (newPlaylist) {
          log('Found new playlist:', newPlaylist.uri);
          const trackUris = this._queue.map(item => item.uri);
          await this._service?.addToPlaylist(newPlaylist.uri, trackUris);
          log('Added queue tracks to playlist');
        } else {
          logError('Could not find newly created playlist');
        }
      }
      
      this._showToast(`Playlist "${result.name}" created`);
      await this._loadPlaylists();
    } catch (error) {
      logError('Error creating playlist:', error);
      this._showToast('Failed to create playlist');
    } finally {
      this._saving = false;
    }
  }

  private async _onDeletePlaylist(e: CustomEvent) {
    const { playlist } = e.detail;
    log('_onDeletePlaylist called for:', playlist);
    
    if (!this._confirmDialog) {
      log('Confirm dialog not available');
      return;
    }
    
    this._confirmDialog.title = 'Delete Playlist';
    this._confirmDialog.message = `Are you sure you want to delete "${playlist.name}"? This cannot be undone.`;
    this._confirmDialog.destructive = true;
    this._confirmDialog.confirmText = 'Delete';
    
    const confirmed = await this._confirmDialog.show();
    log('Delete confirmation result:', confirmed);
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
      logError('Error deleting playlist:', error);
      this._showToast('Failed to delete playlist');
    }
  }

  private _onSelectPlaylist(e: CustomEvent) {
    const { playlist } = e.detail;
    log('_onSelectPlaylist:', playlist);
    this._loadPlaylistDetail(playlist);
  }

  private _onBackToList() {
    log('_onBackToList called');
    this._view = 'list';
    this._selectedPlaylist = null;
  }

  private async _onPlayPlaylist(e: CustomEvent) {
    const { playlist } = e.detail;
    log('_onPlayPlaylist:', playlist);
    try {
      await this._service?.playPlaylist(playlist.uri);
      this._showToast(`Playing "${playlist.name}"`);
    } catch (error) {
      logError('Error playing playlist:', error);
      this._showToast('Failed to play playlist');
    }
  }

  private async _onPlayTrack(e: CustomEvent) {
    const { track } = e.detail;
    log('_onPlayTrack:', track);
    try {
      await this._service?.playTrack(track.uri);
      this._showToast(`Playing "${track.name}"`);
    } catch (error) {
      logError('Error playing track:', error);
      this._showToast('Failed to play track');
    }
  }

  private async _onRemoveTrack(e: CustomEvent) {
    const { index, tracks } = e.detail;
    log('_onRemoveTrack called, index:', index, 'remaining tracks:', tracks.length);
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
      logError('Error removing track:', error);
      this._showToast('Failed to remove track');
    } finally {
      this._saving = false;
    }
  }

  private async _onSaveChanges(e: CustomEvent) {
    const { playlist, tracks } = e.detail;
    log('_onSaveChanges called, playlist:', playlist, 'tracks:', tracks.length);
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
      logError('Error saving playlist:', error);
      this._showToast('Failed to save playlist');
    } finally {
      this._saving = false;
    }
  }

  private _onAddTracks(_e: CustomEvent) {
    log('_onAddTracks called, switching to search view');
    this._view = 'search';
  }

  private async _onAddTrack(e: CustomEvent) {
    const { track } = e.detail;
    log('_onAddTrack called, track:', track);
    if (!this._selectedPlaylist) return;

    try {
      await this._service?.addToPlaylist(this._selectedPlaylist.uri, [track.uri]);
      this._showToast(`Added "${track.name}"`);
      // Reload playlist
      await this._loadPlaylistDetail(this._selectedPlaylist);
    } catch (error) {
      logError('Error adding track:', error);
      this._showToast('Failed to add track');
    }
  }

  private async _onSearch(e: CustomEvent) {
    const { query } = e.detail;
    log('_onSearch called, query:', query);
    log('  service available:', !!this._service);
    log('  query trimmed:', query?.trim());
    
    if (!this._service) {
      logError('Search aborted - no service available');
      this._searchResults = [];
      return;
    }
    
    if (!query?.trim()) {
      log('Search aborted - empty query');
      this._searchResults = [];
      return;
    }
    
    this._searching = true;
    log('Setting searching=true, calling searchTracks...');
    try {
      this._searchResults = await this._service.searchTracks(query);
      log('Search results:', this._searchResults.length, 'tracks');
    } catch (error) {
      logError('Search error:', error);
      this._searchResults = [];
    } finally {
      this._searching = false;
      log('Search complete, searching=false');
    }
  }

  private _onCloseSearch() {
    log('_onCloseSearch called');
    this._view = 'detail';
  }

  setConfig(config: PlaylistCardConfig) {
    log('setConfig called with:', config);
    if (!config.entity) {
      logError('Entity is required in config');
      throw new Error('Entity is required');
    }
    this.config = config;
    log('Config set successfully');
  }

  getCardSize() {
    return 5;
  }

  render() {
    log('render() called, view:', this._view, 'config:', this.config ? 'present' : 'missing');
    
    if (!this.config) {
      log('No config, showing error');
      return html`<ha-card><div class="error">Configuration error</div></ha-card>`;
    }

    const title = this.config.title || 'Playlist Manager';
    log('Rendering with title:', title, 'playlists:', this._playlists.length, 'queue:', this._queue.length);

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
                .searching=${this._searching}
                .searchResults=${this._searchResults}
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
