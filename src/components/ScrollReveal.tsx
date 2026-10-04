import React, { useRef } from 'react';
import { motion, useInView, Variant } from 'motion/react';

export type ScrollRevealEffect = 
  | 'fade-up' 
  | 'fade-down' 
  | 'fade-left' 
  | 'fade-right' 
  | 'zoom-in' 
  | 'blur-reveal'
  | 'mask-reveal';

interface ScrollRevealProps {
  children: React.ReactNode;
  effect?: ScrollRevealEffect;
  delay?: number;
  duration?: number;
  distance?: number;
  threshold?: number;
  once?: boolean;
  className?: string;
  id?: string;
}

export const ScrollReveal: React.FC<ScrollRevealProps> = ({
  children,
  effect = 'fade-up',
  delay = 0,
  duration = 0.7,
  distance = 36,
  threshold = 0.15,
  once = false,
  className = '',
  id,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once, amount: threshold });

  const getVariants = (): { hidden: Variant; visible: Variant } => {
    switch (effect) {
      case 'fade-down':
        return {
          hidden: { opacity: 0, y: -distance, filter: 'blur(4px)' },
          visible: { opacity: 1, y: 0, filter: 'blur(0px)' },
        };
      case 'fade-left':
        return {
          hidden: { opacity: 0, x: distance, filter: 'blur(4px)' },
          visible: { opacity: 1, x: 0, filter: 'blur(0px)' },
        };
      case 'fade-right':
        return {
          hidden: { opacity: 0, x: -distance, filter: 'blur(4px)' },
          visible: { opacity: 1, x: 0, filter: 'blur(0px)' },
        };
      case 'zoom-in':
        return {
          hidden: { opacity: 0, scale: 0.92, filter: 'blur(6px)' },
          visible: { opacity: 1, scale: 1, filter: 'blur(0px)' },
        };
      case 'blur-reveal':
        return {
          hidden: { opacity: 0, y: distance * 0.7, filter: 'blur(12px)' },
          visible: { opacity: 1, y: 0, filter: 'blur(0px)' },
        };
      case 'mask-reveal':
        return {
          hidden: { 
            opacity: 0, 
            clipPath: 'polygon(0 100%, 100% 100%, 100% 100%, 0% 100%)',
            y: distance * 0.5 
          },
          visible: { 
            opacity: 1, 
            clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0% 100%)',
            y: 0 
          },
        };
      case 'fade-up':
      default:
        return {
          hidden: { opacity: 0, y: distance, filter: 'blur(4px)' },
          visible: { opacity: 1, y: 0, filter: 'blur(0px)' },
        };
    }
  };

  const variants = getVariants();

  return (
    <motion.div
      id={id}
      ref={ref}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      variants={variants}
      transition={{
        duration,
        delay,
        ease: [0.16, 1, 0.3, 1],
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};
