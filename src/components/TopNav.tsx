import React from 'react';
import { Volume2, VolumeX, Play, Pause, BookOpen, Settings, Compass, Monitor, Smartphone } from 'lucide-react';

interface TopNavProps {
  chapterTitle: string;
  progressPercent: number;
  genre?: string;
  isMuted: boolean;
  onToggleMute: () => void;
  isAutoPlay: boolean;
  onToggleAutoPlay: () => void;
  onOpenHistory: () => void;
  onOpenSettings: () => void;
  onOpenLibrary: () => void;
  viewMode?: 'widescreen' | 'mobile';
  onToggleViewMode?: () => void;
}

export const TopNav: React.FC<TopNavProps> = ({
  chapterTitle,
  progressPercent,
  genre,
  isMuted,
  onToggleMute,
  isAutoPlay,
  onToggleAutoPlay,
  onOpenHistory,
  onOpenSettings,
  onOpenLibrary,
  viewMode,
  onToggleViewMode,
}) => {
  return (
    <header className="w-full px-3.5 sm:px-6 py-3 flex items-center justify-between z-30 select-none bg-gradient-to-b from-black/85 via-black/45 to-transparent">
      <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1">
        <button
          onClick={onOpenLibrary}
          title="Pilih Dunia Cerita"
          aria-label="Pilih Dunia Cerita"
          className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-stone-200 transition-colors flex items-center gap-1 shrink-0"
        >
          <Compass className="w-4 h-4 text-amber-300" />
          <span className="text-[10px] font-mono uppercase tracking-wider font-bold hidden sm:inline-block">
            {genre || 'Story'}
          </span>
        </button>

        <span className="text-xs sm:text-sm font-medium tracking-wide text-stone-200/95 drop-shadow-md whitespace-nowrap">
          {chapterTitle}
        </span>
        <span className="text-[10px] sm:text-xs text-amber-300/80 font-mono font-light shrink-0">
          · {progressPercent}%
        </span>
      </div>

      <div className="flex items-center gap-1 sm:gap-2 shrink-0">
        {onToggleViewMode && (
          <button
            onClick={onToggleViewMode}
            aria-label={viewMode === 'widescreen' ? 'Ganti ke Mode Ponsel (V)' : 'Ganti ke Layar Penuh Sinematik (V)'}
            className="p-2 rounded-full text-stone-300 hover:text-white hover:bg-white/10 transition-colors active:scale-95"
            title={viewMode === 'widescreen' ? 'Mode Ponsel (V)' : 'Layar Penuh Sinematik (V)'}
          >
            {viewMode === 'widescreen' ? (
              <Smartphone className="w-4 h-4 text-sky-400" />
            ) : (
              <Monitor className="w-4 h-4 text-amber-300" />
            )}
          </button>
        )}

        <button
          onClick={onToggleAutoPlay}
          aria-label={isAutoPlay ? 'Jeda Otomatis' : 'Putar Otomatis'}
          className={`p-2 rounded-full transition-colors active:scale-95 ${
            isAutoPlay
              ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
              : 'text-stone-300 hover:text-white hover:bg-white/10'
          }`}
          title="Auto-play (A)"
        >
          {isAutoPlay ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
        </button>

        {/* Audio Mute/Unmute */}
        <button
          onClick={onToggleMute}
          aria-label={isMuted ? 'Buka Suara' : 'Bisukan Suara'}
          className="p-2 rounded-full text-stone-300 hover:text-white hover:bg-white/10 transition-colors active:scale-95"
          title="Audio (M)"
        >
          {isMuted ? (
            <VolumeX className="w-4 h-4 text-rose-400" />
          ) : (
            <Volume2 className="w-4 h-4 text-emerald-400" />
          )}
        </button>

        {/* History / Backlog */}
        <button
          onClick={onOpenHistory}
          aria-label="Catatan Percakapan"
          className="p-2 rounded-full text-stone-300 hover:text-white hover:bg-white/10 transition-colors active:scale-95"
          title="Log Riwayat (H)"
        >
          <BookOpen className="w-4 h-4" />
        </button>

        {/* Settings */}
        <button
          onClick={onOpenSettings}
          aria-label="Pengaturan"
          className="p-2 rounded-full text-stone-300 hover:text-white hover:bg-white/10 transition-colors active:scale-95"
          title="Pengaturan (Esc)"
        >
          <Settings className="w-4 h-4" />
        </button>
      </div>
    </header>
  );
};
