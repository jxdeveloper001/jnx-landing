import { animate, motion, useInView } from 'framer-motion';
import { useEffect, useRef } from 'react';
import { content } from '../content';

function Counter({ to, suffix, decimals }: { to: number; suffix: string; decimals: number }) {
  const rootRef = useRef<HTMLSpanElement>(null);
  const intRef = useRef<HTMLSpanElement>(null);
  const decRef = useRef<HTMLSpanElement>(null);
  const inView = useInView(rootRef, { once: true, margin: '-20px' });

  useEffect(() => {
    if (!inView) return;
    const c = animate(0, to, {
      duration: 1.5,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => {
        const [intPart, decPart] = v.toFixed(decimals).split('.');
        if (intRef.current) intRef.current.textContent = intPart;
        if (decRef.current && decPart !== undefined) decRef.current.textContent = decPart;
      },
    });
    return () => c.stop();
  }, [inView, to, decimals]);

  const hasPlus = suffix.includes('+');
  const cleanSuffix = suffix.replace('+', '');

  return (
    <span ref={rootRef} className="text-white">
      <span ref={intRef}>0</span>
      {decimals > 0 && (
        <>
          <span className="text-[var(--purple-bright)] [text-shadow:0_0_16px_rgba(121,80,181,0.6)]">.</span>
          <span ref={decRef}>{'0'.repeat(decimals)}</span>
        </>
      )}
      {cleanSuffix}
      {hasPlus && <span className="text-[var(--purple-bright)] [text-shadow:0_0_16px_rgba(121,80,181,0.6)]">+</span>}
    </span>
  );
}

/** Deep black band with faint purple glow that slides up over the hero. */
export default function StatsStrip() {
  return (
    <div className="container-x relative z-10 -mt-10 sm:-mt-16 md:-mt-24">
      <motion.div
        initial={{ y: 60, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true, margin: '-20px' }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="ambient-dark grid grid-cols-2 gap-y-7 gap-x-2 rounded-[24px] sm:rounded-[28px] bg-gradient-to-br from-[#0A0A0F] to-[#24113D] px-3 py-7 sm:px-6 sm:py-10 text-white shadow-[0_2px_4px_rgba(36,17,61,0.12),0_26px_50px_-22px_rgba(84,37,138,0.6)] md:grid-cols-4 md:divide-x md:divide-white/[0.14]"
      >
        {content.stats.map((s) => (
          <div key={s.label} className="px-2 sm:px-4 text-center">
            <p className="text-3xl min-[360px]:text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white">
              <Counter to={s.value} suffix={s.suffix} decimals={s.decimals} />
            </p>
            <p className="mt-1.5 sm:mt-2 text-xs sm:text-sm text-[var(--on-dark-muted)] leading-tight">
              {s.label}
            </p>
          </div>
        ))}
      </motion.div>
    </div>
  );
}
