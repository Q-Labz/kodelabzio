import type { Variants } from 'framer-motion';

export const createSlideVariants = (prefersReducedMotion: boolean): Variants => ({
  enter: {
    x: prefersReducedMotion ? 0 : 50,
    opacity: 0
  },
  center: {
    x: 0,
    opacity: 1
  },
  exit: {
    x: prefersReducedMotion ? 0 : -50,
    opacity: 0
  }
});

export const createFadeVariants = (prefersReducedMotion: boolean): Variants => ({
  hidden: { 
    opacity: 0,
    scale: prefersReducedMotion ? 1 : 0.95
  },
  visible: { 
    opacity: 1,
    scale: 1
  },
  exit: { 
    opacity: 0,
    scale: prefersReducedMotion ? 1 : 0.95
  }
});