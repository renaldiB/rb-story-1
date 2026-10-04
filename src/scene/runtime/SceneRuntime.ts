import type {
  SceneDefinition,
  ChoiceDefinition,
  DialogueNode,
} from '../../core/schema/story.schema.ts';
import { ConditionEngine } from '../../core/engine/ConditionEngine.ts';
import { VariableEngine } from '../../core/engine/VariableEngine.ts';
import { variantResolver } from '../../character/CharacterVariantResolver.ts';
import { assetLoader } from '../../character/CharacterAssetLoader.ts';
import { environmentRuntime } from '../../environment/EnvironmentRuntime.ts';
import {
  getProductionSceneProps,
  getProductionSceneRequirement,
} from './ProductionSceneRegistry.ts';
import type {
  SceneLifecycleState,
  SceneCompositionState,
  SceneAssetLoadReport,
} from '../types.ts';

type Listener = (state: SceneCompositionState) => void;

export class SceneRuntime {
  private currentScene: SceneDefinition;
  private lifecycle: SceneLifecycleState = 'SCENE_ENTER';
  private activeDialogueIndex: number = 0;
  private variables: Record<string, number> = {};
  private flags: Record<string, boolean> = {};
  private listeners: Set<Listener> = new Set();
  private lastLoadReport: SceneAssetLoadReport | null = null;

  constructor(
    initialScene: SceneDefinition,
    initialVariables: Record<string, number> = {},
    initialFlags: Record<string, boolean> = {}
  ) {
    this.currentScene = initialScene;
    this.variables = { ...initialVariables };
    this.flags = { ...initialFlags };
  }

  public getLifecycle(): SceneLifecycleState {
    return this.lifecycle;
  }

  public getScene(): SceneDefinition {
    return this.currentScene;
  }

  public getVariables(): Record<string, number> {
    return { ...this.variables };
  }

  public getFlags(): Record<string, boolean> {
    return { ...this.flags };
  }

  public getLastLoadReport(): SceneAssetLoadReport | null {
    return this.lastLoadReport;
  }

  public getState(): SceneCompositionState {
    const timeline = this.currentScene.timeline || [];
    const hasTimeline = timeline.length > 0;
    const currentDialogue: DialogueNode | null = hasTimeline
      ? timeline[this.activeDialogueIndex] || null
      : {
          speaker: this.currentScene.speaker,
          text: this.currentScene.text,
          subText: this.currentScene.subText,
        };

    const isComplete = hasTimeline
      ? this.activeDialogueIndex >= timeline.length - 1
      : true;

    return {
      currentSceneId: this.currentScene.id,
      lifecycle: this.lifecycle,
      activeDialogueIndex: this.activeDialogueIndex,
      currentDialogue,
      availableChoices: this.getAvailableChoices(),
      isComplete,
      activeSpeakerId: currentDialogue?.speaker || null,
    };
  }

  public subscribe(listener: Listener): () => void {
    this.listeners.add(listener);
    listener(this.getState());
    return () => {
      this.listeners.delete(listener);
    };
  }

  private notify(): void {
    const state = this.getState();
    this.listeners.forEach((listener) => listener(state));
  }

  public transitionLifecycle(target: SceneLifecycleState): boolean {
    const allowed: Record<SceneLifecycleState, SceneLifecycleState[]> = {
      SCENE_ENTER: ['SCENE_LOAD'],
      SCENE_LOAD: ['ASSET_READY', 'SCENE_ACTIVE'],
      ASSET_READY: ['SCENE_ACTIVE'],
      SCENE_ACTIVE: ['USER_INTERACTION', 'SCENE_COMPLETE', 'SCENE_EXIT'],
      USER_INTERACTION: ['SCENE_ACTIVE', 'USER_INTERACTION', 'SCENE_COMPLETE', 'SCENE_EXIT'],
      SCENE_COMPLETE: ['SCENE_EXIT', 'NEXT_SCENE'],
      SCENE_EXIT: ['NEXT_SCENE', 'SCENE_ENTER'],
      NEXT_SCENE: ['SCENE_ENTER', 'SCENE_LOAD'],
    };

    if (!allowed[this.lifecycle]?.includes(target)) {
      console.warn(
        `[SceneRuntime] Illegal lifecycle transition: ${this.lifecycle} -> ${target}`
      );
      return false;
    }

    this.lifecycle = target;
    this.notify();
    return true;
  }

