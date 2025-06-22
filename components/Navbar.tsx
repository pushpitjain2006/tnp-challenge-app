"use client";

import { redirect } from "next/navigation";
import { useState } from "react";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const handleLogout = async () => {
    await fetch("/api/logout", { method: "GET" });
    redirect("/login");
  };
  return (
    <nav className="flex justify-between items-center px-4 py-3 border-b">
      <div className="flex items-center gap-2">
        <span className="text-xl font-bold">DTU T&P</span>
      </div>

      {/* Hamburger for mobile */}
      <button
        className="md:hidden flex flex-col justify-center items-center w-8 h-8"
        onClick={() => setMenuOpen((prev) => !prev)}
        aria-label="Toggle menu"
      >
        <span className="block w-6 h-0.5 bg-black mb-1"></span>
        <span className="block w-6 h-0.5 bg-black mb-1"></span>
        <span className="block w-6 h-0.5 bg-black"></span>
      </button>

      {/* Menu */}
      <div
        className={`
          ${menuOpen ? "flex" : "hidden"}
          absolute top-16 right-4 bg-white border rounded shadow-md flex-col gap-4 p-4 md:static md:flex md:flex-row md:items-center md:gap-6 md:bg-transparent md:shadow-none md:border-0 md:p-0
        `}
      >
        <button onClick={handleLogout} className="text-lg">
          Logout
        </button>
      </div>
    </nav>
  );
}