import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useFormValidation } from '../../../hooks/form/useFormValidation';
import FormProgress from './FormProgress';
import StepContent from './StepContent';
import { OnboardingData, OnboardingStep } from '../../../types/onboarding';
import { saveOnboardingData } from '../../../services/onboarding';
import toast from 'react-hot-toast';

type FormSteps = Exclude<OnboardingStep, 'success'>;

const OnboardingForm: React.FC = () => {
  const [currentStep, setCurrentStep] = useState<OnboardingStep>('projectScope');
  const [formData, setFormData] = useState<OnboardingData>({
    projectScope: {
      categories: [],
      description: '',
      techStack: []
    },
    businessGoals: {
      goals: [],
      targetAudience: '',
      successCriteria: '',
      competitors: ''
    },
    technicalSpecs: {
      platforms: {
        web: false,
        ios: false,
        android: false,
        desktop: false
      },
      integrations: [],
      security: {
        compliance: [],
        authentication: [],
        dataProtection: []
      },
      scale: {
        users: 0,
        storage: 0,
        bandwidth: 0
      }
    },
    contactInfo: {
      name: '',
      email: '',
      company: '',
      phone: '',
      preferredContact: 'email'
    }
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { validateStep, errors } = useFormValidation();

  const handleNext = async () => {
    if (currentStep === 'success') return;
    
    const step = currentStep as FormSteps;
    if (validateStep(step, formData)) {
      switch (step) {
        case 'projectScope':
          setCurrentStep('businessGoals');
          break;
        case 'businessGoals':
          setCurrentStep('technicalSpecs');
          break;
        case 'technicalSpecs':
          setCurrentStep('contactInfo');
          break;
        case 'contactInfo':
          await handleSubmit();
          break;
      }
    }
  };

  const handlePrevious = () => {
    if (currentStep === 'success') return;
    
    const step = currentStep as FormSteps;
    switch (step) {
      case 'businessGoals':
        setCurrentStep('projectScope');
        break;
      case 'technicalSpecs':
        setCurrentStep('businessGoals');
        break;
      case 'contactInfo':
        setCurrentStep('technicalSpecs');
        break;
    }
  };

  const handleSubmit = async () => {
    try {
      setIsSubmitting(true);
      const result = await saveOnboardingData(formData);
      if (result.success) {
        toast.success('Form submitted successfully!');
        setCurrentStep('success');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      toast.error('Failed to submit form. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const updateFormData = <T extends FormSteps>(step: T, data: Partial<OnboardingData[T]>) => {
    setFormData(prev => ({
      ...prev,
      [step]: {
        ...prev[step],
        ...data
      }
    }));
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <FormProgress currentStep={currentStep} />
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        className="mt-8"
      >
        {currentStep !== 'success' && (
          <StepContent
            currentStep={currentStep as FormSteps}
            formData={formData}
            updateFormData={updateFormData}
            errors={errors}
          />
        )}
        {currentStep === 'success' && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-12"
          >
            <h2 className="text-2xl font-bold text-green-500 mb-4">
              Thank you for your submission!
            </h2>
            <p className="text-gray-600">
              We'll review your project details and get back to you soon.
            </p>
          </motion.div>
        )}
      </motion.div>

      <motion.div
        className="mt-8 flex justify-between"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        {currentStep !== 'projectScope' && currentStep !== 'success' && (
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handlePrevious}
            className="px-6 py-2 bg-gray-500 text-white rounded-lg"
          >
            Previous
          </motion.button>
        )}

        {currentStep !== 'success' && (
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleNext}
            disabled={isSubmitting}
            className={`px-6 py-2 bg-blue-500 text-white rounded-lg ml-auto ${
              isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            {currentStep === 'contactInfo' ? (isSubmitting ? 'Submitting...' : 'Submit') : 'Next'}
          </motion.button>
        )}
      </motion.div>
    </div>
  );
};

export default OnboardingForm;