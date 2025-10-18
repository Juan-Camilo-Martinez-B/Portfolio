import { useState, useEffect } from 'react';
import portfolioData from '@/data/portfolio.json';

export interface PortfolioData {
  personalInfo: {
    name: string;
    title: string;
    description: string;
    email: string;
    phone?: string;
    location: string;
    avatar: string;
    social: {
      github: string;
      linkedin: string;
      twitter?: string;
      instagram?: string;
    };
  };
  hero: {
    title: string;
    subtitle: string;
    specializations: Array<{
      title: string;
      description: string;
    }>;
  };
  about: {
    title: string;
    description: string;
    sections: Array<{
      title: string;
      items: string[];
    }>;
  };
  projects: Array<{
    id: string;
    title: string;
    description: string;
    technologies: string[];
    githubUrl?: string;
    liveUrl?: string;
    imageUrl?: string;
    featured: boolean;
  }>;
  skills: {
    frontend: Array<{
      name: string;
      level: 'beginner' | 'intermediate' | 'advanced' | 'expert';
      years: number;
    }>;
    backend: Array<{
      name: string;
      level: 'beginner' | 'intermediate' | 'advanced' | 'expert';
      years: number;
    }>;
    tools: Array<{
      name: string;
      level: 'beginner' | 'intermediate' | 'advanced' | 'expert';
      years: number;
    }>;
    languages: Array<{
      name: string;
      level: 'beginner' | 'intermediate' | 'advanced' | 'expert';
      years: number;
    }>;
  };
  experience: Array<{
    id: string;
    title: string;
    company: string;
    period: string;
    description: string;
    technologies: string[];
    achievements: string[];
  }>;
  education: Array<{
    id: string;
    degree: string;
    institution: string;
    period: string;
    description: string;
  }>;
  contact: {
    title: string;
    description: string;
    responseTime: string;
    form: {
      enabled: boolean;
      fields: Array<{
        name: string;
        label: string;
        type: string;
        required: boolean;
      }>;
    };
  };
  navigation: Array<{
    id: string;
    label: string;
  }>;
  sidebar: {
    texts: Record<string, string>;
  };
  theme: {
    colors: Record<string, string>;
    fonts: Record<string, string>;
  };
  seo: {
    title: string;
    description: string;
    keywords: string[];
    author: string;
    url: string;
  };
}

export const usePortfolioData = (): PortfolioData => {
  const [data, setData] = useState<PortfolioData>(portfolioData as PortfolioData);

  useEffect(() => {
    // En el futuro, aquí podrías cargar datos desde una API
    setData(portfolioData as PortfolioData);
  }, []);

  return data;
};

// Funciones helper para acceder a datos específicos
export const usePersonalInfo = () => {
  const data = usePortfolioData();
  return data.personalInfo;
};

export const useHeroData = () => {
  const data = usePortfolioData();
  return data.hero;
};

export const useAboutData = () => {
  const data = usePortfolioData();
  return data.about;
};

export const useProjectsData = () => {
  const data = usePortfolioData();
  return data.projects;
};

export const useSkillsData = () => {
  const data = usePortfolioData();
  return data.skills;
};

export const useContactData = () => {
  const data = usePortfolioData();
  return data.contact;
};

export const useNavigationData = () => {
  const data = usePortfolioData();
  return data.navigation;
};

export const useSidebarData = () => {
  const data = usePortfolioData();
  return data.sidebar;
};
