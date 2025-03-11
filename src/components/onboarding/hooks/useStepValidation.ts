import { useCallback } from 'react';
import type { OnboardingData } from '../../../types/onboarding';

export const useStepValidation = (validateStep: (step: number, data: OnboardingData) => boolean) => {
  return useCallback(
    (currentStep: number, formData: OnboardingData) => {
      if (currentStep === 1) return true;
      return validateStep(currentStep, formData);
    },
    [validateStep]
  );
};