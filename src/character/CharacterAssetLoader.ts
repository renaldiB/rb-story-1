export type AssetLoadStatus = 'LOADING' | 'READY' | 'ERROR';

export interface LoadedImageRecord {
  url: string;
  element?: HTMLImageElement;
  status: AssetLoadStatus;
  lastUsed: number;
}

export class CharacterAssetLoader {
  private static instance: CharacterAssetLoader | null = null;
  private cache: Map<string, LoadedImageRecord> = new Map();
  private pendingPromises: Map<string, Promise<HTMLImageElement>> = new Map();
  private maxCacheSize: number = 30;

  private constructor() {}

  public static getInstance(): CharacterAssetLoader {
    if (!CharacterAssetLoader.instance) {
      CharacterAssetLoader.instance = new CharacterAssetLoader();
    }
    return CharacterAssetLoader.instance;
  }

  public getStatus(url: string): AssetLoadStatus {
    return this.cache.get(url)?.status || 'LOADING';
  }

  public isCached(url: string): boolean {
    const item = this.cache.get(url);
    return item?.status === 'READY' && Boolean(item.element);
  }

  public getCachedImage(url: string): HTMLImageElement | undefined {
    const item = this.cache.get(url);
    if (item && item.status === 'READY') {
      item.lastUsed = Date.now();
      return item.element;
    }
    return undefined;
  }

  public loadAsset(url: string): Promise<HTMLImageElement> {
    if (!url) {
      return Promise.reject(new Error('[CharacterAssetLoader] Empty asset URL'));
    }

    const pending = this.pendingPromises.get(url);
    if (pending) {
      return pending;
    }

    const existing = this.cache.get(url);
    if (existing && existing.status === 'READY' && existing.element) {
      existing.lastUsed = Date.now();
      return Promise.resolve(existing.element);
    }

    this.cache.set(url, {
      url,
      status: 'LOADING',
      lastUsed: Date.now(),
    });

    const promise = new Promise<HTMLImageElement>((resolve, reject) => {
      if (typeof Image === 'undefined') {
        setTimeout(() => {
          const mockImg = { src: url, naturalWidth: 1024, naturalHeight: 1536 } as unknown as HTMLImageElement;
          this.cache.set(url, {
            url,
            element: mockImg,
            status: 'READY',
            lastUsed: Date.now(),
          });
          resolve(mockImg);
        }, 5);
        return;
      }

      const img = new Image();
      img.decoding = 'async';

      img.onload = async () => {
        try {
          if ('decode' in img && typeof img.decode === 'function') {
            await img.decode();
          }
        } catch {
        }

        this.cache.set(url, {
          url,
          element: img,
          status: 'READY',
          lastUsed: Date.now(),
        });
        this.evictOldAssets();
        resolve(img);
      };

      img.onerror = (err) => {
        console.warn(`[CharacterAssetLoader] Failed to load sprite: ${url}`, err);
        this.cache.set(url, {
          url,
          status: 'ERROR',
          lastUsed: Date.now(),
        });
        reject(new Error(`Failed to load sprite: ${url}`));
      };

      img.src = url;
    }).finally(() => {
      this.pendingPromises.delete(url);
    });

    this.pendingPromises.set(url, promise);
    return promise;
  }

  /**
   * Preload an array of asset URLs (e.g. for current or next scene).
   */
  public async preloadAssets(urls: string[]): Promise<void> {
    const valid = urls.filter(Boolean);
    await Promise.allSettled(valid.map((u) => this.loadAsset(u)));
  }

  /**
   * Evict LRU assets when cache exceeds limit.
   */
  private evictOldAssets(): void {
    if (this.cache.size <= this.maxCacheSize) return;

    const entries = Array.from(this.cache.values()).filter((e) => e.status === 'READY');
    entries.sort((a, b) => a.lastUsed - b.lastUsed);

    const toRemove = this.cache.size - this.maxCacheSize;
    for (let i = 0; i < Math.min(toRemove, entries.length); i++) {
      this.cache.delete(entries[i].url);
    }
  }

  public clear(): void {
    this.cache.clear();
    this.pendingPromises.clear();
  }

  public static resetInstance(): void {
    if (CharacterAssetLoader.instance) {
      CharacterAssetLoader.instance.clear();
      CharacterAssetLoader.instance = null;
    }
  }
}

export const assetLoader = CharacterAssetLoader.getInstance();
