import { useEffect, useRef, useState, useCallback } from 'react';
import { useMobileScrollDetection } from './useMobileScrollDetection';

interface UseResponsiveIntersectionObserverProps {
  rootMargin?: string;
  root?: Element | null;
}

export const useResponsiveIntersectionObserver = ({
  rootMargin = '0px',
  root = null,
}: UseResponsiveIntersectionObserverProps = {}) => {
  const [activeSection, setActiveSection] = useState<string>('hero');
  const [isMobile, setIsMobile] = useState(false);
  const sectionsRef = useRef<Record<string, HTMLElement | null>>({});
  const observerRef = useRef<IntersectionObserver | null>(null);

  // Detectar si es móvil
  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkIsMobile();
    window.addEventListener('resize', checkIsMobile);
    
    return () => window.removeEventListener('resize', checkIsMobile);
  }, []);

  // Función para obtener el threshold basado en el tamaño de pantalla
  const getThreshold = useCallback(() => {
    if (isMobile) {
      // En móvil: thresholds más bajos y múltiples para mejor detección
      return [0.1, 0.25, 0.4, 0.6, 0.8];
    } else {
      // En desktop: thresholds más altos
      return [0.3, 0.5, 0.7, 0.9];
    }
  }, [isMobile]);

  // Función para obtener el rootMargin basado en el tamaño de pantalla
  const getRootMargin = useCallback(() => {
    if (isMobile) {
      // En móvil: margen negativo más conservador para secciones de tamaño variable
      return '-10% 0px -10% 0px';
    } else {
      return rootMargin;
    }
  }, [isMobile, rootMargin]);

  // Función para determinar la sección más visible
  const getMostVisibleSection = useCallback((entries: IntersectionObserverEntry[]) => {
    let mostVisible = { id: '', ratio: 0 };
    
    entries.forEach((entry) => {
      if (entry.isIntersecting && entry.intersectionRatio > mostVisible.ratio) {
        mostVisible = {
          id: entry.target.id,
          ratio: entry.intersectionRatio
        };
      }
    });
    
    return mostVisible.id || activeSection;
  }, [activeSection]);

  // Crear y configurar el observer
  const createObserver = useCallback(() => {
    // Limpiar observer anterior
    if (observerRef.current) {
      observerRef.current.disconnect();
    }

    const scrollContainer = root || document.getElementById('scroll-container');
    if (!scrollContainer) return;

    observerRef.current = new IntersectionObserver(
      (entries) => {
        const visibleEntries = entries.filter(entry => entry.isIntersecting);
        
        if (visibleEntries.length > 0) {
          const newActiveSection = getMostVisibleSection(visibleEntries);
          if (newActiveSection && newActiveSection !== activeSection) {
            setActiveSection(newActiveSection);
          }
        }
      },
      {
        root: scrollContainer,
        threshold: getThreshold(),
        rootMargin: getRootMargin(),
      }
    );

    // Observar todas las secciones existentes
    Object.values(sectionsRef.current).forEach((section) => {
      if (section && observerRef.current) {
        observerRef.current.observe(section);
      }
    });
  }, [root, getThreshold, getRootMargin, getMostVisibleSection, activeSection]);

  // Recrear observer cuando cambie el tamaño de pantalla
  useEffect(() => {
    createObserver();
    
    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [createObserver]);

  // Usar detección de scroll móvil como respaldo
  const sections = Object.keys(sectionsRef.current);
  useMobileScrollDetection({
    onSectionChange: setActiveSection,
    sections: sections.length > 0 ? sections : ['hero', 'about', 'projects', 'skills', 'contact']
  });

  // Función para establecer referencia de sección
  const setSectionRef = useCallback((id: string) => (el: HTMLElement | null) => {
    sectionsRef.current[id] = el;
    
    // Observar inmediatamente si el observer ya existe
    if (el && observerRef.current) {
      observerRef.current.observe(el);
    }
  }, []);

  return { 
    activeSection, 
    setActiveSection, 
    setSectionRef,
    isMobile 
  };
};
