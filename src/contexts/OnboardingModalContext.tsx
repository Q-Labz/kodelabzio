import React, { createContext, useContext, useState, useCallback } from 'react';
import { OnboardingProvider } from './OnboardingContext';
import OnboardingModal from '../components/onboarding/OnboardingModal';

interface OnboardingModalContextType {
  isOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
}

const OnboardingModalContext = createContext<OnboardingModalContextType | null>(null);

export const OnboardingModalProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = useCallback(() => {
    setIsOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setIsOpen(false);
  }, []);

  return (
    <OnboardingModalContext.Provider value={{ isOpen, openModal, closeModal }}>
      <OnboardingProvider>
        {children}
        <OnboardingModal isOpen={isOpen} onClose={closeModal} />
      </OnboardingProvider>
    </OnboardingModalContext.Provider>
  );
};

export const useOnboardingModal = () => {
  const context = useContext(OnboardingModalContext);
  if (!context) {
    throw new Error('useOnboardingModal must be used within an OnboardingModalProvider');
  }
  return context;
};