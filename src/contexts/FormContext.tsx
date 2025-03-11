import React, { createContext, useContext, useMemo, useCallback } from 'react';
import { useFormState } from '../hooks/useFormState';
import { useFormValidation } from '../hooks/useFormValidation';
import type { OnboardingData } from '../types/onboarding';

interface FormContextType {
  currentStep: number;
  direction: number;
  formData: OnboardingData;
  isSubmitting: boolean;
  isSuccess: boolean;
  errors: Record<string, string>;
  handleNext: () => void;
  handlePrevious: () => void;
  updateFormData: (field: keyof OnboardingData, value: any) => void;
  setIsSubmitting: (value: boolean) => void;
  setIsSuccess: (value: boolean) => void;
  resetForm: () => void;
  validateStep: (step: number, data: OnboardingData) => boolean;
}

const FormContext = createContext<FormContextType | null>(null);

export const FormProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const {
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
  } = useFormState();

  const { errors, validateStep } = useFormValidation();

  // Memoize context value to prevent unnecessary re-renders
  const contextValue = useMemo(
    () => ({
      currentStep,
      direction,
      formData,
      isSubmitting,
      isSuccess,
      errors,
      handleNext,
      handlePrevious,
      updateFormData,
      setIsSubmitting,
      setIsSuccess,
      resetForm,
      validateStep
    }),
    [
      currentStep,
      direction,
      formData,
      isSubmitting,
      isSuccess,
      errors,
      handleNext,
      handlePrevious,
      updateFormData,
      setIsSubmitting,
      setIsSuccess,
      resetForm,
      validateStep
    ]
  );

  return <FormContext.Provider value={contextValue}>{children}</FormContext.Provider>;
};

export const useFormContext = () => {
  const context = useContext(FormContext);
  if (!context) {
    throw new Error('useFormContext must be used within a FormProvider');
  }
  return context;
};