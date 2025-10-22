import React, { useEffect, useState } from 'react';

interface Technology {
  name: string;
  icon: string;
}

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
        
        {/* Modal */}
        <div 
          className="relative w-full max-w-2xl max-h-full bg-gray-800 border-2 border-orange-500 rounded-xl overflow-hidden shadow-2xl flex flex-col"
          style={{ zIndex: 9999999 }}
        >
          {/* Header con título */}
          <div className="flex justify-between items-center p-5 border-b border-orange-500 bg-gray-900 flex-shrink-0">
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

          {/* Contenido con scroll */}
          <div className="flex-1 overflow-y-auto no-scrollbar p-6 space-y-8">
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
              <h3 className="text-lg font-audiowide text-orange-500 mb-6">
                Stack
              </h3>
              <div className="flex justify-center gap-6">
                {project.technologies.map((tech) => (
                  <div
                    key={tech.name}
                    className="w-16 h-16 rounded-full bg-gray-700 border-2 border-orange-500 flex items-center justify-center"
                    title={tech.name}
                  >
                    <span className="text-3xl">{tech.icon}</span>
                  </div>
                ))}
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
      className="fixed bg-gray-800 border-2 border-orange-500 rounded-xl shadow-2xl overflow-hidden transform transition-all duration-500 ease-in-out"
      style={{ 
        zIndex: 9999999,
        top: `${modalPosition.top}px`,
        left: `${modalPosition.left}px`,
        width: `${modalPosition.width}px`,
        height: `${modalPosition.height}px`,
        transform: isOpen ? 'translateX(0)' : 'translateX(100%)'
      }}
    >
      <div className="h-full flex flex-col">
        {/* Header con imagen y título del proyecto */}
        <div className="p-6 pb-4">
          <div className="flex justify-end mb-4">
            <button
              onClick={onClose}
              className="text-white hover:text-orange-500 transition-colors text-xl font-bold"
            >
              ×
            </button>
          </div>
          
          {/* Imagen del proyecto */}
          <div className="w-full h-32 bg-gray-700 rounded-lg flex items-center justify-center mb-4 border-2 border-orange-500">
            <div className="w-full h-full rounded-lg bg-gradient-to-br from-gray-600 to-gray-800 flex items-center justify-center">
              <span className="text-gray-400 text-sm font-orbitron">
                {project.imageUrl.split('/').pop()?.replace('.jpg', '')}
              </span>
            </div>
          </div>

          {/* Título del proyecto */}
          <h2 className="text-lg font-audiowide text-orange-500 text-center">
            {project.title}
          </h2>
        </div>

        {/* Línea separadora horizontal */}
        <div className="h-[2px] bg-orange-500 mx-6" />

        {/* Contenido */}
        <div className="flex-1 overflow-y-auto no-scrollbar px-6 py-6 space-y-6">
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
            <h3 className="text-base font-audiowide text-orange-500 mb-4">
              Stack
            </h3>
            <div className="flex justify-center gap-4">
              {project.technologies.map((tech) => (
                <div
                  key={tech.name}
                  className="w-12 h-12 rounded-full bg-gray-700 border-2 border-orange-500 flex items-center justify-center"
                  title={tech.name}
                >
                  <span className="text-2xl">{tech.icon}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetailsModal;

