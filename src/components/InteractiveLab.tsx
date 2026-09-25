import React, { useRef, useEffect, useState } from 'react';
import { Wand2, Play, Pause, Sparkles } from 'lucide-react';
import type { PerformanceMode } from '../types';

interface InteractiveLabProps {
  mode: PerformanceMode;
}

export const InteractiveLab: React.FC<InteractiveLabProps> = ({ mode }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [particleDensity, setParticleDensity] = useState<number>(mode === 'eco' ? 30 : 60);
  const [waveSpeed, setWaveSpeed] = useState<number>(1.2);
  const [colorTheme, setColorTheme] = useState<'cyan' | 'violet' | 'emerald'>('cyan');
  const [isRunning, setIsRunning] = useState<boolean>(true);

  // Colors
  const themeColors = {
    cyan: { primary: '#00f5d4', rgb: '0, 245, 212' },
    violet: { primary: '#a855f7', rgb: '168, 85, 247' },
    emerald: { primary: '#10b981', rgb: '16, 185, 129' }
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || 800);
    let height = (canvas.height = 360);

    const handleResize = () => {
      if (!canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = 360;
    };
    window.addEventListener('resize', handleResize);

    // Particle nodes
    interface Node {
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;
      baseY: number;
      phase: number;
    }

    const count = mode === 'eco' ? Math.min(particleDensity, 30) : particleDensity;
    const nodes: Node[] = [];
    for (let i = 0; i < count; i++) {
      const x = Math.random() * width;
      const y = Math.random() * height;
      nodes.push({
        x,
        y,
        vx: (Math.random() - 0.5) * 0.8,
        vy: (Math.random() - 0.5) * 0.8,
        radius: Math.random() * 2 + 1.5,
        baseY: y,
        phase: Math.random() * Math.PI * 2
      });
    }

    // Mouse interaction
    let mouseX = -1000;
    let mouseY = -1000;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseX = e.clientX - rect.left;
      mouseY = e.clientY - rect.top;
    };

    const handleMouseLeave = () => {
      mouseX = -1000;
      mouseY = -1000;
    };

    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseleave', handleMouseLeave);

    let step = 0;

    const render = () => {
      if (!isRunning) {
        animId = requestAnimationFrame(render);
        return;
      }

      ctx.clearRect(0, 0, width, height);

      step += 0.02 * waveSpeed;

      const current = themeColors[colorTheme];

      // Update and draw nodes
      for (let i = 0; i < nodes.length; i++) {
        const n = nodes[i];

        // Sinusoidal wave motion
        n.y = n.baseY + Math.sin(step + n.phase) * 18;
        n.x += n.vx;

        // Bounce on boundary
        if (n.x < 0 || n.x > width) n.vx *= -1;
        if (n.baseY < 20 || n.baseY > height - 20) n.vy *= -1;
        n.baseY += n.vy;

        // Mouse repulsion / gravitation
        const dx = mouseX - n.x;
        const dy = mouseY - n.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 120) {
          const force = (120 - dist) / 120;
          n.x -= (dx / dist) * force * 4;
          n.y -= (dy / dist) * force * 4;
        }

        // Draw particle node
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.radius, 0, Math.PI * 2);
        ctx.fillStyle = current.primary;
        ctx.shadowColor = current.primary;
        ctx.shadowBlur = mode === 'ultra' ? 8 : 0;
        ctx.fill();

        // Draw connective lines
        for (let j = i + 1; j < nodes.length; j++) {
          const n2 = nodes[j];
          const dist2 = Math.hypot(n.x - n2.x, n.y - n2.y);
          if (dist2 < 90) {
            ctx.beginPath();
            ctx.moveTo(n.x, n.y);
            ctx.lineTo(n2.x, n2.y);
            ctx.strokeStyle = `rgba(${current.rgb}, ${(1 - dist2 / 90) * 0.35})`;
            ctx.lineWidth = 1;
            ctx.shadowBlur = 0;
            ctx.stroke();
          }
        }
      }

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [particleDensity, waveSpeed, colorTheme, isRunning, mode]);

  return (
    <section id="lab" className="section">
      <div className="container">
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <div className="badge" style={{ marginBottom: '1rem' }}>
            <Wand2 size={13} />
            <span>Interactive Playground</span>
          </div>
          <h2
            className="heading-display heading-gradient"
            style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', marginBottom: '1rem' }}
          >
            Creative Code <span className="cyan-gradient">Lab</span>
          </h2>
          <p style={{ color: 'var(--text-secondary)', maxWidth: '620px', margin: '0 auto', fontSize: '1.05rem' }}>
            Direct interactive demonstration of canvas mathematics, harmonic waveforms, and reactive forcefields. Hover or drag your cursor across the simulator.
          </p>
        </div>

        {/* Lab Card Container */}
        <div
          className="glass-card"
          style={{
            padding: '1.5rem',
            position: 'relative',
            background: 'rgba(9, 12, 18, 0.85)'
          }}
        >
          {/* Controls Bar */}
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '1rem',
              paddingBottom: '1.25rem',
              marginBottom: '1rem',
              borderBottom: '1px solid rgba(255, 255, 255, 0.08)'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <button
                onClick={() => setIsRunning(!isRunning)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.4rem',
                  padding: '0.45rem 0.95rem',
                  borderRadius: '8px',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  background: isRunning ? 'rgba(0, 245, 212, 0.12)' : 'rgba(255, 255, 255, 0.05)',
                  color: isRunning ? 'var(--accent-cyan)' : 'var(--text-secondary)',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.78rem',
                  cursor: 'pointer'
                }}
              >
                {isRunning ? <Pause size={14} /> : <Play size={14} />}
                <span>{isRunning ? 'Pause Sim' : 'Resume Sim'}</span>
              </button>

              <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                {(['cyan', 'violet', 'emerald'] as const).map((t) => (
                  <button
                    key={t}
                    onClick={() => setColorTheme(t)}
                    title={`Color Mode: ${t}`}
                    style={{
                      width: '24px',
                      height: '24px',
                      borderRadius: '50%',
                      background: themeColors[t].primary,
                      border: colorTheme === t ? '2px solid #fff' : '2px solid transparent',
                      cursor: 'pointer',
                      transform: colorTheme === t ? 'scale(1.15)' : 'scale(1)',
                      transition: 'all 0.15s ease'
                    }}
                  />
                ))}
              </div>
            </div>

            {/* Slider Controls */}
            <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '1.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                <span style={{ fontSize: '0.75rem', fontFamily: 'var(--font-mono)', color: 'var(--text-muted)' }}>
                  Nodes: {particleDensity}
                </span>
                <input
                  type="range"
                  min="20"
                  max="100"
                  value={particleDensity}
                  onChange={(e) => setParticleDensity(Number(e.target.value))}
                  style={{ accentColor: 'var(--accent-cyan)', cursor: 'pointer' }}
                />
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                <span style={{ fontSize: '0.75rem', fontFamily: 'var(--font-mono)', color: 'var(--text-muted)' }}>
                  Wave: {waveSpeed.toFixed(1)}x
                </span>
                <input
                  type="range"
                  min="0.5"
                  max="3"
                  step="0.1"
                  value={waveSpeed}
                  onChange={(e) => setWaveSpeed(Number(e.target.value))}
                  style={{ accentColor: 'var(--accent-cyan)', cursor: 'pointer' }}
                />
              </div>
            </div>
          </div>

          {/* Interactive Canvas Area */}
          <div
            style={{
              position: 'relative',
              width: '100%',
              borderRadius: '0.85rem',
              overflow: 'hidden',
              background: 'radial-gradient(ellipse at center, rgba(6, 10, 16, 0.95), rgba(3, 4, 6, 0.98))',
              border: '1px solid rgba(255, 255, 255, 0.05)'
            }}
          >
            <canvas
              ref={canvasRef}
              style={{
                display: 'block',
                width: '100%',
                height: '360px',
                cursor: 'crosshair'
              }}
            />

            {/* Hint overlay */}
            <div
              style={{
                position: 'absolute',
                bottom: '1rem',
                left: '1rem',
                pointerEvents: 'none',
                display: 'flex',
                alignItems: 'center',
                gap: '0.45rem',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.72rem',
                color: 'var(--text-muted)',
                background: 'rgba(0,0,0,0.6)',
                padding: '0.25rem 0.65rem',
                borderRadius: '4px'
              }}
            >
              <Sparkles size={12} color="var(--accent-cyan)" />
              <span>Interactive: Move cursor inside canvas to create kinetic forcefields</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
