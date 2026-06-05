"use client";

import { FadeUp } from "@/components/ui/FadeUp";
import { IconCheck, IconX } from "@tabler/icons-react";

const FEATURES = [
  { label: "Personalized Training Plans",        us: true,  branded: true,  local: false },
  { label: "1-on-1 Expert Coaching",             us: true,  branded: false, local: false },
  { label: "Custom Nutrition / Diet Design",     us: true,  branded: false, local: false },
  { label: "Online Remote Coaching",             us: true,  branded: false, local: false },
  { label: "Contest Prep & Stage Training",      us: true,  branded: false, local: false },
  { label: "Progress Tracking & Body Analysis",  us: true,  branded: true,  local: false },
  { label: "WhatsApp / Daily Support",           us: true,  branded: false, local: false },
  { label: "Science-Backed Programming",         us: true,  branded: true,  local: false },
];

function Tick({ yes, size = "md" }: { yes: boolean; size?: "sm" | "md" }) {
  const sz = size === "sm" ? "w-7 h-7" : "w-10 h-10";
  const ico = size === "sm" ? 15 : 20;
  if (yes) {
    return (
      <div className={`${sz} rounded-full bg-green-500/15 border-2 border-green-500 flex items-center justify-center mx-auto`}>
        <IconCheck size={ico} className="text-green-400" stroke={2.5}/>
      </div>
    );
  }
  return (
    <div className={`${sz} rounded-full bg-red-500/10 border-2 border-red-500/60 flex items-center justify-center mx-auto`}>
      <IconX size={ico} className="text-red-400" stroke={2.5}/>
    </div>
  );
}

export default function WhyChooseUs() {
  return (
    <section className="py-16 md:py-28 bg-[#0A0A0A] relative overflow-hidden">
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[min(700px,150vw)] h-[min(500px,120vw)] rounded-full opacity-10 blur-[130px] pointer-events-none"
        style={{ background: "radial-gradient(circle, #FF6B00 0%, #8B2000 50%, transparent 100%)" }}
      />

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <FadeUp>
          <div className="text-center mb-12">
            <p className="text-[#FF6B00] text-xs font-body font-bold uppercase tracking-[0.3em] mb-3">
              / WHY CHOOSE US
            </p>
            <h2 className="font-heading text-5xl md:text-7xl text-white leading-none uppercase">
              Experience The<br />Difference
            </h2>
          </div>
        </FadeUp>

        <FadeUp delay={0.15}>
          {/* ── MOBILE: simple checklist (EEF only) ── */}
          <div className="block md:hidden space-y-0 border border-white/10">
            <div className="bg-[#FF6B00]/10 border-b border-white/10 px-4 py-3">
              <p className="font-heading text-sm text-[#FF6B00] uppercase tracking-widest text-center">Elite Edge Fitness Includes</p>
            </div>
            {FEATURES.map(row => (
              <div key={row.label} className="flex items-center gap-3 px-4 py-3.5 border-b border-white/[0.06] last:border-b-0">
                <Tick yes={row.us} size="sm"/>
                <span className="text-sm font-body text-white/70">{row.label}</span>
              </div>
            ))}
          </div>

          {/* ── DESKTOP: full comparison table ── */}
          <div className="hidden md:block">
            <table className="w-full border-collapse">
              <thead>
                <tr>
                  <th className="text-left pb-8 w-[40%]"/>
                  <th className="pb-8 text-center w-[20%]">
                    <div className="inline-block border-b-2 border-[#FF6B00] pb-1">
                      <span className="font-heading text-xl uppercase text-[#FF6B00] tracking-wide">Elite Edge</span>
                    </div>
                  </th>
                  <th className="pb-8 text-center w-[20%]">
                    <span className="font-heading text-lg uppercase text-white/30 tracking-wide">Branded Gyms</span>
                  </th>
                  <th className="pb-8 text-center w-[20%]">
                    <span className="font-heading text-lg uppercase text-white/30 tracking-wide">Local Trainers</span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {FEATURES.map(row => (
                  <tr key={row.label} className="border-t border-white/[0.07] hover:bg-white/[0.02] transition-colors">
                    <td className="py-5 pr-6 text-sm font-body text-white/70 font-medium">{row.label}</td>
                    <td className="py-5 text-center"><Tick yes={row.us}/></td>
                    <td className="py-5 text-center"><Tick yes={row.branded}/></td>
                    <td className="py-5 text-center"><Tick yes={row.local}/></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}
