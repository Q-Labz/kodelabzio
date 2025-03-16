import React from 'react';
import { BusinessRequirements } from '../../../types/onboarding';

interface BusinessRequirementsStepProps {
  data: BusinessRequirements;
  onChange: (value: Partial<BusinessRequirements>) => void;
  errors: Record<string, string>;
}

const BusinessRequirementsStep: React.FC<BusinessRequirementsStepProps> = ({
  data,
  onChange,
  errors
}) => {
  const handleGoalChange = (index: number, value: string) => {
    const newGoals = [...data.goals];
    newGoals[index] = {
      ...newGoals[index],
      text: value
    };
    onChange({
      goals: newGoals
    });
  };

  const handleTargetAudienceChange = (field: keyof BusinessRequirements['targetAudience'], value: string[]) => {
    onChange({
      targetAudience: {
        ...data.targetAudience,
        [field]: value
      }
    });
  };

  const handleCompetitorChange = (index: number, field: keyof BusinessRequirements['competitors'][0], value: string | string[]) => {
    const newCompetitors = [...data.competitors];
    newCompetitors[index] = {
      ...newCompetitors[index],
      [field]: field === 'name' ? value : Array.isArray(value) ? value : [value]
    };
    onChange({
      competitors: newCompetitors
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-4">Business Requirements</h2>
        <p className="text-gray-400 mb-8">Help us understand your business goals and target audience</p>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Project Goals
          </label>
          {data.goals.map((goal, index) => (
            <div key={goal.id} className="space-y-1">
              <div className="flex gap-4 mb-2">
                <input
                  type="text"
                  value={goal.text}
                  onChange={(e) => handleGoalChange(index, e.target.value)}
                  className={`w-full bg-deep-brown-200/40 border rounded-lg px-4 py-3 text-white ${
                    errors[`goals.${index}.text`] ? 'border-red-500' : 'border-white/10'
                  }`}
                  placeholder="Enter project goal"
                />
              </div>
              {errors[`goals.${index}.text`] && (
                <p className="text-red-500 text-sm">{errors[`goals.${index}.text`]}</p>
              )}
            </div>
          ))}
          <button
            type="button"
            onClick={() => onChange({
              goals: [...data.goals, { id: String(Date.now()), text: '', priority: data.goals.length + 1 }]
            })}
            className="text-accent hover:text-accent/80 text-sm mt-2"
          >
            + Add Goal
          </button>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Target Audience Demographics
          </label>
          <div className="space-y-1">
            <input
              type="text"
              value={data.targetAudience.demographics.join(', ')}
              onChange={(e) => handleTargetAudienceChange('demographics', e.target.value.split(',').map(s => s.trim()))}
              className={`w-full bg-deep-brown-200/40 border rounded-lg px-4 py-3 text-white ${
                errors['targetAudience.demographics'] ? 'border-red-500' : 'border-white/10'
              }`}
              placeholder="Enter demographics (comma-separated)"
            />
            {errors['targetAudience.demographics'] && (
              <p className="text-red-500 text-sm">{errors['targetAudience.demographics']}</p>
            )}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Target Audience Behaviors
          </label>
          <div className="space-y-1">
            <input
              type="text"
              value={data.targetAudience.behaviors.join(', ')}
              onChange={(e) => handleTargetAudienceChange('behaviors', e.target.value.split(',').map(s => s.trim()))}
              className={`w-full bg-deep-brown-200/40 border rounded-lg px-4 py-3 text-white ${
                errors['targetAudience.behaviors'] ? 'border-red-500' : 'border-white/10'
              }`}
              placeholder="Enter behaviors (comma-separated)"
            />
            {errors['targetAudience.behaviors'] && (
              <p className="text-red-500 text-sm">{errors['targetAudience.behaviors']}</p>
            )}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Target Audience Needs
          </label>
          <div className="space-y-1">
            <input
              type="text"
              value={data.targetAudience.needs.join(', ')}
              onChange={(e) => handleTargetAudienceChange('needs', e.target.value.split(',').map(s => s.trim()))}
              className={`w-full bg-deep-brown-200/40 border rounded-lg px-4 py-3 text-white ${
                errors['targetAudience.needs'] ? 'border-red-500' : 'border-white/10'
              }`}
              placeholder="Enter needs (comma-separated)"
            />
            {errors['targetAudience.needs'] && (
              <p className="text-red-500 text-sm">{errors['targetAudience.needs']}</p>
            )}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Success Metrics
          </label>
          <div className="space-y-1">
            <input
              type="text"
              value={data.successMetrics.join(', ')}
              onChange={(e) => onChange({
                successMetrics: e.target.value.split(',').map(s => s.trim())
              })}
              className={`w-full bg-deep-brown-200/40 border rounded-lg px-4 py-3 text-white ${
                errors['successMetrics'] ? 'border-red-500' : 'border-white/10'
              }`}
              placeholder="Enter success metrics (comma-separated)"
            />
            {errors['successMetrics'] && (
              <p className="text-red-500 text-sm">{errors['successMetrics']}</p>
            )}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Competitors
          </label>
          {data.competitors.map((competitor, index) => (
            <div key={index} className="space-y-2 mb-4">
              <div className="flex gap-4">
                <input
                  type="text"
                  value={competitor.name}
                  onChange={(e) => handleCompetitorChange(index, 'name', e.target.value)}
                  className={`w-full bg-deep-brown-200/40 border rounded-lg px-4 py-3 text-white ${
                    errors[`competitors.${index}.name`] ? 'border-red-500' : 'border-white/10'
                  }`}
                  placeholder="Competitor name"
                />
              </div>
              <div className="space-y-1">
                <input
                  type="text"
                  value={competitor.strengths.join(', ')}
                  onChange={(e) => handleCompetitorChange(index, 'strengths', e.target.value.split(',').map(s => s.trim()))}
                  className={`w-full bg-deep-brown-200/40 border rounded-lg px-4 py-3 text-white ${
                    errors[`competitors.${index}.strengths`] ? 'border-red-500' : 'border-white/10'
                  }`}
                  placeholder="Competitor strengths (comma-separated)"
                />
                {errors[`competitors.${index}.strengths`] && (
                  <p className="text-red-500 text-sm">{errors[`competitors.${index}.strengths`]}</p>
                )}
              </div>
              <div className="space-y-1">
                <input
                  type="text"
                  value={competitor.weaknesses.join(', ')}
                  onChange={(e) => handleCompetitorChange(index, 'weaknesses', e.target.value.split(',').map(s => s.trim()))}
                  className={`w-full bg-deep-brown-200/40 border rounded-lg px-4 py-3 text-white ${
                    errors[`competitors.${index}.weaknesses`] ? 'border-red-500' : 'border-white/10'
                  }`}
                  placeholder="Competitor weaknesses (comma-separated)"
                />
                {errors[`competitors.${index}.weaknesses`] && (
                  <p className="text-red-500 text-sm">{errors[`competitors.${index}.weaknesses`]}</p>
                )}
              </div>
            </div>
          ))}
          <button
            type="button"
            onClick={() => onChange({
              competitors: [...data.competitors, { name: '', strengths: [], weaknesses: [] }]
            })}
            className="text-accent hover:text-accent/80 text-sm mt-2"
          >
            + Add Competitor
          </button>
        </div>
      </div>
    </div>
  );
};

export default BusinessRequirementsStep;
