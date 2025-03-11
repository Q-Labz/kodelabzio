import React from 'react';
import { motion } from 'framer-motion';

interface StepConnectorProps {
  isCompleted: boolean;
  transition: any;
}

export const StepConnector: React.FC<StepConnectorProps> = ({
  isCompleted,
  transition
}) => {
  return (
    <motion.div
      animate={{
        backgroundColor: isCompleted ? 'rgb(255, 107, 53)' : 'rgb(55, 65, 81)'
      }}
      transition={transition}
      className="w-12 h-px mx-2"
    />
  );
};