import React from 'react';
import { useProjectsData } from '@/hooks/usePortfolioData';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';

const Projects: React.FC = () => {
  const projects = useProjectsData();

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-semibold text-orange-500 font-audiowide">
        Proyectos
      </h2>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {projects.map((project) => (
          <Card key={project.id} className="p-5 space-y-4">
            <div className="space-y-3">
              <div className="flex items-center gap-2 flex-wrap">
                <h3 className="text-xl font-semibold text-orange-500 font-audiowide">
                  {project.title}
                </h3>
                {project.featured && (
                  <span className="px-2 py-1 bg-orange-500 text-black text-xs font-audiowide rounded">
                    Destacado
                  </span>
                )}
              </div>
              <p className="text-gray-300 font-orbitron leading-relaxed">
                {project.description}
              </p>
            </div>
            
            <div className="space-y-3">
              <h4 className="text-sm font-semibold text-orange-500 font-audiowide">
                Tecnologías:
              </h4>
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1 bg-gray-700 text-gray-300 rounded-full text-sm font-orbitron"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
            
            <div className="flex gap-3 pt-2">
              {project.githubUrl && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => window.open(project.githubUrl, '_blank')}
                >
                  GitHub
                </Button>
              )}
              {project.liveUrl && (
                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => window.open(project.liveUrl, '_blank')}
                >
                  Ver Demo
                </Button>
              )}
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Projects;
