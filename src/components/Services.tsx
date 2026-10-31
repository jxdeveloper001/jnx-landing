import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import {
  Code2,
  LayoutGrid,
  Monitor,
  PenTool,
  ShieldCheck,
  Smartphone,
} from 'lucide-react';
import { useRef } from 'react';
import { content } from '../content';

// ── 1. Website Design: Multiple React Logos (Light-purple tint, blurred & low-opacity) ───
function WatermarkReact() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 overflow-hidden select-none opacity-[0.08] transition-opacity duration-300 group-hover:opacity-[0.15]"
    >
      {/* Large React atomic symbol in top-right */}
      <svg
        className="absolute -right-8 -top-8 h-48 w-48 text-[#7C3AED] blur-[0.8px]"
        viewBox="-11.5 -10.23174 23 20.46348"
        fill="currentColor"
      >
        <circle cx="0" cy="0" r="2.05" fill="currentColor" />
        <g stroke="currentColor" strokeWidth="1" fill="none">
          <ellipse rx="11" ry="4.2" />
          <ellipse rx="11" ry="4.2" transform="rotate(60)" />
          <ellipse rx="11" ry="4.2" transform="rotate(120)" />
        </g>
      </svg>
      {/* Secondary smaller React logo in bottom-left */}
      <svg
        className="absolute -bottom-6 -left-6 h-28 w-28 text-[#9333EA] blur-[0.8px]"
        viewBox="-11.5 -10.23174 23 20.46348"
        fill="currentColor"
      >
        <circle cx="0" cy="0" r="2.05" fill="currentColor" />
        <g stroke="currentColor" strokeWidth="1" fill="none">
          <ellipse rx="11" ry="4.2" />
          <ellipse rx="11" ry="4.2" transform="rotate(60)" />
          <ellipse rx="11" ry="4.2" transform="rotate(120)" />
        </g>
      </svg>
      {/* Small floating React accent */}
      <svg
        className="absolute top-1/2 right-1/4 h-16 w-16 text-[#7C3AED] blur-[0.5px] opacity-70"
        viewBox="-11.5 -10.23174 23 20.46348"
        fill="currentColor"
      >
        <circle cx="0" cy="0" r="2.05" fill="currentColor" />
        <g stroke="currentColor" strokeWidth="1" fill="none">
          <ellipse rx="11" ry="4.2" />
          <ellipse rx="11" ry="4.2" transform="rotate(60)" />
          <ellipse rx="11" ry="4.2" transform="rotate(120)" />
        </g>
      </svg>
    </div>
  );
}

// ── 2. Website Development: Binary 0 & 1 Pattern (Light-purple tint) ─────────────
function WatermarkBinary() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 overflow-hidden select-none opacity-[0.08] transition-opacity duration-300 group-hover:opacity-[0.15]"
    >
      <div className="absolute -right-3 -top-3 font-mono text-xs sm:text-[13px] leading-relaxed text-[#7C3AED] tracking-[0.22em] blur-[0.6px] select-none text-right">
        <div>01001010 01001110 01011000</div>
        <div>11010010 10110101 01100001</div>
        <div>00101101 01100100 11010110</div>
        <div>10100101 01110011 00101010</div>
        <div>01101011 11010100 10101100</div>
        <div>10010110 00101101 01100111</div>
        <div>01010100 10101100 11010010</div>
        <div>11001010 01101001 00101101</div>
      </div>
      <svg
        className="absolute left-2 bottom-2 h-20 w-36 text-[#9333EA] blur-[1px]"
        viewBox="0 0 160 80"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.2"
      >
        <path d="M10 20 L40 20 L55 50 L100 50 L115 25 L150 25" strokeDasharray="3 3" />
        <circle cx="10" cy="20" r="3" fill="currentColor" />
        <circle cx="150" cy="25" r="3" fill="currentColor" />
        <circle cx="100" cy="50" r="3" fill="currentColor" />
      </svg>
    </div>
  );
}

// ── 3. App Development: YouTube, Facebook, Instagram, LinkedIn Logos (Light-purple) ──
function WatermarkAppPlatforms() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 overflow-hidden select-none opacity-[0.08] transition-opacity duration-300 group-hover:opacity-[0.15]"
    >
      {/* YouTube icon */}
      <svg
        className="absolute top-3 right-4 h-15 w-15 text-[#7C3AED] blur-[0.8px]"
        viewBox="0 0 24 24"
        fill="currentColor"
      >
        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
      </svg>
      {/* Instagram icon */}
      <svg
        className="absolute bottom-2 right-8 h-16 w-16 text-[#9333EA] blur-[0.8px]"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
      >
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" strokeWidth="2.5" strokeLinecap="round" />
      </svg>
      {/* Facebook "f" */}
      <svg
        className="absolute bottom-2 left-3 h-14 w-14 text-[#7C3AED] blur-[0.8px]"
        viewBox="0 0 24 24"
        fill="currentColor"
      >
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
      </svg>
      {/* LinkedIn "in" */}
      <svg
        className="absolute top-6 left-1/3 h-11 w-11 text-[#A855F7] blur-[0.8px]"
        viewBox="0 0 24 24"
        fill="currentColor"
      >
        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
      </svg>
    </div>
  );
}

// ── 4. UI/UX Design: Chipset & Circuit Pattern (Light-purple tint) ─────────────
function WatermarkChipset() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 overflow-hidden select-none opacity-[0.08] transition-opacity duration-300 group-hover:opacity-[0.15]"
    >
      <svg
        className="absolute -right-4 -bottom-4 h-44 w-44 text-[#7C3AED] blur-[0.6px]"
        viewBox="0 0 120 120"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.2"
      >
        <rect x="35" y="35" width="50" height="50" rx="8" strokeWidth="1.8" fill="rgba(124,58,237,0.06)" />
        <rect x="43" y="43" width="34" height="34" rx="4" strokeDasharray="3 2" />
        <circle cx="60" cy="60" r="6" fill="currentColor" fillOpacity="0.2" />
        {/* Top Pins */}
        <line x1="45" y1="35" x2="45" y2="15" />
        <line x1="55" y1="35" x2="55" y2="10" />
        <line x1="65" y1="35" x2="65" y2="10" />
        <line x1="75" y1="35" x2="75" y2="15" />
        {/* Bottom Pins */}
        <line x1="45" y1="85" x2="45" y2="105" />
        <line x1="55" y1="85" x2="55" y2="110" />
        <line x1="65" y1="85" x2="65" y2="110" />
        <line x1="75" y1="85" x2="75" y2="105" />
        {/* Left Pins */}
        <line x1="35" y1="45" x2="15" y2="45" />
        <line x1="35" y1="55" x2="10" y2="55" />
        <line x1="35" y1="65" x2="10" y2="65" />
        <line x1="35" y1="75" x2="15" y2="75" />
        {/* Right Pins with angled traces */}
        <path d="M85 45 L105 45 L115 35" />
        <path d="M85 55 L110 55" />
        <path d="M85 65 L110 65" />
        <path d="M85 75 L105 75 L115 85" />
        <circle cx="45" cy="15" r="2" fill="currentColor" />
        <circle cx="75" cy="15" r="2" fill="currentColor" />
        <circle cx="15" cy="45" r="2" fill="currentColor" />
        <circle cx="15" cy="75" r="2" fill="currentColor" />
        <circle cx="115" cy="35" r="2" fill="currentColor" />
        <circle cx="115" cy="85" r="2" fill="currentColor" />
      </svg>
    </div>
  );
}

// ── 5. Branding & Logo: Pen-tool Curves & Design Elements (Light-purple tint) ────
function WatermarkBranding() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 overflow-hidden select-none opacity-[0.08] transition-opacity duration-300 group-hover:opacity-[0.15]"
    >
      <svg
        className="absolute -right-2 top-0 h-44 w-44 text-[#7C3AED] blur-[0.7px]"
        viewBox="0 0 140 140"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.4"
      >
        <path d="M10 110 C 40 40, 90 130, 130 30" strokeWidth="1.8" />
        <path d="M20 120 C 60 70, 100 110, 135 50" strokeDasharray="3 3" />
        <line x1="40" y1="40" x2="65" y2="45" strokeDasharray="2 2" />
        <circle cx="40" cy="40" r="3" fill="currentColor" />
        <circle cx="65" cy="45" r="2" fill="none" strokeWidth="1.5" />
        <g transform="translate(75, 45) rotate(45)">
          <path d="M0 0 L10 25 L5 30 L0 18 L-5 30 L-10 25 Z" fill="currentColor" fillOpacity="0.25" stroke="currentColor" strokeWidth="1.2" />
          <circle cx="0" cy="12" r="1.5" fill="currentColor" />
          <line x1="0" y1="12" x2="0" y2="0" stroke="currentColor" strokeWidth="1" />
        </g>
        <circle cx="95" cy="95" r="30" strokeWidth="1" strokeDasharray="4 2" />
        <circle cx="95" cy="95" r="18" strokeWidth="1" />
      </svg>
    </div>
  );
}

// ── 6. Maintenance & Support: Security Shield & Lock (Light-purple tint) ─────────
function WatermarkSecurity() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 overflow-hidden select-none opacity-[0.08] transition-opacity duration-300 group-hover:opacity-[0.15]"
    >
      <svg
        className="absolute right-0 -bottom-2 h-42 w-42 text-[#7C3AED] blur-[0.7px]"
        viewBox="0 0 120 120"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.3"
      >
        <path
          d="M60 15 L95 28 C95 65 78 88 60 102 C42 88 25 65 25 28 Z"
          fill="rgba(124,58,237,0.05)"
          strokeWidth="1.8"
        />
        <rect x="48" y="55" width="24" height="18" rx="3" strokeWidth="1.5" fill="currentColor" fillOpacity="0.15" />
        <path d="M53 55 V47 C53 43 56 40 60 40 C64 40 67 43 67 47 V55" strokeWidth="1.8" />
        <circle cx="60" cy="63" r="2" fill="currentColor" />
        <line x1="60" y1="65" x2="60" y2="69" strokeWidth="1.5" />
        <circle cx="60" cy="60" r="48" strokeDasharray="3 4" strokeWidth="0.8" />
      </svg>
    </div>
  );
}

const WATERMARKS = [
  WatermarkReact,
  WatermarkBinary,
  WatermarkAppPlatforms,
  WatermarkChipset,
  WatermarkBranding,
  WatermarkSecurity,
];

const SERVICE_ICONS = [
  Monitor,
  Code2,
  Smartphone,
  LayoutGrid,
  PenTool,
  ShieldCheck,
];

