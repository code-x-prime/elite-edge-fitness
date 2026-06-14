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
  const body = await req.json();
  const product = await prisma.product.update({
    where: { id: params.id },
    data: {
      ...(body.name !== undefined && { name: body.name }),
      ...(body.description !== undefined && { description: body.description }),
      ...(body.price !== undefined && { price: Number(body.price) }),
      ...(body.pdfUrl !== undefined && { pdfUrl: body.pdfUrl }),
      ...(body.pdfR2Key !== undefined && { pdfR2Key: body.pdfR2Key }),
      ...(body.isActive !== undefined && { isActive: body.isActive }),
    },
  });
  return NextResponse.json(product);
}

export async function DELETE(_req: NextRequest, { params }: { params: { id: string } }) {
  if (!(await guard())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const product = await prisma.product.findUnique({ where: { id: params.id }, include: { images: true } });
  if (product) {
    for (const img of product.images) {
      await deleteFromR2(img.r2Key).catch(() => {});
    }
    if (product.pdfR2Key) await deleteFromR2(product.pdfR2Key).catch(() => {});
    await prisma.productImage.deleteMany({ where: { productId: params.id } });
  }
  await prisma.product.delete({ where: { id: params.id } });
  return NextResponse.json({ success: true });
}
