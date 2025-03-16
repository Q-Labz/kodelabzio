import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { OnboardingData, OnboardingStep } from '../../types/onboarding';
import { useFormValidation } from '../../hooks/form/useFormValidation';

const initialData: OnboardingData = {
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
};

const FormValidationTest: React.FC = () => {
  const [currentStep, setCurrentStep] = useState<OnboardingStep>('projectScope');
  const [formData, setFormData] = useState<OnboardingData>(initialData);
  const { validateStep, errors } = useFormValidation();

  const testValidation = (step: OnboardingStep) => {
    setCurrentStep(step);
    const isValid = validateStep(step, formData);
    console.log(`Step ${step} validation:`, { isValid, errors });

    // Test with some valid data
    const testData = { ...formData };
    switch (step) {
      case 'projectScope':
        testData.projectScope = {
          categories: ['Web Development'],
          description: 'A detailed project description that meets the minimum length requirement.',
          techStack: ['React', 'TypeScript']
        };
        break;
      case 'businessGoals':
        testData.businessGoals = {
          goals: ['Increase Revenue'],
          targetAudience: 'Small to medium-sized businesses in tech industry',
          successCriteria: 'Achieve 20% increase in user engagement',
          competitors: 'Company A, Company B'
        };
        break;
      case 'technicalSpecs':
        testData.technicalSpecs = {
          ...testData.technicalSpecs,
          platforms: { web: true, ios: false, android: false, desktop: false },
          integrations: ['Payment Gateway'],
          security: {
            compliance: ['GDPR'],
            authentication: ['OAuth'],
            dataProtection: ['Encryption at Rest']
          },
          scale: { users: 1000, storage: 100, bandwidth: 500 }
        };
        break;
      case 'contactInfo':
        testData.contactInfo = {
          name: 'John Doe',
          email: 'john@example.com',
          company: 'Tech Corp',
          phone: '1234567890',
          preferredContact: 'email'
        };
        break;
    }
    setFormData(testData);
    const validationResult = validateStep(step, testData);
    console.log(`Step ${step} validation with test data:`, { validationResult, errors });
  };

  const testAllSteps = () => {
    const steps: OnboardingStep[] = ['projectScope', 'businessGoals', 'technicalSpecs', 'contactInfo'];
    steps.forEach(step => {
      testValidation(step);
    });
  };

  return (
    <div className="p-6 space-y-6">
      <h2 className="text-2xl font-bold mb-4">Form Validation Test</h2>

      <div className="space-y-4">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => testValidation('projectScope')}
          className="w-full px-4 py-2 bg-blue-500 text-white rounded"
        >
          Test Project Scope Validation
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => testValidation('businessGoals')}
          className="w-full px-4 py-2 bg-green-500 text-white rounded"
        >
          Test Business Goals Validation
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => testValidation('technicalSpecs')}
          className="w-full px-4 py-2 bg-purple-500 text-white rounded"
        >
          Test Technical Specs Validation
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => testValidation('contactInfo')}
          className="w-full px-4 py-2 bg-orange-500 text-white rounded"
        >
          Test Contact Info Validation
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={testAllSteps}
          className="w-full px-4 py-2 bg-red-500 text-white rounded"
        >
          Test All Steps
        </motion.button>
      </div>

      <div className="mt-8">
        <h3 className="text-xl font-semibold mb-4">Current Step: {currentStep}</h3>
        <div className="bg-gray-800 p-4 rounded overflow-auto max-h-96">
          <pre className="text-sm text-white">
            {JSON.stringify(errors, null, 2)}
          </pre>
        </div>
      </div>
    </div>
  );
};

export default FormValidationTest;
