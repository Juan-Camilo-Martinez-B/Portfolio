import React from 'react';
import { useHeroData } from '@/hooks/usePortfolioData';
import Button from '@/components/ui/Button';

const Hero: React.FC = () => {
  const heroData = useHeroData();

  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-200px)] md:min-h-[calc(100vh-300px)] space-y-6 md:space-y-8 px-4 py-8">
      {/* Imagen de perfil */}
      <div className="relative w-48 h-48 md:w-64 md:h-64 rounded-full overflow-hidden border-4 border-orange-500 shadow-lg shadow-orange-500/50">
        <div className="w-full h-full bg-gradient-to-br from-gray-700 to-gray-900 flex items-center justify-center">
          <span className="text-6xl md:text-8xl text-gray-500">👤</span>
        </div>
      </div>
      
      {/* Nombre */}
      <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white font-orbitron text-center leading-tight">
        {heroData.name}
      </h1>
      
      {/* Descripción */}
      <p className="text-base sm:text-lg md:text-xl text-gray-300 font-audiowide text-center leading-relaxed max-w-2xl px-4">
        {heroData.description}
      </p>
      
      {/* Botón CV */}
      <div className="pt-4 flex justify-center">
        <Button 
          onClick={() => window.open(heroData.cvButton.url, '_blank')}
          className="px-8 py-3 text-lg font-orbitron"
        >
          {heroData.cvButton.text}
        </Button>
      </div>
    </div>
  );
};

export default Hero;
