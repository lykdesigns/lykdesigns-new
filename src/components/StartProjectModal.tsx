import React, { useState } from 'react';
import { motion } from 'motion/react';
import { X, Check, ArrowUpRight, Compass, Layers, Monitor, PenTool, Copy, CheckCheck } from 'lucide-react';
import confetti from 'canvas-confetti';
import { DisciplineId } from '../types';
import { soundManager } from '../utils/audio';

interface StartProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const StartProjectModal: React.FC<StartProjectModalProps> = ({ isOpen, onClose }) => {
  const [selectedDisciplines, setSelectedDisciplines] = useState<DisciplineId[]>(['space']);
  const [timeline, setTimeline] = useState<string>('2-4 Weeks');
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [company, setCompany] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [isCopied, setIsCopied] = useState<boolean>(false);

  if (!isOpen) return null;

  const toggleDiscipline = (id: DisciplineId) => {
    soundManager.tick();
    if (selectedDisciplines.includes(id)) {
      if (selectedDisciplines.length > 1) {
        setSelectedDisciplines(selectedDisciplines.filter((d) => d !== id));
      }
    } else {
      setSelectedDisciplines([...selectedDisciplines, id]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;

    setIsSubmitting(true);
    soundManager.pulse();

    const payload = {
      disciplines: selectedDisciplines,
      timeline,
      name,
      email,
      phone,
      company,
      description,
    };

    try {
      await fetch(
        'https://script.google.com/macros/s/AKfycbzoB-HDDGEvsaedXRtD7TpHTinesbJxqwPcqAi6LRpSnFMiO6R-_FzLqCAExKj9VySt/exec',
        {
          method: 'POST',
          mode: 'no-cors',
          headers: {
            'Content-Type': 'text/plain;charset=utf-8',
          },
          body: JSON.stringify(payload),
        }
      );

      setIsSubmitted(true);
      try {
        confetti({
          particleCount: 60,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#FF5A1F', '#F2F0EA', '#777777'],
        });
      } catch {
        // Ignore confetti errors
      }
    } catch (error) {
      console.error('Error submitting form to Google Apps Script:', error);
      alert('Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const disciplinesConfig = [
    { id: 'space' as DisciplineId, label: '01 / EVACUATION PLANS', icon: Compass, sub: '2D & 3D Architectural Safety' },
    { id: 'identity' as DisciplineId, label: '02 / BRAND DESIGN', icon: Layers, sub: 'Logomark & Visual Systems' },
    { id: 'digital' as DisciplineId, label: '03 / WEB DESIGN', icon: Monitor, sub: 'High-Performance UI/UX' },
    { id: 'art' as DisciplineId, label: '04 / VECTOR ART', icon: PenTool, sub: 'Precision Illustration & Assets' },
  ];

  const briefSummary = `PROJECT INQUIRY — LYK DESIGNS
Disciplines: ${selectedDisciplines.join(', ').toUpperCase()}
Timeline: ${timeline}
Client: ${name || 'N/A'}
Email: ${email || 'N/A'}
Phone: ${phone || 'N/A'}
Organization: ${company || 'N/A'}
Scope Details: ${description || 'No additional notes provided.'}`;

  const copyBrief = () => {
    navigator.clipboard.writeText(briefSummary);
    setIsCopied(true);
    soundManager.tick();
    setTimeout(() => setIsCopied(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-md">
      <div className="relative w-full max-w-3xl bg-[#111111] border border-[#2B2B2B] rounded-2xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col">
        {/* Header Bar */}
        <div className="bg-[#171717] px-6 py-4 border-b border-[#242424] flex items-center justify-between font-mono text-xs text-[#777777]">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 bg-[#FF5A1F] rounded-full" />
            <span className="text-[#F2F0EA] font-semibold">PROJECT COMMISSION BRIEF // LYK DESIGNS</span>
          </div>
          <motion.button
            whileHover={{ scale: 1.15, rotate: 90, backgroundColor: '#FFFFFF', color: '#000000', borderColor: '#FFFFFF', transition: { duration: 0.12, ease: 'easeOut' } }}
            whileTap={{ scale: 0.9, transition: { duration: 0.08 } }}
            onClick={() => {
              soundManager.tick();
              onClose();
            }}
            className="p-1.5 text-[#888888] hover:text-black border border-[#333333] hover:border-white hover:bg-white bg-[#111111] rounded-lg cursor-pointer transition-colors duration-150"
          >
            <X className="w-4 h-4" />
          </motion.button>
        </div>

        {/* Scrollable Content */}
        <div className="p-6 sm:p-8 overflow-y-auto blueprint-grid flex-1">
          {!isSubmitted ? (
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Step 1: Select Disciplines */}
              <div className="space-y-3">
                <label className="font-mono text-xs text-[#FF5A1F] uppercase tracking-wider block">
                  01 // SELECT REQUIRED DISCIPLINES
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {disciplinesConfig.map((item) => {
                    const isSelected = selectedDisciplines.includes(item.id);
                    const Icon = item.icon;
                    return (
                      <motion.div
                        key={item.id}
                        whileHover={{ scale: 1.04, y: -2 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => toggleDiscipline(item.id)}
                        className={`p-4 border cursor-pointer transition-all flex items-start justify-between rounded-xl ${
                          isSelected
                            ? 'bg-[#1C1C1C] border-[#FF5A1F] text-[#F2F0EA] shadow-[0_0_15px_rgba(255,90,31,0.2)]'
                            : 'bg-[#141414] border-[#262626] text-[#777777] hover:border-[#666666]'
                        }`}
                      >
                        <div className="space-y-1">
                          <div className="font-mono text-[11px] font-bold">{item.label}</div>
                          <div className="text-xs text-[#888888]">{item.sub}</div>
                        </div>
                        <div
                          className={`w-5 h-5 border flex items-center justify-center rounded-md ${
                            isSelected
                              ? 'bg-[#FF5A1F] border-[#FF5A1F] text-black'
                              : 'border-[#444444]'
                          }`}
                        >
                          {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </div>

              {/* Step 2: Timeline Target */}
              <div className="space-y-3">
                <label className="font-mono text-xs text-[#FF5A1F] uppercase tracking-wider block">
                  02 // ESTIMATED TIMELINE
                </label>
                <div className="grid grid-cols-3 gap-3">
                  {['Urgent (< 2 Wks)', '2-4 Weeks', 'Flexible (> 1 Mo)'].map((t) => (
                    <motion.button
                      type="button"
                      key={t}
                      whileHover={{ scale: 1.12, y: -2, backgroundColor: '#FFFFFF', color: '#000000', borderColor: '#FFFFFF', transition: { duration: 0.12, ease: 'easeOut' } }}
                      whileTap={{ scale: 0.96, transition: { duration: 0.08 } }}
                      onClick={() => {
                        soundManager.tick();
                        setTimeline(t);
                      }}
                      className={`p-3 text-center font-mono text-xs border rounded-xl cursor-pointer transition-colors duration-150 ${
                        timeline === t
                          ? 'bg-[#FF5A1F] text-black border-[#FF5A1F] font-bold shadow-[0_0_12px_rgba(255,90,31,0.3)]'
                          : 'bg-[#141414] text-[#888888] border-[#262626] hover:border-white hover:text-black hover:bg-white'
                      }`}
                    >
                      {t}
                    </motion.button>
                  ))}
                </div>
              </div>

              {/* Step 3: Client Information */}
              <div className="space-y-3">
                <label className="font-mono text-xs text-[#FF5A1F] uppercase tracking-wider block">
                  03 // CLIENT INFORMATION
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <input
                      required
                      type="text"
                      placeholder="Your Name *"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full p-3 bg-[#141414] border border-[#2B2B2B] rounded-xl text-[#F2F0EA] placeholder-[#555555] font-mono text-xs focus:outline-none focus:border-[#FF5A1F] transition-colors"
                    />
                  </div>
                  <div>
                    <input
                      required
                      type="email"
                      placeholder="Email Address *"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full p-3 bg-[#141414] border border-[#2B2B2B] rounded-xl text-[#F2F0EA] placeholder-[#555555] font-mono text-xs focus:outline-none focus:border-[#FF5A1F] transition-colors"
                    />
                  </div>
                  <div>
                    <input
                      type="tel"
                      placeholder="Phone Number (e.g. +1 555-0199)"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      autoComplete="tel"
                      className="w-full p-3 bg-[#141414] border border-[#2B2B2B] rounded-xl text-[#F2F0EA] placeholder-[#555555] font-mono text-xs focus:outline-none focus:border-[#FF5A1F] transition-colors"
                    />
                  </div>
                  <div>
                    <input
                      type="text"
                      placeholder="Company / Architectural Entity"
                      value={company}
                      onChange={(e) => setCompany(e.target.value)}
                      className="w-full p-3 bg-[#141414] border border-[#2B2B2B] rounded-xl text-[#F2F0EA] placeholder-[#555555] font-mono text-xs focus:outline-none focus:border-[#FF5A1F] transition-colors"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <textarea
                      rows={3}
                      placeholder="Project details, square footage, brand vision, or special requirements..."
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      className="w-full p-3 bg-[#141414] border border-[#2B2B2B] rounded-xl text-[#F2F0EA] placeholder-[#555555] font-mono text-xs focus:outline-none focus:border-[#FF5A1F]"
                    />
                  </div>
                </div>
              </div>

              {/* Submit Action */}
              <div className="pt-4 border-t border-[#222222] flex items-center justify-between">
                <div className="font-mono text-[10px] text-[#666666]">
                  DIRECT ROUTING // LYKDESIGNS.COM
                </div>
                <motion.button
                  whileHover={isSubmitting ? {} : { scale: 1.09, y: -2, transition: { duration: 0.12, ease: 'easeOut' } }}
                  whileTap={isSubmitting ? {} : { scale: 0.95, transition: { duration: 0.08 } }}
                  type="submit"
                  disabled={isSubmitting}
                  className="group relative overflow-hidden px-8 py-3.5 bg-[#FF5A1F] text-black font-display font-bold text-xs tracking-widest uppercase hover:bg-white hover:text-black hover:shadow-[0_0_35px_rgba(255,255,255,0.7)] transition-colors duration-150 flex items-center gap-2 rounded-full cursor-pointer shadow-[0_0_25px_rgba(255,90,31,0.4)] disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-black/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out pointer-events-none" />
                  <span>{isSubmitting ? "TRANSMITTING..." : "SUBMIT PROJECT BRIEF"}</span>
                  <ArrowUpRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1 group-hover:-translate-y-1" />
                </motion.button>
              </div>
            </form>
          ) : (
            <div className="py-8 space-y-6 text-center">
              <div className="w-12 h-12 bg-[#FF5A1F] text-black mx-auto flex items-center justify-center font-bold rounded-full">
                <Check className="w-6 h-6 stroke-[3]" />
              </div>

              <div className="space-y-2">
                <h3 className="font-display font-bold text-3xl text-[#F2F0EA]">
                  BRIEF TRANSMITTED.
                </h3>
                <p className="text-sm text-[#AAAAAA] max-w-md mx-auto">
                  Thank you, <span className="text-[#FF5A1F] font-semibold">{name || 'Partner'}</span>. Your commission specs have been received by LYK Designs Studio.
                </p>
              </div>

              {/* Brief Code Box */}
              <div className="p-4 bg-[#0D0D0D] border border-[#262626] rounded-xl text-left font-mono text-xs text-[#888888] space-y-2 relative">
                <div className="flex justify-between items-center text-[#555555] border-b border-[#222222] pb-2 text-[10px]">
                  <span>SPECIFICATION RECEIPT</span>
                  <motion.button
                    whileHover={{ scale: 1.15, color: '#FFFFFF', transition: { duration: 0.12, ease: 'easeOut' } }}
                    whileTap={{ scale: 0.94, transition: { duration: 0.08 } }}
                    onClick={copyBrief}
                    className="flex items-center gap-1 text-[#FF5A1F] hover:text-white cursor-pointer font-mono transition-colors duration-150"
                  >
                    {isCopied ? <CheckCheck className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{isCopied ? 'COPIED' : 'COPY BRIEF'}</span>
                  </motion.button>
                </div>
                <pre className="whitespace-pre-wrap font-mono text-[11px] text-[#CCCCCC]">
                  {briefSummary}
                </pre>
              </div>

              <div className="pt-4 flex justify-center gap-4">
                <motion.button
                  whileHover={{ scale: 1.12, y: -2, borderColor: '#FFFFFF', backgroundColor: '#FFFFFF', color: '#000000', transition: { duration: 0.12, ease: 'easeOut' } }}
                  whileTap={{ scale: 0.95, transition: { duration: 0.08 } }}
                  onClick={() => {
                    setIsSubmitted(false);
                    onClose();
                  }}
                  className="px-6 py-3 bg-[#1A1A1A] border border-[#333333] text-[#F2F0EA] hover:bg-white hover:text-black hover:border-white font-mono text-xs uppercase rounded-full transition-colors duration-150 cursor-pointer"
                >
                  RETURN TO STUDIO
                </motion.button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
