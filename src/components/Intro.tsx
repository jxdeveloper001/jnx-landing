import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { useEffect, useState } from 'react';

const EASE_OUT: [number, number, number, number] = [0.22, 1, 0.36, 1];
const EASE_SHUTTER: [number, number, number, number] = [0.76, 0, 0.24, 1];

/** Natural size of /images/jnx-logo.png, used to cut it into its own parts. */
const W = 709;
const H = 352;
const pct = (x: number, total: number) => `${((x / total) * 100).toFixed(2)}%`;
const poly = (pts: [number, number][]) =>
  `polygon(${pts.map(([x, y]) => `${pct(x, W)} ${pct(y, H)}`).join(', ')})`;

/**
 * The logo's own parts, cut with clip-paths along the empty gaps between them.
 * Every piece is the same untouched asset; together they cover the whole image.
 * `from` is where each piece starts relative to its final spot.
 */
const PIECES: {
  clip: string;
  from: { x?: number; y?: number; scale?: number; rotate?: number };
  delay: number;
}[] = [
  // mark (J-box and shoe base)
  { clip: poly([[0, 0], [288, 0], [288, 210], [0, 210]]), from: { x: -70, y: 10, rotate: -6 }, delay: 0.1 },
  // chevrons beneath the mark
  { clip: poly([[0, 210], [288, 210], [288, H], [0, H]]), from: { y: 46 }, delay: 0.3 },
  // J
  { clip: poly([[288, 0], [350, 0], [350, H], [288, H]]), from: { y: -54 }, delay: 0.38 },
  // N
  { clip: poly([[350, 0], [447, 0], [447, H], [350, H]]), from: { y: 54 }, delay: 0.46 },
  // X and its lower arc (everything right of N, minus the dot's corner)
  {
    clip: poly([[447, 0], [528, 0], [528, 124], [W, 124], [W, H], [447, H]]),
    from: { scale: 1.22, rotate: -8 },
    delay: 0.56,
  },
  // the purple dot lands last
  { clip: poly([[528, 0], [W, 0], [W, 124], [528, 124]]), from: { x: 120, y: -90 }, delay: 0.82 },
];

const LOGO_CLASS = 'h-auto w-64 object-contain sm:w-72';
const MIN_SHOW_MS = 2300;

/**
 * Intro: the logo is assembled from its own parts, a ring pulses from its dot, then the whole
 * screen lifts upward like a shutter to reveal the already-rendered page underneath.
 * Transform / opacity / clip-path only.
 */
export default function Intro() {
  const reduce = useReducedMotion();
  const [show, setShow] = useState(true);

  useEffect(() => {
    const root = document.documentElement;
    root.style.overflow = 'hidden';

    const minTime = new Promise<void>((r) => setTimeout(r, reduce ? 500 : MIN_SHOW_MS));
    // Wait for fonts and the window load (capped) so the page beneath is ready when the shutter lifts
    const ready = Promise.race([
      Promise.all([
        document.fonts?.ready ?? Promise.resolve(),
        document.readyState === 'complete'
          ? Promise.resolve()
          : new Promise<void>((r) => window.addEventListener('load', () => r(), { once: true })),
      ]),
      new Promise<void>((r) => setTimeout(r, 4500)),
    ]);
    let cancelled = false;
    Promise.all([minTime, ready]).then(() => {
      if (cancelled) return;
      // Tell the page the shutter is about to lift so its entrance can play underneath
      window.__introLifted = true;
      window.dispatchEvent(new Event('jnx:intro-lift'));
      setShow(false);
    });

    return () => {
      cancelled = true;
      root.style.overflow = '';
    };
  }, [reduce]);

  // Release scroll as soon as the shutter starts moving
  useEffect(() => {
    if (!show) document.documentElement.style.overflow = '';
  }, [show]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed inset-0 z-[100] grid place-items-center bg-white shadow-[0_40px_60px_-30px_rgba(36,17,61,0.28)]"
          exit={{ y: '-100%' }}
          transition={{ duration: 0.95, ease: EASE_SHUTTER }}
        >
          <div className="flex select-none flex-col items-center">
            <div className="relative" role="img" aria-label="JNX">
              {/* Construction ticks: frame the build, then step aside */}
              {['left-[16%] top-[20%] border-l-2 border-t-2', 'right-[16%] top-[20%] border-r-2 border-t-2', 'left-[16%] bottom-[20%] border-b-2 border-l-2', 'right-[16%] bottom-[20%] border-b-2 border-r-2'].map((c) => (
                <motion.span
                  key={c}
                  aria-hidden="true"
                  initial={{ opacity: 0, scale: 1.25 }}
                  animate={{ opacity: [0, 1, 1, 0], scale: [1.25, 1, 1, 1] }}
                  transition={{ duration: 1.5, times: [0, 0.25, 0.8, 1], ease: EASE_OUT }}
                  className={`absolute h-3 w-3 border-[#B69AE8] ${c}`}
                />
              ))}

              {PIECES.map((p, i) => (
                <motion.img
                  key={i}
                  src="/images/jnx-logo.png"
                  alt=""
                  aria-hidden="true"
                  width="284"
                  height="140"
                  draggable={false}
                  initial={{ opacity: 0, x: 0, y: 0, scale: 1, rotate: 0, ...p.from }}
                  animate={{ opacity: 1, x: 0, y: 0, scale: 1, rotate: 0 }}
                  transition={{
                    delay: p.delay,
                    duration: 0.8,
                    ease: EASE_OUT,
                    opacity: { delay: p.delay, duration: 0.35 },
                  }}
                  className={`${LOGO_CLASS} ${i === 0 ? '' : 'absolute inset-0'}`}
                  style={{ clipPath: p.clip, willChange: 'transform, opacity' }}
                />
              ))}

              {/* Ring pulsing out from the logo's own purple dot once everything has landed */}
              <motion.span
                aria-hidden="true"
                initial={{ x: '-50%', y: '-50%', scale: 0.2, opacity: 0 }}
                animate={{ x: '-50%', y: '-50%', scale: [0.2, 2.6], opacity: [0.7, 0] }}
                transition={{ delay: 1.45, duration: 0.8, ease: EASE_OUT }}
                className="pointer-events-none absolute h-8 w-8 rounded-full border-2 border-[#7950B5]"
                style={{ left: '77.8%', top: '30%' }}
              />

              {/* Lavender light pass: the finishing touch */}
              <motion.span
                aria-hidden="true"
                initial={{ x: '-8%', opacity: 0 }}
                animate={{ x: '1000%', opacity: [0, 1, 1, 0] }}
                transition={{ delay: 1.4, duration: 0.75, ease: [0.45, 0, 0.25, 1], times: [0, 0.15, 0.8, 1] }}
                className="pointer-events-none absolute inset-y-[20%] left-0 w-[2px] bg-gradient-to-b from-transparent via-[#B69AE8] to-transparent"
                style={{ willChange: 'transform' }}
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
