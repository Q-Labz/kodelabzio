import type { OnboardingData } from '../types/onboarding';

const API_URL = import.meta.env.VITE_API_URL;

export interface ApiResponse<T = any> {
  data?: T;
  error?: string;
}

// Generic API call handler
async function apiCall<T>(
  endpoint: string,
  method: string = 'GET',
  data?: any
): Promise<ApiResponse<T>> {
  try {
    const response = await fetch(`${API_URL}${endpoint}`, {
      method,
      headers: {
        'Content-Type': 'application/json',
      },
      body: data ? JSON.stringify(data) : undefined,
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.error || 'An error occurred');
    }

    return { data: result };
  } catch (error) {
    console.error('API Error:', error);
    return { error: error instanceof Error ? error.message : 'An error occurred' };
  }
}

// Form submission functions
export const submitContactForm = async (data: {
  email: string;
  name: string;
  company: string;
  phone: string;
  message: string;
}) => {
  return apiCall('/leads', 'POST', data);
};

export const submitProjectInquiry = async (data: {
  companyName: string;
  industry: string;
  contactEmail: string;
  contactPhone: string;
  preferredContact: string;
  projectDescription: string;
  budgetMin: number;
  budgetMax: number;
  targetDate: string;
  techStack: string[];
}) => {
  return apiCall('/project-inquiries', 'POST', data);
};

export const submitOnboardingData = async (data: OnboardingData) => {
  return apiCall('/onboarding', 'POST', data);
};

export const updateOnboardingData = async (id: string, data: OnboardingData) => {
  return apiCall(`/onboarding/${id}`, 'PUT', data);
};
