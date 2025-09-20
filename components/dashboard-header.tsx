// "use client"

// import { Bell, ChevronDown } from "lucide-react"
// import { Button } from "@/components/ui/button"
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
// import { Badge } from "@/components/ui/badge"
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuSeparator,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu"
// import { useAuth } from "@/components/auth-provider"
// import { useRouter } from "next/navigation"

// export function DashboardHeader() {
//   const { user, logout } = useAuth()
//   const router = useRouter()

//   const handleLogout = () => {
//     logout()
//     router.push("/login")
//   }

//   return (
//     <header className="bg-white border-b border-slate-200 px-6 py-4">
//       <div className="flex items-center justify-between">
//         <div className="flex items-center space-x-2">
//           <h1 className="text-2xl font-semibold text-slate-800">Dashboard</h1>
//         </div>

//         <div className="flex items-center space-x-4">
//           <div className="flex items-center space-x-2">
//             <span className="text-sm text-slate-600">Active Agent:</span>
//             <Badge variant="secondary" className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">
//               Primary
//             </Badge>
//           </div>

//           <Button variant="ghost" size="icon" className="relative">
//             <Bell className="w-5 h-5 text-slate-600" />
//             <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"></span>
//           </Button>

//           <DropdownMenu>
//             <DropdownMenuTrigger asChild>
//               <Button variant="ghost" className="flex items-center space-x-2 px-3">
//                 <Avatar className="w-8 h-8">
//                   <AvatarImage src="/placeholder-user.jpg" />
//                   <AvatarFallback className="bg-teal-100 text-teal-700">{user?.name?.charAt(0) || "U"}</AvatarFallback>
//                 </Avatar>
//                 <span className="text-sm text-slate-700">{user?.email}</span>
//                 <ChevronDown className="w-4 h-4 text-slate-500" />
//               </Button>
//             </DropdownMenuTrigger>
//             <DropdownMenuContent align="end" className="w-56">
//               <DropdownMenuItem>
//                 <span>Profile</span>
//               </DropdownMenuItem>
//               <DropdownMenuItem>
//                 <span>Settings</span>
//               </DropdownMenuItem>
//               <DropdownMenuSeparator />
//               <DropdownMenuItem onClick={handleLogout}>
//                 <span>Sign out</span>
//               </DropdownMenuItem>
//             </DropdownMenuContent>
//           </DropdownMenu>
//         </div>
//       </div>
//     </header>
//   )
// }


"use client"

import { useEffect, useState } from "react"
import { Bell, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useAuth } from "@/components/auth-provider"
import { useRouter } from "next/navigation"
import Cookies from "js-cookie"
import { useToast } from "@/hooks/use-toast"

interface ActionLog {
  id: number
  content_type: string
  user: string
  action: string
  timestamp: string
  object_id: string
  description: string
}

export function DashboardHeader() {
  const { user, logout } = useAuth()
  const router = useRouter()
  const { toast } = useToast()

  const [primaryAgentName, setPrimaryAgentName] = useState<string | null>(null)
  const [logs, setLogs] = useState<ActionLog[]>([])

  // Fetch Primary Agent
  useEffect(() => {
    const fetchAgents = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/agents/agents/`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${Cookies.get("Token") || ""}`,
          },
        })

        if (!res.ok) throw new Error("Failed to fetch agents")
        const data = await res.json()

        if (Array.isArray(data)) {
          const primaryAgent = data.find((agent) => agent.primary === true)
          if (primaryAgent) setPrimaryAgentName(primaryAgent.name)
        }
      } catch (err: any) {
        toast({
          title: "Error",
          description: err.message || "Failed to fetch agents",
          variant: "destructive",
        })
      }
    }

    fetchAgents()
  }, [toast])

  // Fetch Logs
  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/reports/action-logs/`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${Cookies.get("Token") || ""}`,
          },
        })

        if (!res.ok) throw new Error("Failed to fetch logs")
        const data = await res.json()

        // Sort by timestamp (latest first) and take top 5
        const sortedLogs = [...data].sort(
          (a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
        )
        setLogs(sortedLogs.slice(0, 5))
      } catch (err: any) {
        toast({
          title: "Error",
          description: err.message || "Failed to fetch logs",
          variant: "destructive",
        })
      }
    }

    fetchLogs()
  }, [toast])

  const handleLogout = () => {
    Cookies.remove("Token")
    Cookies.remove("adminToken")
    Cookies.remove("TempToken")
    Cookies.remove("CaptchaToken")
    localStorage.removeItem("user")
    localStorage.removeItem("userAuth")
    localStorage.removeItem("loginType")

    logout()
    router.push("/login")
  }

  const handleAccountSettings = () => {
    router.push("/dashboard/account-settings/personal-settings")
  }

  const handleBilling = () => {
    router.push("/dashboard/account-settings/billing")
  }

  return (
    <header className="bg-white border-b border-slate-200 px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <h1 className="text-2xl font-semibold text-slate-800">Dashboard</h1>
        </div>

        <div className="flex items-center space-x-4">
          {primaryAgentName && (
            <div className="flex items-center space-x-2">
              <span className="text-sm text-slate-600">Primary Agent:</span>
              <Badge variant="secondary" className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">
                {primaryAgentName}
              </Badge>
            </div>
          )}

          {/* Logs Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="w-5 h-5 text-slate-600" />
                {logs.length > 0 && (
                  <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                )}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-80 p-2 space-y-2 shadow-xl rounded-xl">
              <h3 className="text-sm font-semibold text-slate-700 px-2">Recent Activity</h3>
              <DropdownMenuSeparator />
              {logs.length > 0 ? (
                logs.map((log) => (
                  <DropdownMenuItem key={log.id} className="flex flex-col items-start p-2 space-y-1">
                    <div className="flex items-center justify-between w-full">
                      <span className="text-sm font-medium text-slate-800">{log.description}</span>
                      <Badge
                        className={`text-xs ${
                          log.action === "create"
                            ? "bg-green-100 text-green-800"
                            : log.action === "delete"
                            ? "bg-red-100 text-red-800"
                            : "bg-gray-100 text-gray-800"
                        }`}
                      >
                        {log.action}
                      </Badge>
                    </div>
                    <span className="text-xs text-slate-500">
                      {new Date(log.timestamp).toLocaleString()} • {log.user}
                    </span>
                  </DropdownMenuItem>
                ))
              ) : (
                <DropdownMenuItem className="text-sm text-slate-500">No recent activity</DropdownMenuItem>
              )}
            </DropdownMenuContent>
          </DropdownMenu>

          {/* User Menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="flex items-center space-x-2 px-3">
                <Avatar className="w-8 h-8">
                  <AvatarImage src="/placeholder-user.jpg" />
                  <AvatarFallback className="bg-teal-100 text-teal-700">
                    {user?.name?.charAt(0) || "U"}
                  </AvatarFallback>
                </Avatar>
                <span className="text-sm text-slate-700">{user?.email}</span>
                <ChevronDown className="w-4 h-4 text-slate-500" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuItem onClick={handleBilling}>
                <span>Billings</span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={handleAccountSettings}>
                <span>Settings</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleLogout}>
                <span>Sign out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  )
}

