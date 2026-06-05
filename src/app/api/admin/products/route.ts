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
  const products = await prisma.product.findMany({
    orderBy: { createdAt: "desc" },
    include: { _count: { select: { orders: true } }, images: { orderBy: { position: "asc" } } },
  });
  return NextResponse.json(products);
}

export async function POST(req: NextRequest) {
  if (!(await guard())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { name, description, price, pdfUrl, pdfR2Key, isActive } = await req.json();
  if (!name || !price || !pdfUrl) return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  const product = await prisma.product.create({
    data: { name, description: description ?? "", price: Number(price), pdfUrl, pdfR2Key, isActive: isActive ?? true },
  });
  return NextResponse.json(product, { status: 201 });
}
