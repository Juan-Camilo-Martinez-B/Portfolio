import { useEffect, useRef, useState, useCallback } from 'react';

interface UseIntersectionObserverProps {
  threshold?: number | number[];
  rootMargin?: string;
  root?: Element | null;
}

export const useIntersectionObserver = ({
  threshold,
  rootMargin = '0px',
  root = null,
}: UseIntersectionObserverProps = {}) => {
  const [activeSection, setActiveSection] = useState<string>('hero');
  const sectionsRef = useRef<Record<string, HTMLElement | null>>({});
  const observerRef = useRef<IntersectionObserver | null>(null);

  // Función para determinar el threshold basado en el tamaño de pantalla
  const getThreshold = useCallback(() => {
    if (threshold) return threshold;
    
    // En móvil, usar threshold más bajo para mejor detección
    if (window.innerWidth < 768) {
      return [0.1, 0.3, 0.5, 0.7, 0.9];
    }
    
    // En desktop, usar threshold más alto
    return [0.2, 0.4, 0.6, 0.8];
  }, [threshold]);

  // Función para determinar la sección más visible
  const getMostVisibleSection = useCallback((entries: IntersectionObserverEntry[]) => {
    let mostVisible = { id: '', ratio: 0 };
    
    entries.forEach((entry) => {
      if (entry.intersectionRatio > mostVisible.ratio) {
        mostVisible = {
          id: entry.target.id,
          ratio: entry.intersectionRatio
        };
      }
    });
    
    return mostVisible.id || activeSection;
  }, [activeSection]);

  useEffect(() => {
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
        rootMargin: window.innerWidth < 768 ? '-10% 0px -10% 0px' : rootMargin,
      }
    );

    // Observar todas las secciones
    Object.values(sectionsRef.current).forEach((section) => {
      if (section && observerRef.current) {
        observerRef.current.observe(section);
      }
    });

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [root, rootMargin, getThreshold, getMostVisibleSection, activeSection]);

  // Re-observar cuando se agregan nuevas secciones
  useEffect(() => {
    if (observerRef.current) {
      Object.values(sectionsRef.current).forEach((section) => {
        if (section) {
          observerRef.current?.observe(section);
        }
      });
    }
  }, []);

  const setSectionRef = useCallback((id: string) => (el: HTMLElement | null) => {
    sectionsRef.current[id] = el;
    
    // Observar inmediatamente si el observer ya existe
    if (el && observerRef.current) {
      observerRef.current.observe(el);
    }
  }, []);

  return { activeSection, setActiveSection, setSectionRef };
};
