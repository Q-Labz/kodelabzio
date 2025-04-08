import { OnboardingData } from '../types/onboarding';

export const saveOnboardingData = async (data: OnboardingData) => {
  try {
    const response = await fetch('http://localhost:3001/api/onboarding', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error('Failed to save onboarding data');
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error('Error saving onboarding data:', error);
    throw error;
  }
};
