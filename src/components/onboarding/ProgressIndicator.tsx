import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Check } from 'lucide-react';
import { createFadeVariants } from './animations/variants';
import { useAnimationConfig } from './hooks/useAnimationConfig';

interface Step {
  id: number;
  title: string;
  description: string;
}

interface ProgressIndicatorProps {
  steps: Step[];
  currentStep: number;
}

const ProgressIndicator: React.FC<ProgressIndicatorProps> = ({ steps, currentStep }) => {
  const prefersReducedMotion = useReducedMotion();
  const { transition } = useAnimationConfig();
  const fadeVariants = createFadeVariants(Boolean(prefersReducedMotion));

  return (
    <div className="mb-8">
      <div className="flex justify-between">
        {steps.map((step) => (
          <motion.div
            key={step.id}
            variants={fadeVariants}
            initial="hidden"
            animate="visible"
            transition={{
              ...transition,
              delay: step.id * 0.1
            }}
            className="flex items-center"
          >
            <motion.div
              animate={{
                scale: currentStep >= step.id ? [0.8, 1] : 1,
                backgroundColor: currentStep >= step.id ? 'rgb(255, 107, 53)' : 'rgb(55, 65, 81)'
              }}
              transition={transition}
              className="flex items-center justify-center w-8 h-8 rounded-full"
            >
              {currentStep > step.id ? (
                <Check className="w-5 h-5" />
              ) : (
                <span>{step.id}</span>
              )}
            </motion.div>
            <div className="ml-3 hidden sm:block">
              <p className="text-sm font-medium">{step.title}</p>
              <p className="text-xs text-gray-400">{step.description}</p>
            </div>
            {step.id < steps.length && (
              <motion.div
                animate={{
                  backgroundColor: currentStep > step.id ? 'rgb(255, 107, 53)' : 'rgb(55, 65, 81)'
                }}
                transition={transition}
                className="w-12 h-px mx-2"
              />
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default ProgressIndicator;