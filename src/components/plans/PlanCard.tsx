"use client";

import { Button } from "@/components/ui/button";
import { IconCheck } from "@tabler/icons-react";

interface Plan {
  id: string;
  name: string;
  type: string;
  price: number;
  duration: string;
  features: string[];
  popular: boolean;
}

interface PlanCardProps {
  plan: Plan;
  onBuy?: (plan: Plan) => void;
}

export default function PlanCard({ plan, onBuy }: PlanCardProps) {
  return (
    <div
      className={`relative bg-white overflow-hidden flex flex-col transition-all duration-300 hover:-translate-y-1 ${
        plan.popular
          ? "border-2 border-[#FF6B00] shadow-xl shadow-[#FF6B00]/10"
          : "border border-[#E8E8E8] hover:border-[#FF6B00] hover:shadow-lg"
      }`}
    >
      {/* Top bar */}
      {plan.popular ? (
        <div className="bg-[#FF6B00] px-6 py-3 flex items-center justify-between">
          <span className="text-white text-xs font-body font-bold uppercase tracking-widest">
            {plan.type}
          </span>
          <span className="text-white text-xs font-body font-black uppercase tracking-widest">
            ★ Most Popular
          </span>
        </div>
      ) : (
        <div className="bg-[#0A0A0A] px-6 py-3">
          <span className="text-white/50 text-xs font-body font-bold uppercase tracking-widest">
            {plan.type}
          </span>
        </div>
      )}

      <div className="p-7 flex flex-col flex-1">
        {/* Name + price */}
        <div className="mb-6">
          <h3 className="font-heading text-3xl uppercase text-[#0A0A0A] leading-tight mb-4">
            {plan.name}
          </h3>
          <div className="flex items-baseline gap-1">
            <span className="font-heading text-5xl text-[#FF6B00] leading-none">
              ₹{plan.price.toLocaleString("en-IN")}
            </span>
            <span className="text-[#999] text-sm font-body ml-1">/{plan.duration}</span>
          </div>
        </div>

        {/* Features */}
        <ul className="space-y-3 mb-8 flex-1">
          {plan.features.map((feature) => (
            <li key={feature} className="flex items-start gap-3 text-sm text-[#444] font-body">
              <IconCheck size={16} className="text-[#FF6B00] flex-shrink-0 mt-0.5" stroke={2.5} />
              {feature}
            </li>
          ))}
        </ul>

        <Button
          variant={plan.popular ? "gold" : "default"}
          className="w-full justify-center"
          onClick={() => onBuy?.(plan)}
        >
          Get Started
        </Button>
      </div>
    </div>
  );
}
