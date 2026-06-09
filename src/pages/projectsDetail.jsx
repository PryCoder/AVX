/**
 * ProjectDetailPage — 2026 Artistic Edition
 *
 * Aesthetic: Mediterranean Editorial — Greek classical geometry meets
 * contemporary European design studios (Pentagram, Bureau Borsche DNA).
 *
 * FULLY RESPONSIVE — optimized for all screen sizes without UI changes
 */

import React, { useEffect, useState, useRef } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import {
  motion, useScroll, useTransform, useInView,
  useMotionValue, useSpring, AnimatePresence,
} from 'framer-motion'
import { Button } from '../components/ui/button'
import { Card, CardContent } from '../components/ui/card'
import { Badge } from '../components/ui/badge'
import { AspectRatio } from '../components/ui/aspect-ratio'
import {
  Carousel, CarouselContent, CarouselItem,
  CarouselNext, CarouselPrevious,
} from '../components/ui/carousel'
import { Dialog, DialogContent, DialogTrigger } from '../components/ui/dialog'
import { Separator } from '../components/ui/separator'
import { Progress } from '../components/ui/progress'
import {
  ArrowLeft, ArrowUpRight, Calendar, User, Clock,
  CheckCircle, ExternalLink, Sparkles, Layers, Target,
  Lightbulb, TrendingUp, Zap, Award, Maximize2,
} from 'lucide-react'
import { getProjectIcon } from '../data/projectsIcon'
import projectsData from '../data/projects.json'

// ─── Design tokens ────────────────────────────────────────────────────────────
const P = {
  terra:   '#C4622D',
  terraL:  '#E8A99A',
  aegean:  '#1B4F72',
  aegeanL: '#2E86C1',
  saffron: '#E8A219',
  safL:    '#F5D27A',
  sage:    '#5B7B5E',
  sageL:   '#9ABF9E',
  blush:   '#E8C4B0',
  indigo:  '#3D3580',
  indigoL: '#7B74D6',
  cream:   '#FAF7F2',
  stone:   '#F2EDE6',
  border:  '#E8E0D5',
  ink:     '#1A1915',
  muted:   '#7A766E',
}

const ease = [0.22, 1, 0.36, 1]

// ─── Greek Meander SVG accent (responsive scaling) ───────────────────────────
const MeanderAccent = ({ color = P.terra, opacity = 0.18, scale = 1 }) => (
  <svg
    width={`${120 * scale}px`} 
    height={`${24 * scale}px`} 
    viewBox="0 0 120 24"
    fill="none" 
    aria-hidden="true"
    className="w-auto h-auto"
    style={{ opacity }}
  >
    <path
      d="M0 12 H8 V4 H28 V20 H16 V12 H20 V16 H24 V8 H12 V20 H36 V4 H56 V20 H44 V12 H48 V16 H52 V8 H40 V20 H64 V4 H84 V20 H72 V12 H76 V16 H80 V8 H68 V20 H92 V4 H112 V20 H100 V12 H104 V16 H108 V8 H96 V20 H120"
      stroke={color} strokeWidth="2.5" strokeLinecap="square"
    />
  </svg>
)

// ─── Decorative arch divider (responsive) ────────────────────────────────────
const ArchDivider = ({ fill = P.cream }) => (
  <div className="w-full overflow-hidden leading-none -mb-px">
    <svg viewBox="0 0 1440 48" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" className="w-full h-8 sm:h-10 md:h-12">
      <path d="M0 48 C360 0 1080 0 1440 48 L1440 48 L0 48 Z" fill={fill} />
    </svg>
  </div>
)

// ─── Mosaic dot pattern (responsive) ─────────────────────────────────────────
const MosaicPattern = ({ color = P.terra, opacity = 0.07 }) => (
  <svg className="absolute inset-0 w-full h-full pointer-events-none" aria-hidden="true" style={{ opacity }}>
    <defs>
      <pattern id={`mosaic-${color.replace('#','')}`} x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
        <rect x="0" y="0" width="9" height="9" fill={color} rx="1.5" />
        <rect x="11" y="11" width="9" height="9" fill={color} rx="1.5" />
      </pattern>
    </defs>
    <rect width="100%" height="100%" fill={`url(#mosaic-${color.replace('#','')})`} />
  </svg>
)

// ─── Section label pill (responsive) ─────────────────────────────────────────
const SectionPill = ({ label, color = P.terra }) => (
  <motion.span
    initial={{ opacity: 0, x: -12 }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5, ease }}
    className="inline-flex items-center gap-1.5 sm:gap-2 mb-3 sm:mb-4"
  >
    <span style={{ background: color }}
      className="inline-block w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full flex-shrink-0" />
    <span
      className="text-[8px] sm:text-[10px] font-bold tracking-[0.15em] sm:tracking-[0.2em] uppercase"
      style={{ color, fontFamily: "'DM Mono', monospace" }}
    >{label}</span>
  </motion.span>
)

