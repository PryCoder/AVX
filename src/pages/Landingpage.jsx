import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, useInView, useMotionValue, useSpring } from 'framer-motion';
import { ArrowRight, CheckCircle, XCircle, BarChart3, Bot, Layout, ArrowUpRight, MessageCircle, Sparkles, Zap, TrendingUp, Users, Clock, ChevronRight } from 'lucide-react';
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
      colors={["#38bdf8", "#818cf8", "#c084fc", "#e879f9"]}
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
     <p className="text-4xl sm:text-6xl md:text-7xl font-bold bg-clip-text text-transparent drop-shadow-2xl bg-gradient-to-b from-neutral-900 to-neutral-700 leading-tight">
  Digital Systems Built to
</p>
          <div className="inline-block">
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
              lineGap={4}
              animationDuration={20}
              className="text-3xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold"
            />
          </div>
        </div>
      <div className="text-stone-400 text-xl sm:text-2xl lg:text-3xl xl:text-4xl leading-tight tracking-wide">
  Not Just Make It Look Good
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
  <motion.div
    whileHover={{ scale: 1.02 }}
    whileTap={{ scale: 0.98 }}
    className="w-[260px]"
  >
    <InteractiveHoverButton
      onClick={() => navigate('/contact')}
      className="w-full bg-stone-900 text-white rounded-full px-6 sm:px-8 lg:px-10 py-3 sm:py-4 lg:py-5 text-sm sm:text-base hover:bg-stone-800 transition-all duration-300 shadow-xl justify-center"
    >
      Book a Strategy Call

      <motion.div
        animate={{ x: [0, 4, 0] }}
        transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        className="inline-block ml-2"
      >
        <ArrowRight className="w-4 h-4" />
      </motion.div>
    </InteractiveHoverButton>
  </motion.div>

  <motion.div
    whileHover={{ scale: 1.02 }}
    whileTap={{ scale: 0.98 }}
    className="w-[260px]"
  >
    <ShimmerButton
      onClick={() => navigate('/contact')}
      variant="outline"
      size="lg"
      className="w-full justify-center"
    >
      Get Free Website Audit
    </ShimmerButton>
  </motion.div>
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
          <section className="py-24 lg:py-32 bg-white px-6 lg:px-8 border-t border-stone-100 relative z-10">
            <div className="max-w-5xl mx-auto text-center space-y-12 lg:space-y-16">
              <motion.h2 
                className="text-3xl sm:text-4xl lg:text-5xl font-bold clash-font leading-tight"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: premiumEase }}
                viewport={{ once: true }}
              >
                Most Websites Don't Fail Because of Design — <br className="hidden sm:block"/>
                <span className="text-stone-400 mt-2 inline-block">They Fail Because They Don't Convert</span>
              </motion.h2>
              
              <motion.div 
                className="grid sm:grid-cols-2 gap-4 lg:gap-6 text-left max-w-4xl mx-auto"
                variants={staggerContainer}
                initial="initial"
                whileInView="animate"
                viewport={{ once: true }}
              >
                {[
                  "Visitors come, but don't take action",
                  "No clear structure or user journey",
                  "No system behind the business",
                  "Manual processes limiting growth"
                ].map((point, i) => (
                  <motion.div 
                    key={i} 
                    className="flex items-start gap-4 p-6 lg:p-8 rounded-2xl bg-stone-50 border border-stone-100 transition-all duration-300"
                    variants={fadeInUp}
                    whileHover={{ y: -2, backgroundColor: "#fff", borderColor: "#e5e5e5", boxShadow: "0 10px 30px -10px rgba(0,0,0,0.05)" }}
                  >
                    <XCircle className="w-6 h-6 text-stone-400 shrink-0 mt-0.5" />
                    <p className="font-medium text-stone-700 sm:text-lg">{point}</p>
                  </motion.div>
                ))}
              </motion.div>
              
              <motion.p 
                className="text-2xl lg:text-3xl font-bold text-stone-900 pt-4 lg:pt-8 clash-font"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 1, delay: 0.4 }}
                viewport={{ once: true }}
              >
                That's where we come in.
              </motion.p>
            </div>
          </section>
        </SectionWrapper>

        {/* SECTION 3: SOLUTION */}
        <SectionWrapper>
          <section className="py-24 lg:py-32 bg-stone-900 text-white px-6 lg:px-8 relative overflow-hidden z-10">
            <div className="absolute inset-0 opacity-[0.03]">
              {[...Array(15)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-1.5 h-1.5 bg-white rounded-full"
                  initial={{ 
                    x: `${Math.random() * 100}vw`,
                    y: `${Math.random() * 100}vh` 
                  }}
                  animate={{ 
                    y: [null, "-50vh"],
                    opacity: [0, 1, 0]
                  }}
                  transition={{ 
                    duration: Math.random() * 5 + 4,
                    repeat: Infinity,
                    ease: "linear",
                    delay: Math.random() * 3
                  }}
                />
              ))}
            </div>

            <div className="max-w-7xl mx-auto space-y-16 lg:space-y-24 relative z-10">
              <div className="text-center max-w-3xl mx-auto space-y-6">
                <motion.h2 
                  className="text-3xl sm:text-4xl lg:text-6xl font-bold clash-font leading-tight"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, ease: premiumEase }}
                  viewport={{ once: true }}
                >
                  We Build Structured Digital Systems That Drive Growth
                </motion.h2>
                <motion.p 
                  className="text-lg lg:text-xl text-stone-400 font-light"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  viewport={{ once: true }}
                >
                  Not just websites. Not just automation. We build complete growth systems.
                </motion.p>
              </div>
              
              <motion.div 
                className="grid md:grid-cols-3 gap-6 lg:gap-8"
                variants={staggerContainer}
                initial="initial"
                whileInView="animate"
                viewport={{ once: true }}
              >
                {[
                  { icon: Layout, title: "Web Development", desc: "Conversion-focused architecture designed to turn visitors into leads, not just visual placeholders." },
                  { icon: Bot, title: "AI Automation", desc: "Reduce manual work and improve efficiency internally so you can focus on scaling." },
                  { icon: BarChart3, title: "System Thinking", desc: "Everything is connected and built for scalability. Your digital presence becomes a business asset." }
                ].map((pillar, i) => (
                  <motion.div 
                    key={i} 
                    className="p-8 lg:p-10 rounded-3xl bg-stone-800/50 border border-stone-700/50 hover:bg-stone-800 transition-all duration-500"
                    variants={fadeInUp}
                    whileHover={{ y: -5 }}
                  >
                    <pillar.icon className="w-10 h-10 lg:w-12 lg:h-12 text-stone-300 mb-6 lg:mb-8" />
                    <h3 className="text-xl lg:text-2xl font-bold mb-3 lg:mb-4 clash-font">{pillar.title}</h3>
                    <p className="text-sm lg:text-base text-stone-400 leading-relaxed">{pillar.desc}</p>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </section>
        </SectionWrapper>

        {/* SECTION 4: PROCESS */}
        <SectionWrapper>
          <section className="py-24 lg:py-32 bg-stone-50 px-6 lg:px-8 z-10 relative">
            <div className="max-w-7xl mx-auto">
              <motion.h2 
                className="text-3xl lg:text-5xl font-bold clash-font text-center mb-16 lg:mb-24"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: premiumEase }}
                viewport={{ once: true }}
              >
                Our Proven Framework
              </motion.h2>
              
              <div className="flex flex-col lg:flex-row gap-6 relative">
                <motion.div 
                  className="hidden lg:block absolute top-[3.5rem] left-0 w-full h-[1px] bg-stone-200 z-0"
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  transition={{ duration: 1.5, delay: 0.2, ease: "easeInOut" }}
                  viewport={{ once: true }}
                  style={{ originX: 0 }}
                />
                
                {[
                  { step: "01", title: "Audit", desc: "Analyze your current system & bottlenecks." },
                  { step: "02", title: "Strategy", desc: "Define precisely what needs to be built." },
                  { step: "03", title: "Build", desc: "Clean, scalable, and systematic execution." },
                  { step: "04", title: "Scale", desc: "Optimize, automate, and improve conversions." }
                ].map((item, i) => (
                  <motion.div 
                    key={i} 
                    className="flex-1 relative z-10 bg-white p-8 lg:p-10 rounded-3xl shadow-sm border border-stone-100 transition-all duration-300"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: i * 0.15, ease: premiumEase }}
                    viewport={{ once: true }}
                    whileHover={{ y: -5, boxShadow: "0 15px 35px -10px rgba(0,0,0,0.05)" }}
                  >
                    <div className="w-14 h-14 bg-stone-900 text-white rounded-full flex items-center justify-center font-bold text-xl mb-6 lg:mb-8 shadow-md clash-font">
                      {item.step}
                    </div>
                    <h3 className="text-xl font-bold mb-2 lg:mb-3 clash-font">{item.title}</h3>
                    <p className="text-sm lg:text-base text-stone-600 leading-relaxed">{item.desc}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>
        </SectionWrapper>

        {/* SECTION 5: CASE STUDIES */}
        <SectionWrapper>
          <section className="py-24 lg:py-32 bg-white px-6 lg:px-8 border-t border-stone-100 z-10 relative">
            <div className="max-w-7xl mx-auto space-y-12 lg:space-y-16">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-6">
                <motion.h2 
                  className="text-3xl lg:text-5xl font-bold clash-font"
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, ease: premiumEase }}
                  viewport={{ once: true }}
                >
                  Systems in Action
                </motion.h2>
                
                <motion.div
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, ease: premiumEase }}
                  viewport={{ once: true }}
                >
                  <Button 
                    variant="ghost" 
                    onClick={() => navigate('/projects')} 
                    className="text-stone-700 hover:text-stone-900 group flex items-center gap-2 rounded-full px-6 text-sm sm:text-base"
                  >
                    View All Work 
                    <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </Button>
                </motion.div>
              </div>
              
              <div className="grid md:grid-cols-2 gap-8">
                {featuredProjects.map((cs, index) => (
                  <motion.div 
                    key={cs.id} 
                    className="group relative bg-stone-50 border border-stone-200 rounded-[2rem] p-8 lg:p-10 hover:bg-stone-900 transition-colors duration-500 cursor-pointer flex flex-col overflow-hidden"
                    onClick={() => navigate(`/project/${cs.id}`)}
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: index * 0.15, ease: premiumEase }}
                    viewport={{ once: true }}
                  >
                    <div className="relative z-10 flex justify-between items-start mb-10">
                      <span className="bg-stone-200 text-stone-800 group-hover:bg-white/10 group-hover:text-white transition-colors duration-300 text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-wider">
                        {(cs.client || cs.name).substring(0, 20)}
                      </span>
                      <ArrowUpRight className="w-8 h-8 text-stone-400 group-hover:text-white transition-colors duration-300" />
                    </div>
                    
                    <div className="relative z-10 space-y-6 lg:space-y-8 flex-1 group-hover:text-white transition-colors duration-300">
                      <div>
                        <p className="text-xs sm:text-sm text-stone-500 group-hover:text-stone-400 font-medium mb-1.5 lg:mb-2 uppercase tracking-wide transition-colors">The Problem</p>
                        <p className="text-base sm:text-lg font-semibold">{cs.challenge || "Low conversion rate and manual scaling bottlenecks."}</p>
                      </div>
                      <div>
                        <p className="text-xs sm:text-sm text-stone-500 group-hover:text-stone-400 font-medium mb-1.5 lg:mb-2 uppercase tracking-wide transition-colors">The Solution</p>
                        <p className="text-base sm:text-lg font-semibold text-stone-600 group-hover:text-stone-300 transition-colors">{cs.solution || "Complete platform rebuild with custom AI automations."}</p>
                      </div>
                    </div>
                    
                    <div className="relative z-10 pt-6 mt-6 lg:pt-8 lg:mt-8 border-t border-stone-200 group-hover:border-stone-700/50 transition-colors duration-300">
                      <p className="text-xs sm:text-sm text-stone-500 group-hover:text-stone-400 font-medium mb-1.5 lg:mb-2 uppercase tracking-wide transition-colors">Key Result</p>
                      <p className="text-2xl sm:text-3xl lg:text-4xl font-bold clash-font text-stone-900 group-hover:text-white transition-colors">
                        {cs.results?.[0] || "+42% Conversion Increase"}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>
        </SectionWrapper>

        {/* SECTION 6 & 7: WHY CHOOSE US & WHO IT'S FOR */}
        <SectionWrapper>
          <section className="py-24 lg:py-32 bg-stone-900 text-white px-6 lg:px-8 z-10 relative">
            <div className="max-w-7xl mx-auto space-y-24 lg:space-y-32">
              
              <div>
                <motion.h2 
                  className="text-3xl lg:text-5xl font-bold clash-font mb-12 lg:mb-16 text-center"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, ease: premiumEase }}
                  viewport={{ once: true }}
                >
                  Why Partner With Us?
                </motion.h2>
                
                <motion.div 
                  className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6"
                  variants={staggerContainer}
                  initial="initial"
                  whileInView="animate"
                  viewport={{ once: true }}
                >
                  {[
                    'Strategic Thinking', 
                    'Conversion-Focused Approach', 
                    'Clean & Scalable Execution', 
                    'Long-Term Growth Focus'
                  ].map((point, i) => (
                    <motion.div 
                      key={i} 
                      className="p-6 lg:p-8 bg-stone-800/50 rounded-3xl border border-stone-700/50 hover:bg-stone-800 transition-colors"
                      variants={fadeInUp}
                    >
                      <CheckCircle className="w-8 h-8 lg:w-10 lg:h-10 text-stone-400 mb-4 lg:mb-6" />
                      <h3 className="font-bold text-lg lg:text-xl clash-font">{point}</h3>
                    </motion.div>
                  ))}
                </motion.div>
              </div>

              <div className="grid md:grid-cols-2 gap-8 lg:gap-10">
                <motion.div 
                  className="bg-white text-stone-900 p-8 sm:p-10 lg:p-14 rounded-[2rem] shadow-xl"
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, ease: premiumEase }}
                  viewport={{ once: true }}
                >
                  <h3 className="text-2xl lg:text-3xl font-bold mb-8 lg:mb-10 flex items-center gap-4 clash-font">
                    <CheckCircle className="text-stone-900 w-6 h-6 lg:w-8 lg:h-8"/> Who We Are For
                  </h3>
                  <ul className="space-y-5 lg:space-y-6 text-base lg:text-lg">
                    {[
                      "Businesses ready to scale & grow",
                      "Founders who value actual systems",
                      "Long-term thinkers and visionaries"
                    ].map((item, i) => (
                      <li key={i} className="flex items-start gap-4 font-medium">
                        <div className="w-2.5 h-2.5 bg-stone-900 rounded-full mt-2 shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </motion.div>
                
                <motion.div 
                  className="bg-stone-800/50 p-8 sm:p-10 lg:p-14 rounded-[2rem] border border-stone-700/50"
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.2, ease: premiumEase }}
                  viewport={{ once: true }}
                >
                  <h3 className="text-2xl lg:text-3xl font-bold mb-8 lg:mb-10 flex items-center gap-4 clash-font text-stone-300">
                    <XCircle className="text-stone-500 w-6 h-6 lg:w-8 lg:h-8"/> Who We Are NOT For
                  </h3>
                  <ul className="space-y-5 lg:space-y-6 text-base lg:text-lg text-stone-400">
                    {[
                      '"Just need a quick cheap website" clients',
                      'Highly price-sensitive buyers',
                      'Short-term mindset without a strategy'
                    ].map((item, i) => (
                      <li key={i} className="flex items-start gap-4">
                        <div className="w-2.5 h-2.5 bg-stone-500 rounded-full mt-2 shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              </div>
            </div>
          </section>
        </SectionWrapper>

        {/* SECTION 8: FOUNDER & SECTION 9: FINAL CTA */}
        <SectionWrapper>
          <section className="py-24 lg:py-32 bg-stone-100 px-6 lg:px-8 border-t border-stone-200 z-10 relative">
            <div className="max-w-5xl mx-auto space-y-20 lg:space-y-24">
              
              {/* Founder/Brand Statement */}
              <motion.div 
                className="flex flex-col md:flex-row items-center gap-8 lg:gap-10 bg-white p-8 sm:p-10 lg:p-12 rounded-[2rem] shadow-sm border border-stone-200"
                initial={{ opacity: 0, scale: 0.97 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, ease: premiumEase }}
                viewport={{ once: true }}
              >
                <div className="w-28 h-28 lg:w-36 lg:h-36 bg-stone-900 rounded-full shrink-0 flex items-center justify-center text-white font-bold text-3xl lg:text-4xl font-serif italic shadow-inner">
                  A
                </div>
                
                <div className="text-center md:text-left">
                  <h3 className="text-2xl lg:text-3xl font-bold mb-3 lg:mb-4 clash-font">The AVXONIA Standard</h3>
                  <p className="text-stone-600 text-base lg:text-xl leading-relaxed">
                    AVXONIA was built to help businesses move from having just a basic online presence 
                    to deploying structured digital systems that drive predictable, long-term growth.
                  </p>
                </div>
              </motion.div>

              {/* FINAL CTA */}
              <motion.div 
                className="text-center space-y-8 lg:space-y-10"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: premiumEase }}
                viewport={{ once: true }}
              >
                <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold clash-font leading-tight max-w-3xl mx-auto">
                  Ready to Build a System That Actually Grows Your Business?
                </h2>
                
                <p className="text-stone-500 font-medium text-base sm:text-lg lg:text-xl">
                  Limited slots available each month to ensure highest quality execution.
                </p>
                
                <div className="flex flex-col sm:flex-row justify-center gap-4 pt-2 lg:pt-4">
                  <Button 
                    onClick={() => navigate('/contact')} 
                    size="lg" 
                    className="w-full sm:w-auto bg-stone-900 text-white rounded-full px-8 lg:px-10 py-6 lg:py-7 text-sm sm:text-lg hover:bg-stone-800 shadow-xl transition-all duration-300 group"
                  >
                    Book a Strategy Call
                    <ArrowRight className="w-4 h-4 lg:w-5 lg:h-5 ml-2 transition-transform duration-300 group-hover:translate-x-1" />
                  </Button>
                  
                  <Button 
                    onClick={() => navigate('/contact')} 
                    variant="outline" 
                    size="lg" 
                    className="text-stone-700 hover:text-stone-900 w-full sm:w-auto bg-white rounded-full px-8 lg:px-10 py-6 lg:py-7 border-stone-300 hover:bg-stone-50 text-sm sm:text-lg shadow-sm transition-all duration-300"
                  >
                    Get Free Website Audit
                  </Button>
                </div>
              </motion.div>
            </div>
          </section>
        </SectionWrapper>
        
      </div>
    </>
  );
};

export default LandingPageWrapper;