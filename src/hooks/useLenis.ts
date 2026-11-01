import { useEffect } from 'react';
import Lenis from 'lenis';

export function useLenis() {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    // syncTouch: false prevents Lenis from hijacking native mobile momentum scrolling
    const lenis = new Lenis({
      lerp: 0.1,
      duration: 1.2,
      smoothWheel: true,
      syncTouch: false,
    });
    window.__lenis = lenis;

    let id = 0;
    let isPaused = false;

    const raf = (t: number) => {
      if (!isPaused) {
        lenis.raf(t);
      }
      id = requestAnimationFrame(raf);
    };
    id = requestAnimationFrame(raf);

    // Pause RAF when document is hidden (user switched tabs) to save CPU & battery
    const handleVisibility = () => {
      isPaused = document.hidden;
    };
    document.addEventListener('visibilitychange', handleVisibility);

    return () => {
      cancelAnimationFrame(id);
      document.removeEventListener('visibilitychange', handleVisibility);
      lenis.destroy();
      window.__lenis = undefined;
    };
  }, []);
}
