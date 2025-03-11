import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Check } from 'lucide-react';
import { useAnimationConfig } from '../hooks/useAnimationConfig';
import { StepIndicator } from './StepIndicator';
import { StepConnector } from './StepConnector';
import { StepLabel } from './StepLabel';
import type { Step } from './types';

interface ProgressIndicatorProps {
  steps: Step[];
  currentStep: number;
}

const ProgressIndicator: React.FC<ProgressIndicatorProps> = ({ steps, currentStep }) => {
  const prefersReducedMotion = useReducedMotion();
  const { transition } = useAnimationConfig();

  return (
    <div className="mb-8">
      <div className="flex justify-between">
        {steps.map((step) => (
          <motion.div
            key={step.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{
              ...transition,
              delay: step.id * 0.1
            }}
            className="flex items-center"
          >
            <StepIndicator
              step={step}
              currentStep={currentStep}
              transition={transition}
            >
              {currentStep > step.id ? (
                <Check className="w-5 h-5" />
              ) : (
                <span>{step.id}</span>
              )}
            </StepIndicator>

            <StepLabel step={step} />

            {step.id < steps.length && (
              <StepConnector
                isCompleted={currentStep > step.id}
                transition={transition}
              />
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default ProgressIndicator;