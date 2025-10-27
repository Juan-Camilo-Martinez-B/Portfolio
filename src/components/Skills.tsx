'use client';
import { useSkillsData } from '@/hooks/usePortfolioData';
import React, { useState } from 'react';
import {
    FaAngular,
    FaAws,
    FaFigma,
    FaGithub,
    FaJava,
    FaNode,
    FaPython,
    FaReact
} from 'react-icons/fa';
import {
    SiDotnet,
    SiJavascript,
    SiMongodb,
    SiNextdotjs,
    SiPostgresql,
    SiSpringboot,
    SiTailwindcss,
    SiTypescript
} from 'react-icons/si';
import { TbBrandVisualStudio } from 'react-icons/tb';

interface Skill {
  name: string;
  icon: string;
}

// Mapeo de nombres de skills a componentes de iconos
const skillIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  // Frontend
  'React': FaReact,
  'Next.js': SiNextdotjs,
  'TypeScript': SiTypescript,
  'Tailwind CSS': SiTailwindcss,
  'JavaScript': SiJavascript,
  'Angular': FaAngular,
  // Backend
  'Node.js': FaNode,
  'Spring Boot': SiSpringboot,
  'MongoDB': SiMongodb,
  'PostgreSQL': SiPostgresql,
  'C#': SiDotnet,
  // Languages
  'Python': FaPython,
  'Java': FaJava,
  // Tools
  'Git/GitHub': FaGithub,
  'AWS': FaAws,
  'Figma': FaFigma,
  'Visual Paradigm': TbBrandVisualStudio,
};

const Skills: React.FC = () => {
  const skillsData = useSkillsData();
  
  // Estados independientes para cada sección
  const [isScrollingFrontend, setIsScrollingFrontend] = useState(true);
  const [isScrollingBackend, setIsScrollingBackend] = useState(true);
  const [isScrollingLanguages, setIsScrollingLanguages] = useState(true);
  const [isScrollingTools, setIsScrollingTools] = useState(true);

  const categoryLabels = {
    frontend: 'Frontend',
    backend: 'Backend',
    languages: 'Lenguajes',
    tools: 'Herramientas',
  };

  const renderSkillCarousel = (
    skills: Skill[], 
    isScrolling: boolean, 
    setIsScrolling: (value: boolean) => void,
    direction: 'left' | 'right'
  ) => (
    <nav
      className="relative overflow-hidden h-32"
      onMouseEnter={() => setIsScrolling(false)}
      onMouseLeave={() => setIsScrolling(true)}
      onTouchStart={() => setIsScrolling(false)}
      onTouchEnd={() => setIsScrolling(true)}
    >
      <ul
        className="flex gap-6 py-4 absolute"
        style={{
          animation: direction === 'left' 
            ? 'scrollLeft 30s linear infinite' 
            : 'scrollRight 30s linear infinite',
          animationPlayState: isScrolling ? 'running' : 'paused',
          listStyle: 'none'
        }}
      >
        {[...skills, ...skills, ...skills, ...skills].map((skill, index) => {
          const IconComponent = skillIcons[skill.name];
          
          return (
            <li
              key={`${skill.name}-${index}`}
              className="flex-shrink-0 flex flex-col items-center justify-center space-y-2 group"
            >
              {/* Icono circular animado con efectos futuristas */}
              <div className="relative w-20 h-20">
                {/* Anillo exterior que gira */}
                <div className="absolute inset-0 rounded-full border-[3px] border-orange-500/40 animate-spin-slow" />
                
                {/* Icono principal */}
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-gray-800 to-gray-900 border-[3px] border-orange-500 flex items-center justify-center transform transition-all duration-500 group-hover:scale-125 group-hover:rotate-[360deg] group-hover:border-orange-400 group-hover:shadow-xl group-hover:shadow-orange-500/60 group-hover:from-orange-900/20 group-hover:to-gray-900">
                  {IconComponent ? (
                    <IconComponent className="text-4xl text-orange-500 filter group-hover:drop-shadow-[0_0_8px_rgba(249,115,22,0.8)] transition-all duration-500" />
                  ) : (
                    <span className="text-4xl filter group-hover:drop-shadow-[0_0_8px_rgba(249,115,22,0.8)] transition-all duration-500">{skill.icon}</span>
                  )}
                </div>
                
                {/* Pulso de energía */}
                <div className="absolute inset-0 rounded-full bg-orange-500/20 blur-md opacity-0 group-hover:opacity-100 group-hover:animate-pulse" />
              </div>
              
              {/* Nombre de la skill con efecto neón */}
              <span className="text-white font-audiowide text-xs text-center w-24 truncate group-hover:text-orange-500 group-hover:drop-shadow-[0_0_8px_rgba(249,115,22,0.6)] transition-all duration-300">
                {skill.name}
              </span>
            </li>
          );
        })}
      </ul>
    </nav>
  );

  return (
    <section className="space-y-8">
      <h2 className="text-3xl font-semibold text-orange-500 font-orbitron text-center">
        Skills
      </h2>
      
      <div className="space-y-8">
        {/* Frontend - Izquierda */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-orange-500 font-orbitron text-center">
            {categoryLabels.frontend}
          </h3>
          {renderSkillCarousel(
            skillsData.frontend as Skill[], 
            isScrollingFrontend, 
            setIsScrollingFrontend,
            'left'
          )}
        </div>

        {/* Backend - Derecha */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-orange-500 font-orbitron text-center">
            {categoryLabels.backend}
          </h3>
          {renderSkillCarousel(
            skillsData.backend as Skill[], 
            isScrollingBackend, 
            setIsScrollingBackend,
            'right'
          )}
        </div>

        {/* Languages - Izquierda */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-orange-500 font-orbitron text-center">
            {categoryLabels.languages}
          </h3>
          {renderSkillCarousel(
            skillsData.languages as Skill[], 
            isScrollingLanguages, 
            setIsScrollingLanguages,
            'left'
          )}
        </div>

        {/* Tools - Derecha */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-orange-500 font-orbitron text-center">
            {categoryLabels.tools}
          </h3>
          {renderSkillCarousel(
            skillsData.tools as Skill[], 
            isScrollingTools, 
            setIsScrollingTools,
            'right'
          )}
        </div>
      </div>
    </section>
  );
};

export default Skills;
