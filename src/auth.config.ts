import type { NextAuthConfig, Session } from 'next-auth';

declare module 'next-auth' {
  interface Session {
    githubAccessToken?: string;
  }
}

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
    async jwt({ token, user, account }) {
      if (user) {
        token.id = user.id;
      }
      if (account?.provider === 'github' && account.access_token) {
        token.githubAccessToken = account.access_token;
      }
      return token;
    },
    async session({ session, token }) {
      if (token && session.user) {
        session.user.id = token.id as string;
        session.githubAccessToken = token.githubAccessToken as string | undefined;
      }
      return session;
    }
  },
  providers: [], // Providers are added in auth.ts to avoid Edge compatibility issues
} satisfies NextAuthConfig;
