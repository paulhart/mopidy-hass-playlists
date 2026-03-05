import type { HomeAssistant, BrowseMedia } from '../types/home-assistant';
import type { Playlist, PlaylistDetail, Track, QueueItem } from '../models/playlist';

/**
 * Service wrapper for Mopidy playlist operations
 * Communicates with the mopidyhass integration through Home Assistant services
 */
export class MopidyService {
  private entityId: string;

  constructor(
    private hass: HomeAssistant,
    entity: string
  ) {
    // Extract entity name without domain for service calls
    this.entityId = entity;
  }

  /**
   * Get the entity name without domain prefix
   */
  private get entityName(): string {
    return this.entityId.replace(/^media_player\./, '');
  }

  /**
   * Get the service domain (mopidyhass)
   */
  private get serviceDomain(): string {
    return 'mopidyhass';
  }

  /**
   * Call a mopidyhass service
   */
  private async callService(
    service: string,
    data: Record<string, unknown> = {}
  ): Promise<void> {
    await this.hass.callService(this.serviceDomain, service, data);
  }

  /**
   * Browse media using Home Assistant's media browser
   */
  private async browseMedia(
    mediaContentId?: string,
    mediaContentType?: string
  ): Promise<BrowseMedia> {
    return await this.hass.callWS<BrowseMedia>({
      type: 'media_player/browse_media',
      entity_id: this.entityId,
      media_content_id: mediaContentId,
      media_content_type: mediaContentType,
    });
  }

  /**
   * Get all playlists
   */
  async getPlaylists(): Promise<Playlist[]> {
    try {
      const result = await this.browseMedia();
      
      // Look for playlists in the browse result
      const playlists: Playlist[] = [];
      
      if (result.children) {
        for (const child of result.children) {
          // Check if this is a playlists container
          if (child.media_content_id?.includes('playlists') || 
              child.title?.toLowerCase() === 'playlists') {
            // Browse into playlists
            const playlistsResult = await this.browseMedia(
              child.media_content_id,
              child.media_content_type
            );
            
            if (playlistsResult.children) {
              for (const playlist of playlistsResult.children) {
                playlists.push({
                  uri: playlist.media_content_id || '',
                  name: playlist.title,
                  trackCount: 0, // Will be populated on detail view
                });
              }
            }
          }
        }
      }
      
      return playlists;
    } catch (error) {
      console.error('Error fetching playlists:', error);
      return [];
    }
  }

  /**
   * Get a specific playlist with track details
   */
  async getPlaylist(uri: string): Promise<PlaylistDetail | null> {
    try {
      const result = await this.browseMedia(uri);
      
      const tracks: Track[] = [];
      let trackNo = 1;
      
      if (result.children) {
        for (const child of result.children) {
          tracks.push({
            uri: child.media_content_id || '',
            name: child.title,
            artists: this.extractArtists(child),
            album: this.extractAlbum(child),
            duration: this.extractDuration(child),
            trackNo: trackNo++,
          });
        }
      }
      
      return {
        uri,
        name: result.title,
        tracks,
        trackCount: tracks.length,
        duration: this.calculateTotalDuration(tracks),
      };
    } catch (error) {
      console.error('Error fetching playlist:', error);
      return null;
    }
  }

  /**
   * Get the current queue
   */
  async getQueue(): Promise<QueueItem[]> {
    try {
      const entity = this.hass.states[this.entityId];
      if (!entity) return [];
      
      const queue = entity.attributes.queue as unknown;
      if (!Array.isArray(queue)) return [];
      
      return queue.map((item: Record<string, unknown>, index: number) => ({
        uri: item.uri as string || '',
        name: item.title as string || item.name as string || 'Unknown',
        artists: item.artist as string[] || (item.artist ? [item.artist as string] : []),
        album: item.album as string,
        duration: item.duration as number,
        position: index,
        trackId: (item.track_id as string | number) ?? index,
      }));
    } catch (error) {
      console.error('Error fetching queue:', error);
      return [];
    }
  }

  /**
   * Create a new empty playlist
   */
  async createPlaylist(name: string, uriScheme?: string): Promise<void> {
    await this.callService(`${this.entityName}_create_playlist`, {
      name,
      uri_scheme: uriScheme,
    });
  }

  /**
   * Delete a playlist
   */
  async deletePlaylist(uri: string): Promise<void> {
    await this.callService(`${this.entityName}_delete_playlist`, {
      uri,
    });
  }

  /**
   * Rename a playlist
   */
  async renamePlaylist(uri: string, name: string): Promise<void> {
    await this.callService(`${this.entityName}_rename_playlist`, {
      uri,
      name,
    });
  }

  /**
   * Add tracks to a playlist
   */
  async addToPlaylist(
    playlistUri: string,
    trackUris: string[],
    position?: number
  ): Promise<void> {
    await this.callService(`${this.entityName}_add_to_playlist`, {
      playlist_uri: playlistUri,
      track_uris: trackUris,
      position,
    });
  }

  /**
   * Remove tracks from a playlist
   */
  async removeFromPlaylist(
    playlistUri: string,
    positions: number[]
  ): Promise<void> {
    await this.callService(`${this.entityName}_remove_from_playlist`, {
      playlist_uri: playlistUri,
      positions,
    });
  }

  /**
   * Move tracks within a playlist
   */
  async moveInPlaylist(
    playlistUri: string,
    start: number,
    end: number,
    newPosition: number
  ): Promise<void> {
    await this.callService(`${this.entityName}_move_in_playlist`, {
      playlist_uri: playlistUri,
      start,
      end,
      new_position: newPosition,
    });
  }

  /**
   * Clear all tracks from a playlist
   */
  async clearPlaylist(uri: string): Promise<void> {
    await this.callService(`${this.entityName}_clear_playlist`, {
      uri,
    });
  }

  /**
   * Save current queue as a new playlist
   */
  async saveQueueToPlaylist(name: string, uriScheme?: string): Promise<void> {
    await this.callService(`${this.entityName}_save_queue_to_playlist`, {
      name,
      uri_scheme: uriScheme,
    });
  }

  /**
   * Play a playlist
   */
  async playPlaylist(uri: string): Promise<void> {
    await this.hass.callService('media_player', 'play_media', {
      entity_id: this.entityId,
      media_content_id: uri,
      media_content_type: 'playlist',
    });
  }

  /**
   * Play a specific track
   */
  async playTrack(uri: string): Promise<void> {
    await this.hass.callService('media_player', 'play_media', {
      entity_id: this.entityId,
      media_content_id: uri,
      media_content_type: 'music',
    });
  }

  // Helper methods

  private extractArtists(media: BrowseMedia): string[] {
    // Artists might be in the title or we need to parse from somewhere else
    // This depends on how Mopidy returns the data
    const title = media.title || '';
    const parts = title.split(' - ');
    if (parts.length > 1) {
      return [parts[0]];
    }
    return [];
  }

  private extractAlbum(_media: BrowseMedia): string | undefined {
    // Album extraction depends on the data structure
    return undefined;
  }

  private extractDuration(_media: BrowseMedia): number | undefined {
    // Duration might be encoded in the title or elsewhere
    return undefined;
  }

  private calculateTotalDuration(tracks: Track[]): number {
    return tracks.reduce((total, track) => total + (track.duration || 0), 0);
  }
}
