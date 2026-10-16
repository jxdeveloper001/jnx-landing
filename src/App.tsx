import { MotionConfig } from "framer-motion";
import Benefits from "./components/Benefits";
import Community from "./components/Community";
import Cursor from "./components/Cursor";
import Faq from "./components/Faq";
import Footer from "./components/Footer";
import Hero from "./components/Hero";
import Intro from "./components/Intro";
import Navbar from "./components/Navbar";
import ScrollProgress from "./components/ScrollProgress";
import SearchSection from "./components/SearchSection";
import StatsStrip from "./components/StatsStrip";
import Testimonials from "./components/Testimonials";
import { useLenis } from "./hooks/useLenis";

export default function App() {
   useLenis();
   return (
      // reducedMotion="user" disables transform animations for prefers-reduced-motion users
      <MotionConfig reducedMotion="user">
         <Intro />
         <ScrollProgress />
         <Cursor />
         <div className="grain" aria-hidden />
         <div className="mx-auto max-w-[1440px] md:p-6">
            <div className="relative overflow-clip bg-gradient-to-b from-wash to-white shadow-frame md:rounded-[32px]">
               <Navbar />
               <main>
                  <Hero />
                  <StatsStrip />
                  <Benefits />
                  <SearchSection />
                  <Community />
                  <Testimonials />
                  <Faq />
               </main>
               <Footer />
            </div>
         </div>
      </MotionConfig>
   );
}
