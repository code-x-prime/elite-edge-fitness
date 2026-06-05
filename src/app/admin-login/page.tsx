"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { IconEye, IconEyeOff, IconLock, IconMail } from "@tabler/icons-react";

export default function AdminLoginPage() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [showPass, setShowPass] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const res = await signIn("credentials", {
      redirect: false,
      email: form.email,
      password: form.password,
    });
    setLoading(false);
    if (res?.ok) {
      toast.success("Welcome back!");
      router.push("/admin");
    } else {
      toast.error("Invalid credentials");
    }
  };

  return (
    <div className="min-h-screen bg-[#0A0A0A] flex">
      {/* Left — branding panel */}
      <div className="hidden lg:flex flex-col justify-between w-[45%] bg-[#111111] border-r border-[#1F1F1F] p-12 relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.03] pointer-events-none"
          style={{
            backgroundImage: `linear-gradient(#FF6B00 1px, transparent 1px), linear-gradient(90deg, #FF6B00 1px, transparent 1px)`,
            backgroundSize: "60px 60px",
          }}
        />
        <div
          className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full opacity-10 blur-[100px] pointer-events-none"
          style={{ background: "radial-gradient(circle, #FF6B00, transparent)" }}
        />

        <div className="relative z-10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-[#FF6B00] flex items-center justify-center">
              <span className="font-heading text-white text-lg">EE</span>
            </div>
            <span className="font-heading text-xl text-white tracking-widest uppercase">
              Elite<span className="text-[#FF6B00]">Edge</span>
            </span>
          </div>
        </div>

        <div className="relative z-10">
          <h1 className="font-heading text-6xl text-white leading-none uppercase mb-4">
            ADMIN<br />
            <span className="text-[#FF6B00]">PANEL</span>
          </h1>
          <p className="text-white/40 font-body text-sm leading-relaxed max-w-xs">
            Manage plans, orders, gallery, and all site content from one place.
          </p>
        </div>

        <div className="relative z-10">
          <p className="text-white/20 text-xs font-body">&copy; 2026 Elite Edge Fitness</p>
        </div>
      </div>

      {/* Right — login form */}
      <div className="flex-1 flex items-center justify-center p-6 relative">
        <div className="absolute top-6 left-6 flex items-center gap-2 lg:hidden">
          <div className="w-8 h-8 bg-[#FF6B00] flex items-center justify-center">
            <span className="font-heading text-white text-sm">EE</span>
          </div>
          <span className="font-heading text-lg text-white tracking-widest uppercase">
            Elite<span className="text-[#FF6B00]">Edge</span>
          </span>
        </div>

        <div className="w-full max-w-sm">
          <div className="mb-10">
            <p className="text-[#FF6B00] text-xs font-body font-bold uppercase tracking-[0.3em] mb-3">
              / Admin Access
            </p>
            <h2 className="font-heading text-5xl text-white uppercase leading-none">SIGN IN</h2>
            <div className="h-1 w-12 bg-[#FF6B00] mt-4" />
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-xs font-bold uppercase tracking-widest text-[#666] mb-2 font-body">Email</label>
              <div className="relative">
                <IconMail size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#444]" stroke={1.5}/>
                <input
                  type="email" required
                  value={form.email}
                  onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                  className="w-full bg-[#1A1A1A] border border-[#2A2A2A] text-white pl-11 pr-4 py-3.5 text-sm font-body focus:outline-none focus:border-[#FF6B00] transition-colors placeholder-[#444]"
                  placeholder="admin@eliteedgefitness.in"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-widest text-[#666] mb-2 font-body">Password</label>
              <div className="relative">
                <IconLock size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#444]" stroke={1.5}/>
                <input
                  type={showPass ? "text" : "password"} required
                  value={form.password}
                  onChange={e => setForm(f => ({ ...f, password: e.target.value }))}
                  className="w-full bg-[#1A1A1A] border border-[#2A2A2A] text-white pl-11 pr-12 py-3.5 text-sm font-body focus:outline-none focus:border-[#FF6B00] transition-colors placeholder-[#444]"
                  placeholder="••••••••"
                />
                <button type="button" onClick={() => setShowPass(s => !s)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-[#555] hover:text-[#FF6B00] transition-colors">
                  {showPass ? <IconEyeOff size={16}/> : <IconEye size={16}/>}
                </button>
              </div>
            </div>

            <button type="submit" disabled={loading}
              className="w-full bg-[#FF6B00] text-white font-body font-black text-sm uppercase tracking-widest py-4 hover:bg-[#E55A00] disabled:opacity-50 transition-colors mt-2">
              {loading ? "Signing in..." : "Sign In →"}
            </button>
          </form>

          <div className="mt-8 p-4 bg-[#1A1A1A] border border-[#2A2A2A]">
            <p className="text-[#555] text-xs font-body leading-relaxed">
              <span className="text-[#666] font-bold block mb-1">&#128274; Admin access only.</span>
              Contact the developer to reset credentials.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
