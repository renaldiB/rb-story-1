import React from 'react';
import type { CanonicalFxId, CanonicalPropId, PropDefinition } from './types.ts';

interface ScreenGlowEffectProps {
  intensity?: number;
  reducedMotion?: boolean;
}

export const ScreenGlowEffect: React.FC<ScreenGlowEffectProps> = ({
  intensity = 0.85,
  reducedMotion = false,
}) => {
  return (
    <div
      data-fx="fx_screen_glow_late_night"
      className="absolute inset-0 pointer-events-none z-[32]"
      style={{
        opacity: intensity,
        mixBlendMode: 'screen',
        background:
          'radial-gradient(circle at 50% 65%, rgba(56, 189, 248, 0.22) 0%, rgba(30, 58, 138, 0.10) 45%, transparent 75%)',
        animation: reducedMotion ? 'none' : 'pulse 4s ease-in-out infinite',
      }}
    />
  );
};

interface CinematicVignetteEffectProps {
  intensity?: number;
}

export const CinematicVignetteEffect: React.FC<CinematicVignetteEffectProps> = ({
  intensity = 1.0,
}) => {
  return (
    <div
      data-fx="fx_cinematic_vignette"
      className="absolute inset-0 pointer-events-none z-[48]"
      style={{
        opacity: intensity,
        background:
          'radial-gradient(ellipse at center, transparent 52%, rgba(10, 14, 22, 0.40) 80%, rgba(6, 9, 15, 0.78) 100%)',
      }}
    />
  );
};

interface PropRendererProps {
  propId: CanonicalPropId;
  propDef?: PropDefinition;
  position?: { x: number; y: number };
  scale?: number;
  interactive?: boolean;
  onClick?: () => void;
  className?: string;
  responsiveToScene?: boolean;
}

export const PropRenderer: React.FC<PropRendererProps> = ({
  propId,
  propDef,
  position = { x: 50, y: 50 },
  scale = 1.0,
  interactive = false,
  onClick,
  className = '',
  responsiveToScene = false,
}) => {
  const assetPath = propDef?.assetWebp || `/assets/props/masters/${propId}.webp`;
  const fallbackPng = propDef?.assetPng || `/assets/props/masters/${propId}.png`;

  const anchorX = propDef?.anchor.x ?? 0.5;
  const anchorY = propDef?.anchor.y ?? 0.5;

  return (
    <div
      data-prop-id={propId}
      onClick={interactive ? onClick : undefined}
      className={`absolute select-none pointer-events-auto transition-transform duration-300 ${
        interactive ? 'cursor-pointer hover:scale-105 active:scale-95' : 'pointer-events-none'
      } ${className}`}
      style={{
        left: `${position.x}%`,
        top: `${position.y}%`,
        transform: `translate(-${anchorX * 100}%, -${anchorY * 100}%) scale(${scale})`,
        zIndex: 22,
      }}
    >
      <picture>
        <source srcSet={assetPath} type="image/webp" />
        <img
          src={fallbackPng}
          alt={propDef?.name || propId}
          className="max-w-none object-contain drop-shadow-md"
          loading="lazy"
          style={{
            width: propDef
              ? responsiveToScene
                ? `${(propDef.dimensions.width / 1376) * 100}cqw`
                : `${propDef.dimensions.width}px`
              : 'auto',
            height: propDef
              ? responsiveToScene
                ? 'auto'
                : `${propDef.dimensions.height}px`
              : 'auto',
          }}
        />
      </picture>
    </div>
  );
};

interface AtmosphereEffectsLayerProps {
  activeFx?: CanonicalFxId[];
  reducedMotion?: boolean;
  isMobile?: boolean;
}

export const AtmosphereEffectsLayer: React.FC<AtmosphereEffectsLayerProps> = ({
  activeFx = [],
  reducedMotion = false,
}) => {
  const hasScreenGlow = activeFx.includes('fx_screen_glow_late_night');
  const hasVignette = activeFx.includes('fx_cinematic_vignette');

  return (
    <>
      {hasScreenGlow && <ScreenGlowEffect reducedMotion={reducedMotion} />}
      {hasVignette && <CinematicVignetteEffect />}
    </>
  );
};
