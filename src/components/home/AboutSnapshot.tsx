"use client";

import Link from "next/link";
import { FadeUp } from "@/components/ui/FadeUp";
import {
  IconBarbell,
  IconUsers,
  IconSalad,
  IconTrophy,
} from "@tabler/icons-react";

const GRID_ITEMS = [
  {
    Icon: IconBarbell,
    label: "Personal Training",
    img: "/services/female_personal_training.png",
    bg: "bg-[#1A1A1A]",
    accent: "text-[#FF6B00]",
    textColor: "text-white",
    pos: "object-top",
  },
  {
    Icon: IconUsers,
    label: "Group Sessions",
    img: "/services/female_group_session.png",
    bg: "bg-[#FF6B00]",
    accent: "text-white",
    textColor: "text-white",
    pos: "object-center",
  },
  {
    Icon: IconSalad,
    label: "Diet & Nutrition",
    img: "/services/nutrition.png",
    bg: "bg-[#1A1A1A]",
    accent: "text-[#FF6B00]",
    textColor: "text-white",
    pos: "object-center",
  },
  {
    Icon: IconTrophy,
    label: "Contest Prep",
    img: "/services/female_contest_prep.png",
    bg: "bg-[#0A0A0A]",
    accent: "text-[#FF6B00]",
    textColor: "text-white",
    pos: "object-top",
  },
];

const RADIUS: Record<number, string> = {
  0: "rounded-tl-2xl",
  1: "rounded-tr-2xl",
  2: "rounded-bl-2xl",
  3: "rounded-br-2xl",
};

export default function AboutSnapshot() {
  return (
    <section className="py-14 md:py-16 bg-[#F4F4F4]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">

          {/* Left */}
          <FadeUp>
            <h2 className="font-heading text-5xl md:text-6xl lg:text-7xl text-[#0A0A0A] leading-tight uppercase">
              Elite Coaching For<br />
              <span className="text-[#FF6B00]">Men &amp; Women</span><br />
              In Pune
            </h2>

            <p className="text-[#666] font-body text-base leading-relaxed mt-8 mb-10 max-w-md">
              Ginieel - Founder (Elite Edge Fitness) combines 13+ years of competitive experience with precision nutrition science to deliver transformations that last a lifetime. Tailored training and diet design for all goals, fitness levels, and genders.
            </p>

            <div className="flex flex-wrap gap-4">
              <Link
                href="/about"
                className="inline-flex items-center gap-2 bg-[#0A0A0A] text-white text-xs font-bold uppercase tracking-widest px-7 py-4 hover:bg-[#FF6B00] transition-all duration-200"
              >
                Ginieel - Founder &#x2192;
              </Link>
              <Link
                href="/plans"
                className="inline-flex items-center gap-2 border border-[#0A0A0A] text-[#0A0A0A] text-xs font-bold uppercase tracking-widest px-7 py-4 hover:bg-[#0A0A0A] hover:text-white transition-all duration-200"
              >
                View Plans
              </Link>
            </div>

            <div className="mt-10 flex flex-wrap gap-6">
              {[
                { num: "13+", label: "Years Experience" },
                { num: "500+", label: "Clients Transformed" },
                { num: "100%", label: "Results Driven" },
              ].map(({ num, label }) => (
                <div key={label}>
                  <p className="font-heading text-3xl text-[#FF6B00] leading-none">{num}</p>
                  <p className="text-xs text-[#666] font-body uppercase tracking-widest mt-1">{label}</p>
                </div>
              ))}
            </div>
          </FadeUp>

          {/* Right — 2x2 grid with photo support */}
          <FadeUp delay={0.2}>
            <div className="grid grid-cols-2 gap-3">
              {GRID_ITEMS.map(({ Icon, label, img, bg, accent, textColor, pos }, i) => (
                <div
                  key={label}
                  className={`relative aspect-square overflow-hidden group hover:scale-[1.02] transition-transform duration-300 ${RADIUS[i]}`}
                >
                  {/* Base color bg — always visible as fallback */}
                  <div className={`absolute inset-0 ${bg} flex flex-col items-center justify-center gap-4`}>
                    <div
                      className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                      style={{ background: "radial-gradient(circle at 50% 50%, rgba(255,107,0,0.25) 0%, transparent 70%)" }}
                    />
                    <Icon size={48} className={`${accent} relative z-10 group-hover:scale-110 transition-transform duration-300`} stroke={1.2} />
                    <p className={`font-heading text-lg uppercase tracking-wide relative z-10 ${textColor}`}>{label}</p>
                  </div>

                  {/* Photo on top — covers fallback when loaded */}
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={img}
                    alt={label}
                    className={`absolute inset-0 w-full h-full object-cover z-10 group-hover:scale-105 transition-transform duration-500 ${pos}`}
                    onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = "none"; }}
                  />

                  {/* Dark overlay on photo */}
                  <div className="absolute inset-0 z-20 bg-gradient-to-t from-[#0A0A0A]/70 via-[#0A0A0A]/20 to-transparent" />

                  {/* Orange glow on photo hover */}
                  <div
                    className="absolute inset-0 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                    style={{ background: "radial-gradient(circle at 50% 80%, rgba(255,107,0,0.3) 0%, transparent 60%)" }}
                  />

                  {/* Label over photo */}
                  <div className="absolute bottom-0 left-0 right-0 p-5 z-30">
                    <p className="font-heading text-xl uppercase text-white tracking-wide">{label}</p>
                    <div className="h-0.5 w-8 bg-[#FF6B00] mt-1.5" />
                  </div>
                </div>
              ))}
            </div>
          </FadeUp>

        </div>
      </div>
    </section>
  );
}
