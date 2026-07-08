import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";

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

        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/sso/login`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              username,
              password,
          }),
        }
      );

      if (!res.ok) {
        return null;
      }

      const data = await res.json();

      if (!data.success) {
        return null;
      }

      return {
        id: String(data.user.id),
        name: data.user.username,
        role: data.user.role,
        status: data.user.status,
        access_token: data.access_token,
      };
    }
    }),
  ],

  session: {
    strategy: "jwt",
  },

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.access_token = user.access_token;
        token.role = user.role;
        token.status = user.status;
      }

      return token;
    },

    async session({ session, token }) {
      session.access_token = token.access_token;

      if (session.user) {
        session.user.role = token.role;
        session.user.status = token.status;
      }

      return session;
    },
  },
});

export { handler as GET, handler as POST };