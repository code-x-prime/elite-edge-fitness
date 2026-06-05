import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function DELETE(
  _req: NextRequest,
  { params }: { params: { id: string } }
) {
  await prisma.address.delete({ where: { id: params.id } }).catch(() => null);
  return NextResponse.json({ success: true });
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const { isDefault } = await req.json();
  if (isDefault) {
    const addr = await prisma.address.findUnique({ where: { id: params.id } });
    if (addr) {
      await prisma.address.updateMany({
        where: { userId: addr.userId },
        data: { isDefault: false },
      });
    }
  }
  const updated = await prisma.address.update({
    where: { id: params.id },
    data: { isDefault },
  });
  return NextResponse.json(updated);
}
