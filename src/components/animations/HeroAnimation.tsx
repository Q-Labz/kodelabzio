import React from 'react';
import { motion } from 'framer-motion';

const HeroAnimation: React.FC = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Grid Pattern */}
      <div className="absolute inset-0">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.1 }}
          transition={{ duration: 1 }}
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.15) 1px, transparent 0)`,
            backgroundSize: '40px 40px'
          }}
        />
      </div>

      {/* Animated Circles */}
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 0.3 }}
        transition={{
          duration: 2,
          repeat: Infinity,
          repeatType: "reverse"
        }}
        className="absolute top-1/4 left-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl"
      />
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 0.2 }}
        transition={{
          duration: 3,
          repeat: Infinity,
          repeatType: "reverse",
          delay: 0.5
        }}
        className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-accent/20 rounded-full blur-3xl"
      />

      {/* Floating Elements */}
      {[...Array(3)].map((_, i) => (
        <motion.div
          key={i}
          initial={{ y: 0 }}
          animate={{ y: [-20, 20] }}
          transition={{
            duration: 4,
            repeat: Infinity,
            repeatType: "reverse",
            delay: i * 0.5
          }}
          className="absolute"
          style={{
            left: `${20 + i * 30}%`,
            top: `${30 + i * 20}%`,
            width: `${40 + i * 10}px`,
            height: `${40 + i * 10}px`,
            background: `rgba(255, 107, 53, ${0.1 + i * 0.05})`,
            borderRadius: '30% 70% 70% 30% / 30% 30% 70% 70%'
          }}
        />
      ))}
    </div>
  );
};

export default HeroAnimation;