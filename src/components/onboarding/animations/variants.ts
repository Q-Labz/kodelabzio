import { Variants } from 'framer-motion';

export const slideVariants: Variants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 1000 : -1000,
    opacity: 0,
    transition: {
      type: 'spring',
      stiffness: 300,
      damping: 30
    }
  }),
  center: {
    x: 0,
    opacity: 1,
    transition: {
      type: 'spring',
      stiffness: 300,
      damping: 30
    }
  },
  exit: (direction: number) => ({
    x: direction < 0 ? 1000 : -1000,
    opacity: 0,
    transition: {
      type: 'spring',
      stiffness: 300,
      damping: 30
    }
  })
};

export const fadeVariants: Variants = {
  hidden: { 
    opacity: 0,
    transition: {
      duration: 0.2
    }
  },
  visible: { 
    opacity: 1,
    transition: {
      duration: 0.2
    }
  },
  exit: { 
    opacity: 0,
    transition: {
      duration: 0.2
    }
  }
};