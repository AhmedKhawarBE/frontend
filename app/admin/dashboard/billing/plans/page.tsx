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

type Plan = {
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

// helper to attach headers
const getHeaders = () => ({
  "Content-Type": "application/json",
  Authorization: `Token ${Cookies.get("adminToken") || ""}`,
})

export default function PlansPage() {
  const { toast } = useToast()
  const [plans, setPlans] = useState<Plan[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedPlan, setSelectedPlan] = useState<Plan | null>(null)
  const [formData, setFormData] = useState<Partial<Plan>>({})
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [deleteId, setDeleteId] = useState<number | null>(null)

  // Fetch all plans
  const fetchPlans = async () => {
    try {
      setLoading(true)
      const res = await fetch(`${API_BASE}/plans/`, {
        method: "GET",
        headers: getHeaders(),
      })
      if (!res.ok) throw new Error("Failed to fetch plans")
      const data = await res.json()
      setPlans(data)
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchPlans()
  }, [])

  // Handle create/update
  const handleSubmit = async () => {
    const method = selectedPlan ? "PUT" : "POST"
    const url = selectedPlan
      ? `${API_BASE}/plans/${selectedPlan.id}/`
      : `${API_BASE}/plans/`

    const res = await fetch(url, {
      method,
      headers: getHeaders(),
      body: JSON.stringify(formData),
    })

    if (res.ok) {
      setIsDialogOpen(false)
      setFormData({})
      setSelectedPlan(null)
      fetchPlans()
      toast({
        title: `Plan ${selectedPlan ? "updated" : "created"} successfully`,
      })
    } else {
      console.error("Failed to save plan", await res.text())
      toast({
        title: "Error",
        description: "Failed to save plan",
        variant: "destructive",
      })
    }
  }

  // Handle delete
  const handleDelete = async () => {
    if (!deleteId) return
    const res = await fetch(`${API_BASE}/plans/${deleteId}/`, {
      method: "DELETE",
      headers: getHeaders(),
    })
    if (res.ok) {
      fetchPlans()
      toast({ title: "Plan deleted successfully" })
    } else {
      console.error("Failed to delete plan", await res.text())
      toast({
        title: "Error",
        description: "Failed to delete plan",
        variant: "destructive",
      })
    }
    setIsDeleteDialogOpen(false)
    setDeleteId(null)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-800">Subscription Plans</h1>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button
              onClick={() => {
                setSelectedPlan(null)
                setFormData({})
              }}
            >
              <Plus className="mr-2 h-4 w-4" /> New Plan
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-lg">
            <DialogHeader>
              <DialogTitle>
                {selectedPlan ? "Edit Plan" : "Create Plan"}
              </DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              {[
                "name",
                "price",
                "cost_per_minute",
                "max_agents",
                "max_minutes_per_month",
                "threshold_minutes",
              ].map((field) => (
                <div
                  key={field}
                  className="grid grid-cols-4 items-center gap-4"
                >
                  <Label
                    htmlFor={field}
                    className="text-right capitalize"
                  >
                    {field.replace(/_/g, " ")}
                  </Label>
                  <Input
                    id={field}
                    type={
                      field.includes("price") ||
                      field.includes("minute") ||
                      field.includes("agents")
                        ? "number"
                        : "text"
                    }
                    value={(formData as any)[field] ?? ""}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        [field]:
                          e.target.type === "number"
                            ? Number(e.target.value)
                            : e.target.value,
                      })
                    }
                    className="col-span-3"
                  />
                </div>
              ))}
            </div>
            <Button onClick={handleSubmit} className="w-full">
              {selectedPlan ? "Update" : "Create"}
            </Button>
          </DialogContent>
        </Dialog>
      </div>

      {/* Delete confirmation dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Confirm Delete</DialogTitle>
          </DialogHeader>
          <p>Are you sure you want to delete this plan?</p>
          <div className="flex justify-end gap-2 mt-4">
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDelete}>
              Delete
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Plans grid */}
      {loading ? (
        <div className="flex justify-center py-20">
          <Loader2 className="animate-spin h-8 w-8 text-gray-500" />
        </div>
      ) : (
        <motion.div
          layout
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {plans.map((plan) => (
            <motion.div
              key={plan.id}
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <Card className="shadow-md hover:shadow-xl transition-all rounded-2xl">
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle className="text-xl font-semibold">
                    {plan.name}
                  </CardTitle>
                  <div className="flex space-x-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        setSelectedPlan(plan)
                        setFormData(plan)
                        setIsDialogOpen(true)
                      }}
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        setDeleteId(plan.id)
                        setIsDeleteDialogOpen(true)
                      }}
                    >
                      <Trash2 className="h-4 w-4 text-red-500" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="space-y-2 text-sm text-gray-600">
                  <p>
                    <strong>Price:</strong> ${plan.price}/mo
                  </p>
                  <p>
                    <strong>Cost per min:</strong> ${plan.cost_per_minute}
                  </p>
                  <p>
                    <strong>Agents:</strong> {plan.max_agents}
                  </p>
                  <p>
                    <strong>Minutes:</strong> {plan.max_minutes_per_month}
                  </p>
                  <p>
                    <strong>Threshold:</strong> {plan.threshold_minutes}
                  </p>
                  <p>
                    <strong>Custom:</strong> {plan.is_custom ? "Yes" : "No"}
                  </p>
                  <p className="text-xs text-gray-400">
                    Created: {new Date(plan.created_at).toLocaleDateString()}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      )}
    </div>
  )
}
