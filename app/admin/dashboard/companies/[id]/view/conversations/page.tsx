// "use client"

// import { useState } from "react"
// import { useParams } from "next/navigation"
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
// import { Input } from "@/components/ui/input"
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
// import { Badge } from "@/components/ui/badge"
// import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
// import { Search, MessageSquare, Mail, Phone } from "lucide-react"

// export default function ViewCompanyConversations() {
//   const params = useParams()
//   const companyId = params.id

//   const [searchTerm, setSearchTerm] = useState("")
//   const [statusFilter, setStatusFilter] = useState("all")
//   const [dateFilter, setDateFilter] = useState("all")

//   const conversations = [
//     {
//       id: 1,
//       customer: "John Doe",
//       agent: "Support Agent",
//       channel: "SMS",
//       status: "Resolved",
//       priority: "High",
//       startTime: "2024-07-14 10:30",
//       duration: "5m 23s",
//       messages: 12,
//       satisfaction: 4.5,
//     },
//     {
//       id: 2,
//       customer: "Jane Smith",
//       agent: "Sales Assistant",
//       channel: "Email",
//       status: "Active",
//       priority: "Medium",
//       startTime: "2024-07-14 11:15",
//       duration: "2m 45s",
//       messages: 6,
//       satisfaction: null,
//     },
//     {
//       id: 3,
//       customer: "Mike Johnson",
//       agent: "Technical Support",
//       channel: "Web Chat",
//       status: "Pending",
//       priority: "Low",
//       startTime: "2024-07-14 09:45",
//       duration: "8m 12s",
//       messages: 18,
//       satisfaction: 3.8,
//     },
//   ]

//   const filteredConversations = conversations.filter((conv) => {
//     const matchesSearch =
//       conv.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       conv.agent.toLowerCase().includes(searchTerm.toLowerCase())
//     const matchesStatus = statusFilter === "all" || conv.status.toLowerCase() === statusFilter
//     return matchesSearch && matchesStatus
//   })

//   const getChannelIcon = (channel: string) => {
//     switch (channel) {
//       case "SMS":
//         return <MessageSquare className="h-4 w-4" />
//       case "Email":
//         return <Mail className="h-4 w-4" />
//       case "Web Chat":
//         return <Phone className="h-4 w-4" />
//       default:
//         return <MessageSquare className="h-4 w-4" />
//     }
//   }

//   const getStatusColor = (status: string) => {
//     switch (status) {
//       case "Active":
//         return "default"
//       case "Resolved":
//         return "secondary"
//       case "Pending":
//         return "outline"
//       default:
//         return "outline"
//     }
//   }

//   const getPriorityColor = (priority: string) => {
//     switch (priority) {
//       case "High":
//         return "destructive"
//       case "Medium":
//         return "default"
//       case "Low":
//         return "secondary"
//       default:
//         return "outline"
//     }
//   }

//   return (
//     <div className="space-y-6">
//       <div className="flex items-center justify-between">
//         <div>
//           <h2 className="text-2xl font-bold text-gray-900">Conversations</h2>
//           <p className="text-gray-600 mt-1">View customer conversations</p>
//         </div>
//         <div className="text-sm text-gray-600">
//           Total: <span className="font-medium">{conversations.length}</span>
//         </div>
//       </div>

//       <Tabs defaultValue="all" className="space-y-6">
//         <TabsList>
//           <TabsTrigger value="all">All Conversations</TabsTrigger>
//           <TabsTrigger value="sms">SMS</TabsTrigger>
//           <TabsTrigger value="email">Email</TabsTrigger>
//           <TabsTrigger value="webchat">Web Chat</TabsTrigger>
//         </TabsList>

