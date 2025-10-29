import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { BsCloudSunFill } from 'react-icons/bs';
import { FaAngular, FaBootstrap, FaHtml5, FaJava, FaPython, FaReact } from 'react-icons/fa';
import { HiLockClosed, HiMusicalNote } from 'react-icons/hi2';
import { IoFitness } from 'react-icons/io5';
import { SiApachemaven, SiCloudinary, SiDjango, SiJavascript, SiMongodb, SiNextdotjs, SiPostgresql, SiRailway, SiSass, SiSpring, SiTailwindcss, SiTypescript, SiVercel } from 'react-icons/si';
import { useProjectsSectionData, useProjectsData } from '@/hooks/usePortfolioData';

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
  'Java': FaJava,
  'Spring Boot': SiSpring,
  'MongoDB': SiMongodb,
  'Next.js': SiNextdotjs,
  'React': FaReact,
  'Tailwind CSS': SiTailwindcss,
  'Maven': SiApachemaven,
  'Railway': SiRailway,
  'Vercel': SiVercel,
  // Las tecnologías sin icono específico usarán el emoji del JSON
  // 'Leaflet': usa 🗺️
  // 'Zustand': usa 🐻
  // 'Framer Motion': usa ✨
  // 'OpenStreetMap': usa 🌍
};

interface ProjectDetailsModalProps {
  isOpen: boolean;
  projectId: string | null;
  onClose: () => void;
  onContentShift?: (shifted: boolean) => void;
}

