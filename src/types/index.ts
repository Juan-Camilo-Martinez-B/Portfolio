export interface NavItem {
  id: string;
  label: string;
  href?: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  githubUrl?: string;
  liveUrl?: string;
  imageUrl?: string;
}

export interface Skill {
  name: string;
  level: 'beginner' | 'intermediate' | 'advanced' | 'expert';
  category: 'frontend' | 'backend' | 'tools' | 'languages';
}

export interface ContactInfo {
  email: string;
  github: string;
  linkedin: string;
  phone?: string;
}

export interface SectionTexts {
  [key: string]: string;
}

export interface Theme {
  mode: 'light' | 'dark';
  primaryColor: string;
  secondaryColor: string;
}

export interface Language {
  code: 'es' | 'en';
  name: string;
}
