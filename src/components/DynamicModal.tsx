import React, { useState, useEffect } from 'react';
import { useAboutData } from '@/hooks/usePortfolioData';
import { cn } from '@/lib/utils';

interface DynamicModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const DynamicModal: React.FC<DynamicModalProps> = ({ isOpen, onClose }) => {
  const aboutData = useAboutData();
  const [scrollPosition, setScrollPosition] = useState(0);
  const [isScrolling, setIsScrolling] = useState(false);

  // Scroll infinito horizontal con velocidad aumentada
  useEffect(() => {
    if (!isOpen || !isScrolling) return;

    const scrollSpeed = 1.5; // Velocidad aumentada del scroll
    const interval = setInterval(() => {
      setScrollPosition((prev) => {
        const maxScroll = (aboutData.modal.images.length * 250) - 300; // Ajustar según el ancho
        return prev >= maxScroll ? 0 : prev + scrollSpeed;
      });
    }, 40); // Intervalo más rápido

    return () => clearInterval(interval);
  }, [isOpen, isScrolling, aboutData.modal.images.length]);

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
};

export default DynamicModal;
