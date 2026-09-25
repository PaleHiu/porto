import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { Mail, MessageSquare, Send, Check, Copy, Database, Sparkles, MessageCircle } from 'lucide-react';
import { submitInquiry, isSupabaseConfigured } from '../lib/supabase';
import { PERSONAL_INFO } from '../data/portfolioData';

export const ContactSection: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    budget: '$3k - $8k',
    message: ''
  });
  const [loading, setLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState<{ text: string; type: 'success' | 'error' } | null>(null);
  const [copiedEmail, setCopiedEmail] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      setStatusMessage({ text: 'Please fill in all required fields.', type: 'error' });
      return;
    }

    setLoading(true);
    setStatusMessage(null);

    try {
      const res = await submitInquiry({
        name: formData.name,
        email: formData.email,
        budget: formData.budget,
        message: formData.message
      });

      if (res.success) {
        // Trigger celebratory confetti
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.7 },
          colors: ['#00f5d4', '#38bdf8', '#ffffff']
        });

        setStatusMessage({
          text: res.message,
          type: 'success'
        });
        setFormData({ name: '', email: '', budget: '$3k - $8k', message: '' });
      } else {
        setStatusMessage({ text: res.message, type: 'error' });
      }
    } catch {
      setStatusMessage({ text: 'An unexpected error occurred. Please contact via WhatsApp directly.', type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(PERSONAL_INFO.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  return (
    <section id="contact" className="section">
      <div className="container">
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
          <div className="badge" style={{ marginBottom: '1rem' }}>
            <MessageSquare size={13} />
            <span>Initiate Direct Dialogue</span>
          </div>
          <h2
            className="heading-display heading-gradient"
            style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', marginBottom: '1rem' }}
          >
            Let's Engineer Something <span className="cyan-gradient">Iconic</span>
          </h2>
          <p style={{ color: 'var(--text-secondary)', maxWidth: '600px', margin: '0 auto', fontSize: '1.05rem' }}>
            Have a project in mind, an engineering role, or a high-profile web experience to build? Send an inquiry or reach out directly.
          </p>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(12, 1fr)',
            gap: '2rem',
            maxWidth: '1080px',
            margin: '0 auto'
          }}
          className="contact-layout"
        >
          {/* Left Column: Direct Links & Status */}
          <div
            className="glass-card contact-col-left"
            style={{
              gridColumn: 'span 5',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between'
            }}
          >
            <div>
              <h3 style={{ fontSize: '1.35rem', fontWeight: 700, fontFamily: 'var(--font-heading)', marginBottom: '1rem' }}>
                Direct Channels
              </h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.92rem', lineHeight: '1.6', marginBottom: '2rem' }}>
                I am currently based in Indonesia (GMT+7) and actively collaborate with teams across North America, Europe, and Asia.
              </p>

              {/* Email Copy Card */}
              <div
                style={{
                  background: 'rgba(6, 8, 12, 0.6)',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  borderRadius: '0.85rem',
                  padding: '1rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginBottom: '1rem'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <div
                    style={{
                      width: '36px',
                      height: '36px',
                      borderRadius: '8px',
                      background: 'rgba(0, 245, 212, 0.1)',
                      color: 'var(--accent-cyan)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                  >
                    <Mail size={18} />
                  </div>
                  <div>
                    <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
                      DIRECT EMAIL
                    </div>
                    <div style={{ fontSize: '0.88rem', fontWeight: 600, color: 'var(--text-primary)' }}>
                      {PERSONAL_INFO.email}
                    </div>
                  </div>
                </div>

                <button
                  onClick={handleCopyEmail}
                  id="copy-email-btn"
                  title="Copy email to clipboard"
                  style={{
                    background: copiedEmail ? 'rgba(34, 197, 94, 0.15)' : 'rgba(255, 255, 255, 0.05)',
                    border: `1px solid ${copiedEmail ? 'rgba(34, 197, 94, 0.3)' : 'rgba(255, 255, 255, 0.1)'}`,
                    color: copiedEmail ? '#4ade80' : 'var(--text-secondary)',
                    borderRadius: '8px',
                    padding: '0.5rem',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.35rem',
                    fontSize: '0.75rem',
                    fontFamily: 'var(--font-mono)'
                  }}
                >
                  {copiedEmail ? <Check size={14} /> : <Copy size={14} />}
                  <span>{copiedEmail ? 'Copied' : 'Copy'}</span>
                </button>
              </div>

              {/* WhatsApp Quick Link */}
              <a
                href={PERSONAL_INFO.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                id="whatsapp-chat-link"
                style={{
                  background: 'rgba(37, 211, 102, 0.08)',
                  border: '1px solid rgba(37, 211, 102, 0.25)',
                  borderRadius: '0.85rem',
                  padding: '1rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  textDecoration: 'none',
                  color: 'inherit',
                  marginBottom: '2rem',
                  transition: 'background 0.2s ease'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <div
                    style={{
                      width: '36px',
                      height: '36px',
                      borderRadius: '8px',
                      background: 'rgba(37, 211, 102, 0.15)',
                      color: '#25d366',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                  >
                    <MessageCircle size={18} />
                  </div>
                  <div>
                    <div style={{ fontSize: '0.72rem', color: '#25d366', fontFamily: 'var(--font-mono)' }}>
                      INSTANT MESSAGING
                    </div>
                    <div style={{ fontSize: '0.88rem', fontWeight: 600 }}>
                      WhatsApp Direct Chat
                    </div>
                  </div>
                </div>
                <span style={{ fontSize: '0.78rem', color: '#25d366', fontFamily: 'var(--font-mono)' }}>
                  Chat Now →
                </span>
              </a>
            </div>

            {/* Supabase Status Chip */}
            <div
              style={{
                padding: '0.75rem 1rem',
                borderRadius: '0.75rem',
                background: 'rgba(10, 14, 22, 0.8)',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                display: 'flex',
                alignItems: 'center',
                gap: '0.65rem'
              }}
            >
              <Database size={15} color={isSupabaseConfigured ? 'var(--accent-cyan)' : '#f59e0b'} />
              <div style={{ fontSize: '0.75rem', fontFamily: 'var(--font-mono)' }}>
                {isSupabaseConfigured ? (
                  <span style={{ color: 'var(--accent-cyan)' }}>Supabase PostgreSQL Connected</span>
                ) : (
                  <span style={{ color: '#fbbf24' }}>Database: Supabase Ready (Preview Mode)</span>
                )}
              </div>
            </div>
          </div>

          {/* Right Column: Inquiry Form */}
          <div
            className="glass-card contact-col-right"
            style={{
              gridColumn: 'span 7'
            }}
          >
            <h3 style={{ fontSize: '1.35rem', fontWeight: 700, fontFamily: 'var(--font-heading)', marginBottom: '1.5rem' }}>
              Project Inquiry Form
            </h3>

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }} className="form-row">
                <div>
                  <label
                    htmlFor="contact-name"
                    style={{ display: 'block', fontSize: '0.8rem', fontFamily: 'var(--font-mono)', color: 'var(--text-secondary)', marginBottom: '0.4rem' }}
                  >
                    Your Name *
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Alex Henderson"
                    style={{
                      width: '100%',
                      background: 'rgba(6, 8, 12, 0.7)',
                      border: '1px solid rgba(255, 255, 255, 0.1)',
                      borderRadius: '0.65rem',
                      padding: '0.75rem 1rem',
                      color: '#fff',
                      fontSize: '0.9rem',
                      outline: 'none'
                    }}
                  />
                </div>

                <div>
                  <label
                    htmlFor="contact-email"
                    style={{ display: 'block', fontSize: '0.8rem', fontFamily: 'var(--font-mono)', color: 'var(--text-secondary)', marginBottom: '0.4rem' }}
                  >
                    Email Address *
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="alex@company.com"
                    style={{
                      width: '100%',
                      background: 'rgba(6, 8, 12, 0.7)',
                      border: '1px solid rgba(255, 255, 255, 0.1)',
                      borderRadius: '0.65rem',
                      padding: '0.75rem 1rem',
                      color: '#fff',
                      fontSize: '0.9rem',
                      outline: 'none'
                    }}
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="contact-budget"
                  style={{ display: 'block', fontSize: '0.8rem', fontFamily: 'var(--font-mono)', color: 'var(--text-secondary)', marginBottom: '0.4rem' }}
                >
                  Estimated Scope / Budget
                </label>
                <select
                  id="contact-budget"
                  value={formData.budget}
                  onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                  style={{
                    width: '100%',
                    background: '#0a0d14',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    borderRadius: '0.65rem',
                    padding: '0.75rem 1rem',
                    color: '#fff',
                    fontSize: '0.9rem',
                    outline: 'none'
                  }}
                >
                  <option value="< $3k">&lt; $3,000 (Consultation / Micro-feature)</option>
                  <option value="$3k - $8k">$3,000 – $8,000 (MVP / Full Creative Website)</option>
                  <option value="$8k - $20k">$8,000 – $20,000 (Complete 3D Interactive Platform)</option>
                  <option value="Full-time Role">Full-time Engineering Role</option>
                </select>
              </div>

              <div>
                <label
                  htmlFor="contact-message"
                  style={{ display: 'block', fontSize: '0.8rem', fontFamily: 'var(--font-mono)', color: 'var(--text-secondary)', marginBottom: '0.4rem' }}
                >
                  Project Details / Message *
                </label>
                <textarea
                  id="contact-message"
                  rows={4}
                  required
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Tell me about your product vision, timeline, or key technical challenges..."
                  style={{
                    width: '100%',
                    background: 'rgba(6, 8, 12, 0.7)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    borderRadius: '0.65rem',
                    padding: '0.75rem 1rem',
                    color: '#fff',
                    fontSize: '0.9rem',
                    outline: 'none',
                    resize: 'vertical'
                  }}
                />
              </div>

              {statusMessage && (
                <div
                  style={{
                    padding: '0.75rem 1rem',
                    borderRadius: '0.65rem',
                    fontSize: '0.85rem',
                    background: statusMessage.type === 'success' ? 'rgba(0, 245, 212, 0.1)' : 'rgba(239, 68, 68, 0.1)',
                    border: `1px solid ${statusMessage.type === 'success' ? 'rgba(0, 245, 212, 0.3)' : 'rgba(239, 68, 68, 0.3)'}`,
                    color: statusMessage.type === 'success' ? 'var(--accent-cyan)' : '#f87171',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem'
                  }}
                >
                  <Sparkles size={16} />
                  <span>{statusMessage.text}</span>
                </div>
              )}

              <button
                type="submit"
                id="submit-inquiry-btn"
                disabled={loading}
                className="btn-primary"
                style={{
                  width: '100%',
                  padding: '0.95rem',
                  fontSize: '0.95rem',
                  opacity: loading ? 0.7 : 1,
                  cursor: loading ? 'not-allowed' : 'pointer'
                }}
              >
                {loading ? (
                  <span>Transmitting to Supabase...</span>
                ) : (
                  <>
                    <span>Transmit Message</span>
                    <Send size={16} />
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 860px) {
          .contact-col-left, .contact-col-right {
            grid-column: span 12 !important;
          }
          .form-row {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
};
