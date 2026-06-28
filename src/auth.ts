import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";
import Google from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    GitHub,
    Google,
    Credentials({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        // Mock authentication for development
        if (credentials?.email && credentials?.password) {
          return {
            id: "1",
            name: "Developer",
            email: credentials.email as string,
          };
        }
        return null;
      }
    })
  ],
  pages: {
    signIn: "/login",
    error: "/login", // Redirect to login on error
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isPublicPath = nextUrl.pathname === "/" || nextUrl.pathname === "/login" || nextUrl.pathname === "/register" || nextUrl.pathname === "/reset-password";
      
      // If trying to access a private route and not logged in, redirect to login
      if (!isLoggedIn && !isPublicPath) {
        return false;
      }
      
      return true;
    }
  },
  session: { strategy: "jwt" }
});
