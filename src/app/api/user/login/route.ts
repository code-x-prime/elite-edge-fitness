import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { signUserToken, USER_COOKIE_OPTIONS, COOKIE_NAME } from "@/lib/userAuth";

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();
    if (!email || !password) return NextResponse.json({ error: "Email and password required" }, { status: 400 });

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user || !user.password) {
      return NextResponse.json({ error: "No account found. Please register first." }, { status: 404 });
    }

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return NextResponse.json({ error: "Incorrect password" }, { status: 401 });

    const token = signUserToken({ id: user.id, email: user.email, name: user.name });
    const res = NextResponse.json({ success: true, user: { id: user.id, email: user.email, name: user.name } });
    res.cookies.set(COOKIE_NAME, token, USER_COOKIE_OPTIONS);
    return res;
  } catch (err) {
    console.error("login error:", err);
    return NextResponse.json({ error: "Login failed" }, { status: 500 });
  }
}
