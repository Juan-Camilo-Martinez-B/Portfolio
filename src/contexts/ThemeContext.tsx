"use client";

import { createContext, ReactNode, useContext, useEffect, useState } from 'react';

type Theme = 'light' | 'dark' | 'system';

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  cycleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
  // Inicializar sin leer localStorage para evitar hydration mismatch
  const [theme, setTheme] = useState<Theme>('dark');
  const [mounted, setMounted] = useState(false);

  // Leer localStorage solo después del montaje en el cliente
  useEffect(() => {
    setMounted(true);
    const savedTheme = localStorage.getItem('theme') as Theme;
    if (savedTheme) {
      setTheme(savedTheme);
    }
  }, []);

  // Lógica principal: aplicar clase dark según el tema con transición suave
  useEffect(() => {
    if (!mounted) return;

    const root = document.documentElement;
    
    // Guardar en localStorage
    localStorage.setItem('theme', theme);

    // Función para aplicar el cambio de tema con transición
    const applyTheme = (shouldBeDark: boolean) => {
      // Verificar si el navegador soporta View Transitions API
      if ('startViewTransition' in document) {
        // @ts-ignore - View Transitions API aún no está en tipos de TypeScript
        document.startViewTransition(() => {
          if (shouldBeDark) {
            root.classList.add('dark');
          } else {
            root.classList.remove('dark');
          }
        });
      } else {
        // Fallback: usar transiciones CSS clásicas
        root.classList.add('theme-transition');
        
        if (shouldBeDark) {
          root.classList.add('dark');
        } else {
          root.classList.remove('dark');
        }
        
        // Remover la clase de transición después de que termine
        setTimeout(() => {
          root.classList.remove('theme-transition');
        }, 500);
      }
    };

    // Determinar si debe estar en modo oscuro
    let shouldBeDark = false;
    
    if (theme === 'dark') {
      shouldBeDark = true;
    } else if (theme === 'system') {
      shouldBeDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    }

    applyTheme(shouldBeDark);
  }, [theme, mounted]);

  // Ciclar entre temas: light → dark → system → light
  const cycleTheme = () => {
    setTheme(prevTheme => {
      if (prevTheme === 'light') return 'dark';
      if (prevTheme === 'dark') return 'system';
      return 'light';
    });
  };

  return (
    <ThemeContext.Provider value={{ theme, setTheme, cycleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}

