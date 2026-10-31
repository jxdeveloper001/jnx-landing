import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { content } from '../content';
import { EASE } from '../lib/motion';
import { Scribble, Spark } from './Doodles';
import { Hand, Phone } from './PhoneMockup';
import PillButton from './PillButton';

const BASE = 1.3; // wait for the intro to finish

/* ─────────────────────────────────────────────────────────────
   Cloud SVG silhouettes (retained style, optimized vectors)
───────────────────────────────────────────────────────────── */
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

/* ─────────────────────────────────────────────────────────────
   Bird Silhouette SVG (minimal, soft sky matching V-shape)
───────────────────────────────────────────────────────────── */
function BirdSilhouette({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 16" fill="currentColor" className={`h-full w-full ${className}`}>
      <path d="M1 8 C 8 2, 14 5, 16 9 C 18 5, 24 2, 31 8 C 24 6, 18 10, 16 14 C 14 10, 8 6, 1 8 Z" />
    </svg>
  );
}

/* ─────────────────────────────────────────────────────────────
   Pre-defined cloud layers:
   Layer 1 (Far): smaller, slower, lighter
   Layer 2 (Mid): medium, balanced
   Layer 3 (Near): larger, faster, slightly stronger
───────────────────────────────────────────────────────────── */
const CLOUDS_CONFIG = [
  // Layer 1 - Far
  {
    id: 1,
    top: '8%',
    width: 150,
    color: '#EBE3FA',
    opacity: 0.55,
    duration: 78,
    delay: -16,
    direction: 1,
    shape: 3,
    floatAnim: 'cloud-float-1',
    floatDur: 7.5,
    minTier: 0,
  },
  // Layer 2 - Mid
  {
    id: 2,
    top: '22%',
    width: 205,
    color: '#DDD0F5',
    opacity: 0.68,
    duration: 62,
    delay: -38,
    direction: -1,
    shape: 1,
    floatAnim: 'cloud-float-2',
    floatDur: 8.5,
    minTier: 0,
  },
  // Layer 3 - Near
  {
    id: 3,
    top: '40%',
    width: 250,
    color: '#DDD0F5',
    opacity: 0.76,
    duration: 48,
    delay: -12,
    direction: 1,
    shape: 2,
    floatAnim: 'cloud-float-3',
    floatDur: 6.8,
    minTier: 0,
  },
  // Layer 1 - Far
  {
    id: 4,
    top: '56%',
    width: 165,
    color: '#EBE3FA',
    opacity: 0.52,
    duration: 82,
    delay: -44,
    direction: -1,
    shape: 3,
    floatAnim: 'cloud-float-1',
    floatDur: 9,
    minTier: 1,
  },
  // Layer 2 - Mid
  {
    id: 5,
    top: '72%',
    width: 195,
    color: '#DDD0F5',
    opacity: 0.7,
    duration: 56,
    delay: -28,
    direction: 1,
    shape: 1,
    floatAnim: 'cloud-float-2',
    floatDur: 7.2,
    minTier: 1,
  },
  // Layer 3 - Near
  {
    id: 6,
    top: '86%',
    width: 230,
    color: '#EBE3FA',
    opacity: 0.65,
    duration: 52,
    delay: -6,
    direction: -1,
    shape: 2,
    floatAnim: 'cloud-float-3',
    floatDur: 8,
    minTier: 1,
  },
];

