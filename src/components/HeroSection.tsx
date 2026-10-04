import React, { useState, useRef } from 'react';
import { motion, useScroll, useTransform, useMotionValue, useSpring } from 'motion/react';
import { ArrowDown, ArrowUpRight, Sparkles } from 'lucide-react';
import { HeroAnimation } from './HeroAnimation';
import { soundManager } from '../utils/audio';

interface HeroSectionProps {
  onOpenProjectModal: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onOpenProjectModal }) => {
  const [mouseCoord, setMouseCoord] = useState({ x: 0, y: 0 });
  const [normalizedPos, setNormalizedPos] = useState({ x: 0, y: 0 });
  const [activeDisciplinePreview, setActiveDisciplinePreview] = useState<number>(2); // Default to 03/DIGITAL
  const heroRef = useRef<HTMLElement>(null);

  // Mouse Parallax Physics Springs
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springConfig = { damping: 28, stiffness: 220, mass: 0.6 };
  const smoothMouseX = useSpring(mouseX, springConfig);
  const smoothMouseY = useSpring(mouseY, springConfig);

  // Deep Parallax Transforms for Top Banner Layers
  const bgParallaxX = useTransform(smoothMouseX, [-1, 1], [-30, 30]);
  const bgParallaxY = useTransform(smoothMouseY, [-1, 1], [-30, 30]);
  const bgGridRotate = useTransform(smoothMouseX, [-1, 1], [-1.2, 1.2]);

  // Typography Column Parallax & 3D Tilt
  const textParallaxX = useTransform(smoothMouseX, [-1, 1], [-16, 16]);
  const textRotateY = useTransform(smoothMouseX, [-1, 1], [-4, 4]);
  const textRotateX = useTransform(smoothMouseY, [-1, 1], [3.5, -3.5]);

  // Visualizer Canvas Parallax & 3D Tilt
  const canvasParallaxX = useTransform(smoothMouseX, [-1, 1], [22, -22]);
  const canvasParallaxY = useTransform(smoothMouseY, [-1, 1], [18, -18]);
  const canvasRotateY = useTransform(smoothMouseX, [-1, 1], [9, -9]);
  const canvasRotateX = useTransform(smoothMouseY, [-1, 1], [-8, 8]);

  // Floating Architectural HUD Badges (High Parallax Coefficients)
  const hudBadge2X = useTransform(smoothMouseX, [-1, 1], [40, -40]);
  const hudBadge2Y = useTransform(smoothMouseY, [-1, 1], [35, -35]);

  // Scroll parallax effects
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });

  const textParallaxY = useTransform(scrollYProgress, [0, 1], [0, 60]);
  const visualParallaxY = useTransform(scrollYProgress, [0, 1], [0, -40]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.9], [1, 0.25]);

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    if (!heroRef.current) return;
    const rect = heroRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const normX = ((x / rect.width) - 0.5) * 2; // -1 to +1
    const normY = ((y / rect.height) - 0.5) * 2; // -1 to +1

    mouseX.set(normX);
    mouseY.set(normY);

    setMouseCoord({
      x: Math.round(x),
      y: Math.round(y),
    });
    setNormalizedPos({
      x: parseFloat(normX.toFixed(3)),
      y: parseFloat(normY.toFixed(3)),
    });
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
    setNormalizedPos({ x: 0, y: 0 });
  };

  const scrollToDiscipline = (id: string, index: number) => {
    setActiveDisciplinePreview(index);
    soundManager.tick();
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleExploreServices = () => {
    soundManager.tick();
    const servicesEl = document.getElementById('services');
    if (servicesEl) {
      servicesEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      ref={heroRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative min-h-screen pt-28 pb-12 md:pt-36 md:pb-16 flex flex-col justify-between overflow-hidden blueprint-combined border-b border-[#222222]"
      style={{ perspective: 1200 }}
    >
      {/* Dynamic Cursor Spotlight Flare */}
      <motion.div
        className="absolute w-[600px] h-[600px] rounded-full pointer-events-none opacity-20 blur-[100px] bg-gradient-to-r from-[#FF5A1F] via-[#FF8040] to-transparent -translate-x-1/2 -translate-y-1/2"
        style={{
          left: mouseCoord.x || '50%',
          top: mouseCoord.y || '40%',
          transition: 'opacity 0.5s ease',
        }}
      />

      {/* Layer 0: Background Parallax Blueprint Grid */}
      <motion.div
        style={{
          x: bgParallaxX,
          y: bgParallaxY,
          rotate: bgGridRotate,
        }}
        className="absolute inset-[-60px] pointer-events-none blueprint-grid-dense opacity-20"
      />

      {/* Background Animated Orange Laser Coordinate Crosshairs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-25">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <line
            x1="0"
            y1={mouseCoord.y || 220}
            x2="100%"
            y2={mouseCoord.y || 220}
            stroke="#FF5A1F"
            strokeWidth="0.5"
            strokeDasharray="4 8"
            opacity="0.45"
          />
          <line
            x1={mouseCoord.x || 320}
            y1="0"
            x2={mouseCoord.x || 320}
            y2="100%"
            stroke="#FF5A1F"
            strokeWidth="0.5"
            strokeDasharray="4 8"
            opacity="0.45"
          />
        </svg>
      </div>

      {/* Hero Header Technical Meta Strip */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 mb-8 md:mb-12 relative z-10"
      >
        <div className="flex items-center justify-between py-2 border-b border-[#222222] font-mono text-[10px] sm:text-[11px] text-[#777777]">
          <div className="flex items-center gap-3">
            <span className="inline-block w-2 h-2 bg-[#FF5A1F] rounded-none animate-pulse" />
            <span className="tracking-[0.25em] text-[#FF5A1F] font-bold uppercase">
              LYK DESIGNS / VISUAL DESIGN STUDIO
            </span>
          </div>
        </div>
      </motion.div>

      {/* Main Hero Split Grid Layout with Combined Scroll + Mouse Parallax */}
      <motion.div
        style={{ opacity: heroOpacity }}
        className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center my-auto relative z-10"
      >
        {/* Left Column: Editorial Typography with 3D Mouse Parallax */}
        <motion.div
          style={{
            y: textParallaxY,
            x: textParallaxX,
            rotateX: textRotateX,
            rotateY: textRotateY,
            transformStyle: 'preserve-3d',
          }}
          className="lg:col-span-6 flex flex-col justify-center relative"
        >
          {/* Main Headline with Staggered Entrance */}
          <h1 className="font-display font-black text-5xl sm:text-6xl md:text-7xl lg:text-8xl tracking-tighter leading-[0.88] text-[#F2F0EA] mb-6 uppercase">
            <motion.span
              initial={{ opacity: 0, y: 35 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="block hover:text-[#FF5A1F] transition-colors duration-300"
            >
              DESIGN
            </motion.span>
            <motion.span
              initial={{ opacity: 0, y: 35 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="block hover:text-[#FF5A1F] transition-colors duration-300"
            >
              THAT MAKES
            </motion.span>
            <motion.span
              initial={{ opacity: 0, y: 35 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="block hover:text-[#FF5A1F] transition-colors duration-300"
            >
              THINGS
            </motion.span>
            <motion.span
              initial={{ opacity: 0, y: 35 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="block text-transparent text-stroke-paper hover:text-[#FF5A1F] hover:[-webkit-text-stroke:0px] transition-all duration-300"
            >
              CLEAR.
            </motion.span>
          </h1>

          {/* Supporting Text & Disciplines Sidebar */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 max-w-2xl mb-8"
          >
            <p className="text-base sm:text-lg text-[#777777] max-w-md leading-relaxed font-normal">
              We turn complex information and creative ideas into clear, purposeful visual experiences.
            </p>

            <div className="flex flex-col gap-1 text-[11px] tracking-widest font-mono border-l border-[#222222] pl-6 sm:pl-8 text-[#F2F0EA] shrink-0">
              <span className="hover:text-[#FF5A1F] transition-colors cursor-pointer" onClick={() => scrollToDiscipline('service-space', 0)}>SPACES</span>
              <span className="hover:text-[#FF5A1F] transition-colors cursor-pointer" onClick={() => scrollToDiscipline('service-identity', 1)}>BRANDS</span>
              <span className="hover:text-[#FF5A1F] transition-colors cursor-pointer" onClick={() => scrollToDiscipline('service-digital', 2)}>WEBSITES</span>
              <span className="hover:text-[#FF5A1F] transition-colors cursor-pointer" onClick={() => scrollToDiscipline('service-art', 3)}>IDEAS</span>
            </div>
          </motion.div>

          {/* Action CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-wrap items-center gap-4"
          >
            <motion.button
              whileHover={{ scale: 1.09, y: -2, transition: { duration: 0.12, ease: 'easeOut' } }}
              whileTap={{ scale: 0.96, transition: { duration: 0.08 } }}
              onClick={() => {
                soundManager.switchMode();
                onOpenProjectModal();
              }}
              className="group relative overflow-hidden inline-flex items-center gap-3 px-6 py-3.5 bg-[#FF5A1F] text-[#0D0D0D] font-display font-bold text-xs sm:text-sm tracking-normal uppercase hover:bg-white hover:text-black transition-colors duration-150 shadow-lg hover:shadow-[0_0_40px_rgba(255,255,255,0.7)] rounded-full cursor-pointer"
            >
              {/* Shimmer light sweep */}
              <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-black/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out pointer-events-none" />
              <span>START A PROJECT →</span>
              <ArrowUpRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1 group-hover:-translate-y-1" />
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.09, y: -2, borderColor: '#FFFFFF', backgroundColor: '#FFFFFF', transition: { duration: 0.12, ease: 'easeOut' } }}
              whileTap={{ scale: 0.96, transition: { duration: 0.08 } }}
              onClick={handleExploreServices}
              className="group inline-flex items-center gap-3 px-5 py-3.5 bg-[#141414] border border-[#222222] text-[#F2F0EA] hover:text-black hover:bg-white hover:border-white font-display font-medium text-xs sm:text-sm tracking-wider uppercase transition-colors duration-150 rounded-full cursor-pointer shadow-sm hover:shadow-[0_0_30px_rgba(255,255,255,0.5)]"
            >
              <span>EXPLORE SERVICES</span>
              <ArrowDown className="w-4 h-4 text-[#FF5A1F] group-hover:text-black transition-colors duration-200 group-hover:translate-y-1" />
            </motion.button>
          </motion.div>
        </motion.div>

        {/* Right Column: Generative/Abstract Blueprint Stage Visual with 3D Mouse Parallax */}
        <motion.div
          style={{
            y: visualParallaxY,
            x: canvasParallaxX,
            rotateX: canvasRotateX,
            rotateY: canvasRotateY,
            transformStyle: 'preserve-3d',
          }}
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-6 w-full relative"
        >
          {/* Floating High-Parallax Calibration Badge (Layer 4) */}
          <motion.div
            style={{
              x: hudBadge2X,
              y: hudBadge2Y,
            }}
            className="hidden sm:flex items-center gap-2 absolute -bottom-4 -left-6 px-3.5 py-1.5 bg-[#141414]/95 border border-[#333333] shadow-2xl rounded-xl text-[10px] font-mono text-[#F2F0EA] pointer-events-none z-30 backdrop-blur-md"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#FF5A1F]" />
            <span className="text-[#AAAAAA]">3D PERSPECTIVE TILT</span>
            <span className="text-[#FF5A1F] font-bold">{(Math.abs(normalizedPos.x) * 10).toFixed(1)}°</span>
          </motion.div>

          <HeroAnimation />
        </motion.div>
      </motion.div>

      {/* Hero Bottom: Sophisticated 4-Discipline Interactive Navigation Bar */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.65, ease: [0.16, 1, 0.3, 1] }}
        className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 mt-12 md:mt-16 relative z-10"
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 border border-[#222222] bg-[#0D0D0D] rounded-2xl overflow-hidden shadow-xl">
          {/* Card 01 / SPACE */}
          <motion.div
            whileHover={{ backgroundColor: '#181818', y: -2, transition: { duration: 0.12, ease: 'easeOut' } }}
            whileTap={{ scale: 0.98, transition: { duration: 0.08 } }}
            onClick={() => scrollToDiscipline('service-space', 0)}
            className={`group p-5 sm:p-6 sm:border-r border-b sm:border-b-0 border-[#222222] transition-colors duration-150 cursor-pointer ${
              activeDisciplinePreview === 0
                ? 'bg-[#141414] border-t-2 border-t-[#FF5A1F]'
                : 'hover:bg-[#151515]'
            }`}
          >
            <div className="text-[10px] text-[#FF5A1F] font-mono mb-2 group-hover:translate-x-1 transition-transform duration-200">01 / SPACE</div>
            <h3 className="text-base sm:text-lg font-bold tracking-tight mb-1 text-[#F2F0EA] group-hover:text-[#FF5A1F] transition-colors">
              EVACUATION PLANS
            </h3>
            <p className="text-[10px] sm:text-[11px] text-[#777777] tracking-wide">
              CLEAR VISUAL GUIDANCE FOR COMPLEX SPACES.
            </p>
          </motion.div>

          {/* Card 02 / IDENTITY */}
          <motion.div
            whileHover={{ backgroundColor: '#181818', y: -2, transition: { duration: 0.12, ease: 'easeOut' } }}
            whileTap={{ scale: 0.98, transition: { duration: 0.08 } }}
            onClick={() => scrollToDiscipline('service-identity', 1)}
            className={`group p-5 sm:p-6 lg:border-r border-b sm:border-b-0 border-[#222222] transition-colors duration-150 cursor-pointer ${
              activeDisciplinePreview === 1
                ? 'bg-[#141414] border-t-2 border-t-[#FF5A1F]'
                : 'hover:bg-[#151515]'
            }`}
          >
            <div className="text-[10px] text-[#FF5A1F] font-mono mb-2 group-hover:translate-x-1 transition-transform duration-200">02 / IDENTITY</div>
            <h3 className="text-base sm:text-lg font-bold tracking-tight mb-1 text-[#F2F0EA] group-hover:text-[#FF5A1F] transition-colors">
              BRANDING SYSTEMS
            </h3>
            <p className="text-[10px] sm:text-[11px] text-[#777777] tracking-wide">
              DISTINCTIVE IDENTITIES BUILT TO BE RECOGNIZED.
            </p>
          </motion.div>

          {/* Card 03 / DIGITAL */}
          <motion.div
            whileHover={{ backgroundColor: '#181818', y: -2, transition: { duration: 0.12, ease: 'easeOut' } }}
            whileTap={{ scale: 0.98, transition: { duration: 0.08 } }}
            onClick={() => scrollToDiscipline('service-digital', 2)}
            className={`group p-5 sm:p-6 sm:border-r border-b sm:border-b-0 border-[#222222] transition-colors duration-150 cursor-pointer ${
              activeDisciplinePreview === 2
                ? 'bg-[#141414] border-t-2 border-t-[#FF5A1F]'
                : 'hover:bg-[#151515]'
            }`}
          >
            <div className="text-[10px] text-[#FF5A1F] font-mono mb-2 group-hover:translate-x-1 transition-transform duration-200">03 / DIGITAL</div>
            <h3 className="text-base sm:text-lg font-bold tracking-tight mb-1 text-[#F2F0EA] group-hover:text-[#FF5A1F] transition-colors">
              WEB DESIGN
            </h3>
            <p className="text-[10px] sm:text-[11px] text-[#777777] tracking-wide">
              MODERN DIGITAL EXPERIENCES BUILT ON PURPOSE.
            </p>
          </motion.div>

          {/* Card 04 / ART */}
          <motion.div
            whileHover={{ backgroundColor: '#181818', y: -2, transition: { duration: 0.12, ease: 'easeOut' } }}
            whileTap={{ scale: 0.98, transition: { duration: 0.08 } }}
            onClick={() => scrollToDiscipline('service-art', 3)}
            className={`group p-5 sm:p-6 transition-colors duration-150 cursor-pointer ${
              activeDisciplinePreview === 3
                ? 'bg-[#141414] border-t-2 border-t-[#FF5A1F]'
                : 'hover:bg-[#151515]'
            }`}
          >
            <div className="text-[10px] text-[#FF5A1F] font-mono mb-2 group-hover:translate-x-1 transition-transform duration-200">04 / ART</div>
            <h3 className="text-base sm:text-lg font-bold tracking-tight mb-1 text-[#F2F0EA] group-hover:text-[#FF5A1F] transition-colors">
              VECTOR ARTWORK
            </h3>
            <p className="text-[10px] sm:text-[11px] text-[#777777] tracking-wide">
              IDEAS TRANSLATED INTO PRECISE VISUAL ART.
            </p>
          </motion.div>
        </div>

        {/* Technical Sub-Watermark & Scroll Reveal Trigger */}
        <div className="pt-4 flex items-center justify-between font-mono text-[9px] sm:text-[10px] text-[#555555]">
          <div className="flex items-center gap-3">
            <div className="w-8 h-[1px] bg-[#F2F0EA] opacity-30" />
            <span className="tracking-[0.3em] uppercase">PRECISION · CLARITY · CREATIVITY</span>
          </div>

          {/* Center Interactive Scroll Indicator */}
          <motion.div
            animate={{ y: [0, 5, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            onClick={handleExploreServices}
            className="flex items-center gap-2 text-[#888888] hover:text-[#FF5A1F] cursor-pointer transition-colors px-3 py-1 bg-[#121212] border border-[#222222] hover:border-[#FF5A1F] rounded-full"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#FF5A1F] animate-ping" />
            <span className="tracking-widest uppercase text-[9px]">SCROLL TO REVEAL</span>
            <ArrowDown className="w-3 h-3 text-[#FF5A1F]" />
          </motion.div>

          <div className="hidden sm:flex items-center gap-4">
            <span className="text-[#FF5A1F]">/</span>
            <span>SYSTEM LATENCY: OPTIMAL (60 FPS)</span>
          </div>
        </div>
      </motion.div>
    </section>
  );
};