//         <TabsContent value="all" className="space-y-4">
//           {/* Filters */}
//           <div className="flex flex-col sm:flex-row gap-4">
//             <div className="relative flex-1">
//               <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
//               <Input
//                 placeholder="Search conversations..."
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//                 className="pl-10"
//               />
//             </div>
//             <Select value={statusFilter} onValueChange={setStatusFilter}>
//               <SelectTrigger className="w-48">
//                 <SelectValue placeholder="Filter by Status" />
//               </SelectTrigger>
//               <SelectContent>
//                 <SelectItem value="all">All Status</SelectItem>
//                 <SelectItem value="active">Active</SelectItem>
//                 <SelectItem value="resolved">Resolved</SelectItem>
//                 <SelectItem value="pending">Pending</SelectItem>
//               </SelectContent>
//             </Select>
//             <Select value={dateFilter} onValueChange={setDateFilter}>
//               <SelectTrigger className="w-48">
//                 <SelectValue placeholder="Filter by Date" />
//               </SelectTrigger>
//               <SelectContent>
//                 <SelectItem value="all">All Time</SelectItem>
//                 <SelectItem value="today">Today</SelectItem>
//                 <SelectItem value="week">This Week</SelectItem>
//                 <SelectItem value="month">This Month</SelectItem>
//               </SelectContent>
//             </Select>
//           </div>

//           {/* Conversations Table */}
//           <Card>
//             <CardHeader>
//               <CardTitle>Recent Conversations</CardTitle>
//               <CardDescription>All customer interactions across channels</CardDescription>
//             </CardHeader>
//             <CardContent>
//               <Table>
//                 <TableHeader>
//                   <TableRow>
//                     <TableHead>Customer</TableHead>
//                     <TableHead>Agent</TableHead>
//                     <TableHead>Channel</TableHead>
//                     <TableHead>Status</TableHead>
//                     <TableHead>Priority</TableHead>
//                     <TableHead>Start Time</TableHead>
//                     <TableHead>Duration</TableHead>
//                     <TableHead>Messages</TableHead>
//                     <TableHead>Rating</TableHead>
//                   </TableRow>
//                 </TableHeader>
//                 <TableBody>
//                   {filteredConversations.map((conversation) => (
//                     <TableRow key={conversation.id}>
//                       <TableCell className="font-medium">{conversation.customer}</TableCell>
//                       <TableCell>{conversation.agent}</TableCell>
//                       <TableCell>
//                         <div className="flex items-center space-x-2">
//                           {getChannelIcon(conversation.channel)}
//                           <span>{conversation.channel}</span>
//                         </div>
//                       </TableCell>
//                       <TableCell>
//                         <Badge variant={getStatusColor(conversation.status)}>{conversation.status}</Badge>
//                       </TableCell>
//                       <TableCell>
//                         <Badge variant={getPriorityColor(conversation.priority)}>{conversation.priority}</Badge>
//                       </TableCell>
//                       <TableCell>{conversation.startTime}</TableCell>
//                       <TableCell>{conversation.duration}</TableCell>
//                       <TableCell>{conversation.messages}</TableCell>
//                       <TableCell>
//                         {conversation.satisfaction ? (
//                           <span className="text-yellow-600">★ {conversation.satisfaction}</span>
//                         ) : (
//                           <span className="text-gray-400">-</span>
//                         )}
//                       </TableCell>
//                     </TableRow>
//                   ))}
//                 </TableBody>
//               </Table>
//             </CardContent>
//           </Card>
//         </TabsContent>

//         <TabsContent value="sms" className="space-y-4">
//           <Card>
//             <CardHeader>
//               <CardTitle>SMS Conversations</CardTitle>
//               <CardDescription>Text message interactions</CardDescription>
//             </CardHeader>
//             <CardContent>
//               <Table>
//                 <TableHeader>
//                   <TableRow>
//                     <TableHead>Customer</TableHead>
//                     <TableHead>Phone Number</TableHead>
//                     <TableHead>Agent</TableHead>
//                     <TableHead>Status</TableHead>
//                     <TableHead>Messages</TableHead>
//                     <TableHead>Last Message</TableHead>
//                   </TableRow>
//                 </TableHeader>
//                 <TableBody>
//                   {filteredConversations
//                     .filter((conv) => conv.channel === "SMS")
//                     .map((conversation) => (
//                       <TableRow key={conversation.id}>
//                         <TableCell className="font-medium">{conversation.customer}</TableCell>
//                         <TableCell>+1 (555) 123-4567</TableCell>
//                         <TableCell>{conversation.agent}</TableCell>
//                         <TableCell>
//                           <Badge variant={getStatusColor(conversation.status)}>{conversation.status}</Badge>
//                         </TableCell>
//                         <TableCell>{conversation.messages}</TableCell>
//                         <TableCell>{conversation.startTime}</TableCell>
//                       </TableRow>
//                     ))}
//                 </TableBody>
//               </Table>
//             </CardContent>
//           </Card>
//         </TabsContent>

