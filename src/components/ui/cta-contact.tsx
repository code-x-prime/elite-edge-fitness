import { ArrowRightIcon, PlusIcon } from "lucide-react";
import Link from "next/link";

export function ContactCTA() {
  return (
    <div className="relative mx-auto flex w-full max-w-3xl flex-col justify-between gap-y-8 border-y border-[#FF6B00]/30 bg-[radial-gradient(35%_80%_at_25%_0%,rgba(255,107,0,0.08),transparent)] px-6 py-12">
      {/* Corner plus signs */}
      <PlusIcon className="absolute top-[-12.5px] left-[-11.5px] z-10 size-6 text-[#FF6B00]" strokeWidth={1.5}/>
      <PlusIcon className="absolute top-[-12.5px] right-[-11.5px] z-10 size-6 text-[#FF6B00]" strokeWidth={1.5}/>
      <PlusIcon className="absolute bottom-[-12.5px] left-[-11.5px] z-10 size-6 text-[#FF6B00]" strokeWidth={1.5}/>
      <PlusIcon className="absolute right-[-11.5px] bottom-[-12.5px] z-10 size-6 text-[#FF6B00]" strokeWidth={1.5}/>

      {/* Side borders */}
      <div className="pointer-events-none absolute -inset-y-6 left-0 w-px border-l border-[#FF6B00]/20" />
      <div className="pointer-events-none absolute -inset-y-6 right-0 w-px border-r border-[#FF6B00]/20" />

      {/* Center dashed line */}
      <div className="pointer-events-none absolute top-0 left-1/2 h-full border-l border-dashed border-[#FF6B00]/20 -z-10" />

      {/* Content */}
      <div className="space-y-2">
        <p className="text-center text-[#FF6B00] text-xs font-body font-bold uppercase tracking-[0.3em]">
          / Start Today
        </p>
        <h2 className="text-center font-heading text-4xl md:text-5xl uppercase text-[#0A0A0A] leading-none">
          Ready to Transform<br />
          <span className="text-[#FF6B00]">Your Body?</span>
        </h2>
        <p className="text-center text-[#666] font-body text-sm pt-1 max-w-md mx-auto">
          Join 500+ members who have already changed their lives with Elite Edge Fitness. No contracts. No excuses. Just results.
        </p>
      </div>

      {/* CTAs */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
        <Link
          href="/contact"
          className="w-full sm:w-auto text-center border-2 border-[#0A0A0A] text-[#0A0A0A] text-xs font-bold uppercase tracking-widest px-8 py-4 hover:bg-[#0A0A0A] hover:text-white transition-all duration-200 font-body"
        >
          Send a Message
        </Link>
        <Link
          href="/plans"
          className="w-full sm:w-auto flex items-center justify-center gap-2 bg-[#FF6B00] text-white text-xs font-bold uppercase tracking-widest px-8 py-4 hover:bg-[#E55A00] transition-all duration-200 font-body shadow-lg shadow-[#FF6B00]/25"
        >
          View Plans <ArrowRightIcon className="size-4" strokeWidth={2.5}/>
        </Link>
      </div>
    </div>
  );
}
