"use client"
import { redirect } from 'next/navigation';
import React from 'react'
import { z } from "zod";

const LoginForm = () => {
  const handleLogin = async (event: React.FormEvent) => {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    const username = form.username.value;
    const password = form.password.value;
    const loginSchema = z.object({
      username: z.string().min(5, "Username must be at least 5 character"),
      password: z.string().min(5, "Password must be at least 5 character"),
    });

    const result = loginSchema.safeParse({ username, password });
    if (!result.success) {
      alert(result.error.errors.map(e => e.message).join('\n'));
      return;
    }
    const res = await fetch('/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    })
    if (res.status === 200) {
     redirect('/admin');
    }
    else {
      alert('Login failed. Please check your credentials.')
    }
  }
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-6 sm:p-8">
        <h1 className="text-2xl font-bold mb-6 text-center">Login</h1>
        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="block text-gray-700 mb-2" htmlFor="username">
              Username:
            </label>
            <input
              type="text"
              name="username"
              id="username"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-2" htmlFor="password">
              Password:
            </label>
            <input
              type="password"
              name="password"
              id="password"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition-colors font-semibold"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  )
}

export default LoginForm