// ─── StatItem (fully responsive) ────────────────────────────────────────────
const STAT_COLORS = [P.terra, P.aegean, P.saffron, P.sage]

const StatItem = ({ icon: Icon, value, label, index }) => {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const col = STAT_COLORS[index % STAT_COLORS.length]
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay: index * 0.1, ease }}
      whileHover={{ y: -4 }}
      className="relative text-center group p-4 sm:p-6 rounded-xl sm:rounded-2xl overflow-hidden"
      style={{ background: P.cream, border: `1px solid ${P.border}` }}
    >
      <div className="absolute top-0 left-0 w-full h-0.5 sm:h-1 rounded-t-xl sm:rounded-t-2xl" style={{ background: col }} />
      <motion.div
        whileHover={{ rotate: 15, scale: 1.1 }}
        transition={{ type: 'spring', stiffness: 300 }}
        className="inline-flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl mb-2 sm:mb-3 mx-auto"
        style={{ background: `${col}18`, border: `1px solid ${col}30` }}
      >
        <Icon size={16} className="sm:w-5 sm:h-5" style={{ color: col }} />
      </motion.div>
      <p className="clash-font text-xl sm:text-2xl lg:text-3xl font-bold" style={{ color: P.ink }}>{value}</p>
      <p className="sfpro-font text-[10px] sm:text-xs mt-1" style={{ color: P.muted }}>{label}</p>
    </motion.div>
  )
}

// ─── FeatureItem (responsive) ───────────────────────────────────────────────
const FeatureItem = ({ feature, index, inView }) => {
  const colors = [P.terra, P.aegean, P.saffron, P.sage, P.indigo]
  const col = colors[index % colors.length]
  return (
    <motion.div
      initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.07, ease }}
      whileHover={{ scale: 1.01, y: -2 }}
      className="flex items-start gap-3 sm:gap-4 p-4 sm:p-5 rounded-xl sm:rounded-2xl border"
      style={{ background: P.stone, borderColor: P.border }}
    >
      <div
        className="w-6 h-6 sm:w-7 sm:h-7 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5"
        style={{ background: col }}
      >
        <CheckCircle size={12} className="sm:w-[14px] sm:h-[14px]" color="#fff" />
      </div>
      <div className="flex-1">
        <p className="sfpro-font text-xs sm:text-sm font-semibold mb-1.5 sm:mb-2" style={{ color: P.ink }}>{feature}</p>
        <motion.div
          initial={{ width: 0 }}
          animate={inView ? { width: '100%' } : {}}
          transition={{ duration: 0.9, delay: 0.3 + index * 0.06, ease }}
        >
          <div className="h-1 sm:h-1.5 rounded-full overflow-hidden" style={{ background: `${col}22` }}>
            <div className="h-full rounded-full" style={{ background: col, width: `${82 + (index % 3) * 6}%` }} />
          </div>
        </motion.div>
      </div>
    </motion.div>
  )
}

// ─── ResultItem (responsive) ────────────────────────────────────────────────
const MEDALLION_COLORS = [
  { bg: P.terra,  text: '#fff' },
  { bg: P.aegean, text: '#fff' },
  { bg: P.saffron,text: P.ink  },
  { bg: P.sage,   text: '#fff' },
  { bg: P.indigo, text: '#fff' },
]

const ResultItem = ({ result, index, inView }) => {
  const med = MEDALLION_COLORS[index % MEDALLION_COLORS.length]
  return (
    <motion.div
      initial={{ opacity: 0, x: -24 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.08, ease }}
      whileHover={{ x: 4 }}
      className="flex items-start gap-3 sm:gap-4 p-4 sm:p-5 rounded-xl sm:rounded-2xl border"
      style={{ background: P.cream, borderColor: P.border }}
    >
      <div
        className="w-8 h-8 sm:w-9 sm:h-9 rounded-full flex items-center justify-center flex-shrink-0 shadow-sm"
        style={{ background: med.bg, color: med.text }}
      >
        <span className="clash-font text-xs sm:text-sm font-bold">{String(index + 1).padStart(2, '0')}</span>
      </div>
      <p className="sfpro-font text-xs sm:text-sm leading-relaxed" style={{ color: '#3A3732' }}>{result}</p>
    </motion.div>
  )
}

// ─── SectionHeading (responsive) ────────────────────────────────────────────
const SectionHeading = ({ icon: Icon, title, accent = P.terra }) => {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 16 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, ease }}
      className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6"
    >
      <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl flex items-center justify-center shadow-sm"
        style={{ background: accent }}>
        <Icon size={14} className="sm:w-[18px] sm:h-[18px]" color="#fff" />
      </div>
      <h2 className="clash-font text-xl sm:text-2xl lg:text-3xl font-bold" style={{ color: P.ink }}>{title}</h2>
      <div className="flex-1 h-px ml-2 hidden sm:block" style={{ background: `linear-gradient(to right, ${accent}40, transparent)` }} />
    </motion.div>
  )
}

