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

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  if (!(await guard())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { status } = await req.json();
  if (!["pending","paid","failed","refunded","demo"].includes(status)) {
    return NextResponse.json({ error: "Invalid status" }, { status: 400 });
  }
  const order = await prisma.order.update({ where: { id: params.id }, data: { status } });
  return NextResponse.json(order);
}

export async function DELETE(_req: NextRequest, { params }: { params: { id: string } }) {
  if (!(await guard())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  await prisma.order.delete({ where: { id: params.id } });
  return NextResponse.json({ success: true });
}
