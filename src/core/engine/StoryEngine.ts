import type {
  StoryDocument,
  SceneDefinition,
  ChoiceDefinition,
  DialogueNode,
  EndingDefinition,
} from '../schema/story.schema.ts';
import { NarrativeEngine, type NarrativeRuntimeSnapshot } from './NarrativeEngine.ts';
import { ConditionEngine } from './ConditionEngine.ts';
import { VariableEngine } from './VariableEngine.ts';
import { ChoiceEngine } from './ChoiceEngine.ts';
import { EndingResolver } from './EndingResolver.ts';
import { TimelineEngine } from './TimelineEngine.ts';

export class StoryEngine {
  private narrative: NarrativeEngine;

  constructor(document: StoryDocument) {
    this.narrative = new NarrativeEngine(document);
  }

  get document(): StoryDocument {
    return this.narrative.document;
  }

  get currentSceneId(): string {
    return this.narrative.currentSceneId;
  }

  get currentDialogueIndex(): number {
    return this.narrative.currentDialogueIndex;
  }

  get variables(): Record<string, number> {
    return this.narrative.variables;
  }

  get flags(): Record<string, boolean> {
    return this.narrative.flags;
  }

  get discoveredSecrets(): string[] {
    return this.narrative.discoveredSecrets;
  }

  get history() {
    return this.narrative.history;
  }

  get unlockedEndings(): string[] {
    return this.narrative.unlockedEndings;
  }

  get stateMachine() {
    return this.narrative.stateMachine;
  }

  start(): void {
    this.narrative.start();
  }

  reset(): void {
    this.narrative.reset();
  }

  getCurrentScene(): SceneDefinition {
    return this.narrative.getCurrentScene();
  }

  getCurrentDialogue(): DialogueNode | null {
    return this.narrative.getCurrentDialogue();
  }

  isTimelineComplete(): boolean {
    return this.narrative.isTimelineComplete();
  }

  stepDialogue(): boolean {
    return this.narrative.stepDialogue();
  }

  getAvailableChoices(): ChoiceDefinition[] {
    return this.narrative.getAvailableChoices();
  }

  choose(choiceId: string): boolean {
    return this.narrative.choose(choiceId);
  }

  advanceScene(targetSceneId?: string): boolean {
    return this.narrative.advanceScene(targetSceneId);
  }

  discoverSecret(flag: string): void {
    this.narrative.discoverSecret(flag);
  }

  resolveEnding(endingId?: string): EndingDefinition | null {
    return this.narrative.resolveEnding(endingId);
  }

  getSnapshot(): NarrativeRuntimeSnapshot {
    return this.narrative.getSnapshot();
  }

  restoreSnapshot(snapshot: NarrativeRuntimeSnapshot): void {
    this.narrative.restoreSnapshot(snapshot);
  }

  static Condition = ConditionEngine;
  static Variable = VariableEngine;
  static Choice = ChoiceEngine;
  static Ending = EndingResolver;
  static Timeline = TimelineEngine;
}
