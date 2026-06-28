import { DashboardLayout } from "@/layouts/dashboard-layout";
import { SettingsSidebar } from "@/components/settings/settings-sidebar";
import { ProfileSettings } from "@/components/settings/profile-settings";
import { PreferencesSettings } from "@/components/settings/preferences-settings";
import { AppearanceSettings } from "@/components/settings/appearance-settings";
import { auth } from "@/auth";
import connectDB from "@/lib/db";
import { User } from "@/models/User";
import { redirect } from "next/navigation";

export default async function SettingsPage(
  props: {
    searchParams?: Promise<{ [key: string]: string | string[] | undefined }>
  }
) {
  const searchParams = await props.searchParams;
  const tab = typeof searchParams?.tab === 'string' ? searchParams.tab : 'profile';
  const session = await auth();

  if (!session?.user) {
    redirect("/login");
  }

  await connectDB();
  const dbUser = await User.findOne({ email: session.user.email }).lean();

  if (!dbUser) {
    redirect("/login");
  }

  const userData = {
    name: dbUser.name || "",
    email: dbUser.email || "",
    bio: dbUser.bio || "",
    image: dbUser.image || "",
  };
  return (
    <DashboardLayout>
      <div className="flex-1 overflow-y-auto p-4 lg:p-8 flex gap-8 relative bg-background">
        
        {/* Settings Vertical Nav */}
        <SettingsSidebar activeTab={tab} />

        {/* Settings Canvas */}
        <div className="flex-1 max-w-4xl space-y-8 pb-12">
          
          {tab === 'profile' && (
            <>
              <div className="mb-8 border-b border-border pb-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <h2 className="text-3xl font-bold text-foreground mb-1">Profile Settings</h2>
                <p className="text-muted-foreground text-sm">Manage your personal information and preferences.</p>
              </div>

              <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 delay-75 fill-mode-both">
                <ProfileSettings initialData={userData} />
              </div>
              
              <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 delay-150 fill-mode-both">
                <PreferencesSettings />
              </div>
            </>
          )}

          {tab === 'appearance' && (
            <AppearanceSettings />
          )}

          {tab !== 'profile' && tab !== 'appearance' && (
            <div className="flex-1 flex items-center justify-center h-[50vh] text-muted-foreground animate-in fade-in duration-500">
              This settings page is under construction.
            </div>
          )}

        </div>
      </div>
    </DashboardLayout>
  );
}