function ServiceCard({
  item,
  index,
  shouldReduceMotion,
}: {
  item: (typeof content.services.items)[number];
  index: number;
  shouldReduceMotion: boolean | null;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const stagger = (index % 3) * 0.025;
  const startOffset = `${Math.round((0.93 - stagger) * 100)}%`;
  const endOffset = `${Math.round((0.67 - stagger) * 100)}%`;

  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: [`start ${startOffset}` as any, `start ${endOffset}` as any],
  });

  const y = useTransform(scrollYProgress, [0, 1], [30, 0]);
  const opacity = useTransform(scrollYProgress, [0, 0.35, 1], [0.15, 0.65, 1]);
  const blurPx = useTransform(scrollYProgress, [0, 0.85, 1], [7, 1, 0]);
  const filter = useTransform(blurPx, (v) => (v > 0.08 ? `blur(${v.toFixed(1)}px)` : 'none'));

  const motionStyle = shouldReduceMotion
    ? { opacity: 1, y: 0, filter: 'none' }
    : { opacity, y, filter };

  const Watermark = WATERMARKS[index] || WatermarkReact;
  const Icon = SERVICE_ICONS[index] || Monitor;

  return (
    <motion.article
      ref={cardRef}
      style={{
        ...motionStyle,
        willChange: shouldReduceMotion ? 'auto' : 'transform, opacity, filter',
      }}
      className="group relative flex flex-col items-center text-center rounded-3xl bg-white/95 px-6 pb-7 pt-11 sm:px-7 sm:pb-8 sm:pt-12 shadow-[0_10px_35px_-8px_rgba(76,29,149,0.08),0_2px_12px_rgba(10,10,15,0.03)] transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_22px_45px_-10px_rgba(76,29,149,0.16)]"
    >
      {/* Floating 2D Vector Icon Badge at Top Center (Slightly overlapping card top edge) */}
      <div className="absolute -top-6.5 sm:-top-7 left-1/2 -translate-x-1/2 z-20 flex h-13 w-13 sm:h-14 sm:w-14 items-center justify-center rounded-2xl bg-white shadow-[0_6px_20px_-3px_rgba(76,29,149,0.18),0_2px_6px_rgba(10,10,15,0.04)] border border-purple-50 transition-transform duration-300 group-hover:scale-110">
        <Icon className="h-5 w-5 sm:h-6 sm:w-6 text-[#7C3AED] stroke-[1.8]" aria-hidden="true" />
      </div>

      {/* Topic-Related Light-Purple Blurred Background Watermark */}
      <Watermark />

      {/* Card Content Area */}
      <div className="relative z-10 flex flex-1 flex-col items-center justify-between w-full">
        <div>
          {/* Clear Service Title */}
          <h3 className="text-lg sm:text-xl md:text-[22px] font-bold tracking-tight text-[#0A0A0F] transition-colors duration-200 group-hover:text-[var(--purple-bright)]">
            {item.title}
          </h3>

          {/* Short, Readable Description */}
          <p className="mt-2.5 sm:mt-3 text-[13px] sm:text-sm md:text-[15px] leading-relaxed text-[#5A5A6D]">
            {item.text}
          </p>
        </div>
      </div>
    </motion.article>
  );
}

export default function Services() {
  const s = content.services;
  const shouldReduceMotion = useReducedMotion();

  return (
    <section
      id="service"
      className="relative overflow-hidden py-16 sm:py-20 md:py-28"
    >
      {/* Back-compat anchor */}
      <div id="about" className="absolute -top-24" aria-hidden />

      {/* Subtle ambient brand glow in background */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-0 top-1/4 h-[420px] w-[420px] translate-x-1/3 rounded-full opacity-[0.06]"
        style={{ background: 'radial-gradient(circle, #7C3AED 0%, transparent 70%)' }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-0 bottom-1/4 h-[380px] w-[380px] -translate-x-1/3 rounded-full opacity-[0.04]"
        style={{ background: 'radial-gradient(circle, #4C1D95 0%, transparent 70%)' }}
      />

      <div className="container-x relative z-10">
        {/* Section Header */}
        <div className="mx-auto mb-12 max-w-2xl text-center md:mb-20">
          <div className="inline-flex items-center gap-2 rounded-full border border-line bg-white px-4 py-1.5 text-xs font-bold tracking-[0.2em] text-[#0A0A0F] uppercase shadow-sm mb-4">
            <span className="h-2 w-2 rounded-full bg-gradient-to-r from-[#2B0B5E] via-[#4C1D95] to-[#7C3AED]" />
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-11 sm:gap-x-8 sm:gap-y-14 lg:gap-x-8 lg:gap-y-14 items-stretch pt-4 sm:pt-6">
          {s.items.map((item, idx) => (
            <ServiceCard
              key={item.title + idx}
              item={item}
              index={idx}
              shouldReduceMotion={shouldReduceMotion}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
