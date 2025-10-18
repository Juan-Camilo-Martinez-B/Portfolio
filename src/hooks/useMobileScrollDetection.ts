import { useEffect, useRef, useState, useCallback } from 'react';

interface UseMobileScrollDetectionProps {
  onSectionChange: (sectionId: string) => void;
  sections: string[];
}

export const useMobileScrollDetection = ({
  onSectionChange,
  sections
}: UseMobileScrollDetectionProps) => {
  const [isScrolling, setIsScrolling] = useState(false);
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null); // ✅ corregido
  const lastScrollY = useRef(0);
  const scrollDirection = useRef<'up' | 'down'>('down');

  // Función para detectar la sección actual basada en la posición del scroll
  const detectCurrentSection = useCallback(() => {
    const scrollContainer = document.getElementById('scroll-container');
    if (!scrollContainer) return;

    const containerRect = scrollContainer.getBoundingClientRect();
    const containerTop = containerRect.top;
    const containerHeight = containerRect.height;

    let currentSection = sections[0];
    let minDistance = Infinity;

    sections.forEach((sectionId) => {
      const section = document.getElementById(sectionId);
      if (!section) return;

      const sectionRect = section.getBoundingClientRect();
      const sectionTop = sectionRect.top - containerTop;
      const sectionCenter = sectionTop + sectionRect.height / 2;
      const containerCenter = containerHeight / 2;

      const distance = Math.abs(sectionCenter - containerCenter);
      if (distance < minDistance) {
        minDistance = distance;
        currentSection = sectionId;
      }
    });

    return currentSection;
  }, [sections]);

  // Función para manejar el scroll
  const handleScroll = useCallback(() => {
    if (!isScrolling) {
      setIsScrolling(true);
    }

    const currentScrollY = window.scrollY;
    scrollDirection.current = currentScrollY > lastScrollY.current ? 'down' : 'up';
    lastScrollY.current = currentScrollY;

    if (scrollTimeoutRef.current) {
      clearTimeout(scrollTimeoutRef.current);
    }

    scrollTimeoutRef.current = setTimeout(() => {
      setIsScrolling(false);
      const currentSection = detectCurrentSection();
      if (currentSection) {
        onSectionChange(currentSection);
      }
    }, 150);
  }, [isScrolling, detectCurrentSection, onSectionChange]);

  // Función para manejar scroll táctil en móvil
  const handleTouchEnd = useCallback(() => {
    setTimeout(() => {
      const currentSection = detectCurrentSection();
      if (currentSection) {
        onSectionChange(currentSection);
      }
    }, 100);
  }, [detectCurrentSection, onSectionChange]);

  useEffect(() => {
    const scrollContainer = document.getElementById('scroll-container');
    if (!scrollContainer) return;

    scrollContainer.addEventListener('scroll', handleScroll, { passive: true });
    scrollContainer.addEventListener('touchend', handleTouchEnd, { passive: true });
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      scrollContainer.removeEventListener('scroll', handleScroll);
      scrollContainer.removeEventListener('touchend', handleTouchEnd);
      window.removeEventListener('scroll', handleScroll);

      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
    };
  }, [handleScroll, handleTouchEnd]);

  return {
    isScrolling,
    scrollDirection: scrollDirection.current
  };
};
