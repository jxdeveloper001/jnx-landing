import { motion } from 'framer-motion';
import { Facebook, Github } from 'lucide-react';
import { content } from '../content';
import Logo from './Logo';

const list = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.06 },
  },
};

const item = {
  hidden: { opacity: 0, y: 18 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: 'easeOut' },
  },
};

const SOCIAL = [
  {
    I: Github,
    l: 'GitHub',
    href: content.footer.socials.github,
  },
  {
    I: Facebook,
    l: 'Facebook',
    href: content.footer.socials.facebook,
  },
];

export default function Footer() {
  const f = content.footer;

  return (
    <footer className="relative z-10 rounded-t-[28px] sm:rounded-t-[36px] md:rounded-t-[40px] bg-gradient-to-br from-[#0A0A0F] to-[#150A2E] text-white">
      <motion.div
        variants={list}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.05 }}
        className="container-x pb-8 pt-12 sm:pb-10 sm:pt-16 md:pt-20"
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr_1.3fr] gap-8 sm:gap-10 lg:gap-12">
          {/* Logo & Tagline */}
          <motion.div variants={item}>
            <Logo light />
            <p className="mt-5 max-w-[220px] text-sm leading-relaxed text-[var(--on-dark-muted)]">
              {f.tagline}
            </p>
          </motion.div>

          {/* Nav Link Columns */}
          {f.columns.map((c) => (
            <motion.div key={c.title} variants={item}>
              <h3 className="text-base font-semibold tracking-normal text-white">{c.title}</h3>
              <ul className="mt-4 sm:mt-5 space-y-2.5 sm:space-y-3">
                {c.links.map((l) => (
                  <li key={l}>
                    <a
                      href="#service"
                      className="text-sm text-[var(--on-dark-muted)] transition-colors hover:text-white"
                    >
                      {l}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}

          {/* Contact Info Column */}
          <motion.div variants={item}>
            <h3 className="text-base font-semibold tracking-normal text-white">{f.contactTitle}</h3>
            <a
              href={`mailto:${f.email}`}
              className="mt-4 sm:mt-5 block text-sm text-[var(--on-dark-muted)] transition-colors hover:text-white"
            >
              {f.email}
            </a>

            <div className="mt-4 sm:mt-5 flex gap-3">
              {SOCIAL.map(({ I, l, href }) => (
                <motion.a
                  key={l}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={l}
                  whileHover={{ rotate: 360, scale: 1.15 }}
                  transition={{ duration: 0.5 }}
                  className="grid h-11 w-11 place-items-center rounded-full border border-white/[0.14] transition-colors hover:bg-white hover:text-[#0A0A0F]"
                >
                  <I size={17} />
                </motion.a>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Divider & Copyright */}
        <motion.div
          variants={item}
          className="mt-12 sm:mt-16 border-t border-white/[0.14] pt-6 sm:pt-8 text-center text-xs sm:text-sm text-[var(--on-dark-muted)]"
        >
          {f.copyright}
        </motion.div>
      </motion.div>
    </footer>
  );
}
