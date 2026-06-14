import { getServerSession, NextAuthOptions } from "next-auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { env } from "@/lib/env";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;

        const user = await prisma.adminUser.findUnique({
          where: { email: credentials.email },
        }).catch(() => null);

        if (!user) return null;

        const valid = await bcrypt.compare(credentials.password, user.password);
        if (!valid) return null;

        return { id: user.id, email: user.email, name: user.name };
      },
    }),
  ],
  session: {
    strategy: "jwt",
    maxAge: 24 * 60 * 60, // 24 hours
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.email = token.email as string;
      }
      return session;
    },
  },
  pages: { signIn: "/admin-login" },
  secret: env.nextauth.secret,
};

export async function requireAdmin() {
  const session = await getServerSession(authOptions);
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
