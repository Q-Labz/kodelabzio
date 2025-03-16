import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Mail, Phone, MapPin, Send, ArrowRight } from 'lucide-react';
import { submitContactForm } from '../services/api';

interface ContactFormData {
  email: string;
  name: string;
  company: string;
  phone: string;
  message: string;
}

interface ContactProps {
  onGetStarted: () => void;
}

const Contact: React.FC<ContactProps> = ({ onGetStarted }) => {
  const [formData, setFormData] = useState<ContactFormData>({
    email: '',
    name: '',
    company: '',
    phone: '',
    message: ''
  });

  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');
    setErrorMessage('');

    try {
      const response = await submitContactForm(formData);
      if (response.error) {
        throw new Error(response.error);
      }
      setStatus('success');
      setFormData({
        email: '',
        name: '',
        company: '',
        phone: '',
        message: ''
      });
    } catch (error) {
      setStatus('error');
      setErrorMessage(error instanceof Error ? error.message : 'Failed to submit form');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <section id="contact" className="py-24 bg-gradient-to-b from-black to-primary/20">
      <div className="container mx-auto px-4">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Get in <span className="text-accent">Touch</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Let's discuss your project and bring your vision to life
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-1 space-y-8"
          >
            <div className="bg-black/40 backdrop-blur-sm p-8 rounded-xl border border-white/20">
              <h3 className="text-2xl font-bold mb-6">Contact Information</h3>
              
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="bg-accent/10 p-3 rounded-lg">
                    <Mail className="w-6 h-6 text-accent" />
                  </div>
                  <div>
                    <h4 className="text-xl font-semibold mb-1">Email Us</h4>
                    <p className="text-gray-400">info@kodelabz.io</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="bg-accent/10 p-3 rounded-lg">
                    <Phone className="w-6 h-6 text-accent" />
                  </div>
                  <div>
                    <h4 className="text-xl font-semibold mb-1">Call Us</h4>
                    <p className="text-gray-400">+1 (626) 523-7776</p>
                    <p className="text-gray-400">Mon-Fri: 9AM-6PM PST</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="bg-accent/10 p-3 rounded-lg">
                    <MapPin className="w-6 h-6 text-accent" />
                  </div>
                  <div>
                    <h4 className="text-xl font-semibold mb-1">Visit Us</h4>
                    <p className="text-gray-400">
                      1111 6th Ave, Suite 550 #301211<br />
                      San Diego, CA 92101<br />
                      United States
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="bg-accent/10 backdrop-blur-sm p-8 rounded-xl border border-accent/20"
            >
              <h3 className="text-2xl font-bold mb-4">Ready to Start?</h3>
              <p className="text-gray-300 mb-6">
                Launch your project quickly with our streamlined onboarding process
              </p>
              <button
                onClick={onGetStarted}
                className="w-full bg-accent hover:bg-accent/90 text-white px-6 py-3 rounded-lg flex items-center justify-center gap-2 transition-colors"
              >
                Start Your Project <ArrowRight className="w-5 h-5" />
              </button>
            </motion.div>
          </motion.div>

          <motion.form
            initial={{ opacity: 0, x: 20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            onSubmit={handleSubmit}
            className="lg:col-span-2 bg-black/40 backdrop-blur-sm p-8 rounded-xl border border-white/20"
          >
            <h3 className="text-2xl font-bold mb-6">Send Us a Message</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                  Full Name *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-accent/50"
                  placeholder="John Doe"
                  required
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-accent/50"
                  placeholder="john@example.com"
                  required
                />
              </div>

              <div>
                <label htmlFor="company" className="block text-sm font-medium text-gray-300 mb-2">
                  Company Name
                </label>
                <input
                  type="text"
                  id="company"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-accent/50"
                  placeholder="Your Company"
                />
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-300 mb-2">
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-accent/50"
                  placeholder="+1 (555) 000-0000"
                />
              </div>

              <div className="md:col-span-2">
                <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
                  Message *
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={6}
                  className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-accent/50"
                  placeholder="Tell us about your project, goals, and timeline..."
                  required
                />
              </div>
            </div>

            <div className="mt-8">
              <button
                type="submit"
                disabled={status === 'submitting'}
                className="w-full bg-accent hover:bg-accent/90 text-white px-8 py-4 rounded-lg flex items-center justify-center gap-2 transition-colors disabled:opacity-50"
              >
                {status === 'submitting' ? (
                  <span>Sending...</span>
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    <span>Send Message</span>
                    <ArrowRight className="w-5 h-5" />
                  </>
                )}
              </button>

              {status === 'success' && (
                <div className="text-green-500 text-center mt-4">
                  Message sent successfully!
                </div>
              )}

              {status === 'error' && (
                <div className="text-red-500 text-center mt-4">
                  {errorMessage || 'Failed to send message. Please try again.'}
                </div>
              )}
            </div>
          </motion.form>
        </div>
      </div>
    </section>
  );
};

export default Contact;