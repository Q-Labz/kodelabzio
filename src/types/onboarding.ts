export interface ClientInfo {
  companyName: string;
  industry: string;
  email: string;
  phone: string;
  preferredContact: 'email' | 'phone' | 'messaging';
}

export interface ProjectScope {
  categories: string[];
  description: string;
  targetDate: Date | null;
  budget: {
    min: number;
    max: number;
  };
  techStack: string[];
}

export interface BusinessRequirements {
  goals: {
    id: string;
    text: string;
    priority: number;
  }[];
  targetAudience: {
    demographics: string[];
    behaviors: string[];
    needs: string[];
  };
  successMetrics: string[];
  competitors: {
    name: string;
    strengths: string[];
    weaknesses: string[];
  }[];
}

export interface TechnicalSpecs {
  platforms: {
    web?: boolean;
    ios?: boolean;
    android?: boolean;
    desktop?: boolean;
  };
  integrations: {
    name: string;
    type: string;
    priority: 'high' | 'medium' | 'low';
  }[];
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

export interface OnboardingData {
  clientInfo: ClientInfo;
  projectScope: ProjectScope;
  businessRequirements: BusinessRequirements;
  technicalSpecs: TechnicalSpecs;
  lastUpdated?: string;
  progress: number;
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
  | 'clientInfo'
  | 'projectScope'
  | 'businessRequirements'
  | 'technicalSpecs';