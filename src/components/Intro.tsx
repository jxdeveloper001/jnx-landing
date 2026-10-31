import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';

/** Page-load intro: logo reveals itself, then the white screen slides up. */
export default function Intro() {
  const [show, setShow] = useState(true);
  useEffect(() => {
    const t = setTimeout(() => setShow(false), 1400);
    return () => clearTimeout(t);
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed inset-0 z-[100] grid place-items-center bg-white"
          exit={{ y: '-100%' }}
          transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.94, clipPath: 'inset(0 100% 0 0)' }}
            animate={{ opacity: 1, scale: 1, clipPath: 'inset(0 0% 0 0)' }}
            transition={{
              duration: 1,
              ease: 'easeInOut',
            }}
            className="flex items-center justify-center select-none"
          >
            <img
              src="/images/jnx-logo.png"
              alt="JNX"
              width="284"
              height="140"
              className="w-64 sm:w-72 h-auto object-contain"
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
