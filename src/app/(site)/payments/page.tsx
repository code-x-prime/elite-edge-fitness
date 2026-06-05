import {
  IconBrandGoogleFilled,
  IconQrcode,
  IconBrandPaypal,
  IconBuildingBank,
  IconArrowRight,
  IconBrandWhatsapp,
  IconShieldCheck,
} from "@tabler/icons-react";
import { CopyButton } from "./CopyButton";

export const metadata = {
  title: "Payment Options — Elite Edge Fitness",
};

const METHODS = [
  {
    id: "gpay",
    name: "Google Pay",
    tag: "Instant · Free",
    Icon: IconBrandGoogleFilled,
    iconBg: "bg-white",
    iconColor: "text-[#4285F4]",
    accentBar: "bg-gradient-to-r from-[#4285F4] via-[#EA4335] to-[#34A853]",
    logoPlaceholder: "GPay",
    details: [
      { label: "Send to Mobile", value: "+91 9665962938", copy: true },
    ],
    steps: ["Open Google Pay", "Tap New Payment → Mobile number", "Enter +91 9665962938", "Enter amount → Pay"],
    link: null,
    linkLabel: null,
  },
  {
    id: "upi",
    name: "UPI / PhonePe / Paytm",
    tag: "Instant · Any UPI App",
    Icon: IconQrcode,
    iconBg: "bg-[#6739B7]",
    iconColor: "text-white",
    accentBar: "bg-gradient-to-r from-[#6739B7] to-[#4B2DB5]",
    logoPlaceholder: "UPI",
    details: [
      { label: "UPI ID", value: "ngineel@upi", copy: true },
    ],
    steps: ["Open PhonePe / Paytm / BHIM", "Go to Send Money → UPI ID", "Enter ngineel@upi", "Enter amount → Pay"],
    link: null,
    linkLabel: null,
  },
  {
    id: "paypal",
    name: "PayPal",
    tag: "International · Cards OK",
    Icon: IconBrandPaypal,
    iconBg: "bg-[#003087]",
    iconColor: "text-white",
    accentBar: "bg-gradient-to-r from-[#003087] to-[#009CDE]",
    logoPlaceholder: "PayPal",
    details: [
      { label: "PayPal Link", value: "paypal.me/ngineel", copy: true },
    ],
    steps: ["Click Open PayPal below", "Enter amount", "Review & confirm payment"],
    link: "https://paypal.me/ngineel",
    linkLabel: "Open PayPal →",
  },
  {
    id: "bank",
    name: "Bank Transfer",
    tag: "NEFT / RTGS / IMPS · HSBC",
    Icon: IconBuildingBank,
    iconBg: "bg-[#DB0011]",
    iconColor: "text-white",
    accentBar: "bg-gradient-to-r from-[#DB0011] to-[#FF4444]",
    logoPlaceholder: "HSBC",
    details: [
      { label: "Account Name", value: "Gineel N", copy: false },
      { label: "Account No.", value: "105-839682-006", copy: true },
      { label: "IFSC", value: "HSBC0411002", copy: true },
      { label: "SWIFT", value: "HSBCINBB", copy: true },
      { label: "Email", value: "gineeln@hsbc", copy: false },
    ],
    steps: ["Login to your bank / NEFT app", "Add beneficiary with details above", "Transfer amount", "Send screenshot to confirm"],
    link: null,
    linkLabel: null,
  },
];

