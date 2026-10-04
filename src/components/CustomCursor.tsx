import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'motion/react';

type CursorType = 'default' | 'pointer' | 'text' | 'drag' | 'explore';

export const CustomCursor: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isMouseDown, setIsMouseDown] = useState(false);
  const [cursorType, setCursorType] = useState<CursorType>('default');
  const [cursorText, setCursorText] = useState<string>('');
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const [isTouchDevice, setIsTouchDevice] = useState(true);

  // Exact mouse position
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Smooth spring-damped follower for outer technical reticle
  const smoothOptions = { stiffness: 350, damping: 28, mass: 0.5 };
  const smoothX = useSpring(mouseX, smoothOptions);
  const smoothY = useSpring(mouseY, smoothOptions);

  // Faster spring for inner precision core
  const coreOptions = { stiffness: 800, damping: 35, mass: 0.1 };
  const coreX = useSpring(mouseX, coreOptions);
  const coreY = useSpring(mouseY, coreOptions);

  useEffect(() => {
    // Detect touch / fine pointer
    const isTouch = window.matchMedia('(pointer: coarse)').matches;
    setIsTouchDevice(isTouch);
    if (isTouch) return;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      setCoords({ x: e.clientX, y: e.clientY });

      if (!isVisible) {
        setIsVisible(true);
      }

      // Check hovered element
      const target = e.target as HTMLElement | null;
      if (!target) {
        setCursorType('default');
        setCursorText('');
        return;
      }

      const customText = target.closest('[data-cursor-text]')?.getAttribute('data-cursor-text');
      const customType = target.closest('[data-cursor-type]')?.getAttribute('data-cursor-type') as CursorType | null;

      if (customText) {
        setCursorText(customText);
      } else {
        setCursorText('');
      }

      if (customType) {
        setCursorType(customType);
        return;
      }

      // Check standard interactive elements
      const isClickable = target.closest('button, a, [role="button"], input[type="submit"], input[type="button"], .cursor-pointer');
      const isTextInput = target.closest('input[type="text"], input[type="email"], textarea');
      const isSlider = target.closest('input[type="range"]');

      if (isSlider) {
        setCursorType('drag');
      } else if (isTextInput) {
        setCursorType('text');
      } else if (isClickable) {
        setCursorType('pointer');
      } else {
        setCursorType('default');
      }
    };

    const handleMouseDown = () => setIsMouseDown(true);
    const handleMouseUp = () => setIsMouseDown(false);
    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    document.documentElement.addEventListener('mouseleave', handleMouseLeave);
    document.documentElement.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      document.documentElement.removeEventListener('mouseleave', handleMouseLeave);
      document.documentElement.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, [mouseX, mouseY, isVisible]);

  if (isTouchDevice || !isVisible) {
    return null;
  }

  // Determine sizing and animation based on cursor state
  const isPointer = cursorType === 'pointer';
  const isText = cursorType === 'text';
  const isDrag = cursorType === 'drag';
  const hasCustomText = Boolean(cursorText);

  return (
    <div
      id="technical-cursor-layer"
      className="fixed inset-0 pointer-events-none z-[9999] overflow-hidden"
      aria-hidden="true"
    >
      {/* 1. Center Precision Dot (Zero-Lag Inner Core) */}
      <motion.div
        className="fixed top-0 left-0 w-2 h-2 -ml-1 -mt-1 bg-[#FF5A1F] pointer-events-none z-20 shadow-[0_0_8px_#FF5A1F]"
        style={{
          x: coreX,
          y: coreY,
        }}
        animate={{
          scale: isMouseDown ? 1.8 : isPointer ? 0.6 : isText ? 0 : 1,
          rotate: isMouseDown ? 45 : 0,
          borderRadius: '9999px',
        }}
        transition={{ duration: 0.15, ease: 'easeOut' }}
      />

      {/* 2. Outer Technical Follower Reticle & HUD Ring */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-10 flex items-center justify-center"
        style={{
          x: smoothX,
          y: smoothY,
        }}
      >
        {/* Reticle Body Container */}
        <motion.div
          className="relative flex items-center justify-center"
          animate={{
            width: hasCustomText
              ? 84
              : isPointer
              ? 48
              : isDrag
              ? 54
              : isText
              ? 4
              : isMouseDown
              ? 26
              : 32,
            height: hasCustomText
              ? 84
              : isPointer
              ? 48
              : isDrag
              ? 34
              : isText
              ? 26
              : isMouseDown
              ? 26
              : 32,
            x: hasCustomText
              ? -42
              : isPointer
              ? -24
              : isDrag
              ? -27
              : isText
              ? -2
              : isMouseDown
              ? -13
              : -16,
            y: hasCustomText
              ? -42
              : isPointer
              ? -24
              : isDrag
              ? -17
              : isText
              ? -13
              : isMouseDown
              ? -13
              : -16,
          }}
          transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* A. Standard / Default State: Circular Technical Ring */}
          {!isText && (
            <motion.div
              className={`absolute inset-0 rounded-full border transition-colors duration-200 ${
                isPointer || hasCustomText
                  ? 'border-[#FF5A1F] bg-[#FF5A1F]/10 shadow-[0_0_20px_rgba(255,90,31,0.25)]'
                  : isMouseDown
                  ? 'border-[#FF5A1F] bg-[#FF5A1F]/20'
                  : 'border-[#F2F0EA]/30 bg-transparent'
              }`}
              animate={{
                scale: isMouseDown ? 0.9 : 1,
                rotate: isPointer ? 90 : 0,
              }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
            />
          )}

          {/* B. Text Mode: Sleek Technical I-Beam Cursor */}
          {isText && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="w-[2px] h-full bg-[#FF5A1F] shadow-[0_0_8px_#FF5A1F]"
            />
          )}

          {/* C. Pointer Mode: Technical Corner Crosshairs */}
          {isPointer && !hasCustomText && (
            <>
              <div className="absolute -top-1 -left-1 w-1.5 h-1.5 border-t-2 border-l-2 border-[#FF5A1F]" />
              <div className="absolute -top-1 -right-1 w-1.5 h-1.5 border-t-2 border-r-2 border-[#FF5A1F]" />
              <div className="absolute -bottom-1 -left-1 w-1.5 h-1.5 border-b-2 border-l-2 border-[#FF5A1F]" />
              <div className="absolute -bottom-1 -right-1 w-1.5 h-1.5 border-b-2 border-r-2 border-[#FF5A1F]" />
            </>
          )}

          {/* D. Drag Mode Indicator */}
          {isDrag && (
            <div className="flex items-center justify-between w-full px-2 text-[#FF5A1F] font-mono text-[10px] font-bold">
              <span>‹</span>
              <span className="text-[8px] tracking-widest uppercase">DRAG</span>
              <span>›</span>
            </div>
          )}

          {/* E. Custom Text Badge (e.g. "VIEW", "EXPLORE") */}
          {hasCustomText && (
            <div className="font-mono text-[9px] font-bold tracking-widest text-[#F2F0EA] uppercase px-3 py-1 bg-[#0D0D0D] border border-[#FF5A1F] rounded-full shadow-[0_0_15px_rgba(255,90,31,0.5)]">
              {cursorText}
            </div>
          )}
        </motion.div>

        {/* 3. Subtle Technical Coordinate Telemetry HUD (Follows cursor smoothly) */}
        {!isPointer && !isText && !hasCustomText && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.6 }}
            className="absolute left-6 top-3 font-mono text-[8px] text-[#777777] whitespace-nowrap tracking-wider flex items-center gap-1.5"
          >
            <span className="w-1.5 h-1.5 bg-[#FF5A1F]/70 rounded-full" />
            <span>
              {coords.x.toString().padStart(4, '0')},{coords.y.toString().padStart(4, '0')}
            </span>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};
