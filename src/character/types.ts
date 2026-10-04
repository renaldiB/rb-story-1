export type CharacterGenre =
  | 'secondary'
  | 'primary'
  | 'npc'
  | 'special';

export type PrimaryCharacterId = 'nana' | 'agus';

export type SecondaryCharacterId =
  | 'kaka'
  | 'raka'
  | 'dita'
  | 'fikri'
  | 'maya'
  | 'bimo'
  | 'ibu'
  | 'ayah';

export type CharacterId = PrimaryCharacterId | SecondaryCharacterId | string;

export type CharacterVariantCategory = 'expression' | 'pose' | 'special';

export type CharacterVariantPriority = 'P0' | 'P1' | 'P2' | 'P3';

export type CharacterVariantStatus = 'PASS' | 'FAILED' | 'PLANNED';

export type CharacterLifecycleState =
  | 'HIDDEN'
  | 'ENTERING'
  | 'VISIBLE'
  | 'TRANSITIONING'
  | 'EXITING';

export interface CharacterVariant {
  id: string;
  characterId: string;
  category: CharacterVariantCategory;
  state: string;
  intensity?: 'low' | 'medium' | 'high';
  pose?: string;
  file: string;
  priority: CharacterVariantPriority;
  status: CharacterVariantStatus;
}

export interface SecondaryCharacter {
  id: string;
  name: string;
  type: CharacterGenre;
  sourceMaster: string;
  spriteMaster: string;
  width: number;
  height: number;
  format: string;
  alpha: boolean;
  status: 'PASS' | 'FAILED';
  canonicalScale: number;
  baseHeight: number;
  baselineY: number;
  variants: CharacterVariant[];
}

export type CharacterDefinition = SecondaryCharacter;

export interface VariantResolutionQuery {
  characterId: string;
  expression?: string;
  pose?: string;
  intensity?: 'low' | 'medium' | 'high';
}

export interface ResolvedCharacterVariant {
  variantId: string;
  characterId: string;
  assetPath: string;
  source: 'variant' | 'master' | 'fallback';
  fallback: boolean;
  reason?: string;
  category?: CharacterVariantCategory;
  state?: string;
  width: number;
  height: number;
  baselineY: number;
  canonicalScale: number;
}

export interface CharacterRuntimeState {
  characterId: string;
  visible: boolean;
  expression?: string;
  pose?: string;
  intensity?: 'low' | 'medium' | 'high';
  x: number;
  y: number;
  scale: number;
  opacity: number;
}
