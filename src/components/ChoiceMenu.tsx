import React, { useEffect } from 'react';
import type { ChoiceOption, MultiDimRelationships } from '../types/story';
import type { ThemeTokens } from '../engine/themeEngine';
import { evaluateCondition } from '../engine/storyEngine';

interface ChoiceMenuProps {
  choices: ChoiceOption[];
  onSelect: (choice: ChoiceOption) => void;
  variables: MultiDimRelationships;
  flags: Record<string, boolean>;
  highContrast?: boolean;
  themeTokens?: ThemeTokens;
}

export const ChoiceMenu: React.FC<ChoiceMenuProps> = ({
  choices,
  onSelect,
  variables,
  flags,
  highContrast = false,
  themeTokens
}) => {
  const availableChoices = choices.filter((c) =>
    evaluateCondition(c.requiredCondition, variables, flags)
  );

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const num = parseInt(e.key, 10);
      if (!isNaN(num) && num >= 1 && num <= availableChoices.length) {
        e.preventDefault();
        onSelect(availableChoices[num - 1]);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [availableChoices, onSelect]);

  const count = availableChoices.length;

  const getGridClass = (n: number) => {
    if (n === 1) return 'grid grid-cols-1 max-w-xl mx-auto gap-2.5';
    if (n === 2) return 'grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3';
    if (n === 3) return 'grid grid-cols-2 md:grid-cols-3 gap-2 sm:gap-3';
    if (n === 4) return 'grid grid-cols-2 gap-2 sm:gap-3';
    return 'grid grid-cols-2 md:grid-cols-3 gap-2 sm:gap-3';
  };

  const getItemSpanClass = (n: number, index: number) => {
    if (n === 3 && index === 2) {
      return 'col-span-2 md:col-span-1';
    }
    return 'col-span-1';
  };

  return (
    <div
      role="dialog"
      aria-label="Story Choices"
      className="w-full flex flex-col py-1 animate-fade-in z-30 select-none"
    >
      <div className="flex items-center justify-between w-full mb-1.5 px-0.5">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/75 backdrop-blur-md border border-amber-500/40 text-amber-300 shadow-md">
          <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
          <span
            className="text-[11px] sm:text-xs font-serif italic tracking-wider uppercase font-semibold"
            style={{ color: themeTokens?.accentColor || '#f59e0b' }}
          >
            Apa keputusanmu?
          </span>
        </div>

        <span className="text-[10px] text-stone-300/80 font-mono hidden sm:inline-block bg-black/50 backdrop-blur-sm px-2.5 py-0.5 rounded-md border border-white/10">
          Tekan [1 - {count}]
        </span>
      </div>

      <div className={getGridClass(count)}>
        {availableChoices.map((choice, index) => (
          <button
            key={choice.id}
            onClick={() => onSelect(choice)}
            className={`${getItemSpanClass(count, index)} w-full min-h-[48px] sm:min-h-[58px] text-left px-3.5 py-2.5 sm:px-4 sm:py-3 rounded-xl transition-all duration-150 flex flex-col justify-center shadow-lg active:scale-[0.98] group focus:outline-none border backdrop-blur-md ${
              highContrast
                ? 'bg-black text-white border-2 border-amber-400 hover:bg-amber-400 hover:text-black'
                : themeTokens
                ? `${themeTokens.choiceBg} ${themeTokens.choiceHoverBg} ${themeTokens.choiceBorder} ${themeTokens.choiceText}`
                : 'bg-[#151926]/92 hover:bg-[#20273a] text-stone-100 hover:text-amber-200 border-white/15 hover:border-amber-400/50 shadow-[0_4px_20px_rgba(0,0,0,0.5)]'
            }`}
          >
            <div className="flex items-start gap-2.5">
              <span
                className="w-5 h-5 rounded-md bg-amber-500/15 border border-amber-500/30 text-amber-300 font-mono font-bold text-[11px] sm:text-xs flex items-center justify-center shrink-0 mt-0.5 group-hover:bg-amber-500/30 group-hover:border-amber-400/60 transition-colors"
                style={{
                  color: themeTokens?.accentColor || '#f59e0b',
                  borderColor: themeTokens?.accentColor ? `${themeTokens.accentColor}40` : undefined,
                }}
              >
                {index + 1}
              </span>
              <div className="flex-1 min-w-0">
                <span className="text-[13px] sm:text-[14px] md:text-[15px] font-medium leading-snug line-clamp-2 block text-stone-100 group-hover:text-amber-100 transition-colors">
                  {choice.text}
                </span>
                {choice.subtext && (
                  <span className="block text-[11px] sm:text-xs text-stone-400/90 mt-0.5 font-serif italic truncate group-hover:text-stone-300 transition-colors">
                    {choice.subtext}
                  </span>
                )}
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};
