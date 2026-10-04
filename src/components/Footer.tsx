import React, { useRef } from 'react';
import { motion, useInView } from 'motion/react';
import { ArrowUp, ArrowUpRight } from 'lucide-react';
import { soundManager } from '../utils/audio';

interface FooterProps {
  onOpenProjectModal: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenProjectModal }) => {
  const footerRef = useRef<HTMLElement>(null);
  const isInView = useInView(footerRef, { once: false, amount: 0.15 });

  const scrollToTop = () => {
    soundManager.tick();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToSection = (id: string) => {
    soundManager.tick();
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer ref={footerRef} className="relative bg-[#0A0A0A] border-t border-[#222222] text-[#F2F0EA] pt-20 pb-12 overflow-hidden">
      {/* Blueprint grid background */}
      <div className="absolute inset-0 blueprint-grid opacity-15 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Main Grid Top */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-16 border-b border-[#222222]"
        >
          {/* Brand Column */}
          <div className="md:col-span-5 space-y-6">
            <div className="flex items-center gap-3">
              <span className="w-3 h-3 bg-[#FF5A1F] rounded-full" />
              <h3 className="font-display font-black text-5xl sm:text-6xl tracking-tighter text-[#F2F0EA]">
                LYK
              </h3>
            </div>

            <p className="font-display font-bold text-xl sm:text-2xl text-[#F2F0EA] tracking-tight">
              DESIGN THAT MAKES THINGS CLEAR.
            </p>

            <p className="text-sm text-[#888888] max-w-sm font-mono leading-relaxed">
              Transforming architectural spaces, brand identities, digital interfaces, and vector art into precise, purposeful visual experiences.
            </p>

            <div className="pt-2">
              <motion.button
                whileHover={{ scale: 1.12, y: -2, borderColor: '#FFFFFF', backgroundColor: '#FFFFFF', color: '#000000', transition: { duration: 0.12, ease: 'easeOut' } }}
                whileTap={{ scale: 0.95, transition: { duration: 0.08 } }}
                onClick={() => {
                  soundManager.switchMode();
                  onOpenProjectModal();
                }}
                className="group inline-flex items-center gap-2 px-6 py-3 bg-[#171717] border border-[#333333] text-[#F2F0EA] hover:text-black hover:bg-white hover:border-white font-mono text-xs uppercase transition-colors duration-150 rounded-full cursor-pointer shadow-lg"
              >
                <span>STUDIO INQUIRIES</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-[#FF5A1F] group-hover:text-black transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </motion.button>
            </div>
          </div>

          {/* Links Columns */}
          <div className="md:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-8">
            {/* Column 1: SERVICES */}
            <div className="space-y-4">
              <div className="font-mono text-[11px] text-[#FF5A1F] uppercase tracking-widest">
                SERVICES
              </div>
              <ul className="space-y-2.5 font-mono text-xs text-[#AAAAAA]">
                <li>
                  <motion.button
                    whileHover={{ x: 4, color: '#F2F0EA' }}
                    onClick={() => scrollToSection('service-space')}
                    className="transition-colors cursor-pointer text-left"
                  >
                    Evacuation Plans
                  </motion.button>
                </li>
                <li>
                  <motion.button
                    whileHover={{ x: 4, color: '#F2F0EA' }}
                    onClick={() => scrollToSection('service-identity')}
                    className="transition-colors cursor-pointer text-left"
                  >
                    Branding
                  </motion.button>
                </li>
                <li>
                  <motion.button
                    whileHover={{ x: 4, color: '#F2F0EA' }}
                    onClick={() => scrollToSection('service-digital')}
                    className="transition-colors cursor-pointer text-left"
                  >
                    Web Design
                  </motion.button>
                </li>
                <li>
                  <motion.button
                    whileHover={{ x: 4, color: '#F2F0EA' }}
                    onClick={() => scrollToSection('service-art')}
                    className="transition-colors cursor-pointer text-left"
                  >
                    Vector Art
                  </motion.button>
                </li>
              </ul>
            </div>

            {/* Column 2: COMPANY */}
            <div className="space-y-4">
              <div className="font-mono text-[11px] text-[#FF5A1F] uppercase tracking-widest">
                COMPANY
              </div>
              <ul className="space-y-2.5 font-mono text-xs text-[#AAAAAA]">
                <li>
                  <motion.button
                    whileHover={{ x: 4, color: '#F2F0EA' }}
                    onClick={() => scrollToSection('philosophy')}
                    className="transition-colors cursor-pointer text-left"
                  >
                    About
                  </motion.button>
                </li>
                <li>
                  <motion.button
                    whileHover={{ x: 4, color: '#F2F0EA' }}
                    onClick={() => scrollToSection('contact')}
                    className="transition-colors cursor-pointer text-left"
                  >
                    Contact
                  </motion.button>
                </li>
                <li>
                  <motion.button
                    whileHover={{ x: 4, color: '#F2F0EA' }}
                    onClick={() => scrollToSection('process')}
                    className="transition-colors cursor-pointer text-left"
                  >
                    Process
                  </motion.button>
                </li>
                <li>
                  <motion.a
                    whileHover={{ x: 4, color: '#F2F0EA' }}
                    href="https://lykdesigns.com/"
                    target="_blank"
                    rel="noreferrer"
                    className="transition-colors flex items-center gap-1 cursor-pointer"
                  >
                    <span>lykdesigns.com</span>
                    <ArrowUpRight className="w-3 h-3 text-[#777777]" />
                  </motion.a>
                </li>
              </ul>
            </div>

            {/* Column 3: SOCIAL */}
            <div className="space-y-4">
              <div className="font-mono text-[11px] text-[#FF5A1F] uppercase tracking-widest">
                SOCIAL
              </div>
              <ul className="space-y-2.5 font-mono text-xs text-[#AAAAAA]">
                <li>
                  <motion.a
                    whileHover={{ x: 4, color: '#FF5A1F' }}
                    href="https://instagram.com"
                    target="_blank"
                    rel="noreferrer"
                    className="transition-colors flex items-center gap-1 cursor-pointer"
                  >
                    <span>Instagram</span>
                    <ArrowUpRight className="w-3 h-3 text-[#555555]" />
                  </motion.a>
                </li>
                <li>
                  <motion.a
                    whileHover={{ x: 4, color: '#FF5A1F' }}
                    href="https://linkedin.com"
                    target="_blank"
                    rel="noreferrer"
                    className="transition-colors flex items-center gap-1 cursor-pointer"
                  >
                    <span>LinkedIn</span>
                    <ArrowUpRight className="w-3 h-3 text-[#555555]" />
                  </motion.a>
                </li>
                <li>
                  <motion.a
                    whileHover={{ x: 4, color: '#FF5A1F' }}
                    href="https://behance.net"
                    target="_blank"
                    rel="noreferrer"
                    className="transition-colors flex items-center gap-1 cursor-pointer"
                  >
                    <span>Behance</span>
                    <ArrowUpRight className="w-3 h-3 text-[#555555]" />
                  </motion.a>
                </li>
              </ul>
            </div>
          </div>
        </motion.div>

        {/* Bottom Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-[11px] text-[#666666]"
        >
          <div className="flex items-center gap-3">
            <span>© 2026 LYK DESIGNS</span>
            <span className="text-[#333333]">|</span>
            <span>ALL RIGHTS RESERVED</span>
          </div>

          <div className="flex items-center gap-6">
            <span>PRECISION × CLARITY × CREATIVITY</span>
            <motion.button
              whileHover={{ scale: 1.15, y: -2, borderColor: '#FFFFFF', backgroundColor: '#FFFFFF', color: '#000000', transition: { duration: 0.12, ease: 'easeOut' } }}
              whileTap={{ scale: 0.92, transition: { duration: 0.08 } }}
              onClick={scrollToTop}
              className="flex items-center gap-1.5 text-[#F2F0EA] hover:text-black hover:bg-white hover:border-white transition-colors duration-150 border border-[#222222] px-3 py-1.5 bg-[#141414] rounded-lg cursor-pointer font-mono"
            >
              <span>TOP</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </motion.button>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};
