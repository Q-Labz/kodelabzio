import React from 'react';
import { motion } from 'framer-motion';
import { Target, Plus, X } from 'lucide-react';
import type { BusinessGoals } from '../../../../types/onboarding';
import Button from '../../../ui/Button';

interface BusinessGoalsStepProps {
  data: BusinessGoals;
  updateData: (data: Partial<BusinessGoals>) => void;
  errors: Record<string, string>;
  onNext: () => void;
}

const BusinessGoalsStep: React.FC<BusinessGoalsStepProps> = ({ data, updateData, errors, onNext }) => {
  const handleAddGoal = () => {
    updateData({
      goals: [...(data.goals || []), '']
    });
  };

  const handleUpdateGoal = (index: number, value: string) => {
    const newGoals = [...(data.goals || [])];
    newGoals[index] = value;
    updateData({ goals: newGoals });
  };

  const handleRemoveGoal = (index: number) => {
    const newGoals = (data.goals || []).filter((_, i) => i !== index);
    updateData({ goals: newGoals });
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="space-y-6"
    >
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold mb-2">Business Goals</h2>
        <p className="text-gray-400">Define your project objectives and success criteria</p>
      </div>

      <div className="space-y-8">
        <div>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Target className="w-5 h-5 text-accent" />
              <h3 className="text-lg font-semibold">Project Goals *</h3>
            </div>
            <Button 
              type="button"
              onClick={handleAddGoal}
              size="sm"
              className="gap-1 text-sm text-accent hover:text-accent/80 transition-colors"
            >
              <Plus className="w-4 h-4" />
              Add Goal
            </Button>
          </div>
          <div className="space-y-3">
            {(data.goals || []).map((goal, index) => (
              <div key={index} className="flex gap-2">
                <input
                  type="text"
                  value={goal}
                  onChange={(e) => handleUpdateGoal(index, e.target.value)}
                  placeholder={`Goal ${index + 1}`}
                  className="flex-1 bg-deep-brown-200/40 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-accent/50"
                />
                <Button 
                  type="button"
                  onClick={() => handleRemoveGoal(index)}
                  size="sm"
                  className="p-3 text-gray-400 hover:text-red-500 transition-colors"
                >
                  <X className="w-5 h-5" />
                </Button>
              </div>
            ))}
          </div>
          {errors['businessGoals.goals'] && (
            <p className="mt-1 text-sm text-red-500">{errors['businessGoals.goals']}</p>
          )}
        </div>

        <div>
          <label htmlFor="targetAudience" className="block text-sm font-medium text-gray-300 mb-2">
            Target Audience *
          </label>
          <textarea
            id="targetAudience"
            value={data.targetAudience}
            onChange={(e) => updateData({ targetAudience: e.target.value })}
            rows={3}
            className={`w-full bg-deep-brown-200/40 border ${
              errors['businessGoals.targetAudience'] ? 'border-red-500' : 'border-white/10'
            } rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-accent/50`}
            placeholder="Describe your target audience and their needs..."
          />
          {errors['businessGoals.targetAudience'] && (
            <p className="mt-1 text-sm text-red-500">{errors['businessGoals.targetAudience']}</p>
          )}
        </div>

        <div>
          <label htmlFor="successCriteria" className="block text-sm font-medium text-gray-300 mb-2">
            Success Criteria *
          </label>
          <textarea
            id="successCriteria"
            value={data.successCriteria}
            onChange={(e) => updateData({ successCriteria: e.target.value })}
            rows={3}
            className={`w-full bg-deep-brown-200/40 border ${
              errors['businessGoals.successCriteria'] ? 'border-red-500' : 'border-white/10'
            } rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-accent/50`}
            placeholder="Define how you'll measure project success..."
          />
          {errors['businessGoals.successCriteria'] && (
            <p className="mt-1 text-sm text-red-500">{errors['businessGoals.successCriteria']}</p>
          )}
        </div>
        
        <Button 
          type="button"
          onClick={onNext}
          size="lg"
          className="w-full mt-6"
        >
          Next Step
        </Button>
      </div>
    </motion.div>
  );
};

export default BusinessGoalsStep;