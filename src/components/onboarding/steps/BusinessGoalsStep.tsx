import React from 'react';
import { motion } from 'framer-motion';
import { BusinessGoals } from '../../../types/onboarding';
import { MultiSelect, TextArea } from '../../common/form';

interface BusinessGoalsStepProps {
  data: BusinessGoals;
  updateData: (updates: Partial<BusinessGoals>) => void;
  errors: Record<string, string[]>;
  onNext: () => void;
}

const BusinessGoalsStep: React.FC<BusinessGoalsStepProps> = ({
  data,
  updateData,
  errors,
  onNext
}) => {
  const goals = [
    'Increase Revenue',
    'Improve User Experience',
    'Expand Market Reach',
    'Optimize Operations',
    'Enhance Security',
    'Reduce Costs',
    'Scale Infrastructure',
    'Other'
  ];

  return (
    <motion.div
      className="space-y-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 30
      }}
    >
      <div>
        <h2 className="text-2xl font-bold mb-4">Business Goals</h2>
        <p className="text-gray-400 mb-8">
          Define your business objectives and target audience.
        </p>
      </div>

      <div className="space-y-6">
        <MultiSelect
          label="Business Goals"
          options={goals}
          value={data.goals}
          onChange={(value) => updateData({ goals: value })}
          error={errors.goals?.[0]}
          placeholder="Select your business goals"
        />

        <TextArea
          label="Target Audience"
          value={data.targetAudience}
          onChange={(value) => updateData({ targetAudience: value })}
          error={errors.targetAudience?.[0]}
          placeholder="Describe your target audience"
          rows={3}
        />

        <TextArea
          label="Success Criteria"
          value={data.successCriteria}
          onChange={(value) => updateData({ successCriteria: value })}
          error={errors.successCriteria?.[0]}
          placeholder="Define your success criteria"
          rows={3}
        />

        <TextArea
          label="Competitors"
          value={data.competitors || ''}
          onChange={(value) => updateData({ competitors: value })}
          error={errors.competitors?.[0]}
          placeholder="List your main competitors"
          rows={3}
        />

        <motion.button
          type="button"
          onClick={onNext}
          className="w-full px-6 py-3 bg-accent text-white rounded-lg font-medium hover:bg-accent/80 transition-colors"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          Next Step
        </motion.button>
      </div>
    </motion.div>
  );
};

export default BusinessGoalsStep;
