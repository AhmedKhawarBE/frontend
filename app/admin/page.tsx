// "use client"

// import type React from "react"

// import { useState } from "react"
// import { useRouter } from "next/navigation"
// import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"
// import { Label } from "@/components/ui/label"
// import Cookies from "js-cookie"
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
// import { Alert, AlertDescription } from "@/components/ui/alert"


// export default function AdminLogin() {
//   const [credentials, setCredentials] = useState({ username: "", password: "" })
//   const [error, setError] = useState("")
//   const [loading, setLoading] = useState(false)
//   const router = useRouter()

//   const handleLogin = async (e: React.FormEvent) => {
//   e.preventDefault()
//   setLoading(true)
//   setError("")

//   try {
//     const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/login/`, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({
//         email: credentials.username,
//         password: credentials.password
//       }),
//     })
    
//     const data = await response.json()
//     alert("Login response: " + JSON.stringify(data))
//     if (!response.ok) {
//       throw new Error(data?.message || "Invalid credentials")
//     }

//     if (data.token && data.user_type === "superuser") {
//       Cookies.set("adminToken", data.token, { expires: 7 })
//       const token = Cookies.get("adminToken")
//       localStorage.setItem("adminAuth", "true")
//       if (data.token) {
//       localStorage.setItem("user", JSON.stringify({
//         token: data.token,
//         email: credentials.username,
//         role: "admin",
//       }))
//       }
//       router.push("/admin/dashboard")
//     } else {
//       setError("Admin not verified or invalid type")
//     }
//   } catch (err: any) {
//     console.error("Login error:", err)
//     setError(err.message || "Login failed")
//   } finally {
//     setLoading(false)
//   }
// }

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-50">
//       <Card className="w-full max-w-md">
//         <CardHeader className="text-center">
//           <CardTitle className="text-2xl font-bold">Smart Convo Admin</CardTitle>
//           <CardDescription>Sign in to access the admin dashboard</CardDescription>
//         </CardHeader>
//         <CardContent>
//           <form onSubmit={handleLogin} className="space-y-4">
//             <div className="space-y-2">
//               <Label htmlFor="username">Username</Label>
//               <Input
//                 id="username"
//                 type="text"
//                 value={credentials.username}
//                 onChange={(e) => setCredentials((prev) => ({ ...prev, username: e.target.value }))}
//                 required
//               />
//             </div>
//             <div className="space-y-2">
//               <Label htmlFor="password">Password</Label>
//               <Input
//                 id="password"
//                 type="password"
//                 value={credentials.password}
//                 onChange={(e) => setCredentials((prev) => ({ ...prev, password: e.target.value }))}
//                 required
//               />
//             </div>
//             {error && (
//               <Alert variant="destructive">
//                 <AlertDescription>{error}</AlertDescription>
//               </Alert>
//             )}
//             <Button type="submit" className="w-full" disabled={loading}>
//               {loading ? "Signing in..." : "Sign In"}
//             </Button>
//           </form>
//         </CardContent>
//       </Card>
//     </div>
//   )
// }
"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Cookies from "js-cookie"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"

export default function AdminLoginPage() {
  const router = useRouter()

  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  useEffect(() => {
    const script = document.createElement("script")
    script.src = "https://www.google.com/recaptcha/api.js"
    script.async = true
    script.defer = true
    document.body.appendChild(script)
  }, [])

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    const captchaToken = (window as any).grecaptcha?.getResponse()
    if (!captchaToken) {
      alert("Please complete the CAPTCHA.")
      setLoading(false)
      return
    }

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/login/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: credentials.username,
          password: credentials.password,
          captcha_token: captchaToken,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data?.message || "Invalid credentials")
      }

      if (data.token && data.user_type === "superuser") {
        Cookies.set("adminToken", data.token, { expires: 7 })
        localStorage.setItem("adminAuth", "true")
        localStorage.setItem("user", JSON.stringify({
          token: data.token,
          email: credentials.username,
          role: "admin",
        }))
        router.push("/admin/dashboard")
      } else {
        setError("Admin not verified or invalid type")
      }
    } catch (err: any) {
      console.error("Login error:", err)
      setError(err.message || "Login failed")
    } finally {
      setLoading(false)
      ;(window as any).grecaptcha?.reset()
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 p-4">
      <Card className="w-full max-w-md shadow-xl border-0">
        <CardHeader>
          <CardTitle className="text-2xl">Admin Login</CardTitle>
          <CardDescription>Enter your admin credentials to access the dashboard.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <Label htmlFor="username">Email</Label>
              <Input
                id="username"
                type="email"
                value={credentials.username}
                onChange={(e) =>
                  setCredentials({ ...credentials, username: e.target.value })
                }
                required
              />
            </div>
            <div>
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={credentials.password}
                onChange={(e) =>
                  setCredentials({ ...credentials, password: e.target.value })
                }
                required
              />
            </div>

            <div className="g-recaptcha" data-sitekey="6Lfl9ZErAAAAAIOsgxGYsnBLhmOJLhafaXEW5Hia"></div>

            {error && <p className="text-red-500 text-sm">{error}</p>}

            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Logging in..." : "Login as Admin"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
