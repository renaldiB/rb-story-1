import React, { useState, useEffect } from 'react';
import { useStoryStore } from '../core/state/storyStore.ts';
import { useUIStore } from '../core/state/uiStore.ts';
import { PerformanceManager, type PerformanceMetrics } from '../core/performance/PerformanceManager.ts';
import { Bug, X, RotateCcw, FastForward, Activity, Users, Layers, Sparkles, Image as ImageIcon } from 'lucide-react';
const SecondaryCharacterTestScene = React.lazy(() =>
  import('./SecondaryCharacterTestScene.tsx').then((m) => ({ default: m.SecondaryCharacterTestScene }))
);
const ScenePreview = React.lazy(() =>
  import('../scene/composer/ScenePreview.tsx').then((m) => ({ default: m.ScenePreview }))
);
const PropAtmosphereInspector = React.lazy(() =>
  import('./PropAtmosphereInspector.tsx').then((m) => ({ default: m.PropAtmosphereInspector }))
);
const EnvironmentTestScene = React.lazy(() =>
  import('../environment/EnvironmentTestScene.tsx').then((m) => ({ default: m.EnvironmentTestScene }))
);

interface SceneDebugOverlayProps {
  currentSceneId?: string;
  chapterTitle?: string;
  progressPercent?: number;
  mood?: string;
  speaker?: string | null;
  variables?: Record<string, number>;
  flags?: Record<string, boolean>;
  allSceneIds?: string[];
  onJumpToScene?: (sceneId: string) => void;
  onNextBeat?: () => void;
  onRestart?: () => void;
}

