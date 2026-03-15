import React, { useEffect, useState, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, useScroll, useTransform, useInView, useMotionValue, useSpring } from 'framer-motion';
import { Button } from "../components/ui/button";
import { Card, CardContent } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { AspectRatio } from "../components/ui/aspect-ratio";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "../components/ui/carousel";
import { Dialog, DialogContent, DialogTrigger } from "../components/ui/dialog";
import { Separator } from "../components/ui/separator";
import { Progress } from "../components/ui/progress";
import { ArrowLeft, ArrowUpRight, Calendar, User, Clock, CheckCircle, ExternalLink, Sparkles, Layers, Target, Lightbulb, TrendingUp, Zap, Award, Maximize2 } from 'lucide-react';
import { getProjectIcon } from '../data/projectsIcon';
import projectsData from '../data/projects.json';

const ease = [0.25, 0.46, 0.45, 0.94];

// ── Isolated animated components (hooks used at top level of each) ──

const StatItem = ({ icon: Icon, value, label, index }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay: index * 0.08, ease }}
      className="text-center group"
      whileHover={{ y: -5 }}
    >
      <motion.div
        whileHover={{ rotate: 360 }}
        transition={{ duration: 0.5 }}
        className="inline-flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gray-100 mb-2 sm:mb-3 group-hover:bg-gray-900 transition-colors duration-300"
      >
        <Icon className="w-4 h-4 sm:w-5 sm:h-5 text-gray-700 group-hover:text-white transition-colors duration-300" />
      </motion.div>
      <p className="clash-font text-lg sm:text-2xl font-bold text-gray-900">{value}</p>
      <p className="sfpro-font text-[10px] sm:text-xs text-gray-500">{label}</p>
    </motion.div>
  );
};

const FeatureItem = ({ feature, index, inView }) => (
  <motion.div
    initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
    animate={inView ? { opacity: 1, x: 0 } : {}}
    transition={{ duration: 0.55, delay: index * 0.07, ease }}
    whileHover={{ scale: 1.02 }}
    className="flex items-start gap-3 sm:gap-4 p-4 sm:p-5 bg-gray-50 rounded-lg sm:rounded-xl"
  >
    <div className="w-5 h-5 lg:w-6 lg:h-6 rounded-full bg-gray-900 flex items-center justify-center shrink-0 mt-0.5">
      <CheckCircle className="w-3 h-3 lg:w-4 lg:h-4 text-white" />
    </div>
    <div className="flex-1">
      <p className="sfpro-font text-xs sm:text-sm lg:text-base text-gray-900 font-medium mb-1.5 sm:mb-2">{feature}</p>
      <motion.div
        initial={{ width: 0 }}
        animate={inView ? { width: "100%" } : {}}
        transition={{ duration: 0.8, delay: 0.3 + index * 0.07, ease }}
      >
        <Progress value={85 + index * 5} className="h-1 sm:h-1.5" />
      </motion.div>
    </div>
  </motion.div>
);

const ResultItem = ({ result, index, inView }) => (
  <motion.div
    initial={{ opacity: 0, x: -20 }}
    animate={inView ? { opacity: 1, x: 0 } : {}}
    transition={{ duration: 0.5, delay: index * 0.08, ease }}
    whileHover={{ x: 4 }}
    className="flex items-start gap-3 sm:gap-4 p-4 sm:p-5 bg-gradient-to-r from-gray-50 to-white rounded-lg sm:rounded-xl border border-gray-100"
  >
    <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-gray-200 flex items-center justify-center shrink-0">
      <span className="clash-font text-xs sm:text-sm font-bold text-gray-900">{index + 1}</span>
    </div>
    <p className="sfpro-font text-xs sm:text-sm lg:text-base text-gray-700">{result}</p>
  </motion.div>
);

const SectionHeading = ({ icon: Icon, title }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -20 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.6, ease }}
      className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6"
    >
      <motion.div
        whileHover={{ scale: 1.1, rotate: 360 }}
        transition={{ duration: 0.3 }}
        className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gray-900 flex items-center justify-center"
      >
        <Icon className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
      </motion.div>
      <h2 className="clash-font text-2xl sm:text-3xl font-bold text-gray-900">{title}</h2>
    </motion.div>
  );
};

