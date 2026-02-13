import React, { useState, useEffect, useRef } from "react";
import {
  Sparkles,
  ArrowRight,
  ChevronDown,
  Github,
  Twitter,
  Linkedin,
  Instagram,
  Heart,
  Lightbulb,
  Target,
  Users,
  Quote,
  Eye,
  Wind,
  Compass,
  Feather,
  Infinity,
  Droplet,
  Leaf,
  Sparkle,
  Zap,
  Globe,
  Rocket,
  Award,
  Star,
  Menu,
  X
} from "lucide-react";

// Custom cursor component (only for desktop)
const CustomCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [hidden, setHidden] = useState(true);
  const [clicked, setClicked] = useState(false);
  const [linkHovered, setLinkHovered] = useState(false);
  const [isTouch, setIsTouch] = useState(false);

  useEffect(() => {
    setIsTouch('ontouchstart' in window);
    if (isTouch) return;

    const updatePosition = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
      setHidden(false);
    };

    const handleMouseDown = () => setClicked(true);
    const handleMouseUp = () => setClicked(false);
    const handleLinkHoverStart = () => setLinkHovered(true);
    const handleLinkHoverEnd = () => setLinkHovered(false);

    window.addEventListener('mousemove', updatePosition);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);

    document.querySelectorAll('a, button, .cursor-pointer').forEach(el => {
      el.addEventListener('mouseenter', handleLinkHoverStart);
      el.addEventListener('mouseleave', handleLinkHoverEnd);
    });

    return () => {
      window.removeEventListener('mousemove', updatePosition);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      document.querySelectorAll('a, button, .cursor-pointer').forEach(el => {
        el.removeEventListener('mouseenter', handleLinkHoverStart);
        el.removeEventListener('mouseleave', handleLinkHoverEnd);
      });
    };
  }, [isTouch]);

  if (hidden || isTouch) return null;

  return (
    <div
      className="fixed pointer-events-none z-[9999] mix-blend-difference"
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        transform: 'translate(-50%, -50%)'
      }}
    >
      <div className={`
        relative transition-all duration-200
        ${clicked ? 'scale-75' : linkHovered ? 'scale-150' : 'scale-100'}
      `}>
        <div className="w-4 h-4 md:w-6 md:h-6 rounded-full bg-white opacity-80 animate-pulse" />
        <div className="absolute inset-0 w-4 h-4 md:w-6 md:h-6 rounded-full border border-white animate-ping" />
      </div>
    </div>
  );
};

