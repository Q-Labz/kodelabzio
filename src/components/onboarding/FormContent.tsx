import React, { memo } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import type { OnboardingData } from '../../types/onboarding';
import { createFadeVariants } from './animations/variants';
import { useAnimationConfig } from './hooks/useAnimationConfig';
import StepContent from './StepContent';
import SuccessMessage from './SuccessMessage';

interface FormContentProps {
  isSuccess: boolean;
  direction: number;
  currentStep: number;
  formData: OnboardingData;
  updateFormData: (field: keyof OnboardingData, value: any) => void;
  handleNextStep: () => void;
  errors: Record<string, string>;
}

const FormContent: React.FC<FormContentProps> = ({
  isSuccess,
  direction,
  currentStep,
  formData,
  updateFormData,
  handleNextStep,
  errors
}) => {
  const prefersReducedMotion = useReducedMotion();
  const { transition } = useAnimationConfig();
  const fadeVariants = createFadeVariants(Boolean(prefersReducedMotion));

  return (
    <AnimatePresence mode="wait" custom={direction}>
      {isSuccess ? (
        <motion.div
          key="success"
          variants={fadeVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          transition={transition}
        >
          <SuccessMessage />
        </motion.div>
      ) : (
        <StepContent
          currentStep={currentStep}
          direction={direction}
          formData={formData}
          updateFormData={updateFormData}
          handleNextStep={handleNextStep}
          errors={errors}
        />
      )}
    </AnimatePresence>
  );
};

export default memo(FormContent);