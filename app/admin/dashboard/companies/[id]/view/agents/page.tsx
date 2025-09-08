"use client"

import { useParams } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Settings, MessageSquare, BarChart3 } from "lucide-react"

export default function ViewCompanyAgents() {
  const params = useParams()
  const companyId = params.id

  const agents = [
    {
      id: 1,
      name: "Customer Support Agent",
      type: "Support",
      status: "Active",
      description: "Handles customer inquiries and support tickets",
      language: "English",
      voiceEnabled: true,
      lastUpdated: "2024-07-10",
      totalConversations: 1250,
      avgRating: 4.5,
      responseTime: "2.3s",
    },
    {
      id: 2,
      name: "Sales Assistant",
      type: "Sales",
      status: "Active",
      description: "Assists with product inquiries and sales processes",
      language: "English",
      voiceEnabled: false,
      lastUpdated: "2024-07-08",
      totalConversations: 890,
      avgRating: 4.2,
      responseTime: "1.8s",
    },
    {
      id: 3,
      name: "Technical Support",
      type: "Technical",
      status: "Inactive",
      description: "Provides technical assistance and troubleshooting",
      language: "English",
      voiceEnabled: true,
      lastUpdated: "2024-07-05",
      totalConversations: 456,
      avgRating: 4.7,
      responseTime: "3.1s",
    },
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Agent Information</h2>
          <p className="text-gray-600 mt-1">View AI agents for this company</p>
        </div>
        <div className="text-sm text-gray-600">
          Total Agents: <span className="font-medium">{agents.length}</span>
        </div>
      </div>

      {/* Agent Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-green-600">
              {agents.filter((a) => a.status === "Active").length}
            </div>
            <div className="text-sm text-gray-600">Active Agents</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-blue-600">
              {agents.reduce((sum, agent) => sum + agent.totalConversations, 0).toLocaleString()}
            </div>
            <div className="text-sm text-gray-600">Total Conversations</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-yellow-600">
              {(agents.reduce((sum, agent) => sum + agent.avgRating, 0) / agents.length).toFixed(1)}
            </div>
            <div className="text-sm text-gray-600">Average Rating</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-purple-600">
              {(agents.reduce((sum, agent) => sum + Number.parseFloat(agent.responseTime), 0) / agents.length).toFixed(
                1,
              )}
              s
            </div>
            <div className="text-sm text-gray-600">Avg Response Time</div>
          </CardContent>
        </Card>
      </div>

      {/* Agents List */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {agents.map((agent) => (
          <Card key={agent.id}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-lg">{agent.name}</CardTitle>
                  <CardDescription>{agent.type} Agent</CardDescription>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge variant={agent.status === "Active" ? "default" : "secondary"}>{agent.status}</Badge>
                  <Button variant="ghost" size="sm">
                    <Settings className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-gray-600">{agent.description}</p>

              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="font-medium text-gray-700">Language:</span>
                  <p className="text-gray-600">{agent.language}</p>
                </div>
                <div>
                  <span className="font-medium text-gray-700">Voice:</span>
                  <p className="text-gray-600">{agent.voiceEnabled ? "Enabled" : "Disabled"}</p>
                </div>
                <div>
                  <span className="font-medium text-gray-700">Last Updated:</span>
                  <p className="text-gray-600">{new Date(agent.lastUpdated).toLocaleDateString()}</p>
                </div>
                <div>
                  <span className="font-medium text-gray-700">Response Time:</span>
                  <p className="text-gray-600">{agent.responseTime}</p>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4 pt-4 border-t">
                <div className="text-center">
                  <div className="flex items-center justify-center mb-1">
                    <MessageSquare className="h-4 w-4 text-blue-600" />
                  </div>
                  <div className="text-lg font-semibold">{agent.totalConversations.toLocaleString()}</div>
                  <div className="text-xs text-gray-600">Conversations</div>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center mb-1">
                    <span className="text-yellow-500">★</span>
                  </div>
                  <div className="text-lg font-semibold">{agent.avgRating}</div>
                  <div className="text-xs text-gray-600">Rating</div>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center mb-1">
                    <BarChart3 className="h-4 w-4 text-green-600" />
                  </div>
                  <div className="text-lg font-semibold">{agent.responseTime}</div>
                  <div className="text-xs text-gray-600">Response</div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {agents.length === 0 && (
        <Card>
          <CardContent className="text-center py-12">
            <p className="text-gray-500">No agents found for this company.</p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
