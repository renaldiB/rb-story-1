import React from 'react';

export type SceneTransitionType = 'cut' | 'fade' | 'crossfade' | 'slide' | 'zoom' | string;
export type CharacterTransitionType = 'instant' | 'fade' | 'slide' | 'scale';

export interface SceneTransitionConfig {
  type: SceneTransitionType;
  duration?: number;
  easing?: string;
  reducedMotion?: boolean;
}

export class TransitionManager {
  public static getSceneStyle(
    stage: 'entering' | 'active' | 'exiting',
    config: SceneTransitionConfig
  ): React.CSSProperties {
    if (config.reducedMotion || config.type === 'cut') {
      return {
        opacity: stage === 'exiting' ? 0 : 1,
        transition: 'none',
      };
    }

    const duration = config.duration ?? 250;
    const easing = config.easing ?? 'cubic-bezier(0.16, 1, 0.3, 1)';
    const transitionProperty = `opacity ${duration}ms ${easing}, transform ${duration}ms ${easing}`;

    switch (config.type) {
      case 'slide': {
        const transform =
          stage === 'entering'
            ? 'translateX(40px)'
            : stage === 'exiting'
            ? 'translateX(-40px)'
            : 'translateX(0)';
        return {
          opacity: stage === 'active' ? 1 : 0,
          transform,
          transition: transitionProperty,
        };
      }
      case 'zoom': {
        const transform =
          stage === 'entering'
            ? 'scale(1.05)'
            : stage === 'exiting'
            ? 'scale(0.96)'
            : 'scale(1)';
        return {
          opacity: stage === 'active' ? 1 : 0,
          transform,
          transition: transitionProperty,
        };
      }
      case 'crossfade':
      case 'fade':
      default: {
        return {
          opacity: stage === 'active' ? 1 : 0,
          transition: `opacity ${duration}ms ${easing}`,
        };
      }
    }
  }

  public static getCharacterTransitionStyle(
    type: CharacterTransitionType = 'instant',
    stage: 'entering' | 'visible' | 'exiting',
    reducedMotion: boolean = false
  ): React.CSSProperties {
    if (reducedMotion || type === 'instant') {
      return {
        opacity: stage === 'exiting' ? 0 : 1,
        transition: 'none',
      };
    }

    const duration = 220;
    const easing = 'ease-out';

    switch (type) {
      case 'fade':
        return {
          opacity: stage === 'visible' ? 1 : 0,
          transition: `opacity ${duration}ms ${easing}`,
        };
      case 'slide': {
        const transform =
          stage === 'entering'
            ? 'translateY(30px)'
            : stage === 'exiting'
            ? 'translateY(30px)'
            : 'translateY(0)';
        return {
          opacity: stage === 'visible' ? 1 : 0,
          transform,
          transition: `opacity ${duration}ms ${easing}, transform ${duration}ms ${easing}`,
        };
      }
      case 'scale': {
        const transform =
          stage === 'entering'
            ? 'scale(0.92)'
            : stage === 'exiting'
            ? 'scale(0.92)'
            : 'scale(1)';
        return {
          opacity: stage === 'visible' ? 1 : 0,
          transform,
          transition: `opacity ${duration}ms ${easing}, transform ${duration}ms ${easing}`,
        };
      }
      default:
        return {
          opacity: stage === 'visible' ? 1 : 0,
        };
    }
  }
}
