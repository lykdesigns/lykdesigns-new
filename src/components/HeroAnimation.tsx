import React, { useState, useEffect, useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'motion/react';
import { soundManager } from '../utils/audio';

type Stage = 'grid' | 'floorplan' | 'building3d' | 'route' | 'logo' | 'wireframe' | 'vector' | 'lyk';

const STAGES: { id: Stage; label: string; code: string }[] = [
  { id: 'grid', label: '01 / ARCHITECTURAL GRID', code: 'SYS.GRID.01' },
  { id: 'floorplan', label: '02 / 2D FLOOR PLAN', code: 'CAD.FLR.02' },
  { id: 'building3d', label: '03 / 3D ISOMETRIC', code: 'ISO.VOL.03' },
  { id: 'route', label: '04 / EVACUATION ROUTE', code: 'EVAC.PTH.04' },
  { id: 'logo', label: '05 / LOGO GEOMETRY', code: 'GEO.MKR.05' },
  { id: 'wireframe', label: '06 / WEB WIREFRAME', code: 'DOM.WFR.06' },
  { id: 'vector', label: '07 / VECTOR ARTWORK', code: 'VEC.BEZ.07' },
  { id: 'lyk', label: '08 / LYK MONOGRAM', code: 'LYK.SYM.08' },
];

export const HeroAnimation: React.FC = () => {
  const [currentStageIndex, setCurrentStageIndex] = useState<number>(0);
  const [isManual, setIsManual] = useState<boolean>(false);
  const [mousePos, setMousePos] = useState<{ x: number; y: number; normX: number; normY: number }>({
    x: 0,
    y: 0,
    normX: 0,
    normY: 0,
  });
  const containerRef = useRef<HTMLDivElement>(null);

  // Spring physics for buttery-smooth internal parallax
  const canvasMouseX = useMotionValue(0);
  const canvasMouseY = useMotionValue(0);
  const smoothX = useSpring(canvasMouseX, { damping: 24, stiffness: 200, mass: 0.5 });
  const smoothY = useSpring(canvasMouseY, { damping: 24, stiffness: 200, mass: 0.5 });

  const vectorLayer1X = useTransform(smoothX, [-1, 1], [-12, 12]);
  const vectorLayer1Y = useTransform(smoothY, [-1, 1], [-10, 10]);
  const vectorLayer2X = useTransform(smoothX, [-1, 1], [16, -16]);
  const vectorLayer2Y = useTransform(smoothY, [-1, 1], [14, -14]);

  // Auto-cycle through the 8 stages unless user is actively interacting
  useEffect(() => {
    if (isManual) return;
    const interval = setInterval(() => {
      setCurrentStageIndex((prev) => (prev + 1) % STAGES.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [isManual]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const normX = (x / rect.width - 0.5) * 2; // -1 to 1
    const normY = (y / rect.height - 0.5) * 2;

    canvasMouseX.set(normX);
    canvasMouseY.set(normY);

    setMousePos({ x, y, normX, normY });
  };

  const handleMouseLeave = () => {
    canvasMouseX.set(0);
    canvasMouseY.set(0);
    setMousePos({ x: 0, y: 0, normX: 0, normY: 0 });
  };

  const handleStageSelect = (index: number) => {
    setIsManual(true);
    setCurrentStageIndex(index);
    soundManager.switchMode();
    // Resume auto play after 10 seconds of inactivity
    setTimeout(() => setIsManual(false), 10000);
  };

  const currentStage = STAGES[currentStageIndex];

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      data-cursor-text="INSPECT"
      className="relative w-full aspect-[4/3] sm:aspect-[16/10] md:aspect-[16/9] max-h-[580px] bg-[#101010] border border-[#262626] rounded-2xl overflow-hidden group select-none shadow-2xl"
    >
      {/* Background Blueprint Grid that reacts to cursor */}
      <motion.div
        className="absolute inset-[-20px] blueprint-grid opacity-30 pointer-events-none"
        style={{
          x: vectorLayer1X,
          y: vectorLayer1Y,
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[#0D0D0D] via-transparent to-transparent opacity-80 pointer-events-none" />

      {/* Dynamic Cursor Spotlight inside the stage */}
      <motion.div
        className="absolute w-[300px] h-[300px] rounded-full pointer-events-none opacity-25 blur-[60px] bg-[#FF5A1F] -translate-x-1/2 -translate-y-1/2"
        style={{
          left: mousePos.x || '50%',
          top: mousePos.y || '50%',
          transition: 'opacity 0.4s ease',
        }}
      />

      {/* Technical Perimeter Coordinates & Crosshairs */}
      <div className="absolute top-3 left-4 flex items-center gap-3 text-[10px] font-mono text-[#777777] z-20">
        <span className="flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 bg-[#FF5A1F] inline-block animate-pulse" />
          {currentStage.code}
        </span>
        <span className="hidden sm:inline text-[#444444]">|</span>
        <span className="hidden sm:inline">SCALE: 1:100</span>
        <span className="hidden md:inline text-[#444444]">|</span>
        <span className="hidden md:inline">ROT: {(mousePos.normX * 4).toFixed(1)}°</span>
      </div>

      <div className="absolute top-3 right-4 flex items-center gap-2 text-[10px] font-mono text-[#777777] z-20">
        <span className="text-[#FF5A1F]">X: {Math.round(mousePos.x || 320)}</span>
        <span>Y: {Math.round(mousePos.y || 240)}</span>
      </div>

      {/* Corner crosshairs */}
      <div className="absolute top-2 left-2 text-[#444444] font-mono text-[10px] pointer-events-none z-20">+</div>
      <div className="absolute top-2 right-2 text-[#444444] font-mono text-[10px] pointer-events-none z-20">+</div>
      <div className="absolute bottom-2 left-2 text-[#444444] font-mono text-[10px] pointer-events-none z-20">+</div>
      <div className="absolute bottom-2 right-2 text-[#444444] font-mono text-[10px] pointer-events-none z-20">+</div>

      {/* Main SVG Vector Canvas with 3D Mouse Parallax */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center p-6 md:p-12"
        style={{
          x: vectorLayer2X,
          y: vectorLayer2Y,
        }}
      >
        <svg
          viewBox="0 0 800 500"
          className="w-full h-full max-w-[720px] overflow-visible"
          fill="none"
          stroke="currentColor"
        >
          <defs>
            <linearGradient id="orangeLaser" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#FF5A1F" stopOpacity="0.2" />
              <stop offset="50%" stopColor="#FF5A1F" stopOpacity="1" />
              <stop offset="100%" stopColor="#FF5A1F" stopOpacity="0.8" />
            </linearGradient>
            <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
            <pattern id="diagHatch" width="8" height="8" patternTransform="rotate(45 0 0)" patternUnits="userSpaceOnUse">
              <line x1="0" y1="0" x2="0" y2="8" stroke="#333333" strokeWidth="0.75" />
            </pattern>
          </defs>

          {/* Persistent Background Dimension System */}
          <g className="text-[#333333] stroke-[#333333]" strokeWidth="0.75">
            {/* Outer Dimension Lines */}
            <line x1="100" y1="40" x2="700" y2="40" strokeDasharray="3 3" />
            <line x1="100" y1="35" x2="100" y2="45" />
            <line x1="700" y1="35" x2="700" y2="45" />
            <text x="400" y="32" fill="#666666" fontSize="9" fontFamily="monospace" textAnchor="middle">
              SPAN 600.00mm [±0.05]
            </text>

            <line x1="60" y1="80" x2="60" y2="420" strokeDasharray="3 3" />
            <line x1="55" y1="80" x2="65" y2="80" />
            <line x1="55" y1="420" x2="65" y2="420" />
            <text x="50" y="250" fill="#666666" fontSize="9" fontFamily="monospace" textAnchor="middle" transform="rotate(-90 50 250)">
              ELEV 340.00mm
            </text>
          </g>

          {/* STAGE 1: Architectural Grid */}
          <g
            className={`transition-opacity duration-700 ${
              currentStageIndex === 0 ? 'opacity-100' : 'opacity-15'
            }`}
          >
            {/* Grid lines */}
            {[140, 220, 300, 380, 460, 540, 620, 680].map((x, i) => (
              <line key={`gx-${i}`} x1={x} y1="80" x2={x} y2="420" stroke="#2B2B2B" strokeWidth="0.75" />
            ))}
            {[110, 170, 230, 290, 350, 410].map((y, i) => (
              <line key={`gy-${i}`} x1="120" y1={y} x2="680" y2={y} stroke="#2B2B2B" strokeWidth="0.75" />
            ))}
            {/* Grid coordinates */}
            <text x="140" y="70" fill="#777777" fontSize="8" fontFamily="monospace">A-01</text>
            <text x="380" y="70" fill="#777777" fontSize="8" fontFamily="monospace">A-04</text>
            <text x="620" y="70" fill="#777777" fontSize="8" fontFamily="monospace">A-07</text>
          </g>

          {/* STAGE 2: 2D Floor Plan Structure */}
          <g
            className={`transition-opacity duration-700 ${
              currentStageIndex >= 1 ? 'opacity-100' : 'opacity-20'
            }`}
          >
            {/* Main structural walls */}
            <rect x="180" y="110" width="440" height="280" stroke="#4A4A4A" strokeWidth="2" fill="none" />
            
            {/* Internal Rooms */}
            <line x1="360" y1="110" x2="360" y2="290" stroke="#4A4A4A" strokeWidth="1.5" />
            <line x1="480" y1="200" x2="480" y2="390" stroke="#4A4A4A" strokeWidth="1.5" />
            <line x1="180" y1="230" x2="300" y2="230" stroke="#4A4A4A" strokeWidth="1.5" />
            <line x1="360" y1="290" x2="620" y2="290" stroke="#4A4A4A" strokeWidth="1.5" />

            {/* Room Zone Hatches */}
            <rect x="181" y="111" width="178" height="118" fill="url(#diagHatch)" opacity="0.4" />
            
            {/* Door swing arcs */}
            <path d="M 300 230 A 40 40 0 0 1 340 190" stroke="#777777" strokeWidth="1" strokeDasharray="2 2" />
            <line x1="300" y1="230" x2="300" y2="190" stroke="#777777" strokeWidth="1" />

            <path d="M 360 210 A 35 35 0 0 1 395 245" stroke="#777777" strokeWidth="1" strokeDasharray="2 2" />
            <line x1="360" y1="210" x2="395" y2="210" stroke="#777777" strokeWidth="1" />

            {/* Labels */}
            <text x="210" y="140" fill="#888888" fontSize="9" fontFamily="monospace">ZONE A / PRIMARY</text>
            <text x="390" y="140" fill="#888888" fontSize="9" fontFamily="monospace">CORE ATRIUM</text>
            <text x="510" y="330" fill="#888888" fontSize="9" fontFamily="monospace">ZONE C / EGRESS</text>
          </g>

          {/* STAGE 3: 3D Isometric Volume Transformation */}
          <g
            className={`transition-all duration-700 ${
              currentStageIndex === 2 ? 'opacity-100 stroke-[#F2F0EA]' : 'opacity-25 stroke-[#444444]'
            }`}
            strokeWidth="1.25"
          >
            {/* Extruded Isometric building lines */}
            <path d="M 180 110 L 230 65 L 670 65 L 620 110" fill="none" strokeDasharray={currentStageIndex === 2 ? 'none' : '4 4'} />
            <path d="M 620 110 L 670 65 L 670 345 L 620 390" fill="none" />
            <line x1="670" y1="65" x2="670" y2="345" />
            <line x1="230" y1="65" x2="230" y2="100" strokeDasharray="2 2" />
            {/* Level Heights */}
            <line x1="680" y1="65" x2="700" y2="65" stroke="#FF5A1F" strokeWidth="1" />
            <line x1="680" y1="345" x2="700" y2="345" stroke="#FF5A1F" strokeWidth="1" />
            <line x1="695" y1="65" x2="695" y2="345" stroke="#FF5A1F" strokeWidth="1" strokeDasharray="2 2" />
            <text x="705" y="210" fill="#FF5A1F" fontSize="8" fontFamily="monospace">+18.5m ISO</text>
          </g>

          {/* STAGE 4: Animated Evacuation Route (Signature Orange Path) */}
          <g className={`transition-all duration-700 ${currentStageIndex >= 3 ? 'opacity-100' : 'opacity-40'}`}>
            {/* Evacuation Glowing Route Path */}
            <motion.path
              d="M 230 170 L 330 170 L 330 250 L 440 250 L 440 340 L 590 340 L 620 340 L 670 340"
              fill="none"
              stroke="#FF5A1F"
              strokeWidth="3.5"
              strokeLinecap="square"
              strokeLinejoin="miter"
              filter="url(#glow)"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1.8, repeat: Infinity, repeatDelay: 1, ease: 'easeInOut' }}
            />
            {/* Route origin marker */}
            <circle cx="230" cy="170" r="4" fill="#FF5A1F" />
            <circle cx="230" cy="170" r="8" stroke="#FF5A1F" strokeWidth="1" opacity="0.6" />
            {/* Exit marker beacon */}
            <g transform="translate(640, 325)">
              <rect x="0" y="0" width="36" height="20" fill="#FF5A1F" rx="0" />
              <text x="18" y="14" fill="#0D0D0D" fontSize="9" fontWeight="bold" fontFamily="monospace" textAnchor="middle">
                EXIT
              </text>
            </g>
          </g>

          {/* STAGE 5: Geometric Logo Construction (Golden circles & tangent grids) */}
          <g
            className={`transition-opacity duration-700 ${
              currentStageIndex === 4 ? 'opacity-100' : 'opacity-0'
            }`}
          >
            {/* Concentric compass circles */}
            <circle cx="400" cy="250" r="140" stroke="#FF5A1F" strokeWidth="0.75" strokeDasharray="4 4" />
            <circle cx="400" cy="250" r="90" stroke="#777777" strokeWidth="0.75" />
            <circle cx="400" cy="250" r="55" stroke="#FF5A1F" strokeWidth="0.75" />
            {/* 45° angle tangents */}
            <line x1="260" y1="110" x2="540" y2="390" stroke="#555555" strokeWidth="0.75" />
            <line x1="260" y1="390" x2="540" y2="110" stroke="#555555" strokeWidth="0.75" />
            {/* Angle Callout */}
            <path d="M 400 250 L 450 200" stroke="#FF5A1F" strokeWidth="1.5" />
            <text x="460" y="195" fill="#FF5A1F" fontSize="9" fontFamily="monospace">θ = 45.00° [GOLDEN RATIO φ]</text>
          </g>

          {/* STAGE 6: Website Wireframe / Interface Nodes */}
          <g
            className={`transition-opacity duration-700 ${
              currentStageIndex === 5 ? 'opacity-100' : 'opacity-0'
            }`}
          >
            {/* Browser Frame */}
            <rect x="220" y="120" width="360" height="240" stroke="#F2F0EA" strokeWidth="1.5" fill="#141414" fillOpacity="0.8" />
            {/* Browser Top Bar */}
            <line x1="220" y1="145" x2="580" y2="145" stroke="#333333" strokeWidth="1" />
            <circle cx="235" cy="133" r="3" fill="#FF5A1F" />
            <circle cx="245" cy="133" r="3" fill="#555555" />
            <circle cx="255" cy="133" r="3" fill="#555555" />
            <text x="400" y="136" fill="#666666" fontSize="8" fontFamily="monospace" textAnchor="middle">lykdesigns.com</text>

            {/* Wireframe Hero blocks */}
            <rect x="245" y="165" width="160" height="14" fill="#F2F0EA" opacity="0.9" />
            <rect x="245" y="185" width="120" height="8" fill="#666666" />
            <rect x="245" y="198" width="95" height="8" fill="#444444" />
            <rect x="245" y="220" width="60" height="18" fill="#FF5A1F" />
            
            {/* Wireframe Cards */}
            <rect x="430" y="165" width="130" height="120" stroke="#333333" fill="#1A1A1A" strokeWidth="1" />
            <line x1="430" y1="165" x2="560" y2="285" stroke="#333333" strokeWidth="0.75" />
            <line x1="430" y1="285" x2="560" y2="165" stroke="#333333" strokeWidth="0.75" />
            <text x="495" y="230" fill="#777777" fontSize="8" fontFamily="monospace" textAnchor="middle">LIVE CANVAS</text>
          </g>

          {/* STAGE 7: Vector Artwork & Bezier Tangents */}
          <g
            className={`transition-opacity duration-700 ${
              currentStageIndex === 6 ? 'opacity-100' : 'opacity-0'
            }`}
          >
            {/* Precision Bezier Curve */}
            <path
              d="M 220 320 C 280 140, 520 120, 580 300"
              fill="none"
              stroke="#F2F0EA"
              strokeWidth="2.5"
            />
            {/* Tangent control lines */}
            <line x1="220" y1="320" x2="280" y2="140" stroke="#FF5A1F" strokeWidth="1" strokeDasharray="3 3" />
            <line x1="580" y1="300" x2="520" y2="120" stroke="#FF5A1F" strokeWidth="1" strokeDasharray="3 3" />
            
            {/* Anchor Points */}
            <rect x="216" y="316" width="8" height="8" fill="#0D0D0D" stroke="#FF5A1F" strokeWidth="2" />
            <circle cx="280" cy="140" r="4" fill="#FF5A1F" />
            
            <rect x="576" y="296" width="8" height="8" fill="#0D0D0D" stroke="#FF5A1F" strokeWidth="2" />
            <circle cx="520" cy="120" r="4" fill="#FF5A1F" />

            <text x="285" y="135" fill="#FF5A1F" fontSize="8" fontFamily="monospace">HANDLE [x1, y1]</text>
            <text x="525" y="115" fill="#FF5A1F" fontSize="8" fontFamily="monospace">HANDLE [x2, y2]</text>
          </g>

          {/* STAGE 8: LYK Signature Monogram */}
          <g
            className={`transition-opacity duration-700 ${
              currentStageIndex === 7 ? 'opacity-100' : 'opacity-0'
            }`}
          >
            {/* Monogram L - Y - K constructed with architectural orange routes */}
            {/* L */}
            <path d="M 260 170 L 260 330 L 330 330" fill="none" stroke="#FF5A1F" strokeWidth="6" strokeLinecap="square" filter="url(#glow)" />
            {/* Y */}
            <path d="M 360 170 L 400 240 L 440 170" fill="none" stroke="#F2F0EA" strokeWidth="6" strokeLinecap="square" />
            <path d="M 400 240 L 400 330" fill="none" stroke="#F2F0EA" strokeWidth="6" strokeLinecap="square" />
            {/* K */}
            <path d="M 480 170 L 480 330" fill="none" stroke="#F2F0EA" strokeWidth="6" strokeLinecap="square" />
            <path d="M 545 170 L 485 250 L 550 330" fill="none" stroke="#FF5A1F" strokeWidth="6" strokeLinecap="square" filter="url(#glow)" />

            <text x="400" y="380" fill="#777777" fontSize="10" fontFamily="monospace" textAnchor="middle" letterSpacing="3">
              LYK DESIGNS // STUDIO SEAL
            </text>
          </g>
        </svg>
      </motion.div>

      {/* Stage Interactive Selector Bar at the Bottom */}
      <div className="absolute bottom-0 inset-x-0 bg-[#0D0D0D]/90 backdrop-blur-sm border-t border-[#222222] p-2 sm:p-3 flex items-center justify-between overflow-x-auto scrollbar-none gap-2">
        <div className="flex items-center gap-1 sm:gap-1.5 min-w-max">
          {STAGES.map((s, idx) => (
            <motion.button
              key={s.id}
              whileHover={{ scale: 1.15, y: -2, backgroundColor: '#FFFFFF', color: '#000000', borderColor: '#FFFFFF', transition: { duration: 0.12, ease: 'easeOut' } }}
              whileTap={{ scale: 0.94, transition: { duration: 0.08 } }}
              onClick={() => handleStageSelect(idx)}
              className={`px-2.5 py-1 text-[10px] font-mono border rounded-lg cursor-pointer transition-colors duration-150 ${
                currentStageIndex === idx
                  ? 'bg-[#FF5A1F] text-black border-[#FF5A1F] font-bold shadow-[0_0_12px_rgba(255,90,31,0.4)]'
                  : 'bg-[#171717] text-[#888888] border-[#2B2B2B] hover:text-black hover:bg-white hover:border-white'
              }`}
            >
              {s.label.split(' / ')[0]}
            </motion.button>
          ))}
        </div>

        <div className="hidden lg:flex items-center gap-2 text-[10px] font-mono text-[#666666] min-w-max">
          <span>{isManual ? 'MANUAL OVERRIDE' : 'AUTO SEQUENCE'}</span>
          <span className="w-1.5 h-1.5 rounded-full bg-[#FF5A1F] animate-ping" />
        </div>
      </div>
    </div>
  );
};
