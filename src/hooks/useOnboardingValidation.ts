import { useState, useCallback } from 'react';
import { z } from 'zod';
import type { OnboardingData } from '../types/onboarding';

const clientInfoSchema = z.object({
  companyName: z.string().min(2, 'Company name is required'),
  industry: z.string().min(2, 'Industry is required'),
  email: z.string().email('Invalid email address'),
  phone: z.string().min(10, 'Valid phone number is required'),
  preferredContact: z.string().min(2, 'Preferred contact is required')
});

const projectScopeSchema = z.object({
  categories: z.array(z.string()).min(1, 'At least one category is required'),
  description: z.string().min(2, 'Description is required'),
  budget: z.object({
    min: z.number().gt(0, 'Minimum budget is required'),
    max: z.number().gt(0, 'Maximum budget is required')
  }),
  techStack: z.array(z.string()).min(1, 'At least one tech stack is required')
});

const businessRequirementsSchema = z.object({
  goals: z.array(z.string()).min(1, 'At least one goal is required'),
  targetAudience: z.string().min(2, 'Target audience is required'),
  successMetrics: z.array(z.string()).min(1, 'At least one success metric is required')
});

const technicalSpecsSchema = z.object({
  platforms: z.string().min(2, 'Platforms are required'),
  integrations: z.array(z.string()).min(1, 'At least one integration is required'),
  security: z.string().min(2, 'Security is required'),
  scale: z.string().min(2, 'Scale is required')
});

export const useOnboardingValidation = () => {
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateClientInfo = useCallback((data: OnboardingData): boolean => {
    try {
      clientInfoSchema.parse(data.clientInfo);
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

  const validateProjectScope = useCallback((data: OnboardingData): boolean => {
    try {
      projectScopeSchema.parse(data.projectScope);
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

  const validateBusinessRequirements = useCallback((data: OnboardingData): boolean => {
    try {
      businessRequirementsSchema.parse(data.businessRequirements);
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

  const validateTechnicalSpecs = useCallback((data: OnboardingData): boolean => {
    try {
      technicalSpecsSchema.parse(data.technicalSpecs);
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
    validateClientInfo,
    validateProjectScope,
    validateBusinessRequirements,
    validateTechnicalSpecs,
    errors
  };
};