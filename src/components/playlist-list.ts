import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { sharedStyles } from '../styles/shared-styles';
import type { Playlist } from '../models/playlist';

const DEBUG = true;

function log(...args: unknown[]) {
  if (DEBUG) {
    console.log('[PlaylistList]', ...args);
  }
}

/**
 * Playlist list component - displays all playlists
 */
@customElement('mopidy-playlist-list')
export class PlaylistList extends LitElement {
  static styles = [sharedStyles, css`
    :host {
      display: block;
    }

    .playlist-item {
      display: flex;
      align-items: center;
      padding: 12px 16px;
      border-bottom: 1px solid var(--divider-color, #e0e0e0);
      cursor: pointer;
      transition: background-color 0.2s;
    }

    .playlist-item:hover {
      background-color: var(--secondary-background-color);
    }

    .playlist-item:last-child {
      border-bottom: none;
    }

    .playlist-icon {
      margin-right: 12px;
      color: var(--primary-color);
    }

    .playlist-icon ha-icon {
      --mdc-icon-size: 24px;
    }

    .playlist-info {
      flex: 1;
      min-width: 0;
    }

    .playlist-name {
      font-weight: 500;
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

    .playlist-actions {
      display: flex;
      gap: 4px;
      margin-left: 8px;
    }

    .action-button {
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

    .action-button:hover {
      color: var(--primary-color);
      background-color: var(--secondary-background-color);
    }

    .action-button.delete:hover {
      color: var(--error-color);
    }

    .action-button ha-icon {
      --mdc-icon-size: 20px;
    }

    .chevron {
      color: var(--secondary-text-color);
      margin-left: 4px;
    }

    .chevron ha-icon {
      --mdc-icon-size: 24px;
    }
  `];

  @property({ type: Array }) playlists: Playlist[] = [];
  @property({ type: Boolean }) loading = false;

  private _onPlaylistClick(playlist: Playlist) {
    log('Playlist clicked:', playlist);
    this.dispatchEvent(new CustomEvent('select-playlist', {
      detail: { playlist },
      bubbles: true,
      composed: true,
    }));
  }

  private _onDeleteClick(e: Event, playlist: Playlist) {
    e.stopPropagation();
    log('Delete clicked for playlist:', playlist);
    this.dispatchEvent(new CustomEvent('delete-playlist', {
      detail: { playlist },
      bubbles: true,
      composed: true,
    }));
  }

  private _onPlayClick(e: Event, playlist: Playlist) {
    e.stopPropagation();
    log('Play clicked for playlist:', playlist);
    this.dispatchEvent(new CustomEvent('play-playlist', {
      detail: { playlist },
      bubbles: true,
      composed: true,
    }));
  }

  render() {
    log('render() called, loading:', this.loading, 'playlists count:', this.playlists.length);
    
    if (this.loading) {
      log('Rendering loading state');
      return html`
        <div class="loading">
          <ha-circular-progress active></ha-circular-progress>
        </div>
      `;
    }

    if (this.playlists.length === 0) {
      log('Rendering empty state - no playlists');
      return html`
        <div class="empty-state">
          <ha-icon icon="mdi:playlist-music"></ha-icon>
          <p>No playlists found</p>
          <p>Create a new playlist to get started</p>
        </div>
      `;
    }

    log('Rendering', this.playlists.length, 'playlists');
    return html`
      <div class="list">
        ${this.playlists.map((playlist) => html`
          <div class="playlist-item" @click=${() => this._onPlaylistClick(playlist)}>
            <div class="playlist-icon">
              <ha-icon icon="mdi:playlist-music"></ha-icon>
            </div>
            <div class="playlist-info">
              <div class="playlist-name">${playlist.name}</div>
              <div class="playlist-meta">
                ${playlist.trackCount !== undefined 
                  ? `${playlist.trackCount} track${playlist.trackCount !== 1 ? 's' : ''}`
                  : 'Playlist'}
              </div>
            </div>
            <div class="playlist-actions">
              <button 
                class="action-button" 
                @click=${(e: Event) => this._onPlayClick(e, playlist)}
                title="Play playlist"
              >
                <ha-icon icon="mdi:play"></ha-icon>
              </button>
              <button 
                class="action-button delete" 
                @click=${(e: Event) => this._onDeleteClick(e, playlist)}
                title="Delete playlist"
              >
                <ha-icon icon="mdi:delete"></ha-icon>
              </button>
            </div>
            <div class="chevron">
              <ha-icon icon="mdi:chevron-right"></ha-icon>
            </div>
          </div>
        `)}
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'mopidy-playlist-list': PlaylistList;
  }
}
