import { useState, useCallback, useMemo } from 'react';
import type { OnboardingData } from '../types/onboarding';

const initialData: OnboardingData = {
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
};

export const useOnboardingForm = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [direction, setDirection] = useState(0);
  const [formData, setFormData] = useState<OnboardingData>(initialData);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleNext = useCallback(() => {
    setDirection(1);
    setCurrentStep((prev) => Math.min(prev + 1, 6));
  }, []);

  const handlePrevious = useCallback(() => {
    setDirection(-1);
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  }, []);

  const updateFormData = useCallback((field: keyof OnboardingData, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  }, []);

  const resetForm = useCallback(() => {
    setFormData(initialData);
    setCurrentStep(1);
    setDirection(0);
    setIsSuccess(false);
    setIsSubmitting(false);
  }, []);

  return useMemo(() => ({
    currentStep,
    direction,
    formData,
    isSubmitting,
    isSuccess,
    handleNext,
    handlePrevious,
    updateFormData,
    setIsSubmitting,
    setIsSuccess,
    resetForm
  }), [
    currentStep,
    direction,
    formData,
    isSubmitting,
    isSuccess,
    handleNext,
    handlePrevious,
    updateFormData,
    resetForm
  ]);
};