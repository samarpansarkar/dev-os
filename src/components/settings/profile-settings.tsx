"use client";
import { useState } from "react";
import { Edit } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";

interface ProfileSettingsProps {
  initialData: {
    name: string;
    email: string;
    bio: string;
    image: string;
  };
}
export function ProfileSettings({ initialData = { name: '', email: '', bio: '', image: '' } }: ProfileSettingsProps) {
  // Split name for the form
  const nameParts = (initialData.name || "").split(" ");
  const initialFirstName = nameParts[0] || "";
  const initialLastName = nameParts.slice(1).join(" ") || "";

  const [firstName, setFirstName] = useState(initialFirstName);
  const [lastName, setLastName] = useState(initialLastName);
  const [email, setEmail] = useState(initialData.email || "");
  const [bio, setBio] = useState(initialData.bio || "");
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState({ text: "", type: "" });

  const handleSave = async () => {
    setIsLoading(true);
    setMessage({ text: "", type: "" });

    try {
      const res = await fetch("/api/user/profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ firstName, lastName, email, bio }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Failed to update profile");
      }

      setMessage({ text: "Profile updated successfully!", type: "success" });
    } catch (err: any) {
      setMessage({ text: err.message, type: "error" });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {/* Avatar Card */}
      <div className="bg-card/40 backdrop-blur-md border border-border rounded-xl p-6 flex flex-col items-center justify-center col-span-1 min-h-[200px] shadow-sm">
        <div className="relative group cursor-pointer mb-4">
          <div className="w-24 h-24 rounded-full border-2 border-border overflow-hidden group-hover:border-primary transition-colors bg-muted flex items-center justify-center">
            {initialData.image ? (
              <Image src={initialData.image} alt="Avatar" width={96} height={96} className="w-full h-full object-cover" priority />
            ) : (
              <div className="text-muted-foreground group-hover:text-primary transition-colors font-bold text-3xl">
                {firstName.charAt(0) || "U"}
              </div>
            )}
          </div>
          <div className="absolute inset-0 bg-black/50 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
            <Edit className="w-5 h-5 text-white" />
          </div>
        </div>
        <button className="text-primary text-sm hover:underline font-semibold">Change Avatar</button>
      </div>

      {/* Personal Info */}
      <div className="bg-card/40 backdrop-blur-md border border-border rounded-xl p-6 col-span-1 md:col-span-2 space-y-4 shadow-sm">
        
        {message.text && (
          <div className={`p-3 rounded-md text-sm border ${message.type === 'success' ? 'bg-success/10 text-success border-success/20' : 'bg-destructive/10 text-destructive border-destructive/20'}`}>
            {message.text}
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="font-bold text-[10px] text-muted-foreground block uppercase tracking-wider">First Name</label>
            <input 
              className="w-full bg-[#09090B] border border-border rounded-md px-3 py-2 text-foreground text-sm focus:outline-none focus:border-primary transition-colors" 
              type="text" 
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </div>
          <div className="space-y-1.5">
            <label className="font-bold text-[10px] text-muted-foreground block uppercase tracking-wider">Last Name</label>
            <input 
              className="w-full bg-[#09090B] border border-border rounded-md px-3 py-2 text-foreground text-sm focus:outline-none focus:border-primary transition-colors" 
              type="text" 
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>
        </div>
        
        <div className="space-y-1.5">
          <label className="font-bold text-[10px] text-muted-foreground block uppercase tracking-wider">Email Address</label>
          <input 
            className="w-full bg-[#09090B] border border-border rounded-md px-3 py-2 text-foreground text-sm focus:outline-none focus:border-primary transition-colors" 
            type="email" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        
        <div className="space-y-1.5">
          <label className="font-bold text-[10px] text-muted-foreground block uppercase tracking-wider">Bio</label>
          <textarea 
            className="w-full bg-[#09090B] border border-border rounded-md px-3 py-2 text-foreground text-sm focus:outline-none focus:border-primary transition-colors resize-none" 
            rows={3}
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            placeholder="Tell us about yourself..."
          />
        </div>
        
        <div className="flex justify-end pt-2">
          <Button 
            className="font-bold text-xs uppercase tracking-wider" 
            onClick={handleSave}
            disabled={isLoading}
          >
            {isLoading ? "Saving..." : "Save Changes"}
          </Button>
        </div>
      </div>
    </div>
  );
}
