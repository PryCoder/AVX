import React, { useState, useEffect } from "react";
import { useSearchParams } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import {
  Grid,
  Layers,
  Globe,
  Code,
  Figma,
  ArrowRight,
  Calendar,
  Clock,
  Star,
  TrendingUp,
  Filter,
  Search,
  X,
  Sparkles,
  Zap,
  Briefcase,
  Activity,
  Palette,
  Server,
  Database,
  Box,
  Component,
  FileCode,
  Eye,
  Heart,
  Award
} from "lucide-react";

import { Button } from "../components/ui/button";
import { Card, CardContent } from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Badge } from "../components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "../components/ui/hover-card";
import { Separator } from "../components/ui/separator";
import { cn } from "../lib/utils";

// Import projects data
import projectsData from "../data/projects.json";

// Icon mapping
const iconMap = {
  Figma: Figma,
  Globe: Globe,
  Code: Code,
  React: Code,
  Vue: Code,
  Svelte: Code,
  Nextjs: Code,
  Tailwind: Palette,
  Nodejs: Server,
  TypeScript: FileCode,
  JavaScript: FileCode,
  HTML5: FileCode,
  CSS3: Palette,
  PostgreSQL: Database,
  MongoDB: Database,
  ThreeJS: Box,
  Webflow: Globe,
  GSAP: Activity,
  Finsweet: Component,
  Alpine: Zap,
  default: Grid
};

// Spotlight Component
const Spotlight = ({ className, fill = "white" }) => {
  return (
    <svg
      className={cn(
        "animate-spotlight pointer-events-none absolute z-[1] h-[169%] w-[138%] opacity-0 lg:w-[84%]",
        className
      )}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 3787 2842"
      fill="none"
    >
      <g filter="url(#filter)">
        <ellipse
          cx="1924.71"
          cy="273.501"
          rx="1924.71"
          ry="273.501"
          transform="matrix(-0.822377 -0.568943 -0.568943 0.822377 3631.88 2291.09)"
          fill={fill}
          fillOpacity="0.21"
        ></ellipse>
      </g>
      <defs>
        <filter
          id="filter"
          x="0.860352"
          y="0.838989"
          width="3785.16"
          height="2840.26"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix"></feFlood>
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="BackgroundImageFix"
            result="shape"
          ></feBlend>
          <feGaussianBlur
            stdDeviation="151"
            result="effect1_foregroundBlur_1065_8"
          ></feGaussianBlur>
        </filter>
      </defs>
    </svg>
  );
};