//         <TabsContent value="email" className="space-y-4">
//           <Card>
//             <CardHeader>
//               <CardTitle>Email Conversations</CardTitle>
//               <CardDescription>Email interactions and threads</CardDescription>
//             </CardHeader>
//             <CardContent>
//               <Table>
//                 <TableHeader>
//                   <TableRow>
//                     <TableHead>Customer</TableHead>
//                     <TableHead>Email</TableHead>
//                     <TableHead>Subject</TableHead>
//                     <TableHead>Agent</TableHead>
//                     <TableHead>Status</TableHead>
//                     <TableHead>Last Reply</TableHead>
//                   </TableRow>
//                 </TableHeader>
//                 <TableBody>
//                   {filteredConversations
//                     .filter((conv) => conv.channel === "Email")
//                     .map((conversation) => (
//                       <TableRow key={conversation.id}>
//                         <TableCell className="font-medium">{conversation.customer}</TableCell>
//                         <TableCell>customer@example.com</TableCell>
//                         <TableCell>Product inquiry</TableCell>
//                         <TableCell>{conversation.agent}</TableCell>
//                         <TableCell>
//                           <Badge variant={getStatusColor(conversation.status)}>{conversation.status}</Badge>
//                         </TableCell>
//                         <TableCell>{conversation.startTime}</TableCell>
//                       </TableRow>
//                     ))}
//                 </TableBody>
//               </Table>
//             </CardContent>
//           </Card>
//         </TabsContent>

//         <TabsContent value="webchat" className="space-y-4">
//           <Card>
//             <CardHeader>
//               <CardTitle>Web Chat Conversations</CardTitle>
//               <CardDescription>Live chat sessions from website</CardDescription>
//             </CardHeader>
//             <CardContent>
//               <Table>
//                 <TableHeader>
//                   <TableRow>
//                     <TableHead>Customer</TableHead>
//                     <TableHead>Session ID</TableHead>
//                     <TableHead>Agent</TableHead>
//                     <TableHead>Page</TableHead>
//                     <TableHead>Status</TableHead>
//                     <TableHead>Duration</TableHead>
//                   </TableRow>
//                 </TableHeader>
//                 <TableBody>
//                   {filteredConversations
//                     .filter((conv) => conv.channel === "Web Chat")
//                     .map((conversation) => (
//                       <TableRow key={conversation.id}>
//                         <TableCell className="font-medium">{conversation.customer}</TableCell>
//                         <TableCell>WC-{conversation.id}234</TableCell>
//                         <TableCell>{conversation.agent}</TableCell>
//                         <TableCell>/support</TableCell>
//                         <TableCell>
//                           <Badge variant={getStatusColor(conversation.status)}>{conversation.status}</Badge>
//                         </TableCell>
//                         <TableCell>{conversation.duration}</TableCell>
//                       </TableRow>
//                     ))}
//                 </TableBody>
//               </Table>
//             </CardContent>
//           </Card>
//         </TabsContent>
//       </Tabs>
//     </div>
//   )
// }


"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { ChevronLeft, ChevronRight, Search, ChevronDown } from "lucide-react"
import Cookies from "js-cookie"

interface Message {
  id: number
  user: number
  timestamp: string
  sessionID: string
  type: string
  user_question: string
  assistant_response: string
  summary: string
  phonenumber?: string
  caller_number?: string
}

