import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from 'framer-motion';
import type { MotionValue } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { content } from '../content';
import { useSectionLiveBg } from '../hooks/useSectionLiveBg';
import Reveal from './Reveal';

// ── Minimal 2D Vector Silhouette for Flying Birds ────────────────────────────
function BirdSilhouette() {
  return (
    <svg viewBox="0 0 32 16" fill="currentColor" className="h-full w-full">
      <path d="M1 8 C 8 2, 14 5, 16 9 C 18 5, 24 2, 31 8 C 24 6, 18 10, 16 14 C 14 10, 8 6, 1 8 Z" />
    </svg>
  );
}

// ── Flowing 2D lines: each is a seamless wave tile (two periods across a 2400-wide viewBox) ──
function wavePath(cycles: number, amp: number, y0: number, phase = 1): string {
  const seg = 1200 / (cycles * 2);
  let d = `M0 ${y0}`;
  for (let i = 0; i < cycles * 4; i++) {
    const dir = (i % 2 === 0 ? -1 : 1) * phase;
    const x = i * seg;
    d += ` C${(x + seg * 0.36).toFixed(1)} ${y0 + dir * amp} ${(x + seg * 0.64).toFixed(1)} ${y0 + dir * amp} ${(x + seg).toFixed(1)} ${y0}`;
  }
  return d;
}

const FLOW_LINES = [
  { top: '8%', h: 180, d: wavePath(1, 70, 90), color: '#7950B5', opacity: 0.5, sw: 1.4, dur: 46, delay: -8, minTier: 0 },
  { top: '24%', h: 180, d: wavePath(2, 46, 90, -1), color: '#B69AE8', opacity: 0.32, sw: 1, dur: 62, delay: -30, minTier: 1 },
  { top: '42%', h: 220, d: wavePath(1, 90, 110), color: '#54258A', opacity: 0.85, sw: 1.6, dur: 54, delay: -20, minTier: 0 },
  { top: '60%', h: 180, d: wavePath(2, 56, 90, -1), color: '#7950B5', opacity: 0.42, sw: 1.1, dur: 70, delay: -44, minTier: 1 },
  { top: '78%', h: 180, d: wavePath(1, 64, 90), color: '#B69AE8', opacity: 0.3, sw: 1.2, dur: 50, delay: -12, minTier: 0 },
];

// 4 distinct vertical lanes ensuring birds NEVER collide or overlap vertically or horizontally
const BIRDS_CONFIG = [
  { id: 1, top: '11%', width: 22, height: 11, color: '#B69AE8', opacity: 0.35, duration: 29, delay: -4, anim: 'bird-solo-fly-1', flapDur: 0.65, minTier: 0 },
  { id: 2, top: '34%', width: 18, height: 9, color: '#C6B2EC', opacity: 0.30, duration: 36, delay: -19, anim: 'bird-solo-fly-2', flapDur: 0.70, minTier: 1 },
  { id: 3, top: '58%', width: 20, height: 10, color: '#B69AE8', opacity: 0.32, duration: 31, delay: -11, anim: 'bird-solo-fly-3', flapDur: 0.62, minTier: 0 },
  { id: 4, top: '81%', width: 17, height: 8.5, color: '#B69AE8', opacity: 0.28, duration: 38, delay: -26, anim: 'bird-solo-fly-4', flapDur: 0.68, minTier: 1 },
];

type Step = {
  number: string;
  name: string;
  title: string;
  description: string;
};

