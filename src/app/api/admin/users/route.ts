import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

async function guard() {
  const s = await getServerSession(authOptions);
  if (!s?.user) return false;
  const admin = await prisma.adminUser.findFirst({ where: { email: s.user.email! } });
  return !!admin;
}

export async function GET() {
  if (!(await guard())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const users = await prisma.user.findMany({
    include: { addresses: true, _count: { select: { orders: true } } },
    orderBy: { createdAt: "desc" },
  });
  return NextResponse.json(users);
}

