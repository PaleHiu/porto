import React, { useRef, useState, useEffect } from 'react';
import { GraduationCap, Sparkles, BookOpen, Compass, Award, Calendar } from 'lucide-react';
import { EDUCATIONS } from '../data/portfolioData';

export const EducationTimeline: React.FC = () => {
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

            // Start drawing line when section enters viewport, completes near center
            const startPoint = windowHeight * 0.85;
            const endPoint = windowHeight * 0.15;
            const totalDistance = rect.height + (startPoint - endPoint);
            const currentDistance = startPoint - rect.top;

            const raw = currentDistance / totalDistance;
            const clamped = Math.min(1, Math.max(0, raw));
            setScrollProgress(clamped);
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

  const getStepIcon = (index: number) => {
    switch (index) {
      case 0:
        return <Sparkles size={18} className="text-cyan" />;
      case 1:
        return <Compass size={18} className="text-cyan" />;
      default:
        return <BookOpen size={18} className="text-cyan" />;
    }
  };

  return (
    <section
      id="pendidikan"
      ref={containerRef}
      className="section"
      style={{
        position: 'relative',
        zIndex: 10,
        padding: '8rem 0 9rem 0',
        overflow: 'hidden'
      }}
    >
      {/* Top Section Divider */}
      <div className="section-divider-top" aria-hidden="true">
        <div className="divider-glow-beam" />
        <div className="divider-line" />
        <div className="divider-center-node">
          <div className="divider-diamond" />
        </div>
      </div>

      {/* Background Ambient Cosmic Auroras */}
      <div
        style={{
          position: 'absolute',
          top: '20%',
          left: '50%',
          transform: 'translateX(-50%)',
          width: 'min(900px, 95vw)',
          height: '500px',
          background: 'radial-gradient(ellipse at center, rgba(0, 245, 212, 0.06) 0%, rgba(59, 130, 246, 0.03) 50%, transparent 70%)',
          filter: 'blur(70px)',
          pointerEvents: 'none',
          zIndex: 0
        }}
      />

      {/* Abstract Wind Gusts Background (High-Performance GPU-Composited Vector Currents) */}
      <div className="wind-gusts-layer" aria-hidden="true">
        <svg style={{ position: 'absolute', width: 0, height: 0 }} aria-hidden="true">
          <defs>
            <linearGradient id="windGradCyan" x1="0%" y1="100%" x2="0%" y2="0%">
              <stop offset="0%" stopColor="#00f5d4" stopOpacity="0" />
              <stop offset="30%" stopColor="#00f5d4" stopOpacity="0.75" />
              <stop offset="70%" stopColor="#5eead4" stopOpacity="0.85" />
              <stop offset="100%" stopColor="#00f5d4" stopOpacity="0" />
            </linearGradient>
            <linearGradient id="windGradBlue" x1="0%" y1="100%" x2="0%" y2="0%">
              <stop offset="0%" stopColor="#3b82f6" stopOpacity="0" />
              <stop offset="35%" stopColor="#3b82f6" stopOpacity="0.8" />
              <stop offset="75%" stopColor="#00f5d4" stopOpacity="0.7" />
              <stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />
            </linearGradient>
            <linearGradient id="windGradMix" x1="0%" y1="100%" x2="0%" y2="0%">
              <stop offset="0%" stopColor="#06b6d4" stopOpacity="0" />
              <stop offset="40%" stopColor="#00f5d4" stopOpacity="0.8" />
              <stop offset="70%" stopColor="#6366f1" stopOpacity="0.75" />
              <stop offset="100%" stopColor="#00f5d4" stopOpacity="0" />
            </linearGradient>
          </defs>
        </svg>

        {/* Stream 1 - Left outer sweep */}
        <svg viewBox="0 0 140 460" className="wind-stream stream-1">
          <path d="M 20 460 C 85 340, 10 180, 115 0" stroke="url(#windGradCyan)" strokeWidth="1.6" fill="none" strokeLinecap="round" />
        </svg>

        {/* Stream 2 - Left-center drift */}
        <svg viewBox="0 0 160 520" className="wind-stream stream-2">
          <path d="M 135 520 C 25 370, 145 190, 45 0" stroke="url(#windGradBlue)" strokeWidth="1.8" fill="none" strokeLinecap="round" />
        </svg>

        {/* Stream 3 - Mid-left gentle gust */}
        <svg viewBox="0 0 130 420" className="wind-stream stream-3">
          <path d="M 30 420 C 115 290, 25 130, 95 0" stroke="url(#windGradCyan)" strokeWidth="1.4" fill="none" strokeLinecap="round" />
        </svg>

        {/* Stream 4 - Center atmospheric flow */}
        <svg viewBox="0 0 180 560" className="wind-stream stream-4">
          <path d="M 90 560 C 165 410, 25 210, 130 0" stroke="url(#windGradMix)" strokeWidth="1.5" fill="none" strokeLinecap="round" />
        </svg>

        {/* Stream 5 - Mid-right breeze */}
        <svg viewBox="0 0 170 540" className="wind-stream stream-5">
          <path d="M 40 540 C 135 390, 25 190, 145 0" stroke="url(#windGradBlue)" strokeWidth="1.7" fill="none" strokeLinecap="round" />
        </svg>

        {/* Stream 6 - Right outer gust */}
        <svg viewBox="0 0 150 480" className="wind-stream stream-6">
          <path d="M 125 480 C 35 330, 135 160, 45 0" stroke="url(#windGradCyan)" strokeWidth="1.5" fill="none" strokeLinecap="round" />
        </svg>

        {/* Stream 7 - Far right ethereal draft */}
        <svg viewBox="0 0 130 400" className="wind-stream stream-7">
          <path d="M 25 400 C 95 280, 35 120, 105 0" stroke="url(#windGradMix)" strokeWidth="1.3" fill="none" strokeLinecap="round" />
        </svg>
      </div>

      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        {/* Section Header */}
        <div style={{ textAlign: 'center', marginBottom: '4.5rem' }}>
          <div
            className="badge"
            style={{
              marginBottom: '1rem',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              borderColor: 'rgba(0, 245, 212, 0.35)',
              background: 'rgba(0, 245, 212, 0.08)'
            }}
          >
            <GraduationCap size={14} color="var(--accent-cyan)" />
            <span>Pendidikan Saya</span>
          </div>

          <h2
            className="heading-display"
            style={{
              fontSize: 'clamp(2.4rem, 4.5vw, 3.6rem)',
              fontWeight: 800,
              fontFamily: 'var(--font-heading)',
              lineHeight: 1.15,
              margin: 0
            }}
          >
            Timeline <span className="cyan-gradient">Pendidikan</span>
          </h2>
        </div>

        {/* ================= INTERACTIVE BRANCHING TIME-TREE TIMELINE ================= */}
        <div className="time-tree-container">
          {/* Central Stem Line SVG Overlay (Desktop View) */}
          <div className="time-tree-svg-desktop" aria-hidden="true">
            <svg
              className="time-tree-svg"
              width="100%"
              height="100%"
              viewBox="0 0 1000 900"
              preserveAspectRatio="none"
              style={{ overflow: 'visible' }}
            >
              <defs>
                <linearGradient id="trunkGlow" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#00f5d4" stopOpacity="0.9" />
                  <stop offset="50%" stopColor="#3b82f6" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="#00f5d4" stopOpacity="0.6" />
                </linearGradient>

                <linearGradient id="branchGradLeft" x1="100%" y1="0%" x2="0%" y2="0%">
                  <stop offset="0%" stopColor="#00f5d4" stopOpacity="0.9" />
                  <stop offset="100%" stopColor="#00f5d4" stopOpacity="0.15" />
                </linearGradient>

                <linearGradient id="branchGradRight" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.9" />
                  <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.15" />
                </linearGradient>

                <filter id="neonBlur" x="-30%" y="-30%" width="160%" height="160%">
                  <feGaussianBlur stdDeviation="4" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>

              {/* Background Trunk Guide (Dormant / Tidak Aktif - Dibuat Lebih Redup) */}
              <line
                x1="500"
                y1="30"
                x2="500"
                y2="870"
                stroke="rgba(255, 255, 255, 0.025)"
                strokeWidth="1.5"
                strokeDasharray="3 5"
              />

              {/* Dynamic Luminous Trunk Line (Scroll-Progress Driven) */}
              <line
                x1="500"
                y1="30"
                x2="500"
                y2={30 + Math.min(1, scrollProgress * 1.3) * 840}
                stroke="url(#trunkGlow)"
                strokeWidth="3.5"
                filter="url(#neonBlur)"
                strokeLinecap="round"
                style={{ transition: 'y2 0.1s linear' }}
              />

              {/* Branch 1 (Curving Left to University Milestone - Y ~ 150) */}
              <path
                d="M 500 150 C 440 150, 420 150, 370 150"
                fill="none"
                stroke={scrollProgress > 0.15 ? "url(#branchGradLeft)" : "rgba(255, 255, 255, 0.025)"}
                strokeWidth={scrollProgress > 0.15 ? "2.5" : "1"}
                strokeDasharray={scrollProgress > 0.15 ? "none" : "3 5"}
                filter={scrollProgress > 0.15 ? "url(#neonBlur)" : "none"}
                style={{ transition: 'all 0.4s ease' }}
              />

              {/* Branch 2 (Curving Right to High School Milestone - Y ~ 450) */}
              <path
                d="M 500 450 C 560 450, 580 450, 630 450"
                fill="none"
                stroke={scrollProgress > 0.42 ? "url(#branchGradRight)" : "rgba(255, 255, 255, 0.025)"}
                strokeWidth={scrollProgress > 0.42 ? "2.5" : "1"}
                strokeDasharray={scrollProgress > 0.42 ? "none" : "3 5"}
                filter={scrollProgress > 0.42 ? "url(#neonBlur)" : "none"}
                style={{ transition: 'all 0.4s ease' }}
              />

              {/* Branch 3 (Curving Left to Junior High School Milestone - Y ~ 750) */}
              <path
                d="M 500 750 C 440 750, 420 750, 370 750"
                fill="none"
                stroke={scrollProgress > 0.70 ? "url(#branchGradLeft)" : "rgba(255, 255, 255, 0.025)"}
                strokeWidth={scrollProgress > 0.70 ? "2.5" : "1"}
                strokeDasharray={scrollProgress > 0.70 ? "none" : "3 5"}
                filter={scrollProgress > 0.70 ? "url(#neonBlur)" : "none"}
                style={{ transition: 'all 0.4s ease' }}
              />
            </svg>
          </div>

          {/* Education Milestone Cards Flow */}
          <div className="time-tree-milestones">
            {EDUCATIONS.map((edu, index) => {
              const isEven = index % 2 === 0; // index 0 & 2 on left, index 1 on right
              const isHighlighted = edu.current;

              return (
                <div
                  key={edu.id}
                  className={`time-tree-item ${isEven ? 'item-left' : 'item-right'}`}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: isEven ? 'flex-end' : 'flex-start',
                    position: 'relative',
                    marginBottom: index === EDUCATIONS.length - 1 ? '0' : '4.5rem'
                  }}
                >
                  {/* Central Branch Node Junction Marker */}
                  <div
                    className="time-tree-node"
                    style={{
                      position: 'absolute',
                      left: '50%',
                      top: '50%',
                      transform: 'translate(-50%, -50%)',
                      width: '46px',
                      height: '46px',
                      borderRadius: '50%',
                      background: isHighlighted ? 'rgba(9, 13, 20, 0.95)' : 'rgba(9, 13, 20, 0.90)',
                      border: `2px solid ${isHighlighted ? 'var(--accent-cyan)' : 'rgba(59, 130, 246, 0.6)'}`,
                      boxShadow: isHighlighted
                        ? '0 0 25px rgba(0, 245, 212, 0.5), inset 0 0 12px rgba(0, 245, 212, 0.3)'
                        : '0 0 18px rgba(59, 130, 246, 0.35)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      zIndex: 5,
                      transition: 'all 0.3s ease'
                    }}
                  >
                    {getStepIcon(index)}
                    
                    {/* Pulsing ring for current degree */}
                    {isHighlighted && (
                      <span
                        style={{
                          position: 'absolute',
                          inset: '-4px',
                          borderRadius: '50%',
                          border: '1.5px solid var(--accent-cyan)',
                          animation: 'pulseRing 2s infinite cubic-bezier(0.215, 0.61, 0.355, 1)',
                          pointerEvents: 'none'
                        }}
                      />
                    )}
                  </div>

                  {/* Milestone Content Glassmorphic Card */}
                  <div
                    className="time-tree-card"
                    style={{
                      width: 'calc(50% - 60px)',
                      background: isHighlighted
                        ? 'linear-gradient(135deg, rgba(10, 16, 26, 0.88), rgba(6, 9, 14, 0.82))'
                        : 'rgba(9, 13, 20, 0.78)',
                      backdropFilter: 'blur(20px)',
                      WebkitBackdropFilter: 'blur(20px)',
                      border: `1px solid ${isHighlighted ? 'rgba(0, 245, 212, 0.4)' : 'rgba(255, 255, 255, 0.08)'}`,
                      borderRadius: '1.25rem',
                      padding: '1.85rem 2rem',
                      boxShadow: isHighlighted
                        ? '0 20px 45px rgba(0, 0, 0, 0.85), 0 0 30px rgba(0, 245, 212, 0.15)'
                        : '0 15px 35px rgba(0, 0, 0, 0.7)',
                      position: 'relative',
                      transition: 'all 0.35s cubic-bezier(0.16, 1, 0.3, 1)'
                    }}
                  >
                    {/* Header Row: Degree Badge & Period */}
                    <div
                      style={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        gap: '0.75rem',
                        marginBottom: '1.2rem',
                        paddingBottom: '0.85rem',
                        borderBottom: '1px solid rgba(255, 255, 255, 0.06)'
                      }}
                    >
                      <span
                        style={{
                          fontSize: '0.75rem',
                          fontFamily: 'var(--font-mono)',
                          fontWeight: 700,
                          color: isHighlighted ? 'var(--accent-cyan)' : '#93c5fd',
                          background: isHighlighted ? 'rgba(0, 245, 212, 0.12)' : 'rgba(59, 130, 246, 0.12)',
                          padding: '0.28rem 0.75rem',
                          borderRadius: '999px',
                          border: `1px solid ${isHighlighted ? 'rgba(0, 245, 212, 0.35)' : 'rgba(59, 130, 246, 0.3)'}`,
                          letterSpacing: '0.04em'
                        }}
                      >
                        {edu.degree}
                      </span>

                      <div
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.45rem',
                          fontFamily: 'var(--font-mono)',
                          fontSize: '0.8rem',
                          color: 'var(--text-secondary)'
                        }}
                      >
                        <Calendar size={13} color="var(--accent-cyan)" />
                        <span>{edu.period}</span>
                      </div>
                    </div>

                    {/* Institution Name */}
                    <h3
                      style={{
                        fontSize: 'clamp(1.2rem, 1.6vw, 1.45rem)',
                        fontWeight: 800,
                        fontFamily: 'var(--font-heading)',
                        color: '#ffffff',
                        lineHeight: 1.3,
                        marginBottom: '0.35rem',
                        letterSpacing: '-0.01em'
                      }}
                    >
                      {edu.institution}
                    </h3>

                    {/* Major / Concentration */}
                    {edu.major && (
                      <div
                        style={{
                          fontSize: '0.95rem',
                          color: 'var(--accent-cyan)',
                          fontWeight: 600,
                          marginBottom: '0.85rem',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.5rem'
                        }}
                      >
                        <Award size={14} />
                        <span>{edu.major}</span>
                      </div>
                    )}

                    {/* Narrative Description */}
                    <p
                      style={{
                        fontSize: '0.92rem',
                        color: 'var(--text-secondary)',
                        lineHeight: 1.7,
                        margin: 0
                      }}
                    >
                      {edu.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Bottom Section Divider */}
      <div className="section-divider-bottom" aria-hidden="true">
        <div className="divider-glow-beam" />
        <div className="divider-line" />
        <div className="divider-center-node">
          <div className="divider-diamond" />
        </div>
      </div>

      {/* Responsive & Animation Styles */}
      <style>{`
        .time-tree-container {
          position: relative;
          max-width: 1100px;
          margin: 0 auto;
        }

        .time-tree-svg-desktop {
          position: absolute;
          inset: 0;
          pointer-events: none;
          z-index: 2;
        }

        .time-tree-card:hover {
          transform: translateY(-4px);
          border-color: rgba(0, 245, 212, 0.45) !important;
          box-shadow: 0 25px 50px rgba(0, 0, 0, 0.9), 0 0 35px rgba(0, 245, 212, 0.22) !important;
        }

        @keyframes pulseRing {
          0% {
            transform: scale(0.95);
            opacity: 0.9;
          }
          100% {
            transform: scale(1.45);
            opacity: 0;
          }
        }

        /* Mobile Breakpoint (≤ 960px) — fluid layout down to 300px */
        @media (max-width: 960px) {
          .time-tree-svg-desktop {
            display: none !important;
          }

          /* Section heading */
          #pendidikan h2 {
            font-size: clamp(1.6rem, 7.5vw, 2.8rem) !important;
          }
          #pendidikan .badge {
            font-size: clamp(0.68rem, 2.8vw, 0.75rem) !important;
          }

          /* Timeline items: single column with left-aligned indent */
          .time-tree-item {
            justify-content: flex-start !important;
            padding-left: clamp(44px, 13vw, 64px) !important;
            margin-bottom: clamp(2rem, 7vw, 3.5rem) !important;
          }

          /* Vertical line track on mobile */
          .time-tree-item::before {
            content: '';
            position: absolute;
            left: clamp(14px, 5vw, 22px);
            top: -2rem;
            bottom: -2rem;
            width: 2px;
            background: rgba(255, 255, 255, 0.025);
            z-index: 1;
          }

          /* Node dot */
          .time-tree-node {
            left: clamp(14px, 5vw, 22px) !important;
            top: clamp(20px, 4vw, 28px) !important;
            transform: translate(-50%, 0) !important;
            width: clamp(28px, 8vw, 40px) !important;
            height: clamp(28px, 8vw, 40px) !important;
          }

          /* Card sizing */
          .time-tree-card {
            width: 100% !important;
            padding: clamp(0.85rem, 4vw, 1.4rem) !important;
          }
          .time-tree-card h3 {
            font-size: clamp(0.95rem, 4.5vw, 1.25rem) !important;
          }
          .time-tree-card p, .time-tree-card span {
            font-size: clamp(0.8rem, 3.5vw, 0.95rem) !important;
          }
        }

        /* ================= ABSTRACT WIND GUSTS LAYER ================= */
        .wind-gusts-layer {
          position: absolute;
          inset: 0;
          overflow: hidden;
          pointer-events: none;
          z-index: 0;
          contain: strict;
          -webkit-mask-image: linear-gradient(
            to bottom,
            transparent 0%,
            rgba(0, 0, 0, 0.2) 4%,
            black 15%,
            black 85%,
            rgba(0, 0, 0, 0.2) 96%,
            transparent 100%
          );
          mask-image: linear-gradient(
            to bottom,
            transparent 0%,
            rgba(0, 0, 0, 0.2) 4%,
            black 15%,
            black 85%,
            rgba(0, 0, 0, 0.2) 96%,
            transparent 100%
          );
        }

        .wind-stream {
          position: absolute;
          bottom: -280px;
          pointer-events: none;
          will-change: transform, opacity;
          filter: drop-shadow(0 0 8px rgba(0, 245, 212, 0.35));
        }

        .stream-1 {
          left: 4%;
          width: 140px;
          height: 460px;
          animation: windGustAscend1 9.5s cubic-bezier(0.25, 0.1, 0.25, 1) infinite -2.5s;
        }

        .stream-2 {
          left: 19%;
          width: 160px;
          height: 520px;
          animation: windGustAscend2 13s cubic-bezier(0.25, 0.1, 0.25, 1) infinite -7.2s;
        }

        .stream-3 {
          left: 34%;
          width: 130px;
          height: 420px;
          animation: windGustAscend3 8.6s cubic-bezier(0.25, 0.1, 0.25, 1) infinite -1.4s;
        }

        .stream-4 {
          left: 49%;
          width: 180px;
          height: 560px;
          animation: windGustAscend2 14.5s cubic-bezier(0.25, 0.1, 0.25, 1) infinite -10.8s;
        }

        .stream-5 {
          left: 65%;
          width: 170px;
          height: 540px;
          animation: windGustAscend1 11.2s cubic-bezier(0.25, 0.1, 0.25, 1) infinite -5.1s;
        }

        .stream-6 {
          left: 80%;
          width: 150px;
          height: 480px;
          animation: windGustAscend3 8.2s cubic-bezier(0.25, 0.1, 0.25, 1) infinite -3.4s;
        }

        .stream-7 {
          left: 92%;
          width: 130px;
          height: 400px;
          animation: windGustAscend2 12s cubic-bezier(0.25, 0.1, 0.25, 1) infinite -8.5s;
        }

        /* Pure GPU 60/120 FPS Composited Keyframes with Smooth Multi-Stage Fade In & Out */
        @keyframes windGustAscend1 {
          0% {
            transform: translate3d(0, 0, 0) scale(0.92);
            opacity: 0;
          }
          10% {
            opacity: 0.12;
          }
          25% {
            opacity: 0.35;
          }
          65% {
            opacity: 0.35;
          }
          85% {
            opacity: 0.1;
          }
          100% {
            transform: translate3d(35px, -1450px, 0) scale(1.08);
            opacity: 0;
          }
        }

        @keyframes windGustAscend2 {
          0% {
            transform: translate3d(0, 0, 0) scale(0.88);
            opacity: 0;
          }
          12% {
            opacity: 0.08;
          }
          28% {
            opacity: 0.26;
          }
          62% {
            opacity: 0.26;
          }
          82% {
            opacity: 0.07;
          }
          100% {
            transform: translate3d(-40px, -1550px, 0) scale(1.12);
            opacity: 0;
          }
        }

        @keyframes windGustAscend3 {
          0% {
            transform: translate3d(0, 0, 0) scale(0.95);
            opacity: 0;
          }
          10% {
            opacity: 0.12;
          }
          24% {
            opacity: 0.38;
          }
          68% {
            opacity: 0.38;
          }
          88% {
            opacity: 0.09;
          }
          100% {
            transform: translate3d(25px, -1400px, 0) scale(1.05);
            opacity: 0;
          }
        }

        /* Mobile Throttling: Cull streams to conserve battery & GPU */
        @media (max-width: 860px) {
          .stream-2, .stream-4, .stream-7 {
            display: none !important;
          }
          .stream-1, .stream-3, .stream-5, .stream-6 {
            opacity: 0.25;
          }
        }

        /* Eco Mode / Battery Optimization */
        .eco-mode .wind-stream {
          animation-play-state: paused !important;
          opacity: 0.1 !important;
        }

        /* Reduced Motion */
        @media (prefers-reduced-motion: reduce) {
          .wind-stream {
            animation: none !important;
            opacity: 0.15 !important;
          }
        }

        /* ================= SECTION DIVIDERS (TOP & BOTTOM) ================= */
        .section-divider-top,
        .section-divider-bottom {
          position: absolute;
          left: 0;
          right: 0;
          width: 100%;
          height: 24px;
          pointer-events: none;
          z-index: 5;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .section-divider-top {
          top: 0;
        }

        .section-divider-bottom {
          bottom: 0;
        }

        /* Ambient soft glow along the central boundary */
        .divider-glow-beam {
          position: absolute;
          width: min(850px, 90vw);
          height: 14px;
          background: radial-gradient(ellipse at center, rgba(0, 245, 212, 0.3) 0%, rgba(59, 130, 246, 0.12) 45%, transparent 75%);
          filter: blur(8px);
          pointer-events: none;
        }

        /* 1px cyber neon gradient border line tapering to transparent edges */
        .divider-line {
          position: absolute;
          width: 100%;
          height: 1px;
          background: linear-gradient(
            90deg,
            transparent 0%,
            rgba(255, 255, 255, 0.02) 8%,
            rgba(0, 245, 212, 0.2) 25%,
            rgba(0, 245, 212, 0.8) 50%,
            rgba(59, 130, 246, 0.25) 75%,
            rgba(255, 255, 255, 0.02) 92%,
            transparent 100%
          );
          box-shadow: 0 0 10px rgba(0, 245, 212, 0.35);
        }

        /* Minimalist futuristic diamond accent node in the center */
        .divider-center-node {
          position: relative;
          z-index: 2;
          display: flex;
          align-items: center;
          justify-content: center;
          width: 24px;
          height: 24px;
        }

        .divider-diamond {
          width: 7px;
          height: 7px;
          background: #00f5d4;
          transform: rotate(45deg);
          border-radius: 1px;
          box-shadow: 0 0 10px #00f5d4, 0 0 20px rgba(0, 245, 212, 0.5);
          border: 1px solid rgba(255, 255, 255, 0.85);
        }
      `}</style>
    </section>
  );
};
