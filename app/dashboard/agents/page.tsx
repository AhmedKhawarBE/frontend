// "use client"

// import { useEffect, useState } from "react"
// import { Button } from "@/components/ui/button"
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
// import { Dialog, DialogTrigger } from "@/components/ui/dialog"
// import { AddAgentWizard } from "@/components/add-agent-wizard"
// import { Switch } from "@/components/ui/switch"
// import { Label } from "@/components/ui/label"
// import { Badge } from "@/components/ui/badge"
// import { Avatar, AvatarFallback } from "@/components/ui/avatar"
// import { useToast } from "@/hooks/use-toast"
// import { Trash2, Bot, Plus, Users, Activity, FileText } from "lucide-react"
// import Cookies from "js-cookie"

// interface Agent {
//   id: number
//   name: string
//   status: "Active" | "Inactive"
//   persona: string
// }

// export default function AgentsPage() {
//   const [agents, setAgents] = useState<Agent[]>([])
//   const [isAddAgentWizardOpen, setIsAddAgentWizardOpen] = useState(false)
//   const [expandedPersonas, setExpandedPersonas] = useState<Set<number>>(new Set())
//   const { toast } = useToast()

//   useEffect(() => {
//     fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/agents/agents/`, {
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Token ${Cookies.get("Token") || ""}`,
//       },
//     })
//       .then((res) => res.json())
//       .then((data) => {
//         const enriched = Array.isArray(data)
//           ? data.map((agent) => ({
//               id: agent.id,
//               name: agent.name,
//               status: agent.status === "Active" || agent.status === "active" ? "Active" : "Inactive",
//               persona: agent.persona || "Unknown",
//             }))
//           : []
//         setAgents(enriched)
//       })
//       .catch(() => {
//         toast({
//           title: "Error",
//           description: "Failed to fetch agents",
//           variant: "destructive",
//         })
//       })
//   }, [])

//   const handleToggleAgentStatus = async (id: number) => {
//     const token = Cookies.get("Token") || ""
//     const agentToUpdate = agents.find((agent) => agent.id === id)
//     if (!agentToUpdate) return

//     const newStatus = agentToUpdate.status === "Active" ? "Inactive" : "Active"

//     // Optimistically update the UI
//     setAgents((prev) => prev.map((agent) => (agent.id === id ? { ...agent, status: newStatus } : agent)))

//     try {
//       const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/agents/agents/${id}/`, {
//         method: "PATCH",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Token ${Cookies.get("Token") || ""}`,
//         },
//         body: JSON.stringify({ status: newStatus.toLowerCase() }),
//       })

//       if (!res.ok) {
//         throw new Error("Failed to update agent status")
//       }

//       toast({
//         title: "Agent Status Updated",
//         description: `Agent status changed to ${newStatus}.`,
//       })
//     } catch (error) {
//       // Roll back the UI change if the request fails
//       setAgents((prev) => prev.map((agent) => (agent.id === id ? { ...agent, status: agentToUpdate.status } : agent)))
//       toast({
//         title: "Error",
//         description: "Failed to update agent status",
//         variant: "destructive",
//       })
//     }
//   }

//   const handleDeleteAgent = async (id: number) => {
//     if (!window.confirm("Are you sure you want to delete this agent?")) return

//     try {
//       const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/agents/agents/${id}/`, {
//         method: "DELETE",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Token ${Cookies.get("Token") || ""}`,
//         },
//       })

//       if (res.ok) {
//         setAgents((prev) => prev.filter((agent) => agent.id !== id))
//         toast({
//           title: "Agent Deleted",
//           description: "The agent has been successfully deleted.",
//           variant: "destructive",
//         })
//       } else {
//         throw new Error("Delete failed")
//       }
//     } catch (err) {
//       toast({ title: "Error", description: "Failed to delete agent", variant: "destructive" })
//     }
//   }

//   const togglePersonaExpansion = (agentId: number) => {
//     setExpandedPersonas((prev) => {
//       const newSet = new Set(prev)
//       if (newSet.has(agentId)) {
//         newSet.delete(agentId)
//       } else {
//         newSet.add(agentId)
//       }
//       return newSet
//     })
//   }

//   const truncatePersona = (persona: string, maxLength = 60) => {
//     if (persona.length <= maxLength) return persona
//     return persona.substring(0, maxLength) + "..."
//   }

//   const activeAgents = agents.filter((agent) => agent.status === "Active").length
//   const totalAgents = agents.length

//   return (
//     <div className="min-h-screen bg-slate-50">
//       <div className="container mx-auto px-6 py-8 max-w-7xl">
//         {/* Header Section */}
//         <div className="mb-8">
//           <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
//             <div className="space-y-2">
//               <h1 className="text-4xl font-bold text-slate-900">Agents Management</h1>
//               <p className="text-slate-600 text-lg">Manage and monitor your AI agents in one centralized dashboard</p>
//             </div>

//             <Dialog open={isAddAgentWizardOpen} onOpenChange={setIsAddAgentWizardOpen}>
//               <DialogTrigger asChild>
//                 <Button
//                   size="lg"
//                   className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 text-base font-semibold shadow-lg hover:shadow-xl transition-all duration-200 rounded-xl"
//                 >
//                   <Plus className="w-5 h-5 mr-2" />
//                   Add New Agent
//                 </Button>
//               </DialogTrigger>
//               <AddAgentWizard
//                 isOpen={isAddAgentWizardOpen}
//                 onClose={() => setIsAddAgentWizardOpen(false)}
//                 onAgentAdded={() => {}}
//               />
//             </Dialog>
//           </div>

//           {/* Stats Cards */}
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
//             <Card className="bg-white backdrop-blur-sm border-0 shadow-lg">
//               <CardContent className="p-6">
//                 <div className="flex items-center space-x-4">
//                   <div className="p-3 bg-blue-100 rounded-xl">
//                     <Users className="w-6 h-6 text-blue-600" />
//                   </div>
//                   <div>
//                     <p className="text-sm font-medium text-slate-600">Total Agents</p>
//                     <p className="text-2xl font-bold text-slate-900">{totalAgents}</p>
//                   </div>
//                 </div>
//               </CardContent>
//             </Card>

//             <Card className="bg-white backdrop-blur-sm border-0 shadow-lg">
//               <CardContent className="p-6">
//                 <div className="flex items-center space-x-4">
//                   <div className="p-3 bg-green-100 rounded-xl">
//                     <Activity className="w-6 h-6 text-green-600" />
//                   </div>
//                   <div>
//                     <p className="text-sm font-medium text-slate-600">Active Agents</p>
//                     <p className="text-2xl font-bold text-slate-900">{activeAgents}</p>
//                   </div>
//                 </div>
//               </CardContent>
//             </Card>

//             <Card className="bg-white backdrop-blur-sm border-0 shadow-lg">
//               <CardContent className="p-6">
//                 <div className="flex items-center space-x-4">
//                   <div className="p-3 bg-orange-100 rounded-xl">
//                     <Bot className="w-6 h-6 text-orange-600" />
//                   </div>
//                   <div>
//                     <p className="text-sm font-medium text-slate-600">Inactive Agents</p>
//                     <p className="text-2xl font-bold text-slate-900">{totalAgents - activeAgents}</p>
//                   </div>
//                 </div>
//               </CardContent>
//             </Card>
//           </div>
//         </div>

//         {/* Agents Grid */}
//         <div className="space-y-6">
//           <div className="flex items-center justify-between">
//             <h2 className="text-2xl font-semibold text-slate-800">Your Agents</h2>
//             <Badge variant="secondary" className="text-sm px-3 py-1">
//               {totalAgents} {totalAgents === 1 ? "Agent" : "Agents"}
//             </Badge>
//           </div>

//           {agents.length === 0 ? (
//             <Card className="bg-white backdrop-blur-sm border-2 border-dashed border-slate-200 shadow-lg">
//               <CardContent className="flex flex-col items-center justify-center py-16 px-6 text-center">
//                 <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mb-6">
//                   <Bot className="w-10 h-10 text-slate-400" />
//                 </div>
//                 <h3 className="text-xl font-semibold text-slate-700 mb-2">No agents found</h3>
//                 <p className="text-slate-500 mb-6 max-w-md">
//                   Get started by creating your first AI agent. Click the "Add New Agent" button to begin.
//                 </p>
//                 <Dialog open={isAddAgentWizardOpen} onOpenChange={setIsAddAgentWizardOpen}>
//                   <DialogTrigger asChild>
//                     <Button className="bg-blue-600 hover:bg-blue-700 text-white">
//                       <Plus className="w-4 h-4 mr-2" />
//                       Create Your First Agent
//                     </Button>
//                   </DialogTrigger>
//                 </Dialog>
//               </CardContent>
//             </Card>
//           ) : (
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
//               {agents.map((agent) => (
//                 <Card
//                   key={agent.id}
//                   className="group bg-white backdrop-blur-sm border-0 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 rounded-2xl overflow-hidden"
//                 >
//                   <CardHeader className="pb-4">
//                     <div className="flex items-start justify-between">
//                       <div className="flex items-center space-x-3">
//                         <Avatar className="w-12 h-12 bg-blue-500">
//                           <AvatarFallback className="bg-blue-500 text-white font-semibold">
//                             {agent.name.charAt(0).toUpperCase()}
//                           </AvatarFallback>
//                         </Avatar>
//                         <div>
//                           <CardTitle className="text-lg font-semibold text-slate-800 group-hover:text-slate-900 transition-colors">
//                             {agent.name}
//                           </CardTitle>
//                           <p className="text-sm text-slate-500">AI Assistant</p>
//                         </div>
//                       </div>

//                       <Button
//                         size="icon"
//                         variant="ghost"
//                         onClick={() => handleDeleteAgent(agent.id)}
//                         className="opacity-0 group-hover:opacity-100 transition-opacity text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg"
//                         title="Delete Agent"
//                       >
//                         <Trash2 className="h-4 w-4" />
//                       </Button>
//                     </div>
//                   </CardHeader>

//                   <CardContent className="pt-0 space-y-4">
//                     {/* Status Section */}
//                     <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl">
//                       <div className="flex items-center space-x-3">
//                         <div
//                           className={`w-3 h-3 rounded-full ${agent.status === "Active" ? "bg-green-500" : "bg-slate-400"}`}
//                         />
//                         <Label
//                           htmlFor={`status-toggle-${agent.id}`}
//                           className="text-sm font-medium text-slate-700 cursor-pointer"
//                         >
//                           {agent.status}
//                         </Label>
//                       </div>
//                       <Switch
//                         id={`status-toggle-${agent.id}`}
//                         checked={agent.status === "Active"}
//                         onCheckedChange={() => handleToggleAgentStatus(agent.id)}
//                         className="data-[state=checked]:bg-green-500"
//                       />
//                     </div>

//                     {/* Agent Details */}
//                     <div className="space-y-3">
//                       <div className="flex justify-between items-center text-sm">
//                         <span className="text-slate-500">Agent ID</span>
//                         <Badge variant="outline" className="text-xs">
//                           #{agent.id}
//                         </Badge>
//                       </div>

//                       <div className="flex justify-between items-center text-sm">
//                         <span className="text-slate-500">Type</span>
//                         <span className="text-slate-700 font-medium">Conversational AI</span>
//                       </div>

//                       {/* Persona Section */}
//                       <div className="space-y-2">
//                         <div className="flex items-center justify-between">
//                           <span className="text-slate-500 text-sm">Persona</span>
//                           <FileText className="w-4 h-4 text-slate-400" />
//                         </div>

//                         <div className="bg-slate-50 rounded-lg p-3 border-l-4 border-blue-500">
//                           <p className="text-sm text-slate-700 leading-relaxed">
//                             {expandedPersonas.has(agent.id) ? agent.persona : truncatePersona(agent.persona)}
//                           </p>

//                           {agent.persona.length > 60 && (
//                             <button
//                               onClick={() => togglePersonaExpansion(agent.id)}
//                               className="mt-2 text-xs text-blue-600 hover:text-blue-800 font-medium transition-colors"
//                             >
//                               {expandedPersonas.has(agent.id) ? "Show less" : "Read more"}
//                             </button>
//                           )}
//                         </div>
//                       </div>
//                     </div>
//                   </CardContent>
//                 </Card>
//               ))}
//             </div>
//           )}
//         </div>

//         {/* Footer */}
//         <div className="mt-16 pt-8 border-t border-slate-200">
//           <div className="text-center space-y-2">
//             <div className="text-sm text-slate-500 font-medium">© 2025 All rights reserved.</div>
//             <div className="text-xs text-slate-400 flex items-center justify-center space-x-2">
//               <span>Session ID: f4f2fc7d-7161-4d53-ae5f-6bd14515f55b</span>
//               <span className="text-green-500">🔒</span>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }

"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog"
import { AddAgentWizard } from "@/components/add-agent-wizard"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { useToast } from "@/hooks/use-toast"
import { Trash2, Bot, Plus, Users, Activity, FileText } from "lucide-react"
import Cookies from "js-cookie"

interface Agent {
  id: number
  name: string
  status: "Active" | "Inactive"
  persona: string
  primary: boolean
}

export default function AgentsPage() {
  const [agents, setAgents] = useState<Agent[]>([])
  const [isAddAgentWizardOpen, setIsAddAgentWizardOpen] = useState(false)
  const [expandedPersonas, setExpandedPersonas] = useState<Set<number>>(new Set())
  const [primaryDialogOpen, setPrimaryDialogOpen] = useState(false)
  const [selectedAgentId, setSelectedAgentId] = useState<number | null>(null)
  const { toast } = useToast()

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/agents/agents/`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${Cookies.get("Token") || ""}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        const enriched = Array.isArray(data)
          ? data.map((agent) => ({
              id: agent.id,
              name: agent.name,
              status: agent.status === "Active" || agent.status === "active" ? "Active" : "Inactive",
              persona: agent.persona || "Unknown",
              primary: agent.primary || false,
            }))
          : []
        setAgents(enriched)
      })
      .catch(() => {
        toast({
          title: "Error",
          description: "Failed to fetch agents",
          variant: "destructive",
        })
      })
  }, [])

  const fetchAgents = () => {
  fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/agents/agents/`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Token ${Cookies.get("Token") || ""}`,
    },
  })
    .then((res) => res.json())
    .then((data) => {
      const enriched = Array.isArray(data)
        ? data.map((agent) => ({
            id: agent.id,
            name: agent.name,
            status: agent.status === "Active" || agent.status === "active" ? "Active" : "Inactive",
            persona: agent.persona || "Unknown",
            primary: agent.primary || false,
          }))
        : []
      setAgents(enriched)
    })
    .catch(() => {
      toast({
        title: "Error",
        description: "Failed to fetch agents",
        variant: "destructive",
      })
    })
}


  const handleToggleAgentStatus = async (id: number) => {
    const token = Cookies.get("Token") || ""
    const agentToUpdate = agents.find((agent) => agent.id === id)
    if (!agentToUpdate) return

    if (agentToUpdate.primary) {
    toast({
      title: "Action Not Allowed",
      description: "You cannot deactivate the primary agent.",
      variant: "destructive",
    })
    return
  }

    const newStatus = agentToUpdate.status === "Active" ? "Inactive" : "Active"

    // Optimistically update the UI
    setAgents((prev) => prev.map((agent) => (agent.id === id ? { ...agent, status: newStatus } : agent)))

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/agents/agents/${id}/`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${Cookies.get("Token") || ""}`,
        },
        body: JSON.stringify({ status: newStatus.toLowerCase() }),
      })

      if (!res.ok) {
        throw new Error("Failed to update agent status")
      }

      toast({
        title: "Agent Status Updated",
        description: `Agent status changed to ${newStatus}.`,
      })
    } catch (error) {
      // Roll back the UI change if the request fails
      setAgents((prev) => prev.map((agent) => (agent.id === id ? { ...agent, status: agentToUpdate.status } : agent)))
      toast({
        title: "Error",
        description: "Failed to update agent status",
        variant: "destructive",
      })
    }
  }

  const handleDeleteAgent = async (id: number) => {
    if (!window.confirm("Are you sure you want to delete this agent?")) return

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/agents/agents/${id}/`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${Cookies.get("Token") || ""}`,
        },
      })

      if (res.ok) {
        setAgents((prev) => prev.filter((agent) => agent.id !== id))
        toast({
          title: "Agent Deleted",
          description: "The agent has been successfully deleted.",
          variant: "destructive",
        })
      } else {
        throw new Error("Delete failed")
      }
    } catch (err) {
      toast({ title: "Error", description: "Failed to delete agent", variant: "destructive" })
    }
  }

  const handleMakePrimaryClick = (id: number) => {
    setSelectedAgentId(id)
    setPrimaryDialogOpen(true)
  }

  const handleMakePrimary = async () => {
  if (!selectedAgentId) return

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/agents/agents/${selectedAgentId}/`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${Cookies.get("Token") || ""}`,
      },
      body: JSON.stringify({ primary: true }),
    })

    if (res.ok) {
      // Update frontend state: set only this agent as primary
      setAgents((prevAgents) =>
        prevAgents.map((agent) =>
          agent.id === selectedAgentId
            ? { ...agent, primary: true }
            : { ...agent, primary: false }
        )
      )

      toast({
        title: "Primary Agent Set",
        description: "The agent has been set as primary.",
      })
    } else {
      throw new Error("Failed to set primary agent")
    }
  } catch (err) {
    toast({
      title: "Error",
      description: "Failed to set primary agent",
      variant: "destructive",
    })
  } finally {
    setPrimaryDialogOpen(false)
    setSelectedAgentId(null)
  }
}


  const togglePersonaExpansion = (agentId: number) => {
    setExpandedPersonas((prev) => {
      const newSet = new Set(prev)
      if (newSet.has(agentId)) {
        newSet.delete(agentId)
      } else {
        newSet.add(agentId)
      }
      return newSet
    })
  }

  const truncatePersona = (persona: string, maxLength = 60) => {
    if (persona.length <= maxLength) return persona
    return persona.substring(0, maxLength) + "..."
  }

  const activeAgents = agents.filter((agent) => agent.status === "Active").length
  const totalAgents = agents.length

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="container mx-auto px-6 py-8 max-w-7xl">
        {/* Header Section */}
        <div className="mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div className="space-y-2">
              <h1 className="text-4xl font-bold text-slate-900">Agents Management</h1>
              <p className="text-slate-600 text-lg">Manage and monitor your AI agents in one centralized dashboard</p>
            </div>
            <Dialog open={isAddAgentWizardOpen} onOpenChange={setIsAddAgentWizardOpen}>
              <DialogTrigger asChild>
                <Button
                  size="lg"
                  className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 text-base font-semibold shadow-lg hover:shadow-xl transition-all duration-200 rounded-xl"
                >
                  <Plus className="w-5 h-5 mr-2" />
                  Add New Agent
                </Button>
              </DialogTrigger>
              <AddAgentWizard
                isOpen={isAddAgentWizardOpen}
                onClose={() => setIsAddAgentWizardOpen(false)}
                onAgentAdded={fetchAgents}
              />
            </Dialog>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
            <Card className="bg-white backdrop-blur-sm border-0 shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-center space-x-4">
                  <div className="p-3 bg-blue-100 rounded-xl">
                    <Users className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-slate-600">Total Agents</p>
                    <p className="text-2xl font-bold text-slate-900">{totalAgents}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white backdrop-blur-sm border-0 shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-center space-x-4">
                  <div className="p-3 bg-green-100 rounded-xl">
                    <Activity className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-slate-600">Active Agents</p>
                    <p className="text-2xl font-bold text-slate-900">{activeAgents}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white backdrop-blur-sm border-0 shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-center space-x-4">
                  <div className="p-3 bg-orange-100 rounded-xl">
                    <Bot className="w-6 h-6 text-orange-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-slate-600">Inactive Agents</p>
                    <p className="text-2xl font-bold text-slate-900">{totalAgents - activeAgents}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Agents Grid */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-semibold text-slate-800">Your Agents</h2>
            <Badge variant="secondary" className="text-sm px-3 py-1">
              {totalAgents} {totalAgents === 1 ? "Agent" : "Agents"}
            </Badge>
          </div>

          {agents.length === 0 ? (
            <Card className="bg-white backdrop-blur-sm border-2 border-dashed border-slate-200 shadow-lg">
              <CardContent className="flex flex-col items-center justify-center py-16 px-6 text-center">
                <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mb-6">
                  <Bot className="w-10 h-10 text-slate-400" />
                </div>
                <h3 className="text-xl font-semibold text-slate-700 mb-2">No agents found</h3>
                <p className="text-slate-500 mb-6 max-w-md">
                  Get started by creating your first AI agent. Click the "Add New Agent" button to begin.
                </p>
                <Dialog open={isAddAgentWizardOpen} onOpenChange={setIsAddAgentWizardOpen}>
                  <DialogTrigger asChild>
                    <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                      <Plus className="w-4 h-4 mr-2" />
                      Create Your First Agent
                    </Button>
                  </DialogTrigger>
                </Dialog>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {agents.map((agent) => (
                <Card
                  key={agent.id}
                  className={`group bg-white backdrop-blur-sm border-0 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 rounded-2xl overflow-hidden min-w-[320px] ${
                    agent.primary ? "ring-2 ring-amber-400 bg-gradient-to-br from-amber-50 to-white" : ""
                  }`}
                >
                  {agent.primary && (
                    <div className="bg-gradient-to-r from-amber-400 to-amber-500 text-white text-xs font-semibold px-3 py-1 text-center">
                      ⭐ PRIMARY AGENT
                    </div>
                  )}
                  <CardHeader className="pb-4">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center space-x-3 flex-1 min-w-0">
                        <Avatar className="w-12 h-12 bg-blue-500 flex-shrink-0">
                          <AvatarFallback className="bg-blue-500 text-white font-semibold">
                            {agent.name.charAt(0).toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                        <div className="min-w-0 flex-1">
                          <CardTitle className="text-lg font-semibold text-slate-800 group-hover:text-slate-900 transition-colors truncate">
                            {agent.name}
                          </CardTitle>
                          <p className="text-sm text-slate-500">AI Assistant</p>
                        </div>
                      </div>
                      <div className="flex flex-col items-center space-y-1 flex-shrink-0">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleMakePrimaryClick(agent.id)}
                          className="opacity-0 group-hover:opacity-100 transition-opacity text-blue-600 hover:text-blue-700 hover:bg-blue-50 border-blue-200 text-xs px-2 py-1 h-6"
                          title="Make Primary Agent"
                        >
                          Make Primary
                        </Button>
                        <Button
                          size="icon"
                          variant="ghost"
                          onClick={() => handleDeleteAgent(agent.id)}
                          className="opacity-0 group-hover:opacity-100 transition-opacity text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg h-6 w-6"
                          title="Delete Agent"
                        >
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  </CardHeader>

                  <CardContent className="pt-0 space-y-4">
                    {/* Status Section */}
                    <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl">
                      <div className="flex items-center space-x-3">
                        <div
                          className={`w-3 h-3 rounded-full ${
                            agent.status === "Active" ? "bg-green-500" : "bg-slate-400"
                          }`}
                        />
                        <Label
                          htmlFor={`status-toggle-${agent.id}`}
                          className="text-sm font-medium text-slate-700 cursor-pointer"
                        >
                          {agent.status}
                        </Label>
                      </div>
                      <Switch
                        id={`status-toggle-${agent.id}`}
                        checked={agent.status === "Active"}
                        onCheckedChange={() => handleToggleAgentStatus(agent.id)}
                        className="data-[state=checked]:bg-green-500"
                      />
                    </div>

                    {/* Agent Details */}
                    <div className="space-y-3">
                      <div className="flex justify-between items-center text-sm">
                        <span className="text-slate-500">Agent ID</span>
                        <Badge variant="outline" className="text-xs">
                          #{agent.id}
                        </Badge>
                      </div>
                      <div className="flex justify-between items-center text-sm">
                        <span className="text-slate-500">Type</span>
                        <span className="text-slate-700 font-medium">Conversational AI</span>
                      </div>

                      {/* Persona Section */}
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-slate-500 text-sm">Persona</span>
                          <FileText className="w-4 h-4 text-slate-400" />
                        </div>
                        <div className="bg-slate-50 rounded-lg p-3 border-l-4 border-blue-500">
                          <p className="text-sm text-slate-700 leading-relaxed">
                            {expandedPersonas.has(agent.id) ? agent.persona : truncatePersona(agent.persona)}
                          </p>
                          {agent.persona.length > 60 && (
                            <button
                              onClick={() => togglePersonaExpansion(agent.id)}
                              className="mt-2 text-xs text-blue-600 hover:text-blue-800 font-medium transition-colors"
                            >
                              {expandedPersonas.has(agent.id) ? "Show less" : "Read more"}
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

        {/* Footer */}
        <div className="mt-16 pt-8 border-t border-slate-200">
          <div className="text-center space-y-2">
            <div className="text-sm text-slate-500 font-medium">© 2025 All rights reserved.</div>
            <div className="text-xs text-slate-400 flex items-center justify-center space-x-2">
              <span>Session ID: f4f2fc7d-7161-4d53-ae5f-6bd14515f55b</span>
              <span className="text-green-500">🔒</span>
            </div>
          </div>
        </div>
      </div>

      {/* Make Primary Confirmation Dialog */}
      <Dialog open={primaryDialogOpen} onOpenChange={setPrimaryDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Make Agent Primary</DialogTitle>
            <DialogDescription>Are you sure you want to make this agent primary?</DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setPrimaryDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleMakePrimary} className="bg-blue-600 hover:bg-blue-700 text-white">
              Yes, Make Primary
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}





// "use client"

// import { useEffect, useState } from "react"
// import { Button } from "@/components/ui/button"
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
// import {
//   Dialog,
//   DialogTrigger,
//   DialogContent,
//   DialogHeader,
//   DialogTitle,
//   DialogDescription,
//   DialogFooter,
// } from "@/components/ui/dialog"
// import { AddAgentWizard } from "@/components/add-agent-wizard"
// import { Switch } from "@/components/ui/switch"
// import { Label } from "@/components/ui/label"
// import { Badge } from "@/components/ui/badge"
// import { Avatar, AvatarFallback } from "@/components/ui/avatar"
// import { useToast } from "@/hooks/use-toast"
// import { Trash2, Bot, Plus, Users, Activity, FileText } from "lucide-react"
// import Cookies from "js-cookie"

// interface Agent {
//   id: number
//   name: string
//   status: "Active" | "Inactive"
//   persona: string
// }

// export default function AgentsPage() {
//   const [agents, setAgents] = useState<Agent[]>([])
//   const [isAddAgentWizardOpen, setIsAddAgentWizardOpen] = useState(false)
//   const [expandedPersonas, setExpandedPersonas] = useState<Set<number>>(new Set())
//   const [primaryDialogOpen, setPrimaryDialogOpen] = useState(false)
//   const [selectedAgentId, setSelectedAgentId] = useState<number | null>(null)
//   const { toast } = useToast()

//   useEffect(() => {
//     fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/agents/agents/`, {
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Token ${Cookies.get("Token") || ""}`,
//       },
//     })
//       .then((res) => res.json())
//       .then((data) => {
//         const enriched = Array.isArray(data)
//           ? data.map((agent) => ({
//               id: agent.id,
//               name: agent.name,
//               status: agent.status === "Active" || agent.status === "active" ? "Active" : "Inactive",
//               persona: agent.persona || "Unknown",
//             }))
//           : []
//         setAgents(enriched)
//       })
//       .catch(() => {
//         toast({
//           title: "Error",
//           description: "Failed to fetch agents",
//           variant: "destructive",
//         })
//       })
//   }, [])

//   const handleToggleAgentStatus = async (id: number) => {
//     const token = Cookies.get("Token") || ""
//     const agentToUpdate = agents.find((agent) => agent.id === id)
//     if (!agentToUpdate) return

//     const newStatus = agentToUpdate.status === "Active" ? "Inactive" : "Active"

//     // Optimistically update the UI
//     setAgents((prev) => prev.map((agent) => (agent.id === id ? { ...agent, status: newStatus } : agent)))

//     try {
//       const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/agents/agents/${id}/`, {
//         method: "PATCH",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Token ${Cookies.get("Token") || ""}`,
//         },
//         body: JSON.stringify({ status: newStatus.toLowerCase() }),
//       })

//       if (!res.ok) {
//         throw new Error("Failed to update agent status")
//       }

//       toast({
//         title: "Agent Status Updated",
//         description: `Agent status changed to ${newStatus}.`,
//       })
//     } catch (error) {
//       // Roll back the UI change if the request fails
//       setAgents((prev) => prev.map((agent) => (agent.id === id ? { ...agent, status: agentToUpdate.status } : agent)))
//       toast({
//         title: "Error",
//         description: "Failed to update agent status",
//         variant: "destructive",
//       })
//     }
//   }

//   const handleDeleteAgent = async (id: number) => {
//     if (!window.confirm("Are you sure you want to delete this agent?")) return

//     try {
//       const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/agents/agents/${id}/`, {
//         method: "DELETE",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Token ${Cookies.get("Token") || ""}`,
//         },
//       })

//       if (res.ok) {
//         setAgents((prev) => prev.filter((agent) => agent.id !== id))
//         toast({
//           title: "Agent Deleted",
//           description: "The agent has been successfully deleted.",
//           variant: "destructive",
//         })
//       } else {
//         throw new Error("Delete failed")
//       }
//     } catch (err) {
//       toast({ title: "Error", description: "Failed to delete agent", variant: "destructive" })
//     }
//   }

//   const handleMakePrimaryClick = (id: number) => {
//     setSelectedAgentId(id)
//     setPrimaryDialogOpen(true)
//   }

//   const handleMakePrimary = async () => {
//     if (!selectedAgentId) return

//     try {
//       const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/agents/agents/${selectedAgentId}/`, {
//         method: "PATCH",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Token ${Cookies.get("Token") || ""}`,
//         },
//         body: JSON.stringify({ primary: true }),
//       })
      
//       if (res.ok) {
//         const data = await res.json()
// console.log(data)
//         toast({
//           title: "Primary Agent Set",
//           description: "The agent has been set as primary.",
//         })
//       } else {
//         throw new Error("Failed to set primary agent")
//       }
//     } catch (err) {
//       toast({
//         title: "Error",
//         description: "Failed to set primary agent",
//         variant: "destructive",
//       })
//     } finally {
//       setPrimaryDialogOpen(false)
//       setSelectedAgentId(null)
//     }
//   }

//   const togglePersonaExpansion = (agentId: number) => {
//     setExpandedPersonas((prev) => {
//       const newSet = new Set(prev)
//       if (newSet.has(agentId)) {
//         newSet.delete(agentId)
//       } else {
//         newSet.add(agentId)
//       }
//       return newSet
//     })
//   }

//   const truncatePersona = (persona: string, maxLength = 60) => {
//     if (persona.length <= maxLength) return persona
//     return persona.substring(0, maxLength) + "..."
//   }

//   const activeAgents = agents.filter((agent) => agent.status === "Active").length
//   const totalAgents = agents.length

//   return (
//     <div className="min-h-screen bg-slate-50">
//       <div className="container mx-auto px-6 py-8 max-w-7xl">
//         {/* Header Section */}
//         <div className="mb-8">
//           <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
//             <div className="space-y-2">
//               <h1 className="text-4xl font-bold text-slate-900">Agents Management</h1>
//               <p className="text-slate-600 text-lg">Manage and monitor your AI agents in one centralized dashboard</p>
//             </div>
//             <Dialog open={isAddAgentWizardOpen} onOpenChange={setIsAddAgentWizardOpen}>
//               <DialogTrigger asChild>
//                 <Button
//                   size="lg"
//                   className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 text-base font-semibold shadow-lg hover:shadow-xl transition-all duration-200 rounded-xl"
//                 >
//                   <Plus className="w-5 h-5 mr-2" />
//                   Add New Agent
//                 </Button>
//               </DialogTrigger>
//               <AddAgentWizard
//                 isOpen={isAddAgentWizardOpen}
//                 onClose={() => setIsAddAgentWizardOpen(false)}
//                 onAgentAdded={() => {}}
//               />
//             </Dialog>
//           </div>

//           {/* Stats Cards */}
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
//             <Card className="bg-white backdrop-blur-sm border-0 shadow-lg">
//               <CardContent className="p-6">
//                 <div className="flex items-center space-x-4">
//                   <div className="p-3 bg-blue-100 rounded-xl">
//                     <Users className="w-6 h-6 text-blue-600" />
//                   </div>
//                   <div>
//                     <p className="text-sm font-medium text-slate-600">Total Agents</p>
//                     <p className="text-2xl font-bold text-slate-900">{totalAgents}</p>
//                   </div>
//                 </div>
//               </CardContent>
//             </Card>

//             <Card className="bg-white backdrop-blur-sm border-0 shadow-lg">
//               <CardContent className="p-6">
//                 <div className="flex items-center space-x-4">
//                   <div className="p-3 bg-green-100 rounded-xl">
//                     <Activity className="w-6 h-6 text-green-600" />
//                   </div>
//                   <div>
//                     <p className="text-sm font-medium text-slate-600">Active Agents</p>
//                     <p className="text-2xl font-bold text-slate-900">{activeAgents}</p>
//                   </div>
//                 </div>
//               </CardContent>
//             </Card>

//             <Card className="bg-white backdrop-blur-sm border-0 shadow-lg">
//               <CardContent className="p-6">
//                 <div className="flex items-center space-x-4">
//                   <div className="p-3 bg-orange-100 rounded-xl">
//                     <Bot className="w-6 h-6 text-orange-600" />
//                   </div>
//                   <div>
//                     <p className="text-sm font-medium text-slate-600">Inactive Agents</p>
//                     <p className="text-2xl font-bold text-slate-900">{totalAgents - activeAgents}</p>
//                   </div>
//                 </div>
//               </CardContent>
//             </Card>
//           </div>
//         </div>

//         {/* Agents Grid */}
//         <div className="space-y-6">
//           <div className="flex items-center justify-between">
//             <h2 className="text-2xl font-semibold text-slate-800">Your Agents</h2>
//             <Badge variant="secondary" className="text-sm px-3 py-1">
//               {totalAgents} {totalAgents === 1 ? "Agent" : "Agents"}
//             </Badge>
//           </div>

//           {agents.length === 0 ? (
//             <Card className="bg-white backdrop-blur-sm border-2 border-dashed border-slate-200 shadow-lg">
//               <CardContent className="flex flex-col items-center justify-center py-16 px-6 text-center">
//                 <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mb-6">
//                   <Bot className="w-10 h-10 text-slate-400" />
//                 </div>
//                 <h3 className="text-xl font-semibold text-slate-700 mb-2">No agents found</h3>
//                 <p className="text-slate-500 mb-6 max-w-md">
//                   Get started by creating your first AI agent. Click the "Add New Agent" button to begin.
//                 </p>
//                 <Dialog open={isAddAgentWizardOpen} onOpenChange={setIsAddAgentWizardOpen}>
//                   <DialogTrigger asChild>
//                     <Button className="bg-blue-600 hover:bg-blue-700 text-white">
//                       <Plus className="w-4 h-4 mr-2" />
//                       Create Your First Agent
//                     </Button>
//                   </DialogTrigger>
//                 </Dialog>
//               </CardContent>
//             </Card>
//           ) : (
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//               {agents.map((agent) => (
//                 <Card
//                   key={agent.id}
//                   className="group bg-white backdrop-blur-sm border-0 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 rounded-2xl overflow-hidden min-w-[320px]"
//                 >
//                   <CardHeader className="pb-4">
//                     <div className="flex items-start justify-between">
//                       <div className="flex items-center space-x-3 flex-1 min-w-0">
//                         <Avatar className="w-12 h-12 bg-blue-500 flex-shrink-0">
//                           <AvatarFallback className="bg-blue-500 text-white font-semibold">
//                             {agent.name.charAt(0).toUpperCase()}
//                           </AvatarFallback>
//                         </Avatar>
//                         <div className="min-w-0 flex-1">
//                           <CardTitle className="text-lg font-semibold text-slate-800 group-hover:text-slate-900 transition-colors truncate">
//                             {agent.name}
//                           </CardTitle>
//                           <p className="text-sm text-slate-500">AI Assistant</p>
//                         </div>
//                       </div>
//                       <div className="flex flex-col items-center space-y-1 flex-shrink-0">
//                         <Button
//                           size="sm"
//                           variant="outline"
//                           onClick={() => handleMakePrimaryClick(agent.id)}
//                           className="opacity-0 group-hover:opacity-100 transition-opacity text-blue-600 hover:text-blue-700 hover:bg-blue-50 border-blue-200 text-xs px-2 py-1 h-6"
//                           title="Make Primary Agent"
//                         >
//                           Make Primary
//                         </Button>
//                         <Button
//                           size="icon"
//                           variant="ghost"
//                           onClick={() => handleDeleteAgent(agent.id)}
//                           className="opacity-0 group-hover:opacity-100 transition-opacity text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg h-6 w-6"
//                           title="Delete Agent"
//                         >
//                           <Trash2 className="h-3 w-3" />
//                         </Button>
//                       </div>
//                     </div>
//                   </CardHeader>

//                   <CardContent className="pt-0 space-y-4">
//                     {/* Status Section */}
//                     <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl">
//                       <div className="flex items-center space-x-3">
//                         <div
//                           className={`w-3 h-3 rounded-full ${
//                             agent.status === "Active" ? "bg-green-500" : "bg-slate-400"
//                           }`}
//                         />
//                         <Label
//                           htmlFor={`status-toggle-${agent.id}`}
//                           className="text-sm font-medium text-slate-700 cursor-pointer"
//                         >
//                           {agent.status}
//                         </Label>
//                       </div>
//                       <Switch
//                         id={`status-toggle-${agent.id}`}
//                         checked={agent.status === "Active"}
//                         onCheckedChange={() => handleToggleAgentStatus(agent.id)}
//                         className="data-[state=checked]:bg-green-500"
//                       />
//                     </div>

//                     {/* Agent Details */}
//                     <div className="space-y-3">
//                       <div className="flex justify-between items-center text-sm">
//                         <span className="text-slate-500">Agent ID</span>
//                         <Badge variant="outline" className="text-xs">
//                           #{agent.id}
//                         </Badge>
//                       </div>
//                       <div className="flex justify-between items-center text-sm">
//                         <span className="text-slate-500">Type</span>
//                         <span className="text-slate-700 font-medium">Conversational AI</span>
//                       </div>

//                       {/* Persona Section */}
//                       <div className="space-y-2">
//                         <div className="flex items-center justify-between">
//                           <span className="text-slate-500 text-sm">Persona</span>
//                           <FileText className="w-4 h-4 text-slate-400" />
//                         </div>
//                         <div className="bg-slate-50 rounded-lg p-3 border-l-4 border-blue-500">
//                           <p className="text-sm text-slate-700 leading-relaxed">
//                             {expandedPersonas.has(agent.id) ? agent.persona : truncatePersona(agent.persona)}
//                           </p>
//                           {agent.persona.length > 60 && (
//                             <button
//                               onClick={() => togglePersonaExpansion(agent.id)}
//                               className="mt-2 text-xs text-blue-600 hover:text-blue-800 font-medium transition-colors"
//                             >
//                               {expandedPersonas.has(agent.id) ? "Show less" : "Read more"}
//                             </button>
//                           )}
//                         </div>
//                       </div>
//                     </div>
//                   </CardContent>
//                 </Card>
//               ))}
//             </div>
//           )}
//         </div>

//         {/* Footer */}
//         <div className="mt-16 pt-8 border-t border-slate-200">
//           <div className="text-center space-y-2">
//             <div className="text-sm text-slate-500 font-medium">© 2025 All rights reserved.</div>
//             <div className="text-xs text-slate-400 flex items-center justify-center space-x-2">
//               <span>Session ID: f4f2fc7d-7161-4d53-ae5f-6bd14515f55b</span>
//               <span className="text-green-500">🔒</span>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Make Primary Confirmation Dialog */}
//       <Dialog open={primaryDialogOpen} onOpenChange={setPrimaryDialogOpen}>
//         <DialogContent>
//           <DialogHeader>
//             <DialogTitle>Make Agent Primary</DialogTitle>
//             <DialogDescription>Are you sure you want to make this agent primary?</DialogDescription>
//           </DialogHeader>
//           <DialogFooter>
//             <Button variant="outline" onClick={() => setPrimaryDialogOpen(false)}>
//               Cancel
//             </Button>
//             <Button onClick={handleMakePrimary} className="bg-blue-600 hover:bg-blue-700 text-white">
//               Yes, Make Primary
//             </Button>
//           </DialogFooter>
//         </DialogContent>
//       </Dialog>
//     </div>
//   )
// }
