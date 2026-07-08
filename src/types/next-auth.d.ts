import NextAuth from "next-auth";
import { JWT } from "next-auth/jwt";

declare module "next-auth" {
  interface User {
    id: string;
    role?: string;
    status?: string;
    access_token?: string;
  }

  interface Session {
    access_token?: string;

    user: {
      id: string;
      name?: string | null;
      role?: string;
      status?: string;
    };
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    access_token?: string;
    role?: string;
    status?: string;
  }
}