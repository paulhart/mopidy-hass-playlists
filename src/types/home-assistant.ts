/**
 * Home Assistant type definitions
 * These are minimal types needed for the card to function
 */

export interface HomeAssistant {
  connection: {
    subscribeMessage: (
      callback: (msg: unknown) => void,
      params: { type: string; [key: string]: unknown }
    ) => Promise<() => void>;
    sendMessagePromise: (
      msg: Record<string, unknown>
    ) => Promise<unknown>;
  };
  states: Record<string, HassEntity>;
  callService: (
    domain: string,
    service: string,
    serviceData?: Record<string, unknown>
  ) => Promise<void>;
  callWS: <T = unknown>(msg: Record<string, unknown>) => Promise<T>;
  locale?: {
    language: string;
  };
  themes?: {
    darkMode: boolean;
  };
}

export interface HassEntity {
  entity_id: string;
  state: string;
  attributes: Record<string, unknown>;
  last_changed: string;
  last_updated: string;
}

export interface LovelaceCard {
  hass?: HomeAssistant;
  setConfig(config: Record<string, unknown>): void;
  getCardSize(): number | Promise<number>;
}

export interface LovelaceCardEditor extends LovelaceCard {
  setConfig(config: Record<string, unknown>): void;
}

export interface LovelaceCardConfig {
  type: string;
  [key: string]: unknown;
}

export interface BrowseMedia {
  title: string;
  media_class: string;
  media_content_type: string;
  media_content_id: string;
  can_play: boolean;
  can_expand: boolean;
  can_search?: boolean;
  children_media_class?: string;
  children?: BrowseMedia[];
  thumbnail?: string | null;
  not_shown?: number;
}

export interface BrowseMediaQuery {
  media_content_type?: string;
  media_content_id?: string;
}

/**
 * Search query for mopidyhass search service
 */
export interface SearchQuery {
  /** Simple string query or field-specific search object */
  query: string | {
    artist?: string[];
    album?: string[];
    track_name?: string[];
    performer?: string[];
    composer?: string[];
    genre?: string[];
    date?: string[];
    comment?: string[];
    uri?: string[];
    any?: string[];
  };
  /** Whether to match exactly (default: false) */
  exact?: boolean;
  /** Maximum number of results per category (default: 10) */
  limit?: number;
}

/**
 * Search result from mopidyhass search service
 */
export interface SearchResult {
  albums: SearchAlbum[];
  artists: SearchArtist[];
  tracks: SearchTrack[];
}

/**
 * Album in search results
 */
export interface SearchAlbum {
  uri: string;
  name: string;
  artists?: string[];
  num_tracks?: number;
}

/**
 * Artist in search results
 */
export interface SearchArtist {
  uri: string;
  name: string;
}

/**
 * Track in search results
 */
export interface SearchTrack {
  uri: string;
  name: string;
  artists?: string[];
  album?: string;
  duration?: number;
  track_no?: number;
  disc_no?: number;
  date?: string;
}

declare global {
  interface Window {
    customCards?: Array<{ type: string; name: string; description?: string }>;
    loadCardHelpers?: () => Promise<void>;
  }
}
