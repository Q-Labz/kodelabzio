import React from 'react';
import { motion } from 'framer-motion';
import { TechnicalSpecs } from '../../../../types/onboarding';
import MultiSelect from '../../../common/MultiSelect';
import Button from '../../../ui/Button';

interface TechnicalSpecsStepProps {
  data: TechnicalSpecs;
  updateData: (data: Partial<TechnicalSpecs>) => void;
  errors: Record<string, string>;
  onNext: () => void;
}

const platformOptions = [
  { label: 'Web', value: 'web' },
  { label: 'iOS', value: 'ios' },
  { label: 'Android', value: 'android' },
  { label: 'Desktop', value: 'desktop' }
];

const integrationOptions = [
  { label: 'Payment Gateway', value: 'payment' },
  { label: 'Social Media', value: 'social' },
  { label: 'Analytics', value: 'analytics' },
  { label: 'Email Service', value: 'email' },
  { label: 'Cloud Storage', value: 'storage' },
  { label: 'Authentication', value: 'auth' }
];

const authenticationOptions = [
  { label: 'Email/Password', value: 'email_password' },
  { label: 'Social Login', value: 'social' },
  { label: 'Two-Factor Authentication', value: '2fa' },
  { label: 'Single Sign-On (SSO)', value: 'sso' },
  { label: 'Biometric', value: 'biometric' }
];

const dataProtectionOptions = [
  { label: 'End-to-End Encryption', value: 'e2e' },
  { label: 'Data Backup', value: 'backup' },
  { label: 'Access Control', value: 'access_control' },
  { label: 'Data Masking', value: 'masking' },
  { label: 'Audit Logging', value: 'audit' }
];

const complianceOptions = [
  { label: 'GDPR', value: 'gdpr' },
  { label: 'HIPAA', value: 'hipaa' },
  { label: 'SOC 2', value: 'soc2' },
  { label: 'ISO 27001', value: 'iso27001' },
  { label: 'PCI DSS', value: 'pci' }
];

const TechnicalSpecsStep: React.FC<TechnicalSpecsStepProps> = ({
  data,
  updateData,
  errors,
  onNext
}) => {
  const handlePlatformChange = (platform: string, checked: boolean) => {
    updateData({
      platforms: {
        ...data.platforms,
        [platform]: checked
      }
    });
  };

  const handleScaleChange = (field: keyof TechnicalSpecs['scale'], value: string) => {
    const numValue = parseInt(value, 10);
    if (!isNaN(numValue) && numValue >= 0) {
      updateData({
        scale: {
          ...data.scale,
          [field]: numValue
        }
      });
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: 'easeInOut' }}
      className="space-y-6"
    >
      <div>
        <h2 className="text-xl font-semibold mb-4">Technical Specifications</h2>
        <p className="text-gray-600 mb-6">
          Help us understand your technical requirements and infrastructure needs.
        </p>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-2">Target Platforms</label>
          <div className="flex flex-wrap gap-3">
            {platformOptions.map(({ label, value }) => (
              <label
                key={value}
                className={`px-4 py-2 rounded-lg border cursor-pointer transition-colors ${
                  data.platforms[value as keyof TechnicalSpecs['platforms']]
                    ? 'bg-blue-500 text-white border-blue-500'
                    : 'bg-white text-gray-700 border-gray-300 hover:border-blue-500'
                }`}
              >
                <input
                  type="checkbox"
                  className="hidden"
                  checked={data.platforms[value as keyof TechnicalSpecs['platforms']]}
                  onChange={(e) => handlePlatformChange(value, e.target.checked)}
                />
                {label}
              </label>
            ))}
          </div>
          {errors['platforms'] && (
            <p className="text-red-500 text-sm mt-1">{errors['platforms']}</p>
          )}
        </div>

        <MultiSelect
          label="Required Integrations"
          options={integrationOptions}
          value={data.integrations}
          onChange={(values: string[]) => updateData({ integrations: values })}
          error={errors['integrations']}
        />

        <div className="space-y-4">
          <h3 className="text-lg font-medium">Security Requirements</h3>
          
          <MultiSelect
            label="Authentication Methods"
            options={authenticationOptions}
            value={data.security.authentication}
            onChange={(values: string[]) =>
              updateData({
                security: { ...data.security, authentication: values }
              })
            }
            error={errors['security.authentication']}
          />

          <MultiSelect
            label="Data Protection Measures"
            options={dataProtectionOptions}
            value={data.security.dataProtection}
            onChange={(values: string[]) =>
              updateData({
                security: { ...data.security, dataProtection: values }
              })
            }
            error={errors['security.dataProtection']}
          />

          <MultiSelect
            label="Compliance Requirements"
            options={complianceOptions}
            value={data.security.compliance}
            onChange={(values: string[]) =>
              updateData({
                security: { ...data.security, compliance: values }
              })
            }
            error={errors['security.compliance']}
          />
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-medium">Scale Requirements</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">
                Expected Users
              </label>
              <motion.input
                initial={{ scale: 1 }}
                animate={{ scale: 1 }}
                whileFocus={{ scale: 1.05 }}
                type="number"
                min="0"
                value={data.scale.users}
                onChange={(e) => handleScaleChange('users', e.target.value)}
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
              {errors['scale.users'] && (
                <p className="text-red-500 text-sm mt-1">{errors['scale.users']}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Storage (GB)
              </label>
              <motion.input
                initial={{ scale: 1 }}
                animate={{ scale: 1 }}
                whileFocus={{ scale: 1.05 }}
                type="number"
                min="0"
                value={data.scale.storage}
                onChange={(e) => handleScaleChange('storage', e.target.value)}
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
              {errors['scale.storage'] && (
                <p className="text-red-500 text-sm mt-1">{errors['scale.storage']}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Bandwidth (GB/month)
              </label>
              <motion.input
                initial={{ scale: 1 }}
                animate={{ scale: 1 }}
                whileFocus={{ scale: 1.05 }}
                type="number"
                min="0"
                value={data.scale.bandwidth}
                onChange={(e) => handleScaleChange('bandwidth', e.target.value)}
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
              {errors['scale.bandwidth'] && (
                <p className="text-red-500 text-sm mt-1">{errors['scale.bandwidth']}</p>
              )}
            </div>
          </div>
        </div>
      </div>
      <Button
        type="button"
        onClick={onNext}
        size="lg"
        className="w-full mt-6"
      >
        Next Step
      </Button>
    </motion.div>
  );
};

export default TechnicalSpecsStep;
