import { useState, useCallback } from 'react';
import type { OnboardingData } from '../types/onboarding';

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

export const useFormState = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<OnboardingData>(initialFormData);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleNext = useCallback(() => {
    setCurrentStep(prev => Math.min(prev + 1, 5));
  }, []);

  const handlePrevious = useCallback(() => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  }, []);

  const updateFormData = useCallback((updates: Partial<OnboardingData>) => {
    setFormData(prev => ({
      ...prev,
      ...updates
    }));
  }, []);

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;

    try {
      setIsSubmitting(true);
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      setIsSuccess(true);
      
      // Reset form after success
      setTimeout(() => {
        setCurrentStep(1);
        setFormData(initialFormData);
        setIsSuccess(false);
      }, 2000);
    } catch (error) {
      console.error('Form submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  }, [isSubmitting]);

  return {
    currentStep,
    formData,
    isSubmitting,
    isSuccess,
    handleNext,
    handlePrevious,
    updateFormData,
    handleSubmit
  };
};