import { useEducationData } from '@/hooks/usePortfolioData';
import React from 'react';

const Education: React.FC = () => {
  const educationData = useEducationData();

  return (
    <section className="space-y-8 p-4">
      <h2 className="text-3xl font-semibold text-blue-500 dark:text-orange-500 font-orbitron text-center">
        {educationData.title}
      </h2>

      {/* Formación Académica */}
      <div className="space-y-6">
        <h3 className="text-2xl font-orbitron text-blue-500 dark:text-orange-500 text-center mb-6">
          🎓 {educationData.sections.academic.title}
        </h3>
        
        {educationData.sections.academic.items.map((item, index) => (
          <article 
            key={index}
            className="bg-white dark:bg-gray-800 border-2 border-blue-500 dark:border-orange-500 rounded-xl p-6 space-y-4 transition-colors duration-300"
          >
            <div className="space-y-2">
              <h4 className="text-xl font-orbitron text-blue-500 dark:text-orange-500">
                {item.degree}
              </h4>
              <p className="text-gray-700 dark:text-white font-audiowide text-base">
                {item.institution}
              </p>
              <div className="flex items-center gap-2 text-sm">
                <span className="text-gray-600 dark:text-gray-300 font-audiowide">
                  {item.period}
                </span>
                <span className="px-3 py-1 bg-blue-100 dark:bg-orange-900 text-blue-700 dark:text-orange-300 rounded-full text-xs font-orbitron">
                  {item.status}
                </span>
              </div>
            </div>

            <p className="text-gray-700 dark:text-white font-audiowide text-sm leading-relaxed">
              {item.description}
            </p>

            {item.highlights && item.highlights.length > 0 && (
              <div className="mt-4 space-y-3">
                <p className="text-sm font-orbitron text-blue-500 dark:text-orange-500">
                  🧩 Proyectos académicos destacados:
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {item.highlights.map((highlight, idx) => (
                    <div 
                      key={idx}
                      className="bg-gray-50 dark:bg-gray-900 border border-blue-300 dark:border-orange-700 rounded-lg p-4 transition-colors duration-300"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <h5 className="font-orbitron text-blue-600 dark:text-orange-400 text-sm">
                          {highlight.title}
                        </h5>
                        {highlight.status && (
                          <span className="px-3 py-1 bg-blue-100 dark:bg-orange-900 text-blue-700 dark:text-orange-300 rounded-full text-xs font-orbitron whitespace-nowrap">
                            {highlight.status}
                          </span>
                        )}
                      </div>
                      <p className="text-gray-600 dark:text-gray-300 font-audiowide text-xs leading-relaxed">
                        {highlight.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </article>
        ))}
      </div>

      <hr className="w-full h-[2px] bg-blue-500 dark:bg-orange-500 border-0" />

      {/* Aprendizaje Continuo */}
      <div className="space-y-6">
        <h3 className="text-2xl font-orbitron text-blue-500 dark:text-orange-500 text-center mb-6">
          🔧 {educationData.sections.learning.title}
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {educationData.sections.learning.current.map((item, index) => (
            <article
              key={index}
              className="bg-white dark:bg-gray-800 border-2 border-blue-500 dark:border-orange-500 rounded-xl p-5 space-y-3 hover:shadow-xl hover:shadow-blue-500/20 dark:hover:shadow-orange-500/20 transition-all duration-300 transform hover:-translate-y-1"
            >
              <h4 className="font-orbitron text-blue-500 dark:text-orange-500 text-base">
                {item.title}
              </h4>
              <p className="text-gray-700 dark:text-white font-audiowide text-sm leading-relaxed">
                {item.description}
              </p>
            </article>
          ))}
        </div>

        {/* Objetivo */}
        <div className="mt-8 bg-gradient-to-r from-blue-50 to-blue-100 dark:from-gray-900 dark:to-gray-800 border-2 border-blue-500 dark:border-orange-500 rounded-xl p-6 transition-colors duration-300">
          <div className="flex items-start gap-4">
            <span className="text-4xl">🧠</span>
            <div className="flex-1 space-y-2">
              <h4 className="font-orbitron text-blue-600 dark:text-orange-400 text-lg">
                {educationData.sections.learning.goal.title}
              </h4>
              <p className="text-gray-700 dark:text-white font-audiowide text-sm leading-relaxed">
                {educationData.sections.learning.goal.description}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Education;

