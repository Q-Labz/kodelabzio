import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle } from 'lucide-react';

const SuccessStep: React.FC = () => {
  return (
    <motion.div
      className="text-center space-y-6"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 30
      }}
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{
          type: "spring",
          stiffness: 260,
          damping: 20,
          delay: 0.2
        }}
      >
        <CheckCircle className="w-24 h-24 text-green-500 mx-auto" />
      </motion.div>

      <div>
        <motion.h2
          className="text-3xl font-bold mb-4"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          Thank You!
        </motion.h2>
        <motion.p
          className="text-gray-400 text-lg"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          Your project details have been submitted successfully.
          <br />
          Our team will review your requirements and get back to you soon.
        </motion.p>
      </div>

      <motion.div
        className="mt-8"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.8 }}
      >
        <p className="text-gray-400">
          If you have any questions in the meantime,
          <br />
          feel free to reach out to our support team.
        </p>
      </motion.div>
    </motion.div>
  );
};

export default SuccessStep;
