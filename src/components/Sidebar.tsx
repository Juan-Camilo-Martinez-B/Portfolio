import React from 'react';
import { useSidebarData } from '@/hooks/usePortfolioData';
import AnimatedAvatar from './AnimatedAvatar';

interface SidebarProps {
  active: string;
}

const Sidebar: React.FC<SidebarProps> = ({ active }) => {
  const sidebarData = useSidebarData();

  return (
    <div className="h-full p-4 sm:p-6 text-center">
      {/* Versión móvil: imagen a la derecha, texto a la izquierda */}
      <div className="flex flex-row items-center gap-4 sm:hidden h-full">
        {/* Texto */}
        <div className="flex-1 flex items-center justify-center">
          <p className="text-gray-300 font-orbitron text-sm leading-relaxed text-left">
            {sidebarData.texts[active]}
          </p>
        </div>

        {/* Línea separadora vertical */}
        <div className="w-[2px] h-[80%] bg-orange-500" />

        {/* Avatar animado */}
        <div className="flex items-center justify-center">
          <AnimatedAvatar size="small" />
        </div>
      </div>

      {/* Versión escritorio: imagen arriba, texto abajo */}
      <div className="hidden sm:flex flex-col items-center h-full text-center">
        {/* Avatar animado - Mucho más grande */}
        <div className="flex items-center justify-center mb-8 mt-4">
          <AnimatedAvatar size="xlarge" />
        </div>

        {/* Línea separadora horizontal */}
        <div className="w-full h-[2px] bg-orange-500 mb-6" />

        {/* Texto */}
        <div className="flex-1 flex items-center">
          <p className="text-gray-300 font-orbitron text-base leading-relaxed">
            {sidebarData.texts[active]}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
