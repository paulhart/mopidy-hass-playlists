import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { sharedStyles, formatDuration } from '../styles/shared-styles';
import type { Track } from '../models/playlist';

/**
 * Track item component for displaying a single track in a playlist
 */
@customElement('mopidy-track-item')
export class TrackItem extends LitElement {
  static styles = [sharedStyles, css`
    :host {
      display: block;
    }

    .track-item {
      display: flex;
      align-items: center;
      padding: 10px 16px;
      border-bottom: 1px solid var(--divider-color, #e0e0e0);
      transition: background-color 0.2s;
    }

    .track-item:hover {
      background-color: var(--secondary-background-color);
    }

    .track-item:last-child {
      border-bottom: none;
    }

    .drag-handle {
      cursor: grab;
      color: var(--secondary-text-color);
      padding: 4px;
      margin-right: 8px;
      touch-action: none;
    }

    .drag-handle:active {
      cursor: grabbing;
    }

    .track-number {
      width: 32px;
      text-align: center;
      color: var(--secondary-text-color);
      font-size: 0.9em;
      flex-shrink: 0;
    }

    .track-info {
      flex: 1;
      min-width: 0;
      margin-left: 8px;
    }

    .track-title {
      font-weight: 500;
      color: var(--primary-text-color);
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .track-artist {
      font-size: 0.85em;
      color: var(--secondary-text-color);
      margin-top: 2px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .track-duration {
      color: var(--secondary-text-color);
      font-size: 0.85em;
      margin-left: 12px;
      flex-shrink: 0;
    }

    .remove-button {
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
      margin-left: 4px;
    }

    .remove-button:hover {
      color: var(--error-color);
      background-color: var(--secondary-background-color);
    }

    .remove-button ha-icon {
      --mdc-icon-size: 20px;
    }
  `];

  @property({ type: Object }) track!: Track;
  @property({ type: Boolean }) draggable = true;
  @property({ type: Boolean }) showRemove = true;
  @property({ type: Number }) index = 0;

  private _onRemoveClick(e: Event) {
    e.stopPropagation();
    this.dispatchEvent(new CustomEvent('remove-track', {
      detail: { track: this.track, index: this.index },
      bubbles: true,
      composed: true,
    }));
  }

  private _onTrackClick() {
    this.dispatchEvent(new CustomEvent('play-track', {
      detail: { track: this.track, index: this.index },
      bubbles: true,
      composed: true,
    }));
  }

  render() {
    const artists = this.track.artists?.join(', ') || '';
    
    return html`
      <div class="track-item">
        ${this.draggable ? html`
          <div class="drag-handle" data-drag-handle>
            <ha-icon icon="mdi:drag"></ha-icon>
          </div>
        ` : html`
          <div class="track-number">${this.track.trackNo || this.index + 1}</div>
        `}
        
        <div class="track-info" @click=${this._onTrackClick}>
          <div class="track-title">${this.track.name}</div>
          ${artists ? html`
            <div class="track-artist">${artists}${this.track.album ? ` • ${this.track.album}` : ''}</div>
          ` : ''}
        </div>
        
        <div class="track-duration">${formatDuration(this.track.duration)}</div>
        
        ${this.showRemove ? html`
          <button class="remove-button" @click=${this._onRemoveClick} title="Remove track">
            <ha-icon icon="mdi:close"></ha-icon>
          </button>
        ` : ''}
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'mopidy-track-item': TrackItem;
  }
}
