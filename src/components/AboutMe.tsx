import React from 'react';
import { useAboutData } from '@/hooks/usePortfolioData';

const AboutMe: React.FC = () => {
  const aboutData = useAboutData();

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-semibold text-orange-500 font-audiowide">
        {aboutData.title}
      </h2>
      
      <div className="space-y-6">
        <p className="text-gray-300 font-orbitron leading-relaxed text-lg">
          {aboutData.description}
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
          {aboutData.sections.map((section, index) => (
            <div key={index} className="space-y-3">
              <h3 className="text-xl font-semibold text-orange-500 font-audiowide">
                {section.title}
              </h3>
              <ul className="space-y-2 text-gray-300 font-orbitron">
                {section.items.map((item, itemIndex) => (
                  <li key={itemIndex} className="flex items-start gap-2">
                    <span className="text-orange-500 mt-1">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AboutMe;
