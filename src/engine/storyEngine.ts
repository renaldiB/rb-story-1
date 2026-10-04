import type {
  StoryState,
  MultiDimRelationships,
  VariableDelta,
  ChoiceOption,
  StoryScene,
  SaveSlot
} from '../types/story';

const STORAGE_KEY_AUTO = 'universal_story_autosave_v2';
const STORAGE_KEY_SLOTS = 'universal_story_saveslots_v2';
const STORAGE_KEY_ENDINGS = 'universal_story_endings_v2';

export function createInitialVariables(): MultiDimRelationships {
  return {
    trust: 0,
    affection: 0,
    suspicion: 0,
    fear: 0,
    respect: 0,
    intimacy: 0
  };
}

export function createInitialState(
  firstSceneId: string = 'ch1_intro_1',
  storyId: string = 'romance_rain'
): StoryState {
  return {
    currentStoryId: storyId,
    currentSceneId: firstSceneId,
    currentChapterId: 'ch1',
    variables: createInitialVariables(),
    flags: {},
    discoveredSecrets: [],
    history: [],
    unlockedEndings: loadUnlockedEndings()
  };
}

export function evaluateCondition(
  condition: ChoiceOption['requiredCondition'],
  variables: MultiDimRelationships,
  flags: Record<string, boolean>
): boolean {
  if (!condition) return true;

  if (condition.flag) {
    if (!flags[condition.flag]) return false;
  }

  if (condition.variable && condition.operator && condition.value !== undefined) {
    const currentVal = variables[condition.variable] ?? 0;
    switch (condition.operator) {
      case '>=':
        return currentVal >= condition.value;
      case '<=':
        return currentVal <= condition.value;
      case '>':
        return currentVal > condition.value;
      case '<':
        return currentVal < condition.value;
      case '==':
        return currentVal === condition.value;
      default:
        return true;
    }
  }

  return true;
}

export function applyEffects(
  currentVariables: MultiDimRelationships,
  currentFlags: Record<string, boolean>,
  effects?: VariableDelta,
  setFlags?: string[]
): { variables: MultiDimRelationships; flags: Record<string, boolean> } {
  const nextVariables = { ...currentVariables };
  const nextFlags = { ...currentFlags };

  if (effects) {
    for (const [key, delta] of Object.entries(effects)) {
      if (typeof delta === 'number') {
        nextVariables[key] = (nextVariables[key] ?? 0) + delta;
      }
    }
  }

  if (setFlags) {
    for (const flag of setFlags) {
      nextFlags[flag] = true;
    }
  }

  return { variables: nextVariables, flags: nextFlags };
}

export function advanceStory(
  currentState: StoryState,
  targetScene: StoryScene,
  choice?: ChoiceOption
): StoryState {
  let variables = { ...currentState.variables };
  let flags = { ...currentState.flags };

  if (choice) {
    const updated = applyEffects(variables, flags, choice.effects, choice.setFlags);
    variables = updated.variables;
    flags = updated.flags;
  }

  const historyEntry = {
    sceneId: targetScene.id,
    speaker: targetScene.speaker,
    text: targetScene.text,
    timestamp: Date.now()
  };

  const unlockedEndings = [...currentState.unlockedEndings];
  if (targetScene.endingId && !unlockedEndings.includes(targetScene.endingId)) {
    unlockedEndings.push(targetScene.endingId);
    saveUnlockedEndings(unlockedEndings);
  }

  const nextState: StoryState = {
    ...currentState,
    currentSceneId: targetScene.id,
    currentChapterId: targetScene.chapterId,
    variables,
    flags,
    history: [...currentState.history.slice(-99), historyEntry],
    unlockedEndings
  };

  saveAuto(nextState);
  return nextState;
}

export function discoverSecretItem(state: StoryState, secretId: string, flag: string): StoryState {
  if (state.discoveredSecrets.includes(secretId)) return state;

  const nextSecrets = [...state.discoveredSecrets, secretId];
  const nextFlags = { ...state.flags, [flag]: true };

  const nextState = {
    ...state,
    discoveredSecrets: nextSecrets,
    flags: nextFlags
  };

  saveAuto(nextState);
  return nextState;
}

export function saveAuto(state: StoryState): void {
  if (typeof localStorage === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEY_AUTO, JSON.stringify(state));
  } catch (err) {
    console.warn('Failed to auto-save story state', err);
  }
}

export function loadAuto(): StoryState | null {
  if (typeof localStorage === 'undefined') return null;
  try {
    const raw = localStorage.getItem(STORAGE_KEY_AUTO);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

export function getSaveSlots(): SaveSlot[] {
  if (typeof localStorage === 'undefined') return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY_SLOTS);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function saveToSlot(
  slotId: string,
  state: StoryState,
  currentScene: StoryScene,
  storyTitle: string = 'Interactive Story'
): SaveSlot[] {
  const slots = getSaveSlots();
  const index = slots.findIndex((s) => s.id === slotId);

  const newSlot: SaveSlot = {
    id: slotId,
    timestamp: Date.now(),
    storyTitle,
    chapterTitle: currentScene.chapterTitle,
    scenePreview: currentScene.text.slice(0, 60) + (currentScene.text.length > 60 ? '...' : ''),
    state: JSON.parse(JSON.stringify(state))
  };

  if (index >= 0) {
    slots[index] = newSlot;
  } else {
    slots.push(newSlot);
  }

  if (typeof localStorage !== 'undefined') {
    try {
      localStorage.setItem(STORAGE_KEY_SLOTS, JSON.stringify(slots));
    } catch (err) {
      console.warn('Failed to save slot', err);
    }
  }

  return slots;
}

export function loadUnlockedEndings(): string[] {
  if (typeof localStorage === 'undefined') return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY_ENDINGS);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function saveUnlockedEndings(endings: string[]): void {
  if (typeof localStorage === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEY_ENDINGS, JSON.stringify(endings));
  } catch (err) {
    console.warn('Failed to save endings', err);
  }
}

export function clearAllSaves(): void {
  if (typeof localStorage === 'undefined') return;
  try {
    localStorage.removeItem(STORAGE_KEY_AUTO);
    localStorage.removeItem(STORAGE_KEY_SLOTS);
  } catch (err) {
    console.warn('Failed to clear saves', err);
  }
}
