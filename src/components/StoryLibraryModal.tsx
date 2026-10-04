import React from 'react';
import { X, Sparkles, Heart, Skull, Cpu, Compass } from 'lucide-react';
import { STORY_CATALOG } from '../data/multiStoryCatalog';
import type { StoryDefinition } from '../types/story';

interface StoryLibraryModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentStoryId: string;
  onSelectStory: (story: StoryDefinition) => void;
}

export const StoryLibraryModal: React.FC<StoryLibraryModalProps> = ({
  isOpen,
  onClose,
  currentStoryId,
  onSelectStory
}) => {
  if (!isOpen) return null;

  const getGenreIcon = (genre: string) => {
    switch (genre) {
      case 'romance':
        return <Heart className="w-5 h-5 text-rose-400" />;
      case 'horror':
        return <Skull className="w-5 h-5 text-emerald-400" />;
      case 'cyberpunk':
        return <Cpu className="w-5 h-5 text-cyan-400" />;
      case 'fantasy':
      default:
        return <Sparkles className="w-5 h-5 text-amber-300" />;
    }
  };

  return (
    <div
      role="dialog"
      aria-label="Pilih Dunia Cerita"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md animate-fade-in"
    >
      <div className="w-full max-w-lg max-h-[85vh] bg-[#121520] border border-white/10 rounded-2xl flex flex-col shadow-2xl overflow-hidden text-stone-100">
        <div className="px-5 py-4 border-b border-white/10 flex items-center justify-between bg-black/40">
          <div className="flex items-center gap-2">
            <Compass className="w-5 h-5 text-amber-300" />
            <h3 className="font-serif text-lg font-semibold tracking-wide">
              Pilih Dunia Cerita
            </h3>
          </div>
          <button
            onClick={onClose}
            aria-label="Tutup Pustaka"
            className="p-1.5 rounded-lg text-stone-400 hover:text-white hover:bg-white/10"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {Object.values(STORY_CATALOG).map((story) => {
            const isSelected = story.id === currentStoryId;
            return (
              <div
                key={story.id}
                onClick={() => {
                  onSelectStory(story);
                  onClose();
                }}
                className={`p-4 rounded-xl cursor-pointer border transition-all duration-200 flex flex-col gap-2 ${
                  isSelected
                    ? 'bg-[#1e2538] border-amber-400/80 shadow-lg'
                    : 'bg-[#161a28]/80 hover:bg-[#1c2234] border-white/5 hover:border-white/20'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="p-2 rounded-lg bg-black/40 border border-white/10">
                      {getGenreIcon(story.genre)}
                    </div>
                    <div>
                      <h4 className="font-serif text-base font-bold text-stone-100 leading-tight">
                        {story.title}
                      </h4>
                      <span className="text-xs text-stone-400 font-sans">
                        {story.subtitle}
                      </span>
                    </div>
                  </div>
                  <span className="text-[11px] font-mono uppercase px-2 py-0.5 rounded-full bg-white/5 border border-white/10 text-stone-300">
                    {story.genre}
                  </span>
                </div>

                <p className="text-xs text-stone-300/90 leading-relaxed font-sans line-clamp-2">
                  {story.synopsis}
                </p>

                <div className="flex items-center gap-2 pt-1 text-[10px] text-stone-400 font-mono">
                  <span>Visual: {story.visualBible.artStyle}</span>
                  <span>·</span>
                  <span>Audio: {story.visualBible.soundLanguage}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
