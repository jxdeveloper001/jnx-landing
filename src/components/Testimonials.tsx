import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, Star } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { content } from '../content';
import { useVisible } from '../hooks/useVisible';
import { ScrollLine, Spark } from './Doodles';
import { Avatar } from './Illustrations';
import Reveal from './Reveal';

function Stars({ rating }: { rating: number }) {
  return (
    <div className="flex gap-1" role="img" aria-label={`${rating} out of 5 stars`}>
      {[0, 1, 2, 3, 4].map((i) => {
        const f = Math.max(0, Math.min(1, rating - i));
        return (
          <span key={i} className="relative inline-block h-[18px] w-[18px]">
            <Star size={18} className="fill-neutral-200 text-neutral-200" />
            <span className="absolute inset-0 overflow-hidden" style={{ width: `${f * 100}%` }}><Star size={18} className="shrink-0 fill-ink text-ink" /></span>
          </span>
        );
      })}
    </div>
  );
}

export default function Testimonials() {
  const t = content.testimonials, items = t.items, vis = useVisible();
  const wrap = useRef<HTMLDivElement>(null);
  const [w, setW] = useState(1000), [i, setI] = useState(0);
  useEffect(() => {
    const el = wrap.current; if (!el) return;
    const ro = new ResizeObserver(() => setW(el.clientWidth)); ro.observe(el); setW(el.clientWidth);
    return () => ro.disconnect();
  }, []);
  const gap = 24, cw = (w - gap * (vis - 1)) / vis, max = Math.max(0, items.length - vis), idx = Math.min(i, max), step = cw + gap;
  const go = (d: number) => setI(Math.max(0, Math.min(max, idx + d)));
  return (
    <section id="blog" className="relative py-28">
      <ScrollLine className="pointer-events-none absolute left-0 top-10 hidden h-[260px] w-[420px] lg:block" viewBox="0 0 420 260" d="M0 20 C 120 0, 160 140, 280 120 S 400 200, 420 250" />
      <div className="container-x relative">
        <div className="flex items-end justify-between gap-6">
          <Reveal><h2 className="h2 relative max-w-xl">{t.title}<span className="absolute -right-4 -top-8 sm:right-24"><Spark /></span></h2></Reveal>
          <div className="flex gap-3">
            {[-1, 1].map((d) => (
              <motion.button key={d} whileTap={{ scale: 0.92 }} onClick={() => go(d)} disabled={d < 0 ? idx === 0 : idx === max} aria-label={d < 0 ? 'Previous testimonials' : 'Next testimonials'}
                className="grid h-12 w-12 place-items-center rounded-full border border-line bg-white shadow-card transition-colors hover:bg-ink hover:text-white disabled:opacity-40 disabled:hover:bg-white disabled:hover:text-ink">
                {d < 0 ? <ArrowLeft size={20} /> : <ArrowRight size={20} />}
              </motion.button>
            ))}
          </div>
        </div>
        <div ref={wrap} className="-mx-2 mt-14 overflow-hidden px-2 py-6" tabIndex={0} role="region" aria-roledescription="carousel" aria-label="Customer testimonials"
          onKeyDown={(e) => { if (e.key === 'ArrowLeft') go(-1); if (e.key === 'ArrowRight') go(1); }}>
          <motion.ul className="flex cursor-grab active:cursor-grabbing" style={{ gap }} drag={max > 0 ? 'x' : false} dragMomentum={false} dragElastic={0.12} dragConstraints={{ left: -max * step, right: 0 }}
            onDragEnd={(_, info) => { if (info.offset.x < -60 || info.velocity.x < -400) go(1); else if (info.offset.x > 60 || info.velocity.x > 400) go(-1); }}
            animate={{ x: -idx * step }} transition={{ type: 'spring', stiffness: 200, damping: 28 }}>
            {items.map((it, n) => (
              <motion.li key={it.name} style={{ width: cw }} className="shrink-0" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: n * 0.1, duration: 0.7 }}>
                <motion.article whileHover={{ y: -8 }} className="flex h-full flex-col rounded-[28px] border border-line bg-white p-8 shadow-card transition-shadow hover:shadow-lift">
                  <span className="text-6xl font-bold leading-none" aria-hidden>❝</span>
                  <p className="mt-4 flex-1 text-[17px] leading-relaxed text-neutral-700">{it.quote}</p>
                  <hr className="my-6 border-line" />
                  <div className="flex items-center gap-3">
                    <div className="h-12 w-12 overflow-hidden rounded-full"><Avatar v={n + 2} /></div>
                    <div className="flex-1"><p className="font-semibold">{it.name}</p><p className="text-sm text-mute">{it.role}</p></div>
                  </div>
                  <div className="mt-4"><Stars rating={it.rating} /></div>
                </motion.article>
              </motion.li>
            ))}
          </motion.ul>
        </div>
      </div>
    </section>
  );
}
