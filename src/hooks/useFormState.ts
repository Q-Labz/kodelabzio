import { useState, useCallback } from 'react';
import type { OnboardingData } from '../types/onboarding';

const initialFormData: OnboardingData = {
  projectScope: {
    categories: [],
    description: '',
    techStack: []
  },
  budgetTimeline: {
    budget: '',
    timeline: '',
    teamSize: ''
  },
  businessGoals: {
    goals: [],
    targetAudience: '',
    successCriteria: ''
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

  const updateFormData = useCallback((field: keyof OnboardingData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
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