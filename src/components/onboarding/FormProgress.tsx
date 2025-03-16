import React from 'react';
import { motion } from 'framer-motion';

interface FormProgressProps {
  currentStep: number;
}

const steps = [
  {
    id: 1,
    title: 'Welcome',
    description: 'Choose your service'
  },
  {
    id: 2,
    title: 'Project Scope',
    description: 'Define requirements'
  },
  {
    id: 3,
    title: 'Business Requirements',
    description: 'Define objectives'
  },
  {
    id: 4,
    title: 'Technical Specs',
    description: 'Technical details'
  }
];

const FormProgress: React.FC<FormProgressProps> = ({ currentStep }) => {
  return (
    <div className="flex justify-between">
      {steps.map((step, index) => {
        const isCompleted = currentStep > step.id;
        const isActive = currentStep === step.id;
        const isLast = index === steps.length - 1;

        return (
          <div key={step.id} className="flex items-center">
            <motion.div
              className="flex items-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: index * 0.2 }}
            >
              <motion.div
                className={`flex items-center justify-center w-8 h-8 rounded-full ${
                  isCompleted || isActive ? 'bg-accent' : 'bg-gray-600'
                }`}
                whileHover={{ scale: 1.1 }}
              >
                {isCompleted ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-check w-5 h-5"
                  >
                    <path d="M20 6 9 17l-5-5" />
                  </svg>
                ) : (
                  <span>{step.id}</span>
                )}
              </motion.div>
              <div className="ml-3 hidden sm:block">
                <p className="text-sm font-medium">{step.title}</p>
                <p className="text-xs text-gray-400">{step.description}</p>
              </div>
            </motion.div>
            {!isLast && (
              <motion.div
                className={`w-12 h-px mx-2 ${
                  isCompleted ? 'bg-accent' : 'bg-gray-600'
                }`}
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: index * 0.2 }}
              />
            )}
          </div>
        );
      })}
    </div>
  );
};

export default FormProgress;
