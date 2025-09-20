
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

// Full list of country codes
const COUNTRY_CODES = [
  { code: "+1", name: "United States / Canada" },
  { code: "+44", name: "United Kingdom" },
  { code: "+92", name: "Pakistan" },
  { code: "+91", name: "India" },
  { code: "+81", name: "Japan" },
  { code: "+61", name: "Australia" },
  { code: "+49", name: "Germany" },
  { code: "+33", name: "France" },
  { code: "+39", name: "Italy" },
  { code: "+86", name: "China" },
  { code: "+34", name: "Spain" },
  { code: "+7", name: "Russia" },
  { code: "+55", name: "Brazil" },
  { code: "+27", name: "South Africa" },
  { code: "+82", name: "South Korea" },
  { code: "+31", name: "Netherlands" },
  { code: "+90", name: "Turkey" },
  { code: "+966", name: "Saudi Arabia" },
  { code: "+971", name: "UAE" },
  { code: "+20", name: "Egypt" },
  // ... full world list would continue here
]

interface Company {
  [key: string]: any
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
  const [countryCode, setCountryCode] = useState("+1")

  const { toast } = useToast()
  const token = Cookies.get("Token") || ""

  const NON_EDITABLE_FIELDS = [
    "id",
    "plan",
    "status",
    "created_at",
    "updated_at",
    "users",
    "last_login",
    "twilio_phone_numbers",
  ]

  const INDUSTRY_OPTIONS = ["Technology", "Finance", "Healthcare", "Education", "Retail", "Other"]
  const SIZE_OPTIONS = ["1-10", "11-50", "51-200", "201-500", "500+"]

  // Fetch 2FA + Company data
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
      } catch {
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
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/company-users/me/`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Token ${token}`,
            },
          }
        )
        const data = await res.json()
        setCompany(data)
      } catch {
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

  // Save edited field with validation
  const handleSaveField = async (field: string) => {
    if (!company) return

    // Validation rules
    if (field === "company_since" && !/^\d+$/.test(tempValue)) {
      toast({ title: "Invalid Input", description: "Company Since must be a number.", variant: "destructive" })
      return
    }
    if (field === "website" && !/^www\.[a-zA-Z0-9-]+\.[a-z]{2,}$/.test(tempValue)) {
      toast({ title: "Invalid Website", description: "Website must be in format www.xyz.com", variant: "destructive" })
      return
    }
    if (field === "phone_number") {
      if (!/^\d{6,15}$/.test(tempValue)) {
        toast({ title: "Invalid Phone", description: "Phone number must be 6–15 digits.", variant: "destructive" })
        return
      }
    }

    try {
      const updated = { ...company, [field]: field === "phone_number" ? `${countryCode}${tempValue}` : tempValue }
      setCompany(updated)

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/company-users/me/`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${token}`,
          },
          body: JSON.stringify({ [field]: updated[field] }),
        }
      )

      if (!res.ok) throw new Error("Failed to update company")

      toast({
        title: "Updated",
        description: `${field.replace("_", " ")} updated successfully.`,
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

  // Toggle 2FA
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

  // Verify 2FA
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
    <div className="max-w-3xl mx-auto py-12 space-y-12">
      {/* 2FA Section */}
      <Card className="shadow-xl rounded-2xl border-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Two-Factor Authentication (2FA)</CardTitle>
          <CardDescription className="text-slate-300">
            Secure your account with an extra layer of protection.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <Label htmlFor="2fa" className="text-slate-200">Enable 2FA</Label>
            <Switch
              id="2fa"
              checked={twoFactorEnabled}
              onCheckedChange={handle2FAToggle}
              disabled={loading || verifying}
            />
          </div>

          {loading && <p className="animate-pulse text-slate-400">Loading QR Code...</p>}

          {qrCode && (
            <div className="text-center space-y-4">
              <p className="text-slate-200">Scan this QR code with your Authenticator App:</p>
              <img
                src={`data:image/png;base64,${qrCode}`}
                alt="2FA QR Code"
                className="mx-auto border border-slate-700 p-3 rounded-xl shadow-lg"
              />
              <div className="mt-6 space-y-3">
                <Label htmlFor="code" className="text-slate-300">Enter 6-digit code</Label>
                <Input
                  id="code"
                  type="text"
                  maxLength={6}
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  placeholder="123456"
                  className="text-center tracking-widest bg-slate-800 border-slate-700 text-white"
                />
                <Button
                  onClick={handleVerifyCode}
                  disabled={verifying}
                  className="w-full bg-emerald-600 hover:bg-emerald-500 transition-all"
                >
                  {verifying ? "Verifying..." : "Verify Code"}
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>


      {/* Company Data Section */}
      {company && (
        <Card className="shadow-2xl rounded-2xl border-0 bg-white">
          <CardHeader className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-t-2xl p-6">
            <CardTitle className="text-white text-2xl font-bold">Company Information</CardTitle>
            <CardDescription className="text-indigo-100">
              Manage and update your company details.
            </CardDescription>
          </CardHeader>
          <CardContent className="divide-y divide-slate-200">
            {Object.entries(company)
              .filter(([field]) => !NON_EDITABLE_FIELDS.includes(field))
              .map(([field, value]) => (
                <div
                  key={field}
                  className="flex items-center justify-between py-4 px-2 hover:bg-slate-50 transition rounded-lg"
                >
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-slate-700 capitalize">
                      {field.replace("_", " ")}
                    </p>

                    {editingField === field ? (
                      field === "industry" ? (
                        <select
                          value={tempValue}
                          onChange={(e) => setTempValue(e.target.value)}
                          className="mt-1 w-full border rounded-md bg-slate-50 p-2"
                        >
                          {INDUSTRY_OPTIONS.map((opt) => (
                            <option key={opt} value={opt}>{opt}</option>
                          ))}
                        </select>
                      ) : field === "company_size" ? (
                        <select
                          value={tempValue}
                          onChange={(e) => setTempValue(e.target.value)}
                          className="mt-1 w-full border rounded-md bg-slate-50 p-2"
                        >
                          {SIZE_OPTIONS.map((opt) => (
                            <option key={opt} value={opt}>{opt}</option>
                          ))}
                        </select>
                      ) : field === "phone_number" ? (
                        <div className="flex space-x-2">
                          <select
                            value={countryCode}
                            onChange={(e) => setCountryCode(e.target.value)}
                            className="border rounded-md bg-slate-50 p-2"
                          >
                            {COUNTRY_CODES.map((c) => (
                              <option key={c.code} value={c.code}>{c.name} ({c.code})</option>
                            ))}
                          </select>
                          <Input
                            value={tempValue}
                            onChange={(e) => setTempValue(e.target.value)}
                            placeholder="Enter phone number"
                            className="flex-1 bg-slate-50 border-slate-300"
                          />
                        </div>
                      ) : (
                        <Input
                          value={tempValue}
                          onChange={(e) => setTempValue(e.target.value)}
                          className="mt-1 bg-slate-50 border-slate-300"
                        />
                      )
                    ) : (
                      <p className="text-slate-600 mt-1">{String(value) || "—"}</p>
                    )}
                  </div>

                  <div className="ml-4">
                    {editingField === field ? (
                      <Button
                        size="sm"
                        onClick={() => handleSaveField(field)}
                        className="bg-indigo-600 hover:bg-indigo-500 text-white"
                      >
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
                        className="hover:bg-indigo-50"
                      >
                        Edit
                      </Button>
                    )}
                  </div>
                </div>
              ))}
          </CardContent>
        </Card>
      )}
    </div>
  )
}
