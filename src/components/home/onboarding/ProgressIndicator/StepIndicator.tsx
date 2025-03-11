import React from 'react';
import { motion } from 'framer-motion';

interface StepIndicatorProps {
  step: { id: number };
  currentStep: number;
  transition: any;
  children: React.ReactNode;
}

export const StepIndicator: React.FC<StepIndicatorProps> = ({
  step,
  currentStep,
  transition,
  children
}) => {
  return (
    <motion.div
      animate={{
        scale: currentStep >= step.id ? [0.8, 1] : 1,
        backgroundColor: currentStep >= step.id ? 'rgb(255, 107, 53)' : 'rgb(55, 65, 81)'
      }}
      transition={transition}
      className="flex items-center justify-center w-8 h-8 rounded-full"
    >
      {children}
    </motion.div>
  );
};