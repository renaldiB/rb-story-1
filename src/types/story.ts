export type GenreType =
  | 'romance'
  | 'horror'
  | 'mystery'
  | 'thriller'
  | 'fantasy'
  | 'cyberpunk'
  | 'slice_of_life'
  | 'adventure'
  | 'historical';

export type Expression =
  | 'neutral'
  | 'happy'
  | 'smiling'
  | 'sad'
  | 'crying'
  | 'angry'
  | 'embarrassed'
  | 'surprised'
  | 'confused'
  | 'nervous'
  | 'serious'
  | 'romantic'
  | 'exhausted'
  | 'scared'
  | 'menacing';

export type CharacterPosition = 'left' | 'center' | 'right' | 'foreground' | 'background';

export interface CharacterLayer {
  assetId: string;
  characterId: string;
  position: {
    x: number;
    y: number;
  };
  scale: number;
  zIndex: number;
  opacity?: number;
  flipX?: boolean;
  animation?: string;
}
export interface EnvironmentLayerDef {
  assetId?: string;
  src?: string;
  parallax?: number;
  offsetX?: number;
  offsetY?: number;
  scale?: number;
  opacity?: number;
  zIndex?: number;
}

export interface EnvironmentDefinition {
  background?: string | EnvironmentLayerDef;
  midground?: EnvironmentLayerDef[];
  foreground?: EnvironmentLayerDef[];
  lighting?: string;
  atmosphere?: string;
}

export interface SceneCharacter {
  id: string;
  characterId?: string;
  name: string;
  expression: Expression | string;
  position: CharacterPosition;
  isSpeaking?: boolean;
  pose?: string;
  scale?: number;
  zIndex?: number;
  flipX?: boolean;
  visible?: boolean;
  customPosition?: { x: number; y: number };
  normalizedPosition?: { x: number; y: number };
  enterTransition?: 'instant' | 'fade' | 'slide' | 'scale';
  exitTransition?: 'instant' | 'fade' | 'slide' | 'scale';
}

export type TimeOfDay = 'morning' | 'afternoon' | 'sunset' | 'night' | 'midnight';
export type WeatherType = 'clear' | 'rain' | 'overcast' | 'stars' | 'fog' | 'storm' | 'embers';
export type SceneMood = 'romance' | 'mystery' | 'sadness' | 'tension' | 'peaceful' | 'horror' | 'wonder' | 'cyber';

export interface VisualBible {
  artStyle: string;
  renderStyle: string;
  colorLanguage: string;
  lightingLanguage: string;
  cameraLanguage: 'slow_push' | 'drift' | 'shake' | 'static' | 'dynamic';
  particleLanguage: 'rain' | 'motes' | 'fog' | 'glitch' | 'sparks' | 'none';
  uiLanguage: 'minimal_warm' | 'dark_grit' | 'neon_hud' | 'parchment';
  soundLanguage: 'intimate_lofi' | 'dark_drone' | 'synthwave' | 'celestial';
}

export interface LocationInfo {
  id: string;
  name: string;
  time: TimeOfDay;
  weather: WeatherType;
  mood: SceneMood;
}

export interface MultiDimRelationships {
  trust: number;
  affection: number;
  suspicion: number;
  fear: number;
  respect: number;
  intimacy: number;
  [key: string]: number;
}

export interface VariableDelta {
  trust?: number;
  affection?: number;
  suspicion?: number;
  fear?: number;
  respect?: number;
  intimacy?: number;
  vulnerability?: number;
  [key: string]: number | undefined;
}

export interface ChoiceOption {
  id: string;
  text: string;
  subtext?: string;
  nextSceneId: string;
  effects?: VariableDelta;
  setFlags?: string[];
  cameraCue?: 'slow_push' | 'shake' | 'drift';
  requiredCondition?: {
    variable?: keyof MultiDimRelationships | string;
    operator?: '>=' | '<=' | '==' | '>' | '<';
    value?: number;
    flag?: string;
  };
}

export type DiegeticType = 'phone' | 'recorder' | 'terminal' | 'grimoire';

export interface DiegeticItem {
  id: string;
  type: DiegeticType;
  title: string;
  snippet: string;
  content: {
    sender?: string;
    timestamp?: string;
    body: string;
    extraNote?: string;
  };
  flagToUnlock: string;
}

export interface ForeshadowItem {
  id: string;
  name: string;
  description: string;
  icon: string;
  flagToUnlock: string;
  unlockedHint?: string;
}

export interface StoryScene {
  id: string;
  chapterId: string;
  chapterTitle: string;
  progressPercent: number;
  location: LocationInfo;
  characters: SceneCharacter[];
  environment?: EnvironmentDefinition;
  transition?: { type: string; duration?: number; easing?: string };
  actionCG?: string;
  foreshadowItem?: ForeshadowItem;
  diegeticItem?: DiegeticItem;
  speaker: string | null;
  text: string;
  subText?: string;
  choices?: ChoiceOption[];
  nextSceneId?: string;
  soundEffect?: 'click' | 'rain_start' | 'page_turn' | 'heartbeat' | 'wind' | 'chime' | 'door' | 'glitch' | 'static' | 'whisper';
  ambientTrack?: 'rain_cafe' | 'night_street' | 'room_silence' | 'station_twilight' | 'dark_hospital' | 'cyber_sector' | 'celestial_archive';
  emotionalIntensity?: number;
  cameraAction?: 'slow_push' | 'shake' | 'drift' | 'static';
  endingId?: string;
}

export interface StoryDefinition {
  id: string;
  title: string;
  subtitle: string;
  genre: GenreType;
  synopsis: string;
  visualBible: VisualBible;
  firstSceneId: string;
  scenes: Record<string, StoryScene>;
  endings: Record<string, EndingDef>;
}

export interface StoryState {
  currentStoryId: string;
  currentSceneId: string;
  currentChapterId: string;
  variables: MultiDimRelationships;
  flags: Record<string, boolean>;
  discoveredSecrets: string[];
  history: Array<{
    sceneId: string;
    speaker: string | null;
    text: string;
    timestamp: number;
  }>;
  unlockedEndings: string[];
}

export interface SaveSlot {
  id: string;
  timestamp: number;
  storyTitle: string;
  chapterTitle: string;
  scenePreview: string;
  state: StoryState;
}

export interface EndingDef {
  id: string;
  title: string;
  type: 'true' | 'romantic' | 'bittersweet' | 'secret' | 'tragic' | 'escape';
  tagline: string;
  poem: string;
  summary: string;
  unlockedCondition: string;
}
