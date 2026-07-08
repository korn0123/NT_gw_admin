import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { prisma } from "@/lib/prisma";

const handler = NextAuth({
  providers: [
    Credentials({
      credentials: {
        username: {},
        password: {},
      },

      async authorize(credentials) {
        const username = credentials?.username as string;
        const password = credentials?.password as string;

        const user = await prisma.user.findFirst({
          where: { username },
        });

        if (!user) return null;
        if (password !== user.password) return null;

        return {
          id: String(user.id),
          name: user.username,
          role: user.role,
        };
      },
    }),
  ],

  session: {
    strategy: "jwt",
  },
});

export { handler as GET, handler as POST };