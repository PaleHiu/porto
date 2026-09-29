import React from 'react';
import { ArrowUp } from 'lucide-react';
import { WhatsappIcon, InstagramIcon, TiktokIcon } from './Icons';
import type { DeviceStats } from '../types';
import { PERSONAL_INFO } from '../data/portfolioData';

interface FooterProps {
  stats?: DeviceStats;
}

export const Footer: React.FC<FooterProps> = () => {
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
            alignItems: 'center',
            gap: '2.5rem',
            marginBottom: '3rem'
          }}
        >
          {/* Left Column: Brand & Socials */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
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
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <span style={{ fontWeight: 800, fontSize: '1.2rem', fontFamily: 'var(--font-heading)', lineHeight: 1.2 }}>
                  Arif <span style={{ color: 'var(--accent-cyan)' }}>.</span>
                </span>
                <span style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>
                  {PERSONAL_INFO.role}
                </span>
              </div>
            </div>

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
              {PERSONAL_INFO.tiktok && (
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
              )}
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
              <span>Kembali ke Atas</span>
              <ArrowUp size={16} />
            </button>
          </div>
        </div>

        {/* Bottom Bar */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '1rem',
            paddingTop: '2rem',
            borderTop: '1px solid rgba(255, 255, 255, 0.05)',
            fontSize: '0.85rem',
            color: 'var(--text-muted)'
          }}
        >
          <div style={{ textAlign: 'center' }}>
            © {new Date().getFullYear()} {PERSONAL_INFO.name}. All rights reserved.
          </div>
        </div>
      </div>

      {/* Mobile Responsive Styles */}
      <style>{`
        @media (max-width: 960px) {
          footer .container > div:first-child {
            flex-direction: column !important;
            align-items: flex-start !important;
            gap: clamp(1.5rem, 5vw, 2.5rem) !important;
          }
          footer #back-to-top-btn {
            font-size: clamp(0.72rem, 3vw, 0.82rem) !important;
            padding: clamp(0.55rem, 2.5vw, 0.75rem) clamp(1rem, 4.5vw, 1.5rem) !important;
          }
          footer {
            padding: clamp(2rem, 7vw, 4rem) 0 clamp(1.25rem, 4vw, 2rem) !important;
          }
          footer .container > div:last-child {
            font-size: clamp(0.75rem, 3vw, 0.85rem) !important;
          }
        }
      `}</style>
    </footer>
  );
};
