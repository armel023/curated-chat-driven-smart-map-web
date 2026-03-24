import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    sessionToken?: string;
    user: {
      name?: string | null;
      email?: string | null;
      image?: string | null;
      isAdmin?: boolean;
    };
  }

  interface User {
    accessToken?: string;
    isAdmin?: boolean;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    accessToken?: string;
    isAdmin?: boolean;
    name?: string;
  }
}
