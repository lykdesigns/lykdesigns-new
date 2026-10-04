import React from 'react';

interface PrincipleCardProps {
  category: string;
  code: string;
  status?: string;
  type: 'precision' | 'clarity' | 'creativity';
}

export const ScreenshotStyleIconBox: React.FC<PrincipleCardProps> = ({
  category,
  code,
  status = 'STATUS: ACTIVE ★',
  type,
}) => {
  return (
    <div className="h-56 sm:h-60 bg-[#08080A] border border-[#1C1C1F] p-4 relative overflow-hidden rounded-2xl flex flex-col justify-between select-none group/box">
      {/* Subtle orange radial glow in background */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-[#FF5A1F]/5 rounded-full blur-2xl pointer-events-none" />

      {/* Top Header */}
      <div className="relative z-10 flex items-center justify-between font-mono text-[10px]">
        {/* Left Pill */}
        <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border border-[#382218] bg-[#1A0E08]/80 text-[#FF5A1F] font-semibold tracking-wider text-[9px] uppercase">
          <span>{category}</span>
          <span className="text-[#FF5A1F]">•</span>
          <span>2026</span>
        </div>

        {/* Right Code */}
        <span className="text-[#666666] font-mono text-[10px] tracking-wider">
          [{code}]
        </span>
      </div>

      {/* Center Display with Background Glyphs and Central Floating Card */}
      <div className="relative z-10 my-auto flex flex-col items-center justify-center">
        {/* Background Vector Glyphs Container */}
        <div className="relative w-full max-w-[280px] h-24 flex items-center justify-center">
          {/* Left Faint Glyph: Robot/CAD Outline */}
          <div className="absolute left-3 top-1/2 -translate-y-1/2 opacity-20 pointer-events-none">
            <svg width="54" height="42" viewBox="0 0 54 42" fill="none" stroke="#666666" strokeWidth="2">
              <rect x="7" y="11" width="40" height="28" rx="6" />
              <line x1="17" y1="2" x2="17" y2="11" />
              <line x1="2" y1="25" x2="7" y2="25" />
              <line x1="47" y1="25" x2="52" y2="25" />
              <circle cx="20" cy="24" r="2" fill="#666666" />
              <circle cx="34" cy="24" r="2" fill="#666666" />
              <line x1="23" y1="40" x2="23" y2="44" />
              <line x1="31" y1="40" x2="31" y2="44" />
            </svg>
          </div>

          {/* Right Faint Glyph: 4-Point Star Sparkle + Plus + Circle */}
          <div className="absolute right-3 top-1/2 -translate-y-1/2 opacity-20 pointer-events-none flex items-center gap-1">
            <svg width="48" height="48" viewBox="0 0 48 48" fill="none" stroke="#666666" strokeWidth="2">
              <path d="M24 4 C24 16 32 24 44 24 C32 24 24 32 24 44 C24 32 16 24 4 24 C16 24 24 16 24 4 Z" strokeLinejoin="round" />
            </svg>
            <div className="flex flex-col gap-2 -ml-1">
              <span className="text-[#666666] text-sm font-bold leading-none">+</span>
              <div className="w-2 h-2 rounded-full border border-[#666666]" />
            </div>
          </div>

          {/* Center Elevated Dark Card with Orange Icons */}
          <div className="relative z-20 w-20 h-20 sm:w-22 sm:h-22 rounded-2xl bg-[#121418] border border-[#262830] shadow-[0_8px_24px_rgba(0,0,0,0.7)] flex items-center justify-center transition-all duration-300 group-hover/box:scale-105 group-hover/box:border-[#FF5A1F]/60 group-hover/box:shadow-[0_8px_28px_rgba(255,90,31,0.2)]">
            {type === 'precision' && (
              // Hexagon vector icon in Orange
              <svg width="44" height="44" viewBox="0 0 44 44" fill="none">
                <path
                  d="M22 6 L35 14 L35 30 L22 38 L9 30 L9 14 Z"
                  stroke="#FF5A1F"
                  strokeWidth="3.5"
                  strokeLinejoin="round"
                  strokeLinecap="round"
                  className="drop-shadow-[0_0_10px_rgba(255,90,31,0.6)]"
                />
              </svg>
            )}

            {type === 'clarity' && (
              // Optical aperture / diamond vector icon in Orange
              <svg width="44" height="44" viewBox="0 0 44 44" fill="none">
                <path
                  d="M22 7 L37 22 L22 37 L7 22 Z"
                  stroke="#FF5A1F"
                  strokeWidth="3.5"
                  strokeLinejoin="round"
                  strokeLinecap="round"
                  className="drop-shadow-[0_0_10px_rgba(255,90,31,0.6)]"
                />
                <circle cx="22" cy="22" r="5" stroke="#FF5A1F" strokeWidth="2.5" />
              </svg>
            )}

            {type === 'creativity' && (
              // 4-Point geometric sparkle/star vector icon in Orange
              <svg width="44" height="44" viewBox="0 0 44 44" fill="none">
                <path
                  d="M22 5 C22 14 30 22 39 22 C30 22 22 30 22 39 C22 30 14 22 5 22 C14 22 22 14 22 5 Z"
                  stroke="#FF5A1F"
                  strokeWidth="3"
                  strokeLinejoin="round"
                  className="drop-shadow-[0_0_10px_rgba(255,90,31,0.6)]"
                />
                <circle cx="22" cy="22" r="3" fill="#FF5A1F" />
              </svg>
            )}
          </div>
        </div>
      </div>

      {/* Bottom Footer Status Line */}
      <div className="relative z-10 font-mono text-[9px] text-[#555555] tracking-wider">
        {status}
      </div>
    </div>
  );
};
