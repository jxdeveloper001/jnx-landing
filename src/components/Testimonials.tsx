import { Star } from 'lucide-react';
import { content } from '../content';
import { ScrollLine, Spark } from './Doodles';
import { Avatar } from './Illustrations';
import Reveal from './Reveal';

type Testimonial = {
  quote: string;
  name: string;
  role: string;
  rating: number;
};

function Stars({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5" role="img" aria-label={`${rating} out of 5 stars`}>
      {[0, 1, 2, 3, 4].map((i) => {
        const f = Math.max(0, Math.min(1, rating - i));
        return (
          <span key={i} className="relative inline-block h-[13px] w-[13px]">
            <Star size={13} className="fill-[#E8E6EF] text-[#E8E6EF]" />
            <span
              className="absolute inset-0 overflow-hidden"
              style={{ width: `${f * 100}%` }}
            >
              <Star size={13} className="shrink-0 fill-[var(--purple)] text-[var(--purple)]" />
            </span>
          </span>
        );
      })}
    </div>
  );
}

function CompactCard({ item, avatarIndex }: { item: Testimonial; avatarIndex: number }) {
  return (
    <article className="flex w-[290px] sm:w-[330px] shrink-0 flex-col justify-between rounded-[20px] border border-line bg-white p-4 shadow-card transition-all duration-300 hover:shadow-lift sm:p-5">
      <div>
        <span className="text-2xl font-bold leading-none text-[var(--purple)] select-none" aria-hidden>
          ❝
        </span>
        <p className="mt-2 text-xs sm:text-[13px] leading-relaxed text-mute line-clamp-3">
          {item.quote}
        </p>
      </div>

      <div>
        <hr className="my-3 border-line" />
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="h-8 w-8 shrink-0 overflow-hidden rounded-full border border-line">
              <Avatar v={avatarIndex} />
            </div>
            <div className="min-w-0">
              <p className="truncate text-xs font-bold text-ink">{item.name}</p>
              <p className="truncate text-[11px] text-mute">{item.role}</p>
            </div>
          </div>
          <div className="shrink-0">
            <Stars rating={item.rating} />
          </div>
        </div>
      </div>
    </article>
  );
}

export default function Testimonials() {
  const t = content.testimonials;
  const row1 = [...t.row1, ...t.row1];
  const row2 = [...t.row2, ...t.row2];

  return (
    <section id="testimonials" className="relative overflow-hidden py-24 sm:py-28">
      <ScrollLine
        className="pointer-events-none absolute left-0 top-10 hidden h-[260px] w-[420px] lg:block"
        viewBox="0 0 420 260"
        d="M0 20 C 120 0, 160 140, 280 120 S 400 200, 420 250"
      />

      <div className="container-x relative">
        <div className="mb-12">
          <Reveal>
            <h2 className="h2 relative inline-block max-w-xl text-ink">
              Satisfied Customers Are Our{' '}
              <span className="bg-gradient-to-r from-[var(--purple-deep)] via-[var(--purple)] to-[var(--purple-bright)] bg-clip-text text-transparent">
                Best
              </span>{' '}
              Ads.
              <span className="absolute -right-6 -top-8 sm:-right-8">
                <Spark />
              </span>
            </h2>
          </Reveal>
        </div>
      </div>

      {/* Marquee Rows Container */}
      <div className="relative w-full overflow-hidden">
        {/* Soft edge fade masks */}
        <div
          className="pointer-events-none absolute inset-y-0 left-0 z-20 w-16 bg-gradient-to-r from-white via-white/80 to-transparent sm:w-28"
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute inset-y-0 right-0 z-20 w-16 bg-gradient-to-l from-white via-white/80 to-transparent sm:w-28"
          aria-hidden="true"
        />

        <div className="flex flex-col gap-4 py-2">
          {/* Top row: Right to Left */}
          <div className="flex w-max animate-marquee-left gap-4 hover:[animation-play-state:paused]">
            {row1.map((item, idx) => (
              <CompactCard
                key={`r1-${item.name}-${idx}`}
                item={item}
                avatarIndex={(idx % 6) + 1}
              />
            ))}
          </div>

          {/* Bottom row: Left to Right */}
          <div className="flex w-max animate-marquee-right gap-4 hover:[animation-play-state:paused]">
            {row2.map((item, idx) => (
              <CompactCard
                key={`r2-${item.name}-${idx}`}
                item={item}
                avatarIndex={(idx % 6) + 7}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
