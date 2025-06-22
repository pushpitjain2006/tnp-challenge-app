// components/LoginForm.tsx
"use client";

import { redirect } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { z } from "zod";
import React, { useState } from "react";
import { toast } from "sonner";

const LOGIN_SCHEMA = z.object({
  username: z.string().min(5, "Username must be at least 5 characters"),
  password: z.string().min(5, "Password must be at least 5 characters"),
});

const LoginForm = () => {

  const [formData, setFormData] = useState({ username: "", password: "" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogin = async (event: React.FormEvent) => {
    event.preventDefault();
    const result = LOGIN_SCHEMA.safeParse(formData);
    if (!result.success) {
      toast.error(result.error.errors.map((e) => e.message).join("\n"));
      return;
    }

    const res = await fetch("/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    if (res.status === 200) {
      toast.success("Login successful!");
      redirect("/admin");
    } else {
      toast.error("Login failed. Please check your credentials.");
    }
  };

  return (
    <Card className="w-full max-w-md shadow-md">
      <CardHeader>
        <CardTitle className="text-4xl text-center">Admin Login</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleLogin} className="space-y-5">
          <div className="space-y-2">
            <Label>Username</Label>
            <Input type="text" id="username" name="username" required onChange={handleChange} />
          </div>

          <div className="space-y-2">
            <Label>Password</Label>
            <Input type="password" id="password" name="password" required onChange={handleChange} />
          </div>

          <Button type="submit" className="w-full">
            Login
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};
export default LoginForm;