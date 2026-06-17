"use client";

import { motion } from "framer-motion";
import { Layout, Bot, BarChart3, CheckCircle2, ArrowRight, Sparkles, Zap, Shield, Globe, Infinity, Rocket } from "lucide-react";
import { RetroGrid } from "../components/ui/retro-grid";
import SectionWrapper from "../components/ui/section-wrapper";

export default function GrowthSystemsSection() {
  return (
    <SectionWrapper>
      {/* Force dark theme with .dark class and bg-black */}
      <div className="dark relative">
        <section className="relative overflow-hidden bg-black py-24 lg:py-32 px-4 sm:px-6 lg:px-8">
        
        {/* ============================================ */}
        {/* PREMIUM DARK BACKGROUND LAYER */}
        {/* ============================================ */}
        
        {/* Dark RetroGrid with subtle colors */}
        <div className="absolute inset-0 z-0">
          <RetroGrid 
            angle={35}
            cellSize={50}
            opacity={0.3}
            lightLineColor="#1e293b"
            darkLineColor="#0f172a"
          />
        </div>
        
        {/* Dark gradient overlays - solid black to deep dark */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/95 to-black/90 pointer-events-none z-[1]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_#1e293b_0%,_transparent_70%)] pointer-events-none z-[1] opacity-30" />
        
        {/* Dark ambient glows - very subtle */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-blue-500/5 rounded-full blur-[120px] animate-glow-pulse z-[1]" />
        <div className="absolute bottom-1/4 right-0 w-[500px] h-[500px] bg-indigo-500/3 rounded-full blur-[100px] animate-glow-pulse animation-delay-2000 z-[1]" />
        <div className="absolute top-1/3 left-0 w-[400px] h-[400px] bg-purple-500/3 rounded-full blur-[80px] animate-glow-pulse animation-delay-4000 z-[1]" />
        
        {/* Dark floating particles - very subtle */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-[1]">
          {[...Array(30)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-[1px] h-[1px] bg-white/5 rounded-full"
              initial={{
                x: `${Math.random() * 100}%`,
                y: `${Math.random() * 100}%`,
                opacity: 0,
              }}
              animate={{
                y: ["0%", "-100%"],
                opacity: [0, 0.1, 0],
              }}
              transition={{
                duration: Math.random() * 15 + 10,
                repeat: Infinity,
                ease: "linear",
                delay: Math.random() * 10,
              }}
            />
          ))}
        </div>

        {/* Dark grid overlay pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:50px_50px] pointer-events-none z-[1] opacity-20" />

        {/* ============================================ */}
        {/* MAIN CONTENT - Dark Theme */}
        {/* ============================================ */}
        
        <div className="relative z-10 max-w-7xl mx-auto">
          
          {/* ============================================ */}
          {/* HEADER SECTION - Dark Theme */}
          {/* ============================================ */}
          
          <div className="text-center max-w-4xl mx-auto mb-20 lg:mb-28">
            
            {/* Dark badge with subtle border */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm px-4 py-1.5 mb-8 shadow-lg"
            >
              <Sparkles className="w-3.5 h-3.5 text-blue-400" />
              <span className="text-xs font-medium tracking-wider text-gray-400 uppercase">
                Premium Growth System
              </span>
            </motion.div>

            {/* Dark typography with white/gray text */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <div className="space-y-4">
                <h1 className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-bold tracking-tight">
                  <span className="text-white">We Build</span>
                  <br />
                  <span className="bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 bg-clip-text text-transparent">
                    Structured Digital
                  </span>
                  <br />
                  <span className="text-white">Systems That Drive Growth</span>
                </h1>
                
                {/* Dark underline */}
                <div className="flex justify-center">
                  <div className="w-24 h-px bg-gradient-to-r from-transparent via-blue-500/50 to-transparent rounded-full" />
                </div>
              </div>
              
              <p className="text-gray-400 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
                Not just websites. Not just automation. We build complete growth systems engineered for scale.
              </p>
              
              {/* Dark CTA buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
                <button className="group relative inline-flex items-center justify-center gap-2 px-8 py-3 rounded-full bg-white text-black font-medium transition-all duration-300 hover:gap-3 hover:scale-105">
                  Get Started
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </button>
                <button className="inline-flex items-center justify-center gap-2 px-8 py-3 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm text-white font-medium transition-all duration-300 hover:bg-white/10 hover:border-white/20">
                  Watch Demo
                  <Zap className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          </div>

          {/* ============================================ */}
          {/* THREE PILLARS GRID - Dark Cards */}
          {/* ============================================ */}
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 mb-24 lg:mb-32">
            
            {[
              {
                icon: <Layout className="w-6 h-6" strokeWidth={1.5} />,
                title: "Web Development",
                description: "Conversion-focused architecture designed to turn visitors into qualified leads.",
                color: "blue",
                borderColor: "border-blue-500/20",
                hoverBorder: "hover:border-blue-500/40",
                iconBg: "bg-blue-500/10",
                iconColor: "text-blue-400",
                gradient: "from-blue-500/10 via-transparent to-transparent",
                features: [
                  { icon: <Shield className="w-3 h-3" />, text: "Performance Optimized", color: "text-blue-400/60" },
                  { icon: <Globe className="w-3 h-3" />, text: "SEO Ready", color: "text-blue-400/60" },
                  { icon: <Layout className="w-3 h-3" />, text: "Responsive Design", color: "text-blue-400/60" }
                ]
              },
              {
                icon: <Bot className="w-6 h-6" strokeWidth={1.5} />,
                title: "AI Automation",
                description: "Automate repetitive operations so your business scales without chaos.",
                color: "indigo",
                borderColor: "border-indigo-500/20",
                hoverBorder: "hover:border-indigo-500/40",
                iconBg: "bg-indigo-500/10",
                iconColor: "text-indigo-400",
                gradient: "from-indigo-500/10 via-transparent to-transparent",
                features: [
                  { icon: <Zap className="w-3 h-3" />, text: "Workflow Automation", color: "text-indigo-400/60" },
                  { icon: <Infinity className="w-3 h-3" />, text: "Smart Integrations", color: "text-indigo-400/60" },
                  { icon: <BarChart3 className="w-3 h-3" />, text: "Real-time Analytics", color: "text-indigo-400/60" }
                ]
              },
              {
                icon: <BarChart3 className="w-6 h-6" strokeWidth={1.5} />,
                title: "System Thinking",
                description: "Every part works together as one cohesive growth engine.",
                color: "purple",
                borderColor: "border-purple-500/20",
                hoverBorder: "hover:border-purple-500/40",
                iconBg: "bg-purple-500/10",
                iconColor: "text-purple-400",
                gradient: "from-purple-500/10 via-transparent to-transparent",
                features: [
                  { icon: <Infinity className="w-3 h-3" />, text: "Holistic Approach", color: "text-purple-400/60" },
                  { icon: <Rocket className="w-3 h-3" />, text: "Scalable Architecture", color: "text-purple-400/60" },
                  { icon: <BarChart3 className="w-3 h-3" />, text: "Data-Driven", color: "text-purple-400/60" }
                ]
              }
            ].map((pillar, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -8 }}
                className="group relative"
              >
                {/* Dark glowing border effect on hover */}
                <div className={`absolute -inset-[1px] bg-gradient-to-br ${pillar.gradient} rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition duration-500`} />
                
                {/* Dark card with glassmorphism */}
                <div className={`relative h-full rounded-2xl border ${pillar.borderColor} ${pillar.hoverBorder} bg-black/40 backdrop-blur-sm p-6 lg:p-8 transition-all duration-300 hover:bg-black/60 shadow-xl`}>
                  
                  {/* Dark icon container */}
                  <div className={`relative w-14 h-14 rounded-2xl ${pillar.iconBg} border ${pillar.borderColor} mb-6 flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                    <div className={pillar.iconColor}>
                      {pillar.icon}
                    </div>
                  </div>
                  
                  {/* Dark typography - white text */}
                  <h3 className="text-xl lg:text-2xl font-bold text-white mb-3 group-hover:text-white/90 transition-colors">
                    {pillar.title}
                  </h3>
                  
                  <p className="text-gray-400 leading-relaxed mb-6">
                    {pillar.description}
                  </p>
                  
                  {/* Dark feature list */}
                  <div className="space-y-3 pt-4 border-t border-white/10">
                    {pillar.features.map((feature, i) => (
                      <div key={i} className="flex items-center gap-2 text-sm text-gray-500 group-hover:text-gray-400 transition-colors">
                        <div className={feature.color}>
                          {feature.icon}
                        </div>
                        <span>{feature.text}</span>
                      </div>
                    ))}
                  </div>
                  
                  {/* Dark learn more indicator */}
                  <div className="absolute bottom-6 right-6 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-2 group-hover:translate-x-0">
                    <div className={`w-8 h-8 rounded-full ${pillar.iconBg} flex items-center justify-center group-hover:bg-opacity-20 transition-colors`}>
                      <ArrowRight className={`w-4 h-4 ${pillar.iconColor}`} />
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* ============================================ */}
          {/* BOTTOM STATEMENT - Dark Theme Gradient */}
          {/* ============================================ */}
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <div className="inline-block relative">
              <p className="text-2xl sm:text-3xl lg:text-4xl font-light text-gray-500 mb-4">
                Beautiful Design Means Nothing
              </p>
              
              {/* Dark multi-layer gradient text */}
              <div className="relative group">
                {/* Dark animated gradient glow */}
                <div className="absolute -inset-4 bg-gradient-to-r from-blue-500/20 via-indigo-500/20 to-purple-500/20 blur-2xl opacity-0 group-hover:opacity-100 transition duration-700" />
                
                {/* Premium gradient text - stays vibrant on dark */}
                <h2 className="relative z-10 bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 bg-clip-text text-center text-5xl sm:text-6xl lg:text-7xl xl:text-8xl leading-none font-bold tracking-tighter whitespace-pre-wrap text-transparent animate-gradient bg-[length:200%_auto]">
                  Without Business Results
                </h2>
                
                {/* Dark decorative elements */}
                <div className="absolute -left-12 top-1/2 -translate-y-1/2 w-px h-12 bg-gradient-to-b from-transparent via-blue-500/30 to-transparent hidden lg:block" />
                <div className="absolute -right-12 top-1/2 -translate-y-1/2 w-px h-12 bg-gradient-to-b from-transparent via-blue-500/30 to-transparent hidden lg:block" />
              </div>
              
              {/* Dark bottom decoration */}
              <div className="flex justify-center gap-2 mt-8">
                <div className="w-2 h-2 rounded-full bg-blue-500/40" />
                <div className="w-2 h-2 rounded-full bg-indigo-500/40" />
                <div className="w-2 h-2 rounded-full bg-purple-500/40" />
              </div>
            </div>
          </motion.div>

        </div>
        
        {/* ============================================ */}
        {/* DARK DECORATIVE CORNER ELEMENTS */}
        {/* ============================================ */}
        
        {/* Dark corner accents */}
        <div className="absolute top-0 left-0 w-32 h-32 border-l border-t border-white/5 rounded-tl-2xl pointer-events-none z-[1]" />
        <div className="absolute top-0 right-0 w-32 h-32 border-r border-t border-white/5 rounded-tr-2xl pointer-events-none z-[1]" />
        <div className="absolute bottom-0 left-0 w-32 h-32 border-l border-b border-white/5 rounded-bl-2xl pointer-events-none z-[1]" />
        <div className="absolute bottom-0 right-0 w-32 h-32 border-r border-b border-white/5 rounded-br-2xl pointer-events-none z-[1]" />
        
      </section>
      </div>
    </SectionWrapper>
  );
}