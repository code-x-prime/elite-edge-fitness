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

export async function GET() {
  if (!(await guard())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const images = await prisma.galleryImage.findMany({ orderBy: { createdAt: "desc" } });
  return NextResponse.json(images);
}

export async function POST(req: NextRequest) {
  if (!(await guard())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { url, r2Key, title, category } = await req.json();
  if (!url || !r2Key || !category) return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  const img = await prisma.galleryImage.create({ data: { url, r2Key, title, category } });
  return NextResponse.json(img, { status: 201 });
}

