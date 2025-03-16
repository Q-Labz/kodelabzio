import React from 'react';
import type { OnboardingData, ProjectScope, BusinessRequirements, TechnicalSpecs } from '../../../types/onboarding';
import { WelcomeStep, ProjectScopeStep, BusinessRequirementsStep, TechnicalSpecsStep } from './components';

interface StepProps {
  data: OnboardingData;
  onChange: (data: Partial<OnboardingData>) => void;
  onNext?: () => void;
  errors: Record<string, string>;
}

export const renderStep = (step: number, props: StepProps): React.ReactNode => {
  switch (step) {
    case 1:
      return <WelcomeStep onNext={props.onNext ?? (() => {})} />;
    case 2:
      return (
        <ProjectScopeStep
          data={props.data.projectScope}
          onChange={(value: Partial<ProjectScope>) => props.onChange({
            projectScope: {
              ...props.data.projectScope,
              ...value
            }
          })}
          errors={props.errors}
        />
      );
    case 3:
      return (
        <BusinessRequirementsStep
          data={props.data.businessRequirements}
          onChange={(value: Partial<BusinessRequirements>) => props.onChange({
            businessRequirements: {
              ...props.data.businessRequirements,
              ...value
            }
          })}
          errors={props.errors}
        />
      );
    case 4:
      return (
        <TechnicalSpecsStep
          data={props.data.technicalSpecs}
          onChange={(value: Partial<TechnicalSpecs>) => props.onChange({
            technicalSpecs: {
              ...props.data.technicalSpecs,
              ...value
            }
          })}
          errors={props.errors}
        />
      );
    default:
      return null;
  }
};