// Mobile menu component
const MobileMenu = () => {
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    { id: 'philosophy', label: 'Philosophy' },
    { id: 'team', label: 'Team' },
    { id: 'journey', label: 'Journey' },
    { id: 'values', label: 'Values' }
  ];

  const scrollToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setIsOpen(false);
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-4 right-4 z-50 lg:hidden bg-white/90 backdrop-blur-md p-2.5 rounded-full shadow-lg"
        aria-label="Menu"
      >
        {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
      </button>

      {isOpen && (
        <div className="fixed inset-0 bg-stone-900/95 backdrop-blur-lg z-40 lg:hidden flex items-center justify-center">
          <div className="flex flex-col items-center gap-8">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className="text-2xl text-white hover:text-stone-300 transition-colors clash-font"
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

// Parallax background
const ParallaxBackground = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-stone-50 via-white to-stone-100" />
      
      <div 
        className="absolute top-10 left-10 md:top-20 md:left-20 w-48 h-48 md:w-96 md:h-96 bg-stone-200/30 rounded-full blur-3xl animate-float"
        style={{
          transform: `translate(${mousePosition.x * -0.5}px, ${mousePosition.y * -0.5}px)`
        }}
      />
      <div 
        className="absolute bottom-10 right-10 md:bottom-20 md:right-20 w-64 h-64 md:w-[30rem] md:h-[30rem] bg-stone-300/20 rounded-full blur-3xl animate-float-delayed"
        style={{
          transform: `translate(${mousePosition.x * 0.3}px, ${mousePosition.y * 0.3}px)`
        }}
      />
      
      {[...Array(30)].map((_, i) => (
        <div
          key={i}
          className="absolute w-0.5 h-0.5 md:w-1 md:h-1 bg-stone-400/20 rounded-full animate-particle"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 10}s`,
            animationDuration: `${15 + Math.random() * 20}s`
          }}
        />
      ))}
    </div>
  );
};

// Scroll progress indicator
const ScrollProgress = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const updateProgress = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrolled = (window.scrollY / scrollHeight) * 100;
      setProgress(scrolled);
    };

    window.addEventListener('scroll', updateProgress);
    return () => window.removeEventListener('scroll', updateProgress);
  }, []);

  return (
    <div className="fixed top-0 left-0 w-full h-0.5 z-50">
      <div 
        className="h-full bg-gradient-to-r from-stone-800 via-stone-600 to-stone-800 transition-all duration-300"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
};

// Floating navigation (desktop only)
const FloatingNav = ({ sections }) => {
  const [activeSection, setActiveSection] = useState('hero');
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 100;
      
      for (const section of sections) {
        const element = document.getElementById(section.id);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section.id);
            break;
          }
        }
      }

      setIsVisible(window.scrollY > 500);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [sections]);

  if (!isVisible) return null;

  return (
    <div className="fixed right-4 md:right-8 top-1/2 -translate-y-1/2 z-40 hidden lg:block">
      <div className="flex flex-col gap-3 md:gap-4">
        {sections.map((section) => (
          <button
            key={section.id}
            onClick={() => {
              document.getElementById(section.id)?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="group relative"
            aria-label={`Go to ${section.label}`}
          >
            <div className={`
              w-2 h-2 md:w-3 md:h-3 rounded-full transition-all duration-500
              ${activeSection === section.id 
                ? 'bg-stone-800 scale-150' 
                : 'bg-stone-300 group-hover:bg-stone-400'}
            `} />
            <span className="absolute right-full mr-2 md:mr-4 px-2 md:px-3 py-1 bg-stone-800 text-white text-[10px] md:text-xs rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
              {section.label}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};

// Hero Section
const HeroSection = () => {
  const [isTextVisible, setIsTextVisible] = useState(false);
  const heroRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsTextVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (heroRef.current) observer.observe(heroRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="hero" ref={heroRef} className="relative min-h-screen flex items-center justify-center overflow-hidden px-4">
      <div className="absolute inset-0">
        {[...Array(3)].map((_, i) => (
          <div
            key={i}
            className="absolute w-[200%] h-[200%] border border-stone-200 rounded-full animate-spin-slow"
            style={{
              left: '-50%',
              top: '-50%',
              animationDelay: `${i * 0.5}s`,
              animationDuration: `${20 + i * 5}s`
            }}
          />
        ))}
      </div>

      <div className="relative z-10 text-center max-w-4xl mx-auto">
        <div className={`
          transform transition-all duration-1000
          ${isTextVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}
        `}>
          <div className="flex items-center justify-center gap-2 mb-4 md:mb-6">
            <Sparkle className="w-4 h-4 md:w-5 md:h-5 text-stone-600 animate-sparkle" />
            <span className="text-xs md:text-sm tracking-[0.3em] text-stone-600 sfpro-font">DIGITAL STUDIO</span>
            <Sparkle className="w-4 h-4 md:w-5 md:h-5 text-stone-600 animate-sparkle-delayed" />
          </div>

          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-light mb-4 md:mb-8 clash-font">
            <span className="block animate-text-reveal">WE ARE</span>
            <span className="block font-bold text-stone-800 animate-text-reveal [animation-delay:0.2s]">NEXUS</span>
          </h1>

          <p className="text-base sm:text-lg md:text-xl text-stone-600 mb-8 md:mb-12 max-w-2xl mx-auto px-4 sfpro-font animate-text-reveal [animation-delay:0.4s]">
            A website agency crafting digital experiences that breathe life into brands. 
            We build more than websites—we build connections.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-text-reveal [animation-delay:0.6s]">
            <button 
              onClick={() => document.getElementById('philosophy')?.scrollIntoView({ behavior: 'smooth' })}
              className="group relative inline-flex items-center gap-2 px-6 md:px-8 py-3 md:py-4 bg-stone-800 text-white rounded-full overflow-hidden transition-all duration-500 hover:pr-8 md:hover:pr-12 text-sm md:text-base sfpro-font"
            >
              <span className="relative z-10">Discover our world</span>
              <ArrowRight className="relative z-10 w-3 h-3 md:w-4 md:h-4 group-hover:translate-x-2 transition-transform duration-300" />
              <div className="absolute inset-0 bg-stone-700 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
            </button>
            
            <a 
              href="#team"
              className="text-stone-600 hover:text-stone-800 transition-colors text-sm md:text-base sfpro-font"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById('team')?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              Meet the team
            </a>
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <ChevronDown className="w-5 h-5 md:w-6 md:h-6 text-stone-400" />
      </div>
    </section>
  );
};

// Philosophy Section
const PhilosophySection = () => {
  const [activeWord, setActiveWord] = useState(null);
  const philosophyRef = useRef(null);

  const words = [
    { text: "purposeful", icon: Target, color: "bg-stone-800 text-white" },
    { text: "human", icon: Heart, color: "bg-rose-100 text-rose-800" },
    { text: "innovative", icon: Lightbulb, color: "bg-amber-100 text-amber-800" },
    { text: "timeless", icon: Infinity, color: "bg-indigo-100 text-indigo-800" },
    { text: "impactful", icon: Zap, color: "bg-emerald-100 text-emerald-800" }
  ];

  const quotes = [
    {
      text: "We don't just build websites. We build digital ecosystems where brands thrive and users connect.",
      author: "— Studio Manifesto"
    },
    {
      text: "Every line of code is written with intention. Every pixel placed with purpose.",
      author: "— Our Promise"
    }
  ];

  return (
    <section id="philosophy" ref={philosophyRef} className="py-16 md:py-20 lg:py-24 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light mb-4 md:mb-6 clash-font">
            <span className="block">Our</span>
            <span className="block font-bold text-stone-800">Philosophy</span>
          </h2>
          <div className="w-16 md:w-24 h-px bg-stone-300 mx-auto" />
        </div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          <div className="space-y-8 md:space-y-10">
            <p className="text-lg md:text-xl leading-relaxed text-stone-700 sfpro-font">
              We believe websites should be more than functional—they should be transformative. 
              Every project is a partnership, every design a conversation, every launch a new beginning.
            </p>
            
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 md:gap-4">
              {words.map((word, index) => {
                const Icon = word.icon;
                return (
                  <div
                    key={word.text}
                    className={`
                      group flex flex-col items-center gap-2 p-3 md:p-4 rounded-xl md:rounded-2xl cursor-pointer
                      transition-all duration-500 transform
                      ${activeWord === index ? `${word.color} scale-105 shadow-lg` : 'bg-stone-50 hover:bg-stone-100'}
                    `}
                    onMouseEnter={() => setActiveWord(index)}
                    onMouseLeave={() => setActiveWord(null)}
                  >
                    <Icon className="w-5 h-5 md:w-6 md:h-6" />
                    <span className="text-xs md:text-sm font-medium capitalize sfpro-font">{word.text}</span>
                  </div>
                );
              })}
            </div>

            <div className="relative pt-6 md:pt-8">
              {quotes.map((quote, idx) => (
                <div key={idx} className="mb-6 last:mb-0">
                  <Quote className="w-6 h-6 md:w-8 md:h-8 text-stone-300 mb-2" />
                  <p className="text-base md:text-lg italic text-stone-600 sfpro-font">{quote.text}</p>
                  <p className="text-xs md:text-sm text-stone-500 mt-2">{quote.author}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="relative h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px]">
            <div className="absolute inset-0 bg-stone-100 rounded-2xl md:rounded-3xl overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-stone-200/50 to-transparent" />
              
              {[...Array(30)].map((_, i) => (
                <div
                  key={i}
                  className="absolute w-0.5 h-0.5 md:w-1 md:h-1 bg-stone-400 rounded-full animate-float-particle"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                    animationDelay: `${i * 0.1}s`,
                    animationDuration: `${3 + Math.random() * 4}s`
                  }}
                />
              ))}

              <div className="absolute inset-0 flex items-center justify-center p-6">
                <div className="text-center">
                  <Globe className="w-16 h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 text-stone-800/20 mx-auto mb-4 animate-pulse-slow" />
                  <div className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-stone-800/10 clash-font">
                    {activeWord !== null ? words[activeWord].text : 'create'}
                  </div>
                  <div className="mt-6 text-xs md:text-sm text-stone-500 sfpro-font">
                    {activeWord !== null 
                      ? `We design ${words[activeWord].text} experiences` 
                      : 'Hover over the words'}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// Team Section
const TeamSection = () => {
  const [hoveredCard, setHoveredCard] = useState(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const team = [
    {
      name: "Alex Rivera",
      role: "Founder & Creative Director",
      bio: "Former architect turned digital artist. Alex leads our creative vision, ensuring every project tells a compelling story.",
      quote: "Great design is invisible. Great experiences are unforgettable.",
      icon: Compass,
      color: "from-stone-800 to-stone-600",
      expertise: ["Strategy", "Creative Direction", "Brand Building"],
      social: { twitter: "#", linkedin: "#", github: "#" }
    },
    {
      name: "Maya Chen",
      role: "Lead Experience Designer",
      bio: "Maya brings a background in cognitive science to create websites that feel intuitive and emotionally resonant.",
      quote: "We don't just design screens. We design moments.",
      icon: Eye,
      color: "from-stone-700 to-stone-500",
      expertise: ["UX Design", "Interaction", "Prototyping"],
      social: { twitter: "#", linkedin: "#", github: "#" }
    },
    {
      name: "Kai Nakamura",
      role: "Creative Technologist",
      bio: "Kai bridges the gap between imagination and implementation, bringing cutting-edge ideas to life.",
      quote: "Technology should feel like magic, not mechanics.",
      icon: Zap,
      color: "from-stone-600 to-stone-400",
      expertise: ["Development", "Animation", "Performance"],
      social: { twitter: "#", linkedin: "#", github: "#" }
    }
  ];

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 15,
        y: (e.clientY / window.innerHeight - 0.5) * 15
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <section id="team" className="py-16 md:py-20 lg:py-24 px-4 bg-stone-50/50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light mb-4 md:mb-6 clash-font">
            <span className="block">Meet the</span>
            <span className="block font-bold text-stone-800">Team</span>
          </h2>
          <div className="w-16 md:w-24 h-px bg-stone-300 mx-auto" />
          <p className="mt-4 text-sm md:text-base text-stone-600 max-w-2xl mx-auto sfpro-font">
            Three passionate minds. One shared vision. Infinite possibilities.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {team.map((member, index) => {
            const Icon = member.icon;
            const isHovered = hoveredCard === index;

            return (
              <div
                key={member.name}
                className="group"
                onMouseEnter={() => setHoveredCard(index)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                <div 
                  className={`
                    relative bg-white rounded-2xl md:rounded-3xl p-6 md:p-8 shadow-lg
                    transition-all duration-500
                    ${isHovered ? 'transform -translate-y-2 shadow-2xl' : ''}
                  `}
                  style={{
                    transform: isHovered 
                      ? `perspective(1000px) rotateY(${mousePosition.x * 0.3}deg) rotateX(${mousePosition.y * -0.3}deg)`
                      : ''
                  }}
                >
                  <div className={`
                    w-16 h-16 md:w-20 md:h-20 rounded-xl md:rounded-2xl bg-gradient-to-br ${member.color} 
                    flex items-center justify-center mb-4 md:mb-6
                    transform transition-all duration-500
                    ${isHovered ? 'scale-110 -rotate-6' : ''}
                  `}>
                    <Icon className="w-6 h-6 md:w-8 md:h-8 text-white" />
                  </div>

                  <h3 className="text-lg md:text-xl lg:text-2xl font-bold mb-1 clash-font">{member.name}</h3>
                  <p className="text-xs md:text-sm text-stone-500 mb-3 md:mb-4 sfpro-font">{member.role}</p>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {member.expertise.map((skill) => (
                      <span 
                        key={skill} 
                        className="px-2 py-1 bg-stone-100 text-stone-600 text-[10px] md:text-xs rounded-full"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>

                  <p className="text-xs md:text-sm text-stone-600 mb-4 leading-relaxed sfpro-font">
                    {member.bio}
                  </p>

                  <div className="relative">
                    <Quote className="absolute -top-2 -left-2 w-3 h-3 md:w-4 md:h-4 text-stone-300 rotate-180" />
                    <p className="text-[10px] md:text-xs italic text-stone-500 pl-4 md:pl-6">
                      {member.quote}
                    </p>
                  </div>

                  <div className="absolute top-4 right-4 flex gap-1 md:gap-2">
                    {[Twitter, Linkedin, Github].map((Social, i) => (
                      <a
                        key={i}
                        href={member.social[Object.keys(member.social)[i]]}
                        className="w-6 h-6 md:w-7 md:h-7 lg:w-8 lg:h-8 rounded-full bg-stone-100 flex items-center justify-center hover:bg-stone-800 hover:text-white transition-all duration-300"
                        aria-label={`${member.name}'s ${Social.name}`}
                      >
                        <Social className="w-3 h-3 md:w-3.5 md:h-3.5" />
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-12 md:mt-16 lg:mt-20 relative h-16 md:h-20 lg:h-24">
          <div className="absolute inset-0 flex items-center justify-around">
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className="w-0.5 md:w-1 bg-stone-200 rounded-full animate-energy-wave"
                style={{
                  height: '100%',
                  animationDelay: `${i * 0.1}s`
                }}
              >
                <div className="w-full h-1/3 bg-gradient-to-t from-stone-800 to-transparent rounded-full animate-energy-pulse" 
                  style={{ animationDelay: `${i * 0.15}s` }}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

// Journey Section
const JourneySection = () => {
  const [activeMilestone, setActiveMilestone] = useState(null);

  const milestones = [
    {
      year: "2020",
      title: "The Beginning",
      description: "Two friends with a shared vision founded Nexus, starting with local businesses.",
      icon: Star,
      color: "from-stone-800 to-stone-700",
      stats: "5+ clients"
    },
    {
      year: "2022",
      title: "First Growth",
      description: "Welcomed Maya to the team. Expanded from websites to complete digital experiences.",
      icon: Award,
      color: "from-stone-700 to-stone-600",
      stats: "20+ projects"
    },
    {
      year: "2024",
      title: "Finding Our Voice",
      description: "Developed our signature approach: human-centered, technology-driven design.",
      icon: Rocket,
      color: "from-stone-600 to-stone-500",
      stats: "50+ clients"
    },
    {
      year: "2026",
      title: "Looking Forward",
      description: "Pushing boundaries, exploring new frontiers in web experiences.",
      icon: Globe,
      color: "from-stone-500 to-stone-400",
      stats: "Global reach"
    }
  ];

  return (
    <section id="journey" className="py-16 md:py-20 lg:py-24 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light mb-4 md:mb-6 clash-font">
            <span className="block">Our</span>
            <span className="block font-bold text-stone-800">Journey</span>
          </h2>
          <div className="w-16 md:w-24 h-px bg-stone-300 mx-auto" />
        </div>

        <div className="relative">
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-stone-200" />

          {milestones.map((milestone, index) => {
            const Icon = milestone.icon;
            const isEven = index % 2 === 0;
            const isActive = activeMilestone === index;

            return (
              <div
                key={milestone.year}
                className={`
                  relative flex mb-12 md:mb-16 last:mb-0
                  ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'}
                `}
                onMouseEnter={() => setActiveMilestone(index)}
                onMouseLeave={() => setActiveMilestone(null)}
              >
                <div className={`
                  w-[calc(100%-2rem)] md:w-1/2 ml-8 md:ml-0
                  ${isEven ? 'md:pr-8 lg:pr-12' : 'md:pl-8 lg:pl-12'}
                `}>
                  <div className={`
                    relative bg-white rounded-xl md:rounded-2xl p-4 md:p-6 shadow-md
                    transition-all duration-500
                    ${isActive ? 'shadow-2xl -translate-y-1' : ''}
                  `}>
                    <div className={`
                      absolute -top-3 ${isEven ? 'right-4' : 'left-4'} md:${isEven ? 'right-6' : 'left-6'}
                      px-3 py-1 bg-gradient-to-r ${milestone.color} text-white rounded-full
                      text-xs font-medium
                    `}>
                      {milestone.year}
                    </div>

                    <div className="flex items-start gap-3 mt-4">
                      <div className={`
                        w-10 h-10 md:w-12 md:h-12 rounded-xl bg-gradient-to-br ${milestone.color} 
                        flex items-center justify-center shrink-0
                        transition-all duration-500
                        ${isActive ? 'rotate-6 scale-110' : ''}
                      `}>
                        <Icon className="w-5 h-5 md:w-6 md:h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="text-base md:text-lg font-bold mb-1 clash-font">{milestone.title}</h3>
                        <p className="text-xs md:text-sm text-stone-600 mb-2 sfpro-font">{milestone.description}</p>
                        <span className="text-[10px] md:text-xs text-stone-500 bg-stone-100 px-2 py-1 rounded-full">
                          {milestone.stats}
                        </span>
                      </div>
                    </div>

                    <div className={`
                      absolute bottom-2 right-2 w-4 h-4 border-b-2 border-r-2 border-stone-200
                      transition-all duration-500
                      ${isActive ? 'w-6 h-6 border-stone-400' : ''}
                    `} />
                  </div>
                </div>

                <div className="absolute left-4 md:left-1/2 -translate-x-1/2 w-4 h-4 md:w-5 md:h-5">
                  <div className={`
                    w-full h-full rounded-full bg-white border-2 border-stone-300
                    transition-all duration-500
                    ${isActive ? 'scale-125 border-stone-800' : ''}
                  `}>
                    <div className={`
                      absolute inset-1 rounded-full bg-stone-800
                      transition-all duration-500
                      ${isActive ? 'scale-125' : 'scale-0'}
                    `} />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

// Values Section
const ValuesSection = () => {
  const [activeValue, setActiveValue] = useState(null);

  const values = [
    {
      icon: Heart,
      title: "Human First",
      desc: "We design for people, not screens. Every decision starts with human needs.",
      color: "from-rose-500/20 to-rose-500/5"
    },
    {
      icon: Target,
      title: "Purpose Driven",
      desc: "Every element serves a goal. No fluff. No distractions. Just results.",
      color: "from-blue-500/20 to-blue-500/5"
    },
    {
      icon: Feather,
      title: "Light & Fast",
      desc: "Beauty in simplicity. Websites that load instantly and feel effortless.",
      color: "from-stone-500/20 to-stone-500/5"
    },
    {
      icon: Infinity,
      title: "Future Ready",
      desc: "Built to evolve. Your website grows as your business grows.",
      color: "from-purple-500/20 to-purple-500/5"
    },
    {
      icon: Leaf,
      title: "Sustainable",
      desc: "Green hosting. Efficient code. Better for the planet.",
      color: "from-emerald-500/20 to-emerald-500/5"
    },
    {
      icon: Sparkle,
      title: "Delightful",
      desc: "Moments of joy. Small surprises. Experiences you remember.",
      color: "from-amber-500/20 to-amber-500/5"
    }
  ];

  return (
    <section id="values" className="py-16 md:py-20 lg:py-24 px-4 bg-stone-50/50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light mb-4 md:mb-6 clash-font">
            <span className="block">Our</span>
            <span className="block font-bold text-stone-800">Values</span>
          </h2>
          <div className="w-16 md:w-24 h-px bg-stone-300 mx-auto" />
          <p className="mt-4 text-sm md:text-base text-stone-600 max-w-2xl mx-auto sfpro-font">
            The principles that guide every project we touch.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
          {values.map((value, index) => {
            const Icon = value.icon;
            const isActive = activeValue === index;

            return (
              <div
                key={value.title}
                className="relative group cursor-pointer"
                onMouseEnter={() => setActiveValue(index)}
                onMouseLeave={() => setActiveValue(null)}
              >
                <div className={`
                  absolute inset-0 bg-gradient-to-br ${value.color} rounded-xl md:rounded-2xl
                  transition-all duration-700
                  ${isActive ? 'scale-105 opacity-100' : 'opacity-0'}
                `} />

                <div className={`
                  relative p-5 md:p-6 rounded-xl md:rounded-2xl bg-white/80 backdrop-blur-sm
                  border border-stone-200/50 transition-all duration-500
                  ${isActive ? 'transform -translate-y-1 shadow-xl' : ''}
                `}>
                  <div className={`
                    w-10 h-10 md:w-12 md:h-12 rounded-lg md:rounded-xl 
                    bg-stone-100 flex items-center justify-center mb-3 md:mb-4
                    transition-all duration-500
                    ${isActive ? 'rotate-6 bg-stone-800 text-white' : ''}
                  `}>
                    <Icon className="w-5 h-5 md:w-6 md:h-6" />
                  </div>

                  <h3 className="text-base md:text-lg font-bold mb-2 clash-font">{value.title}</h3>
                  <p className="text-xs md:text-sm text-stone-600 leading-relaxed sfpro-font">{value.desc}</p>

                  <div className={`
                    absolute bottom-2 right-2 w-3 h-3 md:w-4 md:h-4 
                    border-b-2 border-r-2 border-stone-300 transition-all duration-500
                    ${isActive ? 'w-5 h-5 md:w-6 md:h-6 border-stone-800' : ''}
                  `} />
                </div>

                {isActive && (
                  <div className="absolute -inset-2 md:-inset-3 border border-stone-800/20 rounded-xl md:rounded-2xl animate-pulse-slow" />
                )}
              </div>
            );
          })}
        </div>

        {/* Stats Section */}
        <div className="mt-16 md:mt-20 grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          {[
            { number: "100+", label: "Projects Delivered" },
            { number: "50+", label: "Happy Clients" },
            { number: "5", label: "Years Creating" },
            { number: "100%", label: "Passion Driven" }
          ].map((stat, idx) => (
            <div key={idx} className="text-center">
              <div className="text-2xl md:text-3xl lg:text-4xl font-bold text-stone-800 clash-font">{stat.number}</div>
              <div className="text-xs md:text-sm text-stone-500 sfpro-font mt-1">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Main component
const AboutUsPage = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  const sections = [
    { id: 'hero', label: 'Home' },
    { id: 'philosophy', label: 'Philosophy' },
    { id: 'team', label: 'Team' },
    { id: 'journey', label: 'Journey' },
    { id: 'values', label: 'Values' }
  ];

  if (isLoading) {
    return (
      <div className="fixed inset-0 bg-stone-900 flex items-center justify-center z-50">
        <div className="text-center">
          <div className="relative">
            <div className="w-16 h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 border-2 border-stone-700 rounded-full animate-spin-slow" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-8 h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 bg-stone-800 rounded-full animate-pulse" />
            </div>
          </div>
          <p className="mt-6 md:mt-8 text-stone-400 text-xs md:text-sm tracking-widest animate-pulse sfpro-font">
            ENTERING STUDIO
          </p>
        </div>
      </div>
    );
  }

  return (
    <>
      <CustomCursor />
      <ScrollProgress />
      <MobileMenu />
      <FloatingNav sections={sections} />
      <ParallaxBackground />

      <div className="relative">
        <HeroSection />
        <PhilosophySection />
        <TeamSection />
        <JourneySection />
        <ValuesSection />
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        .animate-float {
          animation: float 8s ease-in-out infinite;
        }
        .animate-float-delayed {
          animation: float 10s ease-in-out infinite 2s;
        }
        @keyframes particle {
          0% { transform: translateY(0) translateX(0); opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { transform: translateY(-100vh) translateX(100px); opacity: 0; }
        }
        .animate-particle {
          animation: particle 20s linear infinite;
        }
        @keyframes text-reveal {
          0% { opacity: 0; transform: translateY(40px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        .animate-text-reveal {
          animation: text-reveal 1s ease-out forwards;
          opacity: 0;
        }
        @keyframes sparkle {
          0%, 100% { opacity: 0.3; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.2); }
        }
        .animate-sparkle {
          animation: sparkle 2s ease-in-out infinite;
        }
        .animate-sparkle-delayed {
          animation: sparkle 2s ease-in-out infinite 1s;
        }
        @keyframes energy-wave {
          0%, 100% { transform: scaleY(0.8); opacity: 0.5; }
          50% { transform: scaleY(1.2); opacity: 1; }
        }
        .animate-energy-wave {
          animation: energy-wave 3s ease-in-out infinite;
        }
        @keyframes energy-pulse {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-20px); }
        }
        .animate-energy-pulse {
          animation: energy-pulse 4s ease-in-out infinite;
        }
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-spin-slow {
          animation: spin-slow 20s linear infinite;
        }
        @keyframes float-particle {
          0%, 100% { transform: translateY(0) translateX(0); }
          25% { transform: translateY(-10px) translateX(5px); }
          50% { transform: translateY(0) translateX(10px); }
          75% { transform: translateY(10px) translateX(5px); }
        }
        .animate-float-particle {
          animation: float-particle 4s ease-in-out infinite;
        }
        @keyframes fade-in-up {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in-up {
          animation: fade-in-up 0.8s ease-out forwards;
        }
        @keyframes pulse-slow {
          0%, 100% { opacity: 0.5; }
          50% { opacity: 1; }
        }
        .animate-pulse-slow {
          animation: pulse-slow 3s ease-in-out infinite;
        }
        .perspective-1000 {
          perspective: 1000px;
        }
      `}</style>
    </>
  );
};

export default AboutUsPage;