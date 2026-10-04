import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useInView } from 'motion/react';

export const SignatureMotionLine: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: false, amount: 0.5 });
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const pathX = useTransform(scrollYProgress, [0, 1], [-150, 150]);

  return (
    <div
      ref={containerRef}
      className="relative w-full overflow-hidden bg-[#0A0A0A] border-y border-[#1F1F1F] py-2.5 select-none"
    >
      {/* Background kinetic laser beam sweep */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 0.15 } : { opacity: 0 }}
        className="absolute inset-0 bg-gradient-to-r from-transparent via-[#FF5A1F] to-transparent pointer-events-none"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between font-mono text-[10px] text-[#666666] relative z-10">
        {/* Left Indicator with Ping Dot */}
        <div className="flex items-center gap-2.5">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#FF5A1F] opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#FF5A1F]" />
          </span>
          <span className="text-[#888888] font-bold tracking-wider">SIGNATURE MOTION VECTOR</span>
        </div>

        {/* Center Animated Orange Route Tracer with Scroll Drift */}
        <div className="hidden sm:flex items-center gap-6 overflow-hidden flex-1 mx-8 relative h-5">
          <motion.svg
            style={{ x: pathX }}
            className="w-full h-5 overflow-visible"
            fill="none"
          >
            {/* Base guide track */}
            <path
              d="M -200 10 L 1000 10"
              stroke="#222222"
              strokeWidth="1"
            />
            {/* Animated Laser Pulse Path */}
            <motion.path
              d="M -200 10 L 80 10 L 100 4 L 120 16 L 140 10 L 260 10 L 280 4 L 300 16 L 320 10 L 500 10 L 520 4 L 540 16 L 560 10 L 800 10 L 820 4 L 840 16 L 860 10 L 1200 10"
              stroke="#FF5A1F"
              strokeWidth="2"
              strokeDasharray="6 6"
              initial={{ x: -300 }}
              animate={{ x: 300 }}
              transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
            />
            {/* Traveling Laser Spark */}
            <motion.circle
              r="3.5"
              fill="#FFFFFF"
              stroke="#FF5A1F"
              strokeWidth="2"
              initial={{ cx: 0, cy: 10 }}
              animate={{ cx: [0, 800] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            />
          </motion.svg>
        </div>

        {/* Right Status */}
        <div className="flex items-center gap-4 text-[#555555]">
          <span className="hidden md:inline">WP.01 → WP.02 → WP.03 → WP.04</span>
          <span className="text-[#FF5A1F] font-bold">100% VECTOR PRECISION</span>
        </div>
      </div>
    </div>
  );
};