const ProjectGallery = () => {
  const navigate = useNavigate();
  const [projects, setProjects] = useState([]);
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStack, setSelectedStack] = useState("all");
  const [selectedYear, setSelectedYear] = useState("all");
  const [selectedService, setSelectedService] = useState("all");
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState("grid");
  const [activeTab, setActiveTab] = useState("all");
  const [hoveredId, setHoveredId] = useState(null);
  const [imageErrors, setImageErrors] = useState({});
  const [searchParams] = useSearchParams();
  
  // Get unique stacks and years for filters
  const stacks = ["all", ...new Set(projects.map(p => p.stack?.split(" + ")[0]).filter(Boolean))];
  const years = ["all", ...new Set(projects.map(p => p.year).filter(Boolean))];

  const serviceItems = [
    { label: "All Services", value: "all" },
    { label: "Web Development", value: "Website Development" },
    { label: "UI/UX Design", value: "UI/UX Design" },
    { label: "AI Automation", value: "Ai Automation" },
  ];

  useEffect(() => {
    const serviceParam = searchParams.get('service');
    if (serviceParam) {
      setSelectedService(serviceParam);
    }
  }, [searchParams]);
  
  useEffect(() => {
    // Simulate loading
    setTimeout(() => {
      setProjects(projectsData.projects);
      setFilteredProjects(projectsData.projects);
      setLoading(false);
    }, 1000);
  }, []);

  useEffect(() => {
    let filtered = [...projects];

    // Filter by tab
    if (activeTab === "featured") {
      filtered = filtered.filter(p => p.id <= 3);
    } else if (activeTab === "recent") {
      filtered = filtered.filter(p => p.year === "2024");
    }

    // Filter by search
    if (searchQuery) {
      filtered = filtered.filter(p =>
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.shortDescription.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.client?.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Filter by service (from navbar navigation)
    if (selectedService !== "all") {
      filtered = filtered.filter(p =>
        p.services?.toLowerCase().includes(selectedService.toLowerCase())
      );
    }

    // Filter by stack (from dropdown)
    if (selectedStack !== "all") {
      filtered = filtered.filter(p => p.stack?.includes(selectedStack));
    }

    // Filter by year
    if (selectedYear !== "all") {
      filtered = filtered.filter(p => p.year === selectedYear);
    }

    setFilteredProjects(filtered);
  }, [activeTab, searchQuery, selectedStack, selectedYear, selectedService, projects]);

  const getIcon = (iconName) => {
    const IconComponent = iconMap[iconName] || iconMap.default;
    return <IconComponent className="w-5 h-5" />;
  };

  const handleProjectClick = (id) => {
    navigate(`/project/${id}`);
  };

  const handleImageError = (projectId) => {
    setImageErrors(prev => ({ ...prev, [projectId]: true }));
  };

  if (loading) {
    return (
      <div className="min-h-screen w-full bg-black flex items-center justify-center">
        <div className="text-center px-4">
          <div className="relative">
            <div className="w-24 h-24 border-2 border-stone-700 border-t-stone-300 rounded-full animate-spin mx-auto"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <Sparkles className="w-10 h-10 text-stone-300 animate-pulse" />
            </div>
          </div>
          <p className="mt-6 text-lg text-stone-400">Loading exceptional work...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full bg-black overflow-x-hidden relative">
      {/* Hero Section with Spotlight */}
      <div className="relative w-full overflow-hidden pt-24 sm:pt-32 pb-16 sm:pb-24">
        {/* Grid Pattern Background */}
        <div
          className={cn(
            "pointer-events-none absolute inset-0 [background-size:40px_40px] select-none z-0",
            "[background-image:linear-gradient(to_right,#171717_1px,transparent_1px),linear-gradient(to_bottom,#171717_1px,transparent_1px)]"
          )} 
        />
        
        {/* Spotlight Effect */}
        <Spotlight className="-top-40 left-0 md:-top-20 md:left-60" fill="white" />
        <Spotlight className="top-40 right-0 md:top-60 md:right-40" fill="purple" />
        
        {/* Hero Content */}
        <div className="relative z-10 w-full px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto flex justify-center">
            <div className="max-w-3xl text-center">
              <h1 className="bg-opacity-50 clash-font bg-gradient-to-b from-neutral-50 to-neutral-400 bg-clip-text text-center text-4xl font-bold text-transparent md:text-7xl">
                Crafting digital
                <span className="block">
                  experiences
                </span>
              </h1>
              <p className="mx-auto mt-4 max-w-lg text-center text-base font-normal text-neutral-300 leading-relaxed">
                A curated collection of projects where design meets function.
                Each piece tells a story of innovation and precision.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content - Full Width with Padding */}
      <div className="relative z-10 w-full px-4 sm:px-6 lg:px-8 pb-16 sm:pb-24">
        <div className="max-w-7xl mx-auto">
          {/* Filters Section */}
          <div className="mb-8 sm:mb-12 space-y-4 sm:space-y-6">
            <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab} className="w-full">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 sm:gap-6">
                <TabsList className="grid w-full sm:w-auto grid-cols-3 rounded-full bg-stone-900/50 backdrop-blur-sm p-1 border border-stone-800">
                 
                  <TabsTrigger 
                    value="all"
                    className="text-stone-400 rounded-full 
                    data-[state=active]:bg-white 
                    data-[state=active]:text-stone-900
                    transition-all duration-300 text-xs sm:text-sm px-3 sm:px-4 py-1.5 sm:py-2"
                  >
                    All
                  </TabsTrigger>
                   <TabsTrigger 
                    value="featured"
                    className="text-stone-400 rounded-full 
                    data-[state=active]:bg-white 
                    data-[state=active]:text-stone-900
                    transition-all duration-300 text-xs sm:text-sm px-3 sm:px-4 py-1.5 sm:py-2"
                  >
                    Featured
                  </TabsTrigger>
                  <TabsTrigger 
                    value="recent"
                    className="text-stone-400 rounded-full 
                    data-[state=active]:bg-white 
                    data-[state=active]:text-stone-900
                    transition-all duration-300 text-xs sm:text-sm px-3 sm:px-4 py-1.5 sm:py-2"
                  >
                    Recent
                  </TabsTrigger>
                </TabsList>

                <div className="flex items-center justify-between sm:justify-end gap-2 sm:gap-3">
                  <Button
                    variant={viewMode === "grid" ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setViewMode("grid")}
                    className={`rounded-full w-8 h-8 sm:w-10 sm:h-10 p-0 transition-all duration-300 ${
                      viewMode === "grid" ? "bg-white text-stone-900 hover:bg-stone-100" : "text-stone-500 hover:text-white"
                    }`}
                  >
                    <Grid className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  </Button>
                  <Button
                    variant={viewMode === "list" ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setViewMode("list")}
                    className={`rounded-full w-8 h-8 sm:w-10 sm:h-10 p-0 transition-all duration-300 ${
                      viewMode === "list" ? "bg-white text-stone-900 hover:bg-stone-100" : "text-stone-500 hover:text-white"
                    }`}
                  >
                    <Layers className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  </Button>
                </div>
              </div>

              <div className="mt-4 sm:mt-6 flex flex-col gap-3">
                {/* Search */}
                <div className="relative w-full group">
                  <Search className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 w-3.5 h-3.5 sm:w-4 sm:h-4 text-stone-500 transition-colors group-focus-within:text-stone-300" />
                  <Input
                    placeholder="Search projects..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-9 sm:pl-11 pr-10 sm:pr-12 py-4 sm:py-6 w-full text-xs sm:text-sm rounded-full border-stone-800 bg-stone-900/50 backdrop-blur-sm text-white placeholder:text-stone-500 focus:border-stone-700 focus:ring-0 transition-all duration-300"
                  />
                  {searchQuery && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setSearchQuery("")}
                      className="absolute right-1.5 sm:right-2 top-1/2 -translate-y-1/2 h-6 w-6 sm:h-8 sm:w-8 p-0 rounded-full hover:bg-stone-800"
                    >
                      <X className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-stone-400" />
                    </Button>
                  )}
                </div>

                {/* Filters Row */}
                <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
                  <Select value={selectedService} onValueChange={setSelectedService}>
                    <SelectTrigger className="min-w-[140px] flex-shrink-0 rounded-full border-stone-800 bg-stone-900/50 backdrop-blur-sm h-9 sm:h-11 px-3 sm:px-4 text-xs sm:text-sm text-white">
                      <div className="flex items-center gap-1.5">
                        <Sparkles className="w-3 h-3 sm:w-3.5 sm:h-3.5 flex-shrink-0" />
                        <SelectValue placeholder="Service" />
                      </div>
                    </SelectTrigger>
                    <SelectContent className="rounded-xl border-stone-800 bg-stone-900 text-white" position="popper" sideOffset={4}>
                      {serviceItems.map(item => (
                        <SelectItem key={item.value} value={item.value} className="text-xs sm:text-sm focus:bg-stone-800 focus:text-white">
                          {item.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <Select value={selectedStack} onValueChange={setSelectedStack}>
                    <SelectTrigger className="min-w-[120px] flex-shrink-0 rounded-full border-stone-800 bg-stone-900/50 backdrop-blur-sm h-9 sm:h-11 px-3 sm:px-4 text-xs sm:text-sm text-white">
                      <div className="flex items-center gap-1.5">
                        <Filter className="w-3 h-3 sm:w-3.5 sm:h-3.5 flex-shrink-0" />
                        <SelectValue placeholder="Stack" />
                      </div>
                    </SelectTrigger>
                    <SelectContent className="rounded-xl border-stone-800 bg-stone-900 text-white" position="popper" sideOffset={4}>
                      {stacks.map(stack => (
                        <SelectItem key={stack} value={stack} className="text-xs sm:text-sm capitalize focus:bg-stone-800 focus:text-white">
                          {stack === "all" ? "All Stacks" : stack}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <Select value={selectedYear} onValueChange={setSelectedYear}>
                    <SelectTrigger className="min-w-[110px] flex-shrink-0 rounded-full border-stone-800 bg-stone-900/50 backdrop-blur-sm h-9 sm:h-11 px-3 sm:px-4 text-xs sm:text-sm text-white">
                      <div className="flex items-center gap-1.5">
                        <Calendar className="w-3 h-3 sm:w-3.5 sm:h-3.5 flex-shrink-0" />
                        <SelectValue placeholder="Year" />
                      </div>
                    </SelectTrigger>
                    <SelectContent className="rounded-xl border-stone-800 bg-stone-900 text-white" position="popper" sideOffset={4}>
                      {years.map(year => (
                        <SelectItem key={year} value={year} className="text-xs sm:text-sm focus:bg-stone-800 focus:text-white">
                          {year === "all" ? "All Years" : year}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </Tabs>
          </div>

          {/* Results count */}
          <div className="mb-6 sm:mb-10 flex items-center justify-between">
            <p className="text-xs sm:text-sm text-stone-500">
              <span className="font-medium text-stone-300">{filteredProjects.length}</span> projects
            </p>
            <Badge variant="outline" className="rounded-full px-3 sm:px-4 py-1 sm:py-1.5 border-stone-800 text-stone-400 text-xs bg-stone-900/30">
              <TrendingUp className="w-2.5 h-2.5 sm:w-3 sm:h-3 mr-1 sm:mr-1.5" />
              curated collection
            </Badge>
          </div>

          {/* Projects Grid */}
          {viewMode === "grid" ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 auto-rows-max">
              {filteredProjects.map((project, index) => (
                <div
                  key={project.id}
                  className={`transform transition-all duration-700 ${
                    index % 3 === 1 ? 'lg:translate-y-8' : ''
                  } ${index % 3 === 2 ? 'lg:translate-y-4' : ''}`}
                  onMouseEnter={() => setHoveredId(project.id)}
                  onMouseLeave={() => setHoveredId(null)}
                >
                  <Card
                    onClick={() => handleProjectClick(project.id)}
                    className="group relative overflow-hidden border border-stone-800 bg-stone-900/30 backdrop-blur-sm hover:shadow-xl transition-all duration-700 cursor-pointer rounded-2xl sm:rounded-3xl hover:border-stone-700"
                  >
                    {/* Image Container */}
                    <div className="relative w-full bg-stone-900/50">
                      <div className="relative w-full pt-[125%]">
                        <img
                          src={!imageErrors[project.id] ? project.image : "/fallback-image.jpg"}
                          alt={project.name}
                          className="absolute top-0 left-0 w-full h-full object-contain bg-stone-900/30"
                          onError={() => handleImageError(project.id)}
                          loading="lazy"
                        />
                      </div>
                      
                      {/* Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-stone-900/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
                      
                      {/* Icon */}
                      <div className={`absolute top-4 right-4 sm:top-6 sm:right-6 w-8 h-8 sm:w-12 sm:h-12 bg-stone-800/90 backdrop-blur-sm rounded-xl sm:rounded-2xl flex items-center justify-center shadow-lg transform transition-all duration-500 text-stone-300 ${
                        hoveredId === project.id ? 'scale-110 rotate-3' : ''
                      }`}>
                        {getIcon(project.icon)}
                      </div>

                      {/* Year */}
                      <div className="absolute bottom-4 left-4 sm:bottom-6 sm:left-6 pointer-events-none">
                        <span className="text-[10px] sm:text-xs text-stone-400 tracking-wider">
                          {project.year}
                        </span>
                      </div>
                    </div>

                    {/* Content */}
                    <CardContent className="p-4 sm:p-6 lg:p-8">
                      <div className="space-y-3 sm:space-y-4">
                        <div>
                          <h3 className="text-lg sm:text-xl lg:text-2xl font-medium text-white mb-1 sm:mb-2 line-clamp-1">
                            {project.name}
                          </h3>
                          <p className="text-xs sm:text-sm text-stone-400 leading-relaxed line-clamp-2">
                            {project.shortDescription}
                          </p>
                        </div>

                        <div className="flex items-center justify-between pt-3 sm:pt-4 border-t border-stone-800">
                          <Badge variant="outline" className="rounded-full px-2 sm:px-4 py-1 sm:py-1.5 border-stone-700 text-stone-400 text-[10px] sm:text-xs truncate max-w-[60%] bg-stone-900/50">
                            {project.stack}
                          </Badge>
                          
                          <Button
                            variant="ghost"
                            size="sm"
                            className="rounded-full text-stone-400 hover:text-white transition-colors"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleProjectClick(project.id);
                            }}
                          >
                            <span className="text-[10px] sm:text-xs mr-1 sm:mr-2">View</span>
                            <ArrowRight className="w-2.5 h-2.5 sm:w-3.5 sm:h-3.5" />
                          </Button>
                        </div>

                        {project.client && (
                          <div className="flex items-center text-[10px] sm:text-xs text-stone-500 truncate">
                            <Briefcase className="w-2.5 h-2.5 sm:w-3 sm:h-3 mr-1 sm:mr-1.5 flex-shrink-0" />
                            <span className="truncate">{project.client}</span>
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          ) : (
            <div className="space-y-3 sm:space-y-4">
              {filteredProjects.map((project) => (
                <Card
                  key={project.id}
                  onClick={() => handleProjectClick(project.id)}
                  className="group relative overflow-hidden border border-stone-800 bg-stone-900/30 backdrop-blur-sm hover:shadow-md transition-all duration-500 cursor-pointer rounded-xl sm:rounded-2xl hover:border-stone-700"
                >
                  <div className="flex flex-col sm:flex-row">
                    <div className="sm:w-48 lg:w-64 xl:w-80 flex-shrink-0 bg-stone-900/50">
                      <div className="relative w-full pt-[75%] sm:pt-[100%]">
                        <img
                          src={!imageErrors[project.id] ? project.image : "/fallback-image.jpg"}
                          alt={project.name}
                          className="absolute top-0 left-0 w-full h-full object-contain bg-stone-900/30"
                          onError={() => handleImageError(project.id)}
                          loading="lazy"
                        />
                      </div>
                    </div>
                    <CardContent className="flex-1 p-4 sm:p-6 lg:p-8">
                      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 sm:gap-4">
                        <div className="space-y-1 sm:space-y-2 flex-1 min-w-0">
                          <h3 className="text-lg sm:text-xl lg:text-2xl font-medium text-white truncate">
                            {project.name}
                          </h3>
                          <p className="text-xs sm:text-sm text-stone-400 leading-relaxed line-clamp-2">
                            {project.shortDescription}
                          </p>
                          <div className="flex flex-wrap items-center gap-2 sm:gap-4 pt-1 sm:pt-2">
                            <Badge variant="outline" className="rounded-full px-2 sm:px-4 py-1 sm:py-1.5 border-stone-700 text-stone-400 text-[10px] sm:text-xs truncate max-w-[150px] bg-stone-900/50">
                              {project.stack}
                            </Badge>
                            {project.client && (
                              <span className="flex items-center text-[10px] sm:text-xs text-stone-500 truncate min-w-0">
                                <Briefcase className="w-2.5 h-2.5 sm:w-3 sm:h-3 mr-1 sm:mr-1.5 flex-shrink-0" />
                                <span className="truncate">{project.client}</span>
                              </span>
                            )}
                            <span className="flex items-center text-[10px] sm:text-xs text-stone-500 flex-shrink-0">
                              <Calendar className="w-2.5 h-2.5 sm:w-3 sm:h-3 mr-1 sm:mr-1.5" />
                              {project.year}
                            </span>
                          </div>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="rounded-full text-stone-400 hover:text-white transition-colors self-start flex-shrink-0"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleProjectClick(project.id);
                          }}
                        >
                          <span className="text-[10px] sm:text-xs mr-1 sm:mr-2">View</span>
                          <ArrowRight className="w-2.5 h-2.5 sm:w-3.5 sm:h-3.5" />
                        </Button>
                      </div>
                    </CardContent>
                  </div>
                </Card>
              ))}
            </div>
          )}

          {/* Empty state */}
          {filteredProjects.length === 0 && (
            <div className="text-center py-16 sm:py-24 lg:py-32">
              <div className="w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 bg-stone-800/50 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6 backdrop-blur-sm">
                <Search className="w-6 h-6 sm:w-8 sm:h-8 lg:w-10 lg:h-10 text-stone-500" />
              </div>
              <h3 className="text-xl sm:text-2xl font-medium text-white mb-2 sm:mb-3">No projects found</h3>
              <p className="text-sm sm:text-base text-stone-400 mb-6 sm:mb-8">Try adjusting your filters for different results</p>
              <Button
                variant="outline"
                onClick={() => {
                  setSearchQuery("");
                  setSelectedStack("all");
                  setSelectedYear("all");
                  setSelectedService("all");
                  setActiveTab("all");
                }}
                className="rounded-full px-6 sm:px-8 py-4 sm:py-6 border-stone-700 hover:border-stone-600 text-stone-400 hover:text-white transition-all text-xs sm:text-sm bg-stone-900/50"
              >
                Clear filters
              </Button>
            </div>
          )}
        </div>
      </div>

      {/* Add required CSS animation */}
      <style jsx>{`
  @keyframes spotlight {
    0% {
      opacity: 0;
      transform: translate(-72%, -55%) scale(0.3);
    }
    50% {
      opacity: 0.9;
      transform: translate(-55%, -45%) scale(1.2);
    }
    100% {
      opacity: 1;
      transform: translate(-50%, -40%) scale(1.8);
    }
  }
  .animate-spotlight {
    animation: spotlight 2s ease-out forwards;
    filter: blur(0px);
  }
`}</style>
    </div>
  );
};

export default ProjectGallery;