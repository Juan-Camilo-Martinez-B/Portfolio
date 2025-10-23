import React, { useEffect, useState } from 'react';
import { FaAngular, FaBootstrap, FaHtml5, FaPython } from 'react-icons/fa';
import { SiCloudinary, SiDjango, SiJavascript, SiPostgresql, SiSass, SiTypescript } from 'react-icons/si';
import Image from 'next/image';

interface Technology {
  name: string;
  icon: string;
}

// Mapeo de nombres de tecnologías a componentes de iconos
const techIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  'Django': SiDjango,
  'Python': FaPython,
  'PostgreSQL': SiPostgresql,
  'JavaScript': SiJavascript,
  'HTML5': FaHtml5,
  'Cloudinary': SiCloudinary,
  'Angular': FaAngular,
  'TypeScript': SiTypescript,
  'SCSS': SiSass,
  'Bootstrap': FaBootstrap,
};

interface Project {
  id: string;
  title: string;
  shortDescription: string;
  fullDescription: string;
  imageUrl: string;
  technologies: Technology[];
  githubUrl?: string;
  liveUrl?: string;
}

interface ProjectDetailsModalProps {
  isOpen: boolean;
  project: Project | null;
  onClose: () => void;
  onContentShift?: (shifted: boolean) => void;
}

