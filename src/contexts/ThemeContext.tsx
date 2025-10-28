"use client";

import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';

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

  // Lógica principal: aplicar clase dark según el tema
  useEffect(() => {
    const root = document.documentElement;
    
    // Guardar en localStorage
    localStorage.setItem('theme', theme);

    // PRIMERO: Limpiar siempre la clase dark
    root.classList.remove('dark');

    if (theme === 'dark') {
      root.classList.add('dark');
    } else if (theme === 'light') {
      // Ya removida arriba
    } else if (theme === 'system') {
      // Detectar preferencia del sistema
      const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      
      if (systemPrefersDark) {
        root.classList.add('dark');
      }
    }
  }, [theme]);

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

