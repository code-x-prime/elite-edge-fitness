"use client";

import { useState } from "react";
import { IconShieldCheck, IconAlertCircle, IconArrowRight, IconHeartCode } from "@tabler/icons-react";
import toast from "react-hot-toast";

const QUESTIONS = [
  { id: "q1", text: "Has your doctor ever said that you have a heart condition and that you should only do physical activity recommended by a doctor?" },
  { id: "q2", text: "Do you feel pain in your chest when you perform physical activity?" },
  { id: "q3", text: "In the past month, have you had chest pain when you were not performing physical activity?" },
  { id: "q4", text: "Do you lose your balance because of dizziness or do you ever lose consciousness?" },
  { id: "q5", text: "Do you have a bone or joint problem (e.g. back, knee, hip) that could be made worse by a change in your physical activity?" },
  { id: "q6", text: "Is your doctor currently prescribing drugs (for example, water pills) for your blood pressure or heart condition?" },
  { id: "q7", text: "Do you know of any other reason why you should not perform physical activity?" },
];

export default function ParQPage() {
  const [answers, setAnswers] = useState<Record<string, boolean | null>>({
    q1: null, q2: null, q3: null, q4: null, q5: null, q6: null, q7: null,
  });
  const [submitted, setSubmitted] = useState(false);
  const [clientName, setClientName] = useState("");
  const [clientEmail, setClientEmail] = useState("");

  const handleSelect = (qId: string, value: boolean) => {
    setAnswers(prev => ({ ...prev, [qId]: value }));
  };

  const allAnswered = Object.values(answers).every(val => val !== null);
  const hasYes = Object.values(answers).some(val => val === true);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!allAnswered) {
      toast.error("Please answer all questions before submitting.");
      return;
    }
    if (!clientName || !clientEmail) {
      toast.error("Please fill in your name and email.");
      return;
    }
    setSubmitted(true);
    toast.success("PAR-Q Submitted Successfully!");
  };

  return (
    <div className="pt-20 min-h-screen bg-[#0A0A0A] text-white flex flex-col justify-between">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 w-full flex-1">
        
        {/* Header */}
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <div className="h-px w-12 bg-[#FF6B00]" />
            <span className="text-[#FF6B00] font-bold uppercase tracking-[0.3em] text-xs font-body">Health &amp; Safety</span>
          </div>
          <h1 className="font-heading text-5xl md:text-7xl uppercase text-white leading-none">
            PHYSICAL ACTIVITY
          </h1>
          <h1 className="font-heading text-5xl md:text-7xl uppercase text-[#FF6B00] leading-none">
            READINESS (PAR-Q)
          </h1>
          <div className="h-1 w-16 bg-[#FF6B00] mt-4 mb-6" />
          <p className="text-white/60 max-w-2xl font-body text-sm leading-relaxed">
            Prioritize your safety. The PAR-Q is a standard screening tool to determine if you are ready to begin an intense physical training program. Please answer honestly.
          </p>
        </div>

        {submitted ? (
          <div className="bg-[#111111] border border-[#FF6B00]/30 p-8 md:p-12 text-center max-w-2xl mx-auto my-8 shadow-2xl">
            <div className="w-20 h-20 bg-[#FF6B00]/10 border border-[#FF6B00] rounded-full flex items-center justify-center mx-auto mb-6">
              {hasYes ? (
                <IconAlertCircle size={40} className="text-amber-500 animate-pulse" />
              ) : (
                <IconShieldCheck size={40} className="text-[#FF6B00]" />
              )}
            </div>
            <h2 className="font-heading text-3xl uppercase mb-4">
              {hasYes ? "Doctor's Approval Recommended" : "You are Good to Go!"}
            </h2>
            <p className="text-white/60 font-body text-sm leading-relaxed mb-6">
              {hasYes ? (
                "Since you answered 'YES' to one or more questions, we strongly recommend you consult with your physician before beginning any physical activity. Please obtain a medical clearance note to submit to Coach Gineel."
              ) : (
                "Thank you for completing the PAR-Q, " + clientName + ". Your screening indicates that you are physically ready to embark on your fitness journey with Elite Edge Fitness!"
              )}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="/plans" className="bg-[#FF6B00] text-white font-body font-bold text-xs uppercase tracking-widest px-8 py-4 hover:bg-[#E55A00] transition-colors">
                View Training Plans &rarr;
              </a>
              <button onClick={() => { setSubmitted(false); setAnswers({ q1: null, q2: null, q3: null, q4: null, q5: null, q6: null, q7: null }); }} className="border border-white/20 text-white font-body font-bold text-xs uppercase tracking-widest px-8 py-4 hover:bg-white/5 transition-colors">
                Retake Questionnaire
              </button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left side: Form */}
            <form onSubmit={handleSubmit} className="lg:col-span-8 bg-[#111111] border border-white/10 p-6 md:p-8 space-y-6 shadow-xl">
              <h3 className="font-heading text-2xl uppercase border-b border-white/10 pb-4 mb-4 flex items-center gap-2">
                <IconHeartCode className="text-[#FF6B00]" /> Screen Questionnaire
              </h3>

              {/* Client Info */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-white/55 mb-2 font-body">Full Name *</label>
                  <input
                    required
                    type="text"
                    value={clientName}
                    onChange={e => setClientName(e.target.value)}
                    placeholder="Enter your name"
                    className="w-full bg-[#1A1A1A] border border-white/10 px-4 py-3 text-sm focus:outline-none focus:border-[#FF6B00] transition-colors text-white font-body"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-white/55 mb-2 font-body">Email Address *</label>
                  <input
                    required
                    type="email"
                    value={clientEmail}
                    onChange={e => setClientEmail(e.target.value)}
                    placeholder="name@email.com"
                    className="w-full bg-[#1A1A1A] border border-white/10 px-4 py-3 text-sm focus:outline-none focus:border-[#FF6B00] transition-colors text-white font-body"
                  />
                </div>
              </div>

              {/* Questions Loop */}
              <div className="space-y-4">
                {QUESTIONS.map((q, i) => (
                  <div key={q.id} className="p-4 bg-[#1A1A1A] border border-white/5 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 transition-all hover:border-white/15">
                    <div className="flex-1">
                      <p className="text-sm font-body leading-relaxed text-white/90">
                        <span className="text-[#FF6B00] font-bold mr-2">{i + 1}.</span>
                        {q.text}
                      </p>
                    </div>
                    <div className="flex gap-2 w-full md:w-auto">
                      <button
                        type="button"
                        onClick={() => handleSelect(q.id, true)}
                        className={`flex-1 md:flex-initial px-5 py-2 text-xs font-bold uppercase tracking-widest border transition-all font-body ${answers[q.id] === true ? "bg-[#FF6B00] border-[#FF6B00] text-white" : "border-white/10 text-white/60 hover:border-white/20 hover:text-white"}`}
                      >
                        Yes
                      </button>
                      <button
                        type="button"
                        onClick={() => handleSelect(q.id, false)}
                        className={`flex-1 md:flex-initial px-5 py-2 text-xs font-bold uppercase tracking-widest border transition-all font-body ${answers[q.id] === false ? "bg-[#FF6B00] border-[#FF6B00] text-white" : "border-white/10 text-white/60 hover:border-white/20 hover:text-white"}`}
                      >
                        No
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <div className="pt-4 border-t border-white/10">
                <button
                  type="submit"
                  disabled={!allAnswered}
                  className={`w-full flex items-center justify-center gap-3 py-4 text-xs font-bold uppercase tracking-widest transition-all font-body ${allAnswered ? "bg-[#FF6B00] text-white hover:bg-[#E55A00]" : "bg-white/5 text-white/25 cursor-not-allowed border border-white/5"}`}
                >
                  Submit PAR-Q Status <IconArrowRight size={16} />
                </button>
              </div>
            </form>

            {/* Right side: Visual Poster Card */}
            <div className="lg:col-span-4 space-y-6">
              <div className="bg-[#111111] border border-white/10 overflow-hidden shadow-xl">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/training-plan-illus.png"
                  alt="Training Plan Clipboard"
                  className="w-full h-auto object-cover border-b border-white/10"
                />
                <div className="p-6">
                  <h4 className="font-heading text-xl uppercase text-[#FF6B00] mb-2">Safety Policy</h4>
                  <p className="text-white/60 font-body text-xs leading-relaxed mb-4">
                    Before joining personal training or group calisthenics sessions, completing this physical activity questionnaire is mandatory. If you experience pain, dizziness, or shortness of breath, please discontinue exercise immediately.
                  </p>
                  <p className="text-[10px] text-white/30 font-body">
                    Elite Edge Fitness &copy; 2026. Safety-First Fitness Transformation.
                  </p>
                </div>
              </div>

              {/* Disclaimer card */}
              <div className="bg-amber-500/5 border border-amber-500/20 p-5 rounded-sm">
                <div className="flex gap-3 items-start">
                  <IconAlertCircle size={20} className="text-amber-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-amber-500 font-body mb-1">Disclaimer</h4>
                    <p className="text-white/60 text-xs font-body leading-normal">
                      The advice, workout programs, and nutrition templates provided are designed for informational purposes. Consult your medical practitioner before embarking on new routines.
                    </p>
                  </div>
                </div>
              </div>
            </div>

          </div>
        )}

      </div>
    </div>
  );
}
