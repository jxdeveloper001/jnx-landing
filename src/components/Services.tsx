import { motion } from 'framer-motion';
import { content } from '../content';
import { Spark } from './Doodles';
import Reveal from './Reveal';

export default function Services() {
  const s = content.services;

  return (
    <section id="service" className="relative py-24 sm:py-28">
      {/* Anchor for backward compatibility with hero button targeting #about */}
      <div id="about" className="absolute -top-24" aria-hidden />

      <div className="container-x">
        <div className="max-w-2xl">
          <Reveal>
            <h2 className="h2 relative inline-block text-ink">
              Meet Our{' '}
              <span className="bg-gradient-to-r from-[var(--purple-deep)] via-[var(--purple)] to-[var(--purple-bright)] bg-clip-text text-transparent">
                Services
              </span>
              <span className="absolute -right-8 -top-8 sm:-right-10">
                <Spark />
              </span>
            </h2>
            <p className="lead mt-6 text-mute">{s.subtitle}</p>
          </Reveal>
        </div>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {s.items.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ delay: i * 0.08, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -6 }}
              className="group flex flex-col justify-between rounded-[28px] border border-line bg-white p-8 shadow-card backdrop-blur-sm transition-shadow duration-300 hover:shadow-lift"
            >
              <div>
                <motion.div
                  animate={{ y: [0, -8, 0] }}
                  transition={{
                    duration: 3 + (i % 3) * 0.5,
                    repeat: Infinity,
                    ease: 'easeInOut',
                    delay: i * 0.25,
                  }}
                  className="grid h-16 w-16 place-items-center rounded-[22px] bg-gradient-to-br from-white to-[#F7F6FA] text-3xl shadow-[inset_0_2px_6px_rgba(255,255,255,.9),0_12px_24px_-10px_rgba(20,8,50,.14)]"
                >
                  <span className="grayscale contrast-125 opacity-90" aria-hidden>
                    {item.icon}
                  </span>
                </motion.div>

                <h3 className="mt-6 text-xl font-bold tracking-tight text-ink">
                  {item.title}
                </h3>
                <p className="mt-2.5 text-sm leading-relaxed text-mute">
                  {item.text}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
