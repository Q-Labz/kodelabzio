import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, DollarSign, Users, Target } from 'lucide-react';
import { budgetRanges, timelineOptions } from './config';
import type { BudgetTimeline } from '../../../../types/onboarding';

interface BudgetTimelineStepProps {
  data: BudgetTimeline;
  onChange: (data: BudgetTimeline) => void;
  errors: Record<string, string>;
}

const BudgetTimelineStep: React.FC<BudgetTimelineStepProps> = ({ data, onChange, errors }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="space-y-6"
    >
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold mb-2">Budget & Timeline</h2>
        <p className="text-gray-400">Help us understand your project constraints</p>
      </div>

      <div className="space-y-8">
        <div>
          <label className="flex items-center gap-2 text-sm font-medium text-gray-300 mb-2">
            <DollarSign className="w-5 h-5 text-accent" />
            Budget Range *
          </label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {budgetRanges.map((range) => (
              <label
                key={range.value}
                className={`flex items-center gap-3 p-4 rounded-lg border cursor-pointer transition-colors ${
                  data.budget === range.value
                    ? 'border-accent bg-accent/10'
                    : 'border-white/10 hover:border-accent/50'
                }`}
              >
                <input
                  type="radio"
                  name="budget"
                  value={range.value}
                  checked={data.budget === range.value}
                  onChange={(e) => onChange({ ...data, budget: e.target.value })}
                  className="hidden"
                />
                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                  data.budget === range.value
                    ? 'border-accent bg-accent'
                    : 'border-white/30'
                }`}>
                  {data.budget === range.value && (
                    <div className="w-2.5 h-2.5 bg-white rounded-full" />
                  )}
                </div>
                <span>{range.label}</span>
              </label>
            ))}
          </div>
          {errors.budget && (
            <p className="mt-1 text-sm text-red-500">{errors.budget}</p>
          )}
        </div>

        <div>
          <label className="flex items-center gap-2 text-sm font-medium text-gray-300 mb-2">
            <Calendar className="w-5 h-5 text-accent" />
            Preferred Timeline *
          </label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {timelineOptions.map((option) => (
              <label
                key={option.value}
                className={`flex items-center gap-3 p-4 rounded-lg border cursor-pointer transition-colors ${
                  data.timeline === option.value
                    ? 'border-accent bg-accent/10'
                    : 'border-white/10 hover:border-accent/50'
                }`}
              >
                <input
                  type="radio"
                  name="timeline"
                  value={option.value}
                  checked={data.timeline === option.value}
                  onChange={(e) => onChange({ ...data, timeline: e.target.value })}
                  className="hidden"
                />
                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                  data.timeline === option.value
                    ? 'border-accent bg-accent'
                    : 'border-white/30'
                }`}>
                  {data.timeline === option.value && (
                    <div className="w-2.5 h-2.5 bg-white rounded-full" />
                  )}
                </div>
                <span>{option.label}</span>
              </label>
            ))}
          </div>
          {errors.timeline && (
            <p className="mt-1 text-sm text-red-500">{errors.timeline}</p>
          )}
        </div>

        <div>
          <label htmlFor="teamSize" className="flex items-center gap-2 text-sm font-medium text-gray-300 mb-2">
            <Users className="w-5 h-5 text-accent" />
            Team Size Requirement *
          </label>
          <select
            id="teamSize"
            value={data.teamSize}
            onChange={(e) => onChange({ ...data, teamSize: e.target.value })}
            className={`w-full bg-deep-brown-200/40 border ${
              errors.teamSize ? 'border-red-500' : 'border-white/10'
            } rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-accent/50`}
          >
            <option value="">Select Team Size</option>
            <option value="1-2">1-2 developers</option>
            <option value="3-5">3-5 developers</option>
            <option value="6-10">6-10 developers</option>
            <option value="10+">10+ developers</option>
          </select>
          {errors.teamSize && (
            <p className="mt-1 text-sm text-red-500">{errors.teamSize}</p>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default BudgetTimelineStep;