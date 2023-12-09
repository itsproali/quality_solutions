import { NextApiRequest, NextApiResponse } from "next";
import NextAuth, { NextAuthOptions } from "next-auth";
import { CallbacksOptions } from "next-auth/core/types";
import { Provider } from "next-auth/providers";
import CredentialsProvider from "next-auth/providers/credentials";
import authFetch from "../../../src/services/AxiosCommon";

const providers: Provider[] = [
  CredentialsProvider({
    name: "Credentials",
    credentials: {},
    authorize: async (credentials: any) => {
      try {
        const { email, password } = credentials;
        const { data } = await authFetch.post("/api/v1/user/login", {
          email,
          password,
        });
        // ----------------- Email Verification stage -----------------
        // if (!data?.user?.verified) {
        //   const obj: any = {
        //     userId: data?.user?._id,
        //     msg: "Please verify your email address",
        //     type: "verify",
        //   };
        //   throw new Error(JSON.stringify(obj));
        // }
        if (data) {
          return data;
        }
      } catch (error) {
        console.log("error", error);
        throw new Error(
          JSON.stringify(error?.response?.data) ||
            error?.data?.messages ||
            error?.data?.statusCode ||
            error
        );
        // throw new Error(JSON.stringify(error?.response?.data || error));
      }
    },
  }),
];

const callbacks: Partial<CallbacksOptions> = {
  jwt: async ({ token, user }: any) => {
    if (user) {
      token.user = user?.user;
      token.accessToken = user?.accessToken;
    }
    return Promise.resolve(token);
  },
  redirect: async ({ url }) => {
    let baseUrl = process.env.NEXT_PUBLIC_URL;
    // Allows relative callback URLs
    if (url.startsWith("/")) return `${baseUrl}${url}`;
    // Allows callback URLs on the same origin
    else if (new URL(url).origin === baseUrl) return url;
    return baseUrl;
  },
  session: async ({ session, token }: any) => {
    // Here we pass accessToken to the client to be used in authentication according to the API
    session.accessToken = token?.accessToken;
    session.user = token?.user;
    session.error = token?.error;

    return Promise.resolve(session);
  },
};

export const options: NextAuthOptions = {
  providers,
  callbacks,
  pages: { signIn: "/", signOut: "/login", error: "/" },
  secret: process.env.NEXT_PUBLIC_JWT_SECRET,
  jwt: { maxAge: 60 * 60 * 24 * 30 }, //default
};

const Auth = (req: NextApiRequest, res: NextApiResponse) =>
  NextAuth(req, res, options);
export default Auth;
