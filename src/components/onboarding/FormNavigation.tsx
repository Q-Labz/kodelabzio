import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Check } from 'lucide-react';
import { createFadeVariants } from './animations/variants';
import { useAnimationConfig } from './hooks/useAnimationConfig';

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
      <motion.button
        type="button"
        onClick={handlePrevious}
        disabled={isSubmitting}
        whileHover={{ scale: prefersReducedMotion ? 1 : 1.02 }}
        whileTap={{ scale: prefersReducedMotion ? 1 : 0.98 }}
        className="text-white hover:text-accent transition-colors disabled:opacity-50"
      >
        Back
      </motion.button>
      <div className="ml-auto">
        {currentStep < 6 ? (
          <motion.button
            type="button"
            onClick={handleNextStep}
            disabled={isSubmitting || !isValid}
            whileHover={{ scale: prefersReducedMotion ? 1 : 1.02 }}
            whileTap={{ scale: prefersReducedMotion ? 1 : 0.98 }}
            className="bg-accent hover:bg-accent/90 text-white px-8 py-3 rounded-lg flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
          >
            Next Step
          </motion.button>
        ) : (
          <motion.button
            type="submit"
            disabled={isSubmitting || !isValid}
            whileHover={{ scale: prefersReducedMotion ? 1 : 1.02 }}
            whileTap={{ scale: prefersReducedMotion ? 1 : 0.98 }}
            className="bg-accent hover:bg-accent/90 text-white px-8 py-3 rounded-lg flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
          >
            {isSubmitting ? (
              <>
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Submitting...
              </>
            ) : (
              <>
                Submit <Check className="w-5 h-5" />
              </>
            )}
          </motion.button>
        )}
      </div>
    </motion.div>
  );
};

export default FormNavigation;