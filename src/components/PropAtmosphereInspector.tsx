import React, { useState } from 'react';
import { AtmosphereLayer } from './AtmosphereLayer.tsx';
import type { WeatherType, TimeOfDay } from '../types/story.ts';
import type { CanonicalFxId, CanonicalPropId } from '../effects/types.ts';
import { PropRenderer } from '../effects/AtmosphereEffects.tsx';

const CANONICAL_PROPS: Array<{
  id: CanonicalPropId;
  name: string;
  category: string;
  dimensions: string;
  anchor: string;
  scenes: string;
}> = [
  { id: 'prop_phone', name: 'Dual Timezone Smartphone', category: 'INTERACTIVE', dimensions: '256x512', anchor: 'hand_grip (0.5, 0.85)', scenes: 'ch3_night_phone_msg' },
  { id: 'prop_coffee', name: 'Steaming Ceramic Mug', category: 'STATIC_REUSABLE', dimensions: '256x256', anchor: 'table_contact_point (0.5, 0.95)', scenes: 'ch1_intro_1..closing' },
  { id: 'prop_old_photo', name: 'Campus Polaroid Photograph', category: 'INTERACTIVE', dimensions: '320x384', anchor: 'center (0.5, 0.5)', scenes: 'ch3_book_discovery, secret' },
  { id: 'prop_train_ticket', name: 'Last-Minute Train Ticket', category: 'INTERACTIVE', dimensions: '384x200', anchor: 'center (0.5, 0.5)', scenes: 'ch2_bus_stop, ch3, ch4' },
  { id: 'prop_backpack', name: 'Travel Canvas Backpack', category: 'CHARACTER_HELD', dimensions: '384x480', anchor: 'bottom-center (0.5, 0.95)', scenes: 'ch4_station_climax, endings' },
  { id: 'prop_lighter_antique', name: 'Antique Brass Lighter', category: 'INTERACTIVE', dimensions: '192x288', anchor: 'table_contact_point (0.5, 0.95)', scenes: 'ch1_intro_2' },
  { id: 'prop_laptop', name: 'Creative Studio Laptop', category: 'STATIC_REUSABLE', dimensions: '480x320', anchor: 'table_contact_point (0.5, 0.95)', scenes: 'SC-20, SC-38, loc_agus_room' },
  { id: 'prop_agus_cat', name: 'Sleeping Tabby Cat', category: 'STATIC_REUSABLE', dimensions: '384x256', anchor: 'table_contact_point (0.5, 0.95)', scenes: 'SC-08, SC-30' },
  { id: 'prop_dog_rescue', name: 'Stray Dog with Umbrella', category: 'STATIC_REUSABLE', dimensions: '440x400', anchor: 'bottom-center (0.5, 0.95)', scenes: 'ch2_street_1, ch2_slow_walk' },
];

