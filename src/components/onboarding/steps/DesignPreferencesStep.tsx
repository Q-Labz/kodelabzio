import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { Upload, X } from 'lucide-react';
import type { DesignPreferences } from '../../../types/onboarding';

interface DesignPreferencesStepProps {
  data: DesignPreferences;
  onChange: (data: DesignPreferences) => void;
  errors: Record<string, string>;
}

const DesignPreferencesStep: React.FC<DesignPreferencesStepProps> = ({ data, onChange, errors }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleStyleChange = (value: string) => {
    onChange({ ...data, style: value });
  };

  const handleColorSchemeChange = (value: string) => {
    onChange({ ...data, colorScheme: value });
  };

  const handleInspirationChange = (value: string) => {
    const inspirations = value.split('\n').filter(Boolean);
    onChange({ ...data, inspiration: inspirations });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onChange({ ...data, brandGuidelines: file });
    }
  };

  const handleRemoveFile = () => {
    onChange({ ...data, brandGuidelines: null });
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="space-y-6"
    >
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold mb-2">Design Preferences</h2>
        <p className="text-gray-400">Tell us about your design vision</p>
      </div>

      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Design Style *
          </label>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {[
              'Minimal',
              'Modern',
              'Classic',
              'Playful',
              'Corporate',
              'Creative'
            ].map((style) => (
              <label
                key={style}
                className={`flex items-center justify-center p-4 rounded-lg border cursor-pointer transition-colors ${
                  data.style === style
                    ? 'border-accent bg-accent/10 text-accent'
                    : 'border-white/10 hover:border-accent/50'
                }`}
              >
                <input
                  type="radio"
                  name="style"
                  value={style}
                  checked={data.style === style}
                  onChange={(e) => handleStyleChange(e.target.value)}
                  className="hidden"
                />
                {style}
              </label>
            ))}
          </div>
          {errors.style && (
            <p className="mt-1 text-sm text-red-500">{errors.style}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Color Scheme *
          </label>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {[
              'Light',
              'Dark',
              'Colorful',
              'Monochrome',
              'Warm',
              'Cool'
            ].map((scheme) => (
              <label
                key={scheme}
                className={`flex items-center justify-center p-4 rounded-lg border cursor-pointer transition-colors ${
                  data.colorScheme === scheme
                    ? 'border-accent bg-accent/10 text-accent'
                    : 'border-white/10 hover:border-accent/50'
                }`}
              >
                <input
                  type="radio"
                  name="colorScheme"
                  value={scheme}
                  checked={data.colorScheme === scheme}
                  onChange={(e) => handleColorSchemeChange(e.target.value)}
                  className="hidden"
                />
                {scheme}
              </label>
            ))}
          </div>
          {errors.colorScheme && (
            <p className="mt-1 text-sm text-red-500">{errors.colorScheme}</p>
          )}
        </div>

        <div>
          <label htmlFor="inspiration" className="block text-sm font-medium text-gray-300 mb-2">
            Inspiration URLs *
          </label>
          <textarea
            id="inspiration"
            value={data.inspiration.join('\n')}
            onChange={(e) => handleInspirationChange(e.target.value)}
            rows={4}
            className={`w-full bg-deep-brown-200/40 border ${
              errors.inspiration ? 'border-red-500' : 'border-white/10'
            } rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-accent/50`}
            placeholder="Enter website URLs for inspiration (one per line)"
          />
          {errors.inspiration && (
            <p className="mt-1 text-sm text-red-500">{errors.inspiration}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Brand Guidelines (Optional)
          </label>
          <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border border-white/10 rounded-lg hover:border-accent/50 transition-colors">
            <div className="space-y-1 text-center">
              <Upload className="mx-auto h-12 w-12 text-gray-400" />
              <div className="flex text-sm text-gray-400">
                <label
                  htmlFor="brandGuidelines"
                  className="relative cursor-pointer rounded-md font-medium text-accent hover:text-accent/80 focus-within:outline-none"
                >
                  <span>Upload a file</span>
                  <input
                    id="brandGuidelines"
                    ref={fileInputRef}
                    type="file"
                    accept=".pdf,.doc,.docx"
                    onChange={handleFileChange}
                    className="sr-only"
                  />
                </label>
                <p className="pl-1">or drag and drop</p>
              </div>
              <p className="text-xs text-gray-400">
                PDF, DOC up to 10MB
              </p>
            </div>
          </div>
          {data.brandGuidelines && (
            <div className="mt-2 flex items-center justify-between bg-deep-brown-200/40 p-2 rounded-lg">
              <span className="text-sm text-gray-300">{data.brandGuidelines.name}</span>
              <button
                type="button"
                onClick={handleRemoveFile}
                className="text-gray-400 hover:text-red-500 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default DesignPreferencesStep;