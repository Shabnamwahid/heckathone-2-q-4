"use client"
import { useAuth } from "@/lib/auth"
import { useRouter } from "next/navigation"

export default function Register() {
  const router = useRouter()
  const { isAuthenticated, login } = useAuth()

  if (isAuthenticated) {
    router.replace("/dashboard") // or your tasks/home page
    return null
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Register with demo user data
    login({ id: "1", name: "Demo User", email: "demo@example.com" })
    router.push("/dashboard")
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-96">
        <h1 className="text-2xl font-bold mb-6">Register for TodoFlow</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="mb-4">
            <p className="text-gray-600">Click register to create a demo account.</p>
          </div>
          <button type="submit" className="w-full bg-green-600 text-white p-2 rounded hover:bg-green-700">
            Register as Demo User
          </button>
        </form>
      </div>
    </div>
  )
}