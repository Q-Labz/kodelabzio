import React from 'react';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';

interface FormProgressProps {
  currentStep: number;
}

const steps = [
  { title: 'Basic Information', description: 'Contact and company details' },
  { title: 'Project Overview', description: 'Goals and deliverables' },
  { title: 'Technical Requirements', description: 'Platform and integrations' },
  { title: 'Design Preferences', description: 'Visual and UX requirements' },
  { title: 'Success Metrics', description: 'KPIs and outcomes' }
];

const FormProgress: React.FC<FormProgressProps> = ({ currentStep }) => {
  return (
    <div className="flex justify-between">
      {steps.map((step, index) => (
        <div key={step.title} className="flex items-center">
          <motion.div
            animate={{
              scale: currentStep >= index + 1 ? [0.8, 1] : 1,
              backgroundColor: currentStep >= index + 1 ? 'rgb(255, 107, 53)' : 'rgb(55, 65, 81)'
            }}
            className="flex items-center justify-center w-8 h-8 rounded-full"
          >
            {currentStep > index + 1 ? (
              <Check className="w-5 h-5" />
            ) : (
              <span>{index + 1}</span>
            )}
          </motion.div>
          <div className="ml-3 hidden sm:block">
            <p className="text-sm font-medium">{step.title}</p>
            <p className="text-xs text-gray-400">{step.description}</p>
          </div>
          {index < steps.length - 1 && (
            <motion.div
              animate={{
                backgroundColor: currentStep > index + 1 ? 'rgb(255, 107, 53)' : 'rgb(55, 65, 81)'
              }}
              className="w-12 h-px mx-2"
            />
          )}
        </div>
      ))}
    </div>
  );
};

export default FormProgress;