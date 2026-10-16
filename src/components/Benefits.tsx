import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { content } from '../content';
import { Spark } from './Doodles';
import Reveal from './Reveal';
import WorldMap from './WorldMap';

export default function Benefits() {
  const b = content.benefits;
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const mapY = useTransform(scrollYProgress, [0, 1], [40, -40]);
  return (
    <section id="about" className="py-28">
      <div className="container-x">
        <div className="grid gap-14 lg:grid-cols-[1fr_1.4fr]">
          <Reveal>
            <h2 className="h2 relative max-w-sm">{b.title}<span className="absolute -right-2 -top-8 sm:right-16"><Spark /></span></h2>
            <p className="lead mt-6 max-w-sm">{b.text}</p>
          </Reveal>
          <ul className="grid gap-8 sm:grid-cols-3">
            {b.items.map((it, i) => (
              <motion.li key={it.title} initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-60px' }} transition={{ delay: i * 0.15, duration: 0.7 }} className="text-center sm:text-left">
                <motion.div animate={{ y: [0, -10, 0] }} transition={{ duration: 3 + i * 0.5, repeat: Infinity, ease: 'easeInOut', delay: i * 0.6 }}
                  className="mx-auto grid h-20 w-20 place-items-center rounded-[26px] bg-gradient-to-br from-white to-neutral-200 text-4xl shadow-[inset_0_2px_6px_rgba(255,255,255,.9),0_14px_30px_-10px_rgba(0,0,0,.25)] sm:mx-0">
                  <span className="grayscale contrast-125" aria-hidden>{it.icon}</span>
                </motion.div>
                <h3 className="mt-5 text-xl">{it.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-mute">{it.text}</p>
              </motion.li>
            ))}
          </ul>
        </div>
        <div ref={ref} className="mt-20">
          <motion.div style={{ y: mapY }}><WorldMap /></motion.div>
        </div>
      </div>
    </section>
  );
}
