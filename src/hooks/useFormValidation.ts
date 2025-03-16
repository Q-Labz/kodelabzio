import { useState, useCallback } from 'react';
import { z } from 'zod';
import type { OnboardingData } from '../types/onboarding';

const projectScopeSchema = z.object({
  categories: z.array(z.string()).min(1, 'Please select at least one project type'),
  description: z.string().min(20, 'Please provide a detailed project description (at least 20 characters)'),
  techStack: z.array(z.string()).min(1, 'Please select at least one technology')
});

const businessGoalsSchema = z.object({
  goals: z.array(z.string()).min(1, 'Please add at least one business goal'),
  targetAudience: z.string().min(10, 'Please describe your target audience'),
  successCriteria: z.string().min(10, 'Please describe your success criteria')
});

const technicalSpecsSchema = z.object({
  platforms: z.object({
    web: z.boolean(),
    ios: z.boolean(),
    android: z.boolean(),
    desktop: z.boolean()
  }).refine(data => Object.values(data).some(Boolean), {
    message: 'At least one platform must be selected'
  }),
  integrations: z.array(z.object({
    name: z.string().min(2, 'Integration name is required'),
    type: z.string().min(2, 'Integration type is required'),
    priority: z.enum(['high', 'medium', 'low'])
  })),
  security: z.object({
    compliance: z.array(z.string()),
    authentication: z.array(z.string()).min(1, 'At least one authentication method is required'),
    dataProtection: z.array(z.string()).min(1, 'At least one data protection measure is required')
  }),
  scale: z.object({
    users: z.number().min(0, 'Expected users must be non-negative'),
    storage: z.number().min(0, 'Storage requirements must be non-negative'),
    bandwidth: z.number().min(0, 'Bandwidth requirements must be non-negative')
  })
});

const contactInfoSchema = z.object({
  name: z.string().min(2, 'Name is required'),
  email: z.string().email('Invalid email address'),
  company: z.string().min(2, 'Company name is required'),
  phone: z.string().min(10, 'Valid phone number is required'),
  preferredContact: z.enum(['email', 'phone', 'messaging'], {
    required_error: 'Preferred contact method is required'
  })
});

export const useFormValidation = () => {
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateStep = useCallback((step: number, data: OnboardingData): boolean => {
    try {
      setErrors({});

      switch (step) {
        case 1:
          return true; // Welcome step, no validation needed
        case 2: {
          const result = projectScopeSchema.safeParse(data.projectScope);
          if (!result.success) {
            throw result.error;
          }
          break;
        }
        case 3: {
          const result = businessGoalsSchema.safeParse(data.businessGoals);
          if (!result.success) {
            throw result.error;
          }
          break;
        }
        case 4: {
          const result = technicalSpecsSchema.safeParse(data.technicalSpecs);
          if (!result.success) {
            throw result.error;
          }
          break;
        }
        case 5: {
          const result = contactInfoSchema.safeParse(data.contactInfo);
          if (!result.success) {
            throw result.error;
          }
          break;
        }
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