import { prisma } from "@/lib/prisma";

export interface RazorpayConfig {
  enabled: boolean;
  keyId: string;
  keySecret: string;
  mode: string;
}

export async function getRazorpayConfig(): Promise<RazorpayConfig> {
  const settings = await prisma.appSettings.findUnique({ where: { id: "singleton" } }).catch(() => null);

  if (!settings || !settings.razorpayEnabled) {
    return { enabled: false, keyId: "", keySecret: "", mode: "test" };
  }

  const keyId = settings.razorpayMode === "live"
    ? settings.razorpayKeyIdLive ?? ""
    : settings.razorpayKeyIdTest ?? "";

  const keySecret = settings.razorpayMode === "live"
    ? settings.razorpaySecretLive ?? ""
    : settings.razorpaySecretTest ?? "";

  // Fallback to env if DB keys empty
  const finalKeyId = keyId || (process.env.RAZORPAY_KEY_ID ?? "");
  const finalSecret = keySecret || (process.env.RAZORPAY_KEY_SECRET ?? "");

  return {
    enabled: !!(finalKeyId && finalSecret),
    keyId: finalKeyId,
    keySecret: finalSecret,
    mode: settings.razorpayMode,
  };
}
