"use client";

import { useState, useEffect } from "react";
import { IconKey, IconPlugConnected, IconToggleRight, IconAlertCircle, IconCircleCheck } from "@tabler/icons-react";
import toast from "react-hot-toast";

interface Settings {
  razorpayEnabled: boolean;
  razorpayMode: string;
  razorpayKeyIdTest: string | null;
  razorpaySecretTest: string | null;
  razorpayKeyIdLive: string | null;
  razorpaySecretLive: string | null;
}

export default function AdminSettingsPage() {
  const [settings, setSettings] = useState<Settings>({
    razorpayEnabled: false,
    razorpayMode: "test",
    razorpayKeyIdTest: "",
    razorpaySecretTest: "",
    razorpayKeyIdLive: "",
    razorpaySecretLive: "",
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [testing, setTesting] = useState(false);
  const [testResult, setTestResult] = useState<{ success: boolean; message: string } | null>(null);

  useEffect(() => {
    fetch("/api/admin/settings")
      .then((r) => r.json())
      .then((d) => {
        setSettings({
          razorpayEnabled: d.razorpayEnabled ?? false,
          razorpayMode: d.razorpayMode ?? "test",
          razorpayKeyIdTest: d.razorpayKeyIdTest ?? "",
          razorpaySecretTest: d.razorpaySecretTest ?? "",
          razorpayKeyIdLive: d.razorpayKeyIdLive ?? "",
          razorpaySecretLive: d.razorpaySecretLive ?? "",
        });
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const save = async () => {
    setSaving(true);
    try {
      const res = await fetch("/api/admin/settings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(settings),
      });
      if (res.ok) toast.success("Settings saved");
      else toast.error("Failed to save");
    } catch {
      toast.error("Error saving settings");
    } finally {
      setSaving(false);
    }
  };

  const testConnection = async () => {
    setTesting(true);
    setTestResult(null);
    try {
      const res = await fetch("/api/admin/settings/test-connection", { method: "POST" });
      const data = await res.json();
      setTestResult(data);
    } catch {
      setTestResult({ success: false, message: "Network error" });
    } finally {
      setTesting(false);
    }
  };

  const inputCls = "w-full bg-[#1A1A1A] border border-[#2A2A2A] text-white px-4 py-3 text-sm font-body focus:outline-none focus:border-[#FF6B00] font-mono transition-colors";
  const labelCls = "block text-xs font-body font-bold uppercase tracking-widest text-[#666] mb-2";

  if (loading) return (
    <div className="animate-pulse space-y-4">
      {[1,2,3].map(i => <div key={i} className="h-12 bg-[#1A1A1A] rounded" />)}
    </div>
  );

  return (
    <div className="max-w-2xl">
      <div className="mb-8">
        <h1 className="font-heading text-4xl uppercase text-[#0A0A0A]">Settings</h1>
        <p className="text-sm text-[#666] font-body mt-1">Configure payment gateway and integrations</p>
      </div>

      {/* Razorpay section */}
      <div className="bg-white border border-[#E8E8E8] overflow-hidden mb-6">
        {/* Header */}
        <div className="bg-[#0A0A0A] px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <IconKey size={20} className="text-[#FF6B00]" stroke={1.5} />
            <span className="font-heading text-lg text-white uppercase tracking-widest">Razorpay Payment Gateway</span>
          </div>
          {/* Enable toggle */}
          <button
            onClick={() => setSettings(s => ({ ...s, razorpayEnabled: !s.razorpayEnabled }))}
            className={`flex items-center gap-2 px-4 py-2 text-xs font-bold uppercase tracking-widest transition-colors ${
              settings.razorpayEnabled
                ? "bg-[#FF6B00] text-white"
                : "bg-[#1A1A1A] text-[#666] hover:text-white"
            }`}
          >
            <IconToggleRight size={16} />
            {settings.razorpayEnabled ? "ENABLED" : "DISABLED"}
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* Mode selector */}
          <div>
            <label className={labelCls}>Mode</label>
            <div className="flex gap-3">
              {["test", "live"].map((mode) => (
                <button
                  key={mode}
                  onClick={() => setSettings(s => ({ ...s, razorpayMode: mode }))}
                  className={`flex-1 py-3 text-xs font-bold uppercase tracking-widest transition-colors border-2 ${
                    settings.razorpayMode === mode
                      ? mode === "live"
                        ? "border-green-500 bg-green-500/10 text-green-400"
                        : "border-[#FF6B00] bg-[#FF6B00]/10 text-[#FF6B00]"
                      : "border-[#E8E8E8] text-[#999] hover:border-[#0A0A0A]"
                  }`}
                >
                  {mode === "live" ? "🟢 Live" : "🧪 Test"}
                </button>
              ))}
            </div>
            {settings.razorpayMode === "live" && (
              <p className="mt-2 text-xs text-amber-600 font-body">
                ⚠️ Live mode — real payments will be charged
              </p>
            )}
          </div>

          {/* Test keys */}
          <div className="space-y-4">
            <p className="text-xs font-body font-bold uppercase tracking-widest text-[#FF6B00]">Test Keys (rzp_test_...)</p>
            <div>
              <label className={labelCls}>Key ID</label>
              <input
                value={settings.razorpayKeyIdTest ?? ""}
                onChange={e => setSettings(s => ({ ...s, razorpayKeyIdTest: e.target.value }))}
                className={inputCls}
                placeholder="rzp_test_xxxxxxxxxxxx"
              />
            </div>
            <div>
              <label className={labelCls}>Key Secret</label>
              <input
                type="password"
                value={settings.razorpaySecretTest ?? ""}
                onChange={e => setSettings(s => ({ ...s, razorpaySecretTest: e.target.value }))}
                className={inputCls}
                placeholder="Enter test secret key"
              />
            </div>
          </div>

          {/* Live keys */}
          <div className="space-y-4 pt-4 border-t border-[#E8E8E8]">
            <p className="text-xs font-body font-bold uppercase tracking-widest text-green-600">Live Keys (rzp_live_...)</p>
            <div>
              <label className={labelCls}>Key ID</label>
              <input
                value={settings.razorpayKeyIdLive ?? ""}
                onChange={e => setSettings(s => ({ ...s, razorpayKeyIdLive: e.target.value }))}
                className={inputCls}
                placeholder="rzp_live_xxxxxxxxxxxx"
              />
            </div>
            <div>
              <label className={labelCls}>Key Secret</label>
              <input
                type="password"
                value={settings.razorpaySecretLive ?? ""}
                onChange={e => setSettings(s => ({ ...s, razorpaySecretLive: e.target.value }))}
                className={inputCls}
                placeholder="Enter live secret key"
              />
            </div>
          </div>

          {/* Test connection result */}
          {testResult && (
            <div className={`flex items-center gap-3 p-4 border ${testResult.success ? "border-green-500/30 bg-green-500/5" : "border-red-500/30 bg-red-500/5"}`}>
              {testResult.success
                ? <IconCircleCheck size={18} className="text-green-400" stroke={2} />
                : <IconAlertCircle size={18} className="text-red-400" stroke={2} />
              }
              <p className={`text-sm font-body ${testResult.success ? "text-green-400" : "text-red-400"}`}>
                {testResult.message}
              </p>
            </div>
          )}

          {/* Actions */}
          <div className="flex gap-3 pt-2">
            <button
              onClick={testConnection}
              disabled={testing}
              className="flex items-center gap-2 border border-[#E8E8E8] text-[#0A0A0A] text-xs font-bold uppercase tracking-widest px-5 py-3 hover:border-[#FF6B00] hover:text-[#FF6B00] transition-colors disabled:opacity-50 font-body"
            >
              <IconPlugConnected size={16} stroke={1.5} />
              {testing ? "Testing..." : "Test Connection"}
            </button>
            <button
              onClick={save}
              disabled={saving}
              className="flex-1 bg-[#FF6B00] text-white text-xs font-bold uppercase tracking-widest py-3 hover:bg-[#E55A00] transition-colors disabled:opacity-50 font-body"
            >
              {saving ? "Saving..." : "Save Settings"}
            </button>
          </div>
        </div>
      </div>

      {/* Info */}
      <div className="bg-[#F4F4F4] border border-[#E8E8E8] p-5">
        <p className="text-xs font-body text-[#666] leading-relaxed">
          <strong className="text-[#0A0A0A]">How it works:</strong> When Razorpay is <strong>enabled</strong>, the checkout flow will offer online payment via Razorpay. When <strong>disabled</strong>, only manual payment options (UPI, GPay, Bank Transfer) are shown. Keys are encrypted and stored securely in the database.
        </p>
      </div>
    </div>
  );
}
