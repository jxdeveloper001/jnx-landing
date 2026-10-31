import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { useRef, useState } from 'react';
import { content } from '../content';

type Project = (typeof content.works.projects)[number];

function ProjectCard({
  project,
  index,
  shouldReduceMotion,
}: {
  project: Project;
  index: number;
  shouldReduceMotion: boolean | null;
}) {
  const [imgError, setImgError] = useState(false);
  const [favError, setFavError] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  // Subtle staggered offset per column for an organic emergence wave
  const stagger = (index % 3) * 0.025;
  const startOffset = `${Math.round((0.93 - stagger) * 100)}%`;
  const endOffset = `${Math.round((0.67 - stagger) * 100)}%`;

  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: [`start ${startOffset}` as any, `start ${endOffset}` as any],
  });

  // Natural scroll-linked upward translation, opacity, and sharpening blur reduction
  const y = useTransform(scrollYProgress, [0, 1], [30, 0]);
  const opacity = useTransform(scrollYProgress, [0, 0.35, 1], [0.15, 0.65, 1]);
  const blurPx = useTransform(scrollYProgress, [0, 0.85, 1], [7, 1, 0]);
  const filter = useTransform(blurPx, (v) => (v > 0.08 ? `blur(${v.toFixed(1)}px)` : 'none'));

  const motionStyle = shouldReduceMotion
    ? { opacity: 1, y: 0, filter: 'none' }
    : { opacity, y, filter };

  return (
    <motion.div
      ref={cardRef}
      style={{
        ...motionStyle,
        willChange: shouldReduceMotion ? 'auto' : 'transform, opacity, filter',
      }}
      className="h-full"
    >
      <a
        href={project.url}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Visit ${project.name} (${project.type})`}
        className="group relative flex h-full flex-col transition-all duration-300 hover:-translate-y-1.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--purple-bright)] focus-visible:ring-offset-2"
      >
        {/* Subtle File-Folder Top Tab Detail */}
        <div className="flex items-end pl-3">
          <div className="relative flex items-center gap-1.5 h-6 sm:h-7 px-3.5 rounded-t-xl bg-white border-t border-x border-[#E2DFED] text-[10px] sm:text-[11px] font-bold tracking-wider text-[#4C1D95] uppercase shadow-[0_-2px_6px_rgba(76,29,149,0.03)]">
            <span className="h-1.5 w-1.5 rounded-full bg-gradient-to-r from-[#2B0B5E] to-[#7C3AED]" />
            <span className="truncate max-w-[140px] sm:max-w-[180px]">{project.type}</span>
          </div>
          {/* Subtle folder seam line extending right */}
          <div className="flex-1 h-px bg-[#E2DFED]" />
        </div>

        {/* Main Digital Folder Card Body */}
        <div className="relative flex flex-1 flex-col overflow-hidden -mt-px rounded-tr-2xl rounded-br-2xl rounded-bl-xl rounded-tl-xl sm:rounded-tl-2xl bg-white border border-[#E2DFED] shadow-[0_4px_20px_-2px_rgba(76,29,149,0.06),0_1px_3px_rgba(10,10,15,0.04)] group-hover:shadow-[0_20px_40px_-12px_rgba(76,29,149,0.18),0_2px_6px_rgba(10,10,15,0.06)] group-hover:border-[#D1CCE0] transition-all duration-300">
          {/* Top Half: Homepage Screenshot with organically curved top-left corner (UNTOUCHED) */}
          <div
            className="relative aspect-[16/9] w-full overflow-hidden bg-[#F3F1F8] rounded-tl-[28px] sm:rounded-tl-[34px] rounded-tr-xl m-1.5 mb-0"
            style={{ width: 'calc(100% - 12px)' }}
          >
            {!imgError ? (
              <img
                src={project.image}
                alt={`${project.name} homepage preview`}
                loading="lazy"
                onError={() => setImgError(true)}
                className="h-full w-full object-cover object-top transition-transform duration-500 ease-out group-hover:scale-105"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-[#2B0B5E] to-[#0A0A0F] text-white">
                <span className="font-bold text-lg tracking-wider">{project.name}</span>
              </div>
            )}

            {/* Subtle dark gradient overlay at bottom of screenshot for depth */}
            <div
              className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-60 transition-opacity duration-300 group-hover:opacity-40"
              aria-hidden="true"
            />
          </div>

          {/* Middle: Circular Favicon Badge overlapping image/content boundary */}
          <div className="relative -mt-5 ml-4 sm:-mt-6 sm:ml-6 z-20 flex h-11 w-11 sm:h-13 sm:w-13 shrink-0 items-center justify-center rounded-full bg-white p-1.5 shadow-[0_4px_14px_rgba(76,29,149,0.16)] border-2 border-white transition-transform duration-300 group-hover:scale-110">
            {!favError ? (
              <img
                src={project.favicon}
                alt=""
                aria-hidden="true"
                onError={() => setFavError(true)}
                className="h-6 w-6 sm:h-8 sm:w-8 rounded-full object-contain"
              />
            ) : (
              <div className="flex h-6 w-6 sm:h-7 sm:w-7 items-center justify-center rounded-full bg-gradient-to-tr from-[#2B0B5E] to-[#7C3AED] text-white text-[11px] sm:text-xs font-black">
                {project.name.charAt(0)}
              </div>
            )}
          </div>

          {/* Bottom Half: Project Information (Single-line description, compact, no visible CTAs) */}
          <div className="flex flex-col justify-start px-4 pt-1 pb-3.5 sm:px-6 sm:pt-2 sm:pb-4.5">
            <h3 className="text-base sm:text-lg font-bold text-[#0A0A0F] tracking-tight transition-colors duration-200 group-hover:text-[var(--purple-bright)]">
              {project.name}
            </h3>
            <p
              title={project.description}
              className="mt-1 text-xs sm:text-[13px] leading-relaxed text-[#6B6B7B] truncate"
            >
              {project.description}
            </p>
          </div>
        </div>
      </a>
    </motion.div>
  );
}

export default function OurWorks() {
  const shouldReduceMotion = useReducedMotion();
  const { title, subtitle, projects } = content.works;

  return (
    <section
      id="our-works"
      className="relative overflow-hidden py-16 sm:py-20 md:py-28 bg-[#F7F6FA]"
    >
      <div className="container-x relative z-10">
        {/* TOP-LEFT SECTION HEADING (Clearly visible, proper font weight & spacing) */}
        <div className="mb-10 sm:mb-12 md:mb-14 text-left">
          <div className="inline-flex items-center gap-2 rounded-full border border-line bg-white px-4 py-1.5 text-xs font-bold tracking-[0.2em] text-[#0A0A0F] uppercase shadow-sm mb-3.5">
            <span className="h-2 w-2 rounded-full bg-gradient-to-r from-[#2B0B5E] via-[#4C1D95] to-[#7C3AED]" />
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
              shouldReduceMotion={shouldReduceMotion}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
