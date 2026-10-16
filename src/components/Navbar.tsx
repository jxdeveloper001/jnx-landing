import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { content } from "../content";
import { scrollToHash } from "../lib/scroll";
import Logo from "./Logo";
import PillButton from "./PillButton";

const IDS = ["home", "about", "pricing", "contact", "blog"];
export default function Navbar() {
   const [scrolled, setScrolled] = useState(false),
      [open, setOpen] = useState(false),
      [dd, setDd] = useState(false),
      [active, setActive] = useState("home");
   useEffect(() => {
      const handleScroll = () => {
         setScrolled(window.scrollY > 20);
      };

      handleScroll();

      window.addEventListener("scroll", handleScroll, {
         passive: true,
      });

      const observer = new IntersectionObserver(
         (entries) => {
            entries.forEach((entry) => {
               if (entry.isIntersecting) {
                  setActive(entry.target.id);
               }
            });
         },
         { rootMargin: "-45% 0px -50% 0px" },
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

   const go = (href: string) => (e: React.MouseEvent) => {
      e.preventDefault();
      setOpen(false);
      setTimeout(() => scrollToHash(href), open ? 300 : 0);
   };
   return (
      <motion.header
         initial={{ y: -80 }}
         animate={{
            y: scrolled ? 0 : 25,
         }}
         transition={{
            duration: 0.4,
            ease: [0.22, 1, 0.36, 1],
         }}
         className={`fixed inset-x-0 top-0 z-50 border-b transition-colors duration-300 ${
            scrolled
               ? "border-line bg-white/70 backdrop-blur-xl"
               : "border-transparent bg-transparent"
         }`}
      >
         <nav
            className="container-x flex h-20 items-center justify-between"
            aria-label="Main"
         >
            <a
               href="#home"
               onClick={go("#home")}
               aria-label="JNX home"
               className="relative z-[60]"
            >
               <Logo />
            </a>
            <ul className="hidden items-center gap-10 md:flex">
               {content.nav.links.map((l) => (
                  <li
                     key={l.label}
                     className="relative"
                     onMouseEnter={() => l.dropdown && setDd(true)}
                     onMouseLeave={() => l.dropdown && setDd(false)}
                  >
                     <a
                        href={l.href}
                        onClick={go(l.href)}
                        className="relative inline-flex items-center gap-1 pb-1 text-[15px] font-medium after:absolute after:-bottom-0.5 after:left-0 after:h-px after:w-full after:origin-left after:scale-x-0 after:bg-ink after:transition-transform after:duration-300 hover:after:scale-x-100"
                     >
                        {l.label}
                        {l.dropdown && (
                           <ChevronDown
                              size={15}
                              className={`transition-transform ${dd ? "rotate-180" : ""}`}
                           />
                        )}
                     </a>
                     {active === l.href.slice(1) && l.label === "Home" && (
                        <motion.span
                           layoutId="dot"
                           className="absolute -bottom-3 left-1/2 h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-ink"
                        />
                     )}
                     <AnimatePresence>
                        {l.dropdown && dd && (
                           <motion.ul
                              initial={{ opacity: 0, y: 8 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: 8 }}
                              className="absolute left-1/2 top-full w-40 -translate-x-1/2 rounded-2xl border border-line bg-white p-2 shadow-card"
                           >
                              {l.dropdown.map((d) => (
                                 <li key={d}>
                                    <a
                                       href="#pricing"
                                       onClick={go("#pricing")}
                                       className="block rounded-xl px-3 py-2 text-sm hover:bg-wash"
                                    >
                                       {d}
                                    </a>
                                 </li>
                              ))}
                           </motion.ul>
                        )}
                     </AnimatePresence>
                  </li>
               ))}
            </ul>
            <div className="hidden items-center gap-3 md:flex">
               <PillButton className="!px-6 !py-2.5">
                  {content.nav.login}
               </PillButton>
               <PillButton variant="outline" className="!px-6 !py-2.5">
                  {content.nav.register}
               </PillButton>
            </div>
            <button
               className="relative z-[60] grid h-11 w-11 place-items-center rounded-full border border-line bg-white md:hidden"
               aria-label={open ? "Close menu" : "Open menu"}
               aria-expanded={open}
               onClick={() => setOpen(!open)}
            >
               {open ? <X size={20} /> : <Menu size={20} />}
            </button>
         </nav>
         <AnimatePresence>
            {open && (
               <motion.div
                  initial={{ clipPath: "circle(0% at 90% 40px)" }}
                  animate={{ clipPath: "circle(150% at 90% 40px)" }}
                  exit={{ clipPath: "circle(0% at 90% 40px)" }}
                  transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
                  className="fixed inset-0 z-50 flex flex-col justify-center gap-6 bg-white px-8"
               >
                  {content.nav.links.map((l, i) => (
                     <motion.a
                        key={l.label}
                        href={l.href}
                        onClick={go(l.href)}
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 + i * 0.07 }}
                        className="text-5xl font-bold tracking-tight"
                     >
                        {l.label}
                     </motion.a>
                  ))}
                  <div className="mt-4 flex gap-3">
                     <PillButton>{content.nav.login}</PillButton>
                     <PillButton variant="outline">
                        {content.nav.register}
                     </PillButton>
                  </div>
               </motion.div>
            )}
         </AnimatePresence>
      </motion.header>
   );
}
