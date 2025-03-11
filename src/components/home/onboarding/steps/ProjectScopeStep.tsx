import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, Code2, Database, Cloud } from 'lucide-react';
import type { ProjectScope } from '../../../../types/onboarding';

interface ProjectScopeStepProps {
  data: ProjectScope;
  onChange: (data: ProjectScope) => void;
  errors: Record<string, string>;
}

const ProjectScopeStep: React.FC<ProjectScopeStepProps> = ({ data, onChange, errors }) => {
  const handleArrayChange = (field: keyof ProjectScope, value: string) => {
    const currentValues = data[field] || [];
    const newValues = currentValues.includes(value)
      ? currentValues.filter((v) => v !== value)
      : [...currentValues, value];
    onChange({ ...data, [field]: newValues });
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
        <p className="text-gray-400">Define your project requirements and specifications</p>
      </div>

      <div className="space-y-8">
        <div>
          <div className="flex items-center gap-2 mb-4">
            <Code2 className="w-5 h-5 text-accent" />
            <h3 className="text-lg font-semibold">Project Type</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              'Website Development',
              'Web Application',
              'E-commerce',
              'CMS Integration',
              'API Development',
              'Database Design'
            ].map((type) => (
              <label
                key={type}
                className={`flex items-center gap-3 p-4 rounded-lg border cursor-pointer transition-colors ${
                  data.categories?.includes(type)
                    ? 'border-accent bg-accent/10'
                    : 'border-white/10 hover:border-accent/50'
                }`}
              >
                <input
                  type="checkbox"
                  checked={data.categories?.includes(type)}
                  onChange={() => handleArrayChange('categories', type)}
                  className="hidden"
                />
                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                  data.categories?.includes(type)
                    ? 'border-accent bg-accent'
                    : 'border-white/30'
                }`}>
                  {data.categories?.includes(type) && (
                    <CheckCircle2 className="w-4 h-4 text-white" />
                  )}
                </div>
                <span>{type}</span>
              </label>
            ))}
          </div>
          {errors.categories && (
            <p className="mt-1 text-sm text-red-500">{errors.categories}</p>
          )}
        </div>

        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-300 mb-2">
            Project Description *
          </label>
          <textarea
            id="description"
            value={data.description}
            onChange={(e) => onChange({ ...data, description: e.target.value })}
            rows={4}
            className={`w-full bg-deep-brown-200/40 border ${
              errors.description ? 'border-red-500' : 'border-white/10'
            } rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-accent/50`}
            placeholder="Describe your project requirements and goals..."
          />
          {errors.description && (
            <p className="mt-1 text-sm text-red-500">{errors.description}</p>
          )}
        </div>

        <div>
          <div className="flex items-center gap-2 mb-4">
            <Database className="w-5 h-5 text-accent" />
            <h3 className="text-lg font-semibold">Tech Stack Preferences</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              'React', 'Vue.js', 'Angular',
              'Node.js', 'Python', 'PHP',
              'MongoDB', 'PostgreSQL', 'MySQL'
            ].map((tech) => (
              <label
                key={tech}
                className={`flex items-center gap-3 p-4 rounded-lg border cursor-pointer transition-colors ${
                  data.techStack?.includes(tech)
                    ? 'border-accent bg-accent/10'
                    : 'border-white/10 hover:border-accent/50'
                }`}
              >
                <input
                  type="checkbox"
                  checked={data.techStack?.includes(tech)}
                  onChange={() => handleArrayChange('techStack', tech)}
                  className="hidden"
                />
                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                  data.techStack?.includes(tech)
                    ? 'border-accent bg-accent'
                    : 'border-white/30'
                }`}>
                  {data.techStack?.includes(tech) && (
                    <CheckCircle2 className="w-4 h-4 text-white" />
                  )}
                </div>
                <span>{tech}</span>
              </label>
            ))}
          </div>
          {errors.techStack && (
            <p className="mt-1 text-sm text-red-500">{errors.techStack}</p>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectScopeStep;