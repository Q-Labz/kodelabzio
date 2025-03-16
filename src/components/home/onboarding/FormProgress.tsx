import React from 'react';
import { motion } from 'framer-motion';
import { OnboardingStep } from '../../../types/onboarding';

interface FormProgressProps {
  currentStep: OnboardingStep;
}

const steps: { id: OnboardingStep; label: string }[] = [
  { id: 'projectScope', label: 'Project Scope' },
  { id: 'businessGoals', label: 'Business Goals' },
  { id: 'technicalSpecs', label: 'Technical Specs' },
  { id: 'contactInfo', label: 'Contact Info' }
];

const FormProgress: React.FC<FormProgressProps> = ({ currentStep }) => {
  const currentIndex = steps.findIndex(step => step.id === currentStep);

  return (
    <div className="relative">
      <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-deep-brown-200 -translate-y-1/2">
        <motion.div
          className="h-full bg-blue-500"
          initial={{ width: '0%' }}
          animate={{
            width: currentStep === 'success' ? '100%' : `${(currentIndex / (steps.length - 1)) * 100}%`
          }}
          transition={{ duration: 0.3 }}
        />
      </div>
      
      <div className="relative z-10 flex justify-between">
        {steps.map((step, index) => {
          const isCompleted = index < currentIndex || currentStep === 'success';
          const isCurrent = step.id === currentStep;
          
          return (
            <div key={step.id} className="flex flex-col items-center">
              <motion.div
                initial={false}
                animate={{ scale: isCurrent ? 1.2 : 1 }}
                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-medium mb-2 transition-colors duration-200 ${
                  isCompleted || isCurrent ? 'bg-blue-500' : 'bg-deep-brown-200'
                }`}
              >
                {isCompleted ? (
                  <motion.svg
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={3}
                      d="M5 13l4 4L19 7"
                    />
                  </motion.svg>
                ) : (
                  index + 1
                )}
              </motion.div>
              
              <span className={`text-sm font-medium transition-colors duration-200 ${
                isCurrent ? 'text-blue-500' : isCompleted ? 'text-deep-brown-100' : 'text-deep-brown-200'
              }`}>
                {step.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default FormProgress;
