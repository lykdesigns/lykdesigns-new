import React, { useState } from 'react';
import { motion } from 'motion/react';
import { soundManager } from '../../utils/audio';

interface EvacuationVisualizerProps {
  mode: '2d' | '3d';
  routeAnimated: boolean;
}

export const EvacuationVisualizer: React.FC<EvacuationVisualizerProps> = ({ mode, routeAnimated }) => {
  const [hoveredZone, setHoveredZone] = useState<string | null>(null);

  return (
    <div className="relative w-full h-[380px] sm:h-[420px] bg-[#0A0A0A] border border-[#2A2A2A] rounded-xl overflow-hidden flex items-center justify-center select-none group/evac">
      {/* Background Blueprint Grid */}
      <div className="absolute inset-0 blueprint-grid opacity-35 pointer-events-none" />

      {/* Ambient Radial Flare */}
      <div className="absolute w-[350px] h-[350px] rounded-full bg-[#FF5A1F]/10 blur-[90px] pointer-events-none" />

      {/* Laser Scanning Bar Animation */}
      <motion.div
        className="absolute inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-[#FF5A1F] to-transparent pointer-events-none opacity-60 z-20"
        animate={{ top: ['5%', '95%', '5%'] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Top HUD Overlay */}
      <div className="absolute top-3 left-4 right-4 flex items-center justify-between font-mono text-[10px] text-[#777777] z-20 pointer-events-none">
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-[#FF5A1F] animate-ping" />
          <span className="text-[#F2F0EA] font-bold">
            {mode === '2d' ? '2D SCHEMATIC EGRESS' : '3D ISOMETRIC VOLUMETRIC'}
          </span>
          <span className="text-[#444444]">|</span>
          <span className="text-[#FF5A1F]">ISO 23601</span>
        </div>
        <div className="hidden sm:flex items-center gap-3">
          <span>EGRESS VELOCITY: 1.4 m/s</span>
          <span className="text-[#22C55E] font-bold">CLEARANCE: 100%</span>
        </div>
      </div>

      {/* Main SVG Visualization */}
      <svg viewBox="0 0 600 400" className="w-full h-full p-4 overflow-visible relative z-10" fill="none">
        <defs>
          <filter id="evac-laser-glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3.5" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
          <linearGradient id="route-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#FF5A1F" />
            <stop offset="50%" stopColor="#FF9E00" />
            <stop offset="100%" stopColor="#22C55E" />
          </linearGradient>
        </defs>

        {mode === '2d' ? (
          <g className="transition-all duration-500">
            {/* Dimension Lines */}
            <line x1="70" y1="45" x2="530" y2="45" stroke="#444444" strokeWidth="1" strokeDasharray="3 3" />
            <line x1="70" y1="40" x2="70" y2="50" stroke="#666666" strokeWidth="1" />
            <line x1="530" y1="40" x2="530" y2="50" stroke="#666666" strokeWidth="1" />
            <text x="300" y="38" fill="#888888" fontSize="9" fontFamily="monospace" textAnchor="middle">
              TOTAL LENGTH: 46.00 METERS // EGRESS SECTOR A-4
            </text>

            {/* Outer Structural Shell */}
            <rect
              x="70"
              y="60"
              width="460"
              height="280"
              stroke="#555555"
              strokeWidth="2.5"
              fill="#121212"
              rx="6"
            />

            {/* Internal Rooms / Zones */}
            {/* Zone 1: RM 101 North */}
            <motion.rect
              x="70"
              y="60"
              width="160"
              height="120"
              stroke={hoveredZone === 'rm101' ? '#FF5A1F' : '#333333'}
              strokeWidth={hoveredZone === 'rm101' ? 2 : 1}
              fill={hoveredZone === 'rm101' ? '#1E1410' : '#141414'}
              className="cursor-pointer transition-colors duration-200"
              onMouseEnter={() => {
                soundManager.tick();
                setHoveredZone('rm101');
              }}
              onMouseLeave={() => setHoveredZone(null)}
            />
            <text x="150" y="105" fill={hoveredZone === 'rm101' ? '#FF5A1F' : '#888888'} fontSize="10" fontFamily="monospace" textAnchor="middle">
              RM 101 [PRIMARY]
            </text>
            <text x="150" y="122" fill="#555555" fontSize="8" fontFamily="monospace" textAnchor="middle">
              CAP: 18 PERSONS
            </text>

            {/* Zone 2: Atrium Concourse */}
            <motion.rect
              x="230"
              y="60"
              width="150"
              height="180"
              stroke={hoveredZone === 'atrium' ? '#FF5A1F' : '#333333'}
              strokeWidth={hoveredZone === 'atrium' ? 2 : 1}
              fill={hoveredZone === 'atrium' ? '#1E1410' : '#161616'}
              className="cursor-pointer transition-colors duration-200"
              onMouseEnter={() => {
                soundManager.tick();
                setHoveredZone('atrium');
              }}
              onMouseLeave={() => setHoveredZone(null)}
            />
            <text x="305" y="130" fill={hoveredZone === 'atrium' ? '#FF5A1F' : '#888888'} fontSize="10" fontFamily="monospace" textAnchor="middle">
              ATRIUM CONCOURSE
            </text>
            <text x="305" y="145" fill="#555555" fontSize="8" fontFamily="monospace" textAnchor="middle">
              ASSEMBLY AREA
            </text>

            {/* Zone 3: Executive Suite RM 102 */}
            <motion.rect
              x="380"
              y="60"
              width="150"
              height="140"
              stroke={hoveredZone === 'exec' ? '#FF5A1F' : '#333333'}
              strokeWidth={hoveredZone === 'exec' ? 2 : 1}
              fill={hoveredZone === 'exec' ? '#1E1410' : '#141414'}
              className="cursor-pointer transition-colors duration-200"
              onMouseEnter={() => {
                soundManager.tick();
                setHoveredZone('exec');
              }}
              onMouseLeave={() => setHoveredZone(null)}
            />
            <text x="455" y="115" fill={hoveredZone === 'exec' ? '#FF5A1F' : '#888888'} fontSize="10" fontFamily="monospace" textAnchor="middle">
              RM 102 [EXEC SUITE]
            </text>
            <text x="455" y="130" fill="#555555" fontSize="8" fontFamily="monospace" textAnchor="middle">
              CAP: 10 PERSONS
            </text>

            {/* Main Corridor */}
            <rect x="70" y="240" width="460" height="100" stroke="#333333" strokeWidth="1" fill="#101010" />
            <text x="260" y="295" fill="#777777" fontSize="9" fontFamily="monospace">
              MAIN EGRESS CORRIDOR [WIDTH: 2.8m]
            </text>

            {/* Equipment: Fire Extinguisher (Pulsing) */}
            <g transform="translate(215, 68)">
              <motion.rect
                width="20"
                height="20"
                fill="#DC2626"
                rx="4"
                animate={{ scale: [1, 1.08, 1] }}
                transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
              />
              <text x="10" y="14" fill="#FFFFFF" fontSize="9" fontWeight="bold" textAnchor="middle" fontFamily="monospace">
                F
              </text>
            </g>

            {/* Equipment: First Aid */}
            <g transform="translate(390, 248)">
              <rect width="20" height="20" fill="#16A34A" rx="4" />
              <text x="10" y="15" fill="#FFFFFF" fontSize="12" fontWeight="bold" textAnchor="middle" fontFamily="monospace">
                +
              </text>
            </g>

            {/* Primary Escape Route Line with Glow */}
            {routeAnimated && (
              <>
                <motion.path
                  d="M 150 120 L 150 200 L 305 200 L 305 285 L 530 285"
                  stroke="#FF5A1F"
                  strokeWidth="4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  filter="url(#evac-laser-glow)"
                  fill="none"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 2.5, repeat: Infinity, repeatDelay: 0.8, ease: 'easeInOut' }}
                />

                {/* Animated Waypoint Particles flowing through the path */}
                <motion.circle
                  r="4"
                  fill="#FFFFFF"
                  filter="url(#evac-laser-glow)"
                  animate={{
                    cx: [150, 150, 305, 305, 530],
                    cy: [120, 200, 200, 285, 285],
                    opacity: [0, 1, 1, 1, 0],
                  }}
                  transition={{ duration: 2.5, repeat: Infinity, repeatDelay: 0.8, ease: 'easeInOut' }}
                />

                <motion.circle
                  r="3"
                  fill="#FF9E00"
                  animate={{
                    cx: [150, 150, 305, 305, 530],
                    cy: [120, 200, 200, 285, 285],
                    opacity: [0, 1, 1, 1, 0],
                  }}
                  transition={{ duration: 2.5, repeat: Infinity, repeatDelay: 0.8, delay: 0.4, ease: 'easeInOut' }}
                />
              </>
            )}

            {/* "YOU ARE HERE" Beacon */}
            <g transform="translate(150, 120)">
              {/* Concentric Ripple Rings */}
              <motion.circle
                r="16"
                stroke="#FF5A1F"
                strokeWidth="1.5"
                fill="none"
                animate={{ scale: [0.6, 1.8], opacity: [0.9, 0] }}
                transition={{ duration: 1.8, repeat: Infinity, ease: 'easeOut' }}
              />
              <motion.circle
                r="10"
                stroke="#FF5A1F"
                strokeWidth="1"
                fill="none"
                animate={{ scale: [0.6, 1.5], opacity: [0.8, 0] }}
                transition={{ duration: 1.8, repeat: Infinity, delay: 0.5, ease: 'easeOut' }}
              />
              <circle r="6" fill="#FF5A1F" />
              <circle r="2.5" fill="#FFFFFF" />
              <text x="0" y="24" fill="#FF5A1F" fontSize="8" fontWeight="bold" fontFamily="monospace" textAnchor="middle">
                YOU ARE HERE
              </text>
            </g>

            {/* Exit Portal Target with Animated Directional Arrow */}
            <g transform="translate(525, 270)">
              <rect width="60" height="30" fill="#16A34A" rx="4" />
              <text x="30" y="19" fill="#FFFFFF" fontSize="10" fontWeight="bold" fontFamily="monospace" textAnchor="middle">
                EXIT →
              </text>
              <motion.path
                d="M 68 15 L 75 15 M 72 11 L 76 15 L 72 19"
                stroke="#22C55E"
                strokeWidth="2"
                fill="none"
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 1.2, repeat: Infinity, ease: 'easeInOut' }}
              />
            </g>
          </g>
        ) : (
          /* ======================================================== */
          /* 3D ISOMETRIC VIEW                                        */
          /* ======================================================== */
          <g className="transition-all duration-500">
            {/* Level 01 Ground Floor Slab */}
            <path
              d="M 120 220 L 300 130 L 480 220 L 300 310 Z"
              stroke="#555555"
              strokeWidth="2"
              fill="#121212"
            />
            {/* Slab Thickness */}
            <path
              d="M 120 220 L 120 240 L 300 330 L 300 310 Z"
              stroke="#444444"
              strokeWidth="1.5"
              fill="#1A1A1A"
            />
            <path
              d="M 300 310 L 300 330 L 480 240 L 480 220 Z"
              stroke="#444444"
              strokeWidth="1.5"
              fill="#0F0F0F"
            />

            {/* Level 02 Upper Floor Slab (Elevated) */}
            <motion.g
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            >
              <path
                d="M 160 140 L 300 70 L 440 140 L 300 210 Z"
                stroke="#666666"
                strokeWidth="1.5"
                fill="#161616"
                opacity="0.85"
              />
              <path
                d="M 160 140 L 160 152 L 300 222 L 300 210 Z"
                stroke="#555555"
                strokeWidth="1"
                fill="#202020"
              />
              <path
                d="M 300 210 L 300 222 L 440 152 L 440 140 Z"
                stroke="#555555"
                strokeWidth="1"
                fill="#181818"
              />

              {/* Upper Floor Room Dividers */}
              <line x1="230" y1="105" x2="300" y2="140" stroke="#555555" strokeWidth="1.5" />
              <line x1="370" y1="105" x2="300" y2="140" stroke="#555555" strokeWidth="1.5" />
              <text x="300" y="100" fill="#AAAAAA" fontSize="9" fontFamily="monospace" textAnchor="middle">
                LEVEL 02 // EXECUTIVE MEZZANINE
              </text>
            </motion.g>

            {/* Vertical Stairwell Shaft Connecting Floors */}
            <line x1="250" y1="130" x2="250" y2="245" stroke="#FF5A1F" strokeWidth="1.5" strokeDasharray="3 3" />
            <line x1="280" y1="145" x2="280" y2="260" stroke="#FF5A1F" strokeWidth="1.5" strokeDasharray="3 3" />

            {/* 3D Evacuation Route Traversing Mezzanine to Ground */}
            <motion.path
              d="M 230 115 L 265 135 L 265 245 L 300 262 L 480 220"
              stroke="#FF5A1F"
              strokeWidth="4"
              strokeLinecap="round"
              filter="url(#evac-laser-glow)"
              fill="none"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 2.8, repeat: Infinity, repeatDelay: 0.6, ease: 'easeInOut' }}
            />

            {/* 3D Flow particle */}
            <motion.circle
              r="4"
              fill="#FFFFFF"
              filter="url(#evac-laser-glow)"
              animate={{
                cx: [230, 265, 265, 300, 480],
                cy: [115, 135, 245, 262, 220],
                opacity: [0, 1, 1, 1, 0],
              }}
              transition={{ duration: 2.8, repeat: Infinity, repeatDelay: 0.6, ease: 'easeInOut' }}
            />

            {/* Start Beacon on Upper Level */}
            <circle cx="230" cy="115" r="5" fill="#FF5A1F" />
            <text x="230" y="98" fill="#FF5A1F" fontSize="8" fontWeight="bold" fontFamily="monospace" textAnchor="middle">
              ORIGIN [LVL 02]
            </text>

            {/* Exit Beacon at Ground Egress */}
            <g transform="translate(470, 205)">
              <rect width="45" height="22" fill="#16A34A" rx="3" />
              <text x="22" y="14" fill="#FFFFFF" fontSize="8" fontWeight="bold" fontFamily="monospace" textAnchor="middle">
                GROUND EXIT
              </text>
            </g>
          </g>
        )}
      </svg>

      {/* Bottom Technical Spec Bar */}
      <div className="absolute bottom-3 inset-x-4 sm:inset-x-6 flex items-center justify-between font-mono text-[9px] text-[#666666] border-t border-[#1C1C1C] pt-2 pointer-events-none">
        <div className="flex items-center gap-3">
          <span className="w-1.5 h-1.5 bg-[#FF5A1F] rounded-full" />
          <span>REAL-TIME EGRESS SIMULATOR</span>
        </div>
        <span className="text-[#FF5A1F]">WAYFINDING PRECISION: 100%</span>
      </div>
    </div>
  );
};
