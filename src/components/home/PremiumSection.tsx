"use client";

import { FadeUp } from "@/components/ui/FadeUp";
import Link from "next/link";
import {
  IconBarbell,
  IconChartLine,
  IconSalad,
  IconMedal,
  IconDeviceLaptop,
} from "@tabler/icons-react";

function ImgCard({
  src,
  label,
  sub,
  className = "",
}: {
  src: string;
  label: string;
  sub?: string;
  className?: string;
}) {
  return (
    <div className={`h-full relative overflow-hidden group hover:-translate-y-1 transition-transform duration-300 ${className}`}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt={label}
        className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A]/80 via-[#0A0A0A]/20 to-transparent" />
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{ background: "radial-gradient(ellipse at 50% 100%, rgba(255,107,0,0.25), transparent 60%)" }}
      />
      <div className="absolute bottom-0 left-0 right-0 p-5 z-10">
        <p className="text-white font-heading text-lg uppercase">{label}</p>
        {sub && <p className="text-white/50 text-xs font-body mt-0.5">{sub}</p>}
        <div className="h-0.5 w-8 bg-[#FF6B00] mt-1.5" />
      </div>
    </div>
  );
}

export default function PremiumSection() {
  return (
    <section className="py-14 md:py-16 bg-[#F4F4F4]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <FadeUp>
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-12">
            <div>
              <p className="text-[#FF6B00] text-xs font-body font-bold uppercase tracking-[0.3em] mb-3">
                / PREMIUM EXPERIENCE
              </p>
              <h2 className="font-heading text-5xl md:text-6xl text-[#0A0A0A] leading-tight uppercase">
                Unparalleled Access<br />
                Elite Edge Fitness
              </h2>
            </div>
            <div className="lg:max-w-sm">
              <p className="text-[#666] font-body text-sm leading-relaxed mb-5">
                Access our premium training methodology, cutting-edge programming, and supportive community — all crafted to elevate your fitness journey with unmatched support and results.
              </p>
              <Link
                href="/plans"
                className="inline-flex items-center gap-2 bg-[#FF6B00] text-white text-xs font-bold uppercase tracking-widest px-6 py-3 hover:bg-[#E55A00] transition-colors duration-200"
              >
                VIEW PLANS &#x2192;
              </Link>
            </div>
          </div>
        </FadeUp>

        {/* Bento grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 auto-rows-[240px] sm:auto-rows-[280px]">

          {/* Card 1 — Transformation photo tall */}
          <FadeUp delay={0.05} className="row-span-2">
            <div className="h-full relative overflow-hidden group hover:-translate-y-1 transition-transform duration-300">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/premium/transformation.jpg"
                alt="Body Transformation"
                className="absolute inset-0 w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-[#0A0A0A]/30 to-transparent" />
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{ background: "radial-gradient(ellipse at 50% 80%, rgba(255,107,0,0.3), transparent 60%)" }}
              />

              {/* Top icon */}
              <div className="absolute top-6 left-6 z-10">
                <div className="w-11 h-11 bg-[#FF6B00]/20 border border-[#FF6B00]/40 backdrop-blur-sm flex items-center justify-center">
                  <IconBarbell size={20} className="text-[#FF6B00]" stroke={1.5} />
                </div>
                <p className="text-[#FF6B00] text-xs font-body font-bold uppercase tracking-widest mt-3">Core Offering</p>
              </div>

              {/* Bottom text */}
              <div className="absolute bottom-0 left-0 right-0 p-6 z-10">
                <h3 className="font-heading text-4xl text-white leading-tight uppercase">
                  Body<br />Transformation
                </h3>
                <p className="text-white/60 text-sm font-body leading-relaxed mt-3 mb-4">
                  Science-backed, periodized programs that rebuild your physique from the ground up.
                </p>
                <Link
                  href="/plans"
                  className="inline-flex items-center gap-2 text-[#FF6B00] text-xs font-bold uppercase tracking-widest border-b border-[#FF6B00]/40 pb-0.5 hover:border-[#FF6B00] transition-colors"
                >
                  Get Started &#x2192;
                </Link>
              </div>
            </div>
          </FadeUp>

          {/* Card 2 — Diet photo */}
          <FadeUp delay={0.1}>
            <ImgCard src="/premium/diet.jpg" label="Custom Diet Design" sub="Precision Nutrition" />
          </FadeUp>

          {/* Card 3 — Gym photo */}
          <FadeUp delay={0.15}>
            <ImgCard src="/premium/gym.jpg" label="State-of-the-Art Facility" sub="Kothrud, Pune" />
          </FadeUp>

          {/* Card 4 — Training collage wide */}
          <FadeUp delay={0.2} className="sm:col-span-2 lg:col-span-2">
            <div className="h-full relative overflow-hidden group hover:-translate-y-1 transition-transform duration-300">
              <div className="h-full grid grid-cols-3 gap-1">
                {[
                  { src: "/premium/training-1.jpg", label: "Personal Training" },
                  { src: "/premium/training-2.jpg", label: "Group Sessions" },
                  { src: "/premium/training-3.jpg", label: "Transformation" },
                ].map((item, i) => (
                  <div key={i} className="relative overflow-hidden">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={item.src}
                      alt={item.label}
                      className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A]/70 to-transparent" />
                    <p className="absolute bottom-3 left-3 right-3 text-white/70 text-xs font-body uppercase tracking-wider z-10">
                      {item.label}
                    </p>
                  </div>
                ))}
              </div>
              <div className="absolute top-4 left-4 bg-[#FF6B00] px-3 py-1 z-10">
                <p className="text-white text-xs font-body font-bold uppercase tracking-widest">Real Results</p>
              </div>
            </div>
          </FadeUp>

          {/* Card 5 — Online coaching photo */}
          <FadeUp delay={0.1}>
            <ImgCard src="/premium/online.jpg" label="Online Coaching" sub="Train Anywhere" />
          </FadeUp>

          {/* Card 6 — Contest prep photo */}
          <FadeUp delay={0.15}>
            <ImgCard src="/premium/contest.jpg" label="Contest Prep" sub="Stage-Ready Conditioning" />
          </FadeUp>

          {/* Card 7 — Progress tracking (text card) */}
          <FadeUp delay={0.2}>
            <div className="h-full bg-[#0A0A0A] p-7 flex flex-col justify-between relative overflow-hidden group hover:-translate-y-1 transition-transform duration-300">
              <div
                className="absolute inset-0 opacity-5 pointer-events-none"
                style={{ backgroundImage: `radial-gradient(circle at 1px 1px, #FF6B00 1px, transparent 0)`, backgroundSize: "28px 28px" }}
              />
              <div className="relative z-10">
                <div className="w-11 h-11 bg-[#FF6B00] flex items-center justify-center mb-5">
                  <IconChartLine size={20} className="text-white" stroke={1.5} />
                </div>
                <p className="text-[#FF6B00] text-xs font-body font-bold uppercase tracking-widest mb-2">Progress</p>
                <h3 className="font-heading text-2xl text-white leading-tight uppercase">Body Composition Analysis</h3>
              </div>
              <p className="text-white/40 text-sm font-body leading-relaxed relative z-10">
                Regular body composition checks to track muscle gain, fat loss, and keep your transformation on point.
              </p>
            </div>
          </FadeUp>

          {/* Card 8 — Online coaching text card */}
          <FadeUp delay={0.2}>
            <div className="h-full bg-white p-7 flex flex-col justify-between relative overflow-hidden group hover:-translate-y-1 transition-transform duration-300 border border-[#E8E8E8] hover:border-[#FF6B00]/30">
              <div className="relative z-10">
                <div className="w-11 h-11 bg-[#FF6B00] flex items-center justify-center mb-5">
                  <IconDeviceLaptop size={20} className="text-white" stroke={1.5} />
                </div>
                <p className="text-[#FF6B00] text-xs font-body font-bold uppercase tracking-widest mb-2">Remote</p>
                <h3 className="font-heading text-2xl text-[#0A0A0A] leading-tight uppercase">Expert Guidance &amp; Online Coaching</h3>
              </div>
              <p className="text-[#666] text-sm font-body leading-relaxed relative z-10">
                Train from anywhere. Video check-ins, form corrections, and 24/7 WhatsApp support from Coach Gineel.
              </p>
            </div>
          </FadeUp>

          {/* Card 9 — Contest text card */}
          <FadeUp delay={0.2}>
            <div className="h-full bg-white p-7 flex flex-col justify-between relative overflow-hidden group hover:-translate-y-1 transition-transform duration-300 border border-[#E8E8E8] hover:border-[#FF6B00]/30">
              <div className="relative z-10">
                <div className="w-11 h-11 bg-[#FF6B00]/15 border border-[#FF6B00]/30 flex items-center justify-center mb-5">
                  <IconMedal size={20} className="text-[#FF6B00]" stroke={1.5} />
                </div>
                <p className="text-[#FF6B00] text-xs font-body font-bold uppercase tracking-widest mb-2">Competition</p>
                <h3 className="font-heading text-2xl text-[#0A0A0A] leading-tight uppercase">Contest Prep &amp; Stage Presence</h3>
              </div>
              <p className="text-[#666] text-sm font-body leading-relaxed relative z-10">
                Peak conditioning, posing coaching, and backstage strategy for competition day success.
              </p>
            </div>
          </FadeUp>

          {/* Card 10 — Nutrition text */}
          <FadeUp delay={0.2}>
            <div className="h-full bg-[#0A0A0A] p-7 flex flex-col justify-between relative overflow-hidden group hover:-translate-y-1 transition-transform duration-300">
              <div className="relative z-10">
                <div className="w-11 h-11 bg-[#FF6B00] flex items-center justify-center mb-5">
                  <IconSalad size={20} className="text-white" stroke={1.5} />
                </div>
                <p className="text-[#FF6B00] text-xs font-body font-bold uppercase tracking-widest mb-2">Nutrition</p>
                <h3 className="font-heading text-2xl text-white leading-tight uppercase">Custom Diet Designing</h3>
              </div>
              <p className="text-white/40 text-sm font-body leading-relaxed relative z-10">
                Precision meal plans calibrated to your macros, food preferences, and training intensity.
              </p>
            </div>
          </FadeUp>

        </div>
      </div>
    </section>
  );
}
