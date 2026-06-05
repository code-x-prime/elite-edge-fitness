import { NextResponse } from "next/server";
import { getUserFromCookie, getFullUser } from "@/lib/userAuth";

export async function GET() {
  const session = await getUserFromCookie();
  if (!session) return NextResponse.json(null);
  const user = await getFullUser(session.id);
  if (!user) return NextResponse.json(null);
  // Never return password
  const { password: _, ...safe } = user as typeof user & { password?: string };
  void _;
  return NextResponse.json(safe);
}
