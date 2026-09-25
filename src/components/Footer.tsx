import React from 'react';
import { ArrowUp, Zap } from 'lucide-react';
import { WhatsappIcon, InstagramIcon, TiktokIcon } from './Icons';
import type { DeviceStats } from '../types';
import { PERSONAL_INFO } from '../data/portfolioData';

interface FooterProps {
  stats: DeviceStats;
}

export const Footer: React.FC<FooterProps> = ({ stats }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer
      style={{
        borderTop: '1px solid rgba(255, 255, 255, 0.08)',
        background: 'rgba(5, 7, 10, 0.95)',
        padding: '4rem 0 2rem',
        position: 'relative'
      }}
    >
      <div className="container">
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            gap: '2.5rem',
            marginBottom: '3rem'
          }}
        >
          {/* Left Column: Brand */}
          <div style={{ maxWidth: '400px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', marginBottom: '1rem' }}>
              <div
                style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '8px',
                  background: 'rgba(0, 245, 212, 0.1)',
                  border: '1px solid rgba(0, 245, 212, 0.3)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 800,
                  color: 'var(--accent-cyan)'
                }}
              >
                A
              </div>
              <span style={{ fontWeight: 800, fontSize: '1.2rem', fontFamily: 'var(--font-heading)' }}>
                Arif <span style={{ color: 'var(--accent-cyan)' }}>.</span>
              </span>
            </div>

            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: '1.6', marginBottom: '1.5rem' }}>
              Obsessively engineered for visual prestige, micro-animations, and fluid 60 FPS performance on both desktop workstations and entry-level mobile devices.
            </p>

            <div style={{ display: 'flex', gap: '0.75rem' }}>
              <a
                href={PERSONAL_INFO.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                title="WhatsApp"
                style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '8px',
                  background: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--text-secondary)',
                  transition: 'all 0.2s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = '#25d366';
                  e.currentTarget.style.borderColor = 'rgba(37, 211, 102, 0.4)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = 'var(--text-secondary)';
                  e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)';
                }}
              >
                <WhatsappIcon size={18} />
              </a>
              <a
                href={PERSONAL_INFO.instagram}
                target="_blank"
                rel="noopener noreferrer"
                title="Instagram"
                style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '8px',
                  background: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--text-secondary)',
                  transition: 'all 0.2s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = '#e1306c';
                  e.currentTarget.style.borderColor = 'rgba(225, 48, 108, 0.4)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = 'var(--text-secondary)';
                  e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)';
                }}
              >
                <InstagramIcon size={18} />
              </a>
              <a
                href={PERSONAL_INFO.tiktok}
                target="_blank"
                rel="noopener noreferrer"
                title="TikTok"
                style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '8px',
                  background: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--text-secondary)',
                  transition: 'all 0.2s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = 'var(--accent-cyan)';
                  e.currentTarget.style.borderColor = 'rgba(0, 245, 212, 0.4)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = 'var(--text-secondary)';
                  e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)';
                }}
              >
                <TiktokIcon size={18} />
              </a>
            </div>
          </div>

          {/* Center Column: Telemetry & Performance Info */}
          <div
            style={{
              background: 'rgba(10, 14, 22, 0.6)',
              border: '1px solid rgba(255, 255, 255, 0.06)',
              borderRadius: '1rem',
              padding: '1.25rem 1.5rem',
              minWidth: '260px'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', fontSize: '0.75rem', fontFamily: 'var(--font-mono)', color: 'var(--accent-cyan)', marginBottom: '0.75rem' }}>
              <Zap size={14} />
              <span>LIVE DEVICE TELEMETRY</span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', fontSize: '0.8rem', fontFamily: 'var(--font-mono)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--text-muted)' }}>Detected CPU Cores:</span>
                <span style={{ color: 'var(--text-primary)' }}>{stats.cores} Logical Cores</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--text-muted)' }}>Render Refresh Rate:</span>
                <span style={{ color: 'var(--accent-cyan)' }}>{stats.fps} FPS</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--text-muted)' }}>Rendering Tier:</span>
                <span style={{ color: stats.mode === 'ultra' ? 'var(--accent-cyan)' : '#4ade80' }}>
                  {stats.mode === 'ultra' ? 'Three.js 3D WebGL' : '2.5D CSS Accelerated'}
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Back to Top */}
          <div>
            <button
              onClick={scrollToTop}
              id="back-to-top-btn"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.65rem',
                background: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                borderRadius: '9999px',
                padding: '0.75rem 1.5rem',
                color: 'var(--text-primary)',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.82rem',
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
              onMouseEnter={(e) => (e.currentTarget.style.borderColor = 'var(--accent-cyan)')}
              onMouseLeave={(e) => (e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)')}
            >
              <span>Back to Apex</span>
              <ArrowUp size={16} />
            </button>
          </div>
        </div>

        {/* Bottom Bar */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: '1rem',
            paddingTop: '2rem',
            borderTop: '1px solid rgba(255, 255, 255, 0.05)',
            fontSize: '0.8rem',
            color: 'var(--text-muted)'
          }}
        >
          <div>
            © {new Date().getFullYear()} Arif Ahmad Muzakky. All rights reserved. Zero-cost production ready on Vercel & Supabase.
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            <span>Crafted with Three.js, React & Obsidian Dark</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
