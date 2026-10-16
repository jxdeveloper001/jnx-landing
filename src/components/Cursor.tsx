import { motion, useMotionValue, useSpring } from 'framer-motion';
import { useEffect, useState } from 'react';
/** Black dot + grey ring that scales over interactive elements. */
export default function Cursor() {
  const x = useMotionValue(-100), y = useMotionValue(-100);
  const rx = useSpring(x, { stiffness: 160, damping: 18 }), ry = useSpring(y, { stiffness: 160, damping: 18 });
  const [on, setOn] = useState(false), [hover, setHover] = useState(false);
  useEffect(() => {
    if (!window.matchMedia('(pointer: fine)').matches) return;
    setOn(true); document.documentElement.classList.add('has-cursor');
    const move = (e: MouseEvent) => { x.set(e.clientX); y.set(e.clientY); setHover(!!(e.target as HTMLElement).closest('a,button,label,[data-hover]')); };
    window.addEventListener('mousemove', move);
    return () => { window.removeEventListener('mousemove', move); document.documentElement.classList.remove('has-cursor'); };
  }, [x, y]);
  if (!on) return null;
  return (
    <>
      <motion.div aria-hidden className="pointer-events-none fixed left-0 top-0 z-[200] -ml-1 -mt-1 h-2 w-2 rounded-full bg-ink" style={{ x, y }} />
      <motion.div aria-hidden className="pointer-events-none fixed left-0 top-0 z-[199] -ml-[18px] -mt-[18px] h-9 w-9 rounded-full border border-neutral-400" style={{ x: rx, y: ry }} animate={{ scale: hover ? 1.7 : 1 }} />
    </>
  );
}
