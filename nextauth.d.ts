import NextAuth, { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session extends DefaultSession {
    accessToken?: string;
    user?: {
      _id: string;
      name: string;
      email: string;
      image: string;
      role: string;
      verified: boolean;
    };
  }
}
