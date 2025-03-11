import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { ExternalLink, CheckCircle2, ArrowRight } from 'lucide-react';
import Button from './ui/Button';

const projects = [
  {
    title: 'Diligent Security Services',
    category: 'Web Development & Security',
    image: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&q=80&w=1600',
    description: 'A comprehensive security operations platform with real-time monitoring and client management capabilities.',
    objectives: [
      'Streamline security operations',
      'Enhance client communication',
      'Implement real-time monitoring',
      'Automate reporting systems'
    ],
    features: [
      'Real-time Security Dashboard',
      'Client Portal Integration',
      'Automated Reporting System',
      'Incident Management',
      'Resource Scheduling',
      'Document Management'
    ],
    technologies: ['React', 'Node.js', 'PostgreSQL', 'WebSocket', 'AWS'],
    impact: [
      '45% reduction in response time',
      '60% increase in operational efficiency',
      '98% client satisfaction rate',
      'Zero security breaches since launch'
    ],
    liveUrl: 'https://diligentsecurity.com'
  },
  {
    title: "Young's Precision Tool Grinding",
    category: 'Web Development & E-commerce',
    image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=1600',
    description: 'A modern business website showcasing industrial grinding services with integrated quote management.',
    objectives: [
      'Modernize online presence',
      'Streamline quote requests',
      'Showcase service capabilities',
      'Improve customer engagement'
    ],
    features: [
      'Custom Quote Builder',
      'Service Catalog',
      'Project Gallery',
      'Technical Specifications',
      'Equipment Database',
      'Customer Portal'
    ],
    technologies: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Prisma', 'Vercel'],
    impact: [
      '200% increase in online inquiries',
      '40% reduction in quote processing time',
      '35% increase in conversion rate',
      'Expanded market reach by 150%'
    ],
    liveUrl: 'https://youngsprecision.com'
  },
  {
    title: 'Boys & Girls Club of Fontana',
    category: 'Web Development & Community',
    image: 'https://images.unsplash.com/photo-1571260899304-425eee4c7efc?auto=format&fit=crop&q=80&w=1600',
    description: 'A community-focused website serving local youth and families with program information and resources.',
    objectives: [
      'Improve program accessibility',
      'Streamline registration process',
      'Enhance community engagement',
      'Facilitate donations'
    ],
    features: [
      'Program Registration',
      'Event Calendar',
      'Donation Platform',
      'Resource Library',
      'Newsletter System',
      'Member Portal'
    ],
    technologies: ['React', 'Firebase', 'Stripe', 'Google Calendar API', 'Cloudinary'],
    impact: [
      '75% increase in program registrations',
      '150% increase in online donations',
      '90% reduction in paperwork',
      'Reached 5000+ new families'
    ],
    liveUrl: 'https://bgcfontana.org'
  }
];

const Portfolio: React.FC = () => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  return (
    <section id="portfolio" className="py-24 bg-gradient-to-b from-black to-deep-brown-300">
      <div className="container mx-auto px-4">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Featured <span className="text-accent">Projects</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Explore our latest work and success stories
          </p>
        </motion.div>

        <div className="space-y-32">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="relative"
            >
              <div className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${
                index % 2 === 0 ? '' : 'lg:flex-row-reverse'
              }`}>
                <div className={index % 2 === 0 ? 'lg:order-1' : 'lg:order-2'}>
                  <div className="relative group">
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      transition={{ duration: 0.3 }}
                    >
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full rounded-xl shadow-2xl"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent rounded-xl" />
                    </motion.div>
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="absolute inset-0 flex items-center justify-center bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity rounded-xl"
                    >
                      <ExternalLink className="w-12 h-12 text-white" />
                    </a>
                  </div>
                </div>

                <div className={index % 2 === 0 ? 'lg:order-2' : 'lg:order-1'}>
                  <span className="text-accent text-sm font-semibold">{project.category}</span>
                  <h3 className="text-3xl font-bold mt-2 mb-4">{project.title}</h3>
                  <p className="text-gray-300 text-lg mb-6">{project.description}</p>

                  <div className="space-y-6 mb-8">
                    <div>
                      <h4 className="text-xl font-semibold mb-4">Key Features</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {project.features.map((feature) => (
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
                        {project.impact.map((result) => (
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
                        {project.technologies.map((tech) => (
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
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group"
                  >
                    Visit Website
                    <ArrowRight className="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform" />
                  </Button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Portfolio;