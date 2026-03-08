import { LitElement, html, css, PropertyValues } from 'lit';
import { customElement, property, state, query } from 'lit/decorators.js';
import { sharedStyles, formatTotalDuration } from '../styles/shared-styles';
import type { PlaylistDetail as PlaylistDetailModel, Track } from '../models/playlist';
import Sortable from 'sortablejs';

const DEBUG = true;

function log(...args: unknown[]) {
  if (DEBUG) {
    console.log('[PlaylistDetail]', ...args);
  }
}

function logError(...args: unknown[]) {
  console.error('[PlaylistDetail]', ...args);
}

/**
 * Playlist detail component - displays tracks in a playlist with drag-drop reordering
 */
@customElement('mopidy-playlist-detail')
export class PlaylistDetailComponent extends LitElement {
  static styles = [sharedStyles, css`
    :host {
      display: block;
    }

    .header {
      display: flex;
      align-items: center;
      padding: 12px 16px;
      border-bottom: 1px solid var(--divider-color, #e0e0e0);
      background-color: var(--app-header-background-color, var(--primary-background-color));
    }

    .back-button {
      background: none;
      border: none;
      cursor: pointer;
      padding: 8px;
      color: var(--primary-text-color);
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-right: 8px;
    }

    .back-button:hover {
      background-color: var(--secondary-background-color);
    }

    .header-info {
      flex: 1;
      min-width: 0;
    }

    .playlist-title {
      font-weight: 500;
      font-size: 1.1em;
      color: var(--primary-text-color);
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .playlist-meta {
      font-size: 0.85em;
      color: var(--secondary-text-color);
      margin-top: 2px;
    }

    .delete-button {
      background: none;
      border: none;
      cursor: pointer;
      padding: 8px;
      color: var(--secondary-text-color);
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: color 0.2s, background-color 0.2s;
    }

    .delete-button:hover {
      color: var(--error-color);
      background-color: var(--secondary-background-color);
    }

    .track-list {
      max-height: 50vh;
      overflow-y: auto;
    }

    .actions {
      display: flex;
      gap: 8px;
      padding: 12px 16px;
      border-top: 1px solid var(--divider-color, #e0e0e0);
    }

    .actions mwc-button {
      flex: 1;
    }

    .sortable-ghost {
      opacity: 0.4;
      background-color: var(--primary-color, #03a9f4) !important;
    }

    .sortable-drag {
      opacity: 0;
    }

    .reorder-hint {
      padding: 8px 16px;
      font-size: 0.85em;
      color: var(--secondary-text-color);
      text-align: center;
      background-color: var(--secondary-background-color);
    }

    .error {
      padding: 16px;
      text-align: center;
    }

    .error-actions {
      margin-top: 16px;
    }
  `];

  @property({ type: Object }) playlist: PlaylistDetailModel | null = null;
  @property({ type: Boolean }) loading = false;
  @property({ type: Boolean }) saving = false;

  @state() private _tracks: Track[] = [];
  @state() private _hasChanges = false;

  @query('.track-list') private _trackList!: HTMLElement;
  private _sortable: Sortable | null = null;

  protected updated(changedProperties: PropertyValues) {
    super.updated(changedProperties);
    
    log('updated() called, changed properties:', [...changedProperties.keys()]);
    
    if (changedProperties.has('playlist')) {
      log('playlist changed:', this.playlist);
      if (this.playlist) {
        log('Setting _tracks to', this.playlist.tracks.length, 'tracks');
        this._tracks = [...this.playlist.tracks];
        this._hasChanges = false;
        this._initSortable();
      } else {
        log('playlist is null');
      }
    }
  }

  private _initSortable() {
    if (this._sortable) {
      this._sortable.destroy();
    }

    if (this._trackList) {
      log('Initializing Sortable on track list');
      this._sortable = new Sortable(this._trackList, {
        handle: '[data-drag-handle]',
        animation: 150,
        ghostClass: 'sortable-ghost',
        dragClass: 'sortable-drag',
        onEnd: (evt) => {
          if (evt.oldIndex !== undefined && evt.newIndex !== undefined && evt.oldIndex !== evt.newIndex) {
            this._onReorder(evt.oldIndex, evt.newIndex);
          }
        },
      });
    }
  }

  private _onReorder(oldIndex: number, newIndex: number) {
    log('Reorder track from', oldIndex, 'to', newIndex);
    const tracks = [...this._tracks];
    const [movedTrack] = tracks.splice(oldIndex, 1);
    tracks.splice(newIndex, 0, movedTrack);
    
    // Update track numbers
    tracks.forEach((track, index) => {
      track.trackNo = index + 1;
    });
    
    this._tracks = tracks;
    this._hasChanges = true;

    this.dispatchEvent(new CustomEvent('track-reorder', {
      detail: { oldIndex, newIndex, tracks: this._tracks },
      bubbles: true,
      composed: true,
    }));
  }

  private _onRemoveTrack(e: CustomEvent) {
    const { index } = e.detail;
    log('Remove track at index', index);
    const tracks = [...this._tracks];
    tracks.splice(index, 1);
    
    // Update track numbers
    tracks.forEach((track, idx) => {
      track.trackNo = idx + 1;
    });
    
    this._tracks = tracks;
    this._hasChanges = true;

    this.dispatchEvent(new CustomEvent('track-remove', {
      detail: { index, tracks: this._tracks },
      bubbles: true,
      composed: true,
    }));
  }

