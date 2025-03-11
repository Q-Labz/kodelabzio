import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Calendar, Clock, ArrowRight } from 'lucide-react';
import Button from '../ui/Button';

const latestPost = {
  title: 'The Future of AI in Web Development',
  excerpt: 'Explore how artificial intelligence is revolutionizing web development and what it means for developers and businesses alike.',
  image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=1600',
  date: 'March 14, 2024',
  readTime: '5 min read',
  author: {
    name: 'Brian Thomas',
    role: 'CEO & Lead Developer'
  }
};

const BlogPreview: React.FC = () => {
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
            Latest <span className="text-accent">Insights</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Stay updated with our latest thoughts and discoveries
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-4xl mx-auto"
        >
          <div className="bg-deep-brown-200/40 backdrop-blur-sm rounded-xl border border-white/20 overflow-hidden">
            <div className="relative h-[300px]">
              <img
                src={latestPost.image}
                alt={latestPost.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent" />
            </div>
            
            <div className="p-8">
              <div className="flex items-center gap-4 text-sm text-gray-400 mb-4">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  {latestPost.date}
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  {latestPost.readTime}
                </div>
              </div>

              <h3 className="text-3xl font-bold mb-4">{latestPost.title}</h3>
              <p className="text-gray-300 text-lg mb-6">{latestPost.excerpt}</p>

              <div className="flex items-center justify-between">
                <div>
                  <p className="font-semibold">{latestPost.author.name}</p>
                  <p className="text-sm text-gray-400">{latestPost.author.role}</p>
                </div>

                <Button
                  as="a"
                  href="/blog"
                  variant="outline"
                  className="group"
                >
                  Read More
                  <ArrowRight className="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform" />
                </Button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default BlogPreview;