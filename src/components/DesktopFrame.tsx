import React from 'react';

interface DesktopFrameProps {
  children: React.ReactNode;
  bgLocationId?: string;
  viewMode?: 'widescreen' | 'mobile';
}

export const DesktopFrame: React.FC<DesktopFrameProps> = ({
  children,
  viewMode = 'widescreen'
}) => {
  if (viewMode === 'widescreen') {
    return (
      <div className="relative w-screen h-[100dvh] bg-[#07090e] flex items-center justify-center overflow-hidden">
        <main className="relative w-full h-[100dvh] bg-[#0c0f18] flex flex-col overflow-hidden">
          {children}
        </main>
      </div>
    );
  }

  return (
    <div className="relative w-screen h-[100dvh] bg-[#07090e] flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 pointer-events-none hidden md:block opacity-25">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-sky-500/10 rounded-full blur-3xl" />
      </div>

      <main
        className="relative w-full h-[100dvh] md:max-w-[430px] md:h-[92vh] md:rounded-[36px] bg-[#0c0f18] border border-white/5 md:border-white/15 shadow-[0_25px_60px_rgba(0,0,0,0.85)] flex flex-col overflow-hidden transition-all duration-300"
      >
        {children}
      </main>
    </div>
  );
};
