import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import type { MouseEvent } from "react";
import { GLITCH_DURATION_MS, GLITCH_INTERVAL_MS, content } from "../content";
import { scrollToHash } from "../lib/scroll";
import Logo from "./Logo";

const IDS = ["home", "service", "our-works", "contact"];

export default function Navbar() {
   const shouldReduceMotion = useReducedMotion();
   const [scrolled, setScrolled] = useState(false);
   const [open, setOpen] = useState(false);
   const [active, setActive] = useState("home");
   const [mounted, setMounted] = useState(false);
   const [navTheme, setNavTheme] = useState<"light" | "dark">("light");
   const [isGlitching, setIsGlitching] = useState(false);
   const scrollYRef = useRef(0);

   useEffect(() => {
      setMounted(true);
   }, []);

   useEffect(() => {
      const handleScroll = () => setScrolled(window.scrollY > 20);

      handleScroll();
      window.addEventListener("scroll", handleScroll, { passive: true });

      const observer = new IntersectionObserver(
         (entries) => {
            entries.forEach((entry) => {
               if (entry.isIntersecting) setActive(entry.target.id);
            });
         },
         { rootMargin: "-40% 0px -50% 0px" },
      );

      IDS.forEach((id) => {
         const element = document.getElementById(id);
         if (element) observer.observe(element);
      });

      return () => {
         window.removeEventListener("scroll", handleScroll);
         observer.disconnect();
      };
   }, []);

   // Glitch v2 Timer: triggers every GLITCH_INTERVAL_MS for GLITCH_DURATION_MS
   // Flips theme (light <-> dark) at ~45% of the burst.
   useEffect(() => {
      if (shouldReduceMotion) {
         setNavTheme("light");
         setIsGlitching(false);
         return;
      }
      if (open) {
         setIsGlitching(false);
         return;
      }

      let flipTimer: ReturnType<typeof setTimeout> | undefined;
      let endTimer: ReturnType<typeof setTimeout> | undefined;

      const interval = setInterval(() => {
         setIsGlitching(true);

         // Flip theme at 45% of the burst (hard stepped cut)
         flipTimer = setTimeout(() => {
            setNavTheme((prev) => (prev === "light" ? "dark" : "light"));
         }, Math.round(GLITCH_DURATION_MS * 0.45));

         // Settle burst at GLITCH_DURATION_MS
         endTimer = setTimeout(() => {
            setIsGlitching(false);
         }, GLITCH_DURATION_MS);
      }, GLITCH_INTERVAL_MS);

      return () => {
         clearInterval(interval);
         if (flipTimer) clearTimeout(flipTimer);
         if (endTimer) clearTimeout(endTimer);
      };
   }, [shouldReduceMotion, open]);

   // Lock background scrolling while the mobile menu is open.
   useEffect(() => {
      if (!open) return;

      const body = document.body;
      const html = document.documentElement;

      scrollYRef.current = window.scrollY;

      html.style.overflow = "hidden";
      body.style.overflow = "hidden";
      body.style.position = "fixed";
      body.style.top = `-${scrollYRef.current}px`;
      body.style.left = "0";
      body.style.right = "0";
      body.style.width = "100%";

      return () => {
         html.style.overflow = "";
         body.style.overflow = "";
         body.style.position = "";
         body.style.top = "";
         body.style.left = "";
         body.style.right = "";
         body.style.width = "";

         window.scrollTo(0, scrollYRef.current);
      };
   }, [open]);

   // Close with Escape.
   useEffect(() => {
      if (!open) return;

      const handleKeyDown = (event: KeyboardEvent) => {
         if (event.key === "Escape") {
            setOpen(false);
         }
      };

      window.addEventListener("keydown", handleKeyDown);

      return () => window.removeEventListener("keydown", handleKeyDown);
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
                     className="fixed inset-0 z-[100] cursor-default bg-[#0A0A0F]/60"
                     style={{
                        backdropFilter: "blur(10px)",
                        WebkitBackdropFilter: "blur(10px)",
                     }}
                  />

                  <motion.aside
                     initial={{ x: "100%" }}
                     animate={{ x: 0 }}
                     exit={{ x: "100%" }}
                     transition={{
                        type: "spring",
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
                           onClick={go("#home")}
                           aria-label="JNX home"
                           className="shrink-0 text-ink"
                        >
                           <Logo />
                        </a>

                        <button
                           type="button"
                           onClick={closeMenu}
                           aria-label="Close menu"
                           className="grid h-10 w-10 place-items-center rounded-full border border-line transition-colors hover:bg-wash"
                        >
                           <X size={20} className="text-ink" />
                        </button>
                     </div>

                     <nav
                        className="flex-1 py-7"
                        aria-label="Mobile navigation links"
                     >
                        <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-mute">
                           Navigation
                        </p>

                        <div className="flex flex-col gap-1">
                           {content.nav.links.map((link, index) => {
                              const targetId = link.href.replace("#", "");
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
                                    className={`flex-1 rounded-xl px-4 py-3.5 text-base font-medium transition-colors ${
                                       isActive
                                          ? "bg-wash text-purple font-semibold"
                                          : "text-mute hover:bg-wash hover:text-ink"
                                    }`}
                                 >
                                    {link.label}
                                 </motion.a>
                              );
                           })}
                        </div>
                     </nav>

                     <div className="mt-auto border-t border-line pt-6">
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
         <header className="fixed top-3 sm:top-5 inset-x-0 z-50 flex justify-center px-4 pointer-events-none">
            <motion.div
               data-nav-theme={navTheme}
               initial={{ y: -60, opacity: 0 }}
               animate={{ y: 0, opacity: 1 }}
               transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
               style={{
                  background: open ? "transparent" : "var(--nav-bg)",
                  boxShadow: open ? "none" : "var(--nav-shadow)",
                  color: "var(--nav-ink)",
               }}
               className={`pointer-events-auto relative w-full max-w-[1100px] rounded-full backdrop-blur-xl transition-all duration-300 ${
                  isGlitching && !shouldReduceMotion && !open
                     ? "glitching glitch-jitter"
                     : ""
               }`}
            >
               {/* Border Ring Layer (absolutely positioned, glitches separately) */}
               <div
                  className="pointer-events-none absolute inset-0 rounded-full overflow-hidden"
                  aria-hidden="true"
               >
                  {/* Base clean border */}
                  <div
                     className="absolute inset-0 rounded-full border transition-colors duration-300"
                     style={{ borderColor: open ? "transparent" : "var(--nav-border)" }}
                  />

                  {/* Stepped split border rings during glitch burst */}
                  {isGlitching && !shouldReduceMotion && !open && (
                     <>
                        <div className="glitch-border-purple absolute inset-0 rounded-full border-2 border-[#7C3AED]" />
                        <div className="glitch-border-magenta absolute inset-0 rounded-full border-2 border-[#C026D3]" />
                        <div className="glitch-border-cyan absolute inset-0 rounded-full border-2 border-[#22D3EE]" />
                        <div
                           className="glitch-border-main absolute inset-0 rounded-full border-2"
                           style={{
                              borderColor: navTheme === "dark" ? "#FFFFFF" : "#0A0A0F",
                           }}
                        />
                     </>
                  )}
               </div>

               {/* Main Clean Navigation (always legible and interactive) */}
               <nav
                  className="relative z-10 flex h-14 sm:h-16 items-center justify-between px-6 sm:px-8"
                  aria-label="Main navigation"
               >
                  <a
                     href="#home"
                     onClick={go("#home")}
                     aria-label="JNX home"
                     className="shrink-0 transition-colors"
                     style={{ color: "var(--nav-ink)" }}
                  >
                     <Logo />
                  </a>

                  <ul className="hidden items-center gap-6 lg:flex xl:gap-10">
                     {content.nav.links.map((link) => (
                        <li key={link.label} className="relative">
                           <div className="flex items-center gap-1">
                              <a
                                 href={link.href}
                                 onClick={go(link.href)}
                                 style={{ color: "var(--nav-ink)" }}
                                 className="relative inline-flex items-center gap-1 py-2 text-sm font-medium after:absolute after:bottom-0 after:left-0 after:h-px after:w-full after:origin-left after:scale-x-0 after:bg-[var(--nav-ink)] after:transition-transform hover:after:scale-x-100 xl:text-[15px]"
                              >
                                 {link.label}
                              </a>
                           </div>

                           {active === link.href.slice(1) &&
                              link.label === "Home" && (
                                 <motion.span
                                    layoutId="dot"
                                    className="absolute -bottom-1 left-1/2 h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-[var(--purple-bright)]"
                                 />
                              )}
                        </li>
                     ))}
                  </ul>

                  <button
                     type="button"
                     className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-[var(--nav-border)] sm:h-11 sm:w-11 lg:hidden shadow-sm transition-colors"
                     style={{
                        color: "var(--nav-ink)",
                        background: "var(--nav-bg)",
                     }}
                     aria-label={open ? "Close menu" : "Open menu"}
                     aria-expanded={open}
                     onClick={() => {
                        if (open) closeMenu();
                        else setOpen(true);
                     }}
                  >
                     {open ? <X size={20} /> : <Menu size={20} />}
                  </button>
               </nav>

               {/* Glitch v2 Burst Overlays */}
               {isGlitching && !shouldReduceMotion && !open && (
                  <div
                     className="pointer-events-none absolute inset-0 overflow-hidden rounded-full z-20"
                     aria-hidden="true"
                  >
                     {/* 1. Magenta Ghost split layer */}
                     <div
                        className="glitch-magenta absolute inset-0 flex h-14 sm:h-16 items-center justify-between px-6 sm:px-8 text-[#C026D3] opacity-85"
                        style={{ mixBlendMode: "var(--nav-ghost-blend)" as any }}
                     >
                        <span className="font-extrabold text-2xl tracking-tighter">JNX</span>
                        <ul className="hidden items-center gap-6 lg:flex xl:gap-10">
                           {content.nav.links.map((link) => (
                              <li key={link.label} className="py-2 text-sm font-medium xl:text-[15px]">
                                 {link.label}
                              </li>
                           ))}
                        </ul>
                        <div className="h-10 w-10 sm:h-11 sm:w-11 rounded-full border border-current lg:hidden" />
                     </div>

                     {/* 2. Cyan Ghost split layer */}
                     <div
                        className="glitch-cyan absolute inset-0 flex h-14 sm:h-16 items-center justify-between px-6 sm:px-8 text-[#22D3EE] opacity-85"
                        style={{ mixBlendMode: "var(--nav-ghost-blend)" as any }}
                     >
                        <span className="font-extrabold text-2xl tracking-tighter">JNX</span>
                        <ul className="hidden items-center gap-6 lg:flex xl:gap-10">
                           {content.nav.links.map((link) => (
                              <li key={link.label} className="py-2 text-sm font-medium xl:text-[15px]">
                                 {link.label}
                              </li>
                           ))}
                        </ul>
                        <div className="h-10 w-10 sm:h-11 sm:w-11 rounded-full border border-current lg:hidden" />
                     </div>

                     {/* 3. Slice Displacement Strips */}
                     <div className="glitch-slice-1 absolute inset-0 flex h-14 sm:h-16 items-center justify-between px-6 sm:px-8 text-[var(--nav-ink)] opacity-90">
                        <span className="font-extrabold text-2xl tracking-tighter">JNX</span>
                        <ul className="hidden items-center gap-6 lg:flex xl:gap-10">
                           {content.nav.links.map((link) => (
                              <li key={link.label} className="py-2 text-sm font-medium xl:text-[15px]">
                                 {link.label}
                              </li>
                           ))}
                        </ul>
                        <div className="h-10 w-10 sm:h-11 sm:w-11 rounded-full border border-current lg:hidden" />
                     </div>

                     <div className="glitch-slice-2 absolute inset-0 flex h-14 sm:h-16 items-center justify-between px-6 sm:px-8 text-[var(--nav-ink)] opacity-90">
                        <span className="font-extrabold text-2xl tracking-tighter">JNX</span>
                        <ul className="hidden items-center gap-6 lg:flex xl:gap-10">
                           {content.nav.links.map((link) => (
                              <li key={link.label} className="py-2 text-sm font-medium xl:text-[15px]">
                                 {link.label}
                              </li>
                           ))}
                        </ul>
                        <div className="h-10 w-10 sm:h-11 sm:w-11 rounded-full border border-current lg:hidden" />
                     </div>

                     {/* 4. Block Glitch Rectangles */}
                     <div
                        className="glitch-block-1 absolute rounded pointer-events-none"
                        style={{ background: "var(--nav-opposite)" }}
                     />
                     <div
                        className="glitch-block-2 absolute rounded pointer-events-none"
                        style={{ background: "var(--nav-opposite)" }}
                     />
                     <div
                        className="glitch-block-3 absolute rounded pointer-events-none"
                        style={{ background: "var(--nav-opposite)" }}
                     />

                     {/* 5. Fast horizontal scanline sweep */}
                     <div className="glitch-scanline absolute left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#22D3EE] to-transparent pointer-events-none" />

                     {/* 6. Faint RGB noise texture flicker */}
                     <div className="glitch-noise absolute inset-0 rounded-full pointer-events-none bg-gradient-to-r from-[#C026D3]/10 via-[#22D3EE]/10 to-[#7C3AED]/10 mix-blend-overlay" />
                  </div>
               )}
            </motion.div>
         </header>

         {mobileDrawer}
      </>
   );
}
