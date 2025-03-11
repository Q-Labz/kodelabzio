import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Code2, Shield } from 'lucide-react';
import { serviceOptions } from './config';

interface WelcomeStepProps {
  onNext: () => void;
}

const WelcomeStep: React.FC<WelcomeStepProps> = ({ onNext }) => {
  return (
    <div className="text-center">
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <h2 className="text-3xl font-bold mb-6">
          Welcome to <span className="text-accent">KodeLabz</span>
        </h2>
        <p className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto">
          Let's start by selecting the service that best fits your needs
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {serviceOptions.map((service) => (
            <motion.button
              key={service.id}
              onClick={onNext}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="group text-left bg-deep-brown-300/50 p-6 rounded-xl border border-white/10 hover:border-accent/50 transition-all duration-300"
            >
              <div className="text-accent mb-4">
                {service.id === 'web-development' ? (
                  <Code2 className="w-8 h-8" />
                ) : (
                  <Shield className="w-8 h-8" />
                )}
              </div>
              <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
              <p className="text-gray-400 mb-4">{service.description}</p>
              <ul className="space-y-2">
                {service.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-2 text-sm text-gray-300">
                    <div className="w-1.5 h-1.5 bg-accent rounded-full" />
                    {feature}
                  </li>
                ))}
              </ul>
              <div className="mt-6 flex items-center gap-2 text-accent">
                Get Started
                <ArrowRight className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" />
              </div>
            </motion.button>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default WelcomeStep;