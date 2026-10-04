import { environmentVariantResolver } from './EnvironmentVariantResolver.ts';
import { environmentAssetLoader } from './EnvironmentAssetLoader.ts';
import type {
  EnvironmentInstance,
  ResolvedEnvironment,
  EnvironmentRuntimeOptions,
  EnvironmentSafeZones,
} from './types.ts';

type EnvironmentListener = (instance: EnvironmentInstance) => void;

export class EnvironmentRuntime {
  private static instance: EnvironmentRuntime | null = null;
  private currentInstance: EnvironmentInstance | null = null;
  private activeInstances: Map<string, EnvironmentInstance> = new Map();
  private listeners: Set<EnvironmentListener> = new Set();

  private constructor() {}

  public static getInstance(): EnvironmentRuntime {
    if (!EnvironmentRuntime.instance) {
      EnvironmentRuntime.instance = new EnvironmentRuntime();
    }
    return EnvironmentRuntime.instance;
  }

  public getActiveInstance(): EnvironmentInstance | null {
    return this.currentInstance;
  }

  public resolve(
    environmentId: string,
    options: EnvironmentRuntimeOptions = {}
  ): ResolvedEnvironment {
    return environmentVariantResolver.resolve(environmentId, options);
  }

  public resolveForScene(
    sceneId: string,
    options: EnvironmentRuntimeOptions = {}
  ): ResolvedEnvironment | null {
    return environmentVariantResolver.resolveForScene(sceneId, options);
  }

  public getSafeZones(environmentId: string): EnvironmentSafeZones | undefined {
    const resolved = this.resolve(environmentId);
    return resolved.safeZones;
  }

  public async loadEnvironment(
    environmentId: string,
    options: EnvironmentRuntimeOptions = {}
  ): Promise<EnvironmentInstance> {
    const resolved = this.resolve(environmentId, options);
    const instanceKey = `${resolved.environment.id}_${resolved.activeVariant?.variantId || 'master'}`;

    // Return existing ready instance if available
    const existing = this.activeInstances.get(instanceKey);
    if (existing && existing.status === 'READY') {
      existing.lastUsed = Date.now();
      this.currentInstance = existing;
      this.notify(existing);
      return existing;
    }

    const instance: EnvironmentInstance = {
      id: instanceKey,
      resolved,
      status: 'LOADING',
      loadedLayers: [],
      lastUsed: Date.now(),
    };

    this.activeInstances.set(instanceKey, instance);
    this.currentInstance = instance;
    this.notify(instance);

    try {
      // 1. Load background / variant
      await environmentAssetLoader.loadAsset(resolved.backgroundUrl);

      // 2. Optionally load layers (P0 / P1)
      const layersToLoad = resolved.layers.filter((l) => Boolean(l.asset));
      if (options.preloadLayers !== false && layersToLoad.length > 0) {
        await Promise.allSettled(
          layersToLoad.map(async (layer) => {
            if (layer.asset) {
              await environmentAssetLoader.loadAsset(layer.asset);
              instance.loadedLayers.push(layer.layerId);
            }
          })
        );
      }

      instance.status = 'READY';
      this.notify(instance);
      return instance;
    } catch (err) {
      instance.status = 'ERROR';
      this.notify(instance);
      console.error(`[EnvironmentRuntime] Failed to load environment ${environmentId}:`, err);
      return instance;
    }
  }

  /**
   * Preload an environment and its layers without switching the current active scene.
   */
  public async preloadEnvironment(
    environmentId: string,
    options: EnvironmentRuntimeOptions = {}
  ): Promise<void> {
    const resolved = this.resolve(environmentId, options);
    const urls = [
      resolved.backgroundUrl,
      ...resolved.layers.map((l) => l.asset).filter((a): a is string => Boolean(a)),
    ];
    await environmentAssetLoader.preloadAssets(urls);
  }

  /**
   * Transition smoothly from current environment to next, ensuring next is loaded before release.
   */
  public async transitionTo(
    nextEnvironmentId: string,
    options: EnvironmentRuntimeOptions = {}
  ): Promise<EnvironmentInstance> {
    // Preload next first to avoid flash of empty canvas (Section 45)
    const nextInstance = await this.loadEnvironment(nextEnvironmentId, options);

    // Evict unused distant environments if memory is constrained
    this.cleanupDistantInstances();

    return nextInstance;
  }

  /**
   * Unload an environment instance and evict its assets if appropriate.
   */
  public unloadEnvironment(instanceKey: string): void {
    const instance = this.activeInstances.get(instanceKey);
    if (instance) {
      if (this.currentInstance?.id === instanceKey) {
        this.currentInstance = null;
      }
      this.activeInstances.delete(instanceKey);
      environmentAssetLoader.evict(instance.resolved.backgroundUrl);
      for (const layer of instance.resolved.layers) {
        if (layer.asset) {
          environmentAssetLoader.evict(layer.asset);
        }
      }
    }
  }

  public subscribe(listener: EnvironmentListener): () => void {
    this.listeners.add(listener);
    if (this.currentInstance) {
      listener(this.currentInstance);
    }
    return () => {
      this.listeners.delete(listener);
    };
  }

  private notify(instance: EnvironmentInstance): void {
    this.listeners.forEach((listener) => listener(instance));
  }

  private cleanupDistantInstances(): void {
    const MAX_ACTIVE = 3;
    if (this.activeInstances.size <= MAX_ACTIVE) return;

    const sorted = Array.from(this.activeInstances.entries())
      .filter(([k]) => k !== this.currentInstance?.id)
      .sort(([, a], [, b]) => a.lastUsed - b.lastUsed);

    const toRemove = sorted.slice(0, this.activeInstances.size - MAX_ACTIVE);
    for (const [key] of toRemove) {
      this.unloadEnvironment(key);
    }
  }

  public reset(): void {
    this.activeInstances.clear();
    this.currentInstance = null;
    environmentAssetLoader.clear();
  }
}

export const environmentRuntime = EnvironmentRuntime.getInstance();
