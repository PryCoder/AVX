import React, { useState, useEffect } from "react";
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

const ProjectGallery = () => {
  const navigate = useNavigate();
  const [projects, setProjects] = useState([]);
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStack, setSelectedStack] = useState("all");
  const [selectedYear, setSelectedYear] = useState("all");
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState("grid");
  const [activeTab, setActiveTab] = useState("all");
  const [hoveredId, setHoveredId] = useState(null);

  // Get unique stacks and years for filters
  const stacks = ["all", ...new Set(projects.map(p => p.stack?.split(" + ")[0]).filter(Boolean))];
  const years = ["all", ...new Set(projects.map(p => p.year).filter(Boolean))];

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

    // Filter by stack
    if (selectedStack !== "all") {
      filtered = filtered.filter(p => p.stack?.includes(selectedStack));
    }

    // Filter by year
    if (selectedYear !== "all") {
      filtered = filtered.filter(p => p.year === selectedYear);
    }

    setFilteredProjects(filtered);
  }, [activeTab, searchQuery, selectedStack, selectedYear, projects]);

  const getIcon = (iconName) => {
    const IconComponent = iconMap[iconName] || iconMap.default;
    return <IconComponent className="w-5 h-5" />;
  };
console.log(projects.id)
  const handleProjectClick = (id) => {
    navigate(`/project/${id}`);
  };

  if (loading) {
    return (
      <div className="min-h-screen w-full bg-gradient-to-br from-stone-50 via-white to-stone-50 flex items-center justify-center">
        <div className="text-center px-4">
          <div className="relative">
            <div className="w-24 h-24 border-2 border-stone-200 border-t-stone-900 rounded-full animate-spin mx-auto"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <Sparkles className="w-10 h-10 text-stone-900 animate-pulse" />
            </div>
          </div>
          <p className="mt-6 text-lg text-stone-600 sfpro-font">Loading exceptional work...</p>
        </div>
      </div>
    );
  }

  return (
    <div className=" min-h-screen w-full bg-gradient-to-br from-stone-50 via-white to-stone-50 overflow-x-hidden">
      {/* Hero Section - Full Width */}
      <div className="relative w-full overflow-hidden pt-24 sm:pt-32 pb-16 sm:pb-24 px-4 sm:px-6 lg:px-8">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(0,0,0,0.02)_0%,transparent_50%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(0,0,0,0.02)_0%,transparent_50%)]"></div>
        
        <div className="max-w-7xl mx-auto flex justify-center">
  <div className="max-w-3xl text-center">
    <Badge
      variant="outline"
      className="mb-4 sm:mb-6 rounded-full px-3 sm:px-4 py-1 sm:py-1.5 border-stone-200 text-stone-600 sfpro-font text-xs sm:text-sm mx-auto w-fit"
    >
      <Sparkles className="w-3 h-3 sm:w-3.5 sm:h-3.5 mr-1.5 sm:mr-2" />
      Selected Works
    </Badge>

    <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-stone-900 mb-4 sm:mb-6 clash-font leading-[1.1]">
      Crafting digital
      <span className="block text-transparent bg-clip-text bg-gradient-to-r from-stone-700 to-stone-900">
        experiences
      </span>
    </h1>

    <p className="text-base sm:text-lg text-stone-600 max-w-2xl mx-auto sfpro-font leading-relaxed">
      A curated collection of projects where design meets function.
      Each piece tells a story of innovation and precision.
    </p>
  </div>