  private _onPlayTrack(e: CustomEvent) {
    const { track } = e.detail;
    log('Play track:', track);
    this.dispatchEvent(new CustomEvent('play-track', {
      detail: { track },
      bubbles: true,
      composed: true,
    }));
  }

  private _onBack() {
    log('Back button clicked');
    this.dispatchEvent(new CustomEvent('back', {
      bubbles: true,
      composed: true,
    }));
  }

  private _onDeletePlaylist() {
    log('Delete playlist clicked');
    this.dispatchEvent(new CustomEvent('delete-playlist', {
      detail: { playlist: this.playlist },
      bubbles: true,
      composed: true,
    }));
  }

  private _onPlayAll() {
    log('Play all clicked');
    this.dispatchEvent(new CustomEvent('play-playlist', {
      detail: { playlist: this.playlist },
      bubbles: true,
      composed: true,
    }));
  }

  private _onSaveChanges() {
    log('Save changes clicked');
    this.dispatchEvent(new CustomEvent('save-changes', {
      detail: { playlist: this.playlist, tracks: this._tracks },
      bubbles: true,
      composed: true,
    }));
  }

  private _onAddTracks() {
    log('Add tracks clicked');
    this.dispatchEvent(new CustomEvent('add-tracks', {
      detail: { playlist: this.playlist },
      bubbles: true,
      composed: true,
    }));
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    log('disconnectedCallback()');
    if (this._sortable) {
      this._sortable.destroy();
      this._sortable = null;
    }
  }

  render() {
    log('render() called, loading:', this.loading, 'playlist:', this.playlist ? 'present' : 'null');
    
    if (this.loading) {
      log('Rendering loading state');
      return html`
        <div class="loading">
          <ha-circular-progress active></ha-circular-progress>
        </div>
      `;
    }

    if (!this.playlist) {
      logError('Rendering error state - playlist is null');
      return html`
        <div class="error">
          <ha-icon icon="mdi:playlist-remove" style="--mdc-icon-size: 48px; color: var(--error-color);"></ha-icon>
          <p>Playlist not found</p>
          <p style="font-size: 0.85em; color: var(--secondary-text-color);">The playlist may have been deleted or is unavailable.</p>
          <div class="error-actions">
            <mwc-button @click=${this._onBack}>
              <ha-icon icon="mdi:arrow-left"></ha-icon>
              Back to Playlists
            </mwc-button>
          </div>
        </div>
      `;
    }

    const trackCount = this._tracks.length;
    const totalDuration = this._tracks.reduce((sum, t) => sum + (t.duration || 0), 0);
    log('Rendering playlist with', trackCount, 'tracks');

    return html`
      <div class="header">
        <button class="back-button" @click=${this._onBack} title="Back to playlists">
          <ha-icon icon="mdi:arrow-left"></ha-icon>
        </button>
        <div class="header-info">
          <div class="playlist-title">${this.playlist.name}</div>
          <div class="playlist-meta">
            ${trackCount} track${trackCount !== 1 ? 's' : ''} • ${formatTotalDuration(totalDuration)}
            ${this._hasChanges ? ' • Unsaved changes' : ''}
          </div>
        </div>
        <button class="delete-button" @click=${this._onDeletePlaylist} title="Delete playlist">
          <ha-icon icon="mdi:delete"></ha-icon>
        </button>
      </div>

      ${trackCount > 1 ? html`
        <div class="reorder-hint">
          <ha-icon icon="mdi:information-outline"></ha-icon>
          Drag tracks to reorder
        </div>
      ` : ''}

      <div class="track-list">
        ${this._tracks.map((track, index) => html`
          <mopidy-track-item
            .track=${track}
            .index=${index}
            .draggable=${trackCount > 1}
            .showRemove=${true}
            @remove-track=${this._onRemoveTrack}
            @play-track=${this._onPlayTrack}
          ></mopidy-track-item>
        `)}
        
        ${trackCount === 0 ? html`
          <div class="empty-state">
            <ha-icon icon="mdi:music-note-off"></ha-icon>
            <p>This playlist is empty</p>
          </div>
        ` : ''}
      </div>

      <div class="actions">
        <mwc-button @click=${this._onAddTracks} ?disabled=${this.saving}>
          <ha-icon icon="mdi:plus"></ha-icon>
          Add Tracks
        </mwc-button>
        ${trackCount > 0 ? html`
          <mwc-button @click=${this._onPlayAll} ?disabled=${this.saving}>
            <ha-icon icon="mdi:play"></ha-icon>
            Play All
          </mwc-button>
        ` : ''}
        ${this._hasChanges ? html`
          <mwc-button 
            @click=${this._onSaveChanges} 
            ?disabled=${this.saving}
            style="--mdc-theme-primary: var(--primary-color);"
          >
            <ha-icon icon="mdi:content-save"></ha-icon>
            Save
          </mwc-button>
        ` : ''}
      </div>
    `;
  }

  /**
   * Reset changes after save
   */
  public resetChanges() {
    this._hasChanges = false;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'mopidy-playlist-detail': PlaylistDetailComponent;
  }
}
