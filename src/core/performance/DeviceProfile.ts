export type QualityLevel = 'ultra' | 'high' | 'medium' | 'low';

export interface DeviceCapabilities {
  dpr: number;
  hardwareConcurrency: number;
  deviceMemoryGB: number;
  isMobile: boolean;
  prefersReducedMotion: boolean;
  connectionType: string;
  recommendedQuality: QualityLevel;
}

export class DeviceProfile {
  private static cachedProfile: DeviceCapabilities | null = null;

  public static get(): DeviceCapabilities {
    if (this.cachedProfile) {
      return this.cachedProfile;
    }

    const isBrowser = typeof window !== 'undefined';

    const dpr = isBrowser ? Math.min(window.devicePixelRatio || 1, 2) : 1;
    const hardwareConcurrency = isBrowser ? navigator.hardwareConcurrency || 4 : 4;
    const deviceMemoryGB = isBrowser ? ((navigator as any).deviceMemory || 4) : 4;
    const isMobile = isBrowser ? window.innerWidth < 768 : false;

    const prefersReducedMotion = isBrowser
      ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
      : false;

    const connection = isBrowser ? (navigator as any).connection : null;
    const connectionType = connection ? connection.effectiveType || '4g' : '4g';

    let recommendedQuality: QualityLevel = 'high';

    if (prefersReducedMotion || hardwareConcurrency <= 2 || deviceMemoryGB < 3 || connectionType === '2g' || connectionType === 'slow-2g') {
      recommendedQuality = 'low';
    } else if (isMobile || hardwareConcurrency <= 4 || deviceMemoryGB <= 4 || connectionType === '3g') {
      recommendedQuality = 'medium';
    } else if (hardwareConcurrency >= 8 && deviceMemoryGB >= 8) {
      recommendedQuality = 'ultra';
    } else {
      recommendedQuality = 'high';
    }

    this.cachedProfile = {
      dpr,
      hardwareConcurrency,
      deviceMemoryGB,
      isMobile,
      prefersReducedMotion,
      connectionType,
      recommendedQuality,
    };

    return this.cachedProfile;
  }

  public static reset(): void {
    this.cachedProfile = null;
  }
}
