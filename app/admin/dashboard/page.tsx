"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Building2, Users, Activity, DollarSign, TrendingUp } from "lucide-react"

export default function AdminDashboard() {
  const stats = [
    {
      title: "Total Companies",
      value: "24",
      change: "+12%",
      icon: Building2,
      color: "text-blue-600",
    },
    {
      title: "Active Users",
      value: "1,234",
      change: "+8%",
      icon: Users,
      color: "text-green-600",
    },
    {
      title: "Monthly Revenue",
      value: "$45,678",
      change: "+23%",
      icon: DollarSign,
      color: "text-yellow-600",
    },
    {
      title: "System Uptime",
      value: "99.9%",
      change: "+0.1%",
      icon: Activity,
      color: "text-purple-600",
    },
  ]

  const recentActivity = [
    { company: "Acme Corp", action: "Upgraded to Pro Plan", time: "2 hours ago", status: "success" },
    { company: "TechStart Inc", action: "New user registered", time: "4 hours ago", status: "info" },
    { company: "Global Solutions", action: "Payment failed", time: "6 hours ago", status: "error" },
    { company: "Innovation Labs", action: "Support ticket created", time: "8 hours ago", status: "warning" },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Dashboard Overview</h1>
        <p className="text-gray-600 mt-2">Welcome back! Here's what's happening with your platform.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">{stat.title}</CardTitle>
              <stat.icon className={`h-4 w-4 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <div className="flex items-center text-xs text-green-600">
                <TrendingUp className="h-3 w-3 mr-1" />
                {stat.change} from last month
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Latest actions across all companies</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivity.map((activity, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex-1">
                    <p className="text-sm font-medium">{activity.company}</p>
                    <p className="text-xs text-gray-500">{activity.action}</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge
                      variant={
                        activity.status === "success"
                          ? "default"
                          : activity.status === "error"
                            ? "destructive"
                            : activity.status === "warning"
                              ? "secondary"
                              : "outline"
                      }
                    >
                      {activity.status}
                    </Badge>
                    <span className="text-xs text-gray-500">{activity.time}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>System Status</CardTitle>
            <CardDescription>Current system health and alerts</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm">API Response Time</span>
                <Badge variant="default">Normal</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Database Performance</span>
                <Badge variant="default">Optimal</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Server Load</span>
                <Badge variant="secondary">Medium</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Backup Status</span>
                <Badge variant="default">Complete</Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