export default function Hero() {
  const shouldReduceMotion = useReducedMotion();
  const heroRef = useRef<HTMLElement>(null);
  const skyRef = useRef<HTMLDivElement>(null);
  const [isLowPower, setIsLowPower] = useState(false);

  const { scrollY } = useScroll();
  const phoneY = useTransform(scrollY, [0, 700], [0, 90]);
  const glowY = useTransform(scrollY, [0, 700], [0, 160]);
  const lines = content.hero.lines;

  // Detect low-power devices on mount to gracefully reduce element counts
  useEffect(() => {
    if (typeof navigator !== 'undefined') {
      const lowHardware = Boolean(navigator.hardwareConcurrency && navigator.hardwareConcurrency <= 4);
      const lowMem = Boolean((navigator as any).deviceMemory && (navigator as any).deviceMemory <= 4);
      if (lowHardware || lowMem) {
        setIsLowPower(true);
      }
    }
  }, []);

  // Performance: Pause CSS keyframe animations when hero is off-screen or tab is hidden
  useEffect(() => {
    const sky = skyRef.current;
    const hero = heroRef.current;
    if (!sky || !hero) return;

    const handleVisibility = () => {
      if (document.hidden) {
        sky.classList.add('is-paused');
      } else {
        sky.classList.remove('is-paused');
      }
    };
    document.addEventListener('visibilitychange', handleVisibility);

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          sky.classList.remove('is-paused');
        } else {
          sky.classList.add('is-paused');
        }
      },
      { rootMargin: '100px' }
    );
    observer.observe(hero);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibility);
      observer.disconnect();
    };
  }, []);

  const activeClouds = isLowPower ? CLOUDS_CONFIG.filter((c) => c.minTier === 0) : CLOUDS_CONFIG;

  return (
    <section id="home" ref={heroRef} className="relative overflow-hidden pb-20 pt-28 sm:pb-28 sm:pt-36 md:pb-40 md:pt-40">
      {/* Soft purple-grey ambient hero glow (pre-rendered gradient instead of heavy 120px blur) */}
      <motion.div
        aria-hidden
        style={{
          y: glowY,
          background: 'radial-gradient(circle, rgba(233, 228, 242, 0.6) 0%, rgba(233, 228, 242, 0.2) 45%, transparent 70%)',
        }}
        className="pointer-events-none absolute right-[-10%] top-10 h-[620px] w-[620px] rounded-full will-change-transform"
      />

      {/* ── Hero Background Sky: Natural Clouds & Flying Birds ── */}
      <div ref={skyRef} className="hero-sky pointer-events-none absolute inset-0 z-0 overflow-hidden" aria-hidden>
        {/* Clouds */}
        {activeClouds.map((c) => (
          <div
            key={c.id}
            className="cloud-track absolute"
            style={{
              top: c.top,
              width: `${c.width}px`,
              color: c.color,
              opacity: c.opacity,
              animation: shouldReduceMotion
                ? undefined
                : `${c.direction === 1 ? 'cloud-drift-ltr' : 'cloud-drift-rtl'} ${c.duration}s linear infinite`,
              animationDelay: shouldReduceMotion ? undefined : `${c.delay}s`,
            }}
          >
            <div
              style={{
                animation: shouldReduceMotion ? undefined : `${c.floatAnim} ${c.floatDur}s ease-in-out infinite`,
              }}
            >
              <CloudShape shape={c.shape} />
            </div>
          </div>
        ))}

        {/* Birds: Flock 1 (Far, tranquil drift across the sky) */}
        <div
          className="flock-track absolute"
          style={{
            top: '18%',
            animation: shouldReduceMotion ? undefined : 'flock-drift-1 46s linear infinite',
            animationDelay: shouldReduceMotion ? undefined : '-8s',
          }}
        >
          <div className="relative text-[#B8A5E0] opacity-55">
            {/* Lead bird */}
            <div
              className="absolute bird-svg"
              style={{
                width: '18px',
                height: '9px',
                transform: 'translate3d(0, 0, 0)',
                animation: shouldReduceMotion ? undefined : 'bird-float 4.2s ease-in-out infinite',
              }}
            >
              <div
                className="bird-flap-anim"
                style={{ animation: shouldReduceMotion ? undefined : 'bird-wing-flap 0.65s ease-in-out infinite' }}
              >
                <BirdSilhouette />
              </div>
            </div>

            {/* Wing bird 1 */}
            <div
              className="absolute bird-svg"
              style={{
                width: '15px',
                height: '8px',
                transform: 'translate3d(-18px, 10px, 0)',
                animation: shouldReduceMotion ? undefined : 'bird-float 4.6s ease-in-out infinite 0.4s',
              }}
            >
              <div
                className="bird-flap-anim"
                style={{ animation: shouldReduceMotion ? undefined : 'bird-wing-flap 0.68s ease-in-out infinite 0.15s' }}
              >
                <BirdSilhouette />
              </div>
            </div>

            {/* Wing bird 2 */}
            <div
              className="absolute bird-svg"
              style={{
                width: '14px',
                height: '7px',
                transform: 'translate3d(-34px, 22px, 0)',
                animation: shouldReduceMotion ? undefined : 'bird-float 4.4s ease-in-out infinite 0.7s',
              }}
            >
              <div
                className="bird-flap-anim"
                style={{ animation: shouldReduceMotion ? undefined : 'bird-wing-flap 0.62s ease-in-out infinite 0.3s' }}
              >
                <BirdSilhouette />
              </div>
            </div>

            {/* Follower bird */}
            <div
              className="absolute bird-svg"
              style={{
                width: '16px',
                height: '8px',
                transform: 'translate3d(16px, 14px, 0)',
                animation: shouldReduceMotion ? undefined : 'bird-float 4.8s ease-in-out infinite 0.2s',
              }}
            >
              <div
                className="bird-flap-anim"
                style={{ animation: shouldReduceMotion ? undefined : 'bird-wing-flap 0.7s ease-in-out infinite 0.1s' }}
              >
                <BirdSilhouette />
              </div>
            </div>
          </div>
        </div>

        {/* Birds: Flock 2 (Nearer, slightly swifter, desktop only) */}
        {!isLowPower && (
          <div
            className="flock-track absolute hidden sm:block"
            style={{
              top: '46%',
              animation: shouldReduceMotion ? undefined : 'flock-drift-2 32s linear infinite',
              animationDelay: shouldReduceMotion ? undefined : '-20s',
            }}
          >
            <div className="relative text-[#C4B5E8] opacity-65">
              {/* Lead bird */}
              <div
                className="absolute bird-svg"
                style={{
                  width: '23px',
                  height: '11px',
                  transform: 'translate3d(0, 0, 0)',
                  animation: shouldReduceMotion ? undefined : 'bird-float 3.8s ease-in-out infinite',
                }}
              >
                <div
                  className="bird-flap-anim"
                  style={{ animation: shouldReduceMotion ? undefined : 'bird-wing-flap 0.58s ease-in-out infinite' }}
                >
                  <BirdSilhouette />
                </div>
              </div>

              {/* Trailing bird 1 */}
              <div
                className="absolute bird-svg"
                style={{
                  width: '20px',
                  height: '10px',
                  transform: 'translate3d(-24px, 12px, 0)',
                  animation: shouldReduceMotion ? undefined : 'bird-float 4.1s ease-in-out infinite 0.3s',
                }}
              >
                <div
                  className="bird-flap-anim"
                  style={{ animation: shouldReduceMotion ? undefined : 'bird-wing-flap 0.62s ease-in-out infinite 0.2s' }}
                >
                  <BirdSilhouette />
                </div>
              </div>

              {/* Trailing bird 2 */}
              <div
                className="absolute bird-svg"
                style={{
                  width: '18px',
                  height: '9px',
                  transform: 'translate3d(-42px, 20px, 0)',
                  animation: shouldReduceMotion ? undefined : 'bird-float 3.9s ease-in-out infinite 0.5s',
                }}
              >
                <div
                  className="bird-flap-anim"
                  style={{ animation: shouldReduceMotion ? undefined : 'bird-wing-flap 0.6s ease-in-out infinite 0.4s' }}
                >
                  <BirdSilhouette />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="container-x relative z-10 grid items-center gap-10 md:gap-16 md:grid-cols-2">
        <div className="max-w-xl">
          {/* Subtle mobile & desktop agency badge */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: BASE - 0.2, duration: 0.6 }}
            className="inline-flex items-center gap-2 rounded-full border border-line bg-white/80 backdrop-blur-sm px-3.5 py-1.5 text-xs font-bold tracking-[0.18em] text-[#0A0A0F] uppercase shadow-sm mb-5 sm:mb-6"
          >
            <span className="h-2 w-2 rounded-full bg-gradient-to-r from-[#2B0B5E] via-[#4C1D95] to-[#7C3AED]" />
            DIGITAL PRODUCT AGENCY
          </motion.div>

          <h1 className="relative text-[36px] min-[380px]:text-[44px] sm:text-[56px] md:text-[64px] lg:text-[72px] font-bold leading-[1.08] sm:leading-[1.04] md:leading-[1.02] text-ink">
            <span className="absolute -right-2 -top-6 md:right-10">
              <Spark />
            </span>
            {lines.map((words, li) => (
              <span key={li} className="relative flex flex-wrap gap-x-3 sm:gap-x-4">
                {words.map((w, wi) => (
                  <span key={w + wi} className="inline-block overflow-hidden pb-1 sm:pb-2">
                    <motion.span
                      className="inline-block will-change-transform"
                      initial={{ y: '110%' }}
                      animate={{ y: 0 }}
                      transition={{ delay: BASE + (li * 3 + wi) * 0.08, duration: 0.8, ease: EASE }}
                    >
                      {w}
                    </motion.span>
                  </span>
                ))}
                {li === lines.length - 1 && (
                  <Scribble delay={BASE + 0.9} className="absolute -bottom-1 left-0 h-3.5 sm:h-4 w-[78%]" />
                )}
              </span>
            ))}
          </h1>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: BASE + 1.2, duration: 0.7 }}
            className="lead mt-5 sm:mt-8 max-w-md text-mute will-change-transform"
          >
            {content.hero.sub}
          </motion.p>
          <motion.div
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: BASE + 1.4, type: 'spring', stiffness: 260, damping: 16 }}
            className="mt-6 sm:mt-8 will-change-transform"
          >
            <PillButton magnetic arrow href="#service">
              {content.hero.cta}
            </PillButton>
          </motion.div>
        </div>

        {/* Desktop Phone Mockup - completely hidden on mobile as required */}
        <motion.div
          style={{ y: phoneY }}
          className="relative mx-auto hidden w-[280px] md:ml-auto md:mr-10 md:block will-change-transform"
        >
          <motion.div
            initial={{ y: 320, rotate: 8, opacity: 0 }}
            animate={{ y: 0, rotate: 0, opacity: 1 }}
            transition={{ delay: BASE + 0.5, type: 'spring', stiffness: 70, damping: 14 }}
          >
            <motion.div
              animate={{ y: [0, -14, 0] }}
              transition={{ duration: 3.6, repeat: Infinity, ease: 'easeInOut', delay: BASE + 1.5 }}
              className="relative will-change-transform"
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
