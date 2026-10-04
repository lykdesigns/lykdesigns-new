export type DisciplineId = 'space' | 'identity' | 'digital' | 'art';

export interface ServiceItem {
  id: DisciplineId;
  index: string;
  tag: string;
  title: string;
  subtitle: string;
  description: string;
  subtags: string[];
  deliverables: string[];
  specs: {
    label: string;
    value: string;
  }[];
}

export interface ProcessStep {
  number: string;
  title: string;
  summary: string;
  description: string;
  artifacts: string[];
  coordinates: string;
}

export interface StatItem {
  value: number;
  suffix: string;
  label: string;
  sublabel: string;
  metricCode: string;
}

export interface ProjectBriefState {
  services: DisciplineId[];
  timeline: string;
  scope: string;
  name: string;
  email: string;
  phone?: string;
  company: string;
  notes: string;
}
