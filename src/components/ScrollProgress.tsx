import React from 'react';
import { motion, useScroll, useSpring } from 'motion/react';

export const ScrollProgress: React.FC = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 28,
    restDelta: 0.001,
  });

  return (
    <div
      id="scroll-progress-indicator"
      className="fixed top-0 left-0 right-0 z-[100] h-[3px] bg-transparent pointer-events-none"
    >
      {/* Background track line */}
      <div className="absolute inset-0 bg-[#222222]/30" />

      {/* Signature Orange Progress Bar */}
      <motion.div
        className="h-full bg-[#FF5A1F] origin-left shadow-[0_0_12px_rgba(255,90,31,0.8)] relative"
        style={{ scaleX }}
      >
        {/* Leading Laser Glow Head */}
        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2.5 h-2.5 bg-[#FFF0EB] rounded-full blur-[1px] shadow-[0_0_8px_#FF5A1F]" />
      </motion.div>
    </div>
  );
};
