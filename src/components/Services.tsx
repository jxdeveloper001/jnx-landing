import { motion, useReducedMotion } from 'framer-motion';
import {
  Code2,
  LifeBuoy,
  MousePointerClick,
  PanelsTopLeft,
  PenTool,
  Smartphone,
} from 'lucide-react';
import { useRef, type CSSProperties } from 'react';
import { content } from '../content';
import { useSectionLiveBg } from '../hooks/useSectionLiveBg';
import { EASE } from '../lib/motion';

// ── Minimal 2D Vector Leaf Shapes for Subtle Falling Leaves Background ────────
function LeafShape({ shape = 1 }: { shape?: number }) {
  if (shape === 2) {
    // Graceful curved willow leaf
    return (
      <svg viewBox="0 0 26 22" fill="currentColor" className="h-full w-full">
        <path d="M2 20 C3 11, 11 3, 24 2 C21 13, 13 21, 2 20 Z" />
      </svg>
    );
  }
  if (shape === 3) {
    // Flutter leaf
    return (
      <svg viewBox="0 0 20 24" fill="currentColor" className="h-full w-full">
        <path d="M10 2 C16 6, 17 15, 10 22 C5 17, 3 10, 10 2 Z" />
      </svg>
    );
  }
  // Classic tapered leaf with subtle center vein
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-full w-full">
      <path d="M12 2 C19 6, 21 16, 12 22 C3 16, 5 6, 12 2 Z" opacity="0.9" />
      <path
        d="M12 4 C12 10, 12 16, 12 20"
        stroke="currentColor"
        strokeWidth="0.8"
        strokeLinecap="round"
        opacity="0.6"
        fill="none"
      />
    </svg>
  );
}

const LEAVES_CONFIG = [
  { id: 1, left: '8%', width: 17, color: '#C6B2EC', opacity: 0.28, duration: 18, delay: -4, shape: 1, sway: 'leaf-sway-1', swayDur: 4.8, minTier: 0 },
  { id: 2, left: '22%', width: 14, color: '#DDD0F5', opacity: 0.24, duration: 23, delay: -11, shape: 2, sway: 'leaf-sway-2', swayDur: 5.4, minTier: 1 },
  { id: 3, left: '37%', width: 19, color: '#B69AE8', opacity: 0.20, duration: 16, delay: -17, shape: 3, sway: 'leaf-sway-3', swayDur: 4.2, minTier: 0 },
  { id: 4, left: '52%', width: 16, color: '#C6B2EC', opacity: 0.26, duration: 20, delay: -7, shape: 1, sway: 'leaf-sway-2', swayDur: 5.0, minTier: 1 },
  { id: 5, left: '68%', width: 21, color: '#DDD0F5', opacity: 0.22, duration: 17, delay: -13, shape: 2, sway: 'leaf-sway-1', swayDur: 4.6, minTier: 0 },
  { id: 6, left: '82%', width: 15, color: '#B69AE8', opacity: 0.22, duration: 24, delay: -3, shape: 3, sway: 'leaf-sway-3', swayDur: 5.6, minTier: 0 },
  { id: 7, left: '94%', width: 18, color: '#C6B2EC', opacity: 0.25, duration: 19, delay: -15, shape: 1, sway: 'leaf-sway-2', swayDur: 4.9, minTier: 1 },
];

const SERVICE_ICONS = [
  PanelsTopLeft,
  Code2,
  Smartphone,
  MousePointerClick,
  PenTool,
  LifeBuoy,
];

// One geometric motif per card, all drawn from the same violet hairline system.
const VIOLET = 'rgba(121,80,181,0.32)';
const MOTIFS: CSSProperties[] = [
  { backgroundImage: `linear-gradient(${VIOLET} 1px, transparent 1px), linear-gradient(90deg, ${VIOLET} 1px, transparent 1px)`, backgroundSize: '18px 18px' },
  { backgroundImage: `radial-gradient(${VIOLET} 1.4px, transparent 1.6px)`, backgroundSize: '14px 14px' },
  { backgroundImage: `repeating-linear-gradient(135deg, ${VIOLET} 0 1px, transparent 1px 12px)` },
  { backgroundImage: `repeating-radial-gradient(circle at 100% 0, ${VIOLET} 0 1px, transparent 1px 14px)` },
  { backgroundImage: `repeating-linear-gradient(0deg, ${VIOLET} 0 1px, transparent 1px 11px)` },
  { backgroundImage: `repeating-linear-gradient(45deg, ${VIOLET} 0 1px, transparent 1px 12px), repeating-linear-gradient(-45deg, ${VIOLET} 0 1px, transparent 1px 12px)` },
];
const MOTIF_MASK = 'radial-gradient(circle at 100% 0, #000 0%, transparent 62%)';

