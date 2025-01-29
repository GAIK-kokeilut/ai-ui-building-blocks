import { signOutAction } from "@/app/(auth)/actions";
import { createClient } from "@/lib/db/supabase/server";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
  const supabase = await createClient();
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error || !user) {
    redirect("/login");
  }

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <form>
          <button
            formAction={signOutAction}
            className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700"
          >
            Kirjaudu ulos
          </button>
        </form>
      </div>
      <p>Tervetuloa, {user.email}!</p>
    </div>
  );
}
