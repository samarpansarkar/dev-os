import { auth } from "@/auth";
import connectDB from "@/lib/db";
import { User } from "@/models/User";
import { redirect } from "next/navigation";
import Image from "next/image";
import { Shield, User as UserIcon, Mail } from "lucide-react";

export default async function ProfilePage() {
  const session = await auth();

  if (!session?.user) {
    redirect("/login");
  }

  // Fetch the actual user from the MongoDB database
  await connectDB();
  const dbUser = await User.findOne({ email: session.user.email });

  if (!dbUser) {
    return (
      <div className="flex-1 p-8 text-center mt-20">
        <h1 className="text-2xl text-destructive font-bold">User not found in database!</h1>
        <p className="text-muted-foreground mt-4">Something went wrong. The session exists but the DB entry is missing.</p>
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-y-auto p-8 lg:p-12 xl:p-16 relative">
      <div className="max-w-3xl mx-auto flex flex-col gap-8">
        
        <header className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold text-foreground">My Profile</h1>
          <p className="text-muted-foreground">Manage your account settings and verify database information.</p>
        </header>

        {/* Profile Card */}
        <div className="bg-card/50 border border-border backdrop-blur-xl rounded-2xl p-8 flex flex-col sm:flex-row gap-8 items-start sm:items-center shadow-lg">
          
          <div className="w-24 h-24 rounded-full bg-secondary/20 flex items-center justify-center border border-border overflow-hidden shrink-0">
            {dbUser.image ? (
              <Image src={dbUser.image} alt={dbUser.name} width={96} height={96} className="w-full h-full object-cover" />
            ) : (
              <UserIcon className="w-12 h-12 text-muted-foreground" />
            )}
          </div>

          <div className="flex flex-col gap-2 flex-1">
            <h2 className="text-2xl font-bold text-foreground">{dbUser.name}</h2>
            <div className="flex items-center gap-2 text-muted-foreground text-sm">
              <Mail className="w-4 h-4" />
              <span>{dbUser.email}</span>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground text-sm mt-1">
              <Shield className="w-4 h-4" />
              <span className="capitalize">Provider: <span className="font-semibold text-primary">{dbUser.provider}</span></span>
            </div>
          </div>

          <div className="bg-success/10 text-success border border-success/20 px-3 py-1.5 rounded-full text-xs font-semibold tracking-wider uppercase">
            Active User
          </div>
        </div>

        {/* Database Raw Data for Verification */}
        <div className="bg-background/50 border border-border rounded-xl overflow-hidden mt-4">
          <div className="bg-secondary/10 px-6 py-4 border-b border-border">
            <h3 className="font-semibold text-foreground">Raw Database Record</h3>
            <p className="text-xs text-muted-foreground">This is the exact JSON stored in your MongoDB Atlas cluster.</p>
          </div>
          <div className="p-6 overflow-x-auto">
            <pre className="text-xs text-muted-foreground font-mono">
              {JSON.stringify(dbUser, null, 2)}
            </pre>
          </div>
        </div>

      </div>
    </div>
  );
}
