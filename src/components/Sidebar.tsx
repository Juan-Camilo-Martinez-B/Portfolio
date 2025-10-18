import React from 'react';
import { useSidebarData, usePersonalInfo } from '@/hooks/usePortfolioData';

interface SidebarProps {
  active: string;
}

const Sidebar: React.FC<SidebarProps> = ({ active }) => {
  const sidebarData = useSidebarData();
  const personalInfo = usePersonalInfo();

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

        {/* Imagen */}
        <div className="w-20 h-20 rounded-full bg-gray-600 border-2 border-orange-500 flex items-center justify-center">
          <span className="text-orange-500 font-audiowide text-lg">
            {personalInfo.name.split(' ').map(n => n[0]).join('')}
          </span>
        </div>
      </div>

      {/* Versión escritorio: imagen arriba, texto abajo */}
      <div className="hidden sm:flex flex-col items-center h-full text-center">
        {/* Imagen */}
        <div className="w-40 h-40 rounded-full bg-gray-600 border-2 border-orange-500 mb-6 flex items-center justify-center">
          <span className="text-orange-500 font-audiowide text-2xl">
            {personalInfo.name.split(' ').map(n => n[0]).join('')}
          </span>
        </div>

        {/* Línea separadora horizontal */}
        <div className="w-full h-[2px] bg-orange-500 mb-6 mt-6" />

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
