import {
  motion,
  useMotionValue,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from 'framer-motion';
import { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { content } from '../content';
import { EASE } from '../lib/motion';
import PillButton from './PillButton';

type Project = {
  id: number;
  name: string;
  type: string;
  url: string;
  badge: string;
};

type NodePoint = {
  x: number;
  y: number;
  project: Project;
  index: number;
};

/** Inline vector circular artwork representing the JNX project cover. */
function JnxCoverCircle({ project, index }: { project: Project; index: number }) {
  const gradId = `jnx-cover-grad-${index}`;
  return (
    <div className="relative h-full w-full overflow-hidden rounded-full border border-white/20 select-none bg-gradient-to-br from-[#1A0A2E] via-[#0A0A0F] to-[#2B0B5E]">
      <svg
        viewBox="0 0 100 100"
        className="h-full w-full"
        preserveAspectRatio="xMidYMid slice"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id={gradId} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#7C3AED" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#2B0B5E" stopOpacity="0.3" />
          </linearGradient>
        </defs>
        <circle
          cx="50"
          cy="50"
          r="34"
          stroke={`url(#${gradId})`}
          strokeWidth="1"
          strokeDasharray="3 3"
          fill="none"
          opacity="0.6"
        />
        <circle cx="50" cy="50" r="22" stroke="#7C3AED" strokeWidth="1.2" fill="none" opacity="0.8" />
        <path
          d="M50 18 L68 50 H32 Z"
          fill="none"
          stroke="#FFFFFF"
          strokeWidth="1.5"
          strokeLinejoin="round"
          opacity="0.9"
        />
        <path d="M50 30 L60 48 H40 Z" fill="#7C3AED" opacity="0.75" />
        <text
          x="50"
          y="78"
          textAnchor="middle"
          fill="#FFFFFF"
          fontSize="13"
          fontWeight="800"
          letterSpacing="0.05em"
          fontFamily="Outfit, sans-serif"
        >
          JNX
        </text>
      </svg>
    </div>
  );
}

/** Computes smooth serpentine path coordinates, wave nodes, and U-turns. */
function generateSerpentineLayout(
  projects: Project[],
  containerWidth: number,
  cols: number,
  rowGap: number,
) {
  const isMobile = cols === 1;
  const isTablet = cols === 2;
  const padX = isMobile ? 32 : isTablet ? 70 : 100;
  const usableW = Math.max(240, containerWidth - 2 * padX);
  const startY = 100;

  const nodes: NodePoint[] = [];
  const total = projects.length;

  for (let i = 0; i < total; i++) {
    const r = Math.floor(i / cols);
    const colIndex = i % cols;
    const isLTR = r % 2 === 0;

    let x = 0;
    let y = startY + r * rowGap;

    if (isMobile) {
      // Alternating left and right for mobile winding path
      const xRatio = i % 2 === 0 ? 0.30 : 0.70;
      x = padX + xRatio * usableW;
    } else if (isTablet) {
      const posCol = isLTR ? colIndex : cols - 1 - colIndex;
      const xRatio = posCol === 0 ? 0.22 : 0.78;
      x = padX + xRatio * usableW;
      const waveOffset = posCol === 0 ? 24 : -24;
      y += waveOffset;
    } else {
      // Desktop: 3 nodes per row (low, middle, high gentle wave)
      const posCol = isLTR ? colIndex : cols - 1 - colIndex;
      const ratios = [0.15, 0.5, 0.85];
      x = padX + ratios[posCol] * usableW;
      const waveOffsets = [32, 0, -32];
      y += waveOffsets[posCol];
    }

    nodes.push({
      x,
      y,
      project: projects[i],
      index: i,
    });
  }

  const firstNode = nodes[0];
  if (!firstNode) {
    return {
      d: '',
      nodes: [],
      endPoint: { x: containerWidth / 2, y: 300 },
      height: 400,
    };
  }

  // Construct SVG cubic Bezier path
  const startX = isMobile ? Math.max(16, firstNode.x - 60) : Math.max(20, padX * 0.35);
  const startPointY = firstNode.y + (isMobile ? -24 : 40);

  let d = `M ${startX.toFixed(1)} ${startPointY.toFixed(1)}`;
  d += ` C ${(startX + (firstNode.x - startX) * 0.5).toFixed(1)} ${startPointY.toFixed(1)}, ${(
    firstNode.x -
    (firstNode.x - startX) * 0.5
  ).toFixed(1)} ${firstNode.y.toFixed(1)}, ${firstNode.x.toFixed(1)} ${firstNode.y.toFixed(1)}`;

  const numRows = Math.ceil(total / cols);

  for (let r = 0; r < numRows; r++) {
    const rowStartIndex = r * cols;
    const rowEndIndex = Math.min(total - 1, rowStartIndex + cols - 1);

    // Smooth horizontal wave between nodes in current row
    for (let i = rowStartIndex; i < rowEndIndex; i++) {
      const cur = nodes[i];
      const nxt = nodes[i + 1];
      const dx = nxt.x - cur.x;
      const cp1x = cur.x + dx * 0.5;
      const cp2x = nxt.x - dx * 0.5;
      d += ` C ${cp1x.toFixed(1)} ${cur.y.toFixed(1)}, ${cp2x.toFixed(1)} ${nxt.y.toFixed(
        1,
      )}, ${nxt.x.toFixed(1)} ${nxt.y.toFixed(1)}`;
    }

    // Smooth U-turn to next row if applicable
    if (r < numRows - 1) {
      const lastInRow = nodes[rowEndIndex];
      const firstInNextRow = nodes[rowEndIndex + 1];
      const isLTR = r % 2 === 0;

      if (isMobile) {
        // Mobile vertical curve between bends
        const turnApexX = isLTR
          ? Math.min(containerWidth - 16, Math.max(lastInRow.x, firstInNextRow.x) + 40)
          : Math.max(16, Math.min(lastInRow.x, firstInNextRow.x) - 40);
        d += ` C ${turnApexX.toFixed(1)} ${lastInRow.y.toFixed(1)}, ${turnApexX.toFixed(
          1,
        )} ${firstInNextRow.y.toFixed(1)}, ${firstInNextRow.x.toFixed(
          1,
        )} ${firstInNextRow.y.toFixed(1)}`;
      } else {
        // Desktop / Tablet 180-deg downward U-turn
        const turnOutX = isLTR
          ? Math.min(containerWidth - 20, containerWidth - padX * 0.3)
          : Math.max(20, padX * 0.3);
        const bulgeFactor = Math.abs(firstInNextRow.y - lastInRow.y) * 0.32;
        const bulgeX = isLTR
          ? Math.min(containerWidth - 8, turnOutX + bulgeFactor)
          : Math.max(8, turnOutX - bulgeFactor);

        d += ` C ${(lastInRow.x + (turnOutX - lastInRow.x) * 0.5).toFixed(1)} ${lastInRow.y.toFixed(
          1,
        )}, ${turnOutX.toFixed(1)} ${lastInRow.y.toFixed(1)}, ${turnOutX.toFixed(
          1,
        )} ${lastInRow.y.toFixed(1)}`;
        d += ` C ${bulgeX.toFixed(1)} ${lastInRow.y.toFixed(1)}, ${bulgeX.toFixed(
          1,
        )} ${firstInNextRow.y.toFixed(1)}, ${turnOutX.toFixed(1)} ${firstInNextRow.y.toFixed(1)}`;
        d += ` C ${turnOutX.toFixed(1)} ${firstInNextRow.y.toFixed(1)}, ${(
          firstInNextRow.x +
          (turnOutX - firstInNextRow.x) * 0.5
        ).toFixed(1)} ${firstInNextRow.y.toFixed(1)}, ${firstInNextRow.x.toFixed(
          1,
        )} ${firstInNextRow.y.toFixed(1)}`;
      }
    }
  }

  // Smooth tail down to the center button location
  const lastNode = nodes[total - 1];
  const lastRow = Math.floor((total - 1) / cols);
  const isLastRowLTR = lastRow % 2 === 0;

  const buttonX = containerWidth / 2;
  const buttonY = lastNode.y + (isMobile ? 120 : 130);
  const endPoint = { x: buttonX, y: buttonY - 45 };

  const leadDir = isLastRowLTR ? 1 : -1;
  const leadCpX = isMobile ? lastNode.x : lastNode.x + leadDir * 70;
  d += ` C ${leadCpX.toFixed(1)} ${lastNode.y.toFixed(1)}, ${(buttonX + leadDir * 40).toFixed(
    1,
  )} ${(buttonY - 90).toFixed(1)}, ${endPoint.x.toFixed(1)} ${endPoint.y.toFixed(1)}`;

  const totalHeight = buttonY + 70;

  return {
    d,
    nodes,
    endPoint,
    height: totalHeight,
  };
}

/** Individual project node with scroll reveal, faint decorative index, and hover spring zoom. */
function PathNode({
  point,
  threshold,
  smoothProgress,
  shouldReduceMotion,
}: {
  point: NodePoint;
  threshold: number;
  smoothProgress: any;
  shouldReduceMotion: boolean | null;
}) {
  const [isHovered, setIsHovered] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  // Scroll scrubbed reveal range
  const rangeStart = Math.max(0, threshold - 0.04);
  const rangeEnd = Math.min(1, threshold + 0.02);

  const scaleAnim = useTransform(smoothProgress, [rangeStart, threshold, rangeEnd], [0.6, 1.05, 1.0]);
  const opacityAnim = useTransform(smoothProgress, [rangeStart, threshold], [0, 1]);
  const blurAnim = useTransform(smoothProgress, [rangeStart, threshold], ['blur(6px)', 'blur(0px)']);

  const numOpacity = useTransform(smoothProgress, [rangeStart, threshold + 0.02], [0, 1]);
  const numY = useTransform(smoothProgress, [rangeStart, threshold + 0.02], [24, 0]);

  const textOpacity = useTransform(smoothProgress, [rangeStart + 0.01, threshold + 0.03], [0, 1]);
  const textY = useTransform(smoothProgress, [rangeStart + 0.01, threshold + 0.03], [14, 0]);

  const active = isHovered || isFocused;
  const indexStr = String(point.index + 1).padStart(2, '0');

  return (
    <div
      className="absolute -translate-x-1/2 -translate-y-1/2"
      style={{
        left: point.x,
        top: point.y,
        zIndex: active ? 50 : 20,
      }}
    >
      {/* Big faint index number behind node */}
      <motion.div
        aria-hidden="true"
        style={{
          opacity: shouldReduceMotion ? 1 : numOpacity,
          y: shouldReduceMotion ? 0 : numY,
        }}
        className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-[120px] sm:text-[150px] font-extrabold leading-none tracking-tight text-[#EDEAF5] select-none -z-10"
      >
        {indexStr}
      </motion.div>

      {/* Node Interactive Link */}
      <motion.div
        style={{
          scale: shouldReduceMotion ? 1 : scaleAnim,
          opacity: shouldReduceMotion ? 1 : opacityAnim,
          filter: shouldReduceMotion ? 'none' : blurAnim,
        }}
      >
        <a
          href={point.project.url}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Open ${point.project.name} project ${point.project.id} - ${point.project.type}`}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className="group block relative cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-purple focus-visible:ring-offset-4 rounded-[20px]"
        >
          {/* White rounded-square badge sitting on the path */}
          <motion.div
            animate={
              shouldReduceMotion
                ? undefined
                : {
                    width: active ? 104 : 64,
                    height: active ? 104 : 64,
                    boxShadow: active
                      ? '0 20px 48px -12px rgba(76, 29, 149, 0.35), 0 8px 16px -4px rgba(20, 8, 50, 0.12)'
                      : '0 1px 2px rgba(20, 8, 50, 0.06), 0 12px 32px -12px rgba(20, 8, 50, 0.18)',
                  }
            }
            transition={{ type: 'spring', stiffness: 260, damping: 20 }}
            className={`flex items-center justify-center rounded-[20px] bg-white transition-colors duration-300 ${
              active ? 'ring-2 ring-purple' : 'border border-line'
            }`}
          >
            {/* Circular Project Image */}
            <motion.div
              animate={
                shouldReduceMotion
                  ? undefined
                  : {
                      width: active ? 92 : 44,
                      height: active ? 92 : 44,
                    }
              }
              transition={{ type: 'spring', stiffness: 260, damping: 20 }}
              className="overflow-hidden rounded-full ring-1 ring-white/80 shadow-inner"
            >
              <JnxCoverCircle project={point.project} index={point.index} />
            </motion.div>
          </motion.div>
        </a>
      </motion.div>

      {/* Short text block below node (moves down smoothly on hover) */}
      <motion.div
        aria-hidden="true"
        style={{
          opacity: shouldReduceMotion ? 1 : textOpacity,
          y: shouldReduceMotion ? 0 : textY,
        }}
        animate={
          shouldReduceMotion
            ? undefined
            : {
                y: active ? 28 : 0,
              }
        }
        transition={{ type: 'spring', stiffness: 260, damping: 20 }}
        className="pointer-events-none absolute left-2 top-[38px] whitespace-nowrap select-none"
      >
        <p className="text-base sm:text-lg font-bold text-ink leading-tight">{point.project.name}</p>
        <p className="text-xs font-medium text-mute">{point.project.type}</p>
      </motion.div>
    </div>
  );
}

export default function OurWorks() {
  const shouldReduceMotion = useReducedMotion();
  const { lines, seeMore, showLess, projects, rowGaps, cols: colsConfig } = content.works;
  const [isExpanded, setIsExpanded] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const [containerWidth, setContainerWidth] = useState(1100);

  // ResizeObserver on the container
  useEffect(() => {
    if (!containerRef.current) return;
    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        if (entry.contentRect.width > 0) {
          setContainerWidth(entry.contentRect.width);
        }
      }
    });
    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  // Determine breakpoint column count and vertical spacing
  const { cols, rowGap } = useMemo(() => {
    if (containerWidth < 640) {
      return { cols: colsConfig?.mobile || 1, rowGap: rowGaps?.mobile || 240 };
    }
    if (containerWidth < 1024) {
      return { cols: colsConfig?.tablet || 2, rowGap: rowGaps?.tablet || 340 };
    }
    return { cols: colsConfig?.desktop || 3, rowGap: rowGaps?.desktop || 400 };
  }, [containerWidth, colsConfig, rowGaps]);

  // Initial display is 6 projects (2 rows), expanded is all 9 projects
  const visibleProjects = useMemo(() => {
    return isExpanded ? projects : projects.slice(0, 6);
  }, [isExpanded, projects]);

  // Generate geometric layout
  const layout = useMemo(() => {
    return generateSerpentineLayout(visibleProjects, containerWidth, cols, rowGap);
  }, [visibleProjects, containerWidth, cols, rowGap]);

  // Framer Motion Scroll scrubbing ["start 75%", "end 60%"]
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 75%', 'end 60%'],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 24,
    restDelta: 0.0001,
  });

  // Calculate true arc-length thresholds for each node
  const [thresholds, setThresholds] = useState<number[]>([]);

  useLayoutEffect(() => {
    if (!pathRef.current) return;
    const path = pathRef.current;
    const totalLen = path.getTotalLength();
    if (totalLen <= 0) return;

    const SAMPLES = 300;
    const step = totalLen / SAMPLES;

    const computed = layout.nodes.map((node) => {
      let bestDist = Infinity;
      let bestLen = 0;
      for (let s = 0; s <= SAMPLES; s++) {
        const len = (s / SAMPLES) * totalLen;
        const pt = path.getPointAtLength(len);
        const d2 = (pt.x - node.x) ** 2 + (pt.y - node.y) ** 2;
        if (d2 < bestDist) {
          bestDist = d2;
          bestLen = len;
        }
      }
      // Fine search
      for (let delta = -step; delta <= step; delta += step / 10) {
        const len = Math.max(0, Math.min(totalLen, bestLen + delta));
        const pt = path.getPointAtLength(len);
        const d2 = (pt.x - node.x) ** 2 + (pt.y - node.y) ** 2;
        if (d2 < bestDist) {
          bestDist = d2;
          bestLen = len;
        }
      }
      return bestLen / totalLen;
    });

    setThresholds(computed);
  }, [layout]);

  // Leading glowing dot position tracking along pathLength
  const dotX = useMotionValue(layout.endPoint.x);
  const dotY = useMotionValue(layout.endPoint.y);
  const dotOpacity = useMotionValue(0);

  useMotionValueEvent(smoothProgress, 'change', (latest) => {
    if (!pathRef.current) return;
    const path = pathRef.current;
    const total = path.getTotalLength();
    if (total <= 0) return;

    const clamped = Math.min(total, Math.max(0, latest * total));
    const pt = path.getPointAtLength(clamped);
    dotX.set(pt.x);
    dotY.set(pt.y);
    dotOpacity.set(latest > 0.01 && latest < 0.999 ? 1 : latest >= 0.999 ? 0.9 : 0);
  });

  // "Show more" button fade in when line finishes drawing
  const buttonOpacity = useTransform(smoothProgress, [0.86, 0.97], [0, 1]);
  const buttonY = useTransform(smoothProgress, [0.86, 0.97], [18, 0]);

  const handleToggle = () => {
    setIsExpanded((prev) => !prev);
  };

  return (
    <section id="our-works" className="relative overflow-visible py-28 md:py-36">
      <div className="container-x relative">
        {/* Section Heading with masked word reveal */}
        <h2 className="text-center text-[48px] font-bold leading-[1.05] tracking-tight sm:text-[56px] lg:text-[64px] text-ink">
          {lines.map((words, li) => (
            <span key={li} className="flex justify-center gap-x-4 overflow-hidden pb-1">
              {words.map((w, wi) => (
                <span key={w + wi} className="inline-block overflow-hidden">
                  <motion.span
                    className="inline-block"
                    initial={{ y: '110%' }}
                    whileInView={{ y: 0 }}
                    viewport={{ once: true }}
                    transition={{
                      duration: 0.8,
                      delay: (li * 2 + wi) * 0.1,
                      ease: EASE,
                    }}
                  >
                    {w}
                  </motion.span>
                </span>
              ))}
            </span>
          ))}
        </h2>

        {/* Serpentine Path Container */}
        <div ref={containerRef} className="relative mt-16 w-full">
          <motion.div
            animate={{ height: layout.height }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            className="relative w-full overflow-visible"
          >
            {/* SVG Drawing Layer */}
            <svg
              className="pointer-events-none absolute inset-0 h-full w-full overflow-visible"
              aria-hidden="true"
            >
              <defs>
                <linearGradient id="works-purple-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#2B0B5E" />
                  <stop offset="55%" stopColor="#4C1D95" />
                  <stop offset="100%" stopColor="#7C3AED" />
                </linearGradient>
                <filter id="path-blur" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="6" />
                </filter>
                <filter id="dot-glow" x="-50%" y="-50%" width="200%" height="200%">
                  <feGaussianBlur stdDeviation="5" />
                </filter>
              </defs>

              {/* Soft blurred purple shadow offset under the curve */}
              <motion.path
                d={layout.d}
                fill="none"
                stroke="rgba(124, 58, 237, 0.28)"
                strokeWidth="10"
                strokeLinecap="round"
                strokeLinejoin="round"
                filter="url(#path-blur)"
                transform="translate(0, 8)"
                style={{
                  pathLength: shouldReduceMotion ? 1 : smoothProgress,
                }}
              />

              {/* Smooth wavy path in --purple-gradient */}
              <motion.path
                ref={pathRef}
                d={layout.d}
                fill="none"
                stroke="url(#works-purple-grad)"
                strokeWidth="4"
                strokeLinecap="round"
                strokeLinejoin="round"
                style={{
                  pathLength: shouldReduceMotion ? 1 : smoothProgress,
                }}
              />

              {/* Small glowing leading dot riding on the head of the line */}
              {!shouldReduceMotion && (
                <motion.g
                  style={{
                    x: dotX,
                    y: dotY,
                    opacity: dotOpacity,
                  }}
                >
                  <circle r="14" fill="#7C3AED" opacity="0.35" filter="url(#dot-glow)" />
                  <circle r="7" fill="#7C3AED" />
                  <circle r="3.5" fill="#FFFFFF" />
                </motion.g>
              )}
            </svg>

            {/* Project Nodes along the path */}
            {layout.nodes.map((node, i) => (
              <PathNode
                key={`${node.project.id}-${i}`}
                point={node}
                threshold={thresholds[i] ?? (i + 1) / (layout.nodes.length + 1)}
                smoothProgress={smoothProgress}
                shouldReduceMotion={shouldReduceMotion}
              />
            ))}

            {/* "Show more" / "Show less" PillButton at the end of the line */}
            <div
              className="absolute -translate-x-1/2 -translate-y-1/2 z-30"
              style={{
                left: layout.endPoint.x,
                top: layout.endPoint.y + 35,
              }}
            >
              <motion.div
                style={{
                  opacity: shouldReduceMotion ? 1 : buttonOpacity,
                  y: shouldReduceMotion ? 0 : buttonY,
                }}
              >
                <PillButton magnetic arrow onClick={handleToggle}>
                  {isExpanded ? showLess : seeMore}
                </PillButton>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
