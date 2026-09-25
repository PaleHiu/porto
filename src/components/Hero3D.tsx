import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { ArrowDown } from 'lucide-react';
import { WhatsappIcon, InstagramIcon, TiktokIcon } from './Icons';
import type { PerformanceMode } from '../types';
import { PERSONAL_INFO } from '../data/portfolioData';

interface Hero3DProps {
  mode: PerformanceMode;
}

export const Hero3D: React.FC<Hero3DProps> = ({ mode }) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const heroSectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  // Pinned Scroll State
  const [scrollProgress, setScrollProgress] = useState(0);
  const scrollProgressRef = useRef(0);

  // Glitch & Scramble Text State
  const [glitchName, setGlitchName] = useState(PERSONAL_INFO.name);
  const [isGlitching, setIsGlitching] = useState(false);

  useEffect(() => {
    let timeoutId: number;
    let animFrameId: number;
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ!<>-_\\/[]{}—=+*^?#_';

    const triggerGlitch = () => {
      setIsGlitching(true);
      const original = PERSONAL_INFO.name;
      let frame = 0;
      
      const update = () => {
        let output = '';
        for (let i = 0; i < original.length; i++) {
          if (original[i] === ' ') {
            output += ' ';
            continue;
          }
          if (frame < 16) {
            output += chars[Math.floor(Math.random() * chars.length)];
          } else {
            output += original[i];
          }
        }
        
        setGlitchName(output);
        
        if (frame < 16) {
          frame++;
          animFrameId = requestAnimationFrame(update);
        } else {
          setIsGlitching(false);
          setGlitchName(original);
          timeoutId = window.setTimeout(triggerGlitch, 8000);
        }
      };
      
      update();
    };

    timeoutId = window.setTimeout(triggerGlitch, 8000);

    return () => {
      clearTimeout(timeoutId);
      cancelAnimationFrame(animFrameId);
    };
  }, []);

  // Track scroll progress for the pinned scroll effect
  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          if (trackRef.current) {
            const rect = trackRef.current.getBoundingClientRect();
            const totalDistance = rect.height - window.innerHeight;
            if (totalDistance > 0) {
              const currentProgress = -rect.top / totalDistance;
              const clamped = Math.min(Math.max(currentProgress, 0), 1);
              setScrollProgress(clamped);
              scrollProgressRef.current = clamped;
            }
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Three.js Ambient 3D Particle & Ring Scene (Only in Ultra Mode)
  useEffect(() => {
    if (mode !== 'ultra' || !mountRef.current) return;

    let isVisible = true;
    let animationFrameId: number;

    const width = mountRef.current.clientWidth || window.innerWidth;
    const height = mountRef.current.clientHeight || 750;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.z = 7;

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance'
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    renderer.setClearColor(0x000000, 0);

    mountRef.current.innerHTML = '';
    mountRef.current.appendChild(renderer.domElement);

    // 1. Ambient Geometric Wireframe Torus Group
    const ringsGroup = new THREE.Group();
    scene.add(ringsGroup);

    const ringGeometry = new THREE.TorusGeometry(2.4, 0.08, 16, 100);
    const ringMaterial = new THREE.MeshBasicMaterial({
      color: 0x00f5d4,
      wireframe: true,
      transparent: true,
      opacity: 0.22
    });
    const ringMesh = new THREE.Mesh(ringGeometry, ringMaterial);
    ringsGroup.add(ringMesh);

    const innerRingGeometry = new THREE.TorusGeometry(1.6, 0.05, 16, 80);
    const innerRingMaterial = new THREE.MeshBasicMaterial({
      color: 0x3b82f6,
      wireframe: true,
      transparent: true,
      opacity: 0.18
    });
    const innerRingMesh = new THREE.Mesh(innerRingGeometry, innerRingMaterial);
    ringsGroup.add(innerRingMesh);

    const isMobileInitial = width <= 960;
    ringsGroup.position.set(isMobileInitial ? 0 : 2.4, 0, -1);

    // 2. Ambient Floating Particles
    const particleCount = 180;
    const particleGeometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount * 3; i += 3) {
      positions[i] = (Math.random() - 0.5) * 16;
      positions[i + 1] = (Math.random() - 0.5) * 14;
      positions[i + 2] = (Math.random() - 0.5) * 8;
    }
    particleGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

    const particleMaterial = new THREE.PointsMaterial({
      size: 0.045,
      color: 0x00f5d4,
      transparent: true,
      opacity: 0.6,
      blending: THREE.AdditiveBlending
    });

    const particles = new THREE.Points(particleGeometry, particleMaterial);
    scene.add(particles);

    // Dynamic Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);

    const cyanLight = new THREE.PointLight(0x00f5d4, 3, 12);
    cyanLight.position.set(3, 2, 3);
    scene.add(cyanLight);

    // Mouse Tracking with Inertia
    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;

    const handleMouseMove = (event: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      targetX = (event.clientX / innerWidth - 0.5) * 1.2;
      targetY = (event.clientY / innerHeight - 0.5) * 1.2;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    // IntersectionObserver to pause loop offscreen
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          isVisible = entry.isIntersecting;
        });
      },
      { threshold: 0.1 }
    );

    if (heroSectionRef.current) {
      observer.observe(heroSectionRef.current);
    }

    const handleResize = () => {
      if (!mountRef.current) return;
      const newWidth = mountRef.current.clientWidth;
      const newHeight = mountRef.current.clientHeight || 750;
      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(newWidth, newHeight);
    };

    window.addEventListener('resize', handleResize);

    // Animation loop using performance.now()
    const startTime = performance.now();
    const animate = () => {
      if (isVisible) {
        const elapsedTime = (performance.now() - startTime) / 1000;

        currentX += (targetX - currentX) * 0.05;
        currentY += (targetY - currentY) * 0.05;

        // Direct real-time scroll progress calculation from DOM every frame
        const heroTrack = trackRef.current || document.getElementById('hero');
        let currentScroll = 0;
        if (heroTrack) {
          const rect = heroTrack.getBoundingClientRect();
          const maxScroll = rect.height - window.innerHeight;
          if (maxScroll > 0) {
            currentScroll = Math.min(Math.max(-rect.top / maxScroll, 0), 1);
          }
        }

        const isMobile = window.innerWidth <= 960;
        const initialX = isMobile ? 0 : 2.4;
        // TAHAP 2: Ring STRICTLY stays on the right during Stage 1 and the pause buffer (currentScroll <= 0.24)
        // Moves smoothly from initialX (2.4) to center (0.0) between 0.24 and 0.54
        const rawRingProgress = Math.min(1, Math.max(0, (currentScroll - 0.27) / 0.30));
        // Smooth ease-in-out S-curve for ring motion
        const smoothRingT = rawRingProgress * rawRingProgress * (3 - 2 * rawRingProgress);

        const targetRingX = THREE.MathUtils.lerp(initialX, 0.0, smoothRingT);
        const targetRingScale = THREE.MathUtils.lerp(1.0, 1.45, smoothRingT);
        const targetRingY = THREE.MathUtils.lerp(0.0, 0.0, smoothRingT);
        const targetRingZ = THREE.MathUtils.lerp(-1.0, -0.4, smoothRingT);

        // Highly responsive physics-like lerp towards the center
        ringsGroup.position.x += (targetRingX - ringsGroup.position.x) * 0.2;
        ringsGroup.position.y += (targetRingY - ringsGroup.position.y) * 0.2;
        ringsGroup.position.z += (targetRingZ - ringsGroup.position.z) * 0.2;
        ringsGroup.scale.set(targetRingScale, targetRingScale, targetRingScale);

        cyanLight.position.x += (targetRingX - cyanLight.position.x) * 0.2;
        cyanLight.position.y += (targetRingY - cyanLight.position.y) * 0.2;

        ringMesh.rotation.x = elapsedTime * 0.2 + currentY;
        ringMesh.rotation.y = elapsedTime * 0.25 + currentX;

        innerRingMesh.rotation.x = -elapsedTime * 0.15 - currentY;
        innerRingMesh.rotation.y = elapsedTime * 0.3 - currentX;

        particles.rotation.y = elapsedTime * 0.03;
        particles.rotation.x = elapsedTime * 0.015;

        renderer.render(scene, camera);
      }
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      observer.disconnect();

      ringGeometry.dispose();
      ringMaterial.dispose();
      innerRingGeometry.dispose();
      innerRingMaterial.dispose();
      ringsGroup.clear();
      particleGeometry.dispose();
      particleMaterial.dispose();
      renderer.dispose();
      if (mountRef.current) {
        mountRef.current.innerHTML = '';
      }
    };
  }, [mode]);

  // 3D Interactive Card Tilt for the Photo
  const handleCardMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current || mode === 'eco') return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -8;
    const rotateY = ((x - centerX) / centerX) * 8;
    cardRef.current.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
  };

  const handleCardMouseLeave = () => {
    if (!cardRef.current) return;
    cardRef.current.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
  };

  // 4-Stage Dynamic Scroll Transitions
  // TAHAP 1: Initial content exit (Teks & Foto.webp fade out completely and strictly by progress 0.12)
  const initialOpacity = Math.max(0, 1 - scrollProgress / 0.12);
  const initialTranslateY = -(scrollProgress / 0.12) * 35;
  const initialScale = 1 - (scrollProgress / 0.12) * 0.05;

  // JEDA / BUFFER TAHAP 1 & 2:
  // Antara 0.12 dan 0.24, teks sudah 100% hilang, dan 3D ring masih terkunci 100% diam di kanan.

  // TAHAP 3: Formal portrait reveals ONLY AFTER Stage 2 (Ring fully centered at 0.54)
  // Reveals smoothly between 0.58 and 0.78
  const rawFormalProgress = Math.min(1, Math.max(0, (scrollProgress - 0.58) / 0.20));
  // Silky smooth ease-out curve for the rising animation
  const riseCurve = 1 - Math.pow(1 - rawFormalProgress, 2.2);
  const formalOpacity = rawFormalProgress > 0 ? Math.min(1, Math.pow(rawFormalProgress, 0.6) * 1.25) : 0;
  const formalScale = 0.90 + rawFormalProgress * 0.28; // Scales smoothly from 0.90 up to 1.18
  const formalTranslateY = Math.round((1 - riseCurve) * 220); // Meluncur anggun naik 220px dari bawah

  // TAHAP 4: Bubble Chat Pop-ups AFTER Stage 3 (Settles after formal portrait is fully in place)
  // Bubble 1 (Left - Shape Line 1) pops in between scrollProgress 0.78 and 0.88
  const rawBubble1 = Math.min(1, Math.max(0, (scrollProgress - 0.78) / 0.10));
  const bubble1Progress = 1 - Math.pow(1 - rawBubble1, 2.5);
  const bubble1Opacity = rawBubble1 > 0 ? Math.min(1, rawBubble1 * 1.8) : 0;
  const bubble1Scale = rawBubble1 > 0 ? 0.6 + bubble1Progress * 0.4 : 0.6;
  const bubble1TranslateY = (1 - bubble1Progress) * 25;

  // Bubble 2 (Right - Shape Line 2) pops in between scrollProgress 0.84 and 0.94
  const rawBubble2 = Math.min(1, Math.max(0, (scrollProgress - 0.84) / 0.10));
  const bubble2Progress = 1 - Math.pow(1 - rawBubble2, 2.5);
  const bubble2Opacity = rawBubble2 > 0 ? Math.min(1, rawBubble2 * 1.8) : 0;
  const bubble2Scale = rawBubble2 > 0 ? 0.6 + bubble2Progress * 0.4 : 0.6;
  const bubble2TranslateY = (1 - bubble2Progress) * 25;

  return (
    <div
      ref={trackRef}
      id="hero"
      className="hero-pinned-wrapper"
      style={{
        position: 'relative',
        height: '320vh' // Generous scroll track for smooth 4-phase choreography
      }}
    >
      <section
        ref={heroSectionRef}
        className="hero-sticky-viewport"
        style={{
          position: 'sticky',
          top: 0,
          height: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden'
        }}
      >
        {/* 3D WebGL Background Canvas (Ultra Mode) */}
        {mode === 'ultra' && (
          <div
            ref={mountRef}
            style={{
              position: 'absolute',
              inset: 0,
              zIndex: 1,
              pointerEvents: 'none',
              opacity: 0.85
            }}
          />
        )}

        {/* Ambient Radial Glow Orbs */}
        <div
          className="glow-orb"
          style={{
            width: '550px',
            height: '550px',
            top: '15%',
            right: '5%',
            background: 'rgba(0, 245, 212, 0.08)'
          }}
        />
        <div
          className="glow-orb"
          style={{
            width: '450px',
            height: '450px',
            bottom: '10%',
            left: '5%',
            background: 'rgba(59, 130, 246, 0.05)'
          }}
        />

        {/* ================= 1. INITIAL TWO-COLUMN HERO VIEW ================= */}
        {/* Both left and right sides fade out simultaneously as user begins scrolling */}
        <div
          className="container hero-initial-view"
          style={{
            position: 'relative',
            zIndex: 10,
            opacity: initialOpacity,
            transform: `translate3d(0, ${initialTranslateY}px, 0) scale3d(${initialScale}, ${initialScale}, 1)`,
            transition: 'opacity 0.08s linear, transform 0.08s linear',
            visibility: initialOpacity > 0 ? 'visible' : 'hidden',
            pointerEvents: initialOpacity > 0.05 ? 'auto' : 'none',
            willChange: 'opacity, transform'
          }}
        >
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(12, 1fr)',
              alignItems: 'center',
              gap: '3rem'
            }}
            className="hero-split-grid"
          >
            {/* ================= LEFT SIDE: Content & Text ================= */}
            <div
              className="hero-content-col"
              style={{
                gridColumn: 'span 7'
              }}
            >
              {/* Greeting & Headline */}
              <h1
                className="heading-display"
                style={{
                  fontSize: 'clamp(2.5rem, 5.2vw, 4.5rem)',
                  marginBottom: '2rem',
                  lineHeight: 1.1,
                  fontWeight: 800
                }}
              >
                <span className={isGlitching ? "glitch-active" : ""} style={{ display: 'inline-block' }}>
                  Hi, I'm <span className="heading-gradient">{glitchName}</span>
                </span> <br />
                <span className="shimmer-text">{PERSONAL_INFO.role}</span>
              </h1>

              {/* CTA Buttons */}
              <div
                style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  alignItems: 'center',
                  gap: '1rem',
                  marginBottom: '2.5rem'
                }}
              >
                <a href="#projects" className="btn-primary" id="hero-projects-cta">
                  <span>Explore Design Works</span>
                  <ArrowDown size={16} />
                </a>
              </div>

              {/* Social Links Bar */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.85rem'
                }}
              >
                <span style={{ fontSize: '0.75rem', fontFamily: 'var(--font-mono)', color: 'var(--text-muted)' }}>
                  CONNECT:
                </span>
                <a
                  href={PERSONAL_INFO.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  title="WhatsApp"
                  style={{
                    width: '34px',
                    height: '34px',
                    borderRadius: '8px',
                    background: 'rgba(255, 255, 255, 0.04)',
                    border: '1px solid rgba(255, 255, 255, 0.08)',
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
                    e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.08)';
                  }}
                >
                  <WhatsappIcon size={16} />
                </a>
                <a
                  href={PERSONAL_INFO.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  title="Instagram"
                  style={{
                    width: '34px',
                    height: '34px',
                    borderRadius: '8px',
                    background: 'rgba(255, 255, 255, 0.04)',
                    border: '1px solid rgba(255, 255, 255, 0.08)',
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
                    e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.08)';
                  }}
                >
                  <InstagramIcon size={16} />
                </a>
                <a
                  href={PERSONAL_INFO.tiktok}
                  target="_blank"
                  rel="noopener noreferrer"
                  title="TikTok"
                  style={{
                    width: '34px',
                    height: '34px',
                    borderRadius: '8px',
                    background: 'rgba(255, 255, 255, 0.04)',
                    border: '1px solid rgba(255, 255, 255, 0.08)',
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
                    e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.08)';
                  }}
                >
                  <TiktokIcon size={16} />
                </a>
              </div>
            </div>

            {/* ================= RIGHT SIDE: Photo & Identity Experience ================= */}
            <div
              className="hero-photo-col"
              style={{
                gridColumn: 'span 5',
                display: 'flex',
                justifyContent: 'center',
                position: 'relative'
              }}
            >
              {/* 3D Interactive Card Frame */}
              <div
                ref={cardRef}
                onMouseMove={handleCardMouseMove}
                onMouseLeave={handleCardMouseLeave}
                style={{
                  position: 'relative',
                  width: '100%',
                  maxWidth: '420px',
                  aspectRatio: '4/5',
                  borderRadius: '1.75rem',
                  padding: '0.75rem',
                  background: 'linear-gradient(145deg, rgba(0, 245, 212, 0.15) 0%, rgba(20, 26, 38, 0.7) 40%, rgba(6, 8, 12, 0.95) 100%)',
                  border: '1px solid rgba(0, 245, 212, 0.35)',
                  boxShadow: '0 25px 60px -15px rgba(0, 0, 0, 0.9), 0 0 40px rgba(0, 245, 212, 0.12)',
                  transition: 'transform 0.15s ease-out',
                  transformStyle: 'preserve-3d'
                }}
              >
                {/* Photo Image Container */}
                <div
                  style={{
                    position: 'relative',
                    width: '100%',
                    height: '100%',
                    borderRadius: '1.25rem',
                    overflow: 'hidden',
                    background: '#090b10'
                  }}
                >
                  <img
                    src={PERSONAL_INFO.avatar || '/profile.jpg'}
                    alt={PERSONAL_INFO.name}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      objectPosition: 'center 25%',
                      display: 'block'
                    }}
                  />

                  {/* Subtle Luxury Gradient Vignette Overlay */}
                  <div
                    style={{
                      position: 'absolute',
                      inset: 0,
                      background: 'linear-gradient(180deg, rgba(6, 8, 12, 0.08) 0%, rgba(6, 8, 12, 0) 50%, rgba(6, 8, 12, 0.75) 100%)',
                      pointerEvents: 'none',
                      zIndex: 2
                    }}
                  />
                </div>

                {/* Floating Badge 1 (Top-Right): It's Me */}
                <div
                  style={{
                    position: 'absolute',
                    top: '-15px',
                    right: '-15px',
                    background: 'rgba(9, 12, 18, 0.94)',
                    backdropFilter: 'blur(16px)',
                    WebkitBackdropFilter: 'blur(16px)',
                    border: '1px solid rgba(0, 245, 212, 0.4)',
                    borderRadius: '9999px',
                    padding: '0.45rem 1.15rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '0 10px 25px rgba(0, 0, 0, 0.6), 0 0 15px rgba(0, 245, 212, 0.25)',
                    transform: 'translateZ(30px)',
                    zIndex: 10
                  }}
                >
                  <span style={{ fontSize: '0.8rem', fontFamily: 'var(--font-mono)', fontWeight: 700, color: 'var(--accent-cyan)', letterSpacing: '0.04em' }}>
                    It's Me
                  </span>
                </div>

                {/* Floating Badge 2 (Bottom): Identity Label */}
                <div
                  style={{
                    position: 'absolute',
                    bottom: '-22px',
                    left: '50%',
                    transform: 'translateX(-50%) translateZ(35px)',
                    background: 'rgba(9, 12, 18, 0.95)',
                    backdropFilter: 'blur(20px)',
                    WebkitBackdropFilter: 'blur(20px)',
                    border: '1px solid rgba(0, 245, 212, 0.35)',
                    borderRadius: '9999px',
                    padding: '0.65rem 1.75rem',
                    boxShadow: '0 15px 35px rgba(0, 0, 0, 0.85), 0 0 25px rgba(0, 245, 212, 0.15)',
                    whiteSpace: 'nowrap',
                    zIndex: 10,
                    textAlign: 'center'
                  }}
                >
                  <div style={{ fontWeight: 800, fontSize: '0.98rem', color: '#fff', letterSpacing: '-0.01em', lineHeight: 1.2 }}>
                    Arif Ahmad Muzakky
                  </div>
                  <div className="shimmer-text" style={{ fontSize: '0.74rem', fontFamily: 'var(--font-mono)', fontWeight: 600, marginTop: '0.15rem' }}>
                    UI/UX & Graphic Design
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ================= 2. DYNAMIC FORMAL PORTRAIT REVEAL VIEW ================= */}
        {/* ================= 2. DYNAMIC FORMAL PORTRAIT REVEAL VIEW ================= */}
        {/* Anchored at bottom: 0 so the portrait naturally rises flush from the screen edge with no cut-off artifacts */}
        <div
          className="hero-formal-reveal-view"
          style={{
            position: 'absolute',
            inset: 0,
            zIndex: 15,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'flex-end',
            opacity: formalOpacity,
            transform: `translate3d(0, ${formalTranslateY}px, 0) scale3d(${formalScale}, ${formalScale}, 1)`,
            transformOrigin: 'bottom center',
            visibility: formalOpacity > 0 ? 'visible' : 'hidden',
            pointerEvents: formalOpacity > 0.5 ? 'auto' : 'none',
            transition: 'opacity 0.08s linear, transform 0.08s linear',
            willChange: 'opacity, transform',
            overflow: 'hidden'
          }}
        >
          {/* Ambient Backlight Halo behind the cutout portrait */}
          <div
            style={{
              position: 'absolute',
              top: '45%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: 'min(780px, 92vw)',
              height: 'min(780px, 92vw)',
              borderRadius: '50%',
              background: `radial-gradient(circle, rgba(0, 245, 212, ${0.30 * formalOpacity}) 0%, rgba(59, 130, 246, ${0.15 * formalOpacity}) 45%, transparent 70%)`,
              filter: 'blur(58px)',
              pointerEvents: 'none',
              zIndex: -1
            }}
          />

          {/* Formal Cutout Image (Anchored flush to bottom: 0) */}
          <div
            style={{
              position: 'relative',
              display: 'flex',
              alignItems: 'flex-end',
              justifyContent: 'center',
              lineHeight: 0
            }}
          >
            <img
              src="/projects/Foto_Formal.png"
              alt={`${PERSONAL_INFO.name} - Formal Portrait`}
              className="formal-portrait-img"
              style={{
                maxHeight: 'clamp(520px, 84vh, 850px)',
                maxWidth: '92vw',
                width: 'auto',
                height: 'auto',
                objectFit: 'contain',
                display: 'block',
                verticalAlign: 'bottom',
                filter: 'drop-shadow(0 0 38px rgba(0, 245, 212, 0.28)) drop-shadow(0 -10px 30px rgba(0, 0, 0, 0.6))'
              }}
            />
          </div>

          {/* Floating Minimalist Identity Badge Over Lower Torso (Positioned cleanly above Continue Scrolling) */}
          <div
            style={{
              position: 'absolute',
              bottom: '72px',
              left: '50%',
              transform: 'translateX(-50%)',
              zIndex: 10,
              textAlign: 'center',
              background: 'rgba(9, 12, 18, 0.90)',
              backdropFilter: 'blur(24px)',
              WebkitBackdropFilter: 'blur(24px)',
              border: '1px solid rgba(0, 245, 212, 0.35)',
              borderRadius: '9999px',
              padding: '0.65rem 2.25rem',
              boxShadow: '0 16px 36px rgba(0, 0, 0, 0.85), 0 0 25px rgba(0, 245, 212, 0.2)',
              display: 'inline-flex',
              flexDirection: 'column',
              alignItems: 'center'
            }}
          >
            <div style={{ fontWeight: 800, fontSize: '1.05rem', color: '#fff', letterSpacing: '-0.01em', lineHeight: 1.2 }}>
              {PERSONAL_INFO.name}
            </div>
            <div className="shimmer-text" style={{ fontSize: '0.78rem', fontFamily: 'var(--font-mono)', fontWeight: 600, marginTop: '0.15rem', letterSpacing: '0.04em' }}>
              {PERSONAL_INFO.role}
            </div>
          </div>
        </div>

        {/* ================= BUBBLE CHAT POP UP 1 (LEFT - SHAPE LINE 1) ================= */}
        <div
          className="hero-bubble-chat hero-bubble-chat-1"
          style={{
            position: 'absolute',
            right: 'calc(50% + clamp(130px, 11vw, 200px))',
            top: 'clamp(26%, 28vh, 36%)',
            maxWidth: 'clamp(310px, 27vw, 410px)',
            zIndex: 22,
            opacity: bubble1Opacity,
            transform: `translate3d(0, ${bubble1TranslateY}px, 0) scale3d(${bubble1Scale}, ${bubble1Scale}, 1)`,
            transformOrigin: 'bottom right',
            visibility: bubble1Opacity > 0 ? 'visible' : 'hidden',
            transition: 'opacity 0.08s linear, transform 0.08s linear',
            pointerEvents: bubble1Opacity > 0.5 ? 'auto' : 'none',
            willChange: 'opacity, transform'
          }}
        >
          <div
            style={{
              position: 'relative',
              background: 'rgba(9, 13, 20, 0.92)',
              backdropFilter: 'blur(24px)',
              WebkitBackdropFilter: 'blur(24px)',
              border: '1.5px solid rgba(0, 245, 212, 0.5)',
              borderRadius: '1.35rem 1.35rem 1.35rem 0.35rem',
              padding: '1.15rem 1.45rem',
              boxShadow: '0 25px 50px rgba(0, 0, 0, 0.92), 0 0 35px rgba(0, 245, 212, 0.28)',
              display: 'flex',
              flexDirection: 'column',
              gap: '0.45rem'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span style={{
                fontSize: '0.72rem',
                fontFamily: 'var(--font-mono)',
                fontWeight: 700,
                color: 'var(--accent-cyan)',
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                background: 'rgba(0, 245, 212, 0.14)',
                padding: '0.2rem 0.65rem',
                borderRadius: '999px',
                border: '1px solid rgba(0, 245, 212, 0.35)'
              }}>
                Mindset
              </span>
            </div>
            <p style={{
              fontSize: 'clamp(0.94rem, 1.05vw, 1.05rem)',
              fontWeight: 600,
              color: '#ffffff',
              lineHeight: 1.5,
              margin: 0,
              letterSpacing: '-0.01em'
            }}>
              “Tetap Selalu Berusaha, Meskipun Maksain Untuk Di Usahakan.”
            </p>

            {/* Bubble Tail Pointer */}
            <div
              style={{
                position: 'absolute',
                bottom: '-9px',
                right: '28px',
                width: 0,
                height: 0,
                borderLeft: '9px solid transparent',
                borderRight: '9px solid transparent',
                borderTop: '9px solid rgba(0, 245, 212, 0.5)',
                filter: 'drop-shadow(0 2px 4px rgba(0, 0, 0, 0.5))'
              }}
            />
          </div>
        </div>

        {/* ================= BUBBLE CHAT POP UP 2 (RIGHT - SHAPE LINE 2) ================= */}
        <div
          className="hero-bubble-chat hero-bubble-chat-2"
          style={{
            position: 'absolute',
            left: 'calc(50% + clamp(130px, 11vw, 200px))',
            top: 'clamp(44%, 48vh, 56%)',
            maxWidth: 'clamp(330px, 29vw, 440px)',
            zIndex: 22,
            opacity: bubble2Opacity,
            transform: `translate3d(0, ${bubble2TranslateY}px, 0) scale3d(${bubble2Scale}, ${bubble2Scale}, 1)`,
            transformOrigin: 'bottom left',
            visibility: bubble2Opacity > 0 ? 'visible' : 'hidden',
            transition: 'opacity 0.08s linear, transform 0.08s linear',
            pointerEvents: bubble2Opacity > 0.5 ? 'auto' : 'none',
            willChange: 'opacity, transform'
          }}
        >
          <div
            style={{
              position: 'relative',
              background: 'rgba(9, 13, 20, 0.92)',
              backdropFilter: 'blur(24px)',
              WebkitBackdropFilter: 'blur(24px)',
              border: '1.5px solid rgba(59, 130, 246, 0.5)',
              borderRadius: '1.35rem 1.35rem 0.35rem 1.35rem',
              padding: '1.15rem 1.45rem',
              boxShadow: '0 25px 50px rgba(0, 0, 0, 0.92), 0 0 35px rgba(59, 130, 246, 0.28)',
              display: 'flex',
              flexDirection: 'column',
              gap: '0.45rem'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span style={{
                fontSize: '0.72rem',
                fontFamily: 'var(--font-mono)',
                fontWeight: 700,
                color: '#60a5fa',
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                background: 'rgba(59, 130, 246, 0.14)',
                padding: '0.2rem 0.65rem',
                borderRadius: '999px',
                border: '1px solid rgba(59, 130, 246, 0.35)'
              }}>
                Principle
              </span>
            </div>
            <p style={{
              fontSize: 'clamp(0.94rem, 1.05vw, 1.05rem)',
              fontWeight: 600,
              color: '#ffffff',
              lineHeight: 1.5,
              margin: 0,
              letterSpacing: '-0.01em'
            }}>
              “Selalu Berikan Effort & Hasil Yang Maksimal, Agar Cepat Mendapatkan 2M (Makasih Mas).”
            </p>

            {/* Bubble Tail Pointer */}
            <div
              style={{
                position: 'absolute',
                bottom: '-9px',
                left: '28px',
                width: 0,
                height: 0,
                borderLeft: '9px solid transparent',
                borderRight: '9px solid transparent',
                borderTop: '9px solid rgba(59, 130, 246, 0.5)',
                filter: 'drop-shadow(0 2px 4px rgba(0, 0, 0, 0.5))'
              }}
            />
          </div>
        </div>

        {/* Sleek Pinned Scroll Progress Indicator */}
        <div
          style={{
            position: 'absolute',
            bottom: '16px',
            left: '50%',
            transform: 'translateX(-50%)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '0.45rem',
            zIndex: 25,
            pointerEvents: 'none',
            opacity: 0.85,
            transition: 'opacity 0.35s ease'
          }}
        >
          <div
            style={{
              width: '120px',
              height: '3px',
              background: 'rgba(255, 255, 255, 0.08)',
              borderRadius: '999px',
              overflow: 'hidden',
              position: 'relative'
            }}
          >
            <div
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                height: '100%',
                width: `${Math.round(scrollProgress * 100)}%`,
                background: 'linear-gradient(90deg, var(--accent-cyan), #3b82f6)',
                boxShadow: '0 0 8px rgba(0, 245, 212, 0.6)',
                borderRadius: '999px',
                transition: 'width 0.08s linear'
              }}
            />
          </div>
          <span
            style={{
              fontSize: '0.66rem',
              fontFamily: 'var(--font-mono)',
              color: 'var(--text-muted)',
              letterSpacing: '0.08em',
              textTransform: 'uppercase'
            }}
          >
            {scrollProgress < 0.85 ? 'Scroll to Reveal' : 'Continue Scrolling ↓'}
          </span>
        </div>

        {/* Responsive Breakpoint Styles */}
        <style>{`
          @media (max-width: 960px) {
            .hero-pinned-wrapper {
              height: 260vh !important; /* Balanced track on mobile for smooth 4-phase scroll */
            }
            .hero-split-grid {
              grid-template-columns: 1fr !important;
              gap: 2.25rem !important;
              text-align: center !important;
            }
            .hero-content-col {
              grid-column: span 12 !important;
              display: flex !important;
              flex-direction: column !important;
              align-items: center !important;
            }
            .hero-photo-col {
              grid-column: span 12 !important;
              order: -1 !important; /* On mobile, photo appears right above the title */
              margin-bottom: 0.5rem !important;
            }
            .hero-photo-col > div {
              max-width: 270px !important;
            }
            .formal-portrait-img {
              max-height: 65vh !important;
            }
            .hero-bubble-chat-1 {
              right: auto !important;
              left: 14px !important;
              top: 14% !important;
              max-width: 250px !important;
            }
            .hero-bubble-chat-2 {
              left: auto !important;
              right: 14px !important;
              top: 56% !important;
              max-width: 260px !important;
            }
          }
        `}</style>
      </section>
    </div>
  );
};

