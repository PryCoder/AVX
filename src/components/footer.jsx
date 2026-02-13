import React from 'react';
import { Badge } from "../components/ui/badge";
import { 
  Sparkles, 
  Twitter, 
  Linkedin, 
  Github, 
  Instagram,
  Heart,
  Moon
} from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  const navigation = {
    studio: [
      { name: 'Our Story', href: '#' },
      { name: 'Projects', href: '#' },
      { name: 'Process', href: '#' },
      { name: 'Studio', href: '#' },
    ],
    services: [
      { name: 'Webflow Development', href: '#' },
      { name: 'UI/UX Design', href: '#' },
      { name: 'Technical SEO', href: '#' },
      { name: 'Digital Strategy', href: '#' },
    ],
    resources: [
      { name: 'Case Studies', href: '#' },
      { name: 'Blog', href: '#' },
      { name: 'Whitepapers', href: '#' },
      { name: 'Documentation', href: '#' },
    ],
    social: [
      { name: 'Twitter', icon: Twitter, href: '#' },
      { name: 'LinkedIn', icon: Linkedin, href: '#' },
      { name: 'GitHub', icon: Github, href: '#' },
      { name: 'Instagram', icon: Instagram, href: '#' },
    ]
  };

  return (
    <footer className="relative bg-[#0a0a0a] border-t border-stone-800/60 w-full overflow-x-hidden">
      {/* Full width background wrapper - this ensures background spans entire viewport */}
      <div className="absolute inset-0 w-screen bg-[#0a0a0a] left-1/2 right-1/2 -ml-[50vw] -mr-[50vw]">
        {/* Dark Artistic Background Elements */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 -left-40 w-[600px] h-[600px] bg-amber-500/5 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 -right-40 w-[700px] h-[700px] bg-indigo-500/5 rounded-full blur-3xl"></div>
          <div className="absolute top-1/2 left-1/3 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-rose-500/5 rounded-full blur-3xl"></div>
          <div className="absolute inset-0 bg-[radial-gradient(#f5f5f510_1px,transparent_1px)] [background-size:24px_24px] opacity-20"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/30"></div>
        </div>
      </div>

      {/* Content - Centered with max-width */}
      <div className="relative max-w-7xl mx-auto px-6 sm:px-8 md:px-12 lg:px-16 xl:px-20 py-16 sm:py-20 lg:py-24">
        
        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 mb-12 lg:mb-16">
          
          {/* Brand Column */}
          <div className="lg:col-span-5 space-y-6">
            <Badge 
              variant="outline" 
              className="border-stone-700/70 bg-stone-900/60 backdrop-blur-sm px-4 py-1.5 rounded-full"
            >
              <Sparkles className="w-3.5 h-3.5 mr-2 text-stone-400" />
              <span className="text-[10px] font-medium tracking-[0.2em] text-stone-400 uppercase">
                EST. 2020
              </span>
            </Badge>
            
            <div>
              <h2 className="font-serif text-5xl sm:text-6xl lg:text-7xl xl:text-8xl italic text-stone-100 leading-tight">
               AVXONIA
              </h2>
              <div className="flex items-center gap-3 mt-4">
                <span className="text-sm text-stone-500 font-light">——</span>
                <p className="text-base text-stone-400 font-light tracking-wide">
                  Crafting digital experiences with intention
                </p>
              </div>
            </div>
            
            <p className="text-sm text-stone-400/80 leading-relaxed max-w-md font-light">
              We believe in the alchemy of design and technology — 
              transforming complex ideas into elegant, human-centered solutions 
              that resonate and endure.
            </p>
            
            <div className="flex items-center gap-8 pt-4">
              <div>
                <span className="font-serif text-3xl text-stone-100">12+</span>
                <p className="text-[10px] uppercase tracking-wider text-stone-500 mt-1.5">Years</p>
              </div>
              <div className="w-px h-10 bg-stone-800/80"></div>
              <div>
                <span className="font-serif text-3xl text-stone-100">50+</span>
                <p className="text-[10px] uppercase tracking-wider text-stone-500 mt-1.5">Projects</p>
              </div>
              <div className="w-px h-10 bg-stone-800/80"></div>
              <div>
                <span className="font-serif text-3xl text-stone-100">∞</span>
                <p className="text-[10px] uppercase tracking-wider text-stone-500 mt-1.5">Curiosity</p>
              </div>
            </div>
          </div>
          
          {/* Navigation Columns */}
          <div className="lg:col-span-6 lg:col-start-7 grid grid-cols-2 md:grid-cols-3 gap-10 lg:gap-16">
            
            {/* Studio */}
            <div className="space-y-5">
              <h3 className="font-serif text-base italic text-stone-200 border-b border-stone-800/80 pb-2 inline-block">
                Studio
              </h3>
              <ul className="space-y-3.5">
                {navigation.studio.map((item) => (
                  <li key={item.name}>
                    <a 
                      href={item.href} 
                      className="text-sm text-stone-400 hover:text-stone-200 transition-colors duration-300 flex items-center gap-2 group"
                    >
                      <span className="w-0 group-hover:w-2 h-0.5 bg-stone-400 rounded-full transition-all duration-300"></span>
                      {item.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            
            {/* Services */}
            <div className="space-y-5">
              <h3 className="font-serif text-base italic text-stone-200 border-b border-stone-800/80 pb-2 inline-block">
                Services
              </h3>
              <ul className="space-y-3.5">
                {navigation.services.map((item) => (
                  <li key={item.name}>
                    <a 
                      href={item.href} 
                      className="text-sm text-stone-400 hover:text-stone-200 transition-colors duration-300 flex items-center gap-2 group"
                    >
                      <span className="w-0 group-hover:w-2 h-0.5 bg-stone-400 rounded-full transition-all duration-300"></span>
                      {item.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            
            {/* Resources */}
            <div className="space-y-5 col-span-2 md:col-span-1">
              <h3 className="font-serif text-base italic text-stone-200 border-b border-stone-800/80 pb-2 inline-block">
                Resources
              </h3>
              <ul className="space-y-3.5">
                {navigation.resources.map((item) => (
                  <li key={item.name}>
                    <a 
                      href={item.href} 
                      className="text-sm text-stone-400 hover:text-stone-200 transition-colors duration-300 flex items-center gap-2 group"
                    >
                      <span className="w-0 group-hover:w-2 h-0.5 bg-stone-400 rounded-full transition-all duration-300"></span>
                      {item.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Decorative Separator */}
        <div className="relative py-10">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-stone-800/60"></div>
          </div>
          <div className="relative flex justify-center">
            <div className="bg-[#0a0a0a] px-6 flex items-center gap-3">
              <span className="w-2 h-2 rounded-full bg-amber-500/40"></span>
              <span className="w-2 h-2 rounded-full bg-indigo-500/40"></span>
              <span className="w-2 h-2 rounded-full bg-rose-500/40"></span>
            </div>
          </div>
        </div>
        
        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3 text-sm text-stone-500">
            <span>© {currentYear}</span>
            <span className="text-stone-700">✦</span>
            <span className="font-serif italic text-stone-400"> AVXONIA</span>
            <span className="text-stone-700">✦</span>
            <span className="text-stone-500 font-light">All rights reserved</span>
          </div>
          
          <div className="flex items-center gap-4">
            <span className="text-[10px] uppercase tracking-[0.25em] text-stone-500 font-light">
              Connect
            </span>
            {navigation.social.map((item) => {
              const Icon = item.icon;
              return (
                <a
                  key={item.name}
                  href={item.href}
                  className="group relative w-9 h-9 rounded-full bg-stone-900/80 hover:bg-stone-100 flex items-center justify-center transition-all duration-500 border border-stone-800 hover:border-stone-400"
                  aria-label={item.name}
                >
                  <Icon className="w-4 h-4 text-stone-400 group-hover:text-stone-900 transition-colors duration-500" />
                  <span className="absolute -top-9 left-1/2 -translate-x-1/2 bg-stone-900 text-stone-100 text-[10px] px-2.5 py-1.5 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap border border-stone-700">
                    {item.name}
                  </span>
                </a>
              );
            })}
          </div>
        </div>
        
        {/* Signature */}
        <div className="mt-10 pt-8 flex justify-end border-t border-stone-800/40">
          <div className="flex items-center gap-3">
            <Heart className="w-3.5 h-3.5 text-stone-600" />
            <span className="text-[9px] uppercase tracking-[0.3em] text-stone-600 font-light">
              Designed with intention in the dark
            </span>
            <Moon className="w-3.5 h-3.5 text-stone-600 ml-1" />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;