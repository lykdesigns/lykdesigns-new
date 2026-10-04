import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView, useScroll, useTransform } from 'motion/react';
import { ArrowUpRight, Check, Code, Layout, Smartphone, Tablet, Laptop, RefreshCw } from 'lucide-react';
import { soundManager } from '../utils/audio';

interface WebDesignFeatureProps {
  onOpenProjectModal: () => void;
}

export const WebDesignFeature: React.FC<WebDesignFeatureProps> = ({ onOpenProjectModal }) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: false, amount: 0.15 });

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const previewParallaxY = useTransform(scrollYProgress, [0, 1], [40, -40]);

  const [buildStep, setBuildStep] = useState<number>(5); // 0 (blank) to 5 (fully rendered)
  const [deviceView, setDeviceView] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');
  const [isAutoPlaying, setIsAutoPlaying] = useState<boolean>(true);

  // Auto progression of UI construction
  useEffect(() => {
    if (!isAutoPlaying) return;
    const interval = setInterval(() => {
      setBuildStep((prev) => (prev >= 5 ? 1 : prev + 1));
    }, 2400);
    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const stepDescriptions = [
    '01. RAW GRID & VIEWPORT CONTAINER',
    '02. NAVIGATION & STRUCTURAL WIREFRAME',
    '03. EDITORIAL TYPOGRAPHY HIERARCHY',
    '04. INTERACTIVE MODULES & CARDS',
    '05. KINETIC MICRO-INTERACTIONS & ACCENTS',
  ];

  return (
    <section ref={sectionRef} className="relative py-28 md:py-36 bg-[#080808] border-b border-[#222222] overflow-hidden">
      {/* Blueprint Grid */}
      <div className="absolute inset-0 blueprint-grid-orange opacity-15 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Headlines & Editorial Copy */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 space-y-8"
          >
            <div className="flex items-center gap-3 font-mono text-[11px] text-[#FF5A1F] uppercase tracking-widest">
              <span className="w-2 h-2 bg-[#FF5A1F]" />
              <span>DIGITAL CRAFT // FEATURE SPOTLIGHT</span>
            </div>

            <h2 className="font-display font-bold text-4xl sm:text-6xl lg:text-7xl text-[#F2F0EA] tracking-tight leading-[0.92]">
              YOUR BRAND<br />
              <span className="text-[#FF5A1F]">DESERVES</span><br />
              A BETTER<br />
              DIGITAL<br />
              EXPERIENCE.
            </h2>

            <p className="text-base sm:text-lg text-[#999999] leading-relaxed">
              We design modern websites that combine strong visual direction, intuitive user experience and purposeful motion.
            </p>

            {/* Feature Bullets */}
            <div className="space-y-3 font-mono text-xs text-[#CCCCCC] border-l-2 border-[#2A2A2A] pl-5">
              <div className="flex items-center gap-2">
                <span className="text-[#FF5A1F]">/</span> Custom Motion Choreography (60 FPS)
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[#FF5A1F]">/</span> Editorial Typography Systems
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[#FF5A1F]">/</span> Sub-second Load Times & Clean Code
              </div>
            </div>

            {/* CTA Button */}
            <div>
              <motion.button
                whileHover={{ scale: 1.09, y: -2, transition: { duration: 0.12, ease: 'easeOut' } }}
                whileTap={{ scale: 0.96, transition: { duration: 0.08 } }}
                onClick={() => {
                  soundManager.switchMode();
                  onOpenProjectModal();
                }}
                className="group relative overflow-hidden inline-flex items-center gap-3 px-8 py-4 bg-[#FF5A1F] text-black font-display font-bold text-sm tracking-wider uppercase hover:bg-white hover:text-black hover:shadow-[0_0_40px_rgba(255,255,255,0.7)] transition-colors duration-150 shadow-xl rounded-full cursor-pointer"
              >
                {/* Shimmer sweep */}
                <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-black/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out pointer-events-none" />
                <span>BUILD A WEBSITE</span>
                <ArrowUpRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1 group-hover:-translate-y-1" />
              </motion.button>
            </div>
          </motion.div>

          {/* Right Column: Dynamic Progressive Browser Visualizer */}
          <motion.div
            style={{ y: previewParallaxY }}
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7 space-y-4"
          >
            {/* Visualizer Controls Bar */}
            <div className="flex flex-wrap items-center justify-between gap-4 p-3 bg-[#141414] border border-[#262626] rounded-xl font-mono text-xs">
              {/* Device Selector */}
              <div className="flex items-center gap-1.5">
                <motion.button
                  whileHover={{ scale: 1.15, y: -2, backgroundColor: '#FFFFFF', color: '#000000', borderColor: '#FFFFFF', transition: { duration: 0.12, ease: 'easeOut' } }}
                  whileTap={{ scale: 0.92, transition: { duration: 0.08 } }}
                  onClick={() => {
                    soundManager.tick();
                    setDeviceView('desktop');
                  }}
                  className={`p-2 border rounded-lg cursor-pointer transition-colors duration-150 ${
                    deviceView === 'desktop'
                      ? 'bg-[#FF5A1F] text-black border-[#FF5A1F] shadow-[0_0_10px_rgba(255,90,31,0.35)]'
                      : 'bg-[#1D1D1D] text-[#777777] border-[#333333] hover:text-black hover:bg-white hover:border-white'
                  }`}
                  title="Desktop View"
                >
                  <Laptop className="w-3.5 h-3.5" />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.15, y: -2, backgroundColor: '#FFFFFF', color: '#000000', borderColor: '#FFFFFF', transition: { duration: 0.12, ease: 'easeOut' } }}
                  whileTap={{ scale: 0.92, transition: { duration: 0.08 } }}
                  onClick={() => {
                    soundManager.tick();
                    setDeviceView('tablet');
                  }}
                  className={`p-2 border rounded-lg cursor-pointer transition-colors duration-150 ${
                    deviceView === 'tablet'
                      ? 'bg-[#FF5A1F] text-black border-[#FF5A1F] shadow-[0_0_10px_rgba(255,90,31,0.35)]'
                      : 'bg-[#1D1D1D] text-[#777777] border-[#333333] hover:text-black hover:bg-white hover:border-white'
                  }`}
                  title="Tablet View"
                >
                  <Tablet className="w-3.5 h-3.5" />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.15, y: -2, backgroundColor: '#FFFFFF', color: '#000000', borderColor: '#FFFFFF', transition: { duration: 0.12, ease: 'easeOut' } }}
                  whileTap={{ scale: 0.92, transition: { duration: 0.08 } }}
                  onClick={() => {
                    soundManager.tick();
                    setDeviceView('mobile');
                  }}
                  className={`p-2 border rounded-lg cursor-pointer transition-colors duration-150 ${
                    deviceView === 'mobile'
                      ? 'bg-[#FF5A1F] text-black border-[#FF5A1F] shadow-[0_0_10px_rgba(255,90,31,0.35)]'
                      : 'bg-[#1D1D1D] text-[#777777] border-[#333333] hover:text-black hover:bg-white hover:border-white'
                  }`}
                  title="Mobile View"
                >
                  <Smartphone className="w-3.5 h-3.5" />
                </motion.button>
              </div>

              {/* Progress Step Selector */}
              <div className="flex items-center gap-1.5">
                {[1, 2, 3, 4, 5].map((step) => (
                  <motion.button
                    key={step}
                    whileHover={{ scale: 1.15, y: -2, backgroundColor: '#FFFFFF', color: '#000000', borderColor: '#FFFFFF', transition: { duration: 0.12, ease: 'easeOut' } }}
                    whileTap={{ scale: 0.92, transition: { duration: 0.08 } }}
                    onClick={() => {
                      setIsAutoPlaying(false);
                      soundManager.tick();
                      setBuildStep(step);
                    }}
                    className={`px-2.5 py-1 text-[10px] font-mono border rounded-lg cursor-pointer transition-colors duration-150 ${
                      buildStep === step
                        ? 'bg-[#FF5A1F] text-black border-[#FF5A1F] font-bold shadow-[0_0_10px_rgba(255,90,31,0.35)]'
                        : 'bg-[#1A1A1A] text-[#666666] border-[#333333] hover:text-black hover:bg-white hover:border-white'
                    }`}
                  >
                    0{step}
                  </motion.button>
                ))}
                <motion.button
                  whileHover={{ scale: 1.25, rotate: 180, color: '#FFFFFF', transition: { duration: 0.15, ease: 'easeOut' } }}
                  whileTap={{ scale: 0.88, transition: { duration: 0.08 } }}
                  onClick={() => {
                    soundManager.switchMode();
                    setIsAutoPlaying(!isAutoPlaying);
                  }}
                  className="p-1.5 text-[#888888] hover:text-white ml-1 rounded-full cursor-pointer transition-colors duration-150"
                  title="Toggle Auto sequence"
                >
                  <RefreshCw className={`w-3.5 h-3.5 ${isAutoPlaying ? 'animate-spin' : ''}`} />
                </motion.button>
              </div>
            </div>

            {/* Browser Frame */}
            <div
              data-cursor-text="PREVIEW"
              className={`mx-auto transition-all duration-500 bg-[#121212] border border-[#2B2B2B] shadow-2xl rounded-2xl overflow-hidden ${
                deviceView === 'desktop'
                  ? 'w-full'
                  : deviceView === 'tablet'
                  ? 'max-w-[480px]'
                  : 'max-w-[320px]'
              }`}
            >
              {/* Browser Header */}
              <div className="bg-[#1A1A1A] px-4 py-2.5 border-b border-[#282828] flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#FF5A1F]" />
                  <div className="w-2.5 h-2.5 rounded-full bg-[#333333]" />
                  <div className="w-2.5 h-2.5 rounded-full bg-[#333333]" />
                </div>
                <div className="font-mono text-[9px] text-[#777777]">
                  {stepDescriptions[buildStep - 1]}
                </div>
                <div className="font-mono text-[9px] text-[#FF5A1F]">
                  RENDER // 60 FPS
                </div>
              </div>

              {/* Dynamic Animated UI Simulation */}
              <div className="p-6 bg-[#0E0E0E] min-h-[380px] flex flex-col justify-between space-y-6">
                {/* Step 2+: Navigation Header */}
                <div
                  className={`flex items-center justify-between border-b border-[#222222] pb-3 transition-opacity duration-500 ${
                    buildStep >= 2 ? 'opacity-100' : 'opacity-0'
                  }`}
                >
                  <div className="font-display font-bold text-sm text-[#F2F0EA] flex items-center gap-2">
                    <span className="w-2 h-2 bg-[#FF5A1F] rounded-full" />
                    <span>NEXUS STUDIO</span>
                  </div>
                  <div className="flex items-center gap-3 font-mono text-[10px] text-[#888888]">
                    <span>WORK</span>
                    <span>ABOUT</span>
                    <span className="px-2 py-0.5 bg-[#FF5A1F] text-black font-bold rounded-full">CONNECT</span>
                  </div>
                </div>

                {/* Step 3+: Big Hero Typography */}
                <div
                  className={`space-y-3 transition-all duration-500 ${
                    buildStep >= 3 ? 'opacity-100 translate-y-0' : 'opacity-20 translate-y-4'
                  }`}
                >
                  <span className="font-mono text-[10px] text-[#FF5A1F] tracking-widest uppercase">
                    // HIGH-PERFORMANCE VISUAL ARCHITECTURE
                  </span>
                  <h3 className="font-display font-bold text-2xl sm:text-3xl text-[#F2F0EA] leading-tight">
                    Where Architectural Precision Meets Digital Motion.
                  </h3>
                  <p className="text-xs text-[#888888] max-w-md">
                    Designed without generic templates. Built with clean semantic code, tailored micro-interactions, and instant responsiveness.
                  </p>
                </div>

                {/* Step 4+: Interactive Cards Grid */}
                <div
                  className={`grid grid-cols-2 gap-3 transition-opacity duration-500 ${
                    buildStep >= 4 ? 'opacity-100' : 'opacity-0'
                  }`}
                >
                  <div className="p-3 bg-[#161616] border border-[#262626] rounded-xl">
                    <div className="font-mono text-[9px] text-[#FF5A1F] mb-1">01 / PERFORMANCE</div>
                    <div className="font-display font-semibold text-xs text-[#F2F0EA]">100/100 Core Web Vitals</div>
                  </div>
                  <div className="p-3 bg-[#161616] border border-[#262626] rounded-xl">
                    <div className="font-mono text-[9px] text-[#FF5A1F] mb-1">02 / CRAFT</div>
                    <div className="font-display font-semibold text-xs text-[#F2F0EA]">Bespoke Motion Loops</div>
                  </div>
                </div>

                {/* Step 5+: Action Footer Strip */}
                <div
                  className={`p-3 bg-[#1A1A1A] border border-[#2B2B2B] rounded-xl flex items-center justify-between transition-opacity duration-500 ${
                    buildStep >= 5 ? 'opacity-100' : 'opacity-0'
                  }`}
                >
                  <div className="font-mono text-[10px] text-[#AAAAAA]">ENGINE: REACT 19 + TAILWIND</div>
                  <motion.button
                    whileHover={{ scale: 1.08, backgroundColor: '#FFFFFF', color: '#000000' }}
                    whileTap={{ scale: 0.94 }}
                    onClick={() => {
                      soundManager.switchMode();
                      onOpenProjectModal();
                    }}
                    className="px-3.5 py-1.5 bg-[#FF5A1F] text-black font-mono text-[10px] font-bold uppercase rounded-lg transition-colors cursor-pointer"
                  >
                    LAUNCH PROJECT →
                  </motion.button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
