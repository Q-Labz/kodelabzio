import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Rocket, Shield, Clock } from 'lucide-react';

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
          Let's work together to bring your vision to life. This quick onboarding process will help us understand your needs better.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {[
            {
              icon: <Rocket className="w-8 h-8" />,
              title: 'Quick Setup',
              description: 'Complete the process in under 10 minutes'
            },
            {
              icon: <Shield className="w-8 h-8" />,
              title: 'Secure Process',
              description: 'Your information is encrypted and protected'
            },
            {
              icon: <Clock className="w-8 h-8" />,
              title: 'Fast Response',
              description: 'Get a response within 24 hours'
            }
          ].map((feature) => (
            <div
              key={feature.title}
              className="bg-deep-brown-200/40 backdrop-blur-sm p-6 rounded-xl border border-white/20"
            >
              <div className="text-accent mb-4 flex justify-center">
                {feature.icon}
              </div>
              <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-400">{feature.description}</p>
            </div>
          ))}
        </div>

        <button
          onClick={onNext}
          className="inline-flex items-center gap-2 bg-accent hover:bg-accent/90 text-white px-8 py-3 rounded-lg transition-colors text-lg"
        >
          Get Started
          <ArrowRight className="w-5 h-5" />
        </button>
      </motion.div>
    </div>
  );
};

export default WelcomeStep;