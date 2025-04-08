import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { 
  ExternalLink, 
  Globe, 
  ArrowRight
} from 'lucide-react';
import { projects } from '../data/projects';
import Button from '../components/ui/Button';

const Projects: React.FC = () => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  return (
    <div className="pt-20">
      <section className="py-24 bg-gradient-to-b from-black to-primary/20">
        <div className="container mx-auto px-4">
          <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Case <span className="text-accent">Studies</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Real success stories showcasing our expertise and impact
            </p>
          </motion.div>

          <div className="space-y-24">
            {projects.map((project, index) => (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="bg-black/40 backdrop-blur-sm rounded-xl border border-white/20"
              >
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 p-8">
                  <div className={`order-2 ${index % 2 === 0 ? 'lg:order-1' : 'lg:order-2'}`}>
                    <span className="text-accent text-sm font-semibold">{project.category}</span>
                    <h2 className="text-3xl font-bold mt-2 mb-4">{project.title}</h2>
                    <p className="text-gray-300 mb-6">{project.description}</p>
                    
                    <div className="flex flex-wrap gap-2 mb-6">
                      {project.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="bg-accent/10 text-accent px-3 py-1 rounded-full text-sm"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    <div className="flex gap-4">
                      <Button
                        href={project.demoUrl}
                        className="flex items-center gap-2 bg-accent hover:bg-accent/90 text-white px-6 py-2 rounded-lg transition-colors"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Globe className="w-5 h-5" /> Live Demo
                      </Button>
                      <Button
                        to={`/projects/${project.slug}`}
                        variant="outline"
                        className="flex items-center gap-2 border border-white/20 hover:border-accent text-white px-6 py-2 rounded-lg transition-colors"
                      >
                        View Details
                      </Button>
                    </div>
                  </div>

                  <div className={`order-1 ${index % 2 === 0 ? 'lg:order-2' : 'lg:order-1'}`}>
                    <div className="relative group">
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full rounded-xl shadow-lg"
                      />
                      <a
                        href={project.demoUrl}
                        className="absolute inset-0 flex items-center justify-center bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity rounded-xl"
                      >
                        <ExternalLink className="w-12 h-12 text-white" />
                      </a>
                    </div>
                  </div>
                </div>

                <div className="px-8 pb-8">
                  <Button
                    to={`/projects/${project.slug}`}
                    variant="ghost"
                    className="w-full flex items-center justify-between text-accent hover:text-accent/80 transition-colors group"
                  >
                    <span className="font-semibold">View Case Study</span>
                    <ArrowRight className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" />
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Projects;