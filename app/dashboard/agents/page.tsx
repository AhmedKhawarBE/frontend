"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Dialog, DialogTrigger } from "@/components/ui/dialog"
import { AddAgentWizard } from "@/components/add-agent-wizard"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"
import { Trash2 } from "lucide-react"

interface Agent {
  id: string
  name: string
  status: "Active" | "Inactive"
  isPrimary: boolean // Keeping for now, but will be removed from UI
}

export default function AgentsPage() {
  const [agents, setAgents] = useState<Agent[]>([
    { id: "1", name: "hello", status: "Active", isPrimary: true },
    { id: "2", name: "Agent Alpha", status: "Inactive", isPrimary: false },
    { id: "3", name: "Agent Beta", status: "Active", isPrimary: false },
  ])
  const [isAddAgentWizardOpen, setIsAddAgentWizardOpen] = useState(false)
  const { toast } = useToast()

  const handleToggleAgentStatus = (id: string) => {
    setAgents((prevAgents) =>
      prevAgents.map((agent) =>
        agent.id === id ? { ...agent, status: agent.status === "Active" ? "Inactive" : "Active" } : agent,
      ),
    )
    toast({
      title: "Agent Status Updated",
      description: "Agent status has been toggled.",
    })
  }

  const handleDeleteAgent = (id: string) => {
    if (window.confirm("Are you sure you want to delete this agent?")) {
      setAgents((prevAgents) => prevAgents.filter((agent) => agent.id !== id))
      toast({
        title: "Agent Deleted",
        description: "The agent has been successfully deleted.",
        variant: "destructive",
      })
    }
  }

  const handleAgentAdded = (newAgentData: any) => {
    const newAgent: Agent = {
      id: String(agents.length + 1), // Simple ID generation for demo
      name: newAgentData.name,
      status: "Inactive", // New agents start as inactive
      isPrimary: false,
    }
    setAgents((prevAgents) => [...prevAgents, newAgent])
    setIsAddAgentWizardOpen(false)
  }

  return (
    <div className="p-6 space-y-8 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Agents Management</h1>
        <Dialog open={isAddAgentWizardOpen} onOpenChange={setIsAddAgentWizardOpen}>
          <DialogTrigger asChild>
            <Button className="bg-teal-600 hover:bg-teal-700 text-white px-6 py-3 text-base shadow-md">
              ADD AGENT
            </Button>
          </DialogTrigger>
          <AddAgentWizard
            isOpen={isAddAgentWizardOpen}
            onClose={() => setIsAddAgentWizardOpen(false)}
            onAgentAdded={handleAgentAdded}
          />
        </Dialog>
      </div>

      {/* Main Agents Section */}
      <div className="space-y-6">
        <h2 className="text-2xl font-semibold text-gray-800">Your Agents</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {agents.map((agent) => (
            <Card
              key={agent.id}
              className="bg-white shadow-lg rounded-lg overflow-hidden transition-all duration-200 hover:shadow-xl"
            >
              <CardContent className="p-0">
                <div className="flex items-center justify-between p-5 border-b border-gray-100">
                  <div className="flex items-center space-x-4">
                    <div className="text-xl font-semibold text-gray-800">{agent.name}</div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="flex items-center space-x-2">
                      <Label htmlFor={`status-toggle-${agent.id}`} className="text-sm text-gray-600">
                        {agent.status}
                      </Label>
                      <Switch
                        id={`status-toggle-${agent.id}`}
                        checked={agent.status === "Active"}
                        onCheckedChange={() => handleToggleAgentStatus(agent.id)}
                        className="data-[state=checked]:bg-teal-600"
                      />
                    </div>
                    <Button
                      size="icon"
                      variant="ghost"
                      onClick={() => handleDeleteAgent(agent.id)}
                      className="text-red-500 hover:bg-red-50 hover:text-red-600"
                      title="Delete Agent"
                    >
                      <Trash2 className="h-5 w-5" />
                    </Button>
                  </div>
                </div>
                <div className="bg-gray-50 px-5 py-3 text-sm text-gray-600">
                  <p>
                    Status:{" "}
                    <span className={`font-medium ${agent.status === "Active" ? "text-green-600" : "text-red-600"}`}>
                      {agent.status}
                    </span>
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {agents.length === 0 && (
          <div className="text-center text-gray-500 py-10 border border-dashed border-gray-200 rounded-lg">
            <p className="text-lg font-medium">No agents found.</p>
            <p className="text-sm">Click "ADD AGENT" to create your first agent.</p>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="mt-16 pt-8 border-t border-gray-200">
        <div className="text-center space-y-2">
          <div className="text-sm text-gray-500">© 2025 All rights reserved.</div>
          <div className="text-xs text-gray-400">Browser Session ID: f4f2fc7d-7161-4d53-ae5f-6bd14515f55b 🔒</div>
        </div>
      </div>
    </div>
  )
}
