import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "../components/ui/button";
import { Card, CardContent } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { AspectRatio } from "../components/ui/aspect-ratio";
import { ArrowUpRight } from 'lucide-react';
import { getProjectIcon } from '../data/projectsIcon';
import projectsData from '../data/projects.json';

const ProjectsPage = () => {
  const navigate = useNavigate();
  const { projects } = projectsData;

  const handleProjectClick = (projectId) => {
    navigate(`/project/${projectId}`);
  };

  return (
    <div className="w-full bg-white py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <Badge variant="outline" className="mb-4 px-4 py-1.5 rounded-full border-gray-200 bg-gray-50/80">
            <span className="text-xs font-medium text-gray-600">OUR WORK</span>
          </Badge>
          
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif italic text-gray-900 mb-4">
            Our latest projects
            <span className="clash-font font-semibold block font-sans font-bold not-italic text-4xl sm:text-5xl lg:text-6xl mt-2 bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
              created with Webflow
            </span>
          </h2>
          
          <p className="text-base sm:text-lg text-gray-500 max-w-2xl mx-auto">
            Webflow project presentation mockup
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {projects.map((project) => (
            <Card 
              key={project.id}
              onClick={() => handleProjectClick(project.id)}
              className="group border-0 shadow-sm hover:shadow-xl transition-all duration-500 overflow-hidden rounded-2xl bg-white cursor-pointer"
            >
              {/* Image Container */}
              <div className="relative overflow-hidden">
                <AspectRatio ratio={4/3}>
                  <img
                    src={project.image}
                    alt={project.name}
                    className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/5 group-hover:bg-black/10 transition-colors duration-500"></div>
                </AspectRatio>
                
                {/* Stack Badge */}
                <div className="absolute top-4 left-4">
                  <Badge className="bg-white/95 backdrop-blur-sm text-gray-900 border-0 shadow-md px-3 py-1.5 rounded-full text-xs font-medium">
                    <span className="mr-1.5">{getProjectIcon(project.icon)}</span>
                    {project.stack}
                  </Badge>
                </div>
              </div>
              
              <CardContent className="p-5">
                {/* Project Name & Description */}
                <div className="flex items-start justify-between mb-2">
                  <h3 className="text-xl font-bold text-gray-900">
                    {project.name}
                  </h3>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="rounded-full w-8 h-8 bg-gray-50 hover:bg-gray-900 hover:text-white transition-all duration-300 -mt-1"
                  >
                    <ArrowUpRight className="w-4 h-4" />
                  </Button>
                </div>
                
                <p className="sfpro-font font-medium text-sm text-gray-500 leading-relaxed">
                  {project.shortDescription}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Simple CTA */}
        <div className="flex justify-center mt-12">
          <Button 
            variant="outline"
            className="sfpro-font font-medium border-gray-300 text-gray-900 hover:bg-gray-900 hover:text-white hover:border-gray-900 px-8 py-5 rounded-full text-sm font-medium transition-all duration-300"
          >
            View all projects
            <ArrowUpRight className="w-3.5 h-3.5 ml-2" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProjectsPage;