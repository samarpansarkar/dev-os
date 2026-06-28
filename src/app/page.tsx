import { LandingNavbar } from "@/components/landing/navbar";
import { LandingHero } from "@/components/landing/hero";
import { LandingFeatures } from "@/components/landing/features";
import { LandingPricing } from "@/components/landing/pricing";

export default function LandingPage() {
  return (
    <div className="antialiased min-h-screen flex flex-col relative bg-background text-foreground overflow-x-hidden font-sans">
      {/* Ambient Glow Background */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute w-[300px] h-[300px] bg-primary/15 blur-[100px] rounded-full top-[10%] left-[20%]"></div>
        <div className="absolute w-[300px] h-[300px] bg-secondary/10 blur-[100px] rounded-full top-[60%] right-[10%]"></div>
      </div>
      
      {/* Background Grid */}
      <div 
        className="fixed inset-0 z-0 pointer-events-none"
        style={{
          backgroundSize: '40px 40px',
          backgroundImage: 'linear-gradient(to right, rgba(39, 39, 42, 0.5) 1px, transparent 1px), linear-gradient(to bottom, rgba(39, 39, 42, 0.5) 1px, transparent 1px)',
          WebkitMaskImage: 'radial-gradient(circle at center, black, transparent 80%)'
        }}
      ></div>

      <LandingNavbar />

      <main className="flex-grow z-10 flex flex-col pt-24 px-6 lg:px-12 max-w-[1440px] mx-auto w-full">
        <LandingHero />
        <LandingFeatures />
        <LandingPricing />
      </main>
    </div>
  );
}
