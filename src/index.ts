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

// Log registration
console.info(
  '%c MOPIDY-PLAYLIST-CARD %c v1.0.0 ',
  'color: white; background: #03a9f4; font-weight: 700;',
  'color: #03a9f4; background: white; font-weight: 700;'
);

// Register in window.customCards for Home Assistant visual editor
if (typeof window !== 'undefined') {
  if (!window.customCards) {
    window.customCards = [];
  }
  window.customCards.push({
    type: 'mopidy-playlist-card',
    name: 'Mopidy Playlist Card',
    description: 'A card for managing Mopidy playlists - create, edit, and delete playlists',
  });
}

// The MopidyPlaylistCard class is already decorated with @customElement('mopidy-playlist-card')
// so it will be registered automatically when this module loads.

// Export for module usage
export default MopidyPlaylistCard;
