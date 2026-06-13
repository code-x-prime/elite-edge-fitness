"use client";

import { motion } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Link from "next/link";

const FAQS_LEFT = [
  {
    question: "What makes Elite Edge Fitness different from other trainers?",
    answer:
      "13+ years of dedicated coaching, science-backed programming, and genuine 1-on-1 attention every session. Every plan is built specifically for your body, goals, and lifestyle — not a copy-paste template. Ginieel personally handles every client.",
  },
  {
    question: "How do I enroll in a training plan?",
    answer:
      "Go to the Plans page, select your program, fill in your details, and pay securely via Razorpay, UPI, or bank transfer. You will be onboarded and contacted within 24 hours to get started.",
  },
  {
    question: "Is online coaching as effective as in-person training?",
    answer:
      "Yes. Our online clients get custom workout plans, video check-ins, form correction feedback, and daily WhatsApp support — same results, any location. Many of our best transformations have been through online coaching.",
  },
  {
    question: "What does the Elite Package include?",
    answer:
      "Everything in Personal Training, extended to 6 months — unlimited sessions, supplement guidance, optional contest prep, progress photo reviews, and lifetime post-program support.",
  },
  {
    question: "Can I get a customized diet plan?",
    answer:
      "Absolutely. Every plan includes a custom nutrition blueprint calibrated to your macros, food preferences, training intensity, and transformation goal. No generic meal plans here.",
  },
];

const FAQS_RIGHT = [
  {
    question: "How long before I see results?",
    answer:
      "Most clients notice visible changes within 3-4 weeks with consistent effort. Significant transformations typically happen between 8-12 weeks. Results depend on your commitment, consistency, and following the plan.",
  },
  {
    question: "Do I need gym equipment for the online program?",
    answer:
      "Programs are customized based on what equipment you have access to — full gym, home gym, or just bodyweight. Just tell us your setup during onboarding and we build around it.",
  },
  {
    question: "What payment methods are accepted?",
    answer:
      "Razorpay (UPI, cards, net banking), Google Pay (+91 9665962938), PhonePe, PayPal (paypal.me/ngineel), and HSBC bank transfer. See the Payments page for full details.",
  },
  {
    question: "How do I contact Ginieel - Founder (Elite Edge Fitness) directly?",
    answer:
      "WhatsApp at +91 9665962938, email at eliteedgefitness09@gmail.com, or use the Contact page form. Response guaranteed within 24 hours — usually much faster.",
  },
  {
    question: "Can I switch or upgrade my plan mid-way?",
    answer:
      "Yes. You can upgrade or change your plan at any time. Just contact us and we will adjust your program and billing accordingly. No lock-in periods.",
  },
];

export default function FAQSection() {
  return (
    <section className="relative overflow-hidden py-14 md:py-16 bg-white">
      {/* Subtle glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] rounded-full opacity-[0.04] blur-[120px] pointer-events-none"
        style={{ background: "radial-gradient(ellipse, #FF6B00, transparent)" }}
      />

      <div className="relative z-10 w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-14"
        >
          <p className="text-[#FF6B00] text-xs font-body font-bold uppercase tracking-[0.3em] mb-3">
            / Got Questions
          </p>
          <h2 className="font-heading text-5xl md:text-6xl text-[#0A0A0A] leading-none uppercase">
            Frequently Asked<br />
            <span className="text-[#FF6B00]">Questions</span>
          </h2>
          <div className="h-1 w-16 bg-[#FF6B00] mx-auto mt-6 mb-6" />
          <p className="text-[#666] font-body text-sm max-w-lg mx-auto">
            Everything you need to know about training, nutrition, payments, and results at Elite Edge Fitness.
          </p>
        </motion.div>

        {/* Two-column accordion */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-0 md:gap-12"
        >
          {[FAQS_LEFT, FAQS_RIGHT].map((col, ci) => (
            <Accordion key={ci} type="single" collapsible className="space-y-0">
              {col.map((faq, i) => (
                <AccordionItem
                  key={i}
                  value={`col-${ci}-${i}`}
                  className="border-b border-[#E8E8E8] last:border-b-0"
                >
                  <AccordionTrigger className="text-sm font-body font-semibold py-5 text-[#0A0A0A] hover:text-[#FF6B00] [&[data-state=open]]:text-[#FF6B00] transition-colors pr-2">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="pb-5 pt-0 pr-6">
                      <div className="h-0.5 w-8 bg-[#FF6B00] mb-3" />
                      <p className="text-[#555] text-sm font-body leading-relaxed">
                        {faq.answer}
                      </p>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          ))}
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.3 }}
          className="text-center mt-12"
        >
          <p className="text-[#999] text-sm font-body mb-4">
            Still have questions? We respond within 24 hours.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 bg-[#FF6B00] text-white text-xs font-bold uppercase tracking-widest px-8 py-4 hover:bg-[#E55A00] transition-colors duration-200"
          >
            Ask Us Directly &#x2192;
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
