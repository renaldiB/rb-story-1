export type AssetLoadStatus = 'LOADING' | 'READY' | 'ERROR';

export interface LoadedAssetRecord {
  url: string;
  element?: HTMLImageElement;
  status: AssetLoadStatus;
  lastUsed: number;
  byteSize?: number;
}

export interface EnvironmentCacheMetrics {
  totalCached: number;
  readyCount: number;
  loadingCount: number;
  errorCount: number;
  estimatedMemoryBytes: number;
}

export class EnvironmentAssetLoader {
  private static instance: EnvironmentAssetLoader | null = null;
  private cache: Map<string, LoadedAssetRecord> = new Map();
  private pendingPromises: Map<string, Promise<HTMLImageElement>> = new Map();
  private maxCacheSize: number = 25;

  private constructor() {}

  public static getInstance(): EnvironmentAssetLoader {
    if (!EnvironmentAssetLoader.instance) {
      EnvironmentAssetLoader.instance = new EnvironmentAssetLoader();
    }
    return EnvironmentAssetLoader.instance;
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
      return Promise.reject(new Error('[EnvironmentAssetLoader] Empty asset URL'));
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
          const mockImg = {
            src: url,
            naturalWidth: 1376,
            naturalHeight: 768,
          } as unknown as HTMLImageElement;

          this.cache.set(url, {
            url,
            element: mockImg,
            status: 'READY',
            lastUsed: Date.now(),
            byteSize: 200 * 1024,
          });
          this.pendingPromises.delete(url);
          this.enforceCacheEviction();
          resolve(mockImg);
        }, 5);
        return;
      }

      const img = new Image();
      img.crossOrigin = 'anonymous';

      img.onload = async () => {
        try {
          if ('decode' in img && typeof img.decode === 'function') {
            await img.decode();
          }
        } catch {
        }

        const estBytes = (img.naturalWidth || 1376) * (img.naturalHeight || 768) * 4;

        this.cache.set(url, {
          url,
          element: img,
          status: 'READY',
          lastUsed: Date.now(),
          byteSize: estBytes,
        });

        this.pendingPromises.delete(url);
        this.enforceCacheEviction();
        resolve(img);
      };

      img.onerror = (err) => {
        this.cache.set(url, {
          url,
          status: 'ERROR',
          lastUsed: Date.now(),
        });
        this.pendingPromises.delete(url);
        reject(err instanceof Error ? err : new Error(`Failed to load asset: ${url}`));
      };

      img.src = url;
    });

    this.pendingPromises.set(url, promise);
    return promise;
  }

  /**
   * Preload a list of assets in parallel without blocking rendering.
   */
  public async preloadAssets(urls: string[]): Promise<void> {
    const unique = Array.from(new Set(urls.filter(Boolean)));
    await Promise.allSettled(unique.map((url) => this.loadAsset(url)));
  }

  /**
   * Evict specific asset from cache to free memory.
   */
  public evict(url: string): boolean {
    return this.cache.delete(url);
  }

  /**
   * LRU eviction when cache exceeds maxCacheSize.
   */
  private enforceCacheEviction(): void {
    if (this.cache.size <= this.maxCacheSize) return;

    const entries = Array.from(this.cache.entries()).sort(
      ([, a], [, b]) => a.lastUsed - b.lastUsed
    );

    const evictCount = this.cache.size - this.maxCacheSize;
    for (let i = 0; i < evictCount; i++) {
      const [urlToEvict] = entries[i];
      this.cache.delete(urlToEvict);
    }
  }

  public getCacheMetrics(): EnvironmentCacheMetrics {
    let readyCount = 0;
    let loadingCount = 0;
    let errorCount = 0;
    let estimatedMemoryBytes = 0;

    for (const record of this.cache.values()) {
      if (record.status === 'READY') readyCount++;
      else if (record.status === 'LOADING') loadingCount++;
      else if (record.status === 'ERROR') errorCount++;

      estimatedMemoryBytes += record.byteSize || 0;
    }

    return {
      totalCached: this.cache.size,
      readyCount,
      loadingCount,
      errorCount,
      estimatedMemoryBytes,
    };
  }

  public clear(): void {
    this.cache.clear();
    this.pendingPromises.clear();
  }
}

export const environmentAssetLoader = EnvironmentAssetLoader.getInstance();
