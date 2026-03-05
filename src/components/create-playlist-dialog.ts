import { LitElement, html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { sharedStyles } from '../styles/shared-styles';
import type { QueueItem } from '../models/playlist';

/**
 * Create playlist dialog component
 */
@customElement('mopidy-create-playlist-dialog')
export class CreatePlaylistDialog extends LitElement {
  static styles = [sharedStyles, css`
    :host {
      display: contents;
    }

    .radio-group {
      display: flex;
      flex-direction: column;
      gap: 8px;
    }

    .radio-option {
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 8px;
      border-radius: 4px;
      cursor: pointer;
    }

    .radio-option:hover {
      background-color: var(--secondary-background-color);
    }

    .queue-info {
      margin-top: 8px;
      padding: 8px;
      background-color: var(--secondary-background-color);
      border-radius: 4px;
      font-size: 0.9em;
      color: var(--secondary-text-color);
    }
  `];

  @property({ type: Boolean }) open = false;
  @property({ type: Array }) queue: QueueItem[] = [];
  @property({ type: String }) defaultScheme = 'm3u';

  @state() private _name = '';
  @state() private _source: 'empty' | 'queue' = 'empty';
  @state() private _resolve?: (value: { name: string; source: 'empty' | 'queue' } | null) => void;

  /**
   * Show the dialog and return a promise
   */
  show(): Promise<{ name: string; source: 'empty' | 'queue' } | null> {
    this._name = '';
    this._source = 'empty';
    this.open = true;
    return new Promise((resolve) => {
      this._resolve = resolve;
    });
  }

  private _onNameChange(e: Event) {
    const target = e.target as HTMLInputElement;
    this._name = target.value;
  }

  private _onSourceChange(e: Event) {
    const target = e.target as HTMLInputElement;
    this._source = target.value as 'empty' | 'queue';
  }

  private _onCreate() {
    if (!this._name.trim()) {
      return;
    }
    this.open = false;
    this._resolve?.({ name: this._name.trim(), source: this._source });
    this._resolve = undefined;
  }

  private _onCancel() {
    this.open = false;
    this._resolve?.(null);
    this._resolve = undefined;
  }

  private _onClose() {
    this._onCancel();
  }

  render() {
    if (!this.open) return html``;

    const queueCount = this.queue.length;
    const hasQueue = queueCount > 0;

    return html`
      <ha-dialog
        .open=${this.open}
        @closed=${this._onClose}
        heading="Create New Playlist"
      >
        <div class="dialog-content">
          <div class="form-field">
            <label for="playlist-name">Playlist Name</label>
            <ha-textfield
              id="playlist-name"
              .value=${this._name}
              @input=${this._onNameChange}
              placeholder="My New Playlist"
              dialogInitialFocus
            ></ha-textfield>
          </div>

          <div class="form-field">
            <label>Source</label>
            <div class="radio-group">
              <label class="radio-option">
                <input
                  type="radio"
                  name="source"
                  value="empty"
                  .checked=${this._source === 'empty'}
                  @change=${this._onSourceChange}
                />
                <span>Empty playlist</span>
              </label>
              <label class="radio-option">
                <input
                  type="radio"
                  name="source"
                  value="queue"
                  .checked=${this._source === 'queue'}
                  .disabled=${!hasQueue}
                  @change=${this._onSourceChange}
                />
                <span>Current queue (${queueCount} tracks)</span>
              </label>
              ${hasQueue && this._source === 'queue' ? html`
                <div class="queue-info">
                  ${queueCount} track${queueCount !== 1 ? 's' : ''} will be added to the new playlist
                </div>
              ` : ''}
              ${!hasQueue ? html`
                <div class="queue-info">
                  Queue is empty - cannot create from queue
                </div>
              ` : ''}
            </div>
          </div>
        </div>
        <mwc-button
          slot="secondaryAction"
          @click=${this._onCancel}
        >
          Cancel
        </mwc-button>
        <mwc-button
          slot="primaryAction"
          @click=${this._onCreate}
          .disabled=${!this._name.trim()}
        >
          Create
        </mwc-button>
      </ha-dialog>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'mopidy-create-playlist-dialog': CreatePlaylistDialog;
  }
}
