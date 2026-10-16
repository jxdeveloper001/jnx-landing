import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { content } from '../content';
import { ScrollLine } from './Doodles';
import SearchBar from './SearchBar';
import WorldMap from './WorldMap';

/** Map slides left while the text block slides in from the right (scroll-linked). */
export default function SearchSection() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const mapX = useTransform(scrollYProgress, [0.1, 0.6], ['8%', '-22%']);
  const textX = useTransform(scrollYProgress, [0.1, 0.55], ['40%', '0%']);
  const textO = useTransform(scrollYProgress, [0.12, 0.4], [0, 1]);
  return (
    <section id="pricing" ref={ref} className="relative overflow-hidden py-28">
      <motion.div aria-hidden style={{ x: mapX }} className="absolute inset-y-0 left-0 flex w-[110%] items-center opacity-60"><WorldMap pins={false} /></motion.div>
      <div className="container-x relative">
        <motion.div style={{ x: textX, opacity: textO }} className="ml-auto max-w-[520px] rounded-[32px] bg-white/70 p-8 backdrop-blur-md md:p-10">
          <h2 className="h2">{content.search.title}</h2>
          <p className="lead mt-5">{content.search.text}</p>
          <div className="mt-8"><SearchBar /></div>
        </motion.div>
        <ScrollLine className="pointer-events-none absolute -right-10 top-[-60px] hidden h-[420px] w-[300px] lg:block" viewBox="0 0 300 420" d="M280 0 C 220 80, 60 90, 90 190 S 260 300, 120 420" />
      </div>
    </section>
  );
}
