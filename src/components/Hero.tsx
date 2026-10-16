import { motion, useScroll, useTransform } from 'framer-motion';
import { content } from '../content';
import { EASE } from '../lib/motion';
import { Scribble, Spark } from './Doodles';
import { Hand, Phone } from './PhoneMockup';
import PillButton from './PillButton';

const BASE = 1.3; // wait for the intro to finish
export default function Hero() {
  const { scrollY } = useScroll();
  const phoneY = useTransform(scrollY, [0, 700], [0, 90]);   // moves slower than the text
  const glowY = useTransform(scrollY, [0, 700], [0, 160]);
  const lines = content.hero.lines;
  return (
    <section id="home" className="relative overflow-hidden pb-40 pt-36 md:pt-40">
      <motion.div aria-hidden style={{ y: glowY }} className="absolute right-[-10%] top-10 h-[620px] w-[620px] rounded-full bg-neutral-300/50 blur-[120px]" />
      {[{ t: '16%', w: 140, d: 28 }, { t: '46%', w: 100, d: 36 }].map((c, i) => (
        <motion.div key={i} aria-hidden className="absolute left-0 h-12 rounded-full bg-neutral-200/70 blur-[2px]" style={{ top: c.t, width: c.w }} animate={{ x: ['-10vw', '110vw'] }} transition={{ duration: c.d, repeat: Infinity, ease: 'linear', delay: -i * 14 }} />
      ))}
      <div className="container-x relative grid items-center gap-16 md:grid-cols-2">
        <div>
          <h1 className="relative text-[52px] font-bold leading-[1.02] sm:text-[64px] lg:text-[72px]">
            <span className="absolute -right-2 -top-6 md:right-10"><Spark /></span>
            {lines.map((words, li) => (
              <span key={li} className="relative flex flex-wrap gap-x-4">
                {words.map((w, wi) => (
                  <span key={w + wi} className="inline-block overflow-hidden pb-2">
                    <motion.span className="inline-block" initial={{ y: '110%' }} animate={{ y: 0 }} transition={{ delay: BASE + (li * 3 + wi) * 0.08, duration: 0.8, ease: EASE }}>{w}</motion.span>
                  </span>
                ))}
                {li === lines.length - 1 && <Scribble delay={BASE + 0.9} className="absolute -bottom-1 left-0 h-4 w-[78%]" />}
              </span>
            ))}
          </h1>
          <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: BASE + 1.2, duration: 0.7 }} className="lead mt-8 max-w-md">{content.hero.sub}</motion.p>
          <motion.div initial={{ opacity: 0, scale: 0.7 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: BASE + 1.4, type: 'spring', stiffness: 260, damping: 16 }} className="mt-8">
            <PillButton magnetic arrow href="#about">{content.hero.cta}</PillButton>
          </motion.div>
        </div>
        <motion.div style={{ y: phoneY }} className="relative mx-auto mb-16 w-[280px] md:ml-auto md:mr-10">
          <motion.div initial={{ y: 320, rotate: 8, opacity: 0 }} animate={{ y: 0, rotate: 0, opacity: 1 }} transition={{ delay: BASE + 0.5, type: 'spring', stiffness: 70, damping: 14 }}>
            <motion.div animate={{ y: [0, -14, 0] }} transition={{ duration: 3.6, repeat: Infinity, ease: 'easeInOut', delay: BASE + 1.5 }} className="relative">
              <Phone /><Hand />
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
