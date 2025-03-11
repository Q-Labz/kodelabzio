import { useState, useCallback, useRef, useEffect } from 'react';
import type { OnboardingData } from '../../types/onboarding';
import { useFormReset, initialFormData } from './useFormReset';

export const useFormState = (onComplete?: () => void) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [formData, setFormData] = useState<OnboardingData>(initialFormData);
  
  const resetTimeoutRef = useRef<number>();

  const handleNext = useCallback(() => {
    setCurrentStep(prev => Math.min(prev + 1, 6));
  }, []);

  const handlePrevious = useCallback(() => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  }, []);

  const updateFormData = useCallback((field: keyof OnboardingData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  }, []);

  const resetForm = useFormReset(setCurrentStep, setFormData, setIsSuccess, onComplete);

  const handleSubmit = useCallback(async () => {
    if (isSubmitting) return;
    
    try {
      setIsSubmitting(true);
      await new Promise(resolve => setTimeout(resolve, 1500));
      setIsSuccess(true);
      
      if (resetTimeoutRef.current) {
        window.clearTimeout(resetTimeoutRef.current);
      }
      
      resetTimeoutRef.current = window.setTimeout(() => {
        resetForm();
        resetTimeoutRef.current = undefined;
      }, 2000);
      
    } catch (error) {
      console.error('Form submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  }, [resetForm, isSubmitting]);

  useEffect(() => {
    return () => {
      if (resetTimeoutRef.current) {
        window.clearTimeout(resetTimeoutRef.current);
      }
    };
  }, []);

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