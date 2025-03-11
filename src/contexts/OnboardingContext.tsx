import React, { createContext, useContext, useReducer, useCallback } from 'react';
import type { OnboardingData, OnboardingStep, ValidationError } from '../types/onboarding';
import { INITIAL_ONBOARDING_DATA } from '../constants/onboarding';

interface OnboardingState {
  data: OnboardingData;
  currentStep: OnboardingStep;
  errors: ValidationError[];
  isSubmitting: boolean;
  lastSaved: string | null;
}

type OnboardingAction =
  | { type: 'UPDATE_DATA'; payload: Partial<OnboardingData> }
  | { type: 'SET_STEP'; payload: OnboardingStep }
  | { type: 'SET_ERRORS'; payload: ValidationError[] }
  | { type: 'SET_SUBMITTING'; payload: boolean }
  | { type: 'SET_LAST_SAVED'; payload: string }
  | { type: 'RESET' };

const initialState: OnboardingState = {
  data: INITIAL_ONBOARDING_DATA,
  currentStep: 'clientInfo',
  errors: [],
  isSubmitting: false,
  lastSaved: null
};

const OnboardingContext = createContext<{
  state: OnboardingState;
  updateData: (data: Partial<OnboardingData>) => void;
  setStep: (step: OnboardingStep) => void;
  setErrors: (errors: ValidationError[]) => void;
  setSubmitting: (isSubmitting: boolean) => void;
  reset: () => void;
} | null>(null);

function onboardingReducer(state: OnboardingState, action: OnboardingAction): OnboardingState {
  switch (action.type) {
    case 'UPDATE_DATA':
      return {
        ...state,
        data: {
          ...state.data,
          ...action.payload,
          progress: calculateProgress({ ...state.data, ...action.payload })
        }
      };
    case 'SET_STEP':
      return {
        ...state,
        currentStep: action.payload,
        errors: []
      };
    case 'SET_ERRORS':
      return {
        ...state,
        errors: action.payload
      };
    case 'SET_SUBMITTING':
      return {
        ...state,
        isSubmitting: action.payload
      };
    case 'SET_LAST_SAVED':
      return {
        ...state,
        lastSaved: action.payload
      };
    case 'RESET':
      return initialState;
    default:
      return state;
  }
}

function calculateProgress(data: OnboardingData): number {
  // Implement progress calculation logic
  return 0;
}

export const OnboardingProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(onboardingReducer, initialState);

  const updateData = useCallback((data: Partial<OnboardingData>) => {
    dispatch({ type: 'UPDATE_DATA', payload: data });
  }, []);

  const setStep = useCallback((step: OnboardingStep) => {
    dispatch({ type: 'SET_STEP', payload: step });
  }, []);

  const setErrors = useCallback((errors: ValidationError[]) => {
    dispatch({ type: 'SET_ERRORS', payload: errors });
  }, []);

  const setSubmitting = useCallback((isSubmitting: boolean) => {
    dispatch({ type: 'SET_SUBMITTING', payload: isSubmitting });
  }, []);

  const reset = useCallback(() => {
    dispatch({ type: 'RESET' });
  }, []);

  return (
    <OnboardingContext.Provider
      value={{
        state,
        updateData,
        setStep,
        setErrors,
        setSubmitting,
        reset
      }}
    >
      {children}
    </OnboardingContext.Provider>
  );
};

export const useOnboarding = () => {
  const context = useContext(OnboardingContext);
  if (!context) {
    throw new Error('useOnboarding must be used within an OnboardingProvider');
  }
  return context;
};