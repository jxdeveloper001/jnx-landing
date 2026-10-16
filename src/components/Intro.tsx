import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';
/** Page-load intro: wordmark draws itself, then the white screen slides up. */
export default function Intro() {
  const [show, setShow] = useState(true);
  useEffect(() => { const t = setTimeout(() => setShow(false), 1400); return () => clearTimeout(t); }, []);
  return (
    <AnimatePresence>
      {show && (
        <motion.div className="fixed inset-0 z-[100] grid place-items-center bg-white" exit={{ y: '-100%' }} transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}>
          <svg viewBox="0 0 230 70" className="w-56" aria-label="JNX">
            <motion.path d="M20 6 L38 40 H2 Z" fill="none" stroke="#0A0A0A" strokeWidth="3" strokeLinejoin="round" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.8 }} />
            <motion.text x="52" y="52" fontSize="56" fontWeight="800" fontFamily="Outfit, sans-serif" stroke="#0A0A0A" strokeWidth="1.5"
              initial={{ strokeDashoffset: 500, fillOpacity: 0 }} animate={{ strokeDashoffset: 0, fillOpacity: 1 }} style={{ strokeDasharray: 500 }} fill="#0A0A0A" transition={{ duration: 1, ease: 'easeInOut' }}>JNX</motion.text>
          </svg>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
