import React from 'react';
import { motion } from 'framer-motion';
import { useProjectIntakeForm } from '../../../hooks/forms/useProjectIntakeForm';
import BasicInformation from './steps/BasicInformation';
import ProjectOverview from './steps/ProjectOverview';
import TechnicalRequirements from './steps/TechnicalRequirements';
import DesignPreferences from './steps/DesignPreferences';
import SuccessMetrics from './steps/SuccessMetrics';
import FormProgress from './FormProgress';
import FormNavigation from './FormNavigation';

const ProjectIntakeForm: React.FC = () => {
  const {
    currentStep,
    formData,
    errors,
    isSubmitting,
    handlePrevious,
    handleNext,
    handleSubmit,
    updateField
  } = useProjectIntakeForm();

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <BasicInformation data={formData.basicInfo} onChange={updateField} errors={errors} />;
      case 2:
        return <ProjectOverview data={formData.overview} onChange={updateField} errors={errors} />;
      case 3:
        return <TechnicalRequirements data={formData.technical} onChange={updateField} errors={errors} />;
      case 4:
        return <DesignPreferences data={formData.design} onChange={updateField} errors={errors} />;
      case 5:
        return <SuccessMetrics data={formData.success} onChange={updateField} errors={errors} />;
      default:
        return null;
    }
  };

  return (
    <motion.form
      onSubmit={handleSubmit}
      className="max-w-4xl mx-auto"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <FormProgress currentStep={currentStep} />
      
      <div className="mt-8 bg-deep-brown-200/40 backdrop-blur-sm p-8 rounded-xl border border-white/20">
        {renderStep()}
      </div>

      <FormNavigation
        currentStep={currentStep}
        isSubmitting={isSubmitting}
        onPrevious={handlePrevious}
        onNext={handleNext}
      />
    </motion.form>
  );
};

export default ProjectIntakeForm;