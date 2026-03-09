import { LitElement, html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { sharedStyles, formatDuration } from '../styles/shared-styles';
import type { Track, QueueItem } from '../models/playlist';

/**
 * Track search component - allows searching and adding tracks to playlist
 */
@customElement('mopidy-track-search')
export class TrackSearch extends LitElement {
  static styles = [sharedStyles, css`
    :host {
      display: block;
    }

    .search-header {
      padding: 16px;
      border-bottom: 1px solid var(--divider-color, #e0e0e0);
    }

    .search-input {
      width: 100%;
    }

    .tabs {
      display: flex;
      border-bottom: 1px solid var(--divider-color, #e0e0e0);
    }

    .tab {
      flex: 1;
      padding: 12px;
      text-align: center;
      cursor: pointer;
      color: var(--secondary-text-color);
      border-bottom: 2px solid transparent;
      transition: color 0.2s, border-color 0.2s;
    }

    .tab:hover {
      color: var(--primary-text-color);
    }

    .tab.active {
      color: var(--primary-color);
      border-bottom-color: var(--primary-color);
    }

    .search-results, .queue-list {
      max-height: 50vh;
      overflow-y: auto;
    }

    .result-item {
      display: flex;
      align-items: center;
      padding: 10px 16px;
      border-bottom: 1px solid var(--divider-color, #e0e0e0);
      transition: background-color 0.2s;
    }

    .result-item:hover {
      background-color: var(--secondary-background-color);
    }

    .result-item:last-child {
      border-bottom: none;
    }

    .result-info {
      flex: 1;
      min-width: 0;
    }

    .result-title {
      font-weight: 500;
      color: var(--primary-text-color);
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .result-artist {
      font-size: 0.85em;
      color: var(--secondary-text-color);
      margin-top: 2px;
    }

    .result-duration {
      color: var(--secondary-text-color);
      font-size: 0.85em;
      margin-left: 12px;
    }

    .add-button {
      background: none;
      border: none;
      cursor: pointer;
      padding: 8px;
      color: var(--primary-color);
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: background-color 0.2s;
      margin-left: 8px;
    }

    .add-button:hover {
      background-color: var(--secondary-background-color);
    }

    .add-button ha-icon {
      --mdc-icon-size: 24px;
    }

    .searching, .no-results {
      padding: 32px;
      text-align: center;
      color: var(--secondary-text-color);
    }

    .section-title {
      padding: 8px 16px;
      font-size: 0.85em;
      font-weight: 500;
      color: var(--secondary-text-color);
      background-color: var(--secondary-background-color);
    }
  `];

  @property({ type: Array }) queue: QueueItem[] = [];
  @property({ type: Boolean }) searching = false;
  @property({ type: Array }) searchResults: Track[] = [];

  @state() private _searchQuery = '';
  @state() private _activeTab: 'queue' | 'search' = 'queue';

  private _searchTimeout?: number;

  private _onSearchInput(e: Event) {
    const target = e.target as HTMLInputElement;
    this._searchQuery = target.value;

    // Debounce search
    if (this._searchTimeout) {
      clearTimeout(this._searchTimeout);
    }

    if (this._searchQuery.trim()) {
      this._searchTimeout = window.setTimeout(() => {
        this._performSearch();
      }, 300);
    }
  }

  private _performSearch() {
    console.log('[TrackSearch] _performSearch called with query:', this._searchQuery);
    this.dispatchEvent(new CustomEvent('search', {
      detail: { query: this._searchQuery },
      bubbles: true,
      composed: true,
    }));
  }

  private _onTabChange(tab: 'queue' | 'search') {
    this._activeTab = tab;
  }

  private _onAddTrack(track: Track) {
    this.dispatchEvent(new CustomEvent('add-track', {
      detail: { track },
      bubbles: true,
      composed: true,
    }));
  }

  private _onAddQueueItem(item: QueueItem) {
    this._onAddTrack({
      uri: item.uri,
      name: item.name,
      artists: item.artists,
      album: item.album,
      duration: item.duration,
    });
  }

  render() {
    return html`
      <div class="search-header">
        <ha-textfield
          class="search-input"
          .value=${this._searchQuery}
          @input=${this._onSearchInput}
          placeholder="Search for tracks..."
          label="Search"
        >
          <ha-icon icon="mdi:magnify" slot="leadingIcon"></ha-icon>
        </ha-textfield>
      </div>

      ${this._searchQuery.trim() ? html`
        <div class="search-results">
          ${this.searching ? html`
            <div class="searching">
              <ha-circular-progress active></ha-circular-progress>
              <p>Searching...</p>
            </div>
          ` : this.searchResults.length > 0 ? html`
            <div class="section-title">Search Results</div>
            ${this.searchResults.map((track) => html`
              <div class="result-item">
                <div class="result-info">
                  <div class="result-title">${track.name}</div>
                  ${track.artists?.length ? html`
                    <div class="result-artist">${track.artists.join(', ')}</div>
                  ` : ''}
                </div>
                <div class="result-duration">${formatDuration(track.duration)}</div>
                <button class="add-button" @click=${() => this._onAddTrack(track)} title="Add to playlist">
                  <ha-icon icon="mdi:plus-circle"></ha-icon>
                </button>
              </div>
            `)}
          ` : html`
            <div class="no-results">
              <ha-icon icon="mdi:magnify"></ha-icon>
              <p>No tracks found</p>
              <p style="font-size: 0.85em; margin-top: 8px;">
                Try a different search term or use the "Current Queue" tab to add tracks from your queue.
              </p>
            </div>
          `}
        </div>
      ` : html`
        <div class="tabs">
          <div 
            class="tab ${this._activeTab === 'queue' ? 'active' : ''}"
            @click=${() => this._onTabChange('queue')}
          >
            Current Queue (${this.queue.length})
          </div>
          <div 
            class="tab ${this._activeTab === 'search' ? 'active' : ''}"
            @click=${() => this._onTabChange('search')}
          >
            Search Library
          </div>
        </div>

        ${this._activeTab === 'queue' ? html`
          <div class="queue-list">
            ${this.queue.length > 0 ? html`
              <div class="section-title">Add from Queue</div>
              ${this.queue.map((item) => html`
                <div class="result-item">
                  <div class="result-info">
                    <div class="result-title">${item.name}</div>
                    ${item.artists?.length ? html`
                      <div class="result-artist">${item.artists.join(', ')}</div>
                    ` : ''}
                  </div>
                  <div class="result-duration">${formatDuration(item.duration)}</div>
                  <button class="add-button" @click=${() => this._onAddQueueItem(item)} title="Add to playlist">
                    <ha-icon icon="mdi:plus-circle"></ha-icon>
                  </button>
                </div>
              `)}
            ` : html`
              <div class="no-results">
                <ha-icon icon="mdi:playlist-remove"></ha-icon>
                <p>Queue is empty</p>
              </div>
            `}
          </div>
        ` : html`
          <div class="no-results">
            <ha-icon icon="mdi:magnify"></ha-icon>
            <p>Enter a search term to find tracks</p>
          </div>
        `}
      `}
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'mopidy-track-search': TrackSearch;
  }
}