// ─── OverviewSection (responsive) ───────────────────────────────────────────
const OverviewSection = ({ description }) => {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  return (
    <div ref={ref}>
      <SectionPill label="Overview" color={P.terra} />
      <SectionHeading icon={Lightbulb} title="Overview" accent={P.terra} />
      <motion.p
        initial={{ opacity: 0, y: 16 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay: 0.1, ease }}
        className="sfpro-font text-sm sm:text-base lg:text-lg leading-relaxed"
        style={{ color: '#4A4640' }}
      >{description}</motion.p>
    </div>
  )
}

// ─── ChallengeSection (responsive) ──────────────────────────────────────────
const ChallengeSection = ({ challenge, solution }) => {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  if (!challenge && !solution) return null
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, ease }}
      className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5"
    >
      {challenge && (
        <motion.div
          whileHover={{ y: -4 }}
          transition={{ type: 'spring', stiffness: 300, damping: 22 }}
          className="relative p-5 sm:p-7 rounded-2xl sm:rounded-3xl overflow-hidden"
          style={{ background: `${P.terra}10`, border: `1px solid ${P.terra}25` }}
        >
          <div className="absolute top-0 right-0 w-20 h-20 sm:w-24 sm:h-24 rounded-bl-full opacity-10" style={{ background: P.terra }} />
          <Target size={22} className="sm:w-7 sm:h-7 mb-3 sm:mb-4" style={{ color: P.terra }} />
          <h3 className="clash-font text-lg sm:text-xl font-bold mb-2 sm:mb-3" style={{ color: P.ink }}>The Challenge</h3>
          <p className="sfpro-font text-xs sm:text-sm leading-relaxed" style={{ color: '#4A4640' }}>{challenge}</p>
        </motion.div>
      )}
      {solution && (
        <motion.div
          whileHover={{ y: -4 }}
          transition={{ type: 'spring', stiffness: 300, damping: 22 }}
          className="relative p-5 sm:p-7 rounded-2xl sm:rounded-3xl overflow-hidden"
          style={{ background: `${P.aegean}10`, border: `1px solid ${P.aegean}25` }}
        >
          <div className="absolute top-0 right-0 w-20 h-20 sm:w-24 sm:h-24 rounded-bl-full opacity-10" style={{ background: P.aegean }} />
          <Lightbulb size={22} className="sm:w-7 sm:h-7 mb-3 sm:mb-4" style={{ color: P.aegean }} />
          <h3 className="clash-font text-lg sm:text-xl font-bold mb-2 sm:mb-3" style={{ color: P.ink }}>The Solution</h3>
          <p className="sfpro-font text-xs sm:text-sm leading-relaxed" style={{ color: '#4A4640' }}>{solution}</p>
        </motion.div>
      )}
    </motion.div>
  )
}

// ─── FeaturesSection (responsive) ───────────────────────────────────────────
const FeaturesSection = ({ features }) => {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  if (!features) return null
  return (
    <div ref={ref}>
      <SectionPill label="Key Features" color={P.saffron} />
      <SectionHeading icon={CheckCircle} title="Key Features" accent={P.saffron} />
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
        {features.map((f, i) => <FeatureItem key={i} feature={f} index={i} inView={inView} />)}
      </div>
    </div>
  )
}

// ─── ResultsSection (responsive) ────────────────────────────────────────────
const ResultsSection = ({ results }) => {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  if (!results) return null
  return (
    <div ref={ref}>
      <SectionPill label="Results" color={P.sage} />
      <SectionHeading icon={Sparkles} title="Results" accent={P.sage} />
      <div className="space-y-2 sm:space-y-3">
        {results.map((r, i) => <ResultItem key={i} result={r} index={i} inView={inView} />)}
      </div>
    </div>
  )
}

