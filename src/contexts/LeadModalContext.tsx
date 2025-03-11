import React, { createContext, useContext, useState, useCallback } from 'react';
import LeadCaptureModal from '../components/forms/LeadCaptureForm/LeadCaptureModal';

interface LeadModalContextType {
  openModal: () => void;
  closeModal: () => void;
}

const LeadModalContext = createContext<LeadModalContextType | null>(null);

export const LeadModalProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = useCallback(() => {
    setIsOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setIsOpen(false);
  }, []);

  return (
    <LeadModalContext.Provider value={{ openModal, closeModal }}>
      {children}
      <LeadCaptureModal isOpen={isOpen} onClose={closeModal} />
    </LeadModalContext.Provider>
  );
};

export const useLeadModal = () => {
  const context = useContext(LeadModalContext);
  if (!context) {
    throw new Error('useLeadModal must be used within a LeadModalProvider');
  }
  return context;
};