import { create } from 'zustand';
import type {
  StoryDocument,
  SceneDefinition,
  ChoiceDefinition,
  DialogueNode,
  EndingDefinition,
} from '../schema/story.schema.ts';
import { StoryEngine } from '../engine/StoryEngine.ts';
import { SaveSerializer, type SerializedSaveV2 } from '../serialization/SaveSerializer.ts';

export interface StoryStateStore {
  engine: StoryEngine | null;
  storyDocument: StoryDocument | null;
  currentScene: SceneDefinition | null;
  currentDialogue: DialogueNode | null;
  isTimelineComplete: boolean;
  choices: ChoiceDefinition[];
  variables: Record<string, number>;
  flags: Record<string, boolean>;
  discoveredSecrets: string[];
  activeEnding: EndingDefinition | null;
  saveSlots: SerializedSaveV2[];

  loadStory: (document: StoryDocument) => void;
  nextDialogue: () => void;
  makeChoice: (choiceId: string) => void;
  jumpToScene: (sceneId: string) => void;
  discoverSecret: (flag: string) => void;
  restartStory: () => void;
  saveGame: (slotId: string) => void;
  loadGame: (save: SerializedSaveV2) => void;
  refreshSaveSlots: () => void;
}

const STORAGE_SAVE_PREFIX = 'interactive_story_save_';

export const useStoryStore = create<StoryStateStore>((set, get) => ({
  engine: null,
  storyDocument: null,
  currentScene: null,
  currentDialogue: null,
  isTimelineComplete: false,
  choices: [],
  variables: {},
  flags: {},
  discoveredSecrets: [],
  activeEnding: null,
  saveSlots: [],

  loadStory: (document: StoryDocument) => {
    const engine = new StoryEngine(document);
    engine.start();

    const currentScene = engine.getCurrentScene();
    const currentDialogue = engine.getCurrentDialogue();
    const isTimelineComplete = engine.isTimelineComplete();
    const choices = engine.getAvailableChoices();
    const activeEnding = currentScene.endingId ? engine.resolveEnding(currentScene.endingId) : null;

    set({
      engine,
      storyDocument: document,
      currentScene,
      currentDialogue,
      isTimelineComplete,
      choices,
      variables: engine.variables,
      flags: engine.flags,
      discoveredSecrets: engine.discoveredSecrets,
      activeEnding,
    });

    get().refreshSaveSlots();
  },

  nextDialogue: () => {
    const { engine } = get();
    if (!engine) return;

    if (!engine.isTimelineComplete()) {
      engine.stepDialogue();
      set({
        currentDialogue: engine.getCurrentDialogue(),
        isTimelineComplete: engine.isTimelineComplete(),
      });
    } else {
      const scene = engine.getCurrentScene();
      if (scene.choices && scene.choices.length > 0) {
        return;
      }
      if (scene.nextSceneId) {
        engine.advanceScene(scene.nextSceneId);
        const nextScene = engine.getCurrentScene();
        const activeEnding = nextScene.endingId ? engine.resolveEnding(nextScene.endingId) : null;
        set({
          currentScene: nextScene,
          currentDialogue: engine.getCurrentDialogue(),
          isTimelineComplete: engine.isTimelineComplete(),
          choices: engine.getAvailableChoices(),
          variables: { ...engine.variables },
          flags: { ...engine.flags },
          discoveredSecrets: [...engine.discoveredSecrets],
          activeEnding,
        });
      }
    }
  },

  makeChoice: (choiceId: string) => {
    const { engine } = get();
    if (!engine) return;

    const ok = engine.choose(choiceId);
    if (!ok) return;

    const nextScene = engine.getCurrentScene();
    const activeEnding = nextScene.endingId ? engine.resolveEnding(nextScene.endingId) : null;

    set({
      currentScene: nextScene,
      currentDialogue: engine.getCurrentDialogue(),
      isTimelineComplete: engine.isTimelineComplete(),
      choices: engine.getAvailableChoices(),
      variables: { ...engine.variables },
      flags: { ...engine.flags },
      discoveredSecrets: [...engine.discoveredSecrets],
      activeEnding,
    });
  },

  jumpToScene: (sceneId: string) => {
    const { engine } = get();
    if (!engine) return;

    engine.advanceScene(sceneId);
    const nextScene = engine.getCurrentScene();
    const activeEnding = nextScene.endingId ? engine.resolveEnding(nextScene.endingId) : null;

    set({
      currentScene: nextScene,
      currentDialogue: engine.getCurrentDialogue(),
      isTimelineComplete: engine.isTimelineComplete(),
      choices: engine.getAvailableChoices(),
      variables: { ...engine.variables },
      flags: { ...engine.flags },
      discoveredSecrets: [...engine.discoveredSecrets],
      activeEnding,
    });
  },

  discoverSecret: (flag: string) => {
    const { engine } = get();
    if (!engine) return;
    engine.discoverSecret(flag);
    set({
      flags: { ...engine.flags },
      discoveredSecrets: [...engine.discoveredSecrets],
      choices: engine.getAvailableChoices(),
    });
  },

  restartStory: () => {
    const { storyDocument } = get();
    if (storyDocument) {
      get().loadStory(storyDocument);
    }
  },

  saveGame: (slotId: string) => {
    const { engine, storyDocument, currentScene } = get();
    if (!engine || !storyDocument || !currentScene) return;

    const snapshot = engine.getSnapshot();
    const serialized = SaveSerializer.serialize(slotId, snapshot, {
      storyTitle: storyDocument.title,
      chapterTitle: currentScene.chapterTitle,
    });

    localStorage.setItem(`${STORAGE_SAVE_PREFIX}${storyDocument.id}_${slotId}`, serialized);
    get().refreshSaveSlots();
  },

  loadGame: (save: SerializedSaveV2) => {
    const { engine } = get();
    if (!engine) return;

    engine.restoreSnapshot(save.snapshot);
    const currentScene = engine.getCurrentScene();
    const activeEnding = currentScene.endingId ? engine.resolveEnding(currentScene.endingId) : null;

    set({
      currentScene,
      currentDialogue: engine.getCurrentDialogue(),
      isTimelineComplete: engine.isTimelineComplete(),
      choices: engine.getAvailableChoices(),
      variables: { ...engine.variables },
      flags: { ...engine.flags },
      discoveredSecrets: [...engine.discoveredSecrets],
      activeEnding,
    });
  },

  refreshSaveSlots: () => {
    const { storyDocument } = get();
    if (!storyDocument) return;

    const prefix = `${STORAGE_SAVE_PREFIX}${storyDocument.id}_`;
    const saves: SerializedSaveV2[] = [];

    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && key.startsWith(prefix)) {
        const raw = localStorage.getItem(key);
        if (raw) {
          try {
            const deserialized = SaveSerializer.deserialize(raw);
            saves.push(deserialized);
          } catch (e) {
            console.warn('Failed to parse save:', key, e);
          }
        }
      }
    }

    saves.sort((a, b) => b.createdAt - a.createdAt);
    set({ saveSlots: saves });
  },
}));
