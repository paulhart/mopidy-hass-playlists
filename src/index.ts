/**
 * Mopidy Playlist Card - Main Entry Point
 * 
 * A custom Home Assistant Lovelace card for managing Mopidy playlists.
 * Provides functionality to create, modify, and remove playlists.
 */

import { MopidyPlaylistCard, PlaylistCardConfig } from './mopidy-playlist-card';
import './components/playlist-editor';

// Export types
export type { PlaylistCardConfig };
export { MopidyPlaylistCard };

// Register the card with Home Assistant
const cardInfo = {
  type: 'mopidy-playlist-card',
  name: 'Mopidy Playlist Card',
  description: 'A card for managing Mopidy playlists - create, edit, and delete playlists',
};

// Register in window.customCards for Home Assistant
if (typeof window !== 'undefined') {
  if (!window.customCards) {
    window.customCards = [];
  }
  window.customCards.push(cardInfo);
}

// Log registration
console.info(
  '%c MOPIDY-PLAYLIST-CARD %c v1.0.0 ',
  'color: white; background: #03a9f4; font-weight: 700;',
  'color: #03a9f4; background: white; font-weight: 700;'
);

// Register custom element
if (!customElements.get('mopidy-playlist-card')) {
  customElements.define('mopidy-playlist-card', MopidyPlaylistCard);
}

/**
 * Get the card configuration editor
 * This is called by Home Assistant when editing the card in the UI
 */
(window as unknown as Record<string, unknown>).customCards = (window as unknown as Record<string, unknown>).customCards || [];

// Configure the Lovelace card
const MopidyPlaylistCardElement = class extends HTMLElement {
  private _card?: MopidyPlaylistCard;
  private _hass?: unknown;

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  set hass(hass: unknown) {
    this._hass = hass;
    if (this._card) {
      this._card.hass = hass as typeof this._card.hass;
    }
  }

  setConfig(config: PlaylistCardConfig) {
    if (!config.entity) {
      throw new Error('Entity is required');
    }
    
    if (!this._card) {
      this._card = document.createElement('mopidy-playlist-card') as MopidyPlaylistCard;
      this.shadowRoot?.appendChild(this._card);
    }
    
    this._card.setConfig(config);
    if (this._hass) {
      this._card.hass = this._hass as typeof this._card.hass;
    }
  }

  getCardSize() {
    return 5;
  }

  static getConfigElement() {
    return document.createElement('mopidy-playlist-card-editor');
  }

  static getStubConfig() {
    return {
      type: 'custom:mopidy-playlist-card',
      entity: '',
      title: 'Playlist Manager',
      show_queue_button: true,
    };
  }
};

// Register the custom element for the card
if (!customElements.get('mopidy-playlist-card-wrapper')) {
  customElements.define('mopidy-playlist-card-wrapper', MopidyPlaylistCardElement);
}

// Export for module usage
export default MopidyPlaylistCard;
