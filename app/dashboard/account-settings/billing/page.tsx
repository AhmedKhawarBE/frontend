// "use client"

// import { useEffect, useState } from "react"
// import Cookies from "js-cookie"
// import {
//   Card,
//   CardHeader,
//   CardTitle,
//   CardDescription,
//   CardContent,
// } from "@/components/ui/card"

// type CompanyUsage = {
//   id: number
//   company: number
//   current_agents: number
//   current_minutes_used: number
//   last_reset: string
//   extra_minutes: number
//   extra_cost: number
// }

// export default function BillingPage() {
//   const [usage, setUsage] = useState<CompanyUsage | null>(null)
//   const [loading, setLoading] = useState(true)
//   const [error, setError] = useState<string | null>(null)

//   const token = Cookies.get("Token") || ""

//   useEffect(() => {
//     const fetchUsage = async () => {
//       try {
//         const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/billing/usage/my_usage/`, {
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Token ${token}`,
//           },
//         })

//         if (res.ok) {
//           const data = await res.json()
//           setUsage(data)
//         } else if (res.status === 404) {
//           setUsage(null) // No usage found
//         } else {
//           const text = await res.text()
//           setError(`Failed to fetch usage: ${text}`)
//         }
//       } catch (err: any) {
//         setError("Error fetching usage")
//       } finally {
//         setLoading(false)
//       }
//     }

//     fetchUsage()
//   }, [token])

//   if (loading) {
//     return <p className="text-center py-10">Loading usage...</p>
//   }

//   if (error) {
//     return <p className="text-center py-10 text-red-500">{error}</p>
//   }

//   if (!usage) {
//     return <p className="text-center py-10">No usage</p>
//   }

//   return (
//     <div className="max-w-3xl mx-auto py-10">
//       <Card>
//         <CardHeader>
//           <CardTitle>Billing & Usage</CardTitle>
//           <CardDescription>
//             Details of your current company usage
//           </CardDescription>
//         </CardHeader>
//         <CardContent className="space-y-4">
//           <div className="grid gap-3 bg-gray-50 p-4 rounded-lg shadow-md">
//             <p><strong>Company ID:</strong> {usage.company}</p>
//             <p><strong>Current Agents:</strong> {usage.current_agents}</p>
//             <p><strong>Minutes Used:</strong> {usage.current_minutes_used}</p>
//             <p><strong>Last Reset:</strong> {new Date(usage.last_reset).toLocaleString()}</p>
//             <p><strong>Extra Minutes:</strong> {usage.extra_minutes}</p>
//             <p><strong>Extra Cost:</strong> ${usage.extra_cost.toFixed(2)}</p>
//           </div>
//         </CardContent>
//       </Card>
//     </div>
//   )
// }



"use client"

import { useEffect, useState } from "react"
import Cookies from "js-cookie"
import { motion } from "framer-motion"
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card"

const API_BASE = process.env.NEXT_PUBLIC_BASE_URL

// Types
interface CompanyUsage {
  id: number
  company: number
  current_agents: number
  current_minutes_used: number
  remaining_minutes: number  
  last_reset: string
  extra_minutes: number
  extra_cost: number
}

interface Plan {
  id: number
  name: string
  price: number
  cost_per_minute: number
  max_agents: number
  max_minutes_per_month: number
  threshold_minutes: number
  is_custom: boolean
  company: number | null
  created_at: string
}

interface Subscription {
  id: number
  company: number
  plan: number
  is_active: boolean
  start_date: string
  end_date: string | null
  stripe_subscription_id: string
}

export default function BillingPage() {
  const [usage, setUsage] = useState<CompanyUsage | null>(null)
  const [plans, setPlans] = useState<Plan[]>([])
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const token = Cookies.get("Token") || ""

  useEffect(() => {
    const fetchData = async () => {
      try {
        const headers = {
          "Content-Type": "application/json",
          Authorization: `Token ${token}`,
        }

        const [usageRes, plansRes, subsRes] = await Promise.all([
          fetch(`${API_BASE}/billing/usage/my_usage/`, { headers }),
          fetch(`${API_BASE}/billing/plans/`, { headers }),
          fetch(`${API_BASE}/billing/subscriptions/`, { headers }),
        ])

        if (!usageRes.ok) throw new Error("Failed to fetch usage")
        if (!plansRes.ok) throw new Error("Failed to fetch plans")
        if (!subsRes.ok) throw new Error("Failed to fetch subscriptions")

        setUsage(await usageRes.json())
        setPlans(await plansRes.json())
        setSubscriptions(await subsRes.json())

        
      } catch (err: any) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [token])

  if (loading) return <p className="text-center py-10">Loading billing data...</p>
  if (error) return <p className="text-center py-10 text-red-500">{error}</p>
  if (!usage) return <p className="text-center py-10">No usage found</p>

  const activeSub = subscriptions.find((s) => s.company === usage.company && s.is_active)
  const activePlan = plans.find((p) => p.id === activeSub?.plan)

  return (
    <div className="max-w-6xl mx-auto py-10 space-y-8">
      {/* Active Plan & Subscription */}
      {activePlan && activeSub && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <Card className="shadow-xl rounded-2xl border border-indigo-200">
            <CardHeader>
              <CardTitle className="text-indigo-600">Current Subscription</CardTitle>
              <CardDescription>
                Active plan details for your company
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <p><strong>Plan:</strong> {activePlan.name}</p>
                <p><strong>Price:</strong> ${activePlan.price}</p>
                <p><strong>Max Agents:</strong> {activePlan.max_agents}</p>
                <p><strong>Max Minutes:</strong> {activePlan.max_minutes_per_month}</p>
                <p><strong>Cost Per Minute:</strong> ${activePlan.cost_per_minute}</p>
                <p><strong>Threshold Minutes:</strong> {activePlan.threshold_minutes}</p>
              </div>

              {/* Subscription Timeline */}
              <div className="mt-4">
                <p className="mb-2 font-medium">Subscription Timeline</p>
                <div className="relative w-full h-4 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className={`absolute left-0 top-0 h-4 ${
                      activeSub.end_date ? "bg-indigo-500" : "bg-green-500 animate-pulse"
                    }`}
                    style={{
                      width: activeSub.end_date
                        ? `${Math.min(
                            ((new Date().getTime() - new Date(activeSub.start_date).getTime()) /
                              (new Date(activeSub.end_date).getTime() - new Date(activeSub.start_date).getTime())) *
                              100,
                            100
                          ).toFixed(2)}%`
                        : "100%",
                    }}
                  />
                </div>
                <div className="flex justify-between text-sm text-gray-600 mt-1">
                  <span>{new Date(activeSub.start_date).toLocaleDateString()}</span>
                  {activeSub.end_date ? (
                    <span>{new Date(activeSub.end_date).toLocaleDateString()}</span>
                  ) : (
                    <span className="px-2 py-0.5 bg-green-100 text-green-600 rounded-full text-xs font-semibold">
                      Active
                    </span>
                  )}
                </div>
                <p className="mt-2 text-sm text-gray-500">
                  Stripe Subscription ID: {activeSub.stripe_subscription_id}
                </p>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}

      {/* Current Usage Stats */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <Card className="shadow-xl rounded-2xl">
          <CardHeader>
            <CardTitle>Current Usage</CardTitle>
            <CardDescription>Breakdown of current consumption</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-6 text-gray-800">
              <div className="p-4 rounded-lg bg-gray-50 shadow-sm">
                <p className="text-sm text-gray-500">Current Agents</p>
                <p className="text-xl font-bold">{usage.current_agents}</p>
              </div>
              <div className="p-4 rounded-lg bg-gray-50 shadow-sm">
                <p className="text-sm text-gray-500">Minutes Used</p>
                <p className="text-xl font-bold">{usage.current_minutes_used}</p>
              </div>

              {/* 🆕 Remaining Minutes Card */}
              <div className="p-4 rounded-lg bg-gray-50 shadow-sm">
                <p className="text-sm text-gray-500">Remaining Minutes</p>
                <p
                  className={`text-xl font-bold ${
                    usage.remaining_minutes < 50 ? "text-red-600" : "text-green-600"
                  }`}
                >
                  {usage.remaining_minutes}
                </p>

              </div>

              <div className="p-4 rounded-lg bg-gray-50 shadow-sm">
                <p className="text-sm text-gray-500">Extra Minutes</p>
                <p className="text-xl font-bold">{usage.extra_minutes}</p>
              </div>
              <div className="p-4 rounded-lg bg-gray-50 shadow-sm">
                <p className="text-sm text-gray-500">Extra Cost</p>
                {usage.extra_cost ? (
                  <p className="text-xl font-bold text-red-600">${usage.extra_cost.toFixed(2)}</p>
                ) : (
                  <p className="text-xl font-bold">No extra minutes</p>
                )}
              </div>
              <div className="p-4 rounded-lg bg-gray-50 shadow-sm col-span-2">
                <p className="text-sm text-gray-500">Last Reset</p>
                <p className="text-xl font-bold">{new Date(usage.last_reset).toLocaleDateString()}</p>
              </div>
            </div>
          </CardContent>

        </Card>
      </motion.div>
    </div>
  )
}
