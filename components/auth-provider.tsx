"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"
import { useRouter } from "next/navigation"

interface User {
  email: string
  name: string
  type?: "company" | "user" // Added type to user object
}

interface AuthContextType {
  user: User | null
  login: (userData: User) => void
  logout: () => void
  isAuthenticated: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const router = useRouter()

  useEffect(() => {
    // Check for user in localStorage on mount
    const storedUser = localStorage.getItem("user")
    const storedAuth = localStorage.getItem("userAuth")
    const storedLoginType = localStorage.getItem("loginType")

    if (storedUser && storedAuth === "true") {
      const parsedUser: User = JSON.parse(storedUser)
      // Ensure the type is correctly set from localStorage
      if (storedLoginType === "company" || storedLoginType === "user") {
        parsedUser.type = storedLoginType
      }
      setUser(parsedUser)
      setIsAuthenticated(true)
    }
  }, [])

  const login = (userData: User) => {
    setUser(userData)
    setIsAuthenticated(true)
    localStorage.setItem("user", JSON.stringify(userData))
    localStorage.setItem("userAuth", "true")
    localStorage.setItem("loginType", userData.type || "company") // Store login type
  }

  const logout = () => {
    setUser(null)
    setIsAuthenticated(false)
    localStorage.removeItem("user")
    localStorage.removeItem("userAuth")
    localStorage.removeItem("loginType") // Clear login type on logout
    router.push("/login")
  }

  return <AuthContext.Provider value={{ user, login, logout, isAuthenticated }}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
