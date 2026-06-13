import TransformingSection from "@/components/about/TransformingSection";
import WhatSetsApart from "@/components/about/WhatSetsApart";
import InvestedSection from "@/components/about/InvestedSection";
import { FadeUp } from "@/components/ui/FadeUp";
import { Button } from "@/components/ui/button";
import { IconCheck } from "@tabler/icons-react";

const ACHIEVEMENTS = [
  "ISSA Certified Personal Trainer",
  "Sports Nutrition Specialist",
  "13+ Years Industry Experience",
  "500+ Clients Transformed",
  "Multiple State Level Championship Competitor",
  "Certified Physique Coach",
];

const SPECIALIZATIONS = [
  "Diet Designing", "Model Grooming", "Body Transformation", "Weight Loss", "Online Training",
  "Six Pack Plans", "Body Building", "Endurance Workouts", "Customized Diet Plans", "Core Training",
];

export default function AboutPage() {
  return (
    <div className="pt-16 md:pt-20">

      {/* Hero — Coach intro */}
      <section className="py-14 md:py-16 bg-[#F4F4F4]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <FadeUp>
              <p className="text-[#FF6B00] text-xs font-body font-bold uppercase tracking-[0.3em] mb-4">/ Your Coach</p>
              <h1 className="font-heading text-6xl md:text-8xl text-[#0A0A0A] leading-none uppercase">GINIEEL</h1>
              <p className="text-[#FF6B00] text-sm font-body font-bold uppercase tracking-[0.2em] mt-2 mb-4">Founder (Elite Edge Fitness)</p>
              <div className="h-1 w-20 bg-[#FF6B00] mb-6" />
              <h2 className="font-heading text-3xl uppercase text-[#0A0A0A] mb-6">
                Elite Edge <span className="text-[#FF6B00]">Fitness</span>
              </h2>
              <p className="text-[#666] font-body leading-relaxed mb-10 max-w-md">
                A passionate fitness coach with over 13 years of experience transforming lives through disciplined training, precision nutrition, and relentless motivation.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button href="/plans">Get Coached &#x2192;</Button>
                <Button href="/contact" variant="outline">Get in Touch</Button>
              </div>
              <div className="mt-10 flex flex-wrap gap-8">
                {[["13+", "Years"], ["500+", "Clients"], ["100%", "Results"]].map(([num, lbl]) => (
                  <div key={lbl}>
                    <p className="font-heading text-3xl text-[#FF6B00] leading-none">{num}</p>
                    <p className="text-xs text-[#666] font-body uppercase tracking-widest mt-1">{lbl}</p>
                  </div>
                ))}
              </div>
            </FadeUp>

            <FadeUp delay={0.2}>
              <div className="relative">
                <div className="aspect-[4/5] bg-[#1A1A1A] rounded-2xl overflow-hidden relative">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/profile.jpeg"
                    alt="Ginieel - Founder (Elite Edge Fitness)"
                    className="w-full h-full object-cover object-top"
                  />
                  {/* Subtle bottom gradient overlay */}
                  <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#0A0A0A]/60 to-transparent" />
                  {/* Orange glow */}
                  <div
                    className="absolute bottom-0 left-0 right-0 h-40 opacity-30 pointer-events-none"
                    style={{ background: "radial-gradient(ellipse at 50% 100%, #FF6B00, transparent)" }}
                  />
                </div>
                <div className="absolute -bottom-5 -right-5 bg-[#FF6B00] p-5 shadow-xl rounded-xl">
                  <p className="font-heading text-4xl text-white leading-none">500+</p>
                  <p className="text-white/70 text-xs font-body uppercase tracking-widest mt-1">Lives Changed</p>
                </div>
              </div>
            </FadeUp>
          </div>
        </div>
      </section>

      {/* Transforming section */}
      <TransformingSection />

      {/* What sets apart */}
      <WhatSetsApart />

      {/* Invested in members */}
      <InvestedSection />

      {/* Story + Credentials */}
      <section className="py-14 md:py-16 bg-[#0A0A0A] relative overflow-hidden">
        <div className="absolute top-1/2 right-0 -translate-y-1/2 w-[500px] h-[500px] rounded-full opacity-[0.07] blur-[120px] pointer-events-none"
          style={{ background: "radial-gradient(circle, #FF6B00, transparent)" }} />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <FadeUp>
              <p className="text-[#FF6B00] text-xs font-body font-bold uppercase tracking-[0.3em] mb-4">/ The Journey</p>
              <h2 className="font-heading text-5xl md:text-6xl text-white leading-none uppercase mb-6">MY STORY</h2>
              <div className="h-1 w-16 bg-[#FF6B00] mb-10" />
              <div className="space-y-5 text-white/55 font-body text-sm leading-relaxed">
                <p>Growing up, fitness was more than a hobby — it was a calling. From early morning training sessions to late-night nutrition research, the pursuit of physical excellence became my life&apos;s work.</p>
                <p>After competing at state level in bodybuilding and achieving certifications in personal training and sports nutrition, I founded Elite Edge Fitness with one mission: to give every client the knowledge, tools, and motivation to transform their body and mindset.</p>
                <p>Over 13 years, I&apos;ve worked with everyone from complete beginners to competitive athletes. Every transformation starts with the belief that you are capable of more than you currently think.</p>
                <blockquote className="border-l-4 border-[#FF6B00] pl-5 py-1 text-white font-body italic">
                  &ldquo;You are more than what you think. My job is to prove it to you.&rdquo;
                </blockquote>
              </div>
            </FadeUp>
            <FadeUp delay={0.2}>
              <p className="text-[#FF6B00] text-xs font-body font-bold uppercase tracking-[0.3em] mb-6">Credentials &amp; Achievements</p>
              <ul className="space-y-3">
                {ACHIEVEMENTS.map((item, i) => (
                  <li key={i} className="flex items-center gap-4 bg-white/5 border border-white/[0.08] px-5 py-4 hover:border-[#FF6B00]/40 transition-colors">
                    <div className="w-8 h-8 bg-[#FF6B00] flex items-center justify-center font-heading text-white text-sm flex-shrink-0">{i + 1}</div>
                    <span className="font-body font-semibold text-white/70 text-sm uppercase tracking-wide">{item}</span>
                  </li>
                ))}
              </ul>
            </FadeUp>
          </div>
        </div>
      </section>

      {/* Specializations */}
      <section className="py-14 md:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeUp>
            <div className="text-center mb-14">
              <p className="text-[#FF6B00] text-xs font-body font-bold uppercase tracking-[0.3em] mb-3">/ Expertise</p>
              <h2 className="font-heading text-5xl md:text-6xl text-[#0A0A0A] leading-none uppercase">Specializations</h2>
            </div>
          </FadeUp>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-0 border-l border-t border-[#E8E8E8]">
            {SPECIALIZATIONS.map((item, i) => (
              <FadeUp key={item} delay={i * 0.05}>
                <div className="flex items-start gap-3 p-6 border-r border-b border-[#E8E8E8] hover:bg-[#FFF8F4] hover:border-[#FF6B00]/40 transition-all duration-200 group">
                  <IconCheck size={16} className="text-[#FF6B00] flex-shrink-0 mt-0.5" stroke={2.5} />
                  <p className="font-body text-sm font-semibold text-[#0A0A0A] uppercase tracking-wide group-hover:text-[#FF6B00] transition-colors">{item}</p>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-[#FF6B00]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <FadeUp>
            <p className="text-white/70 font-body text-xs font-bold uppercase tracking-[0.3em] mb-4">/ Ready to Transform?</p>
            <h2 className="font-heading text-5xl md:text-7xl text-white leading-none uppercase mb-10">
              START YOUR<br />JOURNEY TODAY
            </h2>
            <div className="flex flex-wrap justify-center gap-4">
              <Button href="/plans" className="bg-[#0A0A0A] text-white hover:bg-white hover:text-[#0A0A0A]">
                View Training Plans &#x2192;
              </Button>
              <Button href="/contact" className="border-2 border-white bg-transparent text-white hover:bg-white hover:text-[#FF6B00]">
                Contact Me
              </Button>
            </div>
          </FadeUp>
        </div>
      </section>

    </div>
  );
}
