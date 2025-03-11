export interface BasicInfo {
  projectName: string;
  companyName: string;
  contactName: string;
  contactRole: string;
  contactEmail: string;
  contactPhone: string;
  preferredContact: 'email' | 'phone';
  startDate: Date | null;
  endDate: Date | null;
}

export interface ProjectOverview {
  objective: string;
  targetAudience: string;
  deliverables: string[];
  budgetRange: string;
  existingMaterials: string[];
}

export interface TechnicalRequirements {
  platforms: string[];
  integrations: string[];
  security: string[];
  performance: string;
  responsive: boolean;
}

export interface DesignPreferences {
  brandGuidelines: File | null;
  colorPreferences: string;
  designExamples: string[];
  keyFeatures: string[];
  userFlows: string[];
}

export interface SuccessMetrics {
  criteria: string[];
  kpis: string[];
  outcomes: string[];
  supportNeeds: string;
  additionalNotes: string;
}

export interface ProjectIntakeFormData {
  basicInfo: BasicInfo;
  overview: ProjectOverview;
  technical: TechnicalRequirements;
  design: DesignPreferences;
  success: SuccessMetrics;
}