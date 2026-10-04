import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useInView, useScroll, useTransform } from 'motion/react';
import { soundManager } from '../utils/audio';

const TAKEOVER_SLIDES = [
  {
    index: '01',
    word: 'SPACE.',
    sub: 'ARCHITECTURAL LIFE-SAFETY & EVACUATION SYSTEMS',
    coord: 'LAT 37.7749° // Z-INDEX: 01',
    accent: '#FF5A1F',
  },
  {
    index: '02',
    word: 'IDENTITY.',
    sub: 'MATHEMATICAL LOGOMARKS & VISUAL IDENTITY SYSTEMS',
    coord: 'GEOM φ 1.618 // Z-INDEX: 02',
    accent: '#F2F0EA',
  },
  {
    index: '03',
    word: 'DIGITAL.',
    sub: 'HIGH-PERFORMANCE INTERACTIVE EXPERIENCES & UI/UX',
    coord: 'VIEWPORT 1440×900 // Z-INDEX: 03',
    accent: '#FF5A1F',
  },
  {
    index: '04',
    word: 'ART.',
    sub: 'PRECISE BÉZIER VECTOR ARTWORK & ICONOGRAPHY',
    coord: 'CURVE VEC.TANGENT // Z-INDEX: 04',
    accent: '#F2F0EA',
  },
  {
    index: '05',
    word: 'ONE DESIGN MINDSET.',
    sub: 'PRECISE · MEMORABLE · PURPOSEFUL',
    coord: 'LYK DESIGNS // COMPLETE SYNTHESIS',
    accent: '#FF5A1F',
  },
];

export const TypographyTakeover: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: false, amount: 0.3 });
  const [currentSlide, setCurrentSlide] = useState(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const textDriftX = useTransform(scrollYProgress, [0, 1], [-50, 50]);

  useEffect(() => {
    if (!isInView) return;
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % TAKEOVER_SLIDES.length);
    }, 2800);
    return () => clearInterval(interval);
  }, [isInView]);

  const slide = TAKEOVER_SLIDES[currentSlide];

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen py-24 md:py-36 bg-[#080808] border-b border-[#222222] flex flex-col justify-between overflow-hidden select-none"
    >
      {/* Blueprint fine coordinate grid */}
      <div className="absolute inset-0 blueprint-grid opacity-20 pointer-events-none" />

      {/* Giant Background Kinetic Watermark with Scroll Drift */}
      <motion.div
        style={{ x: textDriftX }}
        className="absolute top-1/2 -translate-y-1/2 left-0 font-display font-black text-[22vw] text-[#141414] select-none pointer-events-none whitespace-nowrap opacity-40 z-0 tracking-tighter"
      >
        LYK STUDIO
      </motion.div>

      {/* Top Header */}
      <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 z-10 flex items-center justify-between font-mono text-[11px] text-[#777777] border-b border-[#1F1F1F] pb-4">
        <div className="flex items-center gap-3">
          <span className="w-2 h-2 bg-[#FF5A1F] rounded-full" />
          <span>SYNTHESIS SEQUENCE // DISCIPLINE EXPANSION</span>
        </div>
        <div className="flex items-center gap-2">
          {TAKEOVER_SLIDES.map((s, idx) => (
            <motion.button
              key={s.index}
              whileHover={{ scale: 1.2, y: -2, backgroundColor: '#FFFFFF', color: '#000000', borderColor: '#FFFFFF', transition: { duration: 0.12, ease: 'easeOut' } }}
              whileTap={{ scale: 0.9, transition: { duration: 0.08 } }}
              onClick={() => {
                soundManager.tick();
                setCurrentSlide(idx);
              }}
              className={`w-7 h-7 flex items-center justify-center font-mono text-[10px] border rounded-lg cursor-pointer transition-colors duration-150 ${
                currentSlide === idx
                  ? 'bg-[#FF5A1F] text-black border-[#FF5A1F] font-bold shadow-[0_0_10px_rgba(255,90,31,0.4)]'
                  : 'bg-[#141414] text-[#666666] border-[#2A2A2A] hover:text-black hover:bg-white hover:border-white'
              }`}
            >
              {s.index}
            </motion.button>
          ))}
        </div>
      </div>

      {/* Massive Typography Visual Canvas */}
      <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 my-auto z-10 py-12">
        <AnimatePresence mode="wait">
          <motion.div
            key={slide.index}
            initial={{ opacity: 0, y: 40, filter: 'blur(8px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            exit={{ opacity: 0, y: -40, filter: 'blur(8px)' }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col justify-center"
          >
            {/* Number prefix */}
            <div className="font-mono text-base sm:text-xl text-[#FF5A1F] mb-2 tracking-widest">
              // {slide.index} OF 05
            </div>

            {/* Giant Heading */}
            <h2 className="font-display font-black text-6xl sm:text-8xl md:text-9xl lg:text-[140px] xl:text-[160px] tracking-tighter leading-[0.88] text-[#F2F0EA] uppercase break-words">
              {slide.word}
            </h2>

            {/* Subtitle & Specs */}
            <div className="mt-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-t border-[#222222] pt-6 font-mono text-xs sm:text-sm">
              <span className="text-[#AAAAAA] uppercase tracking-wider">{slide.sub}</span>
              <span className="text-[#666666]">{slide.coord}</span>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Bottom Technical Perimeter Line */}
      <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 z-10 flex items-center justify-between font-mono text-[10px] text-[#555555] border-t border-[#1F1F1F] pt-4">
        <span>LYK DESIGNS ARCHITECTURAL BLUEPRINT</span>
        <span className="text-[#FF5A1F]">STATUS: SYNCHRONIZED</span>
      </div>
    </section>
  );
};
