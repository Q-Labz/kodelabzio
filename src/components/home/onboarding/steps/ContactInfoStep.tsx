import React from 'react';
import { motion } from 'framer-motion';
import { ContactInfo } from '../../../../types/onboarding';
import Button from '../../../ui/Button';

interface ContactInfoStepProps {
  data: ContactInfo;
  updateData: (data: Partial<ContactInfo>) => void;
  errors: Record<string, string>;
  onNext: () => void;
}

const ContactInfoStep: React.FC<ContactInfoStepProps> = ({
  data,
  updateData,
  errors,
  onNext
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
          <label className="block text-sm font-medium mb-2">Name</label>
          <motion.input
            type="text"
            value={data.name}
            onChange={(e) => handleInputChange('name', e.target.value)}
            placeholder="Enter your name"
            whileFocus={{ scale: 1.01 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className={`w-full px-3 py-2 border rounded-lg transition-shadow ${
              errors['contactInfo.name']
                ? 'border-red-500 focus:ring-2 focus:ring-red-200'
                : 'border-gray-300 focus:ring-2 focus:ring-blue-200 focus:border-blue-500'
            }`}
          />
          {errors['contactInfo.name'] && (
            <motion.p
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              className="text-red-500 text-sm mt-1"
            >
              {errors['contactInfo.name']}
            </motion.p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Company</label>
          <motion.input
            type="text"
            value={data.company}
            onChange={(e) => handleInputChange('company', e.target.value)}
            placeholder="Enter your company name"
            whileFocus={{ scale: 1.01 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className={`w-full px-3 py-2 border rounded-lg transition-shadow ${
              errors['contactInfo.company']
                ? 'border-red-500 focus:ring-2 focus:ring-red-200'
                : 'border-gray-300 focus:ring-2 focus:ring-blue-200 focus:border-blue-500'
            }`}
          />
          {errors['contactInfo.company'] && (
            <motion.p
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              className="text-red-500 text-sm mt-1"
            >
              {errors['contactInfo.company']}
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
              errors['contactInfo.email']
                ? 'border-red-500 focus:ring-2 focus:ring-red-200'
                : 'border-gray-300 focus:ring-2 focus:ring-blue-200 focus:border-blue-500'
            }`}
          />
          {errors['contactInfo.email'] && (
            <motion.p
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              className="text-red-500 text-sm mt-1"
            >
              {errors['contactInfo.email']}
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
              errors['contactInfo.phone']
                ? 'border-red-500 focus:ring-2 focus:ring-red-200'
                : 'border-gray-300 focus:ring-2 focus:ring-blue-200 focus:border-blue-500'
            }`}
          />
          {errors['contactInfo.phone'] && (
            <motion.p
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              className="text-red-500 text-sm mt-1"
            >
              {errors['contactInfo.phone']}
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
              errors['contactInfo.preferredContact']
                ? 'border-red-500 focus:ring-2 focus:ring-red-200'
                : 'border-gray-300 focus:ring-2 focus:ring-blue-200 focus:border-blue-500'
            }`}
          >
            <option value="">Select preferred contact method</option>
            <option value="email">Email</option>
            <option value="phone">Phone</option>
            <option value="messaging">Messaging</option>
          </motion.select>
          {errors['contactInfo.preferredContact'] && (
            <motion.p
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              className="text-red-500 text-sm mt-1"
            >
              {errors['contactInfo.preferredContact']}
            </motion.p>
          )}
        </div>
        
        <Button
          type="button"
          onClick={onNext}
          size="lg"
          className="w-full mt-6"
        >
          Submit
        </Button>
      </div>
    </motion.div>
  );
};

export default ContactInfoStep;