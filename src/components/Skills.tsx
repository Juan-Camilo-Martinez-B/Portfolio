import React from 'react';
import { useSkillsData } from '@/hooks/usePortfolioData';

const Skills: React.FC = () => {
  const skillsData = useSkillsData();

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'expert': return 'bg-green-500';
      case 'advanced': return 'bg-blue-500';
      case 'intermediate': return 'bg-yellow-500';
      case 'beginner': return 'bg-gray-500';
      default: return 'bg-gray-500';
    }
  };

  const getLevelText = (level: string) => {
    switch (level) {
      case 'expert': return 'Experto';
      case 'advanced': return 'Avanzado';
      case 'intermediate': return 'Intermedio';
      case 'beginner': return 'Principiante';
      default: return 'Principiante';
    }
  };

  const categoryLabels = {
    frontend: 'Frontend',
    backend: 'Backend',
    languages: 'Lenguajes',
    tools: 'Herramientas',
  };

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-semibold text-orange-500 font-audiowide">
        Skills
      </h2>
      
      <div className="space-y-6">
        {Object.entries(skillsData).map(([category, skills]) => (
          <div key={category} className="space-y-3">
            <h3 className="text-xl font-semibold text-orange-500 font-audiowide">
              {categoryLabels[category as keyof typeof categoryLabels]}
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {skills.map((skill) => (
                <div
                  key={skill.name}
                  className="border border-orange-500 p-3 rounded-lg space-y-2"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-gray-300 font-orbitron font-medium text-sm">
                      {skill.name}
                    </span>
                    <div className="flex items-center gap-1">
                      <span className="text-xs text-gray-400 font-orbitron">
                        {getLevelText(skill.level)}
                      </span>
                      <span className="text-xs text-orange-500 font-orbitron">
                        {skill.years}a
                      </span>
                    </div>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-1.5">
                    <div
                      className={`h-1.5 rounded-full ${getLevelColor(skill.level)}`}
                      style={{
                        width: skill.level === 'expert' ? '100%' :
                               skill.level === 'advanced' ? '80%' :
                               skill.level === 'intermediate' ? '60%' : '40%'
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Skills;
