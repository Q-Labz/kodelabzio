import { useState, useCallback } from 'react';
import { validateProjectIntakeForm } from '../../utils/validation/projectIntakeForm';
import type { ProjectIntakeFormData } from '../../types/forms';

const initialFormData: ProjectIntakeFormData = {
  basicInfo: {
    projectName: '',
    companyName: '',
    contactName: '',
    contactRole: '',
    contactEmail: '',
    contactPhone: '',
    preferredContact: 'email',
    startDate: null,
    endDate: null
  },
  overview: {
    objective: '',
    targetAudience: '',
    deliverables: [],
    budgetRange: '',
    existingMaterials: []
  },
  technical: {
    platforms: [],
    integrations: [],
    security: [],
    performance: '',
    responsive: true
  },
  design: {
    brandGuidelines: null,
    colorPreferences: '',
    designExamples: [],
    keyFeatures: [],
    userFlows: []
  },
  success: {
    criteria: [],
    kpis: [],
    outcomes: [],
    supportNeeds: '',
    additionalNotes: ''
  }
};

export const useProjectIntakeForm = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<ProjectIntakeFormData>(initialFormData);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const updateField = useCallback((section: keyof ProjectIntakeFormData, field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }));
  }, []);

  const handleNext = useCallback(() => {
    const validationErrors = validateProjectIntakeForm(formData, currentStep);
    if (Object.keys(validationErrors).length === 0) {
      setCurrentStep(prev => Math.min(prev + 1, 5));
      setErrors({});
    } else {
      setErrors(validationErrors);
    }
  }, [currentStep, formData]);

  const handlePrevious = useCallback(() => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
    setErrors({});
  }, []);

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    
    const validationErrors = validateProjectIntakeForm(formData, currentStep);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsSubmitting(true);
    try {
      // Submit form data to your API
      await new Promise(resolve => setTimeout(resolve, 1500));
      console.log('Form submitted:', formData);
      
      // Reset form
      setFormData(initialFormData);
      setCurrentStep(1);
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setIsSubmitting(false);
    }
  }, [currentStep, formData]);

  return {
    currentStep,
    formData,
    errors,
    isSubmitting,
    updateField,
    handleNext,
    handlePrevious,
    handleSubmit
  };
};