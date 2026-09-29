import React, { useEffect, useRef, useState } from 'react';
import { User } from 'lucide-react';
import { SOFTWARE_TOOLS } from '../data/portfolioData';

export const BentoGrid: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  // scrollProgress: 0 = section belum terlihat, 1 = section sudah penuh di viewport
  const [scrollProgress, setScrollProgress] = useState(0);
  const [iconsVisible, setIconsVisible] = useState(false);

  // Visual Glitch State for CREATIVE & VISUAL (murni efek visual glitch tanpa acak teks agar objek tidak bergeser)
  const [isGlitching, setIsGlitching] = useState(false);
  const triggerGlitchRef = useRef<() => void>(() => {});
  const hasGlitchTriggeredOnScroll = useRef(false);

  // Bouncing Ball Traversal State for Software Logos
  const iconsGridRef = useRef<HTMLDivElement>(null);
  const iconRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [activeGlowIndex, setActiveGlowIndex] = useState<number | null>(null);
  const [ballPos, setBallPos] = useState({ x: 0, y: 0 });
  const [ballVisible, setBallVisible] = useState(false);
  const [currentBallColor, setCurrentBallColor] = useState('var(--accent-cyan)');

  // Animasi looping bola memantul & melompat antar logo software
  useEffect(() => {
    if (!iconsVisible) {
      setBallVisible(false);
      setActiveGlowIndex(null);
      return;
    }

    let animId: number;
    let startTimeoutId: number;

    // Tunggu sampai animasi masuk icon selesai (sekitar 750ms setelah iconsVisible aktif)
    startTimeoutId = window.setTimeout(() => {
      const grid = iconsGridRef.current;
      const icons = iconRefs.current;
      if (!grid || icons.length === 0 || !icons[0]) return;

      const getIconCoords = (idx: number) => {
        const icon = icons[idx];
        if (!icon) return { x: 0, y: 0 };
        return {
          x: icon.offsetLeft + icon.offsetWidth / 2 - 7.5, // center of 15px orb
          y: icon.offsetTop - 12 // landing point right on top of the icon
        };
      };

      let currentIndex = 0;
      let targetIndex = 1;
      let phase: 'bounce_on_logo' | 'leap_to_next' = 'bounce_on_logo';
      let phaseStartTime = performance.now();

      // Durasi diperlambat dan dibuat jauh lebih halus (smooth & gentle)
      const BOUNCE_DURATION = 800; // memantul tenang & mengapung di atas logo
      const LEAP_ADJACENT_DURATION = 1100; // melompat melambat ke logo sebelah
      const LEAP_LOOP_DURATION = 1500; // melompat busur melambat kembali ke logo pertama

      const initialCoords = getIconCoords(0);
      setBallPos(initialCoords);
      setBallVisible(true);
      setActiveGlowIndex(0);
      setCurrentBallColor(SOFTWARE_TOOLS[0].accentColor);

      const loop = (currentTime: number) => {
        const elapsed = currentTime - phaseStartTime;

        if (phase === 'bounce_on_logo') {
          const t = Math.min(1, elapsed / BOUNCE_DURATION);
          const coords = getIconCoords(currentIndex);
          // Pantulan melambat, lembut mengapung di atas logo
          const bounceOffset = -Math.sin(t * Math.PI) * 11;

          setBallPos({
            x: coords.x,
            y: coords.y + bounceOffset
          });

          if (t >= 1) {
            phase = 'leap_to_next';
            targetIndex = (currentIndex + 1) % SOFTWARE_TOOLS.length;
            phaseStartTime = currentTime;
          }
        } else if (phase === 'leap_to_next') {
          const isLoopingBack = currentIndex === SOFTWARE_TOOLS.length - 1 && targetIndex === 0;
          const duration = isLoopingBack ? LEAP_LOOP_DURATION : LEAP_ADJACENT_DURATION;
          const t = Math.min(1, elapsed / duration);

          // Easing kosinus harmonik ultra-smooth tanpa hentakan mendadak
          const easeT = 0.5 * (1 - Math.cos(t * Math.PI));
          const fromCoords = getIconCoords(currentIndex);
          const toCoords = getIconCoords(targetIndex);

          // Ketinggian busur lompatan melambat
          const arcHeight = isLoopingBack ? 58 : 34;
          const jumpArc = -Math.sin(t * Math.PI) * arcHeight;

          setBallPos({
            x: fromCoords.x + (toCoords.x - fromCoords.x) * easeT,
            y: fromCoords.y + (toCoords.y - fromCoords.y) * easeT + jumpArc
          });

          // Saat mendekati pendaratan (>70% perjalanan), logo target mulai menyala dengan transisi lembut
          if (t >= 0.70 && activeGlowIndex !== targetIndex) {
            setActiveGlowIndex(targetIndex);
            setCurrentBallColor(SOFTWARE_TOOLS[targetIndex].accentColor);
          }

          if (t >= 1) {
            currentIndex = targetIndex;
            phase = 'bounce_on_logo';
            phaseStartTime = currentTime;
            setActiveGlowIndex(currentIndex);
            setCurrentBallColor(SOFTWARE_TOOLS[currentIndex].accentColor);
          }
        }

        animId = requestAnimationFrame(loop);
      };

      animId = requestAnimationFrame(loop);
    }, 850);

    return () => {
      window.clearTimeout(startTimeoutId);
      cancelAnimationFrame(animId);
    };
  }, [iconsVisible]);

  // Efek Visual Glitch (Jitter & Chromatic Slice tanpa merubah huruf)
  useEffect(() => {
    let timeoutId: number;
    let resetTimerId: number;
    let isRunning = false;

    const triggerGlitch = () => {
      if (isRunning) return;
      isRunning = true;
      setIsGlitching(true);

      // Durasi efek glitch 420ms
      resetTimerId = window.setTimeout(() => {
        setIsGlitching(false);
        isRunning = false;
        // Jadwalkan glitch visual berikutnya setiap 6 detik
        timeoutId = window.setTimeout(triggerGlitch, 6000);
      }, 420);
    };

    triggerGlitchRef.current = () => {
      if (isRunning) return;
      window.clearTimeout(timeoutId);
      window.clearTimeout(resetTimerId);
      triggerGlitch();
    };

    // Jeda inisial sebelum glitch berkala pertama aktif
    timeoutId = window.setTimeout(triggerGlitch, 3500);

    return () => {
      window.clearTimeout(timeoutId);
      window.clearTimeout(resetTimerId);
    };
  }, []);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          if (sectionRef.current) {
            const rect = sectionRef.current.getBoundingClientRect();
            const windowHeight = window.innerHeight;

            // startPoint: Animasi mulai saat rect.top = windowHeight * 0.90
            const startPoint = windowHeight * 0.90;
            const endPoint = windowHeight * 0.10;

            const raw = (startPoint - rect.top) / (startPoint - endPoint);
            const clamped = Math.min(1, Math.max(0, raw));

            setScrollProgress(clamped);

            // Memicu animasi masuk logo setelah teks judul (CREATIVE, VISUAL, ART.) telah sepenuhnya tampil di layar
            const textHasFullyAppeared = clamped >= 0.45;

            if (textHasFullyAppeared) {
              setIconsVisible(true);
              if (!hasGlitchTriggeredOnScroll.current) {
                hasGlitchTriggeredOnScroll.current = true;
                triggerGlitchRef.current();
              }
            } else if (clamped < 0.20) {
              // Reset saat discroll kembali ke atas sehingga animasi dapat diputar ulang
              setIconsVisible(false);
              hasGlitchTriggeredOnScroll.current = false;
            }
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial check
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // ======== Koreografi scroll-driven per elemen ========

  // Sisi Kanan (Judul): Muncul pertama, dari progress 0 → 0.45
  // Bergerak dari kanan (+150px) → ke posisi asli (0px)
  const rightProgress = Math.min(1, scrollProgress / 0.45);
  const rightEase = rightProgress * rightProgress * (3 - 2 * rightProgress); // Smooth ease
  const rightTranslateX = (1 - rightEase) * 120;
  const rightOpacity = rightEase;

  // Sisi Kiri (Bio): Mulai masuk dari progress 0.3 → 0.8 (menyusul)
  // Bergerak dari bawah (translateY: +100px) → ke posisi asli (0px)
  const leftRaw = Math.min(1, Math.max(0, (scrollProgress - 0.3) / 0.5));
  const leftEase = leftRaw * leftRaw * (3 - 2 * leftRaw); // Smooth ease
  const leftTranslateY = (1 - leftEase) * 100;
  const leftOpacity = leftEase;

  return (
    <section ref={sectionRef} id="about" className="section" style={{ position: 'relative', zIndex: 10, padding: '8rem 0' }}>
      <div className="container">
        <div className="about-aesthetic-grid">

          {/* ================= LEFT SIDE: Highlighted Intro & Bio ================= */}
          <div
            className="about-text-col"
            style={{
              opacity: leftOpacity,
              transform: `translateY(${leftTranslateY}px)`,
              willChange: 'opacity, transform'
            }}
          >
            <h3
              style={{
                fontSize: 'clamp(1.75rem, 3.5vw, 2.5rem)',
                fontWeight: 500,
                color: '#ffffff',
                lineHeight: 1.45,
                letterSpacing: '-0.01em',
                marginBottom: '2rem'
              }}
            >
              Halo, saya <span className="shimmer-text" style={{ fontWeight: 800 }}>Arif Ahmad Muzakky</span>, seorang mahasiswa program studi D3 Manajemen Informatika di Universitas Lampung.
            </h3>

            <p
              style={{
                fontSize: '1.15rem',
                color: 'var(--text-secondary)',
                lineHeight: 1.8,
                maxWidth: '650px',
                fontWeight: 400
              }}
            >
              Saya memiliki ketertarikan yang mendalam terhadap dunia estetika visual. Mulai dari Desain Grafis, UI/UX Design, Fotografi, hingga Videografi dan proses <em>editing</em>—saya selalu antusias dalam menciptakan maupun menikmati karya visual yang memanjakan mata.
            </p>
          </div>

          {/* ================= RIGHT SIDE: Aesthetic Section Title ================= */}
          <div className="about-title-col">
            <div
              style={{
                opacity: rightOpacity,
                transform: `translateX(${rightTranslateX}px)`,
                willChange: 'opacity, transform',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-end',
                width: '100%'
              }}
            >
              <div
                className="badge"
                style={{
                  marginBottom: '1.5rem',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem'
                }}
              >
                <User size={13} />
                <span>Tentang Saya</span>
              </div>

              <h2
                style={{
                  fontSize: 'clamp(3.5rem, 6vw, 5.5rem)',
                  fontWeight: 800,
                  fontFamily: 'var(--font-heading)',
                  lineHeight: 0.95,
                  textAlign: 'right',
                  margin: 0,
                  textTransform: 'uppercase'
                }}
              >
                <div
                  className={`glitch-outline-title ${isGlitching ? 'glitch-active' : ''}`}
                  data-text="CREATIVE"
                  onMouseEnter={() => triggerGlitchRef.current()}
                  title="Hover to glitch"
                >
                  CREATIVE
                </div>

                <div
                  className={`glitch-outline-title ${isGlitching ? 'glitch-active' : ''}`}
                  data-text="VISUAL"
                  onMouseEnter={() => triggerGlitchRef.current()}
                  title="Hover to glitch"
                >
                  VISUAL
                </div>

                <div style={{ color: 'var(--text-primary)', textShadow: '0 0 25px rgba(0, 245, 212, 0.4)' }}>
                  ART.
                </div>
              </h2>

              {/* ================= 3D SOFTWARE TOOLS DOCK ================= */}
              <div
                className="software-tools-wrapper"
                style={{
                  marginTop: '2.5rem',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'flex-end',
                  width: '100%'
                }}
              >
                <div
                  style={{
                    fontSize: '0.76rem',
                    fontFamily: 'var(--font-mono)',
                    color: 'var(--text-muted)',
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                    marginBottom: '0.85rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.45rem'
                  }}
                  className={`software-dock-label ${iconsVisible ? 'label-animate-in' : ''}`}
                >
                  <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--accent-cyan)' }} />
                  <span>Software Utama</span>
                </div>

                <div className="software-icons-grid" ref={iconsGridRef}>
                  {/* Bouncing Energy Orb traversing above the software logos */}
                  {iconsVisible && (
                    <div
                      className="bouncing-orb-tracker"
                      style={{
                        transform: `translate3d(${ballPos.x}px, ${ballPos.y}px, 0)`,
                        opacity: ballVisible ? 1 : 0,
                        '--ball-color': currentBallColor
                      } as React.CSSProperties}
                    >
                      <div className="bouncing-orb" />
                    </div>
                  )}

                  {SOFTWARE_TOOLS.map((tool, index) => (
                    <div
                      key={tool.id}
                      ref={(el) => { iconRefs.current[index] = el; }}
                      className={`software-icon-anim-item ${iconsVisible ? 'icon-anim-active' : ''}`}
                      style={{
                        animationDelay: `${index * 110 + 160}ms`
                      }}
                    >
                      <div
                        className={`software-icon-card ${activeGlowIndex === index ? 'ball-active' : ''}`}
                        title={`${tool.name} — ${tool.category}`}
                        style={{
                          '--tool-accent': tool.accentColor
                        } as React.CSSProperties}
                      >
                        <div className="software-icon-glow" style={{ background: tool.accentColor }} />
                        <img
                          src={tool.icon3D}
                          alt={`${tool.name} 3D Icon`}
                          className="software-icon-img"
                        />
                        <span className="software-icon-tooltip">{tool.name}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Subtle glow behind the title */}
              <div
                style={{
                  position: 'absolute',
                  top: '50%',
                  right: '0',
                  transform: 'translate(20%, -50%)',
                  width: '300px',
                  height: '300px',
                  background: 'radial-gradient(circle, rgba(0, 245, 212, 0.08) 0%, transparent 70%)',
                  pointerEvents: 'none',
                  zIndex: -1
                }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Responsive Styles */}
      <style>{`
        .about-aesthetic-grid {
          display: grid;
          grid-template-columns: repeat(12, 1fr);
          gap: 4rem;
          align-items: flex-start;
        }
        .about-text-col {
          grid-column: span 7;
        }
        .about-title-col {
          grid-column: span 5;
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          border-left: 1px solid rgba(255, 255, 255, 0.08);
          padding-left: 2rem;
          position: relative;
        }

        /* Mobile Adjustments */
        @media (max-width: 960px) {
          .about-aesthetic-grid {
            grid-template-columns: 1fr;
            gap: clamp(1.75rem, 6vw, 3rem);
          }
          .about-text-col, .about-title-col {
            grid-column: span 1;
          }
          /* Judul naik ke atas, deskripsi turun ke bawah */
          .about-title-col {
            order: -1;
          }
          .about-text-col {
            order: 1;
          }
          .about-text-col h3 {
            font-size: clamp(1.2rem, 5.5vw, 1.9rem) !important;
            margin-bottom: clamp(1rem, 4vw, 1.75rem) !important;
          }
          .about-text-col p {
            font-size: clamp(0.88rem, 3.8vw, 1.05rem) !important;
            line-height: 1.7 !important;
          }
          .about-title-col {
            align-items: flex-end;
            border-left: none;
            border-top: none;
            padding-left: 0;
            padding-top: 0;
            padding-bottom: clamp(1rem, 4vw, 1.75rem);
          }
          .about-text-col {
            border-top: 1px solid rgba(255, 255, 255, 0.08) !important;
            padding-top: clamp(1.25rem, 5vw, 2rem) !important;
          }
          .about-title-col h2 {
            text-align: right !important;
            font-size: clamp(2.4rem, 11vw, 4.5rem) !important;
          }
          .about-title-col .badge {
            align-self: flex-end !important;
          }
          .software-tools-wrapper {
            align-items: flex-end !important;
          }
          .software-dock-label {
            justify-content: flex-end !important;
          }
          .software-icons-grid {
            justify-content: flex-end !important;
            gap: clamp(0.7rem, 3vw, 1.15rem) !important;
          }
          .software-icon-card {
            width: clamp(42px, 11vw, 60px) !important;
            height: clamp(42px, 11vw, 60px) !important;
          }
        }

        /* 3D Software Icons & Staggered Entrance Animations */
        .software-dock-label {
          opacity: 0;
          transform: translateY(12px);
          transition: opacity 0.5s ease 0.1s, transform 0.5s cubic-bezier(0.16, 1, 0.3, 1) 0.1s;
        }

        .software-dock-label.label-animate-in {
          opacity: 1;
          transform: translateY(0);
        }

        .software-icons-grid {
          position: relative;
          display: flex;
          align-items: center;
          gap: 1.15rem;
          flex-wrap: wrap;
          justify-content: flex-end;
          padding-top: 1.6rem;
        }

        /* Bouncing Energy Orb Tracker & Ball */
        .bouncing-orb-tracker {
          position: absolute;
          top: 0;
          left: 0;
          pointer-events: none;
          z-index: 30;
          will-change: transform, opacity;
          transition: opacity 0.35s ease;
        }

        .bouncing-orb {
          width: 15px;
          height: 15px;
          border-radius: 50%;
          background: radial-gradient(circle at 35% 35%, #ffffff 20%, #f0fdf4 40%, var(--ball-color, #00f5d4) 90%);
          box-shadow: 
            0 0 6px rgba(255, 255, 255, 0.9),
            0 0 14px var(--ball-color, #00f5d4),
            0 3px 8px rgba(0, 0, 0, 0.4);
          position: relative;
          transition: box-shadow 0.35s ease, background 0.35s ease;
        }

        /* Radiant Energy Halo */
        .bouncing-orb::after {
          content: '';
          position: absolute;
          inset: -3px;
          border-radius: 50%;
          background: radial-gradient(circle, var(--ball-color, #00f5d4) 0%, transparent 75%);
          opacity: 0.5;
          filter: blur(3px);
          animation: orbAuraPulse 1.2s ease-in-out infinite alternate;
        }

        @keyframes orbAuraPulse {
          0% { transform: scale(0.9); opacity: 0.35; }
          100% { transform: scale(1.2); opacity: 0.6; }
        }

        /* Active Glow State on Logo when Landed/Hopped on by the Ball - Dikecilkan intensitasnya & lebih halus */
        .software-icon-card.ball-active {
          transform: translateY(-4px) scale(1.04);
          transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .software-icon-card.ball-active .software-icon-glow {
          opacity: 0.48 !important;
          filter: blur(14px) !important;
          transform: scale(1.12);
          transition: opacity 0.5s ease, filter 0.5s ease, transform 0.5s ease;
        }

        .software-icon-card.ball-active .software-icon-img {
          filter: drop-shadow(0 8px 16px var(--tool-accent, rgba(0, 245, 212, 0.35))) brightness(1.08);
        }

        /* Staggered Entrance Animation Wrapper */
        .software-icon-anim-item {
          opacity: 0;
          transform: translateY(48px) scale(0.75);
          filter: blur(5px);
          pointer-events: none;
          transition: opacity 0.25s ease, transform 0.25s ease;
        }

        .software-icon-anim-item.icon-anim-active {
          animation: iconStaggerUp 0.58s cubic-bezier(0.34, 1.56, 0.64, 1) both;
          pointer-events: auto;
        }

        @keyframes iconStaggerUp {
          0% {
            opacity: 0;
            transform: translateY(60px) scale(0.7);
            filter: blur(6px);
          }
          60% {
            opacity: 1;
            transform: translateY(-8px) scale(1.06);
            filter: blur(0px);
          }
          82% {
            transform: translateY(2px) scale(0.98);
          }
          100% {
            opacity: 1;
            transform: translateY(0) scale(1);
            filter: blur(0px);
          }
        }

        .software-icon-card {
          position: relative;
          width: clamp(56px, 5.5vw, 68px);
          height: clamp(56px, 5.5vw, 68px);
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .software-icon-card:hover {
          transform: translateY(-8px) scale(1.12);
        }

        .software-icon-img {
          width: 100%;
          height: 100%;
          object-fit: contain;
          filter: drop-shadow(0 10px 20px rgba(0, 0, 0, 0.85));
          transition: filter 0.3s ease;
        }

        .software-icon-card:hover .software-icon-img {
          filter: drop-shadow(0 16px 28px rgba(0, 245, 212, 0.45));
        }

        .software-icon-glow {
          position: absolute;
          inset: 10%;
          border-radius: 50%;
          filter: blur(20px);
          opacity: 0;
          transition: opacity 0.3s ease;
          pointer-events: none;
          z-index: -1;
        }

        .software-icon-card:hover .software-icon-glow {
          opacity: 0.6;
        }

        .software-icon-tooltip {
          position: absolute;
          bottom: -30px;
          left: 50%;
          transform: translateX(-50%) translateY(4px);
          background: rgba(8, 12, 18, 0.95);
          border: 1px solid rgba(0, 245, 212, 0.35);
          color: #fff;
          font-family: var(--font-mono);
          font-size: 0.72rem;
          font-weight: 600;
          padding: 0.25rem 0.65rem;
          border-radius: 6px;
          white-space: nowrap;
          pointer-events: none;
          opacity: 0;
          transition: opacity 0.2s ease, transform 0.2s ease;
          box-shadow: 0 8px 20px rgba(0, 0, 0, 0.8);
          z-index: 10;
        }

        .software-icon-card:hover .software-icon-tooltip {
          opacity: 1;
          transform: translateX(-50%) translateY(0);
        }

        /* Pure Visual Glitch for Outline Title (Zero Layout Shift, Fixed Width) */
        .glitch-outline-title {
          position: relative;
          color: transparent;
          -webkit-text-stroke: 2px rgba(0, 245, 212, 0.7);
          text-shadow: 0 0 20px rgba(0, 245, 212, 0.3);
          cursor: pointer;
          user-select: none;
          display: block;
          transition: text-shadow 0.2s ease;
        }

        .glitch-outline-title::before,
        .glitch-outline-title::after {
          content: attr(data-text);
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          text-align: inherit;
          pointer-events: none;
          opacity: 0;
          color: transparent;
        }

        .glitch-outline-title.glitch-active {
          text-shadow: 2px 0 var(--accent-cyan), -2px 0 #ff3366, 0 0 25px rgba(0, 245, 212, 0.5);
        }

        .glitch-outline-title.glitch-active::before {
          opacity: 0.92;
          -webkit-text-stroke: 2px rgba(0, 245, 212, 0.95);
          text-shadow: -3px 0 var(--accent-cyan);
          animation: glitchSliceTop 0.42s steps(2, jump-none) both;
        }

        .glitch-outline-title.glitch-active::after {
          opacity: 0.92;
          -webkit-text-stroke: 2px rgba(255, 51, 102, 0.9);
          text-shadow: 3px 0 #ff3366;
          animation: glitchSliceBottom 0.42s steps(2, jump-none) both;
        }

        @keyframes glitchSliceTop {
          0% {
            clip-path: inset(18% 0 58% 0);
            transform: translate(-3px, 0);
          }
          25% {
            clip-path: inset(48% 0 22% 0);
            transform: translate(3px, 0);
          }
          50% {
            clip-path: inset(8% 0 78% 0);
            transform: translate(-2px, 0);
          }
          75% {
            clip-path: inset(68% 0 12% 0);
            transform: translate(2px, 0);
          }
          100% {
            clip-path: inset(0 0 100% 0);
            transform: translate(0, 0);
            opacity: 0;
          }
        }

        @keyframes glitchSliceBottom {
          0% {
            clip-path: inset(58% 0 18% 0);
            transform: translate(3px, 0);
          }
          25% {
            clip-path: inset(22% 0 62% 0);
            transform: translate(-3px, 0);
          }
          50% {
            clip-path: inset(72% 0 8% 0);
            transform: translate(2px, 0);
          }
          75% {
            clip-path: inset(32% 0 48% 0);
            transform: translate(-2px, 0);
          }
          100% {
            clip-path: inset(0 0 100% 0);
            transform: translate(0, 0);
            opacity: 0;
          }
        }
      `}</style>
    </section>
  );
};