export const SceneDebugOverlay: React.FC<SceneDebugOverlayProps> = (props) => {
  const { isDebugOverlayOpen, setDebugOverlayOpen } = useUIStore();
  const store = useStoryStore();

  const [metrics, setMetrics] = useState<PerformanceMetrics>(() =>
    PerformanceManager.getInstance().getMetrics()
  );
  const [isCharacterInspectorOpen, setCharacterInspectorOpen] = useState(false);
  const [isScenePreviewOpen, setScenePreviewOpen] = useState(false);
  const [isPropInspectorOpen, setPropInspectorOpen] = useState(false);
  const [isEnvironmentInspectorOpen, setEnvironmentInspectorOpen] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      if (params.get('debug') === '1' || window.location.hash.includes('debug')) {
        setDebugOverlayOpen(true);
      }
    }
  }, [setDebugOverlayOpen]);

  useEffect(() => {
    if (!isDebugOverlayOpen) return;

    const timer = setInterval(() => {
      setMetrics(PerformanceManager.getInstance().getMetrics());
    }, 400);

    return () => clearInterval(timer);
  }, [isDebugOverlayOpen]);

  if (!isDebugOverlayOpen) {
    return (
      <button
        onClick={() => setDebugOverlayOpen(true)}
        className="fixed bottom-3 right-3 z-50 p-2 bg-neutral-900/90 text-amber-400 hover:text-amber-300 border border-neutral-700/60 rounded-full shadow-lg backdrop-blur text-xs flex items-center gap-1.5 transition-all"
        title="Open Scene Debug Overlay (?debug=1)"
      >
        <Bug className="w-4 h-4" />
        <span className="font-mono text-[10px]">DEBUG</span>
      </button>
    );
  }

  const activeSceneId = props.currentSceneId || store.currentScene?.id || '';
  const activeChapterTitle = props.chapterTitle || store.currentScene?.chapterTitle || '';
  const activeProgress = props.progressPercent ?? store.currentScene?.progressPercent ?? 0;
  const activeMood = props.mood || store.currentScene?.location.mood || 'neutral';
  const activeSpeaker = props.speaker !== undefined ? props.speaker : store.currentDialogue?.speaker;
  const activeVariables = props.variables || store.variables || {};
  const activeFlags = props.flags || store.flags || {};
  const sceneList = props.allSceneIds || (store.storyDocument ? Object.keys(store.storyDocument.scenes) : []);
  const fsmStatus = store.engine?.stateMachine.status || 'ACTIVE';

  const handleJump = (id: string) => {
    if (props.onJumpToScene) {
      props.onJumpToScene(id);
    } else {
      store.jumpToScene(id);
    }
  };

  const handleNext = () => {
    if (props.onNextBeat) {
      props.onNextBeat();
    } else {
      store.nextDialogue();
    }
  };

  const handleRestart = () => {
    if (props.onRestart) {
      props.onRestart();
    } else {
      store.restartStory();
    }
  };

  const fpsColor =
    metrics.fps >= 55
      ? 'text-emerald-400'
      : metrics.fps >= 45
        ? 'text-amber-400'
        : 'text-rose-500';

  return (
    <div className="fixed bottom-3 right-3 z-50 w-84 max-w-[90vw] max-h-[85vh] bg-neutral-950/95 border border-amber-500/40 rounded-xl shadow-2xl backdrop-blur-md text-neutral-200 text-xs font-mono flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-2">
      <div className="flex items-center justify-between px-3 py-2 bg-neutral-900/80 border-b border-neutral-800">
        <div className="flex items-center gap-2">
          <Bug className="w-4 h-4 text-amber-400" />
          <span className="font-bold text-amber-400">ENGINE DEBUG</span>
          <span className="px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-300 text-[10px]">
            {fsmStatus}
          </span>
        </div>
        <button
          onClick={() => setDebugOverlayOpen(false)}
          className="text-neutral-400 hover:text-neutral-100 p-0.5"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      <div className="p-3 overflow-y-auto space-y-3 divide-y divide-neutral-800/80">
        <div className="space-y-1.5">
          <div className="flex items-center justify-between text-[10px] uppercase tracking-wider text-neutral-400 font-semibold">
            <span className="flex items-center gap-1">
              <Activity className="w-3 h-3 text-cyan-400" /> Performance HUD
            </span>
            <span className="text-cyan-400 uppercase font-bold text-[10px]">
              TIER: {metrics.quality}
            </span>
          </div>

          <div className="grid grid-cols-3 gap-1.5 text-[10px]">
            <div className="bg-neutral-900/80 p-1.5 rounded border border-neutral-800">
              <div className="text-neutral-400">FPS</div>
              <div className={`text-sm font-bold ${fpsColor}`}>
                {metrics.fps}{' '}
                <span className="text-[9px] text-neutral-400 font-normal">
                  ({metrics.frameTimeMs}ms)
                </span>
              </div>
            </div>

            <div className="bg-neutral-900/80 p-1.5 rounded border border-neutral-800">
              <div className="text-neutral-400">PARTICLES</div>
              <div className="text-sm font-bold text-sky-300">
                {metrics.activeParticles}
              </div>
            </div>

            <div className="bg-neutral-900/80 p-1.5 rounded border border-neutral-800">
              <div className="text-neutral-400">ASSETS</div>
              <div className="text-sm font-bold text-emerald-300">
                {metrics.loadedAssets} <span className="text-[9px] font-normal text-neutral-400">cached</span>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between text-[10px] text-neutral-400 pt-0.5">
            <span>
              DPR: <strong className="text-neutral-200">{metrics.device.dpr}x</strong> | Cores:{' '}
              <strong className="text-neutral-200">{metrics.device.hardwareConcurrency}</strong>
            </span>
            {metrics.memoryEstimateMB && (
              <span>
                Heap: <strong className="text-neutral-200">{metrics.memoryEstimateMB}MB</strong>
              </span>
            )}
          </div>
        </div>

        {/* Scene Info */}
        <div className="pt-2 space-y-1">
          <div className="text-[10px] uppercase tracking-wider text-neutral-400 font-semibold">
            Scene & Flow
          </div>
          <div className="text-amber-300 font-bold truncate">
            {activeSceneId} <span className="text-neutral-400 font-normal">({activeChapterTitle})</span>
          </div>
          <div className="text-[11px] text-neutral-300">
            Progress: {activeProgress}% | Mood: {activeMood}
          </div>
          <div className="text-[11px] text-neutral-400">
            Speaker: <span className="text-neutral-200">{activeSpeaker || 'Narration'}</span>
          </div>

          {/* Scene Jump */}
          {sceneList.length > 0 && (
            <div className="pt-1.5 flex items-center gap-1.5">
              <select
                value={activeSceneId}
                onChange={(e) => handleJump(e.target.value)}
                className="flex-1 bg-neutral-900 border border-neutral-700 text-neutral-200 rounded px-2 py-1 text-[11px] focus:outline-none focus:border-amber-500"
              >
                {sceneList.map((id) => (
                  <option key={id} value={id}>
                    {id}
                  </option>
                ))}
              </select>
            </div>
          )}
        </div>

        {/* Action Controls */}
        <div className="pt-2 flex items-center gap-2">
          <button
            onClick={handleNext}
            className="flex-1 flex items-center justify-center gap-1 bg-neutral-800 hover:bg-neutral-700 text-neutral-200 py-1 px-2 rounded text-[11px] transition-colors"
          >
            <FastForward className="w-3 h-3 text-amber-400" />
            <span>Next Beat</span>
          </button>
          <button
            onClick={handleRestart}
            className="flex items-center justify-center gap-1 bg-neutral-800 hover:bg-neutral-700 text-neutral-300 py-1 px-2 rounded text-[11px] transition-colors"
            title="Restart Story"
          >
            <RotateCcw className="w-3 h-3" />
          </button>
        </div>

        {/* Character, Scene, and Prop/FX Inspector Launchers */}
        <div className="pt-2 flex flex-col gap-1.5">
          <button
            onClick={() => setCharacterInspectorOpen(true)}
            className="w-full bg-emerald-950/80 hover:bg-emerald-900/80 text-emerald-300 border border-emerald-700/50 py-1 px-2 rounded text-[11px] font-semibold flex items-center justify-center gap-1.5 transition"
          >
            <Users className="w-3.5 h-3.5" />
            <span>Open Character Inspector</span>
          </button>
          <button
            onClick={() => setScenePreviewOpen(true)}
            className="w-full bg-sky-950/80 hover:bg-sky-900/80 text-sky-300 border border-sky-700/50 py-1 px-2 rounded text-[11px] font-semibold flex items-center justify-center gap-1.5 transition"
          >
            <Layers className="w-3.5 h-3.5" />
            <span>Open Scene Assembly Studio</span>
          </button>
          <button
            onClick={() => setPropInspectorOpen(true)}
            className="w-full bg-amber-950/80 hover:bg-amber-900/80 text-amber-300 border border-amber-700/50 py-1 px-2 rounded text-[11px] font-semibold flex items-center justify-center gap-1.5 transition"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Open Props & Atmosphere Studio</span>
          </button>
          <button
            onClick={() => setEnvironmentInspectorOpen(true)}
            className="w-full bg-teal-950/80 hover:bg-teal-900/80 text-teal-300 border border-teal-700/50 py-1 px-2 rounded text-[11px] font-semibold flex items-center justify-center gap-1.5 transition"
          >
            <ImageIcon className="w-3.5 h-3.5" />
            <span>Open Environment Studio (2.5D)</span>
          </button>
        </div>

        {/* Variables Inspector */}
        <div className="pt-2 space-y-1">
          <div className="text-[10px] uppercase tracking-wider text-neutral-400 font-semibold">
            Variables
          </div>
          <div className="grid grid-cols-2 gap-1 text-[11px]">
            {Object.entries(activeVariables).map(([k, v]) => (
              <div
                key={k}
                className="bg-neutral-900/60 px-2 py-0.5 rounded border border-neutral-800 flex justify-between"
              >
                <span className="text-neutral-400 truncate">{k}:</span>
                <span className="text-amber-400 font-semibold">{v}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Flags Inspector */}
        <div className="pt-2 space-y-1">
          <div className="text-[10px] uppercase tracking-wider text-neutral-400 font-semibold">
            Active Flags
          </div>
          <div className="flex flex-wrap gap-1">
            {Object.entries(activeFlags)
              .filter(([, v]) => Boolean(v))
              .map(([k]) => (
                <span
                  key={k}
                  className="px-1.5 py-0.5 bg-emerald-950/70 border border-emerald-600/40 text-emerald-400 text-[10px] rounded"
                >
                  ✓ {k}
                </span>
              ))}
            {Object.values(activeFlags).filter(Boolean).length === 0 && (
              <span className="text-neutral-500 text-[10px] italic">No active flags</span>
            )}
          </div>
        </div>
      </div>

      {/* Fullscreen Character Inspector Modal */}
      {isCharacterInspectorOpen && (
        <div className="fixed inset-0 z-50 bg-black/85 flex items-center justify-center p-3">
          <div className="relative w-full max-w-5xl h-[90vh] bg-slate-950 rounded-xl border border-emerald-500/50 shadow-2xl flex flex-col overflow-hidden">
            <div className="flex justify-between items-center px-4 py-2 bg-slate-900 border-b border-slate-800">
              <span className="text-emerald-400 font-bold font-mono text-sm">
                SECONDARY CHARACTER RUNTIME INSPECTOR & TEST MATRIX
              </span>
              <button
                onClick={() => setCharacterInspectorOpen(false)}
                className="text-slate-400 hover:text-white p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="flex-1 overflow-auto">
              <React.Suspense fallback={<div className="p-8 text-center text-slate-400 font-mono">Loading character inspector...</div>}>
                <SecondaryCharacterTestScene />
              </React.Suspense>
            </div>
          </div>
        </div>
      )}

      {/* Fullscreen Scene Assembly Studio Modal */}
      {isScenePreviewOpen && (
        <div className="fixed inset-0 z-50 bg-black/85 flex items-center justify-center p-3">
          <div className="relative w-full max-w-6xl h-[92vh] bg-slate-950 rounded-xl border border-sky-500/50 shadow-2xl flex flex-col overflow-hidden">
            <div className="flex justify-between items-center px-4 py-2 bg-slate-900 border-b border-slate-800">
              <span className="text-sky-400 font-bold font-mono text-sm">
                SCENE ASSEMBLY & COMPOSITION STUDIO
              </span>
              <button
                onClick={() => setScenePreviewOpen(false)}
                className="text-slate-400 hover:text-white p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="flex-1 overflow-auto">
              <React.Suspense fallback={<div className="p-8 text-center text-slate-400 font-mono">Loading scene studio...</div>}>
                <ScenePreview />
              </React.Suspense>
            </div>
          </div>
        </div>
      )}

      {/* Fullscreen Props & Atmosphere FX Studio Modal */}
      {isPropInspectorOpen && (
        <div className="fixed inset-0 z-50 bg-black/85 flex items-center justify-center p-3">
          <div className="relative w-full max-w-6xl h-[92vh] bg-slate-950 rounded-xl border border-amber-500/50 shadow-2xl flex flex-col overflow-hidden">
            <div className="flex justify-between items-center px-4 py-2 bg-slate-900 border-b border-slate-800">
              <span className="text-amber-400 font-bold font-mono text-sm">
                INDEPENDENT PROPS & ATMOSPHERE FX STUDIO
              </span>
              <button
                onClick={() => setPropInspectorOpen(false)}
                className="text-slate-400 hover:text-white p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="flex-1 overflow-auto">
              <React.Suspense fallback={<div className="p-8 text-center text-slate-400 font-mono">Loading prop inspector...</div>}>
                <PropAtmosphereInspector />
              </React.Suspense>
            </div>
          </div>
        </div>
      )}

      {/* Fullscreen Environment Runtime Studio Modal */}
      {isEnvironmentInspectorOpen && (
        <div className="fixed inset-0 z-50 bg-black/85 flex items-center justify-center p-3">
          <div className="relative w-full max-w-6xl h-[92vh] bg-slate-950 rounded-xl border border-teal-500/50 shadow-2xl flex flex-col overflow-hidden">
            <div className="flex justify-between items-center px-4 py-2 bg-slate-900 border-b border-slate-800">
              <span className="text-teal-400 font-bold font-mono text-sm">
                ENVIRONMENT RUNTIME STUDIO & 2.5D MATRIX
              </span>
              <button
                onClick={() => setEnvironmentInspectorOpen(false)}
                className="text-slate-400 hover:text-white p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="flex-1 overflow-auto">
              <React.Suspense fallback={<div className="p-8 text-center text-slate-400 font-mono">Loading environment studio...</div>}>
                <EnvironmentTestScene />
              </React.Suspense>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
