import React from 'react';
import Button from '@/components/ui/Button';
import { useAboutData } from '@/hooks/usePortfolioData';

interface AboutMeProps {
  onOpenModal: () => void;
}

const AboutMe: React.FC<AboutMeProps> = ({ onOpenModal }) => {
  const aboutData = useAboutData();

  const handleButtonClick = () => {
    if (aboutData.button.action === 'openModal') {
      onOpenModal();
    }
  };

  return (
    <div className="w-full h-full flex flex-col justify-center items-center space-y-8 p-4">
        {/* Imagen circular - placeholder */}
        <div className="w-32 h-32 md:w-40 md:h-40 border-2 border-orange-500 rounded-full bg-gray-700 flex items-center justify-center mb-4">
          {/* Espacio para imagen */}
          <div className="w-full h-full rounded-full bg-gradient-to-br from-gray-600 to-gray-800 flex items-center justify-center">
            <span className="text-gray-400 text-xs font-orbitron">
              {aboutData.image.placeholder}
            </span>
          </div>
        </div>

        {/* Contenedor de textos izquierdo y derecho */}
        <div className="w-full max-w-4xl flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Texto izquierdo */}
          <div className="text-center md:text-left md:w-1/3">
            <p className="text-white font-orbitron text-sm md:text-base leading-relaxed whitespace-pre-line">
              {aboutData.texts.left}
            </p>
          </div>

          {/* Divisor vertical (visible en desktop) */}
          <div className="hidden md:block w-px h-16 bg-orange-500"></div>

          {/* Texto derecho */}
          <div className="text-center md:text-left md:w-1/3">
            <p className="text-white font-orbitron text-sm md:text-base leading-relaxed whitespace-pre-line">
              {aboutData.texts.right}
            </p>
          </div>
        </div>

        {/* Divisor horizontal */}
        <div className="w-full max-w-2xl h-px bg-orange-500"></div>

        {/* Texto principal centrado */}
        <div className="w-full max-w-3xl text-center">
          <p className="text-white font-orbitron text-sm md:text-base leading-relaxed mb-6 whitespace-pre-line">
            {aboutData.description}
          </p>
          
          {/* Botón "Entra en mi mundo" */}
          <Button 
            variant="primary" 
            size="lg"
            className="font-audiowide"
            onClick={handleButtonClick}
          >
            {aboutData.button.text}
          </Button>
        </div>
    </div>
  );
};

export default AboutMe;