const OverviewSection = ({ description }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <div ref={ref}>
      <SectionHeading icon={Lightbulb} title="Overview" />
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay: 0.1, ease }}
        className="sfpro-font text-sm sm:text-base lg:text-lg text-gray-600 leading-relaxed"
      >
        {description}
      </motion.p>
    </div>
  );
};

const ChallengeSection = ({ challenge, solution }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  if (!challenge && !solution) return null;
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, ease }}
      className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-8"
    >
      {challenge && (
        <motion.div whileHover={{ y: -4 }} transition={{ type: "spring", stiffness: 300, damping: 25 }} className="bg-gray-50 rounded-xl sm:rounded-2xl p-5 sm:p-8">
          <Target className="w-6 h-6 sm:w-8 sm:h-8 text-gray-700 mb-3 sm:mb-4" />
          <h3 className="clash-font text-lg sm:text-xl font-bold text-gray-900 mb-2 sm:mb-3">The Challenge</h3>
          <p className="sfpro-font text-sm sm:text-base text-gray-600 leading-relaxed">{challenge}</p>
        </motion.div>
      )}
      {solution && (
        <motion.div whileHover={{ y: -4 }} transition={{ type: "spring", stiffness: 300, damping: 25 }} className="bg-gray-50 rounded-xl sm:rounded-2xl p-5 sm:p-8">
          <Lightbulb className="w-6 h-6 sm:w-8 sm:h-8 text-gray-700 mb-3 sm:mb-4" />
          <h3 className="clash-font text-lg sm:text-xl font-bold text-gray-900 mb-2 sm:mb-3">The Solution</h3>
          <p className="sfpro-font text-sm sm:text-base text-gray-600 leading-relaxed">{solution}</p>
        </motion.div>
      )}
    </motion.div>
  );
};

const FeaturesSection = ({ features }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  if (!features) return null;
  return (
    <div ref={ref}>
      <SectionHeading icon={CheckCircle} title="Key Features" />
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
        {features.map((feature, index) => (
          <FeatureItem key={index} feature={feature} index={index} inView={inView} />
        ))}
      </div>
    </div>
  );
};

const ResultsSection = ({ results }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  if (!results) return null;
  return (
    <div ref={ref}>
      <SectionHeading icon={Sparkles} title="Results" />
      <div className="space-y-3 sm:space-y-4">
        {results.map((result, index) => (
          <ResultItem key={index} result={result} index={index} inView={inView} />
        ))}
      </div>
    </div>
  );
};

