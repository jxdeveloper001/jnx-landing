import { motion } from 'framer-motion';
import type { ReactNode } from 'react';
import { EASE } from '../lib/motion';
/** Fade-up + blur-to-sharp reveal, once, on enter. */
export default function Reveal({ children, delay = 0, y = 32, className }: { children: ReactNode; delay?: number; y?: number; className?: string }) {
  return (
    <motion.div className={className} initial={{ opacity: 0, y, filter: 'blur(8px)' }}
      whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }} viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.8, delay, ease: EASE }}>
      {children}
    </motion.div>
  );
}