const ProjectDetailsModal: React.FC<ProjectDetailsModalProps> = ({ 
  isOpen, 
  projectId, 
  onClose, 
  onContentShift 
}) => {
  const projectsSectionData = useProjectsSectionData();
  const projects = useProjectsData();
  const project = projects.find(p => p.id === projectId);
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
      <aside 
        className="fixed inset-0 flex items-center justify-center p-4 pb-20"
        role="dialog"
        aria-modal="true"
        style={{ 
          zIndex: 100,
          backgroundColor: 'rgba(0, 0, 0, 0.99)',
          backdropFilter: 'blur(20px)'
        }}
      >
        <div 
          className="absolute inset-0"
          onClick={onClose}
        />
        
        <article 
          className="relative w-full max-w-2xl max-h-full bg-white dark:bg-gray-800 border-2 border-blue-500 dark:border-orange-500 rounded-xl shadow-2xl overflow-y-auto no-scrollbar transition-colors duration-300"
          style={{ zIndex: 101 }}
        >
          <header className="sticky top-0 flex justify-between items-center p-5 border-b border-blue-500 dark:border-orange-500 bg-gray-50 dark:bg-gray-900 z-10 transition-colors duration-300">
            <h2 className="text-xl font-orbitron text-blue-500 dark:text-orange-500">
              {project.title}
            </h2>
            <button
              onClick={onClose}
              className="text-gray-900 dark:text-white hover:text-blue-500 dark:hover:text-orange-500 transition-colors text-3xl font-bold"
            >
              ×
            </button>
          </header>

          <section className="p-6 space-y-8">
            {/* Descripción */}
            <div>
              <h3 className="text-lg font-orbitron text-blue-500 dark:text-orange-500 mb-4">
                {projectsSectionData.modal.description}
              </h3>
              <p className="text-gray-900 dark:text-white font-audiowide text-base leading-relaxed transition-colors duration-300">
                {project.fullDescription}
              </p>
            </div>

            <hr className="w-full h-[2px] bg-blue-500 dark:bg-orange-500 border-0" />

            {/* Stack */}
            <div>
              <h3 className="text-lg font-orbitron text-blue-500 dark:text-orange-500 mb-6 text-center">
                {projectsSectionData.modal.stack}
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
                        <div className="absolute inset-0 rounded-full border-[2px] border-blue-500 dark:border-orange-500/40 animate-spin-slow" />
                        
                        {/* Icono principal */}
                        <div className="absolute inset-0 rounded-full bg-gradient-to-br from-gray-500/50 to-gray-500/50 dark:from-gray-800 dark:to-gray-900 border-[2px] border-blue-500 dark:border-orange-500 flex items-center justify-center transform transition-all duration-500 group-hover:scale-125 group-hover:rotate-[360deg] group-hover:border-blue-400 dark:group-hover:border-orange-400 group-hover:shadow-xl group-hover:shadow-blue-500/60 dark:group-hover:shadow-orange-500/60 group-hover:from-blue-200/30 dark:group-hover:from-orange-900/20 group-hover:to-gray-500/50 dark:group-hover:to-gray-900">
                          {IconComponent ? (
                            <IconComponent className="text-3xl text-blue-500 dark:text-orange-500 filter group-hover:drop-shadow-[0_0_8px_rgba(59,130,246,0.8)] dark:group-hover:drop-shadow-[0_0_8px_rgba(249,115,22,0.8)] transition-all duration-500" />
                          ) : (
                            <span className="text-3xl filter group-hover:drop-shadow-[0_0_8px_rgba(59,130,246,0.8)] dark:group-hover:drop-shadow-[0_0_8px_rgba(249,115,22,0.8)] transition-all duration-500">{tech.icon}</span>
                          )}
                        </div>
                        
                        {/* Pulso de energía */}
                        <div className="absolute inset-0 rounded-full bg-blue-500 dark:bg-orange-500/20 blur-md opacity-0 group-hover:opacity-100 group-hover:animate-pulse" />
                      </div>
                      
                      {/* Nombre de la tecnología con efecto neón */}
                      <span className="text-gray-900 dark:text-white font-audiowide text-xs text-center w-20 truncate group-hover:text-blue-500 dark:hover:text-orange-500 group-hover:drop-shadow-[0_0_8px_rgba(59,130,246,0.6)] dark:group-hover:drop-shadow-[0_0_8px_rgba(249,115,22,0.6)] transition-all duration-300">
                        {tech.name}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>
        </article>
      </aside>
    );
  }

  // Renderizado para desktop (sidebar)
  return (
    <aside 
      className="fixed bg-white dark:bg-gray-800 border-2 border-blue-500 dark:border-orange-500 rounded-xl shadow-2xl transform transition-all duration-500 ease-in-out overflow-y-auto no-scrollbar"
      role="dialog"
      aria-modal="true"
      style={{ 
        zIndex: 100,
        top: `${modalPosition.top}px`,
        left: `${modalPosition.left}px`,
        width: `${modalPosition.width}px`,
        height: `${modalPosition.height}px`,
        transform: isOpen ? 'translateX(0)' : 'translateX(100%)'
      }}
    >
      <header className="sticky top-0 flex justify-end p-4 bg-white dark:bg-gray-800 z-10 transition-colors duration-300">
        <button
          onClick={onClose}
          className="text-gray-900 dark:text-white hover:text-blue-500 dark:hover:text-orange-500 transition-colors text-xl font-bold"
        >
          ×
        </button>
      </header>

      <section className="px-6 pb-6 space-y-4">
        <figure className="w-full h-80 bg-gray-200 dark:bg-gray-700 rounded-lg overflow-hidden border-2 border-blue-500 dark:border-orange-500 relative flex items-center justify-center transition-colors duration-300">
          {project.imageUrl === 'icon:lock' ? (
            <div className="relative">
              {/* Icono principal con gradiente azul a blanco */}
              <HiLockClosed className="text-9xl text-blue-500 drop-shadow-[0_0_40px_rgba(59,130,246,1)]" />
              {/* Resplandor adicional blanco */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-40 h-40 bg-white/10 rounded-full blur-3xl"></div>
              </div>
            </div>
          ) : project.imageUrl === 'icon:music' ? (
            <div className="relative">
              {/* Icono principal con color verde */}
              <HiMusicalNote className="text-9xl text-green-500 drop-shadow-[0_0_40px_rgba(34,197,94,1)]" />
              {/* Resplandor adicional verde */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-40 h-40 bg-green-400/10 rounded-full blur-3xl"></div>
              </div>
            </div>
          ) : project.imageUrl === 'icon:fitness' ? (
            <div className="relative">
              {/* Icono principal con gradiente naranja/rojo */}
              <IoFitness className="text-9xl text-blue-500 dark:text-orange-500 drop-shadow-[0_0_40px_rgba(59,130,246,1)] dark:drop-shadow-[0_0_40px_rgba(249,115,22,1)]" />
              {/* Resplandor naranja */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-40 h-40 bg-blue-400/20 dark:bg-orange-400/20 rounded-full blur-3xl"></div>
              </div>
              {/* Resplandor rojo */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-44 h-44 bg-red-400/10 rounded-full blur-3xl"></div>
              </div>
            </div>
          ) : project.imageUrl === 'icon:weather' ? (
            <div className="relative">
              {/* Icono de nube con sol */}
              <BsCloudSunFill className="text-9xl text-white drop-shadow-[0_0_40px_rgba(255,255,255,0.8)]"
                style={{
                  filter: 'drop-shadow(0 0 25px rgba(250, 204, 21, 1))'
                }}
              />
              {/* Resplandor amarillo del sol */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-44 h-44 bg-yellow-400/20 rounded-full blur-3xl"></div>
              </div>
              {/* Resplandor blanco de la nube */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-48 h-48 bg-white/10 rounded-full blur-3xl"></div>
              </div>
            </div>
          ) : (
            <Image 
              src={project.imageUrl} 
              alt={project.title}
              fill
              className="object-cover"
            />
          )}
        </figure>

        <h2 className="text-lg font-orbitron text-blue-500 dark:text-orange-500 text-center">
          {project.title}
        </h2>

        <hr className="h-[2px] bg-blue-500 dark:bg-orange-500 border-0" />

        {/* Descripción */}
        <div>
          <h3 className="text-base font-orbitron text-blue-500 dark:text-orange-500 mb-3">
            {projectsSectionData.modal.description}
          </h3>
          <p className="text-gray-900 dark:text-white font-audiowide text-sm leading-relaxed transition-colors duration-300">
            {project.fullDescription}
          </p>
        </div>

        <hr className="w-full h-[1px] bg-blue-500 dark:bg-orange-500 border-0" />

        {/* Stack */}
        <div>
          <h3 className="text-base font-orbitron text-blue-500 dark:text-orange-500 mb-4 text-center">
            {projectsSectionData.modal.stack}
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
                    <div className="absolute inset-0 rounded-full border-[2px] border-blue-500 dark:border-orange-500/40 animate-spin-slow" />
                    
                    {/* Icono principal */}
                    <div className="absolute inset-0 rounded-full bg-gradient-to-br from-gray-500/50 to-gray-500/50 dark:from-gray-800 dark:to-gray-900 border-[2px] border-blue-500 dark:border-orange-500 flex items-center justify-center transform transition-all duration-500 group-hover:scale-125 group-hover:rotate-[360deg] group-hover:border-blue-400 dark:group-hover:border-orange-400 group-hover:shadow-xl group-hover:shadow-blue-500/60 dark:group-hover:shadow-orange-500/60 group-hover:from-blue-200/30 dark:group-hover:from-orange-900/20 group-hover:to-gray-500/50 dark:group-hover:to-gray-900">
                      {IconComponent ? (
                        <IconComponent className="text-xl text-blue-500 dark:text-orange-500 filter group-hover:drop-shadow-[0_0_8px_rgba(59,130,246,0.8)] dark:group-hover:drop-shadow-[0_0_8px_rgba(249,115,22,0.8)] transition-all duration-500" />
                      ) : (
                        <span className="text-xl filter group-hover:drop-shadow-[0_0_8px_rgba(59,130,246,0.8)] dark:group-hover:drop-shadow-[0_0_8px_rgba(249,115,22,0.8)] transition-all duration-500">{tech.icon}</span>
                      )}
                    </div>
                    
                    {/* Pulso de energía */}
                    <div className="absolute inset-0 rounded-full bg-blue-500 dark:bg-orange-500/20 blur-md opacity-0 group-hover:opacity-100 group-hover:animate-pulse" />
                  </div>
                  
                  {/* Nombre de la tecnología con efecto neón */}
                  <span className="text-gray-900 dark:text-white font-audiowide text-[10px] text-center w-16 truncate group-hover:text-blue-500 dark:hover:text-orange-500 group-hover:drop-shadow-[0_0_8px_rgba(59,130,246,0.6)] dark:group-hover:drop-shadow-[0_0_8px_rgba(249,115,22,0.6)] transition-all duration-300">
                    {tech.name}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </aside>
  );
};

export default ProjectDetailsModal;

