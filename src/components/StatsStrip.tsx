import { animate, motion, useInView } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { content } from '../content';

function Counter({ to, suffix, decimals }: { to: number; suffix: string; decimals: number }) {
  const [val, setVal] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView) return;
    const c = animate(0, to, {
      duration: 1.5,
      ease: 'easeOut',
      onUpdate: (v) => setVal(v),
    });
    return () => c.stop();
  }, [inView, to]);

  const formatted = val.toFixed(decimals);
  const [intPart, decPart] = formatted.split('.');
  const hasPlus = suffix.includes('+');
  const cleanSuffix = suffix.replace('+', '');

  return (
    <span ref={ref} className="text-white">
      {intPart}
      {decPart !== undefined && (
        <>
          <span className="text-[var(--purple-bright)]">.</span>
          {decPart}
        </>
      )}
      {cleanSuffix}
      {hasPlus && <span className="text-[var(--purple-bright)]">+</span>}
    </span>
  );
}

/** Deep black band with faint purple glow that slides up over the hero. */
export default function StatsStrip() {
  return (
    <div className="container-x relative z-10 -mt-24">
      <motion.div
        initial={{ y: 90, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        className="grid grid-cols-2 gap-y-8 rounded-[28px] bg-gradient-to-br from-[#0A0A0F] to-[#150A2E] px-4 py-10 text-white shadow-lift md:grid-cols-4 md:divide-x md:divide-white/[0.14]"
      >
        {content.stats.map((s) => (
          <div key={s.label} className="px-4 text-center">
            <p className="text-5xl font-bold tracking-tight text-white md:text-6xl">
              <Counter to={s.value} suffix={s.suffix} decimals={s.decimals} />
            </p>
            <p className="mt-2 text-sm text-[var(--on-dark-muted)]">{s.label}</p>
          </div>
        ))}
      </motion.div>
    </div>
  );
}
