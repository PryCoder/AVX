import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  motion, useInView, useMotionValue, useSpring,
} from 'framer-motion';
import {
  ArrowRight, ArrowUpRight, CheckCircle, XCircle,
  BarChart3, Bot, Layout, MessageCircle,
} from 'lucide-react';
import Loader from "../components/loader";
import projectsData from '../data/projects.json';
// Import the navbar

/* ─────────────────────────────────────────────────
   DESIGN TOKENS — warm editorial dark
───────────────────────────────────────────────── */
const C = {
  bg:       '#0A0908',
  surface:  '#111110',
  border:   '#1E1C1A',
  borderMd: '#2C2926',
  muted:    '#5C5852',
  sub:      '#8C8880',
  body:     '#C4BFB8',
  head:     '#F0EDE8',
  accent:   '#D4A96A',
  accentDim:'#6B5535',
};

const ease = [0.22, 1, 0.36, 1];

/* ─────────────────────────────────────────────────
   HELPERS
───────────────────────────────────────────────── */
const Reveal = ({ children, delay = 0, y = 28, className = '', style = {} }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.1 });
  return (
    <motion.div
      ref={ref} 
      className={className} 
      style={style}
      initial={{ opacity: 0, y }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.85, ease, delay }}
    >
      {children}
    </motion.div>
  );
};

const Tag = ({ children }) => (
  <span style={{
    display: 'inline-flex', alignItems: 'center', gap: 6,
    fontFamily: '"DM Mono", monospace',
    fontSize: 'clamp(0.5rem, 2vw, 0.625rem)',
    letterSpacing: '0.16em',
    textTransform: 'uppercase', color: C.accent,
    border: `1px solid ${C.accentDim}`,
    borderRadius: 4, padding: '4px 10px',
  }}>
    <span style={{ width: 5, height: 5, borderRadius: '50%', background: C.accent, display: 'inline-block' }} />
    {children}
  </span>
);

const Divider = () => (
  <div style={{ height: 1, background: C.border }} />
);

/* ─────────────────────────────────────────────────
   ANIMATED COUNTER
───────────────────────────────────────────────── */
const Counter = ({ to, suffix = '' }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!inView) return;
    let animationFrameId;
    const dur = 1400;
    const startTime = performance.now();
    
    const updateCounter = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / dur, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setVal(Math.round(eased * to));
      
      if (progress < 1) {
        animationFrameId = requestAnimationFrame(updateCounter);
      }
    };
    
    animationFrameId = requestAnimationFrame(updateCounter);
    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, [inView, to]);
  
  return <span ref={ref}>{val}{suffix}</span>;
};

/* ─────────────────────────────────────────────────
   GRAIN OVERLAY
───────────────────────────────────────────────── */
const Grain = () => (
  <svg style={{
    position: 'fixed', inset: 0, width: '100%', height: '100%',
    pointerEvents: 'none', zIndex: 9999, opacity: 0.028,
  }} xmlns="http://www.w3.org/2000/svg">
    <filter id="noise">
      <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" />
      <feColorMatrix type="saturate" values="0" />
    </filter>
    <rect width="100%" height="100%" filter="url(#noise)" />
  </svg>
);

