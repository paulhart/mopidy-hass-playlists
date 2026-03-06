import type { HomeAssistant, BrowseMedia } from '../types/home-assistant';
import type { Playlist, PlaylistDetail, Track, QueueItem } from '../models/playlist';

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
    log('MopidyService constructed with entity:', entity);
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
    log('Calling service:', this.serviceDomain, '.', service, 'with data:', data);
    try {
      await this.hass.callService(this.serviceDomain, service, data);
      log('Service call successful:', service);
    } catch (error) {
      logError('Service call failed:', service, error);
      throw error;
    }
  }

  /**
   * Browse media using Home Assistant's media browser
   */
  private async browseMedia(
    mediaContentId?: string,
    mediaContentType?: string
  ): Promise<BrowseMedia> {
    log('browseMedia called with:', { mediaContentId, mediaContentType });
    try {
      const result = await this.hass.callWS<BrowseMedia>({
        type: 'media_player/browse_media',
        entity_id: this.entityId,
        media_content_id: mediaContentId,
        media_content_type: mediaContentType,
      });
      log('browseMedia result:', result);
      return result;
    } catch (error) {
      logError('browseMedia failed:', error);
      throw error;
    }
  }

  /**
   * Get all playlists
   */
  async getPlaylists(): Promise<Playlist[]> {
    log('getPlaylists called');
    try {
      const result = await this.browseMedia();
      log('Root browse result:', result);
      
      // Look for playlists in the browse result
      const playlists: Playlist[] = [];
      
      if (result.children) {
        log('Root has', result.children.length, 'children:');
        result.children.forEach((child, index) => {
          log(`  Child ${index}:`, {
            title: child.title,
            media_content_id: child.media_content_id,
            media_content_type: child.media_content_type,
            can_play: child.can_play,
            can_expand: child.can_expand,
            children_media_class: child.children_media_class,
            media_class: child.media_class,
          });
        });
        
        for (const child of result.children) {
          // Check if this is a playlists container
          const isPlaylistsContainer = 
            child.media_content_id?.includes('playlists') || 
            child.title?.toLowerCase() === 'playlists';
          
          log('Checking child for playlists:', child.title, 'isPlaylistsContainer:', isPlaylistsContainer);
          
          if (isPlaylistsContainer) {
            log('Found playlists container, browsing into it...');
            // Browse into playlists
            const playlistsResult = await this.browseMedia(
              child.media_content_id,
              child.media_content_type
            );
            
            log('Playlists container result:', playlistsResult);
            
            if (playlistsResult.children) {
              log('Found', playlistsResult.children.length, 'items in playlists container');
              for (const playlist of playlistsResult.children) {
                log('Adding playlist:', playlist.title, 'uri:', playlist.media_content_id, 'contentType:', playlist.media_content_type);
                playlists.push({
                  uri: playlist.media_content_id || '',
                  name: playlist.title,
                  trackCount: 0, // Will be populated on detail view
                  mediaContentType: playlist.media_content_type,
                });
              }
            }
          }
        }
      } else {
        log('Root result has no children');
      }
      
      log('getPlaylists returning', playlists.length, 'playlists');
      return playlists;
    } catch (error) {
      logError('Error fetching playlists:', error);
      return [];
    }
  }

  /**
   * Get a specific playlist with track details
   */
  async getPlaylist(uri: string, mediaContentType?: string): Promise<PlaylistDetail | null> {
    log('getPlaylist called with uri:', uri, 'mediaContentType:', mediaContentType);
    try {
      const result = await this.browseMedia(uri, mediaContentType);
      log('Playlist browse result:', result);
      
      const tracks: Track[] = [];
      let trackNo = 1;
      
      if (result.children) {
        log('Playlist has', result.children.length, 'tracks');
        for (const child of result.children) {
          const track: Track = {
            uri: child.media_content_id || '',
            name: child.title,
            artists: this.extractArtists(child),
            album: this.extractAlbum(child),
            duration: this.extractDuration(child),
            trackNo: trackNo++,
          };
          log('Track', trackNo - 1, ':', track);
          tracks.push(track);
        }
      } else {
        log('Playlist has no children/tracks');
      }
      
      const playlistDetail: PlaylistDetail = {
        uri,
        name: result.title,
        tracks,
        trackCount: tracks.length,
        duration: this.calculateTotalDuration(tracks),
      };
      
      log('getPlaylist returning:', playlistDetail);
      return playlistDetail;
    } catch (error) {
      logError('Error fetching playlist:', error);
      return null;
    }
  }

  /**
   * Get the current queue by browsing the queue: media content
   */
  async getQueue(): Promise<QueueItem[]> {
    log('getQueue called for entity:', this.entityId);
    try {
      // Use media browser to get queue - browse the "queue:" content ID
      const result = await this.browseMedia('queue:', 'playlist');
      log('Queue browse result:', result);
      
      if (!result || !result.children) {
        log('Queue browse returned no children');
        return [];
      }
      
      log('Queue has', result.children.length, 'items');
      
      const queueItems: QueueItem[] = [];
      let position = 0;
      
      for (const child of result.children) {
        const queueItem: QueueItem = {
          uri: child.media_content_id || '',
          name: child.title,
          artists: this.extractArtists(child),
          album: this.extractAlbum(child),
          duration: this.extractDuration(child),
          position: position,
          trackId: position, // Use position as track ID since we don't have the actual ID
        };
        log('Queue item', position, ':', queueItem);
        queueItems.push(queueItem);
        position++;
      }
      
      log('getQueue returning', queueItems.length, 'items');
      return queueItems;
    } catch (error) {
      logError('Error fetching queue:', error);
      return [];
    }
  }

  /**
   * Create a new empty playlist
   */
  async createPlaylist(name: string, uriScheme?: string): Promise<void> {
    log('createPlaylist called:', { name, uriScheme });
    await this.callService(`${this.entityName}_create_playlist`, {
      name,
      uri_scheme: uriScheme,
    });
  }

  /**
   * Delete a playlist
   */
  async deletePlaylist(uri: string): Promise<void> {
    log('deletePlaylist called:', { uri });
    await this.callService(`${this.entityName}_delete_playlist`, {
      uri,
    });
  }

  /**
   * Rename a playlist
   */
  async renamePlaylist(uri: string, name: string): Promise<void> {
    log('renamePlaylist called:', { uri, name });
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
    log('addToPlaylist called:', { playlistUri, trackUris, position });
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
    log('removeFromPlaylist called:', { playlistUri, positions });
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
    log('moveInPlaylist called:', { playlistUri, start, end, newPosition });
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
    log('clearPlaylist called:', { uri });
    await this.callService(`${this.entityName}_clear_playlist`, {
      uri,
    });
  }

  /**
   * Save current queue as a new playlist
   */
  async saveQueueToPlaylist(name: string, uriScheme?: string): Promise<void> {
    log('saveQueueToPlaylist called:', { name, uriScheme });
    await this.callService(`${this.entityName}_save_queue_to_playlist`, {
      name,
      uri_scheme: uriScheme,
    });
  }

  /**
   * Play a playlist
   */
  async playPlaylist(uri: string): Promise<void> {
    log('playPlaylist called:', { uri });
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
    log('playTrack called:', { uri });
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
