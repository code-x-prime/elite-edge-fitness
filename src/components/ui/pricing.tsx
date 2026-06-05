"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { Check, Star } from "lucide-react";
import Link from "next/link";
import { useMediaQuery } from "@/hooks/use-media-query";
import confetti from "canvas-confetti";
import { useRef } from "react";

export interface PricingPlan {
  id?: string;
  name: string;
  price: number;
  period: string;
  features: string[];
  description: string;
  buttonText: string;
  href: string;
  isPopular: boolean;
  type?: string;
}

interface PricingProps {
  plans: PricingPlan[];
  title?: string;
  description?: string;
  onSelect?: (plan: PricingPlan) => void;
}

export function Pricing({
  plans,
  title = "Training Plans",
  description = "Choose the right plan for your goals. Every program is built for real, lasting results.",
  onSelect,
}: PricingProps) {
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const popularRef = useRef<HTMLDivElement>(null);

  const fireConfetti = () => {
    if (!popularRef.current) return;
    const rect = popularRef.current.getBoundingClientRect();
    confetti({
      particleCount: 60,
      spread: 70,
      origin: {
        x: (rect.left + rect.width / 2) / window.innerWidth,
        y: (rect.top + rect.height / 2) / window.innerHeight,
      },
      colors: ["#FF6B00", "#FF8C42", "#E55A00", "#0A0A0A", "#ffffff"],
      ticks: 200,
      gravity: 1.2,
      decay: 0.94,
      startVelocity: 30,
      shapes: ["circle"],
    });
  };

  return (
    <div className="w-full py-10">
      {/* Header */}
      {(title || description) && (
        <div className="text-center mb-12">
          <p className="text-[#FF6B00] text-xs font-body font-bold uppercase tracking-[0.3em] mb-3">
            / Choose Your Path
          </p>
          <h2 className="font-heading text-5xl md:text-6xl text-[#0A0A0A] leading-none uppercase">
            {title}
          </h2>
          <div className="h-1 w-16 bg-[#FF6B00] mx-auto mt-4 mb-5" />
          <p className="text-[#666] font-body max-w-xl mx-auto text-sm leading-relaxed">
            {description}
          </p>
        </div>
      )}

      {/* Cards — popular always in center slot */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 max-w-5xl mx-auto items-end">
        {(() => {
          const nonPop = plans.filter(p => !p.isPopular);
          const pop = plans.filter(p => p.isPopular);
          const sorted: typeof plans = [];
          if (nonPop[0]) sorted.push(nonPop[0]);
          if (pop[0]) sorted.push(pop[0]);
          if (nonPop[1]) sorted.push(nonPop[1]);
          // remaining
          nonPop.slice(2).forEach(p => sorted.push(p));
          pop.slice(1).forEach(p => sorted.push(p));
          return sorted;
        })().map((plan, index) => (
          <motion.div
            key={plan.id ?? index}
            ref={plan.isPopular ? popularRef : undefined}
            initial={{ y: 40, opacity: 0 }}
            whileInView={
              isDesktop
                ? {
                    y: plan.isPopular ? -16 : 0,
                    opacity: 1,
                    scale: plan.isPopular ? 1.04 : 0.97,
                  }
                : { y: 0, opacity: 1 }
            }
            viewport={{ once: true }}
            transition={{ duration: 1.2, type: "spring", stiffness: 80, damping: 20, delay: index * 0.1 }}
            className={cn(
              "relative flex flex-col bg-white border-2 overflow-hidden",
              plan.isPopular
                ? "border-[#FF6B00] shadow-2xl shadow-[#FF6B00]/15 z-10"
                : "border-[#E8E8E8] hover:border-[#FF6B00]/40 transition-colors duration-300"
            )}
          >
            {/* Popular badge */}
            {plan.isPopular && (
              <div className="absolute top-0 right-0 bg-[#FF6B00] py-1 px-3 flex items-center gap-1.5">
                <Star className="text-white h-3.5 w-3.5 fill-white" />
                <span className="text-white text-xs font-body font-bold uppercase tracking-widest">
                  Popular
                </span>
              </div>
            )}

            {/* Top color bar */}
            <div className={`h-1 w-full ${plan.isPopular ? "bg-[#FF6B00]" : "bg-[#E8E8E8]"}`} />

            <div className="p-7 flex flex-col flex-1">
              {/* Type badge */}
              {plan.type && (
                <p className="text-[#FF6B00] text-xs font-body font-bold uppercase tracking-widest mb-3">
                  {plan.type}
                </p>
              )}

              {/* Name */}
              <h3 className="font-heading text-3xl text-[#0A0A0A] uppercase leading-tight mb-4">
                {plan.name}
              </h3>

              {/* Price */}
              <div className="flex items-baseline gap-1.5 mb-6">
                <span className="font-heading text-5xl text-[#FF6B00] leading-none">
                  ₹{plan.price.toLocaleString("en-IN")}
                </span>
                <span className="text-[#999] text-sm font-body">/ {plan.period}</span>
              </div>

              {/* Features */}
              <ul className="space-y-3 mb-8 flex-1">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-sm text-[#444] font-body">
                    <Check className="h-4 w-4 text-[#FF6B00] flex-shrink-0 mt-0.5" strokeWidth={2.5} />
                    {feature}
                  </li>
                ))}
              </ul>

              <hr className="border-[#E8E8E8] mb-6" />

              {/* CTA */}
              {onSelect ? (
                <button
                  onClick={() => { onSelect(plan); if (plan.isPopular) fireConfetti(); }}
                  className={cn(
                    "w-full py-3.5 text-xs font-bold uppercase tracking-widest transition-all duration-200 font-body",
                    plan.isPopular
                      ? "bg-[#FF6B00] text-white hover:bg-[#E55A00]"
                      : "bg-[#0A0A0A] text-white hover:bg-[#FF6B00]"
                  )}
                >
                  {plan.buttonText}
                </button>
              ) : (
                <Link
                  href={plan.href}
                  onClick={() => plan.isPopular && fireConfetti()}
                  className={cn(
                    "block w-full text-center py-3.5 text-xs font-bold uppercase tracking-widest transition-all duration-200 font-body",
                    plan.isPopular
                      ? "bg-[#FF6B00] text-white hover:bg-[#E55A00]"
                      : "bg-[#0A0A0A] text-white hover:bg-[#FF6B00]"
                  )}
                >
                  {plan.buttonText}
                </Link>
              )}

              {/* Description */}
              <p className="mt-4 text-xs text-[#999] font-body text-center leading-relaxed">
                {plan.description}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
