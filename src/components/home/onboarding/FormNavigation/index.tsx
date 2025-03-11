import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowLeft, ArrowRight, Check } from 'lucide-react';
import { createFadeVariants } from '../animations/variants';
import { useAnimationConfig } from '../hooks/useAnimationConfig';
import NavigationButton from './NavigationButton';

interface FormNavigationProps {
  currentStep: number;
  isSubmitting: boolean;
  handlePrevious: () => void;
  handleNextStep: () => void;
  isValid: boolean;
}

const FormNavigation: React.FC<FormNavigationProps> = ({
  currentStep,
  isSubmitting,
  handlePrevious,
  handleNextStep,
  isValid
}) => {
  const prefersReducedMotion = useReducedMotion();
  const { transition } = useAnimationConfig();
  const fadeVariants = createFadeVariants(Boolean(prefersReducedMotion));

  return (
    <motion.div
      variants={fadeVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      transition={transition}
      className="flex justify-between mt-8"
    >
      <NavigationButton
        onClick={handlePrevious}
        disabled={isSubmitting}
        variant="text"
      >
        <ArrowLeft className="w-5 h-5 mr-2 transform group-hover:-translate-x-1 transition-transform" />
        Back
      </NavigationButton>

      <NavigationButton
        onClick={currentStep < 5 ? handleNextStep : undefined}
        type={currentStep === 5 ? 'submit' : 'button'}
        disabled={isSubmitting || !isValid}
      >
        {currentStep === 5 ? (
          isSubmitting ? (
            <>
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />
              Submitting...
            </>
          ) : (
            <>
              Submit <Check className="w-5 h-5 ml-2" />
            </>
          )
        ) : (
          <>
            Next Step
            <ArrowRight className="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform" />
          </>
        )}
      </NavigationButton>
    </motion.div>
  );
};

export default FormNavigation;