import { useState, useCallback } from 'react';
import { z } from 'zod';
import type { OnboardingData } from '../../types/onboarding';
import { formSchemas } from './schemas';

export const useFormValidation = () => {
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateStep = useCallback((step: number, data: OnboardingData): boolean => {
    try {
      setErrors({});

      switch (step) {
        case 1:
          return true;
        case 2:
          formSchemas.clientInfo.parse(data.clientInfo);
          break;
        case 3:
          formSchemas.designPreferences.parse(data.designPreferences);
          break;
        case 4:
          formSchemas.technicalRequirements.parse(data.technicalRequirements);
          break;
        case 5:
          formSchemas.projectScope.parse(data.projectScope);
          break;
        case 6:
          return true;
        default:
          return false;
      }

      return true;
    } catch (error) {
      if (error instanceof z.ZodError) {
        const newErrors: Record<string, string> = {};
        error.errors.forEach((err) => {
          const path = err.path.join('.');
          newErrors[path] = err.message;
        });
        setErrors(newErrors);
      }
      return false;
    }
  }, []);

  return {
    errors,
    validateStep,
    clearErrors: () => setErrors({})
  };
};