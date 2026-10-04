import React, { useState, useEffect, useRef } from 'react';
import type { Expression, CharacterPosition } from '../types/story.ts';
import { variantResolver } from './CharacterVariantResolver.ts';
import { assetLoader } from './CharacterAssetLoader.ts';
import { CharacterStateMachine } from './CharacterStateMachine.ts';
import type { ResolvedCharacterVariant } from './types.ts';

export interface CharacterRendererProps {
  characterId: string;
  expression?: Expression | string;
  pose?: string;
  position?: CharacterPosition;
  normalizedPosition?: { x: number; y: number };
  scale?: number;
  isSpeaking?: boolean;
  isDimmed?: boolean;
  visible?: boolean;
  flipX?: boolean;
  zIndex?: number;
  reducedMotion?: boolean;
  showDebug?: boolean;
}

export const CharacterRenderer: React.FC<CharacterRendererProps> = ({
  characterId,
  expression = 'neutral',
  pose = 'standing_neutral',
  position = 'center',
  normalizedPosition,
  scale = 1.0,
  isSpeaking = false,
  isDimmed = false,
  visible = true,
  flipX = false,
  zIndex = 30,
  reducedMotion = false,
  showDebug = false,
}) => {
  const [currentResolved, setCurrentResolved] = useState<ResolvedCharacterVariant>(() =>
    variantResolver.resolve({ characterId, expression, pose })
  );
  const [displayedUrl, setDisplayedUrl] = useState<string>(currentResolved.assetPath);
  const [loadStatus, setLoadStatus] = useState<'LOADING' | 'READY' | 'ERROR'>('LOADING');
  const [opacity, setOpacity] = useState<number>(visible ? 1 : 0);
  const stateMachineRef = useRef<CharacterStateMachine>(
    new CharacterStateMachine(visible ? 'VISIBLE' : 'HIDDEN')
  );

  let normX = 0.5;
  if (normalizedPosition) {
    normX = normalizedPosition.x;
  } else {
    if (position === 'left') normX = 0.22;
    if (position === 'right') normX = 0.78;
    if (position === 'foreground') normX = 0.5;
    if (position === 'background') normX = 0.5;
  }

  const canonicalScale = currentResolved.canonicalScale || 1.0;
  const positionScaleMultiplier = position === 'foreground' ? 1.1 : position === 'background' ? 0.9 : 1.0;
  const effectiveScale = canonicalScale * scale * positionScaleMultiplier;

  const filterStyle = isSpeaking
    ? 'drop-shadow(0 14px 28px rgba(0,0,0,0.65)) brightness(1.08) contrast(1.04)'
    : isDimmed
    ? 'brightness(0.35) contrast(0.85)'
    : 'brightness(0.9) contrast(0.96)';

  useEffect(() => {
    const nextResolved = variantResolver.resolve({ characterId, expression, pose });
    setCurrentResolved(nextResolved);

    const sm = stateMachineRef.current;
    if (visible && sm.getState() === 'VISIBLE') {
      sm.startVariantTransition();
    }

    setLoadStatus('LOADING');
    assetLoader
      .loadAsset(nextResolved.assetPath)
      .then(() => {
        setDisplayedUrl(nextResolved.assetPath);
        setLoadStatus('READY');
        if (visible) {
          sm.setVisible();
        }
      })
      .catch(() => {
        setLoadStatus('ERROR');
        const fallback = variantResolver.resolve({ characterId });
        setDisplayedUrl(fallback.assetPath);
      });
  }, [characterId, expression, pose, visible]);

  useEffect(() => {
    const sm = stateMachineRef.current;
    if (visible) {
      if (sm.getState() === 'HIDDEN' || sm.getState() === 'EXITING') sm.enter();
      setOpacity(1);
      const timer = setTimeout(() => {
        sm.setVisible();
      }, reducedMotion ? 0 : 250);
      return () => clearTimeout(timer);
    } else {
      if (sm.getState() !== 'HIDDEN' && sm.getState() !== 'EXITING') sm.exit();
      setOpacity(0);
      const timer = setTimeout(() => {
        sm.hide();
      }, reducedMotion ? 0 : 250);
      return () => clearTimeout(timer);
    }
  }, [visible, reducedMotion]);

  if (!visible && opacity === 0) {
    return null;
  }

  const transitionDuration = reducedMotion ? '0ms' : '220ms';

  return (
    <div
      className="absolute bottom-0 select-none pointer-events-none will-change-transform"
      style={{
        left: `${normX * 100}%`,
        transform: `translateX(-50%) ${isSpeaking ? 'translateY(-6px)' : 'translateY(0)'}`,
        zIndex,
        opacity,
        transition: `opacity ${transitionDuration} ease-out, transform ${transitionDuration} ease-out`,
      }}
      aria-hidden="true"
    >
      <div
        className="relative flex items-end justify-center max-h-[66vh] sm:max-h-[74vh] md:max-h-[82vh] origin-bottom"
        style={{
          transform: `scale(${effectiveScale})`,
          transition: reducedMotion ? 'none' : 'transform 200ms ease-out',
        }}
      >
        <img
          src={displayedUrl}
          alt=""
          loading="eager"
          decoding="async"
          className={`max-h-[66vh] sm:max-h-[74vh] md:max-h-[82vh] w-auto max-w-[45vw] object-contain select-none transition-all duration-200 ${
            flipX ? '-scale-x-100' : ''
          }`}
          style={{
            filter: filterStyle,
          }}
          onError={() => {
            setLoadStatus('ERROR');
          }}
        />

        {/* Development Debug Overlay */}
        {showDebug && (
          <div className="absolute top-2 left-2 bg-black/85 text-emerald-400 font-mono text-[10px] p-2 rounded border border-emerald-500/50 backdrop-blur-sm pointer-events-auto z-50">
            <div><strong>CHARACTER:</strong> {characterId.toUpperCase()}</div>
            <div><strong>VARIANT:</strong> {currentResolved.variantId}</div>
            <div><strong>EXPR:</strong> {String(expression)}</div>
            <div><strong>POSE:</strong> {String(pose)}</div>
            <div><strong>POS (X,Y):</strong> ({normX.toFixed(2)}, 1.0)</div>
            <div><strong>SCALE:</strong> {effectiveScale.toFixed(2)}x</div>
            <div><strong>BASELINE:</strong> Y=1460</div>
            <div><strong>STATUS:</strong> {loadStatus}</div>
            <div><strong>FALLBACK:</strong> {currentResolved.fallback ? 'YES' : 'NO'}</div>
          </div>
        )}
      </div>
    </div>
  );
};

export const SecondaryCharacterRenderer = CharacterRenderer;
