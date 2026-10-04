import type {
  StoryDocument,
  SceneDefinition,
  ChoiceDefinition,
  DialogueNode,
  EndingDefinition,
} from '../schema/story.schema.ts';
import { ConditionEngine } from './ConditionEngine.ts';
import { VariableEngine } from './VariableEngine.ts';
import { ChoiceEngine } from './ChoiceEngine.ts';
import { EndingResolver } from './EndingResolver.ts';
import { TimelineEngine } from './TimelineEngine.ts';
import { StoryStateMachine } from '../state-machine/StoryStateMachine.ts';

export interface NarrativeHistoryEntry {
  sceneId: string;
  speaker: string | null;
  text: string;
  timestamp: number;
}

export interface NarrativeRuntimeSnapshot {
  storyId: string;
  currentSceneId: string;
  currentDialogueIndex: number;
  variables: Record<string, number>;
  flags: Record<string, boolean>;
  discoveredSecrets: string[];
  history: NarrativeHistoryEntry[];
  unlockedEndings: string[];
}

export class NarrativeEngine {
  public document: StoryDocument;
  public stateMachine: StoryStateMachine;

  public currentSceneId: string;
  public currentDialogueIndex: number = 0;
  public variables: Record<string, number> = {};
  public flags: Record<string, boolean> = {};
  public discoveredSecrets: string[] = [];
  public history: NarrativeHistoryEntry[] = [];
  public unlockedEndings: string[] = [];

  constructor(document: StoryDocument) {
    this.document = document;
    this.stateMachine = new StoryStateMachine('BOOT');
    this.currentSceneId = document.firstSceneId;
    this.reset();
  }

  public reset(): void {
    this.currentSceneId = this.document.firstSceneId;
    this.currentDialogueIndex = 0;
    this.variables = { ...(this.document.initialVariables || {}) };
    this.flags = { ...(this.document.initialFlags || {}) };
    this.discoveredSecrets = [];
    this.history = [];
    this.unlockedEndings = [];

    this.stateMachine = new StoryStateMachine('READY');
    this.recordCurrentDialogueToHistory();
  }

  public start(): void {
    if (this.stateMachine.status === 'READY') {
      this.stateMachine.transitionTo('PLAYING');
    }
  }

  public getCurrentScene(): SceneDefinition {
    const scene = this.document.scenes[this.currentSceneId];
    if (!scene) {
      throw new Error(`Scene not found: ${this.currentSceneId}`);
    }
    return scene;
  }

  public getCurrentDialogue(): DialogueNode | null {
    const scene = this.getCurrentScene();
    const timeline = TimelineEngine.getState(scene, this.currentDialogueIndex);
    return timeline.currentNode;
  }

  public isTimelineComplete(): boolean {
    const scene = this.getCurrentScene();
    const timeline = TimelineEngine.getState(scene, this.currentDialogueIndex);
    return timeline.isComplete;
  }

  /**
   * Step to next dialogue beat within scene timeline, or return false if choices/next scene need resolving.
   */
  public stepDialogue(): boolean {
    const scene = this.getCurrentScene();
    const timeline = TimelineEngine.getState(scene, this.currentDialogueIndex);

    if (!timeline.isComplete) {
      this.currentDialogueIndex++;
      this.recordCurrentDialogueToHistory();
      return true;
    }
    return false;
  }

  /**
   * Get available player choices in current scene
   */
  public getAvailableChoices(): ChoiceDefinition[] {
    const scene = this.getCurrentScene();
    return ChoiceEngine.getAvailableChoices(scene.choices, this.variables, this.flags);
  }

