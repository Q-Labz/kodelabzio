import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { cn } from '../../../../utils/cn';

interface NavigationButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'text';
  children: React.ReactNode;
}

const NavigationButton: React.FC<NavigationButtonProps> = ({
  variant = 'primary',
  children,
  className,
  ...props
}) => {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.button
      whileHover={{ scale: prefersReducedMotion ? 1 : 1.02 }}
      whileTap={{ scale: prefersReducedMotion ? 1 : 0.98 }}
      className={cn(
        'group flex items-center transition-colors disabled:opacity-50 disabled:cursor-not-allowed',
        {
          'bg-accent hover:bg-accent/90 text-white px-6 py-3 rounded-lg': variant === 'primary',
          'text-white hover:text-accent': variant === 'text'
        },
        className
      )}
      {...props}
    >
      {children}
    </motion.button>
  );
};

export default NavigationButton;