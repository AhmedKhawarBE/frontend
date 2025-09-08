"use client"

import { useState } from "react"
import { useParams } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search, Download, Archive, MessageSquare, Mail, Phone } from "lucide-react"

export default function EditCompanyConversations() {
  const params = useParams()
  const companyId = params.id

  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [dateFilter, setDateFilter] = useState("all")

  const conversations = [
    {
      id: 1,
      customer: "John Doe",
      agent: "Support Agent",
      channel: "SMS",
      status: "Resolved",
      priority: "High",
      startTime: "2024-07-14 10:30",
      duration: "5m 23s",
      messages: 12,
      satisfaction: 4.5,
    },
    {
      id: 2,
      customer: "Jane Smith",
      agent: "Sales Assistant",
      channel: "Email",
      status: "Active",
      priority: "Medium",
      startTime: "2024-07-14 11:15",
      duration: "2m 45s",
      messages: 6,
      satisfaction: null,
    },
    {
      id: 3,
      customer: "Mike Johnson",
      agent: "Technical Support",
      channel: "Web Chat",
      status: "Pending",
      priority: "Low",
      startTime: "2024-07-14 09:45",
      duration: "8m 12s",
      messages: 18,
      satisfaction: 3.8,
    },
  ]

  const filteredConversations = conversations.filter((conv) => {
    const matchesSearch =
      conv.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      conv.agent.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || conv.status.toLowerCase() === statusFilter
    return matchesSearch && matchesStatus
  })

  const getChannelIcon = (channel: string) => {
    switch (channel) {
      case "SMS":
        return <MessageSquare className="h-4 w-4" />
      case "Email":
        return <Mail className="h-4 w-4" />
      case "Web Chat":
        return <Phone className="h-4 w-4" />
      default:
        return <MessageSquare className="h-4 w-4" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active":
        return "default"
      case "Resolved":
        return "secondary"
      case "Pending":
        return "outline"
      default:
        return "outline"
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "High":
        return "destructive"
      case "Medium":
        return "default"
      case "Low":
        return "secondary"
      default:
        return "outline"
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Conversations</h2>
          <p className="text-gray-600 mt-1">Monitor and manage customer conversations</p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
          <Button variant="outline" size="sm">
            <Archive className="h-4 w-4 mr-2" />
            Archive
          </Button>
        </div>
      </div>

      <Tabs defaultValue="all" className="space-y-6">
        <TabsList>
          <TabsTrigger value="all">All Conversations</TabsTrigger>
          <TabsTrigger value="sms">SMS</TabsTrigger>
          <TabsTrigger value="email">Email</TabsTrigger>
          <TabsTrigger value="webchat">Web Chat</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          {/* Filters */}
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search conversations..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Filter by Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="resolved">Resolved</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
              </SelectContent>
            </Select>
            <Select value={dateFilter} onValueChange={setDateFilter}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Filter by Date" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Time</SelectItem>
                <SelectItem value="today">Today</SelectItem>
                <SelectItem value="week">This Week</SelectItem>
                <SelectItem value="month">This Month</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Conversations Table */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Conversations</CardTitle>
              <CardDescription>All customer interactions across channels</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Customer</TableHead>
                    <TableHead>Agent</TableHead>
                    <TableHead>Channel</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Priority</TableHead>
                    <TableHead>Start Time</TableHead>
                    <TableHead>Duration</TableHead>
                    <TableHead>Messages</TableHead>
                    <TableHead>Rating</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredConversations.map((conversation) => (
                    <TableRow key={conversation.id}>
                      <TableCell className="font-medium">{conversation.customer}</TableCell>
                      <TableCell>{conversation.agent}</TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          {getChannelIcon(conversation.channel)}
                          <span>{conversation.channel}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant={getStatusColor(conversation.status)}>{conversation.status}</Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant={getPriorityColor(conversation.priority)}>{conversation.priority}</Badge>
                      </TableCell>
                      <TableCell>{conversation.startTime}</TableCell>
                      <TableCell>{conversation.duration}</TableCell>
                      <TableCell>{conversation.messages}</TableCell>
                      <TableCell>
                        {conversation.satisfaction ? (
                          <span className="text-yellow-600">★ {conversation.satisfaction}</span>
                        ) : (
                          <span className="text-gray-400">-</span>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="sms" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>SMS Conversations</CardTitle>
              <CardDescription>Text message interactions</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Customer</TableHead>
                    <TableHead>Phone Number</TableHead>
                    <TableHead>Agent</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Messages</TableHead>
                    <TableHead>Last Message</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredConversations
                    .filter((conv) => conv.channel === "SMS")
                    .map((conversation) => (
                      <TableRow key={conversation.id}>
                        <TableCell className="font-medium">{conversation.customer}</TableCell>
                        <TableCell>+1 (555) 123-4567</TableCell>
                        <TableCell>{conversation.agent}</TableCell>
                        <TableCell>
                          <Badge variant={getStatusColor(conversation.status)}>{conversation.status}</Badge>
                        </TableCell>
                        <TableCell>{conversation.messages}</TableCell>
                        <TableCell>{conversation.startTime}</TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="email" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Email Conversations</CardTitle>
              <CardDescription>Email interactions and threads</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Customer</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Subject</TableHead>
                    <TableHead>Agent</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Last Reply</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredConversations
                    .filter((conv) => conv.channel === "Email")
                    .map((conversation) => (
                      <TableRow key={conversation.id}>
                        <TableCell className="font-medium">{conversation.customer}</TableCell>
                        <TableCell>customer@example.com</TableCell>
                        <TableCell>Product inquiry</TableCell>
                        <TableCell>{conversation.agent}</TableCell>
                        <TableCell>
                          <Badge variant={getStatusColor(conversation.status)}>{conversation.status}</Badge>
                        </TableCell>
                        <TableCell>{conversation.startTime}</TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="webchat" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Web Chat Conversations</CardTitle>
              <CardDescription>Live chat sessions from website</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Customer</TableHead>
                    <TableHead>Session ID</TableHead>
                    <TableHead>Agent</TableHead>
                    <TableHead>Page</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Duration</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredConversations
                    .filter((conv) => conv.channel === "Web Chat")
                    .map((conversation) => (
                      <TableRow key={conversation.id}>
                        <TableCell className="font-medium">{conversation.customer}</TableCell>
                        <TableCell>WC-{conversation.id}234</TableCell>
                        <TableCell>{conversation.agent}</TableCell>
                        <TableCell>/support</TableCell>
                        <TableCell>
                          <Badge variant={getStatusColor(conversation.status)}>{conversation.status}</Badge>
                        </TableCell>
                        <TableCell>{conversation.duration}</TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