// ─── InfoCard (fully responsive) ────────────────────────────────────────────
const InfoCard = ({ project }) => {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const details = [
    { icon: User,     label: 'Client',   value: project.client || 'Confidential' },
    { icon: Calendar, label: 'Year',     value: project.year },
    { icon: Clock,    label: 'Duration', value: project.duration || '3 months' },
    { icon: Layers,   label: 'Role',     value: project.role || 'Lead Developer' },
  ]
  const techColors = [P.terra, P.aegean, P.saffron, P.sage, P.indigo]

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: 30 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.7, ease }}
      className="lg:col-span-1 mt-8 lg:mt-0"
    >
      <div
        className="lg:sticky lg:top-24 rounded-2xl sm:rounded-3xl overflow-hidden shadow-xl"
        style={{ border: `1px solid ${P.border}` }}
      >
        {/* Top band */}
        <div
          className="relative px-5 sm:px-7 pt-5 sm:pt-7 pb-4 sm:pb-6 overflow-hidden"
          style={{ background: P.aegean }}
        >
          <MosaicPattern color="#fff" opacity={0.04} />
          <div className="absolute -bottom-4 sm:-bottom-6 -right-4 sm:-right-6 w-24 h-24 sm:w-32 sm:h-32 rounded-full opacity-10"
            style={{ background: P.saffron }} />
          <p className="clash-font text-lg sm:text-xl font-bold text-white mb-0.5">Project Details</p>
          <p className="sfpro-font text-[10px] sm:text-xs" style={{ color: 'rgba(255,255,255,0.5)' }}>
            {project.name}
          </p>
        </div>

        {/* Details */}
        <div className="px-5 sm:px-7 py-5 sm:py-6 space-y-4 sm:space-y-5" style={{ background: P.cream }}>
          {details.map((item, i) => (
            <React.Fragment key={item.label}>
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, delay: 0.1 + i * 0.07, ease }}
                className="flex items-center gap-3 sm:gap-4 group"
              >
                <div
                  className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg sm:rounded-xl flex items-center justify-center flex-shrink-0 transition-all duration-300"
                  style={{ background: P.stone, border: `1px solid ${P.border}` }}
                >
                  <item.icon size={13} className="sm:w-[15px] sm:h-[15px]" style={{ color: P.muted }} />
                </div>
                <div>
                  <p className="text-[8px] sm:text-[10px] uppercase tracking-wider mb-0.5" style={{ color: P.muted, fontFamily: "'DM Mono', monospace" }}>{item.label}</p>
                  <p className="sfpro-font text-xs sm:text-sm font-semibold" style={{ color: P.ink }}>{item.value}</p>
                </div>
              </motion.div>
              {i < 3 && <div className="h-px" style={{ background: P.border }} />}
            </React.Fragment>
          ))}
        </div>

        {/* Tech stack */}
        <div className="px-5 sm:px-7 pt-2 pb-5 sm:pb-7" style={{ background: P.cream, borderTop: `1px solid ${P.border}` }}>
          <p className="clash-font text-xs sm:text-sm font-bold mb-3 sm:mb-4" style={{ color: P.ink }}>Technologies</p>
          <div className="flex flex-wrap gap-1.5 sm:gap-2">
            {(project.technologies || project.stack.split(' + ')).map((tech, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, scale: 0.7 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.3, delay: 0.2 + i * 0.04, type: 'spring', stiffness: 320 }}
                whileHover={{ scale: 1.05, y: -1 }}
                className="inline-flex items-center px-2 py-1 sm:px-3 sm:py-1.5 rounded-full text-[8px] sm:text-xs font-mono font-semibold cursor-default"
                style={{
                  background: `${techColors[i % techColors.length]}14`,
                  color: techColors[i % techColors.length],
                  border: `1px solid ${techColors[i % techColors.length]}30`,
                }}
              >
                {tech}
              </motion.span>
            ))}
          </div>
        </div>

        {/* CTA */}
        {project.website && (
          <div className="px-5 sm:px-7 pb-5 sm:pb-7" style={{ background: P.cream }}>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => window.open(project.website, '_blank')}
              className="w-full flex items-center justify-center gap-1.5 sm:gap-2 py-3 sm:py-4 rounded-xl sm:rounded-2xl text-white text-xs sm:text-sm font-semibold transition-all duration-300 overflow-hidden relative"
              style={{ background: `linear-gradient(135deg, ${P.terra}, ${P.saffron})` }}
            >
              <span className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-300"
                style={{ background: `linear-gradient(135deg, ${P.saffron}, ${P.terra})` }} />
              <span className="relative z-10 flex items-center gap-1.5 sm:gap-2">
                Visit Live Project
                <ExternalLink size={12} className="sm:w-[14px] sm:h-[14px]" />
              </span>
            </motion.button>
          </div>
        )}
      </div>
    </motion.div>
  )
}

