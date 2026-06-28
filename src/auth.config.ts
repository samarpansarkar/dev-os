import type { NextAuthConfig } from 'next-auth';

export const authConfig = {
  pages: {
    signIn: '/login',
    error: '/login',
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isPublicPath = nextUrl.pathname === "/" || nextUrl.pathname === "/login" || nextUrl.pathname === "/register" || nextUrl.pathname === "/reset-password";
      
      if (!isLoggedIn && !isPublicPath) {
        return false;
      }
      
      return true;
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (token && session.user) {
        session.user.id = token.id as string;
      }
      return session;
    }
  },
  providers: [], // Providers are added in auth.ts to avoid Edge compatibility issues
} satisfies NextAuthConfig;
