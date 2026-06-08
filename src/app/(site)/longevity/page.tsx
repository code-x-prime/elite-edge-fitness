"use client";

import { IconActivity, IconShieldCheck, IconHeart, IconRotateDot, IconArrowRight, IconChecks } from "@tabler/icons-react";
import Link from "next/link";

const PILLARS = [
  {
    Icon: IconShieldCheck,
    title: "Joint Integrity & Prehab",
    desc: "Strengthen tendons, ligaments, and cartilage through specific loaded mobility and decompression protocols to prevent injuries."
  },
  {
    Icon: IconRotateDot,
    title: "Dynamic Mobility Flow",
    desc: "Restore native range of motion in the hips, shoulders, and spine. Master movement patterns that keep you fluid and pain-free."
  },
  {
    Icon: IconActivity,
    title: "Calisthenics Conditioning",
    desc: "Master bodyweight control. Progress from basic holds to advanced calisthenics (splits, handstands, levers) sustainably."
  },
  {
    Icon: IconHeart,
    title: "Cardiovascular Vitality",
    desc: "Optimize mitochondrial health and aerobic capacity (Zone 2) to increase physical performance and longevity."
  }
];

export default function LongevityPage() {
  return (
    <div className="bg-[#0A0A0A] text-white min-h-screen pt-20">
      
      {/* ── HERO SECTION ── */}
      <section className="relative overflow-hidden py-20 md:py-28 border-b border-white/5">
        <div className="absolute inset-0 bg-gradient-to-r from-[#0A0A0A] via-[#0d0300] to-[#150400]" />
        
        {/* Glow */}
        <div
          className="absolute right-[10%] top-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full pointer-events-none opacity-20"
          style={{
            background: "radial-gradient(circle, rgba(255,107,0,0.4) 0%, transparent 70%)",
            filter: "blur(60px)",
          }}
        />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row items-center gap-12">
          <div className="w-full lg:w-1/2">
            <div className="flex items-center gap-3 mb-6">
              <div className="h-px w-10 bg-[#FF6B00]" />
              <span className="text-[#FF6B00] text-xs font-body font-bold uppercase tracking-[0.3em]">
                Active Aging &amp; Joint Health
              </span>
            </div>
            <h1 className="font-heading text-5xl md:text-7xl leading-tight uppercase mb-6">
              Train For <br />
              <span className="text-[#FF6B00]" style={{ textShadow: "0 0 40px rgba(255,107,0,0.3)" }}>
                LONGEVITY.
              </span>
            </h1>
            <p className="text-white/60 font-body text-base md:text-lg leading-relaxed mb-8 max-w-xl">
              Don&apos;t just build muscles — build a body that lasts. Our Longevity Program integrates calisthenics, flexibility, joint prehab, and recovery protocols under the direct supervision of Coach Gineel N.
            </p>
            <div className="flex flex-wrap items-center gap-4">
              <a
                href="#pricing"
                className="inline-flex items-center gap-3 bg-[#FF6B00] text-white font-body font-black text-xs uppercase tracking-widest px-8 py-4 hover:bg-[#E55A00] transition-colors"
              >
                JOIN THE PROGRAM &rarr;
              </a>
              <Link
                href="/about"
                className="text-white/60 font-body font-bold text-xs uppercase tracking-widest hover:text-white transition-colors border-b border-white/20 pb-0.5"
              >
                Meet Coach Gineel
              </Link>
            </div>
          </div>
          <div className="w-full lg:w-1/2 relative">
            <div className="border border-white/10 p-2 bg-[#111111]/80 backdrop-blur-sm rounded-lg shadow-2xl overflow-hidden aspect-[4/3] md:aspect-[16/10]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/split-flag.jpg"
                alt="Coach Gineel split under flag"
                className="w-full h-full object-cover object-center"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── CORE PILLARS ── */}
      <section className="py-16 md:py-24 bg-[#111111]/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <p className="text-[#FF6B00] text-xs font-body font-bold uppercase tracking-[0.3em] mb-3">
              / The Foundation
            </p>
            <h2 className="font-heading text-4xl md:text-5xl uppercase leading-none">
              Pillars Of <span className="text-[#FF6B00]">Longevity</span>
            </h2>
            <div className="h-1 w-16 bg-[#FF6B00] mx-auto mt-4 mb-6" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {PILLARS.map((p, i) => (
              <div
                key={i}
                className="bg-[#111111] border border-white/5 p-6 hover:border-[#FF6B00]/40 transition-colors group flex flex-col justify-between"
              >
                <div>
                  <div className="w-12 h-12 bg-[#FF6B00]/10 border border-[#FF6B00]/30 flex items-center justify-center mb-6 group-hover:bg-[#FF6B00] transition-colors">
                    <p.Icon size={20} className="text-[#FF6B00] group-hover:text-white transition-colors" stroke={1.5} />
                  </div>
                  <h3 className="font-heading text-xl uppercase mb-3 text-white">{p.title}</h3>
                  <p className="text-white/50 text-xs font-body leading-relaxed">{p.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── INTERACTIVE PHOTO HIGHLIGHT ── */}
      <section className="py-16 md:py-24 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row items-center gap-12">
          <div className="w-full lg:w-1/2">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/pushup-pose.jpg"
              alt="Coach Gineel pushup pose"
              className="w-full h-auto object-cover border border-white/10 rounded"
            />
          </div>
          <div className="w-full lg:w-1/2">
            <p className="text-[#FF6B00] text-xs font-body font-bold uppercase tracking-[0.3em] mb-3">
              / Calisthenics &amp; Mobility
            </p>
            <h2 className="font-heading text-3xl md:text-5xl uppercase leading-none mb-6">
              Master Your <br />
              <span className="text-[#FF6B00]">Own Body Weight</span>
            </h2>
            <p className="text-white/60 font-body text-sm leading-relaxed mb-6">
              True strength isn&apos;t measured just in iron weight. Moving your body through full ranges of motion with absolute control represents the pinnacle of physical fitness. Our training helps you decompress joints, build lean athletic tissue, and maintain absolute mobility.
            </p>
            <ul className="space-y-3 mb-6">
              {["Spine decompression & alignment", "Hip & shoulder mobility restoration", "Connective tissue thickening protocols", "Core stabilization & calisthenics holds"].map((item, index) => (
                <li key={index} className="flex items-center gap-3 text-sm font-body text-white/80">
                  <IconChecks size={18} className="text-[#FF6B00] flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ── PRICING SECTION ── */}
      <section id="pricing" className="py-16 md:py-24 bg-[#111111]/50 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <p className="text-[#FF6B00] text-xs font-body font-bold uppercase tracking-[0.3em] mb-3">
              / Pricing &amp; Enrollment
            </p>
            <h2 className="font-heading text-4xl md:text-5xl uppercase leading-none">
              Longevity <span className="text-[#FF6B00]">Coaching Plans</span>
            </h2>
            <div className="h-1 w-16 bg-[#FF6B00] mx-auto mt-4 mb-6" />
          </div>

          <div className="max-w-xl mx-auto bg-[#111111] border-2 border-[#FF6B00] p-8 md:p-10 shadow-2xl relative">
            <div className="absolute top-0 right-0 bg-[#FF6B00] text-white text-[10px] font-body font-black uppercase tracking-widest px-4 py-1">
              Premium Program
            </div>
            
            <p className="text-[#FF6B00] text-xs font-body font-bold uppercase tracking-wider mb-2">Coaching Package</p>
            <h3 className="font-heading text-3xl uppercase text-white mb-4">Longevity &amp; Joint Health</h3>
            
            <div className="flex items-baseline gap-2 mb-6">
              <span className="font-heading text-5xl text-[#FF6B00]">₹4,999</span>
              <span className="text-white/40 text-sm font-body">/ Month</span>
            </div>

            <p className="text-white/60 text-xs font-body leading-relaxed mb-6 border-b border-white/10 pb-6">
              A specialized 1-on-1 personal conditioning and recovery plan focused entirely on structural balance, mobility flow, and injury resilience.
            </p>

            <ul className="space-y-4 mb-8">
              {[
                "Personalized loaded-mobility training program",
                "Custom anti-inflammatory nutrition plan",
                "Direct 1-on-1 form correction reviews",
                "Weekly check-ins and recovery coaching",
                "Unlimited direct WhatsApp support with Coach Gineel N"
              ].map((f, i) => (
                <li key={i} className="flex items-start gap-3 text-sm font-body text-white/80">
                  <IconChecks size={18} className="text-[#FF6B00] flex-shrink-0 mt-0.5" />
                  {f}
                </li>
              ))}
            </ul>

            <Link
              href="/payments"
              className="flex items-center justify-center gap-3 w-full py-4 bg-[#FF6B00] text-white text-xs font-bold uppercase tracking-widest hover:bg-[#E55A00] transition-colors font-body"
            >
              Get Started Now <IconArrowRight size={16} />
            </Link>

            <p className="mt-4 text-[10px] text-center text-white/30 font-body">
              All plans are subject to our strict No Refund Policy.
            </p>
          </div>
        </div>
      </section>

    </div>
  );
}
