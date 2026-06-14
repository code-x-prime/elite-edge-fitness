"use client";

import React from "react";
import { FadeUp } from "@/components/ui/FadeUp";
import { IconBrandInstagram, IconFlame, IconUsers, IconTrendingUp } from "@tabler/icons-react";

const INSTAGRAM_URL = "https://www.instagram.com/eliteedgefitness09?igsh=MW91c2lqbmp1amI2aQ==";
const EMBED_URL = "https://www.instagram.com/eliteedgefitness09/embed/";

export default function InstagramCarousel() {
  return (
    <section className="py-16 md:py-24 bg-white relative overflow-hidden border-t border-zinc-100">
      {/* Background radial glow */}
      <div
        className="absolute top-1/2 right-10 -translate-y-1/2 w-[500px] h-[500px] rounded-full opacity-[0.03] blur-[100px] pointer-events-none"
        style={{ background: "radial-gradient(circle, #FF6B00 0%, transparent 70%)" }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Context & CTA */}
          <div className="lg:col-span-5 space-y-6">
            <FadeUp>
              <div>
                <p className="text-[#FF6B00] text-xs font-body font-bold uppercase tracking-[0.3em] mb-3">
                  / INSTAGRAM FEED
                </p>
                <h2 className="font-heading text-4xl md:text-6xl text-zinc-950 leading-none uppercase">
                  Elite Edge <br />In Action
                </h2>
              </div>
            </FadeUp>

            <FadeUp delay={0.1}>
              <p className="text-zinc-600 font-body text-base md:text-lg leading-relaxed max-w-md">
                Follow our journey, get daily workout motivation, nutrition tips, and witness real transformations. Join our community of achievers!
              </p>
            </FadeUp>

            {/* Quick stats / highlights */}
            <FadeUp delay={0.2}>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 py-4 border-y border-zinc-100">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-orange-500/10 flex items-center justify-center text-[#FF6B00]">
                    <IconUsers size={18} />
                  </div>
                  <div>
                    <p className="text-xs text-zinc-400 font-body">Community</p>
                    <p className="text-sm font-heading uppercase text-zinc-800">5k+ Strong</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-orange-500/10 flex items-center justify-center text-[#FF6B00]">
                    <IconFlame size={18} />
                  </div>
                  <div>
                    <p className="text-xs text-zinc-400 font-body">Workouts</p>
                    <p className="text-sm font-heading uppercase text-zinc-800">Daily Reels</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-orange-500/10 flex items-center justify-center text-[#FF6B00]">
                    <IconTrendingUp size={18} />
                  </div>
                  <div>
                    <p className="text-xs text-zinc-400 font-body">Updates</p>
                    <p className="text-sm font-heading uppercase text-zinc-800">Real-Time</p>
                  </div>
                </div>
              </div>
            </FadeUp>

            <FadeUp delay={0.3}>
              <a
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 px-8 py-4 bg-[#FF6B00] hover:bg-[#e05e00] text-white font-heading text-sm uppercase tracking-wider transition-all duration-300 rounded hover:shadow-[0_8px_25px_rgba(255,107,0,0.35)] w-full sm:w-auto justify-center"
              >
                <IconBrandInstagram size={20} />
                Follow @eliteedgefitness09
              </a>
            </FadeUp>
          </div>

          {/* Right Column: Embedded Feed Widget */}
          <div className="lg:col-span-7 flex justify-center lg:justify-end">
            <FadeUp delay={0.2} className="w-full max-w-[500px]">
              <div className="w-full aspect-[4/5] sm:h-[620px] rounded-2xl overflow-hidden bg-zinc-50 border border-zinc-200/80 shadow-[0_20px_50px_rgba(0,0,0,0.08)] hover:shadow-[0_20px_50px_rgba(255,107,0,0.1)] transition-all duration-500">
                <iframe
                  src={EMBED_URL}
                  className="w-full h-full border-0"
                  allowFullScreen
                  scrolling="no"
                  allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                />
              </div>
            </FadeUp>
          </div>

        </div>
      </div>
    </section>
  );
}
