import React from 'react';
import { motion } from 'framer-motion';
import { TechnicalSpecs } from '../../../types/onboarding';
import { MultiSelect } from '../../common/form';

interface TechnicalSpecsStepProps {
  data: TechnicalSpecs;
  updateData: (updates: Partial<TechnicalSpecs>) => void;
  errors: Record<string, string[]>;
  onNext: () => void;
}

const TechnicalSpecsStep: React.FC<TechnicalSpecsStepProps> = ({
  data,
  updateData,
  errors,
  onNext
}) => {
  const integrations = [
    'Payment Gateway',
    'Authentication Service',
    'Email Service',
    'Analytics',
    'CRM',
    'ERP',
    'Third-party APIs',
    'Other'
  ];

  const securityOptions = {
    compliance: [
      'GDPR',
      'HIPAA',
      'SOC2',
      'ISO 27001',
      'PCI DSS',
      'CCPA',
      'Other'
    ],
    authentication: [
      'OAuth',
      'JWT',
      'SSO',
      'MFA',
      'Biometric',
      'Other'
    ],
    dataProtection: [
      'Encryption at Rest',
      'Encryption in Transit',
      'Data Backup',
      'Disaster Recovery',
      'Access Control',
      'Other'
    ]
  };

  const handlePlatformChange = (platform: keyof typeof data.platforms) => {
    updateData({
      platforms: {
        ...data.platforms,
        [platform]: !data.platforms[platform]
      }
    });
  };

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
        <h2 className="text-2xl font-bold mb-4">Technical Specifications</h2>
        <p className="text-gray-400 mb-8">
          Define the technical requirements and infrastructure needs.
        </p>
      </div>

      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Platforms
          </label>
          <div className="grid grid-cols-2 gap-4">
            {Object.entries(data.platforms).map(([platform, enabled]) => (
              <motion.button
                key={platform}
                type="button"
                onClick={() => handlePlatformChange(platform as keyof typeof data.platforms)}
                className={`px-4 py-3 rounded-lg text-left ${
                  enabled
                    ? 'bg-accent text-white'
                    : 'bg-deep-brown-200/40 text-gray-400'
                }`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {platform.charAt(0).toUpperCase() + platform.slice(1)}
              </motion.button>
            ))}
          </div>
          {errors.platforms?.[0] && (
            <p className="mt-1 text-sm text-red-500">{errors.platforms[0]}</p>
          )}
        </div>

        <MultiSelect
          label="Integrations"
          options={integrations}
          value={data.integrations}
          onChange={(value) => updateData({ integrations: value })}
          error={errors.integrations?.[0]}
          placeholder="Select required integrations"
        />

        <div className="space-y-4">
          <h3 className="text-lg font-medium text-gray-300">Security Requirements</h3>
          
          <MultiSelect
            label="Compliance Standards"
            options={securityOptions.compliance}
            value={data.security.compliance}
            onChange={(value) => updateData({
              security: { ...data.security, compliance: value }
            })}
            error={errors['security.compliance']?.[0]}
            placeholder="Select compliance requirements"
          />

          <MultiSelect
            label="Authentication Methods"
            options={securityOptions.authentication}
            value={data.security.authentication}
            onChange={(value) => updateData({
              security: { ...data.security, authentication: value }
            })}
            error={errors['security.authentication']?.[0]}
            placeholder="Select authentication methods"
          />

          <MultiSelect
            label="Data Protection"
            options={securityOptions.dataProtection}
            value={data.security.dataProtection}
            onChange={(value) => updateData({
              security: { ...data.security, dataProtection: value }
            })}
            error={errors['security.dataProtection']?.[0]}
            placeholder="Select data protection measures"
          />
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-medium text-gray-300">Scale Requirements</h3>
          
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Expected Users
            </label>
            <input
              type="number"
              value={data.scale.users}
              onChange={(e) => updateData({
                scale: { ...data.scale, users: parseInt(e.target.value) || 0 }
              })}
              className="w-full bg-deep-brown-200/40 border border-white/10 rounded-lg px-4 py-3 text-white"
              placeholder="Number of expected users"
            />
            {errors['scale.users']?.[0] && (
              <p className="mt-1 text-sm text-red-500">{errors['scale.users'][0]}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Storage Requirements (GB)
            </label>
            <input
              type="number"
              value={data.scale.storage}
              onChange={(e) => updateData({
                scale: { ...data.scale, storage: parseInt(e.target.value) || 0 }
              })}
              className="w-full bg-deep-brown-200/40 border border-white/10 rounded-lg px-4 py-3 text-white"
              placeholder="Storage in GB"
            />
            {errors['scale.storage']?.[0] && (
              <p className="mt-1 text-sm text-red-500">{errors['scale.storage'][0]}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Bandwidth Requirements (GB/month)
            </label>
            <input
              type="number"
              value={data.scale.bandwidth}
              onChange={(e) => updateData({
                scale: { ...data.scale, bandwidth: parseInt(e.target.value) || 0 }
              })}
              className="w-full bg-deep-brown-200/40 border border-white/10 rounded-lg px-4 py-3 text-white"
              placeholder="Bandwidth in GB/month"
            />
            {errors['scale.bandwidth']?.[0] && (
              <p className="mt-1 text-sm text-red-500">{errors['scale.bandwidth'][0]}</p>
            )}
          </div>
        </div>

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

export default TechnicalSpecsStep;
