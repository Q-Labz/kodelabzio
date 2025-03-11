import { useCallback } from 'react';
import type { OnboardingData } from '../../../../types/onboarding';

export const useFormHandlers = (
  updateFormData: (field: keyof OnboardingData, value: any) => void
) => {
  const handleArrayChange = useCallback(
    (field: keyof OnboardingData, key: string, value: string) => {
      const currentValues = Array.isArray(field) ? field : [];
      const newValues = currentValues.includes(value)
        ? currentValues.filter((v) => v !== value)
        : [...currentValues, value];
      updateFormData(key as keyof OnboardingData, newValues);
    },
    [updateFormData]
  );

  const handleInputChange = useCallback(
    (field: keyof OnboardingData, value: any) => {
      updateFormData(field, value);
    },
    [updateFormData]
  );

  return {
    handleArrayChange,
    handleInputChange
  };
};