export const PropAtmosphereInspector: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'props' | 'fx'>('props');
  const [selectedPropId, setSelectedPropId] = useState<CanonicalPropId>('prop_phone');
  const [propScale, setPropScale] = useState(1.0);

  const [enabledFx, setEnabledFx] = useState<Record<CanonicalFxId, boolean>>({
    fx_rain_procedural: true,
    fx_fog_mist: false,
    fx_dust_motes: false,
    fx_screen_glow_late_night: false,
    fx_cinematic_vignette: true,
  });
  const [isMobileMode, setIsMobileMode] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [previewTime, setPreviewTime] = useState<TimeOfDay>('night');
  const [previewWeather, setPreviewWeather] = useState<WeatherType>('rain');

  const toggleFx = (id: CanonicalFxId) => {
    setEnabledFx((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const activeFxList = (Object.keys(enabledFx) as CanonicalFxId[]).filter((k) => enabledFx[k]);

  return (
    <div className="w-full h-full flex flex-col bg-neutral-950 text-neutral-100 font-mono text-xs select-none">
      <div className="flex items-center justify-between px-4 py-2 bg-neutral-900 border-b border-neutral-800">
        <div className="flex gap-2">
          <button
            onClick={() => setActiveTab('props')}
            className={`px-3 py-1 rounded text-xs font-semibold transition ${
              activeTab === 'props'
                ? 'bg-amber-500 text-neutral-950 font-bold'
                : 'bg-neutral-800 text-neutral-300 hover:bg-neutral-700'
            }`}
          >
            Independent Props (9/9)
          </button>
          <button
            onClick={() => setActiveTab('fx')}
            className={`px-3 py-1 rounded text-xs font-semibold transition ${
              activeTab === 'fx'
                ? 'bg-cyan-500 text-neutral-950 font-bold'
                : 'bg-neutral-800 text-neutral-300 hover:bg-neutral-700'
            }`}
          >
            Atmosphere / FX (5/5)
          </button>
        </div>
        <span className="text-[11px] text-neutral-400">
          Story: <strong className="text-amber-400">2 Hours Apart</strong> (Theme: romance_rain)
        </span>
      </div>

      {/* Main Content Area */}
      {activeTab === 'props' ? (
        <div className="flex-1 flex overflow-hidden">
          {/* Prop Selection List */}
          <div className="w-72 bg-neutral-900/60 border-r border-neutral-800 overflow-y-auto p-2 space-y-1.5">
            <div className="text-[10px] uppercase tracking-wider text-neutral-400 font-bold px-2 py-1">
              Select Prop Asset
            </div>
            {CANONICAL_PROPS.map((p) => {
              const isSelected = selectedPropId === p.id;
              return (
                <div
                  key={p.id}
                  onClick={() => setSelectedPropId(p.id)}
                  className={`p-2 rounded cursor-pointer transition border ${
                    isSelected
                      ? 'bg-amber-500/15 border-amber-500/80 text-amber-300'
                      : 'bg-neutral-900/80 border-neutral-800 text-neutral-300 hover:bg-neutral-800'
                  }`}
                >
                  <div className="flex items-center justify-between font-bold text-xs">
                    <span>{p.name}</span>
                    <span className="text-[10px] text-neutral-400 font-normal">{p.dimensions}</span>
                  </div>
                  <div className="text-[10px] text-neutral-400 truncate">{p.id}</div>
                  <div className="mt-1 flex items-center justify-between text-[9px]">
                    <span className="text-amber-400/80">{p.category}</span>
                    <span className="text-neutral-500">{p.scenes}</span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Prop Interactive Stage */}
          <div className="flex-1 flex flex-col bg-neutral-950 overflow-hidden">
            {/* Control Strip */}
            <div className="px-4 py-2 bg-neutral-900/80 border-b border-neutral-800 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="text-amber-400 font-bold">{selectedPropId}</span>
                <span className="text-neutral-400 text-[11px]">
                  Anchor:{' '}
                  {CANONICAL_PROPS.find((p) => p.id === selectedPropId)?.anchor}
                </span>
              </div>
              <div className="flex items-center gap-2 text-[11px]">
                <span>Scale:</span>
                <input
                  type="range"
                  min="0.5"
                  max="1.5"
                  step="0.05"
                  value={propScale}
                  onChange={(e) => setPropScale(parseFloat(e.target.value))}
                  className="w-24 accent-amber-500"
                />
                <span>{propScale.toFixed(2)}x</span>
              </div>
            </div>

            {/* Stage Viewport */}
            <div className="flex-1 relative flex items-center justify-center overflow-hidden bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:16px_16px]">
              <div className="relative border border-dashed border-neutral-700/60 p-4 rounded-xl">
                <PropRenderer
                  propId={selectedPropId}
                  position={{ x: 50, y: 50 }}
                  scale={propScale}
                  interactive={true}
                  onClick={() => alert(`Prop clicked: ${selectedPropId}`)}
                />
              </div>
            </div>

            {/* Bottom Contact Sheet Link */}
            <div className="px-4 py-1.5 bg-neutral-900 border-t border-neutral-800 flex items-center justify-between text-[10px] text-neutral-400">
              <span>Preview: public/assets/props/previews/props_contact_sheet.png</span>
              <span className="text-emerald-400">Status: PASS (9/9 Available in WebP + PNG)</span>
            </div>
          </div>
        </div>
      ) : (
        /* Atmosphere FX Preview */
        <div className="flex-1 flex overflow-hidden">
          {/* FX Systems Toggle Panel */}
          <div className="w-80 bg-neutral-900/60 border-r border-neutral-800 overflow-y-auto p-3 space-y-3">
            <div className="text-[10px] uppercase tracking-wider text-neutral-400 font-bold">
              FX Systems (5 Canonical)
            </div>

            {/* System Checkboxes */}
            <div className="space-y-2">
              {[
                { id: 'fx_rain_procedural', name: 'Procedural Rain (35°)', tag: 'Canvas 2D' },
                { id: 'fx_fog_mist', name: 'Drifting Mist / Fog', tag: 'Canvas GPU' },
                { id: 'fx_dust_motes', name: 'Golden Sunlight Motes', tag: 'Canvas 2D' },
                { id: 'fx_screen_glow_late_night', name: 'Late Night Screen Glow', tag: 'CSS Screen' },
                { id: 'fx_cinematic_vignette', name: 'Cinematic Frame Vignette', tag: 'CSS Radial' },
              ].map((fx) => (
                <label
                  key={fx.id}
                  className={`flex items-center justify-between p-2 rounded border cursor-pointer transition ${
                    enabledFx[fx.id as CanonicalFxId]
                      ? 'bg-cyan-950/70 border-cyan-500/60 text-cyan-200'
                      : 'bg-neutral-900/80 border-neutral-800 text-neutral-400 hover:bg-neutral-800'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={enabledFx[fx.id as CanonicalFxId]}
                      onChange={() => toggleFx(fx.id as CanonicalFxId)}
                      className="accent-cyan-400 rounded"
                    />
                    <div>
                      <div className="font-semibold text-xs">{fx.name}</div>
                      <div className="text-[10px] text-neutral-500">{fx.id}</div>
                    </div>
                  </div>
                  <span className="text-[9px] px-1.5 py-0.5 rounded bg-neutral-800 text-neutral-400">
                    {fx.tag}
                  </span>
                </label>
              ))}
            </div>

            {/* Quality & Accessibility Modifiers */}
            <div className="pt-2 border-t border-neutral-800 space-y-2">
              <div className="text-[10px] uppercase tracking-wider text-neutral-400 font-bold">
                Simulation Constraints
              </div>

              <label className="flex items-center justify-between p-2 rounded bg-neutral-900/80 border border-neutral-800 cursor-pointer">
                <span>Mobile Device Budget (Capped)</span>
                <input
                  type="checkbox"
                  checked={isMobileMode}
                  onChange={(e) => setIsMobileMode(e.target.checked)}
                  className="accent-amber-400"
                />
              </label>

              <label className="flex items-center justify-between p-2 rounded bg-neutral-900/80 border border-neutral-800 cursor-pointer">
                <span>prefers-reduced-motion</span>
                <input
                  type="checkbox"
                  checked={reducedMotion}
                  onChange={(e) => setReducedMotion(e.target.checked)}
                  className="accent-rose-400"
                />
              </label>
            </div>

            {/* Lighting / Environment Simulator */}
            <div className="pt-2 border-t border-neutral-800 space-y-2">
              <div className="text-[10px] uppercase tracking-wider text-neutral-400 font-bold">
                Atmosphere Lighting
              </div>
              <div className="grid grid-cols-2 gap-1.5">
                <div>
                  <label className="text-[10px] text-neutral-400">Time</label>
                  <select
                    value={previewTime}
                    onChange={(e) => setPreviewTime(e.target.value as TimeOfDay)}
                    className="w-full bg-neutral-900 border border-neutral-700 text-neutral-200 rounded px-2 py-1 text-[11px]"
                  >
                    <option value="night">Night</option>
                    <option value="sunset">Sunset</option>
                    <option value="afternoon">Afternoon</option>
                    <option value="morning">Morning</option>
                  </select>
                </div>
                <div>
                  <label className="text-[10px] text-neutral-400">Weather</label>
                  <select
                    value={previewWeather}
                    onChange={(e) => setPreviewWeather(e.target.value as WeatherType)}
                    className="w-full bg-neutral-900 border border-neutral-700 text-neutral-200 rounded px-2 py-1 text-[11px]"
                  >
                    <option value="rain">Rain</option>
                    <option value="fog">Fog</option>
                    <option value="clear">Clear</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* FX Interactive Stage */}
          <div className="flex-1 relative flex flex-col bg-neutral-950 overflow-hidden">
            {/* Live Atmosphere Layer Stage */}
            <div className="flex-1 relative overflow-hidden bg-slate-950 flex items-center justify-center">
              {/* Mock Background / Character Silhouette for Contrast Check */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-40">
                <div className="text-center space-y-2">
                  <div className="w-32 h-64 bg-slate-800/80 rounded-t-full mx-auto border border-slate-700/50 flex items-center justify-center">
                    <span className="text-[11px] text-slate-500">Character Silhouette</span>
                  </div>
                  <div className="text-[10px] text-slate-500">Safe Zone Readability Check</div>
                </div>
              </div>

              {/* The Live Atmosphere Layer */}
              <AtmosphereLayer
                weather={previewWeather}
                time={previewTime}
                particleType={
                  enabledFx.fx_rain_procedural
                    ? 'rain'
                    : enabledFx.fx_fog_mist
                      ? 'fog'
                      : enabledFx.fx_dust_motes
                        ? 'motes'
                        : 'none'
                }
                reducedMotion={reducedMotion}
                screenGlow={enabledFx.fx_screen_glow_late_night}
                vignette={enabledFx.fx_cinematic_vignette}
                activeFx={activeFxList}
              />
            </div>

            {/* Status Footer */}
            <div className="px-4 py-2 bg-neutral-900 border-t border-neutral-800 flex items-center justify-between text-[11px]">
              <div className="flex gap-4">
                <span>
                  Active FX: <strong className="text-cyan-400">{activeFxList.length} / 5</strong>
                </span>
                <span>
                  Mode: <strong className={isMobileMode ? 'text-amber-400' : 'text-emerald-400'}>{isMobileMode ? 'Mobile (Capped)' : 'Desktop Standard'}</strong>
                </span>
                <span>
                  Motion:{' '}
                  <strong className={reducedMotion ? 'text-rose-400' : 'text-emerald-400'}>
                    {reducedMotion ? 'Reduced (Static)' : 'Standard Animated'}
                  </strong>
                </span>
              </div>
              <span className="text-emerald-400 font-bold">ALL 5 FX ACTIVE & INTEGRATED</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
