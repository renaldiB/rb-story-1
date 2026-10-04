export type AssetState = 'unloaded' | 'loading' | 'cached' | 'active';

export interface ManagedAsset {
  url: string;
  state: AssetState;
  lastUsed: number;
  data?: unknown;
}

export class AssetManager {
  private static instance: AssetManager | null = null;

  private assets: Map<string, ManagedAsset> = new Map();
  private sceneAssetMap: Map<string, Set<string>> = new Map();
  private maxCachedAssets: number = 20;

  private constructor() {}

  public static getInstance(): AssetManager {
    if (!AssetManager.instance) {
      AssetManager.instance = new AssetManager();
    }
    return AssetManager.instance;
  }

  public getAssetState(url: string): AssetState {
    return this.assets.get(url)?.state || 'unloaded';
  }

  public getLoadedCount(): number {
    let count = 0;
    for (const a of this.assets.values()) {
      if (a.state === 'cached' || a.state === 'active') count++;
    }
    return count;
  }

  public async preload(url: string): Promise<void> {
    if (!url) return;

    const existing = this.assets.get(url);
    if (existing && (existing.state === 'cached' || existing.state === 'active')) {
      existing.lastUsed = Date.now();
      return;
    }

    this.assets.set(url, {
      url,
      state: 'loading',
      lastUsed: Date.now(),
    });

    try {
      if (typeof Image !== 'undefined' && /\.(png|webp|avif|jpg|jpeg|svg)$/i.test(url)) {
        await new Promise<void>((resolve, reject) => {
          const img = new Image();
          img.decoding = 'async';
          img.onload = () => resolve();
          img.onerror = () => reject(new Error(`Failed to load image: ${url}`));
          img.src = url;
        });
      }

      this.assets.set(url, {
        url,
        state: 'cached',
        lastUsed: Date.now(),
      });
      this.evictIfNeeded();
    } catch {
      this.assets.delete(url);
    }
  }

  /**
   * Associate assets with a specific scene for grouped preloading and eviction.
   */
  public registerSceneAssets(sceneId: string, assetUrls: string[]): void {
    const valid = assetUrls.filter(Boolean);
    this.sceneAssetMap.set(sceneId, new Set(valid));
  }

  /**
   * Preload all assets required by the likely upcoming scene.
   */
  public async preloadScene(sceneId: string, assetUrls?: string[]): Promise<void> {
    if (assetUrls) {
      this.registerSceneAssets(sceneId, assetUrls);
    }

    const urls = this.sceneAssetMap.get(sceneId);
    if (!urls || urls.size === 0) return;

    await Promise.all(Array.from(urls).map((url) => this.preload(url)));
  }

  /**
   * Mark a scene as active, transitioning its assets to 'active' state.
   */
  public activateScene(sceneId: string): void {
    for (const asset of this.assets.values()) {
      if (asset.state === 'active') asset.state = 'cached';
    }
    const urls = this.sceneAssetMap.get(sceneId);
    if (!urls) return;

    for (const url of urls) {
      const asset = this.assets.get(url);
      if (asset) {
        asset.state = 'active';
        asset.lastUsed = Date.now();
      }
    }
  }

  /**
   * Evict/release assets associated with a completed scene to free RAM/GPU memory.
   */
  public releaseScene(sceneId: string): void {
    const urls = this.sceneAssetMap.get(sceneId);
    if (!urls) return;

    this.sceneAssetMap.delete(sceneId);
    for (const url of urls) {
      const stillReferenced = Array.from(this.sceneAssetMap.values()).some((sceneUrls) =>
        sceneUrls.has(url)
      );
      if (!stillReferenced) this.release(url);
    }
  }

  /**
   * Release an individual asset reference.
   */
  public release(url: string): void {
    const asset = this.assets.get(url);
    if (asset) {
      asset.data = undefined;
      this.assets.delete(url);
    }
  }

  /**
   * Evict LRU cached assets when exceeding memory threshold.
   */
  private evictIfNeeded(): void {
    if (this.assets.size <= this.maxCachedAssets) return;

    // Find oldest 'cached' assets (do not evict 'active')
    const evictable: ManagedAsset[] = [];
    for (const a of this.assets.values()) {
      if (a.state === 'cached') {
        evictable.push(a);
      }
    }

    evictable.sort((a, b) => a.lastUsed - b.lastUsed);

    const toRemove = this.assets.size - this.maxCachedAssets;
    for (let i = 0; i < Math.min(toRemove, evictable.length); i++) {
      this.release(evictable[i].url);
    }
  }

  /**
   * Reset manager for testing
   */
  public static resetInstance(): void {
    if (AssetManager.instance) {
      AssetManager.instance.assets.clear();
      AssetManager.instance.sceneAssetMap.clear();
      AssetManager.instance = null;
    }
  }
}
