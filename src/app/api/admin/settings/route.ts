import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

async function ensureAdmin() {
  const session = await getServerSession(authOptions);
  if (!session?.user) return false;
  return true;
}

export async function GET() {
  if (!(await ensureAdmin())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const settings = await prisma.appSettings.findUnique({ where: { id: "singleton" } });
  if (!settings) {
    const created = await prisma.appSettings.create({ data: { id: "singleton" } });
    return NextResponse.json(created);
  }
  // Mask secrets — only return last 4 chars
  return NextResponse.json({
    ...settings,
    razorpaySecretTest: settings.razorpaySecretTest ? "••••••••" + settings.razorpaySecretTest.slice(-4) : null,
    razorpaySecretLive: settings.razorpaySecretLive ? "••••••••" + settings.razorpaySecretLive.slice(-4) : null,
  });
}

export async function POST(req: NextRequest) {
  if (!(await ensureAdmin())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const body = await req.json();

  const data: Record<string, unknown> = {
    razorpayEnabled: body.razorpayEnabled,
    razorpayMode: body.razorpayMode,
  };
  if (body.razorpayKeyIdTest !== undefined) data.razorpayKeyIdTest = body.razorpayKeyIdTest;
  if (body.razorpaySecretTest && !body.razorpaySecretTest.startsWith("••••")) data.razorpaySecretTest = body.razorpaySecretTest;
  if (body.razorpayKeyIdLive !== undefined) data.razorpayKeyIdLive = body.razorpayKeyIdLive;
  if (body.razorpaySecretLive && !body.razorpaySecretLive.startsWith("••••")) data.razorpaySecretLive = body.razorpaySecretLive;

  const settings = await prisma.appSettings.upsert({
    where: { id: "singleton" },
    create: { id: "singleton", ...data },
    update: data,
  });
  return NextResponse.json({ success: true, enabled: settings.razorpayEnabled });
}

