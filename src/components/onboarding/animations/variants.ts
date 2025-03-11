import type { Variants } from 'framer-motion';

export const createSlideVariants = (prefersReducedMotion: boolean): Variants => ({
  enter: (direction: number) => ({
    x: prefersReducedMotion ? 0 : direction > 0 ? 50 : -50,
    opacity: 0
  }),
  center: {
    x: 0,
    opacity: 1
  },
  exit: (direction: number) => ({
    x: prefersReducedMotion ? 0 : direction < 0 ? 50 : -50,
    opacity: 0
  })
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