import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, Building2, User } from 'lucide-react';
import type { ContactInfo } from '../../../../types/onboarding';

interface ContactInfoStepProps {
  data: ContactInfo;
  onChange: (data: ContactInfo) => void;
  errors: Record<string, string>;
}

const ContactInfoStep: React.FC<ContactInfoStepProps> = ({ data, onChange, errors }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="space-y-6"
    >
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold mb-2">Contact Information</h2>
        <p className="text-gray-400">Tell us how to reach you</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="name" className="flex items-center gap-2 text-sm font-medium text-gray-300 mb-2">
            <User className="w-5 h-5 text-accent" />
            Full Name *
          </label>
          <input
            type="text"
            id="name"
            value={data.name}
            onChange={(e) => onChange({ ...data, name: e.target.value })}
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
          <label htmlFor="email" className="flex items-center gap-2 text-sm font-medium text-gray-300 mb-2">
            <Mail className="w-5 h-5 text-accent" />
            Email Address *
          </label>
          <input
            type="email"
            id="email"
            value={data.email}
            onChange={(e) => onChange({ ...data, email: e.target.value })}
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
          <label htmlFor="company" className="flex items-center gap-2 text-sm font-medium text-gray-300 mb-2">
            <Building2 className="w-5 h-5 text-accent" />
            Company Name *
          </label>
          <input
            type="text"
            id="company"
            value={data.company}
            onChange={(e) => onChange({ ...data, company: e.target.value })}
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
          <label htmlFor="phone" className="flex items-center gap-2 text-sm font-medium text-gray-300 mb-2">
            <Phone className="w-5 h-5 text-accent" />
            Phone Number *
          </label>
          <input
            type="tel"
            id="phone"
            value={data.phone}
            onChange={(e) => onChange({ ...data, phone: e.target.value })}
            className={`w-full bg-deep-brown-200/40 border ${
              errors.phone ? 'border-red-500' : 'border-white/10'
            } rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-accent/50`}
            placeholder="+1 (555) 000-0000"
          />
          {errors.phone && (
            <p className="mt-1 text-sm text-red-500">{errors.phone}</p>
          )}
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-300 mb-3">
            Preferred Contact Method *
          </label>
          <div className="flex flex-wrap gap-4">
            {[
              { value: 'email', label: 'Email', icon: <Mail className="w-5 h-5" /> },
              { value: 'phone', label: 'Phone', icon: <Phone className="w-5 h-5" /> }
            ].map((option) => (
              <label
                key={option.value}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg border cursor-pointer transition-colors ${
                  data.preferredContact === option.value
                    ? 'border-accent text-accent'
                    : 'border-white/10 text-gray-300 hover:border-accent/50'
                }`}
              >
                <input
                  type="radio"
                  name="preferredContact"
                  value={option.value}
                  checked={data.preferredContact === option.value}
                  onChange={(e) => onChange({ ...data, preferredContact: e.target.value })}
                  className="hidden"
                />
                {option.icon}
                {option.label}
              </label>
            ))}
          </div>
          {errors.preferredContact && (
            <p className="mt-1 text-sm text-red-500">{errors.preferredContact}</p>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default ContactInfoStep;