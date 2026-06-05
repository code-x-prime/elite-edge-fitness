import Link from "next/link";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { FadeUp } from "@/components/ui/FadeUp";

const SPECIALIZATIONS = [
  "Diet Designing",
  "Model Grooming",
  "Body Transformation",
  "Weight Loss",
  "Online Training",
  "Six Pack Plans",
  "Body Building",
  "Endurance Workouts",
  "Customized Diet Plans",
  "Core Training",
];

export default function CoachSection() {
  return (
    <section className="py-14 md:py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Image */}
          <FadeUp>
            <div className="relative">
              <div className="aspect-[4/5] border-4 border-[#FF6B00] bg-[#0A0A0A] relative overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/profile.jpeg"
                  alt="Coach Gineel N"
                  className="absolute inset-0 w-full h-full object-cover object-top"
                />
                {/* Bottom gradient overlay */}
                <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#0A0A0A]/60 to-transparent" />
                {/* Orange glow bottom */}
                <div
                  className="absolute bottom-0 left-0 right-0 h-40 pointer-events-none"
                  style={{ background: "radial-gradient(ellipse at 50% 100%, rgba(255,107,0,0.15), transparent)" }}
                />
              </div>
              {/* Stat badge */}
              <div className="absolute -bottom-6 -right-6 bg-[#0A0A0A] p-6 shadow-xl">
                <p className="font-heading text-4xl text-[#FF6B00] leading-none">500+</p>
                <p className="text-xs text-gray-400 uppercase tracking-widest font-body mt-1">Lives Changed</p>
              </div>
            </div>
          </FadeUp>

          {/* Content */}
          <FadeUp delay={0.2}>
            <SectionHeader eyebrow="Meet the Coach" title="DREAM. BELIEVE. ACHIEVE." />

            <p className="text-[#555] font-body leading-relaxed mt-8 mb-8">
              Gineel N is not just known for his amazing physique, but for his Character and High Standards in representing the sports fitness industry. With over 13 years of dedicated coaching, he has transformed hundreds of lives through science-backed training and nutrition.
            </p>

            <p className="font-body font-bold uppercase tracking-[0.2em] text-[#FF6B00] text-xs mb-4">
              Specializations
            </p>
            <div className="grid grid-cols-2 gap-2 mb-8">
              {SPECIALIZATIONS.map((item) => (
                <div key={item} className="flex items-center gap-2 text-sm text-[#444] font-body">
                  <span className="text-[#FF6B00] text-xs">▶</span>
                  {item}
                </div>
              ))}
            </div>

            <Link
              href="/about"
              className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-[#FF6B00] border-b-2 border-[#FF6B00] pb-0.5 hover:text-[#0A0A0A] hover:border-[#0A0A0A] transition-colors"
            >
              READ MORE &#x2192;
            </Link>
          </FadeUp>
        </div>
      </div>
    </section>
  );
}

