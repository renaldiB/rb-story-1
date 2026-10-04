import type { QualityLevel } from './DeviceProfile.ts';

const QUALITY_ORDER: QualityLevel[] = ['low', 'medium', 'high', 'ultra'];

export interface ParticleBudget {
  rain: number;
  fog: number;
  glitch: number;
  motes: number;
}

export class QualityScaler {
  private currentQuality: QualityLevel;
  private consecutiveLowFrames: number = 0;
  private consecutiveHighFrames: number = 0;
  private isMobile: boolean;

  constructor(initialQuality: QualityLevel = 'high', isMobile: boolean = false) {
    this.currentQuality = initialQuality;
    this.isMobile = isMobile;
  }

  public get quality(): QualityLevel {
    return this.currentQuality;
  }

  public setQuality(quality: QualityLevel): void {
    this.currentQuality = quality;
    this.consecutiveLowFrames = 0;
    this.consecutiveHighFrames = 0;
  }

  public reportFPS(fps: number): QualityLevel {
    if (fps < 50) {
      this.consecutiveLowFrames++;
      this.consecutiveHighFrames = 0;

      if (this.consecutiveLowFrames >= 3) {
        this.degrade();
        this.consecutiveLowFrames = 0;
      }
    } else if (fps >= 57) {
      this.consecutiveHighFrames++;
      this.consecutiveLowFrames = 0;

      if (this.consecutiveHighFrames >= 8) {
        this.recover();
        this.consecutiveHighFrames = 0;
      }
    } else {
      this.consecutiveLowFrames = 0;
      this.consecutiveHighFrames = 0;
    }

    return this.currentQuality;
  }

  public degrade(): boolean {
    const currentIndex = QUALITY_ORDER.indexOf(this.currentQuality);
    if (currentIndex > 0) {
      this.currentQuality = QUALITY_ORDER[currentIndex - 1];
      return true;
    }
    return false;
  }

  public recover(): boolean {
    const currentIndex = QUALITY_ORDER.indexOf(this.currentQuality);
    if (currentIndex < QUALITY_ORDER.length - 1) {
      this.currentQuality = QUALITY_ORDER[currentIndex + 1];
      return true;
    }
    return false;
  }

  public getParticleBudget(): ParticleBudget {
    switch (this.currentQuality) {
      case 'ultra':
        return this.isMobile
          ? { rain: 45, fog: 12, glitch: 20, motes: 18 }
          : { rain: 75, fog: 20, glitch: 30, motes: 25 };
      case 'high':
        return this.isMobile
          ? { rain: 30, fog: 8, glitch: 14, motes: 12 }
          : { rain: 50, fog: 14, glitch: 20, motes: 18 };
      case 'medium':
        return this.isMobile
          ? { rain: 18, fog: 5, glitch: 8, motes: 8 }
          : { rain: 30, fog: 8, glitch: 12, motes: 12 };
      case 'low':
      default:
        return this.isMobile
          ? { rain: 8, fog: 2, glitch: 4, motes: 4 }
          : { rain: 15, fog: 4, glitch: 6, motes: 6 };
    }
  }
}
