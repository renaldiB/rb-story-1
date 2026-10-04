import React from 'react';
import {
  X,
  Volume2,
  Sliders,
  RotateCcw,
  Save,
  Download,
  Trash2,
  Eye,
  Check
} from 'lucide-react';
import type { SaveSlot, StoryState, StoryScene } from '../types/story';
import { getSaveSlots, saveToSlot } from '../engine/storyEngine';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  isMuted: boolean;
  onToggleMute: () => void;
  masterVolume: number;
  onChangeMasterVolume: (val: number) => void;
  textSpeed: 'slow' | 'normal' | 'fast' | 'instant';
  onChangeTextSpeed: (speed: 'slow' | 'normal' | 'fast' | 'instant') => void;
  fontSize: 'normal' | 'large' | 'xlarge';
  onChangeFontSize: (size: 'normal' | 'large' | 'xlarge') => void;
  highContrast: boolean;
  onToggleHighContrast: () => void;
  reducedMotion: boolean;
  onToggleReducedMotion: () => void;
  currentState: StoryState;
  currentScene: StoryScene;
  onLoadState: (state: StoryState) => void;
  onRestartChapter: () => void;
  onRestartStory: () => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({
  isOpen,
  onClose,
  isMuted,
  onToggleMute,
  masterVolume,
  onChangeMasterVolume,
  textSpeed,
  onChangeTextSpeed,
  fontSize,
  onChangeFontSize,
  highContrast,
  onToggleHighContrast,
  reducedMotion,
  onToggleReducedMotion,
  currentState,
  currentScene,
  onLoadState,
  onRestartChapter,
  onRestartStory
}) => {
  const [saveSlots, setSaveSlots] = React.useState<SaveSlot[]>(() => getSaveSlots());
  const [saveSuccessSlot, setSaveSuccessSlot] = React.useState<string | null>(null);

  if (!isOpen) return null;

  const handleSaveToSlot = (slotId: string) => {
    const updated = saveToSlot(slotId, currentState, currentScene);
    setSaveSlots(updated);
    setSaveSuccessSlot(slotId);
    setTimeout(() => setSaveSuccessSlot(null), 2000);
  };

  const handleLoadSlot = (slot: SaveSlot) => {
    onLoadState(slot.state);
    onClose();
  };

  return (
    <div
      role="dialog"
      aria-label="Pengaturan & Simpan Data"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md animate-fade-in"
    >
      <div className="w-full max-w-md max-h-[90vh] bg-[#141824] border border-white/10 rounded-2xl flex flex-col shadow-2xl overflow-hidden text-stone-100">
        <div className="px-5 py-4 border-b border-white/10 flex items-center justify-between bg-black/40">
          <div className="flex items-center gap-2">
            <Sliders className="w-5 h-5 text-amber-300" />
            <h3 className="font-serif text-lg font-semibold tracking-wide">
              Pengaturan Cerita
            </h3>
          </div>
          <button
            onClick={onClose}
            aria-label="Tutup Pengaturan"
            className="p-1.5 rounded-lg text-stone-400 hover:text-white hover:bg-white/10"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-5 space-y-6 text-sm">
          <div>
            <h4 className="font-medium text-amber-200/90 mb-3 flex items-center gap-2">
              <Volume2 className="w-4 h-4" /> Suara & Ambience
            </h4>
            <div className="space-y-3 bg-[#1c2232] p-4 rounded-xl border border-white/5">
              <div className="flex items-center justify-between">
                <span className="text-stone-300">Mode Senyap (Mute)</span>
                <button
                  onClick={onToggleMute}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                    isMuted
                      ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40'
                      : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                  }`}
                >
                  {isMuted ? 'Muted' : 'Sound On'}
                </button>
              </div>

              <div>
                <div className="flex justify-between text-xs text-stone-400 mb-1">
                  <span>Volume Master</span>
                  <span>{Math.round(masterVolume * 100)}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.05"
                  value={masterVolume}
                  onChange={(e) => onChangeMasterVolume(parseFloat(e.target.value))}
                  className="w-full accent-amber-400 cursor-pointer"
                />
              </div>
            </div>
          </div>

          {/* Reading & Accessibility */}
          <div>
            <h4 className="font-medium text-amber-200/90 mb-3 flex items-center gap-2">
              <Eye className="w-4 h-4" /> Tampilan & Aksesibilitas
            </h4>
            <div className="space-y-4 bg-[#1c2232] p-4 rounded-xl border border-white/5">
              {/* Text Speed */}
              <div>
                <span className="block text-stone-300 text-xs mb-2">Kecepatan Teks</span>
                <div className="grid grid-cols-4 gap-1.5">
                  {(['slow', 'normal', 'fast', 'instant'] as const).map((spd) => (
                    <button
                      key={spd}
                      onClick={() => onChangeTextSpeed(spd)}
                      className={`py-1.5 rounded-lg text-xs font-medium capitalize transition-all ${
                        textSpeed === spd
                          ? 'bg-amber-400 text-black font-semibold'
                          : 'bg-[#293247] text-stone-300 hover:bg-[#343e57]'
                      }`}
                    >
                      {spd}
                    </button>
                  ))}
                </div>
              </div>

              {/* Font Size */}
              <div>
                <span className="block text-stone-300 text-xs mb-2">Ukuran Huruf</span>
                <div className="grid grid-cols-3 gap-2">
                  {(['normal', 'large', 'xlarge'] as const).map((sz) => (
                    <button
                      key={sz}
                      onClick={() => onChangeFontSize(sz)}
                      className={`py-1.5 rounded-lg text-xs font-medium capitalize transition-all ${
                        fontSize === sz
                          ? 'bg-amber-400 text-black font-semibold'
                          : 'bg-[#293247] text-stone-300 hover:bg-[#343e57]'
                      }`}
                    >
                      {sz === 'normal' ? 'Normal' : sz === 'large' ? 'Besar' : 'Ekstra'}
                    </button>
                  ))}
                </div>
              </div>

              {/* High Contrast & Reduced Motion */}
              <div className="flex items-center justify-between pt-2 border-t border-white/5">
                <span className="text-stone-300 text-xs">Kontras Tinggi (OLED)</span>
                <input
                  type="checkbox"
                  checked={highContrast}
                  onChange={onToggleHighContrast}
                  className="w-4 h-4 accent-amber-400 cursor-pointer"
                />
              </div>

              <div className="flex items-center justify-between">
                <span className="text-stone-300 text-xs">Kurangi Animasi (Reduced Motion)</span>
                <input
                  type="checkbox"
                  checked={reducedMotion}
                  onChange={onToggleReducedMotion}
                  className="w-4 h-4 accent-amber-400 cursor-pointer"
                />
              </div>
            </div>
          </div>

          {/* Save Slots */}
          <div>
            <h4 className="font-medium text-amber-200/90 mb-3 flex items-center gap-2">
              <Save className="w-4 h-4" /> Slot Penyimpanan (Save Slots)
            </h4>
            <div className="space-y-2.5">
              {['slot_1', 'slot_2', 'slot_3'].map((slotId, index) => {
                const existing = saveSlots.find((s) => s.id === slotId);
                const isJustSaved = saveSuccessSlot === slotId;

                return (
                  <div
                    key={slotId}
                    className="p-3 bg-[#1c2232] rounded-xl border border-white/5 flex items-center justify-between gap-3"
                  >
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-mono font-bold text-amber-400">
                          Slot {index + 1}
                        </span>
                        {existing && (
                          <span className="text-[10px] text-stone-400">
                            {new Date(existing.timestamp).toLocaleTimeString([], {
                              hour: '2-digit',
                              minute: '2-digit'
                            })}
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-stone-300 truncate mt-0.5">
                        {existing ? existing.chapterTitle : 'Kosong (Belum ada data)'}
                      </p>
                    </div>

                    <div className="flex items-center gap-1.5 shrink-0">
                      <button
                        onClick={() => handleSaveToSlot(slotId)}
                        title="Simpan Progres"
                        className={`p-2 rounded-lg transition-all text-xs flex items-center gap-1 ${
                          isJustSaved
                            ? 'bg-emerald-500 text-black'
                            : 'bg-[#293247] hover:bg-amber-400 hover:text-black text-stone-200'
                        }`}
                      >
                        {isJustSaved ? <Check className="w-3.5 h-3.5" /> : <Save className="w-3.5 h-3.5" />}
                        <span className="text-[11px]">{isJustSaved ? 'Tersimpan' : 'Simpan'}</span>
                      </button>

                      {existing && (
                        <button
                          onClick={() => handleLoadSlot(existing)}
                          title="Muat Data"
                          className="p-2 rounded-lg bg-[#293247] hover:bg-sky-400 hover:text-black text-stone-200 transition-all text-xs flex items-center gap-1"
                        >
                          <Download className="w-3.5 h-3.5" />
                          <span className="text-[11px]">Muat</span>
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="pt-2 border-t border-white/10 space-y-2">
            <button
              onClick={() => {
                if (confirm('Ulangi bab saat ini dari awal?')) {
                  onRestartChapter();
                  onClose();
                }
              }}
              className="w-full py-2.5 rounded-xl bg-[#1c2232] hover:bg-[#283147] text-stone-300 text-xs font-medium flex items-center justify-center gap-2 transition-all"
            >
              <RotateCcw className="w-3.5 h-3.5 text-amber-300" />
              Mulai Ulang Bab Ini
            </button>

            <button
              onClick={() => {
                if (confirm('Mulai ulang seluruh cerita dari awal?')) {
                  onRestartStory();
                  onClose();
                }
              }}
              className="w-full py-2.5 rounded-xl bg-rose-950/30 hover:bg-rose-950/60 border border-rose-500/20 text-rose-300 text-xs font-medium flex items-center justify-center gap-2 transition-all"
            >
              <Trash2 className="w-3.5 h-3.5 text-rose-400" />
              Mulai Ulang Dari Awal Cerita
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
