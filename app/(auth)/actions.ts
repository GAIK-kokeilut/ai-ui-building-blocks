"use server";

import { createClient } from "@/lib/db/supabase/server";
import { redirect, RedirectType } from "next/navigation";

export async function signInAction(formData: FormData) {
  const supabase = await createClient();

  const { error } = await supabase.auth.signInWithPassword({
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  });

  if (error) {
    // Käytä encodedRedirect-funktiota tai palauta suoraan Message-objekti
    return redirect(`/login?error=${encodeURIComponent(error.message)}`);
  }

  redirect("/dashboard", RedirectType.push);
}

export async function signUpAction(formData: FormData) {
  const supabase = await createClient();
  const origin = process.env.NEXT_PUBLIC_APP_URL;

  const { error } = await supabase.auth.signUp({
    email: formData.get("email") as string,
    password: formData.get("password") as string,
    options: {
      emailRedirectTo: `${origin}/auth/callback`,
    },
  });

  if (error) {
    redirect("/signup?error=" + encodeURIComponent(error.message));
  }

  redirect(
    "/signup?message=" +
      encodeURIComponent("Tarkista sähköpostisi vahvistaaksesi tilisi."),
  );
}

export async function signOutAction() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect("/login");
}
