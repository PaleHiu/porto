import React, { useEffect, useRef, useState } from 'react';
import { Briefcase, Calendar, MapPin, CheckCircle } from 'lucide-react';
import { EXPERIENCES } from '../data/portfolioData';

export const ExperienceTimeline: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          if (containerRef.current) {
            const rect = containerRef.current.getBoundingClientRect();
            const windowHeight = window.innerHeight;
            const totalDistance = rect.height + windowHeight * 0.3;
            const current = windowHeight * 0.75 - rect.top;
            const progress = Math.min(1, Math.max(0, current / totalDistance));
            setScrollProgress(progress);
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section id="experience" className="section" ref={containerRef}>
      <div className="container">
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
          <div className="badge" style={{ marginBottom: '1rem' }}>
            <Briefcase size={13} />
            <span>Pengalaman Saya</span>
          </div>
          <h2
            className="heading-display heading-gradient"
            style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', margin: 0 }}
          >
            Jejak <span className="cyan-gradient">Pengalaman</span>
          </h2>
        </div>

        {/* Timeline Container */}
        <div
          style={{
            maxWidth: '850px',
            margin: '0 auto',
            position: 'relative',
            paddingLeft: '2.5rem'
          }}
          className="timeline-wrapper"
        >
          {/* Background Inactive Line (Dibuat Lebih Redup & Elegan) */}
          <div
            style={{
              position: 'absolute',
              top: '1.5rem',
              bottom: '1.5rem',
              left: '11px',
              width: '2px',
              background: 'rgba(255, 255, 255, 0.025)',
              borderRadius: '2px'
            }}
          />

          {/* Active Dynamic Glowing Line (Mengalir Mengikuti Scroll) */}
          <div
            style={{
              position: 'absolute',
              top: '1.5rem',
              height: `${Math.min(100, Math.max(0, scrollProgress * 115))}%`,
              maxHeight: 'calc(100% - 3rem)',
              left: '11px',
              width: '2px',
              background: 'linear-gradient(180deg, var(--accent-cyan) 0%, rgba(0, 245, 212, 0.6) 100%)',
              boxShadow: '0 0 10px rgba(0, 245, 212, 0.35)',
              borderRadius: '2px',
              transition: 'height 0.15s ease-out'
            }}
          />

          {EXPERIENCES.map((exp, index) => {
            const itemThreshold = (index + 0.25) / EXPERIENCES.length;
            const isActive = scrollProgress >= itemThreshold || index === 0;

            return (
              <div
                key={exp.id}
                style={{
                  position: 'relative',
                  marginBottom: '2.5rem'
                }}
              >
                {/* Timeline Marker (Aktif: Bersinar, Tidak Aktif: Redup) */}
                <div
                  style={{
                    position: 'absolute',
                    left: '-2.5rem',
                    top: '1.5rem',
                    width: '24px',
                    height: '24px',
                    borderRadius: '50%',
                    background: '#07090e',
                    border: `2px solid ${isActive ? 'var(--accent-cyan)' : 'rgba(255, 255, 255, 0.08)'}`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: isActive ? '0 0 14px rgba(0, 245, 212, 0.4)' : 'none',
                    transition: 'all 0.4s ease',
                    zIndex: 2
                  }}
                >
                  <div
                    style={{
                      width: '8px',
                      height: '8px',
                      borderRadius: '50%',
                      background: isActive ? 'var(--accent-cyan)' : 'rgba(255, 255, 255, 0.12)',
                      transition: 'background 0.4s ease'
                    }}
                  />
                </div>

                {/* Experience Card */}
                <div
                  className="glass-card"
                  style={{
                    padding: '1.75rem',
                    background: 'rgba(11, 14, 21, 0.8)'
                  }}
                >
                  <div
                    style={{
                      display: 'flex',
                      flexWrap: 'wrap',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      gap: '0.75rem',
                      marginBottom: '0.75rem'
                    }}
                  >
                    <div>
                      <h3 style={{ fontSize: '1.3rem', fontWeight: 700, fontFamily: 'var(--font-heading)' }}>
                        {exp.role}
                      </h3>
                      <div style={{ color: 'var(--accent-cyan)', fontWeight: 600, fontSize: '0.95rem' }}>
                        {exp.company}
                      </div>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', fontSize: '0.8rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                        <Calendar size={14} />
                        {exp.period}
                      </span>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                        <MapPin size={14} />
                        {exp.location}
                      </span>
                    </div>
                  </div>

                  {/* Accomplishments */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', margin: '1rem 0' }}>
                    {exp.description.map((item, idx) => (
                      <div key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.65rem' }}>
                        <CheckCircle size={15} color="var(--accent-cyan)" style={{ marginTop: '0.25rem', flexShrink: 0 }} />
                        <span style={{ color: 'var(--text-secondary)', fontSize: '0.92rem', lineHeight: '1.6' }}>
                          {item}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Tech Pills */}
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', marginTop: '1rem' }}>
                    {exp.tech.map((t) => (
                      <span
                        key={t}
                        style={{
                          fontSize: '0.72rem',
                          fontFamily: 'var(--font-mono)',
                          background: 'rgba(255, 255, 255, 0.04)',
                          color: 'var(--text-secondary)',
                          padding: '0.2rem 0.55rem',
                          borderRadius: '4px',
                          border: '1px solid rgba(255, 255, 255, 0.06)'
                        }}>
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Mobile Responsive Styles */}
      <style>{`
        @media (max-width: 960px) {
          .timeline-wrapper {
            padding-left: clamp(1.75rem, 7vw, 2.5rem) !important;
          }
          #experience h2 {
            font-size: clamp(1.6rem, 7vw, 2.5rem) !important;
          }
          #experience .badge {
            font-size: clamp(0.68rem, 2.8vw, 0.75rem) !important;
          }
          #experience h3 {
            font-size: clamp(1rem, 4.5vw, 1.3rem) !important;
          }
          #experience .glass-card {
            padding: clamp(1rem, 4.5vw, 1.75rem) !important;
          }
          #experience .glass-card > div:first-child > div:first-child div {
            font-size: clamp(0.82rem, 3.5vw, 0.95rem) !important;
          }
        }
      `}</style>
    </section>
  );
};
