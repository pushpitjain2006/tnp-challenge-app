"use client"
import React from 'react'

const page = () => {
    const handleLogin = async (event: React.FormEvent) => {
    event.preventDefault()
    const form = event.target as HTMLFormElement
    const username = form.username.value
    const password = form.password.value
    const res = await fetch('/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),

    })
    if(res.status === 200) {
      window.location.href = '/admin'
    }
    else {
      alert('Login failed. Please check your credentials.')
    }
  }
  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleLogin}>
        <label>
          Username:
          <input type="text" name="username" required />
        </label>
        <label>
          Password:
          <input type="password" name="password" required />
        </label>
        <button type="submit">Login</button>
      </form>
    </div>
  )
}

export default page
