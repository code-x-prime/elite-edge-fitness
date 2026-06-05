"use client";

import { IconBolt, IconHeartHandshake, IconShield } from "@tabler/icons-react";
import { FadeUp } from "@/components/ui/FadeUp";

const CARDS = [
  {
    icon: IconBolt,
    title: "Maximum Results, Minimum Time",
    desc: "Our commitment is to maximise your time efficiency, optimise your health and deliver quantifiable return on your investment.",
  },
  {
    icon: IconHeartHandshake,
    title: "We Are a Partner and a Coach",
    desc: "We share the responsibility and take your transformation very personally. Together, we will unlock the results you desire.",
  },
  {
    icon: IconShield,
    title: "Everything is Done with Integrity",
    desc: "Honesty is integral to achieving results. As your trusted partner, we tell you what you need to hear, not what you want to hear.",
  },
];

export default function InvestedSection() {
  return (
    <section className="bg-[#F4F4F4] py-14 md:py-16 relative overflow-hidden">
      {/* Subtle background texture pattern */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg, transparent, transparent 60px, #0A0A0A 60px, #0A0A0A 61px), repeating-linear-gradient(90deg, transparent, transparent 60px, #0A0A0A 60px, #0A0A0A 61px)",
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <FadeUp>
          <div className="text-center mb-14">
            {/* Badge */}
            <span className="inline-block bg-gradient-to-r from-[#FF6B00] to-[#FF8C42] text-white text-xs px-4 py-1.5 rounded-full font-body font-bold uppercase tracking-wide shadow-lg shadow-[#FF6B00]/20 mb-6">
              Achieving Goals Together
            </span>

            {/* Heading */}
            <h2 className="font-heading text-5xl md:text-6xl text-[#0A0A0A] leading-[0.95] uppercase max-w-3xl mx-auto">
              We Are Invested In Every{" "}
              <span className="text-[#FF6B00]">Member&apos;s Goal</span>
            </h2>
          </div>
        </FadeUp>

        {/* 3 Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {CARDS.map((card, i) => {
            const Icon = card.icon;
            return (
              <FadeUp key={card.title} delay={i * 0.12}>
                <div className="bg-white rounded-2xl overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group h-full flex flex-col">
                  {/* Image placeholder */}
                  <div className="h-56 bg-[#1A1A1A] flex items-center justify-center relative overflow-hidden">
                    {/* Atmospheric glow — orange from bottom */}
                    <div
                      className="absolute bottom-0 left-0 right-0 h-28 pointer-events-none"
                      style={{
                        background:
                          "linear-gradient(to top, rgba(255,107,0,0.20) 0%, transparent 100%)",
                      }}
                    />

                    {/* Top dark fade */}
                    <div
                      className="absolute top-0 left-0 right-0 h-16 pointer-events-none"
                      style={{
                        background: "linear-gradient(to bottom, rgba(10,10,10,0.5) 0%, transparent 100%)",
                      }}
                    />

                    {/* Grid pattern overlay */}
                    <div
                      className="absolute inset-0 opacity-[0.04] pointer-events-none"
                      style={{
                        backgroundImage:
                          "repeating-linear-gradient(0deg, transparent, transparent 24px, #fff 24px, #fff 25px), repeating-linear-gradient(90deg, transparent, transparent 24px, #fff 24px, #fff 25px)",
                      }}
                    />

                    {/* Icon — centered with orange glow ring on hover */}
                    <div className="relative z-10 flex flex-col items-center gap-3">
                      <div className="w-16 h-16 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center group-hover:bg-[#FF6B00]/20 group-hover:border-[#FF6B00]/30 transition-all duration-300">
                        <Icon
                          size={32}
                          className="text-white/30 group-hover:text-[#FF6B00] transition-colors duration-300"
                          stroke={1.5}
                        />
                      </div>
                      <span className="text-white/20 text-[10px] font-body uppercase tracking-widest group-hover:text-[#FF6B00]/50 transition-colors duration-300">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                    </div>
                  </div>

                  {/* Card body */}
                  <div className="p-6 flex flex-col flex-1">
                    {/* Orange accent bar */}
                    <div className="w-8 h-0.5 bg-[#FF6B00] mb-4" />

                    <h3 className="font-body font-bold text-lg text-[#0A0A0A] leading-snug mb-2">
                      {card.title}
                    </h3>

                    <p className="text-sm text-[#666] font-body leading-relaxed mt-2 flex-1">
                      {card.desc}
                    </p>
                  </div>
                </div>
              </FadeUp>
            );
          })}
        </div>
      </div>
    </section>
  );
}
