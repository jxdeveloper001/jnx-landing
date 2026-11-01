import { AnimatePresence, motion } from 'framer-motion';
import { ArrowRight, Check, Loader2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import { content } from '../content';
import { Spark } from './Doodles';
import ScrollLine from './ScrollLine';
import Reveal from './Reveal';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function Newsletter() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [botcheck, setBotcheck] = useState(false);
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [statusMessage, setStatusMessage] = useState('');
  const [cooldown, setCooldown] = useState(0);

  const isValidEmail = EMAIL_REGEX.test(email.trim());

  // 30-second cooldown timer
  useEffect(() => {
    if (cooldown <= 0) return;
    const timer = setInterval(() => {
      setCooldown((prev) => (prev <= 1 ? 0 : prev - 1));
    }, 1000);
    return () => clearInterval(timer);
  }, [cooldown]);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (status === 'loading') return;

    if (cooldown > 0) {
      setStatus('error');
      setStatusMessage(`Please wait ${cooldown}s before sending another message.`);
      return;
    }

    const trimmedEmail = email.trim();
    if (!EMAIL_REGEX.test(trimmedEmail)) {
      setStatus('error');
      setStatusMessage('Enter a valid email, like name@example.com.');
      return;
    }

    if (botcheck) {
      // Honeypot caught bot
      setStatus('success');
      setStatusMessage('Thank you! Your message has been sent.');
      return;
    }

    const accessKey = import.meta.env.VITE_WEB3FORMS_KEY || '';

    if (!accessKey) {
      setStatus('error');
      setStatusMessage('Contact form access key missing. Please set VITE_WEB3FORMS_KEY in .env.');
      return;
    }

    setStatus('loading');
    setStatusMessage('');

    try {
      const trimmedMessage = message.trim();
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          access_key: accessKey,
          subject: `New inquiry from ${trimmedEmail}`,
          from_name: 'JNX Website Contact Form',
          email: trimmedEmail,
          message: trimmedMessage || 'No specific message entered (Newsletter / Contact Subscription)',
          replyto: trimmedEmail,
          botcheck: '',
        }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setStatus('success');
        setStatusMessage(data.message || 'Thank you! Your message has been sent successfully.');
        setCooldown(30);

        setTimeout(() => {
          setEmail('');
          setMessage('');
          setStatus('idle');
          setStatusMessage('');
        }, 4000);
      } else {
        setStatus('error');
        setStatusMessage(data.message || 'Submission failed. Please check your details and try again.');
      }
    } catch {
      setStatus('error');
      setStatusMessage('Network error. Please check your connection and retry.');
    }
  };

  return (
    <form onSubmit={submit} noValidate className="mt-8 max-w-md">
      {/* Honeypot field for bot protection */}
      <input
        type="checkbox"
        name="botcheck"
        className="hidden"
        style={{ display: 'none' }}
        tabIndex={-1}
        autoComplete="off"
        checked={botcheck}
        onChange={(e) => setBotcheck(e.target.checked)}
      />

      <motion.div
        animate={status === 'error' ? { x: [0, -8, 8, -5, 5, 0] } : {}}
        transition={{ duration: 0.4 }}
        className="relative"
      >
        <label htmlFor="nl-email" className="sr-only">
          Email address
        </label>
        <input
          id="nl-email"
          type="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            if (status === 'error') {
              setStatus('idle');
              setStatusMessage('');
            }
          }}
          disabled={status === 'loading'}
          placeholder={content.faq.placeholder}
          aria-invalid={status === 'error'}
          aria-describedby="nl-msg"
          className={`h-13 sm:h-14 w-full rounded-full border bg-white pl-4 sm:pl-6 pr-28 sm:pr-36 text-sm sm:text-[15px] text-ink outline-none transition-[border-color,box-shadow] focus:border-purple focus:shadow-[0_0_0_4px_rgba(121,80,181,0.14)] disabled:opacity-70 ${
            status === 'error' ? 'border-purple' : 'border-line'
          }`}
        />
        <motion.button
          type="submit"
          whileTap={{ scale: 0.95 }}
          disabled={status === 'loading' || cooldown > 0}
          aria-label={
            status === 'loading'
              ? 'Sending...'
              : status === 'success'
                ? 'Sent'
                : cooldown > 0
                  ? `Wait ${cooldown}s`
                  : content.faq.submit
          }
          className="btn-black absolute right-1.5 top-1.5 grid h-10 sm:h-11 min-w-[84px] sm:min-w-[104px] place-items-center rounded-full px-4 sm:px-6 text-xs sm:text-sm font-medium text-white shadow-card disabled:opacity-60 disabled:cursor-not-allowed"
        >
          <AnimatePresence mode="wait" initial={false}>
            {status === 'loading' ? (
              <motion.span
                key="loading"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <Loader2 size={18} className="animate-spin" />
              </motion.span>
            ) : status === 'success' ? (
              <motion.span
                key="ok"
                initial={{ scale: 0, rotate: -90 }}
                animate={{ scale: 1, rotate: 0 }}
                exit={{ scale: 0 }}
              >
                <Check size={20} />
              </motion.span>
            ) : (
              <motion.span
                key="s"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                {cooldown > 0 ? `${cooldown}s` : content.faq.submit}
              </motion.span>
            )}
          </AnimatePresence>
        </motion.button>
      </motion.div>

      {/* Message box that smoothly opens below the pill on valid email */}
      <AnimatePresence>
        {(isValidEmail || message.length > 0) && status !== 'success' && (
          <motion.div
            initial={{ height: 0, opacity: 0, marginTop: 0 }}
            animate={{ height: 'auto', opacity: 1, marginTop: 12 }}
            exit={{ height: 0, opacity: 0, marginTop: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <div className="rounded-[22px] border border-line bg-white p-4 shadow-sm transition-[border-color,box-shadow] focus-within:border-purple focus-within:shadow-[0_0_0_4px_rgba(121,80,181,0.14)]">
              <label htmlFor="nl-message" className="sr-only">
                Your message (optional)
              </label>
              <textarea
                id="nl-message"
                rows={4}
                maxLength={1000}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="What would you like to build? (optional)"
                disabled={status === 'loading'}
                className="w-full resize-none bg-transparent text-[15px] leading-relaxed text-ink placeholder:text-mute outline-none"
              />
              <div className="mt-1 flex justify-end">
                <span className="font-mono text-xs text-mute">
                  {message.length}/1000
                </span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <p
        id="nl-msg"
        role="status"
        aria-live="polite"
        className={`mt-2.5 min-h-5 pl-4 text-sm font-medium transition-colors ${
          status === 'error'
            ? 'text-[#DC2626]'
            : status === 'success'
              ? 'text-[#059669]'
              : 'text-mute'
        }`}
      >
        {statusMessage}
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
            <button
              id={`faq-b-${i}`}
              aria-expanded={isOpen}
              aria-controls={`faq-p-${i}`}
              onClick={() => setOpen(isOpen ? null : i)}
              className="group flex w-full items-center justify-between py-4 sm:py-6 text-left text-base sm:text-lg md:text-xl font-semibold text-ink gap-3"
            >
              <span>{it.q}</span>
              <ArrowRight
                size={20}
                className={`shrink-0 text-purple transition-transform duration-300 ${
                  isOpen ? 'rotate-90' : 'group-hover:translate-x-1.5'
                }`}
              />
            </button>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  id={`faq-p-${i}`}
                  role="region"
                  aria-labelledby={`faq-b-${i}`}
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                  className="overflow-hidden"
                >
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
    <section
      id="contact"
      style={{ contentVisibility: 'auto', containIntrinsicSize: '1px 800px' }}
      className="relative overflow-hidden pb-20 sm:pb-28 md:pb-36 pt-16 sm:pt-20"
    >
      {/* Background ScrollLine: gentle arc with a small curl at the end, draws left to right */}
      <ScrollLine
        className="pointer-events-none absolute right-0 top-10 hidden h-[260px] w-[420px] lg:block opacity-70"
        viewBox="0 0 420 260"
        d="M 10 210 C 120 150, 240 70, 340 50 C 385 40, 410 70, 395 100 C 380 125, 350 110, 360 80"
        direction="ltr"
      />

      <div className="container-x relative z-10 grid items-start gap-16 lg:grid-cols-2">
        <Reveal>
          <h2 className="h2 relative max-w-md text-ink">
            Got A Question For{' '}
            <span className="bg-gradient-to-r from-[var(--purple-deep)] via-[var(--purple)] to-[var(--purple-bright)] bg-clip-text text-transparent">
              JNX
            </span>
            ?
            <span className="absolute -right-2 -top-8 sm:right-16">
              <Spark />
            </span>
          </h2>
          <p className="lead mt-6 max-w-md text-mute">{f.text}</p>
          <Newsletter />
        </Reveal>
        <Reveal delay={0.15}>
          <p className="mb-6 max-w-sm text-lg font-medium text-ink">{f.sideTitle}</p>
          <Accordion />
        </Reveal>
      </div>
    </section>
  );
}
