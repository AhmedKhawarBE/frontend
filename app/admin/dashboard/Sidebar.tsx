"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Home, Building2, LogOut, Menu, X, Bell, User, CreditCard, ChevronDown, ChevronUp, Phone } from "lucide-react"

const sidebarItems = [
  { name: "Dashboard", href: "/admin/dashboard", icon: Home },
  { name: "Companies", href: "/admin/dashboard/companies", icon: Building2 },
  { name: "Manage Numbers", href: "/admin/dashboard/numbers", icon: Phone },
  {
    name: "Billing",
    icon: CreditCard,
    children: [
      { name: "Manage plans", href: "/admin/dashboard/billing/plans" },
      { name: "Manage subscriptions", href: "/admin/dashboard/billing/subscriptions" },
    //   { name: "Manage usage", href: "/admin/dashboard/billing/usage" },
    ],
  },
]

export default function Sidebar() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [billingOpen, setBillingOpen] = useState(false)
  const router = useRouter()

  const handleLogout = () => {
    localStorage.removeItem("adminAuth")
    router.push("/admin")
  }

  return (
    <div className={`bg-slate-800 text-white transition-all duration-300 ${sidebarOpen ? "w-64" : "w-16"} relative`}>
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
        {sidebarItems.map((item) =>
          item.children ? (
            <div key={item.name}>
              <button
                onClick={() => setBillingOpen(!billingOpen)}
                className="flex items-center w-full px-4 py-3 text-gray-300 hover:bg-slate-700 hover:text-white transition-colors"
              >
                <item.icon size={20} />
                <span className={`ml-3 flex-1 text-left ${sidebarOpen ? "block" : "hidden"}`}>{item.name}</span>
                {sidebarOpen && (billingOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />)}
              </button>
              {billingOpen && sidebarOpen && (
                <div className="ml-8">
                  {item.children.map((child) => (
                    <Link
                      key={child.name}
                      href={child.href}
                      className="block px-4 py-2 text-sm text-gray-400 hover:bg-slate-700 hover:text-white rounded"
                    >
                      {child.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ) : (
            <Link
              key={item.name}
              href={item.href!}
              className="flex items-center px-4 py-3 text-gray-300 hover:bg-slate-700 hover:text-white transition-colors"
            >
              <item.icon size={20} />
              <span className={`ml-3 ${sidebarOpen ? "block" : "hidden"}`}>{item.name}</span>
            </Link>
          )
        )}
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
  )
}
