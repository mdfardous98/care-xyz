import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import bcrypt from "bcryptjs";
import dbConnect from "@/lib/mongoose";
import User from "@/models/User";

export const authOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        }),
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "text" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials) {
                await dbConnect();

                if (!credentials?.email || !credentials?.password) {
                    throw new Error("Invalid email or password");
                }

                const user = await User.findOne({ email: credentials.email });

                if (!user) {
                    throw new Error("Invalid email or password");
                }

                const isPasswordMatched = await bcrypt.compare(credentials.password, user.password);

                if (!isPasswordMatched) {
                    throw new Error("Invalid email or password");
                }

                return user;
            }
        })
    ],
    callbacks: {
        async jwt({ token, user, account }) {
            if (user) {
                await dbConnect();
                let dbUser = await User.findOne({ email: user.email });

                if (!dbUser && account?.provider === 'google') {
                    dbUser = await User.create({
                        name: user.name,
                        email: user.email,
                        password: await bcrypt.hash(Math.random().toString(36), 10),
                        role: 'user'
                    });
                }

                if (dbUser) {
                    token.id = dbUser._id;
                    token.role = dbUser.role;
                }
            }
            return token;
        },
        async session({ session, token }) {
            if (token) {
                session.user.id = token.id;
                session.user.role = token.role;
            }
            return session;
        }
    },
    pages: {
        signIn: '/login', 
    },
    session: {
        strategy: "jwt",
    },
    secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
