import React, { useState, useEffect, useRef } from 'react';
import { ChevronRight } from 'lucide-react';
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
  themeTokens
}) => {
  const speedMap = {
    slow: 40,
    normal: 22,
    fast: 10,
    instant: 0
  };

  const currentSpeed = speedMap[textSpeed];

  const [displayedChars, setDisplayedChars] = useState<number>(() =>
    currentSpeed === 0 ? text.length : 0
  );
  const isTypingRef = useRef<boolean>(currentSpeed !== 0);

  useEffect(() => {
    if (currentSpeed === 0) {
      isTypingRef.current = false;
      return;
    }

    isTypingRef.current = true;
    let index = 0;
    const interval = setInterval(() => {
      index++;
      setDisplayedChars(index);
      if (index >= text.length) {
        clearInterval(interval);
        isTypingRef.current = false;
      }
    }, currentSpeed);

    return () => {
      clearInterval(interval);
    };
  }, [text, currentSpeed]);

  const isComplete = displayedChars >= text.length;

  const handleBoxTap = () => {
    if (!isComplete) {
      setDisplayedChars(text.length);
      isTypingRef.current = false;
    } else {
      if (!hasChoices) {
        onAdvance();
      }
    }
  };

  const textSizeClass =
    fontSize === 'xlarge'
      ? 'text-xl sm:text-2xl leading-relaxed'
      : fontSize === 'large'
      ? 'text-lg sm:text-xl leading-relaxed'
      : 'text-[17px] sm:text-[19px] leading-[1.6]';

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
      className="w-full relative cursor-pointer select-none transition-all duration-300 focus:outline-none"
    >
      <div
        className={`w-full rounded-2xl p-4 sm:p-6 transition-all duration-300 shadow-2xl border ${
          highContrast
            ? 'bg-black/95 text-white border-2 border-amber-400/80 shadow-black'
            : themeTokens
            ? `${themeTokens.uiContainerBg} ${themeTokens.uiBorder} text-stone-100 shadow-[0_12px_40px_rgba(0,0,0,0.65)] backdrop-blur-md`
            : isNarration
            ? 'bg-[#121620]/90 backdrop-blur-md text-[#ede7df] border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.5)]'
            : 'bg-[#181a24]/90 backdrop-blur-md text-[#fbf7f0] border-white/10 shadow-[0_12px_40px_rgba(0,0,0,0.6)]'
        }`}
      >
        {speaker && (
          <div className="flex items-center gap-2 mb-2.5">
            <span
              className={`px-3 py-0.5 rounded-full text-xs sm:text-sm font-semibold tracking-wider uppercase border ${
                themeTokens
                  ? `${themeTokens.speakerBadgeBg} ${themeTokens.speakerBadgeText} ${themeTokens.speakerBadgeBorder}`
                  : speaker.toLowerCase().includes('nana') || speaker.toLowerCase().includes('nadia')
                  ? 'bg-rose-950/80 text-rose-200 border-rose-500/30'
                  : speaker.toLowerCase().includes('raka') || speaker.toLowerCase().includes('agus')
                  ? 'bg-sky-950/80 text-sky-200 border-sky-500/30'
                  : 'bg-amber-950/80 text-amber-200 border-amber-500/30'
              }`}
            >
              {speaker}
            </span>
          </div>
        )}

        <div className="relative min-h-[4.5rem]">
          <p
            className={`${textSizeClass} ${
              isNarration
                ? 'font-serif italic text-stone-200/95 tracking-wide'
                : 'font-sans font-normal text-stone-100 tracking-normal'
            }`}
          >
            {text.slice(0, displayedChars)}
            {!isComplete && (
              <span
                className="inline-block w-1.5 h-4 ml-1 animate-pulse"
                style={{ backgroundColor: themeTokens?.accentColor || '#f59e0b' }}
              />
            )}
          </p>

          {subText && isComplete && (
            <p className="mt-2 text-xs sm:text-sm text-stone-400/80 italic font-serif">
              {subText}
            </p>
          )}
        </div>

        {/* Continue indicator chevron with safe bottom margin */}
        {isComplete && !hasChoices && (
          <div className="flex justify-end items-center mt-3.5 pt-1 pb-1 text-stone-400">
            <span className="text-xs font-medium tracking-wider mr-1 opacity-80">Lanjut</span>
            <ChevronRight
              className="w-4 h-4 animate-bounce shrink-0"
              style={{ color: themeTokens?.accentColor || '#f59e0b' }}
            />
          </div>
        )}
      </div>
    </div>
  );
};
