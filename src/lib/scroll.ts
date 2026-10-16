import type Lenis from 'lenis';
declare global { interface Window { __lenis?: Lenis } }
/** Smooth-scroll to a hash target (uses Lenis when active). */
export function scrollToHash(href: string) {
  const el = document.querySelector<HTMLElement>(href);
  if (!el) return;
  if (window.__lenis) window.__lenis.scrollTo(el, { offset: -72 });
  else el.scrollIntoView({ behavior: 'smooth' });
}
