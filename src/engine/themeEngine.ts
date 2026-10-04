import type { VisualBible, SceneMood, GenreType } from '../types/story';

export interface ThemeTokens {
  bodyBg: string;
  uiContainerBg: string;
  uiBorder: string;
  speakerBadgeBg: string;
  speakerBadgeText: string;
  speakerBadgeBorder: string;
  choiceBg: string;
  choiceHoverBg: string;
  choiceBorder: string;
  choiceText: string;
  accentColor: string;
  filterStyle: string;
  vignetteStyle: string;
  cameraTransform: string;
}

export function computeThemeTokens(
  genre: GenreType,
  mood: SceneMood,
  intensity: number = 0.3,
  _visualBible?: VisualBible,
  cameraAction?: 'slow_push' | 'shake' | 'drift' | 'static'
): ThemeTokens {
  const normIntensity = Math.max(0, Math.min(1, intensity));

  let cameraTransform = 'scale(1)';
  if (cameraAction === 'slow_push') {
    cameraTransform = `scale(${1 + normIntensity * 0.12}) translateY(-${normIntensity * 12}px)`;
  } else if (cameraAction === 'drift') {
    cameraTransform = 'scale(1.04) rotate(0.4deg)';
  } else if (cameraAction === 'shake') {
    cameraTransform = `translate(${(Math.random() - 0.5) * normIntensity * 14}px, ${(Math.random() - 0.5) * normIntensity * 10}px) scale(1.02)`;
  }

  // Genre-driven theme tokens
  switch (genre) {
    case 'horror':
    case 'thriller': {
      const contrast = 1.15 + normIntensity * 0.35;
      const brightness = 0.85 - normIntensity * 0.25;
      return {
        bodyBg: '#040707',
        uiContainerBg: 'bg-[#060a0a]/90 backdrop-blur-md',
        uiBorder: 'border-emerald-950/40',
        speakerBadgeBg: 'bg-emerald-950/80',
        speakerBadgeText: 'text-emerald-300',
        speakerBadgeBorder: 'border-emerald-700/40',
        choiceBg: 'bg-[#0d1414]/90',
        choiceHoverBg: 'hover:bg-[#152020]',
        choiceBorder: 'border-emerald-900/30 hover:border-emerald-500/60',
        choiceText: 'text-emerald-100',
        accentColor: '#10b981',
        filterStyle: `contrast(${contrast}) brightness(${brightness}) hue-rotate(155deg) saturate(0.7)`,
        vignetteStyle: `radial-gradient(circle, rgba(0,0,0,0) 30%, rgba(2,6,6,${0.65 + normIntensity * 0.3}) 100%)`,
        cameraTransform
      };
    }

    case 'cyberpunk': {
      return {
        bodyBg: '#050510',
        uiContainerBg: 'bg-[#090a18]/90 backdrop-blur-md',
        uiBorder: 'border-cyan-500/30',
        speakerBadgeBg: 'bg-cyan-950/80',
        speakerBadgeText: 'text-cyan-300',
        speakerBadgeBorder: 'border-cyan-400/50',
        choiceBg: 'bg-[#101326]/90',
        choiceHoverBg: 'hover:bg-[#1a1f3d]',
        choiceBorder: 'border-cyan-500/30 hover:border-fuchsia-400/70',
        choiceText: 'text-cyan-50',
        accentColor: '#06b6d4',
        filterStyle: `contrast(1.2) saturate(${1.25 + normIntensity * 0.3}) hue-rotate(5deg)`,
        vignetteStyle: 'radial-gradient(circle, rgba(0,0,0,0) 45%, rgba(6,10,25,0.85) 100%)',
        cameraTransform
      };
    }

    case 'fantasy': {
      return {
        bodyBg: '#0a0915',
        uiContainerBg: 'bg-[#121024]/85 backdrop-blur-md',
        uiBorder: 'border-purple-500/25',
        speakerBadgeBg: 'bg-purple-950/80',
        speakerBadgeText: 'text-purple-200',
        speakerBadgeBorder: 'border-purple-400/40',
        choiceBg: 'bg-[#181530]/90',
        choiceHoverBg: 'hover:bg-[#252047]',
        choiceBorder: 'border-purple-500/30 hover:border-amber-300/60',
        choiceText: 'text-purple-100',
        accentColor: '#c084fc',
        filterStyle: 'saturate(1.18) brightness(1.04) contrast(1.05)',
        vignetteStyle: 'radial-gradient(circle, rgba(0,0,0,0) 50%, rgba(13,10,28,0.7) 100%)',
        cameraTransform
      };
    }

    case 'romance':
    case 'slice_of_life':
    default: {
      const isSad = mood === 'sadness';
      return {
        bodyBg: '#080a10',
        uiContainerBg: isSad ? 'bg-[#101420]/85 backdrop-blur-md' : 'bg-[#16141c]/85 backdrop-blur-md',
        uiBorder: 'border-white/10',
        speakerBadgeBg: 'bg-rose-950/70',
        speakerBadgeText: 'text-rose-200',
        speakerBadgeBorder: 'border-rose-400/30',
        choiceBg: 'bg-[#201d29]/90',
        choiceHoverBg: 'hover:bg-[#2b2738]',
        choiceBorder: 'border-white/10 hover:border-amber-300/50',
        choiceText: 'text-stone-100',
        accentColor: '#f59e0b',
        filterStyle: isSad
          ? 'saturate(0.7) brightness(0.92)'
          : 'sepia(0.12) saturate(1.12) brightness(1.02)',
        vignetteStyle: 'radial-gradient(circle, rgba(0,0,0,0) 55%, rgba(10,12,18,0.75) 100%)',
        cameraTransform
      };
    }
  }
}
