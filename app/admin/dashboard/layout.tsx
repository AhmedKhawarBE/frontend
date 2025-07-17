"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Home, Building2, Users, Settings, LogOut, Menu, X, Bell, User } from "lucide-react"

const sidebarItems = [
  { name: "Dashboard", href: "/admin/dashboard", icon: Home },
  { name: "Companies", href: "/admin/dashboard/companies", icon: Building2 },
  { name: "Users", href: "/admin/dashboard/users", icon: Users },
  { name: "Settings", href: "/admin/dashboard/settings", icon: Settings },
]

export default function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const router = useRouter()

  const handleLogout = () => {
    localStorage.removeItem("adminAuth")
    router.push("/admin")
  }

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className={`bg-slate-800 text-white transition-all duration-300 ${sidebarOpen ? "w-64" : "w-16"}`}>
        <div className="flex items-center justify-between p-4">
          <h1 className={`font-bold text-xl ${sidebarOpen ? "block" : "hidden"}`}>Smart Convo</h1>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="text-white hover:bg-slate-700"
          >
            {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </Button>
        </div>

        <nav className="mt-8">
          {sidebarItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="flex items-center px-4 py-3 text-gray-300 hover:bg-slate-700 hover:text-white transition-colors"
            >
              <item.icon size={20} />
              <span className={`ml-3 ${sidebarOpen ? "block" : "hidden"}`}>{item.name}</span>
            </Link>
          ))}
        </nav>

        <div className="absolute bottom-4 left-4 right-4">
          <Button
            variant="ghost"
            onClick={handleLogout}
            className="w-full justify-start text-gray-300 hover:bg-slate-700 hover:text-white"
          >
            <LogOut size={20} />
            <span className={`ml-3 ${sidebarOpen ? "block" : "hidden"}`}>Logout</span>
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-white shadow-sm border-b px-6 py-4">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-semibold text-gray-800">Admin Dashboard</h2>
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm">
                <Bell size={20} />
              </Button>
              <div className="flex items-center space-x-2">
                <User size={20} className="text-gray-600" />
                <span className="text-sm text-gray-600">admin@smartconvo.com</span>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-auto p-6">{children}</main>
      </div>
    </div>
  )
}
