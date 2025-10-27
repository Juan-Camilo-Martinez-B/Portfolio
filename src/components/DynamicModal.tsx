import { useAboutData } from '@/hooks/usePortfolioData';
import Image from 'next/image';
import React, { useEffect, useRef, useState } from 'react';

interface DynamicModalProps {
  isOpen: boolean;
  onClose: () => void;
  onContentShift?: (shifted: boolean) => void;
}

interface ImageWithAuthor {
  id: number;
  placeholder: string;
  description: string;
  author?: string;
}

const DynamicModal: React.FC<DynamicModalProps> = ({ isOpen, onClose, onContentShift }) => {
  const aboutData = useAboutData();
  const [isScrolling, setIsScrolling] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);
  const [modalPosition, setModalPosition] = useState({ top: 0, left: 0, width: 0, height: 0 });
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Scroll automático (horizontal para mobile, vertical para desktop)
  useEffect(() => {
    if (!isOpen || !isScrolling) return;

    const scrollSpeed = 2;
    let waitingAtEnd = false;

    const interval = setInterval(() => {
      if (isDesktop) {
        const scrollElement = document.querySelector('.desktop-scroll-content') as HTMLElement;
        if (scrollElement) {
          const maxScroll = scrollElement.scrollHeight - scrollElement.clientHeight;
          const currentScroll = scrollElement.scrollTop;
          
          if (currentScroll >= maxScroll - 5 && !waitingAtEnd) {
            waitingAtEnd = true;
            setTimeout(() => {
              scrollElement.scrollTo({ top: 0, behavior: 'smooth' });
              waitingAtEnd = false;
            }, 1500);
          } else if (!waitingAtEnd) {
            scrollElement.scrollTop = currentScroll + scrollSpeed;
          }
        }
      } else if (scrollContainerRef.current) {
        const container = scrollContainerRef.current;
        const maxScroll = container.scrollWidth - container.clientWidth;
        const currentScroll = container.scrollLeft;
        
        if (currentScroll >= maxScroll - 5 && !waitingAtEnd) {
          waitingAtEnd = true;
          setTimeout(() => {
            container.scrollTo({ left: 0, behavior: 'smooth' });
            waitingAtEnd = false;
          }, 1500);
        } else if (!waitingAtEnd) {
          container.scrollLeft = currentScroll + scrollSpeed;
        }
      }
    }, 20);

    return () => clearInterval(interval);
  }, [isOpen, isScrolling, isDesktop]);

  // Detectar si es desktop
  useEffect(() => {
    const checkIsDesktop = () => {
      setIsDesktop(window.innerWidth >= 1024);
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
          left: rect.right - 145,
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
    }
  }, [isOpen]);

  const handleMouseEnter = () => setIsScrolling(false);
  const handleMouseLeave = () => setIsScrolling(true);

  const handleResetMobile = () => {
    const wasScrolling = isScrolling;
    setIsScrolling(false);
    
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTo({ left: 0, behavior: 'smooth' });
    }
    
    if (wasScrolling) {
      setTimeout(() => setIsScrolling(true), 800);
    }
  };

  const handleResetDesktop = () => {
    const wasScrolling = isScrolling;
    setIsScrolling(false);
    
    const scrollElement = document.querySelector('.desktop-scroll-content') as HTMLElement;
    if (scrollElement) {
      scrollElement.scrollTo({ top: 0, behavior: 'smooth' });
    }
    
    if (wasScrolling) {
      setTimeout(() => setIsScrolling(true), 800);
    }
  };

  if (!isOpen) return null;

  // Renderizado para mobile
  if (!isDesktop) {
    return (
      <aside 
        className="fixed inset-0 flex items-center justify-center"
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
          className="relative w-full max-w-5xl mx-4 bg-gray-800 border-2 border-orange-500 rounded-xl overflow-hidden shadow-2xl"
          style={{ zIndex: 101 }}
        >
          <header className="flex justify-between items-center p-4 border-b border-orange-500 bg-gray-900">
            <h2 className="text-xl font-audiowide text-orange-500">
              {aboutData.modal.title}
            </h2>
            <button
              onClick={onClose}
              className="text-white hover:text-orange-500 transition-colors text-2xl font-bold"
            >
              ×
            </button>
          </header>

          <section 
            ref={scrollContainerRef}
            className="relative h-80 md:h-96 overflow-x-auto overflow-y-hidden bg-gray-800 no-scrollbar"
            style={{ scrollBehavior: 'auto' }}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onTouchStart={handleMouseEnter}
            onTouchEnd={handleMouseLeave}
          >
            <div className="flex h-full">
              {aboutData.modal.images.map((image, index) => (
                <div
                  key={`${image.id}-${index}`}
                  className={`flex-shrink-0 h-full flex items-center justify-center p-6 space-x-6 ${
                    image.id <= 3 ? 'w-[36rem]' : 'w-80'
                  }`}
                >
                  {image.id === 1 && (
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
                  
                  {image.id === 4 && (
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

                  {image.id <= 3 ? (
                    <div className="flex items-center space-x-6 flex-1">
                      <div className="w-32 h-32 border-2 border-orange-500 rounded-full bg-white flex items-center justify-center flex-shrink-0 overflow-hidden relative">
                        <Image 
                          src={image.placeholder}
                          alt={image.description}
                          fill
                          className="object-cover rounded-full"
                          unoptimized
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.style.display = 'none';
                          }}
                        />
                        <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-300 -z-10">
                          <span className="text-gray-600 text-xs font-audiowide text-center px-2">
                            Imagen {image.id}
                          </span>
                        </div>
                      </div>
                      
                      <div className="flex flex-col justify-center space-y-3 flex-1 min-w-0 pr-8">
                        {(image as ImageWithAuthor).author && (
                          <p className="text-orange-500 font-audiowide text-base font-bold leading-relaxed">
                            {(image as ImageWithAuthor).author}
                          </p>
                        )}
                        <p className="text-white font-audiowide text-base leading-relaxed">
                          {image.description}
                        </p>
                      </div>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center space-y-4">
                      {image.id % 2 === 0 && (
                        <div className="max-w-48">
                          <p className="text-white font-audiowide text-sm md:text-base leading-relaxed text-center">
                            {image.description}
                          </p>
                        </div>
                      )}

                      <div className="w-40 md:w-52 h-40 md:h-52 border-2 border-orange-500 rounded-full bg-white flex items-center justify-center overflow-hidden relative">
                        <Image 
                          src={image.placeholder}
                          alt={image.description}
                          fill
                          className="object-cover rounded-full"
                          unoptimized
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.style.display = 'none';
                          }}
                        />
                        <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-300 -z-10">
                          <span className="text-gray-600 text-xs font-audiowide text-center px-2">
                            Imagen {image.id}
                          </span>
                        </div>
                      </div>
                      
                      {image.id % 2 === 1 && (
                        <div className="max-w-48">
                          <p className="text-white font-audiowide text-sm md:text-base leading-relaxed text-center">
                            {image.description}
                          </p>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>

          <footer className="p-4 border-t border-orange-500 bg-gray-900">
            <nav className="flex justify-center space-x-4">
              <button
                onClick={() => setIsScrolling(!isScrolling)}
                className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors font-orbitron text-sm"
              >
                {isScrolling ? "Pausar" : "Reproducir"}
              </button>
              <button
                onClick={handleResetMobile}
                className="px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors font-orbitron text-sm"
              >
                Reiniciar
              </button>
            </nav>
          </footer>
        </article>
      </aside>
    );
  }

  // Renderizado para desktop
  return (
    <aside 
      className="fixed bg-gray-800 border-2 border-orange-500 rounded-xl shadow-2xl overflow-hidden transform transition-all duration-500 ease-in-out"
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
      <div className="relative h-full bg-gray-800">
        <div className="h-full flex flex-col">
          <header className="flex justify-between items-center p-6 pb-4">
            <h2 className="text-lg font-audiowide text-orange-500">
              {aboutData.modal.title}
            </h2>
            <button
              onClick={onClose}
              className="text-white hover:text-orange-500 transition-colors text-xl font-bold"
            >
              ×
            </button>
          </header>

          <hr className="h-[2px] bg-orange-500 mx-6 border-0" />

          <section 
            className="desktop-scroll-content flex-1 overflow-y-auto no-scrollbar px-6 py-4"
            style={{ scrollBehavior: 'auto' }}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <div className="space-y-8">
              <div>
                <h3 className="text-lg font-audiowide text-orange-500 mb-6 text-center">
                  {aboutData.modal.sections.references.title}
                </h3>
                <div className="space-y-8">
                  {aboutData.modal.images.slice(0, 3).map((image) => (
                    <div key={image.id} className="flex flex-col items-center text-center space-y-4">
                      <div className="w-40 h-40 border-2 border-orange-500 rounded-full bg-white flex items-center justify-center overflow-hidden relative">
                        <Image 
                          src={image.placeholder}
                          alt={image.description}
                          fill
                          className="object-cover rounded-full"
                          unoptimized
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.style.display = 'none';
                          }}
                        />
                        <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-300 -z-10">
                          <span className="text-gray-600 text-xs font-audiowide text-center">
                            {image.id}
                          </span>
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        {(image as ImageWithAuthor).author && (
                          <p className="text-orange-500 font-audiowide text-sm font-bold leading-relaxed">
                            {(image as ImageWithAuthor).author}
                          </p>
                        )}
                        <p className="text-white font-audiowide text-sm leading-relaxed">
                          {image.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="w-full h-[1px] bg-orange-500 my-6" />

              <div>
                <h3 className="text-lg font-audiowide text-orange-500 mb-6 text-center">
                  {aboutData.modal.sections.myWorld.title}
                </h3>
                <div className="space-y-8">
                  {aboutData.modal.images.slice(3).map((image, index) => (
                    <div 
                      key={image.id} 
                      className={`flex items-center space-x-6 ${index % 2 === 1 ? 'flex-row-reverse' : ''}`}
                    >
                      <div className="w-28 h-28 border-2 border-orange-500 rounded-full bg-white flex items-center justify-center flex-shrink-0 overflow-hidden relative">
                        <Image 
                          src={image.placeholder}
                          alt={image.description}
                          fill
                          className="object-cover rounded-full"
                          unoptimized
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.style.display = 'none';
                          }}
                        />
                        <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-300 -z-10">
                          <span className="text-gray-600 text-xs font-audiowide text-center">
                            {image.id}
                          </span>
                        </div>
                      </div>
                      <p className="text-white font-audiowide text-base leading-relaxed">
                        {image.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          <footer className="pt-4 pb-6 px-6 border-t border-orange-500 bg-gray-800">
            <nav className="flex justify-center space-x-2">
              <button
                onClick={() => setIsScrolling(!isScrolling)}
                className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors font-orbitron text-sm"
              >
                {isScrolling ? "Pausar" : "Reproducir"}
              </button>
              <button
                onClick={handleResetDesktop}
                className="px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors font-orbitron text-sm"
              >
                Reiniciar
              </button>
            </nav>
          </footer>
        </div>
      </div>
    </aside>
  );
};

export default DynamicModal;
