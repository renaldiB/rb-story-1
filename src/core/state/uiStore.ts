import { create } from 'zustand';
import type { DiegeticItemDefinition, ForeshadowItemDefinition } from '../schema/story.schema.ts';

export interface UIState {
  isSettingsOpen: boolean;
  isLibraryOpen: boolean;
  isHistoryOpen: boolean;
  isSaveModalOpen: boolean;
  isDebugOverlayOpen: boolean;
  activeDiegeticItem: DiegeticItemDefinition | null;
  activeForeshadowItem: ForeshadowItemDefinition | null;

  setSettingsOpen: (open: boolean) => void;
  setLibraryOpen: (open: boolean) => void;
  setHistoryOpen: (open: boolean) => void;
  setSaveModalOpen: (open: boolean) => void;
  setDebugOverlayOpen: (open: boolean) => void;
  toggleDebugOverlay: () => void;
  openDiegeticItem: (item: DiegeticItemDefinition | null) => void;
  openForeshadowItem: (item: ForeshadowItemDefinition | null) => void;
  closeModals: () => void;
}

export const useUIStore = create<UIState>((set) => ({
  isSettingsOpen: false,
  isLibraryOpen: false,
  isHistoryOpen: false,
  isSaveModalOpen: false,
  isDebugOverlayOpen: false,
  activeDiegeticItem: null,
  activeForeshadowItem: null,

  setSettingsOpen: (isSettingsOpen) => set({ isSettingsOpen }),
  setLibraryOpen: (isLibraryOpen) => set({ isLibraryOpen }),
  setHistoryOpen: (isHistoryOpen) => set({ isHistoryOpen }),
  setSaveModalOpen: (isSaveModalOpen) => set({ isSaveModalOpen }),
  setDebugOverlayOpen: (isDebugOverlayOpen) => set({ isDebugOverlayOpen }),
  toggleDebugOverlay: () => set((s) => ({ isDebugOverlayOpen: !s.isDebugOverlayOpen })),
  openDiegeticItem: (activeDiegeticItem) => set({ activeDiegeticItem }),
  openForeshadowItem: (activeForeshadowItem) => set({ activeForeshadowItem }),
  closeModals: () =>
    set({
      isSettingsOpen: false,
      isLibraryOpen: false,
      isHistoryOpen: false,
      isSaveModalOpen: false,
      activeDiegeticItem: null,
      activeForeshadowItem: null,
    }),
}));
