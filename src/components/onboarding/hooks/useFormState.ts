import { useCallback, useReducer } from 'react';
import type { OnboardingData } from '../../../types/onboarding';

type FormAction =
  | { type: 'NEXT_STEP' }
  | { type: 'PREVIOUS_STEP' }
  | { type: 'UPDATE_FIELD'; field: keyof OnboardingData; value: any }
  | { type: 'SET_SUBMITTING'; value: boolean }
  | { type: 'SET_SUCCESS'; value: boolean }
  | { type: 'RESET_FORM' };

interface FormState {
  currentStep: number;
  direction: number;
  formData: OnboardingData;
  isSubmitting: boolean;
  isSuccess: boolean;
}

const initialFormData: OnboardingData = {
  clientInfo: {
    name: '',
    email: '',
    company: '',
    phone: '',
    industry: '',
    projectName: ''
  },
  designPreferences: {
    style: '',
    colorScheme: '',
    inspiration: [],
    brandGuidelines: null
  },
  technicalRequirements: {
    platform: [],
    features: [],
    integrations: [],
    security: []
  },
  projectScope: {
    timeline: '',
    budget: '',
    team: '',
    milestones: []
  }
};

const initialState: FormState = {
  currentStep: 1,
  direction: 0,
  formData: initialFormData,
  isSubmitting: false,
  isSuccess: false
};

function formReducer(state: FormState, action: FormAction): FormState {
  switch (action.type) {
    case 'NEXT_STEP':
      return {
        ...state,
        currentStep: Math.min(state.currentStep + 1, 6),
        direction: 1
      };
    case 'PREVIOUS_STEP':
      return {
        ...state,
        currentStep: Math.max(state.currentStep - 1, 1),
        direction: -1
      };
    case 'UPDATE_FIELD':
      return {
        ...state,
        formData: {
          ...state.formData,
          [action.field]: action.value
        }
      };
    case 'SET_SUBMITTING':
      return {
        ...state,
        isSubmitting: action.value
      };
    case 'SET_SUCCESS':
      return {
        ...state,
        isSuccess: action.value
      };
    case 'RESET_FORM':
      return initialState;
    default:
      return state;
  }
}

export const useFormState = () => {
  const [state, dispatch] = useReducer(formReducer, initialState);

  const handleNext = useCallback(() => {
    dispatch({ type: 'NEXT_STEP' });
  }, []);

  const handlePrevious = useCallback(() => {
    dispatch({ type: 'PREVIOUS_STEP' });
  }, []);

  const updateFormData = useCallback((field: keyof OnboardingData, value: any) => {
    dispatch({ type: 'UPDATE_FIELD', field, value });
  }, []);

  const setIsSubmitting = useCallback((value: boolean) => {
    dispatch({ type: 'SET_SUBMITTING', value });
  }, []);

  const setIsSuccess = useCallback((value: boolean) => {
    dispatch({ type: 'SET_SUCCESS', value });
  }, []);

  const resetForm = useCallback(() => {
    dispatch({ type: 'RESET_FORM' });
  }, []);

  return {
    ...state,
    handleNext,
    handlePrevious,
    updateFormData,
    setIsSubmitting,
    setIsSuccess,
    resetForm
  };
};