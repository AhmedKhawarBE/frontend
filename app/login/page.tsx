"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Cookies from "js-cookie"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Eye, EyeOff, MessageSquare, Building, User } from "lucide-react"
import { useAuth } from "@/components/auth-provider"
import { cn } from "@/lib/utils"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [loginType, setLoginType] = useState<"company" | "user">("company") // Default to company login
  const router = useRouter()
  const { login } = useAuth()

  useEffect(() => {
    // Set initial login type from localStorage if available
    const storedLoginType = localStorage.getItem("loginType")
    if (storedLoginType === "user" || storedLoginType === "company") {
      setLoginType(storedLoginType)
    }
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault()
  setIsLoading(true)

  try {

    const response = await fetch("http://127.0.0.1:8000/api/login/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    })
    
    const data = await response.json()
    console.log("Login response:", data)
    if (!response.ok) {
      throw new Error(data?.message || "Login failed")
    }

    // Check if user is verified
    console.log(data.token, "User type:", data.last_login, "Login type:", data.user_type)
    
    if (data.token && data.user_type === "company_user" && !data.last_login) {
      
      router.push("/first-time-setup")
     
    }

    else if (data.token && data.user_type === loginType || (data.user_type === "company_user" && loginType === "user")) {
      // Store login type in localStorage
      localStorage.setItem("loginType", loginType)
      Cookies.set("Token", data.token, { expires: 7 })
      const token = Cookies.get("Token")

      // Simulate login 
      
      login({ email, name: data.name || "John Doe", type: loginType })
      

      router.push("/dashboard")
    } else {
      alert("User not verified or login type mismatch")
    }
  } catch (err: any) {
    console.error("Login error:", err)
    alert(err.message)
  } finally {
    setIsLoading(false)
  }
}


  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 p-4">
      <Card className="w-full max-w-md shadow-xl border-0">
        <CardHeader className="space-y-4 text-center">
          <div className="flex items-center justify-center space-x-2">
            <div className="w-10 h-10 bg-gradient-to-br from-teal-600 to-teal-700 rounded-lg flex items-center justify-center">
              <MessageSquare className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold text-slate-800">Smart Convo</span>
          </div>
          <div>
            <CardTitle className="text-2xl text-slate-800">Welcome back</CardTitle>
            <CardDescription className="text-slate-600">Sign in to your account to continue</CardDescription>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex justify-center gap-4 mb-6">
            <Button
              variant={loginType === "company" ? "default" : "outline"}
              onClick={() => setLoginType("company")}
              className={cn(
                "flex-1 h-11",
                loginType === "company"
                  ? "bg-teal-600 hover:bg-teal-700 text-white"
                  : "border-teal-600 text-teal-600 hover:bg-teal-50",
              )}
            >
              <Building className="mr-2 h-4 w-4" /> Login as Company
            </Button>
            <Button
              variant={loginType === "user" ? "default" : "outline"}
              onClick={() => setLoginType("user")}
              className={cn(
                "flex-1 h-11",
                loginType === "user"
                  ? "bg-teal-600 hover:bg-teal-700 text-white"
                  : "border-teal-600 text-teal-600 hover:bg-teal-50",
              )}
            >
              <User className="mr-2 h-4 w-4" /> Login as User
            </Button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-slate-700">
                {loginType === "company" ? "Company Email" : "User Email"}
              </Label>
              <Input
                id="email"
                type="email"
                placeholder={loginType === "company" ? "Enter your company email" : "Enter your user email"}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="h-11"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password" className="text-slate-700">
                Password
              </Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="h-11 pr-10"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4 text-slate-500" />
                  ) : (
                    <Eye className="h-4 w-4 text-slate-500" />
                  )}
                </Button>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <Link href="/forgot-password" className="text-sm text-teal-600 hover:text-teal-700">
                Forgot password?
              </Link>
              <Link href="/admin" className="text-sm text-gray-600 hover:text-gray-700">
                Admin Login
              </Link>
            </div>
            <Button type="submit" className="w-full h-11 bg-teal-600 hover:bg-teal-700 text-white" disabled={isLoading}>
              {isLoading ? "Signing in..." : "Sign in"}
            </Button>
          </form>
          <div className="mt-6 text-center">
            <p className="text-sm text-slate-600">
              {"Don't have an account? "}
              <Link href="/signup" className="text-teal-600 hover:text-teal-700 font-medium">
                Sign up
              </Link>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
