import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useInView } from 'motion/react';

export const TransitionSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: false, amount: 0.25 });

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const words = [
    { text: 'WE TURN', highlight: false, note: 'PHILOSOPHY.01', threshold: [0.15, 0.35] },
    { text: 'COMPLEXITY', highlight: false, note: 'RAW INPUT // ENTROPY', threshold: [0.25, 0.45] },
    { text: 'INTO', highlight: false, note: 'TRANSFORMATION', threshold: [0.35, 0.55] },
    { text: 'CLARITY.', highlight: true, note: 'OUTPUT // PURE SIGNAL', threshold: [0.45, 0.65] },
  ];

  const gridScale = useTransform(scrollYProgress, [0, 1], [1, 1.25]);
  const progressLineWidth = useTransform(scrollYProgress, [0.2, 0.7], ['0%', '100%']);

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen py-24 md:py-36 bg-[#0B0B0B] border-b border-[#222222] flex flex-col justify-center items-center overflow-hidden"
    >
      {/* Background Blueprint Grid Transition with Scroll Zoom */}
      <motion.div
        style={{ scale: gridScale }}
        className={`absolute inset-0 transition-opacity duration-1000 ${
          isInView ? 'opacity-40 blueprint-grid-dense' : 'opacity-10 blueprint-grid'
        }`}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-[#0D0D0D] via-transparent to-[#0D0D0D]" />

      {/* Perimeter Technical Calipers with Scroll Tracker */}
      <div className="absolute top-8 inset-x-8 max-w-6xl mx-auto flex items-center justify-between font-mono text-[10px] text-[#555555] border-b border-[#222222] pb-2 z-10">
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 bg-[#FF5A1F] animate-ping" />
          <span>LYK DESIGN PARADIGM // TRANSLATION ENGINE</span>
        </div>
        <span className="text-[#FF5A1F]">PHASE: TRANSFORMATION</span>
        <span>LATENCY: 0.00ms</span>
      </div>

      {/* Vertical Dynamic Center Tracker Line */}
      <div className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-[1px] bg-[#1A1A1A] pointer-events-none">
        <motion.div
          style={{ height: progressLineWidth }}
          className="w-full bg-[#FF5A1F] opacity-60 shadow-[0_0_10px_#FF5A1F]"
        />
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 w-full z-10 my-auto">
        <div className="flex flex-col items-start md:items-center text-left md:text-center">
          {words.map((item, index) => {
            return (
              <div key={item.text} className="overflow-hidden py-2 sm:py-3 w-full flex flex-col items-start md:items-center">
                <div className="flex items-baseline gap-4 md:gap-6">
                  <motion.span
                    initial={{ opacity: 0, x: -20 }}
                    animate={isInView ? { opacity: 0.7, x: 0 } : { opacity: 0, x: -20 }}
                    transition={{ duration: 0.6, delay: index * 0.15, ease: [0.16, 1, 0.3, 1] }}
                    className="font-mono text-xs sm:text-sm text-[#FF5A1F]"
                  >
                    {`0${index + 1}`}
                  </motion.span>
                  <motion.h2
                    initial={{ y: 90, opacity: 0 }}
                    animate={isInView ? { y: 0, opacity: 1 } : { y: 90, opacity: 0 }}
                    transition={{ duration: 0.8, delay: index * 0.15, ease: [0.16, 1, 0.3, 1] }}
                    className={`font-display font-bold text-5xl sm:text-7xl md:text-8xl lg:text-9xl tracking-tighter leading-none ${
                      item.highlight
                        ? 'text-[#FF5A1F] drop-shadow-[0_0_40px_rgba(255,90,31,0.4)]'
                        : 'text-[#F2F0EA]'
                    }`}
                  >
                    {item.text}
                  </motion.h2>
                </div>
                
                {/* Micro annotation */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 + index * 0.15 }}
                  className="flex items-center gap-2 mt-1 font-mono text-[9px] text-[#666666] tracking-widest uppercase"
                >
                  <span>[ {item.note} ]</span>
                </motion.div>
              </div>
            );
          })}
        </div>

        {/* Supporting Architectural Subtitle */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.7, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="mt-16 max-w-2xl mx-auto text-center font-mono text-xs sm:text-sm text-[#888888] border-t border-[#222222] pt-6 flex flex-col sm:flex-row items-center justify-between gap-4"
        >
          <span className="text-[#FF5A1F] font-bold">SPACES · BRANDS · WEBSITES · IDEAS</span>
          <span className="text-[#555555]">PRECISION-CRAFTED VISUAL ARTIFACTS</span>
        </motion.div>
      </div>

      {/* Bottom Technical Border Coordinates */}
      <div className="absolute bottom-6 inset-x-8 max-w-6xl mx-auto flex items-center justify-between font-mono text-[10px] text-[#555555] border-t border-[#222222] pt-2 z-10">
        <span>GEOMETRIC HARMONY // SWISS RATIO</span>
        <span>INDEX REF: 01.00 — 04.00</span>
      </div>
    </section>
  );
};
