import { useAboutData } from '@/hooks/usePortfolioData';
import { cn } from '@/lib/utils';
import React, { useEffect, useState } from 'react';

interface DynamicModalProps {
  isOpen: boolean;
  onClose: () => void;
  onContentShift?: (shifted: boolean) => void;
}

const DynamicModal: React.FC<DynamicModalProps> = ({ isOpen, onClose, onContentShift }) => {
  const aboutData = useAboutData();
  const [scrollPosition, setScrollPosition] = useState(0);
  const [isScrolling, setIsScrolling] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);
  const [modalPosition, setModalPosition] = useState({ top: 0, left: 0, width: 0, height: 0 });

  // Scroll infinito vertical automático
  useEffect(() => {
    if (!isOpen || !isScrolling) return;

    const scrollSpeed = 0.5; // Velocidad del scroll vertical
    const interval = setInterval(() => {
      setScrollPosition((prev) => {
        // Calcular altura total del contenido (aproximadamente 600px por sección)
        const contentHeight = aboutData.modal.images.length * 100 + 200; // Altura estimada del contenido
        return prev >= contentHeight ? 0 : prev + scrollSpeed;
      });
    }, 50); // Intervalo para scroll suave

    return () => clearInterval(interval);
  }, [isOpen, isScrolling, aboutData.modal.images.length]);

  // Detectar si es desktop
  useEffect(() => {
    const checkIsDesktop = () => {
      setIsDesktop(window.innerWidth >= 1024); // lg breakpoint
    };
    
    checkIsDesktop();
    window.addEventListener('resize', checkIsDesktop);
    return () => window.removeEventListener('resize', checkIsDesktop);
  }, []);

  // Calcular posición del modal basada en el contenedor principal
  useEffect(() => {
    if (!isOpen || !isDesktop) return;

    const calculatePosition = () => {
      const mainContainer = document.querySelector('#scroll-container');
      if (mainContainer) {
        const rect = mainContainer.getBoundingClientRect();
        setModalPosition({
          top: rect.top,
          left: rect.right - 145, // 8px de separación - más cerca
          width: 320,
          height: rect.height
        });
      }
    };

    calculatePosition();
    window.addEventListener('resize', calculatePosition);
    window.addEventListener('scroll', calculatePosition);
    
    return () => {
      window.removeEventListener('resize', calculatePosition);
      window.removeEventListener('scroll', calculatePosition);
    };
  }, [isOpen, isDesktop]);

  // Notificar cambio de contenido para desktop
  useEffect(() => {
    if (isDesktop && onContentShift) {
      onContentShift(isOpen);
    }
  }, [isOpen, isDesktop, onContentShift]);

  // Iniciar scroll automático al abrir
  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => setIsScrolling(true), 1000);
      return () => clearTimeout(timer);
    } else {
      setIsScrolling(false);
      setScrollPosition(0);
    }
  }, [isOpen]);

  // Pausar scroll al hacer hover
  const handleMouseEnter = () => setIsScrolling(false);
  const handleMouseLeave = () => setIsScrolling(true);

  if (!isOpen) return null;

  // Renderizado para mobile (comportamiento original)
  if (!isDesktop) {
    return (
      <div 
        className="fixed inset-0 flex items-center justify-center"
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
          className="relative w-full max-w-5xl mx-4 bg-gray-800 border-2 border-orange-500 rounded-xl overflow-hidden shadow-2xl"
          style={{ zIndex: 9999999 }}
        >
          {/* Header */}
          <div className="flex justify-between items-center p-4 border-b border-orange-500 bg-gray-900">
            <h2 className="text-xl font-audiowide text-orange-500">
              {aboutData.modal.title}
            </h2>
            <button
              onClick={onClose}
              className="text-white hover:text-orange-500 transition-colors text-2xl font-bold"
            >
              ×
            </button>
          </div>

          {/* Contenido con títulos verticales y scroll horizontal */}
          <div 
            className="relative h-80 md:h-96 overflow-hidden bg-gray-800"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <div
              className="flex h-full transition-transform duration-75 ease-linear"
              style={{ transform: `translateX(-${scrollPosition}px)` }}
            >
              {/* Duplicar imágenes para scroll infinito */}
              {[...aboutData.modal.images, ...aboutData.modal.images].map((image, index) => (
                <div
                  key={`${image.id}-${index}`}
                  className="flex-shrink-0 w-80 h-full flex items-center justify-center p-6 space-x-6"
                >
                  {/* Título vertical - Referencias (primeras 3 imágenes) */}
                  {image.id === 1 && index < aboutData.modal.images.length && (
                    <div className="flex flex-col items-center justify-center p-3">
                      <h3 
                        className="text-lg md:text-xl font-audiowide text-orange-500 whitespace-nowrap"
                        style={{ 
                          writingMode: 'vertical-rl',
                          textOrientation: 'mixed',
                          transform: 'rotate(180deg)'
                        }}
                      >
                        {aboutData.modal.sections.references.title}
                      </h3>
                    </div>
                  )}
                  
                  {/* Título vertical - Lo que amo hacer (después de la 3ra imagen) */}
                  {image.id === 4 && index < aboutData.modal.images.length && (
                    <div className="flex flex-col items-center justify-center p-3">
                      <h3 
                        className="text-lg md:text-xl font-audiowide text-orange-500 whitespace-nowrap"
                        style={{ 
                          writingMode: 'vertical-rl',
                          textOrientation: 'mixed',
                          transform: 'rotate(180deg)'
                        }}
                      >
                        {aboutData.modal.sections.myWorld.title}
                      </h3>
                    </div>
                  )}

                  {/* Contenedor de imagen y descripciones con patrón arriba/abajo */}
                  <div className="flex flex-col items-center justify-center space-y-4">
                    {/* Descripción arriba (solo para imágenes pares) */}
                    {image.id % 2 === 0 && (
                      <div className="max-w-32">
                        <p className="text-white font-orbitron text-xs md:text-sm leading-relaxed text-center">
                          {image.description}
                        </p>
                      </div>
                    )}

                    {/* Imagen circular */}
                    <div className="w-32 md:w-40 h-32 md:h-40 border-2 border-orange-500 rounded-full bg-white flex items-center justify-center">
                      <div className="w-full h-full rounded-full bg-gradient-to-br from-gray-100 to-gray-300 flex items-center justify-center">
                        <span className="text-gray-600 text-xs font-orbitron">
                          {image.placeholder}
                        </span>
                      </div>
                    </div>
                    
                    {/* Descripción abajo (solo para imágenes impares) */}
                    {image.id % 2 === 1 && (
                      <div className="max-w-32">
                        <p className="text-white font-orbitron text-xs md:text-sm leading-relaxed text-center">
                          {image.description}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Indicador de scroll */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
              <div className="flex space-x-2">
                {aboutData.modal.images.map((_, index) => (
                  <div
                    key={index}
                    className={cn(
                      "w-2 h-2 rounded-full transition-colors duration-300",
                      Math.floor(scrollPosition / 250) % aboutData.modal.images.length === index
                        ? "bg-orange-500"
                        : "bg-gray-500"
                    )}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Footer con controles */}
          <div className="p-4 border-t border-orange-500 bg-gray-900">
            <div className="flex justify-center space-x-4">
              <button
                onClick={() => setIsScrolling(!isScrolling)}
                className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors font-audiowide text-sm"
              >
                {isScrolling ? "Pausar" : "Reproducir"}
              </button>
              <button
                onClick={() => setScrollPosition(0)}
                className="px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors font-audiowide text-sm"
              >
                Reiniciar
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Renderizado para desktop (sidebar) - altura reducida
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
      {/* Contenido del sidebar con scroll vertical */}
      <div 
        className="relative h-full bg-gray-800"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div className="h-full flex flex-col">
          {/* Header con botón de cerrar */}
          <div className="flex justify-between items-center p-6 pb-4">
            <h2 className="text-lg font-audiowide text-orange-500">
              {aboutData.modal.title}
            </h2>
            <button
              onClick={onClose}
              className="text-white hover:text-orange-500 transition-colors text-xl font-bold"
            >
              ×
            </button>
          </div>

          {/* Línea separadora horizontal */}
          <div className="h-[2px] bg-orange-500 mx-6" />

          {/* Contenido con scroll infinito - solo las imágenes */}
          <div 
            className="flex-1 overflow-y-auto no-scrollbar px-6 py-4"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            ref={(el) => {
              if (el) {
                el.scrollTop = scrollPosition;
              }
            }}
          >
            <div className="space-y-8">
              {/* Sección de Referencias */}
              <div>
                <h3 className="text-lg font-audiowide text-orange-500 mb-6 text-center">
                  {aboutData.modal.sections.references.title}
                </h3>
                <div className="space-y-8">
                  {aboutData.modal.images.slice(0, 3).map((image) => (
                    <div key={image.id} className="flex items-center space-x-6">
                      <div className="w-20 h-20 border-2 border-orange-500 rounded-full bg-white flex items-center justify-center flex-shrink-0">
                        <div className="w-full h-full rounded-full bg-gradient-to-br from-gray-100 to-gray-300 flex items-center justify-center">
                          <span className="text-gray-600 text-base font-orbitron">
                            {image.placeholder}
                          </span>
                        </div>
                      </div>
                      <p className="text-white font-orbitron text-base leading-relaxed">
                        {image.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Línea separadora */}
              <div className="w-full h-[1px] bg-orange-500 my-6" />

              {/* Sección de Lo que amo hacer */}
              <div>
                <h3 className="text-lg font-audiowide text-orange-500 mb-6 text-center">
                  {aboutData.modal.sections.myWorld.title}
                </h3>
                <div className="space-y-8">
                  {aboutData.modal.images.slice(3).map((image) => (
                    <div key={image.id} className="flex items-center space-x-6">
                      <div className="w-20 h-20 border-2 border-orange-500 rounded-full bg-white flex items-center justify-center flex-shrink-0">
                        <div className="w-full h-full rounded-full bg-gradient-to-br from-gray-100 to-gray-300 flex items-center justify-center">
                          <span className="text-gray-600 text-base font-orbitron">
                            {image.placeholder}
                          </span>
                        </div>
                      </div>
                      <p className="text-white font-orbitron text-base leading-relaxed">
                        {image.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Footer con controles - FIJO */}
          <div className="pt-4 pb-6 px-6 border-t border-orange-500 bg-gray-800">
            <div className="flex justify-center space-x-2">
              <button
                onClick={() => setIsScrolling(!isScrolling)}
                className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors font-audiowide text-sm"
              >
                {isScrolling ? "Pausar" : "Reproducir"}
              </button>
              <button
                onClick={() => setScrollPosition(0)}
                className="px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors font-audiowide text-sm"
              >
                Reiniciar
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DynamicModal;
