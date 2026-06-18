import NextAuth, { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session extends DefaultSession {
    userId: string;
    username: string;
    role: string;
    email: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    userId: string;
    username: string;
    role: string;
    email: string;
  }
}