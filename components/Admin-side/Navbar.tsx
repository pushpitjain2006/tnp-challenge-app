"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { LogOut, LucideLogOut, Menu } from "lucide-react";
import { redirect } from "next/navigation";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = async () => {
    await fetch("/api/logout", { method: "GET" });
    redirect("/login");
  };

  return (
    <nav className="w-full border-b bg-white px-4 py-3 shadow-sm">
      <div className="mx-auto max-w-7xl flex justify-between items-center">
        {/* Logo */}
        <div className="text-xl font-bold text-zinc-800">Students Management Portal</div>

        {/* Desktop Menu */}
        <div className="hidden md:flex gap-4 items-center">
          <Button variant="ghost" onClick={handleLogout}>
            Logout
            <LogOut className=" h-4 w-4" />

          </Button>
        </div>

        {/* Mobile Menu */}
        <div className="md:hidden">
          <Sheet open={menuOpen} onOpenChange={setMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" aria-label="Toggle Menu">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[200px]">
              <div className="mt-8 flex flex-col gap-4">
                {/* public/DTU Delhi Logo.png */}
                <div className="flex items-center justify-center mb-4">
                  <img
                    src="/DTU Delhi Logo.png"
                    alt="DTU Logo"
                    className="h-20 w-auto"
                  />
                </div>
                <Button variant="outline" onClick={handleLogout}>
                  Logout
                  <LogOut className="h-4 w-4" />
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
}