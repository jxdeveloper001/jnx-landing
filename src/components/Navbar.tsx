import {
  AnimatePresence,
  motion,
  useReducedMotion,
  useMotionValueEvent,
  useScroll,
  useSpring,
  useTransform,
} from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import type { MouseEvent } from 'react';
import { content } from '../content';
import { scrollToHash } from '../lib/scroll';
import Logo from './Logo';

const IDS = ['home', 'service', 'our-works', 'how-we-work', 'contact'];

export default function Navbar() {
  const shouldReduceMotion = useReducedMotion();
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState('home');
  const [hovered, setHovered] = useState<string | null>(null);
  // True while the header shell is shown (hysteresis avoids flicker near the threshold)
  const [condensed, setCondensed] = useState(false);
  const [mounted, setMounted] = useState(false);
  const scrollYRef = useRef(0);

  // Scroll-linked transition: magnetic release stretch & detachment
  const { scrollY } = useScroll();
  const stretchYRaw = useTransform(scrollY, [0, 18, 42], [1, 1.045, 1], { clamp: true });
  const stretchXRaw = useTransform(scrollY, [0, 18, 42], [1, 0.994, 1], { clamp: true });
  const magneticYRaw = useTransform(scrollY, [0, 18, 42], [0, -2.5, 0], { clamp: true });
  const progressRaw = useTransform(scrollY, [14, 40], [0, 1], { clamp: true });

  const stretchY = useSpring(stretchYRaw, {
    stiffness: 360,
    damping: 30,
    mass: 0.2,
    restDelta: 0.001,
  });
  const stretchX = useSpring(stretchXRaw, {
    stiffness: 360,
    damping: 30,
    mass: 0.2,
    restDelta: 0.001,
  });
  const magneticY = useSpring(magneticYRaw, {
    stiffness: 340,
    damping: 30,
    mass: 0.2,
    restDelta: 0.001,
  });
  const progressSpring = useSpring(progressRaw, {
    stiffness: 380,
    damping: 34,
    mass: 0.2,
    restDelta: 0.001,
  });

  useMotionValueEvent(scrollY, 'change', (y) => {
    setCondensed((prev) => (prev ? y > 14 : y > 30));
  });

  const progress = shouldReduceMotion ? progressRaw : progressSpring;
  const shellOpacity = useTransform(progress, (v) => (open ? 0 : v));

  useEffect(() => {
    setMounted(true);
  }, []);

  // Section observer for active spy link
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: '-40% 0px -50% 0px' },
    );

    IDS.forEach((id) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  // Lock background scrolling while the mobile menu is open.
  useEffect(() => {
    if (!open) return;

    const body = document.body;
    const html = document.documentElement;

    scrollYRef.current = window.scrollY;

    html.style.overflow = 'hidden';
    body.style.overflow = 'hidden';
    body.style.position = 'fixed';
    body.style.top = `-${scrollYRef.current}px`;
    body.style.left = '0';
    body.style.right = '0';
    body.style.width = '100%';

    return () => {
      html.style.overflow = '';
      body.style.overflow = '';
      body.style.position = '';
      body.style.top = '';
      body.style.left = '';
      body.style.right = '';
      body.style.width = '';

      window.scrollTo(0, scrollYRef.current);
    };
  }, [open]);

  // Close with Escape.
  useEffect(() => {
    if (!open) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [open]);

  const closeMenu = () => {
    setOpen(false);
  };

  const go = (href: string) => (event: MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    closeMenu();

    window.setTimeout(
      () => {
        scrollToHash(href);
      },
      open ? 400 : 0,
    );
  };

  const mobileDrawer =
    mounted &&
    createPortal(
      <AnimatePresence>
        {open && (
          <>
            <motion.button
              type="button"
              aria-label="Close navigation menu"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{
                duration: 0.5,
                ease: [0.22, 1, 0.36, 1],
              }}
              onClick={closeMenu}
              className="fixed inset-0 z-[100] cursor-default bg-[#0A0A0F]/70"
            />

            <motion.aside
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{
                type: 'spring',
                stiffness: 260,
                damping: 30,
                mass: 0.85,
              }}
              onClick={(event) => event.stopPropagation()}
              className="fixed inset-y-0 right-0 z-[110] flex h-[100dvh] w-[88%] max-w-[380px] flex-col overflow-y-auto overscroll-contain border-l border-line bg-white px-6 pb-8 pt-6 shadow-2xl sm:w-[360px] lg:hidden"
              aria-label="Mobile navigation"
            >
              <div className="flex items-center justify-between border-b border-line pb-5">
                <a
                  href="#home"
                  onClick={go('#home')}
                  aria-label="JNX home"
                  className="shrink-0 text-ink"
                >
                  <Logo />
                </a>

                <button
                  type="button"
                  onClick={closeMenu}
                  aria-label="Close menu"
                  className="grid h-11 w-11 place-items-center rounded-full border border-line transition-colors hover:bg-wash"
                >
                  <X size={20} className="text-ink" />
                </button>
              </div>

              <nav className="flex-1 py-7" aria-label="Mobile navigation links">
                <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-mute">
                  Navigation
                </p>

                <div className="flex flex-col gap-1.5">
                  {content.nav.links.map((link, index) => {
                    const targetId = link.href.replace('#', '');
                    const isActive = active === targetId;
                    return (
                      <motion.a
                        key={link.label}
                        href={link.href}
                        onClick={go(link.href)}
                        initial={{ opacity: 0, x: 12 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{
                          duration: 0.35,
                          delay: 0.04 + index * 0.045,
                          ease: [0.22, 1, 0.36, 1],
                        }}
                        className={`flex items-center justify-between rounded-xl px-4 py-3.5 text-base font-medium transition-colors ${
                          isActive
                            ? 'bg-wash text-purple font-semibold'
                            : 'text-mute hover:bg-wash hover:text-ink'
                        }`}
                      >
                        <span>{link.label}</span>
                        {isActive && (
                          <span className="h-1.5 w-1.5 rounded-full bg-[var(--purple-bright)]" />
                        )}
                      </motion.a>
                    );
                  })}
                </div>
              </nav>

              <div className="mt-auto border-t border-line pt-5 space-y-4">
                <a
                  href="#contact"
                  onClick={go('#contact')}
                  className="btn-black flex h-12 w-full items-center justify-center rounded-full text-sm font-semibold text-white shadow-sm"
                >
                  Get In Touch
                </a>
                <p className="text-center text-xs text-mute">
                  JNX — Software Development Agency
                </p>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>,
      document.body,
    );

  return (
    <>
      {/* Floating Centered Pill Navbar Container */}
      <header data-condensed={condensed && !open ? 'true' : 'false'} className="fixed top-3 sm:top-5 inset-x-0 z-50 flex justify-center px-4 pointer-events-none">
        <motion.div
          initial={{ y: -60, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className="pointer-events-auto relative w-full max-w-[1100px] will-change-transform"
        >
          {/* Magnetic Release Stretch Wrapper */}
          <motion.div
            style={{
              transformOrigin: 'top center',
              scaleY: shouldReduceMotion ? 1 : stretchY,
              scaleX: shouldReduceMotion ? 1 : stretchX,
              y: shouldReduceMotion ? 0 : magneticY,
              color: 'var(--nav-ink)',
            }}
            className="relative w-full rounded-full will-change-transform"
          >
            {/* Pill Visual Glass Shell (Background, Border, Blur, Shadow) - Fades by opacity directly via scroll progress */}
            <motion.div
              className="pointer-events-none absolute inset-0 rounded-full overflow-hidden"
              style={{
                opacity: shellOpacity,
                background: 'var(--nav-bg)',
                boxShadow: 'var(--nav-shadow)',
                backdropFilter: 'blur(10px)',
                WebkitBackdropFilter: 'blur(10px)',
              }}
              aria-hidden="true"
            >
              {/* Base clean border */}
              <div
                className="absolute inset-0 rounded-full border"
                style={{ borderColor: 'var(--nav-border)' }}
              />
            </motion.div>

            {/* Main Clean Navigation (always legible and interactive) */}
            <nav
              className="relative z-10 flex h-14 sm:h-16 items-center justify-between px-6 sm:px-8"
              aria-label="Main navigation"
            >
              <a
                href="#home"
                onClick={go('#home')}
                aria-label="JNX home"
                className="shrink-0 transition-colors"
                style={{ color: 'var(--nav-ink)' }}
              >
                <Logo size="header" className="nav-logo" />
              </a>

              <ul
                className="hidden translate-y-[2px] items-center gap-1 lg:flex"
                onMouseLeave={() => setHovered(null)}
              >
                {content.nav.links.map((link) => {
                  const id = link.href.slice(1);
                  const isActive = active === id;
                  const isIndicated = (hovered ?? active) === id;
                  return (
                    <li key={link.label} className="relative">
                      <a
                        href={link.href}
                        onClick={go(link.href)}
                        onMouseEnter={() => setHovered(id)}
                        onFocus={() => setHovered(id)}
                        onBlur={() => setHovered(null)}
                        aria-current={isActive ? 'true' : undefined}
                        className={`group relative inline-flex items-center px-3.5 py-2.5 text-sm font-medium transition-colors duration-300 xl:px-4 xl:text-[15px] ${
                          isIndicated ? 'text-purple-bright' : 'text-ink/70'
                        } ${isActive ? 'font-semibold' : ''}`}
                      >
                        <span
                          className={`block transition-transform duration-300 ease-out ${
                            hovered === id && !isActive ? '-translate-y-px' : ''
                          }`}
                        >
                          {link.label}
                        </span>
                        {isIndicated && (
                          <motion.span
                            layoutId="nav-indicator"
                            aria-hidden="true"
                            transition={{ type: 'spring', stiffness: 520, damping: 38, mass: 0.6 }}
                            className="absolute inset-x-3.5 bottom-1 h-[2px] rounded-full bg-gradient-to-r from-purple to-purple-bright shadow-[0_2px_8px_-1px_rgba(121,80,181,0.55)] xl:inset-x-4"
                          />
                        )}
                      </a>
                    </li>
                  );
                })}
              </ul>

              <button
                type="button"
                className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-line sm:h-11 sm:w-11 lg:hidden shadow-sm transition-colors bg-white/70 hover:bg-wash"
                style={{ color: 'var(--nav-ink)' }}
                aria-label={open ? 'Close menu' : 'Open menu'}
                aria-expanded={open}
                onClick={() => {
                  if (open) closeMenu();
                  else setOpen(true);
                }}
              >
                {open ? <X size={20} /> : <Menu size={20} />}
              </button>
            </nav>
          </motion.div>
        </motion.div>
      </header>

      {mobileDrawer}
    </>
  );
}
