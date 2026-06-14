import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function POST() {
  const session = await getServerSession(authOptions);
  if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const settings = await prisma.appSettings.findUnique({ where: { id: "singleton" } });
  if (!settings) return NextResponse.json({ success: false, message: "No settings configured" });

  const keyId = settings.razorpayMode === "live" ? settings.razorpayKeyIdLive : settings.razorpayKeyIdTest;
  const secret = settings.razorpayMode === "live" ? settings.razorpaySecretLive : settings.razorpaySecretTest;

  if (!keyId || !secret) {
    return NextResponse.json({ success: false, message: "API keys not configured for selected mode" });
  }

  try {
    const Razorpay = (await import("razorpay")).default;
    const rzp = new Razorpay({ key_id: keyId, key_secret: secret });
    // Test: fetch plans list (lightweight call)
    await rzp.plans.all({ count: 1 });
    return NextResponse.json({ success: true, message: `Connected to Razorpay (${settings.razorpayMode} mode)` });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "Connection failed";
    return NextResponse.json({ success: false, message: msg });
  }
}

