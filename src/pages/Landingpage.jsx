import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { ArrowRight, CheckCircle, XCircle, BarChart3, Bot, Layout, ArrowUpRight, MessageCircle, Sparkles, Zap, TrendingUp } from 'lucide-react';
import { Button } from "../components/ui/button";
import Loader from "../components/loader";
import projectsData from '../data/projects.json';

const LandingPageWrapper = () => {
  const [loading, setLoading] = useState(true);
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setCursorPosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const featuredProjects = projectsData.projects.slice(0, 2);

  // Animation variants
  const fadeInUp = {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, ease: [0.6, -0.05, 0.01, 0.99] }
  };

  const staggerContainer = {
    animate: {
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const scaleIn = {
    initial: { opacity: 0, scale: 0.9 },
    animate: { opacity: 1, scale: 1 },
    transition: { duration: 0.5, ease: "easeOut" }
  };

  const SectionWrapper = ({ children, className = "" }) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, amount: 0.2 });
    
    return (
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 50 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
        transition={{ duration: 0.8, ease: [0.6, -0.05, 0.01, 0.99] }}
        className={className}
      >
        {children}
      </motion.div>
    );
  };

  return (
    <>
      {loading && <Loader />}
      
      {/* Custom Cursor Effect */}
      <motion.div 
        className="fixed w-96 h-96 bg-stone-900/5 rounded-full blur-3xl pointer-events-none z-0"
        animate={{
          x: cursorPosition.x - 192,
          y: cursorPosition.y - 192,
        }}
        transition={{ type: "spring", damping: 30, stiffness: 200 }}
      />

      <div className="min-h-screen bg-stone-50 sfpro-font text-stone-900 overflow-x-hidden">
        
        {/* Animated Background Grid */}
        <div className="fixed inset-0 z-0 opacity-20 pointer-events-none">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
        </div>

        {/* Sticky CTA with Pulse Animation */}
        <motion.a 
          href="/contact" 
          onClick={(e) => { e.preventDefault(); navigate('/contact'); }}
          className="fixed bottom-6 right-6 z-50 bg-stone-900 text-white p-4 rounded-full shadow-2xl hover:scale-105 hover:bg-stone-800 transition-all duration-300"
          aria-label="Book a Call"
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: "spring", damping: 20, stiffness: 260, delay: 2 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <motion.div
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <MessageCircle className="w-6 h-6" />
          </motion.div>
        </motion.a>

        {/* SECTION 1: HERO with Parallax */}
        <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 px-6 lg:px-8 max-w-7xl mx-auto">
          <motion.div 
            className="grid lg:grid-cols-2 gap-12 items-center"
            variants={staggerContainer}
            initial="initial"
            animate="animate"
          >
            <motion.div className="space-y-8 relative z-10" variants={fadeInUp}>
              <motion.h1 
                className="text-5xl lg:text-7xl font-bold tracking-tight leading-[1.1] clash-font"
                variants={fadeInUp}
              >
                Digital Systems Built to{' '}
                <motion.span 
                  className="relative inline-block"
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", damping: 10 }}
                >
                  Scale Your Business
                  <motion.span 
                    className="absolute -bottom-2 left-0 w-full h-2 bg-stone-200/50 -z-10"
                    initial={{ width: 0 }}
                    animate={{ width: "100%" }}
                    transition={{ delay: 0.5, duration: 0.8 }}
                  />
                </motion.span>
                <br/>
                <span className="text-stone-400">Not Just Make It Look Good</span>
              </motion.h1>
              
              <motion.p 
                className="text-lg lg:text-xl text-stone-600 max-w-xl leading-relaxed"
                variants={fadeInUp}
              >
                We design websites and AI automation systems that increase conversions, 
                streamline operations, and drive real growth.
              </motion.p>
              
              <motion.div 
                className="flex flex-col sm:flex-row gap-4"
                variants={fadeInUp}
              >
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button 
                    onClick={() => navigate('/contact')} 
                    size="lg" 
                    className="bg-stone-900 text-white rounded-full px-8 py-6 text-base hover:bg-stone-800 transition-all duration-300 shadow-lg hover:shadow-xl"
                  >
                    Book a Strategy Call
                    <motion.div
                      animate={{ x: [0, 5, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                      className="inline-block ml-2"
                    >
                      <ArrowRight className="w-4 h-4" />
                    </motion.div>
                  </Button>
                </motion.div>
                
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button 
                    onClick={() => navigate('/contact')} 
                    variant="outline" 
                    size="lg" 
                    className="bg-transparent rounded-full px-8 py-6 border-stone-300 text-stone-900 hover:bg-stone-100 transition-all duration-300 text-base"
                  >
                    Get Free Website Audit
                  </Button>
                </motion.div>
              </motion.div>
              
              <motion.p 
                className="text-sm text-stone-500 font-medium flex items-center gap-2 pt-2"
                variants={fadeInUp}
              >
                <motion.div
                  animate={{ rotate: [0, 360] }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                >
                  <Sparkles className="w-4 h-4 text-stone-900" />
                </motion.div>
                Trusted by growing businesses & founders
              </motion.p>
            </motion.div>
            
            <motion.div 
              className="relative rounded-3xl overflow-hidden shadow-2xl bg-white border border-stone-200 aspect-[4/3] lg:aspect-square flex items-center justify-center p-8 z-10 w-full"
              variants={scaleIn}
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", damping: 15 }}
            >
              {/* Abstract System UI with Animated Elements */}
              <div className="w-full h-full border border-stone-100 rounded-xl bg-stone-50 p-6 flex flex-col gap-4 shadow-inner relative overflow-hidden">
                <motion.div 
                  className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-stone-200 via-stone-900 to-stone-200"
                  animate={{ x: ["-100%", "100%"] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                />
                
                <div className="flex justify-between items-center mb-2">
                  <motion.div 
                    className="w-1/3 h-6 bg-stone-200 rounded-md"
                    animate={{ opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                  <div className="flex gap-2">
                    {['bg-red-400', 'bg-amber-400', 'bg-green-400'].map((color, i) => (
                      <motion.div 
                        key={i}
                        className={`w-3 h-3 rounded-full ${color}`}
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 2, delay: i * 0.3, repeat: Infinity }}
                      />
                    ))}
                  </div>
                </div>
                
                <div className="flex-1 flex gap-4">
                  <div className="w-2/3 bg-white border border-stone-100 rounded-lg p-4 shadow-sm flex flex-col gap-3">
                    <motion.div 
                      className="h-4 w-1/2 bg-stone-100 rounded"
                      animate={{ width: ["50%", "75%", "50%"] }}
                      transition={{ duration: 3, repeat: Infinity }}
                    />
                    <div className="h-full w-full bg-stone-50 rounded border border-stone-100 relative overflow-hidden">
                      <motion.div 
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-stone-200 to-transparent"
                        animate={{ x: ["-100%", "100%"] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      />
                    </div>
                  </div>
                  
                  <div className="w-1/3 flex flex-col gap-4">
                    <motion.div 
                      className="flex-1 bg-stone-900 rounded-lg shadow-md p-4 text-white flex flex-col justify-end"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <BarChart3 className="w-8 h-8 mb-2 opacity-50" />
                      <div className="text-xs text-stone-400 mb-1">Conversion</div>
                      <motion.div 
                        className="text-2xl font-bold"
                        animate={{ scale: [1, 1.1, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      >
                        +42%
                      </motion.div>
                    </motion.div>
                    
                    <motion.div 
                      className="flex-1 bg-white border border-stone-100 rounded-lg shadow-sm"
                      whileHover={{ scale: 1.05 }}
                    />
                  </div>
                </div>
              </div>
              
              {/* Animated background blur */}
              <motion.div 
                className="absolute -inset-4 bg-stone-900/5 rounded-3xl blur-3xl opacity-60 -z-10"
                animate={{ 
                  scale: [1, 1.1, 1],
                  opacity: [0.4, 0.6, 0.4]
                }}
                transition={{ duration: 4, repeat: Infinity }}
              />
            </motion.div>
          </motion.div>
        </section>

        {/* SECTION 2: PROBLEM */}
        <SectionWrapper>
          <section className="py-24 lg:py-32 bg-white px-6 lg:px-8 border-t border-stone-100">
            <div className="max-w-5xl mx-auto text-center space-y-16">
              <motion.h2 
                className="text-3xl lg:text-5xl font-bold clash-font leading-tight"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                Most Websites Don't Fail Because of Design — <br/>
                <span className="text-stone-400">They Fail Because They Don't Convert</span>
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
                    className="flex items-start gap-4 p-6 lg:p-8 rounded-2xl bg-stone-50 border border-stone-100 hover:border-stone-200 transition-colors"
                    variants={fadeInUp}
                    whileHover={{ scale: 1.02, x: 5 }}
                  >
                    <XCircle className="w-6 h-6 text-stone-400 shrink-0" />
                    <p className="font-medium text-stone-700 text-lg">{point}</p>
                  </motion.div>
                ))}
              </motion.div>
              
              <motion.p 
                className="text-2xl lg:text-3xl font-bold text-stone-900 pt-8 clash-font"
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                viewport={{ once: true }}
              >
                That's where we come in.
              </motion.p>
            </div>
          </section>
        </SectionWrapper>

        {/* SECTION 3: SOLUTION with Parallax Cards */}
        <SectionWrapper>
          <section className="py-24 lg:py-32 bg-stone-900 text-white px-6 lg:px-8 relative overflow-hidden">
            {/* Animated background particles */}
            <div className="absolute inset-0 opacity-10">
              {[...Array(20)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-1 h-1 bg-white rounded-full"
                  initial={{ 
                    x: Math.random() * window.innerWidth,
                    y: Math.random() * window.innerHeight 
                  }}
                  animate={{ 
                    y: [null, -100],
                    opacity: [0, 1, 0]
                  }}
                  transition={{ 
                    duration: Math.random() * 3 + 2,
                    repeat: Infinity,
                    delay: Math.random() * 2
                  }}
                />
              ))}
            </div>

            <div className="max-w-7xl mx-auto space-y-16 lg:space-y-24 relative z-10">
              <div className="text-center max-w-3xl mx-auto space-y-6">
                <motion.h2 
                  className="text-4xl lg:text-6xl font-bold clash-font leading-tight"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  viewport={{ once: true }}
                >
                  We Build Structured Digital Systems That Drive Growth
                </motion.h2>
                <motion.p 
                  className="text-xl text-stone-400 font-light"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
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
                    className="p-8 lg:p-10 rounded-3xl bg-stone-800/50 border border-stone-700/50 hover:bg-stone-800 hover:border-stone-600 transition-all duration-300"
                    variants={fadeInUp}
                    whileHover={{ 
                      scale: 1.05,
                      rotateY: 5,
                      boxShadow: "0 20px 40px rgba(0,0,0,0.3)"
                    }}
                    style={{ transformStyle: "preserve-3d" }}
                  >
                    <motion.div
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.5 }}
                    >
                      <pillar.icon className="w-12 h-12 text-stone-300 mb-8" />
                    </motion.div>
                    <h3 className="text-2xl font-bold mb-4 clash-font">{pillar.title}</h3>
                    <p className="text-stone-400 leading-relaxed">{pillar.desc}</p>
                    
                    <motion.div
                      className="mt-6 flex items-center gap-2 text-stone-500"
                      initial={{ opacity: 0 }}
                      whileHover={{ opacity: 1, x: 10 }}
                    >
                      <span>Learn more</span>
                      <ArrowRight className="w-4 h-4" />
                    </motion.div>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </section>
        </SectionWrapper>

        {/* SECTION 4: PROCESS with Animated Timeline */}
        <SectionWrapper>
          <section className="py-24 lg:py-32 bg-stone-50 px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
              <motion.h2 
                className="text-3xl lg:text-5xl font-bold clash-font text-center mb-16 lg:mb-24"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                Our Proven Framework
              </motion.h2>
              
              <div className="flex flex-col lg:flex-row gap-6 relative">
                <motion.div 
                  className="hidden lg:block absolute top-[3rem] left-0 w-full h-[1px] bg-stone-200 z-0"
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  transition={{ duration: 1, delay: 0.5 }}
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
                    className="flex-1 relative z-10 bg-white p-8 lg:p-10 rounded-3xl shadow-sm border border-stone-100 hover:shadow-md transition-shadow"
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: i * 0.1 }}
                    viewport={{ once: true }}
                    whileHover={{ y: -5 }}
                  >
                    <motion.div 
                      className="w-14 h-14 bg-stone-900 text-white rounded-full flex items-center justify-center font-bold text-xl mb-8 shadow-md clash-font"
                      whileHover={{ scale: 1.1, rotate: 360 }}
                      transition={{ duration: 0.5 }}
                    >
                      {item.step}
                    </motion.div>
                    <h3 className="text-xl font-bold mb-3 clash-font">{item.title}</h3>
                    <p className="text-stone-600 leading-relaxed">{item.desc}</p>
                    
                    <motion.div 
                      className="absolute bottom-4 right-4 opacity-0"
                      whileHover={{ opacity: 1, x: -5 }}
                    >
                      <ArrowRight className="w-5 h-5 text-stone-400" />
                    </motion.div>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>
        </SectionWrapper>

        {/* SECTION 5: CASE STUDIES with 3D Hover Effect */}
        <SectionWrapper>
          <section className="py-24 lg:py-32 bg-white px-6 lg:px-8 border-t border-stone-100">
            <div className="max-w-7xl mx-auto space-y-16">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-6">
                <motion.h2 
                  className="text-3xl lg:text-5xl font-bold clash-font"
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6 }}
                  viewport={{ once: true }}
                >
                  Systems in Action
                </motion.h2>
                
                <motion.div
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6 }}
                  viewport={{ once: true }}
                >
                  <Button 
                    variant="ghost" 
                    onClick={() => navigate('/projects')} 
                    className="group flex items-center gap-2 hover:bg-stone-50 rounded-full px-6 text-base"
                  >
                    View All Work 
                    <motion.div
                      animate={{ x: [0, 5, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    >
                      <ArrowRight className="w-4 h-4" />
                    </motion.div>
                  </Button>
                </motion.div>
              </div>
              
              <div className="grid md:grid-cols-2 gap-8">
                {featuredProjects.map((cs, index) => (
                  <motion.div 
                    key={cs.id} 
                    className="group bg-stone-50 border border-stone-200 rounded-[2rem] p-8 lg:p-10 hover:shadow-xl hover:bg-stone-900 hover:text-white transition-all duration-500 cursor-pointer flex flex-col"
                    onClick={() => navigate(`/project/${cs.id}`)}
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.2 }}
                    viewport={{ once: true }}
                    whileHover={{ 
                      scale: 1.02,
                      rotateY: 2,
                      boxShadow: "0 30px 60px rgba(0,0,0,0.2)"
                    }}
                    style={{ transformStyle: "preserve-3d" }}
                  >
                    <div className="flex justify-between items-start mb-10">
                      <motion.span 
                        className="bg-stone-200 text-stone-800 group-hover:bg-white group-hover:text-stone-900 transition-colors text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-wider"
                        whileHover={{ scale: 1.05 }}
                      >
                        {(cs.client || cs.name).substring(0, 20)}
                      </motion.span>
                      
                      <motion.div
                        whileHover={{ rotate: 45 }}
                        transition={{ duration: 0.3 }}
                      >
                        <ArrowUpRight className="w-8 h-8 text-stone-400 group-hover:text-white transition-colors" />
                      </motion.div>
                    </div>
                    
                    <div className="space-y-8 flex-1">
                      <div>
                        <p className="text-sm text-stone-500 group-hover:text-stone-400 font-medium mb-2 uppercase tracking-wide">The Problem</p>
                        <p className="text-lg lg:text-xl font-semibold">{cs.challenge || "Low conversion rate and manual scaling bottlenecks."}</p>
                      </div>
                      <div>
                        <p className="text-sm text-stone-500 group-hover:text-stone-400 font-medium mb-2 uppercase tracking-wide">The Solution</p>
                        <p className="text-lg lg:text-xl font-semibold text-stone-600 group-hover:text-stone-300">{cs.solution || "Complete platform rebuild with custom AI automations."}</p>
                      </div>
                    </div>
                    
                    <motion.div 
                      className="pt-8 mt-8 border-t border-stone-200 group-hover:border-stone-700 transition-colors"
                      whileHover={{ scale: 1.05 }}
                    >
                      <p className="text-sm text-stone-500 group-hover:text-stone-400 font-medium mb-2 uppercase tracking-wide">Key Result</p>
                      <p className="text-3xl lg:text-4xl font-bold clash-font text-stone-900 group-hover:text-white">
                        {cs.results?.[0] || "+42% Conversion Increase"}
                      </p>
                    </motion.div>
                    
                    {/* Animated gradient overlay on hover */}
                    <motion.div 
                      className="absolute inset-0 rounded-[2rem] opacity-0 group-hover:opacity-10 pointer-events-none"
                      style={{
                        background: "radial-gradient(circle at 50% 50%, rgba(255,255,255,0.2) 0%, transparent 50%)"
                      }}
                      animate={{
                        scale: [1, 1.2, 1],
                      }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                  </motion.div>
                ))}
              </div>
            </div>
          </section>
        </SectionWrapper>

        {/* SECTION 6 & 7: WHY CHOOSE US & WHO IT'S FOR with Flip Cards */}
        <SectionWrapper>
          <section className="py-24 lg:py-32 bg-stone-900 text-white px-6 lg:px-8">
            <div className="max-w-7xl mx-auto space-y-32">
              
              {/* Why Choose Us with Animated Cards */}
              <div>
                <motion.h2 
                  className="text-3xl lg:text-5xl font-bold clash-font mb-16 text-center"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
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
                      className="p-8 bg-stone-800/50 rounded-3xl border border-stone-700/50 hover:bg-stone-800 transition-colors"
                      variants={fadeInUp}
                      whileHover={{ 
                        scale: 1.05,
                        rotateY: 5,
                        boxShadow: "0 20px 40px rgba(0,0,0,0.3)"
                      }}
                    >
                      <motion.div
                        whileHover={{ rotate: 360 }}
                        transition={{ duration: 0.5 }}
                      >
                        <CheckCircle className="w-10 h-10 text-stone-400 mb-6" />
                      </motion.div>
                      <h3 className="font-bold text-xl clash-font">{point}</h3>
                      
                      <motion.div 
                        className="mt-4 text-stone-500 text-sm"
                        initial={{ opacity: 0 }}
                        whileHover={{ opacity: 1 }}
                      >
                        Learn more →
                      </motion.div>
                    </motion.div>
                  ))}
                </motion.div>
              </div>

              {/* Who It's For / Not For with Split Screen Animation */}
              <div className="grid md:grid-cols-2 gap-6 lg:gap-10">
                <motion.div 
                  className="bg-white text-stone-900 p-10 lg:p-14 rounded-[2rem]"
                  initial={{ opacity: 0, x: -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.02 }}
                >
                  <motion.h3 
                    className="text-3xl font-bold mb-10 flex items-center gap-4 clash-font"
                    whileHover={{ x: 10 }}
                  >
                    <CheckCircle className="text-stone-900 w-8 h-8"/> Who We Are For
                  </motion.h3>
                  
                  <ul className="space-y-6 text-lg">
                    {[
                      "Businesses ready to scale & grow",
                      "Founders who value actual systems",
                      "Long-term thinkers and visionaries"
                    ].map((item, i) => (
                      <motion.li 
                        key={i} 
                        className="flex items-start gap-4 font-medium"
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.1 }}
                        viewport={{ once: true }}
                        whileHover={{ x: 10 }}
                      >
                        <div className="w-2.5 h-2.5 bg-stone-900 rounded-full mt-2 shrink-0" />
                        {item}
                      </motion.li>
                    ))}
                  </ul>
                </motion.div>
                
                <motion.div 
                  className="bg-stone-800/50 p-10 lg:p-14 rounded-[2rem] border border-stone-700/50"
                  initial={{ opacity: 0, x: 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.02 }}
                >
                  <motion.h3 
                    className="text-3xl font-bold mb-10 flex items-center gap-4 clash-font text-stone-300"
                    whileHover={{ x: -10 }}
                  >
                    <XCircle className="text-stone-500 w-8 h-8"/> Who We Are NOT For
                  </motion.h3>
                  
                  <ul className="space-y-6 text-lg text-stone-400">
                    {[
                      '"Just need a quick cheap website" clients',
                      'Highly price-sensitive buyers',
                      'Short-term mindset without a strategy'
                    ].map((item, i) => (
                      <motion.li 
                        key={i} 
                        className="flex items-start gap-4"
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.1 }}
                        viewport={{ once: true }}
                        whileHover={{ x: -10 }}
                      >
                        <div className="w-2.5 h-2.5 bg-stone-500 rounded-full mt-2 shrink-0" />
                        {item}
                      </motion.li>
                    ))}
                  </ul>
                </motion.div>
              </div>
            </div>
          </section>
        </SectionWrapper>

        {/* SECTION 8: FOUNDER & SECTION 9: FINAL CTA with Parallax */}
        <SectionWrapper>
          <section className="py-24 lg:py-32 bg-stone-100 px-6 lg:px-8 border-t border-stone-200">
            <div className="max-w-5xl mx-auto space-y-24">
              
              {/* Founder/Brand Statement with Reveal Animation */}
              <motion.div 
                className="flex flex-col md:flex-row items-center gap-10 bg-white p-10 lg:p-12 rounded-[2rem] shadow-sm border border-stone-200"
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                whileHover={{ boxShadow: "0 30px 60px rgba(0,0,0,0.1)" }}
              >
                <motion.div 
                  className="w-32 h-32 lg:w-40 lg:h-40 bg-stone-900 rounded-full shrink-0 flex items-center justify-center text-white font-bold text-4xl font-serif italic shadow-inner"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ type: "spring", damping: 10 }}
                >
                  A
                </motion.div>
                
                <motion.div
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 }}
                  viewport={{ once: true }}
                >
                  <h3 className="text-2xl lg:text-3xl font-bold mb-4 clash-font">The AVXONIA Standard</h3>
                  <p className="text-stone-600 text-lg lg:text-xl leading-relaxed">
                    AVXONIA was built to help businesses move from having just a basic online presence 
                    to deploying structured digital systems that drive predictable, long-term growth.
                  </p>
                </motion.div>
              </motion.div>

              {/* FINAL CTA with Particle Effect */}
              <motion.div 
                className="text-center space-y-10 relative"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
              >
                {/* Floating particles */}
                <div className="absolute inset-0 pointer-events-none">
                  {[...Array(10)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute w-1 h-1 bg-stone-900/20 rounded-full"
                      initial={{ 
                        x: Math.random() * 100 + "%",
                        y: Math.random() * 100 + "%" 
                      }}
                      animate={{ 
                        y: [null, "-20px"],
                        x: [null, (Math.random() - 0.5) * 20 + "px"],
                        opacity: [0, 1, 0]
                      }}
                      transition={{ 
                        duration: Math.random() * 3 + 2,
                        repeat: Infinity,
                        delay: Math.random() * 2
                      }}
                    />
                  ))}
                </div>

                <motion.h2 
                  className="text-4xl lg:text-6xl font-bold clash-font leading-tight max-w-3xl mx-auto"
                  whileHover={{ scale: 1.02 }}
                >
                  Ready to Build a System That Actually Grows Your Business?
                </motion.h2>
                
                <motion.p 
                  className="text-stone-500 font-medium text-lg lg:text-xl"
                  animate={{ 
                    scale: [1, 1.05, 1],
                    opacity: [1, 0.8, 1]
                  }}
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  Limited slots available each month to ensure highest quality execution.
                </motion.p>
                
                <div className="flex flex-col sm:flex-row justify-center gap-4 pt-4">
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Button 
                      onClick={() => navigate('/contact')} 
                      size="lg" 
                      className="bg-stone-900 text-white rounded-full px-10 py-7 text-lg hover:bg-stone-800 shadow-xl transition-all duration-300 relative overflow-hidden group"
                    >
                      <motion.span
                        className="absolute inset-0 bg-white/20"
                        initial={{ x: "-100%" }}
                        whileHover={{ x: "100%" }}
                        transition={{ duration: 0.5 }}
                      />
                      Book a Strategy Call
                      <motion.div
                        animate={{ x: [0, 5, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                        className="inline-block ml-2"
                      >
                        <ArrowRight className="w-5 h-5" />
                      </motion.div>
                    </Button>
                  </motion.div>
                  
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Button 
                      onClick={() => navigate('/contact')} 
                      variant="outline" 
                      size="lg" 
                      className="bg-white rounded-full px-10 py-7 border-stone-300 text-stone-900 hover:bg-stone-50 text-lg shadow-sm transition-all duration-300"
                    >
                      Get Free Website Audit
                    </Button>
                  </motion.div>
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