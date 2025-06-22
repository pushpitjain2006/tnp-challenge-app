"use client";

import { redirect } from "next/navigation";

export default function Navbar() {
  const handleLogout = async () => {
    await fetch("/api/logout", { method: "GET" });
    redirect("/login");
  };
  return (
    <nav className="flex justify-between items-center px-6 py-4 border-b">
      <div className="flex items-center gap-2">
        <span className="text-xl font-bold">DTU T&P</span>
      </div>
      <div className="flex gap-6 items-center text-lg">
        <button onClick={handleLogout}>Logout</button>
      </div>
    </nav>
  );
}