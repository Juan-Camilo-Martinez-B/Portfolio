'use client';
import Button from '@/components/ui/Button';
import { useProjectsData, useProjectsSectionData } from '@/hooks/usePortfolioData';
import Image from 'next/image';
import React from 'react';
import { BsCloudSunFill } from 'react-icons/bs';
import { FaGithub } from 'react-icons/fa';
import { HiLockClosed, HiMusicalNote } from 'react-icons/hi2';
import { IoFitness } from 'react-icons/io5';

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
  const [hoveredProject, setHoveredProject] = React.useState<string | null>(null);

  const handleDetailsClick = (project: Project) => {
    if (onProjectSelect) {
      onProjectSelect(project);
    }
  };

  return (
    <section className="space-y-6">
      <h2 className="text-3xl font-semibold text-orange-500 font-orbitron text-center">
        {projectsSection.title}
      </h2>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {projects.map((project) => (
          <article
            key={project.id}
            className="bg-gray-800 border-2 border-orange-500 rounded-xl overflow-hidden"
          >
            <figure 
              className="w-full h-48 bg-gray-700 flex items-center justify-center overflow-hidden relative group"
              onMouseEnter={() => setHoveredProject(project.id)}
              onMouseLeave={() => setHoveredProject(null)}
            >
              {/* Renderizar icono o imagen */}
              {project.imageUrl === 'icon:lock' ? (
                /* Icono de candado para Control Plus */
                <div className={`absolute inset-0 flex items-center justify-center transition-all duration-500 ${
                  hoveredProject === project.id ? 'opacity-0 scale-110' : 'opacity-100 group-hover:scale-105'
                }`}>
                  <div className="relative">
                    {/* Icono principal con gradiente azul a blanco */}
                    <HiLockClosed className="text-9xl text-blue-500 drop-shadow-[0_0_30px_rgba(59,130,246,0.8)]" />
                    {/* Resplandor adicional */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-32 h-32 bg-blue-400/20 rounded-full blur-2xl animate-pulse"></div>
                    </div>
                  </div>
                </div>
              ) : project.imageUrl === 'icon:music' ? (
                /* Icono de música para MP3 Player */
                <div className={`absolute inset-0 flex items-center justify-center transition-all duration-500 ${
                  hoveredProject === project.id ? 'opacity-0 scale-110' : 'opacity-100 group-hover:scale-105'
                }`}>
                  <div className="relative">
                    {/* Icono principal con color verde */}
                    <HiMusicalNote className="text-9xl text-green-500 drop-shadow-[0_0_30px_rgba(34,197,94,0.8)]" />
                    {/* Resplandor adicional */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-32 h-32 bg-green-400/20 rounded-full blur-2xl animate-pulse"></div>
                    </div>
                  </div>
                </div>
              ) : project.imageUrl === 'icon:fitness' ? (
                /* Icono de fitness para Fitness Tracker */
                <div className={`absolute inset-0 flex items-center justify-center transition-all duration-500 ${
                  hoveredProject === project.id ? 'opacity-0 scale-110' : 'opacity-100 group-hover:scale-105'
                }`}>
                  <div className="relative">
                    {/* Icono principal con gradiente naranja/rojo */}
                    <IoFitness className="text-9xl text-orange-500 drop-shadow-[0_0_30px_rgba(249,115,22,0.8)]" />
                    {/* Resplandor adicional */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-32 h-32 bg-orange-400/20 rounded-full blur-2xl animate-pulse"></div>
                    </div>
                    {/* Resplandor secundario rojo */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-36 h-36 bg-red-400/10 rounded-full blur-3xl"></div>
                    </div>
                  </div>
                </div>
              ) : project.imageUrl === 'icon:weather' ? (
                /* Icono de clima para ClimaGlobal */
                <div className={`absolute inset-0 flex items-center justify-center transition-all duration-500 ${
                  hoveredProject === project.id ? 'opacity-0 scale-110' : 'opacity-100 group-hover:scale-105'
                }`}>
                  <div className="relative">
                    {/* Icono de nube con sol */}
                    <BsCloudSunFill className="text-9xl text-white drop-shadow-[0_0_30px_rgba(255,255,255,0.6)]" 
                      style={{
                        filter: 'drop-shadow(0 0 20px rgba(250, 204, 21, 0.8))'
                      }}
                    />
                    {/* Resplandor amarillo del sol */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-32 h-32 bg-yellow-400/30 rounded-full blur-2xl animate-pulse"></div>
                    </div>
                    {/* Resplandor blanco de la nube */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-36 h-36 bg-white/10 rounded-full blur-3xl"></div>
                    </div>
                  </div>
                </div>
              ) : (
                /* Imagen estática */
                <Image 
                  src={project.imageUrl} 
                  alt={project.title}
                  fill
                  className={`object-cover transition-all duration-500 ${
                    hoveredProject === project.id ? 'opacity-0 scale-110' : 'opacity-100 group-hover:scale-105'
                  }`}
                />
              )}
              
              {/* Vista previa en vivo (iframe) */}
              {hoveredProject === project.id && project.liveUrl && (
                <div className="absolute inset-0 z-10 animate-fadeIn">
                  <iframe
                    src={project.liveUrl}
                    className="w-full h-full border-none pointer-events-none"
                    title={`Vista previa de ${project.title}`}
                    loading="lazy"
                    sandbox="allow-scripts allow-same-origin"
                  />
                  {/* Overlay sutil para mejor contraste */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent pointer-events-none" />
                  
                  {/* Indicador de vista previa */}
                  <div className="absolute top-2 right-2 bg-orange-500 text-white text-xs font-orbitron px-2 py-1 rounded-md shadow-lg">
                    Vista Previa
                  </div>
                </div>
              )}
              
              {/* Overlay oscuro al hover (solo cuando no hay iframe) */}
              {hoveredProject !== project.id && (
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              )}
            </figure>

            <div className="p-5 space-y-4">
              <div className="flex items-center justify-between gap-2">
                <h3 className="text-xl font-semibold text-orange-500 font-orbitron">
                  {project.title}
                </h3>
                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-orange-500 hover:text-orange-400 transition-all duration-300 hover:scale-110 flex-shrink-0"
                    title="Ver repositorio en GitHub"
                  >
                    <FaGithub className="text-2xl" />
                  </a>
                )}
              </div>
              
              <p className="text-white font-audiowide text-sm leading-relaxed">
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
          </article>
        ))}
      </div>
    </section>
  );
};

export default Projects;
