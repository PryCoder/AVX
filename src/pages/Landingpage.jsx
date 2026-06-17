import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, useInView, useMotionValue, useSpring } from 'framer-motion';
import { ArrowRight, CheckCircle, XCircle, BarChart3, Bot, Layout, ArrowUpRight, MessageCircle, Sparkles, Zap, TrendingUp, Users, Clock, ChevronRight, LayoutIcon, BotIcon, BarChart3Icon, CheckCircle2, TrendingDown, MapPinOff, Settings2, Gauge } from 'lucide-react';
import { Button } from "../components/ui/button";

import Loader from "../components/loader";
import projectsData from '../data/projects.json';


// Launch UI inspired components
import { Badge } from "../components/ui/badge";
import Glow from "../components/ui/glow";
import { CanvasText } from '../components/ui/canvas-text';
import { StickyBanner } from '../components/ui/sticky-banner';
import { WavyBackground } from '../components/ui/wavy-background';
import { ShimmerButton } from '../components/ui/shimmer-button';
import { InteractiveHoverButton } from '../components/ui/interactive-hover-button';
import { AnimatedGradientText } from '../components/ui/animated-gradient-text';
import { cn } from '../lib/utils';
import { TextAnimate } from '../components/ui/text-animate';
import { TextGenerateEffect } from '../components/ui/text-generate-effect';
import { VideoText } from '../components/ui/video-text';
import { AuroraText } from '../components/ui/aurora-text';
import TextGenerateEffectDemo from '../components/text-generate-effect-demo';
import { Vortex } from '../components/ui/vortex';
import { Meteors } from '../components/ui/meteors';


import { AnimatedGridPattern } from "../components/ui/animated-grid-pattern";
import { MagicCard } from "../components/ui/magic-card";
import { RetroGrid } from '../components/ui/retro-grid';
import { MagneticButton } from '../components/ui/magnetic-button';
import CTASection from './cta';
import CallToAction from './cta';





// Animation variants
const premiumEase = [0.22, 1, 0.36, 1];

const fadeInUp = {
  initial: { opacity: 0, y: 40 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, ease: premiumEase }
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.15
    }
  }
};

const scaleIn = {
  initial: { opacity: 0, scale: 0.95 },
  animate: { opacity: 1, scale: 1 },
  transition: { duration: 0.7, ease: premiumEase }
};

const SectionWrapper = ({ children, className = "" }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.15 });
  
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.8, ease: premiumEase }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

