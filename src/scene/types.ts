import type {
  SceneDefinition,
  ChoiceDefinition,
  DialogueNode,
} from '../core/schema/story.schema.ts';

export type SceneLifecycleState =
  | 'SCENE_ENTER'
  | 'SCENE_LOAD'
  | 'ASSET_READY'
  | 'SCENE_ACTIVE'
  | 'USER_INTERACTION'
  | 'SCENE_COMPLETE'
  | 'SCENE_EXIT'
  | 'NEXT_SCENE';

export type SemanticLayer =
  | 'background'
  | 'environment_far'
  | 'environment_mid'
  | 'character'
  | 'environment_near'
  | 'foreground'
  | 'ui';

export const SEMANTIC_Z_INDEX: Record<SemanticLayer, number> = {
  background: 0,
  environment_far: 10,
  environment_mid: 20,
  character: 30,
  environment_near: 40,
  foreground: 50,
  ui: 100,
};

export interface LayerMotion {
  parallax?: number;
  offsetX?: number;
  offsetY?: number;
  scale?: number;
}

export interface StoryThemeColors {
  background: string;
  surface: string;
  text: string;
  primary: string;
  secondary: string;
  accent: string;
  border: string;
  vignette?: string;
}

export interface StoryTheme {
  id: string;
  name: string;
  genre: string;
  colors: StoryThemeColors;
  typography: {
    fontFamily: string;
    fontSize: string;
  };
  dialogue: {
    bgClass: string;
    borderClass: string;
    speakerColorClass: string;
    textColorClass: string;
  };
  transitions: {
    defaultType: string;
    defaultDuration: number;
  };
}

export interface SceneAssetLoadReport {
  totalAssets: number;
  loadedAssets: number;
  failedAssets: string[];
  durationMs: number;
  status: 'SUCCESS' | 'PARTIAL' | 'FAILED';
}

export interface SceneCompositionState {
  currentSceneId: string;
  lifecycle: SceneLifecycleState;
  activeDialogueIndex: number;
  currentDialogue: DialogueNode | null;
  availableChoices: ChoiceDefinition[];
  isComplete: boolean;
  activeSpeakerId: string | null;
}

export interface SceneComposerProps {
  scene: SceneDefinition;
  theme?: StoryTheme;
  runtimeState?: SceneCompositionState;
  reducedMotion?: boolean;
  parallaxOffset?: { x: number; y: number };
  onDialogueAdvance?: () => void;
  onChoiceSelect?: (choice: ChoiceDefinition) => void;
  onSceneComplete?: () => void;
  showDebug?: boolean;
}
