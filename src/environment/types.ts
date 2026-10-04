
export type EnvironmentMasterId =
  | 'env_campus_cafe_master'
  | 'env_street_night_master'
  | 'env_nana_bedroom_master'
  | 'env_agus_room_master'
  | 'env_station_master'
  | 'env_rooftop_master'
  | 'env_campus_master'
  | 'env_office_master'
  | 'env_beach_master'
  | 'env_mountain_master'
  | 'env_nana_house_master'
  | 'env_shared_apartment_master';

export type EnvironmentLocationId =
  | 'loc_campus_cafe'
  | 'loc_street_night'
  | 'loc_nana_bedroom'
  | 'loc_agus_room'
  | 'loc_station'
  | 'loc_rooftop'
  | 'loc_campus'
  | 'loc_office'
  | 'loc_beach'
  | 'loc_mountain'
  | 'loc_nana_house'
  | 'loc_shared_apartment';

export type EnvironmentLayerType =
  | 'background'
  | 'midground'
  | 'character_space'
  | 'foreground'
  | 'atmosphere';

export interface EnvironmentLayerDefinition {
  layerId: string;
  type: EnvironmentLayerType;
  semanticZ: number;
  parallaxFactor?: number;
  assetType?: string;
  targetFile?: string;
  description?: string;
  asset?: string;
  fileSizeBytes?: number;
  checksumSha256?: string;
  alpha?: boolean;
  baselineY?: number;
}

export type VariantMode = 'raster' | 'runtime';

export interface EnvironmentVariantDefinition {
  variantId: string;
  time?: string;
  weather?: string;
  lighting?: string;
  scenes?: string[];
  mode: VariantMode;
  variantType: string;
  status: string;
  asset?: string;
  cssFilter?: string;
  fileSizeBytes?: number;
  checksumSha256?: string;
}

export interface CameraState {
  framing: string;
  fov: string;
  aspectRatio: string;
  focalPoint: string;
  zoom?: number;
  panOffset?: { x: number; y: number };
}

export interface SafeZoneBox {
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface EnvironmentSafeZones {
  character: SafeZoneBox;
  dialogue: SafeZoneBox;
  uiHeader?: SafeZoneBox;
}

export interface EnvironmentDefinition {
  id: EnvironmentMasterId;
  name: string;
  locationId: EnvironmentLocationId;
  type: string;
  priority: 'P0' | 'P1' | 'P2';
  baseResolution: { width: number; height: number };
  portraitResolution: { width: number; height: number };
  preferredFormat: string;
  reuseCount: number;
  layers: string[];
  layerDefinitions: EnvironmentLayerDefinition[];
  camera: CameraState;
  safeZones: EnvironmentSafeZones;
  variants: EnvironmentVariantDefinition[];
  scenes: string[];
  masterAsset: string;
  masterAssetJpg: string;
  dimensions: { width: number; height: number; aspectRatio: string };
  status: string;
  lockStatus: string;
  checksumSha256: { jpg: string; webp: string };
  fileSizeBytes: { jpg: number; webp: number };
}

export interface ResolvedEnvironment {
  environment: EnvironmentDefinition;
  activeVariant?: EnvironmentVariantDefinition;
  isFallback: boolean;
  fallbackReason?: string;
  backgroundUrl: string;
  cssFilter?: string;
  layers: EnvironmentLayerDefinition[];
  safeZones: EnvironmentSafeZones;
  camera: CameraState;
}

export interface EnvironmentRuntimeOptions {
  variantId?: string;
  time?: string;
  weather?: string;
  reducedMotion?: boolean;
  preloadLayers?: boolean;
}

export type EnvironmentLoadStatus = 'IDLE' | 'LOADING' | 'READY' | 'ERROR';

export interface EnvironmentInstance {
  id: string;
  resolved: ResolvedEnvironment;
  status: EnvironmentLoadStatus;
  loadedLayers: string[];
  lastUsed: number;
}
