import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, DollarSign, Users, Target, Plus, X } from 'lucide-react';
import type { ProjectScope } from '../../../types/onboarding';

interface ProjectScopeStepProps {
  data: ProjectScope;
  onChange: (data: ProjectScope) => void;
  errors: Record<string, string>;
}

const ProjectScopeStep: React.FC<ProjectScopeStepProps> = ({
  data,
  onChange,
  errors
}) => {
  const handleChange = (field: keyof ProjectScope, value: string) => {
    onChange({ ...data, [field]: value });
  };

  const handleAddMilestone = () => {
    onChange({
      ...data,
      milestones: [...data.milestones, '']
    });
  };

  const handleUpdateMilestone = (index: number, value: string) => {
    const newMilestones = [...data.milestones];
    newMilestones[index] = value;
    onChange({ ...data, milestones: newMilestones });
  };

  const handleRemoveMilestone = (index: number) => {
    const newMilestones = data.milestones.filter((_, i) => i !== index);
    onChange({ ...data, milestones: newMilestones });
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="space-y-6"
    >
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold mb-2">Project Scope</h2>
        <p className="text-gray-400">Define your project timeline and requirements</p>
      </div>

      <div className="space-y-6">
        <div>
          <label htmlFor="timeline" className="flex items-center gap-2 text-sm font-medium text-gray-300 mb-2">
            <Calendar className="w-5 h-5 text-accent" />
            Project Timeline *
          </label>
          <select
            id="timeline"
            value={data.timeline}
            onChange={(e) => handleChange('timeline', e.target.value)}
            className={`w-full bg-deep-brown-200/40 border ${
              errors.timeline ? 'border-red-500' : 'border-white/10'
            } rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-accent/50`}
          >
            <option value="">Select Timeline</option>
            <option value="1-2">1-2 months</option>
            <option value="3-4">3-4 months</option>
            <option value="5-6">5-6 months</option>
            <option value="6+">6+ months</option>
          </select>
          {errors.timeline && (
            <p className="mt-1 text-sm text-red-500">{errors.timeline}</p>
          )}
        </div>

        <div>
          <label htmlFor="budget" className="flex items-center gap-2 text-sm font-medium text-gray-300 mb-2">
            <DollarSign className="w-5 h-5 text-accent" />
            Budget Range *
          </label>
          <select
            id="budget"
            value={data.budget}
            onChange={(e) => handleChange('budget', e.target.value)}
            className={`w-full bg-deep-brown-200/40 border ${
              errors.budget ? 'border-red-500' : 'border-white/10'
            } rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-accent/50`}
          >
            <option value="">Select Budget Range</option>
            <option value="10-25k">$10,000 - $25,000</option>
            <option value="25-50k">$25,000 - $50,000</option>
            <option value="50-100k">$50,000 - $100,000</option>
            <option value="100k+">$100,000+</option>
          </select>
          {errors.budget && (
            <p className="mt-1 text-sm text-red-500">{errors.budget}</p>
          )}
        </div>

        <div>
          <label htmlFor="team" className="flex items-center gap-2 text-sm font-medium text-gray-300 mb-2">
            <Users className="w-5 h-5 text-accent" />
            Team Size *
          </label>
          <select
            id="team"
            value={data.team}
            onChange={(e) => handleChange('team', e.target.value)}
            className={`w-full bg-deep-brown-200/40 border ${
              errors.team ? 'border-red-500' : 'border-white/10'
            } rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-accent/50`}
          >
            <option value="">Select Team Size</option>
            <option value="1-2">1-2 people</option>
            <option value="3-5">3-5 people</option>
            <option value="6-10">6-10 people</option>
            <option value="10+">10+ people</option>
          </select>
          {errors.team && (
            <p className="mt-1 text-sm text-red-500">{errors.team}</p>
          )}
        </div>

        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="flex items-center gap-2 text-sm font-medium text-gray-300">
              <Target className="w-5 h-5 text-accent" />
              Project Milestones *
            </label>
            <button
              type="button"
              onClick={handleAddMilestone}
              className="flex items-center gap-1 text-sm text-accent hover:text-accent/80 transition-colors"
            >
              <Plus className="w-4 h-4" />
              Add Milestone
            </button>
          </div>
          <div className="space-y-3">
            {data.milestones.map((milestone, index) => (
              <div key={index} className="flex gap-2">
                <input
                  type="text"
                  value={milestone}
                  onChange={(e) => handleUpdateMilestone(index, e.target.value)}
                  placeholder={`Milestone ${index + 1}`}
                  className="flex-1 bg-deep-brown-200/40 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-accent/50"
                />
                <button
                  type="button"
                  onClick={() => handleRemoveMilestone(index)}
                  className="p-3 text-gray-400 hover:text-red-500 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            ))}
          </div>
          {errors.milestones && (
            <p className="mt-1 text-sm text-red-500">{errors.milestones}</p>
          )}
          {data.milestones.length === 0 && (
            <p className="mt-2 text-sm text-gray-400">
              Add at least one project milestone
            </p>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectScopeStep;