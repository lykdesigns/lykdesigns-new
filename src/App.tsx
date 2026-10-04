import React, { useState } from 'react';
import { CustomCursor } from './components/CustomCursor';
import { ScrollProgress } from './components/ScrollProgress';
import { Navigation } from './components/Navigation';
import { HeroSection } from './components/HeroSection';
import { SignatureMotionLine } from './components/SignatureMotionLine';
import { TransitionSection } from './components/TransitionSection';
import { ServicesSection } from './components/ServicesSection';
import { TypographyTakeover } from './components/TypographyTakeover';
import { PhilosophySection } from './components/PhilosophySection';
import { ExperienceSection } from './components/ExperienceSection';
import { ProcessSection } from './components/ProcessSection';
import { WebDesignFeature } from './components/WebDesignFeature';
import { FinalCTA } from './components/FinalCTA';
import { Footer } from './components/Footer';
import { StartProjectModal } from './components/StartProjectModal';

export default function App() {
  const [isProjectModalOpen, setIsProjectModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#0D0D0D] text-[#F2F0EA] flex flex-col antialiased selection:bg-[#FF5A1F] selection:text-black">
      {/* Precision Technical Custom Cursor */}
      <CustomCursor />

      {/* Viewport Scroll Progress Bar */}
      <ScrollProgress />

      {/* Fixed Minimal Navigation */}
      <Navigation onOpenProjectModal={() => setIsProjectModalOpen(true)} />

      {/* Main Content Sections */}
      <main className="flex-1">
        {/* Hero Section */}
        <HeroSection onOpenProjectModal={() => setIsProjectModalOpen(true)} />

        {/* Recurring Signature Motion Line Waypoint */}
        <SignatureMotionLine />

        {/* Transition Typography Section */}
        <TransitionSection />

        {/* 4 Core Disciplines Services Section */}
        <ServicesSection onOpenProjectModal={() => setIsProjectModalOpen(true)} />

        {/* Typography Takeover Full-Screen Sequence */}
        <TypographyTakeover />

        {/* Philosophy Section */}
        <PhilosophySection />

        {/* Experience & Statistics Section */}
        <ExperienceSection />

        {/* Process Timeline Section */}
        <ProcessSection />

        {/* Dedicated Web Design Feature Section */}
        <WebDesignFeature onOpenProjectModal={() => setIsProjectModalOpen(true)} />

        {/* Final Dramatic CTA */}
        <FinalCTA onOpenProjectModal={() => setIsProjectModalOpen(true)} />
      </main>

      {/* Minimal Footer */}
      <Footer onOpenProjectModal={() => setIsProjectModalOpen(true)} />

      {/* Interactive Project Brief & Commission Modal */}
      <StartProjectModal
        isOpen={isProjectModalOpen}
        onClose={() => setIsProjectModalOpen(false)}
      />
    </div>
  );
}