  /**
   * Make a choice and apply deltas, flags, and actions
   */
  public choose(choiceId: string): boolean {
    const scene = this.getCurrentScene();
    const choice = scene.choices?.find((c) => c.id === choiceId);
    if (!choice) return false;

    // Check availability
    const isAllowed = ConditionEngine.evaluate(choice.requiredCondition, this.variables, this.flags);
    if (!isAllowed) return false;

    // Apply effects
    if (choice.effects) {
      this.variables = VariableEngine.applyDelta(this.variables, choice.effects);
    }

    // Apply flags
    if (choice.setFlags) {
      this.flags = VariableEngine.applyFlags(this.flags, choice.setFlags);
    }

    // Apply actions
    if (choice.actions) {
      const res = VariableEngine.applyActions(choice.actions, this.variables, this.flags);
      this.variables = res.variables;
      this.flags = res.flags;
    }

    // Transition to next scene
    return this.advanceScene(choice.nextSceneId);
  }

  /**
   * Advance to a designated scene ID or the current scene's default nextSceneId
   */
  public advanceScene(targetSceneId?: string): boolean {
    const scene = this.getCurrentScene();
    const nextId = targetSceneId || scene.nextSceneId;

    if (!nextId) {
      // Check if ending scene
      if (scene.endingId) {
        this.resolveEnding(scene.endingId);
        return true;
      }
      return false;
    }

    const nextScene = this.document.scenes[nextId];
    if (!nextScene) {
      throw new Error(`Target scene not found: ${nextId}`);
    }

    this.currentSceneId = nextId;
    this.currentDialogueIndex = 0;

    // Check if new scene triggers an ending
    if (nextScene.endingId) {
      this.resolveEnding(nextScene.endingId);
    }

    this.recordCurrentDialogueToHistory();
    return true;
  }

  /**
   * Unlock or discover a foreshadowed item or secret
   */
  public discoverSecret(flag: string): void {
    this.flags[flag] = true;
    if (!this.discoveredSecrets.includes(flag)) {
      this.discoveredSecrets.push(flag);
    }
  }

  /**
   * Resolve and register an ending
   */
  public resolveEnding(endingId?: string): EndingDefinition | null {
    const ending = EndingResolver.resolveEnding(
      endingId,
      this.document.endings,
      this.variables,
      this.flags
    );

    if (ending && !this.unlockedEndings.includes(ending.id)) {
      this.unlockedEndings.push(ending.id);
    }

    if (this.stateMachine.canTransitionTo('ENDING')) {
      this.stateMachine.transitionTo('ENDING');
    }

    return ending;
  }

  /**
   * Snapshot for serialization
   */
  public getSnapshot(): NarrativeRuntimeSnapshot {
    return {
      storyId: this.document.id,
      currentSceneId: this.currentSceneId,
      currentDialogueIndex: this.currentDialogueIndex,
      variables: { ...this.variables },
      flags: { ...this.flags },
      discoveredSecrets: [...this.discoveredSecrets],
      history: [...this.history],
      unlockedEndings: [...this.unlockedEndings],
    };
  }

  /**
   * Restore runtime state from snapshot
   */
  public restoreSnapshot(snapshot: NarrativeRuntimeSnapshot): void {
    if (snapshot.storyId !== this.document.id) {
      throw new Error(
        `Cannot restore snapshot: Story ID mismatch (expected ${this.document.id}, got ${snapshot.storyId})`
      );
    }

    this.currentSceneId = snapshot.currentSceneId;
    this.currentDialogueIndex = snapshot.currentDialogueIndex || 0;
    this.variables = { ...snapshot.variables };
    this.flags = { ...snapshot.flags };
    this.discoveredSecrets = [...snapshot.discoveredSecrets];
    this.history = [...snapshot.history];
    this.unlockedEndings = [...snapshot.unlockedEndings];
  }

  private recordCurrentDialogueToHistory(): void {
    const scene = this.getCurrentScene();
    const dialogue = this.getCurrentDialogue();

    if (dialogue) {
      this.history.push({
        sceneId: scene.id,
        speaker: dialogue.speaker,
        text: dialogue.text,
        timestamp: Date.now(),
      });
    }
  }
}
