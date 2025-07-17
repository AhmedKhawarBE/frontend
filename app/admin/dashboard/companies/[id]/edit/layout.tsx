"use client"

import type React from "react"
import { useParams, usePathname } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"

const tabs = [
  { id: "agents", label: "Agent Info", href: "agents" },
  { id: "agent-settings", label: "Agent Settings", href: "agent-settings" },
  { id: "conversations", label: "Conversations", href: "conversations" },
  { id: "integrations", label: "Integrations", href: "integrations" },
  { id: "billing", label: "Billing Info", href: "billing" },
]

export default function EditCompanyLayout({ children }: { children: React.ReactNode }) {
  const params = useParams()
  const pathname = usePathname()
  const companyId = params.id

  const currentTab = pathname.split("/").pop()

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Link href="/admin/dashboard/companies">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Companies
            </Button>
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Edit Company</h1>
            <p className="text-gray-600">Company ID: {companyId}</p>
          </div>
        </div>
      </div>

      {/* Horizontal Navigation */}
      <div className="border-b border-gray-200">
        <nav className="flex space-x-8">
          {tabs.map((tab) => (
            <Link
              key={tab.id}
              href={`/admin/dashboard/companies/${companyId}/edit/${tab.href}`}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                currentTab === tab.href
                  ? "border-blue-500 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              {tab.label}
            </Link>
          ))}
        </nav>
      </div>

      {/* Content */}
      <div>{children}</div>
    </div>
  )
}
