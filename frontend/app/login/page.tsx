"use client"

import { useAuth } from "@/lib/auth"
import { useRouter } from "next/navigation"

export default function Login() {
  const router = useRouter()
  const { isAuthenticated, login } = useAuth()

  // Redirect if already authenticated
  if (isAuthenticated) {
    router.replace("/dashboard")
    return null
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Login with demo user data
    login({ id: "1", name: "Demo User", email: "demo@example.com" })
    router.push("/dashboard")
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-96">
        <h1 className="text-2xl font-bold mb-6">Login</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <p className="text-gray-600">Click login to continue as demo user.</p>
          </div>
          <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700">
            Login as Demo User
          </button>
        </form>
      </div>
    </div>
  )
}