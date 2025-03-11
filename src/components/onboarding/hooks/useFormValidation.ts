import { useCallback, useState } from 'react';
import type { OnboardingData } from '../../../types/onboarding';

export const useFormValidation = () => {
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateField = useCallback((field: string, value: any): boolean => {
    setErrors(prev => ({ ...prev, [field]: '' }));

    if (!value || (Array.isArray(value) && value.length === 0)) {
      setErrors(prev => ({ ...prev, [field]: 'This field is required' }));
      return false;
    }

    if (field === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
      setErrors(prev => ({ ...prev, [field]: 'Invalid email address' }));
      return false;
    }

    return true;
  }, []);

  const validateStep = useCallback((step: number, data: OnboardingData): boolean => {
    setErrors({});

    switch (step) {
      case 1:
        return true;
      case 2:
        return (
          validateField('name', data.clientInfo.name) &&
          validateField('email', data.clientInfo.email) &&
          validateField('company', data.clientInfo.company) &&
          validateField('phone', data.clientInfo.phone) &&
          validateField('industry', data.clientInfo.industry) &&
          validateField('projectName', data.clientInfo.projectName)
        );
      case 3:
        return (
          validateField('style', data.designPreferences.style) &&
          validateField('colorScheme', data.designPreferences.colorScheme) &&
          validateField('inspiration', data.designPreferences.inspiration)
        );
      case 4:
        return (
          validateField('platform', data.technicalRequirements.platform) &&
          validateField('features', data.technicalRequirements.features)
        );
      case 5:
        return (
          validateField('timeline', data.projectScope.timeline) &&
          validateField('budget', data.projectScope.budget) &&
          validateField('team', data.projectScope.team) &&
          validateField('milestones', data.projectScope.milestones)
        );
      case 6:
        return true;
      default:
        return false;
    }
  }, [validateField]);

  return {
    errors,
    validateStep,
    validateField,
    clearErrors: () => setErrors({})
  };
};