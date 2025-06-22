'use client'

export default function Navbar() {
  return (
    <nav className="flex justify-between items-center px-6 py-4 border-b">
      <div className="flex items-center gap-2">
        <span className="text-xl font-bold">DTU T&P</span>
      </div>
      <div className="flex gap-6 items-center text-lg">
        <a href="#">Home</a>
        <a href="#">About</a>
        <a href="#">Contact</a>
      </div>
    </nav>
  )
}