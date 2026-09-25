import React from 'react';
import { Briefcase, Calendar, MapPin, CheckCircle } from 'lucide-react';
import { EXPERIENCES } from '../data/portfolioData';

export const ExperienceTimeline: React.FC = () => {
  return (
    <section id="experience" className="section">
      <div className="container">
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
          <div className="badge" style={{ marginBottom: '1rem' }}>
            <Briefcase size={13} />
            <span>Career Milestones</span>
          </div>
          <h2
            className="heading-display heading-gradient"
            style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', marginBottom: '1rem' }}
          >
            Track Record of <span className="cyan-gradient">Excellence</span>
          </h2>
          <p style={{ color: 'var(--text-secondary)', maxWidth: '600px', margin: '0 auto', fontSize: '1.05rem' }}>
            Proven leadership delivering mission-critical web applications for forward-thinking engineering teams.
          </p>
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
          {/* Vertical Connecting Line with Cyan Gradient */}
          <div
            style={{
              position: 'absolute',
              top: '1rem',
              bottom: '1rem',
              left: '11px',
              width: '2px',
              background: 'linear-gradient(180deg, var(--accent-cyan) 0%, rgba(0, 245, 212, 0.1) 100%)'
            }}
          />

          {EXPERIENCES.map((exp) => (
            <div
              key={exp.id}
              style={{
                position: 'relative',
                marginBottom: '2.5rem'
              }}
            >
              {/* Glowing Timeline Marker */}
              <div
                style={{
                  position: 'absolute',
                  left: '-2.5rem',
                  top: '1.5rem',
                  width: '24px',
                  height: '24px',
                  borderRadius: '50%',
                  background: '#07090e',
                  border: '2px solid var(--accent-cyan)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 0 15px rgba(0, 245, 212, 0.4)',
                  zIndex: 2
                }}
              >
                <div
                  style={{
                    width: '8px',
                    height: '8px',
                    borderRadius: '50%',
                    background: 'var(--accent-cyan)'
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
                      }}
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