export default function PaymentsPage() {
  return (
    <div className="pt-16 md:pt-20 bg-white">

      {/* ── HERO ── */}
      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
            <div>
              <p className="text-[#FF6B00] text-xs font-body font-bold uppercase tracking-[0.3em] mb-4">
                / Easy &amp; Secure
              </p>
              <h1 className="font-heading text-6xl md:text-8xl uppercase text-[#0A0A0A] leading-none">
                PAYMENT
              </h1>
              <h1 className="font-heading text-6xl md:text-8xl uppercase text-[#FF6B00] leading-none">
                OPTIONS
              </h1>
              <div className="h-1 w-20 bg-[#FF6B00] mt-5" />
            </div>
            <div className="lg:max-w-md">
              <p className="text-[#555] font-body leading-relaxed mb-6">
                Choose from 4 convenient payment methods. After payment, send your screenshot via WhatsApp or email — we confirm within 2 hours.
              </p>
              <div className="flex items-center gap-3 text-sm font-body text-[#444]">
                <IconShieldCheck size={18} className="text-green-500" stroke={2}/>
                <span>All payments are secure &amp; verified manually</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── PAYMENT METHODS ── */}
      <section className="pb-16 md:pb-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {METHODS.map((m) => (
              <div
                key={m.id}
                className="group bg-white border-2 border-[#E8E8E8] hover:border-[#FF6B00] transition-all duration-300 hover:shadow-xl overflow-hidden"
              >
                {/* Accent top bar */}
                <div className={`h-1.5 w-full ${m.accentBar}`} />

                {/* Card header */}
                <div className="p-6 flex items-start gap-5 border-b border-[#F4F4F4]">
                  {/* Logo placeholder — replace with <img> */}
                  <div className={`w-14 h-14 ${m.iconBg} rounded-2xl flex items-center justify-center flex-shrink-0 shadow-sm border border-[#E8E8E8]`}>
                    <m.Icon size={28} className={m.iconColor} stroke={1.5}/>
                  </div>
                  <div>
                    <h3 className="font-heading text-2xl uppercase text-[#0A0A0A] leading-tight">{m.name}</h3>
                    <span className="inline-block mt-1 text-[10px] font-body font-bold uppercase tracking-widest text-[#FF6B00] bg-[#FF6B00]/8 px-2 py-0.5">
                      {m.tag}
                    </span>
                  </div>
                </div>

                <div className="p-6 space-y-5">
                  {/* Details — big, scannable */}
                  <div className="space-y-3">
                    {m.details.map((d) => (
                      <div key={d.label} className="flex items-center justify-between gap-4 bg-[#F8F8F8] px-4 py-3">
                        <span className="text-xs font-body font-bold uppercase tracking-widest text-[#999] flex-shrink-0">{d.label}</span>
                        <div className="flex items-center gap-2 min-w-0">
                          <span className="font-mono text-sm font-bold text-[#0A0A0A] truncate">{d.value}</span>
                          {d.copy && <CopyButton value={d.value}/>}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Steps */}
                  <div className="bg-[#FFF8F4] border border-[#FF6B00]/15 p-4">
                    <p className="text-[10px] font-body font-bold uppercase tracking-widest text-[#FF6B00] mb-3">How to Pay</p>
                    <ol className="space-y-1.5">
                      {m.steps.map((step, i) => (
                        <li key={i} className="flex items-start gap-2.5 text-sm font-body text-[#444]">
                          <span className="w-5 h-5 bg-[#FF6B00] text-white text-[10px] font-black flex items-center justify-center flex-shrink-0 mt-0.5 rounded-full">
                            {i + 1}
                          </span>
                          {step}
                        </li>
                      ))}
                    </ol>
                  </div>

                  {/* CTA link */}
                  {m.link && (
                    <a
                      href={m.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2 w-full bg-[#003087] text-white text-xs font-bold uppercase tracking-widest py-4 hover:bg-[#0044C7] transition-colors font-body"
                    >
                      {m.linkLabel} <IconArrowRight size={14} stroke={2}/>
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── AFTER PAYMENT ── */}
      <section className="py-14 bg-[#F4F4F4] border-t border-[#E8E8E8]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
            <div>
              <p className="text-[#FF6B00] text-xs font-body font-bold uppercase tracking-[0.3em] mb-3">/ After Payment</p>
              <h2 className="font-heading text-4xl md:text-5xl uppercase text-[#0A0A0A] leading-none mb-4">
                SEND US YOUR<br />SCREENSHOT
              </h2>
              <p className="text-[#555] text-sm font-body leading-relaxed">
                Once payment is done, send the screenshot via WhatsApp or email. We verify and onboard you within 2 hours.
              </p>
            </div>
            <div className="space-y-3">
              <a
                href="https://wa.me/919665962938?text=Hi%2C%20I%20have%20made%20the%20payment%20for%20Elite%20Edge%20Fitness.%20Please%20find%20the%20screenshot%20attached."
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 bg-white border-2 border-[#E8E8E8] hover:border-[#25D366] hover:shadow-md p-5 transition-all group"
              >
                <div className="w-12 h-12 bg-[#25D366] rounded-2xl flex items-center justify-center flex-shrink-0">
                  <IconBrandWhatsapp size={24} className="text-white" stroke={1.5}/>
                </div>
                <div className="flex-1">
                  <p className="font-body font-bold text-sm text-[#0A0A0A]">WhatsApp</p>
                  <p className="text-xs text-[#666] font-body">+91 9665962938 · Fastest response</p>
                </div>
                <IconArrowRight size={16} className="text-[#CCC] group-hover:text-[#25D366] transition-colors"/>
              </a>

              <a
                href="mailto:contact@eliteedgefitness.in?subject=Payment%20Confirmation%20-%20Elite%20Edge%20Fitness"
                className="flex items-center gap-4 bg-white border-2 border-[#E8E8E8] hover:border-[#FF6B00] hover:shadow-md p-5 transition-all group"
              >
                <div className="w-12 h-12 bg-[#FF6B00] rounded-2xl flex items-center justify-center flex-shrink-0">
                  <span className="font-heading text-white text-sm">@</span>
                </div>
                <div className="flex-1">
                  <p className="font-body font-bold text-sm text-[#0A0A0A]">Email</p>
                  <p className="text-xs text-[#666] font-body">contact@eliteedgefitness.in</p>
                </div>
                <IconArrowRight size={16} className="text-[#CCC] group-hover:text-[#FF6B00] transition-colors"/>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── RAZORPAY ONLINE ── */}
      <section className="py-14 bg-white border-t border-[#E8E8E8]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6 bg-[#0A0A0A] p-8">
            <div>
              <p className="text-[#FF6B00] text-xs font-body font-bold uppercase tracking-[0.3em] mb-2">Preferred · Instant</p>
              <h3 className="font-heading text-3xl text-white uppercase">Pay Online via Razorpay</h3>
              <p className="text-white/40 text-sm font-body mt-2">UPI, Cards, Net Banking — instant confirmation</p>
            </div>
            <a
              href="/plans"
              className="flex-shrink-0 flex items-center gap-3 bg-[#FF6B00] text-white text-sm font-bold uppercase tracking-widest px-8 py-4 hover:bg-[#E55A00] transition-colors font-body"
            >
              Go to Plans <IconArrowRight size={16} stroke={2}/>
            </a>
          </div>
        </div>
      </section>

    </div>
  );
}
