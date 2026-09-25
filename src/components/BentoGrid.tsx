import React, { useEffect, useRef, useState } from 'react';
import { User } from 'lucide-react';

export const BentoGrid: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  // scrollProgress: 0 = section belum terlihat, 1 = section sudah penuh di viewport
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          if (sectionRef.current) {
            const rect = sectionRef.current.getBoundingClientRect();
            const windowHeight = window.innerHeight;

            // startPoint: Animasi mulai saat rect.top = windowHeight * 0.10
            // Artinya section harus sudah naik 90% ke dalam viewport baru memicu animasi
            const startPoint = windowHeight * 0.90;   // Trigger: section baru sedikit masuk dari bawah layar
            const endPoint = windowHeight * 0.10;     // Selesai: section sudah di pertengahan layar (semua teks tampil)

            const raw = (startPoint - rect.top) / (startPoint - endPoint);
            const clamped = Math.min(1, Math.max(0, raw));

            setScrollProgress(clamped);
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
                <span>About Me</span>
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
                <div style={{ color: 'transparent', WebkitTextStroke: '2px rgba(0, 245, 212, 0.7)', textShadow: '0 0 20px rgba(0, 245, 212, 0.3)' }}>CREATIVE</div>
                <div style={{ color: 'transparent', WebkitTextStroke: '2px rgba(0, 245, 212, 0.7)', textShadow: '0 0 20px rgba(0, 245, 212, 0.3)' }}>VISUAL</div>
                <div style={{ color: 'var(--text-primary)', textShadow: '0 0 25px rgba(0, 245, 212, 0.4)' }}>ART.</div>
              </h2>

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
            gap: 3rem;
          }
          .about-text-col, .about-title-col {
            grid-column: span 1;
          }
          .about-title-col {
            align-items: flex-start;
            border-left: none;
            border-top: 1px solid rgba(255, 255, 255, 0.08);
            padding-left: 0;
            padding-top: 2rem;
          }
          .about-title-col h2 {
            text-align: left !important;
          }
          .about-title-col .badge {
            align-self: flex-start !important;
          }
        }
      `}</style>
    </section>
  );
};
