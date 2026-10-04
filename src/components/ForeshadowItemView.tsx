import React, { useState } from 'react';
import type { ForeshadowItem } from '../types/story';
import { Sparkles, Ticket, X } from 'lucide-react';

interface ForeshadowItemViewProps {
  item: ForeshadowItem;
  isAlreadyDiscovered: boolean;
  onDiscover: () => void;
}

export const ForeshadowItemView: React.FC<ForeshadowItemViewProps> = ({
  item,
  isAlreadyDiscovered,
  onDiscover
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!isAlreadyDiscovered) {
      onDiscover();
    }
    setIsOpen(true);
  };

  const getIcon = () => {
    switch (item.icon) {
      case 'ticket':
        return <Ticket className="w-5 h-5 text-amber-200" />;
      case 'sparkles':
      default:
        return <Sparkles className="w-5 h-5 text-amber-200" />;
    }
  };

  return (
    <>
      <button
        onClick={handleClick}
        aria-label="Amati benda di sekitarmu"
        className="absolute top-16 right-5 z-20 p-2.5 rounded-full bg-black/40 hover:bg-black/65 border border-white/20 hover:border-amber-300/50 backdrop-blur-md shadow-lg transition-all duration-300 group active:scale-95 animate-pulse"
      >
        <div className="relative">
          {getIcon()}
          {!isAlreadyDiscovered && (
            <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-amber-400 ring-2 ring-black animate-ping" />
          )}
        </div>
      </button>

      {isOpen && (
        <div
          role="dialog"
          aria-label="Benda Ditemukan"
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-fade-in"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-sm rounded-2xl bg-[#181d28] border border-amber-500/30 p-6 text-stone-100 shadow-2xl relative"
          >
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 text-stone-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/30">
                {getIcon()}
              </div>
              <div>
                <h4 className="font-serif text-lg font-semibold text-amber-200">
                  {item.name}
                </h4>
                <span className="text-[11px] text-amber-400/80 font-mono tracking-wide">
                  Tersimpan di Memori
                </span>
              </div>
            </div>

            <p className="text-sm text-stone-300 leading-relaxed font-serif italic mb-4">
              "{item.description}"
            </p>

            {item.unlockedHint && (
              <div className="p-2.5 rounded-lg bg-amber-950/30 border border-amber-500/20 text-xs text-amber-300">
                {item.unlockedHint}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};
