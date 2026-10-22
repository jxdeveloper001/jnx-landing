import { motion, useScroll, useSpring } from 'framer-motion';
import { useId, useRef } from 'react';

/** Hand-drawn spark; strokes draw in on view with purple-gradient stroke. */
export function Spark({
  className = 'h-8 w-8',
}: {
  className?: string;
}) {
  const gradId = useId();
  const p = {
    initial: { pathLength: 0 },
    whileInView: { pathLength: 1 },
    viewport: { once: true },
    transition: {
      duration: 0.7,
      ease: 'easeOut' as const,
    },
  };

  return (
    <svg
      viewBox="0 0 40 40"
      className={className}
      fill="none"
      stroke={`url(#${gradId})`}
      strokeWidth="3"
      strokeLinecap="round"
      aria-hidden
    >
      <defs>
        <linearGradient id={gradId} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#2B0B5E" />
          <stop offset="55%" stopColor="#4C1D95" />
          <stop offset="100%" stopColor="#7C3AED" />
        </linearGradient>
      </defs>
      <motion.path d="M8 6 L14 16" {...p} />

      <motion.path
        d="M22 3 L22 15"
        {...p}
        transition={{
          ...p.transition,
          delay: 0.15,
        }}
      />

      <motion.path
        d="M36 8 L28 17"
        {...p}
        transition={{
          ...p.transition,
          delay: 0.3,
        }}
      />
    </svg>
  );
}

/** Scribble underline that draws itself in purple-gradient. */
export function Scribble({
  delay = 0,
  className = '',
}: {
  delay?: number;
  className?: string;
}) {
  const gradId = useId();
  return (
    <svg
      viewBox="0 0 300 24"
      className={className}
      fill="none"
      aria-hidden
      preserveAspectRatio="none"
    >
      <defs>
        <linearGradient id={gradId} x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#2B0B5E" />
          <stop offset="55%" stopColor="#4C1D95" />
          <stop offset="100%" stopColor="#7C3AED" />
        </linearGradient>
      </defs>
      <motion.path
        d="M4 16 C 50 4, 110 24, 170 10 S 260 18, 296 6"
        stroke={`url(#${gradId})`}
        strokeWidth="5"
        strokeLinecap="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{
          delay,
          duration: 0.9,
          ease: 'easeInOut',
        }}
      />
    </svg>
  );
}

/** Thin curved line that draws as the page scrolls with purple-gradient stroke. */
export function ScrollLine({
  d,
  viewBox = '0 0 400 400',
  className = '',
}: {
  d: string;
  viewBox?: string;
  className?: string;
}) {
  const gradId = useId();
  const ref = useRef<HTMLDivElement>(null);

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
      className={className}
      aria-hidden="true"
    >
      <svg
        viewBox={viewBox}
        className="h-full w-full"
        fill="none"
      >
        <defs>
          <linearGradient id={gradId} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#2B0B5E" />
            <stop offset="55%" stopColor="#4C1D95" />
            <stop offset="100%" stopColor="#7C3AED" />
          </linearGradient>
        </defs>
        <motion.path
          d={d}
          stroke={`url(#${gradId})`}
          strokeWidth="1.5"
          strokeLinecap="round"
          style={{ pathLength: len }}
        />
      </svg>
    </div>
  );
}
