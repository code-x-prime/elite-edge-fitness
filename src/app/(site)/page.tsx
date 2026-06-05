import HeroSection from "@/components/home/HeroSection";
import MarqueeStrip from "@/components/home/MarqueeStrip";
import StatsSection from "@/components/home/StatsSection";
import AboutSnapshot from "@/components/home/AboutSnapshot";
import CoachSection from "@/components/home/CoachSection";
import PremiumSection from "@/components/home/PremiumSection";
import WhyChooseUs from "@/components/home/WhyChooseUs";
import ServicesSection from "@/components/home/ServicesSection";
import ProgramsSection from "@/components/home/ProgramsSection";
import HowItWorks from "@/components/home/HowItWorks";
import TestimonialsSection from "@/components/home/TestimonialsSection";
import FAQSection from "@/components/home/FAQSection";
import CTABanner from "@/components/home/CTABanner";

export default function HomePage() {
  return (
    <main>
      <HeroSection />
      <MarqueeStrip />
      <StatsSection />
      <AboutSnapshot />
      <CoachSection />
      <PremiumSection />
      <WhyChooseUs />
      <ServicesSection />
      <ProgramsSection />
      <HowItWorks />
      <TestimonialsSection />
      <FAQSection />
      <CTABanner />
    </main>
  );
}
