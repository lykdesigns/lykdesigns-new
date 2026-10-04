import React, { useState } from 'react';
import { motion } from 'motion/react';
import { soundManager } from '../../utils/audio';

interface BrandVisualizerProps {
  geometryActive: boolean;
}

export const BrandVisualizer: React.FC<BrandVisualizerProps> = ({ geometryActive }) => {
  const [activeVertex, setActiveVertex] = useState<number | null>(null);
  const [isRotating, setIsRotating] = useState(true);

  const vertices = [
    { id: 1, x: 180, y: 140, label: 'V.01 [180, 140]' },
    { id: 2, x: 250, y: 100, label: 'APEX [250, 100]' },
    { id: 3, x: 320, y: 140, label: 'V.03 [320, 140]' },
    { id: 4, x: 320, y: 220, label: 'V.04 [320, 220]' },
    { id: 5, x: 250, y: 260, label: 'PIVOT [250, 260]' },
    { id: 6, x: 180, y: 220, label: 'V.06 [180, 220]' },
  ];

  return (
    <div
      data-cursor-text="GEOMETRY"
      className="relative w-full h-[380px] sm:h-[420px] bg-[#0A0A0A] border border-[#2A2A2A] rounded-xl overflow-hidden flex items-center justify-center select-none group/brand"
    >
      {/* Background Dots Grid */}
      <div className="absolute inset-0 blueprint-dots opacity-30 pointer-events-none" />

      {/* Ambient Orange Glow */}
      <div className="absolute w-[300px] h-[300px] rounded-full bg-[#FF5A1F]/10 blur-[80px] pointer-events-none" />

      {/* Top HUD Overlay */}
      <div className="absolute top-3 left-4 right-4 flex items-center justify-between font-mono text-[10px] text-[#777777] z-20 pointer-events-none">
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-[#FF5A1F] animate-pulse" />
          <span className="text-[#F2F0EA] font-bold">GOLDEN RATIO φ MONOGRAM MATRIX</span>
          <span className="text-[#444444]">|</span>
          <span className="text-[#FF5A1F]">1:1.618033</span>
        </div>
        <div className="hidden sm:flex items-center gap-3">
          <span>GRID: 45° ISOMETRIC</span>
          <span className="text-[#FF5A1F]">OPTICAL LOCK: ACTIVE</span>
        </div>
      </div>

      <svg viewBox="0 0 500 400" className="w-full h-full p-4 overflow-visible relative z-10" fill="none">
        <defs>
          <filter id="brand-glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* ======================================================== */}
        {/* ROTATING GOLDEN RATIO GUIDES & CONSTRUCTION ARCS         */}
        {/* ======================================================== */}
        {geometryActive && (
          <g className="transition-opacity duration-500">
            {/* Slowly Rotating Outer Golden Circle */}
            <motion.g
              animate={{ rotate: isRotating ? 360 : 0 }}
              transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
              style={{ transformOrigin: '250px 200px' }}
            >
              <circle cx="250" cy="200" r="140" stroke="#FF5A1F" strokeWidth="1" strokeDasharray="4 6" opacity="0.35" />
              <circle cx="250" cy="200" r="86.5" stroke="#555555" strokeWidth="1" strokeDasharray="3 3" opacity="0.5" />
              <circle cx="250" cy="200" r="53.5" stroke="#FF5A1F" strokeWidth="1" strokeDasharray="2 4" opacity="0.6" />
              
              {/* Radius Ray Indicators */}
              <line x1="250" y1="200" x2="390" y2="200" stroke="#FF5A1F" strokeWidth="1" opacity="0.4" />
              <line x1="250" y1="200" x2="250" y2="60" stroke="#FF5A1F" strokeWidth="1" opacity="0.4" />
            </motion.g>

            {/* Static Axis Alignment Lines */}
            <line x1="40" y1="200" x2="460" y2="200" stroke="#333333" strokeWidth="1" strokeDasharray="4 4" />
            <line x1="250" y1="40" x2="250" y2="360" stroke="#333333" strokeWidth="1" strokeDasharray="4 4" />

            {/* 45° Diagonal Alignment Rays */}
            <line x1="110" y1="60" x2="390" y2="340" stroke="#262626" strokeWidth="1" strokeDasharray="2 2" />
            <line x1="110" y1="340" x2="390" y2="60" stroke="#262626" strokeWidth="1" strokeDasharray="2 2" />

            {/* Mathematical Golden Ratio Spiral Arc Preview */}
            <motion.path
              d="M 250 200 A 53.5 53.5 0 0 1 303.5 253.5 A 86.5 86.5 0 0 1 217 340"
              stroke="#FF5A1F"
              strokeWidth="1.5"
              fill="none"
              strokeDasharray="4 4"
              opacity="0.5"
              animate={{ opacity: [0.3, 0.7, 0.3] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            />

            {/* Dimension Callout Tag */}
            <g transform="translate(340, 110)">
              <rect width="110" height="22" fill="#141414" stroke="#FF5A1F" strokeWidth="1" rx="4" />
              <text x="55" y="14" fill="#FF5A1F" fontSize="8" fontFamily="monospace" textAnchor="middle">
                φ = 1.618033 [RATIO]
              </text>
            </g>
          </g>
        )}

        {/* ======================================================== */}
        {/* CORE GEOMETRIC MONOGRAM (ANIMATED STROKES)               */}
        {/* ======================================================== */}
        {/* Ambient Echo Glow of the Logo */}
        <motion.path
          d="M 180 140 L 250 100 L 320 140 L 320 220 L 250 260 L 180 220 Z"
          stroke="#FF5A1F"
          strokeWidth="10"
          fill="none"
          opacity="0.15"
          filter="url(#brand-glow)"
          animate={{ opacity: [0.1, 0.25, 0.1] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
        />

        {/* Main Monogram Facets */}
        <g strokeLinecap="round" strokeLinejoin="round">
          {/* Outer Hexagonal Shield */}
          <motion.path
            d="M 180 140 L 250 100 L 320 140 L 320 220 L 250 260 L 180 220 Z"
            stroke="#F2F0EA"
            strokeWidth="5"
            fill="none"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 2, ease: [0.16, 1, 0.3, 1] }}
          />

          {/* Center Orange Blade & Isometric Spine */}
          <motion.path
            d="M 180 220 L 250 260 L 320 220"
            stroke="#FF5A1F"
            strokeWidth="5"
            fill="none"
            filter="url(#brand-glow)"
          />
          <motion.line
            x1="250"
            y1="100"
            x2="250"
            y2="260"
            stroke="#FF5A1F"
            strokeWidth="3.5"
            filter="url(#brand-glow)"
          />
          <motion.line
            x1="250"
            y1="260"
            x2="250"
            y2="305"
            stroke="#F2F0EA"
            strokeWidth="4"
          />
          <motion.line
            x1="180"
            y1="140"
            x2="250"
            y2="180"
            stroke="#555555"
            strokeWidth="2"
            strokeDasharray="2 2"
          />
          <motion.line
            x1="320"
            y1="140"
            x2="250"
            y2="180"
            stroke="#555555"
            strokeWidth="2"
            strokeDasharray="2 2"
          />
        </g>

        {/* ======================================================== */}
        {/* INTERACTIVE VERTEX ANCHOR NODES                          */}
        {/* ======================================================== */}
        {vertices.map((v) => {
          const isActive = activeVertex === v.id;
          return (
            <g
              key={v.id}
              className="cursor-pointer"
              onMouseEnter={() => {
                soundManager.tick();
                setActiveVertex(v.id);
              }}
              onMouseLeave={() => setActiveVertex(null)}
            >
              {/* Pulsing ring on hover/active */}
              <motion.circle
                cx={v.x}
                cy={v.y}
                r={isActive ? 12 : 7}
                stroke="#FF5A1F"
                strokeWidth="1.5"
                fill={isActive ? '#FF5A1F' : '#0A0A0A'}
                animate={isActive ? { scale: [1, 1.25, 1] } : {}}
                transition={{ duration: 1, repeat: Infinity }}
              />
              <circle cx={v.x} cy={v.y} r={isActive ? 3 : 2} fill="#FFFFFF" />

              {/* Tooltip Tag on hover */}
              {isActive && (
                <g transform={`translate(${v.x + 12}, ${v.y - 12})`}>
                  <rect width="100" height="20" fill="#181818" stroke="#FF5A1F" strokeWidth="1" rx="4" />
                  <text x="50" y="13" fill="#F2F0EA" fontSize="8" fontFamily="monospace" textAnchor="middle">
                    {v.label}
                  </text>
                </g>
              )}
            </g>
          );
        })}

        {/* Matrix Watermark */}
        <text x="250" y="345" fill="#777777" fontSize="9" fontFamily="monospace" textAnchor="middle" letterSpacing="2">
          MODULAR IDENTITY MATRIX // 45° GRID
        </text>
      </svg>

      {/* Bottom Technical Bar */}
      <div className="absolute bottom-3 inset-x-4 sm:inset-x-6 flex items-center justify-between font-mono text-[9px] text-[#666666] border-t border-[#1C1C1C] pt-2 pointer-events-none">
        <div className="flex items-center gap-3">
          <span className="w-1.5 h-1.5 bg-[#FF5A1F] rounded-full" />
          <span>CONSTRUCTION TOLERANCE: ±0.001mm</span>
        </div>
        <span className="text-[#FF5A1F]">KERNING: OPTICAL PRECISION</span>
      </div>
    </div>
  );
};
