import React, { useState, useEffect } from 'react';

export const Preloader: React.FC = () => {
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState<'loading' | 'revealing' | 'done'>('loading');

  useEffect(() => {
    // Prevent accidental scroll while intro screen is active
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const startTime = performance.now();
    const duration = 1100; // 1.1s smooth initialization
    let animationFrameId: number;

    const updateProgress = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const rawT = Math.min(1, elapsed / duration);
      // Snappy cubic ease-out
      const t = 1 - Math.pow(1 - rawT, 3);
      const currentVal = Math.min(100, Math.floor(t * 100));
      setProgress(currentVal);

      if (rawT < 1) {
        animationFrameId = requestAnimationFrame(updateProgress);
      } else {
        setProgress(100);
        // Brief pause at 100% then trigger split shutter curtain reveal
        const revealTimer = setTimeout(() => {
          setPhase('revealing');
          // Complete transition and cleanly unmount from DOM
          const doneTimer = setTimeout(() => {
            setPhase('done');
            document.body.style.overflow = originalOverflow;
          }, 700);
          return () => clearTimeout(doneTimer);
        }, 150);
        return () => clearTimeout(revealTimer);
      }
    };

    animationFrameId = requestAnimationFrame(updateProgress);

    return () => {
      cancelAnimationFrame(animationFrameId);
      document.body.style.overflow = originalOverflow;
    };
  }, []);

  if (phase === 'done') return null;

  const isRevealing = phase === 'revealing';

  return (
    <div
      id="preloader-overlay"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 99999,
        pointerEvents: isRevealing ? 'none' : 'auto',
        overflow: 'hidden'
      }}
    >
      {/* Top Shutter Curtain Panel */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '50vh',
          background: '#050608',
          transform: isRevealing ? 'translateY(-100%)' : 'translateY(0%)',
          transition: 'transform 0.68s cubic-bezier(0.77, 0, 0.175, 1)',
          willChange: 'transform',
          borderBottom: isRevealing ? 'none' : '1px solid rgba(0, 245, 212, 0.25)',
          boxShadow: isRevealing ? 'none' : '0 10px 30px rgba(0, 0, 0, 0.9)'
        }}
      />

      {/* Bottom Shutter Curtain Panel */}
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: '50vh',
          background: '#050608',
          transform: isRevealing ? 'translateY(100%)' : 'translateY(0%)',
          transition: 'transform 0.68s cubic-bezier(0.77, 0, 0.175, 1)',
          willChange: 'transform',
          borderTop: isRevealing ? 'none' : '1px solid rgba(0, 245, 212, 0.25)',
          boxShadow: isRevealing ? 'none' : '0 -10px 30px rgba(0, 0, 0, 0.9)'
        }}
      />

      {/* Center Dividing Laser Seam Glow Line */}
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: `translate(-50%, -50%) scaleX(${isRevealing ? 0 : 1})`,
          width: '100%',
          height: '1px',
          background: 'linear-gradient(90deg, transparent, rgba(0, 245, 212, 0.8), rgba(59, 130, 246, 0.8), transparent)',
          boxShadow: '0 0 15px rgba(0, 245, 212, 0.8)',
          transition: 'transform 0.35s ease, opacity 0.35s ease',
          opacity: isRevealing ? 0 : 0.8,
          pointerEvents: 'none'
        }}
      />

      {/* Center Branded Content Box */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 10,
          opacity: isRevealing ? 0 : 1,
          transform: isRevealing ? 'scale(0.96) translateY(-10px)' : 'scale(1) translateY(0)',
          transition: 'opacity 0.28s ease, transform 0.28s ease',
          pointerEvents: 'none'
        }}
      >
        {/* Subtle Ambient Radial Glow */}
        <div
          style={{
            position: 'absolute',
            width: '420px',
            height: '420px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(0, 245, 212, 0.12) 0%, rgba(59, 130, 246, 0.05) 45%, transparent 70%)',
            pointerEvents: 'none',
            zIndex: -1,
            animation: 'preloaderPulse 2.5s infinite ease-in-out'
          }}
        />

        {/* Brand Name Typography */}
        <h1
          style={{
            fontWeight: 800,
            fontSize: 'clamp(2.6rem, 7vw, 4rem)',
            letterSpacing: '-0.03em',
            fontFamily: 'var(--font-heading)',
            color: '#ffffff',
            display: 'flex',
            alignItems: 'center',
            gap: '2px',
            margin: 0,
            textShadow: '0 0 35px rgba(0, 245, 212, 0.35)'
          }}
        >
          AzHKy<span style={{ color: 'var(--accent-cyan)', textShadow: '0 0 25px rgba(0, 245, 212, 0.9)' }}>.</span>
        </h1>

        {/* Subtitle / Role */}
        <div
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.72rem',
            letterSpacing: '0.22em',
            color: 'var(--text-muted)',
            textTransform: 'uppercase',
            marginTop: '0.45rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.65rem'
          }}
        >
          <span>PORTFOLIO 2026</span>
          <span style={{ color: 'var(--accent-cyan)', opacity: 0.7 }}>•</span>
          <span>UI/UX & DESIGN</span>
        </div>

        {/* Progress Bar Container */}
        <div
          style={{
            width: '210px',
            height: '2.5px',
            background: 'rgba(255, 255, 255, 0.08)',
            borderRadius: '999px',
            overflow: 'hidden',
            position: 'relative',
            marginTop: '2rem',
            boxShadow: 'inset 0 1px 2px rgba(0, 0, 0, 0.6)'
          }}
        >
          <div
            style={{
              width: `${progress}%`,
              height: '100%',
              background: 'linear-gradient(90deg, rgba(0, 245, 212, 0.7), #00f5d4)',
              boxShadow: '0 0 14px rgba(0, 245, 212, 0.9)',
              transition: 'width 0.05s linear',
              borderRadius: '999px'
            }}
          />
        </div>

        {/* Status & Numeric Counter */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            width: '210px',
            marginTop: '0.65rem',
            fontFamily: 'var(--font-mono)',
            fontSize: '0.68rem',
            color: 'var(--text-dim)',
            letterSpacing: '0.05em'
          }}
        >
          <span style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
            <span
              style={{
                width: '5px',
                height: '5px',
                borderRadius: '50%',
                background: 'var(--accent-cyan)',
                boxShadow: '0 0 8px var(--accent-cyan)',
                display: 'inline-block'
              }}
            />
            INITIALIZING
          </span>
          <span style={{ color: 'var(--accent-cyan)', fontWeight: 600 }}>
            {progress}%
          </span>
        </div>
      </div>

      {/* Keyframe animation for subtle ambient pulse */}
      <style>{`
        @keyframes preloaderPulse {
          0%, 100% {
            transform: scale(0.95);
            opacity: 0.8;
          }
          50% {
            transform: scale(1.08);
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
};
