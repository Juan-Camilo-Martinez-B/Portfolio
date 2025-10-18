// Este archivo ahora es principalmente para constantes de configuración
// Los datos del portfolio están centralizados en src/data/portfolio.json

export const THEME_CONFIG = {
  colors: {
    primary: '#f97316', // orange-500
    secondary: '#1f2937', // gray-800
    background: '#000000', // black
    text: '#ffffff', // white
    textSecondary: '#d1d5db', // gray-300
  },
  fonts: {
    primary: 'var(--font-audiowide)',
    secondary: 'var(--font-orbitron)',
  },
  breakpoints: {
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
  },
};

// Configuración de animaciones
export const ANIMATION_CONFIG = {
  duration: {
    fast: '0.2s',
    normal: '0.3s',
    slow: '0.5s',
  },
  easing: {
    ease: 'ease-in-out',
    easeOut: 'ease-out',
    easeIn: 'ease-in',
  },
};

// Configuración de efectos
export const EFFECTS_CONFIG = {
  cursor: {
    trailLength: 20,
    color: '#f97316',
    blur: 8,
  },
  lightning: {
    hue: 30,
    speed: 1.5,
    intensity: 1.2,
    size: 1.2,
  },
};

// Configuración de scroll
export const SCROLL_CONFIG = {
  threshold: 0.6,
  rootMargin: '0px',
  behavior: 'smooth' as ScrollBehavior,
};
