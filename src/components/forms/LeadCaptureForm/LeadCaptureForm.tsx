import React from 'react';
import { motion } from 'framer-motion';
import { Send } from 'lucide-react';
import { useLead } from '../../../hooks/forms/useLead';
import Button from '../../ui/Button';

interface LeadCaptureFormProps {
  onSuccess?: () => void;
}

const budgetRanges = [
  { value: '10-25k', label: '$10,000 - $25,000' },
  { value: '25-50k', label: '$25,000 - $50,000' },
  { value: '50-100k', label: '$50,000 - $100,000' },
  { value: '100k+', label: '$100,000+' }
];

const timelines = [
  { value: '1-2', label: '1-2 months' },
  { value: '3-4', label: '3-4 months' },
  { value: '5-6', label: '5-6 months' },
  { value: '6+', label: '6+ months' }
];

const LeadCaptureForm: React.FC<LeadCaptureFormProps> = ({ onSuccess }) => {
  const { formData, errors, isSubmitting, handleChange, handleSubmit } = useLead(onSuccess);

  return (
    <motion.form
      onSubmit={handleSubmit}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6"
    >
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold mb-2">Start Your Project</h2>
        <p className="text-gray-400">Tell us about your project and we'll get back to you within 24 hours.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="fullName" className="block text-sm font-medium text-gray-300 mb-2">
            Full Name *
          </label>
          <input
            type="text"
            id="fullName"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            className={`w-full bg-black/40 border ${
              errors.fullName ? 'border-red-500' : 'border-white/10'
            } rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-accent/50`}
            placeholder="John Doe"
            required
          />
          {errors.fullName && (
            <p className="mt-1 text-sm text-red-500">{errors.fullName}</p>
          )}
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
            Business Email *
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className={`w-full bg-black/40 border ${
              errors.email ? 'border-red-500' : 'border-white/10'
            } rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-accent/50`}
            placeholder="john@company.com"
            required
          />
          {errors.email && (
            <p className="mt-1 text-sm text-red-500">{errors.email}</p>
          )}
        </div>

        <div>
          <label htmlFor="companyName" className="block text-sm font-medium text-gray-300 mb-2">
            Company Name *
          </label>
          <input
            type="text"
            id="companyName"
            name="companyName"
            value={formData.companyName}
            onChange={handleChange}
            className={`w-full bg-black/40 border ${
              errors.companyName ? 'border-red-500' : 'border-white/10'
            } rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-accent/50`}
            placeholder="Company Inc."
            required
          />
          {errors.companyName && (
            <p className="mt-1 text-sm text-red-500">{errors.companyName}</p>
          )}
        </div>

        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-gray-300 mb-2">
            Phone Number *
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className={`w-full bg-black/40 border ${
              errors.phone ? 'border-red-500' : 'border-white/10'
            } rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-accent/50`}
            placeholder="+1 (555) 000-0000"
            required
          />
          {errors.phone && (
            <p className="mt-1 text-sm text-red-500">{errors.phone}</p>
          )}
        </div>

        <div>
          <label htmlFor="budgetRange" className="block text-sm font-medium text-gray-300 mb-2">
            Estimated Budget *
          </label>
          <select
            id="budgetRange"
            name="budgetRange"
            value={formData.budgetRange}
            onChange={handleChange}
            className={`w-full bg-black/40 border ${
              errors.budgetRange ? 'border-red-500' : 'border-white/10'
            } rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-accent/50`}
            required
          >
            <option value="">Select Budget Range</option>
            {budgetRanges.map(range => (
              <option key={range.value} value={range.value}>{range.label}</option>
            ))}
          </select>
          {errors.budgetRange && (
            <p className="mt-1 text-sm text-red-500">{errors.budgetRange}</p>
          )}
        </div>

        <div>
          <label htmlFor="timeline" className="block text-sm font-medium text-gray-300 mb-2">
            Preferred Timeline *
          </label>
          <select
            id="timeline"
            name="timeline"
            value={formData.timeline}
            onChange={handleChange}
            className={`w-full bg-black/40 border ${
              errors.timeline ? 'border-red-500' : 'border-white/10'
            } rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-accent/50`}
            required
          >
            <option value="">Select Timeline</option>
            {timelines.map(timeline => (
              <option key={timeline.value} value={timeline.value}>{timeline.label}</option>
            ))}
          </select>
          {errors.timeline && (
            <p className="mt-1 text-sm text-red-500">{errors.timeline}</p>
          )}
        </div>
      </div>

      <div>
        <label htmlFor="description" className="block text-sm font-medium text-gray-300 mb-2">
          Project Description * (150 characters max)
        </label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          maxLength={150}
          rows={3}
          className={`w-full bg-black/40 border ${
            errors.description ? 'border-red-500' : 'border-white/10'
          } rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-accent/50`}
          placeholder="Brief description of your project..."
          required
        />
        <div className="mt-1 flex justify-between text-sm">
          <span className="text-gray-400">{formData.description.length}/150 characters</span>
          {errors.description && (
            <span className="text-red-500">{errors.description}</span>
          )}
        </div>
      </div>

      <div className="flex items-start">
        <input
          type="checkbox"
          id="consent"
          name="consent"
          checked={formData.consent}
          onChange={handleChange}
          className="mt-1"
          required
        />
        <label htmlFor="consent" className="ml-2 text-sm text-gray-400">
          I agree to the processing of my data according to the{' '}
          <a href="/privacy" className="text-accent hover:text-accent/80" target="_blank">
            Privacy Policy
          </a>
        </label>
      </div>

      <Button
        type="submit"
        disabled={isSubmitting}
        className="w-full group"
      >
        {isSubmitting ? (
          <>
            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />
            Submitting...
          </>
        ) : (
          <>
            Send Message
            <Send className="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform" />
          </>
        )}
      </Button>
    </motion.form>
  );
};

export default LeadCaptureForm;