</div>

      </div>

      {/* Main Content - Full Width with Padding */}
      <div className="!text-white w-full px-4 sm:px-6 lg:px-8 pb-16 sm:pb-24">
        <div className="max-w-7xl mx-auto">
          {/* Filters Section */}
          <div className="!text-white mb-8 sm:mb-12 space-y-4 sm:space-y-6">
            <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab} className="w-full">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 sm:gap-6">
                <TabsList className="grid w-full sm:w-auto grid-cols-3 rounded-full bg-stone-100/80 p-1">
                  <TabsTrigger 
                    value="all" 
                    className="!text-white rounded-full data-[state=active]:bg-white data-[state=active]:shadow-sm transition-all duration-300 sfpro-font text-xs sm:text-sm px-3 sm:px-4 py-1.5 sm:py-2"
                  >
                    <Grid className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                    <span className="!text-white hidden xs:inline">All</span>
                    <span className="xs:hidden">All</span>
                  </TabsTrigger>
                  <TabsTrigger 
                    value="featured" 
                    className="!text-white rounded-full data-[state=active]:bg-white data-[state=active]:shadow-sm transition-all duration-300 sfpro-font text-xs sm:text-sm px-3 sm:px-4 py-1.5 sm:py-2"
                  >
                    <Star className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                    <span className="hidden xs:inline">Featured</span>
                    <span className="xs:hidden">Feat</span>
                  </TabsTrigger>
                  <TabsTrigger 
                    value="recent" 
                    className="!text-white rounded-full data-[state=active]:bg-white data-[state=active]:shadow-sm transition-all duration-300 sfpro-font text-xs sm:text-sm px-3 sm:px-4 py-1.5 sm:py-2"
                  >
                    <Clock className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                    <span className="hidden xs:inline">Recent</span>
                    <span className="xs:hidden">New</span>
                  </TabsTrigger>
                </TabsList>

                <div className="flex items-center justify-between sm:justify-end gap-2 sm:gap-3">
                  <Button
                    variant={viewMode === "grid" ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setViewMode("grid")}
                    className={`rounded-full w-8 h-8 sm:w-10 sm:h-10 p-0 transition-all duration-300 ${
                      viewMode === "grid" ? "bg-stone-900 text-white hover:bg-stone-800" : "text-stone-400 hover:text-stone-900"
                    }`}
                  >
                    <Grid className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  </Button>
                  <Button
                    variant={viewMode === "list" ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setViewMode("list")}
                    className={`rounded-full w-8 h-8 sm:w-10 sm:h-10 p-0 transition-all duration-300 ${
                      viewMode === "list" ? "bg-stone-900 text-white hover:bg-stone-800" : "text-stone-400 hover:text-stone-900"
                    }`}
                  >
                    <Layers className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  </Button>
                </div>
              </div>

              <div className="mt-4 sm:mt-6 flex flex-col sm:flex-row gap-3 sm:gap-4">
                <div className="relative flex-1 group">
                  <Search className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 w-3.5 h-3.5 sm:w-4 sm:h-4 text-stone-400 transition-colors group-focus-within:text-stone-600" />
                  <Input
                    placeholder="Search projects..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="text-black pl-9 sm:pl-11 pr-10 sm:pr-12 py-4 sm:py-6 w-full text-xs sm:text-sm rounded-full border-stone-200 bg-white/80 backdrop-blur-sm focus:border-stone-300 focus:ring-0 transition-all duration-300 sfpro-font"
                  />
                  {searchQuery && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setSearchQuery("")}
                      className="absolute right-1.5 sm:right-2 top-1/2 -translate-y-1/2 h-6 w-6 sm:h-8 sm:w-8 p-0 rounded-full hover:bg-stone-100"
                    >
                      <X className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                    </Button>
                  )}
                </div>

                <div className="flex gap-2 sm:gap-3">
                  <Select value={selectedStack} onValueChange={setSelectedStack}>
                    <SelectTrigger className="w-full sm:w-[160px] rounded-full border-stone-200 bg-white/80 backdrop-blur-sm h-10 sm:h-12 px-3 sm:px-5 sfpro-font text-xs sm:text-sm">
                      <Filter className="w-3 h-3 sm:w-4 sm:h-4 mr-1.5 sm:mr-2" />
                      <SelectValue placeholder="Stack" />
                    </SelectTrigger>
                    <SelectContent className="rounded-xl border-stone-200">
                      {stacks.map(stack => (
                        <SelectItem key={stack} value={stack} className="sfpro-font text-xs sm:text-sm capitalize">
                          {stack === "all" ? "All Stacks" : stack}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <Select value={selectedYear} onValueChange={setSelectedYear}>
                    <SelectTrigger className="w-full sm:w-[140px] rounded-full border-stone-200 bg-white/80 backdrop-blur-sm h-10 sm:h-12 px-3 sm:px-5 sfpro-font text-xs sm:text-sm">
                      <Calendar className="w-3 h-3 sm:w-4 sm:h-4 mr-1.5 sm:mr-2" />
                      <SelectValue placeholder="Year" />
                    </SelectTrigger>
                    <SelectContent className="rounded-xl border-stone-200">
                      {years.map(year => (
                        <SelectItem key={year} value={year} className="sfpro-font text-xs sm:text-sm">
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
            <p className="text-xs sm:text-sm text-stone-500 sfpro-font">
              <span className="font-medium text-stone-900">{filteredProjects.length}</span> projects
            </p>
            <Badge variant="outline" className="rounded-full px-3 sm:px-4 py-1 sm:py-1.5 border-stone-200 text-stone-600 sfpro-font text-xs">
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
                  <HoverCard openDelay={200} closeDelay={100}>
                    <HoverCardTrigger asChild>
                      <Card
                        onClick={() => handleProjectClick(project.id)}
                        className="group relative overflow-hidden border-0 bg-white shadow-sm hover:shadow-xl transition-all duration-700 cursor-pointer rounded-2xl sm:rounded-3xl"
                      >
                        {/* Image Container */}
                        <div className="relative aspect-[4/5] overflow-hidden">
                          <img
                            src={project.image}
                            alt={project.name}
                            className="w-full h-full object-cover transition-all duration-700 ease-out group-hover:scale-105"
                          />
                          
                          {/* Overlay */}
                          <div className="absolute inset-0 bg-gradient-to-t from-stone-900/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                          
                          {/* Icon */}
                          <div className={`absolute top-4 right-4 sm:top-6 sm:right-6 w-8 h-8 sm:w-12 sm:h-12 bg-white/90 backdrop-blur-sm rounded-xl sm:rounded-2xl flex items-center justify-center shadow-lg transform transition-all duration-500 ${
                            hoveredId === project.id ? 'scale-110 rotate-3' : ''
                          }`}>
                            {getIcon(project.icon)}
                          </div>

                          {/* Year */}
                          <div className="absolute bottom-4 left-4 sm:bottom-6 sm:left-6">
                            <span className="text-[10px] sm:text-xs text-white/80 sfpro-font tracking-wider">
                              {project.year}
                            </span>
                          </div>
                        </div>

                        {/* Content */}
                        <CardContent className="p-4 sm:p-6 lg:p-8">
                          <div className="space-y-3 sm:space-y-4">
                            <div>
                              <h3 className="text-lg sm:text-xl lg:text-2xl font-medium text-stone-900 mb-1 sm:mb-2 clash-font">
                                {project.name}
                              </h3>
                              <p className="text-xs sm:text-sm text-stone-500 sfpro-font leading-relaxed line-clamp-2">
                                {project.shortDescription}
                              </p>
                            </div>

                            <div className="flex items-center justify-between pt-3 sm:pt-4 border-t border-stone-100">
                              <Badge variant="outline" className="rounded-full px-2 sm:px-4 py-1 sm:py-1.5 border-stone-200 text-stone-600 sfpro-font text-[10px] sm:text-xs">
                                {project.stack}
                              </Badge>
                              
                              <Button
                                variant="ghost"
                                size="sm"
                                className="rounded-full text-stone-400 hover:text-stone-900 transition-colors"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleProjectClick(project.id);
                                }}
                              >
                                <span className="text-[10px] sm:text-xs mr-1 sm:mr-2 sfpro-font">View</span>
                                <ArrowRight className="w-2.5 h-2.5 sm:w-3.5 sm:h-3.5" />
                              </Button>
                            </div>

                            {/* Client */}
                            {project.client && (
                              <div className="flex items-center text-[10px] sm:text-xs text-stone-400 sfpro-font">
                                <Briefcase className="w-2.5 h-2.5 sm:w-3 sm:h-3 mr-1 sm:mr-1.5" />
                                {project.client}
                              </div>
                            )}
                          </div>
                        </CardContent>
                      </Card>
                    </HoverCardTrigger>
                    <HoverCardContent className="w-64 sm:w-80 p-4 sm:p-5 rounded-xl sm:rounded-2xl border-0 shadow-xl bg-white/95 backdrop-blur-sm">
                      <div className="space-y-2 sm:space-y-3">
                        <h4 className="font-medium text-stone-900 clash-font text-sm sm:text-base">{project.name}</h4>
                        <p className="text-xs sm:text-sm text-stone-600 sfpro-font leading-relaxed">
                          {project.fullDescription || project.shortDescription}
                        </p>
                        <Separator className="bg-stone-100" />
                        <div className="flex items-center justify-between text-[10px] sm:text-xs">
                          <span className="text-stone-500 sfpro-font">Duration: {project.duration || "N/A"}</span>
                          <span className="text-stone-500 sfpro-font">Role: {project.role || "N/A"}</span>
                        </div>
                        {project.technologies && (
                          <div className="flex flex-wrap gap-1 sm:gap-1.5 mt-2">
                            {project.technologies.slice(0, 3).map((tech, i) => (
                              <Badge key={i} variant="secondary" className="text-[8px] sm:text-xs rounded-full px-1.5 sm:px-2.5 py-0.5 sm:py-1 bg-stone-100 text-stone-600 sfpro-font border-0">
                                {tech}
                              </Badge>
                            ))}
                            {project.technologies.length > 3 && (
                              <Badge variant="secondary" className="text-[8px] sm:text-xs rounded-full px-1.5 sm:px-2.5 py-0.5 sm:py-1 bg-stone-100 text-stone-600 sfpro-font border-0">
                                +{project.technologies.length - 3}
                              </Badge>
                            )}
                          </div>
                        )}
                      </div>
                    </HoverCardContent>
                  </HoverCard>
                </div>
              ))}
            </div>
          ) : (
            /* List View */
            <div className="space-y-3 sm:space-y-4">
              {filteredProjects.map((project) => (
                <Card
                  key={project.id}
                  onClick={() => handleProjectClick(project.id)}
                  className="group relative overflow-hidden border-0 bg-white shadow-sm hover:shadow-md transition-all duration-500 cursor-pointer rounded-xl sm:rounded-2xl"
                >
                  <div className="flex flex-col sm:flex-row">
                    <div className="sm:w-48 lg:w-56 h-32 sm:h-auto overflow-hidden">
                      <img
                        src={project.image}
                        alt={project.name}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    </div>
                    <CardContent className="flex-1 p-4 sm:p-6 lg:p-8">
                      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 sm:gap-4">
                        <div className="space-y-1 sm:space-y-2">
                          <h3 className="text-lg sm:text-xl lg:text-2xl font-medium text-stone-900 clash-font">{project.name}</h3>
                          <p className="text-xs sm:text-sm text-stone-500 sfpro-font max-w-2xl leading-relaxed">
                            {project.shortDescription}
                          </p>
                          <div className="flex flex-wrap items-center gap-2 sm:gap-4 pt-1 sm:pt-2">
                            <Badge variant="outline" className="rounded-full px-2 sm:px-4 py-1 sm:py-1.5 border-stone-200 text-stone-600 sfpro-font text-[10px] sm:text-xs">
                              {project.stack}
                            </Badge>
                            {project.client && (
                              <span className="flex items-center text-[10px] sm:text-xs text-stone-400 sfpro-font">
                                <Briefcase className="w-2.5 h-2.5 sm:w-3 sm:h-3 mr-1 sm:mr-1.5" />
                                {project.client}
                              </span>
                            )}
                            <span className="flex items-center text-[10px] sm:text-xs text-stone-400 sfpro-font">
                              <Calendar className="w-2.5 h-2.5 sm:w-3 sm:h-3 mr-1 sm:mr-1.5" />
                              {project.year}
                            </span>
                          </div>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="rounded-full text-stone-400 hover:text-stone-900 transition-colors self-start"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleProjectClick(project.slug);
                          }}
                        >
                          <span className="text-[10px] sm:text-xs mr-1 sm:mr-2 sfpro-font">View</span>
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
              <div className="w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 bg-stone-100 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
                <Search className="w-6 h-6 sm:w-8 sm:h-8 lg:w-10 lg:h-10 text-stone-400" />
              </div>
              <h3 className="text-xl sm:text-2xl font-medium text-stone-900 mb-2 sm:mb-3 clash-font">No projects found</h3>
              <p className="text-sm sm:text-base text-stone-500 mb-6 sm:mb-8 sfpro-font">Try adjusting your filters for different results</p>
              <Button
                variant="outline"
                onClick={() => {
                  setSearchQuery("");
                  setSelectedStack("all");
                  setSelectedYear("all");
                  setActiveTab("all");
                }}
                className="rounded-full px-6 sm:px-8 py-4 sm:py-6 border-stone-200 hover:border-stone-300 text-stone-600 hover:text-stone-900 transition-all sfpro-font text-xs sm:text-sm"
              >
                Clear filters
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectGallery;