import React from 'react';
import { motion } from 'framer-motion';
import { ContactInfo } from '../../../types/onboarding';

interface ContactInfoStepProps {
  data: ContactInfo;
  updateData: (updates: Partial<ContactInfo>) => void;
  errors: Record<string, string[]>;
  onNext: () => void;
}

const ContactInfoStep: React.FC<ContactInfoStepProps> = ({
  data,
  updateData,
  errors,
  onNext
}) => {
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
        <h2 className="text-2xl font-bold mb-4">Contact Information</h2>
        <p className="text-gray-400 mb-8">
          Please provide your contact details so we can get in touch.
        </p>
      </div>

      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Full Name
          </label>
          <input
            type="text"
            value={data.name}
            onChange={(e) => updateData({ name: e.target.value })}
            className={`w-full bg-deep-brown-200/40 border ${
              errors.name ? 'border-red-500' : 'border-white/10'
            } rounded-lg px-4 py-3 text-white`}
            placeholder="Enter your full name"
          />
          {errors.name?.[0] && (
            <p className="mt-1 text-sm text-red-500">{errors.name[0]}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Email Address
          </label>
          <input
            type="email"
            value={data.email}
            onChange={(e) => updateData({ email: e.target.value })}
            className={`w-full bg-deep-brown-200/40 border ${
              errors.email ? 'border-red-500' : 'border-white/10'
            } rounded-lg px-4 py-3 text-white`}
            placeholder="Enter your email address"
          />
          {errors.email?.[0] && (
            <p className="mt-1 text-sm text-red-500">{errors.email[0]}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Company Name
          </label>
          <input
            type="text"
            value={data.company}
            onChange={(e) => updateData({ company: e.target.value })}
            className={`w-full bg-deep-brown-200/40 border ${
              errors.company ? 'border-red-500' : 'border-white/10'
            } rounded-lg px-4 py-3 text-white`}
            placeholder="Enter your company name"
          />
          {errors.company?.[0] && (
            <p className="mt-1 text-sm text-red-500">{errors.company[0]}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Phone Number
          </label>
          <input
            type="tel"
            value={data.phone}
            onChange={(e) => updateData({ phone: e.target.value })}
            className={`w-full bg-deep-brown-200/40 border ${
              errors.phone ? 'border-red-500' : 'border-white/10'
            } rounded-lg px-4 py-3 text-white`}
            placeholder="Enter your phone number"
          />
          {errors.phone?.[0] && (
            <p className="mt-1 text-sm text-red-500">{errors.phone[0]}</p>
          )}
        </div>

        <motion.button
          type="button"
          onClick={onNext}
          className="w-full px-6 py-3 bg-accent text-white rounded-lg font-medium hover:bg-accent/80 transition-colors"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          Submit
        </motion.button>
      </div>
    </motion.div>
  );
};

export default ContactInfoStep;
