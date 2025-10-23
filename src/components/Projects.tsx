'use client';
import Button from '@/components/ui/Button';
import { useProjectsData, useProjectsSectionData } from '@/hooks/usePortfolioData';
import React from 'react';

interface Project {
  id: string;
  title: string;
  shortDescription: string;
  fullDescription: string;
  imageUrl: string;
  technologies: Array<{ name: string; icon: string }>;
  githubUrl?: string;
  liveUrl?: string;
}

interface ProjectsProps {
  onProjectSelect?: (project: Project) => void;
}

const Projects: React.FC<ProjectsProps> = ({ onProjectSelect }) => {
  const projectsSection = useProjectsSectionData();
  const projects = useProjectsData();

  const handleDetailsClick = (project: Project) => {
    if (onProjectSelect) {
      onProjectSelect(project);
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-semibold text-orange-500 font-audiowide text-center">
        {projectsSection.title}
      </h2>
      
      {/* Grid de proyectos */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {projects.map((project) => (
          <div
            key={project.id}
            className="bg-gray-800 border-2 border-orange-500 rounded-xl overflow-hidden"
          >
            {/* Imagen del proyecto */}
            <div className="w-full h-48 bg-gray-700 flex items-center justify-center overflow-hidden relative group">
              <img 
                src={project.imageUrl} 
                alt={project.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              {/* Overlay oscuro al hover */}
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>

            {/* Contenido */}
            <div className="p-5 space-y-4">
              <h3 className="text-xl font-semibold text-orange-500 font-audiowide">
                {project.title}
              </h3>
              
              <p className="text-gray-300 font-orbitron text-sm leading-relaxed">
                {project.shortDescription}
              </p>

              {/* Botones */}
              <div className="flex gap-3 pt-2">
                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => handleDetailsClick(project)}
                  className="flex-1"
                >
                  {projectsSection.buttons.details}
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => window.open(project.liveUrl, '_blank')}
                  className="flex-1"
                >
                  {projectsSection.buttons.live}
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Projects;
