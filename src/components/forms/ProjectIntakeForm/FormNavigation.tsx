import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import Button from '../../ui/Button';

interface FormNavigationProps {
  currentStep: number;
  isSubmitting: boolean;
  onPrevious: () => void;
  onNext: () => void;
}

const FormNavigation: React.FC<FormNavigationProps> = ({
  currentStep,
  isSubmitting,
  onPrevious,
  onNext
}) => {
  return (
    <div className="flex justify-between mt-8">
      {currentStep > 1 && (
        <Button
          variant="outline"
          onClick={onPrevious}
          disabled={isSubmitting}
          className="group"
        >
          <ArrowLeft className="w-5 h-5 mr-2 transform group-hover:-translate-x-1 transition-transform" />
          Previous
        </Button>
      )}
      
      <div className="ml-auto">
        <Button
          type={currentStep === 5 ? 'submit' : 'button'}
          onClick={currentStep < 5 ? onNext : undefined}
          disabled={isSubmitting}
          className="group"
        >
          {currentStep === 5 ? (
            isSubmitting ? (
              <>
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />
                Submitting...
              </>
            ) : (
              'Submit'
            )
          ) : (
            <>
              Next
              <ArrowRight className="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform" />
            </>
          )}
        </Button>
      </div>
    </div>
  );
};

export default FormNavigation;