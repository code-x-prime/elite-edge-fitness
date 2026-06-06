import { prisma } from "@/lib/prisma";
import PlansClient from "./PlansClient";

export const dynamic = 'force-dynamic';

export const metadata = {
  title: "Training Plans — Elite Edge Fitness",
};

async function getPlans() {
  try {
    return await prisma.plan.findMany({
      where: { isActive: true },
      orderBy: { price: "asc" },
    });
  } catch {
    return [
      { id: "1", name: "Online Training", type: "online", price: 2999, duration: "1 Month", features: ["Custom online workout plan", "Video demonstrations", "Weekly check-ins", "WhatsApp support", "Diet chart"], isActive: true, popular: false, createdAt: new Date() },
      { id: "2", name: "Group Training", type: "group", price: 3499, duration: "1 Month", features: ["Group sessions (up to 10)", "Structured workout plan", "Diet guidance", "Progress tracking", "WhatsApp support"], isActive: true, popular: false, createdAt: new Date() },
      { id: "3", name: "Personal Training", type: "personal", price: 5999, duration: "1 Month", features: ["1-on-1 sessions", "Custom workout program", "Custom nutrition plan", "Daily check-ins", "Priority support", "Body composition analysis"], isActive: true, popular: true, createdAt: new Date() },
      { id: "4", name: "Elite Package", type: "elite", price: 19000, duration: "6 Months", features: ["Everything in Personal Training", "6-month program", "Unlimited sessions", "Supplement guidance", "Contest prep", "Lifetime support"], isActive: true, popular: false, createdAt: new Date() },
    ];
  }
}

async function getProducts() {
  try {
    return await prisma.product.findMany({ where: { isActive: true } });
  } catch {
    return [
      { id: "p1", name: "The Ultimate Fat Loss Guide", description: "A comprehensive science-backed guide with meal plans, workout routines, mindset strategies, and supplement recommendations.", price: 499, pdfUrl: "/products/fat-loss-guide.pdf", isActive: true, createdAt: new Date(), pdfR2Key: null, coverImage: null },
    ];
  }
}

export default async function PlansPage() {
  const [plans, products] = await Promise.all([getPlans(), getProducts()]);

  return (
    <div className="pt-16 md:pt-20">
      {/* Hero */}
      <section className="py-16 md:py-20 bg-white border-b border-[#E8E8E8]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="h-px w-12 bg-[#FF6B00]" />
            <span className="text-[#FF6B00] font-bold uppercase tracking-[0.3em] text-xs font-body">Choose Your Path</span>
          </div>
          <h1 className="font-heading text-6xl md:text-8xl uppercase text-[#0A0A0A] leading-none">
            TRAINING
          </h1>
          <h1 className="font-heading text-6xl md:text-8xl uppercase text-[#FF6B00] leading-none">
            PLANS
          </h1>
          <div className="h-1 w-16 bg-[#FF6B00] mt-4 mb-6" />
          <p className="text-[#444] max-w-xl font-body">
            Every plan is crafted for real results. Choose the right level of coaching for your goals and budget.
          </p>
        </div>
      </section>

      {/* Plans */}
      <section className="bg-[#F4F4F4]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <PlansClient plans={plans as Parameters<typeof PlansClient>[0]["plans"]} products={products} />
        </div>
      </section>

      {/* FAQ strip */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-heading text-4xl uppercase text-[#0A0A0A] mb-8 text-center">
            Common <span className="text-[#FF6B00]">Questions</span>
          </h2>
          <div className="space-y-0 border-t border-[#E8E8E8]">
            {[
              { q: "How do I get started?", a: "Select a plan, complete payment, and you'll be onboarded within 24 hours with a welcome questionnaire." },
              { q: "Can I switch plans?", a: "Yes, upgrade or change your plan anytime. Contact us and we'll adjust your program accordingly." },
              { q: "Is online training as effective as in-person?", a: "Absolutely. Our online clients achieve the same results with structured programs, video check-ins, and dedicated support." },
              { q: "What payment methods are accepted?", a: "Razorpay (UPI, cards, net banking), Google Pay, PhonePe, PayPal, and bank transfer. See Payments page for details." },
            ].map((faq) => (
              <details key={faq.q} className="group border-b border-[#E8E8E8]">
                <summary className="flex items-center justify-between py-5 cursor-pointer font-body font-semibold text-sm text-[#0A0A0A] hover:text-[#FF6B00] transition-colors list-none">
                  {faq.q}
                  <span className="text-[#FF6B00] group-open:rotate-45 transition-transform text-xl leading-none font-light">+</span>
                </summary>
                <div className="pb-5 border-l-2 border-[#FF6B00] pl-4">
                  <p className="text-sm text-[#555] font-body leading-relaxed">{faq.a}</p>
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
