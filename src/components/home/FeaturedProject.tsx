import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { ExternalLink, ArrowRight, CheckCircle2 } from 'lucide-react';
import Button from '../ui/Button';

const FeaturedProject: React.FC = () => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  return (
    <section className="py-24 bg-gradient-to-b from-deep-brown-300 to-black">
      <div className="container mx-auto px-4">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Featured <span className="text-accent">Project</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Our latest success story
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
        >
          <div className="relative group">
            <motion.div
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <img
                src="https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&q=80&w=1600"
                alt="Diligent Security Services Dashboard"
                className="w-full rounded-xl shadow-2xl"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent rounded-xl" />
            </motion.div>
            <a
              href="/projects"
              className="absolute inset-0 flex items-center justify-center bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity rounded-xl"
            >
              <ExternalLink className="w-12 h-12 text-white" />
            </a>
          </div>

          <div>
            <span className="text-accent text-sm font-semibold">Web Development & Security</span>
            <h3 className="text-3xl font-bold mt-2 mb-4">Diligent Security Services</h3>
            <p className="text-gray-300 text-lg mb-6">
              A comprehensive security operations platform with real-time monitoring and client management capabilities.
            </p>

            <div className="space-y-6 mb-8">
              <div>
                <h4 className="text-xl font-semibold mb-4">Key Features</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {[
                    'Real-time Security Dashboard',
                    'Client Portal Integration',
                    'Automated Reporting System',
                    'Incident Management'
                  ].map((feature) => (
                    <div key={feature} className="flex items-center gap-2">
                      <CheckCircle2 className="w-5 h-5 text-accent" />
                      <span className="text-gray-300">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="text-xl font-semibold mb-4">Impact & Results</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {[
                    '45% reduction in response time',
                    '60% increase in efficiency',
                    '98% client satisfaction rate',
                    'Zero security breaches'
                  ].map((result) => (
                    <div key={result} className="flex items-center gap-2">
                      <CheckCircle2 className="w-5 h-5 text-accent" />
                      <span className="text-gray-300">{result}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="text-xl font-semibold mb-4">Technologies</h4>
                <div className="flex flex-wrap gap-2">
                  {['React', 'Node.js', 'PostgreSQL', 'WebSocket', 'AWS'].map((tech) => (
                    <span
                      key={tech}
                      className="bg-accent/10 text-accent px-3 py-1 rounded-full text-sm"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <Button
              as="a"
              href="/projects"
              className="group"
            >
              View Case Study
              <ArrowRight className="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturedProject;