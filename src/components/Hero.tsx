import React from 'react';
import { useHeroData } from '@/hooks/usePortfolioData';

const Hero: React.FC = () => {
  const heroData = useHeroData();

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-orange-500 font-audiowide leading-tight">
          {heroData.title}
        </h1>
        <p className="text-lg sm:text-xl text-gray-300 font-orbitron leading-relaxed max-w-2xl">
          {heroData.subtitle}
        </p>
      </div>
      
      <div className="flex flex-col sm:flex-row gap-4 pt-4">
        {heroData.specializations.map((spec, index) => (
          <div key={index} className="flex-1 space-y-2">
            <h2 className="text-xl font-semibold text-orange-500 font-audiowide">
              {spec.title}
            </h2>
            <p className="text-gray-300 font-orbitron leading-relaxed">
              {spec.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Hero;
