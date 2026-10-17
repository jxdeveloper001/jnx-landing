import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, Menu, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import type { MouseEvent } from "react";
import { content } from "../content";
import { scrollToHash } from "../lib/scroll";
import Logo from "./Logo";
import PillButton from "./PillButton";

const IDS = ["home", "about", "pricing", "contact", "blog"];

export default function Navbar() {
   const [scrolled, setScrolled] = useState(false);
   const [open, setOpen] = useState(false);
   const [dd, setDd] = useState(false);
   const [active, setActive] = useState("home");
   const [mounted, setMounted] = useState(false);
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

   // Lock background scrolling while the sidebar is open.
   useEffect(() => {
      if (!open) return;

      const body = document.body;
      const html = document.documentElement;

      // Save the current page position
      scrollYRef.current = window.scrollY;

      // Lock the background page
      html.style.overflow = "hidden";
      body.style.overflow = "hidden";
      body.style.position = "fixed";
      body.style.top = `-${scrollYRef.current}px`;
      body.style.left = "0";
      body.style.right = "0";
      body.style.width = "100%";

      return () => {
         // Restore the original page styles
         html.style.overflow = "";
         body.style.overflow = "";
         body.style.position = "";
         body.style.top = "";
         body.style.left = "";
         body.style.right = "";
         body.style.width = "";

         // Restore the exact scroll position
         window.scrollTo(0, scrollYRef.current);
      };
   }, [open]);

   // Close with Escape.
   useEffect(() => {
      if (!open) return;

      const handleKeyDown = (event: KeyboardEvent) => {
         if (event.key === "Escape") {
            setOpen(false);
            setDd(false);
         }
      };

      window.addEventListener("keydown", handleKeyDown);

      return () => window.removeEventListener("keydown", handleKeyDown);
   }, [open]);

   const closeMenu = () => {
      setOpen(false);
      setDd(false);
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
                  {/* Smooth backdrop and blur */}
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
                     className="fixed inset-0 z-[100] cursor-default bg-black/30"
                     style={{
                        backdropFilter: "blur(10px)",
                        WebkitBackdropFilter: "blur(10px)",
                     }}
                  />

                  {/* Right-side sidebar */}
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
                     {/* Sidebar header */}
                     <div className="flex items-center justify-between border-b border-line pb-5">
                        <a
                           href="#home"
                           onClick={go("#home")}
                           aria-label="JNX home"
                           className="shrink-0"
                        >
                           <Logo />
                        </a>

                        <button
                           type="button"
                           onClick={closeMenu}
                           aria-label="Close menu"
                           className="grid h-10 w-10 place-items-center rounded-full border border-line transition-colors hover:bg-wash"
                        >
                           <X size={20} />
                        </button>
                     </div>

                     {/* Navigation links */}
                     <nav
                        className="flex-1 py-7"
                        aria-label="Mobile navigation links"
                     >
                        <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-gray-400">
                           Navigation
                        </p>

                        <div className="flex flex-col gap-1">
                           {content.nav.links.map((link, index) => (
                              <div key={link.label}>
                                 <div className="flex items-center gap-2">
                                    <motion.a
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
                                          active === link.href.replace("#", "")
                                             ? "bg-wash text-ink"
                                             : "text-gray-600 hover:bg-wash hover:text-ink"
                                       }`}
                                    >
                                       {link.label}
                                    </motion.a>

                                    {link.dropdown && (
                                       <button
                                          type="button"
                                          aria-label={`Toggle ${link.label} submenu`}
                                          aria-expanded={dd}
                                          onClick={() =>
                                             setDd((value) => !value)
                                          }
                                          className="grid h-11 w-11 shrink-0 place-items-center rounded-xl border border-line hover:bg-wash"
                                       >
                                          <ChevronDown
                                             size={18}
                                             className={`transition-transform duration-300 ${
                                                dd ? "rotate-180" : ""
                                             }`}
                                          />
                                       </button>
                                    )}
                                 </div>

                                 <AnimatePresence>
                                    {link.dropdown && dd && (
                                       <motion.div
                                          initial={{ height: 0, opacity: 0 }}
                                          animate={{
                                             height: "auto",
                                             opacity: 1,
                                          }}
                                          exit={{ height: 0, opacity: 0 }}
                                          transition={{ duration: 0.3 }}
                                          className="overflow-hidden"
                                       >
                                          <div className="ml-4 flex flex-col border-l border-line py-2 pl-3">
                                             {link.dropdown.map((item) => (
                                                <a
                                                   key={item}
                                                   href="#pricing"
                                                   onClick={go("#pricing")}
                                                   className="rounded-lg px-3 py-2.5 text-sm text-gray-500 transition-colors hover:bg-wash hover:text-ink"
                                                >
                                                   {item}
                                                </a>
                                             ))}
                                          </div>
                                       </motion.div>
                                    )}
                                 </AnimatePresence>
                              </div>
                           ))}
                        </div>
                     </nav>

                     {/* Sidebar actions */}
                     <div className="mt-auto border-t border-line pt-6">
                        <div className="flex flex-col gap-3">
                           <PillButton className="w-full justify-center">
                              {content.nav.login}
                           </PillButton>

                           <PillButton
                              variant="outline"
                              className="w-full justify-center"
                           >
                              {content.nav.register}
                           </PillButton>
                        </div>

                        <p className="mt-6 text-center text-xs text-gray-400">
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
         <motion.header
            initial={{ y: -80 }}
            animate={{ y: open ? 0 : scrolled ? 0 : 16 }}
            transition={{
               duration: 0.4,
               ease: [0.22, 1, 0.36, 1],
            }}
            className={`fixed inset-x-0 top-0 z-50 border-b transition-colors duration-300 ${
               open
                  ? "border-transparent"
                  : scrolled
                    ? "border-line bg-white/90 shadow-sm backdrop-blur-xl"
                    : "border-transparent bg-white/70 backdrop-blur-md"
            }`}
         >
            <nav
               className="container-x mx-auto flex h-16 items-center justify-between gap-3 sm:h-20"
               aria-label="Main navigation"
            >
               {/* Logo */}
               <a
                  href="#home"
                  onClick={go("#home")}
                  aria-label="JNX home"
                  className="relative z-[60] shrink-0"
               >
                  <Logo />
               </a>

               {/* Desktop navigation */}
               <ul className="hidden items-center gap-5 lg:flex xl:gap-9">
                  {content.nav.links.map((link) => (
                     <li
                        key={link.label}
                        className="relative"
                        onMouseEnter={() => link.dropdown && setDd(true)}
                        onMouseLeave={() => link.dropdown && setDd(false)}
                     >
                        <div className="flex items-center gap-1">
                           <a
                              href={link.href}
                              onClick={go(link.href)}
                              className="relative inline-flex items-center gap-1 py-2 text-sm font-medium after:absolute after:bottom-0 after:left-0 after:h-px after:w-full after:origin-left after:scale-x-0 after:bg-ink after:transition-transform hover:after:scale-x-100 xl:text-[15px]"
                           >
                              {link.label}
                           </a>

                           {link.dropdown && (
                              <button
                                 type="button"
                                 aria-label={`Toggle ${link.label} submenu`}
                                 aria-expanded={dd}
                                 onClick={() => setDd((value) => !value)}
                                 className="rounded p-1"
                              >
                                 <ChevronDown
                                    size={15}
                                    className={`transition-transform ${
                                       dd ? "rotate-180" : ""
                                    }`}
                                 />
                              </button>
                           )}
                        </div>

                        {active === link.href.slice(1) &&
                           link.label === "Home" && (
                              <motion.span
                                 layoutId="dot"
                                 className="absolute -bottom-1 left-1/2 h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-ink"
                              />
                           )}

                        <AnimatePresence>
                           {link.dropdown && dd && (
                              <motion.ul
                                 initial={{ opacity: 0, y: 8 }}
                                 animate={{ opacity: 1, y: 0 }}
                                 exit={{ opacity: 0, y: 8 }}
                                 className="absolute left-1/2 top-full z-50 w-44 -translate-x-1/2 rounded-2xl border border-line bg-white p-2 shadow-card"
                              >
                                 {link.dropdown.map((item) => (
                                    <li key={item}>
                                       <a
                                          href="#pricing"
                                          onClick={go("#pricing")}
                                          className="block rounded-xl px-3 py-2 text-sm hover:bg-wash"
                                       >
                                          {item}
                                       </a>
                                    </li>
                                 ))}
                              </motion.ul>
                           )}
                        </AnimatePresence>
                     </li>
                  ))}
               </ul>

               {/* Desktop actions */}
               <div className="hidden shrink-0 items-center gap-2 lg:flex xl:gap-3">
                  <PillButton className="!px-4 !py-2.5 xl:!px-6">
                     {content.nav.login}
                  </PillButton>

                  <PillButton
                     variant="outline"
                     className="!px-4 !py-2.5 xl:!px-6"
                  >
                     {content.nav.register}
                  </PillButton>
               </div>

               {/* Mobile menu toggle */}
               <button
                  type="button"
                  className="relative z-[60] grid h-10 w-10 shrink-0 place-items-center rounded-full border border-line bg-white sm:h-11 sm:w-11 lg:hidden"
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
         </motion.header>

         {/* Portal keeps the backdrop and sidebar above the page */}
         {mobileDrawer}
      </>
   );
}
