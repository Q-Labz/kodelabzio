import React, { useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useFormState } from '../../hooks/form/useFormState';
import { useFormValidation } from '../../hooks/form/useFormValidation';
import { OnboardingData } from '../../types/onboarding';
import ProgressIndicator from './ProgressIndicator';
import FormContent from './FormContent';
import FormNavigation from './FormNavigation';
import { steps } from './steps/config';
import { slideVariants, fadeVariants } from './animations';
import { toast } from 'react-hot-toast';

const OnboardingForm: React.FC = () => {
  const {
    currentStep,
    formData,
    isSubmitting,
    isSuccess,
    error,
    updateFormData,
    handleNext,
    handlePrevious,
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

  // Show error toast when form submission fails
  React.useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  return (
    <motion.form
      onSubmit={handleSubmit}
      className="max-w-4xl mx-auto"
      initial="hidden"
      animate="visible"
      exit="exit"
      variants={fadeVariants}
    >
      <ProgressIndicator steps={steps} currentStep={currentStep} />
      
      <AnimatePresence mode="wait">
        <motion.div
          key={currentStep}
          initial="enter"
          animate="center"
          exit="exit"
          variants={slideVariants}
          custom={currentStep}
          transition={{
            type: "spring",
            stiffness: 300,
            damping: 30
          }}
          className="mt-8 bg-deep-brown-200/40 backdrop-blur-sm p-8 rounded-xl border border-white/20"
        >
          <FormContent
            currentStep={currentStep}
            formData={formData}
            updateFormData={updateFormData}
            handleNextStep={handleNextStep}
            errors={errors}
            isSuccess={isSuccess}
          />
        </motion.div>
      </AnimatePresence>

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