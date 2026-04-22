'use client';

import { ReactNode, useEffect, Suspense } from 'react';
import Lenis from 'lenis';
import { usePathname } from 'next/navigation';

interface LenisProviderProps {
  children: ReactNode;
}

export function LenisProvider({ children }: LenisProviderProps) {
  return (
    <Suspense fallback={null}>
      <LenisInner>{children}</LenisInner>
    </Suspense>
  );
}

function LenisInner({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
      infinite: false,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    lenis.on('scroll', ({ scroll, limit }: { scroll: number; limit: number }) => {
      // Scroll progress for potential use in components
      if (typeof window !== 'undefined') {
        (window as unknown as { __scrollProgress: number }).__scrollProgress = scroll / limit;
      }
    });

    return () => {
      lenis.destroy();
    };
  }, []);

  // Reset scroll position on route change
  useEffect(() => {
    const lenis = new Lenis();
    lenis.scrollTo(0, { immediate: true });
    return () => lenis.destroy();
  }, [pathname]);

  return <>{children}</>;
}

export function useSmoothScroll() {
  return null;
}