import { useCallback } from 'react';
import type { OnboardingData } from '../../types/onboarding';

export const useFormSubmission = (
  currentStep: number,
  formData: OnboardingData,
  validateStep: (step: number, data: OnboardingData) => boolean,
  onSubmit: () => Promise<void>
) => {
  return useCallback((e: React.FormEvent) => {
    e.preventDefault();
    if (validateStep(currentStep, formData)) {
      onSubmit();
    }
  }, [currentStep, formData, validateStep, onSubmit]);
};