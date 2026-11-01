import { motion, useReducedMotion, useScroll, useSpring } from 'framer-motion';
import { useId, useRef } from 'react';

export type ScrollLineProps = {
  path?: string;
  d?: string;
  direction?: 'ltr' | 'rtl';
  viewBox?: string;
  className?: string;
};

/**
 * Shared curved background line that draws itself as the page scrolls.
 * Reuses the purple-gradient stroke, strokeWidth 1.5, pointer-events none, aria-hidden.
 */
export default function ScrollLine({
  path,
  d,
  direction = 'ltr',
  viewBox = '0 0 420 260',
  className = '',
}: ScrollLineProps) {
  const pathData = path ?? d ?? '';
  const gradId = useId();
  const ref = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 90%', 'end 40%'],
  });

  const len = useSpring(scrollYProgress, {
    stiffness: 80,
    damping: 22,
  });

  return (
    <div
      ref={ref}
      className={`pointer-events-none select-none ${className}`}
      aria-hidden="true"
    >
      <svg
        viewBox={viewBox}
        className="h-full w-full"
        fill="none"
      >
        <defs>
          <linearGradient
            id={gradId}
            x1={direction === 'rtl' ? '100%' : '0%'}
            y1="0%"
            x2={direction === 'rtl' ? '0%' : '100%'}
            y2="100%"
          >
            <stop offset="0%" stopColor="#35145B" />
            <stop offset="55%" stopColor="#54258A" />
            <stop offset="100%" stopColor="#7950B5" />
          </linearGradient>
        </defs>
        <motion.path
          d={pathData}
          stroke={`url(#${gradId})`}
          strokeWidth="1.5"
          strokeLinecap="round"
          style={shouldReduceMotion ? { pathLength: 1 } : { pathLength: len }}
        />
      </svg>
    </div>
  );
}