/* ─────────────────────────────────────────────────
   MAIN COMPONENT
───────────────────────────────────────────────── */
const LandingPageWrapper = () => {
  const [loading, setLoading] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const navigate = useNavigate();

  // Detect mobile for cursor effect
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  /* cursor glow - only on desktop */
  const mouseX = useMotionValue(-600);
  const mouseY = useMotionValue(-600);
  const gX = useSpring(mouseX, { damping: 35, stiffness: 180 });
  const gY = useSpring(mouseY, { damping: 35, stiffness: 180 });

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1800);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (isMobile) return; // Disable cursor effect on mobile
    
    const handleMouseMove = (e) => { 
      mouseX.set(e.clientX - 300); 
      mouseY.set(e.clientY - 300); 
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY, isMobile]);

  const featuredProjects = projectsData.projects?.slice(0, 2) || [];

  const fonts = `@import url('https://fonts.googleapis.com/css2?family=DM+Mono:ital,wght@0,300;0,400;0,500&family=Cormorant:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400&family=Instrument+Sans:ital,wght@0,300;0,400;0,500;0,600;1,300&display=swap');`;

  // Responsive spacing
  const sectionPadding = {
    padding: 'clamp(60px, 10vw, 120px) clamp(20px, 5vw, 40px)',
  };

  const containerMaxWidth = {
    maxWidth: 1200,
    margin: '0 auto',
  };

  return (
    <>
      <style>{fonts}</style>
      {loading && <Loader />}
      <Grain />

      {/* ambient cursor glow - only on desktop */}
      {!isMobile && (
        <motion.div style={{
          position: 'fixed', x: gX, y: gY, zIndex: 1, pointerEvents: 'none',
          width: 600, height: 600, borderRadius: '50%',
          background: `radial-gradient(circle, ${C.accentDim}1A 0%, transparent 70%)`,
        }} />
      )}

      {/* floating CTA - responsive positioning */}
      <motion.button
        onClick={() => navigate('/contact')}
        initial={{ y: 80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 2.6, type: 'spring', damping: 20 }}
        whileHover={{ scale: 1.05 }} 
        whileTap={{ scale: 0.96 }}
        style={{
          position: 'fixed', 
          bottom: 'clamp(16px, 4vw, 28px)', 
          right: 'clamp(16px, 4vw, 28px)', 
          zIndex: 200,
          display: 'flex', alignItems: 'center', gap: 9,
          background: C.accent, color: C.bg,
          border: 'none', borderRadius: 100,
          padding: 'clamp(10px, 3vw, 12px) clamp(18px, 5vw, 22px)',
          cursor: 'pointer',
          fontFamily: '"Instrument Sans", sans-serif',
          fontSize: 'clamp(0.7rem, 2.5vw, 0.78rem)',
          fontWeight: 600, letterSpacing: '0.04em',
          boxShadow: `0 8px 36px ${C.accentDim}90`,
        }}
      >
        <MessageCircle size={14} /> Book a Call
      </motion.button>

      {/* Use the provided Navbar component */}
     

      <div style={{
        minHeight: '100vh', background: C.bg,
        color: C.body, overflowX: 'hidden',
        fontFamily: '"Instrument Sans", sans-serif',
        paddingTop: '64px', // Add padding to account for fixed navbar
      }}>

        {/* ══ HERO ══ */}
        <section style={{
          minHeight: 'calc(100vh - 64px)',
          display: 'flex', flexDirection: 'column', justifyContent: 'center',
          ...sectionPadding,
          ...containerMaxWidth,
          position: 'relative',
        }}>
          {/* grid texture - responsive */}
          <div style={{
            position: 'absolute', inset: 0, pointerEvents: 'none',
            backgroundImage: `linear-gradient(${C.border}55 1px, transparent 1px), linear-gradient(90deg, ${C.border}55 1px, transparent 1px)`,
            backgroundSize: 'clamp(40px, 8vw, 80px) clamp(40px, 8vw, 80px)',
            maskImage: 'radial-gradient(ellipse 60% 55% at 50% 50%, black, transparent)',
            WebkitMaskImage: 'radial-gradient(ellipse 60% 55% at 50% 50%, black, transparent)',
          }} />

          <div style={{ position: 'relative', zIndex: 2 }}>
            <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease, delay: 0.3 }} style={{ marginBottom: 'clamp(24px, 5vw, 32px)' }}>
              <Tag>Digital Systems Studio</Tag>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease, delay: 0.45 }}
              style={{
                fontFamily: '"Cormorant", serif',
                fontSize: 'clamp(2.5rem, 8vw, 6.8rem)',
                fontWeight: 300, lineHeight: 1.04,
                color: C.head, letterSpacing: '-0.01em',
                maxWidth: 'clamp(300px, 90vw, 860px)', 
                marginBottom: 0,
              }}
            >
              Digital Systems<br />
              <em style={{ fontStyle: 'italic', color: C.accent }}>Built to Scale</em><br />
              <span style={{ color: C.muted }}>Your Business</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease, delay: 0.7 }}
              style={{
                fontSize: 'clamp(0.85rem, 3vw, 0.98rem)',
                lineHeight: 1.72, color: C.sub,
                maxWidth: 'clamp(280px, 80vw, 460px)',
                marginTop: 'clamp(20px, 4vw, 28px)',
                marginBottom: 'clamp(32px, 6vw, 44px)',
              }}
            >
              We design websites and AI automation systems that increase
              conversions, streamline operations, and drive compounding growth.
            </motion.p>

            <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease, delay: 0.88 }}
              style={{ display: 'flex', gap: 'clamp(8px, 3vw, 12px)', flexWrap: 'wrap' }}
            >
              <button onClick={() => navigate('/contact')} style={{
                background: C.accent, color: C.bg, border: 'none', borderRadius: 100,
                padding: 'clamp(10px, 3vw, 13px) clamp(20px, 5vw, 28px)',
                cursor: 'pointer',
                fontFamily: '"Instrument Sans", sans-serif',
                fontSize: 'clamp(0.75rem, 2.5vw, 0.82rem)',
                fontWeight: 600, letterSpacing: '0.04em',
                display: 'flex', alignItems: 'center', gap: 8,
                transition: 'opacity 0.2s',
              }}
                onMouseEnter={e => e.currentTarget.style.opacity = '0.85'}
                onMouseLeave={e => e.currentTarget.style.opacity = '1'}
              >
                Book a Strategy Call <ArrowRight size={14} />
              </button>

              <button onClick={() => navigate('/contact')} style={{
                background: 'transparent', color: C.body,
                border: `1px solid ${C.borderMd}`, borderRadius: 100,
                padding: 'clamp(10px, 3vw, 13px) clamp(20px, 5vw, 28px)',
                cursor: 'pointer',
                fontFamily: '"Instrument Sans", sans-serif',
                fontSize: 'clamp(0.75rem, 2.5vw, 0.82rem)',
                letterSpacing: '0.04em',
                transition: 'border-color 0.2s, color 0.2s',
              }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = C.muted; e.currentTarget.style.color = C.head; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = C.borderMd; e.currentTarget.style.color = C.body; }}
              >
                Free Website Audit
              </button>
            </motion.div>

            {/* stat strip - responsive */}
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 1.2 }}
              style={{
                display: 'flex', 
                gap: 'clamp(24px, 8vw, 56px)', 
                marginTop: 'clamp(48px, 10vw, 72px)',
                paddingTop: 'clamp(24px, 5vw, 40px)', 
                borderTop: `1px solid ${C.border}`,
                flexWrap: 'wrap',
                justifyContent: 'space-between',
              }}
            >
              {[
                { val: 42, sfx: '%', label: 'Avg. conversion lift' },
                { val: 3, sfx: '×', label: 'Revenue multiple, avg.' },
                { val: 18, sfx: '+', label: 'Systems shipped' },
              ].map((s, i) => (
                <div key={i} style={{ flex: '1 1 auto', minWidth: '120px' }}>
                  <div style={{
                    fontFamily: '"Cormorant", serif',
                    fontSize: 'clamp(1.8rem, 6vw, 2.5rem)',
                    fontWeight: 400,
                    color: C.head, lineHeight: 1,
                  }}>
                    <Counter to={s.val} suffix={s.sfx} />
                  </div>
                  <div style={{ 
                    fontSize: 'clamp(0.6rem, 2vw, 0.7rem)', 
                    color: C.muted, 
                    marginTop: 7, 
                    letterSpacing: '0.06em' 
                  }}>{s.label}</div>
                </div>
              ))}
            </motion.div>
          </div>
        </section>

        <Divider />

        {/* ══ PROBLEM ══ - responsive grid */}
        <section style={{
          ...sectionPadding,
          ...containerMaxWidth,
        }}>
          <Reveal style={{ marginBottom: 'clamp(40px, 8vw, 56px)' }}>
            <Tag>The Problem</Tag>
            <h2 style={{
              fontFamily: '"Cormorant", serif',
              fontSize: 'clamp(1.5rem, 5vw, 3.5rem)',
              fontWeight: 300, color: C.head,
              lineHeight: 1.12, marginTop: 20, 
              maxWidth: 'clamp(280px, 90vw, 680px)',
            }}>
              Most websites don't fail because of design —<br />
              <em style={{ color: C.muted, fontStyle: 'italic' }}>they fail because they don't convert.</em>
            </h2>
          </Reveal>

          <div style={{
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(300px, 100%), 1fr))',
            gap: 1, 
            background: C.border,
            border: `1px solid ${C.border}`, 
            borderRadius: 16, 
            overflow: 'hidden',
          }}>
            {[
              { sym: '↗', title: 'No conversion path', desc: 'Visitors arrive but leave without acting. The funnel was never designed.' },
              { sym: '⊘', title: 'No user journey', desc: 'Pages exist in isolation. There\'s no structured narrative guiding decisions.' },
              { sym: '⚙', title: 'No system beneath', desc: 'The business runs on manual effort. Growth creates friction, not momentum.' },
              { sym: '⧖', title: 'Manual bottlenecks', desc: 'Repetitive tasks drain time that should be compounding into scale.' },
            ].map((p, i) => (
              <Reveal key={i} delay={i * 0.08}>
                <div style={{
                  padding: 'clamp(32px, 6vw, 44px) clamp(24px, 5vw, 40px)',
                  background: C.surface,
                  transition: 'background 0.28s',
                }}
                  onMouseEnter={e => e.currentTarget.style.background = '#161412'}
                  onMouseLeave={e => e.currentTarget.style.background = C.surface}
                >
                  <div style={{ fontSize: 'clamp(1rem, 4vw, 1.3rem)', color: C.muted, marginBottom: 20 }}>{p.sym}</div>
                  <h3 style={{
                    fontFamily: '"Instrument Sans", sans-serif',
                    fontSize: 'clamp(0.85rem, 3vw, 0.95rem)',
                    fontWeight: 600,
                    color: C.head, marginBottom: 10,
                  }}>{p.title}</h3>
                  <p style={{ fontSize: 'clamp(0.75rem, 2.5vw, 0.82rem)', color: C.sub, lineHeight: 1.68 }}>{p.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        <Divider />

        {/* ══ SERVICES ══ - responsive layout */}
        <section style={{
          ...sectionPadding,
          ...containerMaxWidth,
        }}>
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(280px, 100%), 1fr))', 
            gap: 'clamp(40px, 8vw, 80px)', 
            alignItems: 'start' 
          }}>
            <Reveal>
              <Tag>What We Build</Tag>
              <h2 style={{
                fontFamily: '"Cormorant", serif',
                fontSize: 'clamp(1.5rem, 5vw, 3.4rem)',
                fontWeight: 300, color: C.head,
                lineHeight: 1.1, marginTop: 20,
              }}>
                Structured digital<br />
                <em style={{ color: C.accent }}>growth systems</em>
              </h2>
              <p style={{
                fontSize: 'clamp(0.8rem, 2.8vw, 0.88rem)',
                color: C.sub, 
                lineHeight: 1.72,
                marginTop: 22, 
                maxWidth: '100%',
              }}>
                Not just a website. Not just an automation. A complete, interlocking
                system where every part is accountable to your growth.
              </p>
            </Reveal>

            <div>
              {[
                { n: '01', title: 'Web Development', Icon: Layout, desc: 'Conversion-focused architecture. Every element earns its place by moving visitors toward a decision.' },
                { n: '02', title: 'AI Automation', Icon: Bot, desc: 'Replace manual processes with intelligent workflows. Free your team to focus on what compounds.' },
                { n: '03', title: 'System Architecture', Icon: BarChart3, desc: 'Everything connected, everything measurable. Your digital presence becomes a business asset.' },
              ].map((s, i) => (
                <Reveal key={i} delay={i * 0.09}>
                  <div style={{
                    display: 'flex', 
                    gap: 'clamp(16px, 4vw, 24px)', 
                    padding: 'clamp(20px, 4vw, 30px) 0',
                    borderBottom: `1px solid ${C.border}`,
                    flexDirection: window.innerWidth < 640 ? 'column' : 'row',
                  }}
                    onMouseEnter={e => e.currentTarget.querySelector('h3').style.color = C.accent}
                    onMouseLeave={e => e.currentTarget.querySelector('h3').style.color = C.head}
                  >
                    <span style={{
                      fontFamily: '"DM Mono", monospace',
                      fontSize: '0.58rem', color: C.muted,
                      letterSpacing: '0.12em', 
                      paddingTop: 4, 
                      minWidth: 22,
                    }}>{s.n}</span>
                    <div style={{ flex: 1 }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 9 }}>
                        <h3 style={{
                          fontFamily: '"Instrument Sans", sans-serif',
                          fontSize: 'clamp(0.85rem, 3vw, 0.95rem)',
                          fontWeight: 600,
                          color: C.head, transition: 'color 0.22s',
                        }}>{s.title}</h3>
                        <s.Icon size={14} color={C.muted} />
                      </div>
                      <p style={{ fontSize: 'clamp(0.75rem, 2.5vw, 0.8rem)', color: C.sub, lineHeight: 1.68 }}>{s.desc}</p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <Divider />

        {/* ══ PROCESS ══ - responsive grid */}
        <section style={{
          ...sectionPadding,
          ...containerMaxWidth,
        }}>
          <Reveal style={{ textAlign: 'center', marginBottom: 'clamp(40px, 8vw, 64px)' }}>
            <Tag>How It Works</Tag>
            <h2 style={{
              fontFamily: '"Cormorant", serif',
              fontSize: 'clamp(1.5rem, 5vw, 3.4rem)',
              fontWeight: 300, color: C.head,
              lineHeight: 1.1, marginTop: 20,
            }}>Our Proven Framework</h2>
          </Reveal>

          <div style={{
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(250px, 100%), 1fr))',
            gap: 1, 
            background: C.border,
            border: `1px solid ${C.border}`, 
            borderRadius: 16, 
            overflow: 'hidden',
          }}>
            {[
              { n: '01', title: 'Audit', desc: 'Diagnose your current system. Map the gaps between where you are and where you need to be.' },
              { n: '02', title: 'Strategy', desc: 'Define precisely what to build, why it matters, and how it connects to your growth.' },
              { n: '03', title: 'Build', desc: 'Clean, scalable execution. Architecture built for longevity, not just launch.' },
              { n: '04', title: 'Scale', desc: 'Optimise, automate, measure. Turn the system into a compounding growth engine.' },
            ].map((step, i) => (
              <Reveal key={i} delay={i * 0.1}>
                <div style={{
                  padding: 'clamp(32px, 6vw, 44px) clamp(24px, 5vw, 32px)',
                  background: C.surface,
                  transition: 'background 0.28s', 
                  height: '100%',
                }}
                  onMouseEnter={e => e.currentTarget.style.background = '#161412'}
                  onMouseLeave={e => e.currentTarget.style.background = C.surface}
                >
                  <div style={{
                    fontFamily: '"DM Mono", monospace',
                    fontSize: '0.58rem', color: C.accentDim,
                    letterSpacing: '0.14em', marginBottom: 26,
                  }}>{step.n}</div>
                  <h3 style={{
                    fontFamily: '"Cormorant", serif',
                    fontSize: 'clamp(1.2rem, 4vw, 1.65rem)',
                    fontWeight: 400,
                    color: C.head, marginBottom: 12,
                  }}>{step.title}</h3>
                  <p style={{ fontSize: 'clamp(0.75rem, 2.5vw, 0.79rem)', color: C.sub, lineHeight: 1.7 }}>{step.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        <Divider />

        {/* ══ WORK ══ - responsive grid */}
        <section style={{
          ...sectionPadding,
          ...containerMaxWidth,
        }}>
          <div style={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'flex-end', 
            marginBottom: 'clamp(32px, 6vw, 52px)',
            flexWrap: 'wrap',
            gap: '16px',
          }}>
            <Reveal>
              <Tag>Selected Work</Tag>
              <h2 style={{
                fontFamily: '"Cormorant", serif',
                fontSize: 'clamp(1.5rem, 5vw, 3.4rem)',
                fontWeight: 300, color: C.head,
                lineHeight: 1.1, marginTop: 20,
              }}>Systems in Action</h2>
            </Reveal>
            <Reveal delay={0.15}>
              <button onClick={() => navigate('/projects')} style={{
                background: 'none', border: 'none', cursor: 'pointer',
                color: C.sub, fontSize: 'clamp(0.7rem, 2.5vw, 0.79rem)',
                fontFamily: '"Instrument Sans", sans-serif',
                display: 'flex', alignItems: 'center', gap: 6,
                transition: 'color 0.2s',
              }}
                onMouseEnter={e => e.currentTarget.style.color = C.head}
                onMouseLeave={e => e.currentTarget.style.color = C.sub}
              >
                View all work <ArrowRight size={13} />
              </button>
            </Reveal>
          </div>

          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(300px, 100%), 1fr))', 
            gap: 16 
          }}>
            {featuredProjects.map((cs, i) => (
              <Reveal key={cs.id || i} delay={i * 0.1}>
                <div onClick={() => navigate(`/project/${cs.id}`)} style={{
                  background: C.surface, border: `1px solid ${C.border}`,
                  borderRadius: 16, padding: 'clamp(28px, 6vw, 44px) clamp(24px, 5vw, 40px)',
                  cursor: 'pointer', transition: 'border-color 0.25s, background 0.25s',
                  display: 'flex', flexDirection: 'column', gap: 26,
                }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = C.muted; e.currentTarget.style.background = '#161412'; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = C.border; e.currentTarget.style.background = C.surface; }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Tag>{(cs.client || cs.name || '').substring(0, 20)}</Tag>
                    <ArrowUpRight size={15} color={C.muted} />
                  </div>

                  <div style={{ 
                    display: 'grid', 
                    gridTemplateColumns: 'repeat(auto-fit, minmax(min(200px, 100%), 1fr))', 
                    gap: 24 
                  }}>
                    {[
                      { label: 'Problem', text: cs.challenge || 'Low conversion rate and manual scaling bottlenecks.' },
                      { label: 'Solution', text: cs.solution || 'Complete platform rebuild with custom AI automations.' },
                    ].map((col) => (
                      <div key={col.label}>
                        <div style={{ fontSize: '0.6rem', color: C.muted, letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 8 }}>{col.label}</div>
                        <p style={{ fontSize: 'clamp(0.75rem, 2.5vw, 0.83rem)', color: C.body, lineHeight: 1.62 }}>{col.text}</p>
                      </div>
                    ))}
                  </div>

                  <div style={{ paddingTop: 24, borderTop: `1px solid ${C.border}` }}>
                    <div style={{ fontSize: '0.6rem', color: C.muted, letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 10 }}>Key Result</div>
                    <div style={{
                      fontFamily: '"Cormorant", serif',
                      fontSize: 'clamp(1.5rem, 5vw, 2.4rem)',
                      fontWeight: 400, color: C.head,
                    }}>{cs.results?.[0] || '+42% Conversion'}</div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        <Divider />

        {/* ══ WHY US + FOR / NOT FOR ══ - responsive layout */}
        <section style={{
          ...sectionPadding,
          ...containerMaxWidth,
        }}>
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(300px, 100%), 1fr))', 
            gap: 'clamp(40px, 8vw, 80px)', 
            alignItems: 'start' 
          }}>

            <div>
              <Reveal>
                <Tag>Why Partner With Us</Tag>
                <h2 style={{
                  fontFamily: '"Cormorant", serif',
                  fontSize: 'clamp(1.5rem, 5vw, 3rem)',
                  fontWeight: 300, color: C.head,
                  lineHeight: 1.12, marginTop: 20, marginBottom: 36,
                }}>
                  We think in systems,<br />
                  <em style={{ color: C.accent }}>not deliverables.</em>
                </h2>
              </Reveal>

              {[
                'Strategic thinking over template execution',
                'Conversion-focused at every layer',
                'Clean, scalable architecture',
                'Long-term growth mindset',
              ].map((pt, i) => (
                <Reveal key={i} delay={i * 0.07}>
                  <div style={{
                    display: 'flex', gap: 16, alignItems: 'flex-start',
                    padding: '17px 0', borderBottom: `1px solid ${C.border}`,
                  }}>
                    <CheckCircle size={13} color={C.accent} style={{ marginTop: 3, flexShrink: 0 }} />
                    <span style={{ fontSize: 'clamp(0.8rem, 2.8vw, 0.87rem)', color: C.body, lineHeight: 1.5 }}>{pt}</span>
                  </div>
                </Reveal>
              ))}
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 14, paddingTop: 8 }}>
              {[
                {
                  Icon: CheckCircle, iconColor: C.accent, label: 'Who we work with',
                  items: ['Businesses ready to scale and grow', 'Founders who value actual systems', 'Long-term thinkers and visionaries'],
                  dotColor: C.accent, textColor: C.body, bg: C.surface, border: C.border,
                },
                {
                  Icon: XCircle, iconColor: C.muted, label: "Who we don't work with",
                  items: ['"Just need a quick cheap website" clients', 'Highly price-sensitive buyers', 'Short-term mindset, no strategy'],
                  dotColor: C.borderMd, textColor: C.muted, bg: 'transparent', border: C.border,
                },
              ].map((block, bi) => (
                <Reveal key={bi} delay={bi * 0.1}>
                  <div style={{
                    background: block.bg, border: `1px solid ${block.border}`,
                    borderRadius: 14, padding: 'clamp(28px, 5vw, 36px) clamp(24px, 5vw, 32px)',
                  }}>
                    <div style={{
                      display: 'flex', alignItems: 'center', gap: 10,
                      marginBottom: 22, fontSize: 'clamp(0.7rem, 2.5vw, 0.76rem)',
                      fontWeight: 600,
                      color: block.iconColor, letterSpacing: '0.04em',
                    }}>
                      <block.Icon size={13} color={block.iconColor} /> {block.label}
                    </div>
                    <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 13 }}>
                      {block.items.map((item, ii) => (
                        <li key={ii} style={{ display: 'flex', gap: 12, alignItems: 'flex-start', fontSize: 'clamp(0.75rem, 2.5vw, 0.83rem)', color: block.textColor }}>
                          <div style={{ width: 5, height: 5, borderRadius: '50%', background: block.dotColor, marginTop: 6, flexShrink: 0 }} />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <Divider />

        {/* ══ BRAND STATEMENT ══ - responsive */}
        <section style={{
          ...sectionPadding,
          ...containerMaxWidth,
        }}>
          <Reveal>
            <div style={{
              display: 'flex', 
              gap: 'clamp(20px, 5vw, 40px)', 
              alignItems: 'center',
              background: C.surface, 
              border: `1px solid ${C.border}`,
              borderRadius: 16, 
              padding: 'clamp(28px, 6vw, 44px) clamp(24px, 5vw, 48px)',
              flexDirection: window.innerWidth < 640 ? 'column' : 'row',
              textAlign: window.innerWidth < 640 ? 'center' : 'left',
            }}>
              <div style={{
                width: 'clamp(40px, 10vw, 60px)', 
                height: 'clamp(40px, 10vw, 60px)', 
                borderRadius: '50%', 
                flexShrink: 0,
                background: `linear-gradient(135deg, ${C.accentDim}80, ${C.accent}30)`,
                border: `1px solid ${C.accentDim}`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontFamily: '"Cormorant", serif',
                fontSize: 'clamp(1.2rem, 4vw, 1.5rem)', 
                fontStyle: 'italic', color: C.accent,
              }}>A</div>
              <div>
                <div style={{
                  fontSize: '0.62rem', color: C.muted,
                  letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: 10,
                }}>The AVXONIA Standard</div>
                <p style={{
                  fontFamily: '"Cormorant", serif',
                  fontSize: 'clamp(1rem, 3vw, 1.5rem)',
                  fontWeight: 300, color: C.head, lineHeight: 1.5,
                }}>
                  AVXONIA was built to move businesses from a basic online presence to{' '}
                  <em style={{ color: C.accent }}>structured digital systems</em> that drive
                  predictable, long-term growth.
                </p>
              </div>
            </div>
          </Reveal>
        </section>

        <Divider />

        {/* ══ FINAL CTA ══ - responsive */}
        <section style={{
          padding: 'clamp(80px, 15vw, 140px) clamp(20px, 5vw, 40px)',
          ...containerMaxWidth,
          textAlign: 'center',
        }}>
          <Reveal>
            <Tag>Ready?</Tag>
            <h2 style={{
              fontFamily: '"Cormorant", serif',
              fontSize: 'clamp(1.8rem, 7vw, 5rem)',
              fontWeight: 300, color: C.head,
              lineHeight: 1.07, marginTop: 24, marginBottom: 18,
              maxWidth: 'clamp(280px, 90vw, 780px)', 
              marginInline: 'auto',
            }}>
              Ready to build a system that<br />
              <em style={{ color: C.accent }}>actually grows</em> your business?
            </h2>
            <p style={{ fontSize: 'clamp(0.8rem, 2.8vw, 0.88rem)', color: C.sub, marginBottom: 44 }}>
              Limited slots each month to ensure quality execution.
            </p>

            <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
              <button onClick={() => navigate('/contact')} style={{
                background: C.accent, color: C.bg, border: 'none', borderRadius: 100,
                padding: 'clamp(12px, 3vw, 15px) clamp(24px, 6vw, 36px)',
                cursor: 'pointer',
                fontFamily: '"Instrument Sans", sans-serif',
                fontSize: 'clamp(0.75rem, 2.5vw, 0.84rem)',
                fontWeight: 600, letterSpacing: '0.04em',
                display: 'flex', alignItems: 'center', gap: 8,
                transition: 'opacity 0.2s',
              }}
                onMouseEnter={e => e.currentTarget.style.opacity = '0.85'}
                onMouseLeave={e => e.currentTarget.style.opacity = '1'}
              >
                Book a Strategy Call <ArrowRight size={14} />
              </button>

              <button onClick={() => navigate('/contact')} style={{
                background: 'transparent', color: C.body,
                border: `1px solid ${C.borderMd}`, borderRadius: 100,
                padding: 'clamp(12px, 3vw, 15px) clamp(24px, 6vw, 36px)',
                cursor: 'pointer',
                fontFamily: '"Instrument Sans", sans-serif',
                fontSize: 'clamp(0.75rem, 2.5vw, 0.84rem)',
                letterSpacing: '0.04em',
                transition: 'border-color 0.2s, color 0.2s',
              }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = C.muted; e.currentTarget.style.color = C.head; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = C.borderMd; e.currentTarget.style.color = C.body; }}
              >
                Free Website Audit
              </button>
            </div>
          </Reveal>
        </section>

        {/* ══ FOOTER ══ - responsive */}
        <footer style={{
          borderTop: `1px solid ${C.border}`,
          padding: 'clamp(20px, 5vw, 28px) clamp(20px, 5vw, 40px)',
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          flexDirection: window.innerWidth < 640 ? 'column' : 'row',
          gap: window.innerWidth < 640 ? '16px' : '0',
          textAlign: 'center',
        }}>
          <span style={{ fontFamily: '"Cormorant", serif', fontSize: 'clamp(0.8rem, 2.8vw, 0.88rem)', color: C.muted }}>AVXONIA</span>
          <span style={{ fontFamily: '"DM Mono", monospace', fontSize: 'clamp(0.5rem, 2vw, 0.58rem)', color: C.muted, letterSpacing: '0.1em' }}>
            © 2026 — All rights reserved
          </span>
        </footer>

      </div>
    </>
  );
};

export default LandingPageWrapper;