// ── Step Card: Clean, Flat 2D Card ───────────────────────────────────────────
function StepCard({
  step,
  isLeft,
  opacity,
  scale,
  x,
}: {
  step: Step;
  isLeft: boolean;
  opacity: MotionValue<number> | number;
  scale: MotionValue<number> | number;
  x: MotionValue<number> | number;
}) {
  return (
    <motion.article
      style={{
        opacity,
        scale,
        x,
      }}
      className="relative w-full max-w-[440px] overflow-hidden rounded-[20px] sm:rounded-[24px] bg-white/95 border border-[#E8E6EF] p-5 sm:p-7 md:p-8 select-none shadow-[0_4px_20px_-2px_rgba(84,37,138,0.05),0_1px_3px_0_rgba(10,10,15,0.03)]"
    >
      {/* Card Content */}
      <div className="relative z-10">
        <div className="text-[11px] sm:text-xs md:text-sm font-bold uppercase tracking-wider bg-gradient-to-r from-[#35145B] via-[#54258A] to-[#7950B5] bg-clip-text text-transparent">
          {step.number} — {step.name}
        </div>
        <h3 className="mt-2 sm:mt-3 text-lg min-[380px]:text-xl sm:text-2xl md:text-[28px] font-bold tracking-tight text-[#0A0A0F] leading-snug">
          {step.title}
        </h3>
        <p className="mt-2 sm:mt-3 text-xs min-[380px]:text-sm sm:text-base leading-relaxed text-[#6B6B7B]">
          {step.description}
        </p>
      </div>
    </motion.article>
  );
}

// ── Step Node: 48px white rounded-square badge with purple dot & soft shadow ──
function StepNode({
  nodeRef,
  scale,
  opacity,
  highlight,
}: {
  nodeRef: (el: HTMLDivElement | null) => void;
  scale: MotionValue<number> | number;
  opacity: MotionValue<number> | number;
  highlight?: MotionValue<number> | number;
}) {
  return (
    <motion.div
      ref={nodeRef}
      style={{ scale, opacity }}
      className="relative z-20 flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-b from-white to-[#F6F2FC] shadow-[0_8px_20px_-6px_rgba(84,37,138,0.38),0_1px_3px_rgba(36,17,61,0.14),inset_0_1px_0_#fff]"
      aria-hidden="true"
    >
      <div className="h-3.5 w-3.5 rounded-full bg-gradient-to-tr from-[#35145B] via-[#54258A] to-[#7950B5] shadow-[0_2px_6px_rgba(36,17,61,0.35),inset_0_1px_0_rgba(255,255,255,0.35)]" />
      {/* Synchronized highlight ring when head reaches this node */}
      {highlight && (
        <motion.div
          style={{ opacity: highlight }}
          className="pointer-events-none absolute -inset-1 rounded-[18px] border-2 border-[var(--purple-bright)] shadow-[0_0_16px_rgba(121,80,181,0.45)]"
        />
      )}
    </motion.div>
  );
}

// ── Desktop Step Row Component ───────────────────────────────────────────────
function DesktopStepRow({
  step,
  index,
  smoothProgress,
  threshold,
  shouldReduceMotion,
  setNodeRef,
}: {
  step: Step;
  index: number;
  smoothProgress: MotionValue<number>;
  threshold: number;
  shouldReduceMotion: boolean;
  setNodeRef: (el: HTMLDivElement | null) => void;
}) {
  const isLeft = index % 2 === 0;

  // Reveal window around threshold: noticeably faster and responsive to scroll
  const winStart = Math.max(0, threshold - 0.08);
  const winEnd = Math.min(1, threshold + 0.03);

  const stepProgress = useTransform(
    smoothProgress,
    [winStart, winEnd],
    [0, 1],
    { clamp: true }
  );

  const cardOpacity = shouldReduceMotion ? 1 : stepProgress;
  const cardScale = shouldReduceMotion
    ? 1
    : useTransform(stepProgress, [0, 1], [0.97, 1]);
  const startX = isLeft ? -24 : 24;
  const cardX = shouldReduceMotion
    ? 0
    : useTransform(stepProgress, [0, 1], [startX, 0]);

  const nodeScale = shouldReduceMotion
    ? 1
    : useTransform(stepProgress, [0, 0.6, 1], [0.7, 1.1, 1]);
  const nodeOpacity = shouldReduceMotion
    ? 1
    : useTransform(stepProgress, [0, 0.3], [0.3, 1]);
  const nodeHighlight = shouldReduceMotion
    ? 1
    : useTransform(stepProgress, [0, 0.45, 1], [0, 1, 0.85]);

  return (
    <div className="grid grid-cols-[1fr_48px_1fr] items-center gap-x-14">
      {/* Left Column (56px from center line) */}
      <div className="flex justify-end">
        {isLeft ? (
          <StepCard
            step={step}
            isLeft={true}
            opacity={cardOpacity}
            scale={cardScale}
            x={cardX}
          />
        ) : (
          <div />
        )}
      </div>

      {/* Center Node Badge */}
      <div className="flex justify-center">
        <StepNode
          nodeRef={setNodeRef}
          scale={nodeScale}
          opacity={nodeOpacity}
          highlight={nodeHighlight}
        />
      </div>

      {/* Right Column (56px from center line) */}
      <div className="flex justify-start">
        {!isLeft ? (
          <StepCard
            step={step}
            isLeft={false}
            opacity={cardOpacity}
            scale={cardScale}
            x={cardX}
          />
        ) : (
          <div />
        )}
      </div>
    </div>
  );
}

