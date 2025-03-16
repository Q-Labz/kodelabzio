import React from 'react';
import { motion } from 'framer-motion';
import { ContactInfo } from '../../../../types/onboarding';

interface ContactInfoStepProps {
  data: ContactInfo;
  updateData: (data: Partial<ContactInfo>) => void;
  errors: Record<string, string[]>;
}

const ContactInfoStep: React.FC<ContactInfoStepProps> = ({
  data,
  updateData,
  errors
}) => {
  const handleInputChange = (field: keyof ContactInfo, value: string) => {
    updateData({ [field]: value });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: 'easeInOut' }}
      className="space-y-6"
    >
      <div>
        <h2 className="text-xl font-semibold mb-4">Contact Information</h2>
        <p className="text-gray-600 mb-6">
          Please provide your contact details so we can get in touch with you.
        </p>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-2">Company Name</label>
          <motion.input
            type="text"
            value={data.companyName}
            onChange={(e) => handleInputChange('companyName', e.target.value)}
            placeholder="Enter your company name"
            whileFocus={{ scale: 1.01 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className={`w-full px-3 py-2 border rounded-lg transition-shadow ${
              errors['companyName']
                ? 'border-red-500 focus:ring-2 focus:ring-red-200'
                : 'border-gray-300 focus:ring-2 focus:ring-blue-200 focus:border-blue-500'
            }`}
          />
          {errors['companyName'] && (
            <motion.p
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              className="text-red-500 text-sm mt-1"
            >
              {errors['companyName'][0]}
            </motion.p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Industry</label>
          <motion.input
            type="text"
            value={data.industry}
            onChange={(e) => handleInputChange('industry', e.target.value)}
            placeholder="Enter your industry"
            whileFocus={{ scale: 1.01 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className={`w-full px-3 py-2 border rounded-lg transition-shadow ${
              errors['industry']
                ? 'border-red-500 focus:ring-2 focus:ring-red-200'
                : 'border-gray-300 focus:ring-2 focus:ring-blue-200 focus:border-blue-500'
            }`}
          />
          {errors['industry'] && (
            <motion.p
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              className="text-red-500 text-sm mt-1"
            >
              {errors['industry'][0]}
            </motion.p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Email</label>
          <motion.input
            type="email"
            value={data.email}
            onChange={(e) => handleInputChange('email', e.target.value)}
            placeholder="Enter your email"
            whileFocus={{ scale: 1.01 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className={`w-full px-3 py-2 border rounded-lg transition-shadow ${
              errors['email']
                ? 'border-red-500 focus:ring-2 focus:ring-red-200'
                : 'border-gray-300 focus:ring-2 focus:ring-blue-200 focus:border-blue-500'
            }`}
          />
          {errors['email'] && (
            <motion.p
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              className="text-red-500 text-sm mt-1"
            >
              {errors['email'][0]}
            </motion.p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Phone</label>
          <motion.input
            type="tel"
            value={data.phone}
            onChange={(e) => handleInputChange('phone', e.target.value)}
            placeholder="Enter your phone number"
            whileFocus={{ scale: 1.01 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className={`w-full px-3 py-2 border rounded-lg transition-shadow ${
              errors['phone']
                ? 'border-red-500 focus:ring-2 focus:ring-red-200'
                : 'border-gray-300 focus:ring-2 focus:ring-blue-200 focus:border-blue-500'
            }`}
          />
          {errors['phone'] && (
            <motion.p
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              className="text-red-500 text-sm mt-1"
            >
              {errors['phone'][0]}
            </motion.p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">
            Preferred Contact Method
          </label>
          <motion.select
            value={data.preferredContact}
            onChange={(e) =>
              handleInputChange(
                'preferredContact',
                e.target.value as ContactInfo['preferredContact']
              )
            }
            whileFocus={{ scale: 1.01 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className={`w-full px-3 py-2 border rounded-lg transition-shadow ${
              errors['preferredContact']
                ? 'border-red-500 focus:ring-2 focus:ring-red-200'
                : 'border-gray-300 focus:ring-2 focus:ring-blue-200 focus:border-blue-500'
            }`}
          >
            <option value="">Select preferred contact method</option>
            <option value="email">Email</option>
            <option value="phone">Phone</option>
            <option value="messaging">Messaging</option>
          </motion.select>
          {errors['preferredContact'] && (
            <motion.p
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              className="text-red-500 text-sm mt-1"
            >
              {errors['preferredContact'][0]}
            </motion.p>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default ContactInfoStep;