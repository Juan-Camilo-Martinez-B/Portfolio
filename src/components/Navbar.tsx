"use client";

import React from 'react';
import { useNavigationData } from '@/hooks/usePortfolioData';
import { scrollToSection } from '@/lib/utils';
import Button from '@/components/ui/Button';

interface NavbarProps {
  active: string;
  setActive: (id: string) => void;
}

const Navbar: React.FC<NavbarProps> = ({ active, setActive }) => {
  const navigationItems = useNavigationData();

  const handleClick = (id: string) => {
    setActive(id);
    scrollToSection(id);
  };

  return (
    <nav className="flex flex-wrap justify-center gap-2 sm:gap-3 px-2 sm:px-4 py-1 sm:py-2">
      {navigationItems.map((item) => (
        <Button
          key={item.id}
          variant={active === item.id ? 'primary' : 'outline'}
          size="sm"
          onClick={() => handleClick(item.id)}
          className="text-sm sm:text-base"
        >
          {item.label}
        </Button>
      ))}

      {/* Botones de utilidad */}
      <Button variant="outline" size="sm" className="text-sm sm:text-base">
        EN/ES
      </Button>
      <Button variant="outline" size="sm" className="text-sm sm:text-base">
        ☀️/🌙
      </Button>
    </nav>
  );
};

export default Navbar;
