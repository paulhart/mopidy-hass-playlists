/**
 * Playlist data model
 */
export interface Playlist {
  /** Unique playlist URI - e.g., m3u:my_playlist.m3u */
  uri: string;
  /** Display name of the playlist */
  name: string;
  /** Number of tracks in the playlist */
  trackCount?: number;
  /** Last modification timestamp */
  lastModified?: string;
  /** Media content type for browsing - needed to browse playlist details */
  mediaContentType?: string;
}

/**
 * Detailed playlist with track information
 */
export interface PlaylistDetail extends Playlist {
  /** List of tracks in the playlist */
  tracks: Track[];
  /** Total duration in seconds */
  duration?: number;
}

/**
 * Track data model
 */
export interface Track {
  /** Unique track URI */
  uri: string;
  /** Track title */
  name: string;
  /** Artist names */
  artists?: string[];
  /** Album name */
  album?: string;
  /** Duration in seconds */
  duration?: number;
  /** Track number in playlist (1-indexed) */
  trackNo?: number;
}

/**
 * Queue item from the current playback queue
 */
export interface QueueItem extends Track {
  /** Position in queue (0-indexed) */
  position: number;
  /** Track ID in queue */
  trackId: number | string;
}
