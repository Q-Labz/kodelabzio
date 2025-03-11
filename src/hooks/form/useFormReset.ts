import { useCallback } from 'react';
import type { OnboardingData } from '../../types/onboarding';

const initialFormData: OnboardingData = {
  clientInfo: {
    name: '',
    email: '',
    company: '',
    phone: '',
    industry: '',
    projectName: ''
  },
  designPreferences: {
    style: '',
    colorScheme: '',
    inspiration: [],
    brandGuidelines: null
  },
  technicalRequirements: {
    platform: [],
    features: [],
    integrations: [],
    security: []
  },
  projectScope: {
    timeline: '',
    budget: '',
    team: '',
    milestones: []
  }
};

export const useFormReset = (
  setCurrentStep: (step: number) => void,
  setFormData: (data: OnboardingData) => void,
  setIsSuccess: (success: boolean) => void,
  onComplete?: () => void
) => {
  return useCallback(() => {
    setCurrentStep(1);
    setFormData(initialFormData);
    setIsSuccess(false);
    onComplete?.();
  }, [setCurrentStep, setFormData, setIsSuccess, onComplete]);
};

export { initialFormData };