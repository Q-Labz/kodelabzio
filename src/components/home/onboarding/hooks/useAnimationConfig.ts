import { useReducedMotion } from 'framer-motion';

export const useAnimationConfig = () => {
  const prefersReducedMotion = useReducedMotion();

  return {
    transition: {
      type: prefersReducedMotion ? 'tween' : 'spring',
      stiffness: 300,
      damping: 30,
      duration: prefersReducedMotion ? 0.1 : undefined
    }
  };
};