import React, { createContext, useContext, useState, useCallback } from 'react';

interface ContactFormContextType {
  isModalOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
}

const ContactFormContext = createContext<ContactFormContextType | null>(null);

export const ContactFormProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = useCallback(() => {
    setIsModalOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setIsModalOpen(false);
  }, []);

  return (
    <ContactFormContext.Provider value={{ isModalOpen, openModal, closeModal }}>
      {children}
    </ContactFormContext.Provider>
  );
};

export const useContactForm = () => {
  const context = useContext(ContactFormContext);
  if (!context) {
    throw new Error('useContactForm must be used within a ContactFormProvider');
  }
  return context;
};