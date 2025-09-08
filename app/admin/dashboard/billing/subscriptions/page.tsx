"use client"

import { useEffect, useState } from "react"
import Cookies from "js-cookie"
import { motion } from "framer-motion"
import { Plus, Pencil, Trash2, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useToast } from "@/hooks/use-toast"

const API_BASE = `${process.env.NEXT_PUBLIC_BASE_URL}/billing`

type Subscription = {
  id: number
  company: number
  plan: number
  start_date: string
  end_date: string | null
  is_active: boolean
  stripe_subscription_id: string
}

type Company = {
  id: number
  name: string
}

type Plan = {
  id: number
  name: string
}

// helper headers
const getHeaders = () => ({
  "Content-Type": "application/json",
  Authorization: `Token ${Cookies.get("adminToken") || ""}`,
})

export default function SubscriptionsPage() {
  const { toast } = useToast()
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedSub, setSelectedSub] = useState<Subscription | null>(null)
  const [formData, setFormData] = useState<Partial<Subscription>>({})
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [isConfirmOpen, setIsConfirmOpen] = useState(false)
  const [deleteId, setDeleteId] = useState<number | null>(null)
  const [companies, setCompanies] = useState<Company[]>([])
  const [plans, setPlans] = useState<Plan[]>([])

  // List all subscriptions
  const fetchSubscriptions = async () => {
    try {
      setLoading(true)
      const res = await fetch(`${API_BASE}/subscriptions/`, {
        headers: getHeaders(),
      })
      if (!res.ok) throw new Error("Failed to fetch subscriptions")
      const data = await res.json()
      setSubscriptions(data)
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  // Fetch companies
  const fetchCompanies = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/companies/`, {
        headers: getHeaders(),
      })
      if (res.ok) {
        const data = await res.json()
        setCompanies(data)
      }
    } catch (err) {
      console.error("Failed to fetch companies", err)
    }
  }

  // Fetch plans ⭐ NEW
  const fetchPlans = async () => {
    try {
      const res = await fetch(`${API_BASE}/plans/`, {
        headers: getHeaders(),
      })
      if (res.ok) {
        const data = await res.json()
        setPlans(data)
      }
    } catch (err) {
      console.error("Failed to fetch plans", err)
    }
  }

  // Get by ID (for edit)
  const fetchSubscriptionById = async (id: number) => {
    try {
      const res = await fetch(`${API_BASE}/subscriptions/${id}/`, {
        headers: getHeaders(),
      })
      if (res.ok) {
        const sub = await res.json()
        setSelectedSub(sub)
        setFormData(sub)
        setIsDialogOpen(true)
        fetchCompanies()
        fetchPlans()
      } else {
        console.error("Failed to fetch subscription", await res.text())
      }
    } catch (err) {
      console.error(err)
    }
  }

  useEffect(() => {
    fetchSubscriptions()
  }, [])

  // Fetch companies & plans whenever dialog opens
  useEffect(() => {
    if (isDialogOpen) {
      fetchCompanies()
      fetchPlans()
    }
  }, [isDialogOpen])

  // Create / Update
  const handleSubmit = async () => {
    const method = selectedSub ? "PUT" : "POST"
    const url = selectedSub
      ? `${API_BASE}/subscriptions/${selectedSub.id}/`
      : `${API_BASE}/subscriptions/`

    const res = await fetch(url, {
      method,
      headers: getHeaders(),
      body: JSON.stringify(formData),
    })

    if (res.ok) {
      setIsDialogOpen(false)
      setFormData({})
      setSelectedSub(null)
      fetchSubscriptions()
      toast({ title: "Success", description: `Subscription ${selectedSub ? "updated" : "created"} successfully.` })
    } else {
      toast({ title: "Error", description: "Failed to save subscription.", variant: "destructive" })
    }
  }

  // Delete
  const handleDelete = async () => {
    if (!deleteId) return
    const res = await fetch(`${API_BASE}/subscriptions/${deleteId}/`, {
      method: "DELETE",
      headers: getHeaders(),
    })
    if (res.ok) {
      fetchSubscriptions()
      toast({ title: "Deleted", description: "Subscription deleted successfully." })
    } else {
      toast({ title: "Error", description: "Failed to delete subscription.", variant: "destructive" })
    }
    setIsConfirmOpen(false)
    setDeleteId(null)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-800">Subscriptions</h1>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button
              onClick={() => {
                setSelectedSub(null)
                setFormData({})
              }}
            >
              <Plus className="mr-2 h-4 w-4" /> New Subscription
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-lg">
            <DialogHeader>
              <DialogTitle>
                {selectedSub ? "Edit Subscription" : "Create Subscription"}
              </DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              {/* Company dropdown */}
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="company" className="text-right">Company</Label>
                <select
                  id="company"
                  className="col-span-3 border rounded p-2"
                  value={formData.company ?? ""}
                  onChange={(e) =>
                    setFormData({ ...formData, company: Number(e.target.value) })
                  }
                >
                  <option value="">Select a company</option>
                  {companies.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Plan dropdown ⭐ NEW */}
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="plan" className="text-right">Plan</Label>
                <select
                  id="plan"
                  className="col-span-3 border rounded p-2"
                  value={formData.plan ?? ""}
                  onChange={(e) =>
                    setFormData({ ...formData, plan: Number(e.target.value) })
                  }
                >
                  <option value="">Select a plan</option>
                  {plans.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Other fields remain Input */}
              {["start_date", "end_date", "is_active", "stripe_subscription_id"].map((field) => (
                <div key={field} className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor={field} className="text-right capitalize">
                    {field.replace(/_/g, " ")}
                  </Label>
                  <Input
                    id={field}
                    type={
                      field.includes("date")
                        ? "date"
                        : field === "is_active"
                        ? "checkbox"
                        : "text"
                    }
                    checked={
                      field === "is_active"
                        ? (formData as any)[field] ?? false
                        : undefined
                    }
                    value={
                      field === "is_active"
                        ? undefined
                        : (formData as any)[field] ?? ""
                    }
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        [field]:
                          field === "is_active"
                            ? e.target.checked
                            : e.target.value,
                      })
                    }
                    className="col-span-3"
                  />
                </div>
              ))}
            </div>
            <Button onClick={handleSubmit} className="w-full">
              {selectedSub ? "Update" : "Create"}
            </Button>
          </DialogContent>
        </Dialog>
      </div>

      {/* Subscriptions grid */}
      {loading ? (
        <div className="flex justify-center py-20">
          <Loader2 className="animate-spin h-8 w-8 text-gray-500" />
        </div>
      ) : (
        <motion.div layout className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {subscriptions.map((sub) => (
            <motion.div key={sub.id} layout initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              <Card className="shadow-md hover:shadow-xl transition-all rounded-2xl">
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle className="text-xl font-semibold">Sub #{sub.id}</CardTitle>
                  <div className="flex space-x-2">
                    <Button variant="ghost" size="sm" onClick={() => fetchSubscriptionById(sub.id)}>
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        setDeleteId(sub.id)
                        setIsConfirmOpen(true)
                      }}
                    >
                      <Trash2 className="h-4 w-4 text-red-500" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="space-y-2 text-sm text-gray-600">
                  <p><strong>Company:</strong> {sub.company}</p>
                  <p><strong>Plan:</strong> {sub.plan}</p>
                  <p><strong>Start:</strong> {new Date(sub.start_date).toLocaleDateString()}</p>
                  <p><strong>End:</strong> {sub.end_date ? new Date(sub.end_date).toLocaleDateString() : "Ongoing"}</p>
                  <p><strong>Active:</strong> {sub.is_active ? "Yes" : "No"}</p>
                  <p className="text-xs text-gray-400">Stripe ID: {sub.stripe_subscription_id}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      )}

      {/* Sexy Confirm Dialog */}
      <Dialog open={isConfirmOpen} onOpenChange={setIsConfirmOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Confirm Delete</DialogTitle>
          </DialogHeader>
          <p>Are you sure you want to delete this subscription?</p>
          <div className="flex justify-end space-x-2 mt-4">
            <Button variant="outline" onClick={() => setIsConfirmOpen(false)}>Cancel</Button>
            <Button variant="destructive" onClick={handleDelete}>Delete</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}


// "use client"

// import { useEffect, useState } from "react"
// import Cookies from "js-cookie"
// import { motion } from "framer-motion"
// import { Plus, Pencil, Trash2, Loader2 } from "lucide-react"
// import { Button } from "@/components/ui/button"
// import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
// import { Input } from "@/components/ui/input"
// import { Label } from "@/components/ui/label"
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

// const API_BASE = `${process.env.NEXT_PUBLIC_BASE_URL}/billing`

// type Subscription = {
//   id: number
//   company: number
//   plan: number
//   start_date: string
//   end_date: string | null
//   is_active: boolean
//   stripe_subscription_id: string
// }

// type Company = { // ⭐ NEW
//   id: number
//   name: string
// }

// // helper headers
// const getHeaders = () => ({
//   "Content-Type": "application/json",
//   Authorization: `Token ${Cookies.get("adminToken") || ""}`,
// })

// export default function SubscriptionsPage() {
//   const [subscriptions, setSubscriptions] = useState<Subscription[]>([])
//   const [loading, setLoading] = useState(true)
//   const [selectedSub, setSelectedSub] = useState<Subscription | null>(null)
//   const [formData, setFormData] = useState<Partial<Subscription>>({})
//   const [isDialogOpen, setIsDialogOpen] = useState(false)
//   const [companies, setCompanies] = useState<Company[]>([]) // ⭐ NEW

//   // List all subscriptions
//   const fetchSubscriptions = async () => {
//     try {
//       setLoading(true)
//       const res = await fetch(`${API_BASE}/subscriptions/`, {
//         headers: getHeaders(),
//       })
//       if (!res.ok) throw new Error("Failed to fetch subscriptions")
//       const data = await res.json()
//       setSubscriptions(data)
//     } catch (err) {
//       console.error(err)
//     } finally {
//       setLoading(false)
//     }
//   }

//   // Fetch companies ⭐ NEW
//   const fetchCompanies = async () => {
//     try {
//       const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/companies/`, {
//         headers: getHeaders(),
//       })
//       if (res.ok) {
//         const data = await res.json()
//         setCompanies(data)
//       }
//     } catch (err) {
//       console.error("Failed to fetch companies", err)
//     }
//   }

//   // Get by ID (for edit)
//   const fetchSubscriptionById = async (id: number) => {
//     try {
//       const res = await fetch(`${API_BASE}/subscriptions/${id}/`, {
//         headers: getHeaders(),
//       })
//       if (res.ok) {
//         const sub = await res.json()
//         setSelectedSub(sub)
//         setFormData(sub)
//         setIsDialogOpen(true)
//         fetchCompanies() // ⭐ fetch companies when editing too
//       } else {
//         console.error("Failed to fetch subscription", await res.text())
//       }
//     } catch (err) {
//       console.error(err)
//     }
//   }

//   useEffect(() => {
//     fetchSubscriptions()
//   }, [])

//   // ⭐ Fetch companies whenever dialog opens
//   useEffect(() => {
//     if (isDialogOpen) fetchCompanies()
//   }, [isDialogOpen])

//   // Create / Update
//   const handleSubmit = async () => {
//     const method = selectedSub ? "PUT" : "POST"
//     const url = selectedSub
//       ? `${API_BASE}/subscriptions/${selectedSub.id}/`
//       : `${API_BASE}/subscriptions/`

//     const res = await fetch(url, {
//       method,
//       headers: getHeaders(),
//       body: JSON.stringify(formData),
//     })

//     if (res.ok) {
//       setIsDialogOpen(false)
//       setFormData({})
//       setSelectedSub(null)
//       fetchSubscriptions()
//     } else {
//       console.error("Failed to save subscription", await res.text())
//     }
//   }

//   // Delete
//   const handleDelete = async (id: number) => {
//     if (!confirm("Are you sure you want to delete this subscription?")) return
//     const res = await fetch(`${API_BASE}/subscriptions/${id}/`, {
//       method: "DELETE",
//       headers: getHeaders(),
//     })
//     if (res.ok) fetchSubscriptions()
//   }

//   return (
//     <div className="space-y-6">
//       {/* Header */}
//       <div className="flex items-center justify-between">
//         <h1 className="text-3xl font-bold text-gray-800">Subscriptions</h1>
//         <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
//           <DialogTrigger asChild>
//             <Button
//               onClick={() => {
//                 setSelectedSub(null)
//                 setFormData({})
//               }}
//             >
//               <Plus className="mr-2 h-4 w-4" /> New Subscription
//             </Button>
//           </DialogTrigger>
//           <DialogContent className="sm:max-w-lg">
//             <DialogHeader>
//               <DialogTitle>
//                 {selectedSub ? "Edit Subscription" : "Create Subscription"}
//               </DialogTitle>
//             </DialogHeader>
//             <div className="grid gap-4 py-4">
//               {/* Company dropdown ⭐ NEW */}
//               <div className="grid grid-cols-4 items-center gap-4">
//                 <Label htmlFor="company" className="text-right">Company</Label>
//                 <select
//                   id="company"
//                   className="col-span-3 border rounded p-2"
//                   value={formData.company ?? ""}
//                   onChange={(e) =>
//                     setFormData({ ...formData, company: Number(e.target.value) })
//                   }
//                 >
//                   <option value="">Select a company</option>
//                   {companies.map((c) => (
//                     <option key={c.id} value={c.id}>
//                       {c.name}
//                     </option>
//                   ))}
//                 </select>
//               </div>

//               {/* Other fields remain Input */}
//               {["plan", "start_date", "end_date", "is_active", "stripe_subscription_id"].map((field) => (
//                 <div key={field} className="grid grid-cols-4 items-center gap-4">
//                   <Label htmlFor={field} className="text-right capitalize">
//                     {field.replace(/_/g, " ")}
//                   </Label>
//                   <Input
//                     id={field}
//                     type={
//                       field.includes("date")
//                         ? "date"
//                         : field === "is_active"
//                         ? "checkbox"
//                         : "text"
//                     }
//                     checked={
//                       field === "is_active"
//                         ? (formData as any)[field] ?? false
//                         : undefined
//                     }
//                     value={
//                       field === "is_active"
//                         ? undefined
//                         : (formData as any)[field] ?? ""
//                     }
//                     onChange={(e) =>
//                       setFormData({
//                         ...formData,
//                         [field]:
//                           field === "is_active"
//                             ? e.target.checked
//                             : e.target.value,
//                       })
//                     }
//                     className="col-span-3"
//                   />
//                 </div>
//               ))}
//             </div>
//             <Button onClick={handleSubmit} className="w-full">
//               {selectedSub ? "Update" : "Create"}
//             </Button>
//           </DialogContent>
//         </Dialog>
//       </div>

//       {/* Subscriptions grid (unchanged) */}
//       {loading ? (
//         <div className="flex justify-center py-20">
//           <Loader2 className="animate-spin h-8 w-8 text-gray-500" />
//         </div>
//       ) : (
//         <motion.div layout className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
//           {subscriptions.map((sub) => (
//             <motion.div key={sub.id} layout initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
//               <Card className="shadow-md hover:shadow-xl transition-all rounded-2xl">
//                 <CardHeader className="flex flex-row items-center justify-between">
//                   <CardTitle className="text-xl font-semibold">Sub #{sub.id}</CardTitle>
//                   <div className="flex space-x-2">
//                     <Button variant="ghost" size="sm" onClick={() => fetchSubscriptionById(sub.id)}>
//                       <Pencil className="h-4 w-4" />
//                     </Button>
//                     <Button variant="ghost" size="sm" onClick={() => handleDelete(sub.id)}>
//                       <Trash2 className="h-4 w-4 text-red-500" />
//                     </Button>
//                   </div>
//                 </CardHeader>
//                 <CardContent className="space-y-2 text-sm text-gray-600">
//                   <p><strong>Company:</strong> {sub.company}</p>
//                   <p><strong>Plan:</strong> {sub.plan}</p>
//                   <p><strong>Start:</strong> {new Date(sub.start_date).toLocaleDateString()}</p>
//                   <p><strong>End:</strong> {sub.end_date ? new Date(sub.end_date).toLocaleDateString() : "Ongoing"}</p>
//                   <p><strong>Active:</strong> {sub.is_active ? "Yes" : "No"}</p>
//                   <p className="text-xs text-gray-400">Stripe ID: {sub.stripe_subscription_id}</p>
//                 </CardContent>
//               </Card>
//             </motion.div>
//           ))}
//         </motion.div>
//       )}
//     </div>
//   )
// }
