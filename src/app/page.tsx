import Nav from "@/components/layout/Nav";
import Footer from "@/components/layout/Footer";
import Checker from "@/components/layout/Checker";
import Hero from "@/components/sections/Hero";
import Marquee from "@/components/sections/Marquee";
import About from "@/components/sections/About";
import MenuSection from "@/components/sections/MenuSection";
import HotPlate from "@/components/sections/HotPlate";
import HoursSection from "@/components/sections/HoursSection";
import VisitSection from "@/components/sections/VisitSection";

export default function Home() {
  return (
    <div className="overflow-x-hidden bg-cream font-hanken text-green-dark antialiased">
      <Nav />
      <Hero />
      <Marquee />
      <About />
      <Checker />
      <MenuSection />
      <HotPlate />
      <Checker />
      <HoursSection />
      <VisitSection />
      <Footer />
    </div>
  );
}
