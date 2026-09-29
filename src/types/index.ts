export interface Project {
  id: string;
  title: string;
  tagline: string;
  category: '3d-web' | 'fintech' | 'creative-ai' | 'fullstack';
  categoryLabel: string;
  description: string;
  image: string;
  tags: string[];
  metrics: { label: string; value: string }[];
  liveUrl: string;
  githubUrl: string;
  featured: boolean;
  highlights: string[];
}

export interface Education {
  id: string;
  degree: string;
  institution: string;
  major?: string;
  period: string;
  statusBadge?: string;
  description: string;
  highlights?: string[];
  current?: boolean;
}

export interface Experience {
  id: string;
  role: string;
  company: string;
  period: string;
  location: string;
  description: string[];
  tech: string[];
  featured?: boolean;
}

export interface SkillCategory {
  title: string;
  skills: { name: string; level: number; icon?: string; badge?: string }[];
}

export interface SoftwareTool {
  id: string;
  name: string;
  category: string;
  icon3D: string;
  accentColor: string;
  description: string;
}

export type PerformanceMode = 'ultra' | 'eco';

export interface DeviceStats {
  cores: number;
  memoryGb?: number;
  fps: number;
  isLowEnd: boolean;
  mode: PerformanceMode;
}
