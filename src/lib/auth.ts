import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";

export async function requireAdmin() {
  const session = await getServerSession();
  if (!session?.user?.email) {
    redirect("/admin-login");
  }
  // Verify email is actually in adminUser table
  const admin = await prisma.adminUser.findFirst({
    where: { email: session.user.email },
  }).catch(() => null);

  if (!admin) {
    redirect("/admin-login");
  }
  return session;
}
