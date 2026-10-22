import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { content } from '../content';
import { EASE } from '../lib/motion';
import { Scribble, Spark } from './Doodles';
import { Hand, Phone } from './PhoneMockup';
import PillButton from './PillButton';

const BASE = 1.3; // wait for the intro to finish

function CloudShape({ shape = 1 }: { shape?: number }) {
  if (shape === 2) {
    return (
      <svg viewBox="0 0 220 105" fill="currentColor" className="h-full w-full">
        <path d="M42 85 h136 a26 26 0 0 0 18-44 a30 30 0 0 0-38-16 a50 50 0 0 0-88 8 a30 30 0 0 0-36 22 a26 26 0 0 0 8 30 z" />
      </svg>
    );
  }
  if (shape === 3) {
    return (
      <svg viewBox="0 0 140 85" fill="currentColor" className="h-full w-full">
        <path d="M30 70 h80 a20 20 0 0 0 12-35 a22 22 0 0 0-26-12 a32 32 0 0 0-56 6 a20 20 0 0 0-20 20 a18 18 0 0 0 10 21 z" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 180 100" fill="currentColor" className="h-full w-full">
      <path d="M40 80 h100 a24 24 0 0 0 16-42 a28 28 0 0 0-32-18 a44 44 0 0 0-76 8 a26 26 0 0 0-24 24 a24 24 0 0 0 16 28 z" />
    </svg>
  );
}

const CLOUDS = [
  {
    id: 1,
    top: '6%',
    width: 175,
    color: '#DDD0F5',
    opacity: 0.75,
    blurClass: 'blur-[2px]',
    duration: 52,
    direction: 1,
    delay: -18,
    bobDuration: 7,
    bobOffset: 8,
    shape: 1,
    staticLeft: '15%',
  },
  {
    id: 2,
    top: '20%',
    width: 220,
    color: '#EBE3FA',
    opacity: 0.65,
    blurClass: 'blur-[3px]',
    duration: 76,
    direction: -1,
    delay: -34,
    bobDuration: 9,
    bobOffset: 10,
    shape: 2,
    staticLeft: '65%',
  },
  {
    id: 3,
    top: '36%',
    width: 145,
    color: '#DDD0F5',
    opacity: 0.7,
    blurClass: 'blur-[2px]',
    duration: 48,
    direction: 1,
    delay: -8,
    bobDuration: 6.5,
    bobOffset: 7,
    shape: 3,
    staticLeft: '40%',
  },
  {
    id: 4,
    top: '54%',
    width: 235,
    color: '#EBE3FA',
    opacity: 0.6,
    blurClass: 'blur-[4px]',
    duration: 84,
    direction: -1,
    delay: -46,
    bobDuration: 10,
    bobOffset: 12,
    shape: 2,
    staticLeft: '10%',
  },
  {
    id: 5,
    top: '70%',
    width: 160,
    color: '#DDD0F5',
    opacity: 0.8,
    blurClass: 'blur-[3px]',
    duration: 62,
    direction: 1,
    delay: -26,
    bobDuration: 8,
    bobOffset: 9,
    shape: 1,
    staticLeft: '80%',
  },
  {
    id: 6,
    top: '84%',
    width: 195,
    color: '#EBE3FA',
    opacity: 0.7,
    blurClass: 'blur-[2px]',
    duration: 58,
    direction: -1,
    delay: -14,
    bobDuration: 7.5,
    bobOffset: 8,
    shape: 3,
    staticLeft: '50%',
  },
];

export default function Hero() {
  const shouldReduceMotion = useReducedMotion();
  const { scrollY } = useScroll();
  const phoneY = useTransform(scrollY, [0, 700], [0, 90]); // moves slower than the text
  const glowY = useTransform(scrollY, [0, 700], [0, 160]);
  const lines = content.hero.lines;

  return (
    <section id="home" className="relative overflow-hidden pb-40 pt-36 md:pt-40">
      {/* Soft purple-grey ambient hero glow */}
      <motion.div
        aria-hidden
        style={{ y: glowY }}
        className="pointer-events-none absolute right-[-10%] top-10 h-[620px] w-[620px] rounded-full bg-[#E9E4F2]/50 blur-[120px]"
      />

      {/* Drifting cartoon-style SVG clouds in hero background */}
      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden" aria-hidden>
        {CLOUDS.map((c) => (
          <motion.div
            key={c.id}
            className={`absolute ${c.blurClass}`}
            style={{
              top: c.top,
              width: c.width,
              color: c.color,
              opacity: c.opacity,
              ...(shouldReduceMotion ? { left: c.staticLeft } : {}),
            }}
            animate={
              shouldReduceMotion
                ? undefined
                : {
                    x: c.direction === 1 ? ['-25vw', '115vw'] : ['115vw', '-25vw'],
                  }
            }
            transition={
              shouldReduceMotion
                ? undefined
                : {
                    duration: c.duration,
                    repeat: Infinity,
                    ease: 'linear',
                    delay: c.delay,
                  }
            }
          >
            <motion.div
              animate={
                shouldReduceMotion
                  ? undefined
                  : {
                      y: [0, -c.bobOffset, 0, c.bobOffset, 0],
                    }
              }
              transition={
                shouldReduceMotion
                  ? undefined
                  : {
                      duration: c.bobDuration,
                      repeat: Infinity,
                      ease: 'easeInOut',
                    }
              }
            >
              <CloudShape shape={c.shape} />
            </motion.div>
          </motion.div>
        ))}
      </div>

      <div className="container-x relative z-10 grid items-center gap-16 md:grid-cols-2">
        <div>
          <h1 className="relative text-[52px] font-bold leading-[1.02] sm:text-[64px] lg:text-[72px] text-ink">
            <span className="absolute -right-2 -top-6 md:right-10">
              <Spark />
            </span>
            {lines.map((words, li) => (
              <span key={li} className="relative flex flex-wrap gap-x-4">
                {words.map((w, wi) => (
                  <span key={w + wi} className="inline-block overflow-hidden pb-2">
                    <motion.span
                      className="inline-block"
                      initial={{ y: '110%' }}
                      animate={{ y: 0 }}
                      transition={{ delay: BASE + (li * 3 + wi) * 0.08, duration: 0.8, ease: EASE }}
                    >
                      {w}
                    </motion.span>
                  </span>
                ))}
                {li === lines.length - 1 && (
                  <Scribble delay={BASE + 0.9} className="absolute -bottom-1 left-0 h-4 w-[78%]" />
                )}
              </span>
            ))}
          </h1>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: BASE + 1.2, duration: 0.7 }}
            className="lead mt-8 max-w-md text-mute"
          >
            {content.hero.sub}
          </motion.p>
          <motion.div
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: BASE + 1.4, type: 'spring', stiffness: 260, damping: 16 }}
            className="mt-8"
          >
            <PillButton magnetic arrow href="#service">
              {content.hero.cta}
            </PillButton>
          </motion.div>
        </div>
        <motion.div style={{ y: phoneY }} className="relative mx-auto mb-16 w-[280px] md:ml-auto md:mr-10">
          <motion.div
            initial={{ y: 320, rotate: 8, opacity: 0 }}
            animate={{ y: 0, rotate: 0, opacity: 1 }}
            transition={{ delay: BASE + 0.5, type: 'spring', stiffness: 70, damping: 14 }}
          >
            <motion.div
              animate={{ y: [0, -14, 0] }}
              transition={{ duration: 3.6, repeat: Infinity, ease: 'easeInOut', delay: BASE + 1.5 }}
              className="relative"
            >
              <Phone />
              <Hand />
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
