import React, { useCallback } from 'react';
import { motion } from 'framer-motion';
import { useFormState } from '../../hooks/form/useFormState';
import { useFormStep } from '../../hooks/form/useFormStep';
import { useFormSubmission } from '../../hooks/form/useFormSubmission';
import { useFormValidation } from '../../hooks/useFormValidation';
import ProgressIndicator from './ProgressIndicator';
import FormContent from './FormContent';
import FormNavigation from './FormNavigation';
import { steps } from './steps/config';
import ErrorBoundary from '../ErrorBoundary';

interface OnboardingFormProps {
  onComplete?: () => void;
}

const OnboardingForm: React.FC<OnboardingFormProps> = ({ onComplete }) => {
  const {
    currentStep,
    formData,
    isSubmitting,
    isSuccess,
    handleNext,
    handlePrevious,
    updateFormData,
    handleSubmit
  } = useFormState(onComplete);

  const { errors, validateStep } = useFormValidation();

  const { handleNextStep, isStepValid } = useFormStep(
    currentStep,
    validateStep,
    formData,
    handleNext
  );

  const onSubmit = useFormSubmission(
    currentStep,
    formData,
    validateStep,
    handleSubmit
  );

  const formVariants = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 }
  };

  return (
    <ErrorBoundary>
      <motion.form
        onSubmit={onSubmit}
        className="relative"
        variants={formVariants}
        initial="initial"
        animate="animate"
        exit="exit"
      >
        <ProgressIndicator steps={steps} currentStep={currentStep} />
        
        <FormContent
          isSuccess={isSuccess}
          currentStep={currentStep}
          formData={formData}
          updateFormData={updateFormData}
          handleNextStep={handleNextStep}
          errors={errors}
        />

        {!isSuccess && currentStep > 1 && (
          <FormNavigation
            currentStep={currentStep}
            isSubmitting={isSubmitting}
            handlePrevious={handlePrevious}
            handleNextStep={handleNextStep}
            isValid={isStepValid()}
          />
        )}
      </motion.form>
    </ErrorBoundary>
  );
};

export default React.memo(OnboardingForm);