// ── Mobile Step Row Component ────────────────────────────────────────────────
function MobileStepRow({
  step,
  smoothProgress,
  threshold,
  shouldReduceMotion,
  setNodeRef,
}: {
  step: Step;
  index: number;
  smoothProgress: MotionValue<number>;
  threshold: number;
  shouldReduceMotion: boolean;
  setNodeRef: (el: HTMLDivElement | null) => void;
}) {
  const winStart = Math.max(0, threshold - 0.08);
  const winEnd = Math.min(1, threshold + 0.03);

  const stepProgress = useTransform(
    smoothProgress,
    [winStart, winEnd],
    [0, 1],
    { clamp: true }
  );

  const cardOpacity = shouldReduceMotion ? 1 : stepProgress;
  const cardScale = shouldReduceMotion
    ? 1
    : useTransform(stepProgress, [0, 1], [0.98, 1]);
  const cardX = shouldReduceMotion
    ? 0
    : useTransform(stepProgress, [0, 1], [20, 0]);

  const nodeScale = shouldReduceMotion
    ? 1
    : useTransform(stepProgress, [0, 0.7, 1], [0.55, 1.15, 1]);
  const nodeOpacity = shouldReduceMotion
    ? 1
    : useTransform(stepProgress, [0, 0.35], [0.2, 1]);
  const nodeHighlight = shouldReduceMotion
    ? 1
    : useTransform(stepProgress, [0, 0.45, 1], [0, 1, 0.85]);

  return (
    <div className="relative flex items-center gap-3.5 sm:gap-6">
      {/* Node Badge on the left line */}
      <div className="shrink-0">
        <StepNode
          nodeRef={setNodeRef}
          scale={nodeScale}
          opacity={nodeOpacity}
          highlight={nodeHighlight}
        />
      </div>

      {/* Card on the right of the line */}
      <div className="min-w-0 flex-1">
        <StepCard
          step={step}
          isLeft={false}
          opacity={cardOpacity}
          scale={cardScale}
          x={cardX}
        />
      </div>
    </div>
  );
}