// ═════════════════════════════════════════════════════════════════════════════
// MAIN PAGE COMPONENT
// ═════════════════════════════════════════════════════════════════════════════
const ProjectDetailPage = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [project, setProject] = useState(null)
  const [loading, setLoading] = useState(true)

  const heroRef = useRef(null)
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const mouseXSpring = useSpring(mouseX, { stiffness: 100, damping: 30 })
  const mouseYSpring = useSpring(mouseY, { stiffness: 100, damping: 30 })

  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] })
  const heroOpacity  = useTransform(scrollYProgress, [0, 0.8], [1, 0.3])
  const heroScale    = useTransform(scrollYProgress, [0, 1], [1, 1.04])
  const heroImageY   = useTransform(scrollYProgress, [0, 1], [0, 60])
  const rotateX      = useTransform(mouseYSpring, [-10, 10], [4, -4])
  const rotateY      = useTransform(mouseXSpring, [-10, 10], [-4, 4])

  useEffect(() => {
    const found = projectsData.projects.find(p => p.id === parseInt(id))
    setProject(found)
    setLoading(false)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [id])

  useEffect(() => {
    const fn = (e) => {
      mouseX.set((e.clientX / window.innerWidth - 0.5) * 20)
      mouseY.set((e.clientY / window.innerHeight - 0.5) * 20)
    }
    window.addEventListener('mousemove', fn)
    return () => window.removeEventListener('mousemove', fn)
  }, [mouseX, mouseY])

  // ── Loading ──────────────────────────────────────────────────────────────
  if (loading) return (
    <div className="min-h-screen flex items-center justify-center" style={{ background: P.cream }}>
      <div className="text-center px-4">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1.2, repeat: Infinity, ease: 'linear' }}
          className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-full mx-auto mb-3 sm:mb-4 border-4"
          style={{ borderColor: `${P.terra}30`, borderTopColor: P.terra }}
        />
        <p className="sfpro-font text-xs sm:text-sm" style={{ color: P.muted }}>Loading project…</p>
      </div>
    </div>
  )

  // ── Not found ────────────────────────────────────────────────────────────
  if (!project) return (
    <div className="min-h-screen flex items-center justify-center" style={{ background: P.cream }}>
      <motion.div
        initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease }}
        className="text-center max-w-md mx-auto px-6"
      >
        <div className="text-3xl sm:text-4xl md:text-5xl mb-4 sm:mb-6">🏺</div>
        <h2 className="clash-font text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4" style={{ color: P.ink }}>Project not found</h2>
        <p className="sfpro-font text-sm sm:text-base mb-6 sm:mb-8" style={{ color: P.muted }}>This artefact doesn't exist or has been moved.</p>
        <Button onClick={() => navigate('/projects')}
          className="rounded-full px-6 sm:px-8 py-3 sm:py-5 text-white text-sm sm:text-base"
          style={{ background: P.terra }}>
          <ArrowLeft size={14} className="sm:w-4 sm:h-4 mr-2" /> Back to Projects
        </Button>
      </motion.div>
    </div>
  )

  const galleryImages = project.gallery || [project.image, project.image, project.image]

  // ── Page ─────────────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen overflow-x-hidden" style={{ background: P.cream, fontFamily: 'inherit' }}>

      {/* ══════════════════════════════════════════════════════════════════
          HERO — fully responsive
      ══════════════════════════════════════════════════════════════════ */}
      <div
        ref={heroRef}
        className="relative w-full overflow-hidden"
        style={{
          background: `linear-gradient(145deg, ${P.cream} 0%, #F5EDE2 40%, ${P.blush}60 100%)`,
          borderBottom: `1px solid ${P.border}`,
        }}
      >
        <MosaicPattern color={P.terra} opacity={0.05} />

        {/* Decorative circles - hidden on mobile */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute -top-32 -right-32 w-[300px] sm:w-[400px] md:w-[500px] h-[300px] sm:h-[400px] md:h-[500px] rounded-full opacity-20"
            style={{ background: `radial-gradient(circle, ${P.saffron} 0%, transparent 70%)` }} />
          <div className="absolute -bottom-20 -left-20 w-[250px] sm:w-[350px] md:w-[400px] h-[250px] sm:h-[350px] md:h-[400px] rounded-full opacity-15"
            style={{ background: `radial-gradient(circle, ${P.terra} 0%, transparent 70%)` }} />
          {/* Animated rings - hidden on mobile */}
          {[1, 2, 3].map(i => (
            <motion.div
              key={i}
              className="absolute rounded-full hidden md:block"
              style={{
                width: i * 180, height: i * 180,
                top: `${15 + i * 4}%`, left: `${60 + i * 3}%`,
                border: `1px solid ${P.terra}`,
                opacity: 0.12,
              }}
              animate={{ scale: [1, 1.04, 1], opacity: [0.12, 0.22, 0.12] }}
              transition={{ duration: 4 + i * 1.5, repeat: Infinity, ease: 'easeInOut', delay: i * 0.4 }}
            />
          ))}
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-10 pt-6 sm:pt-10 md:pt-14 lg:pt-20 pb-8 sm:pb-12 md:pb-16 lg:pb-20 mt-6 sm:mt-8 md:mt-10">
          {/* Back button */}
          <motion.div initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.4, ease }}>
            <motion.button
              whileHover={{ x: -4 }}
              onClick={() => navigate('/projects')}
              className="inline-flex items-center gap-1.5 sm:gap-2 mb-6 sm:mb-8 md:mb-10 lg:mb-12 text-[10px] sm:text-xs font-semibold px-3 sm:px-4 py-1.5 sm:py-2 rounded-full transition-all duration-200 group"
              style={{ color: P.terra, background: `${P.terra}12`, border: `1px solid ${P.terra}25` }}
            >
              <ArrowLeft size={12} className="sm:w-[14px] sm:h-[14px] group-hover:-translate-x-0.5 transition-transform" />
              Back to Projects
            </motion.button>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-8 md:gap-12 lg:gap-16 items-center">
            {/* Left — text */}
            <motion.div style={{ opacity: heroOpacity }} className="space-y-4 sm:space-y-5 md:space-y-6 order-2 lg:order-1">
              {/* Badges */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.08, ease }}
                className="flex flex-wrap items-center gap-1.5 sm:gap-2"
              >
                <span
                  className="inline-flex items-center gap-1 sm:gap-2 text-[10px] sm:text-xs font-semibold px-3 sm:px-4 py-1 sm:py-1.5 rounded-full shadow-sm"
                  style={{ background: '#fff', color: P.ink, border: `1px solid ${P.border}` }}
                >
                  <span className="text-xs sm:text-base">{getProjectIcon(project.icon)}</span>
                  <span className="hidden xs:inline">{project.stack}</span>
                  <span className="xs:hidden">{project.stack.split(' ')[0]}</span>
                </span>
                <span
                  className="inline-flex items-center text-[10px] sm:text-xs font-mono px-2 sm:px-3 py-1 sm:py-1.5 rounded-full"
                  style={{ background: `${P.aegean}12`, color: P.aegean, border: `1px solid ${P.aegean}25` }}
                >{project.year}</span>
              </motion.div>

              {/* Greek meander accent - responsive sizing */}
              <div className="scale-75 sm:scale-90 md:scale-100 origin-left">
                <MeanderAccent color={P.terra} opacity={0.25} scale={0.8} />
              </div>

              {/* Heading */}
              <motion.h1
                initial={{ opacity: 0, y: 40, skewY: 1.5 }}
                animate={{ opacity: 1, y: 0, skewY: 0 }}
                transition={{ duration: 0.85, delay: 0.15, ease }}
                className="clash-font text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-[1.1] tracking-tight"
                style={{ color: P.ink }}
              >
                {project.name}
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.65, delay: 0.25, ease }}
                className="sfpro-font text-sm sm:text-base lg:text-lg leading-relaxed max-w-xl"
                style={{ color: '#5A5650' }}
              >
                {project.fullDescription || project.shortDescription}
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55, delay: 0.35, ease }}
                className="flex flex-wrap gap-2 sm:gap-3 pt-2"
              >
                {project.website && (
                  <motion.button
                    whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
                    onClick={() => window.open(project.website, '_blank')}
                    className="inline-flex items-center gap-1.5 sm:gap-2 px-4 sm:px-5 md:px-6 py-2.5 sm:py-3 md:py-3.5 rounded-full text-xs sm:text-sm font-semibold text-white shadow-lg transition-all duration-300"
                    style={{ background: `linear-gradient(135deg, ${P.terra}, ${P.saffron})` }}
                  >
                    Visit Website <ExternalLink size={12} className="sm:w-[14px] sm:h-[14px]" />
                  </motion.button>
                )}
                <motion.button
                  whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
                  className="inline-flex items-center gap-1.5 sm:gap-2 px-4 sm:px-5 md:px-6 py-2.5 sm:py-3 md:py-3.5 rounded-full text-xs sm:text-sm font-semibold transition-all duration-300"
                  style={{ color: P.aegean, background: `${P.aegean}10`, border: `1.5px solid ${P.aegean}30` }}
                >
                  Case Study <ArrowUpRight size={12} className="sm:w-[14px] sm:h-[14px]" />
                </motion.button>
              </motion.div>
            </motion.div>

            {/* Right — hero image */}
            <motion.div
              style={{ y: heroImageY, scale: heroScale, rotateX, rotateY, transformStyle: 'preserve-3d', perspective: '1000px' }}
              className="w-full order-1 lg:order-2 mb-6 lg:mb-0"
            >
              <motion.div
                initial={{ opacity: 0, y: 40, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.9, delay: 0.2, ease }}
              >
                <Dialog>
                  <DialogTrigger asChild>
                    <motion.div
                      className="relative group cursor-pointer"
                      whileHover={{ scale: 1.02 }}
                      transition={{ type: 'spring', stiffness: 280 }}
                    >
                      <div
                        className="absolute -inset-2 sm:-inset-3 rounded-2xl sm:rounded-3xl blur-xl sm:blur-2xl opacity-30 -z-10"
                        style={{ background: `linear-gradient(135deg, ${P.terra}, ${P.saffron}, ${P.aegean})` }}
                      />
                      <div
                        className="relative rounded-xl sm:rounded-2xl overflow-hidden shadow-xl sm:shadow-2xl"
                        style={{ border: `1px solid ${P.border}` }}
                      >
                        <AspectRatio ratio={16 / 9}>
                          <motion.img
                            src={project.image} alt={project.name}
                            className="object-cover w-full h-full"
                            whileHover={{ scale: 1.05 }}
                            transition={{ duration: 0.7, ease }}
                          />
                          <motion.div
                            className="absolute inset-0 flex items-center justify-center"
                            initial={{ opacity: 0 }}
                            whileHover={{ opacity: 1 }}
                            style={{ background: `${P.ink}55`, backdropFilter: 'blur(2px)' }}
                          >
                            <div className="bg-white/95 rounded-full p-2 sm:p-3 shadow-lg">
                              <Maximize2 size={14} className="sm:w-[18px] sm:h-[18px]" style={{ color: P.ink }} />
                            </div>
                          </motion.div>
                        </AspectRatio>
                      </div>
                    </motion.div>
                  </DialogTrigger>
                  <DialogContent className="max-w-[95vw] sm:max-w-5xl p-0 overflow-hidden bg-black/96">
                    <motion.img
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.35, ease }}
                      src={project.image} alt={project.name}
                      className="w-full h-auto max-h-[85vh] object-contain"
                    />
                  </DialogContent>
                </Dialog>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════════════════
          STATS STRIP — fully responsive
      ══════════════════════════════════════════════════════════════════ */}
      <div className="w-full py-8 sm:py-10 md:py-14" style={{ background: P.stone, borderBottom: `1px solid ${P.border}` }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
            {[
              { icon: Zap,       value: project.duration || '3 mos', label: 'Timeline'    },
              { icon: Award,     value: '100%',                       label: 'Satisfaction' },
              { icon: TrendingUp,value: '+45%',                       label: 'Growth'       },
              { icon: Layers,    value: project.features?.length || 8, label: 'Features'   },
            ].map((s, i) => <StatItem key={s.label} {...s} index={i} />)}
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════════════════
          GALLERY — fully responsive polaroid style
      ══════════════════════════════════════════════════════════════════ */}
      {galleryImages.length > 1 && (
        <div className="w-full py-10 sm:py-14 md:py-20" style={{ background: P.cream }}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-10">
            <SectionPill label="Gallery" color={P.indigo} />
            <SectionHeading icon={Sparkles} title="Visual Journey" accent={P.indigo} />
            <Carousel className="w-full mt-6 sm:mt-8">
              <CarouselContent className="-ml-3 sm:-ml-4">
                {galleryImages.map((image, i) => (
                  <CarouselItem key={i} className="pl-3 sm:pl-4 basis-full sm:basis-1/2 lg:basis-1/3">
                    <motion.div
                      initial={{ opacity: 0, y: 28 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: '-80px' }}
                      transition={{ duration: 0.5, delay: i * 0.1, ease }}
                    >
                      <Dialog>
                        <DialogTrigger asChild>
                          <motion.div
                            className="cursor-pointer"
                            whileHover={{ scale: 1.02, rotate: i % 2 === 0 ? 0.5 : -0.5 }}
                            transition={{ type: 'spring', stiffness: 300 }}
                          >
                            <div
                              className="rounded-xl sm:rounded-2xl overflow-hidden shadow-lg sm:shadow-xl p-1.5 sm:p-2 pb-4 sm:pb-6"
                              style={{ background: '#fff', border: `1px solid ${P.border}` }}
                            >
                              <div className="rounded-lg sm:rounded-xl overflow-hidden">
                                <AspectRatio ratio={4 / 3}>
                                  <motion.img
                                    src={image} alt={`${project.name} — ${i + 1}`}
                                    className="object-cover w-full h-full"
                                    whileHover={{ scale: 1.08 }}
                                    transition={{ duration: 0.55, ease }}
                                  />
                                </AspectRatio>
                              </div>
                              <div className="flex justify-center mt-2 sm:mt-3">
                                <div className="w-6 sm:w-8 h-0.5 sm:h-1 rounded-full" style={{ background: [P.terra, P.aegean, P.saffron][i % 3] }} />
                              </div>
                            </div>
                          </motion.div>
                        </DialogTrigger>
                        <DialogContent className="max-w-[95vw] sm:max-w-5xl p-0 overflow-hidden bg-black/96">
                          <motion.img
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.35, ease }}
                            src={image} alt={`${project.name} — ${i + 1}`}
                            className="w-full h-auto max-h-[85vh] object-contain"
                          />
                        </DialogContent>
                      </Dialog>
                    </motion.div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <div className="flex justify-end gap-1.5 sm:gap-2 mt-4 sm:mt-6">
                <CarouselPrevious
                  className="static translate-y-0 rounded-full w-8 h-8 sm:w-10 sm:h-10"
                  style={{ background: P.stone, border: `1px solid ${P.border}`, color: P.ink }}
                />
                <CarouselNext
                  className="static translate-y-0 rounded-full w-8 h-8 sm:w-10 sm:h-10"
                  style={{ background: P.stone, border: `1px solid ${P.border}`, color: P.ink }}
                />
              </div>
            </Carousel>
          </div>
        </div>
      )}

      {/* ══════════════════════════════════════════════════════════════════
          DETAILS GRID — fully responsive
      ══════════════════════════════════════════════════════════════════ */}
      <div
        className="w-full py-10 sm:py-14 md:py-20"
        style={{ background: P.stone, borderTop: `1px solid ${P.border}`, borderBottom: `1px solid ${P.border}` }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-10">
          <div className="flex flex-col lg:grid lg:grid-cols-3 gap-8 md:gap-12 lg:gap-16">
            <div className="lg:col-span-2 space-y-10 sm:space-y-12 md:space-y-16">
              <OverviewSection description={project.fullDescription || project.shortDescription} />
              <ChallengeSection challenge={project.challenge} solution={project.solution} />
              <FeaturesSection features={project.features} />
              <ResultsSection results={project.results} />
            </div>
            <InfoCard project={project} />
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════════════════
          PREV / NEXT NAV — fully responsive arch-shaped CTA strip
      ══════════════════════════════════════════════════════════════════ */}
      <div
        className="relative w-full py-10 sm:py-14 md:py-20 overflow-hidden"
        style={{ background: P.aegean }}
      >
        <MosaicPattern color="#fff" opacity={0.03} />
        <div className="absolute -top-20 -left-20 w-60 h-60 sm:w-80 sm:h-80 rounded-full opacity-20 pointer-events-none"
          style={{ background: `radial-gradient(circle, ${P.saffron}, transparent 70%)` }} />
        <div className="absolute -bottom-20 -right-20 w-60 h-60 sm:w-80 sm:h-80 rounded-full opacity-15 pointer-events-none"
          style={{ background: `radial-gradient(circle, ${P.indigoL}, transparent 70%)` }} />

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease }}
          className="relative max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-10"
        >
          <p className="text-center text-[9px] sm:text-xs font-bold tracking-widest uppercase mb-6 sm:mb-8 opacity-40 text-white"
            style={{ fontFamily: "'DM Mono', monospace" }}>Continue exploring</p>

          <div className="flex flex-col sm:flex-row justify-between items-center gap-3 sm:gap-4 md:gap-6">
            {/* Prev */}
            <motion.button
              whileHover={{ x: -5 }}
              transition={{ type: 'spring', stiffness: 400 }}
              onClick={() => { const p = parseInt(id) - 1; if (p >= 1) navigate(`/project/${p}`) }}
              disabled={parseInt(id) === 1}
              className="group flex items-center gap-3 sm:gap-4 px-4 sm:px-5 md:px-6 py-3 sm:py-4 md:py-5 rounded-xl sm:rounded-2xl w-full sm:w-auto transition-all duration-300 disabled:opacity-30"
              style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.15)' }}
            >
              <ArrowLeft size={14} className="sm:w-[16px] sm:h-[16px] md:w-[18px] md:h-[18px] text-white opacity-70 group-hover:opacity-100 group-hover:-translate-x-1 transition-all flex-shrink-0" />
              <div className="text-left">
                <p className="text-[8px] sm:text-[10px] uppercase tracking-wider opacity-50 text-white mb-0.5"
                  style={{ fontFamily: "'DM Mono', monospace" }}>Previous</p>
                <p className="clash-font text-xs sm:text-sm md:text-base font-bold text-white truncate max-w-[120px] sm:max-w-[160px] md:max-w-[180px]">
                  {parseInt(id) > 1 ? projectsData.projects[parseInt(id) - 2]?.name : '—'}
                </p>
              </div>
            </motion.button>

            {/* Counter badge */}
            <div
              className="hidden sm:flex items-center px-4 sm:px-5 py-2 sm:py-2.5 rounded-full"
              style={{ background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)' }}
            >
              <span className="clash-font text-xs sm:text-sm font-bold text-white">
                {id} <span className="opacity-40 mx-1">/</span> {projectsData.projects.length}
              </span>
            </div>

            {/* Next */}
            <motion.button
              whileHover={{ x: 5 }}
              transition={{ type: 'spring', stiffness: 400 }}
              onClick={() => { const n = parseInt(id) + 1; if (n <= projectsData.projects.length) navigate(`/project/${n}`) }}
              disabled={parseInt(id) === projectsData.projects.length}
              className="group flex items-center justify-end gap-3 sm:gap-4 px-4 sm:px-5 md:px-6 py-3 sm:py-4 md:py-5 rounded-xl sm:rounded-2xl w-full sm:w-auto transition-all duration-300 disabled:opacity-30"
              style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.15)' }}
            >
              <div className="text-right">
                <p className="text-[8px] sm:text-[10px] uppercase tracking-wider opacity-50 text-white mb-0.5"
                  style={{ fontFamily: "'DM Mono', monospace" }}>Next</p>
                <p className="clash-font text-xs sm:text-sm md:text-base font-bold text-white truncate max-w-[120px] sm:max-w-[160px] md:max-w-[180px]">
                  {parseInt(id) < projectsData.projects.length ? projectsData.projects[parseInt(id)]?.name : '—'}
                </p>
              </div>
              <ArrowUpRight size={14} className="sm:w-[16px] sm:h-[16px] md:w-[18px] md:h-[18px] text-white opacity-70 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all flex-shrink-0" />
            </motion.button>
          </div>

          {/* Mobile counter */}
          <div className="flex sm:hidden justify-center mt-4">
            <span
              className="clash-font text-xs font-bold text-white px-4 py-1.5 rounded-full"
              style={{ background: 'rgba(255,255,255,0.1)' }}
            >
              {id} / {projectsData.projects.length}
            </span>
          </div>
        </motion.div>
      </div>

    </div>
  )
}

export default ProjectDetailPage