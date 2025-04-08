import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { 
  ArrowLeft, 
  CheckCircle2, 
  Target, 
  Zap, 
  Trophy,
  Calendar,
  Users,
  Globe,
  FileText,
  ExternalLink
} from 'lucide-react';
import Button from '../components/ui/Button';
import { projects } from '../data/projects';

// Define the Project type to match the structure in projects.ts
interface Project {
  title: string;
  slug: string;
  category: string;
  image: string;
  description: string;
  longDescription: string;
  objectives: string[];
  challenges: string[];
  solutions: string[];
  results: string[];
  technologies: string[];
  timeline: string;
  teamSize: string;
  location: string;
  industry: string;
  demoUrl: string;
  githubUrl: string;
  websiteUrl: string;
}

const CaseStudyDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [project, setProject] = useState<Project | null>(null);
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  useEffect(() => {
    // Find the project by slug
    const foundProject = projects.find((p: Project) => p.slug === slug);
    if (foundProject) {
      setProject(foundProject);
    }
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
  }, [slug]);

  if (!project) {
    return (
      <div className="container mx-auto px-4 py-32 text-center">
        <h1 className="text-3xl font-bold mb-6">Case Study Not Found</h1>
        <p className="mb-8">The case study you're looking for doesn't exist or has been moved.</p>
        <Link to="/projects">
          <Button>
            <ArrowLeft className="w-5 h-5 mr-2" /> Back to Projects
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="py-24 bg-gradient-to-b from-black to-primary/20">
        <div className="container mx-auto px-4">
          <Link to="/projects" className="inline-flex items-center text-accent hover:text-accent/80 mb-8">
            <ArrowLeft className="w-5 h-5 mr-2" /> Back to Projects
          </Link>

          <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6 }}
            className="mb-16"
          >
            <span className="text-accent text-sm font-semibold">{project.category}</span>
            <h1 className="text-4xl md:text-5xl font-bold my-4">{project.title}</h1>
            
            <div className="flex flex-wrap gap-2 my-6">
              {project.technologies.map((tech: string, index: number) => (
                <span
                  key={index}
                  className="bg-accent/10 text-accent px-3 py-1 rounded-full text-sm"
                >
                  {tech}
                </span>
              ))}
            </div>
          </motion.div>

          {/* Featured Image */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-16"
          >
            <img 
              src={project.image} 
              alt={project.title}
              className="w-full h-auto rounded-xl shadow-2xl"
            />
          </motion.div>
        </div>
      </section>

      {/* Project Overview */}
      <section className="py-16 bg-black/40">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                <h2 className="text-3xl font-bold mb-6">Project Overview</h2>
                <p className="text-xl text-gray-300 mb-8">{project.description}</p>
                <p className="text-gray-300 mb-6">{project.longDescription || "Our team worked closely with the client to understand their unique challenges and deliver a tailored solution that exceeded expectations. Through careful planning and execution, we were able to transform their digital presence and achieve remarkable results."}</p>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="bg-black/40 backdrop-blur-sm rounded-xl border border-white/20 p-6"
            >
              <h3 className="text-xl font-bold mb-4">Project Details</h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <Calendar className="w-5 h-5 text-accent mt-1" />
                  <div>
                    <p className="text-sm text-gray-400">Timeline</p>
                    <p className="font-medium">{project.timeline || "3 months"}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Users className="w-5 h-5 text-accent mt-1" />
                  <div>
                    <p className="text-sm text-gray-400">Team Size</p>
                    <p className="font-medium">{project.teamSize || "5 specialists"}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Globe className="w-5 h-5 text-accent mt-1" />
                  <div>
                    <p className="text-sm text-gray-400">Location</p>
                    <p className="font-medium">{project.location || "California, USA"}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <FileText className="w-5 h-5 text-accent mt-1" />
                  <div>
                    <p className="text-sm text-gray-400">Industry</p>
                    <p className="font-medium">{project.industry || project.category}</p>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap gap-4 mt-8">
                {project.demoUrl && (
                  <Button
                    href={project.demoUrl}
                    className="flex items-center gap-2"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Globe className="w-5 h-5" /> Live Demo
                  </Button>
                )}
                {project.websiteUrl && (
                  <Button
                    href={project.websiteUrl}
                    variant="outline"
                    className="flex items-center gap-2"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <ExternalLink className="w-5 h-5" /> Visit Website
                  </Button>
                )}
                {project.githubUrl && (
                  <Button
                    href={project.githubUrl}
                    variant="ghost"
                    className="flex items-center gap-2"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FileText className="w-5 h-5" /> Source Code
                  </Button>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Objectives, Challenges, Solutions, Results */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Objectives */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="bg-black/40 backdrop-blur-sm rounded-xl border border-white/20 p-8"
            >
              <div className="flex items-center gap-3 mb-6">
                <Target className="w-8 h-8 text-accent" />
                <h3 className="text-2xl font-bold">Objectives</h3>
              </div>
              <ul className="space-y-4">
                {project.objectives.map((objective: string, index: number) => (
                  <li key={index} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-accent shrink-0 mt-1" />
                    <span>{objective}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Challenges */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="bg-black/40 backdrop-blur-sm rounded-xl border border-white/20 p-8"
            >
              <div className="flex items-center gap-3 mb-6">
                <Zap className="w-8 h-8 text-accent" />
                <h3 className="text-2xl font-bold">Challenges</h3>
              </div>
              <ul className="space-y-4">
                {project.challenges.map((challenge: string, index: number) => (
                  <li key={index} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-accent shrink-0 mt-1" />
                    <span>{challenge}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Solutions */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="bg-black/40 backdrop-blur-sm rounded-xl border border-white/20 p-8"
            >
              <div className="flex items-center gap-3 mb-6">
                <Zap className="w-8 h-8 text-accent" />
                <h3 className="text-2xl font-bold">Solutions</h3>
              </div>
              <ul className="space-y-4">
                {project.solutions.map((solution: string, index: number) => (
                  <li key={index} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-accent shrink-0 mt-1" />
                    <span>{solution}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Results */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="bg-black/40 backdrop-blur-sm rounded-xl border border-white/20 p-8"
            >
              <div className="flex items-center gap-3 mb-6">
                <Trophy className="w-8 h-8 text-accent" />
                <h3 className="text-2xl font-bold">Results</h3>
              </div>
              <ul className="space-y-4">
                {project.results.map((result: string, index: number) => (
                  <li key={index} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-accent shrink-0 mt-1" />
                    <span>{result}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-gradient-to-t from-black to-primary/20">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.9 }}
          >
            <h2 className="text-3xl font-bold mb-6">Ready to Start Your Project?</h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto mb-8">
              Let's discuss how we can help you achieve similar results for your business.
            </p>
            <Link to="/contact">
              <Button size="lg">
                Contact Us Today
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default CaseStudyDetail;
