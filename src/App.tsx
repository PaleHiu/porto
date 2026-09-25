import React, { useEffect, useState } from 'react';
import { useDeviceOptimization } from './lib/deviceOptimization';
import { Navbar } from './components/Navbar';
import { Hero3D } from './components/Hero3D';
import { BentoGrid } from './components/BentoGrid';
import { ProjectShowcase } from './components/ProjectShowcase';
import { InteractiveLab } from './components/InteractiveLab';
import { ExperienceTimeline } from './components/ExperienceTimeline';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';

export const App: React.FC = () => {
  const { mode, stats } = useDeviceOptimization();
  const [cursorPos, setCursorPos] = useState({ x: -1000, y: -1000 });

  // Update body class for eco optimizations
  useEffect(() => {
    if (mode === 'eco') {
      document.body.classList.add('eco-mode');
    } else {
      document.body.classList.remove('eco-mode');
    }
  }, [mode]);

  // Subtle desktop cursor spotlight glow
  useEffect(() => {
    if (mode === 'eco') return;

    const handlePointerMove = (e: MouseEvent) => {
      setCursorPos({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    return () => window.removeEventListener('pointermove', handlePointerMove);
  }, [mode]);

  return (
    <div style={{ position: 'relative', minHeight: '100vh', background: 'transparent' }}>
      {/* Dynamic Cursor Spotlight Ambient Layer (Desktop Ultra Mode) */}
      {mode === 'ultra' && cursorPos.x > -500 && (
        <div
          style={{
            position: 'fixed',
            top: cursorPos.y - 250,
            left: cursorPos.x - 250,
            width: '500px',
            height: '500px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(0, 245, 212, 0.045) 0%, transparent 70%)',
            pointerEvents: 'none',
            zIndex: 99,
            transition: 'top 0.05s linear, left 0.05s linear'
          }}
        />
      )}

      {/* Navigation */}
      <Navbar mode={mode} />

      {/* Main Content Sections */}
      <main>
        {/* 1. Hero 3D */}
        <Hero3D mode={mode} />

        {/* 2. Bento Grid & Philosophy */}
        <BentoGrid />

        {/* 3. Featured Projects Showcase */}
        <ProjectShowcase />

        {/* 4. Interactive Creative Lab */}
        <InteractiveLab mode={mode} />

        {/* 5. Experience Milestones */}
        <ExperienceTimeline />

        {/* 6. Contact & Supabase Inquiries */}
        <ContactSection />
      </main>

      {/* Footer & Telemetry */}
      <Footer stats={stats} />
    </div>
  );
};

export default App;
