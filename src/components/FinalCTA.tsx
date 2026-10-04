import React, { useRef, useState } from 'react';
import { motion, useInView } from 'motion/react';
import { ArrowUpRight } from 'lucide-react';
import { soundManager } from '../utils/audio';

interface FinalCTAProps {
  onOpenProjectModal: () => void;
}

export const FinalCTA: React.FC<FinalCTAProps> = ({ onOpenProjectModal }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: false, amount: 0.3 });
  const [isHovered, setIsHovered] = useState(false);

  return (
    <section
      id="contact"
      ref={containerRef}
      className="relative min-h-screen py-28 md:py-36 bg-[#070707] flex flex-col justify-between overflow-hidden border-b border-[#222222] select-none"
    >
      {/* Perimeter Animated Orange Laser Route */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <filter id="laser-glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Outer Perimeter Laser Rect */}
        <motion.rect
          x="16"
          y="16"
          width="calc(100% - 32px)"
          height="calc(100% - 32px)"
          rx="24"
          fill="none"
          stroke="#FF5A1F"
          strokeWidth="2"
          filter="url(#laser-glow)"
          initial={{ pathLength: 0 }}
          animate={isInView ? { pathLength: 1 } : { pathLength: 0 }}
          transition={{ duration: 3.5, repeat: Infinity, repeatDelay: 1, ease: 'linear' }}
        />
      </svg>

      {/* Blueprint Grid */}
      <div className="absolute inset-0 blueprint-grid opacity-25 pointer-events-none" />

      {/* Top Header Label */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 z-10 flex items-center justify-between font-mono text-[11px] text-[#777777]"
      >
        <div className="flex items-center gap-3">
          <span className="w-2 h-2 bg-[#FF5A1F] animate-pulse" />
          <span className="text-[#F2F0EA] tracking-widest">
            LYK DESIGNS / LET'S CREATE SOMETHING
          </span>
        </div>
        <div className="hidden sm:block font-mono text-[#555555]">
          AVAILABILITY: OPEN COMMISSIONS
        </div>
      </motion.div>

      {/* Main Center Stage */}
      <div className="max-w-5xl mx-auto w-full px-4 sm:px-6 lg:px-8 my-auto z-10 py-12 text-center flex flex-col items-center">
        {/* Huge Headline */}
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="font-display font-black text-5xl sm:text-7xl md:text-8xl lg:text-9xl tracking-tighter leading-[0.9] text-[#F2F0EA] mb-8"
        >
          <span className="block">HAVE</span>
          <span className="block">SOMETHING</span>
          <span className="block">WORTH</span>
          <span className="block text-[#FF5A1F]">DESIGNING?</span>
        </motion.h2>

        {/* Supporting text */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
          className="text-lg sm:text-xl text-[#AAAAAA] max-w-xl mx-auto mb-10 font-normal leading-relaxed"
        >
          Let's turn your idea into something people can see, understand and remember.
        </motion.p>

        {/* Big Interactive CTA */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.94 }}
          transition={{ duration: 0.7, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="relative group"
        >
          <motion.button
            whileHover={{ scale: 1.09, y: -3, transition: { duration: 0.12, ease: 'easeOut' } }}
            whileTap={{ scale: 0.95, transition: { duration: 0.08 } }}
            onMouseEnter={() => {
              soundManager.tick();
              setIsHovered(true);
            }}
            onMouseLeave={() => setIsHovered(false)}
            onClick={() => {
              soundManager.switchMode();
              onOpenProjectModal();
            }}
            className="relative overflow-hidden inline-flex items-center gap-4 px-10 py-5 sm:px-14 sm:py-6 bg-[#FF5A1F] text-black font-display font-black text-base sm:text-xl tracking-wider uppercase hover:bg-white hover:text-black transition-colors duration-150 shadow-[0_0_50px_rgba(255,90,31,0.4)] hover:shadow-[0_0_80px_rgba(255,255,255,0.8)] rounded-full cursor-pointer"
          >
            {/* Shimmer sweep */}
            <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-black/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out pointer-events-none" />
            <span>START A PROJECT</span>
            <ArrowUpRight className="w-6 h-6 transition-transform duration-200 group-hover:translate-x-1.5 group-hover:-translate-y-1.5" />
          </motion.button>
        </motion.div>

        {/* Animated LYK Signature Laser Construct Visual */}
        <div className="mt-16 w-full max-w-xs mx-auto">
          <svg viewBox="0 0 300 100" className="w-full h-auto overflow-visible">
            {/* L */}
            <motion.path
              d="M 60 20 L 60 80 L 110 80"
              fill="none"
              stroke="#FF5A1F"
              strokeWidth="5"
              strokeLinecap="square"
              filter="url(#laser-glow)"
              initial={{ pathLength: 0 }}
              animate={isInView ? { pathLength: 1 } : { pathLength: 0 }}
              transition={{ duration: 1.5, delay: 0.2 }}
            />
            {/* Y */}
            <motion.path
              d="M 130 20 L 155 55 L 180 20"
              fill="none"
              stroke="#F2F0EA"
              strokeWidth="5"
              strokeLinecap="square"
              initial={{ pathLength: 0 }}
              animate={isInView ? { pathLength: 1 } : { pathLength: 0 }}
              transition={{ duration: 1.5, delay: 0.5 }}
            />
            <motion.path
              d="M 155 55 L 155 80"
              fill="none"
              stroke="#F2F0EA"
              strokeWidth="5"
              strokeLinecap="square"
              initial={{ pathLength: 0 }}
              animate={isInView ? { pathLength: 1 } : { pathLength: 0 }}
              transition={{ duration: 0.8, delay: 0.9 }}
            />
            {/* K */}
            <motion.path
              d="M 210 20 L 210 80"
              fill="none"
              stroke="#F2F0EA"
              strokeWidth="5"
              strokeLinecap="square"
              initial={{ pathLength: 0 }}
              animate={isInView ? { pathLength: 1 } : { pathLength: 0 }}
              transition={{ duration: 1.2, delay: 0.4 }}
            />
            <motion.path
              d="M 255 20 L 212 50 L 258 80"
              fill="none"
              stroke="#FF5A1F"
              strokeWidth="5"
              strokeLinecap="square"
              filter="url(#laser-glow)"
              initial={{ pathLength: 0 }}
              animate={isInView ? { pathLength: 1 } : { pathLength: 0 }}
              transition={{ duration: 1.5, delay: 0.7 }}
            />
          </svg>
          <div className="font-mono text-[9px] text-[#666666] tracking-widest uppercase mt-2">
            DESIGN THAT MAKES THINGS CLEAR
          </div>
        </div>
      </div>

      {/* Bottom Technical Bar */}
      <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 z-10 flex items-center justify-between font-mono text-[10px] text-[#555555] border-t border-[#1F1F1F] pt-4">
        <span>PROJECT INQUIRY PORTAL // DIRECT DISPATCH</span>
        <span className="text-[#FF5A1F]">LATENCY: REAL-TIME</span>
      </div>
    </section>
  );
};
