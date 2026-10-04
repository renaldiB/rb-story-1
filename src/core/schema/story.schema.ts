import { z } from 'zod';

export const ComparisonOperatorSchema = z.enum([
  '==',
  '!=',
  '>',
  '<',
  '>=',
  '<=',
  'flagSet',
  'flagUnset'
]);
export type ComparisonOperator = z.infer<typeof ComparisonOperatorSchema>;

export interface ConditionDefinition {
  variable?: string;
  operator?: ComparisonOperator;
  value?: number | string | boolean;
  flag?: string;
  and?: ConditionDefinition[];
  or?: ConditionDefinition[];
  not?: ConditionDefinition;
}

export const ConditionSchema: z.ZodType<ConditionDefinition> = z.lazy(() =>
  z.object({
    variable: z.string().optional(),
    operator: ComparisonOperatorSchema.optional(),
    value: z.union([z.number(), z.string(), z.boolean()]).optional(),
    flag: z.string().optional(),
    and: z.array(ConditionSchema).optional(),
    or: z.array(ConditionSchema).optional(),
    not: ConditionSchema.optional(),
  })
);

export const ActionSchema = z.object({
  type: z.enum(['setVariable', 'addVariable', 'setFlag', 'clearFlag', 'playSound', 'triggerEvent']),
  target: z.string(),
  value: z.union([z.number(), z.string(), z.boolean()]).optional(),
});
export type ActionDefinition = z.infer<typeof ActionSchema>;

export const VisualBibleSchema = z.object({
  artStyle: z.string(),
  renderStyle: z.string(),
  colorLanguage: z.string(),
  lightingLanguage: z.string(),
  cameraLanguage: z.enum(['slow_push', 'drift', 'shake', 'static', 'dynamic']),
  particleLanguage: z.enum(['rain', 'motes', 'fog', 'glitch', 'sparks', 'none']),
  uiLanguage: z.enum(['minimal_warm', 'dark_grit', 'neon_hud', 'parchment']),
  soundLanguage: z.enum(['intimate_lofi', 'dark_drone', 'synthwave', 'celestial']),
});
export type VisualBibleDefinition = z.infer<typeof VisualBibleSchema>;

export const CharacterExpressionSchema = z.enum([
  'neutral',
  'happy',
  'smiling',
  'sad',
  'crying',
  'angry',
  'embarrassed',
  'surprised',
  'confused',
  'nervous',
  'serious',
  'romantic',
  'exhausted',
  'scared',
  'menacing',
]);

export const CharacterPositionSchema = z.enum([
  'left',
  'center',
  'right',
  'foreground',
  'background',
]);

export const CharacterSchema = z.object({
  id: z.string(),
  name: z.string(),
  avatarUrl: z.string().optional(),
  color: z.string().optional(),
  defaultExpression: CharacterExpressionSchema.optional(),
});
export type CharacterDefinition = z.infer<typeof CharacterSchema>;

export const EnvironmentLayerSchema = z.object({
  assetId: z.string().optional(),
  src: z.string().optional(),
  parallax: z.number().default(0),
  offsetX: z.number().default(0),
  offsetY: z.number().default(0),
  scale: z.number().default(1),
  opacity: z.number().default(1),
  zIndex: z.number().optional(),
});
export type EnvironmentLayerDefinition = z.infer<typeof EnvironmentLayerSchema>;

export const EnvironmentDefinitionSchema = z.object({
  background: z.union([z.string(), EnvironmentLayerSchema]).optional(),
  midground: z.array(EnvironmentLayerSchema).optional(),
  foreground: z.array(EnvironmentLayerSchema).optional(),
  lighting: z.string().optional(),
  atmosphere: z.string().optional(),
});
export type EnvironmentDefinition = z.infer<typeof EnvironmentDefinitionSchema>;

export const SceneCharacterSchema = z.object({
  id: z.string(),
  characterId: z.string().optional(),
  name: z.string(),
  expression: z.string(),
  position: CharacterPositionSchema.optional().default('center'),
  normalizedPosition: z.object({ x: z.number(), y: z.number() }).optional(),
  pose: z.string().optional(),
  scale: z.number().optional(),
  zIndex: z.number().optional(),
  flipX: z.boolean().optional(),
  isSpeaking: z.boolean().optional(),
  visible: z.boolean().optional().default(true),
  enterTransition: z.enum(['instant', 'fade', 'slide', 'scale']).optional(),
  exitTransition: z.enum(['instant', 'fade', 'slide', 'scale']).optional(),
});
export type SceneCharacterDefinition = z.infer<typeof SceneCharacterSchema>;

export const ChoiceSchema = z.object({
  id: z.string(),
  text: z.string(),
  subtext: z.string().optional(),
  nextSceneId: z.string(),
  effects: z.record(z.string(), z.number()).optional(),
  setFlags: z.array(z.string()).optional(),
  actions: z.array(ActionSchema).optional(),
  requiredCondition: ConditionSchema.optional(),
  cameraCue: z.enum(['slow_push', 'shake', 'drift']).optional(),
});
export type ChoiceDefinition = z.infer<typeof ChoiceSchema>;

