import { motion } from 'framer-motion';
import { useMemo } from 'react';
import { Landscape } from './Illustrations';

// [cx, cy, rx, ry] ellipses approximating continents on a 100x50 grid
const LAND: [number, number, number, number][] = [
  [20, 16, 13, 9], [33, 6, 4, 3], [24, 26, 4, 4], [29, 37, 5, 10], [49, 13, 6, 5],
  [51, 29, 7, 10], [68, 15, 16, 9], [65, 27, 3, 5], [76, 28, 5, 3], [83, 39, 6, 4],
];
const PINS = [
  { x: 19, y: 34 }, { x: 30, y: 74 }, { x: 49, y: 30 }, { x: 54, y: 64 }, { x: 71, y: 36 }, { x: 80, y: 78 }, { x: 61, y: 58 },
];
const ACTIVE = 3;

/** Halftone dotted world map with bouncing image pins. */
export default function WorldMap({ pins = true, className = '' }: { pins?: boolean; className?: string }) {
  const dots = useMemo(() => {
    const out: { x: number; y: number }[] = [];
    for (let y = 1; y < 50; y += 1.3) for (let x = 1; x < 100; x += 1.3)
      if (LAND.some(([cx, cy, rx, ry]) => ((x - cx) / rx) ** 2 + ((y - cy) / ry) ** 2 <= 1)) out.push({ x, y });
    return out;
  }, []);
  return (
    <div className={`relative aspect-[2/1] w-full ${className}`}>
      <svg viewBox="0 0 100 50" className="absolute inset-0 h-full w-full" aria-hidden>
        {dots.map((d, i) => <circle key={i} cx={d.x} cy={d.y} r="0.38" fill="#D4D4D8" />)}
      </svg>
      {pins && PINS.map((p, i) => {
        const active = i === ACTIVE, size = active ? 'h-20 w-20' : 'h-14 w-14';
        return (
          <motion.div key={i} className="absolute -translate-x-1/2 -translate-y-full" style={{ left: `${p.x}%`, top: `${p.y}%` }}
            initial={{ y: -80, opacity: 0, scale: 0.6 }} whileInView={{ y: 0, opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ type: 'spring', bounce: 0.55, duration: 0.9, delay: 0.3 + i * 0.15 }}>
            <div className="relative flex flex-col items-center">
              {active && <motion.span aria-hidden className="absolute left-1/2 top-1/2 -ml-10 -mt-10 h-20 w-20 rounded-full border-2 border-ink" animate={{ scale: [1, 1.7], opacity: [0.4, 0] }} transition={{ duration: 1.8, repeat: Infinity }} />}
              <div className={`${size} overflow-hidden rounded-full border-4 border-white shadow-card`}><Landscape v={i} /></div>
              <span className="h-2 w-px bg-ink/40" /><span className="h-2 w-2 rounded-full bg-ink" />
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