function ServiceCard({
  item,
  index,
}: {
  item: (typeof content.services.items)[number];
  index: number;
}) {
  const Icon = SERVICE_ICONS[index] || PanelsTopLeft;

  return (
    <motion.article
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.65, delay: (index % 3) * 0.08, ease: EASE }}
      className="group relative flex h-full flex-col overflow-hidden rounded-br-[44px] rounded-tl-[44px] rounded-bl-2xl rounded-tr-2xl border border-[#E8E6EF] bg-white p-6 pt-7 shadow-[0_1px_2px_rgba(17,17,20,0.04),0_16px_30px_-20px_rgba(36,17,61,0.3)] transition-[transform,box-shadow,border-color] duration-300 hover:-translate-y-1.5 hover:border-[#B69AE8] hover:shadow-[0_2px_4px_rgba(36,17,61,0.06),0_30px_46px_-22px_rgba(84,37,138,0.5),0_0_0_1px_rgba(121,80,181,0.12)] sm:p-7 sm:pt-8"
    >
      {/* Geometric motif fading out from the top-right corner */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute right-0 top-0 h-40 w-40 opacity-60 transition-opacity duration-500 group-hover:opacity-100"
        style={{ ...MOTIFS[index], WebkitMaskImage: MOTIF_MASK, maskImage: MOTIF_MASK }}
      />
      {/* Lower tonal surface layer */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-[#F7F5FC] to-transparent"
      />

      {/* Icon: charcoal tile with an offset violet outline behind it */}
      <div className="relative z-10 h-14 w-14 sm:h-16 sm:w-16">
        <span
          aria-hidden="true"
          className="absolute inset-0 translate-x-1.5 translate-y-1.5 rounded-2xl border border-[#7950B5]/50 transition-transform duration-300 group-hover:translate-x-2.5 group-hover:translate-y-2.5"
        />
        <span className="absolute inset-0 grid place-items-center rounded-2xl bg-[#111114] text-white shadow-[0_8px_16px_-8px_rgba(36,17,61,0.6),inset_0_1px_0_rgba(255,255,255,0.12)] transition-[background-color,box-shadow] duration-300 group-hover:bg-[#54258A] group-hover:shadow-[0_12px_22px_-6px_rgba(121,80,181,0.65),inset_0_1px_0_rgba(255,255,255,0.28)]">
          <Icon className="h-6 w-6 sm:h-7 sm:w-7" strokeWidth={1.6} aria-hidden="true" />
        </span>
      </div>

      <h3 className="relative z-10 mt-7 text-lg font-bold tracking-tight text-[#111114] sm:text-xl md:text-[22px]">
        {item.title}
      </h3>
      <p className="relative z-10 mt-2.5 text-[14px] leading-relaxed text-[#5A5A6D] sm:text-[15px]">
        {item.text}
      </p>

      <div className="relative z-10 mt-auto flex items-center gap-3 pt-6" aria-hidden="true">
        <span className="text-xs font-bold tabular-nums tracking-[0.2em] text-[#111114]">
          {String(index + 1).padStart(2, '0')}
        </span>
        <span className="relative h-px flex-1 bg-[#E3E0EC]">
          <span className="absolute inset-y-0 left-0 w-full origin-left scale-x-[0.18] bg-[#7950B5] transition-transform duration-500 ease-out group-hover:scale-x-100" />
        </span>
      </div>
    </motion.article>
  );
}

export default function Services() {
  const s = content.services;
  const shouldReduceMotion = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const { isLowPower } = useSectionLiveBg(sectionRef, bgRef);

  const activeLeaves = isLowPower
    ? LEAVES_CONFIG.filter((l) => l.minTier === 0)
    : LEAVES_CONFIG;

  return (
    <section
      ref={sectionRef}
      id="service"
      className="relative overflow-hidden py-16 sm:py-20 md:py-28"
    >
      {/* Back-compat anchor */}
      <div id="about" className="absolute -top-24" aria-hidden />

      {/* Subtle ambient brand glow in background */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-0 top-1/4 h-[420px] w-[420px] translate-x-1/3 rounded-full opacity-[0.06]"
        style={{ background: 'radial-gradient(circle, #7950B5 0%, transparent 70%)' }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-0 bottom-1/4 h-[380px] w-[380px] -translate-x-1/3 rounded-full opacity-[0.04]"
        style={{ background: 'radial-gradient(circle, #54258A 0%, transparent 70%)' }}
      />

      {/* ── Falling Leaves Background Effect (Atmospheric, 2D Vector) ── */}
      <div
        ref={bgRef}
        className="live-bg pointer-events-none absolute inset-0 z-0 overflow-hidden"
        aria-hidden="true"
      >
        {activeLeaves.map((leaf) => (
          <div
            key={leaf.id}
            className="leaf-track absolute"
            style={{
              left: leaf.left,
              top: 0,
              width: `${leaf.width}px`,
              height: `${leaf.width * 1.1}px`,
              color: leaf.color,
              opacity: leaf.opacity,
              animation: shouldReduceMotion
                ? undefined
                : `leaf-fall ${leaf.duration}s linear infinite`,
              animationDelay: shouldReduceMotion ? undefined : `${leaf.delay}s`,
            }}
          >
            <div
              style={{
                animation: shouldReduceMotion
                  ? undefined
                  : `${leaf.sway} ${leaf.swayDur}s ease-in-out infinite`,
              }}
            >
              <LeafShape shape={leaf.shape} />
            </div>
          </div>
        ))}
      </div>

      <div className="container-x relative z-10">
        {/* Section Header */}
        <div className="mx-auto mb-12 max-w-2xl text-center md:mb-20">
          <div className="inline-flex items-center gap-2 rounded-full border border-line bg-white px-4 py-1.5 text-xs font-bold tracking-[0.2em] text-[#0A0A0F] uppercase shadow-sm mb-4">
            <span className="h-2 w-2 rounded-full bg-gradient-to-r from-[#35145B] via-[#54258A] to-[#7950B5]" />
            OUR SERVICES
          </div>
          <h2 className="text-2xl min-[380px]:text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#0A0A0F]">
            {s.title || 'Meet Our Services'}
          </h2>
          <p className="mt-2.5 sm:mt-3 text-sm sm:text-base md:text-lg text-[#6B6B7B] leading-relaxed">
            {s.subtitle || 'Everything your brand needs to look sharp and grow online, built by people who care about the details.'}
          </p>
        </div>

        {/* Clean, Premium 6-Card Layout: 3 Columns Desktop, 2 Columns Tablet, 1 Column Mobile */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-7 items-stretch">
          {s.items.map((item, idx) => (
            <ServiceCard
              key={item.title + idx}
              item={item}
              index={idx}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
