import React from 'react';
import { motion } from 'framer-motion';

interface FormProgressProps {
  currentStep: number;
}

const steps = [
  { id: 1, label: 'Welcome' },
  { id: 2, label: 'Project Scope' },
  { id: 3, label: 'Business Requirements' },
  { id: 4, label: 'Technical Specs' }
];

export const FormProgress: React.FC<FormProgressProps> = ({ currentStep }) => {
  return (
    <div className="relative">
      {/* Progress Line */}
      <div className="absolute top-1/2 left-0 w-full h-0.5 bg-gray-200 -translate-y-1/2">
        <motion.div
          className="h-full bg-accent origin-left"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: (currentStep - 1) / (steps.length - 1) }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        />
      </div>

      {/* Step Indicators */}
      <div className="relative flex justify-between">
        {steps.map(({ id, label }) => {
          const isCompleted = currentStep > id;
          const isCurrent = currentStep === id;

          return (
            <div key={id} className="flex flex-col items-center">
              <motion.div
                className={`w-8 h-8 rounded-full flex items-center justify-center relative z-10 
                  ${isCompleted ? 'bg-accent' : isCurrent ? 'bg-accent' : 'bg-gray-200'}`}
                initial={false}
                animate={{
                  scale: isCurrent ? 1.2 : 1,
                  backgroundColor: isCompleted || isCurrent ? '#6366F1' : '#E5E7EB'
                }}
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
              >
                {isCompleted ? (
                  <motion.svg
                    className="w-4 h-4 text-white"
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polyline points="20 6 9 17 4 12" />
                  </motion.svg>
                ) : (
                  <span className={`text-sm font-medium ${isCompleted || isCurrent ? 'text-white' : 'text-gray-500'}`}>
                    {id}
                  </span>
                )}
              </motion.div>
              
              <motion.span
                className="mt-2 text-sm font-medium"
                initial={false}
                animate={{
                  color: isCurrent ? '#111827' : '#6B7280'
                }}
              >
                {label}
              </motion.span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
