"use client";

import Link from "next/link";
import {
  IconTarget,
  IconFlame,
  IconUsers,
  IconDeviceLaptop,
  IconSalad,
  IconShieldCheck,
} from "@tabler/icons-react";
import { FadeUp } from "@/components/ui/FadeUp";

const SERVICES = [
  {
    icon: IconTarget,
    title: "Science-Backed Programming",
    desc: "Every plan built on proven periodization and progressive overload methodology.",
  },
  {
    icon: IconFlame,
    title: "Body Transformation",
    desc: "Complete physique overhaul — fat loss, muscle gain, or full recomposition.",
  },
  {
    icon: IconUsers,
    title: "Professional Coaching",
    desc: "Dedicated 1-on-1 attention with daily check-ins and form correction.",
  },
  {
    icon: IconDeviceLaptop,
    title: "Online Integration",
    desc: "Train from anywhere with app-based tracking, video check-ins, and WhatsApp support.",
  },
  {
    icon: IconSalad,
    title: "Nutrition Excellence",
    desc: "Custom macro-calibrated meal plans designed around your food preferences.",
  },
  {
    icon: IconShieldCheck,
    title: "Sustainable Results",
    desc: "We build habits, not just physiques — results that outlast the program.",
  },
];


export default function TransformingSection() {
  return (
    <section className="bg-white py-14 md:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* ── Top 2-col grid ── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center mb-20">
          {/* Left: heading + desc + CTA */}
          <FadeUp>
            <div>
              {/* Eyebrow */}
              <p className="font-body font-bold text-[#FF6B00] text-xs uppercase tracking-[0.3em] mb-5">
                / OUR APPROACH
              </p>

              {/* Heading */}
              <h2 className="font-heading text-[clamp(2.6rem,5vw,5rem)] leading-[0.95] text-[#0A0A0A] uppercase mb-6">
                We Are Transforming
                <br />
                <span className="line-through text-[#999]">Generic</span>{" "}
                <span className="text-[#FF6B00]">Fitness Results</span>
              </h2>

              {/* Divider */}
              <div className="w-14 h-1 bg-[#FF6B00] mb-6" />

              {/* Description */}
              <p className="font-body text-[#555] text-base leading-relaxed max-w-md mb-10">
                We are revolutionizing personal coaching with science-backed methodology, precision
                nutrition, and relentless 1-on-1 support — giving every client a premium
                transformation experience.
              </p>

              {/* CTA */}
              <Link
                href="/plans"
                className="inline-flex items-center bg-[#FF6B00] text-white px-7 py-4 text-xs font-bold uppercase tracking-widest hover:bg-[#E55A00] transition-colors duration-200 shadow-lg shadow-[#FF6B00]/20"
              >
                Know More &#x2192;
              </Link>
            </div>
          </FadeUp>

          {/* Right: 2x2 image grid */}
          <FadeUp delay={0.15}>
            <div className="grid grid-cols-2 gap-3 relative">
              {[
                { src: "/premium/female_personal_training.png", label: "Personal Training" },
                { src: "/premium/female_group_session.png", label: "Group Sessions" },
                { src: "/premium/diet.jpg", label: "Nutrition" },
                { src: "/services/female_contest_prep.png", label: "Contest Prep" },
              ].map(({ src, label }, i) => (
                <div
                  key={i}
                  className="rounded-xl aspect-video relative overflow-hidden group"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={src}
                    alt={label}
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A]/60 to-transparent" />
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-400"
                    style={{ background: "radial-gradient(ellipse at 50% 100%, rgba(255,107,0,0.25), transparent 60%)" }}
                  />
                  <p className="absolute bottom-2 left-3 text-white/70 text-[10px] font-body font-bold uppercase tracking-wider z-10">{label}</p>

                  {/* BEFORE / AFTER badge — only on last card */}
                  {i === 3 && (
                    <div className="absolute bottom-3 right-3 flex overflow-hidden rounded-md text-[10px] font-body font-bold uppercase tracking-widest z-20">
                      <span className="bg-white/90 text-[#0A0A0A] px-2.5 py-1">BEFORE</span>
                      <span className="bg-[#FF6B00] text-white px-2.5 py-1">AFTER</span>
                    </div>
                  )}
                </div>
              ))}

              {/* Decorative orange corner accent */}
              <div className="absolute -bottom-4 -right-4 w-20 h-20 bg-[#FF6B00]/10 rounded-full blur-2xl pointer-events-none" />
            </div>
          </FadeUp>
        </div>

        {/* ── Bottom 3x2 service cards ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {SERVICES.map((service, i) => {
            const Icon = service.icon;
            return (
              <FadeUp key={service.title} delay={i * 0.08}>
                <div className="bg-[#F4F4F4] p-6 rounded-xl hover:bg-white hover:shadow-md transition-all duration-300 group h-full">
                  {/* Icon box */}
                  <div className="w-12 h-12 bg-[#0A0A0A] rounded-xl flex items-center justify-center mb-4 group-hover:bg-[#FF6B00] transition-colors duration-300">
                    <Icon size={22} className="text-white" stroke={1.8} />
                  </div>

                  {/* Title */}
                  <h3 className="font-body font-bold text-[#0A0A0A] text-sm mb-2 leading-snug">
                    {service.title}
                  </h3>

                  {/* Description */}
                  <p className="text-sm text-[#666] font-body leading-relaxed">
                    {service.desc}
                  </p>
                </div>
              </FadeUp>
            );
          })}
        </div>
      </div>
    </section>
  );
}
