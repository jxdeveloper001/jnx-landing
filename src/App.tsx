import { MotionConfig } from "framer-motion";
import Community from "./components/Community";
import Faq from "./components/Faq";
import Footer from "./components/Footer";
import Hero from "./components/Hero";
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
   return (
      // reducedMotion="user" disables transform animations for prefers-reduced-motion users
      <MotionConfig reducedMotion="user">
         <Intro />
         <ScrollProgress />
         <div className="grain" aria-hidden />
         <div className="mx-auto max-w-[1440px] md:p-6">
            <div className="relative overflow-clip bg-gradient-to-b from-wash to-white shadow-frame md:rounded-[32px]">
               <Navbar />
               <main>
                  <Hero />
                  <StatsStrip />
                  <Services />
                  <OurWorks />
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
