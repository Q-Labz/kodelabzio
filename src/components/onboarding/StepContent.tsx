import React, { memo } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import type { OnboardingData } from '../../types/onboarding';
import { createSlideVariants } from './animations/variants';
import { useAnimationConfig } from './hooks/useAnimationConfig';
import { renderStep } from './steps';

interface StepContentProps {
  currentStep: number;
  direction: number;
  formData: OnboardingData;
  updateFormData: (field: keyof OnboardingData, value: any) => void;
  handleNextStep: () => void;
  errors: Record<string, string>;
}

const StepContent: React.FC<StepContentProps> = ({
  currentStep,
  direction,
  formData,
  updateFormData,
  handleNextStep,
  errors
}) => {
  const prefersReducedMotion = useReducedMotion();
  const { slideTransition } = useAnimationConfig();
  const slideVariants = createSlideVariants(Boolean(prefersReducedMotion));

  return (
    <motion.div
      key={currentStep}
      custom={direction}
      variants={slideVariants}
      initial="enter"
      animate="center"
      exit="exit"
      transition={slideTransition}
    >
      {renderStep({
        step: currentStep,
        data: formData,
        onChange: updateFormData,
        onNext: handleNextStep,
        errors
      })}
    </motion.div>
  );
};

export default memo(StepContent);