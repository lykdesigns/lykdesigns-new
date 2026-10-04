import React, { useState, useRef, useEffect } from 'react';
import { motion, useInView, useScroll } from 'motion/react';
import { soundManager } from '../utils/audio';

interface ProcessStepData {
  number: string;
  title: string;
  summary: string;
  details: string;
  deliverables: string[];
  coord: string;
}

const PROCESS_STEPS: ProcessStepData[] = [
  {
    number: '01',
    title: 'UNDERSTAND',
    summary: 'We understand the space, message, audience and objective.',
    details: 'In-depth architectural analysis, client discovery, spatial zoning audits, or brand strategy mapping to establish core parameters before drawing the first vector.',
    deliverables: ['Spatial Assessment', 'Audience Trajectory', 'Scope & Constraints Matrix'],
    coord: 'STG.01 // DIAGNOSTIC',
  },
  {
    number: '02',
    title: 'STRUCTURE',
    summary: 'We organize information and establish the visual direction.',
    details: 'Hierarchical wireframing, wayfinding logic, mathematical grid establishment, and typographic layout foundations to create structural clarity.',
    deliverables: ['Information Architecture', 'Grid Blueprint System', 'Schematic Flow Maps'],
    coord: 'STG.02 // ARCHITECTURE',
  },
  {
    number: '03',
    title: 'DESIGN',
    summary: 'We translate ideas into a clear visual system.',
    details: 'Precision rendering of vector assets, 2D/3D evacuation paths, interactive web interfaces, and distinctive typographic brand identities.',
    deliverables: ['High-Fidelity Renderings', 'Custom Vector Assets', 'Interactive Prototypes'],
    coord: 'STG.03 // SYNTHESIS',
  },
  {
    number: '04',
    title: 'REFINE',
    summary: 'Every line, shape and detail is reviewed and polished.',
    details: 'Micro-kerning, contrast verification (WCAG AA), code compliance audits (ISO 23601/OSHA), and motion curves tuning for optical perfection.',
    deliverables: ['Optical Calibration', 'Regulatory Compliance Check', 'Performance Optimization'],
    coord: 'STG.04 // VERIFICATION',
  },
  {
    number: '05',
    title: 'DELIVER',
    summary: 'The final design is prepared to work in the real world.',
    details: 'Print-ready architectural vector blueprints, production web builds, responsive asset suites, and comprehensive usage documentation.',
    deliverables: ['Vector CAD/PDF Blueprints', 'Production Source Code', 'Brand Specification Manual'],
    coord: 'STG.05 // DEPLOYMENT',
  },
];

