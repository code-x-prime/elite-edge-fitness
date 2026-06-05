import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { signUserToken, USER_COOKIE_OPTIONS, COOKIE_NAME } from "@/lib/userAuth";

export async function POST(req: NextRequest) {
  try {
    const { name, email, phone, password } = await req.json();

    if (!name || !email || !password) {
      return NextResponse.json({ error: "Name, email and password required" }, { status: 400 });
    }
    if (password.length < 8) {
      return NextResponse.json({ error: "Password must be at least 8 characters" }, { status: 400 });
    }

    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing?.password) {
      return NextResponse.json({ error: "Account already exists. Please login." }, { status: 409 });
    }

    const hashed = await bcrypt.hash(password, 12);

    const user = existing
      ? await prisma.user.update({ where: { email }, data: { name, phone, password: hashed } })
      : await prisma.user.create({ data: { name, email, phone, password: hashed } });

    const token = signUserToken({ id: user.id, email: user.email, name: user.name });

    const res = NextResponse.json({ success: true, user: { id: user.id, email: user.email, name: user.name } });
    res.cookies.set(COOKIE_NAME, token, USER_COOKIE_OPTIONS);
    return res;
  } catch (err) {
    console.error("register error:", err);
    return NextResponse.json({ error: "Registration failed" }, { status: 500 });
  }
}
