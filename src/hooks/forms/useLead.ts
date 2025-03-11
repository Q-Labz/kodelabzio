import { useState, useCallback } from 'react';
import { z } from 'zod';

const leadSchema = z.object({
  fullName: z.string().min(2, 'Full name is required'),
  email: z.string().email('Invalid email address'),
  companyName: z.string().min(2, 'Company name is required'),
  phone: z.string().min(10, 'Valid phone number is required'),
  budgetRange: z.string().min(1, 'Budget range is required'),
  timeline: z.string().min(1, 'Timeline is required'),
  description: z.string().min(10, 'Description must be at least 10 characters').max(150, 'Description cannot exceed 150 characters'),
  consent: z.boolean().refine(val => val === true, 'You must agree to the privacy policy')
});

interface LeadFormData {
  fullName: string;
  email: string;
  companyName: string;
  phone: string;
  budgetRange: string;
  timeline: string;
  description: string;
  consent: boolean;
}

const initialFormData: LeadFormData = {
  fullName: '',
  email: '',
  companyName: '',
  phone: '',
  budgetRange: '',
  timeline: '',
  description: '',
  consent: false
};

export const useLead = (onSuccess?: () => void) => {
  const [formData, setFormData] = useState<LeadFormData>(initialFormData);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }));
  }, []);

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      leadSchema.parse(formData);
      setErrors({});
      setIsSubmitting(true);

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      console.log('Lead submitted:', formData);
      
      setFormData(initialFormData);
      onSuccess?.();
    } catch (error) {
      if (error instanceof z.ZodError) {
        const newErrors: Record<string, string> = {};
        error.errors.forEach((err) => {
          newErrors[err.path[0]] = err.message;
        });
        setErrors(newErrors);
      }
    } finally {
      setIsSubmitting(false);
    }
  }, [formData, onSuccess]);

  return {
    formData,
    errors,
    isSubmitting,
    handleChange,
    handleSubmit
  };
};