import React from 'react';
import type { OnboardingData } from '../../../../types/onboarding';
import WelcomeStep from './WelcomeStep';
import ProjectScopeStep from './ProjectScopeStep';
import BudgetTimelineStep from './BudgetTimelineStep';
import BusinessGoalsStep from './BusinessGoalsStep';
import ContactInfoStep from './ContactInfoStep';

interface RenderStepProps {
  step: number;
  data: OnboardingData;
  onChange: (field: keyof OnboardingData, value: any) => void;
  onNext: () => void;
  errors: Record<string, string>;
}

export const renderStep = ({ step, data, onChange, onNext, errors }: RenderStepProps) => {
  switch (step) {
    case 1:
      return <WelcomeStep onNext={onNext} />;
    case 2:
      return (
        <ProjectScopeStep
          data={data.projectScope}
          onChange={(value) => onChange('projectScope', value)}
          errors={errors}
        />
      );
    case 3:
      return (
        <BudgetTimelineStep
          data={data.budgetTimeline}
          onChange={(value) => onChange('budgetTimeline', value)}
          errors={errors}
        />
      );
    case 4:
      return (
        <BusinessGoalsStep
          data={data.businessGoals}
          onChange={(value) => onChange('businessGoals', value)}
          errors={errors}
        />
      );
    case 5:
      return (
        <ContactInfoStep
          data={data.contactInfo}
          onChange={(value) => onChange('contactInfo', value)}
          errors={errors}
        />
      );
    default:
      return null;
  }
};