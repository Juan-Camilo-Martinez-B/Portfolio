'use client';

import portfolioDataEs from '@/data/portfolio.json';
import portfolioDataEn from '@/data/portfolio.en.json';
import { useLanguage } from '@/contexts/LanguageContext';
import { useEffect, useState } from 'react';

export interface PortfolioData {
  personalInfo: {
    name: string;
    social: {
      github: string;
      linkedin: string;
      instagram?: string;
      facebook?: string;
    };
  };
  hero: {
    image: string;
    name: string;
    description: string;
    cvButton: {
      text: string;
      url: string;
    };
  };
  about: {
    title: string;
    image: {
      placeholder: string;
      alt: string;
    };
    texts: {
      left: string;
      right: string;
    };
    description: string;
    button: {
      text: string;
      action: string;
    };
    modal: {
      title: string;
      sections: {
        references: {
          title: string;
        };
        myWorld: {
          title: string;
        };
      };
      images: Array<{
        id: number;
        placeholder: string;
        description: string;
      }>;
    };
  };
  projectsSection: {
    title: string;
    buttons: {
      details: string;
      live: string;
    };
    modal: {
      description: string;
      stack: string;
    };
  };
  projects: Array<{
    id: string;
    title: string;
    shortDescription: string;
    fullDescription: string;
    imageUrl: string;
    technologies: Array<{ name: string; icon: string }>;
    githubUrl?: string;
    liveUrl?: string;
  }>;
  skills: {
    frontend: Array<{
      name: string;
      icon: string;
    }>;
    backend: Array<{
      name: string;
      icon: string;
    }>;
    languages: Array<{
      name: string;
      icon: string;
    }>;
    tools: Array<{
      name: string;
      icon: string;
    }>;
  };
  contact: {
    title: string;
    description: string;
    responseTime: string;
    contactInfo: {
      title: string;
      location: {
        label: string;
        value: string;
        icon: string;
      };
      email: {
        label: string;
        value: string;
      };
      availability: {
        label: string;
        value: string;
      };
    };
    form: {
      title: string;
      enabled: boolean;
      fields: Array<{
        name: string;
        label: string;
        type: string;
        required: boolean;
      }>;
      submitButton: {
        text: string;
        loadingText: string;
      };
      messages: {
        success: string;
        error: string;
      };
    };
  };
  navigation: Array<{
    id: string;
    label: string;
  }>;
  sidebar: {
    texts: Record<string, string>;
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
  const { language } = useLanguage();
  const [data, setData] = useState<PortfolioData>(portfolioDataEs as PortfolioData);

  useEffect(() => {
    const portfolioData = language === 'es' ? portfolioDataEs : portfolioDataEn;
    setData(portfolioData as PortfolioData);
  }, [language]);

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

export const useProjectsSectionData = () => {
  const data = usePortfolioData();
  return data.projectsSection;
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
