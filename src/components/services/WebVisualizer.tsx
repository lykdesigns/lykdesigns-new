import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Monitor, Smartphone, Tablet, Zap, ArrowUpRight, CheckCircle2 } from 'lucide-react';
import { soundManager } from '../../utils/audio';

interface WebVisualizerProps {
  phase: 'wireframe' | 'polished';
}

export const WebVisualizer: React.FC<WebVisualizerProps> = ({ phase }) => {
  const [activeTab, setActiveTab] = useState<'home' | 'metrics' | 'specs'>('home');
  const [toggleState, setToggleState] = useState(true);
  const [simulatedCursor, setSimulatedCursor] = useState({ x: 220, y: 140 });

  // Autonomous simulated cursor movement for live product demo feeling
  useEffect(() => {
    const waypoints = [
      { x: 180, y: 90 },
      { x: 380, y: 140 },
      { x: 240, y: 220 },
      { x: 420, y: 220 },
      { x: 200, y: 160 },
    ];
    let idx = 0;
    const interval = setInterval(() => {
      idx = (idx + 1) % waypoints.length;
      setSimulatedCursor(waypoints[idx]);
    }, 2800);
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      data-cursor-text="PREVIEW"
      className="relative w-full h-[380px] sm:h-[420px] bg-[#0A0A0A] border border-[#2A2A2A] rounded-xl overflow-hidden shadow-2xl flex flex-col justify-between select-none group/web"
    >
      {/* Browser Window Chrome Header */}
      <div className="bg-[#141414] px-4 py-2.5 border-b border-[#222222] flex items-center justify-between z-20">
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-[#FF5A1F] shadow-[0_0_8px_rgba(255,90,31,0.6)]" />
          <div className="w-2.5 h-2.5 rounded-full bg-[#333333]" />
          <div className="w-2.5 h-2.5 rounded-full bg-[#333333]" />
        </div>

        {/* URL Bar with SSL indicator */}
        <div className="px-4 py-1 bg-[#0A0A0A] border border-[#262626] font-mono text-[10px] text-[#888888] rounded-full flex items-center gap-2 shadow-inner">
          <span className="w-1.5 h-1.5 rounded-full bg-[#22C55E]" />
          <span className="text-[#F2F0EA]">https://lykdesigns.com</span>
          <span className="text-[#555555]">/interactive-engine</span>
        </div>

        <div className="flex items-center gap-3 text-[10px] font-mono text-[#777777]">
          <span className="hidden sm:inline text-[#22C55E] font-bold">60 FPS</span>
          <Monitor className="w-3.5 h-3.5 text-[#FF5A1F]" />
        </div>
      </div>

      {/* Main Interactive Browser Stage */}
      <div className="relative flex-1 p-5 sm:p-7 flex flex-col justify-between bg-[#0E0E0E] overflow-hidden">
        {/* Background Blueprint Raster */}
        <div className="absolute inset-0 blueprint-grid opacity-20 pointer-events-none" />

        {/* Ambient Flare */}
        <div className="absolute -top-20 -right-20 w-[250px] h-[250px] bg-[#FF5A1F]/10 blur-[80px] pointer-events-none" />

        {/* ======================================================== */}
        {/* PHASE 1: WIREFRAME MODE                                  */}
        {/* ======================================================== */}
        {phase === 'wireframe' ? (
          <motion.div
            key="wireframe"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="space-y-5 my-auto"
          >
            {/* Wireframe Nav Structure */}
            <div className="flex items-center justify-between border-b border-[#222222] pb-3">
              <div className="flex items-center gap-2">
                <div className="w-20 h-4 bg-[#262626] rounded-md animate-pulse" />
                <span className="font-mono text-[9px] text-[#555555]">[LOGO_CONTAINER]</span>
              </div>
              <div className="flex gap-3">
                <div className="w-12 h-3 bg-[#262626] rounded-md" />
                <div className="w-12 h-3 bg-[#262626] rounded-md" />
                <div className="w-16 h-3 bg-[#FF5A1F]/40 rounded-md border border-[#FF5A1F]/50" />
              </div>
            </div>

            {/* Wireframe Hero Skeleton */}
            <div className="space-y-3">
              <div className="w-3/4 h-7 bg-[#2E2E2E] rounded-md animate-pulse" />
              <div className="w-1/2 h-7 bg-[#2E2E2E] rounded-md animate-pulse" />
              <div className="w-4/5 h-3.5 bg-[#1F1F1F] rounded-md" />
            </div>

            {/* Wireframe Slot Cards */}
            <div className="grid grid-cols-3 gap-3 pt-2">
              <div className="h-20 bg-[#141414] border border-dashed border-[#333333] rounded-lg p-2 flex flex-col justify-between font-mono text-[9px] text-[#666666]">
                <div className="flex justify-between">
                  <span>MOD_01</span>
                  <span className="text-[#FF5A1F]">48.0%</span>
                </div>
                <div className="w-full h-1 bg-[#222222] rounded" />
              </div>

              <div className="h-20 bg-[#141414] border border-dashed border-[#333333] rounded-lg p-2 flex flex-col justify-between font-mono text-[9px] text-[#666666]">
                <div className="flex justify-between">
                  <span>MOD_02</span>
                  <span className="text-[#FF5A1F]">60FPS</span>
                </div>
                <div className="w-full h-1 bg-[#222222] rounded" />
              </div>

              <div className="h-20 bg-[#141414] border border-dashed border-[#333333] rounded-lg p-2 flex flex-col justify-between font-mono text-[9px] text-[#666666]">
                <div className="flex justify-between">
                  <span>MOD_03</span>
                  <span className="text-[#22C55E]">READY</span>
                </div>
                <div className="w-full h-1 bg-[#222222] rounded" />
              </div>
            </div>
          </motion.div>
        ) : (
          /* ======================================================== */
          /* PHASE 2: POLISHED LIVE UI EXPERIENCE                     */
          /* ======================================================== */
          <motion.div
            key="polished"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="space-y-4 my-auto relative z-10"
          >
            {/* Live Navigation Bar */}
            <div className="flex items-center justify-between border-b border-[#222222] pb-3 font-mono text-xs">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-[#FF5A1F] rounded-none" />
                <span className="font-bold text-[#F2F0EA] tracking-wider">LYK KINETIC UI</span>
              </div>

              <div className="flex items-center gap-3 text-[11px] text-[#888888]">
                <button
                  onClick={() => {
                    soundManager.tick();
                    setActiveTab('home');
                  }}
                  className={`cursor-pointer transition-colors ${activeTab === 'home' ? 'text-[#FF5A1F] font-bold' : 'hover:text-[#F2F0EA]'}`}
                >
                  SYSTEM
                </button>
                <button
                  onClick={() => {
                    soundManager.tick();
                    setActiveTab('metrics');
                  }}
                  className={`cursor-pointer transition-colors ${activeTab === 'metrics' ? 'text-[#FF5A1F] font-bold' : 'hover:text-[#F2F0EA]'}`}
                >
                  METRICS
                </button>
                <span className="px-2 py-0.5 bg-[#FF5A1F] text-black font-bold text-[10px] rounded-full">
                  LIVE
                </span>
              </div>
            </div>

            {/* Live Headline & Dynamic Telemetry Card */}
            <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 items-center">
              <div className="sm:col-span-7 space-y-1.5">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-[9px] text-[#FF5A1F] uppercase tracking-widest">// KINETIC ENGINE</span>
                  <span className="px-1.5 py-0.2 bg-[#1A1A1A] border border-[#333333] text-[8px] font-mono text-[#AAAAAA] rounded">v2.4</span>
                </div>
                <h4 className="font-display font-bold text-xl sm:text-2xl text-[#F2F0EA] leading-tight">
                  High-Performance Web Architecture.
                </h4>
                <p className="text-[11px] text-[#888888] leading-relaxed">
                  Sub-pixel rendering, fluid motion physics, and accessible semantic layouts.
                </p>
              </div>

              {/* Sparkline Telemetry Card */}
              <div className="sm:col-span-5 bg-[#141414] border border-[#262626] rounded-xl p-3 space-y-2">
                <div className="flex items-center justify-between font-mono text-[9px] text-[#777777]">
                  <span>RESPONSE TIME</span>
                  <span className="text-[#22C55E] font-bold">14ms [OPTIMAL]</span>
                </div>
                {/* Dynamic animated SVG Sparkline */}
                <svg viewBox="0 0 100 24" className="w-full h-6 overflow-visible" fill="none">
                  <motion.path
                    d="M 0 18 Q 20 8, 40 14 T 80 4 T 100 12"
                    stroke="#FF5A1F"
                    strokeWidth="2"
                    fill="none"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 1, ease: 'easeInOut' }}
                  />
                  <circle cx="100" cy="12" r="3" fill="#FF5A1F" />
                </svg>
              </div>
            </div>

            {/* Action Bar with Micro-Interactive Switch & CTA */}
            <div className="p-3 bg-[#141414] border border-[#282828] rounded-xl flex items-center justify-between">
              <div
                className="flex items-center gap-3 cursor-pointer"
                onClick={() => {
                  soundManager.switchMode();
                  setToggleState(!toggleState);
                }}
              >
                {/* Custom animated switch */}
                <div className={`w-8 h-4.5 rounded-full p-0.5 transition-colors ${toggleState ? 'bg-[#FF5A1F]' : 'bg-[#333333]'}`}>
                  <motion.div
                    className="w-3.5 h-3.5 rounded-full bg-white shadow-md"
                    animate={{ x: toggleState ? 14 : 0 }}
                    transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                  />
                </div>
                <span className="font-mono text-[10px] text-[#CCCCCC]">
                  {toggleState ? 'HARDWARE ACCEL: ON' : 'HARDWARE ACCEL: OFF'}
                </span>
              </div>

              <motion.button
                whileHover={{ scale: 1.1, backgroundColor: '#FFFFFF', color: '#000000', transition: { duration: 0.12 } }}
                whileTap={{ scale: 0.94 }}
                onClick={() => soundManager.pulse()}
                className="px-3.5 py-1.5 bg-[#FF5A1F] text-black font-mono text-[10px] font-bold uppercase transition-colors rounded-lg cursor-pointer hover:bg-white hover:text-black shadow-md flex items-center gap-1.5"
              >
                <span>EXPLORE</span>
                <ArrowUpRight className="w-3 h-3" />
              </motion.button>
            </div>
          </motion.div>
        )}

        {/* Autonomous Simulated Cursor Indicator */}
        <motion.div
          animate={{ x: simulatedCursor.x, y: simulatedCursor.y }}
          transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1] }}
          className="absolute pointer-events-none z-30 hidden sm:flex items-center gap-1"
        >
          <div className="w-3 h-3 border-2 border-white bg-[#FF5A1F] rounded-full shadow-lg" />
          <span className="px-1.5 py-0.5 bg-black/80 text-[8px] font-mono text-white rounded border border-[#333333]">
            USER
          </span>
        </motion.div>
      </div>

      {/* Browser Footer Specs Strip */}
      <div className="bg-[#111111] px-4 py-2 border-t border-[#222222] flex items-center justify-between font-mono text-[9px] text-[#666666] z-20">
        <div className="flex items-center gap-3">
          <span className="w-1.5 h-1.5 rounded-full bg-[#22C55E]" />
          <span>VITE 6.0 + REACT 19 + TAILWIND 4.0</span>
        </div>
        <div className="flex items-center gap-2 text-[#FF5A1F]">
          <CheckCircle2 className="w-3 h-3" />
          <span>LIGHTHOUSE: 100/100</span>
        </div>
      </div>
    </div>
  );
};
