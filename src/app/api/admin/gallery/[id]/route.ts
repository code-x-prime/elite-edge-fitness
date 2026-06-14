import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { deleteFromR2 } from "@/lib/r2";

async function guard() {
  const s = await getServerSession(authOptions);
  if (!s?.user) return false;
  const admin = await prisma.adminUser.findFirst({ where: { email: s.user.email! } });
  return !!admin;
}

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  if (!(await guard())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { title, category } = await req.json();
  const img = await prisma.galleryImage.update({
    where: { id: params.id },
    data: { ...(title !== undefined && { title }), ...(category !== undefined && { category }) },
  });
  return NextResponse.json(img);
}

export async function DELETE(_req: NextRequest, { params }: { params: { id: string } }) {
  if (!(await guard())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const img = await prisma.galleryImage.findUnique({ where: { id: params.id } });
  if (img?.r2Key) await deleteFromR2(img.r2Key).catch(() => {});
  await prisma.galleryImage.delete({ where: { id: params.id } });
  return NextResponse.json({ success: true });
}
