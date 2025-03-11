import { useState, useCallback } from 'react';
import { z } from 'zod';
import type { OnboardingData } from '../types/onboarding';

const clientInfoSchema = z.object({
  name: z.string().min(2, 'Name is required'),
  email: z.string().email('Invalid email address'),
  company: z.string().min(2, 'Company name is required'),
  phone: z.string().min(10, 'Valid phone number is required'),
  industry: z.string().min(2, 'Industry is required'),
  projectName: z.string().min(2, 'Project name is required')
});

const designPreferencesSchema = z.object({
  style: z.string().min(2, 'Style preference is required'),
  colorScheme: z.string().min(2, 'Color scheme is required'),
  inspiration: z.array(z.string()).min(1, 'At least one inspiration is required'),
  brandGuidelines: z.any().optional()
});

const technicalRequirementsSchema = z.object({
  platform: z.array(z.string()).min(1, 'At least one platform is required'),
  features: z.array(z.string()).min(1, 'At least one feature is required'),
  integrations: z.array(z.string()).optional(),
  security: z.array(z.string()).optional()
});

const projectScopeSchema = z.object({
  timeline: z.string().min(2, 'Timeline is required'),
  budget: z.string().min(2, 'Budget is required'),
  team: z.string().min(2, 'Team size is required'),
  milestones: z.array(z.string()).min(1, 'At least one milestone is required')
});

export const useFormValidation = () => {
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateStep = useCallback((step: number, data: OnboardingData): boolean => {
    try {
      setErrors({});

      switch (step) {
        case 1:
          return true; // Welcome step, no validation needed
        case 2:
          clientInfoSchema.parse(data.clientInfo);
          break;
        case 3:
          designPreferencesSchema.parse(data.designPreferences);
          break;
        case 4:
          technicalRequirementsSchema.parse(data.technicalRequirements);
          break;
        case 5:
          projectScopeSchema.parse(data.projectScope);
          break;
        default:
          return true;
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