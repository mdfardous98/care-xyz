import { loginUser } from "@/actions/server/auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { collections, dbConnect } from "./dbConnect";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {},
      async authorize(credentials) {
        return await loginUser({
          email: credentials.email,
          password: credentials.password,
        });
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async signIn({ user, account }) {
      if (account.provider === "google") {
        const isExist = await dbConnect(collections.USERS).findOne({
          email: user.email,
        });
        if (!isExist) {
          await dbConnect(collections.USERS).insertOne({
            name: user.name,
            email: user.email,
            image: user.image,
            role: "user",
            provider: "google",
          });
        }
      }
      return true;
    },
    async jwt({ token, user }) {
      if (user) {
        const dbUser = await dbConnect(collections.USERS).findOne({
          email: user.email,
        });
        token.id = dbUser?._id.toString();
        token.role = dbUser?.role;
      }
      return token;
    },
    async session({ session, token }) {
      session.user._id = token.id;
      session.user.role = token.role;
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};
