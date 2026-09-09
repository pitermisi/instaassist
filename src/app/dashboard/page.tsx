import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import InstagramProfile from "@/components/InstagramProfile";
import LogoutButton from "@/components/LogoutButton";

export default async function DashboardPage() {
  const user = await getCurrentUser();

  if (!user || user.instagramAccounts.length === 0) {
    redirect("/");
  }

  const account = user.instagramAccounts[0];

  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-4">
      <InstagramProfile
        username={account.username}
        name={account.name}
        accountType={account.accountType}
        instagramUserId={account.instagramUserId}
        profilePictureUrl={account.profilePictureUrl}
      />
      <div className="mt-6">
        <LogoutButton />
      </div>
    </main>
  );
}
