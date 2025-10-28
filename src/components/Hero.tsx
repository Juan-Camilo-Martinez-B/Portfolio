import Button from '@/components/ui/Button';
import { useHeroData } from '@/hooks/usePortfolioData';
import Image from 'next/image';
import React from 'react';

const Hero: React.FC = () => {
  const heroData = useHeroData();

  return (
    <section className="flex flex-col items-center justify-center min-h-[calc(100vh-200px)] md:min-h-[calc(100vh-300px)] space-y-6 md:space-y-8 px-4 py-8">
      <figure className="relative w-48 h-48 md:w-64 md:h-64 rounded-full overflow-hidden border-4 border-blue-500 dark:border-orange-500 shadow-lg shadow-blue-500/50 dark:shadow-orange-500/50 bg-gray-300 dark:bg-gray-700 transition-colors duration-300">
        {/* Fallback placeholder */}
        <div className="absolute inset-0 bg-gradient-to-br from-gray-300 to-gray-400 dark:from-gray-700 dark:to-gray-900 flex items-center justify-center transition-colors duration-300 -z-10">
          <span className="text-6xl md:text-8xl text-gray-400 dark:text-gray-500">👤</span>
        </div>
        {/* Imagen principal */}
        <Image
          src={heroData.image}
          alt={heroData.name}
          fill
          className="object-cover z-10"
          unoptimized
          priority
        />
      </figure>
      
      <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 dark:text-white font-orbitron text-center leading-tight">
        {heroData.name}
      </h1>
      
      <p className="text-base sm:text-lg md:text-xl text-gray-700 dark:text-white font-audiowide text-center leading-relaxed max-w-2xl px-4">
        {heroData.description}
      </p>
      
      <nav className="pt-4 flex justify-center">
        <Button 
          onClick={() => window.open(heroData.cvButton.url, '_blank')}
          className="px-8 py-3 text-lg font-orbitron"
        >
          {heroData.cvButton.text}
        </Button>
      </nav>
    </section>
  );
};

export default Hero;
