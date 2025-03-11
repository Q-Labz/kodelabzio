import React, { useCallback, useMemo } from 'react';
import { motion } from 'framer-motion';
import { useFormState } from '../../../hooks/useFormState';
import { useFormValidation } from '../../../hooks/useFormValidation';
import ProgressIndicator from './ProgressIndicator';
import FormContent from './FormContent';
import FormNavigation from './FormNavigation';
import { steps } from './steps/config';

const OnboardingForm: React.FC = () => {
  const {
    currentStep,
    formData,
    isSubmitting,
    isSuccess,
    handleNext,
    handlePrevious,
    updateFormData,
    handleSubmit
  } = useFormState();

  const { errors, validateStep } = useFormValidation();

  // Memoize validation check
  const isStepValid = useMemo(() => {
    return validateStep(currentStep, formData);
  }, [currentStep, formData, validateStep]);

  // Memoize next step handler
  const handleNextStep = useCallback(() => {
    if (validateStep(currentStep, formData)) {
      handleNext();
    }
  }, [currentStep, formData, validateStep, handleNext]);

  return (
    <motion.form
      onSubmit={handleSubmit}
      className="max-w-4xl mx-auto"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <ProgressIndicator steps={steps} currentStep={currentStep} />
      
      <div className="mt-8 bg-deep-brown-200/40 backdrop-blur-sm p-8 rounded-xl border border-white/20">
        <FormContent
          currentStep={currentStep}
          formData={formData}
          updateFormData={updateFormData}
          handleNextStep={handleNextStep}
          errors={errors}
          isSuccess={isSuccess}
        />
      </div>

      {!isSuccess && currentStep > 1 && (
        <FormNavigation
          currentStep={currentStep}
          isSubmitting={isSubmitting}
          handlePrevious={handlePrevious}
          handleNextStep={handleNextStep}
          isValid={isStepValid}
        />
      )}
    </motion.form>
  );
};

export default OnboardingForm;