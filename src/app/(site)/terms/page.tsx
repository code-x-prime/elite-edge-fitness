"use client";

import { useState } from "react";
import { IconFileText, IconAlertCircle, IconCircleCheck, IconLock } from "@tabler/icons-react";
import toast from "react-hot-toast";

const TERMS = [
  {
    title: "1. Core Training & Subscriptions",
    text: "All training subscriptions (Personal Training, Group Training, Online Coaching) are pre-paid and valid only for the designated duration. Personal Training sessions must be utilized within the monthly block and do not roll over to subsequent months."
  },
  {
    title: "2. Absolute No-Refund Policy",
    text: "Elite Edge Fitness operates on an absolute NO REFUNDS policy. Once payment is processed, it is final. There are no refunds, partial refunds, or extensions granted for missed sessions, unused program days, or change of mind."
  },
  {
    title: "3. Session Cancellations & Rescheduling",
    text: "For 1-on-1 Personal Training, a minimum of 24 hours notice is mandatory to reschedule a session. Failure to notify within 24 hours will result in that session being forfeited. Group batch sessions are fixed and cannot be rescheduled."
  },
  {
    title: "4. Physical Readiness & Medical Clearance",
    text: "By signing up, you verify that you have completed the PAR-Q health screening. You assume full responsibility for your physical health and agree that Elite Edge Fitness is not liable for injuries sustained during training."
  },
  {
    title: "5. Code of Conduct & Gym Rules",
    text: "Clients must follow gym etiquette and respect safety guidelines. Coach Gineel N reserves the right to terminate training agreements without refund if a client exhibits disrespectful, unsafe, or disruptive behavior."
  }
];

