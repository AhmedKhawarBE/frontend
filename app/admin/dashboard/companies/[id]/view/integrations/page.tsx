"use client"

import { useParams } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { ExternalLink, CheckCircle, XCircle, Clock } from "lucide-react"

export default function ViewCompanyIntegrations() {
  const params = useParams()
  const companyId = params.id

  const integrations = [
    {
      id: 1,
      name: "Slack",
      type: "Communication",
      status: "Connected",
      description: "Team communication and notifications",
      lastSync: "2024-07-14 10:30",
      enabled: true,
    },
    {
      id: 2,
      name: "Salesforce",
      type: "CRM",
      status: "Not Connected",
      description: "Customer relationship management",
      lastSync: null,
      enabled: false,
    },
    {
      id: 3,
      name: "Zendesk",
      type: "Support",
      status: "Connected",
      description: "Customer support ticketing system",
      lastSync: "2024-07-14 09:15",
      enabled: true,
    },
    {
      id: 4,
      name: "Google Analytics",
      type: "Analytics",
      status: "Connected",
      description: "Website analytics and tracking",
      lastSync: "2024-07-14 11:00",
      enabled: true,
    },
    {
      id: 5,
      name: "Stripe",
      type: "Payment",
      status: "Not Connected",
      description: "Payment processing and billing",
      lastSync: null,
      enabled: false,
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Connected":
        return "default"
      case "Not Connected":
        return "secondary"
      case "Error":
        return "destructive"
      default:
        return "outline"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Connected":
        return <CheckCircle className="h-4 w-4 text-green-600" />
      case "Not Connected":
        return <XCircle className="h-4 w-4 text-gray-400" />
      case "Error":
        return <XCircle className="h-4 w-4 text-red-600" />
      default:
        return <Clock className="h-4 w-4 text-yellow-600" />
    }
  }

  const connectedCount = integrations.filter((i) => i.status === "Connected").length
  const availableCount = integrations.filter((i) => i.status === "Not Connected").length
  const activeCount = integrations.filter((i) => i.enabled).length
  const errorCount = integrations.filter((i) => i.status === "Error").length

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Integrations</h2>
          <p className="text-gray-600 mt-1">View external service integrations</p>
        </div>
        <div className="text-sm text-gray-600">
          Connected: <span className="font-medium">{connectedCount}</span> / {integrations.length}
        </div>
      </div>

      {/* Integration Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-blue-600">{connectedCount}</div>
            <div className="text-sm text-gray-600">Connected</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-gray-400">{availableCount}</div>
            <div className="text-sm text-gray-600">Available</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-green-600">{activeCount}</div>
            <div className="text-sm text-gray-600">Active</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-red-600">{errorCount}</div>
            <div className="text-sm text-gray-600">Errors</div>
          </CardContent>
        </Card>
      </div>

      {/* Integrations Table */}
      <Card>
        <CardHeader>
          <CardTitle>Integration Status</CardTitle>
          <CardDescription>Current status of external service integrations</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Service</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Last Sync</TableHead>
                <TableHead>Enabled</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {integrations.map((integration) => (
                <TableRow key={integration.id}>
                  <TableCell>
                    <div className="flex items-center space-x-3">
                      {getStatusIcon(integration.status)}
                      <div>
                        <div className="font-medium">{integration.name}</div>
                        <div className="text-sm text-gray-500">{integration.description}</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">{integration.type}</Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant={getStatusColor(integration.status)}>{integration.status}</Badge>
                  </TableCell>
                  <TableCell>
                    {integration.lastSync ? (
                      <span className="text-sm">{integration.lastSync}</span>
                    ) : (
                      <span className="text-sm text-gray-400">Never</span>
                    )}
                  </TableCell>
                  <TableCell>
                    <Badge variant={integration.enabled ? "default" : "secondary"}>
                      {integration.enabled ? "Yes" : "No"}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Integration Details */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>API Configuration</CardTitle>
            <CardDescription>Current API settings</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <h4 className="font-medium text-gray-700">API Key</h4>
              <p className="text-sm text-gray-600 font-mono">sk-...****</p>
            </div>
            <div className="space-y-2">
              <h4 className="font-medium text-gray-700">Webhook URL</h4>
              <div className="flex items-center space-x-2">
                <p className="text-sm text-gray-600 font-mono">https://smartconvo.com/webhook/company-1</p>
                <ExternalLink className="h-4 w-4 text-gray-400" />
              </div>
            </div>
            <div className="space-y-2">
              <h4 className="font-medium text-gray-700">Rate Limit</h4>
              <p className="text-sm text-gray-600">100 requests/minute</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Sync Settings</CardTitle>
            <CardDescription>Data synchronization preferences</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium text-gray-700">Auto Sync</h4>
                <p className="text-sm text-gray-600">Automatically sync data every hour</p>
              </div>
              <Badge variant="default">Enabled</Badge>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium text-gray-700">Real-time Updates</h4>
                <p className="text-sm text-gray-600">Receive real-time notifications</p>
              </div>
              <Badge variant="default">Enabled</Badge>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium text-gray-700">Data Backup</h4>
                <p className="text-sm text-gray-600">Backup integration data daily</p>
              </div>
              <Badge variant="secondary">Disabled</Badge>
            </div>
            <div className="space-y-2">
              <h4 className="font-medium text-gray-700">Sync Frequency</h4>
              <p className="text-sm text-gray-600">Every hour</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
