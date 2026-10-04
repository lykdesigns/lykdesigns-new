import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import { soundManager } from '../../utils/audio';

export const VectorVisualizer: React.FC = () => {
  const [vectorPoint, setVectorPoint] = useState({ x: 280, y: 150 });
  const [isUserInteracting, setIsUserInteracting] = useState(false);
  const [activeHandle, setActiveHandle] = useState<string | null>(null);
  const svgRef = useRef<SVGSVGElement>(null);

  // Autonomous harmonic oscillation when user is not manually dragging
  useEffect(() => {
    if (isUserInteracting) return;
    let time = 0;
    const interval = setInterval(() => {
      time += 0.04;
      // Lissajous curve formula for natural harmonic vector motion
      const oscX = 260 + Math.sin(time * 1.2) * 90;
      const oscY = 160 + Math.cos(time * 1.8) * 60;
      setVectorPoint({
        x: Math.round(oscX),
        y: Math.round(oscY),
      });
    }, 30);

    return () => clearInterval(interval);
  }, [isUserInteracting]);

  const handleMouseMove = (e: React.MouseEvent<SVGSVGElement>) => {
    setIsUserInteracting(true);
    if (!svgRef.current) return;
    const rect = svgRef.current.getBoundingClientRect();
    const x = Math.min(Math.max(Math.round(((e.clientX - rect.left) / rect.width) * 500), 80), 420);
    const y = Math.min(Math.max(Math.round(((e.clientY - rect.top) / rect.height) * 360), 50), 310);
    setVectorPoint({ x, y });
  };

  const handleMouseLeave = () => {
    // Resume autonomous harmonic float after 2 seconds of inactivity
    const timeout = setTimeout(() => {
      setIsUserInteracting(false);
    }, 1800);
    return () => clearTimeout(timeout);
  };

  // Fixed endpoints
  const p0 = { x: 70, y: 260 };
  const p3 = { x: 430, y: 260 };
  const p2 = { x: 380, y: 70 };

  // Calculate tangent angle
  const angleRad = Math.atan2(vectorPoint.y - p0.y, vectorPoint.x - p0.x);
  const angleDeg = Math.round((angleRad * 180) / Math.PI);

  return (
    <div
      data-cursor-text="BÉZIER"
      className="relative w-full h-[380px] sm:h-[420px] bg-[#0A0A0A] border border-[#2A2A2A] rounded-xl overflow-hidden flex items-center justify-center select-none group/vector"
    >
      {/* Background Blueprint Grid */}
      <div className="absolute inset-0 blueprint-grid opacity-30 pointer-events-none" />

      {/* Ambient Orange Glow */}
      <div className="absolute w-[300px] h-[300px] rounded-full bg-[#FF5A1F]/10 blur-[85px] pointer-events-none" />

      {/* Top HUD Overlay */}
      <div className="absolute top-3 left-4 right-4 flex items-center justify-between font-mono text-[10px] text-[#777777] z-20 pointer-events-none">
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-[#FF5A1F] animate-pulse" />
          <span className="text-[#F2F0EA] font-bold">CUBIC BÉZIER SPLINE // B(t)</span>
          <span className="text-[#444444]">|</span>
          <span className="text-[#FF5A1F]">{isUserInteracting ? 'MANUAL CONTROL' : 'HARMONIC FLOAT'}</span>
        </div>
        <div className="hidden sm:flex items-center gap-3">
          <span>TANGENT θ: {angleDeg}°</span>
          <span className="text-[#FF5A1F]">P₁ [{vectorPoint.x}, {vectorPoint.y}]</span>
        </div>
      </div>

      {/* Main SVG Vector Canvas */}
      <svg
        ref={svgRef}
        viewBox="0 0 500 360"
        className="w-full h-full p-4 overflow-visible relative z-10 cursor-crosshair"
        fill="none"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        <defs>
          <filter id="vector-glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3.5" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
          <linearGradient id="vector-fill" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#FF5A1F" stopOpacity="0.2" />
            <stop offset="100%" stopColor="#FF5A1F" stopOpacity="0.0" />
          </linearGradient>
        </defs>

        {/* Background Geometric Polygon Framework */}
        <motion.g
          animate={{ rotate: [0, 360] }}
          transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
          style={{ transformOrigin: '250px 180px' }}
        >
          <polygon
            points="250,90 330,150 330,230 250,290 170,230 170,150"
            stroke="#222222"
            strokeWidth="1"
            fill="none"
            strokeDasharray="3 3"
          />
          <circle cx="250" cy="180" r="70" stroke="#1A1A1A" strokeWidth="1" />
        </motion.g>

        {/* Filled Area Under Primary Bézier Curve */}
        <path
          d={`M ${p0.x} ${p0.y} C ${vectorPoint.x} ${vectorPoint.y}, ${p2.x} ${p2.y}, ${p3.x} ${p3.y} L ${p3.x} 320 L ${p0.x} 320 Z`}
          fill="url(#vector-fill)"
          opacity="0.6"
        />

        {/* Dynamic Harmonic Ghost Echo Curves */}
        <path
          d={`M ${p0.x} ${p0.y} C ${vectorPoint.x + 20} ${vectorPoint.y + 30}, ${p2.x - 20} ${p2.y + 40}, ${p3.x} ${p3.y}`}
          stroke="#FF5A1F"
          strokeWidth="1.5"
          strokeDasharray="4 4"
          opacity="0.4"
          fill="none"
        />
        <path
          d={`M ${p0.x} ${p0.y} C ${vectorPoint.x - 20} ${vectorPoint.y - 30}, ${p2.x + 20} ${p2.y - 30}, ${p3.x} ${p3.y}`}
          stroke="#555555"
          strokeWidth="1"
          strokeDasharray="2 4"
          opacity="0.3"
          fill="none"
        />

        {/* Primary Crisp Bézier Curve with Laser Glow */}
        <path
          d={`M ${p0.x} ${p0.y} C ${vectorPoint.x} ${vectorPoint.y}, ${p2.x} ${p2.y}, ${p3.x} ${p3.y}`}
          stroke="#F2F0EA"
          strokeWidth="3.5"
          strokeLinecap="round"
          fill="none"
        />

        {/* Tangent Control Arms (Dash lines) */}
        <line
          x1={p0.x}
          y1={p0.y}
          x2={vectorPoint.x}
          y2={vectorPoint.y}
          stroke="#FF5A1F"
          strokeWidth="1.5"
          strokeDasharray="3 3"
        />
        <line
          x1={p3.x}
          y1={p3.y}
          x2={p2.x}
          y2={p2.y}
          stroke="#777777"
          strokeWidth="1.5"
          strokeDasharray="3 3"
        />

        {/* Osculating Curvature Visualizer Circle at P1 Control Node */}
        <circle
          cx={vectorPoint.x}
          cy={vectorPoint.y}
          r="32"
          stroke="#FF5A1F"
          strokeWidth="1"
          strokeDasharray="2 4"
          opacity="0.35"
        />

        {/* Anchor Point P0 (Start) */}
        <rect
          x={p0.x - 6}
          y={p0.y - 6}
          width="12"
          height="12"
          fill="#121212"
          stroke="#F2F0EA"
          strokeWidth="2"
          rx="2"
        />
        <text x={p0.x} y={p0.y + 20} fill="#777777" fontSize="8" fontFamily="monospace" textAnchor="middle">
          P₀ [ANCHOR]
        </text>

        {/* Anchor Point P3 (End) */}
        <rect
          x={p3.x - 6}
          y={p3.y - 6}
          width="12"
          height="12"
          fill="#121212"
          stroke="#F2F0EA"
          strokeWidth="2"
          rx="2"
        />
        <text x={p3.x} y={p3.y + 20} fill="#777777" fontSize="8" fontFamily="monospace" textAnchor="middle">
          P₃ [ANCHOR]
        </text>

        {/* Control Handle P2 (Static/Secondary Handle) */}
        <circle cx={p2.x} cy={p2.y} r="5" fill="#777777" stroke="#333333" strokeWidth="1" />
        <text x={p2.x + 10} y={p2.y - 8} fill="#777777" fontSize="8" fontFamily="monospace">
          P₂ [HANDLE]
        </text>

        {/* Interactive Dynamic Control Handle P1 */}
        <g
          className="cursor-pointer"
          onMouseEnter={() => {
            soundManager.tick();
            setActiveHandle('p1');
          }}
          onMouseLeave={() => setActiveHandle(null)}
        >
          {/* Animated pulsing ring */}
          <motion.circle
            cx={vectorPoint.x}
            cy={vectorPoint.y}
            r={activeHandle === 'p1' ? 14 : 9}
            stroke="#FF5A1F"
            strokeWidth="1.5"
            fill="#FF5A1F"
            filter="url(#vector-glow)"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 1.2, repeat: Infinity }}
          />
          <circle cx={vectorPoint.x} cy={vectorPoint.y} r="3" fill="#FFFFFF" />

          {/* Real-time Dynamic Node Coordinate Tooltip */}
          <g transform={`translate(${vectorPoint.x + 14}, ${vectorPoint.y - 14})`}>
            <rect width="115" height="22" fill="#141414" stroke="#FF5A1F" strokeWidth="1" rx="4" />
            <text x="57" y="14" fill="#F2F0EA" fontSize="8" fontFamily="monospace" textAnchor="middle">
              HANDLE P₁ [{vectorPoint.x}, {vectorPoint.y}]
            </text>
          </g>
        </g>
      </svg>

      {/* Bottom Technical Spec Bar */}
      <div className="absolute bottom-3 inset-x-4 sm:inset-x-6 flex items-center justify-between font-mono text-[9px] text-[#666666] border-t border-[#1C1C1C] pt-2 pointer-events-none">
        <div className="flex items-center gap-3">
          <span className="w-1.5 h-1.5 bg-[#FF5A1F] rounded-full" />
          <span>DRAG MOUSE OVER CANVAS TO INTERACT WITH VECTOR SPLINE</span>
        </div>
        <span className="text-[#FF5A1F]">INFINITE SCALABILITY: YES</span>
      </div>
    </div>
  );
};
