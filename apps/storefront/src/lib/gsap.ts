import gsap from 'gsap';
import ScrollTriggerPlugin from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTriggerPlugin);

export { gsap };

export const animations = {
  stagger: 0.1,
  duration: {
    fast: 0.3,
    normal: 0.5,
    slow: 0.8,
  },
} as const;

export function getStagger(index: number, base: number = 0.1) {
  return index * base;
}

export const revealDefaults = {
  from: { y: 30, opacity: 0 },
  to: { y: 0, opacity: 1, duration: 0.6, ease: 'power3.out' },
} as const;