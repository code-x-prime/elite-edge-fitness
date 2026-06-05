"use client";

import { useState, useEffect } from "react";
import { Pricing, type PricingPlan } from "@/components/ui/pricing";
import CheckoutModal from "@/components/plans/CheckoutModal";

const FALLBACK: PricingPlan[] = [
  {
    id: "1", name: "Group Training", type: "group", price: 3499, period: "1 Month",
    features: ["Group sessions (up to 10)", "Structured workout plan", "Diet guidance", "Progress tracking", "WhatsApp support"],
    description: "Train with a motivated group and build lasting fitness habits.",
    buttonText: "Choose Plan", href: "/plans", isPopular: false,
  },
  {
    id: "2", name: "Personal Training", type: "personal", price: 5999, period: "1 Month",
    features: ["1-on-1 personal sessions", "Custom workout program", "Custom nutrition plan", "Daily check-ins", "Priority support", "Body composition analysis"],
    description: "Maximum results with dedicated 1-on-1 coaching by Coach Gineel N.",
    buttonText: "Choose Plan", href: "/plans", isPopular: true,
  },
  {
    id: "3", name: "Online Training", type: "online", price: 2999, period: "1 Month",
    features: ["Custom online workout plan", "Video demonstrations", "Weekly check-ins", "WhatsApp support", "Diet chart"],
    description: "Elite coaching delivered anywhere in the world.",
    buttonText: "Choose Plan", href: "/plans", isPopular: false,
  },
];

export default function ProgramsSection() {
  const [plans, setPlans] = useState<PricingPlan[]>(FALLBACK);
  const [selected, setSelected] = useState<PricingPlan | null>(null);

  useEffect(() => {
    fetch("/api/plans")
      .then((r) => r.json())
      .then((data) => {
        if (!Array.isArray(data) || data.length === 0) return;
        const mapped: PricingPlan[] = data.slice(0, 3).map((p) => ({
          id: p.id,
          name: p.name,
          type: p.type,
          price: p.price,
          period: p.duration,
          features: p.features ?? [],
          description: p.popular
            ? "Maximum results with dedicated 1-on-1 coaching by Coach Gineel N."
            : p.type === "online"
            ? "Elite coaching delivered anywhere in the world."
            : "Train with a motivated group and build lasting fitness habits.",
          buttonText: "Choose Plan",
          href: "/plans",
          isPopular: p.popular ?? false,
        }));
        setPlans(mapped);
      })
      .catch(() => {});
  }, []);

  return (
    <section className="py-14 md:py-16 bg-[#F4F4F4]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Pricing
          plans={plans}
          title="OUR BEST PROGRAMS"
          description="Choose the right plan for your goals. Every program is built for real, lasting results by Coach Gineel N."
          onSelect={(plan) => setSelected(plan as PricingPlan & { id: string; name: string; price: number; duration: string })}
        />

        {selected && (
          <CheckoutModal
            plan={{ id: selected.id ?? "", name: selected.name, price: selected.price, duration: selected.period }}
            onClose={() => setSelected(null)}
          />
        )}
      </div>
    </section>
  );
}
