import React, { useEffect, useRef } from 'react';
import { X, BookOpen } from 'lucide-react';

interface HistoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  history: Array<{
    sceneId: string;
    speaker: string | null;
    text: string;
    timestamp: number;
  }>;
}

export const HistoryModal: React.FC<HistoryModalProps> = ({
  isOpen,
  onClose,
  history
}) => {
  const bottomRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (isOpen && bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-label="Riwayat Percakapan"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-md animate-fade-in"
    >
      <div className="w-full max-w-lg h-[82vh] bg-[#141822] border border-white/10 rounded-2xl flex flex-col shadow-2xl overflow-hidden text-stone-100">
        <div className="px-5 py-4 border-b border-white/10 flex items-center justify-between bg-black/30">
          <div className="flex items-center gap-2.5">
            <BookOpen className="w-5 h-5 text-amber-300" />
            <h3 className="font-serif text-lg font-semibold tracking-wide text-stone-100">
              Riwayat Cerita
            </h3>
          </div>
          <button
            onClick={onClose}
            aria-label="Tutup Riwayat"
            className="p-1.5 rounded-lg text-stone-400 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-5 space-y-4 font-sans text-sm sm:text-base">
          {history.length === 0 ? (
            <p className="text-center text-stone-400 py-12 italic font-serif">
              Belum ada percakapan tercatat.
            </p>
          ) : (
            history.map((item, idx) => (
              <div
                key={idx}
                className={`p-3.5 rounded-xl ${
                  item.speaker
                    ? 'bg-[#1b212f]/70 border-l-4 border-amber-400/80'
                    : 'bg-[#181c26]/40 italic font-serif text-stone-300 border-l-2 border-stone-600'
                }`}
              >
                {item.speaker && (
                  <span className="block text-xs font-bold uppercase tracking-wider text-amber-300/90 mb-1">
                    {item.speaker}
                  </span>
                )}
                <p className="leading-relaxed text-stone-200">{item.text}</p>
              </div>
            ))
          )}
          <div ref={bottomRef} />
        </div>
      </div>
    </div>
  );
};
