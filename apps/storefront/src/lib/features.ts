'use client';

export const FEATURES = {
  animations: process.env.NEXT_PUBLIC_ANIMATIONS === 'true',
} as const;

export const ANIMATION_CONFIG = {
  stagger: 0.1,
  duration: {
    fast: 0.3,
    normal: 0.5,
    slow: 0.8,
  },
} as const;
