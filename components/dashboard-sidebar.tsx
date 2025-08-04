"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import {
  Home,
  MessageSquare,
  Users,
  Settings,
  Cog,
  Building,
  GitBranch,
  Puzzle,
  CheckSquare,
  FileText,
  User,
  CreditCard,
  UserCog,
  ChevronDown,
  ChevronRight,
  FilePlus,
  ShieldCheck,
} from "lucide-react"

const navigationItems = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: Home,
  },
  {
    title: "Conversations",
    href: "/dashboard/conversations",
    icon: MessageSquare,
  },
  {
    title: "Agents",
    href: "/dashboard/agents",
    icon: Users,
    companyOnly: true,
  },
  {
    title: "Agent settings",
    href: "/dashboard/agent-settings",
    icon: Settings,
    companyOnly: true,
  },
  {
    title: "Users",
    href: "/dashboard/users",
    icon: UserCog,
    companyOnly: true,
  },
  // {
  //   title: "System Setting",
  //   icon: Cog,
  //   companyOnly: true,
  //   children: [
  //     {
  //       title: "Company",
  //       href: "/system-settings/company",
  //       icon: Building,
  //     },
  //     {
  //       title: "Branch",
  //       href: "/system-settings/branch",
  //       icon: GitBranch,
  //     },
  //   ],
  // },
  {
    title: "Integrations",
    href: "/dashboard/integrations",
    icon: Puzzle,
  },
  {
    title: "Tasks",
    href: "/dashboard/tasks",
    icon: CheckSquare,
  },
  // {
  //   title: "Upload Documents",
  //   href: "/dashboard/upload-documents",
  //   icon: FilePlus,
  // },
  {
    title: "Content",
    href: "/dashboard/content",
    icon: FileText,
    companyOnly: true,
  },
  {
    title: "Account Setting",
    icon: User,
    companyOnly: true,
    children: [
      {
        title: "Billing",
        href: "/account-settings/billing",
        icon: CreditCard,
      },
      {
        title: "User Module",
        href: "/account-settings/user-module",
        icon: UserCog,
      },
      {
        title: "Personal Settings",
        href: "dashboard//account-settings/personal-settings",
        icon: ShieldCheck,
      },
    ],
  },
]

export function DashboardSidebar() {
  const pathname = usePathname()
  const [expandedItems, setExpandedItems] = useState<string[]>(["System Setting", "Account Setting"])
  const [isCollapsed, setIsCollapsed] = useState(false)

  // Get login type from localStorage
  const loginType = typeof window !== "undefined" ? localStorage.getItem("loginType") : "company"

  // Filter navigation items based on login type
  const filteredNavigationItems = navigationItems.filter((item) => {
    if (loginType === "user" && item.companyOnly) {
      return false
    }
    return true
  })

  const toggleExpanded = (title: string) => {
    setExpandedItems((prev) => (prev.includes(title) ? prev.filter((item) => item !== title) : [...prev, title]))
  }

  return (
    <div
      className={`${isCollapsed ? "w-16" : "w-64"} sidebar-gradient text-white flex flex-col transition-all duration-300`}
    >
      <div className="p-6 border-b border-teal-600/30 flex items-center justify-between">
        {!isCollapsed && (
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-white/10 rounded-lg flex items-center justify-center">
              <MessageSquare className="w-5 h-5" />
            </div>
            <span className="text-xl font-semibold">Smart Convo</span>
          </div>
        )}
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="p-1 hover:bg-white/10 rounded transition-colors"
        >
          <ChevronRight className={`w-4 h-4 transition-transform ${isCollapsed ? "" : "rotate-180"}`} />
        </button>
      </div>

      <nav className="flex-1 p-4 space-y-1">
        {filteredNavigationItems.map((item) => (
          <div key={item.title}>
            {item.children ? (
              <div>
                <button
                  onClick={() => !isCollapsed && toggleExpanded(item.title)}
                  className={cn(
                    "w-full flex items-center justify-between px-3 py-2.5 text-sm rounded-lg transition-colors",
                    "hover:bg-white/10 text-white/90 hover:text-white",
                  )}
                  title={isCollapsed ? item.title : undefined}
                >
                  <div className="flex items-center space-x-3">
                    <item.icon className="w-5 h-5" />
                    {!isCollapsed && <span>{item.title}</span>}
                  </div>
                  {!isCollapsed &&
                    (expandedItems.includes(item.title) ? (
                      <ChevronDown className="w-4 h-4" />
                    ) : (
                      <ChevronRight className="w-4 h-4" />
                    ))}
                </button>
                {!isCollapsed && expandedItems.includes(item.title) && (
                  <div className="ml-6 mt-1 space-y-1">
                    {item.children.map((child) => (
                      <Link
                        key={child.href}
                        href={child.href}
                        className={cn(
                          "flex items-center space-x-3 px-3 py-2 text-sm rounded-lg transition-colors",
                          pathname === child.href
                            ? "bg-white/20 text-white"
                            : "text-white/70 hover:bg-white/10 hover:text-white",
                        )}
                      >
                        <child.icon className="w-4 h-4" />
                        <span>{child.title}</span>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <Link
                href={item.href}
                className={cn(
                  "flex items-center space-x-3 px-3 py-2.5 text-sm rounded-lg transition-colors",
                  pathname === item.href
                    ? "bg-white/20 text-white"
                    : "text-white/90 hover:bg-white/10 hover:text-white",
                )}
                title={isCollapsed ? item.title : undefined}
              >
                <item.icon className="w-5 h-5" />
                {!isCollapsed && <span>{item.title}</span>}
              </Link>
            )}
          </div>
        ))}
      </nav>
    </div>
  )
}
