
// "use client"

// import { useEffect, useState } from "react"
// import {
//   Card,
//   CardHeader,
//   CardTitle,
//   CardDescription,
//   CardContent,
// } from "@/components/ui/card"
// import { Button } from "@/components/ui/button"
// import { Switch } from "@/components/ui/switch"
// import { Label } from "@/components/ui/label"
// import { Input } from "@/components/ui/input"
// import Cookies from "js-cookie"
// import { useToast } from "@/hooks/use-toast"

// export default function PersonalSettings() {
//   const [twoFactorEnabled, setTwoFactorEnabled] = useState(false)
//   const [loading, setLoading] = useState(false)
//   const [qrCode, setQrCode] = useState<string | null>(null)
//   const [code, setCode] = useState("")
//   const [verifying, setVerifying] = useState(false)
//   const [initializing, setInitializing] = useState(true)

//   const { toast } = useToast()
//   const token = Cookies.get("Token") || ""
//   // Fetch initial 2FA status
//   useEffect(() => {
//     const fetch2FAStatus = async () => {
//       try {
//         const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/authentication/2fa/status/`, {
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Token ${token}`,
//           },
//         })
//         const data = await response.json()
//         console.log(data)
//         setTwoFactorEnabled(data.is_2fa_enabled || false)
//       } catch (err) {
//         toast({ title: "Error", description: "Could not fetch 2FA status", variant: "destructive" })
//       } finally {
//         setInitializing(false)
//       }
//     }

//     fetch2FAStatus()
//   }, [token, toast])

//   // Handle toggle switch
//   const handle2FAToggle = async () => {
//     const newValue = !twoFactorEnabled
//     setTwoFactorEnabled(newValue)

//     if (newValue) {
//       // Enabling 2FA
//       setLoading(true)
//       try {
//         const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/authentication/2fa/setup/`, {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Token ${token}`,
//           },
//         })

//         const data = await response.json()

//         if (!response.ok) {
//           throw new Error(data?.message || "Failed to set up 2FA")
//         }

//         setQrCode(data.qr_code_base64)
//         toast({ title: "QR Code Ready", description: "Scan the code with your Authenticator App." })
//       } catch (err: any) {
//         toast({ title: "Error", description: err.message, variant: "destructive" })
//         setTwoFactorEnabled(false)
//       } finally {
//         setLoading(false)
//       }
//     } else {
//       // Disabling 2FA
//       try {
//         const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/authentication/2fa/disable/`, {
//           method: "DELETE",
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Token ${token}`,
//           },
//         })

//         const data = await response.json()

//         if (!response.ok) {
//           throw new Error(data?.message || "Failed to disable 2FA")
//         }

//         toast({ title: "2FA Disabled", description: "Two-Factor Authentication is now off." })
//       } catch (err: any) {
//         toast({ title: "Error", description: err.message, variant: "destructive" })
//         setTwoFactorEnabled(true)
//       }

//       setQrCode(null)
//       setCode("")
//     }
//   }

//   // Handle 6-digit code verification
//   const handleVerifyCode = async () => {
//     if (!code || code.length !== 6) {
//       toast({ title: "Invalid Code", description: "Please enter a valid 6-digit code.", variant: "destructive" })
//       return
//     }

//     setVerifying(true)

//     try {
//       const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/authentication/2fa/verify/`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Token ${token}`,
//         },
//         body: JSON.stringify({ token: code }),
//       })

//       const data = await response.json()

//       if (!response.ok) {
//         throw new Error(data?.message || "Invalid code")
//       }

//       toast({ title: "2FA Verified", description: "Two-Factor Authentication is now enabled." })
//       setQrCode(null)
//       setCode("")
//       setTwoFactorEnabled(true)
//     } catch (err: any) {
//       toast({ title: "Verification Failed", description: err.message, variant: "destructive" })
//     } finally {
//       setVerifying(false)
//     }
//   }

//   if (initializing) {
//     return <p className="text-center py-10">Loading Settings...</p>
//   }

//   return (
//     <div className="max-w-2xl mx-auto py-10">
//       <Card>
//         <CardHeader>
//           <CardTitle>Two-Factor Authentication (2FA)</CardTitle>
//           <CardDescription>
//             Secure your account with an extra layer of protection.
//           </CardDescription>
//         </CardHeader>
//         <CardContent className="space-y-6">
//           <div className="flex items-center justify-between">
//             <Label htmlFor="2fa">Enable 2FA</Label>
//             <Switch
//               id="2fa"
//               checked={twoFactorEnabled}
//               onCheckedChange={handle2FAToggle}
//               disabled={loading || verifying}
//             />
//           </div>

//           {loading && <p>Loading QR Code...</p>}

//           {qrCode && (
//             <div className="text-center">
//               <p className="mb-2">Scan this QR code with your Authenticator App:</p>
//               <img
//                 src={`data:image/png;base64,${qrCode}`}
//                 alt="2FA QR Code"
//                 className="mx-auto border p-2 rounded shadow-md"
//               />

//               <div className="mt-6 space-y-4">
//                 <Label htmlFor="code">Enter 6-digit code</Label>
//                 <Input
//                   id="code"
//                   type="text"
//                   maxLength={6}
//                   value={code}
//                   onChange={(e) => setCode(e.target.value)}
//                   placeholder="123456"
//                   className="text-center tracking-widest"
//                 />
//                 <Button onClick={handleVerifyCode} disabled={verifying}>
//                   {verifying ? "Verifying..." : "Verify Code"}
//                 </Button>
//               </div>
//             </div>
//           )}
//         </CardContent>
//       </Card>
//     </div>
//   )
// }

"use client"

import { useEffect, useState } from "react"
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import Cookies from "js-cookie"
import { useToast } from "@/hooks/use-toast"

interface Company {
  name: string
  email: string
  phone: string
  website: string
  address: string
  description: string
  industry: string
  status: string
  company_size: string
  company_since: string
  created_at: string
  last_login: string
}

export default function PersonalSettings() {
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false)
  const [loading, setLoading] = useState(false)
  const [qrCode, setQrCode] = useState<string | null>(null)
  const [code, setCode] = useState("")
  const [verifying, setVerifying] = useState(false)
  const [initializing, setInitializing] = useState(true)

  const [company, setCompany] = useState<Company | null>(null)
  const [editingField, setEditingField] = useState<string | null>(null)
  const [tempValue, setTempValue] = useState("")

  const { toast } = useToast()
  const token = Cookies.get("Token") || ""

  // Fetch 2FA status
  useEffect(() => {
    const fetch2FAStatus = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/authentication/2fa/status/`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Token ${token}`,
            },
          }
        )
        const data = await response.json()
        setTwoFactorEnabled(data.is_2fa_enabled || false)
      } catch (err) {
        toast({
          title: "Error",
          description: "Could not fetch 2FA status",
          variant: "destructive",
        })
      } finally {
        setInitializing(false)
      }
    }

    const fetchCompanyData = async () => {
      try {
        // Dummy API
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/company/details/`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Token ${token}`,
            },
          }
        )
        const data = await res.json()
        setCompany(data)
      } catch (err) {
        toast({
          title: "Error",
          description: "Failed to fetch company data",
          variant: "destructive",
        })
      }
    }

    fetch2FAStatus()
    fetchCompanyData()
  }, [token, toast])

  // Handle company field edit
  const handleSaveField = async (field: string) => {
    if (!company) return
    try {
      const updated = { ...company, [field]: tempValue }
      setCompany(updated)

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/company/update/`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${token}`,
          },
          body: JSON.stringify({ [field]: tempValue }),
        }
      )

      if (!res.ok) throw new Error("Failed to update company")

      toast({
        title: "Updated",
        description: `${field} updated successfully.`,
      })
      setEditingField(null)
    } catch (err: any) {
      toast({
        title: "Error",
        description: err.message,
        variant: "destructive",
      })
    }
  }

  // Handle toggle switch
  const handle2FAToggle = async () => {
    const newValue = !twoFactorEnabled
    setTwoFactorEnabled(newValue)

    if (newValue) {
      setLoading(true)
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/authentication/2fa/setup/`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Token ${token}`,
            },
          }
        )
        const data = await response.json()
        if (!response.ok) throw new Error(data?.message || "Failed to set up 2FA")
        setQrCode(data.qr_code_base64)
        toast({
          title: "QR Code Ready",
          description: "Scan the code with your Authenticator App.",
        })
      } catch (err: any) {
        toast({ title: "Error", description: err.message, variant: "destructive" })
        setTwoFactorEnabled(false)
      } finally {
        setLoading(false)
      }
    } else {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/authentication/2fa/disable/`,
          {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Token ${token}`,
            },
          }
        )
        const data = await response.json()
        if (!response.ok) throw new Error(data?.message || "Failed to disable 2FA")
        toast({ title: "2FA Disabled", description: "Two-Factor Authentication is now off." })
      } catch (err: any) {
        toast({ title: "Error", description: err.message, variant: "destructive" })
        setTwoFactorEnabled(true)
      }
      setQrCode(null)
      setCode("")
    }
  }

  // Handle 6-digit code verification
  const handleVerifyCode = async () => {
    if (!code || code.length !== 6) {
      toast({
        title: "Invalid Code",
        description: "Please enter a valid 6-digit code.",
        variant: "destructive",
      })
      return
    }
    setVerifying(true)
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/authentication/2fa/verify/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${token}`,
          },
          body: JSON.stringify({ token: code }),
        }
      )
      const data = await response.json()
      if (!response.ok) throw new Error(data?.message || "Invalid code")
      toast({ title: "2FA Verified", description: "Two-Factor Authentication is now enabled." })
      setQrCode(null)
      setCode("")
      setTwoFactorEnabled(true)
    } catch (err: any) {
      toast({ title: "Verification Failed", description: err.message, variant: "destructive" })
    } finally {
      setVerifying(false)
    }
  }

  if (initializing) return <p className="text-center py-10">Loading Settings...</p>

  return (
    <div className="max-w-2xl mx-auto py-10 space-y-8">
      {/* 2FA Section */}
      <Card>
        <CardHeader>
          <CardTitle>Two-Factor Authentication (2FA)</CardTitle>
          <CardDescription>Secure your account with an extra layer of protection.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <Label htmlFor="2fa">Enable 2FA</Label>
            <Switch
              id="2fa"
              checked={twoFactorEnabled}
              onCheckedChange={handle2FAToggle}
              disabled={loading || verifying}
            />
          </div>

          {loading && <p>Loading QR Code...</p>}

          {qrCode && (
            <div className="text-center">
              <p className="mb-2">Scan this QR code with your Authenticator App:</p>
              <img
                src={`data:image/png;base64,${qrCode}`}
                alt="2FA QR Code"
                className="mx-auto border p-2 rounded shadow-md"
              />
              <div className="mt-6 space-y-4">
                <Label htmlFor="code">Enter 6-digit code</Label>
                <Input
                  id="code"
                  type="text"
                  maxLength={6}
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  placeholder="123456"
                  className="text-center tracking-widest"
                />
                <Button onClick={handleVerifyCode} disabled={verifying}>
                  {verifying ? "Verifying..." : "Verify Code"}
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Company Data Section */}
      {company && (
        <Card>
          <CardHeader>
            <CardTitle>Company Information</CardTitle>
            <CardDescription>Manage and update your company details.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {Object.entries(company).map(([field, value]) => {
              const isReadOnly = ["created_at", "last_login"].includes(field)
              return (
                <div key={field} className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium capitalize">{field.replace("_", " ")}</p>
                    {editingField === field ? (
                      <Input
                        value={tempValue}
                        onChange={(e) => setTempValue(e.target.value)}
                        className="mt-1"
                      />
                    ) : (
                      <p className="text-slate-700">{String(value) || "—"}</p>
                    )}
                  </div>
                  {!isReadOnly && (
                    <div>
                      {editingField === field ? (
                        <Button size="sm" onClick={() => handleSaveField(field)}>
                          Save
                        </Button>
                      ) : (
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => {
                            setEditingField(field)
                            setTempValue(String(value))
                          }}
                        >
                          Edit
                        </Button>
                      )}
                    </div>
                  )}
                </div>
              )
            })}
          </CardContent>
        </Card>
      )}
    </div>
  )
}
