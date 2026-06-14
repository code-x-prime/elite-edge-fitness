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
                <p>There was a time when I was just an ordinary kid trying to find his place in the world.</p>
                <p>Academics never came easy to me. Confidence was something I lacked, and loneliness often became my silent companion. I struggled with my studies, my fitness, my personality, and at times, even with myself. There were moments of tears, self-doubt, and endless questions about what life had in store for me.</p>
                <p>Looking back, I can honestly say that empty pockets taught me lessons that full pockets never could. Adversity became my greatest teacher, and pain quietly shaped the man I was destined to become.</p>
                <p>After completing my graduation and post-graduation, I landed what many considered a dream job at HSBC Bank. To the outside world, I had made it. Everyone believed my life was finally sorted. I had the respectable title, the white-collar career, and the security that society celebrates.</p>
                <p>But deep down, something was dying.</p>
                <p>Every morning felt like I was showing up for a life that belonged to someone else. I was earning a paycheck, but losing pieces of my soul. I realized that surviving and truly living are two very different things.</p>
                <p>Through all those years, fitness remained the one passion that never left me. It wasn&apos;t just about building muscles—it was about building myself. Yet, in India, pursuing fitness as a profession was often met with skepticism. People laughed. Many questioned my dreams. Some called it foolish. Others simply couldn&apos;t understand.</p>
                <p>But life has a beautiful way of placing angels in your journey.</p>
                <p>I was fortunate to have a few people around me who believed in my vision when it was still invisible to everyone else. Their encouragement, their energy, and their faith became the fuel that I desperately needed.</p>
                <p>And then came the biggest decision of my life.</p>
                <p>I walked away from the comfort of my white-collar banking career. I chose uncertainty over security. I chose purpose over approval. I chose passion over predictability.</p>
                <p>And that was the day <strong>GinieelnFitness 🏋️‍♂️💪🔥</strong> was born.</p>
                <p>What started as a dream became a mission.</p>
                <p>Today, my purpose goes far beyond transforming physiques. It is about transforming lives, inspiring people to believe in themselves, and proving that you don&apos;t have to live the life others expect from you.</p>
                <p>Because sometimes, the greatest risk in life is not failing…</p>
                <p className="text-[#FF6B00] font-semibold italic">It&apos;s succeeding in a life that was never meant for you.</p>
                <p>This is not just my story. This is the story of choosing courage over comfort, purpose over popularity, and passion over fear.</p>
                <p className="font-heading text-lg text-white uppercase tracking-wider">And trust me… I&apos;m only getting started.</p>
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
