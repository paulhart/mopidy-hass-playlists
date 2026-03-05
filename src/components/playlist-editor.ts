import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { sharedStyles } from '../styles/shared-styles';
import type { HomeAssistant } from '../types/home-assistant';
import type { PlaylistCardConfig } from '../mopidy-playlist-card';

/**
 * Card configuration editor for the Lovelace UI
 */
@customElement('mopidy-playlist-card-editor')
export class PlaylistCardEditor extends LitElement {
  static styles = [sharedStyles, css`
    :host {
      display: block;
    }

    .form-row {
      margin-bottom: 16px;
    }

    .form-row label {
      display: block;
      margin-bottom: 8px;
      font-weight: 500;
      color: var(--primary-text-color);
    }

    ha-entity-picker {
      width: 100%;
    }

    ha-switch {
      --mdc-theme-secondary: var(--primary-color);
    }

    .switch-row {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    .switch-label {
      color: var(--primary-text-color);
    }
  `];

  @property({ attribute: false }) hass!: HomeAssistant;
  @property({ type: Object }) config!: PlaylistCardConfig;

  private _onEntityChange(ev: CustomEvent) {
    const value = ev.detail.value;
    this._updateConfig('entity', value);
  }

  private _onTitleChange(ev: Event) {
    const value = (ev.target as HTMLInputElement).value;
    this._updateConfig('title', value);
  }

  private _onShowQueueButtonChange(ev: Event) {
    const value = (ev.target as HTMLInputElement).checked;
    this._updateConfig('show_queue_button', value);
  }

  private _updateConfig(key: string, value: unknown) {
    this.dispatchEvent(
      new CustomEvent('config-changed', {
        detail: { config: { ...this.config, [key]: value } },
        bubbles: true,
        composed: true,
      })
    );
  }

  render() {
    return html`
      <div class="form-row">
        <label>Entity</label>
        <ha-entity-picker
          .hass=${this.hass}
          .value=${this.config.entity}
          .configValue=${'entity'}
          domain-filter="media_player"
          @value-changed=${this._onEntityChange}
          allow-custom-entity
        ></ha-entity-picker>
      </div>

      <div class="form-row">
        <label>Title (optional)</label>
        <ha-textfield
          .value=${this.config.title || ''}
          .configValue=${'title'}
          @input=${this._onTitleChange}
          placeholder="Playlist Manager"
        ></ha-textfield>
      </div>

      <div class="form-row switch-row">
        <span class="switch-label">Show Save Queue Button</span>
        <ha-switch
          .checked=${this.config.show_queue_button !== false}
          .configValue=${'show_queue_button'}
          @change=${this._onShowQueueButtonChange}
        ></ha-switch>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'mopidy-playlist-card-editor': PlaylistCardEditor;
  }
}
