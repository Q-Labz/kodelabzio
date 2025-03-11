import React from 'react';
import type { Step } from './types';

interface StepLabelProps {
  step: Step;
}

export const StepLabel: React.FC<StepLabelProps> = ({ step }) => {
  return (
    <div className="ml-3 hidden sm:block">
      <p className="text-sm font-medium">{step.title}</p>
      <p className="text-xs text-gray-400">{step.description}</p>
    </div>
  );
};