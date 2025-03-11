import { useCallback } from 'react';
import type { OnboardingData } from '../../types/onboarding';

export const useFormStep = (
  currentStep: number,
  validateStep: (step: number, data: OnboardingData) => boolean,
  formData: OnboardingData,
  onNext: () => void
) => {
  const handleNextStep = useCallback(() => {
    if (validateStep(currentStep, formData)) {
      onNext();
    }
  }, [currentStep, formData, validateStep, onNext]);

  const isStepValid = useCallback(() => {
    return validateStep(currentStep, formData);
  }, [currentStep, formData, validateStep]);

  return {
    handleNextStep,
    isStepValid
  };
};