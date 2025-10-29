"use client";

import React from 'react';
import { useNavigationData } from '@/hooks/usePortfolioData';
import { scrollToSection } from '@/lib/utils';
import Button from '@/components/ui/Button';
import { useLanguage } from '@/contexts/LanguageContext';
import { useTheme } from '@/contexts/ThemeContext';

interface NavbarProps {
  active: string;
  setActive: (id: string) => void;
}

const Navbar: React.FC<NavbarProps> = ({ active, setActive }) => {
  const navigationItems = useNavigationData();
  const { language, toggleLanguage } = useLanguage();
  const { theme, cycleTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  // Esperar a que el componente esté montado para evitar hydration mismatch
  React.useEffect(() => {
    setMounted(true);
  }, []);

  const handleClick = (id: string) => {
    setActive(id);
    scrollToSection(id);
  };

  // Obtener el icono según el tema
  const getThemeIcon = () => {
    if (!mounted) return '🌙'; // Default durante SSR
    if (theme === 'light') return '☀️';
    if (theme === 'dark') return '🌙';
    return '💻'; // system
  };

  const getThemeLabel = () => {
    if (!mounted) return 'Cambiar Tema'; // Default durante SSR
    if (theme === 'light') return 'Modo Claro';
    if (theme === 'dark') return 'Modo Oscuro';
    return 'Preferencias del Sistema';
  };

  return (
    <nav className="flex flex-wrap justify-center gap-1.5 sm:gap-2 lg:gap-3 px-1 sm:px-4 py-1 sm:py-2">
      {navigationItems.map((item) => (
        <Button
          key={item.id}
          variant={active === item.id ? 'primary' : 'outline'}
          size="sm"
          onClick={() => handleClick(item.id)}
          className="text-xs sm:text-sm lg:text-base"
        >
          {item.label}
        </Button>
      ))}

      {/* Botones de utilidad */}
      <Button 
        variant="outline" 
        size="sm" 
        className="text-xs sm:text-sm lg:text-base font-bold"
        onClick={toggleLanguage}
        title={language === 'es' ? 'Switch to English' : 'Cambiar a Español'}
      >
        {language === 'es' ? 'EN' : 'ES'}
      </Button>
      <Button 
        variant="outline" 
        size="sm" 
        className="text-xs sm:text-sm lg:text-base"
        onClick={cycleTheme}
        title={getThemeLabel()}
      >
        {getThemeIcon()}
      </Button>
    </nav>
  );
};

export default Navbar;
