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

declare global {
  interface Window {
    customCards?: Array<{ type: string; name: string; description?: string }>;
    loadCardHelpers?: () => Promise<void>;
  }
}
