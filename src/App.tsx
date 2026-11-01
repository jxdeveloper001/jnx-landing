import { MotionConfig } from "framer-motion";
import { useEffect } from "react";
import Faq from "./components/Faq";
import Footer from "./components/Footer";
import Hero from "./components/Hero";
import HowWeWork from "./components/HowWeWork";
import Intro from "./components/Intro";
import Navbar from "./components/Navbar";
import OurWorks from "./components/OurWorks";
import ScrollProgress from "./components/ScrollProgress";
import Services from "./components/Services";
import StatsStrip from "./components/StatsStrip";
import Testimonials from "./components/Testimonials";
import { useLenis } from "./hooks/useLenis";

export default function App() {
   useLenis();

   // Ambient background upkeep: pause when hidden, lighten on low-power devices (no re-renders)
   useEffect(() => {
      const root = document.documentElement;
      const nav = navigator as Navigator & { deviceMemory?: number };
      if ((nav.hardwareConcurrency && nav.hardwareConcurrency <= 4) || (nav.deviceMemory && nav.deviceMemory <= 4)) {
         root.classList.add("low-power");
      }
      const onVis = () => root.classList.toggle("page-hidden", document.hidden);
      document.addEventListener("visibilitychange", onVis);
      return () => document.removeEventListener("visibilitychange", onVis);
   }, []);
   return (
      // reducedMotion="user" disables transform animations for prefers-reduced-motion users
      <MotionConfig reducedMotion="user">
         <Intro />
         <ScrollProgress />
         <div className="ambient" aria-hidden>
            <span className="ambient-blob b1" />
            <span className="ambient-blob b2" />
            <span className="ambient-blob b3" />
         </div>
         <div className="grain" aria-hidden />
         <div className="mx-auto max-w-[1440px] md:p-6">
            <div className="relative overflow-clip bg-gradient-to-b from-wash to-white shadow-frame md:rounded-[32px]">
               <Navbar />
               <main>
                  <Hero />
                  <StatsStrip />
                  <Services />
                  <OurWorks />
                  <HowWeWork />
                  <Testimonials />
                  <Faq />
               </main>
               <Footer />
            </div>
         </div>
      </MotionConfig>
   );
}
