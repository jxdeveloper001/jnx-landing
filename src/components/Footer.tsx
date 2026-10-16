import { motion } from 'framer-motion';
import { Facebook, Instagram, Twitter } from 'lucide-react';
import { content } from '../content';
import Logo from './Logo';

const list = { hidden: {}, show: { transition: { staggerChildren: 0.06 } } };
const item = { hidden: { opacity: 0, y: 22 }, show: { opacity: 1, y: 0, transition: { duration: 0.6 } } };
const SOCIAL = [{ I: Instagram, l: 'Instagram' }, { I: Facebook, l: 'Facebook' }, { I: Twitter, l: 'Twitter' }];

export default function Footer() {
  const f = content.footer;
  return (
    <footer className="rounded-t-[40px] bg-ink text-white">
      <motion.div variants={list} initial="hidden" whileInView="show" viewport={{ once: true, margin: '-80px' }} className="container-x pb-10 pt-20">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr_1.3fr]">
          <motion.div variants={item}><Logo light /><p className="mt-5 max-w-[220px] text-sm leading-relaxed text-neutral-400">{f.tagline}</p></motion.div>
          {f.columns.map((c) => (
            <motion.div key={c.title} variants={item}>
              <h3 className="text-base font-semibold tracking-normal">{c.title}</h3>
              <ul className="mt-5 space-y-3">{c.links.map((l) => <li key={l}><a href="#" className="text-sm text-neutral-400 transition-colors hover:text-white">{l}</a></li>)}</ul>
            </motion.div>
          ))}
          <motion.div variants={item}>
            <h3 className="text-base font-semibold tracking-normal">{f.contactTitle}</h3>
            <a href={`mailto:${f.email}`} className="mt-5 block text-sm text-neutral-400 transition-colors hover:text-white">{f.email}</a>
            <div className="mt-5 flex gap-3">
              {SOCIAL.map(({ I, l }) => (
                <motion.a key={l} href="#" aria-label={l} whileHover={{ rotate: 360, scale: 1.15 }} transition={{ duration: 0.5 }} className="grid h-10 w-10 place-items-center rounded-full border border-white/20 transition-colors hover:bg-white hover:text-ink"><I size={17} /></motion.a>
              ))}
            </div>
          </motion.div>
        </div>
        <motion.div variants={item} className="mt-16 border-t border-white/15 pt-8 text-center text-sm text-neutral-400">{f.copyright}</motion.div>
      </motion.div>
    </footer>
  );
}
