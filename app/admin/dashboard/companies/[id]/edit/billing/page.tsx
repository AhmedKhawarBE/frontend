"use client"

import { useState } from "react"
import { useParams } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Switch } from "@/components/ui/switch"
import { CreditCard, Download, AlertCircle, CheckCircle } from "lucide-react"

export default function EditCompanyBilling() {
  const params = useParams()
  const companyId = params.id

  const [billingInfo, setBillingInfo] = useState({
    plan: "Pro",
    billingCycle: "Monthly",
    nextBilling: "2024-08-14",
    amount: 99.0,
    currency: "USD",
    paymentMethod: "Credit Card",
    cardLast4: "4242",
    autoRenewal: true,
  })

  const [invoices] = useState([
    {
      id: "INV-001",
      date: "2024-07-14",
      amount: 99.0,
      status: "Paid",
      description: "Pro Plan - Monthly",
      downloadUrl: "#",
    },
    {
      id: "INV-002",
      date: "2024-06-14",
      amount: 99.0,
      status: "Paid",
      description: "Pro Plan - Monthly",
      downloadUrl: "#",
    },
    {
      id: "INV-003",
      date: "2024-05-14",
      amount: 99.0,
      status: "Paid",
      description: "Pro Plan - Monthly",
      downloadUrl: "#",
    },
    {
      id: "INV-004",
      date: "2024-04-14",
      amount: 79.0,
      status: "Paid",
      description: "Basic Plan - Monthly",
      downloadUrl: "#",
    },
  ])

  const [usage] = useState({
    apiCalls: 1250,
    apiLimit: 5000,
    storage: 2.3,
    storageLimit: 10,
    users: 45,
    userLimit: 100,
  })

  const handleSaveBilling = () => {
    console.log("Saving billing info:", billingInfo)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Paid":
        return "default"
      case "Pending":
        return "outline"
      case "Overdue":
        return "destructive"
      default:
        return "secondary"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Paid":
        return <CheckCircle className="h-4 w-4 text-green-600" />
      case "Pending":
        return <AlertCircle className="h-4 w-4 text-yellow-600" />
      case "Overdue":
        return <AlertCircle className="h-4 w-4 text-red-600" />
      default:
        return null
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Billing Information</h2>
          <p className="text-gray-600 mt-1">Manage subscription and payment details</p>
        </div>
        <Button onClick={handleSaveBilling}>Save Changes</Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Current Plan */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Current Plan & Billing</CardTitle>
            <CardDescription>Subscription and payment information</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Current Plan</Label>
                <Select
                  value={billingInfo.plan}
                  onValueChange={(value) => setBillingInfo((prev) => ({ ...prev, plan: value }))}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Basic">Basic - $29/month</SelectItem>
                    <SelectItem value="Pro">Pro - $99/month</SelectItem>
                    <SelectItem value="Enterprise">Enterprise - $299/month</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Billing Cycle</Label>
                <Select
                  value={billingInfo.billingCycle}
                  onValueChange={(value) => setBillingInfo((prev) => ({ ...prev, billingCycle: value }))}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Monthly">Monthly</SelectItem>
                    <SelectItem value="Yearly">Yearly (20% off)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Next Billing Date</Label>
                <Input
                  type="date"
                  value={billingInfo.nextBilling}
                  onChange={(e) => setBillingInfo((prev) => ({ ...prev, nextBilling: e.target.value }))}
                />
              </div>

              <div className="space-y-2">
                <Label>Amount</Label>
                <div className="flex">
                  <span className="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border border-r-0 border-gray-300 rounded-l-md">
                    $
                  </span>
                  <Input
                    type="number"
                    value={billingInfo.amount}
                    onChange={(e) => setBillingInfo((prev) => ({ ...prev, amount: Number.parseFloat(e.target.value) }))}
                    className="rounded-l-none"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Payment Method</Label>
                <div className="flex items-center space-x-2">
                  <CreditCard className="h-4 w-4 text-gray-400" />
                  <span>**** **** **** {billingInfo.cardLast4}</span>
                  <Button variant="outline" size="sm">
                    Update
                  </Button>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label>Auto Renewal</Label>
                <p className="text-sm text-gray-600">Automatically renew subscription</p>
              </div>
              <Switch
                checked={billingInfo.autoRenewal}
                onCheckedChange={(checked) => setBillingInfo((prev) => ({ ...prev, autoRenewal: checked }))}
              />
            </div>
          </CardContent>
        </Card>

        {/* Usage Overview */}
        <Card>
          <CardHeader>
            <CardTitle>Usage Overview</CardTitle>
            <CardDescription>Current month usage</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>API Calls</span>
                <span>
                  {usage.apiCalls.toLocaleString()} / {usage.apiLimit.toLocaleString()}
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-blue-600 h-2 rounded-full"
                  style={{ width: `${(usage.apiCalls / usage.apiLimit) * 100}%` }}
                ></div>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Storage</span>
                <span>
                  {usage.storage} GB / {usage.storageLimit} GB
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-green-600 h-2 rounded-full"
                  style={{ width: `${(usage.storage / usage.storageLimit) * 100}%` }}
                ></div>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Users</span>
                <span>
                  {usage.users} / {usage.userLimit}
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-purple-600 h-2 rounded-full"
                  style={{ width: `${(usage.users / usage.userLimit) * 100}%` }}
                ></div>
              </div>
            </div>

            <div className="pt-4 border-t">
              <Button variant="outline" className="w-full bg-transparent">
                View Detailed Usage
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Invoice History */}
      <Card>
        <CardHeader>
          <CardTitle>Invoice History</CardTitle>
          <CardDescription>Past billing statements and invoices</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Invoice ID</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {invoices.map((invoice) => (
                <TableRow key={invoice.id}>
                  <TableCell className="font-medium">{invoice.id}</TableCell>
                  <TableCell>{new Date(invoice.date).toLocaleDateString()}</TableCell>
                  <TableCell>{invoice.description}</TableCell>
                  <TableCell>${invoice.amount.toFixed(2)}</TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      {getStatusIcon(invoice.status)}
                      <Badge variant={getStatusColor(invoice.status)}>{invoice.status}</Badge>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Button variant="ghost" size="sm">
                      <Download className="h-4 w-4 mr-2" />
                      Download
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
