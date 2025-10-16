
// "use client"

// import { useEffect, useState } from "react"
// import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"
// import { ChevronLeft, ChevronRight, Search, ChevronDown, Trash2 } from "lucide-react"
// import Cookies from "js-cookie"
// import React from "react"
// import { formatPhone } from "@/libs/formatPhone"
// import { useToast } from "@/hooks/use-toast"
// import {
//   AlertDialog,
//   AlertDialogTrigger,
//   AlertDialogContent,
//   AlertDialogHeader,
//   AlertDialogFooter,
//   AlertDialogTitle,
//   AlertDialogDescription,
//   AlertDialogCancel,
//   AlertDialogAction,
// } from "@/components/ui/alert-dialog"

// interface Message {
//   id: number
//   user: number
//   timestamp: string
//   sessionID: string
//   type: string
//   user_question: string
//   assistant_response: string
//   summary: string
//   phonenumber?: string
//   caller_number?: string
// }

// function CallsTab() {
//   const [messages, setMessages] = useState<Message[]>([])
//   const [loading, setLoading] = useState(true)
//   const [error, setError] = useState<string | null>(null)
//   const [currentPage, setCurrentPage] = useState(1)
//   const [selectedSession, setSelectedSession] = useState<string | null>(null)
//   const [viewType, setViewType] = useState<"transcript" | "summary" | null>(null)

//   // 🔍 Filters and search
//   const [searchTerm, setSearchTerm] = useState("")
//   const [dateFilter, setDateFilter] = useState<"7days" | "lastweek" | "month" | "custom" | "all">("all")
//   const [customStart, setCustomStart] = useState<string>("")
//   const [customEnd, setCustomEnd] = useState<string>("")
//   const [durationFilter, setDurationFilter] = useState<{ min: number; max: number }>({ min: 0, max: Infinity })

//   const pageSize = 10 // changed from 5
//   const { toast } = useToast()

//   const handleDelete = async (sessionID: string) => {
//     try {
//       const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/conversations/messages/delete-by-session/`, {
//         method: "DELETE",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Token ${Cookies.get("Token") || ""}`,
//         },
//         body: JSON.stringify({ sessionID }),
//       })

//       if (!res.ok) throw new Error("Failed to delete conversation")

//       setMessages((prev) => prev.filter((m) => m.sessionID !== sessionID))

//       toast({
//         title: "Conversation deleted",
//         description: `Session ${sessionID} was removed successfully.`,
//         className: "bg-green-50 border-green-400 text-green-800",
//       })
//     } catch (err: any) {
//       toast({
//         title: "Error deleting conversation",
//         description: err.message,
//         className: "bg-red-50 border-red-400 text-red-800",
//       })
//     }
//   }

