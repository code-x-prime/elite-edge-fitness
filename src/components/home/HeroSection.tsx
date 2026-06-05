"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { IconMapPin, IconActivity, IconCpu } from "@tabler/icons-react";

const STATS = [
  { Icon: IconMapPin, value: "13+", label: "Years Experience" },
  { Icon: IconActivity, value: "500+", label: "Transformations" },
  { Icon: IconCpu, value: "20+", label: "Skilled Trainers" },
];

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-[#0A0A0A]">

      {/* ── BACKGROUND ── */}
      {/* Deep dark gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#0A0A0A] via-[#0d0300] to-[#150400]" />

      {/* Orange atmospheric glow — center-right like WTFGyms red glow */}
      <div
        className="absolute right-[15%] top-1/2 -translate-y-1/2 w-[min(700px,140vw)] h-[min(700px,140vw)] rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(255,107,0,0.22) 0%, rgba(255,40,0,0.10) 35%, transparent 70%)",
          filter: "blur(40px)",
        }}
      />
      {/* Secondary smaller glow */}
      <div
        className="absolute right-[30%] bottom-[10%] w-[300px] h-[300px] rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(255,107,0,0.12) 0%, transparent 70%)",
          filter: "blur(60px)",
        }}
      />

      {/* Noise texture */}
      <div
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Athlete image area — right half */}
      <div className="absolute right-0 top-0 bottom-0 w-[55%] pointer-events-none">
        {/* Coach photo — save your image as /public/coach.jpg */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/coach.png"
          alt="Coach Gineel N"
          className="absolute inset-0 w-full h-full object-cover object-top"
        />
        {/* Left fade over image */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#0A0A0A] via-[#0A0A0A]/60 to-transparent" />
        {/* Bottom fade */}
        <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-[#0A0A0A] to-transparent" />
        {/* Top fade */}
        <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-[#0A0A0A]/60 to-transparent" />
      </div>

      {/* ── CONTENT ── */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16 flex items-center min-h-screen">
        <div className="w-full lg:w-[58%]">

          {/* Eyebrow */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.05 }}
            className="flex items-center gap-3 mb-6"
          >
            <div className="h-px w-10 bg-[#FF6B00]" />
            <span className="text-[#FF6B00] text-xs font-body font-bold uppercase tracking-[0.3em]">
              India&apos;s Premier Fitness Coach
            </span>
          </motion.div>

          {/* MAIN HEADING — WTFGyms scale */}
          <div className="overflow-hidden mb-2">
            <motion.h1
              initial={{ y: 120, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="font-heading text-[clamp(4.5rem,10vw,8rem)] leading-[0.88] text-white uppercase"
            >
              STOP GUESSING.
            </motion.h1>
          </div>

          <div className="overflow-hidden mb-6">
            <motion.h1
              initial={{ y: 120, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.18, ease: [0.16, 1, 0.3, 1] }}
              className="font-heading text-[clamp(4.5rem,10vw,8rem)] leading-[0.88] uppercase"
            >
              START{" "}
              <span
                className="text-[#FF6B00]"
                style={{ textShadow: "0 0 60px rgba(255,107,0,0.5), 0 0 120px rgba(255,107,0,0.2)" }}
              >
                WINNING.
              </span>
            </motion.h1>
          </div>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.32 }}
            className="text-white/55 font-body text-base md:text-lg leading-relaxed max-w-lg mb-10"
          >
            Your complete fitness transformation with Elite Edge Fitness — science-backed training,
            precision nutrition, and relentless 1-on-1 coaching by Gineel N.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.42 }}
            className="flex flex-wrap items-center gap-4 mb-8"
          >
            <Link
              href="/plans"
              className="inline-flex items-center gap-3 bg-[#FF6B00] text-white font-body font-black text-sm uppercase tracking-widest px-8 py-4 hover:bg-[#E55A00] transition-all duration-200 shadow-lg"
              style={{ boxShadow: "0 8px 32px rgba(255,107,0,0.35)" }}
            >
              START YOUR EVOLUTION &#x2192;
            </Link>
            <Link
              href="/about"
              className="inline-flex items-center gap-2 text-white/60 font-body font-bold text-sm uppercase tracking-widest hover:text-white transition-colors border-b border-white/20 hover:border-white pb-0.5"
            >
              Meet the Coach
            </Link>
          </motion.div>

          {/* Trust line */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.55 }}
            className="text-white/30 text-xs font-body"
          >
            13+ Years Experience &nbsp;&bull;&nbsp; 500+ Happy Clients &nbsp;&bull;&nbsp; 100% Results Driven
          </motion.p>
        </div>

        {/* Stats panel — glassmorphism right edge (WTFGyms style) */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="hidden lg:flex flex-col gap-3 absolute right-6 top-1/2 -translate-y-1/2"
        >
          {STATS.map(({ Icon, value, label }, i) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: 0.6 + i * 0.1 }}
              className="w-[156px] px-5 py-5 flex flex-col gap-3 border border-white/10 hover:border-[#FF6B00]/40 transition-colors duration-300"
              style={{
                background: "rgba(255,255,255,0.04)",
                backdropFilter: "blur(12px)",
              }}
            >
              {/* Icon circle */}
              <div className="w-9 h-9 border border-white/15 flex items-center justify-center">
                <Icon size={18} className="text-white/60" stroke={1.5} />
              </div>
              <div>
                <p
                  className="font-heading text-4xl text-white leading-none"
                  style={{ textShadow: "0 0 20px rgba(255,107,0,0.3)" }}
                >
                  {value}
                </p>
                <p className="text-white/40 text-[10px] font-body font-bold uppercase tracking-[0.2em] mt-1">
                  {label}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Bottom orange line */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#FF6B00]/40 to-transparent z-20" />
    </section>
  );
}
