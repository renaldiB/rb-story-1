import React, { useMemo } from 'react';
import type {
  EnvironmentMasterId,
  EnvironmentRuntimeOptions,
  ResolvedEnvironment,
} from './types.ts';
import { environmentVariantResolver } from './EnvironmentVariantResolver.ts';

interface EnvironmentRendererProps {
  environmentId: EnvironmentMasterId | string;
  sceneId?: string;
  options?: EnvironmentRuntimeOptions;
  reducedMotion?: boolean;
  parallaxOffset?: { x: number; y: number };
  showSafeZones?: boolean;
  className?: string;
  children?: React.ReactNode;
}

export const EnvironmentRenderer: React.FC<EnvironmentRendererProps> = ({
  environmentId,
  sceneId,
  options = {},
  reducedMotion = false,
  parallaxOffset = { x: 0, y: 0 },
  showSafeZones = false,
  className = '',
  children,
}) => {
  const resolved: ResolvedEnvironment = useMemo(() => {
    return (sceneId && environmentVariantResolver.resolveForScene(sceneId, options)) ||
      environmentVariantResolver.resolve(environmentId, options);
  }, [environmentId, options, sceneId]);

  const bgLayers = resolved.layers.filter((l) => l.type === 'background');
  const midLayers = resolved.layers.filter((l) => l.type === 'midground');
  const fgLayers = resolved.layers.filter((l) => l.type === 'foreground');

  const pScale = reducedMotion ? 0 : 1.0;

  return (
    <div
      data-environment-id={resolved.environment.id}
      data-variant-id={resolved.activeVariant?.variantId || 'master'}
      className={`relative w-full h-full min-h-[560px] overflow-hidden select-none ${className}`}
      style={{
        backgroundColor: '#0a0d14',
        containerType: 'size',
        contain: 'layout paint',
      }}
    >
      {/* ========================================================
          LAYER 0: BACKGROUND BACKDROP
         ======================================================== */}
      <div
        data-layer-type="background"
        className="absolute inset-0 pointer-events-none"
        style={{ zIndex: 0 }}
      >
        <img
          src={resolved.backgroundUrl}
          alt={resolved.environment.name}
          className="w-full h-full object-cover select-none transition-filter duration-300"
          style={{
            filter: resolved.cssFilter || undefined,
          }}
          loading="eager"
          decoding="async"
        />
      </div>

      {/* Additional background sub-layers if defined */}
      {bgLayers.map((layer) => {
        if (!layer.asset) return null;
        return (
          <div
            key={layer.layerId}
            className="absolute inset-0 pointer-events-none"
            style={{ zIndex: layer.semanticZ }}
          >
            <img
              src={layer.asset}
              alt={layer.description || ''}
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </div>
        );
      })}

      {/* ========================================================
          LAYER 20: MIDGROUND (WITH PARALLAX)
         ======================================================== */}
      {midLayers.map((layer) => {
        if (!layer.asset) return null;
        const pFactor = layer.parallaxFactor ?? 0.05;
        const transX = parallaxOffset.x * pFactor * pScale * 40;
        const transY = parallaxOffset.y * pFactor * pScale * 25;

        return (
          <div
            key={layer.layerId}
            data-layer-type="midground"
            className="absolute inset-0 pointer-events-none will-change-transform transition-transform duration-75"
            style={{
              zIndex: layer.semanticZ,
              transform: `translate3d(${transX}px, ${transY}px, 0)`,
            }}
          >
            <img
              src={layer.asset}
              alt={layer.description || ''}
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </div>
        );
      })}

      {/* ========================================================
          LAYER 30+: CHILD SLOTS (CHARACTERS, PROPS, UI)
         ======================================================== */}
      {children}

      {/* ========================================================
          LAYER 40/50: FOREGROUND LAYERS (WITH NEAR PARALLAX)
         ======================================================== */}
      {fgLayers.map((layer) => {
        if (!layer.asset) return null;
        const pFactor = layer.parallaxFactor ?? 0.12;
        const transX = parallaxOffset.x * pFactor * pScale * 50;
        const transY = parallaxOffset.y * pFactor * pScale * 30;

        return (
          <div
            key={layer.layerId}
            data-layer-type="foreground"
            className="absolute inset-0 pointer-events-none will-change-transform transition-transform duration-75"
            style={{
              zIndex: layer.semanticZ,
              transform: `translate3d(${transX}px, ${transY}px, 0)`,
            }}
          >
            <img
              src={layer.asset}
              alt={layer.description || ''}
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </div>
        );
      })}

      {/* ========================================================
          DEBUG OVERLAY: SAFE ZONES VISUALIZATION
         ======================================================== */}
      {showSafeZones && (
        <div className="absolute inset-0 pointer-events-none z-50">
          {/* Character Safe Zone (Green) */}
          <div
            className="absolute border-2 border-dashed border-emerald-400/80 bg-emerald-500/10 rounded flex items-start justify-end p-1.5"
            style={{
              left: `${resolved.safeZones.character.x * 100}%`,
              top: `${resolved.safeZones.character.y * 100}%`,
              width: `${resolved.safeZones.character.width * 100}%`,
              height: `${resolved.safeZones.character.height * 100}%`,
            }}
          >
            <span className="text-[10px] font-mono font-bold text-emerald-300 bg-black/60 px-1 py-0.5 rounded">
              Character Safe Zone (Baseline Y=1460)
            </span>
          </div>

          {/* Dialogue Safe Zone (Amber) */}
          <div
            className="absolute border-2 border-dashed border-amber-400/80 bg-amber-500/10 rounded flex items-start justify-end p-1.5"
            style={{
              left: `${resolved.safeZones.dialogue.x * 100}%`,
              top: `${resolved.safeZones.dialogue.y * 100}%`,
              width: `${resolved.safeZones.dialogue.width * 100}%`,
              height: `${resolved.safeZones.dialogue.height * 100}%`,
            }}
          >
            <span className="text-[10px] font-mono font-bold text-amber-300 bg-black/60 px-1 py-0.5 rounded">
              Dialogue Safe Zone (UI Z=100)
            </span>
          </div>
        </div>
      )}
    </div>
  );
};
