"use client";

import { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  IconUser, IconShoppingCart, IconDownload,
  IconMapPin, IconPackage, IconLogout, IconBarbell, IconEye, IconEyeOff,
} from "@tabler/icons-react";
import toast from "react-hot-toast";

interface Order {
  id: string;
  amount: number;
  status: string;
  createdAt: string;
  downloadToken?: string | null;
  plan?: { name: string; type: string } | null;
  product?: { name: string } | null;
}

interface UserData {
  id: string;
  name: string;
  email: string;
  phone?: string | null;
  addresses: { id: string; fullName: string; city: string; state: string; pincode: string; isDefault: boolean }[];
  orders: Order[];
}

type Tab = "orders" | "plans" | "products" | "addresses";
type AuthMode = "login" | "register";

function statusBadge(s: string) {
  const map: Record<string, string> = {
    paid: "bg-green-100 text-green-700",
    pending: "bg-yellow-100 text-yellow-700",
    failed: "bg-red-100 text-red-600",
    demo: "bg-blue-100 text-blue-600",
  };
  return map[s] ?? "bg-gray-100 text-gray-600";
}

function ProfileAuth({ onLogin }: { onLogin: (user: UserData) => void }) {
  const [mode, setMode] = useState<AuthMode>("login");
  const [form, setForm] = useState({ name: "", email: "", phone: "", password: "", confirm: "" });
  const [loading, setLoading] = useState(false);
  const [showPass, setShowPass] = useState(false);

  const inp = "w-full border border-[#E8E8E8] px-4 py-3 text-sm focus:outline-none focus:border-[#FF6B00] font-body transition-colors";
  const lbl = "block text-xs font-bold uppercase tracking-widest text-[#0A0A0A] mb-2 font-body";

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (mode === "register") {
      if (form.password.length < 8) { toast.error("Password must be 8+ characters"); return; }
      if (form.password !== form.confirm) { toast.error("Passwords don't match"); return; }
    }
    setLoading(true);
    const endpoint = mode === "login" ? "/api/user/login" : "/api/user/register";
    const body = mode === "login"
      ? { email: form.email, password: form.password }
      : { name: form.name, email: form.email, phone: form.phone, password: form.password };

    const res = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    const data = await res.json();
    setLoading(false);

    if (!res.ok) { toast.error(data.error || "Failed"); return; }

    toast.success(mode === "login" ? "Welcome back!" : "Account created!");
    // Fetch full profile
    const meRes = await fetch("/api/me");
    const me = await meRes.json();
    if (me) onLogin(me);
  };

  return (
    <div className="max-w-md mx-auto pt-12 px-4">
      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-[#FF6B00]/10 border border-[#FF6B00]/30 flex items-center justify-center mx-auto mb-4">
          <IconUser size={30} className="text-[#FF6B00]" stroke={1.5}/>
        </div>
        <h2 className="font-heading text-4xl uppercase text-[#0A0A0A]">
          {mode === "login" ? "Welcome Back" : "Create Account"}
        </h2>
        <p className="text-[#666] text-sm font-body mt-2">
          {mode === "login" ? "Login to view your orders and plans" : "Register to track your orders and downloads"}
        </p>
      </div>

      {/* Mode toggle */}
      <div className="flex mb-6 border border-[#E8E8E8]">
        {(["login","register"] as AuthMode[]).map(m => (
          <button key={m} onClick={() => setMode(m)}
            className={`flex-1 py-3 text-xs font-bold uppercase tracking-widest font-body transition-colors ${mode === m ? "bg-[#FF6B00] text-white" : "text-[#666] hover:text-[#0A0A0A]"}`}>
            {m === "login" ? "Login" : "Register"}
          </button>
        ))}
      </div>

      <form onSubmit={submit} className="space-y-4">
        {mode === "register" && (
          <>
            <div>
              <label className={lbl}>Full Name *</label>
              <input required value={form.name} onChange={e => setForm(f => ({...f, name: e.target.value}))} className={inp} placeholder="Your full name"/>
            </div>
            <div>
              <label className={lbl}>Phone</label>
              <input value={form.phone} onChange={e => setForm(f => ({...f, phone: e.target.value}))} className={inp} placeholder="+91 XXXXXXXXXX"/>
            </div>
          </>
        )}
        <div>
          <label className={lbl}>Email *</label>
          <input required type="email" value={form.email} onChange={e => setForm(f => ({...f, email: e.target.value}))} className={inp} placeholder="your@email.com"/>
        </div>
        <div className="relative">
          <label className={lbl}>Password * {mode === "register" && <span className="text-[#999] font-normal">(min 8 characters)</span>}</label>
          <input required type={showPass ? "text" : "password"} minLength={mode === "register" ? 8 : 1} value={form.password} onChange={e => setForm(f => ({...f, password: e.target.value}))} className={`${inp} pr-12`} placeholder="••••••••"/>
          <button type="button" onClick={() => setShowPass(s => !s)} className="absolute right-3 top-8 text-[#999] hover:text-[#FF6B00]">
            {showPass ? <IconEyeOff size={18}/> : <IconEye size={18}/>}
          </button>
        </div>
        {mode === "register" && (
          <div>
            <label className={lbl}>Confirm Password *</label>
            <input required type="password" value={form.confirm} onChange={e => setForm(f => ({...f, confirm: e.target.value}))} className={inp} placeholder="Repeat password"/>
          </div>
        )}
        <button type="submit" disabled={loading}
          className="w-full bg-[#FF6B00] text-white text-xs font-bold uppercase tracking-widest py-4 hover:bg-[#E55A00] disabled:opacity-50 transition-colors font-body">
          {loading ? "Please wait..." : mode === "login" ? "Login" : "Create Account"}
        </button>
      </form>

      {mode === "login" && (
        <p className="text-center text-xs text-[#999] font-body mt-4">
          No account yet? <button onClick={() => setMode("register")} className="text-[#FF6B00] font-bold hover:underline">Register here</button>
        </p>
      )}
      <p className="text-center text-xs text-[#999] font-body mt-3">
        New to Elite Edge? <Link href="/plans" className="text-[#FF6B00] font-bold hover:underline">Browse plans</Link>
      </p>
    </div>
  );
}

