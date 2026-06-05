import {
  IconSalad,
  IconFlame,
  IconScale,
  IconDeviceLaptop,
  IconBarbell,
  IconRun,
} from "@tabler/icons-react";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { FadeUp } from "@/components/ui/FadeUp";

const SERVICES = [
  {
    Icon: IconSalad,
    name: "Diet Designing",
    desc: "Custom nutrition plans built around your goals, preferences, and lifestyle for sustainable results.",
  },
  {
    Icon: IconFlame,
    name: "Body Transformation",
    desc: "Complete physique overhaul with structured periodization, tracking, and progressive overload.",
  },
  {
    Icon: IconScale,
    name: "Weight Loss",
    desc: "Science-backed fat loss protocols that preserve muscle and accelerate your metabolism.",
  },
  {
    Icon: IconDeviceLaptop,
    name: "Online Training",
    desc: "Remote programs with video check-ins, form corrections, and dedicated WhatsApp support.",
  },
  {
    Icon: IconBarbell,
    name: "Six Pack Plans",
    desc: "Targeted ab sculpting programs combining smart nutrition, cardio, and core training.",
  },
  {
    Icon: IconRun,
    name: "Body Building",
    desc: "Competition-ready or personal bodybuilding programs from beginner to advanced level.",
  },
];

export default function ServicesSection() {
  return (
    <section className="py-14 md:py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeUp>
          <SectionHeader eyebrow="What We Offer" title="SETTING THE BAR HIGH" />
        </FadeUp>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-0 mt-12 border-l border-t border-[#E8E8E8]">
          {SERVICES.map(({ Icon, name, desc }, i) => (
            <FadeUp key={name} delay={i * 0.08}>
              <div className="group p-8 border-r border-b border-[#E8E8E8] hover:border-[#FF6B00] hover:shadow-lg transition-all duration-300 relative overflow-hidden bg-white">
                {/* Gold corner on hover */}
                <div className="absolute top-0 left-0 w-0 h-0 border-t-[3px] border-l-[3px] border-[#FF6B00] opacity-0 group-hover:opacity-100 group-hover:w-8 group-hover:h-8 transition-all duration-300" />

                <Icon size={40} className="text-[#FF6B00] mb-4" stroke={1.5} />
                <h3 className="font-heading text-xl text-[#0A0A0A] uppercase mb-2 tracking-tight">{name}</h3>
                <p className="text-sm text-[#666] font-body leading-relaxed">{desc}</p>
              </div>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}

