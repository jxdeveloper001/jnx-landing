import { motion, useReducedMotion } from 'framer-motion';
import { useRef, useState } from 'react';
import { content } from '../content';
import { useSectionLiveBg } from '../hooks/useSectionLiveBg';
import { EASE } from '../lib/motion';

// ── 2D Wind Line Vector Silhouettes for Subtle Breeze Background ─────────────
function WindLine({ shape = 1 }: { shape?: number }) {
  if (shape === 2) {
    return (
      <svg viewBox="0 0 280 28" fill="none" className="h-full w-full">
        <path
          d="M0 14 C50 24, 110 6, 170 18 C220 26, 255 10, 280 14"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <path
          d="M30 8 C80 18, 140 4, 190 12"
          stroke="currentColor"
          strokeWidth="0.9"
          strokeLinecap="round"
          opacity="0.5"
        />
      </svg>
    );
  }
  if (shape === 3) {
    return (
      <svg viewBox="0 0 380 30" fill="none" className="h-full w-full">
        <path
          d="M0 15 C80 6, 170 24, 260 12 C320 4, 355 18, 380 15"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
        />
        <path
          d="M60 22 C130 12, 200 26, 270 16"
          stroke="currentColor"
          strokeWidth="0.9"
          strokeLinecap="round"
          opacity="0.45"
        />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 340 32" fill="none" className="h-full w-full">
      <path
        d="M0 16 C60 4, 130 26, 210 14 C260 6, 300 20, 340 16"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M50 24 C110 14, 170 28, 230 18"
        stroke="currentColor"
        strokeWidth="1"
        strokeLinecap="round"
        opacity="0.55"
      />
    </svg>
  );
}

const WIND_CONFIG = [
  { id: 1, top: '14%', width: 320, color: '#C6B2EC', opacity: 0.28, duration: 16, delay: -3, shape: 1, wave: 'wind-wave-1', waveDur: 4.5, minTier: 0 },
  { id: 2, top: '38%', width: 280, color: '#DDD0F5', opacity: 0.22, duration: 21, delay: -13, shape: 2, wave: 'wind-wave-2', waveDur: 5.2, minTier: 1 },
  { id: 3, top: '64%', width: 360, color: '#B69AE8', opacity: 0.24, duration: 17, delay: -8, shape: 3, wave: 'wind-wave-1', waveDur: 4.8, minTier: 0 },
  { id: 4, top: '86%', width: 290, color: '#C6B2EC', opacity: 0.20, duration: 23, delay: -18, shape: 2, wave: 'wind-wave-2', waveDur: 5.5, minTier: 0 },
];

type Project = (typeof content.works.projects)[number];

/** Folder-pocket card: screenshot sits in the folder back, a white front panel overlaps its lower edge. */
function ProjectCard({ project, index }: { project: Project; index: number }) {
  const [imgError, setImgError] = useState(false);
  const [favError, setFavError] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.7, delay: (index % 3) * 0.09, ease: EASE }}
      className="h-full"
    >
      <a
        href={project.url}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Visit ${project.name} (${project.type})`}
        className="group relative flex h-full flex-col rounded-3xl transition-transform duration-300 ease-out hover:-translate-y-1.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7950B5] focus-visible:ring-offset-4 focus-visible:ring-offset-[#F7F6FA]"
      >
        {/* Tab: sloped shoulders, same tone as the folder back */}
        <div className="relative z-10 -mb-px flex items-end pl-1">
          <div
            className="flex h-8 items-center gap-2 bg-[#E9E5F3] pl-6 pr-7 text-[10px] font-bold uppercase tracking-[0.14em] text-[#35145B] sm:h-9 sm:text-[11px]"
            style={{ clipPath: 'polygon(0 100%, 14px 0, calc(100% - 22px) 0, 100% 100%)', borderTopLeftRadius: 10 }}
          >
            <span className="h-1.5 w-1.5 rounded-full bg-[#7950B5]" />
            <span className="whitespace-nowrap">{project.type}</span>
          </div>
        </div>

        {/* Folder back */}
        <div className="relative flex flex-1 flex-col overflow-hidden rounded-3xl rounded-tl-md bg-gradient-to-b from-[#EEEAF7] to-[#E4DFF1] shadow-[0_1px_2px_rgba(17,17,20,0.05),0_16px_28px_-18px_rgba(36,17,61,0.35)] transition-shadow duration-300 group-hover:shadow-[0_2px_4px_rgba(36,17,61,0.07),0_34px_50px_-22px_rgba(84,37,138,0.55),0_0_0_1px_rgba(121,80,181,0.12)]">
          {/* Screenshot sheet: slides up out of the folder on hover */}
          <div className="px-3 pt-3 sm:px-3.5 sm:pt-3.5">
            <div className="relative aspect-[16/10] w-full translate-y-0 overflow-hidden rounded-2xl bg-[#F3F1F8] shadow-[0_6px_16px_-8px_rgba(17,17,20,0.35)] ring-1 ring-black/[0.06] transition-transform duration-500 ease-out group-hover:-translate-y-1.5">
              {!imgError ? (
                <img
                  src={project.image}
                  alt={`${project.name} homepage preview`}
                  loading="lazy"
                  decoding="async"
                  width="640"
                  height="400"
                  onError={() => setImgError(true)}
                  className="h-full w-full scale-100 object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.035]"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-[#35145B] to-[#111114] text-white">
                  <span className="text-lg font-bold tracking-wider">{project.name}</span>
                </div>
              )}
            </div>
          </div>

          {/* Front panel overlapping the lower edge of the sheet */}
          <div className="relative z-10 -mt-7 flex flex-1 flex-col rounded-t-[26px] bg-white shadow-[0_-8px_16px_-10px_rgba(36,17,61,0.28)] sm:-mt-8">
            {/* Badge straddles the panel's top edge */}
            <div className="relative -mt-6 ml-5 grid h-12 w-12 shrink-0 place-items-center rounded-full bg-white shadow-[0_6px_14px_-4px_rgba(36,17,61,0.35)] ring-1 ring-[#E8E6EF] transition-shadow duration-300 group-hover:ring-2 group-hover:ring-[#7950B5] group-hover:shadow-[0_8px_18px_-4px_rgba(121,80,181,0.6)] sm:ml-6 sm:h-14 sm:w-14">
              {!favError ? (
                <img
                  src={project.favicon}
                  alt=""
                  aria-hidden="true"
                  loading="lazy"
                  decoding="async"
                  width="32"
                  height="32"
                  onError={() => setFavError(true)}
                  className="h-6 w-6 rounded-full object-contain sm:h-7 sm:w-7"
                />
              ) : (
                <span className="grid h-[calc(100%-8px)] w-[calc(100%-8px)] place-items-center rounded-full bg-gradient-to-tr from-[#35145B] to-[#7950B5] text-sm font-bold text-white">
                  {project.name.charAt(0)}
                </span>
              )}
            </div>

            <div className="flex flex-1 flex-col px-5 pb-5 pt-3 sm:px-6 sm:pb-6">
              <h3 className="text-base font-bold tracking-tight text-[#111114] sm:text-lg">
                {project.name}
              </h3>
              <p
                title={project.description}
                className="mt-1.5 line-clamp-2 min-h-[2.8em] text-xs leading-[1.4rem] text-[#6B6B7B] sm:text-[13px]"
              >
                {project.description}
              </p>
              {/* Accent rule: draws in on hover */}
              <span className="mt-auto block pt-4" aria-hidden="true">
                <span className="relative block h-px w-full bg-[#ECEAF2]">
                  <span className="absolute inset-y-0 left-0 w-full origin-left scale-x-[0.12] bg-[#7950B5] transition-transform duration-500 ease-out group-hover:scale-x-100" />
                </span>
              </span>
            </div>
          </div>
        </div>
      </a>
    </motion.div>
  );
}

export default function OurWorks() {
  const shouldReduceMotion = useReducedMotion();
  const { title, subtitle, projects } = content.works;
  const sectionRef = useRef<HTMLElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const { isLowPower } = useSectionLiveBg(sectionRef, bgRef);

  const activeWind = isLowPower
    ? WIND_CONFIG.filter((w) => w.minTier === 0)
    : WIND_CONFIG;

  return (
    <section
      ref={sectionRef}
      id="our-works"
      className="relative overflow-hidden py-16 sm:py-20 md:py-28 bg-[#F7F6FA]"
    >
      {/* ── 2D Wind Lines Background Effect (Subtle, Atmospheric) ── */}
      <div
        ref={bgRef}
        className="live-bg pointer-events-none absolute inset-0 z-0 overflow-hidden"
        aria-hidden="true"
      >
        {activeWind.map((w) => (
          <div
            key={w.id}
            className="wind-track absolute"
            style={{
              top: w.top,
              width: `${w.width}px`,
              color: w.color,
              opacity: w.opacity,
              animation: shouldReduceMotion
                ? undefined
                : `wind-drift-ltr ${w.duration}s linear infinite`,
              animationDelay: shouldReduceMotion ? undefined : `${w.delay}s`,
            }}
          >
            <div
              style={{
                animation: shouldReduceMotion
                  ? undefined
                  : `${w.wave} ${w.waveDur}s ease-in-out infinite`,
              }}
            >
              <WindLine shape={w.shape} />
            </div>
          </div>
        ))}
      </div>

      <div className="container-x relative z-10">
        {/* TOP-LEFT SECTION HEADING (Clearly visible, proper font weight & spacing) */}
        <div className="mb-10 sm:mb-12 md:mb-14 text-left">
          <div className="inline-flex items-center gap-2 rounded-full border border-line bg-white px-4 py-1.5 text-xs font-bold tracking-[0.2em] text-[#0A0A0F] uppercase shadow-sm mb-3.5">
            <span className="h-2 w-2 rounded-full bg-gradient-to-r from-[#35145B] via-[#54258A] to-[#7950B5]" />
            FEATURED PROJECTS
          </div>
          <h2 className="text-2xl min-[380px]:text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#0A0A0F]">
            {title}
          </h2>
          <p className="mt-2 text-sm sm:text-base md:text-lg text-[#6B6B7B] max-w-2xl">
            {subtitle.line1} {subtitle.line2}
          </p>
        </div>

        {/* 3-COLUMN RESPONSIVE PROJECT CARD GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 lg:gap-7">
          {projects.map((project, idx) => (
            <ProjectCard
              key={`work-project-${project.id}-${idx}`}
              project={project}
              index={idx}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
