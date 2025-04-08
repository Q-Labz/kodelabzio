import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { OnboardingData } from '../../../types/onboarding';
import { createSlideVariants } from './animations/variants';
import ProjectScopeStep from './steps/ProjectScopeStep';
import BusinessGoalsStep from './steps/BusinessGoalsStep';
import TechnicalSpecsStep from './steps/TechnicalSpecsStep';
import ContactInfoStep from './steps/ContactInfoStep';

interface StepContentProps {
  currentStep: keyof OnboardingData;
  formData: OnboardingData;
  updateFormData: <T extends keyof OnboardingData>(
    step: T,
    data: Partial<OnboardingData[T]>
  ) => void;
  errors: Record<string, string>;
  onNext: () => void;
}

const StepContent: React.FC<StepContentProps> = ({
  currentStep,
  formData,
  updateFormData,
  errors,
  onNext
}) => {
  const slideDirection = React.useRef(0);
  const variants = React.useMemo(
    () => createSlideVariants(slideDirection.current),
    [slideDirection.current]
  );

  const renderStep = () => {
    switch (currentStep) {
      case 'projectScope':
        return (
          <ProjectScopeStep
            data={formData.projectScope}
            updateData={(data: Partial<OnboardingData['projectScope']>) => 
              updateFormData('projectScope', data)
            }
            errors={errors}
            onNext={onNext}
          />
        );
      case 'businessGoals':
        return (
          <BusinessGoalsStep
            data={formData.businessGoals}
            updateData={(data: Partial<OnboardingData['businessGoals']>) =>
              updateFormData('businessGoals', data)
            }
            errors={errors}
            onNext={onNext}
          />
        );
      case 'technicalSpecs':
        return (
          <TechnicalSpecsStep
            data={formData.technicalSpecs}
            updateData={(data: Partial<OnboardingData['technicalSpecs']>) =>
              updateFormData('technicalSpecs', data)
            }
            errors={errors}
            onNext={onNext}
          />
        );
      case 'contactInfo':
        return (
          <ContactInfoStep
            data={formData.contactInfo}
            updateData={(data: Partial<OnboardingData['contactInfo']>) =>
              updateFormData('contactInfo', data)
            }
            errors={errors}
            onNext={onNext}
          />
        );
      default:
        return null;
    }
  };

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={currentStep}
        custom={slideDirection.current}
        variants={variants}
        initial="enter"
        animate="center"
        exit="exit"
        className="w-full"
      >
        {renderStep()}
      </motion.div>
    </AnimatePresence>
  );
};

export default StepContent;
