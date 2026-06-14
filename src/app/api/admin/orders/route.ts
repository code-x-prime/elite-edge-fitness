import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

async function guard() {
  const s = await getServerSession(authOptions);
  if (!s?.user) return false;
  const admin = await prisma.adminUser.findFirst({ where: { email: s.user.email! } });
  return !!admin;
}

export async function GET(req: NextRequest) {
  if (!(await guard())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const status = req.nextUrl.searchParams.get("status");
  const orders = await prisma.order.findMany({
    where: status ? { status } : {},
    include: { plan: true, product: true, address: true },
    orderBy: { createdAt: "desc" },
  });
  return NextResponse.json(orders);
}

