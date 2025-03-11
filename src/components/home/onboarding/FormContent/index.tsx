import React, { memo } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import type { OnboardingData } from '../../../../types/onboarding';
import { createFadeVariants } from '../animations/variants';
import { useAnimationConfig } from '../hooks/useAnimationConfig';
import StepContent from './StepContent';
import SuccessMessage from './SuccessMessage';

interface FormContentProps {
  currentStep: number;
  formData: OnboardingData;
  updateFormData: (field: keyof OnboardingData, value: any) => void;
  handleNextStep: () => void;
  errors: Record<string, string>;
  isSuccess: boolean;
}

const FormContent: React.FC<FormContentProps> = ({
  currentStep,
  formData,
  updateFormData,
  handleNextStep,
  errors,
  isSuccess
}) => {
  const prefersReducedMotion = useReducedMotion();
  const { transition } = useAnimationConfig();
  const fadeVariants = createFadeVariants(Boolean(prefersReducedMotion));

  return (
    <AnimatePresence mode="wait">
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