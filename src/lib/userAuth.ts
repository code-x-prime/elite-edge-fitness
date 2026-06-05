import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import { prisma } from "@/lib/prisma";

const SECRET = process.env.NEXTAUTH_SECRET || "user-jwt-secret-change-me";
const COOKIE = "eefit_user";

export interface UserPayload {
  id: string;
  email: string;
  name: string;
}

export function signUserToken(payload: UserPayload): string {
  return jwt.sign(payload, SECRET, { expiresIn: "30d" });
}

export function verifyUserToken(token: string): UserPayload | null {
  try {
    return jwt.verify(token, SECRET) as UserPayload;
  } catch {
    return null;
  }
}

export async function getUserFromCookie(): Promise<UserPayload | null> {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get(COOKIE)?.value;
    if (!token) return null;
    return verifyUserToken(token);
  } catch {
    return null;
  }
}

export async function getFullUser(id: string) {
  return prisma.user.findUnique({
    where: { id },
    include: {
      addresses: { orderBy: [{ isDefault: "desc" }, { createdAt: "asc" }] },
      orders: {
        include: { plan: true, product: true },
        orderBy: { createdAt: "desc" },
      },
    },
  });
}

export const USER_COOKIE_OPTIONS = {
  httpOnly: true,
  sameSite: "lax" as const,
  path: "/",
  secure: process.env.NODE_ENV === "production",
  maxAge: 60 * 60 * 24 * 30, // 30 days
};

export const COOKIE_NAME = COOKIE;
