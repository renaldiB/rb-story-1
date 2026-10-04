export type AnimationTickCallback = (dt: number, timestamp: number) => void;

export class AnimationManager {
  private static instance: AnimationManager | null = null;

  private rafId: number | null = null;
  private lastTimestamp: number = 0;
  private subscribers: Set<AnimationTickCallback> = new Set();
  private isRunning: boolean = false;
  private isTabVisible: boolean = true;

  private constructor() {
    if (typeof document !== 'undefined') {
      document.addEventListener('visibilitychange', this.handleVisibilityChange);
      this.isTabVisible = !document.hidden;
    }
  }

  public static getInstance(): AnimationManager {
    if (!AnimationManager.instance) {
      AnimationManager.instance = new AnimationManager();
    }
    return AnimationManager.instance;
  }

  public subscribe(callback: AnimationTickCallback): () => void {
    this.subscribers.add(callback);

    if (!this.isRunning && this.subscribers.size > 0 && this.isTabVisible) {
      this.start();
    }

    return () => {
      this.unsubscribe(callback);
    };
  }

  public unsubscribe(callback: AnimationTickCallback): void {
    this.subscribers.delete(callback);

    if (this.subscribers.size === 0 && this.isRunning) {
      this.stop();
    }
  }

  public getSubscriberCount(): number {
    return this.subscribers.size;
  }

  public start(): void {
    if (this.isRunning) return;
    this.isRunning = true;
    this.lastTimestamp = typeof performance !== 'undefined' ? performance.now() : Date.now();
    this.scheduleNextFrame();
  }

  public stop(): void {
    if (!this.isRunning) return;
    this.isRunning = false;
    if (this.rafId !== null && typeof cancelAnimationFrame !== 'undefined') {
      cancelAnimationFrame(this.rafId);
      this.rafId = null;
    }
  }

  private scheduleNextFrame(): void {
    if (!this.isRunning || typeof requestAnimationFrame === 'undefined') return;

    this.rafId = requestAnimationFrame((now) => {
      const dt = Math.min((now - this.lastTimestamp) / 1000, 0.1);
      this.lastTimestamp = now;

      for (const callback of this.subscribers) {
        try {
          callback(dt, now);
        } catch (err) {
          console.error('AnimationManager tick error:', err);
        }
      }

      this.scheduleNextFrame();
    });
  }

  private handleVisibilityChange = (): void => {
    if (typeof document === 'undefined') return;
    this.isTabVisible = !document.hidden;

    if (this.isTabVisible) {
      if (this.subscribers.size > 0 && !this.isRunning) {
        this.start();
      }
    } else {
      if (this.isRunning) {
        this.stop();
      }
    }
  };

  public manualTick(dt: number, now: number): void {
    for (const callback of this.subscribers) {
      callback(dt, now);
    }
  }

  public static resetInstance(): void {
    if (AnimationManager.instance) {
      AnimationManager.instance.stop();
      AnimationManager.instance.subscribers.clear();
      if (typeof document !== 'undefined') {
        document.removeEventListener(
          'visibilitychange',
          AnimationManager.instance.handleVisibilityChange
        );
      }
      AnimationManager.instance = null;
    }
  }
}
