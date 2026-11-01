import { useEffect, useState, type RefObject } from 'react';

/**
 * High-performance hook for decorative live background effects:
 * - Detects low-power devices and mobile screens on mount to reduce element density.
 * - Uses IntersectionObserver to pause all CSS animations when the section scrolls out of view.
 * - Handles tab visibilitychange to pause animations when the user switches tabs.
 * - Zero React re-renders during scrolling!
 */
export function useSectionLiveBg(
  sectionRef: RefObject<HTMLElement>,
  bgRef: RefObject<HTMLElement>
) {
  const [isLowPower, setIsLowPower] = useState(false);

  useEffect(() => {
    if (typeof navigator !== 'undefined') {
      const lowHardware = Boolean(navigator.hardwareConcurrency && navigator.hardwareConcurrency <= 4);
      const lowMem = Boolean((navigator as any).deviceMemory && (navigator as any).deviceMemory <= 4);
      const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
      if (lowHardware || lowMem || isMobile) {
        setIsLowPower(true);
      }
    }
  }, []);

  useEffect(() => {
    const bg = bgRef.current;
    const section = sectionRef.current;
    if (!bg || !section) return;

    const handleVisibility = () => {
      if (document.hidden) {
        bg.classList.add('is-paused');
      } else {
        bg.classList.remove('is-paused');
      }
    };
    document.addEventListener('visibilitychange', handleVisibility);

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          bg.classList.remove('is-paused');
        } else {
          bg.classList.add('is-paused');
        }
      },
      { rootMargin: '120px' }
    );
    observer.observe(section);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibility);
      observer.disconnect();
    };
  }, [sectionRef, bgRef]);

  return { isLowPower };
}
