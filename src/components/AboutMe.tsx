import Button from '@/components/ui/Button';
import { useAboutData } from '@/hooks/usePortfolioData';
import React from 'react';

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
    <section className="w-full h-full flex flex-col justify-center items-center space-y-8 p-4">
        <figure className="w-32 h-32 md:w-40 md:h-40 border-2 border-orange-500 rounded-full bg-gray-300 dark:bg-gray-700 flex items-center justify-center mb-4 transition-colors duration-300">
          <div className="w-full h-full rounded-full bg-gradient-to-br from-gray-200 to-gray-400 dark:from-gray-600 dark:to-gray-800 flex items-center justify-center transition-colors duration-300">
            <span className="text-gray-500 dark:text-gray-400 text-xs font-audiowide">
              {aboutData.image.placeholder}
            </span>
          </div>
        </figure>

        <article className="w-full max-w-4xl flex flex-col md:flex-row items-start justify-between gap-8 md:gap-12">
          <div className="text-center md:text-left md:w-1/3 w-full">
            <hr className="hidden md:block w-full h-px bg-orange-500 mb-4 border-0" />
            <p className="text-gray-700 dark:text-white font-audiowide text-sm md:text-base leading-relaxed whitespace-pre-line">
              {aboutData.texts.left}
            </p>
          </div>

          <div className="text-center md:text-left md:w-1/3 w-full">
            <hr className="hidden md:block w-full h-px bg-orange-500 mb-4 border-0" />
            <p className="text-gray-700 dark:text-white font-audiowide text-sm md:text-base leading-relaxed whitespace-pre-line">
              {aboutData.texts.right}
            </p>
          </div>
        </article>

        <hr className="w-full max-w-2xl h-px bg-orange-500 border-0" />

        <article className="w-full max-w-3xl text-center">
          <p className="text-gray-700 dark:text-white font-audiowide text-sm md:text-base leading-relaxed mb-6 whitespace-pre-line">
            {aboutData.description}
          </p>
          
          <Button 
            variant="primary" 
            size="lg"
            className="font-orbitron"
            onClick={handleButtonClick}
          >
            {aboutData.button.text}
          </Button>
        </article>
    </section>
  );
};

export default AboutMe;
