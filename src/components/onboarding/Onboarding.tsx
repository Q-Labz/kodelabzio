import React, { useEffect } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { FormProvider } from '../../contexts/FormContext';
import OnboardingForm from './OnboardingForm';
import { createFadeVariants } from './animations/variants';
import { useAnimationConfig } from './hooks/useAnimationConfig';
import ErrorBoundary from '../ErrorBoundary';

interface OnboardingProps {
  isOpen: boolean;
  onClose: () => void;
}

const Onboarding: React.FC<OnboardingProps> = ({ isOpen, onClose }) => {
  const prefersReducedMotion = useReducedMotion();
  const { transition } = useAnimationConfig();
  const fadeVariants = createFadeVariants(Boolean(prefersReducedMotion));

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      document.body.style.paddingRight = '15px';
    } else {
      document.body.style.overflow = '';
      document.body.style.paddingRight = '';
    }
    return () => {
      document.body.style.overflow = '';
      document.body.style.paddingRight = '';
    };
  }, [isOpen]);

  return (
    <ErrorBoundary>
      <AnimatePresence mode="wait">
        {isOpen && (
          <>
            <motion.div
              key="backdrop"
              variants={fadeVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              transition={transition}
              className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50"
              onClick={onClose}
            />

            <motion.div
              key="modal"
              variants={fadeVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              transition={transition}
              className="fixed inset-0 z-50 flex items-center justify-center p-4"
            >
              <div className="relative w-full max-w-4xl bg-deep-brown-200/40 backdrop-blur-sm rounded-2xl border border-white/20 shadow-xl">
                <div className="max-h-[90vh] overflow-y-auto overflow-x-hidden p-6">
                  <FormProvider>
                    <OnboardingForm />
                  </FormProvider>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </ErrorBoundary>
  );
};

export default Onboarding;