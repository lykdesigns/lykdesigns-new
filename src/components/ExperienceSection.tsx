import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'motion/react';

interface StatBlockProps {
  endValue: number;
  suffix: string;
  label: string;
  sublabel: string;
  code: string;
  trigger: boolean;
  delayIndex?: number;
}

const StatBlock: React.FC<StatBlockProps> = ({
  endValue,
  suffix,
  label,
  sublabel,
  code,
  trigger,
  delayIndex = 0,
}) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!trigger) return;
    let start = 0;
    const duration = 1600; // ms
    const stepTime = 20;
    const steps = duration / stepTime;
    const increment = endValue / steps;

    const timer = setInterval(() => {
      start += increment;
      if (start >= endValue) {
        setCount(endValue);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, [trigger, endValue]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={trigger ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      whileHover={{ y: -6, borderColor: '#555555' }}
      transition={{ duration: 0.6, delay: delayIndex * 0.15, ease: [0.16, 1, 0.3, 1] }}
      className="relative p-8 sm:p-10 lg:p-12 bg-[#121212] border border-[#262626] rounded-2xl shadow-xl flex flex-col justify-between group transition-all overflow-hidden"
    >
      {/* Top Technical Code & Measurement Ticks */}
      <div className="flex items-center justify-between font-mono text-[10px] text-[#777777] border-b border-[#222222] pb-4 mb-8">
        <span className="text-[#FF5A1F]">{code}</span>
        <span>METRIC // VERIFIED</span>
      </div>

      {/* Big Counter Value */}
      <div className="my-6">
        <div className="font-display font-black text-6xl sm:text-7xl lg:text-8xl text-[#F2F0EA] tracking-tighter leading-none flex items-baseline">
          <span>{count}</span>
          <span className="text-[#FF5A1F] ml-1">{suffix}</span>
        </div>
      </div>

      {/* Label and Sublabel */}
      <div className="border-t border-[#222222] pt-4 mt-6">
        <h4 className="font-display font-bold text-base sm:text-lg text-[#F2F0EA] uppercase tracking-wider mb-1">
          {label}
        </h4>
        <p className="font-mono text-xs text-[#777777]">
          {sublabel}
        </p>
      </div>

      {/* Corner Crosshairs */}
      <div className="absolute top-2 left-2 text-[#333333] font-mono text-[9px] pointer-events-none">+</div>
      <div className="absolute top-2 right-2 text-[#333333] font-mono text-[9px] pointer-events-none">+</div>
      <div className="absolute bottom-2 left-2 text-[#333333] font-mono text-[9px] pointer-events-none">+</div>
      <div className="absolute bottom-2 right-2 text-[#333333] font-mono text-[9px] pointer-events-none">+</div>
    </motion.div>
  );
};

export const ExperienceSection: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: false, amount: 0.15 });

  return (
    <section ref={ref} className="relative py-28 md:py-36 bg-[#0B0B0B] border-b border-[#222222] overflow-hidden">
      {/* Blueprint Grid with dynamic pulse */}
      <div className="absolute inset-0 blueprint-grid opacity-20 pointer-events-none" />

      {/* Decorative Technical Grid Coordinate Lines */}
      <div className="absolute inset-0 pointer-events-none flex justify-between max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 opacity-15">
        <div className="w-[1px] h-full bg-[#FF5A1F]" />
        <div className="w-[1px] h-full bg-[#FF5A1F]" />
        <div className="w-[1px] h-full bg-[#FF5A1F]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-16 border-b border-[#222222] pb-8"
        >
          <div>
            <div className="flex items-center gap-3 font-mono text-[11px] text-[#FF5A1F] uppercase tracking-widest mb-3">
              <span className="w-2 h-2 bg-[#FF5A1F]" />
              <span>03 // TRACK RECORD</span>
            </div>
            <h2 className="font-display font-bold text-4xl sm:text-6xl md:text-7xl text-[#F2F0EA] tracking-tight">
              BUILT ON EXPERIENCE.
            </h2>
          </div>

          <div className="font-mono text-xs text-[#777777] max-w-xs">
            Disciplined execution across commercial spaces, premier digital products, and enduring brand identities.
          </div>
        </motion.div>

        {/* 3 Large Stat Blocks */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <StatBlock
            endValue={15}
            suffix="+"
            label="YEARS OF EXPERIENCE"
            sublabel="ARCHITECTURAL & DIGITAL PRACTICE"
            code="METRIC.01 // TENURE"
            trigger={isInView}
            delayIndex={1}
          />
          <StatBlock
            endValue={500}
            suffix="+"
            label="PROJECTS DELIVERED"
            sublabel="GLOBAL COMMISSIONS COMPLETED"
            code="METRIC.02 // OUTPUT"
            trigger={isInView}
            delayIndex={2}
          />
          <StatBlock
            endValue={4}
            suffix=""
            label="DESIGN DISCIPLINES"
            sublabel="SPACE · IDENTITY · DIGITAL · ART"
            code="METRIC.03 // MASTERY"
            trigger={isInView}
            delayIndex={3}
          />
        </div>
      </div>
    </section>
  );
};
