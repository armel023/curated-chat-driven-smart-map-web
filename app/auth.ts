import { UserData } from "@/types";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const apiUrl = process.env.SERVER_URL || "http://localhost:5292";
export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    CredentialsProvider({
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        console.log("Attempting to authenticate user:", credentials?.email);
        try {
          const url = `${apiUrl}/api/Auth`;
          console.log("Authentication URL:", url);
          const res = await fetch(url, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              email: credentials?.email,
              password: credentials?.password,
            }),
          });
          if (res.status === 200) {
            const data = await res.json();
            if (data?.accessToken) {
              return {
                id: data.id,
                name: data.userName,
                isAdmin: data.isAdmin,
                accessToken: data.accessToken,
              } as UserData;
            }
          }
          return null;
        } catch (error) {
          //   console.error("Error during authentication:", error);
          return null;
        }
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.accessToken = (user as UserData).accessToken;
        token.name = user.name;
        token.isAdmin = (user as UserData).isAdmin;
      }
      return token;
    },
    async session({ session, token }) {
      session.sessionToken = token.accessToken as string;
      session.user.name = token.name;
      session.user.isAdmin = token.isAdmin as boolean;
      return session;
    },
  },
  secret: process.env.AUTH_SECRET,
});
