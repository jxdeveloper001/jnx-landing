import { AnimatePresence, motion } from 'framer-motion';
import { ArrowRight, Check } from 'lucide-react';
import { useState } from 'react';
import { content } from '../content';
import { Spark } from './Doodles';
import Reveal from './Reveal';

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function Newsletter() {
  const [email, setEmail] = useState(''), [status, setStatus] = useState<'idle' | 'error' | 'ok'>('idle');
  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!EMAIL.test(email)) { setStatus('error'); return; }
    setStatus('ok'); setTimeout(() => { setStatus('idle'); setEmail(''); }, 3000);
  };
  return (
    <form onSubmit={submit} noValidate className="mt-8 max-w-md">
      <motion.div animate={status === 'error' ? { x: [0, -8, 8, -5, 5, 0] } : {}} transition={{ duration: 0.4 }} className="relative">
        <label htmlFor="nl-email" className="sr-only">Email address</label>
        <input id="nl-email" type="email" value={email} onChange={(e) => { setEmail(e.target.value); if (status === 'error') setStatus('idle'); }} placeholder={content.faq.placeholder}
          aria-invalid={status === 'error'} aria-describedby="nl-msg" className={`h-14 w-full rounded-full border bg-white pl-6 pr-36 text-[15px] outline-none transition-colors focus:border-ink ${status === 'error' ? 'border-ink' : 'border-line'}`} />
        <motion.button type="submit" whileTap={{ scale: 0.95 }} aria-label={status === 'ok' ? 'Subscribed' : content.faq.submit} className="absolute right-1.5 top-1.5 grid h-11 min-w-[104px] place-items-center rounded-full bg-ink px-6 text-sm font-medium text-white">
          <AnimatePresence mode="wait" initial={false}>
            {status === 'ok' ? <motion.span key="ok" initial={{ scale: 0, rotate: -90 }} animate={{ scale: 1, rotate: 0 }} exit={{ scale: 0 }}><Check size={20} /></motion.span>
              : <motion.span key="s" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>{content.faq.submit}</motion.span>}
          </AnimatePresence>
        </motion.button>
      </motion.div>
      <p id="nl-msg" role="status" aria-live="polite" className="mt-2 min-h-5 pl-4 text-sm text-mute">
        {status === 'error' ? 'Enter a valid email, like name@example.com.' : status === 'ok' ? 'You are in. Check your inbox.' : ''}
      </p>
    </form>
  );
}

function Accordion() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <div className="divide-y divide-line border-y border-line">
      {content.faq.items.map((it, i) => {
        const isOpen = open === i;
        return (
          <div key={it.q}>
            <button id={`faq-b-${i}`} aria-expanded={isOpen} aria-controls={`faq-p-${i}`} onClick={() => setOpen(isOpen ? null : i)} className="group flex w-full items-center justify-between py-6 text-left text-xl font-semibold">
              {it.q}
              <ArrowRight size={22} className={`transition-transform duration-300 ${isOpen ? 'rotate-90' : 'group-hover:translate-x-1.5'}`} />
            </button>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div id={`faq-p-${i}`} role="region" aria-labelledby={`faq-b-${i}`} initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }} className="overflow-hidden">
                  <p className="pb-6 leading-relaxed text-mute">{it.a}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}

export default function Faq() {
  const f = content.faq;
  return (
    <section id="contact" className="pb-36 pt-20">
      <div className="container-x grid items-start gap-16 lg:grid-cols-2">
        <Reveal>
          <h2 className="h2 relative max-w-md">{f.title}<span className="absolute -right-2 -top-8 sm:right-16"><Spark /></span></h2>
          <p className="lead mt-6 max-w-md">{f.text}</p>
          <Newsletter />
        </Reveal>
        <Reveal delay={0.15}>
          <p className="mb-6 max-w-sm text-lg font-medium">{f.sideTitle}</p>
          <Accordion />
        </Reveal>
      </div>
    </section>
  );
}