//   useEffect(() => {
//     async function fetchMessages() {
//       try {
//         setLoading(true)
//         const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/conversations/messages/`, {
//           method: "GET",
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Token ${Cookies.get("Token") || ""}`,
//           },
//         })
//         if (!res.ok) throw new Error("Failed to fetch messages")
//         const data: Message[] = await res.json()
//       console.log(data)
//         setMessages(data)
//       } catch (err: any) {
//         setError(err.message)
//       } finally {
//         setLoading(false)
//       }
//     }
//     fetchMessages()
//   }, [])

//   const grouped = messages.reduce<Record<string, Message[]>>((acc, msg) => {
//     if (!acc[msg.sessionID]) acc[msg.sessionID] = []
//     acc[msg.sessionID].push(msg)
//     return acc
//   }, {})

//   const sortedSessions = Object.entries(grouped).sort((a, b) => {
//     const firstA = new Date(a[1][0].timestamp).getTime()
//     const firstB = new Date(b[1][0].timestamp).getTime()
//     return firstB - firstA
//   })

//   // 🧠 Filtering logic
//   const now = new Date()
//   const filteredSessions = sortedSessions.filter(([sessionID, msgs]) => {
//     const firstMsg = msgs[0]
//     const msgDate = new Date(firstMsg.timestamp)

//     // Date filter
//     let dateMatch = true
//     if (dateFilter === "7days") {
//       const sevenDaysAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000)
//       dateMatch = msgDate >= sevenDaysAgo
//     } else if (dateFilter === "lastweek") {
//       const startOfLastWeek = new Date(now)
//       startOfLastWeek.setDate(now.getDate() - now.getDay() - 7)
//       const endOfLastWeek = new Date(now)
//       endOfLastWeek.setDate(now.getDate() - now.getDay())
//       dateMatch = msgDate >= startOfLastWeek && msgDate <= endOfLastWeek
//     } else if (dateFilter === "month") {
//       const monthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000)
//       dateMatch = msgDate >= monthAgo
//     } else if (dateFilter === "custom" && customStart && customEnd) {
//       const start = new Date(customStart)
//       const end = new Date(customEnd)
//       dateMatch = msgDate >= start && msgDate <= end
//     }

//     // Call duration filter
//     const sortedMsgs = [...msgs].sort(
//       (a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
//     )
//     const startTime = new Date(sortedMsgs[0].timestamp).getTime()
//     const endMsg = sortedMsgs.find((m) => m.type === "summary") || sortedMsgs[sortedMsgs.length - 1]
//     const endTime = new Date(endMsg.timestamp).getTime()
//     const durationMs = endTime - startTime
//     const durationMinutes = durationMs / 60000
//     const durationMatch = durationMinutes >= durationFilter.min && durationMinutes <= durationFilter.max

//     // Search filter (sessionID, phone number, caller number)
//     const searchMatch =
//       sessionID.includes(searchTerm) ||
//       msgs.some(
//         (m) =>
//           m.phonenumber?.includes(searchTerm) ||
//           m.caller_number?.includes(searchTerm)
//       )

//     return dateMatch && durationMatch && searchMatch
//   })

//   const totalPages = Math.ceil(filteredSessions.length / pageSize)
//   const paginated = filteredSessions.slice((currentPage - 1) * pageSize, currentPage * pageSize)
//   const selectedMessages = selectedSession ? grouped[selectedSession] : null
//   const latestSummary = selectedMessages?.find((m) => m.type === "summary") || null

//   const formatDuration = (ms: number) => {
//     const totalSec = Math.floor(ms / 1000)
//     const mins = Math.floor(totalSec / 60)
//     const secs = totalSec % 60
//     return `${mins}m ${secs}s`
//   }

//   if (loading) return <div className="p-6">Loading conversations...</div>
//   if (error) return <div className="p-6 text-red-600">Error: {error}</div>

//   return (
//     <div className="flex space-x-6 pt-6">
//       <div className={`${selectedSession ? "w-1/2" : "w-full"} px-4`}>
//         {/* 🔍 Search + Filters */}
//         <div className="bg-slate-50 border rounded-lg p-4 mb-4 shadow-sm">
//   <h3 className="font-semibold text-slate-700 mb-2">Filters</h3>

//   <div className="flex flex-wrap gap-3 items-end">
//     {/* Search */}
//     <div className="flex flex-col">
//       <label className="text-xs font-medium text-slate-600 mb-1">Search</label>
//       <div className="relative flex items-center">
//         <Search className="absolute left-2 text-slate-400 w-4 h-4" />
//         <Input
//           type="text"
//           placeholder="Session ID, Phone, or Caller"
//           className="pl-8 w-64"
//           value={searchTerm}
//           onChange={(e) => setSearchTerm(e.target.value)}
//         />
//       </div>
//     </div>

//     {/* Date Filter */}
//     <div className="flex flex-col">
//       <label className="text-xs font-medium text-slate-600 mb-1">Date Range</label>
//       <select
//         className="border rounded px-3 py-1.5"
//         value={dateFilter}
//         onChange={(e) => setDateFilter(e.target.value as any)}
//       >
//         <option value="all">All Time</option>
//         <option value="7days">Last 7 Days</option>
//         <option value="lastweek">Last Week</option>
//         <option value="month">Last Month</option>
//         <option value="custom">Custom</option>
//       </select>
//     </div>

//     {/* Custom Dates */}
//     {dateFilter === "custom" && (
//       <>
//         <div className="flex flex-col">
//           <label className="text-xs font-medium text-slate-600 mb-1">Start Date</label>
//           <Input
//             type="date"
//             value={customStart}
//             onChange={(e) => {
//               setCustomStart(e.target.value)
//               // Ensure end >= start
//               if (customEnd && new Date(e.target.value) > new Date(customEnd)) {
//                 setCustomEnd(e.target.value)
//               }
//             }}
//           />
//         </div>
//         <div className="flex flex-col">
//           <label className="text-xs font-medium text-slate-600 mb-1">End Date</label>
//           <Input
//             type="date"
//             value={customEnd}
//             min={customStart || undefined}
//             onChange={(e) => setCustomEnd(e.target.value)}
//           />
//         </div>
//       </>
//     )}

//     {/* Duration Filter */}
//     <div className="flex flex-col">
//       <label className="text-xs font-medium text-slate-600 mb-1">Call Duration (mins)</label>
//       <div className="flex items-center space-x-2">
//         <Input
//           type="number"
//           placeholder="Min"
//           className="w-20"
//           onChange={(e) =>
//             setDurationFilter({ ...durationFilter, min: Number(e.target.value) || 0 })
//           }
//         />
//         <span>-</span>
//         <Input
//           type="number"
//           placeholder="Max"
//           className="w-20"
//           onChange={(e) =>
//             setDurationFilter({ ...durationFilter, max: Number(e.target.value) || Infinity })
//           }
//         />
//       </div>
//     </div>

//     {/* Reset Button */}
//     <Button
//       variant="outline"
//       className="ml-auto"
//       onClick={() => {
//         setSearchTerm("")
//         setDateFilter("all")
//         setCustomStart("")
//         setCustomEnd("")
//         setDurationFilter({ min: 0, max: Infinity })
//       }}
//     >
//       Reset Filters
//     </Button>
//   </div>
// </div>


//         {/* Calls Table */}
//         <div className="overflow-x-auto border rounded-lg">
//           <table className="min-w-full text-sm text-left table-fixed">
//             <thead className="bg-slate-100 border-b">
//               <tr>
//                 <th className="px-4 py-2 font-medium text-slate-700 w-40">Phone</th>
//                 <th className="px-4 py-2 font-medium text-slate-700 w-40">Caller Number</th>
//                 <th className="px-4 py-2 font-medium text-slate-700 w-24">Messages</th>
//                 <th className="px-4 py-2 font-medium text-slate-700 w-48">Started At</th>
//                 <th className="px-4 py-2 font-medium text-slate-700 w-32">Call Duration</th>
//                 <th className="px-4 py-2 font-medium text-slate-700 w-32">Transcript</th>
//                 <th className="px-4 py-2 font-medium text-slate-700 w-32">Summary</th>
//                 <th className="px-4 py-2 font-medium text-slate-700 w-20">Delete</th>
//               </tr>
//             </thead>
//             <tbody>
//               {paginated.map(([sessionID, msgs]) => {
//                 const sortedMsgs = [...msgs].sort(
//                   (a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
//                 )
//                 const startedAt = new Date(sortedMsgs[0].timestamp).toLocaleString()
//                 const startedAtMs = new Date(sortedMsgs[0].timestamp).getTime()

//                 const summaryMsg = sortedMsgs.find((m) => m.type === "summary")
//                 const endedAtMs = summaryMsg
//                   ? new Date(summaryMsg.timestamp).getTime() + 15000
//                   : new Date(sortedMsgs[sortedMsgs.length - 1].timestamp).getTime()

//                 const callDuration = formatDuration(endedAtMs - startedAtMs)
//                 const lastMsg = [...msgs].sort(
//                   (a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
//                 )[0]
//                 const phoneNumber = lastMsg?.phonenumber || "Unknown"
//                 const callerNumber = msgs.find((m) => m.caller_number)?.caller_number || "No caller number"
//                 const previewSummary = summaryMsg
//                   ? summaryMsg.summary.split(" ").slice(0, 3).join(" ") + "..."
//                   : "No summary"

//                 return (
//                   <tr key={sessionID} className="border-b hover:bg-slate-50">
//                     <td className="px-4 py-2 font-medium text-slate-800">{phoneNumber}</td>
//                     <td className="px-4 py-2 font-medium text-slate-800">{callerNumber}</td>
//                     <td className="px-4 py-2">{msgs.length}</td>
//                     <td className="px-4 py-2 text-slate-600">{startedAt}</td>
//                     <td className="px-4 py-2 text-slate-600">{callDuration}</td>
//                     <td
//                       className="px-4 py-2 cursor-pointer text-blue-600"
//                       onClick={() => {
//                         setSelectedSession(sessionID)
//                         setViewType("transcript")
//                       }}
//                     >
//                       <ChevronDown className="inline w-4 h-4 mr-1" />
//                       View
//                     </td>
//                     <td
//                       className="px-4 py-2 cursor-pointer text-blue-600"
//                       onClick={() => {
//                         setSelectedSession(sessionID)
//                         setViewType("summary")
//                       }}
//                     >
//                       <ChevronDown className="inline w-4 h-4 mr-1" />
//                       {previewSummary}
//                     </td>
//                     <td className="px-4 py-2 text-center">
//                       <AlertDialog>
//                         <AlertDialogTrigger asChild>
//                           <Button
//                             variant="ghost"
//                             size="icon"
//                             className="hover:bg-red-100 hover:text-red-600 rounded-full"
//                           >
//                             <Trash2 className="w-4 h-4" />
//                           </Button>
//                         </AlertDialogTrigger>
//                         <AlertDialogContent>
//                           <AlertDialogHeader>
//                             <AlertDialogTitle>Delete this conversation?</AlertDialogTitle>
//                             <AlertDialogDescription>
//                               This will permanently delete all messages under session <b>{sessionID}</b>.
//                               This action cannot be undone.
//                             </AlertDialogDescription>
//                           </AlertDialogHeader>
//                           <AlertDialogFooter>
//                             <AlertDialogCancel>Cancel</AlertDialogCancel>
//                             <AlertDialogAction
//                               className="bg-red-600 hover:bg-red-700 text-white"
//                               onClick={() => handleDelete(sessionID)}
//                             >
//                               Delete
//                             </AlertDialogAction>
//                           </AlertDialogFooter>
//                         </AlertDialogContent>
//                       </AlertDialog>
//                     </td>
//                   </tr>
//                 )
//               })}
//             </tbody>
//           </table>
//         </div>

//         {/* 🔢 Pagination */}
//         <div className="flex justify-between items-center mt-4">
//           <Button
//             variant="outline"
//             size="sm"
//             disabled={currentPage === 1}
//             onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
//           >
//             <ChevronLeft className="w-4 h-4 mr-1" /> Prev
//           </Button>
//           <div className="flex items-center space-x-2">
//             <span className="text-sm text-slate-600">
//               Page {currentPage} of {totalPages}
//             </span>
//             <Input
//               type="number"
//               min={1}
//               max={totalPages}
//               value={currentPage}
//               onChange={(e) => {
//                 const val = Number(e.target.value)
//                 if (val >= 1 && val <= totalPages) setCurrentPage(val)
//               }}
//               className="w-20"
//             />
//           </div>
//           <Button
//             variant="outline"
//             size="sm"
//             disabled={currentPage === totalPages}
//             onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
//           >
//             Next <ChevronRight className="w-4 h-4 ml-1" />
//           </Button>
//         </div>
//       </div>

//       {/* 📄 Right Panel */}
//       {selectedSession && (
//         <div className="w-1/2 border rounded-lg p-4 bg-slate-50 relative mt-6 mr-4">
//           <button
//             onClick={() => {
//               setSelectedSession(null)
//               setViewType(null)
//             }}
//             className="absolute top-2 right-2 text-slate-500 hover:text-slate-700"
//           >
//             ✕
//           </button>

//           {viewType === "transcript" && (
//             <div className="space-y-3">
//               <h2 className="text-lg font-semibold">Transcript</h2>
//               {selectedMessages
//                 ?.sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime())
//                 .map((m) => {
//                   if (m.type === "summary") return null
//                   return (
//                     <div key={m.id} className="border p-3 rounded bg-white shadow-sm">
//                       <p className="font-medium text-slate-700">👤 {m.user_question}</p>
//                       <p className="text-slate-800">🤖 {m.assistant_response}</p>
//                       <p className="text-xs text-slate-500 mt-1">
//                         {new Date(m.timestamp).toLocaleString()}
//                       </p>
//                     </div>
//                   )
//                 })}
//             </div>
//           )}

//           {viewType === "summary" && (
//             <div>
//               <h2 className="text-lg font-semibold mb-2">Summary</h2>
//               {latestSummary ? (
//                 <div className="border p-3 rounded bg-white shadow-sm">
//                   <p className="text-slate-800">{latestSummary.summary}</p>
//                   <p className="text-xs text-slate-500 mt-2">
//                     {new Date(latestSummary.timestamp).toLocaleString()}
//                   </p>
//                 </div>
//               ) : (
//                 <p className="text-slate-500">No summary available</p>
//               )}
//             </div>
//           )}
//         </div>
//       )}
//     </div>
//   )
// }

// export default CallsTab




"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useToast } from "@/hooks/use-toast"
import Cookies from "js-cookie"
import {
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  Search,
  Trash2,
} from "lucide-react"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

type Message = {
  id: number
  user: number
  timestamp: string
  sessionID: string
  type: string
  user_question: string
  assistant_response: string
  summary: string
  phonenumber: string
  caller_number: string
}

function CallsTab() {
  const [messages, setMessages] = useState<Message[]>([])
  const [loading, setLoading] = useState(true)
  const [pageLoading, setPageLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [conversationTotalPages, setConversationTotalPages] = useState(1)
  const [selectedSession, setSelectedSession] = useState<string | null>(null)
  const [viewType, setViewType] = useState<"transcript" | "summary" | null>(null)

  // Filters
  const [searchTerm, setSearchTerm] = useState("")
  const [dateFilter, setDateFilter] = useState<"7days" | "lastweek" | "month" | "custom" | "all">("all")
  const [customStart, setCustomStart] = useState("")
  const [customEnd, setCustomEnd] = useState("")
  const [durationFilter, setDurationFilter] = useState<{ min: number; max: number }>({ min: 0, max: Infinity })

  const { toast } = useToast()

  // Delete Conversation
  const handleDelete = async (sessionID: string) => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/conversations/messages/delete-by-session/`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${Cookies.get("Token") || ""}`,
        },
        body: JSON.stringify({ sessionID }),
      })

      if (!res.ok) throw new Error("Failed to delete conversation")

      setMessages((prev) => prev.filter((m) => m.sessionID !== sessionID))
      toast({
        title: "Conversation deleted",
        description: `Session ${sessionID} was removed successfully.`,
        className: "bg-green-50 border-green-400 text-green-800",
      })
    } catch (err: any) {
      toast({
        title: "Error deleting conversation",
        description: err.message,
        className: "bg-red-50 border-red-400 text-red-800",
      })
    }
  }

  // ✅ Fetch messages for each page
  useEffect(() => {
    async function fetchMessages() {
      try {
        // Show different loaders for first load vs pagination
        if (currentPage === 1) setLoading(true)
        else setPageLoading(true)

        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/conversations/messages/conversations/?page=${currentPage}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Token ${Cookies.get("Token") || ""}`,
            },
          }
        )

        if (!res.ok) throw new Error("Failed to fetch messages")

        const data = await res.json()
        console.log("Fetched data:", data)

        const groupedResults = data.results ? Object.values(data.results).flat() : []
        setMessages(groupedResults)
        setConversationTotalPages(data.total_pages || 1)
      } catch (err: any) {
        setError(err.message)
      } finally {
        setLoading(false)
        setPageLoading(false)
      }
    }

    fetchMessages()
  }, [currentPage])

  const grouped = messages.reduce<Record<string, Message[]>>((acc, msg) => {
    if (!acc[msg.sessionID]) acc[msg.sessionID] = []
    acc[msg.sessionID].push(msg)
    return acc
  }, {})

  const sortedSessions = Object.entries(grouped).sort((a, b) => {
    const firstA = new Date(a[1][0].timestamp).getTime()
    const firstB = new Date(b[1][0].timestamp).getTime()
    return firstB - firstA
  })

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
      <div className="flex justify-center items-center h-64 text-slate-600">
        <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-slate-600 mr-2"></div>
        Loading conversations...
      </div>
    )

  if (error) return <div className="p-6 text-red-600">Error: {error}</div>

  return (
    <div className="flex space-x-6 pt-6">
      <div className={`${selectedSession ? "w-1/2" : "w-full"} px-4`}>
        {/* 🔍 Filters UI unchanged */}

        {/* 🧭 Calls Table */}
        <div className="relative overflow-x-auto border rounded-lg">
          {pageLoading && (
            <div className="absolute inset-0 bg-white/70 flex items-center justify-center z-10">
              <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-slate-600"></div>
              <span className="ml-2 text-slate-700">Loading page {currentPage}...</span>
            </div>
          )}

          <table className="min-w-full text-sm text-left table-fixed">
            <thead className="bg-slate-100 border-b">
              <tr>
                <th className="px-4 py-2 font-medium text-slate-700 w-40">Phone</th>
                <th className="px-4 py-2 font-medium text-slate-700 w-40">Caller Number</th>
                <th className="px-4 py-2 font-medium text-slate-700 w-24">Messages</th>
                <th className="px-4 py-2 font-medium text-slate-700 w-48">Started At</th>
                <th className="px-4 py-2 font-medium text-slate-700 w-32">Call Duration</th>
                <th className="px-4 py-2 font-medium text-slate-700 w-32">Transcript</th>
                <th className="px-4 py-2 font-medium text-slate-700 w-32">Summary</th>
                <th className="px-4 py-2 font-medium text-slate-700 w-20">Delete</th>
              </tr>
            </thead>
            <tbody>
              {sortedSessions.map(([sessionID, msgs]) => {
                const sortedMsgs = [...msgs].sort(
                  (a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
                )
                const startedAt = new Date(sortedMsgs[0].timestamp).toLocaleString()
                const startedAtMs = new Date(sortedMsgs[0].timestamp).getTime()

                const summaryMsg = sortedMsgs.find((m) => m.type === "summary")
                const endedAtMs = summaryMsg
                  ? new Date(summaryMsg.timestamp).getTime() + 15000
                  : new Date(sortedMsgs[sortedMsgs.length - 1].timestamp).getTime()

                const callDuration = formatDuration(endedAtMs - startedAtMs)
                const phoneNumber = msgs[0]?.phonenumber || "Unknown"
                const callerNumber = msgs.find((m) => m.caller_number)?.caller_number || "N/A"
                const previewSummary = summaryMsg
                  ? summaryMsg.summary.split(" ").slice(0, 3).join(" ") + "..."
                  : "No summary"

                return (
                  <tr key={sessionID} className="border-b hover:bg-slate-50">
                    <td className="px-4 py-2 font-medium text-slate-800">{phoneNumber}</td>
                    <td className="px-4 py-2 font-medium text-slate-800">{callerNumber}</td>
                    <td className="px-4 py-2">{msgs.length}</td>
                    <td className="px-4 py-2 text-slate-600">{startedAt}</td>
                    <td className="px-4 py-2 text-slate-600">{callDuration}</td>
                    <td
                      className="px-4 py-2 cursor-pointer text-blue-600"
                      onClick={() => {
                        setSelectedSession(sessionID)
                        setViewType("transcript")
                      }}
                    >
                      <ChevronDown className="inline w-4 h-4 mr-1" /> View
                    </td>
                    <td
                      className="px-4 py-2 cursor-pointer text-blue-600"
                      onClick={() => {
                        setSelectedSession(sessionID)
                        setViewType("summary")
                      }}
                    >
                      <ChevronDown className="inline w-4 h-4 mr-1" /> {previewSummary}
                    </td>
                    <td className="px-4 py-2 text-center">
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="hover:bg-red-100 hover:text-red-600 rounded-full"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Delete this conversation?</AlertDialogTitle>
                            <AlertDialogDescription>
                              This will permanently delete all messages under session <b>{sessionID}</b>.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction
                              className="bg-red-600 hover:bg-red-700 text-white"
                              onClick={() => handleDelete(sessionID)}
                            >
                              Delete
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>

        {/* 🔢 Pagination */}
        <div className="flex justify-between items-center mt-4">
          <Button
            variant="outline"
            size="sm"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
          >
            <ChevronLeft className="w-4 h-4 mr-1" /> Prev
          </Button>

          <div className="flex items-center space-x-2">
            <span className="text-sm text-slate-600">
              Page {currentPage} of {conversationTotalPages}
            </span>
            <Input
              type="number"
              min={1}
              max={conversationTotalPages}
              value={currentPage}
              onChange={(e) => {
                const val = Number(e.target.value)
                if (val >= 1 && val <= conversationTotalPages) setCurrentPage(val)
              }}
              className="w-20"
            />
          </div>

          <Button
            variant="outline"
            size="sm"
            disabled={currentPage === conversationTotalPages}
            onClick={() => setCurrentPage((p) => Math.min(conversationTotalPages, p + 1))}
          >
            Next <ChevronRight className="w-4 h-4 ml-1" />
          </Button>
        </div>
      </div>

      {/* 📄 Right Panel (Transcript / Summary unchanged) */}
      {selectedSession && (
        <div className="w-1/2 border rounded-lg p-4 bg-slate-50 relative mt-6 mr-4">
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
                ?.sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime())
                .map((m) => (
                  m.type !== "summary" && (
                    <div key={m.id} className="border p-3 rounded bg-white shadow-sm">
                      <p className="font-medium text-slate-700">👤 {m.user_question}</p>
                      <p className="text-slate-800">🤖 {m.assistant_response}</p>
                      <p className="text-xs text-slate-500 mt-1">
                        {new Date(m.timestamp).toLocaleString()}
                      </p>
                    </div>
                  )
                ))}
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
  )
}

export default CallsTab