export const DiegeticItemSchema = z.object({
  id: z.string(),
  type: z.enum(['phone', 'recorder', 'terminal', 'grimoire']),
  title: z.string(),
  snippet: z.string(),
  content: z.object({
    sender: z.string().optional(),
    timestamp: z.string().optional(),
    body: z.string(),
    extraNote: z.string().optional(),
  }),
  flagToUnlock: z.string(),
});
export type DiegeticItemDefinition = z.infer<typeof DiegeticItemSchema>;

export const ForeshadowItemSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string(),
  icon: z.string(),
  flagToUnlock: z.string(),
  unlockedHint: z.string().optional(),
});
export type ForeshadowItemDefinition = z.infer<typeof ForeshadowItemSchema>;

export const DialogueNodeSchema = z.object({
  id: z.string().optional(),
  speaker: z.string().nullable(),
  text: z.string(),
  subText: z.string().optional(),
  characterExpression: z.string().optional(),
  cameraAction: z.enum(['slow_push', 'shake', 'drift', 'static']).optional(),
  soundEffect: z.string().optional(),
});
export type DialogueNode = z.infer<typeof DialogueNodeSchema>;

export const LocationInfoSchema = z.object({
  id: z.string(),
  name: z.string(),
  time: z.enum(['morning', 'afternoon', 'sunset', 'night', 'midnight']),
  weather: z.enum(['clear', 'rain', 'overcast', 'stars', 'fog', 'storm', 'embers']),
  mood: z.enum(['romance', 'mystery', 'sadness', 'tension', 'peaceful', 'horror', 'wonder', 'cyber']),
});
export type LocationInfoDefinition = z.infer<typeof LocationInfoSchema>;

export const SceneSchema = z.object({
  id: z.string(),
  chapterId: z.string(),
  chapterTitle: z.string(),
  progressPercent: z.number().min(0).max(100),
  location: LocationInfoSchema,
  characters: z.array(SceneCharacterSchema),
  environment: EnvironmentDefinitionSchema.optional(),
  transition: z.object({
    type: z.string().default('fade'),
    duration: z.number().default(250),
    easing: z.string().optional(),
  }).optional(),
  speaker: z.string().nullable(),
  text: z.string(),
  subText: z.string().optional(),
  timeline: z.array(DialogueNodeSchema).optional(),
  choices: z.array(ChoiceSchema).optional(),
  nextSceneId: z.string().optional(),
  actionCG: z.string().optional(),
  foreshadowItem: ForeshadowItemSchema.optional(),
  diegeticItem: DiegeticItemSchema.optional(),
  soundEffect: z.string().optional(),
  ambientTrack: z.string().optional(),
  emotionalIntensity: z.number().min(0).max(1).optional(),
  cameraAction: z.enum(['slow_push', 'shake', 'drift', 'static']).optional(),
  endingId: z.string().optional(),
});
export type SceneDefinition = z.infer<typeof SceneSchema>;

export const EndingSchema = z.object({
  id: z.string(),
  title: z.string(),
  type: z.enum(['true', 'romantic', 'bittersweet', 'secret', 'tragic', 'escape']),
  tagline: z.string(),
  poem: z.string(),
  summary: z.string(),
  unlockedCondition: z.string().optional(),
  requiredCondition: ConditionSchema.optional(),
});
export type EndingDefinition = z.infer<typeof EndingSchema>;

export const StoryDocumentSchema = z.object({
  schemaVersion: z.string().default('2.0.0'),
  id: z.string(),
  title: z.string(),
  subtitle: z.string(),
  genre: z.enum([
    'romance',
    'horror',
    'mystery',
    'thriller',
    'fantasy',
    'cyberpunk',
    'slice_of_life',
    'adventure',
    'historical',
  ]),
  synopsis: z.string(),
  visualBible: VisualBibleSchema,
  initialVariables: z.record(z.string(), z.number()).default({}),
  initialFlags: z.record(z.string(), z.boolean()).default({}),
  firstSceneId: z.string(),
  characters: z.record(z.string(), CharacterSchema).optional(),
  scenes: z.record(z.string(), SceneSchema),
  endings: z.record(z.string(), EndingSchema),
});
export type StoryDocument = z.infer<typeof StoryDocumentSchema>;

export function validateStoryDocument(data: unknown): {
  success: boolean;
  data?: StoryDocument;
  errors?: string[];
} {
  const result = StoryDocumentSchema.safeParse(data);
  if (result.success) {
    return { success: true, data: result.data };
  }
  const errors = result.error.issues.map(
    (issue) => `${issue.path.join('.') || 'root'}: ${issue.message}`
  );
  return { success: false, errors };
}
