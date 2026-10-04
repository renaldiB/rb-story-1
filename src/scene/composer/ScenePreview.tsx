import React, { useState, useEffect, useMemo } from 'react';
import type { SceneDefinition, ChoiceDefinition } from '../../core/schema/story.schema.ts';
import { SceneComposer } from './SceneComposer.tsx';
import { SceneRuntime } from '../runtime/SceneRuntime.ts';
import { storyThemeRegistry } from '../runtime/StoryThemeRegistry.ts';
import type { SceneCompositionState } from '../types.ts';

interface ScenePreviewProps {
  initialScene?: SceneDefinition;
  allScenes?: SceneDefinition[];
}

export const ScenePreview: React.FC<ScenePreviewProps> = ({
  initialScene,
  allScenes = [],
}) => {
  const demoScene: SceneDefinition = useMemo(
    () => ({
      id: 'preview_scene_demo',
      chapterId: 'demo_ch',
      chapterTitle: 'Scene Assembly Preview · Stage 01',
      progressPercent: 25,
      location: {
        id: 'campus_cafe',
        name: 'Kafe Senja Kampus',
        time: 'afternoon',
        weather: 'rain',
        mood: 'romance',
      },
      environment: {
        background: '/assets/stories/two-hours-apart/production/env_campus_cafe.webp',
      },
      characters: [
        {
          id: 'nana_demo',
          characterId: 'nana',
          name: 'Nana',
          expression: 'soft_smile',
          pose: 'standing_neutral',
          position: 'left',
          normalizedPosition: { x: 0.32, y: 1.0 },
          scale: 1.0,
          zIndex: 30,
          isSpeaking: true,
          visible: true,
        },
        {
          id: 'agus_demo',
          characterId: 'agus',
          name: 'Agus',
          expression: 'neutral',
          pose: 'thinking',
          position: 'right',
          normalizedPosition: { x: 0.68, y: 1.0 },
          scale: 1.0,
          zIndex: 30,
          isSpeaking: false,
          visible: true,
        },
      ],
      speaker: 'Nana',
      text: 'Hujan di luar belum juga reda. Kopi kamu sudah hampir dingin, Agus.',
      timeline: [
        {
          speaker: 'Nana',
          text: 'Hujan di luar belum juga reda. Kopi kamu sudah hampir dingin, Agus.',
          characterExpression: 'soft_smile',
        },
        {
          speaker: 'Agus',
          text: 'Biar saja. Lebih baik dingin daripada harus terburu-buru berpisah lagi.',
          characterExpression: 'happy',
        },
        {
          speaker: 'Nana',
          text: 'Dua tahun lalu kamu tidak pernah bicara seperti itu...',
          characterExpression: 'embarrassed',
        },
      ],
      choices: [
        {
          id: 'choice_honest',
          text: 'Tatap matanya dan katakan sejujurnya',
          subtext: 'Meningkatkan rasa saling percaya',
          nextSceneId: 'preview_branch_honest',
        },
        {
          id: 'choice_tease',
          text: 'Tersenyum dan alihkan pembicaraan tentang kereta',
          subtext: 'Menjaga suasana tetap santai',
          nextSceneId: 'preview_branch_tease',
        },
      ],
    }),
    []
  );

  const sceneList = allScenes.length > 0 ? allScenes : initialScene ? [initialScene] : [demoScene];
  const [selectedSceneIndex, setSelectedSceneIndex] = useState(0);
  const activeScene = sceneList[selectedSceneIndex] || demoScene;

  const themes = storyThemeRegistry.listThemes();
  const [selectedThemeId, setSelectedThemeId] = useState<string>('romance');
  const activeTheme = storyThemeRegistry.getTheme(selectedThemeId);

  const [reducedMotion, setReducedMotion] = useState<boolean>(false);
  const [viewportMode, setViewportMode] = useState<'fluid' | 'mobile_p' | 'mobile_tall' | 'tablet' | 'desktop'>('fluid');
  const [showDebug, setShowDebug] = useState<boolean>(true);

  const [runtime, setRuntime] = useState<SceneRuntime>(
    () => new SceneRuntime(activeScene)
  );
  const [compositionState, setCompositionState] = useState<SceneCompositionState>(() =>
    runtime.getState()
  );

  useEffect(() => {
    const newRuntime = new SceneRuntime(activeScene);
    setRuntime(newRuntime);
    newRuntime.loadSceneAssets();
    const unsub = newRuntime.subscribe(setCompositionState);
    return () => unsub();
  }, [activeScene]);

  const handleDialogueAdvance = () => {
    runtime.stepDialogue();
  };

  const handleChoiceSelect = (choice: ChoiceDefinition) => {
    runtime.selectChoice(choice.id);
  };

  const viewportStyles: Record<string, string> = {
    fluid: 'w-full h-[620px]',
    mobile_p: 'w-[375px] h-[667px] shadow-2xl rounded-2xl border-4 border-slate-800',
    mobile_tall: 'w-[390px] h-[844px] shadow-2xl rounded-2xl border-4 border-slate-800',
    tablet: 'w-[768px] h-[1024px] shadow-2xl rounded-2xl border-4 border-slate-800',
    desktop: 'w-[1280px] h-[720px] shadow-2xl rounded-xl border border-slate-800',
  };

  return (
    <div className="w-full flex flex-col bg-slate-950 text-slate-100 p-4 font-sans select-none overflow-hidden">
      <div className="flex flex-wrap items-center justify-between pb-3 border-b border-slate-800 gap-2 text-xs">
        <div>
          <h2 className="text-base font-bold text-sky-400">
            Scene Assembly & Composition Studio
          </h2>
          <p className="text-[11px] text-slate-400">
            Interactive 2.5D Layer & Narrative Previewer
          </p>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <select
            value={selectedSceneIndex}
            onChange={(e) => setSelectedSceneIndex(parseInt(e.target.value, 10))}
            className="bg-slate-900 border border-slate-700 rounded px-2.5 py-1 text-slate-200"
          >
            {sceneList.map((s, idx) => (
              <option key={s.id} value={idx}>
                {s.id}: {s.chapterTitle || 'Scene'}
              </option>
            ))}
          </select>

          <select
            value={selectedThemeId}
            onChange={(e) => setSelectedThemeId(e.target.value)}
            className="bg-slate-900 border border-slate-700 rounded px-2.5 py-1 text-slate-200"
          >
            {themes.map((t) => (
              <option key={t.id} value={t.id}>
                Theme: {t.name}
              </option>
            ))}
          </select>

          <select
            value={viewportMode}
            onChange={(e) => setViewportMode(e.target.value as any)}
            className="bg-slate-900 border border-slate-700 rounded px-2.5 py-1 text-slate-200"
          >
            <option value="fluid">Viewport: Fluid Full Width</option>
            <option value="mobile_p">Viewport: Mobile (375x667)</option>
            <option value="mobile_tall">Viewport: Mobile Tall (390x844)</option>
            <option value="tablet">Viewport: Tablet (768x1024)</option>
            <option value="desktop">Viewport: HD Desktop (1280x720)</option>
          </select>

          <button
            onClick={() => setReducedMotion(!reducedMotion)}
            className={`px-3 py-1 rounded font-medium transition ${
              reducedMotion ? 'bg-amber-600 text-white' : 'bg-slate-800 text-slate-300'
            }`}
          >
            Reduced Motion: {reducedMotion ? 'ON' : 'OFF'}
          </button>

          {/* Debug Overlay Toggle */}
          <button
            onClick={() => setShowDebug(!showDebug)}
            className={`px-3 py-1 rounded font-medium transition ${
              showDebug ? 'bg-indigo-600 text-white' : 'bg-slate-800 text-slate-300'
            }`}
          >
            Debug: {showDebug ? 'ON' : 'OFF'}
          </button>
        </div>
      </div>

      {/* Main Preview Container */}
      <div className="flex-1 flex items-center justify-center p-4 overflow-auto min-h-[500px]">
        <div className={`transition-all duration-300 overflow-hidden relative ${viewportStyles[viewportMode]}`}>
          <SceneComposer
            scene={activeScene}
            theme={activeTheme}
            runtimeState={compositionState}
            reducedMotion={reducedMotion}
            onDialogueAdvance={handleDialogueAdvance}
            onChoiceSelect={handleChoiceSelect}
            showDebug={showDebug}
          />
        </div>
      </div>

      {/* Footer Info */}
      <div className="pt-2 border-t border-slate-800 flex justify-between text-[11px] text-slate-500 font-mono">
        <span>Active Scene: {activeScene.id} | Lifecycle: {compositionState.lifecycle}</span>
        <span>Keyboard: [Space / Enter] Advance Dialogue, [1..9] Select Choice</span>
      </div>
    </div>
  );
};