// ── Main HowWeWork Section ───────────────────────────────────────────────────
export default function HowWeWork() {
  const c = content.howWeWork;
  const shouldReduceMotion = useReducedMotion();

  const sectionRef = useRef<HTMLElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const { isLowPower } = useSectionLiveBg(sectionRef, bgRef);

  const activeFlow = isLowPower
    ? FLOW_LINES.filter((f) => f.minTier === 0)
    : FLOW_LINES;

  const activeBirds = isLowPower
    ? BIRDS_CONFIG.filter((b) => b.minTier === 0)
    : BIRDS_CONFIG;

  const desktopContainerRef = useRef<HTMLDivElement>(null);
  const mobileContainerRef = useRef<HTMLDivElement>(null);

  const desktopScrollTargetRef = useRef<HTMLDivElement>(null);
  const mobileScrollTargetRef = useRef<HTMLDivElement>(null);

  const desktopPathRef = useRef<SVGPathElement>(null);
  const mobilePathRef = useRef<SVGPathElement>(null);

  const desktopNodeRefs = useRef<(HTMLDivElement | null)[]>([]);
  const mobileNodeRefs = useRef<(HTMLDivElement | null)[]>([]);

  const [desktopPathD, setDesktopPathD] = useState('');
  const [mobilePathD, setMobilePathD] = useState('');

  const [desktopMetrics, setDesktopMetrics] = useState({ y0: 0, height: 0 });
  const [mobileMetrics, setMobileMetrics] = useState({ y0: 0, height: 0 });

  const [desktopThresholds, setDesktopThresholds] = useState<number[]>([
    0.05, 0.26, 0.48, 0.69, 0.88,
  ]);
  const [mobileThresholds, setMobileThresholds] = useState<number[]>([
    0.05, 0.26, 0.48, 0.69, 0.88,
  ]);

  const desktopLutRef = useRef<{ x: number; y: number }[]>([]);
  const mobileLutRef = useRef<{ x: number; y: number }[]>([]);

  // Highly responsive scroll progress targeting the steps container directly
  // Step 1 begins immediately as steps enter, Step 5 is fully reached before section exits
  const { scrollYProgress: desktopScrollYProgress } = useScroll({
    target: desktopContainerRef,
    offset: ['start 78%', 'end 62%'],
  });

  const desktopSmoothProgress = useSpring(desktopScrollYProgress, {
    stiffness: 350,
    damping: 32,
    mass: 0.1,
    restDelta: 0.0005,
  });

  // Mobile scroll progress targeting the mobile container
  const { scrollYProgress: mobileScrollYProgress } = useScroll({
    target: mobileContainerRef,
    offset: ['start 78%', 'end 62%'],
  });

  const mobileSmoothProgress = useSpring(mobileScrollYProgress, {
    stiffness: 350,
    damping: 32,
    mass: 0.1,
    restDelta: 0.0005,
  });

  // Desktop Leading Dot motion values from precomputed 200-point LUT
  const desktopDotX = useTransform(desktopSmoothProgress, (p) => {
    const lut = desktopLutRef.current;
    if (!lut || lut.length === 0) return 0;
    const clamped = Math.max(0, Math.min(1, p));
    const idx = clamped * (lut.length - 1);
    const i = Math.floor(idx);
    const frac = idx - i;
    if (i >= lut.length - 1) return lut[lut.length - 1].x;
    return lut[i].x + (lut[i + 1].x - lut[i].x) * frac;
  });

  const desktopDotY = useTransform(desktopSmoothProgress, (p) => {
    const lut = desktopLutRef.current;
    if (!lut || lut.length === 0) return 0;
    const clamped = Math.max(0, Math.min(1, p));
    const idx = clamped * (lut.length - 1);
    const i = Math.floor(idx);
    const frac = idx - i;
    if (i >= lut.length - 1) return lut[lut.length - 1].y;
    return lut[i].y + (lut[i + 1].y - lut[i].y) * frac;
  });

  const desktopDotOpacity = useTransform(desktopSmoothProgress, (p) => {
    if (shouldReduceMotion) return 0;
    return p > 0.005 ? 1 : 0;
  });

  // Mobile Leading Dot motion values from precomputed 200-point LUT
  const mobileDotX = useTransform(mobileSmoothProgress, (p) => {
    const lut = mobileLutRef.current;
    if (!lut || lut.length === 0) return 0;
    const clamped = Math.max(0, Math.min(1, p));
    const idx = clamped * (lut.length - 1);
    const i = Math.floor(idx);
    const frac = idx - i;
    if (i >= lut.length - 1) return lut[lut.length - 1].x;
    return lut[i].x + (lut[i + 1].x - lut[i].x) * frac;
  });

  const mobileDotY = useTransform(mobileSmoothProgress, (p) => {
    const lut = mobileLutRef.current;
    if (!lut || lut.length === 0) return 0;
    const clamped = Math.max(0, Math.min(1, p));
    const idx = clamped * (lut.length - 1);
    const i = Math.floor(idx);
    const frac = idx - i;
    if (i >= lut.length - 1) return lut[lut.length - 1].y;
    return lut[i].y + (lut[i + 1].y - lut[i].y) * frac;
  });

  const mobileDotOpacity = useTransform(mobileSmoothProgress, (p) => {
    if (shouldReduceMotion) return 0;
    return p > 0.005 ? 1 : 0;
  });

  // Measure and compute SVG path geometry on mount and window resize
  useEffect(() => {
    function computePaths() {
      // 1. Desktop S-wave path
      if (desktopContainerRef.current) {
        const cRect = desktopContainerRef.current.getBoundingClientRect();
        const pts: { x: number; y: number }[] = [];

        for (let i = 0; i < c.steps.length; i++) {
          const el = desktopNodeRefs.current[i];
          if (el) {
            const r = el.getBoundingClientRect();
            pts.push({
              x: r.left + r.width / 2 - cRect.left,
              y: r.top + r.height / 2 - cRect.top,
            });
          }
        }

        if (pts.length === c.steps.length) {
          const p0 = pts[0];
          const pLast = pts[pts.length - 1];
          const Xc = p0.x;
          const tail = 48;

          // Elegant, winding curved path resembling the decorative line in Testimonials
          let d = `M ${Xc.toFixed(1)} ${p0.y.toFixed(1)}`;
          for (let i = 0; i < pts.length - 1; i++) {
            const cur = pts[i];
            const nxt = pts[i + 1];
            const dy = nxt.y - cur.y;
            const amp = i % 2 === 0 ? 38 : -38;
            const cp1x = Xc + amp;
            const cp1y = cur.y + dy * 0.28;
            const cp2x = Xc + amp * 0.88;
            const cp2y = cur.y + dy * 0.72;
            d += ` C ${cp1x.toFixed(1)} ${cp1y.toFixed(1)}, ${cp2x.toFixed(1)} ${cp2y.toFixed(1)}, ${nxt.x.toFixed(1)} ${nxt.y.toFixed(1)}`;
          }
          // Short tail of 48px past last node with a graceful finishing curve
          d += ` C ${Xc.toFixed(1)} ${(pLast.y + 16).toFixed(1)}, ${(Xc - 12).toFixed(1)} ${(pLast.y + 32).toFixed(1)}, ${Xc.toFixed(1)} ${(pLast.y + tail).toFixed(1)}`;
          setDesktopPathD(d);

          const wrapperHeight = pLast.y - p0.y + tail;
          setDesktopMetrics({ y0: p0.y, height: wrapperHeight });
        }
      }

      // 2. Mobile vertical path
      if (mobileContainerRef.current) {
        const cRect = mobileContainerRef.current.getBoundingClientRect();
        const pts: { x: number; y: number }[] = [];

        for (let i = 0; i < c.steps.length; i++) {
          const el = mobileNodeRefs.current[i];
          if (el) {
            const r = el.getBoundingClientRect();
            pts.push({
              x: r.left + r.width / 2 - cRect.left,
              y: r.top + r.height / 2 - cRect.top,
            });
          }
        }

        if (pts.length === c.steps.length) {
          const p0 = pts[0];
          const pLast = pts[pts.length - 1];
          const Xm = p0.x;
          const tail = 48;

          const d = `M ${Xm.toFixed(1)} ${p0.y.toFixed(1)} L ${Xm.toFixed(1)} ${(pLast.y + tail).toFixed(1)}`;
          setMobilePathD(d);

          const wrapperHeight = pLast.y - p0.y + tail;
          setMobileMetrics({ y0: p0.y, height: wrapperHeight });
        }
      }
    }

    computePaths();

    let rafId = 0;
    const debouncedCompute = () => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(computePaths);
    };

    const ro = new ResizeObserver(debouncedCompute);

    if (desktopContainerRef.current) ro.observe(desktopContainerRef.current);
    if (mobileContainerRef.current) ro.observe(mobileContainerRef.current);
    window.addEventListener('resize', debouncedCompute, { passive: true });

    return () => {
      cancelAnimationFrame(rafId);
      ro.disconnect();
      window.removeEventListener('resize', debouncedCompute);
    };
  }, [c.steps.length]);

  // Precompute 200-point LUT and node thresholds for Desktop
  useEffect(() => {
    if (!desktopPathD || !desktopPathRef.current) return;
    try {
      const pathEl = desktopPathRef.current;
      const totalLen = pathEl.getTotalLength();
      if (totalLen <= 0) return;

      const SAMPLES = 200;
      const lut: { x: number; y: number }[] = [];
      for (let i = 0; i <= SAMPLES; i++) {
        const pt = pathEl.getPointAtLength((i / SAMPLES) * totalLen);
        lut.push({ x: pt.x, y: pt.y });
      }
      desktopLutRef.current = lut;

      // Compute exact threshold along path for each node center
      const cRect = desktopContainerRef.current?.getBoundingClientRect();
      if (cRect) {
        const ths = c.steps.map((_, i) => {
          const el = desktopNodeRefs.current[i];
          if (!el) return (i / (c.steps.length - 1)) * 0.88;
          const r = el.getBoundingClientRect();
          const nodeX = r.left + r.width / 2 - cRect.left;
          const nodeY = r.top + r.height / 2 - cRect.top;

          let bestIdx = 0;
          let minD = Infinity;
          for (let j = 0; j <= SAMPLES; j++) {
            const dx = lut[j].x - nodeX;
            const dy = lut[j].y - nodeY;
            const d = dx * dx + dy * dy;
            if (d < minD) {
              minD = d;
              bestIdx = j;
            }
          }
          const raw = bestIdx / SAMPLES;
          // Step 1 activates early (min 0.05), step 5 finishes at or before 0.88
          return Math.min(0.88, Math.max(0.05, raw));
        });
        setDesktopThresholds(ths);
      }
    } catch {
      // Fallback
    }
  }, [desktopPathD, c.steps]);

  // Precompute 200-point LUT and node thresholds for Mobile
  useEffect(() => {
    if (!mobilePathD || !mobilePathRef.current) return;
    try {
      const pathEl = mobilePathRef.current;
      const totalLen = pathEl.getTotalLength();
      if (totalLen <= 0) return;

      const SAMPLES = 200;
      const lut: { x: number; y: number }[] = [];
      for (let i = 0; i <= SAMPLES; i++) {
        const pt = pathEl.getPointAtLength((i / SAMPLES) * totalLen);
        lut.push({ x: pt.x, y: pt.y });
      }
      mobileLutRef.current = lut;

      const cRect = mobileContainerRef.current?.getBoundingClientRect();
      if (cRect) {
        const ths = c.steps.map((_, i) => {
          const el = mobileNodeRefs.current[i];
          if (!el) return (i / (c.steps.length - 1)) * 0.88;
          const r = el.getBoundingClientRect();
          const nodeX = r.left + r.width / 2 - cRect.left;
          const nodeY = r.top + r.height / 2 - cRect.top;

          let bestIdx = 0;
          let minD = Infinity;
          for (let j = 0; j <= SAMPLES; j++) {
            const dx = lut[j].x - nodeX;
            const dy = lut[j].y - nodeY;
            const d = dx * dx + dy * dy;
            if (d < minD) {
              minD = d;
              bestIdx = j;
            }
          }
          const raw = bestIdx / SAMPLES;
          return Math.min(0.88, Math.max(0.05, raw));
        });
        setMobileThresholds(ths);
      }
    } catch {
      // Fallback
    }
  }, [mobilePathD, c.steps]);

  return (
    <section
      ref={sectionRef}
      id="how-we-work"
      className="relative overflow-hidden bg-gradient-to-b from-[#111114] via-[#1B1030] to-[#111114] py-16 sm:py-24 md:py-32"
    >
      {/* ── Flying Birds Background Effect (Non-overlapping, 2D Silhouettes) ── */}
      <div
        ref={bgRef}
        className="live-bg pointer-events-none absolute inset-0 z-0 overflow-hidden"
        aria-hidden="true"
      >
        {/* Flowing curved lines, masked to fade at the edges */}
        <div className="flow-mask absolute inset-0">
          {activeFlow.map((f, i) => (
            <svg
              key={i}
              className="flow-line"
              viewBox={`0 0 2400 ${f.h}`}
              preserveAspectRatio="none"
              fill="none"
              style={{
                top: f.top,
                height: `${f.h / 2.4}px`,
                opacity: f.opacity,
                ['--flow-dur' as string]: `${f.dur}s`,
                ['--flow-delay' as string]: `${f.delay}s`,
              }}
            >
              <path d={f.d} stroke={f.color} strokeWidth={f.sw} strokeLinecap="round" vectorEffect="non-scaling-stroke" />
            </svg>
          ))}
        </div>

        {activeBirds.map((b) => (
          <div
            key={b.id}
            className="bird-track absolute"
            style={{
              top: b.top,
              width: `${b.width}px`,
              height: `${b.height}px`,
              color: b.color,
              opacity: b.opacity,
              animation: shouldReduceMotion
                ? undefined
                : `${b.anim} ${b.duration}s linear infinite`,
              animationDelay: shouldReduceMotion ? undefined : `${b.delay}s`,
            }}
          >
            <div
              className="bird-flap-anim h-full w-full"
              style={{
                animation: shouldReduceMotion
                  ? undefined
                  : `bird-wing-flap ${b.flapDur}s ease-in-out infinite`,
              }}
            >
              <BirdSilhouette />
            </div>
          </div>
        ))}
      </div>

      <div className="container-x relative z-10">
        {/* Section Heading */}
        <div className="mx-auto mb-12 max-w-2xl text-center md:mb-24">
          <Reveal>
            <div className="inline-flex items-center gap-2 rounded-full border border-line bg-white px-4 py-1.5 text-xs font-bold tracking-[0.2em] text-[#0A0A0F] uppercase shadow-sm">
              <span className="h-2 w-2 rounded-full bg-gradient-to-r from-[#35145B] via-[#54258A] to-[#7950B5]" />
              {c.eyebrow}
            </div>
            <h2 className="h2 mt-4 sm:mt-5 text-white">{c.headline}</h2>
            <p className="lead mt-3 sm:mt-4 text-[#B9B4CC]">{c.description}</p>
          </Reveal>
        </div>

        {/* ── DESKTOP TIMELINE (md and above) ───────────────────── */}
        <div
          ref={desktopContainerRef}
          className="relative mx-auto hidden max-w-[1040px] md:block"
        >
          {/* Scroll Target Wrapper spanning from node 0 center to node 4 center + 48px tail */}
          <div
            ref={desktopScrollTargetRef}
            className="pointer-events-none absolute left-0 right-0"
            style={{
              top: `${desktopMetrics.y0}px`,
              height: `${desktopMetrics.height || 1000}px`,
            }}
            aria-hidden="true"
          />

          {/* Central S-Curve SVG */}
          <svg
            className="pointer-events-none absolute inset-0 h-full w-full"
            aria-hidden="true"
          >
            <defs>
              <linearGradient
                id="hww-purple-grad"
                x1="0%"
                y1="0%"
                x2="0%"
                y2="100%"
              >
                <stop offset="0%" stopColor="#54258A" />
                <stop offset="50%" stopColor="#7950B5" />
                <stop offset="100%" stopColor="#B69AE8" />
              </linearGradient>
            </defs>

            {desktopPathD && (
              <>
                {/* Clean, flat 2D background guide path */}
                <path
                  d={desktopPathD}
                  fill="none"
                  stroke="rgba(255,255,255,0.14)"
                  strokeWidth="3"
                  strokeLinecap="round"
                />
                {/* Single active flat 2D purple gradient stroke */}
                <motion.path
                  ref={desktopPathRef}
                  d={desktopPathD}
                  fill="none"
                  stroke="url(#hww-purple-grad)"
                  strokeWidth="3"
                  strokeLinecap="round"
                  style={{
                    pathLength: shouldReduceMotion ? 1 : desktopSmoothProgress,
                  }}
                />
                {/* Clean leading dot traveling along the path */}
                {!shouldReduceMotion && (
                  <motion.g
                    style={{
                      x: desktopDotX,
                      y: desktopDotY,
                      opacity: desktopDotOpacity,
                    }}
                  >
                    <circle r="7" fill="#7950B5" fillOpacity="0.25" />
                    <circle
                      r="4"
                      fill="#7950B5"
                      stroke="#FFFFFF"
                      strokeWidth="1.5"
                    />
                  </motion.g>
                )}
              </>
            )}
          </svg>

          {/* 5 Alternating Process Rows */}
          <div className="space-y-16 lg:space-y-20 py-6">
            {c.steps.map((step, i) => (
              <DesktopStepRow
                key={step.number}
                step={step}
                index={i}
                smoothProgress={desktopSmoothProgress}
                threshold={desktopThresholds[i] ?? i * 0.24}
                shouldReduceMotion={shouldReduceMotion ?? false}
                setNodeRef={(el) => (desktopNodeRefs.current[i] = el)}
              />
            ))}
          </div>
        </div>

        {/* ── MOBILE TIMELINE (< md) ───────────────────────────── */}
        <div
          ref={mobileContainerRef}
          className="relative block md:hidden space-y-10 py-4"
        >
          {/* Mobile Scroll Target Wrapper */}
          <div
            ref={mobileScrollTargetRef}
            className="pointer-events-none absolute left-0 right-0"
            style={{
              top: `${mobileMetrics.y0}px`,
              height: `${mobileMetrics.height || 800}px`,
            }}
            aria-hidden="true"
          />

          {/* Mobile SVG line */}
          <svg
            className="pointer-events-none absolute inset-0 h-full w-full"
            aria-hidden="true"
          >
            <defs>
              <linearGradient
                id="hww-purple-grad-mobile"
                x1="0%"
                y1="0%"
                x2="0%"
                y2="100%"
              >
                <stop offset="0%" stopColor="#54258A" />
                <stop offset="50%" stopColor="#7950B5" />
                <stop offset="100%" stopColor="#B69AE8" />
              </linearGradient>
            </defs>
            {mobilePathD && (
              <>
                {/* Clean, flat 2D background guide path */}
                <path
                  d={mobilePathD}
                  fill="none"
                  stroke="rgba(255,255,255,0.14)"
                  strokeWidth="3"
                  strokeLinecap="round"
                />
                {/* Single active flat 2D purple gradient stroke */}
                <motion.path
                  ref={mobilePathRef}
                  d={mobilePathD}
                  fill="none"
                  stroke="url(#hww-purple-grad-mobile)"
                  strokeWidth="3"
                  strokeLinecap="round"
                  style={{
                    pathLength: shouldReduceMotion ? 1 : mobileSmoothProgress,
                  }}
                />
                {!shouldReduceMotion && (
                  <motion.g
                    style={{
                      x: mobileDotX,
                      y: mobileDotY,
                      opacity: mobileDotOpacity,
                    }}
                  >
                    <circle r="6" fill="#7950B5" fillOpacity="0.25" />
                    <circle
                      r="3.5"
                      fill="#7950B5"
                      stroke="#FFFFFF"
                      strokeWidth="1.5"
                    />
                  </motion.g>
                )}
              </>
            )}
          </svg>

          {c.steps.map((step, i) => (
            <MobileStepRow
              key={step.number}
              step={step}
              index={i}
              smoothProgress={mobileSmoothProgress}
              threshold={mobileThresholds[i] ?? i * 0.24}
              shouldReduceMotion={shouldReduceMotion ?? false}
              setNodeRef={(el) => (mobileNodeRefs.current[i] = el)}
            />
          ))}
        </div>

        {/* Closing Line: Plain centered text in normal heading typography */}
        <div className="mt-14 text-center sm:mt-20 md:mt-28">
          <Reveal>
            <h3 className="text-xl sm:text-2xl md:text-[32px] font-semibold tracking-tight text-white">
              {c.closing}
            </h3>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
