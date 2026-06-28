import Link from "next/link";
import { Mail, Send, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function ResetPasswordPage() {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center p-4 relative overflow-hidden antialiased bg-background text-foreground">
      {/* Ambient Glow Background */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/10 rounded-full blur-[120px] pointer-events-none z-0"></div>
      
      {/* Main Reset Card */}
      <main className="w-full max-w-[440px] bg-card/80 backdrop-blur-xl border border-border rounded-xl p-8 relative z-10 shadow-2xl flex flex-col gap-6 mt-8">
        {/* Header Section */}
        <header className="text-center flex flex-col gap-2">
          <div className="text-3xl font-bold text-primary tracking-tight">DevOS</div>
          <h1 className="text-2xl font-semibold text-foreground mt-2">Reset Password</h1>
          <p className="text-sm text-muted-foreground">
            Enter your email and we'll send you a link to reset your password.
          </p>
        </header>

        {/* Reset Form */}
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
                placeholder="developer@example.com" 
                className="pl-10 bg-background/50 border-border" 
                required 
              />
            </div>
          </div>

          {/* Primary Action */}
          <Button className="w-full mt-2 uppercase tracking-wider font-semibold gap-2" size="lg" type="submit">
            Send Reset Link
            <Send className="w-4 h-4" />
          </Button>
        </form>

        {/* Back Link */}
        <div className="text-center mt-2">
          <Link href="/login" className="inline-flex items-center gap-2 text-sm text-primary font-semibold hover:underline underline-offset-2 transition-colors">
            <ArrowLeft className="w-4 h-4" />
            Back to Login
          </Link>
        </div>
      </main>

      {/* Footer Links */}
      <footer className="mt-12 flex flex-col items-center gap-4 text-xs text-muted-foreground z-10">
        <div className="flex gap-8 uppercase tracking-wider">
          <Link href="#" className="hover:text-primary transition-colors">Privacy Policy</Link>
          <Link href="#" className="hover:text-primary transition-colors">Terms</Link>
          <Link href="#" className="hover:text-primary transition-colors">Status</Link>
        </div>
        <p>© 2024 DevOS. All rights reserved.</p>
      </footer>
    </div>
  );
}