  // --- ASSET PRELOADING ---
  public async loadSceneAssets(): Promise<SceneAssetLoadReport> {
    const startTime = Date.now();
    this.transitionLifecycle('SCENE_LOAD');

    const urlsToLoad: string[] = [];

    // 1. Environment background & layers via EnvironmentRuntime
    if (this.currentScene.location?.id) {
      try {
        const productionRequirement = getProductionSceneRequirement(this.currentScene.id);
        const resolvedEnv =
          environmentRuntime.resolveForScene(this.currentScene.id, {
            variantId: productionRequirement?.variantId,
            time: this.currentScene.location.time,
            weather: this.currentScene.location.weather,
          }) || environmentRuntime.resolve(this.currentScene.location.id, {
            time: this.currentScene.location.time,
            weather: this.currentScene.location.weather,
          });
        if (resolvedEnv?.backgroundUrl) {
          urlsToLoad.push(resolvedEnv.backgroundUrl);
        }
        for (const layer of resolvedEnv.layers || []) {
          if (layer.asset) urlsToLoad.push(layer.asset);
        }
        for (const prop of getProductionSceneProps(this.currentScene.id)) urlsToLoad.push(prop.assetWebp);
      } catch {
        // Fallback silently if custom fixture
      }
    } else if (this.currentScene.environment?.background) {
      const bg = this.currentScene.environment.background;
      if (typeof bg === 'string') {
        urlsToLoad.push(bg);
      } else if (bg.src) {
        urlsToLoad.push(bg.src);
      }
    }

    // 2. Environment midground & foreground
    const layers = [
      ...(this.currentScene.environment?.midground || []),
      ...(this.currentScene.environment?.foreground || []),
    ];
    for (const layer of layers) {
      if (layer.src) {
        urlsToLoad.push(layer.src);
      }
    }

    // 3. Characters variants
    for (const char of this.currentScene.characters || []) {
      const resolved = variantResolver.resolve({
        characterId: char.characterId || char.id,
        expression: char.expression,
        pose: char.pose,
      });
      if (resolved.assetPath) {
        urlsToLoad.push(resolved.assetPath);
      }
    }

    // Deduplicate
    const uniqueUrls = Array.from(new Set(urlsToLoad));
    const failedAssets: string[] = [];
    let loadedCount = 0;

    await Promise.all(
      uniqueUrls.map(async (url) => {
        try {
          await assetLoader.loadAsset(url);
          loadedCount++;
        } catch {
          // Graceful fallback: do not throw, record error
          failedAssets.push(url);
          console.warn(`[SceneRuntime] Failed to load asset: ${url}, degraded gracefully`);
        }
      })
    );

    const report: SceneAssetLoadReport = {
      totalAssets: uniqueUrls.length,
      loadedAssets: loadedCount,
      failedAssets,
      durationMs: Date.now() - startTime,
      status: failedAssets.length === 0 ? 'SUCCESS' : loadedCount > 0 ? 'PARTIAL' : 'FAILED',
    };

    this.lastLoadReport = report;
    this.transitionLifecycle('ASSET_READY');
    this.transitionLifecycle('SCENE_ACTIVE');
    return report;
  }

  // --- DIALOGUE ADVANCEMENT ---
  public stepDialogue(): boolean {
    const timeline = this.currentScene.timeline || [];
    if (timeline.length === 0) {
      this.transitionLifecycle('SCENE_COMPLETE');
      return false;
    }

    if (this.activeDialogueIndex < timeline.length - 1) {
      this.activeDialogueIndex++;
      this.transitionLifecycle('USER_INTERACTION');
      return true;
    }

    this.transitionLifecycle('SCENE_COMPLETE');
    return false;
  }

  // --- CHOICES & BRANCHING ---
  public getAvailableChoices(): ChoiceDefinition[] {
    const choices = this.currentScene.choices || [];
    return choices.filter((c) => {
      if (!c.requiredCondition) return true;
      return ConditionEngine.evaluate(c.requiredCondition, this.variables, this.flags);
    });
  }

  public selectChoice(choiceId: string): ChoiceDefinition | null {
    const choices = this.getAvailableChoices();
    const selected = choices.find((c) => c.id === choiceId);
    if (!selected) {
      console.warn(`[SceneRuntime] Choice not available or condition not met: ${choiceId}`);
      return null;
    }

    // Apply effects
    if (selected.effects) {
      this.variables = VariableEngine.applyDelta(this.variables, selected.effects);
    }

    // Apply flags
    if (selected.setFlags) {
      this.flags = VariableEngine.applyFlags(this.flags, selected.setFlags);
    }

    // Apply actions
    if (selected.actions) {
      const res = VariableEngine.applyActions(selected.actions, this.variables, this.flags);
      this.variables = res.variables;
      this.flags = res.flags;
    }

    this.transitionLifecycle('SCENE_COMPLETE');
    return selected;
  }

  // --- SCENE SWITCHING ---
  public enterScene(nextScene: SceneDefinition): void {
    this.transitionLifecycle('SCENE_EXIT');
    this.transitionLifecycle('NEXT_SCENE');
    this.currentScene = nextScene;
    this.activeDialogueIndex = 0;
    this.lifecycle = 'SCENE_ENTER';
    this.notify();
  }
}
