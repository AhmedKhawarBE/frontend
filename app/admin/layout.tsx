"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useRouter, usePathname } from "next/navigation"

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [loading, setLoading] = useState(true)
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    const adminAuth = localStorage.getItem("adminAuth")

    if (pathname === "/admin" && adminAuth === "true") {
      router.push("/admin/dashboard")
      return
    }

    if (pathname !== "/admin" && adminAuth !== "true") {
      router.push("/admin")
      return
    }

    setIsAuthenticated(adminAuth === "true")
    setLoading(false)
  }, [pathname, router])

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>
  }

  return <>{children}</>
}