const InfoCard = ({ project }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const details = [
    { icon: User, label: 'Client', value: project.client || 'Confidential' },
    { icon: Calendar, label: 'Year', value: project.year },
    { icon: Clock, label: 'Duration', value: project.duration || '3 months' },
    { icon: Layers, label: 'Role', value: project.role || 'Lead Developer' },
  ];
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: 30 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.7, ease }}
      className="lg:col-span-1 mt-8 lg:mt-0"
    >
      <Card className="lg:sticky lg:top-24 border-0 bg-gradient-to-b from-gray-50 to-white rounded-2xl sm:rounded-3xl shadow-lg sm:shadow-xl">
        <CardContent className="p-5 sm:p-8">
          <h3 className="clash-font text-xl lg:text-2xl font-bold text-gray-900 mb-6 sm:mb-8">Project Details</h3>
          <div className="space-y-4 sm:space-y-6">
            {details.map((item, i) => (
              <React.Fragment key={item.label}>
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.45, delay: 0.1 + i * 0.07, ease }}
                  className="flex items-start gap-3 sm:gap-4 group"
                >
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 360 }}
                    transition={{ duration: 0.3 }}
                    className="w-8 h-8 lg:w-10 lg:h-10 rounded-full bg-gray-200 flex items-center justify-center shrink-0 group-hover:bg-gray-900 transition-colors duration-300"
                  >
                    <item.icon className="w-4 h-4 lg:w-5 lg:h-5 text-gray-700 group-hover:text-white transition-colors duration-300" />
                  </motion.div>
                  <div>
                    <p className="sfpro-font text-[10px] sm:text-xs text-gray-500 mb-0.5 sm:mb-1">{item.label}</p>
                    <p className="sfpro-font text-xs sm:text-sm lg:text-base font-medium text-gray-900">{item.value}</p>
                  </div>
                </motion.div>
                {i < 3 && <Separator className="bg-gray-200" />}
              </React.Fragment>
            ))}
          </div>

          <div className="mt-6 sm:mt-10 pt-5 sm:pt-8 border-t border-gray-200">
            <h4 className="clash-font text-base lg:text-lg font-bold text-gray-900 mb-3 sm:mb-4">Technologies</h4>
            <div className="flex flex-wrap gap-1.5 sm:gap-2">
              {(project.technologies || project.stack.split(' + ')).map((tech, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.7 }}
                  animate={inView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.35, delay: 0.2 + index * 0.05, type: "spring", stiffness: 300 }}
                  whileHover={{ scale: 1.08 }}
                >
                  <Badge variant="secondary" className="bg-white border border-gray-200 px-2.5 sm:px-4 py-1 sm:py-2 rounded-full text-[10px] sm:text-xs font-mono hover:bg-gray-900 hover:text-white transition-colors cursor-default">
                    {tech}
                  </Badge>
                </motion.div>
              ))}
            </div>
          </div>

          {project.website && (
            <motion.div className="mt-6 sm:mt-8" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Button
                className="w-full bg-gray-900 hover:bg-gray-800 text-white border-0 rounded-full py-4 sm:py-6 sfpro-font text-xs sm:text-sm font-medium group relative overflow-hidden"
                onClick={() => window.open(project.website, '_blank')}
              >
                <motion.span className="absolute inset-0 bg-white/20" initial={{ x: "-100%" }} whileHover={{ x: "100%" }} transition={{ duration: 0.5 }} />
                <span className="relative z-10 flex items-center justify-center">
                  Visit Live Project
                  <ExternalLink className="w-3.5 h-3.5 sm:w-4 sm:h-4 ml-2 group-hover:translate-x-1 group-hover:-translate-y-0.5 transition-transform" />
                </span>
              </Button>
            </motion.div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
};

// ── Main Page Component ──
const ProjectDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);

  const heroRef = useRef(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const mouseXSpring = useSpring(mouseX, { stiffness: 100, damping: 30 });
  const mouseYSpring = useSpring(mouseY, { stiffness: 100, damping: 30 });

  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0.3]);
  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 1.04]);
  const heroImageY = useTransform(scrollYProgress, [0, 1], [0, 60]);
  const rotateX = useTransform(mouseYSpring, [-10, 10], [4, -4]);
  const rotateY = useTransform(mouseXSpring, [-10, 10], [-4, 4]);

  useEffect(() => {
    const found = projectsData.projects.find(p => p.id === parseInt(id));
    setProject(found);
    setLoading(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [id]);

  useEffect(() => {
    const handleMouseMove = (e) => {
      mouseX.set((e.clientX / window.innerWidth - 0.5) * 20);
      mouseY.set((e.clientY / window.innerHeight - 0.5) * 20);
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center px-4">
        <div className="text-center">
          <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: "linear" }} className="w-12 h-12 sm:w-16 sm:h-16 border-4 border-gray-200 border-t-gray-900 rounded-full mx-auto mb-4" />
          <p className="sfpro-font text-sm sm:text-base text-gray-500">Loading project...</p>
        </div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease }} className="text-center max-w-md mx-auto px-4">
          <h2 className="clash-font text-2xl sm:text-4xl font-bold text-gray-900 mb-4">Project not found</h2>
          <p className="sfpro-font text-sm sm:text-base text-gray-500 mb-8">The project you're looking for doesn't exist or has been moved.</p>
          <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
            <Button onClick={() => navigate('/projects')} className="bg-gray-900 hover:bg-gray-800 text-white px-6 py-5 rounded-full">
              <ArrowLeft className="w-4 h-4 mr-2" /> Back to Projects
            </Button>
          </motion.div>
        </motion.div>
      </div>
    );
  }

  const galleryImages = project.gallery || [project.image, project.image, project.image];

  return (
    <div className="min-h-screen bg-white overflow-x-hidden">

      {/* ── HERO ── */}
      <div ref={heroRef} className={`relative w-full bg-gradient-to-br ${project.color} overflow-hidden`}>
        <motion.div className="absolute inset-0 bg-white/40 backdrop-blur-3xl" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8 }} />

        <div className="absolute inset-0 pointer-events-none hidden sm:block">
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute border border-white/20 rounded-full"
              style={{ width: `${(i + 1) * 200}px`, height: `${(i + 1) * 200}px`, top: `${10 + i * 5}%`, left: `${5 + i * 10}%` }}
              animate={{ scale: [1, 1.05, 1], opacity: [0.3, 0.6, 0.3] }}
              transition={{ duration: 4 + i * 2, repeat: Infinity, ease: "easeInOut", delay: i * 0.5 }}
            />
          ))}
        </div>

        <div className="relative w-full px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-20 mt-10">
          <div className="max-w-7xl mx-auto">
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, ease }}>
              <motion.div whileHover={{ x: -4 }}>
                <Button variant="ghost" onClick={() => navigate('/projects')} className="mb-6 sm:mb-8 text-gray-700 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full font-sans text-xs sm:text-sm group">
                  <ArrowLeft className="w-3.5 h-3.5 sm:w-4 sm:h-4 mr-1.5 sm:mr-2 group-hover:-translate-x-1 transition-transform" />
                  Back to Projects
                </Button>
              </motion.div>
            </motion.div>

            <div className="flex flex-col lg:grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
              {/* Info */}
              <motion.div style={{ opacity: heroOpacity }} className="space-y-4 sm:space-y-6 order-2 lg:order-1 w-full">
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1, ease }} className="flex flex-wrap items-center gap-2 sm:gap-3">
                  <Badge className="bg-white/90 backdrop-blur-sm text-gray-900 border-0 shadow-md px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm sfpro-font">
                    <span className="mr-1.5 sm:mr-2">{getProjectIcon(project.icon)}</span>
                    {project.stack}
                  </Badge>
                  <Badge variant="outline" className="bg-white/50 backdrop-blur-sm border-white/50 text-gray-700 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-mono">
                    {project.year}
                  </Badge>
                </motion.div>

                <motion.h1 initial={{ opacity: 0, y: 40, skewY: 2 }} animate={{ opacity: 1, y: 0, skewY: 0 }} transition={{ duration: 0.8, delay: 0.15, ease }} className="clash-font text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-gray-900 leading-tight">
                  {project.name}
                </motion.h1>

                <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.25, ease }} className="sfpro-font text-sm sm:text-base lg:text-lg xl:text-xl text-gray-600 leading-relaxed max-w-xl">
                  {project.fullDescription || project.shortDescription}
                </motion.p>

                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.35, ease }} className="flex flex-wrap gap-3 sm:gap-4 pt-2 sm:pt-4">
                  {project.website && (
                    <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                      <Button className="bg-gray-900 hover:bg-gray-800 text-white px-5 sm:px-8 py-4 sm:py-6 rounded-full text-xs sm:text-sm group sfpro-font font-medium relative overflow-hidden" onClick={() => window.open(project.website, '_blank')}>
                        <motion.span className="absolute inset-0 bg-white/20" initial={{ x: "-100%" }} whileHover={{ x: "100%" }} transition={{ duration: 0.5 }} />
                        <span className="relative z-10 flex items-center">Visit Website <ExternalLink className="w-3.5 h-3.5 ml-1.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" /></span>
                      </Button>
                    </motion.div>
                  )}
                  <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                    <Button variant="outline" className="border-gray-300 text-gray-700 hover:bg-gray-900 hover:text-white hover:border-gray-900 px-5 sm:px-8 py-4 sm:py-6 rounded-full text-xs sm:text-sm sfpro-font">
                      Case Study <ArrowUpRight className="w-3.5 h-3.5 ml-1.5" />
                    </Button>
                  </motion.div>
                </motion.div>
              </motion.div>

              {/* Hero Image */}
              <motion.div style={{ y: heroImageY, scale: heroScale, rotateX, rotateY, transformStyle: "preserve-3d", perspective: "1000px" }} className="w-full order-1 lg:order-2 mb-4 lg:mb-0">
                <motion.div initial={{ opacity: 0, y: 40, scale: 0.96 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ duration: 0.9, delay: 0.2, ease }}>
                  <Dialog>
                    <DialogTrigger asChild>
                      <motion.div className="relative group cursor-pointer" whileHover={{ scale: 1.02 }} transition={{ type: "spring", stiffness: 300 }}>
                        <motion.div className="absolute -inset-4 bg-gradient-to-r from-white/50 to-transparent rounded-3xl blur-2xl" animate={{ opacity: [0.4, 0.7, 0.4] }} transition={{ duration: 3, repeat: Infinity }} />
                        <div className="relative rounded-xl sm:rounded-2xl overflow-hidden shadow-2xl">
                          <AspectRatio ratio={16 / 9}>
                            <motion.img src={project.image} alt={project.name} className="object-cover w-full h-full" whileHover={{ scale: 1.04 }} transition={{ duration: 0.7, ease }} />
                            <motion.div className="absolute inset-0 bg-black/20 flex items-center justify-center" initial={{ opacity: 0 }} whileHover={{ opacity: 1 }}>
                              <div className="bg-white/90 backdrop-blur-sm rounded-full p-3"><Maximize2 className="w-5 h-5 text-gray-900" /></div>
                            </motion.div>
                          </AspectRatio>
                        </div>
                      </motion.div>
                    </DialogTrigger>
                    <DialogContent className="max-w-[95vw] sm:max-w-5xl p-0 overflow-hidden bg-black/95">
                      <motion.img initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.35, ease }} src={project.image} alt={project.name} className="w-full h-auto max-h-[85vh] object-contain" />
                    </DialogContent>
                  </Dialog>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      {/* ── STATS ── */}
      <div className="w-full bg-white py-12 sm:py-16 lg:py-20 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-8">
            {[
              { icon: Zap, value: project.duration || '3 mos', label: 'Timeline' },
              { icon: Award, value: '100%', label: 'Satisfaction' },
              { icon: TrendingUp, value: '+45%', label: 'Growth' },
              { icon: Layers, value: project.features?.length || 8, label: 'Features' },
            ].map((stat, i) => (
              <StatItem key={stat.label} {...stat} index={i} />
            ))}
          </div>
        </div>
      </div>

      {/* ── GALLERY ── */}
      {galleryImages.length > 1 && (
        <div className="w-full bg-gray-50 py-12 sm:py-16 lg:py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <SectionHeading icon={Sparkles} title="Visual journey" />
            <Carousel className="w-full mt-6 sm:mt-8">
              <CarouselContent>
                {galleryImages.map((image, index) => (
                  <CarouselItem key={index} className="basis-full sm:basis-1/2 lg:basis-1/3">
                    <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-80px" }} transition={{ duration: 0.55, delay: index * 0.1, ease }}>
                      <Dialog>
                        <DialogTrigger asChild>
                          <motion.div className="group cursor-pointer p-1" whileHover={{ scale: 1.02 }} transition={{ type: "spring", stiffness: 300 }}>
                            <div className="relative rounded-xl overflow-hidden shadow-md">
                              <AspectRatio ratio={4 / 3}>
                                <motion.img src={image} alt={`${project.name} - ${index + 1}`} className="object-cover w-full h-full" whileHover={{ scale: 1.08 }} transition={{ duration: 0.6, ease }} />
                              </AspectRatio>
                            </div>
                          </motion.div>
                        </DialogTrigger>
                        <DialogContent className="max-w-[95vw] sm:max-w-5xl p-0 overflow-hidden bg-black/95">
                          <motion.img initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.35, ease }} src={image} alt={`${project.name} - ${index + 1}`} className="w-full h-auto max-h-[85vh] object-contain" />
                        </DialogContent>
                      </Dialog>
                    </motion.div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <div className="flex justify-end gap-2 mt-6">
                <CarouselPrevious className="static translate-y-0 rounded-full w-9 h-9 sm:w-10 sm:h-10 border-gray-200" />
                <CarouselNext className="static translate-y-0 rounded-full w-9 h-9 sm:w-10 sm:h-10 border-gray-200" />
              </div>
            </Carousel>
          </div>
        </div>
      )}

      {/* ── DETAILS ── */}
      <div className="w-full bg-white py-12 sm:py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:grid lg:grid-cols-3 gap-8 lg:gap-16">
            <div className="lg:col-span-2 space-y-10 sm:space-y-16">
              <OverviewSection description={project.fullDescription || project.shortDescription} />
              <ChallengeSection challenge={project.challenge} solution={project.solution} />
              <FeaturesSection features={project.features} />
              <ResultsSection results={project.results} />
            </div>
            <InfoCard project={project} />
          </div>
        </div>
      </div>

      {/* ── PREV / NEXT ── */}
      <div className="text-white relative w-full bg-gradient-to-b from-gray-50 to-white py-12 sm:py-16 lg:py-20 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_30%_30%,_#f3f0ff,_transparent_70%)] opacity-40" />
          <div className="absolute bottom-0 right-0 w-full h-full bg-[radial-gradient(circle_at_70%_70%,_#ffe8f0,_transparent_70%)] opacity-40" />
        </div>
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, ease }} className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 sm:gap-6">
            <motion.div whileHover={{ x: -4 }} transition={{ type: "spring", stiffness: 400 }}>
              <Button variant="ghost" onClick={() => { const p = parseInt(id) - 1; if (p >= 1) navigate(`/project/${p}`); }} className="group w-full sm:w-auto justify-start px-4 sm:px-8 py-4 sm:py-6 rounded-full hover:bg-gray-900 hover:text-white transition-all duration-300" disabled={parseInt(id) === 1}>
                <ArrowLeft className="w-3.5 h-3.5 sm:w-4 sm:h-4 mr-2 sm:mr-3 group-hover:-translate-x-1 transition-transform shrink-0" />
                <div className="text-left">
                  <p className="sfpro-font text-[10px] sm:text-xs text-gray-500 group-hover:text-gray-400 mb-0.5">Previous</p>
                  <p className="clash-font text-xs sm:text-base font-bold truncate max-w-[150px] sm:max-w-[200px]">{parseInt(id) > 1 ? projectsData.projects[parseInt(id) - 2]?.name : '—'}</p>
                </div>
              </Button>
            </motion.div>
            <div className="hidden sm:block">
              <Badge variant="outline" className="px-5 py-2.5 rounded-full border-gray-200 bg-white/80 backdrop-blur-sm">
                <span className="clash-font text-xs sm:text-sm font-medium">{id} / {projectsData.projects.length}</span>
              </Badge>
            </div>
            <motion.div whileHover={{ x: 4 }} transition={{ type: "spring", stiffness: 400 }}>
              <Button variant="ghost" onClick={() => { const n = parseInt(id) + 1; if (n <= projectsData.projects.length) navigate(`/project/${n}`); }} className="group w-full sm:w-auto justify-end px-4 sm:px-8 py-4 sm:py-6 rounded-full hover:bg-gray-900 hover:text-white transition-all duration-300" disabled={parseInt(id) === projectsData.projects.length}>
                <div className="text-right">
                  <p className="sfpro-font text-[10px] sm:text-xs text-gray-500 group-hover:text-gray-400 mb-0.5">Next</p>
                  <p className="clash-font text-xs sm:text-base font-bold truncate max-w-[150px] sm:max-w-[200px]">{parseInt(id) < projectsData.projects.length ? projectsData.projects[parseInt(id)]?.name : '—'}</p>
                </div>
                <ArrowUpRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 ml-2 sm:ml-3 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform shrink-0" />
              </Button>
            </motion.div>
          </div>
          <div className="flex sm:hidden justify-center mt-4">
            <Badge variant="outline" className="px-4 py-2 rounded-full border-gray-200 bg-white/80 backdrop-blur-sm">
              <span className="clash-font text-xs font-medium">{id} / {projectsData.projects.length}</span>
            </Badge>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ProjectDetailPage;