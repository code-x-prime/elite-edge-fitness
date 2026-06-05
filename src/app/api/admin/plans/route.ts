import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";

async function guard() {
  const s = await getServerSession();
  if (!s?.user) return false;
  const admin = await prisma.adminUser.findFirst({ where: { email: s.user.email! } });
  return !!admin;
}

export async function GET() {
  if (!(await guard())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const plans = await prisma.plan.findMany({
    orderBy: { createdAt: "desc" },
    include: { _count: { select: { orders: true } }, images: { orderBy: { position: "asc" } } },
  });
  return NextResponse.json(plans);
}

export async function POST(req: NextRequest) {
  if (!(await guard())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { name, type, price, duration, features, isActive, popular } = await req.json();
  if (!name || !type || !price || !duration) return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  const plan = await prisma.plan.create({
    data: { name, type, price: Number(price), duration, features: features ?? [], isActive: isActive ?? true, popular: popular ?? false },
  });
  return NextResponse.json(plan, { status: 201 });
}