export const ProcessSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: false, amount: 0.15 });
  const [activeStepIndex, setActiveStepIndex] = useState<number>(0);
  const [userInteracted, setUserInteracted] = useState<boolean>(false);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start 60%', 'end 70%'],
  });

  useEffect(() => {
    return scrollYProgress.on('change', (val) => {
      if (!userInteracted) {
        const stepIdx = Math.min(
          PROCESS_STEPS.length - 1,
          Math.max(0, Math.floor(val * PROCESS_STEPS.length))
        );
        setActiveStepIndex(stepIdx);
      }
    });
  }, [scrollYProgress, userInteracted]);

  const handleStepClick = (index: number) => {
    setUserInteracted(true);
    soundManager.tick();
    setActiveStepIndex(index);
  };

  return (
    <section id="process" ref={sectionRef} className="relative py-28 md:py-36 bg-[#0D0D0D] border-b border-[#222222] overflow-hidden">
      {/* Blueprint background */}
      <div className="absolute inset-0 blueprint-grid opacity-25 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-3xl mb-20"
        >
          <div className="flex items-center gap-3 font-mono text-[11px] text-[#FF5A1F] uppercase tracking-widest mb-3">
            <span className="w-2 h-2 bg-[#FF5A1F]" />
            <span>04 // METHODOLOGY</span>
          </div>
          <h2 className="font-display font-bold text-4xl sm:text-6xl md:text-7xl text-[#F2F0EA] tracking-tight mb-4">
            THE DESIGN PROCESS
          </h2>
          <p className="text-base sm:text-lg text-[#888888] font-normal">
            A linear, high-precision workflow from initial spatial analysis to verified production delivery.
          </p>
        </motion.div>

        {/* Vertical Blueprint Timeline */}
        <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Interactive Step Selector */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-6 relative"
          >
            {/* Continuous Vertical Orange Timeline Bar */}
            <div className="absolute left-[19px] top-6 bottom-6 w-[2px] bg-[#222222]">
              <div
                className="w-full bg-[#FF5A1F] transition-all duration-500 shadow-[0_0_10px_#FF5A1F]"
                style={{
                  height: `${((activeStepIndex + 1) / PROCESS_STEPS.length) * 100}%`,
                }}
              />
            </div>

            <div className="space-y-6 relative">
              {PROCESS_STEPS.map((step, idx) => {
                const isActive = activeStepIndex === idx;
                return (
                  <motion.div
                    key={step.number}
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                    whileHover={{ x: 6, scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                    onClick={() => handleStepClick(idx)}
                    className={`cursor-pointer p-6 transition-all border relative pl-14 rounded-2xl ${
                      isActive
                        ? 'bg-[#141414] border-[#FF5A1F] shadow-lg shadow-[0_0_20px_rgba(255,90,31,0.15)]'
                        : 'bg-[#101010]/80 border-[#262626] hover:border-[#555555] opacity-75 hover:opacity-100'
                    }`}
                  >
                    {/* Step Node Marker */}
                    <div
                      className={`absolute left-3.5 top-7 w-3.5 h-3.5 rounded-full flex items-center justify-center transition-all ${
                        isActive
                          ? 'bg-[#FF5A1F] shadow-[0_0_10px_#FF5A1F]'
                          : idx < activeStepIndex
                          ? 'bg-[#F2F0EA]'
                          : 'bg-[#222222] border border-[#444444]'
                      }`}
                    />

                    {/* Step Number & Title */}
                    <div className="flex items-center justify-between font-mono text-[11px] text-[#777777] mb-2">
                      <span className={isActive ? 'text-[#FF5A1F] font-bold' : ''}>
                        {step.number} — STEP
                      </span>
                      <span>{step.coord}</span>
                    </div>

                    <h3
                      className={`font-display font-bold text-2xl sm:text-3xl transition-colors ${
                        isActive ? 'text-[#F2F0EA]' : 'text-[#888888]'
                      }`}
                    >
                      {step.title}
                    </h3>

                    <p className="text-sm text-[#AAAAAA] mt-2 leading-relaxed">
                      {step.summary}
                    </p>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>

          {/* Right Column: Step Deep Dive Inspection Panel */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-6 sticky top-28"
          >
            <div className="p-8 sm:p-10 bg-[#121212] border border-[#2B2B2B] shadow-2xl relative overflow-hidden rounded-2xl">
              {/* Background blueprint details */}
              <div className="absolute inset-0 blueprint-grid-dense opacity-30 pointer-events-none" />

              {/* Technical Header */}
              <div className="relative z-10 flex items-center justify-between font-mono text-[11px] text-[#777777] border-b border-[#222222] pb-4 mb-6">
                <span className="text-[#FF5A1F]">PHASE SPECIFICATION</span>
                <span>STEP {PROCESS_STEPS[activeStepIndex].number} / 05</span>
              </div>

              {/* Title & Description */}
              <div className="relative z-10 space-y-6">
                <h4 className="font-display font-bold text-3xl sm:text-4xl text-[#F2F0EA]">
                  {PROCESS_STEPS[activeStepIndex].title}
                </h4>

                <p className="text-base text-[#AAAAAA] leading-relaxed">
                  {PROCESS_STEPS[activeStepIndex].details}
                </p>

                {/* Deliverables Checklist */}
                <div className="space-y-3 border-t border-[#222222] pt-6">
                  <div className="font-mono text-[10px] text-[#FF5A1F] uppercase tracking-widest">
                    OUTPUT ARTIFACTS // DELIVERABLES
                  </div>
                  <div className="space-y-2 font-mono text-xs text-[#CCCCCC]">
                    {PROCESS_STEPS[activeStepIndex].deliverables.map((item, i) => (
                      <div key={i} className="flex items-center gap-3 p-2.5 bg-[#171717] border border-[#262626] rounded-xl">
                        <span className="w-1.5 h-1.5 bg-[#FF5A1F] rounded-full" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Quality Assurance Note */}
                <div className="p-4 bg-[#0A0A0A] border border-[#222222] font-mono text-[10px] text-[#777777] flex justify-between items-center rounded-xl">
                  <span>QA LEVEL: STRICT</span>
                  <span className="text-[#FF5A1F]">ZERO ARTIFACT DEFECTS</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
