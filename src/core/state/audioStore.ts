import { create } from 'zustand';

export interface AudioState {
  isMuted: boolean;
  musicVolume: number;
  sfxVolume: number;
  ambientVolume: number;
  currentTrack: string | null;
  setMuted: (muted: boolean) => void;
  toggleMute: () => void;
  setMusicVolume: (volume: number) => void;
  setSfxVolume: (volume: number) => void;
  setAmbientVolume: (volume: number) => void;
  setCurrentTrack: (track: string | null) => void;
}

export const useAudioStore = create<AudioState>((set) => ({
  isMuted: false,
  musicVolume: 0.7,
  sfxVolume: 0.8,
  ambientVolume: 0.6,
  currentTrack: null,
  setMuted: (isMuted) => set({ isMuted }),
  toggleMute: () => set((state) => ({ isMuted: !state.isMuted })),
  setMusicVolume: (musicVolume) => set({ musicVolume }),
  setSfxVolume: (sfxVolume) => set({ sfxVolume }),
  setAmbientVolume: (ambientVolume) => set({ ambientVolume }),
  setCurrentTrack: (currentTrack) => set({ currentTrack }),
}));
