import React from 'react';
import type { EndingDef } from '../types/story';
import { ENDINGS_CATALOG } from '../data/storyContent';
import { RotateCcw, Award, Sparkles, BookOpen } from 'lucide-react';

interface EndingScreenProps {
  endingId: string;
  endingsCatalog?: Record<string, EndingDef>;
  discoveredSecrets: string[];
  unlockedEndings: string[];
  onReplay: () => void;
  onChapterSelect?: (sceneId: string) => void;
}

export const EndingScreen: React.FC<EndingScreenProps> = ({
  endingId,
  endingsCatalog,
  discoveredSecrets,
  unlockedEndings,
  onReplay,
  onChapterSelect
}) => {
  const catalog = endingsCatalog || ENDINGS_CATALOG;
  const ending: EndingDef | undefined = catalog[endingId] || ENDINGS_CATALOG[endingId];

  const totalEndings = Object.keys(catalog).length;

  return (
    <div className="absolute inset-0 z-40 bg-[#090c14]/95 text-stone-100 flex flex-col items-center justify-between p-6 sm:p-10 animate-fade-in overflow-y-auto">
      <div className="text-center pt-6">
        <span className="text-xs font-mono tracking-widest text-amber-400 uppercase">
          Tamat · {ending?.tagline || 'Sebuah Akhir Cerita'}
        </span>
        <h1 className="text-3xl sm:text-4xl font-serif font-bold text-amber-100 mt-2 tracking-wide">
          {ending?.title || 'Akhir'}
        </h1>
      </div>

      <div className="max-w-md w-full my-auto text-center space-y-6 py-6">
        <div className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm shadow-2xl relative">
          <Sparkles className="w-6 h-6 text-amber-300 mx-auto mb-3 opacity-80" />
          <p className="font-serif italic text-base sm:text-lg text-stone-200 leading-relaxed">
            "{ending?.poem || 'Beberapa cerita selesai saat halaman terakhir tertutup.'}"
          </p>
          <div className="w-12 h-0.5 bg-amber-400/50 mx-auto mt-4" />
          <p className="text-xs sm:text-sm text-stone-400 mt-4 leading-relaxed font-sans">
            {ending?.summary}
          </p>
        </div>

        <div className="p-4 rounded-xl bg-[#131826] border border-white/5 text-left text-xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-stone-400 flex items-center gap-1.5 font-medium">
              <Award className="w-4 h-4 text-amber-400" /> Koleksi Ending
            </span>
            <span className="font-mono text-amber-300 font-bold">
              {unlockedEndings.length} / {totalEndings} Terbuka
            </span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-stone-400 flex items-center gap-1.5 font-medium">
              <BookOpen className="w-4 h-4 text-sky-400" /> Benda Rahasia
            </span>
            <span className="font-mono text-sky-300 font-bold">
              {discoveredSecrets.length} Ditemukan
            </span>
          </div>
        </div>
      </div>

      <div className="w-full max-w-sm space-y-3 pb-6">
        <button
          onClick={onReplay}
          className="w-full min-h-[50px] rounded-xl bg-amber-400 hover:bg-amber-300 text-black font-semibold text-sm sm:text-base flex items-center justify-center gap-2 shadow-lg transition-all active:scale-[0.98]"
        >
          <RotateCcw className="w-4 h-4" />
          Mainkan Kembali Cerita
        </button>

        {onChapterSelect && (
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => onChapterSelect('ch2_street_1')}
              className="py-2.5 px-3 rounded-lg bg-[#1e2536] hover:bg-[#2b354c] text-stone-300 text-xs font-medium text-center transition-all"
            >
              Lompat ke Bab 2
            </button>
            <button
              onClick={() => onChapterSelect('ch3_book_discovery')}
              className="py-2.5 px-3 rounded-lg bg-[#1e2536] hover:bg-[#2b354c] text-stone-300 text-xs font-medium text-center transition-all"
            >
              Lompat ke Bab 3
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
