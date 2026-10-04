import React, { useState } from 'react';
import { characterRegistry } from '../character/CharacterAssetRegistry.ts';
import { variantResolver } from '../character/CharacterVariantResolver.ts';
import { CharacterRenderer } from '../character/CharacterRenderer.tsx';
import type { Expression } from '../types/story.ts';

export const SecondaryCharacterTestScene: React.FC = () => {
  const characters = characterRegistry.listCharacters();
  const [selectedCharId, setSelectedCharId] = useState<string>('kaka');
  const [selectedExpr, setSelectedExpr] = useState<string>('soft_smile');
  const [selectedPose, setSelectedPose] = useState<string>('standing_neutral');
  const [posX, setPosX] = useState<number>(0.5);
  const [scale, setScale] = useState<number>(1.0);
  const [isSpeaking, setIsSpeaking] = useState<boolean>(true);
  const [showGrid, setShowGrid] = useState<boolean>(false);
  const [showDebug, setShowDebug] = useState<boolean>(true);

  const expressions = [
    'soft_smile',
    'neutral',
    'happy',
    'serious',
    'worried',
    'pensive',
    'surprised',
    'sad',
    'angry',
    'embarrassed',
  ];

  const poses = ['standing_neutral', 'looking_away', 'arms_crossed', 'thinking', 'casual_interaction'];

  const resetDefaults = () => {
    setSelectedCharId('kaka');
    setSelectedExpr('soft_smile');
    setSelectedPose('standing_neutral');
    setPosX(0.5);
    setScale(1.0);
    setIsSpeaking(true);
  };

  const resolved = variantResolver.resolve({
    characterId: selectedCharId,
    expression: selectedExpr,
    pose: selectedPose,
  });

  return (
    <div className="relative w-full min-h-[600px] h-full flex flex-col bg-slate-950 text-slate-100 p-4 font-sans select-none overflow-hidden">
      <div className="flex flex-wrap items-center justify-between pb-3 border-b border-slate-800 gap-2">
        <div>
          <h2 className="text-lg font-bold text-emerald-400">
            Secondary Character Runtime Inspector
          </h2>
          <p className="text-xs text-slate-400">
            Interactive Test Fixture & Verification Stage
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowGrid(!showGrid)}
            className={`px-3 py-1 text-xs rounded font-medium transition ${
              showGrid ? 'bg-emerald-600 text-white' : 'bg-slate-800 hover:bg-slate-700 text-slate-300'
            }`}
          >
            {showGrid ? 'Switch to Inspector View' : 'View 8-Character Grid'}
          </button>
          <button
            onClick={() => setShowDebug(!showDebug)}
            className={`px-3 py-1 text-xs rounded font-medium transition ${
              showDebug ? 'bg-indigo-600 text-white' : 'bg-slate-800 hover:bg-slate-700 text-slate-300'
            }`}
          >
            Debug Overlay: {showDebug ? 'ON' : 'OFF'}
          </button>
          <button
            onClick={resetDefaults}
            className="px-3 py-1 text-xs rounded font-medium bg-rose-900/80 hover:bg-rose-800 text-rose-200 transition"
          >
            Reset
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      {!showGrid ? (
        <div className="flex-1 flex flex-col lg:flex-row gap-4 mt-3 overflow-hidden">
          {/* Controls Panel */}
          <div className="w-full lg:w-72 bg-slate-900/80 p-3 rounded-lg border border-slate-800 flex flex-col gap-3 text-xs overflow-y-auto">
            {/* Character Selector */}
            <div>
              <label className="font-semibold text-slate-300 block mb-1">Character:</label>
              <div className="grid grid-cols-2 gap-1">
                {characters.map((c) => (
                  <button
                    key={c.id}
                    onClick={() => setSelectedCharId(c.id)}
                    className={`px-2 py-1 rounded text-left transition ${
                      selectedCharId === c.id
                        ? 'bg-emerald-600 text-white font-bold'
                        : 'bg-slate-800 hover:bg-slate-700 text-slate-300'
                    }`}
                  >
                    {c.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Expression Selector */}
            <div>
              <label className="font-semibold text-slate-300 block mb-1">Expression:</label>
              <div className="grid grid-cols-2 gap-1">
                {expressions.map((expr) => (
                  <button
                    key={expr}
                    onClick={() => setSelectedExpr(expr)}
                    className={`px-2 py-1 rounded text-left transition ${
                      selectedExpr === expr
                        ? 'bg-amber-600 text-white font-bold'
                        : 'bg-slate-800 hover:bg-slate-700 text-slate-300'
                    }`}
                  >
                    {expr}
                  </button>
                ))}
              </div>
            </div>

            {/* Pose Selector */}
            <div>
              <label className="font-semibold text-slate-300 block mb-1">Pose:</label>
              <div className="flex flex-col gap-1">
                {poses.map((p) => (
                  <button
                    key={p}
                    onClick={() => setSelectedPose(p)}
                    className={`px-2 py-1 rounded text-left transition ${
                      selectedPose === p
                        ? 'bg-cyan-600 text-white font-bold'
                        : 'bg-slate-800 hover:bg-slate-700 text-slate-300'
                    }`}
                  >
                    {p}
                  </button>
                ))}
              </div>
            </div>

            {/* Sliders: PosX, Scale */}
            <div>
              <div className="flex justify-between mb-1">
                <span className="font-semibold text-slate-300">Position X (0..1):</span>
                <span className="font-mono text-emerald-400">{posX.toFixed(2)}</span>
              </div>
              <input
                type="range"
                min="0.1"
                max="0.9"
                step="0.05"
                value={posX}
                onChange={(e) => setPosX(parseFloat(e.target.value))}
                className="w-full accent-emerald-500"
              />
            </div>

            <div>
              <div className="flex justify-between mb-1">
                <span className="font-semibold text-slate-300">Scale Multiplier:</span>
                <span className="font-mono text-emerald-400">{scale.toFixed(2)}x</span>
              </div>
              <input
                type="range"
                min="0.6"
                max="1.4"
                step="0.05"
                value={scale}
                onChange={(e) => setScale(parseFloat(e.target.value))}
                className="w-full accent-emerald-500"
              />
            </div>

            {/* Speaker Toggle */}
            <div className="flex items-center justify-between pt-1">
              <span className="font-semibold text-slate-300">Active Speaker:</span>
              <button
                onClick={() => setIsSpeaking(!isSpeaking)}
                className={`px-3 py-1 rounded font-bold transition ${
                  isSpeaking ? 'bg-emerald-600 text-white' : 'bg-slate-800 text-slate-400'
                }`}
              >
                {isSpeaking ? 'YES (1.0)' : 'NO (Dim 0.75)'}
              </button>
            </div>
          </div>

          {/* Interactive Rendering Stage */}
          <div className="flex-1 relative bg-slate-900/50 rounded-lg border border-slate-800 min-h-[460px] overflow-hidden flex items-end justify-center">
            {/* Background Grid & Horizon Guide */}
            <div className="absolute inset-0 pointer-events-none opacity-20 bg-[linear-gradient(to_right,#334155_1px,transparent_1px),linear-gradient(to_bottom,#334155_1px,transparent_1px)] bg-[size:40px_40px]" />

            {/* Canonical Baseline Indicator line at bottom */}
            <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-rose-500/80 pointer-events-none z-10 flex items-center justify-end px-2">
              <span className="bg-rose-950/90 text-rose-300 font-mono text-[10px] px-1 border border-rose-500/50">
                Baseline Y = 1460 (Stage Floor)
              </span>
            </div>

            {/* Rendered Character */}
            <CharacterRenderer
              characterId={selectedCharId}
              expression={selectedExpr as Expression}
              pose={selectedPose}
              normalizedPosition={{ x: posX, y: 1.0 }}
              scale={scale}
              isSpeaking={isSpeaking}
              showDebug={showDebug}
            />
          </div>
        </div>
      ) : (
        /* 8-Character Matrix Grid View */
        <div className="flex-1 grid grid-cols-2 md:grid-cols-4 gap-3 mt-3 overflow-y-auto p-2 bg-slate-900/40 rounded-lg border border-slate-800">
          {characters.map((c) => (
            <div
              key={c.id}
              className="relative flex flex-col items-center justify-end bg-slate-950/80 rounded border border-slate-800 p-2 min-h-[260px] overflow-hidden"
            >
              <div className="absolute top-2 left-2 z-40 bg-black/75 px-1.5 py-0.5 rounded text-[11px] font-bold text-emerald-400">
                {c.name} ({c.canonicalScale}x)
              </div>
              <div className="relative w-full h-[220px] flex items-end justify-center">
                <CharacterRenderer
                  characterId={c.id}
                  expression="soft_smile"
                  pose="standing_neutral"
                  position="center"
                  scale={0.7}
                  isSpeaking={true}
                  showDebug={false}
                />
              </div>
              <div className="text-[10px] font-mono text-slate-400 mt-1">
                Base Height: {c.baseHeight}cm
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Footer Info */}
      <div className="mt-3 pt-2 border-t border-slate-800 flex justify-between text-[11px] text-slate-500">
        <span>Resolved Asset: {resolved.assetPath}</span>
        <span>Source: {resolved.source} {resolved.fallback ? '(FALLBACK)' : '(DIRECT)'}</span>
      </div>
    </div>
  );
};
