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
  const body = await req.json();
  const plan = await prisma.plan.update({
    where: { id: params.id },
    data: {
      ...(body.name !== undefined && { name: body.name }),
      ...(body.type !== undefined && { type: body.type }),
      ...(body.price !== undefined && { price: Number(body.price) }),
      ...(body.duration !== undefined && { duration: body.duration }),
      ...(body.features !== undefined && { features: body.features }),
      ...(body.isActive !== undefined && { isActive: body.isActive }),
      ...(body.popular !== undefined && { popular: body.popular }),
    },
  });
  return NextResponse.json(plan);
}

export async function DELETE(_req: NextRequest, { params }: { params: { id: string } }) {
  if (!(await guard())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  await prisma.planImage.deleteMany({ where: { planId: params.id } });
  await prisma.plan.delete({ where: { id: params.id } });
  return NextResponse.json({ success: true });
}
