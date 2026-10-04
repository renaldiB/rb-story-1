import type { StoryTheme } from '../types.ts';

export const DEFAULT_THEME: StoryTheme = {
  id: 'default',
  name: 'Neutral Modern',
  genre: 'universal',
  colors: {
    background: '#090d16',
    surface: 'rgba(15, 23, 42, 0.85)',
    text: '#f8fafc',
    primary: '#38bdf8',
    secondary: '#818cf8',
    accent: '#34d399',
    border: 'rgba(148, 163, 184, 0.2)',
    vignette: 'radial-gradient(circle at center, transparent 40%, rgba(9, 13, 22, 0.85) 100%)',
  },
  typography: {
    fontFamily: 'system-ui, sans-serif',
    fontSize: '1rem',
  },
  dialogue: {
    bgClass: 'bg-slate-900/90 backdrop-blur-md',
    borderClass: 'border-slate-700/60',
    speakerColorClass: 'text-sky-400',
    textColorClass: 'text-slate-100',
  },
  transitions: {
    defaultType: 'fade',
    defaultDuration: 250,
  },
};

export const THEMES: Record<string, StoryTheme> = {
  romance: {
    id: 'romance',
    name: 'Warm Sunset & Rain',
    genre: 'romance',
    colors: {
      background: '#120d18',
      surface: 'rgba(28, 18, 36, 0.88)',
      text: '#fdf4ff',
      primary: '#f472b6',
      secondary: '#fb923c',
      accent: '#fbcfe8',
      border: 'rgba(244, 114, 182, 0.25)',
      vignette: 'radial-gradient(circle at center, transparent 35%, rgba(20, 10, 26, 0.75) 100%)',
    },
    typography: {
      fontFamily: 'serif, system-ui',
      fontSize: '1rem',
    },
    dialogue: {
      bgClass: 'bg-stone-900/90 backdrop-blur-md',
      borderClass: 'border-rose-900/50',
      speakerColorClass: 'text-rose-300 font-semibold',
      textColorClass: 'text-stone-100',
    },
    transitions: {
      defaultType: 'crossfade',
      defaultDuration: 300,
    },
  },

  horror: {
    id: 'horror',
    name: 'Grim Shadows',
    genre: 'horror',
    colors: {
      background: '#050708',
      surface: 'rgba(10, 15, 13, 0.92)',
      text: '#e2e8f0',
      primary: '#ef4444',
      secondary: '#10b981',
      accent: '#b91c1c',
      border: 'rgba(239, 68, 68, 0.2)',
      vignette: 'radial-gradient(circle at center, transparent 20%, rgba(2, 4, 3, 0.95) 90%)',
    },
    typography: {
      fontFamily: 'monospace, sans-serif',
      fontSize: '0.95rem',
    },
    dialogue: {
      bgClass: 'bg-neutral-950/95 backdrop-blur-sm',
      borderClass: 'border-red-950/70',
      speakerColorClass: 'text-red-400 font-mono tracking-wider',
      textColorClass: 'text-neutral-200',
    },
    transitions: {
      defaultType: 'cut',
      defaultDuration: 150,
    },
  },

  mystery: {
    id: 'mystery',
    name: 'Amber Noir',
    genre: 'mystery',
    colors: {
      background: '#0a0a0c',
      surface: 'rgba(18, 18, 22, 0.9)',
      text: '#fef3c7',
      primary: '#f59e0b',
      secondary: '#94a3b8',
      accent: '#fbbf24',
      border: 'rgba(245, 158, 11, 0.25)',
      vignette: 'radial-gradient(circle at center, transparent 30%, rgba(6, 6, 8, 0.9) 100%)',
    },
    typography: {
      fontFamily: 'Georgia, serif',
      fontSize: '1rem',
    },
    dialogue: {
      bgClass: 'bg-zinc-950/90 backdrop-blur-md',
      borderClass: 'border-amber-900/40',
      speakerColorClass: 'text-amber-400 font-medium',
      textColorClass: 'text-zinc-200',
    },
    transitions: {
      defaultType: 'fade',
      defaultDuration: 250,
    },
  },

  cyberpunk: {
    id: 'cyberpunk',
    name: 'Neon Grid',
    genre: 'cyberpunk',
    colors: {
      background: '#030712',
      surface: 'rgba(15, 23, 42, 0.92)',
      text: '#f0fdf4',
      primary: '#06b6d4',
      secondary: '#ec4899',
      accent: '#22c55e',
      border: 'rgba(6, 182, 212, 0.35)',
      vignette: 'radial-gradient(circle at center, transparent 40%, rgba(3, 7, 18, 0.88) 100%)',
    },
    typography: {
      fontFamily: 'ui-monospace, monospace',
      fontSize: '0.95rem',
    },
    dialogue: {
      bgClass: 'bg-slate-950/95 border-l-2 border-l-cyan-400',
      borderClass: 'border-cyan-900/60',
      speakerColorClass: 'text-cyan-300 font-mono font-bold uppercase',
      textColorClass: 'text-slate-100',
    },
    transitions: {
      defaultType: 'slide',
      defaultDuration: 200,
    },
  },

  fantasy: {
    id: 'fantasy',
    name: 'Parchment & Gold',
    genre: 'fantasy',
    colors: {
      background: '#0c0f1d',
      surface: 'rgba(19, 24, 46, 0.9)',
      text: '#fef08a',
      primary: '#eab308',
      secondary: '#6366f1',
      accent: '#facc15',
      border: 'rgba(234, 179, 8, 0.25)',
      vignette: 'radial-gradient(circle at center, transparent 35%, rgba(10, 12, 26, 0.85) 100%)',
    },
    typography: {
      fontFamily: 'serif',
      fontSize: '1.05rem',
    },
    dialogue: {
      bgClass: 'bg-indigo-950/90 backdrop-blur-md',
      borderClass: 'border-amber-700/50',
      speakerColorClass: 'text-amber-300 font-serif font-semibold',
      textColorClass: 'text-indigo-100',
    },
    transitions: {
      defaultType: 'fade',
      defaultDuration: 300,
    },
  },

  school: {
    id: 'school',
    name: 'Daylight Pastel',
    genre: 'school',
    colors: {
      background: '#0f172a',
      surface: 'rgba(30, 41, 59, 0.88)',
      text: '#f8fafc',
      primary: '#38bdf8',
      secondary: '#a78bfa',
      accent: '#4ade80',
      border: 'rgba(56, 189, 248, 0.25)',
      vignette: 'radial-gradient(circle at center, transparent 45%, rgba(15, 23, 42, 0.7) 100%)',
    },
    typography: {
      fontFamily: 'system-ui, sans-serif',
      fontSize: '1rem',
    },
    dialogue: {
      bgClass: 'bg-slate-900/90 backdrop-blur-md',
      borderClass: 'border-sky-800/50',
      speakerColorClass: 'text-sky-300 font-medium',
      textColorClass: 'text-slate-100',
    },
    transitions: {
      defaultType: 'fade',
      defaultDuration: 220,
    },
  },
};

export class StoryThemeRegistry {
  private static instance: StoryThemeRegistry | null = null;
  private themes: Map<string, StoryTheme> = new Map();

  private constructor() {
    this.registerTheme(DEFAULT_THEME);
    for (const theme of Object.values(THEMES)) {
      this.registerTheme(theme);
    }
  }

  public static getInstance(): StoryThemeRegistry {
    if (!StoryThemeRegistry.instance) {
      StoryThemeRegistry.instance = new StoryThemeRegistry();
    }
    return StoryThemeRegistry.instance;
  }

  public registerTheme(theme: StoryTheme): void {
    this.themes.set(theme.id.toLowerCase(), theme);
    if (theme.genre) {
      this.themes.set(theme.genre.toLowerCase(), theme);
    }
  }

  public getTheme(genreOrId?: string): StoryTheme {
    if (!genreOrId) return DEFAULT_THEME;
    const clean = genreOrId.toLowerCase().trim();
    return this.themes.get(clean) || DEFAULT_THEME;
  }

  public listThemes(): StoryTheme[] {
    const set = new Set<StoryTheme>(this.themes.values());
    return Array.from(set);
  }
}

export const storyThemeRegistry = StoryThemeRegistry.getInstance();
