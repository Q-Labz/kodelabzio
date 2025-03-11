import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, Shield, Database, Cloud } from 'lucide-react';
import type { TechnicalRequirements } from '../../../types/onboarding';

interface TechnicalRequirementsStepProps {
  data: TechnicalRequirements;
  onChange: (data: TechnicalRequirements) => void;
  errors: Record<string, string>;
}

const TechnicalRequirementsStep: React.FC<TechnicalRequirementsStepProps> = ({
  data,
  onChange,
  errors
}) => {
  const handleArrayChange = (field: keyof TechnicalRequirements, value: string) => {
    const currentValues = data[field];
    const newValues = currentValues.includes(value)
      ? currentValues.filter((v) => v !== value)
      : [...currentValues, value];
    onChange({ ...data, [field]: newValues });
  };

  const platforms = [
    { value: 'web', label: 'Web Application' },
    { value: 'mobile', label: 'Mobile App' },
    { value: 'desktop', label: 'Desktop Application' },
    { value: 'hybrid', label: 'Hybrid Solution' }
  ];

  const features = [
    { value: 'auth', label: 'User Authentication' },
    { value: 'payments', label: 'Payment Processing' },
    { value: 'realtime', label: 'Real-time Features' },
    { value: 'analytics', label: 'Analytics Dashboard' },
    { value: 'cms', label: 'Content Management' },
    { value: 'search', label: 'Search Functionality' },
    { value: 'notifications', label: 'Push Notifications' },
    { value: 'offline', label: 'Offline Support' }
  ];

  const integrations = [
    { value: 'stripe', label: 'Stripe Payments' },
    { value: 'aws', label: 'AWS Services' },
    { value: 'google', label: 'Google Services' },
    { value: 'social', label: 'Social Media' },
    { value: 'crm', label: 'CRM Systems' },
    { value: 'email', label: 'Email Services' }
  ];

  const security = [
    { value: 'ssl', label: 'SSL/TLS Encryption' },
    { value: '2fa', label: 'Two-Factor Authentication' },
    { value: 'audit', label: 'Security Auditing' },
    { value: 'backup', label: 'Automated Backups' },
    { value: 'ddos', label: 'DDoS Protection' },
    { value: 'compliance', label: 'Compliance (GDPR, HIPAA)' }
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="space-y-6"
    >
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold mb-2">Technical Requirements</h2>
        <p className="text-gray-400">Select the technical specifications for your project</p>
      </div>

      <div className="space-y-8">
        <div>
          <div className="flex items-center gap-2 mb-4">
            <Cloud className="w-5 h-5 text-accent" />
            <h3 className="text-lg font-semibold">Platform *</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {platforms.map((platform) => (
              <label
                key={platform.value}
                className={`flex items-center gap-3 p-4 rounded-lg border cursor-pointer transition-colors ${
                  data.platform.includes(platform.value)
                    ? 'border-accent bg-accent/10'
                    : 'border-white/10 hover:border-accent/50'
                }`}
              >
                <input
                  type="checkbox"
                  checked={data.platform.includes(platform.value)}
                  onChange={() => handleArrayChange('platform', platform.value)}
                  className="hidden"
                />
                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                  data.platform.includes(platform.value)
                    ? 'border-accent bg-accent'
                    : 'border-white/30'
                }`}>
                  {data.platform.includes(platform.value) && (
                    <CheckCircle2 className="w-4 h-4 text-white" />
                  )}
                </div>
                <span>{platform.label}</span>
              </label>
            ))}
          </div>
          {errors.platform && (
            <p className="mt-1 text-sm text-red-500">{errors.platform}</p>
          )}
        </div>

        <div>
          <div className="flex items-center gap-2 mb-4">
            <Database className="w-5 h-5 text-accent" />
            <h3 className="text-lg font-semibold">Core Features *</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {features.map((feature) => (
              <label
                key={feature.value}
                className={`flex items-center gap-3 p-4 rounded-lg border cursor-pointer transition-colors ${
                  data.features.includes(feature.value)
                    ? 'border-accent bg-accent/10'
                    : 'border-white/10 hover:border-accent/50'
                }`}
              >
                <input
                  type="checkbox"
                  checked={data.features.includes(feature.value)}
                  onChange={() => handleArrayChange('features', feature.value)}
                  className="hidden"
                />
                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                  data.features.includes(feature.value)
                    ? 'border-accent bg-accent'
                    : 'border-white/30'
                }`}>
                  {data.features.includes(feature.value) && (
                    <CheckCircle2 className="w-4 h-4 text-white" />
                  )}
                </div>
                <span>{feature.label}</span>
              </label>
            ))}
          </div>
          {errors.features && (
            <p className="mt-1 text-sm text-red-500">{errors.features}</p>
          )}
        </div>

        <div>
          <div className="flex items-center gap-2 mb-4">
            <Cloud className="w-5 h-5 text-accent" />
            <h3 className="text-lg font-semibold">Third-party Integrations</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {integrations.map((integration) => (
              <label
                key={integration.value}
                className={`flex items-center gap-3 p-4 rounded-lg border cursor-pointer transition-colors ${
                  data.integrations.includes(integration.value)
                    ? 'border-accent bg-accent/10'
                    : 'border-white/10 hover:border-accent/50'
                }`}
              >
                <input
                  type="checkbox"
                  checked={data.integrations.includes(integration.value)}
                  onChange={() => handleArrayChange('integrations', integration.value)}
                  className="hidden"
                />
                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                  data.integrations.includes(integration.value)
                    ? 'border-accent bg-accent'
                    : 'border-white/30'
                }`}>
                  {data.integrations.includes(integration.value) && (
                    <CheckCircle2 className="w-4 h-4 text-white" />
                  )}
                </div>
                <span>{integration.label}</span>
              </label>
            ))}
          </div>
        </div>

        <div>
          <div className="flex items-center gap-2 mb-4">
            <Shield className="w-5 h-5 text-accent" />
            <h3 className="text-lg font-semibold">Security Requirements</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {security.map((item) => (
              <label
                key={item.value}
                className={`flex items-center gap-3 p-4 rounded-lg border cursor-pointer transition-colors ${
                  data.security.includes(item.value)
                    ? 'border-accent bg-accent/10'
                    : 'border-white/10 hover:border-accent/50'
                }`}
              >
                <input
                  type="checkbox"
                  checked={data.security.includes(item.value)}
                  onChange={() => handleArrayChange('security', item.value)}
                  className="hidden"
                />
                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                  data.security.includes(item.value)
                    ? 'border-accent bg-accent'
                    : 'border-white/30'
                }`}>
                  {data.security.includes(item.value) && (
                    <CheckCircle2 className="w-4 h-4 text-white" />
                  )}
                </div>
                <span>{item.label}</span>
              </label>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default TechnicalRequirementsStep;