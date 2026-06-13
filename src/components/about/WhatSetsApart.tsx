"use client";

import {
  IconBarbell,
  IconUsers,
  IconCurrencyRupee,
  IconChartLine,
} from "@tabler/icons-react";
import { FadeUp } from "@/components/ui/FadeUp";

const FEATURES = [
  {
    icon: IconBarbell,
    title: "Science-Based Results",
    desc: "Every program is built on proven sports science, not guesswork.",
  },
  {
    icon: IconUsers,
    title: "1-on-1 Dedicated Coaching",
    desc: "Personal attention every session, not generic class routines.",
  },
  {
    icon: IconCurrencyRupee,
    title: "Accessible Pricing",
    desc: "Premium coaching without the premium gym price tag.",
  },
  {
    icon: IconChartLine,
    title: "Integrated Fitness Solution",
    desc: "Training + nutrition + mindset — all covered under one coach.",
  },
];

export default function WhatSetsApart() {
  return (
    <section className="bg-white overflow-hidden">
      {/* ── Part A: White — Coach photo + stats ── */}
      <div className="py-14 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Photo placeholder */}
            <FadeUp className="flex justify-center lg:justify-start">
              <div className="relative">
                {/* Decorative ring */}
                <div className="absolute -inset-3 rounded-3xl border border-[#FF6B00]/20 pointer-events-none" />

                <div className="w-[280px] h-[280px] rounded-2xl mx-auto relative overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/coach.png"
                    alt="Ginieel - Founder (Elite Edge Fitness)"
                    className="w-full h-full object-cover object-top"
                  />
                  <div
                    className="absolute inset-0"
                    style={{ background: "radial-gradient(ellipse at 50% 100%, rgba(255,107,0,0.15) 0%, transparent 70%)" }}
                  />
                </div>

                {/* Floating years badge */}
                <div className="absolute -bottom-5 -right-5 bg-[#FF6B00] text-white px-4 py-3 rounded-xl shadow-lg shadow-[#FF6B00]/30">
                  <p className="font-heading text-3xl leading-none">13+</p>
                  <p className="font-body text-[9px] uppercase tracking-widest font-bold opacity-80 mt-0.5">
                    Years Coaching
                  </p>
                </div>
              </div>
            </FadeUp>

            {/* Coach bio + stats */}
            <FadeUp delay={0.15}>
              <div>
                {/* Eyebrow */}
                <p className="font-body font-bold text-[#FF6B00] text-xs uppercase tracking-[0.3em] mb-4">
                  / GINIEEL - FOUNDER
                </p>

                {/* Description */}
                <p className="font-body text-[#444] text-base leading-relaxed mb-10 max-w-lg">
                  Ginieel - Founder (Elite Edge Fitness) combines competitive bodybuilding experience with precision
                  nutrition science — creating a coaching ecosystem built entirely around you.
                </p>

                {/* Stats row */}
                <div className="flex gap-10 items-center">
                  {/* Stat 1 */}
                  <div className="border-l-4 border-[#FF6B00] pl-4">
                    <p className="font-heading text-[3.5rem] leading-none text-[#0A0A0A]">13+</p>
                    <p className="font-body text-xs text-[#999] uppercase tracking-widest mt-1 font-bold">
                      Years Coaching
                    </p>
                  </div>

                  {/* Divider */}
                  <div className="w-px h-14 bg-[#E8E8E8]" />

                  {/* Stat 2 */}
                  <div className="border-l-4 border-[#0A0A0A] pl-4">
                    <p className="font-heading text-[3.5rem] leading-none text-[#0A0A0A]">500+</p>
                    <p className="font-body text-xs text-[#999] uppercase tracking-widest mt-1 font-bold">
                      Lives Changed
                    </p>
                  </div>
                </div>
              </div>
            </FadeUp>
          </div>
        </div>
      </div>

      {/* ── Part B: Dark rounded section — What Sets Apart ── */}
      <div className="pb-16 md:pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeUp>
            <div className="bg-[#0A0A0A] rounded-2xl px-8 py-14 md:px-14 md:py-16 relative overflow-hidden">
              {/* Background glow */}
              <div
                className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[400px] h-[400px] rounded-full opacity-10 blur-[100px] pointer-events-none"
                style={{
                  background: "radial-gradient(circle, #FF6B00 0%, transparent 70%)",
                }}
              />

              <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
                {/* Left: badge + heading */}
                <div>
                  <span className="inline-block bg-[#FF6B00] text-white text-xs px-4 py-1.5 rounded-full font-body font-bold uppercase tracking-widest mb-6">
                    Join Elite Edge
                  </span>

                  <h2 className="font-heading text-5xl md:text-[3.5rem] text-white leading-[0.95] uppercase">
                    What Sets{" "}
                    <span className="text-[#FF6B00]">Elite Edge</span>{" "}
                    Apart?
                  </h2>

                  {/* Decorative line */}
                  <div className="w-12 h-1 bg-[#FF6B00] mt-6 mb-6" />

                  <p className="font-body text-white/50 text-sm leading-relaxed max-w-xs hidden lg:block">
                    We don&apos;t just train bodies — we build the discipline, knowledge, and
                    systems that create lifelong results.
                  </p>
                </div>

                {/* Right: 2x2 feature cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {FEATURES.map((feature, i) => {
                    const Icon = feature.icon;
                    return (
                      <FadeUp key={feature.title} delay={0.1 + i * 0.08}>
                        <div className="bg-white/5 border border-white/10 p-5 rounded-xl hover:border-[#FF6B00]/40 hover:bg-white/8 transition-all duration-300 group h-full">
                          {/* Icon */}
                          <div className="w-10 h-10 bg-[#FF6B00]/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-[#FF6B00]/20 transition-colors duration-300">
                            <Icon size={20} className="text-[#FF6B00]" stroke={1.8} />
                          </div>

                          {/* Title */}
                          <h3 className="font-body font-bold text-white text-sm mb-1.5 leading-snug">
                            {feature.title}
                          </h3>

                          {/* Desc */}
                          <p className="font-body text-white/50 text-xs leading-relaxed">
                            {feature.desc}
                          </p>
                        </div>
                      </FadeUp>
                    );
                  })}
                </div>
              </div>
            </div>
          </FadeUp>
        </div>
      </div>
    </section>
  );
}
