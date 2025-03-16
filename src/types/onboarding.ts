export interface ProjectScope {
  categories: string[];
  description: string;
  techStack: string[];
}

export interface BusinessGoals {
  goals: string[];
  targetAudience: string;
  successCriteria: string;
  competitors: string;
}

export interface TechnicalSpecs {
  platforms: {
    web: boolean;
    ios: boolean;
    android: boolean;
    desktop: boolean;
  };
  integrations: string[];
  security: {
    compliance: string[];
    authentication: string[];
    dataProtection: string[];
  };
  scale: {
    users: number;
    storage: number;
    bandwidth: number;
  };
}

export interface ContactInfo {
  name: string;
  email: string;
  company: string;
  phone: string;
  preferredContact: 'email' | 'phone' | 'messaging';
}

export interface OnboardingData {
  projectScope: ProjectScope;
  businessGoals: BusinessGoals;
  technicalSpecs: TechnicalSpecs;
  contactInfo: ContactInfo;
}

export interface ValidationError {
  field: string;
  message: string;
}

export interface StepConfig {
  id: number;
  title: string;
  description: string;
  isComplete: boolean;
}

export type OnboardingStep = 
  | 'projectScope'
  | 'businessGoals'
  | 'technicalSpecs'
  | 'contactInfo'
  | 'success';