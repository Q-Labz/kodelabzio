import React from 'react';
import { Check } from 'lucide-react';

const SuccessMessage: React.FC = () => {
  return (
    <div className="text-center py-12">
      <div className="flex justify-center mb-4">
        <div className="w-16 h-16 bg-accent/20 rounded-full flex items-center justify-center">
          <Check className="w-8 h-8 text-accent" />
        </div>
      </div>
      <h3 className="text-2xl font-bold mb-2">Project Submitted!</h3>
      <p className="text-gray-400">
        We'll review your project details and get back to you within 24 hours.
      </p>
    </div>
  );
};

export default SuccessMessage;