function ProfileDashboard({ user, onLogout }: { user: UserData; onLogout: () => void }) {
  const [tab, setTab] = useState<Tab>("orders");

  const paidPlans = user.orders.filter(o => o.plan && o.status === "paid");
  const paidProducts = user.orders.filter(o => o.product && o.status === "paid");

  const TABS = [
    { key: "orders" as Tab, label: "Orders", Icon: IconShoppingCart, count: user.orders.length },
    { key: "plans" as Tab, label: "My Plans", Icon: IconBarbell, count: paidPlans.length },
    { key: "products" as Tab, label: "Products", Icon: IconPackage, count: paidProducts.length },
    { key: "addresses" as Tab, label: "Addresses", Icon: IconMapPin, count: user.addresses.length },
  ];

  return (
    <div className="max-w-5xl mx-auto pt-8 pb-16 px-4 sm:px-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6 pb-6 border-b border-[#E8E8E8]">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-[#FF6B00] flex items-center justify-center font-heading text-white text-xl flex-shrink-0">
            {user.name.charAt(0).toUpperCase()}
          </div>
          <div>
            <h1 className="font-heading text-2xl uppercase text-[#0A0A0A]">{user.name}</h1>
            <p className="text-[#666] text-sm font-body">{user.email}</p>
            {user.phone && <p className="text-[#999] text-xs font-body">+91 {user.phone}</p>}
          </div>
        </div>
        <button onClick={onLogout} className="flex items-center gap-2 text-xs font-body font-bold uppercase tracking-widest text-[#999] hover:text-red-500 transition-colors">
          <IconLogout size={16} stroke={1.5}/>
          <span className="hidden sm:inline">Logout</span>
        </button>
      </div>

      {/* Tabs */}
      <div className="flex gap-0 border-b border-[#E8E8E8] mb-6 overflow-x-auto">
        {TABS.map(({ key, label, Icon, count }) => (
          <button key={key} onClick={() => setTab(key)}
            className={`flex items-center gap-1.5 px-4 sm:px-5 py-3.5 text-xs font-bold uppercase tracking-widest font-body whitespace-nowrap border-b-2 transition-colors ${tab === key ? "border-[#FF6B00] text-[#FF6B00]" : "border-transparent text-[#666] hover:text-[#0A0A0A]"}`}>
            <Icon size={14} stroke={1.5}/>
            {label}
            <span className={`text-[10px] px-1.5 py-0.5 font-bold ${tab === key ? "bg-[#FF6B00]/10 text-[#FF6B00]" : "bg-[#F4F4F4] text-[#999]"}`}>{count}</span>
          </button>
        ))}
      </div>

      {/* Orders */}
      {tab === "orders" && (
        <div className="bg-white border border-[#E8E8E8] overflow-hidden">
          {user.orders.length === 0 ? (
            <div className="p-12 text-center">
              <IconShoppingCart size={36} className="text-[#E8E8E8] mx-auto mb-3" stroke={1}/>
              <p className="font-heading text-xl uppercase text-[#CCC]">No orders yet</p>
              <Link href="/plans" className="inline-block mt-3 text-xs font-bold uppercase text-[#FF6B00] font-body hover:underline">Browse Plans</Link>
            </div>
          ) : (
            <div className="divide-y divide-[#F4F4F4]">
              {user.orders.map(order => (
                <div key={order.id} className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center gap-3">
                  <div className="flex items-center gap-3 flex-1 min-w-0">
                    {order.product ? <IconPackage size={18} className="text-[#FF6B00] flex-shrink-0" stroke={1.5}/> : <IconBarbell size={18} className="text-[#FF6B00] flex-shrink-0" stroke={1.5}/>}
                    <div className="min-w-0">
                      <p className="font-body font-semibold text-sm text-[#0A0A0A] truncate">{order.plan?.name ?? order.product?.name ?? "Order"}</p>
                      <p className="text-xs text-[#666] font-body">{new Date(order.createdAt).toLocaleDateString("en-IN")} &middot; <span className="font-bold text-[#FF6B00]">&#8377;{order.amount.toLocaleString("en-IN")}</span></p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 flex-shrink-0">
                    <span className={`text-xs font-bold uppercase tracking-wide px-2 py-1 ${statusBadge(order.status)}`}>{order.status}</span>
                    {order.downloadToken && order.status === "paid" && (
                      <a href={`/api/download/${order.downloadToken}`} className="flex items-center gap-1.5 bg-[#FF6B00] text-white text-xs font-bold uppercase px-3 py-1.5 hover:bg-[#E55A00] transition-colors font-body">
                        <IconDownload size={13} stroke={2}/> PDF
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Plans */}
      {tab === "plans" && (
        paidPlans.length === 0 ? (
          <div className="bg-white border border-[#E8E8E8] p-12 text-center">
            <IconBarbell size={36} className="text-[#E8E8E8] mx-auto mb-3" stroke={1}/>
            <p className="font-heading text-xl uppercase text-[#CCC]">No active plans</p>
            <Link href="/plans" className="inline-block mt-3 text-xs font-bold uppercase text-[#FF6B00] font-body hover:underline">Get a Plan</Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {paidPlans.map(o => (
              <div key={o.id} className="bg-white border-2 border-[#FF6B00]/40 overflow-hidden">
                <div className="bg-[#FF6B00] px-5 py-2.5">
                  <span className="font-heading text-sm text-white uppercase tracking-widest">Active Plan</span>
                </div>
                <div className="p-5">
                  <p className="font-heading text-2xl uppercase text-[#0A0A0A]">{o.plan!.name}</p>
                  <p className="text-xs text-[#666] font-body capitalize mt-1">{o.plan!.type} training</p>
                  <p className="font-heading text-2xl text-[#FF6B00] mt-3">&#8377;{o.amount.toLocaleString("en-IN")}</p>
                  <Link href="/contact" className="inline-block mt-4 text-xs font-bold uppercase text-[#FF6B00] font-body border-b border-[#FF6B00]/40 hover:border-[#FF6B00] pb-0.5">
                    Contact Coach &#x2192;
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )
      )}

      {/* Products */}
      {tab === "products" && (
        paidProducts.length === 0 ? (
          <div className="bg-white border border-[#E8E8E8] p-12 text-center">
            <IconPackage size={36} className="text-[#E8E8E8] mx-auto mb-3" stroke={1}/>
            <p className="font-heading text-xl uppercase text-[#CCC]">No products</p>
          </div>
        ) : (
          <div className="space-y-3">
            {paidProducts.map(o => (
              <div key={o.id} className="bg-white border border-[#E8E8E8] p-5 flex flex-col sm:flex-row sm:items-center gap-4 hover:border-[#FF6B00]/40 transition-colors">
                <div className="w-12 h-12 bg-[#FF6B00]/10 border border-[#FF6B00]/20 flex items-center justify-center flex-shrink-0">
                  <IconPackage size={20} className="text-[#FF6B00]" stroke={1.5}/>
                </div>
                <div className="flex-1">
                  <p className="font-body font-bold text-sm text-[#0A0A0A]">{o.product!.name}</p>
                  <p className="text-xs text-[#666] font-body mt-0.5">&#8377;{o.amount} &middot; {new Date(o.createdAt).toLocaleDateString("en-IN")}</p>
                </div>
                {o.downloadToken ? (
                  <a href={`/api/download/${o.downloadToken}`} className="flex items-center gap-2 bg-[#FF6B00] text-white text-xs font-bold uppercase px-5 py-3 hover:bg-[#E55A00] transition-colors font-body flex-shrink-0">
                    <IconDownload size={14} stroke={2}/> Download PDF
                  </a>
                ) : <span className="text-xs text-[#999] font-body">Contact support</span>}
              </div>
            ))}
          </div>
        )
      )}

      {/* Addresses */}
      {tab === "addresses" && (
        user.addresses.length === 0 ? (
          <div className="bg-white border border-[#E8E8E8] p-12 text-center">
            <IconMapPin size={36} className="text-[#E8E8E8] mx-auto mb-3" stroke={1}/>
            <p className="font-heading text-xl uppercase text-[#CCC]">No addresses</p>
            <p className="text-sm text-[#999] font-body mt-2">Saved automatically when you order.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {user.addresses.map(addr => (
              <div key={addr.id} className={`bg-white border-2 p-5 ${addr.isDefault ? "border-[#FF6B00]/50" : "border-[#E8E8E8]"}`}>
                {addr.isDefault && <span className="inline-block text-[10px] text-[#FF6B00] font-bold uppercase tracking-widest mb-2 bg-[#FF6B00]/10 px-2 py-0.5">Default</span>}
                <p className="font-body font-bold text-sm text-[#0A0A0A]">{addr.fullName}</p>
                <p className="text-xs text-[#666] font-body mt-1">{addr.city}, {addr.state} – {addr.pincode}</p>
              </div>
            ))}
          </div>
        )
      )}

      <div className="mt-8 pt-6 border-t border-[#E8E8E8] flex flex-col sm:flex-row gap-3">
        <Link href="/plans" className="flex-1 text-center bg-[#0A0A0A] text-white text-xs font-bold uppercase tracking-widest py-4 hover:bg-[#FF6B00] transition-colors font-body">Browse Plans</Link>
        <Link href="/contact" className="flex-1 text-center border border-[#E8E8E8] text-[#0A0A0A] text-xs font-bold uppercase tracking-widest py-4 hover:border-[#FF6B00] hover:text-[#FF6B00] transition-colors font-body">Contact Support</Link>
      </div>
    </div>
  );
}

function ProfileMain() {
  const router = useRouter();
  const [user, setUser] = useState<UserData | null>(null);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    fetch("/api/me")
      .then(r => r.json())
      .then(d => { if (d?.id) setUser(d); setChecking(false); })
      .catch(() => setChecking(false));
  }, []);

  const logout = async () => {
    await fetch("/api/user/logout", { method: "POST" });
    setUser(null);
    toast.success("Logged out");
    router.push("/");
  };

  if (checking) return (
    <div className="pt-20 max-w-4xl mx-auto px-4 space-y-4">
      {[1,2,3].map(i => <div key={i} className="h-16 bg-[#F4F4F4] animate-pulse"/>)}
    </div>
  );

  return user
    ? <ProfileDashboard user={user} onLogout={logout}/>
    : <ProfileAuth onLogin={setUser}/>;
}

export default function ProfilePage() {
  return (
    <div className="min-h-screen bg-white pt-16 md:pt-20">
      <Suspense fallback={<div className="pt-20 text-center text-[#666] font-body">Loading...</div>}>
        <ProfileMain/>
      </Suspense>
    </div>
  );
}
