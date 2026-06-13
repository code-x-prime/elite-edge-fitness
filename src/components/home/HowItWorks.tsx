import { FadeUp } from "@/components/ui/FadeUp";
import { IconListSearch, IconSparkles, IconTrophy } from "@tabler/icons-react";

const STEPS = [
  {
    Icon: IconListSearch,
    title: "Choose Your Plan",
    desc: "Browse Group, Personal, Online, or Elite Package. Pick what fits your goal and budget.",
    style: "inactive",
  },
  {
    Icon: IconSparkles,
    title: "Get Membership",
    desc: "Enroll with secure payment — Razorpay, UPI, GPay, or bank transfer. Done in minutes.",
    style: "mid",
  },
  {
    Icon: IconTrophy,
    title: "Start Your Journey",
    desc: "Begin transformation with expert coaching, custom nutrition, and relentless support by Ginieel.",
    style: "active",
  },
];

export default function HowItWorks() {
  return (
    <section className="py-16 md:py-28 bg-[#FDF4F0] overflow-hidden">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <FadeUp>
          <div className="text-center mb-12 md:mb-16">
            <p className="text-[#FF6B00] text-xs font-body font-bold uppercase tracking-[0.3em] mb-3">
              / JOIN US TODAY
            </p>
            <h2 className="font-heading text-5xl md:text-[5.5rem] text-[#0A0A0A] leading-none uppercase">
              How It Works?
            </h2>
          </div>
        </FadeUp>

        {/* ── MOBILE layout: vertical stacked cards ── */}
        <div className="flex flex-col gap-0 md:hidden">
          {STEPS.map(({ Icon, title, desc, style }, i) => (
            <FadeUp key={title} delay={i * 0.1}>
              <div className="flex items-start gap-5 px-4 py-5 relative">
                {/* Vertical connector line */}
                {i < STEPS.length - 1 && (
                  <div className="absolute left-[3.25rem] top-[5.5rem] bottom-0 w-px border-l-2 border-dashed border-[#FF6B00]/30 z-0" />
                )}

                {/* Icon */}
                <div
                  className={`w-16 h-16 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-md relative z-10 ${
                    style === "inactive"
                      ? "bg-[#E0E0E0]"
                      : style === "mid"
                      ? "bg-[#1F1F1F]"
                      : "bg-[#FF6B00] shadow-[#FF6B00]/30"
                  }`}
                >
                  <Icon size={28} stroke={1.5} className={style === "inactive" ? "text-[#555]" : "text-white"}/>
                </div>

                {/* Text */}
                <div className="flex-1 pt-1">
                  <div className="flex items-center gap-3 mb-1">
                    <span className={`text-xs font-bold uppercase tracking-widest font-body ${style === "active" ? "text-[#FF6B00]" : "text-[#999]"}`}>
                      Step {i + 1}
                    </span>
                  </div>
                  <p className="font-heading text-xl text-[#0A0A0A] uppercase leading-tight mb-2">{title}</p>
                  <p className="text-sm text-[#666] font-body leading-relaxed">{desc}</p>
                </div>
              </div>
            </FadeUp>
          ))}
        </div>

        {/* ── DESKTOP layout: horizontal centered ── */}
        <div className="hidden md:flex relative items-start justify-between gap-0">

          {/* Left connector */}
          <div className="absolute top-[3.25rem] left-[calc(33.33%-0.5rem)] w-[calc(33.33%-2rem)] z-0">
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-[#FF6B00] flex-shrink-0"/>
              <div className="flex-1 border-t-2 border-dashed border-[#FF6B00]/40"/>
              <span className="w-2 h-2 rounded-full bg-[#999]/50 flex-shrink-0"/>
            </div>
          </div>
          {/* Right connector */}
          <div className="absolute top-[3.25rem] left-[calc(66.66%-0.5rem)] w-[calc(33.33%-2rem)] z-0">
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-[#FF6B00] flex-shrink-0"/>
              <div className="flex-1 border-t-2 border-dashed border-[#FF6B00]/40"/>
              <span className="w-2 h-2 rounded-full bg-[#999]/50 flex-shrink-0"/>
            </div>
          </div>

          {STEPS.map(({ Icon, title, desc, style }, i) => (
            <FadeUp key={title} delay={i * 0.15} className="flex-1 flex flex-col items-center text-center relative z-10">
              <div
                className={`w-24 h-24 rounded-2xl flex items-center justify-center mb-7 shadow-lg transition-transform duration-300 hover:-translate-y-1 ${
                  style === "inactive"
                    ? "bg-[#E0E0E0]"
                    : style === "mid"
                    ? "bg-[#1F1F1F]"
                    : "bg-[#FF6B00] shadow-[#FF6B00]/30"
                }`}
              >
                <Icon size={38} stroke={1.5} className={style === "inactive" ? "text-[#555]" : "text-white"}/>
              </div>
              <p className="font-heading text-xl text-[#0A0A0A] uppercase mb-2 tracking-wide">{title}</p>
              <p className="text-sm text-[#666] font-body leading-relaxed max-w-[200px]">{desc}</p>
            </FadeUp>
          ))}
        </div>

      </div>
    </section>
  );
}