export default function ViewCompanyConversations() {
  const params = useParams()
  const companyId = params.id

  const [messages, setMessages] = useState<Message[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [selectedSession, setSelectedSession] = useState<string | null>(null)
  const [viewType, setViewType] = useState<"transcript" | "summary" | null>(null)
  const [search, setSearch] = useState("")
  const pageSize = 6

  useEffect(() => {
    async function fetchMessages() {
      try {
        setLoading(true)
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/conversations/messages/`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${Cookies.get("adminToken") || ""}`,
          },
        })
        if (!res.ok) throw new Error("Failed to fetch conversations")
        const data: Message[] = await res.json()
        setMessages(data)
      } catch (err: any) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }
    fetchMessages()
  }, [companyId])

  const grouped = messages.reduce<Record<string, Message[]>>((acc, msg) => {
    if (!acc[msg.sessionID]) acc[msg.sessionID] = []
    acc[msg.sessionID].push(msg)
    return acc
  }, {})

  const sortedSessions = Object.entries(grouped)
    .sort((a, b) => {
      const tA = new Date(a[1][0].timestamp).getTime()
      const tB = new Date(b[1][0].timestamp).getTime()
      return tB - tA
    })
    .filter(([sessionID, msgs]) => {
      const phone = msgs[0]?.phonenumber?.toLowerCase() || ""
      const caller = msgs[0]?.caller_number?.toLowerCase() || ""
      return (
        phone.includes(search.toLowerCase()) || caller.includes(search.toLowerCase())
      )
    })

  const totalPages = Math.ceil(sortedSessions.length / pageSize)
  const paginated = sortedSessions.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  )

  const selectedMessages = selectedSession ? grouped[selectedSession] : null
  const latestSummary = selectedMessages?.find((m) => m.type === "summary") || null

  const formatDuration = (ms: number) => {
    const totalSec = Math.floor(ms / 1000)
    const mins = Math.floor(totalSec / 60)
    const secs = totalSec % 60
    return `${mins}m ${secs}s`
  }

  if (loading)
    return (
      <div className="flex justify-center items-center h-64 text-slate-600 text-lg">
        Fetching conversations…
      </div>
    )
  if (error)
    return (
      <div className="flex justify-center items-center h-64 text-red-600 text-lg">
        Error: {error}
      </div>
    )

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-gray-900">
            Company Conversations
          </h1>
          <p className="text-gray-600">Fetched live from backend API</p>
        </div>
        <div className="text-gray-600 text-sm">
          Total Sessions:{" "}
          <span className="font-medium">{Object.keys(grouped).length}</span>
        </div>
      </div>

      {/* Search */}
      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
        <Input
          placeholder="Search by phone or caller number..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-10"
        />
      </div>

      <div className="flex space-x-6">
        {/* Left Table */}
        <div className={`${selectedSession ? "w-1/2" : "w-full"} transition-all`}>
          <Card className="shadow-sm border-slate-200">
            <CardHeader className="border-b">
              <CardTitle className="text-lg font-semibold text-slate-800">
                Recent Conversations
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0 overflow-x-auto">
              <table className="min-w-full text-sm text-left">
                <thead className="bg-slate-100 border-b">
                  <tr>
                    <th className="px-4 py-2 w-40 font-medium text-slate-700">Phone</th>
                    <th className="px-4 py-2 w-40 font-medium text-slate-700">
                      Caller Number
                    </th>
                    <th className="px-4 py-2 w-24 font-medium text-slate-700">Messages</th>
                    <th className="px-4 py-2 w-48 font-medium text-slate-700">Started At</th>
                    <th className="px-4 py-2 w-32 font-medium text-slate-700">Duration</th>
                    <th className="px-4 py-2 w-32 font-medium text-slate-700">Transcript</th>
                    <th className="px-4 py-2 w-32 font-medium text-slate-700">Summary</th>
                  </tr>
                </thead>
                <tbody>
                  {paginated.map(([sessionID, msgs]) => {
                    const sortedMsgs = [...msgs].sort(
                      (a, b) =>
                        new Date(a.timestamp).getTime() -
                        new Date(b.timestamp).getTime()
                    )
                    const startedAt = new Date(sortedMsgs[0].timestamp).toLocaleString()
                    const startedAtMs = new Date(sortedMsgs[0].timestamp).getTime()
                    const summaryMsg = sortedMsgs.find((m) => m.type === "summary")
                    const endedAtMs = summaryMsg
                      ? new Date(summaryMsg.timestamp).getTime() + 3000
                      : new Date(sortedMsgs[sortedMsgs.length - 1].timestamp).getTime()
                    const callDuration = formatDuration(endedAtMs - startedAtMs)
                    const lastMsg = sortedMsgs[sortedMsgs.length - 1]
                    const phoneNumber = lastMsg?.phonenumber || "Unknown"
                    const callerNumber = lastMsg?.caller_number || "—"
                    const previewSummary =
                      summaryMsg?.summary
                        ?.split(" ")
                        .slice(0, 4)
                        .join(" ") + "..." || "No summary"

                    return (
                      <tr
                        key={sessionID}
                        className="border-b hover:bg-slate-50 transition cursor-pointer"
                      >
                        <td className="px-4 py-2 font-medium text-slate-800">
                          {phoneNumber}
                        </td>
                        <td className="px-4 py-2 text-slate-700">{callerNumber}</td>
                        <td className="px-4 py-2">{msgs.length}</td>
                        <td className="px-4 py-2 text-slate-600">{startedAt}</td>
                        <td className="px-4 py-2 text-slate-600">{callDuration}</td>
                        <td
                          className="px-4 py-2 text-blue-600"
                          onClick={() => {
                            setSelectedSession(sessionID)
                            setViewType("transcript")
                          }}
                        >
                          <ChevronDown className="inline w-4 h-4 mr-1" />
                          View
                        </td>
                        <td
                          className="px-4 py-2 text-blue-600"
                          onClick={() => {
                            setSelectedSession(sessionID)
                            setViewType("summary")
                          }}
                        >
                          <ChevronDown className="inline w-4 h-4 mr-1" />
                          {previewSummary}
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </CardContent>
          </Card>

          {/* Pagination */}
          <div className="flex justify-between items-center mt-4">
            <Button
              variant="outline"
              size="sm"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            >
              <ChevronLeft className="w-4 h-4 mr-1" /> Prev
            </Button>
            <span className="text-sm text-slate-600">
              Page {currentPage} of {totalPages}
            </span>
            <Button
              variant="outline"
              size="sm"
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            >
              Next <ChevronRight className="w-4 h-4 ml-1" />
            </Button>
          </div>
        </div>

        {/* Right panel */}
        {selectedSession && (
          <div className="w-1/2 border rounded-lg p-4 bg-slate-50 relative mt-1 shadow-inner">
            <button
              onClick={() => {
                setSelectedSession(null)
                setViewType(null)
              }}
              className="absolute top-2 right-2 text-slate-500 hover:text-slate-700"
            >
              ✕
            </button>

            {viewType === "transcript" && (
              <div className="space-y-3">
                <h2 className="text-lg font-semibold">Transcript</h2>
                {selectedMessages
                  ?.sort(
                    (a, b) =>
                      new Date(a.timestamp).getTime() -
                      new Date(b.timestamp).getTime()
                  )
                  .map((m) =>
                    m.type === "summary" ? null : (
                      <div
                        key={m.id}
                        className="border p-3 rounded bg-white shadow-sm"
                      >
                        <p className="font-medium text-slate-700">
                          👤 {m.user_question}
                        </p>
                        <p className="text-slate-800">🤖 {m.assistant_response}</p>
                        <p className="text-xs text-slate-500 mt-1">
                          {new Date(m.timestamp).toLocaleString()}
                        </p>
                      </div>
                    )
                  )}
              </div>
            )}

            {viewType === "summary" && (
              <div>
                <h2 className="text-lg font-semibold mb-2">Summary</h2>
                {latestSummary ? (
                  <div className="border p-3 rounded bg-white shadow-sm">
                    <p className="text-slate-800">{latestSummary.summary}</p>
                    <p className="text-xs text-slate-500 mt-2">
                      {new Date(latestSummary.timestamp).toLocaleString()}
                    </p>
                  </div>
                ) : (
                  <p className="text-slate-500">No summary available</p>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
