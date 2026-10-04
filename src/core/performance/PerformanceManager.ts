import { DeviceProfile, type DeviceCapabilities, type QualityLevel } from './DeviceProfile.ts';
import { QualityScaler, type ParticleBudget } from './QualityScaler.ts';
import { AnimationManager } from './AnimationManager.ts';
import { AssetManager } from './AssetManager.ts';

export interface PerformanceMetrics {
  fps: number;
  frameTimeMs: number;
  quality: QualityLevel;
  particleBudget: ParticleBudget;
  activeParticles: number;
  device: DeviceCapabilities;
  loadedAssets: number;
  longTaskCount: number;
  memoryEstimateMB?: number;
}

export class PerformanceManager {
  private static instance: PerformanceManager | null = null;

  public device: DeviceCapabilities;
  public scaler: QualityScaler;
  public animation: AnimationManager;
  public assets: AssetManager;

  private currentFps: number = 60;
  private currentFrameTimeMs: number = 16.6;
  private activeParticlesCount: number = 0;
  private particleSources = new Map<string, number>();
  private longTaskCount: number = 0;
  private frameCount: number = 0;
  private lastFpsCalcTime: number = 0;
  private unsubscribeTick: (() => void) | null = null;

  private constructor() {
    this.device = DeviceProfile.get();
    this.scaler = new QualityScaler(this.device.recommendedQuality, this.device.isMobile);
    this.animation = AnimationManager.getInstance();
    this.assets = AssetManager.getInstance();

    this.initFPSMonitoring();
    this.initLongTaskObserver();
  }

  public static getInstance(): PerformanceManager {
    if (!PerformanceManager.instance) {
      PerformanceManager.instance = new PerformanceManager();
    }
    return PerformanceManager.instance;
  }

  private initFPSMonitoring(): void {
    this.lastFpsCalcTime = typeof performance !== 'undefined' ? performance.now() : Date.now();

    this.unsubscribeTick = this.animation.subscribe((_dt, timestamp) => {
      this.frameCount++;
      const elapsed = timestamp - this.lastFpsCalcTime;

      if (elapsed >= 500) {
        this.currentFps = Math.round((this.frameCount * 1000) / elapsed);
        this.currentFrameTimeMs = parseFloat((elapsed / this.frameCount).toFixed(1));
        this.frameCount = 0;
        this.lastFpsCalcTime = timestamp;

        this.scaler.reportFPS(this.currentFps);
      }
    });
  }

  private initLongTaskObserver(): void {
    if (typeof PerformanceObserver !== 'undefined') {
      try {
        const observer = new PerformanceObserver((entryList) => {
          for (const entry of entryList.getEntries()) {
            if (entry.duration > 50) {
              this.longTaskCount++;
            }
          }
        });
        observer.observe({ entryTypes: ['longtask'] });
      } catch {
      }
    }
  }

  public setActiveParticles(count: number): void {
    this.activeParticlesCount = count;
  }

  public registerParticleSource(sourceId: string, count: number): () => void {
    this.particleSources.set(sourceId, count);
    this.activeParticlesCount = Array.from(this.particleSources.values()).reduce((sum, value) => sum + value, 0);
    return () => {
      this.particleSources.delete(sourceId);
      this.activeParticlesCount = Array.from(this.particleSources.values()).reduce((sum, value) => sum + value, 0);
    };
  }

  public getMetrics(): PerformanceMetrics {
    let memoryEstimateMB: number | undefined;
    if (typeof performance !== 'undefined' && (performance as any).memory) {
      memoryEstimateMB = Math.round((performance as any).memory.usedJSHeapSize / (1024 * 1024));
    }

    return {
      fps: this.currentFps,
      frameTimeMs: this.currentFrameTimeMs,
      quality: this.scaler.quality,
      particleBudget: this.scaler.getParticleBudget(),
      activeParticles: this.activeParticlesCount,
      device: this.device,
      loadedAssets: this.assets.getLoadedCount(),
      longTaskCount: this.longTaskCount,
      memoryEstimateMB,
    };
  }

  public dispose(): void {
    if (this.unsubscribeTick) {
      this.unsubscribeTick();
      this.unsubscribeTick = null;
    }
  }

  public static resetInstance(): void {
    if (PerformanceManager.instance) {
      PerformanceManager.instance.dispose();
      PerformanceManager.instance = null;
    }
  }
}
