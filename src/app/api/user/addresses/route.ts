import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: NextRequest) {
  const email = req.nextUrl.searchParams.get("email");
  if (!email) return NextResponse.json([], { status: 200 });

  const user = await prisma.user.findUnique({
    where: { email },
    include: {
      addresses: { orderBy: [{ isDefault: "desc" }, { createdAt: "asc" }] },
    },
  }).catch(() => null);

  return NextResponse.json(user?.addresses ?? []);
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { email, name, phone, address } = body as {
    email: string;
    name: string;
    phone: string;
    address: {
      fullName: string;
      phone: string;
      line1: string;
      line2?: string;
      city: string;
      state: string;
      pincode: string;
    };
  };

  let user = await prisma.user.findUnique({ where: { email }, include: { addresses: true } }).catch(() => null);

  if (!user) {
    user = await prisma.user.create({
      data: { email, name, phone },
      include: { addresses: true },
    });
  }

  if (user.addresses.length >= 2) {
    return NextResponse.json({ error: "Maximum 2 addresses allowed per user" }, { status: 400 });
  }

  const isFirstAddress = user.addresses.length === 0;

  const created = await prisma.address.create({
    data: {
      userId: user.id,
      ...address,
      isDefault: isFirstAddress,
    },
  });

  return NextResponse.json(created);
}
