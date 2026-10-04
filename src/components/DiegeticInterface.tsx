import React from 'react';
import type { DiegeticItem } from '../types/story';
import { X, Smartphone, Disc, Terminal, Book, Check } from 'lucide-react';

interface DiegeticInterfaceProps {
  item: DiegeticItem;
  isOpen: boolean;
  onClose: () => void;
  onItemRead: (flag: string) => void;
  isUnlocked: boolean;
}

export const DiegeticInterface: React.FC<DiegeticInterfaceProps> = ({
  item,
  isOpen,
  onClose,
  onItemRead,
  isUnlocked
}) => {
  if (!isOpen) return null;

  const handleRead = () => {
    onItemRead(item.flagToUnlock);
    onClose();
  };

  return (
    <div
      role="dialog"
      aria-label={item.title}
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md animate-fade-in"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-sm sm:max-w-md rounded-3xl shadow-2xl relative overflow-hidden transition-all duration-300 select-text"
      >
        {item.type === 'phone' && (
          <div className="bg-[#11131c] border-4 border-[#252a38] rounded-3xl p-5 text-white flex flex-col shadow-2xl">
            <div className="flex justify-between items-center text-xs text-stone-400 mb-4 px-2">
              <span className="font-mono">{item.content.timestamp || '02:14'}</span>
              <div className="w-16 h-3 bg-black rounded-full" />
              <div className="flex gap-1.5 items-center">
                <Smartphone className="w-3.5 h-3.5" />
                <span className="text-[10px]">5G</span>
              </div>
            </div>

            <div className="flex items-center gap-3 pb-3 border-b border-white/10 mb-4">
              <div className="w-10 h-10 rounded-full bg-rose-600 flex items-center justify-center font-bold text-white shadow-md">
                {item.content.sender?.[0] || 'N'}
              </div>
              <div className="flex-1">
                <h4 className="font-semibold text-sm text-stone-100">{item.content.sender || 'Kontak'}</h4>
                <span className="text-[10px] text-emerald-400">Online</span>
              </div>
              <button onClick={onClose} className="p-1 rounded-full hover:bg-white/10 text-stone-400">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="bg-[#1a2030] p-4 rounded-2xl border border-white/5 mb-4 shadow-inner">
              <p className="text-sm text-stone-100 leading-relaxed font-sans">{item.content.body}</p>
              {item.content.extraNote && (
                <p className="text-xs text-stone-400 mt-2 font-serif italic border-t border-white/5 pt-2">
                  {item.content.extraNote}
                </p>
              )}
            </div>

            <button
              onClick={handleRead}
              className="w-full py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-black font-semibold text-xs transition-all flex items-center justify-center gap-1.5 shadow-lg active:scale-95"
            >
              <Check className="w-4 h-4" />
              {isUnlocked ? 'Tutup Pesan' : 'Simpan ke Memori'}
            </button>
          </div>
        )}

        {item.type === 'recorder' && (
          <div className="bg-[#0a0f0e] border-2 border-emerald-950/60 rounded-2xl p-6 text-stone-200 shadow-2xl relative">
            <div className="flex items-center justify-between border-b border-emerald-900/30 pb-3 mb-4">
              <div className="flex items-center gap-2">
                <Disc className="w-5 h-5 text-red-500 animate-spin" />
                <span className="text-xs font-mono tracking-widest text-red-400 uppercase">
                  PLAYING TAPE · REC_404
                </span>
              </div>
              <button onClick={onClose} className="p-1 text-stone-500 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="bg-[#050807] border border-emerald-950 p-4 rounded-xl mb-4 font-mono text-xs space-y-3">
              <div className="flex justify-between text-[11px] text-stone-500">
                <span>REKORDER MEDIS RSJ-1994</span>
                <span className="text-emerald-500/80">{item.content.timestamp}</span>
              </div>

              <div className="p-3 bg-black/60 rounded border border-emerald-900/20 text-emerald-300 text-xs sm:text-sm leading-relaxed font-mono">
                {item.content.body}
              </div>

              {item.content.extraNote && (
                <div className="text-[11px] text-red-400/90 italic">
                  [CATATAN]: {item.content.extraNote}
                </div>
              )}
            </div>

            <button
              onClick={handleRead}
              className="w-full py-2.5 rounded-xl bg-emerald-950/80 hover:bg-emerald-900 border border-emerald-500/40 text-emerald-200 font-mono text-xs transition-all flex items-center justify-center gap-1.5 shadow-lg active:scale-95"
            >
              <Check className="w-4 h-4" />
              {isUnlocked ? 'Tutup Rekaman' : 'Kunci Bukti Medis'}
            </button>
          </div>
        )}

        {item.type === 'terminal' && (
          <div className="bg-[#070914] border-2 border-cyan-500/40 rounded-2xl p-5 text-cyan-200 shadow-[0_0_30px_rgba(0,242,254,0.15)] relative font-mono">
            <div className="flex items-center justify-between border-b border-cyan-500/20 pb-3 mb-3">
              <div className="flex items-center gap-2">
                <Terminal className="w-4 h-4 text-cyan-400" />
                <span className="text-xs text-cyan-300 tracking-wider">
                  {item.title}
                </span>
              </div>
              <button onClick={onClose} className="p-1 text-cyan-500 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="bg-[#03040a] p-3.5 rounded-xl border border-cyan-900/30 text-xs space-y-2 mb-4">
              <div className="flex justify-between text-[10px] text-cyan-500">
                <span>STATUS: LINKED</span>
                <span>{item.content.timestamp}</span>
              </div>
              <p className="text-cyan-100 leading-relaxed">{item.content.body}</p>
              {item.content.extraNote && (
                <p className="text-[10px] text-fuchsia-400 border-t border-cyan-950 pt-1.5">
                  &gt; {item.content.extraNote}
                </p>
              )}
            </div>

            <button
              onClick={handleRead}
              className="w-full py-2.5 rounded-xl bg-cyan-950 hover:bg-cyan-900 border border-cyan-400 text-cyan-300 text-xs font-mono font-bold tracking-wider transition-all flex items-center justify-center gap-1.5 active:scale-95 shadow-[0_0_15px_rgba(0,242,254,0.3)]"
            >
              <Check className="w-4 h-4" />
              {isUnlocked ? 'DEKRIPSI SELESAI' : 'EKSTRAK PAYLOAD'}
            </button>
          </div>
        )}

        {item.type === 'grimoire' && (
          <div className="bg-[#1a1429] border-2 border-amber-400/40 rounded-3xl p-6 text-amber-100 shadow-2xl relative font-serif">
            <div className="flex items-center justify-between border-b border-amber-400/20 pb-3 mb-4">
              <div className="flex items-center gap-2">
                <Book className="w-5 h-5 text-amber-300" />
                <span className="text-xs tracking-widest text-amber-300 font-bold uppercase">
                  {item.title}
                </span>
              </div>
              <button onClick={onClose} className="p-1 text-stone-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="bg-[#120d20] p-4 rounded-2xl border border-amber-500/20 mb-4 space-y-2">
              <span className="text-[10px] font-mono text-amber-400/80 block">
                {item.content.timestamp}
              </span>
              <p className="text-sm leading-relaxed italic text-amber-50">
                "{item.content.body}"
              </p>
              {item.content.extraNote && (
                <p className="text-xs text-purple-300/80 pt-2 border-t border-purple-500/20">
                  ✦ {item.content.extraNote}
                </p>
              )}
            </div>

            <button
              onClick={handleRead}
              className="w-full py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-purple-950 font-bold text-xs transition-all flex items-center justify-center gap-1.5 shadow-lg active:scale-95"
            >
              <Check className="w-4 h-4" />
              {isUnlocked ? 'Tutup Naskah' : 'Simpan Mantra ke Memori'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
