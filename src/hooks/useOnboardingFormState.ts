import { useState, useCallback } from 'react';
import type { OnboardingData } from '../types/onboarding';

export const useOnboardingFormState = (onComplete?: () => void) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [formData, setFormData] = useState<OnboardingData>({
    clientInfo: {
      name: '',
      email: '',
      company: '',
      phone: '',
      industry: '',
      projectName: ''
    },
    designPreferences: {
      style: '',
      colorScheme: '',
      inspiration: [],
      brandGuidelines: null
    },
    technicalRequirements: {
      platform: [],
      features: [],
      integrations: [],
      security: []
    },
    projectScope: {
      timeline: '',
      budget: '',
      team: '',
      milestones: []
    }
  });

  const handleNext = useCallback(() => {
    setCurrentStep(prev => Math.min(prev + 1, 6));
  }, []);

  const handlePrevious = useCallback(() => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  }, []);

  const updateFormData = useCallback((field: keyof OnboardingData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  }, []);

  const handleSubmit = useCallback(async () => {
    try {
      setIsSubmitting(true);
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      setIsSuccess(true);
      
      // Reset form after success
      setTimeout(() => {
        setCurrentStep(1);
        setFormData({
          clientInfo: { name: '', email: '', company: '', phone: '', industry: '', projectName: '' },
          designPreferences: { style: '', colorScheme: '', inspiration: [], brandGuidelines: null },
          technicalRequirements: { platform: [], features: [], integrations: [], security: [] },
          projectScope: { timeline: '', budget: '', team: '', milestones: [] }
        });
        setIsSuccess(false);
        onComplete?.();
      }, 2000);
    } catch (error) {
      console.error('Form submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  }, [onComplete]);

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