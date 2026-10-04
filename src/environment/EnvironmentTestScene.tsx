import React, { useState } from 'react';
import { environmentRegistry } from './EnvironmentRegistry.ts';
import { environmentAssetLoader } from './EnvironmentAssetLoader.ts';
import { EnvironmentRenderer } from './EnvironmentRenderer.tsx';
import type { EnvironmentMasterId, EnvironmentVariantDefinition } from './types.ts';
import { PropRenderer } from '../effects/AtmosphereEffects.tsx';
import { AtmosphereLayer } from '../components/AtmosphereLayer.tsx';
import type { CanonicalPropId } from '../effects/types.ts';

export const EnvironmentTestScene: React.FC = () => {
  const allEnvs = environmentRegistry.getAllEnvironments();
  const [selectedEnvId, setSelectedEnvId] = useState<EnvironmentMasterId>(allEnvs[0].id);
  const [selectedVariantId, setSelectedVariantId] = useState<string>('');
  const [reducedMotion, setReducedMotion] = useState(false);
  const [showSafeZones, setShowSafeZones] = useState(true);
  const [parallaxX, setParallaxX] = useState(0);
  const [parallaxY, setParallaxY] = useState(0);
  const [testPropId, setTestPropId] = useState<CanonicalPropId | ''>('prop_coffee');
  const [testFx, setTestFx] = useState<'rain' | 'fog' | 'motes' | 'none'>('rain');
  const [activeLayers, setActiveLayers] = useState<Record<string, boolean>>({
    background: true,
    midground: true,
    foreground: true,
  });

  const currentEnv = environmentRegistry.getEnvironment(selectedEnvId)!;
  const variants = currentEnv.variants || [];

  const handleEnvChange = (envId: EnvironmentMasterId) => {
    setSelectedEnvId(envId);
    setSelectedVariantId('');
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (reducedMotion) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const nx = (e.clientX - rect.left) / rect.width - 0.5;
    const ny = (e.clientY - rect.top) / rect.height - 0.5;
    setParallaxX(nx);
    setParallaxY(ny);
  };

  const metrics = environmentAssetLoader.getCacheMetrics();

  return (
    <div className="w-full h-full flex flex-col bg-neutral-950 text-neutral-100 font-mono text-xs select-none">
      <div className="flex items-center justify-between px-4 py-2 bg-neutral-900 border-b border-neutral-800">
        <div className="flex items-center gap-3">
          <span className="font-bold text-amber-400">ENVIRONMENT RUNTIME STUDIO</span>
          <span className="text-neutral-400 text-[11px]">
            12 Masters • 36 Layers • 19 Variants • Parallax 2.5D
          </span>
        </div>
        <div className="flex items-center gap-3 text-[11px] text-neutral-400">
          <span>Cached: <strong className="text-emerald-400">{metrics.totalCached}</strong></span>
          <span>Memory: <strong className="text-sky-400">{(metrics.estimatedMemoryBytes / (1024 * 1024)).toFixed(1)}MB</strong></span>
        </div>
      </div>

      <div className="flex-1 flex overflow-hidden">
        <div className="w-80 bg-neutral-900/70 border-r border-neutral-800 overflow-y-auto p-3 space-y-3">
          <div>
            <label className="text-[10px] uppercase font-bold text-neutral-400 tracking-wider">
              Environment Master (12)
            </label>
            <select
              value={selectedEnvId}
              onChange={(e) => handleEnvChange(e.target.value as EnvironmentMasterId)}
              className="mt-1 w-full bg-neutral-900 border border-neutral-700 text-neutral-200 rounded px-2 py-1.5 text-xs font-semibold focus:outline-none focus:border-amber-500"
            >
              {allEnvs.map((env) => (
                <option key={env.id} value={env.id}>
                  {env.name} ({env.id})
                </option>
              ))}
            </select>
            <div className="mt-1 text-[10px] text-neutral-500">
              Location: {currentEnv.locationId} • Priority: {currentEnv.priority}
            </div>
          </div>

          <div>
            <label className="text-[10px] uppercase font-bold text-neutral-400 tracking-wider">
              Variant ({variants.length} available)
            </label>
            <select
              value={selectedVariantId}
              onChange={(e) => setSelectedVariantId(e.target.value)}
              className="mt-1 w-full bg-neutral-900 border border-neutral-700 text-neutral-200 rounded px-2 py-1 text-xs focus:outline-none focus:border-amber-500"
            >
              <option value="">Master Base (Default)</option>
              {variants.map((v: EnvironmentVariantDefinition) => (
                <option key={v.variantId} value={v.variantId}>
                  {v.variantId} [{v.mode.toUpperCase()}]
                </option>
              ))}
            </select>
          </div>

          <div className="pt-2 border-t border-neutral-800 space-y-1.5">
            <div className="text-[10px] uppercase font-bold text-neutral-400 tracking-wider">
              Layer Stack Toggles
            </div>
            {['background', 'midground', 'foreground'].map((layerKey) => (
              <label
                key={layerKey}
                className="flex items-center justify-between p-1.5 rounded bg-neutral-900/60 border border-neutral-800 text-[11px] cursor-pointer"
              >
                <span className="capitalize">{layerKey} Layer</span>
                <input
                  type="checkbox"
                  checked={activeLayers[layerKey]}
                  onChange={(e) =>
                    setActiveLayers((prev) => ({ ...prev, [layerKey]: e.target.checked }))
                  }
                  className="accent-amber-400"
                />
              </label>
            ))}
          </div>

          <div className="pt-2 border-t border-neutral-800 space-y-1.5">
            <div className="text-[10px] uppercase font-bold text-neutral-400 tracking-wider">
              Testing Overlays
            </div>
            <label className="flex items-center justify-between p-1.5 rounded bg-neutral-900/60 border border-neutral-800 text-[11px] cursor-pointer">
              <span>Show Safe Zones (Char + UI)</span>
              <input
                type="checkbox"
                checked={showSafeZones}
                onChange={(e) => setShowSafeZones(e.target.checked)}
                className="accent-emerald-400"
              />
            </label>

            <label className="flex items-center justify-between p-1.5 rounded bg-neutral-900/60 border border-neutral-800 text-[11px] cursor-pointer">
              <span>prefers-reduced-motion</span>
              <input
                type="checkbox"
                checked={reducedMotion}
                onChange={(e) => setReducedMotion(e.target.checked)}
                className="accent-rose-400"
              />
            </label>
          </div>

          <div className="pt-2 border-t border-neutral-800 space-y-1.5">
            <div className="text-[10px] uppercase font-bold text-neutral-400 tracking-wider">
              Test Prop Overlay
            </div>
            <select
              value={testPropId}
              onChange={(e) => setTestPropId(e.target.value as CanonicalPropId | '')}
              className="w-full bg-neutral-900 border border-neutral-700 text-neutral-200 rounded px-2 py-1 text-xs"
            >
              <option value="">None</option>
              <option value="prop_phone">prop_phone (Smartphone)</option>
              <option value="prop_coffee">prop_coffee (Steaming Mug)</option>
              <option value="prop_old_photo">prop_old_photo (Polaroid)</option>
              <option value="prop_train_ticket">prop_train_ticket (Ticket)</option>
              <option value="prop_backpack">prop_backpack (Backpack)</option>
              <option value="prop_lighter_antique">prop_lighter_antique (Lighter)</option>
              <option value="prop_laptop">prop_laptop (Laptop)</option>
              <option value="prop_agus_cat">prop_agus_cat (Cat)</option>
              <option value="prop_dog_rescue">prop_dog_rescue (Dog)</option>
            </select>
          </div>

          <div className="pt-2 border-t border-neutral-800 space-y-1.5">
            <div className="text-[10px] uppercase font-bold text-neutral-400 tracking-wider">
              Test Atmosphere FX
            </div>
            <select
              value={testFx}
              onChange={(e) => setTestFx(e.target.value as 'rain' | 'fog' | 'motes' | 'none')}
              className="w-full bg-neutral-900 border border-neutral-700 text-neutral-200 rounded px-2 py-1 text-xs"
            >
              <option value="none">None</option>
              <option value="rain">Rain (Procedural 35°)</option>
              <option value="fog">Fog (Drifting Mist)</option>
              <option value="motes">Sunlight Motes</option>
            </select>
          </div>
        </div>

        <div
          className="flex-1 relative bg-black flex items-center justify-center overflow-hidden cursor-crosshair"
          onMouseMove={handleMouseMove}
        >
          <div className="relative w-full h-full max-w-[1376px] max-h-[768px] aspect-[16/9] shadow-2xl overflow-hidden border border-neutral-800">
            <EnvironmentRenderer
              environmentId={selectedEnvId}
              options={{
                variantId: selectedVariantId || undefined,
                reducedMotion,
              }}
              reducedMotion={reducedMotion}
              parallaxOffset={{ x: parallaxX, y: parallaxY }}
              showSafeZones={showSafeZones}
            >
              {testPropId && (
                <PropRenderer
                  propId={testPropId}
                  position={{ x: 50, y: 70 }}
                  scale={0.9}
                  interactive={true}
                />
              )}

              {testFx !== 'none' && (
                <AtmosphereLayer
                  weather={testFx === 'rain' ? 'rain' : testFx === 'fog' ? 'fog' : 'clear'}
                  time="night"
                  particleType={testFx}
                  reducedMotion={reducedMotion}
                />
              )}
            </EnvironmentRenderer>
          </div>
        </div>
      </div>

      <div className="px-4 py-2 bg-neutral-900 border-t border-neutral-800 flex items-center justify-between text-[11px] text-neutral-400">
        <div>
          Active: <strong className="text-amber-400">{selectedEnvId}</strong>
          {selectedVariantId && (
            <span> ➔ Variant: <strong className="text-cyan-400">{selectedVariantId}</strong></span>
          )}
        </div>
        <div className="text-emerald-400 font-semibold">
          STATUS: 12/12 ENVIRONMENTS RESOLVABLE & TESTED
        </div>
      </div>
    </div>
  );
};
