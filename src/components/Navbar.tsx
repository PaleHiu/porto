import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import type { PerformanceMode } from '../types';

interface NavbarProps {
  mode?: PerformanceMode;
}

export const Navbar: React.FC<NavbarProps> = ({ mode = 'ultra' }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'About', href: '#about' },
    { label: 'Projects', href: '#projects' },
    { label: 'Skills', href: '#skills' },
    { label: 'Experience', href: '#experience' },
    { label: 'Lab', href: '#lab' },
    { label: 'Contact', href: '#contact' }
  ];

  return (
    <header
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        padding: scrolled ? '0.75rem 1rem' : '1.25rem 1rem',
        transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)'
      }}
    >
      <div
        className="container"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          background: scrolled ? 'rgba(7, 9, 14, 0.82)' : 'rgba(7, 9, 14, 0.4)',
          backdropFilter: mode === 'ultra' ? 'blur(20px)' : 'none',
          WebkitBackdropFilter: mode === 'ultra' ? 'blur(20px)' : 'none',
          border: '1px solid rgba(255, 255, 255, 0.08)',
          borderRadius: '9999px',
          padding: '0.6rem 1.4rem',
          boxShadow: scrolled ? '0 15px 35px -10px rgba(0, 0, 0, 0.7)' : 'none',
          transition: 'all 0.3s ease'
        }}
      >
        {/* Brand Monogram */}
        <a
          href="#"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.65rem',
            textDecoration: 'none',
            color: 'inherit'
          }}
        >
          <div
            style={{
              width: '36px',
              height: '36px',
              borderRadius: '10px',
              background: 'linear-gradient(135deg, rgba(0, 245, 212, 0.15), rgba(59, 130, 246, 0.1))',
              border: '1px solid rgba(0, 245, 212, 0.4)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 800,
              fontSize: '1.1rem',
              color: 'var(--accent-cyan)',
              boxShadow: '0 0 15px rgba(0, 245, 212, 0.2)'
            }}
          >
            A
          </div>
          <div>
            <div style={{ fontWeight: 700, fontSize: '0.95rem', letterSpacing: '-0.02em', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
              Arif <span style={{ color: 'var(--accent-cyan)' }}>.</span>
            </div>
            <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
              UI/UX & Design
            </div>
          </div>
        </a>

        {/* Desktop Nav Links */}
        <nav
          style={{
            display: 'none',
            alignItems: 'center',
            gap: '1.75rem',
            fontFamily: 'var(--font-sans)',
            fontSize: '0.88rem',
            fontWeight: 500
          }}
          className="desktop-nav"
        >
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              style={{
                color: 'var(--text-secondary)',
                textDecoration: 'none',
                transition: 'color 0.2s ease',
                position: 'relative',
                padding: '0.2rem 0'
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--accent-cyan)')}
              onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-secondary)')}
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Right Controls: CTA */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          {/* Quick CTA */}
          <a
            href="#contact"
            className="btn-primary"
            style={{
              padding: '0.45rem 1rem',
              fontSize: '0.8rem',
              borderRadius: '9999px',
              textDecoration: 'none'
            }}
          >
            <span>Let's Talk</span>
            <ArrowUpRight size={14} />
          </a>

          {/* Mobile Menu Trigger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            id="mobile-menu-btn"
            aria-label="Toggle menu"
            style={{
              display: 'none',
              background: 'transparent',
              border: 'none',
              color: 'var(--text-primary)',
              cursor: 'pointer',
              padding: '0.3rem'
            }}
            className="mobile-menu-trigger"
          >
            {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div
          style={{
            position: 'absolute',
            top: '100%',
            left: '1rem',
            right: '1rem',
            marginTop: '0.5rem',
            background: 'rgba(9, 12, 18, 0.95)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            backdropFilter: 'blur(25px)',
            borderRadius: '1.25rem',
            padding: '1.5rem',
            boxShadow: '0 25px 50px rgba(0, 0, 0, 0.8)',
            display: 'flex',
            flexDirection: 'column',
            gap: '1.25rem'
          }}
        >
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              style={{
                color: 'var(--text-primary)',
                textDecoration: 'none',
                fontSize: '1.05rem',
                fontWeight: 600,
                padding: '0.4rem 0',
                borderBottom: '1px solid rgba(255, 255, 255, 0.05)'
              }}
            >
              {link.label}
            </a>
          ))}
        </div>
      )}

      {/* Responsive Inline CSS for desktop-nav display */}
      <style>{`
        @media (min-width: 820px) {
          .desktop-nav {
            display: flex !important;
          }
          .mobile-menu-trigger {
            display: none !important;
          }
        }
        @media (max-width: 819px) {
          .desktop-nav {
            display: none !important;
          }
          .mobile-menu-trigger {
            display: block !important;
          }
        }
      `}</style>
    </header>
  );
};
