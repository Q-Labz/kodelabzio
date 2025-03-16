import React from 'react';
import { motion } from 'framer-motion';
import { ProjectScope } from '../../../types/onboarding';
import { MultiSelect, TextArea } from '../../common/form';

interface ProjectScopeStepProps {
  data: ProjectScope;
  updateData: (updates: Partial<ProjectScope>) => void;
  errors: Record<string, string[]>;
  onNext: () => void;
}

const ProjectScopeStep: React.FC<ProjectScopeStepProps> = ({
  data,
  updateData,
  errors,
  onNext
}) => {
  const categories = [
    'Web Development',
    'Mobile App',
    'Desktop Application',
    'Cloud Infrastructure',
    'DevOps',
    'AI/ML',
    'Data Analytics',
    'Security',
    'Other'
  ];

  const techStacks = [
    'React',
    'Next.js',
    'Node.js',
    'Python',
    'Django',
    'FastAPI',
    'PostgreSQL',
    'MongoDB',
    'AWS',
    'Azure',
    'GCP',
    'Docker',
    'Kubernetes',
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
        <h2 className="text-2xl font-bold mb-4">Project Scope</h2>
        <p className="text-gray-400 mb-8">
          Tell us about your project's requirements and technical needs.
        </p>
      </div>

      <div className="space-y-6">
        <MultiSelect
          label="Project Categories"
          options={categories}
          value={data.categories}
          onChange={(value) => updateData({ categories: value })}
          error={errors.categories?.[0]}
          placeholder="Select project categories"
        />

        <TextArea
          label="Project Description"
          value={data.description}
          onChange={(value) => updateData({ description: value })}
          error={errors.description?.[0]}
          placeholder="Describe your project in detail"
          rows={4}
        />

        <MultiSelect
          label="Tech Stack"
          options={techStacks}
          value={data.techStack}
          onChange={(value) => updateData({ techStack: value })}
          error={errors.techStack?.[0]}
          placeholder="Select preferred technologies"
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

export default ProjectScopeStep;