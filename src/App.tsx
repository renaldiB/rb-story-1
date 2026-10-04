import { useState, useEffect, useCallback, useRef, useMemo } from 'react';
import {
  createInitialState,
  advanceStory,
  discoverSecretItem,
  loadAuto
} from './engine/storyEngine';
import type { StoryState, ChoiceOption, StoryDefinition } from './types/story';
import { STORY_CATALOG } from './data/multiStoryCatalog';
import { computeThemeTokens } from './engine/themeEngine';
import { audio } from './services/audioService';

import { DesktopFrame } from './components/DesktopFrame';
import { TopNav } from './components/TopNav';
import { StoryStage } from './components/StoryStage';
import { DialogueBox } from './components/DialogueBox';
import { ChoiceMenu } from './components/ChoiceMenu';
import React from 'react';
const EndingScreen = React.lazy(() =>
  import('./components/EndingScreen').then((m) => ({ default: m.EndingScreen }))
);
const DiegeticInterface = React.lazy(() =>
  import('./components/DiegeticInterface').then((m) => ({ default: m.DiegeticInterface }))
);
const HistoryModal = React.lazy(() =>
  import('./components/HistoryModal').then((m) => ({ default: m.HistoryModal }))
);
const StoryLibraryModal = React.lazy(() =>
  import('./components/StoryLibraryModal').then((m) => ({ default: m.StoryLibraryModal }))
);
const SettingsModal = React.lazy(() =>
  import('./components/SettingsModal').then((m) => ({ default: m.SettingsModal }))
);
const SceneDebugOverlay = React.lazy(() =>
  import('./components/SceneDebugOverlay').then((m) => ({ default: m.SceneDebugOverlay }))
);
import { AssetManager } from './core/performance/AssetManager.ts';
import { environmentRuntime } from './environment/EnvironmentRuntime.ts';
import {
  getProductionSceneAssetUrls,
  getProductionSceneRequirement,
} from './scene/runtime/ProductionSceneRegistry.ts';

async function preloadSceneBeforeTransition(scene: StoryDefinition['scenes'][string]): Promise<void> {
  const assetManager = AssetManager.getInstance();
  assetManager.registerSceneAssets(scene.id, getProductionSceneAssetUrls(scene));
  const requirement = getProductionSceneRequirement(scene.id);
  await Promise.all([
    assetManager.preloadScene(scene.id),
    requirement
      ? environmentRuntime.preloadEnvironment(requirement.environmentId, {
          variantId: requirement.variantId,
          preloadLayers: true,
        })
      : Promise.resolve(),
  ]);
}

export default function App() {
  const [state, setState] = useState<StoryState>(() => {
    return loadAuto() || createInitialState('ch1_intro_1', 'romance_rain');
  });

  const currentStory: StoryDefinition =
    STORY_CATALOG[state.currentStoryId] || STORY_CATALOG['romance_rain'];

  const currentScene =
    currentStory.scenes[state.currentSceneId] ||
    currentStory.scenes[currentStory.firstSceneId];

  const hasChoices = Boolean(currentScene.choices && currentScene.choices.length > 0);

  const themeTokens = useMemo(() => {
    return computeThemeTokens(
      currentStory.genre,
      currentScene.location.mood,
      currentScene.emotionalIntensity ?? 0.35,
      currentStory.visualBible,
      currentScene.cameraAction
    );
  }, [currentStory, currentScene]);

  const [isMuted, setIsMuted] = useState<boolean>(audio.isMuted);
  const [masterVolume, setMasterVolume] = useState<number>(0.7);
  const [textSpeed, setTextSpeed] = useState<'slow' | 'normal' | 'fast' | 'instant'>('normal');
  const [fontSize, setFontSize] = useState<'normal' | 'large' | 'xlarge'>('normal');
  const [highContrast, setHighContrast] = useState<boolean>(false);
  const [reducedMotion, setReducedMotion] = useState<boolean>(false);
  const [isAutoPlay, setIsAutoPlay] = useState<boolean>(false);
  const [dialogueReadySceneId, setDialogueReadySceneId] = useState<string | null>(null);

  const [viewMode, setViewMode] = useState<'widescreen' | 'mobile'>(() => {
    try {
      const saved = localStorage.getItem('story_view_mode');
      if (saved === 'mobile' || saved === 'widescreen') return saved;
    } catch {
    }
    return 'widescreen';
  });

  const handleToggleViewMode = useCallback(() => {
    setViewMode((prev) => {
      const next = prev === 'widescreen' ? 'mobile' : 'widescreen';
      try {
        localStorage.setItem('story_view_mode', next);
      } catch {
      }
      return next;
    });
  }, []);

  useEffect(() => {
    const delayMs = currentScene.actionCG && !reducedMotion ? 1500 : 0;
    const timer = window.setTimeout(() => setDialogueReadySceneId(currentScene.id), delayMs);
    return () => window.clearTimeout(timer);
  }, [currentScene.id, currentScene.actionCG, reducedMotion]);

  const dialogueReady = dialogueReadySceneId === currentScene.id;

  const [isHistoryOpen, setIsHistoryOpen] = useState<boolean>(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState<boolean>(false);
  const [isLibraryOpen, setIsLibraryOpen] = useState<boolean>(false);
  const [isDiegeticOpen, setIsDiegeticOpen] = useState<boolean>(false);

  useEffect(() => {
    if (currentScene.ambientTrack) {
      audio.setAmbientTrack(currentScene.ambientTrack);
    }
    if (currentScene.soundEffect) {
      audio.playSoundEffect(currentScene.soundEffect);
    }
  }, [currentScene.id, currentScene.ambientTrack, currentScene.soundEffect]);

  const previousSceneIdRef = useRef<string | null>(null);
  const transitionPendingRef = useRef(false);
  useEffect(() => {
    const assetMgr = AssetManager.getInstance();
    if (previousSceneIdRef.current && previousSceneIdRef.current !== currentScene.id) {
      assetMgr.releaseScene(previousSceneIdRef.current);
    }
    previousSceneIdRef.current = currentScene.id;
    const requirement = getProductionSceneRequirement(currentScene.id);
    assetMgr.registerSceneAssets(currentScene.id, getProductionSceneAssetUrls(currentScene));
    assetMgr.activateScene(currentScene.id);
    if (requirement) {
      void environmentRuntime.loadEnvironment(requirement.environmentId, {
        variantId: requirement.variantId,
        preloadLayers: true,
      });
    }
    void assetMgr.preloadScene(currentScene.id);

    const nextTargetIds = currentScene.nextSceneId
      ? [currentScene.nextSceneId]
      : (currentScene.choices || []).map((choice) => choice.nextSceneId);
    for (const nextTargetId of nextTargetIds) {
      const nextScene = currentStory.scenes[nextTargetId];
      if (nextScene) void preloadSceneBeforeTransition(nextScene);
    }
  }, [currentScene, currentScene.id, currentScene.nextSceneId, currentScene.choices, currentStory.scenes]);

  const handleAdvance = useCallback(async () => {
    if (hasChoices) return;
    if (transitionPendingRef.current) return;

    if (currentScene.nextSceneId && currentStory.scenes[currentScene.nextSceneId]) {
      const nextScene = currentStory.scenes[currentScene.nextSceneId];
      transitionPendingRef.current = true;
      try {
        await preloadSceneBeforeTransition(nextScene);
        setState((prev) => advanceStory(prev, nextScene));
      } finally {
        transitionPendingRef.current = false;
      }
    }
  }, [hasChoices, currentScene.nextSceneId, currentStory.scenes]);

  const handleSelectChoice = useCallback(
    async (choice: ChoiceOption) => {
      if (transitionPendingRef.current) return;
      audio.playSoundEffect('click');
      const nextScene = currentStory.scenes[choice.nextSceneId];
      if (nextScene) {
        transitionPendingRef.current = true;
        try {
          await preloadSceneBeforeTransition(nextScene);
          setState((prev) => advanceStory(prev, nextScene, choice));
        } finally {
          transitionPendingRef.current = false;
        }
      }
    },
    [currentStory.scenes]
  );

  const handleDiscoverSecret = useCallback((secretId: string, flag: string) => {
    audio.playSoundEffect('chime');
    setState((prev) => discoverSecretItem(prev, secretId, flag));
  }, []);

  const handleItemRead = useCallback((flag: string) => {
    audio.playSoundEffect('click');
    setState((prev) => ({
      ...prev,
      flags: { ...prev.flags, [flag]: true }
    }));
  }, []);

  const handleSelectStory = useCallback((story: StoryDefinition) => {
    audio.playSoundEffect('page_turn');
    const newState = createInitialState(story.firstSceneId, story.id);
    setState(newState);
  }, []);

  const autoPlayTimerRef = useRef<number | null>(null);
  useEffect(() => {
    if (!isAutoPlay || hasChoices || currentScene.endingId) {
      if (autoPlayTimerRef.current) clearTimeout(autoPlayTimerRef.current);
      return;
    }

    autoPlayTimerRef.current = window.setTimeout(() => {
      handleAdvance();
    }, 4200);

    return () => {
      if (autoPlayTimerRef.current) clearTimeout(autoPlayTimerRef.current);
    };
  }, [isAutoPlay, hasChoices, currentScene.endingId, currentScene.id, handleAdvance]);

  const handleChangeMasterVolume = (val: number) => {
    setMasterVolume(val);
    audio.masterVolume = val;
    audio.updateVolumes();
  };

  const handleToggleMute = () => {
    const muted = audio.toggleMute();
    setIsMuted(muted);
  };

  useEffect(() => {
    const handleGlobalKeyDown = (e: KeyboardEvent) => {
      if (['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement).tagName)) return;

      if (e.key === 'm' || e.key === 'M') {
        handleToggleMute();
      } else if (e.key === 'a' || e.key === 'A') {
        setIsAutoPlay((prev) => !prev);
      } else if (e.key === 'v' || e.key === 'V') {
        handleToggleViewMode();
      } else if (e.key === 'h' || e.key === 'H') {
        setIsHistoryOpen((prev) => !prev);
      } else if (e.key === 'Escape') {
        setIsSettingsOpen((prev) => !prev);
      } else if (
        (e.key === ' ' || e.key === 'Enter') &&
        !hasChoices &&
        !isHistoryOpen &&
        !isSettingsOpen &&
        !isLibraryOpen &&
        !isDiegeticOpen
      ) {
        e.preventDefault();
        handleAdvance();
      }
    };

    window.addEventListener('keydown', handleGlobalKeyDown);
    return () => window.removeEventListener('keydown', handleGlobalKeyDown);
  }, [hasChoices, isHistoryOpen, isSettingsOpen, isLibraryOpen, isDiegeticOpen, handleAdvance, handleToggleViewMode]);

  const handleReplayStory = () => {
    const fresh = createInitialState(currentStory.firstSceneId, currentStory.id);
    setState(fresh);
  };

  const handleJumpToScene = (sceneId: string) => {
    if (currentStory.scenes[sceneId]) {
      setState((prev) => advanceStory(prev, currentStory.scenes[sceneId]));
    }
  };

  return (
    <DesktopFrame bgLocationId={currentScene.location.id} viewMode={viewMode}>
      <div className={viewMode === 'widescreen' ? 'absolute top-0 inset-x-0 z-40' : 'relative w-full z-40'}>
        <TopNav
          chapterTitle={currentScene.chapterTitle}
          progressPercent={currentScene.progressPercent}
          genre={currentStory.genre}
          isMuted={isMuted}
          onToggleMute={handleToggleMute}
          isAutoPlay={isAutoPlay}
          onToggleAutoPlay={() => setIsAutoPlay(!isAutoPlay)}
          onOpenHistory={() => setIsHistoryOpen(true)}
          onOpenSettings={() => setIsSettingsOpen(true)}
          onOpenLibrary={() => setIsLibraryOpen(true)}
          viewMode={viewMode}
          onToggleViewMode={handleToggleViewMode}
        />
      </div>

      <div className={viewMode === 'widescreen' ? 'absolute inset-0 w-full h-full' : 'relative w-full flex-1 min-h-[50vh] sm:min-h-[55vh]'}>
        <StoryStage
          key={currentScene.id}
          scene={currentScene}
          particleType={currentStory.visualBible.particleLanguage}
          cameraTransform={themeTokens.cameraTransform}
          vignetteStyle={themeTokens.vignetteStyle}
          reducedMotion={reducedMotion}
          discoveredSecrets={state.discoveredSecrets}
          onDiscoverSecret={handleDiscoverSecret}
          onOpenDiegetic={() => setIsDiegeticOpen(true)}
          isDiegeticRead={Boolean(
            currentScene.diegeticItem && state.flags[currentScene.diegeticItem.flagToUnlock]
          )}
        />
      </div>

      <div
        className={
          viewMode === 'widescreen'
            ? 'absolute bottom-3 sm:bottom-5 md:bottom-6 inset-x-0 z-30 px-3 sm:px-6 md:px-8 flex justify-center pointer-events-none'
            : 'relative z-30 px-3 pb-3 pt-1 bg-[#0e111a] flex flex-col gap-2'
        }
      >
        <div
          className={`w-full ${
            viewMode === 'widescreen'
              ? hasChoices
                ? 'max-w-5xl lg:max-w-6xl xl:max-w-7xl'
                : 'max-w-4xl lg:max-w-5xl'
              : ''
          } pointer-events-auto transition-opacity duration-300`}
          style={{ opacity: dialogueReady ? 1 : 0, pointerEvents: dialogueReady ? 'auto' : 'none' }}
          aria-hidden={!dialogueReady}
        >
          {hasChoices ? (
            <ChoiceMenu
              choices={currentScene.choices!}
              onSelect={handleSelectChoice}
              variables={state.variables}
              flags={state.flags}
              highContrast={highContrast}
              themeTokens={themeTokens}
            />
          ) : (
            <DialogueBox
              key={currentScene.id}
              speaker={currentScene.speaker}
              text={currentScene.text}
              subText={currentScene.subText}
              onAdvance={handleAdvance}
              hasChoices={hasChoices}
              textSpeed={textSpeed}
              fontSize={fontSize}
              highContrast={highContrast}
              themeTokens={themeTokens}
            />
          )}
        </div>
      </div>

      {/* Diegetic In-World Item Interface (Phone, Recorder, Terminal, Grimoire) */}
      <React.Suspense fallback={null}>
        {currentScene.diegeticItem && isDiegeticOpen && (
          <DiegeticInterface
            item={currentScene.diegeticItem}
            isOpen={isDiegeticOpen}
            onClose={() => setIsDiegeticOpen(false)}
            onItemRead={handleItemRead}
            isUnlocked={Boolean(state.flags[currentScene.diegeticItem.flagToUnlock])}
          />
        )}
      </React.Suspense>

      {/* Ending Screen Overlay (if ending reached) */}
      <React.Suspense fallback={null}>
        {currentScene.endingId && (
          <EndingScreen
            endingId={currentScene.endingId}
            endingsCatalog={currentStory.endings}
            discoveredSecrets={state.discoveredSecrets}
            unlockedEndings={state.unlockedEndings}
            onReplay={handleReplayStory}
            onChapterSelect={handleJumpToScene}
          />
        )}
      </React.Suspense>

      {/* History Log Modal */}
      <React.Suspense fallback={null}>
        {isHistoryOpen && (
          <HistoryModal
            isOpen={isHistoryOpen}
            onClose={() => setIsHistoryOpen(false)}
            history={state.history}
          />
        )}
      </React.Suspense>

      {/* Story Library Modal (Genre switcher) */}
      <React.Suspense fallback={null}>
        {isLibraryOpen && (
          <StoryLibraryModal
            isOpen={isLibraryOpen}
            onClose={() => setIsLibraryOpen(false)}
            currentStoryId={currentStory.id}
            onSelectStory={handleSelectStory}
          />
        )}
      </React.Suspense>

      {/* Settings Modal */}
      <React.Suspense fallback={null}>
        {isSettingsOpen && (
          <SettingsModal
            isOpen={isSettingsOpen}
            onClose={() => setIsSettingsOpen(false)}
            isMuted={isMuted}
            onToggleMute={handleToggleMute}
            masterVolume={masterVolume}
            onChangeMasterVolume={handleChangeMasterVolume}
            textSpeed={textSpeed}
            onChangeTextSpeed={setTextSpeed}
            fontSize={fontSize}
            onChangeFontSize={setFontSize}
            highContrast={highContrast}
            onToggleHighContrast={() => setHighContrast(!highContrast)}
            reducedMotion={reducedMotion}
            onToggleReducedMotion={() => setReducedMotion(!reducedMotion)}
            currentState={state}
            currentScene={currentScene}
            onLoadState={(loaded) => setState(loaded)}
            onRestartChapter={() => {
              const firstInChapter = Object.values(currentStory.scenes).find(
                (s) => s.chapterId === currentScene.chapterId
              );
              if (firstInChapter) setState((prev) => advanceStory(prev, firstInChapter));
            }}
            onRestartStory={handleReplayStory}
          />
        )}
      </React.Suspense>

      {/* Real-time Engine Debug Overlay (?debug=1) */}
      <React.Suspense fallback={null}>
        <SceneDebugOverlay
          currentSceneId={currentScene.id}
          chapterTitle={currentScene.chapterTitle}
          progressPercent={currentScene.progressPercent}
          mood={currentScene.location.mood}
          speaker={currentScene.speaker}
          variables={state.variables}
          flags={state.flags}
          allSceneIds={Object.keys(currentStory.scenes)}
          onJumpToScene={handleJumpToScene}
          onNextBeat={handleAdvance}
          onRestart={handleReplayStory}
        />
      </React.Suspense>
    </DesktopFrame>
  );
}
