import Link from "next/link";
import { FadeUp } from "@/components/ui/FadeUp";

export default function CTABanner() {
  return (
    <section className="py-20 md:py-28 bg-[#0A0A0A] relative overflow-hidden">
      {/* Background pattern */}
      <div
        className="absolute inset-0 opacity-5 pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(#FF6B00 1px, transparent 1px), linear-gradient(90deg, #FF6B00 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }}
      />

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <FadeUp>
          <p className="font-body text-sm font-bold uppercase tracking-[0.3em] text-[#FF6B00] mb-4">
            Don&apos;t wait, start now
          </p>
          <h2 className="font-heading text-5xl md:text-7xl text-white leading-none uppercase mb-2">
            READY TO START?
          </h2>
          <h2 className="font-heading text-5xl md:text-7xl text-[#FF6B00] leading-none uppercase mb-10">
            JOIN ELITE EDGE FITNESS TODAY
          </h2>
          <Link
            href="/plans"
            className="inline-flex items-center gap-3 bg-[#FF6B00] text-[#0A0A0A] text-sm font-bold uppercase tracking-widest px-10 py-5 hover:bg-[#FF8C42] transition-all duration-200"
          >
            GET STARTED &#x2192;
          </Link>
        </FadeUp>
      </div>
    </section>
  );
}

