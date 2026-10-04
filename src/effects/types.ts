
export type CanonicalPropId =
  | 'prop_phone'
  | 'prop_coffee'
  | 'prop_old_photo'
  | 'prop_train_ticket'
  | 'prop_backpack'
  | 'prop_lighter_antique'
  | 'prop_laptop'
  | 'prop_agus_cat'
  | 'prop_dog_rescue';

export type CanonicalFxId =
  | 'fx_rain_procedural'
  | 'fx_fog_mist'
  | 'fx_dust_motes'
  | 'fx_screen_glow_late_night'
  | 'fx_cinematic_vignette';

export type PropCategory =
  | 'STATIC_REUSABLE'
  | 'DYNAMIC_REUSABLE'
  | 'CHARACTER_HELD'
  | 'INTERACTIVE';

export interface PropAnchor {
  name: 'table_contact_point' | 'hand_grip' | 'bottom-center' | 'center' | string;
  x: number;
  y: number;
}

export interface PropDimensions {
  width: number;
  height: number;
  aspectRatio: string;
}

export interface PropDefinition {
  id: CanonicalPropId;
  name: string;
  category: PropCategory[];
  description: string;
  scenes: string[];
  dimensions: PropDimensions;
  anchor: PropAnchor;
  scale: number;
  states: string[];
  interactive: boolean;
  priority: 'P0' | 'P1' | 'P2';
  assetPng: string;
  assetWebp: string;
  fileSizeBytes?: {
    png: number;
    webp: number;
  };
  checksumSha256: {
    png: string;
    webp: string;
  };
}

export interface AtmosphereFxDefinition {
  id: CanonicalFxId;
  name: string;
  type: string;
  layer: 'background' | 'midground' | 'near_fg' | 'mid_foreground' | 'foreground_frame';
  zIndex: number;
  implementation: string;
  scenes: string[];
  parameters: Record<string, unknown>;
  mobileBehavior: string;
  reducedMotionBehavior: string;
  performance: string;
  cleanup: string;
}

export interface PropRegistry {
  version: string;
  storyId: string;
  theme: string;
  totalProps: number;
  contactSheet: string;
  props: PropDefinition[];
}

export interface AtmosphereFxRegistry {
  version: string;
  storyId: string;
  theme: string;
  totalFxSystems: number;
  systems: AtmosphereFxDefinition[];
}
