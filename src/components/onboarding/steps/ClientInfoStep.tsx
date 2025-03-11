import React from 'react';
import { motion } from 'framer-motion';
import type { ClientInfo } from '../../../types/onboarding';

interface ClientInfoStepProps {
  data: ClientInfo;
  onChange: (data: ClientInfo) => void;
  errors: Record<string, string>;
}

const ClientInfoStep: React.FC<ClientInfoStepProps> = ({ data, onChange, errors }) => {
  const handleChange = (field: keyof ClientInfo, value: string) => {
    onChange({ ...data, [field]: value });
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="space-y-6"
    >
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold mb-2">Client Information</h2>
        <p className="text-gray-400">Tell us about yourself and your company</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
            Full Name *
          </label>
          <input
            type="text"
            id="name"
            value={data.name}
            onChange={(e) => handleChange('name', e.target.value)}
            className={`w-full bg-deep-brown-200/40 border ${
              errors.name ? 'border-red-500' : 'border-white/10'
            } rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-accent/50`}
            placeholder="John Doe"
          />
          {errors.name && (
            <p className="mt-1 text-sm text-red-500">{errors.name}</p>
          )}
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
            Email Address *
          </label>
          <input
            type="email"
            id="email"
            value={data.email}
            onChange={(e) => handleChange('email', e.target.value)}
            className={`w-full bg-deep-brown-200/40 border ${
              errors.email ? 'border-red-500' : 'border-white/10'
            } rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-accent/50`}
            placeholder="john@example.com"
          />
          {errors.email && (
            <p className="mt-1 text-sm text-red-500">{errors.email}</p>
          )}
        </div>

        <div>
          <label htmlFor="company" className="block text-sm font-medium text-gray-300 mb-2">
            Company Name *
          </label>
          <input
            type="text"
            id="company"
            value={data.company}
            onChange={(e) => handleChange('company', e.target.value)}
            className={`w-full bg-deep-brown-200/40 border ${
              errors.company ? 'border-red-500' : 'border-white/10'
            } rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-accent/50`}
            placeholder="Company Inc."
          />
          {errors.company && (
            <p className="mt-1 text-sm text-red-500">{errors.company}</p>
          )}
        </div>

        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-gray-300 mb-2">
            Phone Number *
          </label>
          <input
            type="tel"
            id="phone"
            value={data.phone}
            onChange={(e) => handleChange('phone', e.target.value)}
            className={`w-full bg-deep-brown-200/40 border ${
              errors.phone ? 'border-red-500' : 'border-white/10'
            } rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-accent/50`}
            placeholder="+1 (555) 000-0000"
          />
          {errors.phone && (
            <p className="mt-1 text-sm text-red-500">{errors.phone}</p>
          )}
        </div>

        <div>
          <label htmlFor="industry" className="block text-sm font-medium text-gray-300 mb-2">
            Industry *
          </label>
          <select
            id="industry"
            value={data.industry}
            onChange={(e) => handleChange('industry', e.target.value)}
            className={`w-full bg-deep-brown-200/40 border ${
              errors.industry ? 'border-red-500' : 'border-white/10'
            } rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-accent/50`}
          >
            <option value="">Select Industry</option>
            <option value="technology">Technology</option>
            <option value="healthcare">Healthcare</option>
            <option value="finance">Finance</option>
            <option value="education">Education</option>
            <option value="retail">Retail</option>
            <option value="manufacturing">Manufacturing</option>
            <option value="other">Other</option>
          </select>
          {errors.industry && (
            <p className="mt-1 text-sm text-red-500">{errors.industry}</p>
          )}
        </div>

        <div>
          <label htmlFor="projectName" className="block text-sm font-medium text-gray-300 mb-2">
            Project Name *
          </label>
          <input
            type="text"
            id="projectName"
            value={data.projectName}
            onChange={(e) => handleChange('projectName', e.target.value)}
            className={`w-full bg-deep-brown-200/40 border ${
              errors.projectName ? 'border-red-500' : 'border-white/10'
            } rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-accent/50`}
            placeholder="My Awesome Project"
          />
          {errors.projectName && (
            <p className="mt-1 text-sm text-red-500">{errors.projectName}</p>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default ClientInfoStep;