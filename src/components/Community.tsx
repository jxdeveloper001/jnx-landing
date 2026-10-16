import { motion, useInView } from 'framer-motion';
import { Instagram, Music2, Twitter } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { content } from '../content';
import { Spark } from './Doodles';
import { Avatar } from './Illustrations';
import PillButton from './PillButton';
import Reveal from './Reveal';

const AVATARS = [
  { x: 50, y: 50, s: 150 }, { x: 20, y: 30, s: 92 }, { x: 80, y: 26, s: 100 }, { x: 86, y: 68, s: 84 },
  { x: 50, y: 90, s: 96 }, { x: 16, y: 72, s: 96 }, { x: 52, y: 10, s: 70 },
];
const SOCIAL = [{ I: Twitter, x: 34, y: 14, l: 'X / Twitter' }, { I: Instagram, x: 90, y: 46, l: 'Instagram' }, { I: Music2, x: 8, y: 52, l: 'TikTok' }];
const BUBBLES = [{ x: 58, y: 34, r: -4 }, { x: 8, y: 14, r: 5 }, { x: 70, y: 80, r: -3 }, { x: 28, y: 88, r: 4 }];

function Typed({ text, delay }: { text: string; delay: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!inView) return;
    let id = 0;
    const t = window.setTimeout(() => { let i = 0; id = window.setInterval(() => { i++; setN(i); if (i >= text.length) clearInterval(id); }, 70); }, delay * 1000);
    return () => { clearTimeout(t); clearInterval(id); };
  }, [inView, text, delay]);
  return <span ref={ref} aria-label={text}>{text.slice(0, n)}<span className="opacity-0">{text.slice(n)}</span></span>;
}

export default function Community() {
  const c = content.community;
  return (
    <section id="community" className="py-28">
      <div className="container-x grid items-center gap-16 lg:grid-cols-2">
        <Reveal>
          <h2 className="h2 relative max-w-md">{c.title}<span className="absolute -right-2 -top-8 sm:right-10"><Spark /></span></h2>
          <p className="lead mt-6 max-w-md">{c.text}</p>
          <div className="mt-8"><PillButton magnetic arrow>{c.cta}</PillButton></div>
        </Reveal>
        <div className="relative mx-auto aspect-square w-full max-w-[520px]">
          <div aria-hidden className="absolute inset-[6%] rounded-[58%_42%_55%_45%/48%_56%_44%_52%] bg-wash" />
          {AVATARS.map((a, i) => (
            <div key={i} className="absolute -translate-x-1/2 -translate-y-1/2" style={{ left: `${a.x}%`, top: `${a.y}%`, width: a.s, height: a.s }}>
              <motion.div className="h-full w-full" initial={{ scale: 0 }} whileInView={{ scale: 1 }} viewport={{ once: true }} transition={{ type: 'spring', stiffness: 200, damping: 14, delay: i * 0.12 }}>
                <motion.div className="h-full w-full overflow-hidden rounded-full border-4 border-white shadow-card" animate={{ y: [0, -9, 0] }} transition={{ duration: 3 + i * 0.55, repeat: Infinity, ease: 'easeInOut', delay: i * 0.3 }}
                  whileHover={{ scale: 1.12, rotate: [0, -7, 7, -4, 0], transition: { duration: 0.5 } }}>
                  <Avatar v={i} />
                </motion.div>
              </motion.div>
            </div>
          ))}
          {SOCIAL.map(({ I, x, y, l }, i) => (
            <motion.a key={l} href="#" aria-label={l} className="absolute grid h-12 w-12 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-white shadow-card" style={{ left: `${x}%`, top: `${y}%` }}
              initial={{ scale: 0 }} whileInView={{ scale: 1 }} viewport={{ once: true }} transition={{ type: 'spring', delay: 0.9 + i * 0.1 }} whileHover={{ scale: 1.15, rotate: 12 }}>
              <I size={20} />
            </motion.a>
          ))}
          {c.bubbles.map((t, i) => (
            <motion.div key={t} className="absolute -translate-x-1/2 rounded-2xl bg-ink px-4 py-2 text-sm font-medium text-white shadow-card" style={{ left: `${BUBBLES[i].x}%`, top: `${BUBBLES[i].y}%` }}
              initial={{ scale: 0, rotate: -15 }} whileInView={{ scale: 1, rotate: BUBBLES[i].r }} viewport={{ once: true }} transition={{ type: 'spring', stiffness: 260, damping: 14, delay: 1.1 + i * 0.25 }}>
              <Typed text={t} delay={1.2 + i * 0.25} />
              <span aria-hidden className="absolute -bottom-1 left-5 h-3 w-3 rotate-45 bg-ink" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
