import { create } from 'zustand';

export interface SettingsState {
  textSpeed: number;
  autoPlay: boolean;
  autoPlayDelay: number;
  fontSize: 'small' | 'medium' | 'large';
  reducedMotion: boolean;
  themeMode: 'auto' | 'light' | 'dark';
  setTextSpeed: (speed: number) => void;
  setAutoPlay: (auto: boolean) => void;
  setFontSize: (size: 'small' | 'medium' | 'large') => void;
  setReducedMotion: (reduced: boolean) => void;
  setThemeMode: (mode: 'auto' | 'light' | 'dark') => void;
}

export const useSettingsStore = create<SettingsState>((set) => ({
  textSpeed: 25,
  autoPlay: false,
  autoPlayDelay: 3000,
  fontSize: 'medium',
  reducedMotion: false,
  themeMode: 'auto',
  setTextSpeed: (textSpeed) => set({ textSpeed }),
  setAutoPlay: (autoPlay) => set({ autoPlay }),
  setFontSize: (fontSize) => set({ fontSize }),
  setReducedMotion: (reducedMotion) => set({ reducedMotion }),
  setThemeMode: (themeMode) => set({ themeMode }),
}));
