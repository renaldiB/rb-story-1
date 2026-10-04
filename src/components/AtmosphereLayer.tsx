import React, { useEffect, useRef } from 'react';
import type { WeatherType, TimeOfDay } from '../types/story';
import { PerformanceManager } from '../core/performance/PerformanceManager.ts';
import { AnimationManager } from '../core/performance/AnimationManager.ts';

interface AtmosphereLayerProps {
  weather: WeatherType;
  time: TimeOfDay;
  particleType?: 'rain' | 'motes' | 'fog' | 'glitch' | 'sparks' | 'none';
  reducedMotion?: boolean;
  screenGlow?: boolean;
  vignette?: boolean;
  activeFx?: Array<
    | 'fx_rain_procedural'
    | 'fx_fog_mist'
    | 'fx_dust_motes'
    | 'fx_screen_glow_late_night'
    | 'fx_cinematic_vignette'
  >;
  activeFxOnly?: boolean;
  particleMetricKey?: string;
}

export const AtmosphereLayer: React.FC<AtmosphereLayerProps> = ({
  weather,
  time,
  particleType = 'rain',
  reducedMotion = false,
  screenGlow = false,
  vignette = false,
  activeFx,
  activeFxOnly = false,
  particleMetricKey,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (reducedMotion || particleType === 'none') {
      if (!activeFxOnly) PerformanceManager.getInstance().setActiveParticles(0);
      return;
    }

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: true, desynchronized: true });
    if (!ctx) return;

    const perf = PerformanceManager.getInstance();
    const anim = AnimationManager.getInstance();
    const budget = perf.scaler.getParticleBudget();
    const dpr = Math.min(perf.device.dpr || 1, 1.5);

    let width = canvas.parentElement?.clientWidth || 400;
    let height = canvas.parentElement?.clientHeight || 800;

    const setupCanvasSize = () => {
      if (!canvas || !canvas.parentElement) return;
      width = canvas.parentElement.clientWidth;
      height = canvas.parentElement.clientHeight;

      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    setupCanvasSize();
    window.addEventListener('resize', setupCanvasSize, { passive: true });

    // Rain particles (budget-capped)
    const isRain = activeFxOnly
      ? Boolean(activeFx?.includes('fx_rain_procedural'))
      : particleType === 'rain' || weather === 'rain';
    const rainCount = isRain ? budget.rain : 0;
    const rainDrops: Array<{ x: number; y: number; speed: number; length: number; opacity: number }> = [];
    for (let i = 0; i < rainCount; i++) {
      rainDrops.push({
        x: Math.random() * width,
        y: Math.random() * height,
        speed: 14 + Math.random() * 8,
        length: 16 + Math.random() * 10,
        opacity: 0.15 + Math.random() * 0.25,
      });
    }

    // Fog / Spores (Horror, budget-capped)
    const isFog = activeFxOnly
      ? Boolean(activeFx?.includes('fx_fog_mist'))
      : particleType === 'fog' || weather === 'fog';
    const fogCount = isFog ? budget.fog : 0;
    const fogs: Array<{ x: number; y: number; radius: number; vx: number; alpha: number }> = [];
    for (let i = 0; i < fogCount; i++) {
      fogs.push({
        x: Math.random() * width,
        y: height * 0.4 + Math.random() * (height * 0.6),
        radius: 35 + Math.random() * 55,
        vx: 0.2 + Math.random() * 0.4,
        alpha: 0.04 + Math.random() * 0.08,
      });
    }

    // Cyberpunk Glitch Pixels (budget-capped)
    const isGlitch = particleType === 'glitch';
    const glitchCount = isGlitch ? budget.glitch : 0;
    const glitches: Array<{ x: number; y: number; size: number; color: string; vy: number }> = [];
    for (let i = 0; i < glitchCount; i++) {
      glitches.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: 2 + Math.random() * 4,
        color: Math.random() > 0.5 ? '#00f2fe' : '#ff007f',
        vy: -0.5 - Math.random() * 1.5,
      });
    }

    // Warm bokeh / dust / celestial motes (budget-capped)
    const isMotes = activeFxOnly
      ? Boolean(activeFx?.includes('fx_dust_motes'))
      : particleType === 'motes' || (!isFog && !isGlitch && (time === 'night' || time === 'sunset'));
    const moteCount = isMotes ? budget.motes : 0;
    const motes: Array<{
      x: number;
      y: number;
      radius: number;
      vx: number;
      vy: number;
      alpha: number;
      color: string;
    }> = [];

    for (let i = 0; i < moteCount; i++) {
      motes.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: 1.5 + Math.random() * 3,
        vx: (Math.random() - 0.5) * 0.3,
        vy: -0.2 - Math.random() * 0.4,
        alpha: 0.1 + Math.random() * 0.35,
        color: time === 'sunset' ? '#f39c12' : '#ffeaa7',
      });
    }

    const totalParticles = rainCount + fogCount + glitchCount + moteCount;
    const releaseParticleSource = activeFxOnly && particleMetricKey
      ? perf.registerParticleSource(particleMetricKey, totalParticles)
      : undefined;
    if (!activeFxOnly) perf.setActiveParticles(totalParticles);

    // Subscribe to centralized AnimationManager loop
    const unsubscribe = anim.subscribe(() => {
      ctx.clearRect(0, 0, width, height);

      // Render Rain
      if (rainCount > 0) {
        ctx.strokeStyle = '#ffffff';
        ctx.lineWidth = 1.2;
        ctx.lineCap = 'round';

        for (const drop of rainDrops) {
          ctx.beginPath();
          ctx.globalAlpha = drop.opacity;
          ctx.moveTo(drop.x, drop.y);
          ctx.lineTo(drop.x - 3, drop.y + drop.length);
          ctx.stroke();

          drop.y += drop.speed;
          drop.x -= 1.2;

          if (drop.y > height) {
            drop.y = -drop.length;
            drop.x = Math.random() * width;
          }
        }
      }

      // Render Fog
      if (fogCount > 0) {
        for (const fog of fogs) {
          ctx.beginPath();
          ctx.globalAlpha = fog.alpha;
          ctx.fillStyle = '#10201d';
          ctx.arc(fog.x, fog.y, fog.radius, 0, Math.PI * 2);
          ctx.fill();

          fog.x += fog.vx;
          if (fog.x - fog.radius > width) {
            fog.x = -fog.radius;
          }
        }
      }

      // Render Glitches
      if (glitchCount > 0) {
        for (const g of glitches) {
          ctx.globalAlpha = Math.random() * 0.8;
          ctx.fillStyle = g.color;
          ctx.fillRect(g.x, g.y, g.size, g.size * 2);
          g.y += g.vy;
          if (g.y < -10) g.y = height + 10;
        }
      }

      // Render Floating Motes
      if (moteCount > 0) {
        for (const mote of motes) {
          ctx.beginPath();
          ctx.globalAlpha = mote.alpha;
          ctx.fillStyle = mote.color;
          ctx.arc(mote.x, mote.y, mote.radius, 0, Math.PI * 2);
          ctx.fill();

          mote.x += mote.vx;
          mote.y += mote.vy;

          if (mote.y < -10) {
            mote.y = height + 10;
            mote.x = Math.random() * width;
          }
          if (mote.x < -10) mote.x = width + 10;
          if (mote.x > width + 10) mote.x = -10;
        }
      }
    });

    return () => {
      unsubscribe();
      window.removeEventListener('resize', setupCanvasSize);
      if (releaseParticleSource) releaseParticleSource();
      else if (!activeFxOnly) perf.setActiveParticles(0);
    };
  }, [weather, time, particleType, reducedMotion, activeFx, activeFxOnly, particleMetricKey]);

  const showScreenGlow = screenGlow || activeFx?.includes('fx_screen_glow_late_night');
  const showVignette = vignette || activeFx?.includes('fx_cinematic_vignette');

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-10">
      {/* Lightweight color washes replacing expensive fullscreen backdrop-blur */}
      {weather === 'rain' && (
        <div className="absolute inset-0 bg-blue-950/15" />
      )}
      {weather === 'fog' && (
        <div className="absolute inset-0 bg-emerald-950/20" />
      )}
      {showScreenGlow && (
        <div
          data-fx="fx_screen_glow_late_night"
          className="absolute inset-0 pointer-events-none z-[32]"
          style={{
            opacity: 0.85,
            mixBlendMode: 'screen',
            background:
              'radial-gradient(circle at 50% 65%, rgba(56, 189, 248, 0.22) 0%, rgba(30, 58, 138, 0.10) 45%, transparent 75%)',
          }}
        />
      )}
      {!reducedMotion && (activeFxOnly || particleType !== 'none') && (
        <canvas ref={canvasRef} className="w-full h-full will-change-transform pointer-events-none" />
      )}
      {showVignette && (
        <div
          data-fx="fx_cinematic_vignette"
          className="absolute inset-0 pointer-events-none z-[48]"
          style={{
            background:
              'radial-gradient(ellipse at center, transparent 52%, rgba(10, 14, 22, 0.40) 80%, rgba(6, 9, 15, 0.78) 100%)',
          }}
        />
      )}
    </div>
  );
};
