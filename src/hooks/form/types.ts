import type { OnboardingData } from '../../types/onboarding';

export interface FormState {
  currentStep: number;
  formData: OnboardingData;
  isSubmitting: boolean;
  isSuccess: boolean;
  handleNext: () => void;
  handlePrevious: () => void;
  updateFormData: (field: keyof OnboardingData, value: any) => void;
  handleSubmit: () => Promise<void>;
}

export interface FormValidation {
  errors: Record<string, string>;
  validateStep: (step: number, data: OnboardingData) => boolean;
  clearErrors: () => void;
}

export interface FormStep {
  handleNextStep: () => void;
  isStepValid: () => boolean;
}