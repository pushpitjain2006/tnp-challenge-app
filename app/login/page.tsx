"use server"
import LoginForm from "@/components/Auth/LoginForm";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function LoginPage() {
  const cookiesStore = await cookies();
  const accessToken = cookiesStore.get("accessToken")?.value;

  if (accessToken) {
    redirect("/admin");
  }

  return (
    <div className="h-screen flex items-center justify-center bg-zinc-100">
      <LoginForm />
    </div>
  );
}