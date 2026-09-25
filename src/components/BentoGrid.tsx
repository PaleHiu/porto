import React, { useState, useEffect } from 'react';
import { Terminal, Globe, Layers, CheckCircle2 } from 'lucide-react';
import { PERSONAL_INFO, SKILL_CATEGORIES } from '../data/portfolioData';

export const BentoGrid: React.FC = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [timeString, setTimeString] = useState('');

  // Live Time in Jakarta (GMT+7)
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const options: Intl.DateTimeFormatOptions = {
        timeZone: 'Asia/Jakarta',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
      };
      setTimeString(new Intl.DateTimeFormat('en-US', options).format(now));
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="about" className="section">
      <div className="container">
        {/* Section Header */}
        <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
          <div className="badge" style={{ marginBottom: '1rem' }}>
            <Layers size={13} />
            <span>Architecture & Identity</span>
          </div>
          <h2
            className="heading-display heading-gradient"
            style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', marginBottom: '1rem' }}
          >
            The Engineering <span className="cyan-gradient">Philosophy</span>
          </h2>
          <p style={{ color: 'var(--text-secondary)', maxWidth: '600px', margin: '0 auto', fontSize: '1.05rem' }}>
            Where mathematical rigor meets luxury visual craft. Here is how I think, build, and deploy.
          </p>
        </div>

        {/* Bento Grid Container */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(12, 1fr)',
            gap: '1.5rem'
          }}
          className="bento-container"
        >
          {/* Card 1: Core Philosophy & Bio (Span 8) */}
          <div
            className="glass-card bento-card-8"
            style={{
              gridColumn: 'span 8',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              position: 'relative'
            }}
          >
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.25rem' }}>
                <div
                  style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '10px',
                    background: 'rgba(0, 245, 212, 0.1)',
                    border: '1px solid rgba(0, 245, 212, 0.3)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'var(--accent-cyan)'
                  }}
                >
                  <Terminal size={20} />
                </div>
                <div>
                  <h3 style={{ fontSize: '1.3rem', fontWeight: 700, fontFamily: 'var(--font-heading)' }}>
                    Form Follows Emotion. Engineered for Speed.
                  </h3>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
                    Core Vision & Manifesto
                  </div>
                </div>
              </div>

              <p style={{ color: 'var(--text-secondary)', fontSize: '1.02rem', lineHeight: '1.7', marginBottom: '1.25rem' }}>
                {PERSONAL_INFO.bio}
              </p>

              <div
                style={{
                  background: 'rgba(5, 7, 10, 0.6)',
                  border: '1px solid rgba(255, 255, 255, 0.06)',
                  borderRadius: '0.75rem',
                  padding: '1rem',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.82rem',
                  color: 'var(--accent-cyan)',
                  lineHeight: '1.6'
                }}
              >
                <span style={{ color: '#64748b' }}>// The golden rule of creative frontend:</span> <br />
                const experience = await buildExperience({'{'}<br />
                &nbsp;&nbsp;aesthetic: 'Luxury Obsidian & Glass',<br />
                &nbsp;&nbsp;frameRateTarget: 60 /* Zero Jank on Mobile */,<br />
                &nbsp;&nbsp;hosting: 'Vercel Edge Network',<br />
                &nbsp;&nbsp;database: 'Supabase PostgreSQL'<br />
                {'}'});
              </div>
            </div>

            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '1rem',
                marginTop: '1.5rem',
                paddingTop: '1.25rem',
                borderTop: '1px solid rgba(255, 255, 255, 0.06)'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                <CheckCircle2 size={16} color="var(--accent-cyan)" />
                <span>Zero Cumulative Layout Shift</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                <CheckCircle2 size={16} color="var(--accent-cyan)" />
                <span>Sub-1s First Contentful Paint</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                <CheckCircle2 size={16} color="var(--accent-cyan)" />
                <span>Battery & Memory Conscious</span>
              </div>
            </div>
          </div>

          {/* Card 2: Realtime Clock & Status (Span 4) */}
          <div
            className="glass-card bento-card-4"
            style={{
              gridColumn: 'span 4',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between'
            }}
          >
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.25rem' }}>
                <div
                  style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '10px',
                    background: 'rgba(59, 130, 246, 0.1)',
                    border: '1px solid rgba(59, 130, 246, 0.3)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#60a5fa'
                  }}
                >
                  <Globe size={20} />
                </div>
                <div>
                  <h3 style={{ fontSize: '1.15rem', fontWeight: 700, fontFamily: 'var(--font-heading)' }}>
                    Current Base & Time
                  </h3>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
                    Indonesia (WIB / GMT+7)
                  </div>
                </div>
              </div>

              <div
                style={{
                  fontSize: '2.5rem',
                  fontFamily: 'var(--font-mono)',
                  fontWeight: 700,
                  color: 'var(--text-primary)',
                  letterSpacing: '0.04em',
                  margin: '1.25rem 0',
                  textShadow: '0 0 25px rgba(0, 245, 212, 0.3)'
                }}
              >
                {timeString || '21:58:00'}
                <span style={{ fontSize: '1rem', color: 'var(--accent-cyan)', marginLeft: '0.4rem' }}>WIB</span>
              </div>

              <div style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: '1.6' }}>
                Operating globally across asynchronous time zones (US, Europe, APAC) with instant Slack/Discord response.
              </div>
            </div>

            <div
              style={{
                marginTop: '1.5rem',
                padding: '0.75rem 1rem',
                background: 'rgba(0, 245, 212, 0.05)',
                border: '1px solid rgba(0, 245, 212, 0.15)',
                borderRadius: '0.75rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.65rem'
              }}
            >
              <span className="badge-pulse" />
              <span style={{ fontSize: '0.78rem', color: 'var(--accent-cyan)', fontFamily: 'var(--font-mono)' }}>
                Focus: WebGL Shaders & Supabase Edge
              </span>
            </div>
          </div>

          {/* Card 3: Interactive Skills & Tech Matrix (Span 12) */}
          <div
            id="skills"
            className="glass-card"
            style={{
              gridColumn: 'span 12'
            }}
          >
            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: '1rem',
                marginBottom: '2rem',
                paddingBottom: '1.25rem',
                borderBottom: '1px solid rgba(255, 255, 255, 0.08)'
              }}
            >
              <div>
                <h3 style={{ fontSize: '1.4rem', fontWeight: 700, fontFamily: 'var(--font-heading)' }}>
                  Interactive Tech & Stack Matrix
                </h3>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                  Click tabs below to inspect architecture and verified capabilities.
                </p>
              </div>

              {/* Tab Switchers */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                {SKILL_CATEGORIES.map((cat, idx) => (
                  <button
                    key={cat.title}
                    onClick={() => setActiveTab(idx)}
                    style={{
                      padding: '0.5rem 1.1rem',
                      borderRadius: '0.65rem',
                      border: `1px solid ${activeTab === idx ? 'rgba(0, 245, 212, 0.4)' : 'rgba(255, 255, 255, 0.08)'}`,
                      background: activeTab === idx ? 'rgba(0, 245, 212, 0.12)' : 'rgba(255, 255, 255, 0.03)',
                      color: activeTab === idx ? 'var(--accent-cyan)' : 'var(--text-secondary)',
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.8rem',
                      fontWeight: 600,
                      cursor: 'pointer',
                      transition: 'all 0.2s ease'
                    }}
                  >
                    {cat.title}
                  </button>
                ))}
              </div>
            </div>

            {/* Active Skills Grid */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                gap: '1.5rem'
              }}
            >
              {SKILL_CATEGORIES[activeTab].skills.map((skill) => (
                <div
                  key={skill.name}
                  style={{
                    background: 'rgba(6, 8, 12, 0.65)',
                    border: '1px solid rgba(255, 255, 255, 0.06)',
                    borderRadius: '0.85rem',
                    padding: '1.25rem',
                    transition: 'border-color 0.2s ease'
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.borderColor = 'rgba(0, 245, 212, 0.35)')}
                  onMouseLeave={(e) => (e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.06)')}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                    <span style={{ fontWeight: 600, fontSize: '0.95rem' }}>{skill.name}</span>
                    {skill.badge && (
                      <span
                        style={{
                          fontSize: '0.7rem',
                          fontFamily: 'var(--font-mono)',
                          background: 'rgba(0, 245, 212, 0.08)',
                          color: 'var(--accent-cyan)',
                          padding: '0.2rem 0.5rem',
                          borderRadius: '4px',
                          border: '1px solid rgba(0, 245, 212, 0.2)'
                        }}
                      >
                        {skill.badge}
                      </span>
                    )}
                  </div>

                  {/* Level Progress Bar */}
                  <div
                    style={{
                      height: '6px',
                      background: 'rgba(255, 255, 255, 0.08)',
                      borderRadius: '9999px',
                      overflow: 'hidden',
                      position: 'relative'
                    }}
                  >
                    <div
                      style={{
                        width: `${skill.level}%`,
                        height: '100%',
                        background: 'linear-gradient(90deg, #00f5d4 0%, #38bdf8 100%)',
                        boxShadow: '0 0 10px rgba(0, 245, 212, 0.5)',
                        borderRadius: '9999px',
                        transition: 'width 0.8s cubic-bezier(0.16, 1, 0.3, 1)'
                      }}
                    />
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '0.4rem' }}>
                    <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
                      {skill.level}% Proficiency
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Responsive adjustments for bento */}
      <style>{`
        @media (max-width: 900px) {
          .bento-card-8 {
            grid-column: span 12 !important;
          }
          .bento-card-4 {
            grid-column: span 12 !important;
          }
        }
      `}</style>
    </section>
  );
};
