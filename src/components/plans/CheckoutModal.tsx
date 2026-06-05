"use client";

import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { Button } from "@/components/ui/button";
import { INDIAN_STATES } from "@/lib/indianStates";
import { IconEye, IconEyeOff } from "@tabler/icons-react";

interface Plan {
  id: string;
  name: string;
  price: number;
  duration: string;
}

interface Address {
  id: string;
  fullName: string;
  phone: string;
  line1: string;
  line2?: string | null;
  city: string;
  state: string;
  pincode: string;
  isDefault: boolean;
}

interface LoggedUser {
  id: string;
  name: string;
  email: string;
}

interface CheckoutModalProps {
  plan: Plan;
  onClose: () => void;
}

declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    Razorpay: any;
  }
}

type Step = "contact" | "address" | "pay";

const EMPTY_ADDR = { fullName: "", phone: "", line1: "", line2: "", city: "", state: "Maharashtra", pincode: "" };

export default function CheckoutModal({ plan, onClose }: CheckoutModalProps) {
  const [step, setStep] = useState<Step>("contact");
  const [loading, setLoading] = useState(false);

  // Session
  const [loggedUser, setLoggedUser] = useState<LoggedUser | null>(null);
  const [sessionChecked, setSessionChecked] = useState(false);

  // Contact form
  const [contact, setContact] = useState({ name: "", email: "", phone: "", password: "", confirmPassword: "" });
  const [isReturning, setIsReturning] = useState(false); // login mode vs register
  const [showPass, setShowPass] = useState(false);
  const [emailChecked, setEmailChecked] = useState(false);

  // Address
  const [savedAddresses, setSavedAddresses] = useState<Address[]>([]);
  const [selectedAddressId, setSelectedAddressId] = useState<string | null>(null);
  const [addingNew, setAddingNew] = useState(false);
  const [newAddress, setNewAddress] = useState(EMPTY_ADDR);

  // Check session on mount
  useEffect(() => {
    fetch("/api/me")
      .then(r => r.json())
      .then(data => {
        if (data?.id) {
          setLoggedUser(data);
          setContact(c => ({ ...c, name: data.name, email: data.email }));
        }
        setSessionChecked(true);
      })
      .catch(() => setSessionChecked(false));
  }, []);

  // Check if email exists when user types it
  const checkEmail = async () => {
    if (!contact.email || emailChecked) return;
    const res = await fetch(`/api/me?email=${encodeURIComponent(contact.email)}`);
    const data = await res.json();
    if (data?.password) {
      setIsReturning(true); // has account with password → login mode
    } else {
      setIsReturning(false);
    }
    setEmailChecked(true);
    if (data?.name && !contact.name) setContact(c => ({ ...c, name: data.name }));
    if (data?.addresses?.length > 0) {
      setSavedAddresses(data.addresses);
      const def = data.addresses.find((a: Address) => a.isDefault);
      if (def) setSelectedAddressId(def.id);
    }
  };

  // Load addresses after contact step
  const loadAddresses = async () => {
    const res = await fetch(`/api/user/addresses?email=${encodeURIComponent(contact.email)}`);
    if (!res.ok) return;
    const data: Address[] = await res.json();
    setSavedAddresses(data);
    const def = data.find(a => a.isDefault);
    if (def) setSelectedAddressId(def.id);
    if (data.length === 0) setAddingNew(true);
  };

  const handleContactNext = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isReturning) {
      // Login existing user
      setLoading(true);
      const res = await fetch("/api/user/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: contact.email, password: contact.password }),
      });
      const data = await res.json();
      setLoading(false);
      if (!res.ok) { toast.error(data.error || "Login failed"); return; }
      setLoggedUser(data.user);
      toast.success("Logged in!");
    } else {
      // New user — validate password
      if (!loggedUser) {
        if (contact.password.length < 8) { toast.error("Password must be 8+ characters"); return; }
        if (contact.password !== contact.confirmPassword) { toast.error("Passwords don't match"); return; }
      }
    }
    await loadAddresses();
    setStep("address");
  };

  const handleAddressSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("/api/user/addresses", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: contact.email, name: contact.name, phone: contact.phone, address: newAddress }),
      });
      if (!res.ok) { const err = await res.json(); toast.error(err.error || "Failed"); return; }
      const saved: Address = await res.json();
      setSavedAddresses(p => [...p, saved]);
      setSelectedAddressId(saved.id);
      setAddingNew(false);
    } catch { toast.error("Failed to save address"); }
    setLoading(false);
  };

  const handlePay = async () => {
    if (!selectedAddressId) { toast.error("Select a delivery address"); return; }
    setLoading(true);
    try {
      const res = await fetch("/api/payment/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          planId: plan.id,
          name: contact.name, email: contact.email, phone: contact.phone,
          addressId: selectedAddressId,
          password: (!loggedUser && !isReturning && contact.password) ? contact.password : undefined,
        }),
      });
      const data = await res.json();

      if (data.demo || !data.razorpayOrderId || !data.keyId) {
        toast.success("Order created! Complete payment via the options below.");
        onClose();
        window.location.href = "/payments";
        return;
      }

      const options = {
        key: data.keyId,
        amount: data.amount, currency: "INR",
        name: "Elite Edge Fitness", description: plan.name,
        order_id: data.razorpayOrderId,
        handler: async (response: { razorpay_payment_id: string; razorpay_order_id: string; razorpay_signature: string }) => {
          const verify = await fetch("/api/payment/verify", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ ...response, orderId: data.orderId }),
          });
          const result = await verify.json();
          if (result.success) {
            toast.success("Payment successful! Check your email.");
            onClose();
            window.location.href = "/profile";
          } else {
            toast.error("Verification failed. Contact support.");
          }
        },
        prefill: { name: contact.name, email: contact.email, contact: contact.phone },
        theme: { color: "#FF6B00" },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch { toast.error("Something went wrong. Try again."); }
    setLoading(false);
  };

  const inp = "w-full border border-[#E5E5E5] px-4 py-3 text-sm focus:outline-none focus:border-[#FF6B00] transition-colors font-body";
  const lbl = "block text-xs font-bold uppercase tracking-widest text-[#0A0A0A] mb-1.5 font-body";

  const selectedAddress = savedAddresses.find(a => a.id === selectedAddressId);
  const displayEmail = loggedUser?.email || contact.email;

  if (!sessionChecked) return null;

  return (
    <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4 overflow-y-auto" onClick={onClose}>
      <div className="bg-white w-full max-w-lg shadow-2xl my-4" onClick={e => e.stopPropagation()}>

        {/* Header */}
        <div className="bg-gradient-to-r from-[#FF6B00] to-[#FF8C42] p-5 flex items-center justify-between">
          <div>
            <p className="text-[#0A0A0A] font-black text-xs uppercase tracking-widest font-body">
              {step === "contact" ? "Step 1/3 — Account" : step === "address" ? "Step 2/3 — Address" : "Step 3/3 — Payment"}
            </p>
            <p className="font-heading text-2xl uppercase text-[#0A0A0A]">{plan.name}</p>
          </div>
          <div className="text-right">
            <p className="font-heading text-3xl text-[#0A0A0A]">&#8377;{plan.price.toLocaleString("en-IN")}</p>
            <p className="text-[#0A0A0A]/60 text-xs font-body">/{plan.duration}</p>
          </div>
        </div>

        {/* Progress */}
        <div className="flex h-1">
          {(["contact","address","pay"] as Step[]).map((s, i) => (
            <div key={s} className={`flex-1 transition-colors duration-300 ${["contact","address","pay"].indexOf(step) >= i ? "bg-[#FF6B00]" : "bg-[#E5E5E5]"}`}/>
          ))}
        </div>

        {/* ── STEP 1: Contact / Account ── */}
        {step === "contact" && (
          <form onSubmit={handleContactNext} className="p-6 space-y-4">
            {loggedUser ? (
              <div className="bg-green-50 border border-green-200 px-4 py-3 flex items-center justify-between">
                <div>
                  <p className="text-sm font-body font-bold text-green-800">{loggedUser.name}</p>
                  <p className="text-xs text-green-600 font-body">{loggedUser.email}</p>
                </div>
                <span className="text-xs font-bold uppercase tracking-widest text-green-600 font-body">Logged In</span>
              </div>
            ) : (
              <>
                <div>
                  <label className={lbl}>Full Name *</label>
                  <input required value={contact.name} onChange={e => setContact(c => ({ ...c, name: e.target.value }))} className={inp} placeholder="Your full name" />
                </div>
                <div>
                  <label className={lbl}>Email *</label>
                  <input required type="email" value={contact.email}
                    onChange={e => { setContact(c => ({ ...c, email: e.target.value })); setEmailChecked(false); }}
                    onBlur={checkEmail}
                    className={inp} placeholder="your@email.com" />
                </div>

                {emailChecked && isReturning ? (
                  <div className="bg-blue-50 border border-blue-200 px-4 py-3">
                    <p className="text-xs font-body text-blue-700 font-bold mb-3">Account found! Enter your password to login.</p>
                    <div className="relative">
                      <label className={lbl}>Password *</label>
                      <input required type={showPass ? "text" : "password"} value={contact.password}
                        onChange={e => setContact(c => ({ ...c, password: e.target.value }))}
                        className={`${inp} pr-12`} placeholder="Your password" />
                      <button type="button" onClick={() => setShowPass(s => !s)} className="absolute right-3 top-8 text-[#999]">
                        {showPass ? <IconEyeOff size={18}/> : <IconEye size={18}/>}
                      </button>
                    </div>
                  </div>
                ) : emailChecked ? (
                  <>
                    <div className="bg-[#FFF8F4] border border-[#FF6B00]/20 px-4 py-3">
                      <p className="text-xs font-body text-[#FF6B00] font-bold">New account — set a password to track your orders.</p>
                    </div>
                    <div className="relative">
                      <label className={lbl}>Create Password * (min 8 chars)</label>
                      <input required type={showPass ? "text" : "password"} minLength={8} value={contact.password}
                        onChange={e => setContact(c => ({ ...c, password: e.target.value }))}
                        className={`${inp} pr-12`} placeholder="Min 8 characters" />
                      <button type="button" onClick={() => setShowPass(s => !s)} className="absolute right-3 top-8 text-[#999]">
                        {showPass ? <IconEyeOff size={18}/> : <IconEye size={18}/>}
                      </button>
                    </div>
                    <div>
                      <label className={lbl}>Confirm Password *</label>
                      <input required type="password" value={contact.confirmPassword}
                        onChange={e => setContact(c => ({ ...c, confirmPassword: e.target.value }))}
                        className={inp} placeholder="Repeat password" />
                    </div>
                  </>
                ) : null}
              </>
            )}

            {!loggedUser && (
              <div>
                <label className={lbl}>Phone *</label>
                <div className="flex gap-2">
                  <span className="flex items-center px-3 bg-[#F4F4F4] border border-[#E5E5E5] text-sm font-semibold text-[#444] font-body">+91</span>
                  <input required value={contact.phone} onChange={e => setContact(c => ({ ...c, phone: e.target.value }))}
                    className={`${inp} flex-1`} placeholder="9876543210" maxLength={10} pattern="[0-9]{10}" />
                </div>
              </div>
            )}

            <Button type="submit" variant="gold" className="w-full justify-center" disabled={loading || (!loggedUser && !emailChecked)}>
              {loading ? "Please wait..." : "Continue to Address →"}
            </Button>

            {!loggedUser && !emailChecked && contact.email && (
              <p className="text-xs text-center text-[#999] font-body">Tab out of email field to check account</p>
            )}
          </form>
        )}

        {/* ── STEP 2: Address ── */}
        {step === "address" && (
          <div className="p-6">
            {savedAddresses.length > 0 && !addingNew && (
              <div className="space-y-3 mb-4">
                <p className={lbl}>Saved Addresses</p>
                {savedAddresses.map(addr => (
                  <label key={addr.id} className={`flex items-start gap-3 p-4 border-2 cursor-pointer transition-all ${selectedAddressId === addr.id ? "border-[#FF6B00] bg-[#FF6B00]/5" : "border-[#E5E5E5] hover:border-[#FF6B00]/50"}`}>
                    <input type="radio" name="address" checked={selectedAddressId === addr.id} onChange={() => setSelectedAddressId(addr.id)} className="mt-1 accent-[#FF6B00]"/>
                    <div className="text-sm font-body">
                      <p className="font-bold text-[#0A0A0A]">{addr.fullName}</p>
                      <p className="text-[#444]">{addr.line1}{addr.line2 ? `, ${addr.line2}` : ""}</p>
                      <p className="text-[#444]">{addr.city}, {addr.state} – {addr.pincode}</p>
                      <p className="text-[#666] text-xs">&#128222; {addr.phone}</p>
                      {addr.isDefault && <span className="text-xs text-[#FF6B00] font-bold uppercase tracking-wide">Default</span>}
                    </div>
                  </label>
                ))}
                {savedAddresses.length < 2 && (
                  <button type="button" onClick={() => setAddingNew(true)} className="w-full border-2 border-dashed border-[#E5E5E5] py-3 text-sm text-[#444] hover:border-[#FF6B00] hover:text-[#FF6B00] transition-colors font-body font-semibold">
                    + Add Another Address
                  </button>
                )}
              </div>
            )}

            {addingNew && (
              <form onSubmit={handleAddressSave} className="space-y-3">
                <p className={lbl}>New Address</p>
                <div className="grid grid-cols-2 gap-3">
                  <div><label className={lbl}>Full Name *</label><input required value={newAddress.fullName} onChange={e => setNewAddress(a => ({...a, fullName: e.target.value}))} className={inp} placeholder="Recipient name"/></div>
                  <div><label className={lbl}>Phone *</label><input required value={newAddress.phone} onChange={e => setNewAddress(a => ({...a, phone: e.target.value}))} className={inp} placeholder="10-digit mobile" maxLength={10}/></div>
                </div>
                <div><label className={lbl}>Address Line 1 *</label><input required value={newAddress.line1} onChange={e => setNewAddress(a => ({...a, line1: e.target.value}))} className={inp} placeholder="House/Flat no., Street"/></div>
                <div><label className={lbl}>Address Line 2</label><input value={newAddress.line2} onChange={e => setNewAddress(a => ({...a, line2: e.target.value}))} className={inp} placeholder="Area, Landmark (optional)"/></div>
                <div className="grid grid-cols-2 gap-3">
                  <div><label className={lbl}>City *</label><input required value={newAddress.city} onChange={e => setNewAddress(a => ({...a, city: e.target.value}))} className={inp} placeholder="City"/></div>
                  <div><label className={lbl}>Pincode *</label><input required value={newAddress.pincode} onChange={e => setNewAddress(a => ({...a, pincode: e.target.value}))} className={inp} placeholder="6-digit" maxLength={6} pattern="[0-9]{6}"/></div>
                </div>
                <div>
                  <label className={lbl}>State *</label>
                  <select required value={newAddress.state} onChange={e => setNewAddress(a => ({...a, state: e.target.value}))} className={inp}>
                    {INDIAN_STATES.map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>
                <div className="flex gap-3 pt-2">
                  {savedAddresses.length > 0 && (
                    <button type="button" onClick={() => setAddingNew(false)} className="flex-1 border border-[#E5E5E5] py-3 text-xs font-bold uppercase font-body hover:border-[#FF6B00] transition-colors">Cancel</button>
                  )}
                  <Button type="submit" variant="gold" disabled={loading} className="flex-1 justify-center">{loading ? "Saving..." : "Save Address"}</Button>
                </div>
              </form>
            )}

            {!addingNew && selectedAddressId && (
              <div className="flex gap-3 mt-4">
                <button onClick={() => setStep("contact")} className="flex-1 border border-[#E5E5E5] py-3 text-xs font-bold uppercase font-body hover:border-[#FF6B00] transition-colors">← Back</button>
                <Button variant="gold" className="flex-1 justify-center" onClick={() => setStep("pay")}>Continue to Pay →</Button>
              </div>
            )}
          </div>
        )}

        {/* ── STEP 3: Review + Pay ── */}
        {step === "pay" && (
          <div className="p-6 space-y-5">
            <div className="bg-[#F4F4F4] p-4 space-y-2">
              <p className={lbl}>Order Summary</p>
              <div className="flex justify-between text-sm font-body">
                <span className="text-[#444]">{plan.name}</span>
                <span className="font-bold">&#8377;{plan.price.toLocaleString("en-IN")}</span>
              </div>
              <div className="flex justify-between text-sm border-t border-[#E5E5E5] pt-2 font-body">
                <span className="font-bold text-[#0A0A0A]">Total</span>
                <span className="font-heading text-xl text-[#FF6B00]">&#8377;{plan.price.toLocaleString("en-IN")}</span>
              </div>
            </div>

            {selectedAddress && (
              <div className="border-l-4 border-[#FF6B00] pl-4 py-1">
                <p className={lbl}>Billing / Delivery Address</p>
                <p className="text-sm font-body font-bold text-[#0A0A0A]">{selectedAddress.fullName}</p>
                <p className="text-sm font-body text-[#444]">{selectedAddress.line1}{selectedAddress.line2 ? `, ${selectedAddress.line2}` : ""}</p>
                <p className="text-sm font-body text-[#444]">{selectedAddress.city}, {selectedAddress.state} – {selectedAddress.pincode}</p>
              </div>
            )}

            <div className="border-l-4 border-[#E5E5E5] pl-4 py-1">
              <p className={lbl}>Contact</p>
              <p className="text-sm font-body text-[#0A0A0A]">{loggedUser?.name || contact.name} &middot; {displayEmail}</p>
            </div>

            <div className="flex gap-3">
              <button onClick={() => setStep("address")} className="flex-1 border border-[#E5E5E5] py-3 text-xs font-bold uppercase font-body hover:border-[#FF6B00] transition-colors">← Back</button>
              <Button variant="gold" disabled={loading} className="flex-1 justify-center" onClick={handlePay}>
                {loading ? "Processing..." : `Pay ₹${plan.price.toLocaleString("en-IN")}`}
              </Button>
            </div>
            <p className="text-xs text-center text-[#888] font-body">Secured by Razorpay &middot; UPI &middot; Cards &middot; Net Banking</p>
          </div>
        )}
      </div>
    </div>
  );
}
