"use client"

import { useParams } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { CreditCard, Download, AlertCircle, CheckCircle, Calendar, Users, Globe } from "lucide-react"

export default function ViewCompanyBilling() {
  const params = useParams()
  const companyId = params.id

  const billingInfo = {
    plan: "Pro",
    billingCycle: "Monthly",
    nextBilling: "2024-08-14",
    amount: 99.0,
    currency: "USD",
    paymentMethod: "Credit Card",
    cardLast4: "4242",
    autoRenewal: true,
    status: "Active",
  }

  const invoices = [
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
  ]

  const usage = {
    apiCalls: 1250,
    apiLimit: 5000,
    storage: 2.3,
    storageLimit: 10,
    users: 45,
    userLimit: 100,
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
          <p className="text-gray-600 mt-1">View subscription and payment details</p>
        </div>
        <Badge variant={billingInfo.status === "Active" ? "default" : "secondary"}>{billingInfo.status}</Badge>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Current Plan */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Current Plan & Billing</CardTitle>
            <CardDescription>Subscription and payment information</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <h4 className="font-medium text-gray-700">Current Plan</h4>
                <div className="flex items-center space-x-2">
                  <Badge variant="outline">{billingInfo.plan}</Badge>
                  <span className="text-sm text-gray-600">- ${billingInfo.amount}/month</span>
                </div>
              </div>

              <div className="space-y-2">
                <h4 className="font-medium text-gray-700">Billing Cycle</h4>
                <p className="text-gray-600">{billingInfo.billingCycle}</p>
              </div>

              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Calendar className="h-4 w-4 text-gray-400" />
                  <h4 className="font-medium text-gray-700">Next Billing Date</h4>
                </div>
                <p className="text-gray-600">{new Date(billingInfo.nextBilling).toLocaleDateString()}</p>
              </div>

              <div className="space-y-2">
                <h4 className="font-medium text-gray-700">Amount</h4>
                <p className="text-lg font-semibold">
                  ${billingInfo.amount.toFixed(2)} {billingInfo.currency}
                </p>
              </div>

              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <CreditCard className="h-4 w-4 text-gray-400" />
                  <h4 className="font-medium text-gray-700">Payment Method</h4>
                </div>
                <p className="text-gray-600">**** **** **** {billingInfo.cardLast4}</p>
              </div>

              <div className="space-y-2">
                <h4 className="font-medium text-gray-700">Auto Renewal</h4>
                <Badge variant={billingInfo.autoRenewal ? "default" : "secondary"}>
                  {billingInfo.autoRenewal ? "Enabled" : "Disabled"}
                </Badge>
              </div>
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

            <div className="pt-4 border-t space-y-2">
              <div className="flex items-center space-x-2">
                <Users className="h-4 w-4 text-gray-400" />
                <span className="text-sm text-gray-600">Total Users: {usage.users}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Globe className="h-4 w-4 text-gray-400" />
                <span className="text-sm text-gray-600">API Calls: {usage.apiCalls.toLocaleString()}</span>
              </div>
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
