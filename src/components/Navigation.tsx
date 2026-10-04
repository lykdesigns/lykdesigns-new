import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, Menu, X, ArrowUpRight } from 'lucide-react';
import { motion } from 'motion/react';
import { soundManager } from '../utils/audio';

interface NavigationProps {
  onOpenProjectModal: () => void;
}

export const Navigation: React.FC<NavigationProps> = ({ onOpenProjectModal }) => {
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const [isMuted, setIsMuted] = useState<boolean>(soundManager.isMuted());
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleToggleSound = () => {
    const state = soundManager.toggleMuted();
    setIsMuted(state);
    if (!state) soundManager.tick();
  };

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    soundManager.tick();
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-[#0D0D0D]/85 backdrop-blur-md py-3.5 border-b border-[#222222]'
            : 'bg-transparent py-5 sm:py-7 border-b border-white/5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Brand Logo / Left */}
          <div className="flex items-center gap-4">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => {
                soundManager.tick();
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="group flex items-center gap-3 text-left focus:outline-none cursor-pointer"
            >
              <div className="text-2xl font-black tracking-tighter text-[#F2F0EA] flex items-center gap-1">
                <span>LYK</span>
                <span className="w-1.5 h-1.5 bg-[#FF5A1F] rounded-full group-hover:scale-150 transition-transform duration-300" />
              </div>
              <div className="hidden sm:block border-l border-[#222222] pl-3">
                <span className="font-mono text-[9px] uppercase tracking-widest text-[#777777] block group-hover:text-[#AAAAAA] transition-colors">
                  VISUAL DESIGN STUDIO
                </span>
              </div>
            </motion.button>
          </div>

          {/* Desktop Navigation Links / Right */}
          <nav className="hidden md:flex items-center gap-8 text-[10px] tracking-[0.2em] font-medium text-[#777777]">
            <motion.button
              whileHover={{ scale: 1.05, color: '#F2F0EA' }}
              whileTap={{ scale: 0.95 }}
              onClick={() => scrollToSection('services')}
              className="hover:text-[#F2F0EA] transition-colors focus:outline-none uppercase cursor-pointer relative py-1"
            >
              SERVICES
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05, color: '#F2F0EA' }}
              whileTap={{ scale: 0.95 }}
              onClick={() => scrollToSection('philosophy')}
              className="hover:text-[#F2F0EA] transition-colors focus:outline-none uppercase cursor-pointer relative py-1"
            >
              ABOUT
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05, color: '#F2F0EA' }}
              whileTap={{ scale: 0.95 }}
              onClick={() => scrollToSection('process')}
              className="hover:text-[#F2F0EA] transition-colors focus:outline-none uppercase cursor-pointer relative py-1"
            >
              PROCESS
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05, color: '#F2F0EA' }}
              whileTap={{ scale: 0.95 }}
              onClick={() => scrollToSection('contact')}
              className="hover:text-[#F2F0EA] transition-colors focus:outline-none uppercase cursor-pointer relative py-1"
            >
              CONTACT
            </motion.button>

            {/* Sound toggle */}
            <motion.button
              whileHover={{ scale: 1.15, backgroundColor: '#FFFFFF', borderColor: '#FFFFFF' }}
              whileTap={{ scale: 0.92 }}
              onClick={handleToggleSound}
              title={isMuted ? 'Enable tactile sound' : 'Mute tactile sound'}
              className="group p-2 text-[#777777] hover:text-black border border-[#222222] bg-[#141414] rounded-lg transition-colors duration-200 cursor-pointer shadow-sm"
            >
              {isMuted ? (
                <VolumeX className="w-3.5 h-3.5 group-hover:text-black transition-colors" />
              ) : (
                <Volume2 className="w-3.5 h-3.5 text-[#FF5A1F] group-hover:text-black transition-colors" />
              )}
            </motion.button>

            {/* Primary CTA */}
            <motion.button
              whileHover={{ scale: 1.09, y: -2 }}
              whileTap={{ scale: 0.96 }}
              transition={{ type: 'spring', stiffness: 400, damping: 25 }}
              onClick={() => {
                soundManager.switchMode();
                onOpenProjectModal();
              }}
              className="group relative overflow-hidden bg-[#FF5A1F] text-[#0D0D0D] px-6 py-2.5 font-bold tracking-normal text-xs rounded-full hover:bg-white hover:text-black hover:shadow-[0_0_35px_rgba(255,255,255,0.65)] transition-colors duration-200 ml-2 inline-flex items-center gap-1.5 shadow-sm cursor-pointer"
            >
              {/* Shimmer sweep */}
              <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-black/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out pointer-events-none" />
              <span>START A PROJECT →</span>
            </motion.button>
          </nav>

          {/* Mobile Right Controls */}
          <div className="flex md:hidden items-center gap-2">
            <motion.button
              whileHover={{ scale: 1.15, backgroundColor: '#FFFFFF', borderColor: '#FFFFFF' }}
              whileTap={{ scale: 0.92 }}
              onClick={handleToggleSound}
              className="group p-2 text-[#777777] hover:text-black border border-[#2B2B2B] bg-[#141414] rounded-lg cursor-pointer transition-colors"
            >
              {isMuted ? (
                <VolumeX className="w-4 h-4 group-hover:text-black transition-colors" />
              ) : (
                <Volume2 className="w-4 h-4 text-[#FF5A1F] group-hover:text-black transition-colors" />
              )}
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.15, backgroundColor: '#FFFFFF', borderColor: '#FFFFFF' }}
              whileTap={{ scale: 0.92 }}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="group p-2 text-[#F2F0EA] hover:text-black border border-[#2B2B2B] bg-[#141414] rounded-lg cursor-pointer transition-colors"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? (
                <X className="w-5 h-5 group-hover:text-black transition-colors" />
              ) : (
                <Menu className="w-5 h-5 group-hover:text-black transition-colors" />
              )}
            </motion.button>
          </div>
        </div>
      </header>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-[#0D0D0D]/95 backdrop-blur-lg pt-24 px-6 md:hidden blueprint-grid flex flex-col justify-between pb-10">
          <div className="space-y-6">
            <div className="text-[10px] font-mono text-[#FF5A1F] uppercase tracking-widest border-b border-[#222222] pb-2">
              INDEX // NAVIGATION
            </div>
            <div className="flex flex-col gap-4">
              <button
                onClick={() => scrollToSection('services')}
                className="text-left font-display text-2xl font-bold text-[#F2F0EA] hover:text-white hover:translate-x-2 transition-transform"
              >
                <span className="text-[#777777] font-mono text-sm mr-3">01/</span> SERVICES
              </button>
              <button
                onClick={() => scrollToSection('philosophy')}
                className="text-left font-display text-2xl font-bold text-[#F2F0EA] hover:text-white hover:translate-x-2 transition-transform"
              >
                <span className="text-[#777777] font-mono text-sm mr-3">02/</span> ABOUT
              </button>
              <button
                onClick={() => scrollToSection('process')}
                className="text-left font-display text-2xl font-bold text-[#F2F0EA] hover:text-white hover:translate-x-2 transition-transform"
              >
                <span className="text-[#777777] font-mono text-sm mr-3">03/</span> PROCESS
              </button>
              <button
                onClick={() => scrollToSection('contact')}
                className="text-left font-display text-2xl font-bold text-[#F2F0EA] hover:text-white hover:translate-x-2 transition-transform"
              >
                <span className="text-[#777777] font-mono text-sm mr-3">04/</span> CONTACT
              </button>
            </div>
          </div>

          <div className="pt-8 border-t border-[#222222] space-y-4">
            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenProjectModal();
              }}
              className="w-full py-4 bg-[#FF5A1F] text-black hover:bg-white font-display font-bold text-sm tracking-wider uppercase text-center flex items-center justify-center gap-2 rounded-xl transition-colors cursor-pointer"
            >
              <span>START A PROJECT</span>
              <ArrowUpRight className="w-4 h-4" />
            </motion.button>
            <div className="text-center font-mono text-[10px] text-[#666666]">
              DESIGN THAT MAKES THINGS CLEAR // 2026
            </div>
          </div>
        </div>
      )}
    </>
  );
};
