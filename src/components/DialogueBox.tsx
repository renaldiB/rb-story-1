import React, { useState, useEffect, useRef } from 'react';
import type { ThemeTokens } from '../engine/themeEngine';

interface DialogueBoxProps {
  speaker: string | null;
  text: string;
  subText?: string;
  onAdvance: () => void;
  hasChoices: boolean;
  textSpeed?: 'slow' | 'normal' | 'fast' | 'instant';
  fontSize?: 'normal' | 'large' | 'xlarge';
  highContrast?: boolean;
  themeTokens?: ThemeTokens;
}

export const DialogueBox: React.FC<DialogueBoxProps> = ({
  speaker,
  text,
  subText,
  onAdvance,
  hasChoices,
  textSpeed = 'normal',
  fontSize = 'normal',
  highContrast = false,
}) => {
  const speedMap = {
    slow: 40,
    normal: 20,
    fast: 10,
    instant: 0,
  };

  const currentSpeed = speedMap[textSpeed];

  const [displayedChars, setDisplayedChars] = useState<number>(() =>
    currentSpeed === 0 ? text.length : 0
  );
  const [isComplete, setIsComplete] = useState<boolean>(() => currentSpeed === 0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (currentSpeed === 0) {
      setDisplayedChars(text.length);
      setIsComplete(true);
      return;
    }

    setDisplayedChars(0);
    setIsComplete(false);

    let index = 0;
    if (intervalRef.current) clearInterval(intervalRef.current);

    intervalRef.current = setInterval(() => {
      index++;
      setDisplayedChars(index);
      if (index >= text.length) {
        if (intervalRef.current) clearInterval(intervalRef.current);
        intervalRef.current = null;
        setIsComplete(true);
      }
    }, currentSpeed);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [text, currentSpeed]);

  // Requirement 6: Jika dialog textbox diklik, proses penulisan text langsung selesai
  const handleBoxTap = (e?: React.MouseEvent) => {
    if (e) {
      e.stopPropagation();
    }

    if (!isComplete) {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      setDisplayedChars(text.length);
      setIsComplete(true);
    } else {
      if (!hasChoices) {
        onAdvance();
      }
    }
  };

  const textSizeClass =
    fontSize === 'xlarge'
      ? 'text-lg sm:text-xl md:text-2xl leading-relaxed'
      : fontSize === 'large'
      ? 'text-base sm:text-lg md:text-xl leading-relaxed'
      : 'text-[15px] sm:text-[17px] md:text-[19px] leading-[1.6]';

  const isNarration = speaker === null;

  return (
    <div
      onClick={handleBoxTap}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === ' ' || e.key === 'Enter') {
          e.preventDefault();
          handleBoxTap();
        }
      }}
      aria-label={speaker ? `${speaker}: ${text}` : text}
      className="w-full relative cursor-pointer select-none transition-all duration-300 focus:outline-none pt-4"
    >
      {/* Speaker Name Tag (Overlapping top-left edge as in reference design) */}
      {speaker && (
        <div className="absolute top-1 left-6 sm:left-10 z-20">
          <span
            className={`inline-block px-4 py-1 rounded text-xs sm:text-sm font-semibold tracking-wide uppercase shadow-md ${
              highContrast
                ? 'bg-black text-amber-300 border border-amber-400'
                : 'bg-[#3f414a] text-white border border-[#525560]'
            }`}
          >
            {speaker}
          </span>
        </div>
      )}

      {/* Main Dialogue Box Container (Off-white / cream styling matching reference) */}
      <div
        className={`w-full rounded-xl sm:rounded-2xl p-5 sm:p-7 md:p-8 transition-all duration-200 shadow-[0_16px_40px_rgba(0,0,0,0.55)] border relative ${
          highContrast
            ? 'bg-black/95 text-white border-2 border-amber-400'
            : isNarration
            ? 'bg-[#f4f1e8] text-[#2c2d33] border-[#ded9cb]'
            : 'bg-[#f6f4ee] text-[#222328] border-[#e2dec9]'
        }`}
      >
        <div className="relative min-h-[4rem] sm:min-h-[4.5rem] pr-12">
          <p
            className={`${textSizeClass} ${
              isNarration
                ? 'font-serif italic text-[#3c3d44] tracking-wide'
                : 'font-sans font-normal text-[#222328] tracking-normal'
            }`}
          >
            {text.slice(0, displayedChars)}
            {!isComplete && (
              <span className="inline-block w-1.5 h-4 ml-1 bg-[#e0564c] animate-pulse" />
            )}
          </p>

          {subText && isComplete && (
            <p className="mt-2 text-xs sm:text-sm text-[#737168] italic font-serif">
              {subText}
            </p>
          )}
        </div>

        {/* Continue Action Button ("...") on bottom-right corner as shown in reference design */}
        {!hasChoices && (
          <div className="absolute bottom-3 sm:bottom-4 right-4 sm:right-6">
            <button
              type="button"
              onClick={handleBoxTap}
              className={`w-10 h-7 sm:w-12 sm:h-8 rounded-lg shadow-md font-bold tracking-widest text-white flex items-center justify-center transition-all ${
                isComplete
                  ? 'bg-[#e0564c] hover:bg-[#c9453c] active:scale-95 cursor-pointer opacity-100 animate-pulse'
                  : 'bg-[#e0564c]/70 opacity-70 cursor-pointer'
              }`}
              title="Lanjut"
            >
              <span className="text-base sm:text-lg leading-none -mt-1 font-mono">···</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