const ProjectDetailsModal: React.FC<ProjectDetailsModalProps> = ({ 
  isOpen, 
  project, 
  onClose, 
  onContentShift 
}) => {
  const [isDesktop, setIsDesktop] = useState(false);
  const [modalPosition, setModalPosition] = useState({ top: 0, left: 0, width: 0, height: 0 });

  // Detectar si es desktop
  useEffect(() => {
    const checkIsDesktop = () => {
      setIsDesktop(window.innerWidth >= 1024); // lg breakpoint
    };
    
    checkIsDesktop();
    window.addEventListener('resize', checkIsDesktop);
    return () => window.removeEventListener('resize', checkIsDesktop);
  }, []);

  // Calcular posición del sidebar basada en el contenedor principal
  useEffect(() => {
    if (!isOpen || !isDesktop) return;

    const calculatePosition = () => {
      const mainContainer = document.querySelector('#scroll-container');
      if (mainContainer) {
        const rect = mainContainer.getBoundingClientRect();
        setModalPosition({
          top: rect.top,
          left: rect.right - 145,
          width: 320,
          height: rect.height
        });
      }
    };

    calculatePosition();
    window.addEventListener('resize', calculatePosition);
    
    return () => {
      window.removeEventListener('resize', calculatePosition);
    };
  }, [isOpen, isDesktop]);

  // Notificar cambio de contenido para desktop
  useEffect(() => {
    if (isDesktop && onContentShift) {
      onContentShift(isOpen);
    }
  }, [isOpen, isDesktop, onContentShift]);

  if (!isOpen || !project) return null;

  // Renderizado para mobile (Modal)
  if (!isDesktop) {
    return (
      <div 
        className="fixed inset-0 flex items-center justify-center p-4 pb-20"
        style={{ 
          zIndex: 9999999,
          backgroundColor: 'rgba(0, 0, 0, 0.99)',
          backdropFilter: 'blur(20px)'
        }}
      >
        {/* Overlay clickeable */}
        <div 
          className="absolute inset-0"
          onClick={onClose}
        />
        
        {/* Modal - Ahora todo el contenido tiene scroll */}
        <div 
          className="relative w-full max-w-2xl max-h-full bg-gray-800 border-2 border-orange-500 rounded-xl shadow-2xl overflow-y-auto no-scrollbar"
          style={{ zIndex: 9999999 }}
        >
          {/* Header con título */}
          <div className="sticky top-0 flex justify-between items-center p-5 border-b border-orange-500 bg-gray-900 z-10">
            <h2 className="text-xl font-audiowide text-orange-500">
              {project.title}
            </h2>
            <button
              onClick={onClose}
              className="text-white hover:text-orange-500 transition-colors text-3xl font-bold"
            >
              ×
            </button>
          </div>

          {/* Contenido */}
          <div className="p-6 space-y-8">
            {/* Descripción */}
            <div>
              <h3 className="text-lg font-audiowide text-orange-500 mb-4">
                Descripción
              </h3>
              <p className="text-gray-300 font-orbitron text-base leading-relaxed">
                {project.fullDescription}
              </p>
            </div>

            {/* Línea separadora */}
            <div className="w-full h-[2px] bg-orange-500" />

            {/* Stack */}
            <div>
              <h3 className="text-lg font-audiowide text-orange-500 mb-6 text-center">
                Stack
              </h3>
              <div className="flex justify-center gap-6 flex-wrap">
                {project.technologies.map((tech) => {
                  const IconComponent = techIcons[tech.name];
                  return (
                    <div
                      key={tech.name}
                      className="flex flex-col items-center justify-center space-y-2 group"
                    >
                      {/* Icono circular animado con efectos futuristas */}
                      <div className="relative w-16 h-16">
                        {/* Anillo exterior que gira */}
                        <div className="absolute inset-0 rounded-full border-[2px] border-orange-500/40 animate-spin-slow" />
                        
                        {/* Icono principal */}
                        <div className="absolute inset-0 rounded-full bg-gradient-to-br from-gray-800 to-gray-900 border-[2px] border-orange-500 flex items-center justify-center transform transition-all duration-500 group-hover:scale-125 group-hover:rotate-[360deg] group-hover:border-orange-400 group-hover:shadow-xl group-hover:shadow-orange-500/60 group-hover:from-orange-900/20 group-hover:to-gray-900">
                          {IconComponent ? (
                            <IconComponent className="text-3xl text-orange-500 filter group-hover:drop-shadow-[0_0_8px_rgba(249,115,22,0.8)] transition-all duration-500" />
                          ) : (
                            <span className="text-3xl filter group-hover:drop-shadow-[0_0_8px_rgba(249,115,22,0.8)] transition-all duration-500">{tech.icon}</span>
                          )}
                        </div>
                        
                        {/* Pulso de energía */}
                        <div className="absolute inset-0 rounded-full bg-orange-500/20 blur-md opacity-0 group-hover:opacity-100 group-hover:animate-pulse" />
                      </div>
                      
                      {/* Nombre de la tecnología con efecto neón */}
                      <span className="text-white font-orbitron text-xs text-center w-20 truncate group-hover:text-orange-500 group-hover:drop-shadow-[0_0_8px_rgba(249,115,22,0.6)] transition-all duration-300">
                        {tech.name}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Renderizado para desktop (sidebar)
  return (
    <div 
      className="fixed bg-gray-800 border-2 border-orange-500 rounded-xl shadow-2xl transform transition-all duration-500 ease-in-out overflow-y-auto no-scrollbar"
      style={{ 
        zIndex: 9999999,
        top: `${modalPosition.top}px`,
        left: `${modalPosition.left}px`,
        width: `${modalPosition.width}px`,
        height: `${modalPosition.height}px`,
        transform: isOpen ? 'translateX(0)' : 'translateX(100%)'
      }}
    >
      {/* Botón de cerrar sticky */}
      <div className="sticky top-0 flex justify-end p-4 bg-gray-800 z-10">
        <button
          onClick={onClose}
          className="text-white hover:text-orange-500 transition-colors text-xl font-bold"
        >
          ×
        </button>
      </div>

      {/* Todo el contenido scrolleable */}
      <div className="px-6 pb-6 space-y-4">
        {/* Imagen del proyecto */}
        <div className="w-full h-80 bg-gray-700 rounded-lg overflow-hidden border-2 border-orange-500 relative">
          <Image 
            src={project.imageUrl} 
            alt={project.title}
            fill
            className="object-cover"
          />
        </div>

        {/* Título del proyecto */}
        <h2 className="text-lg font-audiowide text-orange-500 text-center">
          {project.title}
        </h2>

        {/* Línea separadora horizontal */}
        <div className="h-[2px] bg-orange-500" />

        {/* Descripción */}
        <div>
          <h3 className="text-base font-audiowide text-orange-500 mb-3">
            Descripción
          </h3>
          <p className="text-gray-300 font-orbitron text-sm leading-relaxed">
            {project.fullDescription}
          </p>
        </div>

        {/* Línea separadora */}
        <div className="w-full h-[1px] bg-orange-500" />

        {/* Stack */}
        <div>
          <h3 className="text-base font-audiowide text-orange-500 mb-4 text-center">
            Stack
          </h3>
          <div className="flex justify-center gap-4 flex-wrap">
            {project.technologies.map((tech) => {
              const IconComponent = techIcons[tech.name];
              return (
                <div
                  key={tech.name}
                  className="flex flex-col items-center justify-center space-y-1 group"
                >
                  {/* Icono circular animado con efectos futuristas */}
                  <div className="relative w-12 h-12">
                    {/* Anillo exterior que gira */}
                    <div className="absolute inset-0 rounded-full border-[2px] border-orange-500/40 animate-spin-slow" />
                    
                    {/* Icono principal */}
                    <div className="absolute inset-0 rounded-full bg-gradient-to-br from-gray-800 to-gray-900 border-[2px] border-orange-500 flex items-center justify-center transform transition-all duration-500 group-hover:scale-125 group-hover:rotate-[360deg] group-hover:border-orange-400 group-hover:shadow-xl group-hover:shadow-orange-500/60 group-hover:from-orange-900/20 group-hover:to-gray-900">
                      {IconComponent ? (
                        <IconComponent className="text-xl text-orange-500 filter group-hover:drop-shadow-[0_0_8px_rgba(249,115,22,0.8)] transition-all duration-500" />
                      ) : (
                        <span className="text-xl filter group-hover:drop-shadow-[0_0_8px_rgba(249,115,22,0.8)] transition-all duration-500">{tech.icon}</span>
                      )}
                    </div>
                    
                    {/* Pulso de energía */}
                    <div className="absolute inset-0 rounded-full bg-orange-500/20 blur-md opacity-0 group-hover:opacity-100 group-hover:animate-pulse" />
                  </div>
                  
                  {/* Nombre de la tecnología con efecto neón */}
                  <span className="text-white font-orbitron text-[10px] text-center w-16 truncate group-hover:text-orange-500 group-hover:drop-shadow-[0_0_8px_rgba(249,115,22,0.6)] transition-all duration-300">
                    {tech.name}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetailsModal;

