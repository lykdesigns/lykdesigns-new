import React, { useState, useRef } from 'react';
import { motion, useInView } from 'motion/react';
import { Crosshair, Eye, Sparkles } from 'lucide-react';
import { soundManager } from '../utils/audio';
import { ScreenshotStyleIconBox } from './ScreenshotStyleIconBox';

export const PhilosophySection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isSectionInView = useInView(sectionRef, { once: false, amount: 0.15 });

  const [activePrinciple, setActivePrinciple] = useState<'precision' | 'clarity' | 'creativity'>('precision');

  return (
    <section id="philosophy" ref={sectionRef} className="relative py-28 md:py-36 bg-[#0D0D0D] border-b border-[#222222] overflow-hidden">
      {/* Blueprint Grid */}
      <div className="absolute inset-0 blueprint-grid opacity-25 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isSectionInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-4xl mb-20"
        >
          <div className="flex items-center gap-3 font-mono text-[11px] text-[#FF5A1F] uppercase tracking-widest mb-4">
            <span className="w-2 h-2 bg-[#FF5A1F]" />
            <span>02 // CORE PHILOSOPHY & MANIFESTO</span>
          </div>

          <h2 className="font-display font-bold text-4xl sm:text-6xl md:text-7xl lg:text-8xl tracking-tight text-[#F2F0EA] leading-[0.95] mb-6">
            GOOD DESIGN<br />
            <span className="text-[#FF5A1F]">SHOULD BE UNDERSTOOD.</span>
          </h2>

          <div className="space-y-4 text-lg sm:text-xl text-[#AAAAAA] font-normal leading-relaxed border-l-2 border-[#FF5A1F] pl-6">
            <p className="font-medium text-[#F2F0EA]">Not just admired.</p>
            <p className="text-base text-[#888888]">
              Whether we're designing an evacuation plan, building a brand identity, creating a website, or developing an illustration, the goal is the same:
            </p>
            <ul className="space-y-2 text-sm sm:text-base font-mono text-[#CCCCCC]">
              <li className="flex items-center gap-3">
                <span className="text-[#FF5A1F]">01.</span> Make information easier to understand.
              </li>
              <li className="flex items-center gap-3">
                <span className="text-[#FF5A1F]">02.</span> Make ideas easier to remember.
              </li>
              <li className="flex items-center gap-3">
                <span className="text-[#FF5A1F]">03.</span> Make visuals impossible to ignore.
              </li>
            </ul>
          </div>
        </motion.div>

        {/* 3 Principles Interactive Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* PRINCIPLE 1: PRECISION */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={isSectionInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            onMouseEnter={() => {
              soundManager.tick();
              setActivePrinciple('precision');
            }}
            className={`p-6 sm:p-8 bg-[#121212] border transition-all relative overflow-hidden rounded-2xl flex flex-col justify-between ${
              activePrinciple === 'precision'
                ? 'border-[#FF5A1F] shadow-xl ring-1 ring-[#FF5A1F]/30'
                : 'border-[#262626] hover:border-[#444444]'
            }`}
          >
            <div>
              {/* Top Tag */}
              <div className="flex items-center justify-between font-mono text-xs text-[#777777] mb-6">
                <span className="text-[#FF5A1F] font-bold">01 // PRINCIPLE</span>
                <Crosshair className="w-4 h-4 text-[#FF5A1F]" />
              </div>

              <h3 className="font-display font-bold text-3xl sm:text-4xl text-[#F2F0EA] mb-2">
                PRECISION
              </h3>
              <p className="text-sm text-[#999999] mb-6">
                Every detail has a purpose.
              </p>
            </div>

            {/* Icon Box matching reference screenshot */}
            <ScreenshotStyleIconBox
              category="PRECISION"
              code="VEC_CAD_2026"
              type="precision"
              status="STATUS: ACTIVE ★"
            />
          </motion.div>

          {/* PRINCIPLE 2: CLARITY */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={isSectionInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
            transition={{ duration: 0.7, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
            onMouseEnter={() => {
              soundManager.tick();
              setActivePrinciple('clarity');
            }}
            className={`p-6 sm:p-8 bg-[#121212] border transition-all relative overflow-hidden rounded-2xl flex flex-col justify-between ${
              activePrinciple === 'clarity'
                ? 'border-[#FF5A1F] shadow-xl ring-1 ring-[#FF5A1F]/30'
                : 'border-[#262626] hover:border-[#444444]'
            }`}
          >
            <div>
              {/* Top Tag */}
              <div className="flex items-center justify-between font-mono text-xs text-[#777777] mb-6">
                <span className="text-[#FF5A1F] font-bold">02 // PRINCIPLE</span>
                <Eye className="w-4 h-4 text-[#FF5A1F]" />
              </div>

              <h3 className="font-display font-bold text-3xl sm:text-4xl text-[#F2F0EA] mb-2">
                CLARITY
              </h3>
              <p className="text-sm text-[#999999] mb-6">
                Complex information should become easy to understand.
              </p>
            </div>

            {/* Icon Box matching reference screenshot */}
            <ScreenshotStyleIconBox
              category="CLARITY"
              code="OPT_CLR_2026"
              type="clarity"
              status="STATUS: ACTIVE ★"
            />
          </motion.div>

          {/* PRINCIPLE 3: CREATIVITY */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={isSectionInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
            transition={{ duration: 0.7, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
            onMouseEnter={() => {
              soundManager.tick();
              setActivePrinciple('creativity');
            }}
            className={`p-6 sm:p-8 bg-[#121212] border transition-all relative overflow-hidden rounded-2xl flex flex-col justify-between ${
              activePrinciple === 'creativity'
                ? 'border-[#FF5A1F] shadow-xl ring-1 ring-[#FF5A1F]/30'
                : 'border-[#262626] hover:border-[#444444]'
            }`}
          >
            <div>
              {/* Top Tag */}
              <div className="flex items-center justify-between font-mono text-xs text-[#777777] mb-6">
                <span className="text-[#FF5A1F] font-bold">03 // PRINCIPLE</span>
                <Sparkles className="w-4 h-4 text-[#FF5A1F]" />
              </div>

              <h3 className="font-display font-bold text-3xl sm:text-4xl text-[#F2F0EA] mb-2">
                CREATIVITY
              </h3>
              <p className="text-sm text-[#999999] mb-6">
                Function does not have to look ordinary.
              </p>
            </div>

            {/* Icon Box matching reference screenshot */}
            <ScreenshotStyleIconBox
              category="BRANDING"
              code="VEC_CAD_2026"
              type="creativity"
              status="STATUS: ACTIVE ★"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};
