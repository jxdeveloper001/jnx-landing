import { animate, motion, useInView } from 'framer-motion';
import { useEffect, useRef } from 'react';
import { content } from '../content';

function Counter({ to, suffix, decimals }: { to: number; suffix: string; decimals: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  useEffect(() => {
    if (!inView) return;
    const c = animate(0, to, { duration: 1.5, ease: 'easeOut', onUpdate: (v) => { if (ref.current) ref.current.textContent = v.toFixed(decimals) + suffix; } });
    return () => c.stop();
  }, [inView, to, suffix, decimals]);
  return <span ref={ref}>{(0).toFixed(decimals)}{suffix}</span>;
}
/** Black band that slides up over the hero. */
export default function StatsStrip() {
  return (
    <div className="container-x relative z-10 -mt-24">
      <motion.div initial={{ y: 90, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} viewport={{ once: true, margin: '-60px' }} transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        className="grid grid-cols-2 gap-y-8 rounded-[28px] bg-ink px-4 py-10 text-white md:grid-cols-4 md:divide-x md:divide-white/15">
        {content.stats.map((s) => (
          <div key={s.label} className="px-4 text-center">
            <p className="text-5xl font-bold tracking-tight md:text-6xl"><Counter to={s.value} suffix={s.suffix} decimals={s.decimals} /></p>
            <p className="mt-2 text-sm text-neutral-400">{s.label}</p>
          </div>
        ))}
      </motion.div>
    </div>
  );
}
