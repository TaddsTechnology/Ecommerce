'use client';

import { useRef, useCallback } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

export interface AnimationConfig {
  duration?: number;
  delay?: number;
  ease?: string;
}

export const defaultConfig: AnimationConfig = {
  duration: 0.6,
  ease: 'power3.out',
};

export function useReveal(config: AnimationConfig = {}) {
  const ref = useRef<HTMLElement>(null);
  const { duration, ease } = { ...defaultConfig, ...config };

  useGSAP(() => {
    if (!ref.current) return;
    
    gsap.fromTo(
      ref.current,
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration, ease, scrollTrigger: ref.current }
    );
  }, { scope: ref });

  return ref;
}

export function useStaggerReveal(
  items: number,
  config: AnimationConfig = {}
) {
  const ref = useRef<HTMLElement>(null);
  const { duration = 0.5, delay = 0.1, ease = 'power3.out' } = config;

  useGSAP(() => {
    if (!ref.current) return;

    gsap.fromTo(
      ref.current.children,
      { y: 20, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration,
        stagger: delay,
        ease,
        scrollTrigger: {
          trigger: ref.current,
          start: 'top 80%',
        },
      }
    );
  }, { scope: ref });

  return ref;
}

export function useHoverScale(config: AnimationConfig = {}) {
  const ref = useRef<HTMLElement>(null);
  const { duration = 0.3 } = config;

  useGSAP(() => {
    if (!ref.current) return;

    ref.current.addEventListener('mouseenter', () => {
      gsap.to(ref.current, { scale: 1.05, duration, ease: 'power2.out' });
    });
    ref.current.addEventListener('mouseleave', () => {
      gsap.to(ref.current, { scale: 1, duration, ease: 'power2.out' });
    });
  });

  return ref;
}

export function useScrollReveal(direction: 'up' | 'down' | 'left' | 'right' = 'up') {
  const ref = useRef<HTMLElement>(null);
  
  const getFrom = useCallback(() => {
    switch (direction) {
      case 'up': return { y: 50, opacity: 0 };
      case 'down': return { y: -50, opacity: 0 };
      case 'left': return { x: 50, opacity: 0 };
      case 'right': return { x: -50, opacity: 0 };
    }
  }, [direction]);

  useGSAP(() => {
    if (!ref.current) return;

    gsap.fromTo(ref.current, getFrom(), {
      x: 0,
      y: 0,
      opacity: 1,
      duration: 0.8,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: ref.current,
        start: 'top 85%',
      },
    });
  }, { scope: ref });

  return ref;
}

export function useFadeIn() {
  const ref = useRef<HTMLElement>(null);

  useGSAP(() => {
    if (!ref.current) return;

    gsap.fromTo(
      ref.current,
      { opacity: 0 },
      { opacity: 1, duration: 0.5, ease: 'power2.out' }
    );
  }, { scope: ref });

  return ref;
}

export { gsap };