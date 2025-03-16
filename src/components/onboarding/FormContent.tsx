import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { OnboardingData, OnboardingStep } from '../../types/onboarding';
import {
  ProjectScopeStep,
  BusinessGoalsStep,
  TechnicalSpecsStep,
  ContactInfoStep,
  SuccessStep
} from './steps';
import { slideVariants } from './animations';

interface FormContentProps {
  currentStep: OnboardingStep;
  formData: OnboardingData;
  updateFormData: (step: OnboardingStep, updates: Partial<OnboardingData[keyof OnboardingData]>) => void;
  errors: Record<string, string[]>;
  onNext: () => void;
}

const FormContent: React.FC<FormContentProps> = ({
  currentStep,
  formData,
  updateFormData,
  errors,
  onNext
}) => {
  const renderStep = () => {
    switch (currentStep) {
      case 'projectScope':
        return (
          <ProjectScopeStep
            data={formData.projectScope}
            updateData={(updates) => updateFormData('projectScope', updates)}
            errors={errors}
            onNext={onNext}
          />
        );
      case 'businessGoals':
        return (
          <BusinessGoalsStep
            data={formData.businessGoals}
            updateData={(updates) => updateFormData('businessGoals', updates)}
            errors={errors}
            onNext={onNext}
          />
        );
      case 'technicalSpecs':
        return (
          <TechnicalSpecsStep
            data={formData.technicalSpecs}
            updateData={(updates) => updateFormData('technicalSpecs', updates)}
            errors={errors}
            onNext={onNext}
          />
        );
      case 'contactInfo':
        return (
          <ContactInfoStep
            data={formData.contactInfo}
            updateData={(updates) => updateFormData('contactInfo', updates)}
            errors={errors}
            onNext={onNext}
          />
        );
      case 'success':
        return <SuccessStep />;
      default:
        return null;
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentStep}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          className="w-full"
        >
          {renderStep()}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default FormContent;