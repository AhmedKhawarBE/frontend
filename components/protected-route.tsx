"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/components/auth-provider"

interface ProtectedRouteProps {
  allowedRoles: ("admin" | "company" | "user")[]
  children: React.ReactNode
}

export default function ProtectedRoute({ allowedRoles, children }: ProtectedRouteProps) {
  const { user, isAuthenticated } = useAuth()
  const router = useRouter()

  const userType = user?.type

  useEffect(() => {
    // Redirect if userType is undefined or not allowed
    if (!isAuthenticated || !userType || !allowedRoles.includes(userType)) {
      router.replace("/login")
    }
  }, [isAuthenticated, userType, allowedRoles, router])

  if (!isAuthenticated || !userType || !allowedRoles.includes(userType)) {
    return null
  }

  return <>{children}</>
}
