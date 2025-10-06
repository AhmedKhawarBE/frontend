"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogTrigger } from "@/components/ui/dialog"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { useToast } from "@/hooks/use-toast"
import { Plus, Trash2, Loader2, Bot, Settings, FileText } from "lucide-react"
import Cookies from "js-cookie"

interface Worker {
  id: number
  name: string
  status: "Active" | "Inactive"
  role: string
  persona: string
}

interface Agent {
  id: number
  name: string
  status: "Active" | "Inactive"
  persona: string
  primary: boolean
  worker_agents: Worker[]
}

export default function WorkersPage() {
  const { id } = useParams()
  const [workers, setWorkers] = useState<Worker[]>([])
  const [agent, setAgent] = useState<Agent | null>(null)
  const [loading, setLoading] = useState(true)
  const [expandedPersonas, setExpandedPersonas] = useState<Set<number>>(new Set())
  const { toast } = useToast()

  const fetchAgent = () => {
    setLoading(true)
    fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/agents/${id}/`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${Cookies.get("Token") || ""}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        const enrichedAgent: Agent = {
          id: data.id,
          name: data.name,
          status: data.status === "Active" || data.status === "active" ? "Active" : "Inactive",
          persona: data.persona || "Unknown",
          primary: data.primary || false,
          worker_agents: Array.isArray(data.worker_agents)
            ? data.worker_agents.map((w: any) => ({
                id: w.id,
                name: w.name,
                status: w.status === "Active" ? "Active" : "Inactive",
                role: w.role || "Support Agent",
                persona: w.persona || "Unknown",
              }))
            : [],
        }
        setAgent(enrichedAgent)
        setWorkers(enrichedAgent.worker_agents)
      })
      .catch(() =>
        toast({ title: "Error", description: "Failed to fetch agent details", variant: "destructive" })
      )
      .finally(() => setLoading(false))
  }

  useEffect(() => {
    fetchAgent()
  }, [id])

  const handleToggleWorker = async (workerId: number) => {
    const workerToUpdate = workers.find((w) => w.id === workerId)
    if (!workerToUpdate) return

    const newStatus = workerToUpdate.status === "Active" ? "Inactive" : "Active"
    setWorkers((prev) => prev.map((w) => (w.id === workerId ? { ...w, status: newStatus } : w)))

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/agents/${id}/workers/${workerId}/`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${Cookies.get("Token") || ""}`,
        },
        body: JSON.stringify({ status: newStatus.toLowerCase() }),
      })
      if (!res.ok) throw new Error("Failed")
      toast({ title: "Worker Updated", description: `Status set to ${newStatus}.` })
    } catch {
      // rollback
      setWorkers((prev) => prev.map((w) => (w.id === workerId ? { ...w, status: workerToUpdate.status } : w)))
      toast({ title: "Error", description: "Failed to update worker", variant: "destructive" })
    }
  }

  const handleDeleteWorker = async (workerId: number) => {
    if (!window.confirm("Delete this worker?")) return
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/agents/${id}/workers/${workerId}/`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${Cookies.get("Token") || ""}`,
        },
      })
      if (res.ok) {
        setWorkers((prev) => prev.filter((w) => w.id !== workerId))
        toast({ title: "Worker Deleted", description: "Worker removed successfully.", variant: "destructive" })
      } else throw new Error()
    } catch {
      toast({ title: "Error", description: "Failed to delete worker", variant: "destructive" })
    }
  }

  const togglePersonaExpansion = (workerId: number) => {
    setExpandedPersonas((prev) => {
      const newSet = new Set(prev)
      newSet.has(workerId) ? newSet.delete(workerId) : newSet.add(workerId)
      return newSet
    })
  }

  const truncatePersona = (persona: string, maxLength = 60) =>
    persona.length <= maxLength ? persona : persona.substring(0, maxLength) + "..."

  return (
    <div className="min-h-screen bg-white text-gray-900 font-[Poppins]">
      <div className="container mx-auto px-6 py-14 max-w-7xl">
        {/* Cinematic Header */}
        <div className="mb-14 text-center space-y-4">
          <h1 className="text-5xl font-extrabold tracking-tight drop-shadow-sm">
            {agent ? `${agent.name} Agent Page` : "Agent Page"}
          </h1>
          <p className="text-lg text-gray-600">
            Manage and monitor worker agents linked to this primary agent.
          </p>
        </div>

        {/* Add Worker Button */}
        <div className="flex justify-center mb-12">
          <Dialog>
            <DialogTrigger asChild>
              <Button
                size="lg"
                className="bg-black hover:bg-gray-800 text-white px-8 py-3 text-base font-semibold shadow-md hover:shadow-xl transition-all duration-300 rounded-xl"
              >
                <Plus className="w-5 h-5 mr-2" />
                Add Worker
              </Button>
            </DialogTrigger>
          </Dialog>
        </div>

        {/* Workers Grid */}
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <Loader2 className="w-12 h-12 text-gray-500 animate-spin" />
          </div>
        ) : workers.length === 0 ? (
          <Card className="bg-gray-50 border-2 border-dashed border-gray-200 shadow-sm">
            <CardContent className="flex flex-col items-center justify-center py-16 px-6 text-center">
              <div className="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center mb-6">
                <Bot className="w-10 h-10 text-gray-500" />
              </div>
              <h3 className="text-xl font-semibold mb-2">No workers found</h3>
              <p className="text-gray-500 max-w-md">
                Start by adding your first worker agent. Click <span className="font-medium">“Add Worker”</span> above.
              </p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {workers.map((worker) => (
              <Card
                key={worker.id}
                className="group bg-white border border-gray-200 shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 rounded-2xl overflow-hidden"
              >
                <CardHeader className="pb-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-3 flex-1 min-w-0">
                      <Avatar className="w-12 h-12 bg-black text-white flex-shrink-0">
                        <AvatarFallback className="bg-black text-white font-semibold">
                          {worker.name.charAt(0).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <div className="min-w-0 flex-1">
                        <CardTitle className="text-lg font-semibold truncate">
                          {worker.name}
                        </CardTitle>
                        <p className="text-sm text-gray-500">{worker.role}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      {/* Settings */}
                      <Button
                        size="icon"
                        variant="ghost"
                        className="opacity-0 group-hover:opacity-100 transition-opacity text-gray-400 hover:text-black hover:bg-gray-100 rounded-lg h-6 w-6"
                        title="Settings"
                      >
                        <Settings className="h-3 w-3" />
                      </Button>

                      {/* Delete */}
                      <Button
                        size="icon"
                        variant="ghost"
                        onClick={() => handleDeleteWorker(worker.id)}
                        className="opacity-0 group-hover:opacity-100 transition-opacity text-gray-400 hover:text-red-500 hover:bg-gray-100 rounded-lg h-6 w-6"
                        title="Delete Worker"
                      >
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="pt-0 space-y-4">
                  {/* Status */}
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                    <div className="flex items-center space-x-3">
                      <div
                        className={`w-3 h-3 rounded-full ${
                          worker.status === "Active" ? "bg-green-500" : "bg-gray-400"
                        }`}
                      />
                      <Label className="text-sm font-medium">{worker.status}</Label>
                    </div>
                    <Switch
                      checked={worker.status === "Active"}
                      onCheckedChange={() => handleToggleWorker(worker.id)}
                      className="data-[state=checked]:bg-green-600"
                    />
                  </div>

                  {/* Details */}
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-500">Worker ID</span>
                      <Badge variant="outline" className="text-xs border-gray-300 text-gray-700">
                        #{worker.id}
                      </Badge>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-gray-500">Persona</span>
                        <FileText className="w-4 h-4 text-gray-400" />
                      </div>
                      <div className="bg-gray-50 rounded-lg p-3 border-l-4 border-black">
                        <p className="text-sm leading-relaxed text-gray-800">
                          {expandedPersonas.has(worker.id)
                            ? worker.persona
                            : truncatePersona(worker.persona)}
                        </p>
                        {worker.persona.length > 60 && (
                          <button
                            onClick={() => togglePersonaExpansion(worker.id)}
                            className="mt-2 text-xs text-black hover:text-gray-700 font-medium transition-colors"
                          >
                            {expandedPersonas.has(worker.id) ? "Show less" : "Read more"}
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