export default function TermsPage() {
  const [agreed, setAgreed] = useState({
    refunds: false,
    cancels: false,
    health: false
  });
  const [signedName, setSignedName] = useState("");
  const [accepted, setAccepted] = useState(false);

  const allAgreed = agreed.refunds && agreed.cancels && agreed.health && signedName.trim().length > 2;

  const handleAccept = (e: React.FormEvent) => {
    e.preventDefault();
    if (!allAgreed) {
      toast.error("Please read the terms, check all boxes, and sign your name.");
      return;
    }
    setAccepted(true);
    toast.success("Terms accepted successfully!");
  };

  return (
    <div className="pt-20 min-h-screen bg-[#0A0A0A] text-white flex flex-col justify-between">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 w-full flex-1">
        
        {/* Header */}
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <div className="h-px w-12 bg-[#FF6B00]" />
            <span className="text-[#FF6B00] font-bold uppercase tracking-[0.3em] text-xs font-body">Agreement &amp; Rules</span>
          </div>
          <h1 className="font-heading text-5xl md:text-7xl uppercase text-white leading-none">
            TRAINING TERMS &amp;
          </h1>
          <h1 className="font-heading text-5xl md:text-7xl uppercase text-[#FF6B00] leading-none">
            CONDITIONS
          </h1>
          <div className="h-1 w-16 bg-[#FF6B00] mt-4 mb-6" />
          <p className="text-white/60 max-w-2xl font-body text-sm leading-relaxed">
            Please read these terms carefully before starting your program. Engaging our personalized training services implies acceptance of the following policies.
          </p>
        </div>

        {accepted ? (
          <div className="bg-[#111111] border border-green-500/30 p-8 md:p-12 text-center max-w-xl mx-auto my-8 shadow-2xl">
            <div className="w-20 h-20 bg-green-500/10 border border-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <IconCircleCheck size={40} className="text-green-500" />
            </div>
            <h2 className="font-heading text-3xl uppercase mb-2">Terms Accepted</h2>
            <p className="text-white/60 font-body text-sm leading-relaxed mb-6">
              Thank you, {signedName}. You have officially agreed to the Elite Edge Fitness training terms and conditions. A digital record has been logged. Let&apos;s build your dream physique!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="/plans" className="bg-[#FF6B00] text-white font-body font-bold text-xs uppercase tracking-widest px-8 py-4 hover:bg-[#E55A00] transition-colors">
                View Training Plans &rarr;
              </a>
              <button onClick={() => { setAccepted(false); setSignedName(""); setAgreed({ refunds: false, cancels: false, health: false }); }} className="border border-white/20 text-white font-body font-bold text-xs uppercase tracking-widest px-8 py-4 hover:bg-white/5 transition-colors">
                Reset Agreement
              </button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left side: Terms list */}
            <div className="lg:col-span-7 space-y-6">
              <div className="bg-[#111111] border border-white/10 p-6 md:p-8 space-y-6 shadow-xl">
                <h3 className="font-heading text-2xl uppercase border-b border-white/10 pb-4 mb-4 flex items-center gap-2">
                  <IconFileText className="text-[#FF6B00]" /> Gym Policies
                </h3>
                
                <div className="space-y-6">
                  {TERMS.map((t, i) => (
                    <div key={i} className="border-l-2 border-[#FF6B00]/40 pl-4 py-1 hover:border-[#FF6B00] transition-colors">
                      <h4 className="font-heading text-lg text-white uppercase mb-2">{t.title}</h4>
                      <p className="text-white/70 text-sm font-body leading-relaxed">{t.text}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Warning/Refund Box */}
              <div className="bg-[#FFF8F4] border border-[#FF6B00]/20 p-5 flex gap-4">
                <IconAlertCircle size={24} className="text-[#FF6B00] flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[#FF6B00] mb-1 font-body">Critical Notice: Non-Refundable</h4>
                  <p className="text-white/60 text-xs font-body leading-normal">
                    Elite Edge Fitness enforces a strict <strong>No Refund policy</strong>. Payments made for training packages cannot be reversed, transfered, or refunded for any reason.
                  </p>
                </div>
              </div>
            </div>

            {/* Right side: Image collage & interactive Sign-off */}
            <div className="lg:col-span-5 space-y-6">
              
              {/* Visual Card showing Split and Calisthenics Poster */}
              <div className="bg-[#111111] border border-white/10 overflow-hidden shadow-xl grid grid-cols-2 gap-0.5">
                <div className="relative aspect-square">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/split-flag.jpg"
                    alt="Coach Gineel Split"
                    className="absolute inset-0 w-full h-full object-cover object-center"
                  />
                  <div className="absolute inset-0 bg-[#0A0A0A]/20 hover:bg-transparent transition-colors duration-300" />
                </div>
                <div className="relative aspect-square">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/elite-level-fitness.jpg"
                    alt="Elite level fitness poster"
                    className="absolute inset-0 w-full h-full object-cover object-top"
                  />
                  <div className="absolute inset-0 bg-[#0A0A0A]/20 hover:bg-transparent transition-colors duration-300" />
                </div>
              </div>

              {/* Accept terms interactive box */}
              <form onSubmit={handleAccept} className="bg-[#111111] border border-white/10 p-6 shadow-xl space-y-4">
                <h3 className="font-heading text-xl uppercase text-[#FF6B00] mb-2 flex items-center gap-2">
                  <IconLock size={18} /> Digital Signature
                </h3>
                
                <div className="space-y-3">
                  <label className="flex items-start gap-3 text-xs font-body text-white/75 hover:text-white cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={agreed.refunds}
                      onChange={e => setAgreed(prev => ({ ...prev, refunds: e.target.checked }))}
                      className="mt-0.5 accent-[#FF6B00]"
                    />
                    <span>I understand and agree to the <strong>No Refund Policy</strong>. All sales are final.</span>
                  </label>

                  <label className="flex items-start gap-3 text-xs font-body text-white/75 hover:text-white cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={agreed.cancels}
                      onChange={e => setAgreed(prev => ({ ...prev, cancels: e.target.checked }))}
                      className="mt-0.5 accent-[#FF6B00]"
                    />
                    <span>I agree to the 24-hour cancellation and rescheduling policies.</span>
                  </label>

                  <label className="flex items-start gap-3 text-xs font-body text-white/75 hover:text-white cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={agreed.health}
                      onChange={e => setAgreed(prev => ({ ...prev, health: e.target.checked }))}
                      className="mt-0.5 accent-[#FF6B00]"
                    />
                    <span>I confirm I have completed the PAR-Q and assume physical responsibility.</span>
                  </label>
                </div>

                <div className="pt-2">
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-white/55 mb-1.5 font-body">Sign Name (Type Full Name) *</label>
                  <input
                    required
                    type="text"
                    value={signedName}
                    onChange={e => setSignedName(e.target.value)}
                    placeholder="Type name to sign"
                    className="w-full bg-[#1A1A1A] border border-white/10 px-4 py-2.5 text-xs focus:outline-none focus:border-[#FF6B00] transition-colors text-white font-body"
                  />
                </div>

                <button
                  type="submit"
                  disabled={!allAgreed}
                  className={`w-full py-3.5 text-xs font-bold uppercase tracking-widest transition-all font-body ${allAgreed ? "bg-[#FF6B00] text-white hover:bg-[#E55A00]" : "bg-white/5 text-white/25 cursor-not-allowed border border-white/5"}`}
                >
                  I Accept Training Terms &rarr;
                </button>
              </form>
            </div>

          </div>
        )}

      </div>
    </div>
  );
}
