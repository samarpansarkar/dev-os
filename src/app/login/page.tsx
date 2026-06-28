"use client";

import Link from "next/link";
import { Mail, Lock, ArrowRight, Eye, EyeOff, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="min-h-screen flex flex-col justify-center items-center p-4 relative overflow-hidden antialiased bg-background text-foreground">
      <Button variant="ghost" className="absolute top-4 left-4 z-20 text-muted-foreground hover:text-foreground" asChild>
        <Link href="/">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Home
        </Link>
      </Button>

      {/* Ambient Glow Background */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/10 rounded-full blur-[120px] pointer-events-none z-0"></div>
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-secondary/10 rounded-full blur-[100px] pointer-events-none z-0 translate-x-1/2 -translate-y-1/2"></div>

      {/* Main Login Card */}
      <main className="w-full max-w-[440px] bg-card/80 backdrop-blur-xl border border-border rounded-xl p-8 relative z-10 shadow-2xl flex flex-col gap-6">
        {/* Header Section */}
        <header className="text-center flex flex-col gap-2">
          <Link href='/' className="text-3xl font-bold text-primary tracking-tight">DevOS</Link>
          <h1 className="text-2xl font-semibold text-foreground mt-2">Welcome Back</h1>
          <p className="text-sm text-muted-foreground">Sign in to continue to your workspace.</p>
        </header>

        {/* Social Login */}
        <div className="grid grid-cols-2 gap-4">
          <Button variant="outline" className="flex items-center justify-center gap-2 bg-background/50 hover:bg-secondary/10">
            <svg aria-hidden="true" className="w-5 h-5 fill-foreground" viewBox="0 0 24 24">
              <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.699-2.782.603-3.369-1.341-3.369-1.341-.454-1.155-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.379.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.161 22 16.418 22 12c0-5.523-4.477-10-10-10z"></path>
            </svg>
            <span>GitHub</span>
          </Button>
          <Button variant="outline" className="flex items-center justify-center gap-2 bg-background/50 hover:bg-secondary/10">
            <svg aria-hidden="true" className="w-5 h-5" viewBox="0 0 24 24">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"></path>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"></path>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"></path>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"></path>
            </svg>
            <span>Google</span>
          </Button>
        </div>

        {/* Divider */}
        <div className="flex items-center gap-4">
          <div className="h-px bg-border flex-1"></div>
          <span className="text-xs text-muted-foreground uppercase tracking-wider">Or continue with</span>
          <div className="h-px bg-border flex-1"></div>
        </div>

        {/* Login Form */}
        <form className="flex flex-col gap-4">
          {/* Email Field */}
          <div className="flex flex-col gap-1.5 relative group">
            <label className="text-xs font-semibold text-muted-foreground uppercase" htmlFor="email">Email Address</label>
            <div className="relative flex items-center">
              <Mail className="absolute left-3 w-5 h-5 text-muted-foreground" />
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="developer@devos.io"
                className="pl-10 bg-background/50 border-border"
                required
              />
            </div>
          </div>

          {/* Password Field */}
          <div className="flex flex-col gap-1.5 relative group">
            <div className="flex justify-between items-center">
              <label className="text-xs font-semibold text-muted-foreground uppercase" htmlFor="password">Password</label>
              <Link href="/reset-password" className="text-sm text-primary hover:underline underline-offset-2 transition-colors">
                Forgot Password?
              </Link>
            </div>
            <div className="relative flex items-center">
              <Lock className="absolute left-3 w-5 h-5 text-muted-foreground" />
              <Input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                className="pl-10 pr-10 bg-background/50 border-border"
                required
              />
              <button
                type="button"
                className="absolute right-3 text-muted-foreground hover:text-foreground transition-colors"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {/* Remember me */}
          <div className="flex items-center gap-2 mt-2">
            <input
              id="remember"
              name="remember"
              type="checkbox"
              className="w-4 h-4 rounded border-border bg-background text-primary focus:ring-primary accent-primary"
            />
            <label htmlFor="remember" className="text-sm text-muted-foreground cursor-pointer select-none">
              Remember me
            </label>
          </div>

          {/* Primary Action */}
          <Button className="w-full mt-2 uppercase tracking-wider font-semibold gap-2" size="lg" type="submit">
            Sign In
            <ArrowRight className="w-5 h-5" />
          </Button>
        </form>

        {/* Footer / Sign Up Link */}
        <div className="text-center mt-2 text-sm text-muted-foreground">
          Don't have an account?{" "}
          <Link href="/register" className="text-primary font-semibold hover:underline underline-offset-2 transition-colors">
            Create an account
          </Link>
        </div>
      </main>

      {/* Footer Links */}
      <footer className="mt-12 flex gap-8 text-xs text-muted-foreground uppercase tracking-wider z-10">
        <Link href="#" className="hover:text-primary transition-colors">Privacy Policy</Link>
        <Link href="#" className="hover:text-primary transition-colors">Terms</Link>
        <Link href="#" className="hover:text-primary transition-colors">Status</Link>
      </footer>
    </div>
  );
}