const LandingPageWrapper = () => {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const mouseX = useMotionValue(-500);
  const mouseY = useMotionValue(-500);
  
  const cursorX = useSpring(mouseX, { damping: 40, stiffness: 200, mass: 0.5 });
  const cursorY = useSpring(mouseY, { damping: 40, stiffness: 200, mass: 0.5 });

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e) => {
      mouseX.set(e.clientX - 192);
      mouseY.set(e.clientY - 192);
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  const featuredProjects = projectsData.projects.slice(0, 2);

  return (
    <>
      {loading && <Loader />}
  
      <motion.div 
        className="fixed w-96 h-96 bg-stone-900/5 rounded-full blur-3xl pointer-events-none z-[1] hidden md:block"
        style={{
          x: cursorX,
          y: cursorY,
        }}
      />

      <div className="min-h-screen bg-stone-50 sfpro-font text-stone-900 overflow-hidden relative">
        
        {/* Animated Background Grid */}
        <div className="absolute top-0 left-0 w-full h-[150vh] z-0 opacity-20 pointer-events-none">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
          <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-stone-50 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-stone-50 to-transparent" />
        </div>

        {/* Sticky CTA */}
        <motion.a 
          href="/contact" 
          onClick={(e) => { e.preventDefault(); navigate('/contact'); }}
          className="fixed bottom-6 right-6 z-50 bg-stone-900 text-white p-4 rounded-full shadow-2xl hover:bg-stone-800 transition-colors duration-300"
          aria-label="Book a Call"
          initial={{ scale: 0, rotate: -90 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: "spring", damping: 15, stiffness: 200, delay: 2.5 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          <motion.div
            animate={{ scale: [1, 1.15, 1] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
          >
            <MessageCircle className="w-6 h-6" />
          </motion.div>
        </motion.a>
<section className="py-24 lg:py-32 bg-white px-6 lg:px-8 border-t border-stone-100 relative z-10">

  {/* Wavy Background - Full section */}
  <div className="absolute inset-0 -z-10 w-full h-full">
    <WavyBackground 
      waveWidth={50}
      blur={10}
      speed="slow"
      waveOpacity={0.5}
colors={[
  "#22d3ee",
  "#38bdf8",
  "#60a5fa",
  "#818cf8",
  "#a78bfa",
  "#c084fc",
  "#dd00ff",
  "#ff0084",
  "#fb7185",
]}
      containerClassName="w-full h-full"
      backgroundFill="#fafaf9"
    />
  </div>

  <motion.div 
    className="flex flex-col gap-12 lg:gap-16"
    variants={staggerContainer}
    initial="initial"
    animate="animate"
  >
    {/* Text Content - Centered */}
    <motion.div className="max-w-4xl mx-auto text-center space-y-6 sm:space-y-8" variants={fadeInUp}>
      
     {/* Launch UI Style Badge */}
<motion.div variants={fadeInUp} className="flex justify-center">
  <div className="group relative mx-auto flex items-center justify-center rounded-full px-4 py-1.5 shadow-[inset_0_-8px_10px_#8fdfff1f] transition-shadow duration-500 ease-out hover:shadow-[inset_0_-5px_10px_#8fdfff3f]">
    <span
      className={cn(
        'animate-gradient absolute inset-0 block h-full w-full rounded-[inherit] bg-gradient-to-r from-[#ffaa40]/50 via-[#9c40ff]/50 to-[#ffaa40]/50 bg-[length:300%_100%] p-[1px]'
      )}
      style={{
        WebkitMask:
          'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
        WebkitMaskComposite: 'destination-out',
        mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
        maskComposite: 'subtract',
        WebkitClipPath: 'padding-box',
      }}
    />
    🎉 
    <hr className="mx-2 h-4 w-px shrink-0 bg-neutral-500" />
    <span className="text-sm font-medium bg-gradient-to-r from-[#ffaa40] via-[#9c40ff] to-[#ffaa40] bg-[length:300%_100%] animate-gradient bg-clip-text text-transparent">
      Introducing Avxonia
    </span>
    <ChevronRight className="ml-1 size-4 stroke-neutral-500 transition-transform duration-300 ease-in-out group-hover:translate-x-0.5" />
  </div>
</motion.div>
      <motion.h1 
        className="font-bold tracking-tight leading-[1.2] sm:leading-[1.1] clash-font"
        variants={fadeInUp}
      >
        <div className="flex flex-col items-center gap-2 sm:gap-3 lg:gap-4">
     <p
  className="
    pointer-events-none
    bg-gradient-to-b
    from-stone-950
    via-stone-800
    to-stone-500
    bg-clip-text
    text-transparent
    text-center
    text-4xl
    sm:text-5xl
    lg:text-7xl
    font-semibold
    leading-[0.95]
    tracking-tight
    whitespace-pre-wrap
  "
>
  Digital Systems Built to
</p>
         <div className="inline-block w-full overflow-hidden">
  <CanvasText
    text="Scale Your Business"
    backgroundClassName="bg-blue-600 dark:bg-blue-700"
    colors={[
      "rgba(0, 153, 255, 1)",
      "rgba(0, 153, 255, 0.9)",
      "rgba(0, 153, 255, 0.8)",
      "rgba(0, 153, 255, 0.7)",
      "rgba(0, 153, 255, 0.6)",
      "rgba(0, 153, 255, 0.5)",
      "rgba(0, 153, 255, 0.4)",
      "rgba(0, 153, 255, 0.3)",
      "rgba(0, 153, 255, 0.2)",
      "rgba(0, 153, 255, 0.1)",
    ]}
    lineGap={3}
    animationDuration={20}
    className="
      text-center
      text-3xl
      sm:text-5xl
      lg:text-6xl
      xl:text-7xl
      font-black
      leading-none
      tracking-tight
      whitespace-nowrap
    "
  />
</div>
        </div>
      
      </motion.h1>

      <motion.p 
        className="text-sm sm:text-base lg:text-lg text-stone-600 max-w-2xl mx-auto leading-relaxed"
        variants={fadeInUp}
      >
        We design websites and AI automation systems that increase conversions, 
        streamline operations, and drive real growth.
      </motion.p>
      
   <motion.div
  className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center"
  variants={fadeInUp}
>
  {/* Primary Button */}
  <Link to="/contact" className="inline-block">
    <MagneticButton
      strength={35}
      onPointerDown={(e) => {
        if (e.button != null && e.button !== 0) return;
        if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
        e.preventDefault();
        navigate('/contact');
      }}
    >
      <div
        className="
          group
          relative
          cursor-pointer
          overflow-hidden
          rounded-full
          px-7
          py-4
          backdrop-blur-xl
          bg-black/40
          border
          border-white/15
          shadow-[0_8px_32px_rgba(0,0,0,0.45)]
          transition-all
          duration-500
          hover:bg-black/50
        "
      >
        {/* Glass Overlay */}
        <div
          className="
            absolute
            inset-0
            bg-gradient-to-b
            from-white/15
            via-white/5
            to-transparent
          "
        />

        {/* Top Shine */}
        <div
          className="
            absolute
            inset-x-0
            top-0
            h-[1px]
            bg-white/30
          "
        />

        {/* Content */}
        <span
          className="
            relative
            z-10
            flex
            items-center
            justify-center
            gap-2
            text-sm
            font-semibold
            tracking-wide
            text-white
          "
        >
          Book a Strategic Call

          <ArrowRight
            className="
              h-4
              w-4
              transition-transform
              duration-300
              group-hover:translate-x-1
            "
          />
        </span>
      </div>
    </MagneticButton>
  </Link>

  {/* Secondary Button */}
  <Link to="/contact" className="inline-block">
    <MagneticButton
      strength={25}
      onPointerDown={(e) => {
        if (e.button != null && e.button !== 0) return;
        if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
        e.preventDefault();
        navigate('/contact');
      }}
    >
      <div
        className="
          cursor-pointer
          rounded-full
          bg-gradient-to-b
          from-blue-500
          to-blue-700
          px-6
          py-3
          font-medium
          text-white
          ring-1
          ring-white/20
        "
      >
        Get Free Website Audit
      </div>
    </MagneticButton>
  </Link>
</motion.div>
      <motion.div 
        className="text-xs sm:text-sm text-stone-500 font-medium flex items-center justify-center gap-3 sm:gap-4 pt-2"
        variants={fadeInUp}
      >
        <div className="flex items-center gap-2">
          <div className="flex -space-x-2">
            {[1, 2, 3].map((i) => (
              <div key={i} className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-stone-200 border-2 border-white" />
            ))}
          </div>
          <span>Trusted by 50+ growing businesses</span>
        </div>
      </motion.div>
    </motion.div>

    {/* Launch UI Style Mockup Container with Glow Effects - Below text */}
    <motion.div
      className="relative w-full max-w-6xl mx-auto"
      variants={scaleIn}
    >
      <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden bg-white/80 backdrop-blur-xl border border-stone-200 shadow-xl p-3 sm:p-6 lg:p-8">
        
        {/* Glow effect from Launch UI */}
        <div className="absolute -top-20 -left-20 w-40 h-40 bg-stone-400/20 rounded-full blur-3xl" />
        <div className="absolute -bottom-20 -right-20 w-40 h-40 bg-stone-400/20 rounded-full blur-3xl" />
        
        {/* Premium top running line */}
        <div className="absolute top-0 left-0 w-full h-[2px] overflow-hidden">
          <motion.div
            className="h-full w-[40%] bg-gradient-to-r from-transparent via-stone-900 to-transparent"
            animate={{ x: ["-100%", "250%"] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "linear" }}
          />
        </div>

        {/* Subtle border glow sweep */}
        <motion.div
          className="pointer-events-none absolute inset-0 rounded-2xl sm:rounded-3xl"
          style={{
            background: "linear-gradient(120deg, transparent, rgba(0,0,0,0.03), transparent)",
          }}
          animate={{ x: ["-100%", "100%"] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        />

        <div className="flex flex-col gap-3 sm:gap-4 relative z-10">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 sm:gap-3">
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="w-7 h-7 sm:w-9 sm:h-9 bg-stone-900 rounded-lg sm:rounded-xl flex items-center justify-center">
                <div className="w-3 h-3 sm:w-4 sm:h-4 bg-white rounded-sm" />
              </div>
              <div>
                <div className="text-xs sm:text-sm font-semibold text-stone-800">Analytics Dashboard</div>
                <div className="text-[10px] sm:text-xs text-stone-500">Real-time overview</div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="hidden sm:block text-xs text-green-600">● Live</span>
              <div className="flex gap-1">
                {["bg-red-400", "bg-yellow-400", "bg-green-400"].map((c, i) => (
                  <div key={i} className={`w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full ${c}`} />
                ))}
              </div>
            </div>
          </div>

          {/* Main Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4">
            {/* Chart */}
            <div className="md:col-span-2 bg-white rounded-xl sm:rounded-2xl border p-3 sm:p-4 shadow-sm relative overflow-hidden">
              <motion.div
                className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-stone-400 to-transparent"
                animate={{ x: ["-100%", "100%"] }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              />
              <div className="flex justify-between items-center mb-2 sm:mb-3">
                <div>
                  <div className="text-xs sm:text-sm font-medium text-stone-800">Revenue Growth</div>
                  <div className="text-[10px] sm:text-xs text-stone-400">Monthly performance</div>
                </div>
                <div className="flex gap-1">
                  {["Day", "Week", "Month"].map((t, i) => (
                    <span key={i} className={`text-[10px] sm:text-xs px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-md ${
                      i === 2 ? "bg-stone-900 text-white" : "bg-stone-100 text-stone-600"
                    }`}>
                      {t}
                    </span>
                  ))}
                </div>
              </div>
              <div className="h-20 sm:h-28 md:h-32 w-full">
                <svg className="w-full h-full" viewBox="0 0 200 60" preserveAspectRatio="none">
                  <motion.path
                    d="M0,40 L20,30 L40,45 L60,20 L80,35 L100,25 L120,40 L140,30 L160,35 L180,20 L200,30"
                    stroke="#111"
                    strokeWidth="2"
                    fill="none"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 1.5 }}
                  />
                </svg>
              </div>
            </div>

            {/* Sidebar Stats */}
            <div className="flex flex-col gap-3 sm:gap-4">
              <div className="bg-stone-900 text-white rounded-xl sm:rounded-2xl p-3 sm:p-4">
                <div className="text-[10px] sm:text-xs text-stone-400">Total Revenue</div>
                <div className="text-lg sm:text-2xl font-bold">$42.5K</div>
                <div className="text-[10px] sm:text-xs text-green-400">↑ +12.5% from last month</div>
              </div>
              <div className="bg-white border rounded-xl sm:rounded-2xl p-3 sm:p-4">
                <div className="text-xs sm:text-sm font-semibold text-stone-800">Active Users</div>
                <div className="text-base sm:text-xl font-bold">2,847</div>
                <div className="mt-2 h-1 bg-stone-100 rounded-full overflow-hidden">
                  <motion.div
                    className="h-1 bg-stone-900"
                    initial={{ width: 0 }}
                    animate={{ width: "75%" }}
                    transition={{ duration: 1.2 }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3">
            {[
              { label: "Page Views", value: "12.4K", change: "+8%" },
              { label: "Bounce Rate", value: "34%", change: "-5%" },
              { label: "Session Duration", value: "4m 32s", change: "+12%" },
              { label: "Conversions", value: "3.2%", change: "+2.1%" }
            ].map((stat, i) => (
              <div key={i} className="bg-white border rounded-lg sm:rounded-xl p-2 sm:p-3">
                <div className="text-[10px] sm:text-xs text-stone-400">{stat.label}</div>
                <div className="text-xs sm:text-sm font-semibold text-stone-800">{stat.value}</div>
                <div className="text-[10px] sm:text-xs text-green-600">{stat.change}</div>
              </div>
            ))}
          </div>

          {/* Footer */}
          <div className="flex flex-col sm:flex-row justify-between items-center gap-2 text-[10px] sm:text-xs text-stone-500 border-t pt-2 sm:pt-3">
            <span>Updated just now</span>
            <div className="flex gap-1 sm:gap-2 flex-wrap justify-center">
              {["+12 new signups", "+3 purchases", "+45 downloads"].map((a, i) => (
                <span key={i} className="bg-stone-100 px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full whitespace-nowrap">
                  {a}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
      
      {/* Launch UI Glow Effect */}
      <Glow variant="top" className="absolute -top-10 left-1/2 -translate-x-1/2 w-3/4 h-20 opacity-50" />
    </motion.div>
  </motion.div>
</section>{/* SECTION 2: PROBLEM */}
<SectionWrapper>
  <section className="relative overflow-hidden py-24 lg:py-32 px-6 lg:px-8 border-t border-stone-200 bg-white">
    
    {/* Premium Background */}
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(0,0,0,0.03),transparent_40%)] pointer-events-none" />
    
    <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#000_1px,transparent_1px),linear-gradient(to_bottom,#000_1px,transparent_1px)] bg-[size:60px_60px]" />
    </div>

    <div className="relative z-10 max-w-6xl mx-auto text-center">

      {/* Heading */}
     <motion.div
  initial={{ opacity: 0, y: 40 }}
  whileInView={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.9, ease: premiumEase }}
  viewport={{ once: true }}
  className="space-y-8"
>

<div className="space-y-6">

  {/* Badge */}
  <div className="inline-flex items-center rounded-full border border-red-200 bg-red-50 px-4 py-1.5 text-sm font-medium text-red-700 shadow-sm">
    Why Most Businesses Struggle Online
  </div>

  {/* Heading */}
  <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.15] tracking-normal clash-font text-stone-950">
    <span className="block mb-3">
      Most Websites Don't Fail
    </span>

    <span className="block">
      Because of Design —
    </span>
  </h2>

</div>
  {/* Video Text Section */}
  <div className="relative w-full max-w-5xl mx-auto overflow-hidden rounded-[2rem]">

    {/* Glow */}
    <div className="absolute inset-0 bg-gradient-to-b from-red-500/10 via-transparent to-transparent z-10 pointer-events-none" />

    {/* Border */}
    <div className="absolute inset-0 rounded-[2rem] border border-red-200/60 z-20 pointer-events-none" />

    {/* Video */}
   <div className="relative h-[160px] sm:h-[220px] lg:h-[280px] w-full overflow-hidden rounded-[2rem] bg-black border border-red-500/10 shadow-2xl">

  {/* GIF Background */}
  <img
    src="https://imgs.search.brave.com/2sIw6SZzfvenj2KXTe5blFrYLNc8P7AjwM2EesluZxY/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS50ZW5vci5jb20v/TURGUUJFb0hsRndB/QUFBbS9iZW5qYW1t/aW5zLWNvbW1lbnQt/cmF0aW8ud2VicA"
    alt="Failure GIF"
    className="absolute inset-0 h-full w-full object-cover opacity-60"
  />

  {/* Dark overlay */}
  <div className="absolute inset-0 bg-black/55 z-10" />

  {/* Glow overlay */}
  <div className="absolute inset-0 bg-gradient-to-br from-red-500/20 via-transparent to-orange-500/10 z-10" />

  {/* Main Text */}
  <div className="relative z-20 flex h-full items-center justify-center">
    <h2 className="text-5xl sm:text-7xl lg:text-8xl font-black uppercase tracking-[-0.08em] text-red-500 clash-font drop-shadow-[0_0_30px_rgba(239,68,68,0.45)]">
      FAILED
    </h2>
  </div>

  {/* Bottom fade */}
  <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black to-transparent z-10" />

</div>

    {/* Overlay gradient */}
    <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-black/10 z-10 pointer-events-none" />

  </div>

  {/* Subheading */}
  <h3 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight tracking-tight clash-font text-stone-950">
  They Fail Because{" "}
  
  <AuroraText
  colors={[
    "#7f1d1d", // red-900
    "#991b1b", // red-800
  
    "#f87171", // red-400
    "#fca5a5", // red-300
  ]}
  className="bg-clip-text text-transparent"
>
  They Don't Convert
</AuroraText>
</h3>

  {/* Description */}
  <p className="max-w-2xl mx-auto text-lg lg:text-xl text-stone-600 leading-relaxed">
    A beautiful website means nothing if visitors leave without taking action.
  </p>

</motion.div>
      {/* Problem Cards */}
     {/* Problem Cards with Red BentoGrid styling */}
<motion.div
  className="grid sm:grid-cols-2 gap-5 lg:gap-7 text-left max-w-5xl mx-auto mt-16 lg:mt-20"
  variants={staggerContainer}
  initial="initial"
  whileInView="animate"
  viewport={{ once: true }}
>
  {[
    {
      title: "Low Conversion",
      desc: "Visitors come, but don't take action",
      icon: <TrendingDown className="size-6" />
    },
    {
      title: "Poor User Journey",
      desc: "No clear structure or customer flow",
      icon: <MapPinOff className="size-6" />
    },
    {
      title: "No Systems",
      desc: "Operations depend on manual work",
      icon: <Settings2 className="size-6" />
    },
    {
      title: "Growth Bottlenecks",
      desc: "Manual processes limit scalability",
      icon: <Gauge className="size-6" />
    },
  ].map((item, i) => (
    <motion.div
      key={i}
      variants={fadeInUp}
      whileHover={{
        y: -6,
        scale: 1.015,
      }}
      transition={{ duration: 0.25 }}
      className="group border-red-500/10 bg-background hover:border-red-500/30 relative flex h-full cursor-pointer flex-col justify-between overflow-hidden rounded-xl border px-6 pt-6 pb-10 shadow-md transition-all duration-500"
    >
      {/* Grid Pattern Background - Red tint */}
      <div className="absolute top-0 -right-1/2 z-0 size-full cursor-pointer bg-[linear-gradient(to_right,#ff00001e_1px,transparent_1px),linear-gradient(to_bottom,#ff00001e_1px,transparent_1px)] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] bg-[size:24px_24px]" />

      {/* Large Background Icon - Red */}
      <div className="text-red-500/5 group-hover:text-red-500/10 absolute right-1 bottom-3 scale-[6] transition-all duration-700 group-hover:scale-[6.2]">
        {item.icon}
      </div>

      {/* Content */}
      <div className="relative z-10 flex h-full flex-col justify-between">
        <div>
          {/* Icon Circle - Red */}
          <div className="bg-red-500/10 text-red-500 shadow-red-500/10 group-hover:bg-red-500/20 group-hover:shadow-red-500/20 mb-4 flex h-12 w-12 items-center justify-center rounded-full shadow transition-all duration-500">
            {item.icon}
          </div>

          {/* Title */}
          <h4 className="mb-2 text-xl font-semibold tracking-tight text-foreground">
            {item.title}
          </h4>

          {/* Description */}
          <p className="text-muted-foreground text-sm">
            {item.desc}
          </p>
        </div>
      </div>

      {/* Bottom Gradient Bar - Red */}
      <div className="from-red-500 to-red-500/30 absolute bottom-0 left-0 h-1 w-full bg-gradient-to-r blur-2xl transition-all duration-500 group-hover:blur-lg" />
    </motion.div>
  ))}
</motion.div>

      {/* Bottom Statement */}
      <motion.div
        className="pt-16 lg:pt-24"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.3 }}
        viewport={{ once: true }}
      >
    <div className="flex flex-col items-center gap-6">

  <div className="h-px w-32 bg-gradient-to-r from-transparent via-stone-400 to-transparent" />

  <div className="max-w-4xl">
    <TextGenerateEffect
      words="That's where we come in."
      className="text-3xl lg:text-5xl font-bold text-stone-950 clash-font tracking-tight text-center"
    />
  </div>

  <TextAnimate
    animation="blurInUp"
    by="word"
    once
    className="text-stone-500 text-lg lg:text-xl max-w-2xl leading-relaxed text-center"
  >
    We build systems, experiences, and automation designed to grow businesses — not just look good.
  </TextAnimate>

</div>
      </motion.div>

    </div>
  </section>
  
</SectionWrapper>
{/* SECTION 3: SOLUTION - EXTRA DARK VERSION */}

<SectionWrapper>
  <section className="relative overflow-hidden bg-black py-24 lg:py-32 px-4 sm:px-6 lg:px-8">
    
    {/* CHANGE 1: RetroGrid - Reduced opacity to 0.5, darker line colors */}
    <div className="absolute inset-0 z-0">
      <RetroGrid 
        angle={35}
        cellSize={50}
        opacity={0.7}
        lightLineColor="#d1e2fd"
        darkLineColor="#8e98b3"
      />
    </div>
    
    {/* CHANGE 2: Darker overlay - increased opacity to darken everything */}
    <div className="absolute inset-0 bg-gradient-to-b from-black/95 via-black/85 to-black/95 pointer-events-none z-[1]" />
    
    {/* CHANGE 3: Reduced ambient glows - much dimmer */}
    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-blue-500/3 rounded-full blur-[120px] z-[1]" />
    <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-indigo-500/2 rounded-full blur-[100px] z-[1]" />
    <div className="absolute top-1/3 left-0 w-[400px] h-[400px] bg-purple-500/1 rounded-full blur-[80px] z-[1]" />

    {/* CHANGE 4: Fewer particles, lower opacity */}
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-[1]">
      {[...Array(15)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-px h-px bg-white/5 rounded-full"
          initial={{
            x: `${Math.random() * 100}%`,
            y: `${Math.random() * 100}%`,
            opacity: 0,
          }}
          animate={{
            y: ["0%", "-100%"],
            opacity: [0, 0.15, 0],
          }}
          transition={{
            duration: Math.random() * 10 + 8,
            repeat: Infinity,
            ease: "linear",
            delay: Math.random() * 5,
          }}
        />
      ))}
    </div>

    <div className="relative z-10 max-w-7xl mx-auto">
      
      {/* Header Section */}
      <div className="text-center max-w-4xl mx-auto mb-20 lg:mb-28">
        
        {/* CHANGE 5: Darker badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2 rounded-full border border-white/5 bg-white/3 backdrop-blur-sm px-4 py-1.5 mb-6"
        >
          <span className="relative flex h-1.5 w-1.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-500/40 opacity-50"></span>
            <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-blue-500/60"></span>
          </span>
          <span className="text-xs font-medium tracking-wider text-stone-600 uppercase">Our Growth System</span>
        </motion.div>

        {/* CHANGE 6: Slightly dimmer text */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="space-y-6"
        >
          <h1 className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-bold tracking-tight">
            <span className="text-white/85">We Build</span>
            <br />
            <span className="bg-gradient-to-r from-blue-400/80 via-indigo-400/80 to-purple-400/80 bg-clip-text text-transparent">
              Structured Digital
            </span>
            <br />
            <span className="text-white/85">Systems That Drive Growth</span>
          </h1>
          
          <p className="text-stone-500 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            Not just websites. Not just automation. We build complete growth systems engineered for scale.
          </p>
        </motion.div>
      </div>

      {/* Three Pillars Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 mb-24 lg:mb-32">
        
        {[
          {
            icon: <Layout className="w-6 h-6" strokeWidth={1.5} />,
            title: "Web Development",
            description: "Conversion-focused architecture designed to turn visitors into qualified leads.",
            color: "blue",
            gradient: "from-blue-500/8 to-blue-600/4",
            iconColor: "text-blue-400/70",
            borderColor: "border-blue-500/15",
            bgHover: "hover:bg-blue-500/5",
            features: ["Performance Optimized", "SEO Ready", "Responsive Design"]
          },
          {
            icon: <Bot className="w-6 h-6" strokeWidth={1.5} />,
            title: "AI Automation",
            description: "Automate repetitive operations so your business scales without chaos.",
            color: "indigo",
            gradient: "from-indigo-500/8 to-indigo-600/4",
            iconColor: "text-indigo-400/70",
            borderColor: "border-indigo-500/15",
            bgHover: "hover:bg-indigo-500/5",
            features: ["Workflow Automation", "Smart Integrations", "Real-time Analytics"]
          },
          {
            icon: <BarChart3 className="w-6 h-6" strokeWidth={1.5} />,
            title: "System Thinking",
            description: "Every part works together as one cohesive growth engine.",
            color: "purple",
            gradient: "from-purple-500/8 to-purple-600/4",
            iconColor: "text-purple-400/70",
            borderColor: "border-purple-500/15",
            bgHover: "hover:bg-purple-500/5",
            features: ["Holistic Approach", "Scalable Architecture", "Data-Driven"]
          }
        ].map((pillar, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: idx * 0.1 }}
            viewport={{ once: true }}
            whileHover={{ y: -4 }}
            className="group relative"
          >
            {/* CHANGE 7: Darker cards - less opacity in gradients */}
            <div className={`relative h-full rounded-2xl border ${pillar.borderColor} bg-gradient-to-br from-black/90 to-black/70 backdrop-blur-sm p-6 lg:p-8 transition-all duration-300 ${pillar.bgHover} hover:border-white/15`}>
              
              {/* Icon Container */}
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br from-black/90 to-black/70 border ${pillar.borderColor} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                <div className={pillar.iconColor}>
                  {pillar.icon}
                </div>
              </div>
              
              {/* CHANGE 8: Darker text on cards */}
              <h3 className="text-xl lg:text-2xl font-bold text-white/75 mb-3">
                {pillar.title}
              </h3>
              
              <p className="text-stone-500/80 leading-relaxed mb-4">
                {pillar.description}
              </p>
              
              {/* Feature List */}
              <div className="space-y-2 pt-4 border-t border-white/5">
                {pillar.features.map((feature, i) => (
                  <div key={i} className="flex items-center gap-2 text-sm text-stone-600/80">
                    <CheckCircle2 className="w-3 h-3 text-stone-700" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
              
              {/* Learn More Link */}
              <div className="absolute bottom-6 right-6 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-2 group-hover:translate-x-0">
                <ArrowRight className={`w-5 h-5 ${pillar.iconColor}`} />
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* CHANGE 9: Darker bottom statement */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        viewport={{ once: true }}
        className="text-center"
      >
        <div className="inline-block">
          <p className="text-2xl sm:text-3xl lg:text-4xl font-light text-stone-600 mb-2">
            Beautiful Design Means Nothing
          </p>
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-indigo-500/10 to-purple-500/10 blur-xl"></div>
            
             <span className="pointer-events-none z-10 bg-linear-to-b from-[#ffd319] via-[#ff2975] to-[#8c1eff] bg-clip-text text-center text-7xl leading-none font-bold tracking-tighter whitespace-pre-wrap text-transparent">
         Without Business Results
      </span>
          </div>
        </div>
      </motion.div>

    </div>
  </section>
</SectionWrapper>
<SectionWrapper>
  <section className="relative py-24 lg:py-32 px-6 lg:px-8 overflow-hidden bg-gradient-to-b from-white via-stone-50/50 to-white">
    
    {/* Subtle Animated Grid Pattern */}
    <AnimatedGridPattern
      numSquares={60}
      maxOpacity={0.25}
      duration={2}
      repeatDelay={0.5}
      className="absolute inset-0 w-full h-full z-0 [mask-image:radial-gradient(600px_circle_at_center,white,transparent)]"
    />
     <AnimatedGridPattern
      numSquares={30}
      maxOpacity={0.12}
      duration={4}
      repeatDelay={1.5}
      className="absolute inset-0 w-full h-full z-0 [mask-image:radial-gradient(800px_circle_at_center,white,transparent)]"
      style={{ animationDelay: '0.5s' }}
    />
 
    
    {/* Subtle Meteors - Very subtle */}
    <Meteors number={15} className="absolute inset-0 opacity-20" />

    <div className="relative z-10 max-w-7xl mx-auto">
      
      {/* Section Header */}
      <div className="text-center mb-20 lg:mb-28">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2 rounded-full bg-stone-100/50 backdrop-blur-sm px-4 py-1.5 mb-6 border border-stone-200/50"
        >
          <div className="relative flex h-1.5 w-1.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-stone-500 opacity-60"></span>
            <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-stone-600"></span>
          </div>
          <span className="text-xs font-medium text-stone-500 tracking-wider uppercase">How We Work</span>
        </motion.div>
        
       <TextAnimate 
  animation="fadeIn" 
  by="word"
  className="text-4xl lg:text-5xl xl:text-6xl font-bold tracking-tight"
  as="h2"
>
  <p
    className="
      pointer-events-none
      bg-gradient-to-b
      from-stone-600
      via-stone-700
      to-stone-800
      bg-clip-text
      text-transparent
      text-center
      text-4xl
      sm:text-5xl
      lg:text-7xl
      font-semibold
      leading-[0.95]
      tracking-tight
      whitespace-pre-wrap
    "
  >
    Our Proven Framework
  </p>
</TextAnimate>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="text-stone-500 mt-4 max-w-2xl mx-auto text-base lg:text-lg"
        >
          A systematic approach to transform your digital presence
        </motion.p>
      </div>
      
      {/* Process Steps Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
        
        {[
          { 
            step: "01", 
            title: "Audit", 
            description: "Analyze your current system & bottlenecks to identify growth opportunities.",
            accent: "amber",
            icon: (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            )
          },
          { 
            step: "02", 
            title: "Strategy", 
            description: "Define precisely what needs to be built with data-driven decision making.",
            accent: "blue",
            icon: (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            )
          },
          { 
            step: "03", 
            title: "Build", 
            description: "Clean, scalable, and systematic execution with modern tech stack.",
            accent: "purple",
            icon: (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            )
          },
          { 
            step: "04", 
            title: "Scale", 
            description: "Optimize, automate, and improve conversions for exponential growth.",
            accent: "emerald",
            icon: (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
              </svg>
            )
          }
        ].map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: i * 0.1 }}
            viewport={{ once: true }}
          >
            <MagicCard
              gradientColor="#D9D9D955"
              className="relative h-full p-6 lg:p-8 border border-stone-200/50 shadow-sm hover:shadow-md transition-all duration-300"
            >
              {/* Subtle accent line */}
              <div className={`absolute top-0 left-0 w-1 h-12 bg-${item.accent}-500 rounded-br-lg`} />
              
              {/* Step Number */}
              <div className="mb-6">
                <div className="text-4xl lg:text-5xl font-bold text-stone-200/80">
                  {item.step}
                </div>
              </div>
              
              {/* Icon */}
              <div className={`mb-4 text-${item.accent}-600`}>
                {item.icon}
              </div>
              
              {/* Title */}
              <h3 className={`text-xl lg:text-2xl font-bold mb-3 text-stone-800`}>
                {item.title}
              </h3>
              
              {/* Description */}
              <p className="text-stone-500 leading-relaxed text-sm">
                {item.description}
              </p>
              
              {/* Subtle hover indicator */}
              <div className="absolute bottom-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <svg className="w-5 h-5 text-stone-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </div>
            </MagicCard>
          </motion.div>
        ))}
      </div>
      
      {/* Bottom CTA - Subtle */}
      <motion.div 
        className="text-center mt-16 lg:mt-20"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.6 }}
        viewport={{ once: true }}
      >
        <div className="inline-flex items-center gap-4">
          <div className="h-px w-12 bg-stone-200" />
          <p className="text-stone-500 text-sm">Ready to transform your business?</p>
          <div className="h-px w-12 bg-stone-200" />
        </div>
        
       <button className="mt-6 group inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-stone-900 hover:bg-stone-800 transition-all duration-300 shadow-sm hover:shadow-md">
  <span className="text-sm font-medium text-white">Get Started</span>

  <svg
    className="w-4 h-4 text-white group-hover:translate-x-1 transition-transform duration-300"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M13 7l5 5m0 0l-5 5m5-5H6"
    />
  </svg>
</button>
      </motion.div>
      
    </div>
  </section>
</SectionWrapper>
    <SectionWrapper>
  <section className="py-24 lg:py-32 bg-[#F9F8F6] px-6 lg:px-8 relative overflow-hidden">
    {/* Animated Grid Pattern - Magic UI Component */}
  <AnimatedGridPattern
      numSquares={60}
      maxOpacity={0.25}
      duration={2}
      repeatDelay={0.5}
      className="absolute inset-0 w-full h-full z-0 [mask-image:radial-gradient(600px_circle_at_center,white,transparent)]"
    />
     <AnimatedGridPattern
      numSquares={30}
      maxOpacity={0.12}
      duration={4}
      repeatDelay={1.5}
      className="absolute inset-0 w-full h-full z-0 [mask-image:radial-gradient(800px_circle_at_center,white,transparent)]"
      style={{ animationDelay: '0.5s' }}
    />

    {/* Vermeer-inspired light - Single source illumination */}
    <div className="absolute inset-0 pointer-events-none z-0">
      <div className="absolute top-0 left-1/3 w-[60rem] h-[60rem] bg-amber-900/5 rounded-full blur-[120px]" />
      <div className="absolute bottom-0 right-0 w-[40rem] h-[40rem] bg-stone-800/3 rounded-full blur-[100px]" />
    </div>

    {/* Danish modern grid - Subtle architectural framework (kept as fallback) */}
    <div className="absolute inset-0 pointer-events-none opacity-[0.015] z-0">
      <div className="absolute top-0 left-0 w-full h-full" style={{
        backgroundImage: `repeating-linear-gradient(90deg, transparent, transparent 80px, #000 80px, #000 81px)`,
        backgroundSize: '81px 100%'
      }} />
      <div className="absolute top-0 left-0 w-full h-full" style={{
        backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 80px, #000 80px, #000 81px)`,
        backgroundSize: '100% 81px'
      }} />
    </div>

    {/* Italian Renaissance color accent - Single terracotta note */}
    <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-terracotta-50/20 to-transparent pointer-events-none z-0" />

    <div className="max-w-7xl mx-auto relative z-10">
      {/* Header - Editorial layout with Dutch mastery spacing */}
      <div className="grid lg:grid-cols-12 gap-12 mb-24 lg:mb-32">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          viewport={{ once: true }}
          className="lg:col-span-7 space-y-5"
        >
          <div className="flex items-center gap-4">
            <div className="w-10 h-px bg-stone-400/60" />
            <span className="text-[11px] tracking-[0.35em] uppercase text-stone-500 font-normal">
              Curated Portfolio
            </span>
          </div>
          
          <h2 className="text-5xl sm:text-6xl lg:text-7xl font-light tracking-tight text-stone-950 leading-[1.08]">
            Systems
            <br />
            <span className="italic font-serif font-light text-stone-600 relative">
              in Action
              <div className="absolute -bottom-3 left-0 w-20 h-px bg-terracotta-500/50" />
            </span>
          </h2>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1.2, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          viewport={{ once: true }}
          className="lg:col-span-5 space-y-6"
        >
          <p className="text-stone-600 text-sm leading-loose font-light tracking-wide">
            A curated selection of interdisciplinary works exploring the intersection of 
            digital craftsmanship and human-centered design.
          </p>
          
          <Button 
            variant="ghost" 
            onClick={() => navigate('/projects')} 
            className="text-stone-400 hover:text-terracotta-700 group flex items-center gap-3 rounded-none px-0 text-xs font-normal tracking-wider border-b border-stone-300 hover:border-terracotta-500 transition-all duration-300 pb-1.5"
          >
            Explore Complete Archive
            <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" />
          </Button>
        </motion.div>
      </div>
      
      {/* Case Studies - Gallery wall with intentional spacing */}
      <div className="space-y-24 lg:space-y-32">
        {featuredProjects.map((cs, index) => (
          <motion.div 
            key={cs.id} 
            className="group relative"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: index * 0.12, ease: [0.22, 1, 0.36, 1] }}
            viewport={{ once: true, margin: "-120px" }}
          >
            {/* Scandinavian minimal accent line */}
            <div className="absolute -left-0 top-0 bottom-0 w-px bg-terracotta-500/0 group-hover:bg-terracotta-500/30 transition-all duration-700" />
            
            <div 
              className="relative cursor-pointer"
              onClick={() => navigate(`/project/${cs.id}`)}
            >
              {/* Gallery wall numbering - Swiss typography */}
              <div className="absolute -left-6 lg:-left-12 top-0 hidden lg:block">
                <div className="sticky top-32">
                  <span className="text-7xl font-light text-stone-300 group-hover:text-terracotta-600/20 transition-colors duration-700 tracking-tighter">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                </div>
              </div>

              <div className="lg:pl-12">
                {/* Mobile index */}
                <div className="lg:hidden mb-6 flex items-center gap-4">
                  <span className="text-3xl font-light text-stone-400 tracking-tighter">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <div className="flex-1 h-px bg-stone-200" />
                </div>

                <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
                  {/* Left column - Metadata with Italian Renaissance spacing */}
                  <div className="space-y-10">
                    <div className="space-y-4">
                      <div className="flex items-center gap-3">
                        <div className="w-5 h-px bg-terracotta-500/60" />
                        <span className="text-[10px] tracking-[0.25em] uppercase text-stone-500 font-normal">
                          {cs.category || "Case Study"}
                        </span>
                      </div>
                      <h3 className="text-3xl lg:text-4xl font-light tracking-tight text-stone-900 leading-tight">
                        {cs.client || cs.name}
                      </h3>
                      
                      {/* Dutch masters color dot */}
                      <div className="w-1 h-1 rounded-full bg-terracotta-500/40" />
                    </div>

                    <div className="space-y-8">
                      <div className="group/challenge">
                        <p className="text-[11px] tracking-[0.2em] uppercase text-stone-500 mb-3 font-normal">
                          Context
                        </p>
                        <p className="text-sm leading-relaxed text-stone-600 font-light">
                          {cs.challenge || "Legacy infrastructure creating operational friction and limiting growth potential."}
                        </p>
                      </div>
                      
                      <div className="group/approach">
                        <p className="text-[11px] tracking-[0.2em] uppercase text-stone-500 mb-3 font-normal">
                          Intervention
                        </p>
                        <p className="text-sm leading-relaxed text-stone-500 italic font-light border-l border-stone-200 pl-4">
                          {cs.solution || "Holistic platform reconstruction with integrated AI workflows and reimagined interaction patterns."}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Right column - Results with Bauhaus precision */}
                  <div className="space-y-10">
                    <div className="relative">
                      <div className="border border-stone-100 bg-[#FDFCFB] p-8">
                        <p className="text-[11px] tracking-[0.2em] uppercase text-stone-500 mb-6 font-normal">
                          Quantified Impact
                        </p>
                        
                        <div className="space-y-3">
                          <p className="text-5xl lg:text-6xl font-light tracking-tighter text-stone-900">
                            {cs.results?.[0] || "+42%"}
                          </p>
                          <p className="text-sm text-stone-500 font-light leading-relaxed">
                            improvement in conversion efficiency
                          </p>
                        </div>

                        {/* Danish modern progress bar */}
                        <div className="mt-8">
                          <div className="h-px bg-stone-100 w-full">
                            <div className="h-full w-0 bg-terracotta-500/40 group-hover:w-full transition-all duration-1000 ease-out" />
                          </div>
                          <div className="flex justify-between mt-2">
                            <span className="text-[9px] text-stone-400 font-light uppercase tracking-wider">Baseline</span>
                            <span className="text-[9px] text-stone-400 font-light uppercase tracking-wider">Current</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Testimonial with Venetian elegance */}
                    {cs.testimonial && (
                      <div className="pt-4">
                        <div className="relative">
                          <div className="absolute -top-2 -left-2 text-4xl text-terracotta-500/20 font-serif">"</div>
                          <p className="text-xs text-stone-500 italic font-light leading-relaxed pl-4">
                            {cs.testimonial}
                          </p>
                        </div>
                      </div>
                    )}

                    {/* Minimal CTA with Nordic restraint */}
                    <div className="pt-4 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-1 group-hover:translate-y-0">
                      <div className="flex items-center gap-3">
                        <span className="text-[10px] tracking-[0.2em] uppercase text-terracotta-600 font-normal">
                          Examine methodology
                        </span>
                        <ArrowRight className="w-3 h-3 text-terracotta-600" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Divider with Italian architectural precision */}
                {index < featuredProjects.length - 1 && (
                  <div className="mt-20 lg:mt-28">
                    <div className="flex justify-center">
                      <div className="w-12 h-px bg-stone-200" />
                    </div>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Closing statement - Danish poetic minimalism */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1.2, delay: 0.3 }}
        viewport={{ once: true }}
        className="mt-28 lg:mt-36 text-center space-y-8"
      >
        <div className="flex justify-center">
          <div className="w-12 h-px bg-stone-300" />
        </div>
        
        <div className="space-y-3 max-w-md mx-auto">
          <p className="text-stone-500 text-[11px] tracking-[0.25em] uppercase font-normal">
            Each project represents a dialogue between
          </p>
          <p className="text-stone-600 text-sm font-light italic">
            creative vision and technical precision
          </p>
        </div>
        
        {/* Scandinavian punctuation mark */}
        <div className="flex justify-center gap-2">
          <div className="w-1 h-1 rounded-full bg-terracotta-500/40" />
          <div className="w-1 h-1 rounded-full bg-terracotta-500/20" />
          <div className="w-1 h-1 rounded-full bg-terracotta-500/10" />
        </div>
      </motion.div>
    </div>
  </section>
</SectionWrapper>
       {/* SECTION 6 & 7: WHY CHOOSE US & WHO IT'S FOR - Contemporary European Expression */}
<SectionWrapper>
  <section className="py-28 lg:py-36 bg-stone-950 text-white px-6 lg:px-8 relative overflow-hidden">
    
    {/* Minimalist Light Architecture - Single Source */}
    <div className="absolute inset-0 pointer-events-none">
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[60rem] h-[60rem] bg-amber-900/6 rounded-full blur-[150px]" />
      <div className="absolute bottom-0 right-0 w-[40rem] h-[40rem] bg-terracotta-800/4 rounded-full blur-[120px]" />
      <div className="absolute top-0 left-0 w-px h-48 bg-gradient-to-b from-amber-400/15 via-transparent to-transparent rotate-12" />
    </div>

    {/* Subtle Grid - Architectural Framework */}
    <div className="absolute inset-0 pointer-events-none opacity-[0.008]">
      <div className="absolute inset-0" style={{
        backgroundImage: `repeating-linear-gradient(90deg, transparent, transparent 100px, #fff 100px, #fff 101px)`,
        backgroundSize: '101px 100%'
      }} />
      <div className="absolute inset-0" style={{
        backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 100px, #fff 100px, #fff 101px)`,
        backgroundSize: '100% 101px'
      }} />
    </div>

    {/* Color Strip - Single Accent */}
    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-px bg-terracotta-500/30" />

    <div className="max-w-7xl mx-auto relative z-10">
      
      {/* WHY CHOOSE US - Clean Editorial Section */}
      <div className="mb-32 lg:mb-40">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          viewport={{ once: true }}
          className="text-center mb-20 lg:mb-24"
        >
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="w-8 h-px bg-stone-700" />
            <span className="text-[9px] tracking-[0.35em] uppercase text-stone-500 font-light">
              Philosophy
            </span>
            <div className="w-8 h-px bg-stone-700" />
          </div>
          
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-light tracking-tight leading-[1.15]">
            Why Partner
            <br />
            <span className="relative inline-block mt-2">
              <span className="italic font-serif font-light text-stone-400">
                With Us?
              </span>
              <div className="absolute -bottom-2 left-0 w-16 h-px bg-terracotta-500/40" />
            </span>
          </h2>
          
          <p className="text-stone-500 text-sm font-light mt-6 max-w-md mx-auto">
            Principles over promises. Substance over spectacle.
          </p>
        </motion.div>
        
        {/* Four Pillars - Clean Grid */}
        <motion.div 
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-5"
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
        >
          {[
            { 
              number: '01',
              title: 'Strategic Thinking', 
              description: 'Every decision anchored in long-term vision'
            },
            { 
              number: '02',
              title: 'Conversion-Focused', 
              description: 'Architecture engineered for measurable growth'
            },
            { 
              number: '03',
              title: 'Clean & Scalable', 
              description: 'Systems built to evolve with your ambition'
            },
            { 
              number: '04',
              title: 'Long-Term Focus', 
              description: 'Partnerships that mature into legacy'
            }
          ].map((point, i) => (
            <motion.div 
              key={i} 
              className="group"
              variants={fadeInUp}
            >
              <div className="relative p-6 lg:p-7 border-t border-stone-800 hover:border-terracotta-500/30 transition-all duration-500">
                <div className="text-stone-600 text-[10px] tracking-wider font-mono mb-4">
                  {point.number}
                </div>
                <h3 className="font-light text-lg lg:text-xl tracking-tight mb-2 text-stone-200">
                  {point.title}
                </h3>
                <p className="text-stone-500 text-xs leading-relaxed">
                  {point.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* WHO IT'S FOR - Dual Columns */}
      <div className="grid md:grid-cols-2 gap-5 lg:gap-6">
        
        {/* LEFT: Who We Are For */}
        <motion.div 
          className="group"
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          viewport={{ once: true }}
        >
          <div className="relative p-6 lg:p-8 border-l-2 border-terracotta-500/40 bg-stone-900/30">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-6 h-px bg-terracotta-500/50" />
              <span className="text-[9px] tracking-[0.3em] uppercase text-terracotta-400 font-light">
                Alignment
              </span>
              <span className="text-stone-700 text-[9px] font-mono ml-auto">01</span>
            </div>
            
            <h3 className="text-2xl lg:text-3xl font-light tracking-tight mb-3">
              Who We Are
              <br />
              <span className="italic font-serif text-stone-400">For</span>
            </h3>
            
            <ul className="space-y-4 mt-8">
              {[
                "Businesses ready to scale & grow",
                "Founders who value actual systems",
                "Long-term thinkers and visionaries"
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-3 group/item">
                  <span className="text-terracotta-500/40 text-sm">→</span>
                  <span className="text-stone-300 font-light text-sm">{item}</span>
                </li>
              ))}
            </ul>
            
            <div className="mt-8 pt-5 border-t border-stone-800">
              <p className="text-stone-600 text-[8px] tracking-[0.2em] uppercase font-light">
                Strategic Partnership
              </p>
            </div>
          </div>
        </motion.div>
        
        {/* RIGHT: Who We Are Not For */}
        <motion.div 
          className="group"
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          viewport={{ once: true }}
        >
          <div className="relative p-6 lg:p-8 border-l border-stone-800 bg-stone-900/20">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-6 h-px bg-stone-700" />
              <span className="text-[9px] tracking-[0.3em] uppercase text-stone-500 font-light">
                Boundaries
              </span>
              <span className="text-stone-800 text-[9px] font-mono ml-auto">02</span>
            </div>
            
            <h3 className="text-2xl lg:text-3xl font-light tracking-tight mb-3">
              Who We Are
              <br />
              <span className="italic font-serif text-stone-600">Not For</span>
            </h3>
            
            <ul className="space-y-4 mt-8">
              {[
                '"Just need a quick cheap website" clients',
                "Highly price-sensitive buyers",
                "Short-term mindset without a strategy"
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-3 group/item">
                  <span className="text-stone-600 text-sm">∕</span>
                  <span className="text-stone-500 font-light text-sm">{item}</span>
                </li>
              ))}
            </ul>
            
            <div className="mt-8 pt-5 border-t border-stone-800/50">
              <p className="text-stone-700 text-[8px] tracking-[0.2em] uppercase font-light">
                Clear Expectations
              </p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Closing Statement - Minimal */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        viewport={{ once: true }}
        className="mt-24 lg:mt-32 text-center space-y-5"
      >
        <div className="flex justify-center items-center gap-3">
          <div className="w-12 h-px bg-stone-800" />
          <div className="w-1 h-1 rounded-full bg-terracotta-500/30" />
          <div className="w-12 h-px bg-stone-800" />
        </div>
        
        <p className="text-stone-500 text-[9px] tracking-[0.25em] uppercase font-light">
          Built on trust, delivered with precision
        </p>
        
        <div className="flex justify-center gap-1.5">
          <div className="w-0.5 h-0.5 rounded-full bg-terracotta-500/40" />
          <div className="w-0.5 h-0.5 rounded-full bg-terracotta-500/20" />
        </div>
      </motion.div>
    </div>
  </section>
</SectionWrapper>
        {/* SECTION 8: FOUNDER & SECTION 9: FINAL CTA */}
        <SectionWrapper>
        <div className="flex min-h-screen items-center justify-center p-4">
			<CallToAction />
		</div>
        </SectionWrapper>
        
      </div>
    </>
  );
};

export default LandingPageWrapper;