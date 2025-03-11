import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Helmet } from 'react-helmet-async';
import {
  ArrowRight,
  Brain,
  Code2,
  Smartphone,
  Globe,
  Target,
  Rocket,
  Award,
  Users,
  Heart,
  Shield,
  Zap,
  Trophy
} from 'lucide-react';

const ceoInfo = {
  name: 'Brian Thomas',
  role: 'CEO & Founder',
  image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=400&h=400',
  bio: 'A self-taught developer and designer with a passion for creating exceptional digital experiences. Brian started coding at age 15 and has since transformed his hobby into a successful agency, helping businesses across the globe achieve their digital goals. His unique perspective combines technical expertise with creative design thinking, allowing KodeLabz to deliver innovative solutions that stand out in the digital landscape.',
  expertise: [
    'Full-Stack Development',
    'UI/UX Design',
    'Digital Strategy',
    'Project Management',
    'Team Leadership',
    'Creative Direction'
  ]
};

const achievements = [
  {
    icon: <Trophy className="w-6 h-6" />,
    title: '50+ Successful Projects',
    description: 'Delivered high-impact solutions across various industries'
  },
  {
    icon: <Users className="w-6 h-6" />,
    title: '100+ Happy Clients',
    description: 'Maintained long-term relationships with satisfied customers'
  },
  {
    icon: <Globe className="w-6 h-6" />,
    title: 'Global Reach',
    description: 'Serving clients across 15+ countries worldwide'
  },
  {
    icon: <Award className="w-6 h-6" />,
    title: 'Industry Recognition',
    description: 'Multiple awards for innovation and excellence'
  }
];

const values = [
  {
    icon: <Heart className="w-6 h-6" />,
    title: 'Client-Centric',
    description: 'Your success is our priority'
  },
  {
    icon: <Shield className="w-6 h-6" />,
    title: 'Quality First',
    description: 'Uncompromising commitment to excellence'
  },
  {
    icon: <Zap className="w-6 h-6" />,
    title: 'Innovation',
    description: 'Pushing boundaries in technology'
  }
];

const futureInitiatives = [
  {
    icon: <Brain className="w-12 h-12" />,
    title: 'AI Integration',
    description: 'Leading the way in artificial intelligence solutions',
    points: [
      'Advanced machine learning implementations',
      'Natural language processing',
      'Computer vision solutions',
      'Predictive analytics'
    ]
  },
  {
    icon: <Smartphone className="w-12 h-12" />,
    title: 'Mobile Innovation',
    description: 'Next-generation mobile experiences',
    points: [
      'Cross-platform development',
      'Progressive Web Apps',
      'AR/VR integration',
      'IoT connectivity'
    ]
  },
  {
    icon: <Code2 className="w-12 h-12" />,
    title: 'Web Technologies',
    description: 'Advancing web development practices',
    points: [
      'Micro-frontend architecture',
      'Serverless solutions',
      'Edge computing',
      'Web3 integration'
    ]
  }
];

const AboutPage: React.FC = () => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  return (
    <>
      <Helmet>
        <title>About Us - KodeLabz | Innovation & Excellence in Digital Solutions</title>
        <meta name="description" content="Learn about KodeLabz's journey, our visionary leadership, and commitment to delivering innovative digital solutions. Meet our CEO and discover our values." />
      </Helmet>
      <div className="pt-20">
        {/* CEO Section */}
        <section className="py-24 bg-gradient-to-b from-deep-brown-100 to-deep-brown-300">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Meet the <span className="text-accent">CEO</span>
              </h1>
              <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                Visionary leadership driving innovation and excellence
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="max-w-4xl mx-auto bg-deep-brown-200/40 backdrop-blur-sm rounded-xl border border-white/20 overflow-hidden"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-8">
                <div className="relative h-[400px] md:h-auto">
                  <img
                    src={ceoInfo.image}
                    alt={ceoInfo.name}
                    className="w-full h-full object-cover rounded-lg"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-deep-brown-300 to-transparent rounded-lg" />
                </div>
                
                <div className="space-y-6">
                  <div>
                    <h2 className="text-3xl font-bold mb-2">{ceoInfo.name}</h2>
                    <p className="text-accent text-lg mb-4">{ceoInfo.role}</p>
                    <p className="text-gray-300">{ceoInfo.bio}</p>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold mb-3">Expertise</h3>
                    <div className="flex flex-wrap gap-2">
                      {ceoInfo.expertise.map((skill) => (
                        <span
                          key={skill}
                          className="bg-accent/10 text-accent px-3 py-1 rounded-full text-sm"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Achievements Section */}
        <section ref={ref} className="py-24 bg-gradient-to-b from-deep-brown-400 to-deep-brown-500">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Our <span className="text-accent">Achievements</span>
              </h2>
              <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                Milestones that mark our journey of excellence
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {achievements.map((achievement, index) => (
                <motion.div
                  key={achievement.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="bg-deep-brown-200/40 backdrop-blur-sm rounded-xl p-6 border border-white/20"
                >
                  <div className="text-accent mb-4">{achievement.icon}</div>
                  <h3 className="text-xl font-semibold mb-2">{achievement.title}</h3>
                  <p className="text-gray-300">{achievement.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="py-24 bg-gradient-to-b from-deep-brown-500 to-deep-brown-600">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Our <span className="text-accent">Values</span>
              </h2>
              <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                The principles that guide everything we do
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {values.map((value, index) => (
                <motion.div
                  key={value.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="bg-deep-brown-200/40 backdrop-blur-sm rounded-xl p-8 border border-white/20"
                >
                  <div className="text-accent mb-4">{value.icon}</div>
                  <h3 className="text-xl font-semibold mb-2">{value.title}</h3>
                  <p className="text-gray-300">{value.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Vision & Future */}
        <section className="py-24 bg-gradient-to-b from-deep-brown-600 to-black">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Vision & <span className="text-accent">Future</span>
              </h2>
              <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                Shaping the future of technology through innovation and excellence
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {futureInitiatives.map((initiative, index) => (
                <motion.div
                  key={initiative.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  className="bg-deep-brown-200/40 backdrop-blur-sm p-8 rounded-xl border border-white/20"
                >
                  <div className="text-accent mb-6">{initiative.icon}</div>
                  <h3 className="text-2xl font-bold mb-4">{initiative.title}</h3>
                  <p className="text-gray-300 mb-6">{initiative.description}</p>
                  <ul className="space-y-3">
                    {initiative.points.map((point) => (
                      <li key={point} className="flex items-center gap-2 text-gray-400">
                        <ArrowRight className="w-4 h-4 text-accent" />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default AboutPage;