import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from "../components/ui/button";
import { Card, CardContent } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { AspectRatio } from "../components/ui/aspect-ratio";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../components/ui/carousel";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "../components/ui/dialog";
import { Separator } from "../components/ui/separator";
import { Progress } from "../components/ui/progress";
import { 
  ArrowLeft, 
  ArrowUpRight, 
  Calendar, 
  User, 
  Clock, 
  CheckCircle,
  ExternalLink,
  Sparkles,
  Layers,
  Target,
  Lightbulb,
  TrendingUp,
  Zap,
  Award,
  Maximize2
} from 'lucide-react';
import { getProjectIcon } from '../data/projectsIcon';
import projectsData from '../data/projects.json';

const ProjectDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  useEffect(() => {
    const foundProject = projectsData.projects.find(p => p.id === parseInt(id));
    setProject(foundProject);
    setLoading(false);
    window.scrollTo(0, 0);
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center px-4">
        <div className="text-center">
          <div className="w-12 h-12 sm:w-16 sm:h-16 border-4 border-gray-200 border-t-gray-900 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="sfpro-font text-sm sm:text-base text-gray-500">Loading project...</p>
        </div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-4">
          <h2 className="clash-font text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">Project not found</h2>
          <p className="sfpro-font text-sm sm:text-base text-gray-500 mb-6 sm:mb-8">The project you're looking for doesn't exist or has been moved.</p>
          <Button 
            onClick={() => navigate('/projects')}
            className="bg-gray-900 hover:bg-gray-800 text-white px-5 sm:px-6 py-4 sm:py-5 rounded-full text-sm sm:text-base"
          >
            <ArrowLeft className="w-3.5 h-3.5 sm:w-4 sm:h-4 mr-2" />
            Back to Projects
          </Button>
        </div>
      </div>
    );
  }

  // Create gallery array from project images or use single image
  const galleryImages = project.gallery || [project.image, project.image, project.image];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section - Cinematic */}
      <div className={`relative w-full bg-gradient-to-br ${project.color} overflow-hidden`}>
        <div className="absolute inset-0 bg-white/40 backdrop-blur-3xl"></div>
        
        {/* Animated background elements - hidden on mobile */}
        <div className="absolute inset-0 pointer-events-none hidden sm:block">
          <div className="absolute top-20 left-10 w-32 sm:w-48 lg:w-64 h-32 sm:h-48 lg:h-64 border border-white/20 rounded-full animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-48 sm:w-72 lg:w-96 h-48 sm:h-72 lg:h-96 border border-white/10 rounded-full animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] sm:w-[450px] lg:w-[600px] h-[300px] sm:h-[450px] lg:h-[600px] bg-gradient-to-r from-white/5 to-transparent rounded-full blur-3xl"></div>
        </div>
        
        <div className="relative w-full px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-20 mt-10">
          <div className="max-w-7xl mx-auto">
            {/* Back Button */}
            <Button
              variant="ghost"
              onClick={() => navigate('/projects')}
              className="mb-6  text-white sm:mb-8 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full  transition-all font-sans text-xs sm:text-sm"
            >
              <ArrowLeft className="w-3.5 h-3.5 sm:w-4 sm:h-4 mr-1.5 sm:mr-2" />
              Back to Projects
            </Button>

            <div className="flex flex-col lg:grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
              {/* Project Info - Order changes on mobile */}
              <div className="space-y-4 sm:space-y-5 lg:space-y-6 order-2 lg:order-1 w-full">
                <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                  <Badge className="bg-white/90 backdrop-blur-sm text-gray-900 border-0 shadow-md px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm sfpro-font">
                    <span className="mr-1.5 sm:mr-2">{getProjectIcon(project.icon)}</span>
                    {project.stack}
                  </Badge>
                  <Badge variant="outline" className="bg-white/50 backdrop-blur-sm border-white/50 text-gray-700 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-mono">
                    {project.year}
                  </Badge>
                </div>

                <h1 className="clash-font text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-gray-900 leading-tight">
                  {project.name}
                </h1>

                <p className="sfpro-font text-sm sm:text-base lg:text-lg xl:text-xl text-gray-600 leading-relaxed max-w-xl">
                  {project.fullDescription || project.shortDescription}
                </p>

                <div className="flex flex-wrap gap-3 sm:gap-4 pt-2 sm:pt-4">
                  {project.website && (
                    <Button 
                      className="bg-gray-900 hover:bg-gray-800 text-white px-5 sm:px-6 lg:px-8 py-4 sm:py-5 lg:py-6 rounded-full text-xs sm:text-sm lg:text-base group sfpro-font font-medium"
                      onClick={() => window.open(project.website, '_blank')}
                    >
                      Visit Website
                      <ExternalLink className="w-3.5 h-3.5 sm:w-4 sm:h-4 ml-1.5 sm:ml-2 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </Button>
                  )}
                  <Button 
                    variant="outline"
                    className="border-gray-300 text-gray-200 hover:bg-gray-900 hover:text-white hover:border-gray-900 px-5 sm:px-6 lg:px-8 py-4 sm:py-5 lg:py-6 rounded-full text-xs sm:text-sm lg:text-base sfpro-font"
                  >
                    Case Study
                    <ArrowUpRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 ml-1.5 sm:ml-2" />
                  </Button>
                </div>
              </div>

              {/* Hero Image with Dialog - Order changes on mobile */}
              <div className="w-full order-1 lg:order-2 mb-4 lg:mb-0">
                <Dialog>
                  <DialogTrigger asChild>
                    <div className="relative group cursor-pointer">
                      <div className="absolute -inset-2 sm:-inset-3 lg:-inset-4 bg-gradient-to-r from-white/50 to-transparent rounded-2xl sm:rounded-3xl blur-xl sm:blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                      <div className="relative rounded-xl sm:rounded-2xl overflow-hidden shadow-xl sm:shadow-2xl">
                        <AspectRatio ratio={16/9}>
                          <img
                            src={project.image}
                            alt={project.name}
                            className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-105"
                          />
                          <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                            <div className="bg-white/90 backdrop-blur-sm rounded-full p-2 sm:p-2.5 lg:p-3">
                              <Maximize2 className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-gray-900" />
                            </div>
                          </div>
                        </AspectRatio>
                      </div>
                    </div>
                  </DialogTrigger>
                  <DialogContent className="max-w-[95vw] sm:max-w-4xl lg:max-w-5xl p-0 overflow-hidden bg-black/95">
                    <img
                      src={project.image}
                      alt={project.name}
                      className="w-full h-auto max-h-[90vh] sm:max-h-[85vh] lg:max-h-[80vh] object-contain"
                    />
                  </DialogContent>
                </Dialog>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Project Gallery Carousel */}
      {galleryImages.length > 1 && (
        <div className="w-full bg-gray-50 py-12 sm:py-16 lg:py-20">
          <div className="w-full px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6 sm:mb-8 lg:mb-10">
                <div>
                  <Badge variant="outline" className="px-3 sm:px-4 py-1 rounded-full border-gray-200 bg-white mb-2 sm:mb-3 lg:mb-4">
                    <span className="text-[10px] sm:text-xs font-mono tracking-wider text-gray-600">PROJECT GALLERY</span>
                  </Badge>
                  <h2 className="clash-font text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900">
                    Visual journey
                  </h2>
                </div>
              </div>
              
              <Carousel className="w-full">
                <CarouselContent>
                  {galleryImages.map((image, index) => (
                    <CarouselItem key={index} className="basis-full sm:basis-1/2 lg:basis-1/3">
                      <Dialog>
                        <DialogTrigger asChild>
                          <div className="group cursor-pointer p-1">
                            <div className="relative rounded-lg sm:rounded-xl overflow-hidden shadow-md sm:shadow-lg">
                              <AspectRatio ratio={4/3}>
                                <img
                                  src={image}
                                  alt={`${project.name} - ${index + 1}`}
                                  className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                              </AspectRatio>
                            </div>
                          </div>
                        </DialogTrigger>
                        <DialogContent className="max-w-[95vw] sm:max-w-4xl lg:max-w-5xl p-0 overflow-hidden bg-black/95">
                          <img
                            src={image}
                            alt={`${project.name} - ${index + 1}`}
                            className="w-full h-auto max-h-[90vh] sm:max-h-[85vh] lg:max-h-[80vh] object-contain"
                          />
                        </DialogContent>
                      </Dialog>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <div className="flex justify-end gap-2 mt-4 sm:mt-6">
                  <CarouselPrevious className="static translate-y-0 rounded-full w-8 h-8 sm:w-9 sm:h-9 lg:w-10 lg:h-10 border-gray-200" />
                  <CarouselNext className="static translate-y-0 rounded-full w-8 h-8 sm:w-9 sm:h-9 lg:w-10 lg:h-10 border-gray-200" />
                </div>
              </Carousel>
            </div>
          </div>
        </div>
      )}

      {/* Project Details - Multi-column Layout */}
      <div className="w-full bg-white py-12 sm:py-16 lg:py-20">
        <div className="w-full px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            {/* Stats/Progress Bar - Grid adjusts for mobile */}
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 lg:gap-8 mb-10 sm:mb-12 lg:mb-16">
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-10 h-10 sm:w-11 sm:h-11 lg:w-12 lg:h-12 rounded-full bg-gray-100 mb-2 sm:mb-3">
                  <Zap className="w-4 h-4 sm:w-4.5 sm:h-4.5 lg:w-5 lg:h-5 text-gray-700" />
                </div>
                <p className="clash-font text-lg sm:text-xl lg:text-2xl font-bold text-gray-900">{project.duration || '3 mos'}</p>
                <p className="sfpro-font text-[10px] sm:text-xs text-gray-500">Timeline</p>
              </div>
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-10 h-10 sm:w-11 sm:h-11 lg:w-12 lg:h-12 rounded-full bg-gray-100 mb-2 sm:mb-3">
                  <Award className="w-4 h-4 sm:w-4.5 sm:h-4.5 lg:w-5 lg:h-5 text-gray-700" />
                </div>
                <p className="clash-font text-lg sm:text-xl lg:text-2xl font-bold text-gray-900">100%</p>
                <p className="sfpro-font text-[10px] sm:text-xs text-gray-500">Satisfaction</p>
              </div>
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-10 h-10 sm:w-11 sm:h-11 lg:w-12 lg:h-12 rounded-full bg-gray-100 mb-2 sm:mb-3">
                  <TrendingUp className="w-4 h-4 sm:w-4.5 sm:h-4.5 lg:w-5 lg:h-5 text-gray-700" />
                </div>
                <p className="clash-font text-lg sm:text-xl lg:text-2xl font-bold text-gray-900">+45%</p>
                <p className="sfpro-font text-[10px] sm:text-xs text-gray-500">Growth</p>
              </div>
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-10 h-10 sm:w-11 sm:h-11 lg:w-12 lg:h-12 rounded-full bg-gray-100 mb-2 sm:mb-3">
                  <Layers className="w-4 h-4 sm:w-4.5 sm:h-4.5 lg:w-5 lg:h-5 text-gray-700" />
                </div>
                <p className="clash-font text-lg sm:text-xl lg:text-2xl font-bold text-gray-900">{project.features?.length || 8}</p>
                <p className="sfpro-font text-[10px] sm:text-xs text-gray-500">Features</p>
              </div>
            </div>

            <div className="flex flex-col lg:grid lg:grid-cols-3 gap-8 lg:gap-16">
              {/* Left Column - Main Content (2/3 width) */}
              <div className="lg:col-span-2 space-y-10 sm:space-y-12 lg:space-y-16">
                {/* Overview */}
                <div>
                  <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-5 lg:mb-6">
                    <div className="w-8 h-8 sm:w-9 sm:h-9 lg:w-10 lg:h-10 rounded-full bg-gray-900 flex items-center justify-center">
                      <Lightbulb className="w-4 h-4 sm:w-4.5 sm:h-4.5 lg:w-5 lg:h-5 text-white" />
                    </div>
                    <h2 className="clash-font text-2xl sm:text-2xl lg:text-3xl font-bold text-gray-900">Overview</h2>
                  </div>
                  <p className="sfpro-font text-sm sm:text-base lg:text-lg text-gray-600 leading-relaxed">
                    {project.fullDescription || project.shortDescription}
                  </p>
                </div>

                {/* Challenge & Solution - Stack on mobile, grid on tablet/desktop */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5 lg:gap-8">
                  {project.challenge && (
                    <div className="bg-gray-50 rounded-xl sm:rounded-2xl p-5 sm:p-6 lg:p-8">
                      <Target className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 text-gray-700 mb-3 sm:mb-4" />
                      <h3 className="clash-font text-lg sm:text-xl font-bold text-gray-900 mb-2 sm:mb-3">The Challenge</h3>
                      <p className="sfpro-font text-sm sm:text-base text-gray-600 leading-relaxed">{project.challenge}</p>
                    </div>
                  )}
                  {project.solution && (
                    <div className="bg-gray-50 rounded-xl sm:rounded-2xl p-5 sm:p-6 lg:p-8">
                      <Lightbulb className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 text-gray-700 mb-3 sm:mb-4" />
                      <h3 className="clash-font text-lg sm:text-xl font-bold text-gray-900 mb-2 sm:mb-3">The Solution</h3>
                      <p className="sfpro-font text-sm sm:text-base text-gray-600 leading-relaxed">{project.solution}</p>
                    </div>
                  )}
                </div>

                {/* Key Features with Progress */}
                {project.features && (
                  <div>
                    <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-5 lg:mb-6">
                      <div className="w-8 h-8 sm:w-9 sm:h-9 lg:w-10 lg:h-10 rounded-full bg-gray-900 flex items-center justify-center">
                        <CheckCircle className="w-4 h-4 sm:w-4.5 sm:h-4.5 lg:w-5 lg:h-5 text-white" />
                      </div>
                      <h2 className="clash-font text-2xl sm:text-2xl lg:text-3xl font-bold text-gray-900">Key Features</h2>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5 lg:gap-6">
                      {project.features.map((feature, index) => (
                        <div key={index} className="flex items-start gap-3 sm:gap-4 p-4 sm:p-4 lg:p-5 bg-gray-50 rounded-lg sm:rounded-xl">
                          <div className="w-5 h-5 sm:w-5.5 sm:h-5.5 lg:w-6 lg:h-6 rounded-full bg-gray-900 flex items-center justify-center shrink-0 mt-0.5">
                            <CheckCircle className="w-3 h-3 sm:w-3.5 sm:h-3.5 lg:w-4 lg:h-4 text-white" />
                          </div>
                          <div className="flex-1">
                            <p className="sfpro-font text-xs sm:text-sm lg:text-base text-gray-900 font-medium mb-1.5 sm:mb-2">{feature}</p>
                            <Progress value={85 + index * 5} className="h-1 sm:h-1.5" />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Results */}
                {project.results && (
                  <div>
                    <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-5 lg:mb-6">
                      <div className="w-8 h-8 sm:w-9 sm:h-9 lg:w-10 lg:h-10 rounded-full bg-gray-900 flex items-center justify-center">
                        <Sparkles className="w-4 h-4 sm:w-4.5 sm:h-4.5 lg:w-5 lg:h-5 text-white" />
                      </div>
                      <h2 className="clash-font text-2xl sm:text-2xl lg:text-3xl font-bold text-gray-900">Results</h2>
                    </div>
                    <div className="space-y-3 sm:space-y-4">
                      {project.results.map((result, index) => (
                        <div key={index} className="flex items-start gap-3 sm:gap-4 p-4 sm:p-5 bg-gradient-to-r from-gray-50 to-white rounded-lg sm:rounded-xl border border-gray-100">
                          <div className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 rounded-full bg-gray-200 flex items-center justify-center shrink-0">
                            <span className="clash-font text-xs sm:text-sm font-bold text-gray-900">{index + 1}</span>
                          </div>
                          <p className="sfpro-font text-xs sm:text-sm lg:text-base text-gray-700">{result}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Right Column - Project Info Card (1/3 width) */}
              <div className="lg:col-span-1 mt-8 lg:mt-0">
                <Card className="lg:sticky lg:top-24 border-0 bg-gradient-to-b from-gray-50 to-white rounded-2xl sm:rounded-3xl shadow-lg sm:shadow-xl">
                  <CardContent className="p-5 sm:p-6 lg:p-8">
                    <h3 className="clash-font text-xl sm:text-xl lg:text-2xl font-bold text-gray-900 mb-5 sm:mb-6 lg:mb-8">Project Details</h3>
                    
                    <div className="space-y-4 sm:space-y-5 lg:space-y-6">
                      <div className="flex items-start gap-3 sm:gap-4">
                        <div className="w-8 h-8 sm:w-9 sm:h-9 lg:w-10 lg:h-10 rounded-full bg-gray-200 flex items-center justify-center shrink-0">
                          <User className="w-4 h-4 sm:w-4.5 sm:h-4.5 lg:w-5 lg:h-5 text-gray-700" />
                        </div>
                        <div>
                          <p className="sfpro-font text-[10px] sm:text-xs text-gray-500 mb-0.5 sm:mb-1">Client</p>
                          <p className="sfpro-font text-xs sm:text-sm lg:text-base font-medium text-gray-900">{project.client || 'Confidential'}</p>
                        </div>
                      </div>

                      <Separator className="bg-gray-200" />

                      <div className="flex items-start gap-3 sm:gap-4">
                        <div className="w-8 h-8 sm:w-9 sm:h-9 lg:w-10 lg:h-10 rounded-full bg-gray-200 flex items-center justify-center shrink-0">
                          <Calendar className="w-4 h-4 sm:w-4.5 sm:h-4.5 lg:w-5 lg:h-5 text-gray-700" />
                        </div>
                        <div>
                          <p className="sfpro-font text-[10px] sm:text-xs text-gray-500 mb-0.5 sm:mb-1">Year</p>
                          <p className="sfpro-font text-xs sm:text-sm lg:text-base font-medium text-gray-900">{project.year}</p>
                        </div>
                      </div>

                      <Separator className="bg-gray-200" />

                      <div className="flex items-start gap-3 sm:gap-4">
                        <div className="w-8 h-8 sm:w-9 sm:h-9 lg:w-10 lg:h-10 rounded-full bg-gray-200 flex items-center justify-center shrink-0">
                          <Clock className="w-4 h-4 sm:w-4.5 sm:h-4.5 lg:w-5 lg:h-5 text-gray-700" />
                        </div>
                        <div>
                          <p className="sfpro-font text-[10px] sm:text-xs text-gray-500 mb-0.5 sm:mb-1">Duration</p>
                          <p className="sfpro-font text-xs sm:text-sm lg:text-base font-medium text-gray-900">{project.duration || '3 months'}</p>
                        </div>
                      </div>

                      <Separator className="bg-gray-200" />

                      <div className="flex items-start gap-3 sm:gap-4">
                        <div className="w-8 h-8 sm:w-9 sm:h-9 lg:w-10 lg:h-10 rounded-full bg-gray-200 flex items-center justify-center shrink-0">
                          <Layers className="w-4 h-4 sm:w-4.5 sm:h-4.5 lg:w-5 lg:h-5 text-gray-700" />
                        </div>
                        <div>
                          <p className="sfpro-font text-[10px] sm:text-xs text-gray-500 mb-0.5 sm:mb-1">Role</p>
                          <p className="sfpro-font text-xs sm:text-sm lg:text-base font-medium text-gray-900">{project.role || 'Lead Developer'}</p>
                        </div>
                      </div>
                    </div>

                    <div className="mt-6 sm:mt-8 lg:mt-10 pt-5 sm:pt-6 lg:pt-8 border-t border-gray-200">
                      <h4 className="clash-font text-base sm:text-base lg:text-lg font-bold text-gray-900 mb-3 sm:mb-4">Technologies</h4>
                      <div className="flex flex-wrap gap-1.5 sm:gap-2">
                        {project.technologies ? (
                          project.technologies.map((tech, index) => (
                            <Badge key={index} variant="secondary" className="bg-white border border-gray-200 px-2.5 sm:px-3 lg:px-4 py-1 sm:py-1.5 lg:py-2 rounded-full text-[10px] sm:text-xs font-mono hover:bg-gray-900 hover:text-white transition-colors">
                              {tech}
                            </Badge>
                          ))
                        ) : (
                          project.stack.split(' + ').map((tech, index) => (
                            <Badge key={index} variant="secondary" className="bg-white border border-gray-200 px-2.5 sm:px-3 lg:px-4 py-1 sm:py-1.5 lg:py-2 rounded-full text-[10px] sm:text-xs font-mono hover:bg-gray-900 hover:text-white transition-colors">
                              {tech}
                            </Badge>
                          ))
                        )}
                      </div>
                    </div>

                    {project.website && (
                      <div className="mt-5 sm:mt-6 lg:mt-8">
                        <Button 
                          variant="outline"
                          className="w-full bg-gray-900 hover:bg-gray-800 text-white border-0 rounded-full py-4 sm:py-5 lg:py-6 sfpro-font text-xs sm:text-sm lg:text-base font-medium group"
                          onClick={() => window.open(project.website, '_blank')}
                        >
                          Visit Live Project
                          <ExternalLink className="w-3.5 h-3.5 sm:w-4 sm:h-4 ml-1.5 sm:ml-2 group-hover:translate-x-1 transition-transform" />
                        </Button>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Next/Previous Navigation - Artistic */}
      <div className=" text-white relative w-full bg-gradient-to-b from-gray-50 to-white py-12 sm:py-16 lg:py-20 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_30%_30%,_#f3f0ff,_transparent_70%)] opacity-40"></div>
          <div className="absolute bottom-0 right-0 w-full h-full bg-[radial-gradient(circle_at_70%_70%,_#ffe8f0,_transparent_70%)] opacity-40"></div>
        </div>

        <div className="relative w-full px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4 sm:gap-6">
              <Button
                variant="ghost"
                onClick={() => {
                  const prevId = parseInt(id) - 1;
                  if (prevId >= 1) navigate(`/project/${prevId}`);
                }}
                className="group w-full sm:w-auto justify-start px-4 sm:px-6 lg:px-8 py-4 sm:py-5 lg:py-6 rounded-full hover:bg-gray-900 hover:text-white transition-all duration-300"
                disabled={parseInt(id) === 1}
              >
                <ArrowLeft className="w-3.5 h-3.5 sm:w-4 sm:h-4 mr-2 sm:mr-3 group-hover:-translate-x-1 transition-transform shrink-0" />
                <div className="text-left">
                  <p className="sfpro-font text-[10px] sm:text-xs text-gray-500 group-hover:text-gray-400 mb-0.5 sm:mb-1">Previous</p>
                  <p className="text-white clash-font text-xs sm:text-sm lg:text-base font-bold group-hover:text-white truncate max-w-[150px] sm:max-w-[200px]">
                    {parseInt(id) > 1 ? projectsData.projects[parseInt(id) - 2]?.name : '—'}
                  </p>
                </div>
              </Button>
              
              <div className="hidden sm:block">
                <Badge variant="outline" className="px-4 sm:px-5 lg:px-6 py-2 sm:py-2.5 lg:py-3 rounded-full border-gray-200 bg-white/80 backdrop-blur-sm">
                  <span className="clash-font text-xs sm:text-sm font-medium">
                    {id} / {projectsData.projects.length}
                  </span>
                </Badge>
              </div>
              
              <Button
                variant="ghost"
                onClick={() => {
                  const nextId = parseInt(id) + 1;
                  if (nextId <= projectsData.projects.length) navigate(`/project/${nextId}`);
                }}
                className="text-white group w-full sm:w-auto justify-end px-4 sm:px-6 lg:px-8 py-4 sm:py-5 lg:py-6 rounded-full hover:bg-gray-900 hover:text-white transition-all duration-300"
                disabled={parseInt(id) === projectsData.projects.length}
              >
                <div className="text-white text-right">
                  <p className="sfpro-font text-[10px] sm:text-xs text-gray-500 group-hover:text-gray-400 mb-0.5 sm:mb-1">Next</p>
                  <p className="text-white clash-font text-xs sm:text-sm lg:text-base font-bold group-hover:text-white truncate max-w-[150px] sm:max-w-[200px]">
                    {parseInt(id) < projectsData.projects.length ? projectsData.projects[parseInt(id)]?.name : '—'}
                  </p>
                </div>
                <ArrowUpRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 ml-2 sm:ml-3 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform shrink-0" />
              </Button>
            </div>
            
            {/* Mobile pagination indicator */}
            <div className="flex sm:hidden justify-center mt-4">
              <Badge variant="outline" className="px-4 py-2 rounded-full border-gray-200 bg-white/80 backdrop-blur-sm">
                <span className="clash-font text-xs font-medium">
                  {id} / {projectsData.projects.length}
                </span>
              </Badge>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetailPage;