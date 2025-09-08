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

import { Bell, ChevronDown } from 'lucide-react'
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

export function DashboardHeader() {
  const { user, logout } = useAuth()
  const router = useRouter()

  const handleLogout = () => {
    // Clear all cookies and localStorage
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

  return (
    <header className="bg-white border-b border-slate-200 px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <h1 className="text-2xl font-semibold text-slate-800">Dashboard</h1>
        </div>

        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <span className="text-sm text-slate-600">Active Agent:</span>
            <Badge variant="secondary" className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">
              Primary
            </Badge>
          </div>

          <Button variant="ghost" size="icon" className="relative">
            <Bell className="w-5 h-5 text-slate-600" />
            <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="flex items-center space-x-2 px-3">
                <Avatar className="w-8 h-8">
                  <AvatarImage src="/placeholder-user.jpg" />
                  <AvatarFallback className="bg-teal-100 text-teal-700">{user?.name?.charAt(0) || "U"}</AvatarFallback>
                </Avatar>
                <span className="text-sm text-slate-700">{user?.email}</span>
                <ChevronDown className="w-4 h-4 text-slate-500" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuItem>
                <span>Profile</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
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