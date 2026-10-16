import { motion, useScroll, useSpring } from 'framer-motion';
import { useRef } from 'react';

/** Hand-drawn spark; strokes draw in on view. */
export function Spark({ className = 'h-8 w-8' }: { className?: string }) {
  const p = { initial: { pathLength: 0 }, whileInView: { pathLength: 1 }, viewport: { once: true }, transition: { duration: 0.7, ease: 'easeOut' as const } };
  return (
    <svg viewBox="0 0 40 40" className={className} fill="none" stroke="#0A0A0A" strokeWidth="3" strokeLinecap="round" aria-hidden>
      <motion.path d="M8 6 L14 16" {...p} /><motion.path d="M22 3 L22 15" {...p} transition={{ ...p.transition, delay: 0.15 }} />
      <motion.path d="M36 8 L28 17" {...p} transition={{ ...p.transition, delay: 0.3 }} />
    </svg>
  );
}

/** Scribble underline that draws itself. */
export function Scribble({ delay = 0, className = '' }: { delay?: number; className?: string }) {
  return (
    <svg viewBox="0 0 300 24" className={className} fill="none" aria-hidden preserveAspectRatio="none">
      <motion.path d="M4 16 C 50 4, 110 24, 170 10 S 260 18, 296 6" stroke="#3F3F46" strokeWidth="5" strokeLinecap="round"
        initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay, duration: 0.9, ease: 'easeInOut' }} />
    </svg>
  );
}

/** Thin curved line that draws as the page scrolls. */
export function ScrollLine({ d, viewBox = '0 0 400 400', className = '' }: { d: string; viewBox?: string; className?: string }) {
  const ref = useRef<SVGSVGElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 90%', 'end 40%'] });
  const len = useSpring(scrollYProgress, { stiffness: 80, damping: 22 });
  return (
    <svg ref={ref} viewBox={viewBox} className={className} fill="none" aria-hidden>
      <motion.path d={d} stroke="#0A0A0A" strokeWidth="1.5" strokeLinecap="round" style={{ pathLength: len }} />
    </svg>
  );
}
