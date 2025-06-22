"use server"
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function HomePage() {
  const cookiesList = await cookies();
  const accessToken = cookiesList.get("accessToken")?.value;

  if (accessToken) {
    redirect("/admin");
  } else {
    redirect("/login");
  }
}