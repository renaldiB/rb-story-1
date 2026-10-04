import React, { useEffect, useCallback, useMemo } from 'react';
import type { ChoiceDefinition } from '../../core/schema/story.schema.ts';
import { CharacterRenderer } from '../../character/CharacterRenderer.tsx';
import { storyThemeRegistry } from '../runtime/StoryThemeRegistry.ts';
import { TransitionManager } from '../transitions/TransitionManager.ts';
import {
  SEMANTIC_Z_INDEX,
  type StoryTheme,
  type SceneComposerProps,
} from '../types.ts';

export const SceneComposer: React.FC<SceneComposerProps> = ({
  scene,
  theme: themeProp,
  runtimeState,
  reducedMotion = false,
  parallaxOffset = { x: 0, y: 0 },
  onDialogueAdvance,
  onChoiceSelect,
  onSceneComplete,
  showDebug = false,
}) => {
  const theme: StoryTheme = themeProp || storyThemeRegistry.getTheme(scene.location?.mood);

  const currentDialogue = runtimeState?.currentDialogue ?? {
    speaker: scene.speaker,
    text: scene.text,
    subText: scene.subText,
  };

  const isTimelineComplete = runtimeState?.isComplete ?? true;
  const availableChoices = useMemo(
    () => runtimeState?.availableChoices ?? scene.choices ?? [],
    [runtimeState?.availableChoices, scene.choices]
  );

  const activeSpeakerName = currentDialogue?.speaker?.trim().toLowerCase();

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
        return;
      }

      if (e.key === ' ' || e.key === 'Enter') {
        e.preventDefault();
        if (!isTimelineComplete) {
          onDialogueAdvance?.();
        } else if (availableChoices.length === 0) {
          onSceneComplete?.();
        }
      } else if (availableChoices.length > 0 && /^[1-9]$/.test(e.key)) {
        const index = parseInt(e.key, 10) - 1;
        if (index < availableChoices.length) {
          e.preventDefault();
          onChoiceSelect?.(availableChoices[index]);
        }
      }
    },
    [isTimelineComplete, availableChoices, onDialogueAdvance, onChoiceSelect, onSceneComplete]
  );

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  const bgData = scene.environment?.background;
  const bgSrc =
    typeof bgData === 'string'
      ? bgData
      : bgData?.src || '/assets/stories/two-hours-apart/production/env_campus_cafe.webp';

  const sceneTransitionStyle = TransitionManager.getSceneStyle('active', {
    type: scene.transition?.type || theme.transitions.defaultType,
    duration: scene.transition?.duration || theme.transitions.defaultDuration,
    reducedMotion,
  });

  return (
    <div
      className="relative w-full h-full min-h-[560px] overflow-hidden select-none flex flex-col justify-between"
      style={{
        backgroundColor: theme.colors.background,
        color: theme.colors.text,
        fontFamily: theme.typography.fontFamily,
        ...sceneTransitionStyle,
      }}
      role="region"
      aria-label={`Scene ${scene.id}: ${scene.chapterTitle || 'Story Scene'}`}
    >
      {/* ========================================================
          LAYER 0: BACKGROUND
         ======================================================== */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ zIndex: SEMANTIC_Z_INDEX.background }}
      >
        <img
          src={bgSrc}
          alt=""
          className="w-full h-full object-cover select-none"
          loading="eager"
          decoding="async"
        />
      </div>

      {/* ========================================================
          LAYER 10 & 20: ENVIRONMENT FAR & MIDGROUND (WITH PARALLAX)
         ======================================================== */}
      {scene.environment?.midground?.map((layer, idx) => {
        const pFactor = reducedMotion ? 0 : layer.parallax ?? 0.05;
        const transX = parallaxOffset.x * pFactor * 50 + (layer.offsetX ?? 0);
        const transY = parallaxOffset.y * pFactor * 30 + (layer.offsetY ?? 0);

        return (
          <div
            key={`midground_${idx}`}
            className="absolute inset-0 pointer-events-none will-change-transform"
            style={{
              zIndex: layer.zIndex ?? SEMANTIC_Z_INDEX.environment_mid,
              opacity: layer.opacity ?? 1,
              transform: `translate3d(${transX}px, ${transY}px, 0) scale(${layer.scale ?? 1})`,
            }}
          >
            {layer.src && (
              <img
                src={layer.src}
                alt=""
                className="w-full h-full object-cover"
                loading="lazy"
              />
            )}
          </div>
        );
      })}

      {/* ========================================================
          LAYER 30: CHARACTER COMPOSITION
         ======================================================== */}
      <div
        className="absolute inset-0 pointer-events-none flex items-end justify-center overflow-hidden"
        style={{ zIndex: SEMANTIC_Z_INDEX.character }}
      >
        {scene.characters.map((char) => {
          const isSpeaking = Boolean(
            char.isSpeaking ||
              (activeSpeakerName &&
                (char.name.toLowerCase().includes(activeSpeakerName) ||
                  char.id.toLowerCase().includes(activeSpeakerName)))
          );

          // Support normalized positioning (0..1) or semantic presets
          const normalizedPos = char.normalizedPosition || {
            x: char.position === 'left' ? 0.25 : char.position === 'right' ? 0.75 : 0.5,
            y: 1.0,
          };

          return (
            <CharacterRenderer
              key={char.id}
              characterId={char.characterId || char.id}
              expression={char.expression}
              pose={char.pose || 'standing_neutral'}
              position={char.position || 'center'}
              normalizedPosition={normalizedPos}
              scale={char.scale ?? 1.0}
              isSpeaking={isSpeaking}
              visible={char.visible ?? true}
              flipX={char.flipX ?? false}
              zIndex={char.zIndex ?? SEMANTIC_Z_INDEX.character}
              reducedMotion={reducedMotion}
              showDebug={showDebug}
            />
          );
        })}
      </div>

      {/* ========================================================
          LAYER 40 & 50: FOREGROUND ENVIRONMENT & ATMOSPHERIC FX
         ======================================================== */}
      {scene.environment?.foreground?.map((layer, idx) => (
        <div
          key={`foreground_${idx}`}
          className="absolute inset-0 pointer-events-none"
          style={{
            zIndex: layer.zIndex ?? SEMANTIC_Z_INDEX.foreground,
            opacity: layer.opacity ?? 1,
          }}
        >
          {layer.src && (
            <img
              src={layer.src}
              alt=""
              className="w-full h-full object-cover"
              loading="lazy"
            />
          )}
        </div>
      ))}

      {/* Theme Vignette Effect */}
      {theme.colors.vignette && (
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            zIndex: SEMANTIC_Z_INDEX.foreground,
            background: theme.colors.vignette,
          }}
        />
      )}

      {/* Bottom Cinematic Gradient to ease dialogue contrast */}
      <div
        className="absolute inset-x-0 bottom-0 h-48 pointer-events-none bg-gradient-to-t from-black/85 via-black/40 to-transparent"
        style={{ zIndex: SEMANTIC_Z_INDEX.foreground + 1 }}
      />

      {/* Top Bar / Scene Header Info (if present) */}
      <header
        className="relative px-4 py-3 flex items-center justify-between text-xs pointer-events-auto"
        style={{ zIndex: SEMANTIC_Z_INDEX.ui }}
      >
        <div className="flex items-center gap-2">
          {scene.chapterTitle && (
            <span className="font-semibold text-slate-300 drop-shadow">
              {scene.chapterTitle}
            </span>
          )}
          {scene.location?.name && (
            <span className="text-slate-400 font-mono text-[11px] px-2 py-0.5 rounded bg-black/40 border border-white/10">
              {scene.location.name}
            </span>
          )}
        </div>
      </header>

      {/* ========================================================
          LAYER 100: DIALOGUE & INTERACTION UI
         ======================================================== */}
      <div
        className="relative p-4 sm:p-6 w-full max-w-4xl mx-auto flex flex-col gap-3 pointer-events-auto"
        style={{ zIndex: SEMANTIC_Z_INDEX.ui }}
      >
        {/* Branching Choices Container */}
        {isTimelineComplete && availableChoices.length > 0 && (
          <div
            className="flex flex-col gap-2 mb-2 animate-fade-in"
            role="menu"
            aria-label="Story Choices"
          >
            {availableChoices.map((choice: ChoiceDefinition, index: number) => (
              <button
                key={choice.id}
                onClick={() => onChoiceSelect?.(choice)}
                className="w-full text-left p-3.5 rounded-lg bg-black/80 hover:bg-black/95 text-slate-100 hover:text-white border border-slate-700/80 hover:border-amber-400/90 shadow-lg backdrop-blur-md transition-all duration-200 active:scale-[0.99] flex items-center justify-between group focus:outline-none focus:ring-2 focus:ring-amber-400/50"
                role="menuitem"
                tabIndex={0}
                aria-label={`Choice ${index + 1}: ${choice.text}`}
              >
                <div>
                  <div className="font-medium text-sm sm:text-base group-hover:text-amber-300 transition-colors">
                    <span className="text-amber-400 font-mono text-xs mr-2 font-bold">
                      [{index + 1}]
                    </span>
                    {choice.text}
                  </div>
                  {choice.subtext && (
                    <div className="text-xs text-slate-400 mt-0.5">
                      {choice.subtext}
                    </div>
                  )}
                </div>
                <span className="text-amber-400/80 group-hover:translate-x-1 transition-transform text-sm">
                  →
                </span>
              </button>
            ))}
          </div>
        )}

        {/* Dialogue Box */}
        {currentDialogue && (
          <div
            onClick={() => {
              if (!isTimelineComplete) {
                onDialogueAdvance?.();
              } else if (availableChoices.length === 0) {
                onSceneComplete?.();
              }
            }}
            className={`cursor-pointer rounded-xl p-4 sm:p-5 border shadow-2xl transition-all ${theme.dialogue.bgClass} ${theme.dialogue.borderClass}`}
            role="button"
            tabIndex={0}
            aria-label="Click or press Space to continue"
          >
            {currentDialogue.speaker && (
              <div className={`text-sm sm:text-base mb-1.5 font-bold ${theme.dialogue.speakerColorClass}`}>
                {currentDialogue.speaker}
              </div>
            )}
            <div className={`text-sm sm:text-base leading-relaxed ${theme.dialogue.textColorClass}`}>
              {currentDialogue.text}
            </div>
            {currentDialogue.subText && (
              <div className="text-xs text-slate-400 mt-1 italic">
                {currentDialogue.subText}
              </div>
            )}

            {/* Advance Indicator */}
            <div className="flex justify-end items-center mt-2 text-[10px] text-slate-400 font-mono gap-1">
              <span>{isTimelineComplete ? 'COMPLETE (Next/Choose)' : 'TAP TO CONTINUE ▶'}</span>
            </div>
          </div>
        )}
      </div>

      {/* Developer Debug Overlay HUD */}
      {showDebug && (
        <div className="absolute top-2 right-2 bg-black/90 text-emerald-400 font-mono text-[10px] p-2.5 rounded border border-emerald-500/60 backdrop-blur pointer-events-auto z-[200] max-w-xs">
          <div className="font-bold text-emerald-300 border-b border-emerald-500/30 pb-1 mb-1">
            SCENE COMPOSER DEBUG
          </div>
          <div>SCENE ID: {scene.id}</div>
          <div>THEME: {theme.name} ({theme.genre})</div>
          <div>CHARACTERS: {scene.characters.length}</div>
          <div className="truncate">
            SPEAKER: {currentDialogue?.speaker || 'None (Narrator)'}
          </div>
          <div>BEAT: {runtimeState?.activeDialogueIndex ?? 0} (Complete: {String(isTimelineComplete)})</div>
          <div>CHOICES: {availableChoices.length}</div>
        </div>
      )}
    </div>
  );
};
