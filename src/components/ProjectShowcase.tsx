import React, { useState } from 'react';
import { ExternalLink, Sparkles, Eye, CheckCircle2, X } from 'lucide-react';
import { GithubIcon } from './Icons';
import type { Project } from '../types';
import { PROJECTS } from '../data/portfolioData';

export const ProjectShowcase: React.FC = () => {
  const [filter, setFilter] = useState<string>('all');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const categories = [
    { id: 'all', label: 'All Creations' },
    { id: '3d-web', label: '3D & WebGL' },
    { id: 'fintech', label: 'FinTech & Web3' },
    { id: 'creative-ai', label: 'Creative AI & Audio' }
  ];

  const filteredProjects = filter === 'all' 
    ? PROJECTS 
    : PROJECTS.filter((p) => p.category === filter);

  // 3D Card tilt effect calculation
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -6; // max 6 deg
    const rotateY = ((x - centerX) / centerX) * 6;

    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
    
    // Set CSS variable for spotlight gradient
    card.style.setProperty('--mouse-x', `${x}px`);
    card.style.setProperty('--mouse-y', `${y}px`);
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)';
  };

  return (
    <section id="projects" className="section">
      <div className="container">
        {/* Section Header */}
        <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
          <div className="badge" style={{ marginBottom: '1rem' }}>
            <Sparkles size={13} />
            <span>Featured Case Studies</span>
          </div>
          <h2
            className="heading-display heading-gradient"
            style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', marginBottom: '1rem' }}
          >
            Crafted for <span className="cyan-gradient">Extreme Delight</span>
          </h2>
          <p style={{ color: 'var(--text-secondary)', maxWidth: '620px', margin: '0 auto', fontSize: '1.05rem' }}>
            A curated selection of high-performance digital products engineered with architectural integrity and luxury visuals.
          </p>

          {/* Filter Pills */}
          <div
            style={{
              display: 'inline-flex',
              flexWrap: 'wrap',
              justifyContent: 'center',
              gap: '0.65rem',
              marginTop: '2rem',
              background: 'rgba(13, 16, 24, 0.6)',
              padding: '0.45rem',
              borderRadius: '9999px',
              border: '1px solid rgba(255, 255, 255, 0.08)'
            }}
          >
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setFilter(cat.id)}
                style={{
                  padding: '0.5rem 1.25rem',
                  borderRadius: '9999px',
                  border: 'none',
                  background: filter === cat.id ? 'var(--accent-cyan)' : 'transparent',
                  color: filter === cat.id ? '#060709' : 'var(--text-secondary)',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.8rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                  transition: 'all 0.2s ease'
                }}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Project Cards Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
            gap: '2rem'
          }}
        >
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="glass-card tilt-card"
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                padding: '0',
                background: 'rgba(11, 14, 21, 0.85)',
                cursor: 'pointer'
              }}
              onClick={() => setSelectedProject(project)}
            >
              {/* Image Preview Container */}
              <div
                style={{
                  position: 'relative',
                  width: '100%',
                  aspectRatio: '16/9',
                  overflow: 'hidden',
                  borderTopLeftRadius: '1.25rem',
                  borderTopRightRadius: '1.25rem'
                }}
              >
                <img
                  src={project.image}
                  alt={project.title}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    transition: 'transform 0.5s ease'
                  }}
                  loading="lazy"
                />
                <div
                  style={{
                    position: 'absolute',
                    top: '1rem',
                    left: '1rem',
                    zIndex: 2
                  }}
                >
                  <span className="badge" style={{ background: 'rgba(6, 8, 12, 0.85)', backdropFilter: 'blur(8px)' }}>
                    {project.categoryLabel}
                  </span>
                </div>

                {/* Hover overlay hint */}
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'rgba(6, 7, 9, 0.4)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    opacity: 0,
                    transition: 'opacity 0.25s ease'
                  }}
                  className="preview-overlay"
                >
                  <span
                    style={{
                      background: 'var(--accent-cyan)',
                      color: '#060709',
                      padding: '0.5rem 1rem',
                      borderRadius: '9999px',
                      fontSize: '0.8rem',
                      fontWeight: 700,
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.4rem'
                    }}
                  >
                    <Eye size={15} /> Quick Inspect
                  </span>
                </div>
              </div>

              {/* Card Body */}
              <div style={{ padding: '1.75rem', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div>
                  <h3
                    style={{
                      fontSize: '1.35rem',
                      fontWeight: 700,
                      fontFamily: 'var(--font-heading)',
                      marginBottom: '0.5rem',
                      lineHeight: 1.25
                    }}
                  >
                    {project.title}
                  </h3>
                  <p
                    style={{
                      fontSize: '0.92rem',
                      color: 'var(--text-secondary)',
                      lineHeight: 1.6,
                      marginBottom: '1.25rem'
                    }}
                  >
                    {project.tagline}
                  </p>

                  {/* Metrics Badges */}
                  <div
                    style={{
                      display: 'grid',
                      gridTemplateColumns: 'repeat(3, 1fr)',
                      gap: '0.5rem',
                      marginBottom: '1.25rem',
                      background: 'rgba(5, 7, 10, 0.6)',
                      padding: '0.75rem',
                      borderRadius: '0.75rem',
                      border: '1px solid rgba(255, 255, 255, 0.05)'
                    }}
                  >
                    {project.metrics.map((m, idx) => (
                      <div key={idx} style={{ textAlign: 'center' }}>
                        <div style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--accent-cyan)', fontFamily: 'var(--font-mono)' }}>
                          {m.value}
                        </div>
                        <div style={{ fontSize: '0.65rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>
                          {m.label}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Tech Tags */}
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', marginBottom: '1.5rem' }}>
                    {project.tags.slice(0, 4).map((tag) => (
                      <span
                        key={tag}
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
                        {tag}
                      </span>
                    ))}
                    {project.tags.length > 4 && (
                      <span
                        style={{
                          fontSize: '0.72rem',
                          fontFamily: 'var(--font-mono)',
                          color: 'var(--accent-cyan)',
                          padding: '0.2rem 0.4rem'
                        }}
                      >
                        +{project.tags.length - 4} more
                      </span>
                    )}
                  </div>
                </div>

                {/* Footer Actions */}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    paddingTop: '1rem',
                    borderTop: '1px solid rgba(255, 255, 255, 0.06)'
                  }}
                  onClick={(e) => e.stopPropagation()}
                >
                  <button
                    onClick={() => setSelectedProject(project)}
                    style={{
                      background: 'transparent',
                      border: 'none',
                      color: 'var(--accent-cyan)',
                      fontSize: '0.85rem',
                      fontWeight: 600,
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.35rem',
                      padding: 0
                    }}
                  >
                    View Details →
                  </button>

                  <div style={{ display: 'flex', gap: '0.65rem' }}>
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      title="View GitHub Repository"
                      style={{
                        padding: '0.45rem',
                        borderRadius: '8px',
                        background: 'rgba(255, 255, 255, 0.05)',
                        color: 'var(--text-primary)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        border: '1px solid rgba(255, 255, 255, 0.08)'
                      }}
                    >
                      <GithubIcon size={16} />
                    </a>
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      title="Open Live Deployment on Vercel"
                      style={{
                        padding: '0.45rem',
                        borderRadius: '8px',
                        background: 'rgba(0, 245, 212, 0.1)',
                        color: 'var(--accent-cyan)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        border: '1px solid rgba(0, 245, 212, 0.25)'
                      }}
                    >
                      <ExternalLink size={16} />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Case Study Detail Modal */}
      {selectedProject && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 200,
            background: 'rgba(4, 5, 8, 0.85)',
            backdropFilter: 'blur(16px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '1.5rem'
          }}
          onClick={() => setSelectedProject(null)}
        >
          <div
            style={{
              background: '#0d1017',
              border: '1px solid rgba(255, 255, 255, 0.12)',
              borderRadius: '1.5rem',
              maxWidth: '800px',
              width: '100%',
              maxHeight: '90vh',
              overflowY: 'auto',
              boxShadow: '0 30px 80px rgba(0, 0, 0, 0.9), 0 0 40px rgba(0, 245, 212, 0.15)',
              position: 'relative'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header Image */}
            <div style={{ position: 'relative', width: '100%', aspectRatio: '21/9', overflow: 'hidden' }}>
              <img
                src={selectedProject.image}
                alt={selectedProject.title}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
              <button
                onClick={() => setSelectedProject(null)}
                style={{
                  position: 'absolute',
                  top: '1rem',
                  right: '1rem',
                  background: 'rgba(0, 0, 0, 0.7)',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  color: '#fff',
                  borderRadius: '50%',
                  width: '36px',
                  height: '36px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer'
                }}
              >
                <X size={18} />
              </button>
            </div>

            {/* Modal Content */}
            <div style={{ padding: '2rem' }}>
              <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.75rem' }}>
                <span className="badge">{selectedProject.categoryLabel}</span>
              </div>
              <h2 style={{ fontSize: '1.75rem', fontWeight: 800, fontFamily: 'var(--font-heading)', marginBottom: '0.5rem' }}>
                {selectedProject.title}
              </h2>
              <p style={{ color: 'var(--accent-cyan)', fontSize: '1rem', fontFamily: 'var(--font-mono)', marginBottom: '1.5rem' }}>
                {selectedProject.tagline}
              </p>

              <h4 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.04em', color: 'var(--text-muted)' }}>
                Overview & Challenge
              </h4>
              <p style={{ color: 'var(--text-secondary)', lineHeight: '1.7', marginBottom: '1.75rem' }}>
                {selectedProject.description}
              </p>

              <h4 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.04em', color: 'var(--text-muted)' }}>
                Architectural Highlights
              </h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '2rem' }}>
                {selectedProject.highlights.map((h, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.65rem' }}>
                    <CheckCircle2 size={18} color="var(--accent-cyan)" style={{ marginTop: '0.2rem', flexShrink: 0 }} />
                    <span style={{ color: 'var(--text-primary)', fontSize: '0.95rem' }}>{h}</span>
                  </div>
                ))}
              </div>

              {/* Technologies */}
              <h4 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.04em', color: 'var(--text-muted)' }}>
                Full Tech Stack
              </h4>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '2rem' }}>
                {selectedProject.tags.map((tag) => (
                  <span
                    key={tag}
                    style={{
                      fontSize: '0.8rem',
                      fontFamily: 'var(--font-mono)',
                      background: 'rgba(0, 245, 212, 0.08)',
                      color: 'var(--accent-cyan)',
                      padding: '0.35rem 0.75rem',
                      borderRadius: '6px',
                      border: '1px solid rgba(0, 245, 212, 0.2)'
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* CTAs */}
              <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                <a
                  href={selectedProject.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary"
                  style={{ textDecoration: 'none' }}
                >
                  <span>Launch Live Demo</span>
                  <ExternalLink size={16} />
                </a>
                <a
                  href={selectedProject.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-secondary"
                  style={{ textDecoration: 'none' }}
                >
                  <GithubIcon size={16} />
                  <span>Inspect Source Code</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

      <style>{`
        .tilt-card:hover .preview-overlay {
          opacity: 1 !important;
        }
      `}</style>
    </section>
  );
};
