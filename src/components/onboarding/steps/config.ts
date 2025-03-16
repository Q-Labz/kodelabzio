import type { OnboardingData } from '../../../types/onboarding';

export interface Step {
  id: number;
  title: string;
  description: string;
  field?: keyof OnboardingData;
}

export const steps: Step[] = [
  {
    id: 1,
    title: 'Welcome',
    description: 'Project introduction'
  },
  {
    id: 2,
    title: 'Client Info',
    description: 'Basic information',
    field: 'clientInfo'
  },
  {
    id: 3,
    title: 'Project Scope',
    description: 'Project requirements',
    field: 'projectScope'
  },
  {
    id: 4,
    title: 'Business Requirements',
    description: 'Goals and target audience',
    field: 'businessRequirements'
  },
  {
    id: 5,
    title: 'Technical Specs',
    description: 'Technical requirements',
    field: 'technicalSpecs'
  }
];