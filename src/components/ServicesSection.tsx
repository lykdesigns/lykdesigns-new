import React, { useState, useRef } from 'react';
import { motion, useInView } from 'motion/react';
import { ArrowUpRight, Check, Compass, Layers, Monitor, PenTool } from 'lucide-react';
import { soundManager } from '../utils/audio';
import { EvacuationVisualizer } from './services/EvacuationVisualizer';
import { BrandVisualizer } from './services/BrandVisualizer';
import { WebVisualizer } from './services/WebVisualizer';
import { VectorVisualizer } from './services/VectorVisualizer';

interface ServicesSectionProps {
  onOpenProjectModal: () => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({ onOpenProjectModal }) => {
  // Section inView ref
  const sectionRef = useRef<HTMLDivElement>(null);
  const isSectionInView = useInView(sectionRef, { once: false, amount: 0.1 });

  // Individual cards inView refs
  const card1Ref = useRef<HTMLDivElement>(null);
  const isCard1InView = useInView(card1Ref, { once: false, amount: 0.15 });

  const card2Ref = useRef<HTMLDivElement>(null);
  const isCard2InView = useInView(card2Ref, { once: false, amount: 0.15 });

  const card3Ref = useRef<HTMLDivElement>(null);
  const isCard3InView = useInView(card3Ref, { once: false, amount: 0.15 });

  const card4Ref = useRef<HTMLDivElement>(null);
  const isCard4InView = useInView(card4Ref, { once: false, amount: 0.15 });

  // Active interactive modes for each service
  const [activePlanMode, setActivePlanMode] = useState<'2d' | '3d'>('2d');
  const [routeAnimated, setRouteAnimated] = useState(true);

  // Service 2: Brand geometry state
  const [brandGeometryActive, setBrandGeometryActive] = useState(true);

  // Service 3: Web design mode (wireframe vs polish)
  const [webDesignPhase, setWebDesignPhase] = useState<'wireframe' | 'polished'>('polished');

  return (
    <section id="services" ref={sectionRef} className="relative py-28 md:py-36 bg-[#0D0D0D] border-b border-[#222222]">
      {/* Section Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isSectionInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="flex items-center gap-3 font-mono text-[11px] text-[#FF5A1F] uppercase tracking-widest mb-4"
        >
          <span className="w-2 h-2 bg-[#FF5A1F]" />
          <span>PORTFOLIO DISCIPLINES // CORE SERVICES</span>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
          <div className="lg:col-span-8">
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              animate={isSectionInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="font-display font-bold text-4xl sm:text-6xl md:text-7xl lg:text-8xl tracking-tight text-[#F2F0EA] leading-[0.95]"
            >
              FOUR DISCIPLINES.<br />
              <span className="text-[#777777]">ONE DESIGN MINDSET.</span>
            </motion.h2>
          </div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={isSectionInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-4 border-l border-[#222222] pl-6"
          >
            <p className="text-sm sm:text-base text-[#999999] leading-relaxed">
              Different challenges. Different mediums. One approach: think clearly, design precisely, make it memorable.
            </p>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-24">
        {/* ========================================================= */}
        {/* SERVICE 01: EVACUATION PLANS */}
        {/* ========================================================= */}
        <motion.div
          id="service-space"
          ref={card1Ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isCard1InView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="group relative bg-[#121212] border border-[#262626] hover:border-[#444444] transition-all p-6 sm:p-10 lg:p-12 rounded-2xl shadow-xl overflow-hidden"
        >
          {/* Top Label & Actions */}
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#222222] pb-6 mb-8 font-mono text-xs">
            <div className="flex items-center gap-3">
              <span className="text-[#FF5A1F] font-bold text-sm">01 / SPACE</span>
              <span className="text-[#444444]">|</span>
              <span className="text-[#888888]">2D PLANS · 3D PLANS</span>
              <span className="text-[#444444]">|</span>
              <span className="text-[#555555]">ISO 23601 / OSHA LIFE SAFETY</span>
            </div>

            {/* Interactive 2D / 3D Toggle */}
            <div className="flex items-center gap-2">
              <motion.button
                whileHover={{ scale: 1.12, y: -2, backgroundColor: '#FFFFFF', color: '#000000', borderColor: '#FFFFFF', transition: { duration: 0.12, ease: 'easeOut' } }}
                whileTap={{ scale: 0.94, transition: { duration: 0.08 } }}
                onClick={() => {
                  soundManager.tick();
                  setActivePlanMode('2d');
                }}
                className={`px-3 py-1.5 text-[11px] font-mono border rounded-lg cursor-pointer transition-colors duration-150 ${
                  activePlanMode === '2d'
                    ? 'bg-[#FF5A1F] text-black border-[#FF5A1F] font-bold shadow-[0_0_12px_rgba(255,90,31,0.35)]'
                    : 'bg-[#181818] text-[#888888] border-[#333333] hover:text-black hover:bg-white hover:border-white'
                }`}
              >
                2D SCHEMATIC
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.12, y: -2, backgroundColor: '#FFFFFF', color: '#000000', borderColor: '#FFFFFF', transition: { duration: 0.12, ease: 'easeOut' } }}
                whileTap={{ scale: 0.94, transition: { duration: 0.08 } }}
                onClick={() => {
                  soundManager.tick();
                  setActivePlanMode('3d');
                }}
                className={`px-3 py-1.5 text-[11px] font-mono border rounded-lg cursor-pointer transition-colors duration-150 ${
                  activePlanMode === '3d'
                    ? 'bg-[#FF5A1F] text-black border-[#FF5A1F] font-bold shadow-[0_0_12px_rgba(255,90,31,0.35)]'
                    : 'bg-[#181818] text-[#888888] border-[#333333] hover:text-black hover:bg-white hover:border-white'
                }`}
              >
                3D ISOMETRIC
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.12, y: -2, borderColor: '#FFFFFF', backgroundColor: '#FFFFFF', color: '#000000', transition: { duration: 0.12, ease: 'easeOut' } }}
                whileTap={{ scale: 0.94, transition: { duration: 0.08 } }}
                onClick={() => {
                  soundManager.pulse();
                  setRouteAnimated(!routeAnimated);
                }}
                className="px-3 py-1.5 text-[11px] font-mono bg-[#181818] text-[#AAAAAA] hover:text-black hover:bg-white hover:border-white border border-[#333333] rounded-lg transition-colors duration-150 cursor-pointer"
              >
                {routeAnimated ? 'REPLAY ROUTE' : 'PLAY ROUTE'}
              </motion.button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Description */}
            <div className="lg:col-span-5 space-y-6">
              <h3 className="font-display font-bold text-4xl sm:text-5xl lg:text-6xl text-[#F2F0EA] leading-none">
                EVACUATION<br />
                <span className="text-[#FF5A1F]">PLANS</span>
              </h3>

              <p className="text-base sm:text-lg text-[#AAAAAA] font-normal leading-relaxed">
                Clear visual guidance for complex spaces.
              </p>

              <p className="text-sm text-[#777777] leading-relaxed">
                We transform dense architectural blueprints, high-occupancy facility floor plans, and complex multi-level campuses into intuitive, instant-clarity safety navigation systems. Certified for international fire code and architectural compliance.
              </p>

              <div className="space-y-2 pt-2 border-t border-[#222222] font-mono text-xs text-[#888888]">
                <div className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-[#FF5A1F]" />
                  <span>2D & 3D Isometric Life-Safety Schematics</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-[#FF5A1F]" />
                  <span>Custom Color-Coded Egress Wayfinding</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-[#FF5A1F]" />
                  <span>Multi-Tenant & Large Venue Compliance</span>
                </div>
              </div>

              <motion.button
                whileHover={{ x: 6, color: '#FFFFFF' }}
                whileTap={{ scale: 0.96 }}
                onClick={() => {
                  soundManager.switchMode();
                  onOpenProjectModal();
                }}
                className="group inline-flex items-center gap-2 text-xs font-mono tracking-widest text-[#FF5A1F] uppercase pt-2 cursor-pointer"
              >
                <span>COMMISSION EVACUATION PLAN</span>
                <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
              </motion.button>
            </div>

            {/* Interactive Blueprint Canvas Visual */}
            <div className="lg:col-span-7">
              <EvacuationVisualizer mode={activePlanMode} routeAnimated={routeAnimated} />
            </div>
          </div>
        </motion.div>

        {/* ========================================================= */}
        {/* SERVICE 02: BRAND DESIGN */}
        {/* ========================================================= */}
        <motion.div
          id="service-identity"
          ref={card2Ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isCard2InView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="group relative bg-[#121212] border border-[#262626] hover:border-[#444444] transition-all p-6 sm:p-10 lg:p-12 rounded-2xl shadow-xl overflow-hidden"
        >
          {/* Top Label & Actions */}
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#222222] pb-6 mb-8 font-mono text-xs">
            <div className="flex items-center gap-3">
              <span className="text-[#FF5A1F] font-bold text-sm">02 / IDENTITY</span>
              <span className="text-[#444444]">|</span>
              <span className="text-[#888888]">LOGO · IDENTITY · VISUAL SYSTEMS</span>
              <span className="text-[#444444]">|</span>
              <span className="text-[#555555]">GEOMETRIC CONSTRUCT</span>
            </div>

            <motion.button
              whileHover={{ scale: 1.12, y: -2, backgroundColor: '#FFFFFF', color: '#000000', borderColor: '#FFFFFF', transition: { duration: 0.12, ease: 'easeOut' } }}
              whileTap={{ scale: 0.94, transition: { duration: 0.08 } }}
              onClick={() => {
                soundManager.switchMode();
                setBrandGeometryActive(!brandGeometryActive);
              }}
              className={`px-3 py-1.5 text-[11px] font-mono border rounded-lg cursor-pointer transition-colors duration-150 ${
                brandGeometryActive
                  ? 'bg-[#FF5A1F] text-black border-[#FF5A1F] font-bold shadow-[0_0_12px_rgba(255,90,31,0.35)]'
                  : 'bg-[#181818] text-[#888888] border-[#333333] hover:text-black hover:bg-white hover:border-white'
              }`}
            >
              {brandGeometryActive ? 'GUIDES: ACTIVE' : 'GUIDES: HIDDEN'}
            </motion.button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Description */}
            <div className="lg:col-span-5 space-y-6">
              <h3 className="font-display font-bold text-4xl sm:text-5xl lg:text-6xl text-[#F2F0EA] leading-none">
                BRAND<br />
                <span className="text-[#FF5A1F]">DESIGN</span>
              </h3>

              <p className="text-base sm:text-lg text-[#AAAAAA] font-normal leading-relaxed">
                Distinctive identities built to be recognized, remembered and used consistently.
              </p>

              <p className="text-sm text-[#777777] leading-relaxed">
                We develop full identity systems grounded in mathematical geometry, typographic rigor, and enduring visual memorability. From foundational logomarks to cohesive design tokens and brand guidelines.
              </p>

              <div className="space-y-2 pt-2 border-t border-[#222222] font-mono text-xs text-[#888888]">
                <div className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-[#FF5A1F]" />
                  <span>Geometric Mark & Monogram Construction</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-[#FF5A1F]" />
                  <span>Typographic Pairing & Hierarchy Guides</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-[#FF5A1F]" />
                  <span>Comprehensive Brand Guidelines Book</span>
                </div>
              </div>

              <motion.button
                whileHover={{ x: 6, color: '#FFFFFF' }}
                whileTap={{ scale: 0.96 }}
                onClick={() => {
                  soundManager.switchMode();
                  onOpenProjectModal();
                }}
                className="group inline-flex items-center gap-2 text-xs font-mono tracking-widest text-[#FF5A1F] uppercase pt-2 cursor-pointer"
              >
                <span>COMMISSION BRAND IDENTITY</span>
                <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
              </motion.button>
            </div>

            {/* Interactive Brand Construction Visual */}
            <div className="lg:col-span-7">
              <BrandVisualizer geometryActive={brandGeometryActive} />
            </div>
          </div>
        </motion.div>

        {/* ========================================================= */}
        {/* SERVICE 03: WEB DESIGN */}
        {/* ========================================================= */}
        <motion.div
          id="service-digital"
          ref={card3Ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isCard3InView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="group relative bg-[#121212] border border-[#262626] hover:border-[#444444] transition-all p-6 sm:p-10 lg:p-12 rounded-2xl shadow-xl overflow-hidden"
        >
          {/* Top Label & Actions */}
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#222222] pb-6 mb-8 font-mono text-xs">
            <div className="flex items-center gap-3">
              <span className="text-[#FF5A1F] font-bold text-sm">03 / DIGITAL</span>
              <span className="text-[#444444]">|</span>
              <span className="text-[#888888]">WEBSITES · UI/UX · LANDING PAGES</span>
              <span className="text-[#444444]">|</span>
              <span className="text-[#FF5A1F] font-semibold">CORE SPECIALTY</span>
            </div>

            <div className="flex items-center gap-2">
              <motion.button
                whileHover={{ scale: 1.12, y: -2, backgroundColor: '#FFFFFF', color: '#000000', borderColor: '#FFFFFF', transition: { duration: 0.12, ease: 'easeOut' } }}
                whileTap={{ scale: 0.94, transition: { duration: 0.08 } }}
                onClick={() => {
                  soundManager.tick();
                  setWebDesignPhase('wireframe');
                }}
                className={`px-3 py-1.5 text-[11px] font-mono border rounded-lg cursor-pointer transition-colors duration-150 ${
                  webDesignPhase === 'wireframe'
                    ? 'bg-[#FF5A1F] text-black border-[#FF5A1F] font-bold shadow-[0_0_12px_rgba(255,90,31,0.35)]'
                    : 'bg-[#181818] text-[#888888] border-[#333333] hover:text-black hover:bg-white hover:border-white'
                }`}
              >
                01. WIREFRAME
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.12, y: -2, backgroundColor: '#FFFFFF', color: '#000000', borderColor: '#FFFFFF', transition: { duration: 0.12, ease: 'easeOut' } }}
                whileTap={{ scale: 0.94, transition: { duration: 0.08 } }}
                onClick={() => {
                  soundManager.tick();
                  setWebDesignPhase('polished');
                }}
                className={`px-3 py-1.5 text-[11px] font-mono border rounded-lg cursor-pointer transition-colors duration-150 ${
                  webDesignPhase === 'polished'
                    ? 'bg-[#FF5A1F] text-black border-[#FF5A1F] font-bold shadow-[0_0_12px_rgba(255,90,31,0.35)]'
                    : 'bg-[#181818] text-[#888888] border-[#333333] hover:text-black hover:bg-white hover:border-white'
                }`}
              >
                02. FINISHED UI
              </motion.button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Description */}
            <div className="lg:col-span-5 space-y-6">
              <h3 className="font-display font-bold text-4xl sm:text-5xl lg:text-6xl text-[#F2F0EA] leading-none">
                WEB<br />
                <span className="text-[#FF5A1F]">DESIGN</span>
              </h3>

              <p className="text-base sm:text-lg text-[#AAAAAA] font-normal leading-relaxed">
                Modern digital experiences designed around people, purpose and brand.
              </p>

              <p className="text-sm text-[#777777] leading-relaxed">
                We craft high-performance web applications, bespoke studio landing pages, and interactive interfaces that fuse architectural grid systems, kinetic motion, and responsive precision.
              </p>

              <div className="space-y-2 pt-2 border-t border-[#222222] font-mono text-xs text-[#888888]">
                <div className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-[#FF5A1F]" />
                  <span>Bespoke Art-Directed Web Experiences</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-[#FF5A1F]" />
                  <span>Fluid Kinetic Motion & Micro-Interactions</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-[#FF5A1F]" />
                  <span>Sub-Second Performance & Clean Code</span>
                </div>
              </div>

              <motion.button
                whileHover={{ x: 6, color: '#FFFFFF' }}
                whileTap={{ scale: 0.96 }}
                onClick={() => {
                  soundManager.switchMode();
                  onOpenProjectModal();
                }}
                className="group inline-flex items-center gap-2 text-xs font-mono tracking-widest text-[#FF5A1F] uppercase pt-2 cursor-pointer"
              >
                <span>BUILD A WEB EXPERIENCE</span>
                <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
              </motion.button>
            </div>

            {/* Interactive Browser Frame */}
            <div className="lg:col-span-7">
              <WebVisualizer phase={webDesignPhase} />
            </div>
          </div>
        </motion.div>

        {/* ========================================================= */}
        {/* SERVICE 04: VECTOR ART */}
        {/* ========================================================= */}
        <motion.div
          id="service-art"
          ref={card4Ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isCard4InView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="group relative bg-[#121212] border border-[#262626] hover:border-[#444444] transition-all p-6 sm:p-10 lg:p-12 rounded-2xl shadow-xl overflow-hidden"
        >
          {/* Top Label & Actions */}
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#222222] pb-6 mb-8 font-mono text-xs">
            <div className="flex items-center gap-3">
              <span className="text-[#FF5A1F] font-bold text-sm">04 / ART</span>
              <span className="text-[#444444]">|</span>
              <span className="text-[#888888]">ILLUSTRATION · CHARACTERS · ICONS</span>
              <span className="text-[#444444]">|</span>
              <span className="text-[#555555]">MATHEMATICAL BÉZIER CURVES</span>
            </div>

            <div className="flex items-center gap-2 font-mono text-[11px] text-[#777777]">
              <span className="text-[#FF5A1F] flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#FF5A1F] animate-ping" />
                INTERACTIVE HARMONIC ENGINE
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Description */}
            <div className="lg:col-span-5 space-y-6">
              <h3 className="font-display font-bold text-4xl sm:text-5xl lg:text-6xl text-[#F2F0EA] leading-none">
                VECTOR<br />
                <span className="text-[#FF5A1F]">ART</span>
              </h3>

              <p className="text-base sm:text-lg text-[#AAAAAA] font-normal leading-relaxed">
                Ideas translated into precise, expressive visual artwork.
              </p>

              <p className="text-sm text-[#777777] leading-relaxed">
                We craft custom technical illustrations, architectural iconography, brand mascots, and precision vector assets engineered for infinite scalability and crisp rendering across any physical or digital medium.
              </p>

              <div className="space-y-2 pt-2 border-t border-[#222222] font-mono text-xs text-[#888888]">
                <div className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-[#FF5A1F]" />
                  <span>Mathematical Bézier Vector Curvature</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-[#FF5A1F]" />
                  <span>Custom Iconography & Technical Systems</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-[#FF5A1F]" />
                  <span>Editorial & Narrative Visual Artwork</span>
                </div>
              </div>

              <motion.button
                whileHover={{ x: 6, color: '#FFFFFF' }}
                whileTap={{ scale: 0.96 }}
                onClick={() => {
                  soundManager.switchMode();
                  onOpenProjectModal();
                }}
                className="group inline-flex items-center gap-2 text-xs font-mono tracking-widest text-[#FF5A1F] uppercase pt-2 cursor-pointer"
              >
                <span>COMMISSION VECTOR ARTWORK</span>
                <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
              </motion.button>
            </div>

            {/* Interactive Bézier Vector Art Canvas */}
            <div className="lg:col-span-7">
              <VectorVisualizer />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
