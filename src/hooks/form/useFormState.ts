import { useState } from 'react';
import { OnboardingData } from '../../types/onboarding';
import { submitOnboardingData } from '../../services/api';

const initialFormData: OnboardingData = {
  projectScope: {
    categories: [],
    description: '',
    techStack: []
  },
  businessGoals: {
    goals: [],
    targetAudience: '',
    successCriteria: ''
  },
  technicalSpecs: {
    platforms: {
      web: false,
      ios: false,
      android: false,
      desktop: false
    },
    integrations: [],
    security: {
      compliance: [],
      authentication: [],
      dataProtection: []
    },
    scale: {
      users: 0,
      storage: 0,
      bandwidth: 0
    }
  },
  contactInfo: {
    name: '',
    email: '',
    company: '',
    phone: '',
    preferredContact: 'email'
  }
};

type RecursivePartial<T> = {
  [P in keyof T]?: T[P] extends (infer U)[]
    ? RecursivePartial<U>[]
    : T[P] extends object
    ? RecursivePartial<T[P]>
    : T[P];
};

function isObject(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function deepMerge<T extends object>(target: T, source: RecursivePartial<T>): T {
  const output = { ...target };

  for (const key in source) {
    if (!(key in target)) continue;

    const targetValue = target[key as keyof T];
    const sourceValue = source[key as keyof RecursivePartial<T>];

    if (sourceValue === undefined) continue;

    if (isObject(targetValue) && isObject(sourceValue)) {
      (output as any)[key] = deepMerge(
        targetValue as object,
        sourceValue as RecursivePartial<typeof targetValue>
      );
    } else {
      (output as any)[key] = sourceValue;
    }
  }

  return output;
}

export const useFormState = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<OnboardingData>(initialFormData);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const updateFormData = (updates: RecursivePartial<OnboardingData>) => {
    setFormData(prevData => deepMerge(prevData, updates));
  };

  const handleNext = () => {
    setCurrentStep(prev => Math.min(prev + 1, 5));
  };

  const handlePrevious = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setIsSubmitting(true);
      await submitOnboardingData(formData);
      setIsSuccess(true);
      setError(null);
    } catch (error) {
      console.error('Error submitting form:', error);
      setError('Failed to submit form. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    currentStep,
    formData,
    isSuccess,
    isSubmitting,
    error,
    updateFormData,
    handleNext,
    handlePrevious,
    handleSubmit
  };
};