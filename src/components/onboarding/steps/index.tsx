import React from 'react';
import type { OnboardingData } from '../../../types/onboarding';
import WelcomeStep from './WelcomeStep';
import ClientInfoStep from './ClientInfoStep';
import DesignPreferencesStep from './DesignPreferencesStep';
import TechnicalRequirementsStep from './TechnicalRequirementsStep';
import ProjectScopeStep from './ProjectScopeStep';
import SummaryStep from './SummaryStep';

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
        <ClientInfoStep
          data={data.clientInfo}
          onChange={(value) => onChange('clientInfo', value)}
          errors={errors}
        />
      );
    case 3:
      return (
        <DesignPreferencesStep
          data={data.designPreferences}
          onChange={(value) => onChange('designPreferences', value)}
          errors={errors}
        />
      );
    case 4:
      return (
        <TechnicalRequirementsStep
          data={data.technicalRequirements}
          onChange={(value) => onChange('technicalRequirements', value)}
          errors={errors}
        />
      );
    case 5:
      return (
        <ProjectScopeStep
          data={data.projectScope}
          onChange={(value) => onChange('projectScope', value)}
          errors={errors}
        />
      );
    case 6:
      return (
        <SummaryStep
          data={data}
          onSubmit={() => {}}
        />
      );
    default:
      return null;
  }
};