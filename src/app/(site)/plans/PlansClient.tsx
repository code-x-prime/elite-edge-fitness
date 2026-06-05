"use client";

import { useState } from "react";
import { Pricing, type PricingPlan } from "@/components/ui/pricing";
import CheckoutModal from "@/components/plans/CheckoutModal";
import { IconBook, IconBarbell, IconCheck } from "@tabler/icons-react";

interface DBPlan {
  id: string;
  name: string;
  type: string;
  price: number;
  duration: string;
  features: string[];
  popular: boolean;
}

interface DBProduct {
  id: string;
  name: string;
  description: string;
  price: number;
  pdfUrl: string;
}

interface PlansClientProps {
  plans: DBPlan[];
  products: DBProduct[];
}

type Tab = "plans" | "products";

export default function PlansClient({ plans, products }: PlansClientProps) {
  const [tab, setTab] = useState<Tab>("plans");
  const [selected, setSelected] = useState<{ id: string; name: string; price: number; duration: string } | null>(null);
  const [productSelected, setProductSelected] = useState<{ id: string; name: string; price: number; duration: string } | null>(null);

  const pricingPlans: PricingPlan[] = plans.map((p) => ({
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
      : p.type === "elite"
      ? "Complete 6-month transformation with lifetime support."
      : "Train with a motivated group and build lasting fitness habits.",
    buttonText: "Get Started",
    href: "/plans",
    isPopular: p.popular,
  }));

  return (
    <div className="pb-10">
      {/* Tab switcher */}
      <div className="flex border-b border-[#E8E8E8] mb-8">
        <button
          onClick={() => setTab("plans")}
          className={`flex items-center gap-2 px-6 py-4 text-xs font-bold uppercase tracking-widest font-body border-b-2 transition-colors ${tab === "plans" ? "border-[#FF6B00] text-[#FF6B00]" : "border-transparent text-[#666] hover:text-[#0A0A0A]"}`}
        >
          <IconBarbell size={15} stroke={1.5}/>
          Training Plans
          <span className={`text-[10px] px-1.5 py-0.5 font-bold ${tab === "plans" ? "bg-[#FF6B00]/10 text-[#FF6B00]" : "bg-[#F4F4F4] text-[#999]"}`}>{plans.length}</span>
        </button>
        <button
          onClick={() => setTab("products")}
          className={`flex items-center gap-2 px-6 py-4 text-xs font-bold uppercase tracking-widest font-body border-b-2 transition-colors ${tab === "products" ? "border-[#FF6B00] text-[#FF6B00]" : "border-transparent text-[#666] hover:text-[#0A0A0A]"}`}
        >
          <IconBook size={15} stroke={1.5}/>
          Digital Products
          <span className={`text-[10px] px-1.5 py-0.5 font-bold ${tab === "products" ? "bg-[#FF6B00]/10 text-[#FF6B00]" : "bg-[#F4F4F4] text-[#999]"}`}>{products.length}</span>
        </button>
      </div>

      {/* Plans tab */}
      {tab === "plans" && (
        <Pricing
          plans={pricingPlans}
          title=""
          description=""
          onSelect={(plan) =>
            setSelected({ id: plan.id ?? "", name: plan.name, price: plan.price, duration: plan.period })
          }
        />
      )}

      {/* Products tab */}
      {tab === "products" && (
        <div>
          {products.length === 0 ? (
            <div className="text-center py-16 text-[#999] font-body">No products available yet.</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {products.map(p => (
                <div key={p.id} className="bg-white border-2 border-[#E8E8E8] hover:border-[#FF6B00] hover:shadow-xl transition-all duration-300 overflow-hidden group">
                  {/* Top bar */}
                  <div className="bg-[#0A0A0A] px-6 py-3 flex items-center gap-3">
                    <IconBook size={16} className="text-[#FF6B00]" stroke={1.5}/>
                    <span className="text-white/60 text-xs font-body font-bold uppercase tracking-widest">Digital Product</span>
                  </div>

                  <div className="p-7">
                    <h3 className="font-heading text-2xl uppercase text-[#0A0A0A] mb-4">{p.name}</h3>
                    <p className="text-[#666] text-sm font-body leading-relaxed mb-6">{p.description}</p>

                    {/* Features */}
                    <ul className="space-y-2 mb-7">
                      {["Instant PDF download after payment","Science-backed content by Coach Gineel N","Meal plans, workouts & mindset strategies","Lifetime access"].map(f => (
                        <li key={f} className="flex items-start gap-2 text-sm text-[#444] font-body">
                          <IconCheck size={15} className="text-[#FF6B00] flex-shrink-0 mt-0.5" strokeWidth={2.5}/>
                          {f}
                        </li>
                      ))}
                    </ul>

                    <div className="flex items-end justify-between border-t border-[#E8E8E8] pt-5">
                      <div>
                        <span className="font-heading text-4xl text-[#FF6B00]">&#8377;{p.price}</span>
                        <p className="text-[#999] text-xs font-body mt-0.5">one-time purchase</p>
                      </div>
                      <button
                        onClick={() => setProductSelected({ id: p.id, name: p.name, price: p.price, duration: "lifetime" })}
                        className="bg-[#FF6B00] text-white text-xs font-bold uppercase tracking-widest px-6 py-3.5 hover:bg-[#E55A00] transition-colors font-body"
                      >
                        Buy Now &#x2192;
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {(selected || productSelected) && (
        <CheckoutModal
          plan={(selected || productSelected)!}
          onClose={() => { setSelected(null); setProductSelected(null); }}
        />
      )}
    </div>
  );
}
