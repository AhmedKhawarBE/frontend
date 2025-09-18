// import { Card, CardContent } from "@/components/ui/card"
// import { ChevronRight } from "lucide-react"

// const kpiData = [
//   {
//     title: "Total Calls",
//     subtitle: "Number of Calls",
//     value: "0",
//     color: "bg-yellow-200",
//   },
//   {
//     title: "Total Call Time",
//     subtitle: "Length of Calls in Seconds",
//     value: "0",
//     color: "bg-yellow-200",
//   },
//   {
//     title: "Average Call Time",
//     subtitle: "Average Call Time in Seconds",
//     value: "0",
//     color: "bg-yellow-200",
//   },
//   {
//     title: "Human Intervention",
//     subtitle: "Number of Calls Transferred",
//     value: "0",
//     color: "bg-yellow-200",
//   },
// ]

// export function KPICards() {
//   return (
//     <div className="space-y-4">
//       <div className="flex items-center justify-between">
//         <h3 className="text-lg font-semibold text-slate-800">My KPIs</h3>
//         <ChevronRight className="w-5 h-5 text-slate-400" />
//       </div>

//       <div className="space-y-3">
//         {kpiData.map((kpi, index) => (
//           <Card key={index} className="bg-white border border-slate-200">
//             <CardContent className="p-4">
//               <div className="flex items-center space-x-3">
//                 <div className={`w-12 h-12 ${kpi.color} rounded-lg flex items-center justify-center`}>
//                   <span className="text-xl font-bold text-slate-700">{kpi.value}</span>
//                 </div>
//                 <div className="flex-1">
//                   <h4 className="font-medium text-slate-800">{kpi.title}</h4>
//                   <p className="text-sm text-slate-500">{kpi.subtitle}</p>
//                 </div>
//               </div>
//             </CardContent>
//           </Card>
//         ))}
//       </div>
//     </div>
//   )
// }


"use client"

import { useEffect, useState } from "react"
import Cookies from "js-cookie"
import { Card, CardContent } from "@/components/ui/card"
import { ChevronRight } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog"

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
}

export function KPICards() {
  const [twilioNumbers, setTwilioNumbers] = useState<string[]>([])
  const [totalCalls, setTotalCalls] = useState(0)
  const [totalCallTime, setTotalCallTime] = useState(0)
  const [averageCallTime, setAverageCallTime] = useState(0)
  const [byNumber, setByNumber] = useState<
    Record<string, { calls: number; totalTime: number; avgTime: number }>
  >({})
  const [extraKpis, setExtraKpis] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  const [open, setOpen] = useState(false)
  const [activeKpi, setActiveKpi] = useState<string | null>(null)

  // Fetch assigned Twilio numbers
  useEffect(() => {
    const fetchTwilioPhones = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/public/company/get-twilio-phones`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Token ${Cookies.get("Token") || ""}`,
            },
          }
        )
        const data = await res.json()
        if (Array.isArray(data.twilio_phone_numbers)) {
          setTwilioNumbers(data.twilio_phone_numbers)
        }
      } catch (error) {
        console.error("Error fetching Twilio numbers:", error)
      }
    }
    fetchTwilioPhones()
  }, [])

  // Fetch users + agents
  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch("https://apii.pentagonai.co/api/reports/dashboard/", {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${Cookies.get("Token") || ""}`,
          },
        })
        if (!res.ok) throw new Error(`Failed to fetch KPIs: ${res.status}`)
        const data = await res.json()
        const apiKpis = [
          {
            title: "Total Users",
            subtitle: "Users in Company",
            value: String(data.users_in_company ?? 0),
            color: "bg-yellow-200",
          },
          {
            title: "Agent Count",
            subtitle: "Number of Agents",
            value: String(data.agents_count ?? 0),
            color: "bg-yellow-200",
          },
        ]
        setExtraKpis(apiKpis)
      } catch (error) {
        console.error("Error fetching KPIs:", error)
      }
    }
    fetchData()
  }, [])

  // Fetch conversation data
  useEffect(() => {
    const fetchConversations = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/conversations/messages/`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Token ${Cookies.get("Token") || ""}`,
            },
          }
        )

        if (!res.ok) throw new Error("Failed to fetch conversations")
        const data: Message[] = await res.json()

        const grouped = data.reduce<Record<string, Message[]>>((acc, msg) => {
          if (!acc[msg.sessionID]) acc[msg.sessionID] = []
          acc[msg.sessionID].push(msg)
          return acc
        }, {})

        const numberStats: Record<string, { durations: number[] }> = {}
        let durations: number[] = []

        for (const sessionID in grouped) {
          const msgs = grouped[sessionID].sort(
            (a, b) =>
              new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
          )
          if (msgs.length >= 2) {
            const start = new Date(msgs[0].timestamp).getTime()
            const end = new Date(msgs[msgs.length - 1].timestamp).getTime()
            const durationSec = Math.max(0, (end - start) / 1000)

            const number = msgs[0].phonenumber || "Unknown"
            if (twilioNumbers.includes(number)) {
              durations.push(durationSec)
              if (!numberStats[number]) numberStats[number] = { durations: [] }
              numberStats[number].durations.push(durationSec)
            }
          }
        }

        const total = durations.length
        const sum = durations.reduce((acc, d) => acc + d, 0)
        const avg = total > 0 ? sum / total : 0

        setTotalCalls(total)
        setTotalCallTime(sum)
        setAverageCallTime(avg)

        const breakdown: Record<
          string,
          { calls: number; totalTime: number; avgTime: number }
        > = {}
        for (const number in numberStats) {
          const arr = numberStats[number].durations
          const calls = arr.length
          const totalTime = arr.reduce((a, b) => a + b, 0)
          const avgTime = calls > 0 ? totalTime / calls : 0
          breakdown[number] = { calls, totalTime, avgTime }
        }
        setByNumber(breakdown)
      } catch (error) {
        console.error("Error fetching call KPIs:", error)
      } finally {
        setLoading(false)
      }
    }
    if (twilioNumbers.length > 0) fetchConversations()
  }, [twilioNumbers])

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = Math.floor(seconds % 60)
    return `${mins}m ${secs}s`
  }

  const kpis = [
    { key: "totalCalls", title: "Total Calls", subtitle: "Number of Calls" },
    { key: "totalTime", title: "Total Call Time", subtitle: "Length of Calls" },
    { key: "avgTime", title: "Average Call Time", subtitle: "Average Duration" },
  ]

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[200px] text-slate-600">
        Loading call KPIs...
      </div>
    )
  }

  const renderDetails = () => (
    <div className="space-y-4">
      <div className="p-4 rounded-lg bg-yellow-50 border border-yellow-200 shadow-sm">
        {activeKpi === "totalCalls" && (
          <p>Overall Total Calls: <b>{totalCalls}</b></p>
        )}
        {activeKpi === "totalTime" && (
          <p>Overall Total Call Time: <b>{formatDuration(totalCallTime)}</b></p>
        )}
        {activeKpi === "avgTime" && (
          <p>Overall Average Call Time: <b>{formatDuration(averageCallTime)}</b></p>
        )}
      </div>
      <h4 className="font-semibold text-slate-800">Breakdown by Number</h4>
      <div className="space-y-2">
        {Object.entries(byNumber).map(([num, stats]) => (
          <div key={num} className="flex justify-between p-2 rounded bg-white border shadow-sm">
            <span className="text-sm">{num}</span>
            {activeKpi === "totalCalls" && <span>{stats.calls} calls</span>}
            {activeKpi === "totalTime" && <span>{formatDuration(stats.totalTime)}</span>}
            {activeKpi === "avgTime" && <span>{formatDuration(stats.avgTime)}</span>}
          </div>
        ))}
      </div>
    </div>
  )

  return (
    <>
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-slate-800">Call KPIs</h3>
          <ChevronRight className="w-5 h-5 text-slate-400" />
        </div>

        <div className="space-y-3">
          {kpis.map((kpi) => (
            <Card
              key={kpi.key}
              onClick={() => { setActiveKpi(kpi.key); setOpen(true) }}
              className="bg-white border border-slate-200 hover:shadow-lg cursor-pointer transition"
            >
              <CardContent className="p-3 flex items-center space-x-3">
                <div className="w-10 h-10 bg-yellow-200 rounded-lg flex items-center justify-center">
                  <ChevronRight className="w-4 h-4 text-slate-700" />
                </div>
                <div>
                  <h4 className="text-sm font-medium text-slate-800">{kpi.title}</h4>
                  <p className="text-xs text-slate-500">{kpi.subtitle}</p>
                </div>
              </CardContent>
            </Card>
          ))}

          {extraKpis.map((kpi, index) => (
            <Card key={index} className="bg-white border border-slate-200 shadow-sm">
              <CardContent className="p-3 flex items-center space-x-3">
                <div className={`w-10 h-10 ${kpi.color} rounded-lg flex items-center justify-center`}>
                  <span className="text-sm font-semibold">{kpi.value}</span>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-slate-800">{kpi.title}</h4>
                  <p className="text-xs text-slate-500">{kpi.subtitle}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-md rounded-2xl bg-white shadow-2xl">
          <DialogHeader>
            <DialogTitle>
              {activeKpi === "totalCalls" && "Total Calls Details"}
              {activeKpi === "totalTime" && "Total Call Time Details"}
              {activeKpi === "avgTime" && "Average Call Time Details"}
            </DialogTitle>
            <DialogDescription>Insights broken down by number</DialogDescription>
          </DialogHeader>
          {renderDetails()}
        </DialogContent>
      </Dialog>
    </>
  )
}




// "use client"

// import { useEffect, useState } from "react"
// import Cookies from "js-cookie"
// import { Card, CardContent } from "@/components/ui/card"
// import { ChevronRight } from "lucide-react"

// const staticKpiData = [
//   {
//     title: "Total Calls",
//     subtitle: "Number of Calls",
//     value: "0",
//     color: "bg-yellow-200",
//   },
//   {
//     title: "Total Call Time",
//     subtitle: "Length of Calls in Seconds",
//     value: "0",
//     color: "bg-yellow-200",
//   },
//   {
//     title: "Average Call Time",
//     subtitle: "Average Call Time in Seconds",
//     value: "0",
//     color: "bg-yellow-200",
//   },
//   {
//     title: "Human Intervention",
//     subtitle: "Number of Calls Transferred",
//     value: "0",
//     color: "bg-yellow-200",
//   },
// ]

// export function KPICards() {
//   const [extraKpis, setExtraKpis] = useState<any[]>([])

//   useEffect(() => {
//     async function fetchData() {
//       try {
//         const res = await fetch("https://apii.pentagonai.co/api/reports/dashboard/", {
//           method: "GET",
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Token ${Cookies.get("Token") || ""}`,
//           },
//         })

//         if (!res.ok) {
//           throw new Error(`Failed to fetch KPIs: ${res.status}`)
//         }

//         const data = await res.json()

//         // Build extra KPIs from API response
//         const apiKpis = [
//           {
//             title: "Total Users",
//             subtitle: "Users in Company",
//             value: String(data.users_in_company ?? 0),
//             color: "bg-yellow-200",
//           },
//           {
//             title: "Agent Count",
//             subtitle: "Number of Agents",
//             value: String(data.agents_count ?? 0),
//             color: "bg-yellow-200",
//           },
//         ]

//         setExtraKpis(apiKpis)
//       } catch (error) {
//         console.error("Error fetching KPIs:", error)
//       }
//     }
//     fetchData()
//   }, [])

//   const allKpis = [...staticKpiData, ...extraKpis]

//   return (
//     <div className="space-y-4">
//       <div className="flex items-center justify-between">
//         <h3 className="text-lg font-semibold text-slate-800">My KPIs</h3>
//         <ChevronRight className="w-5 h-5 text-slate-400" />
//       </div>

//       <div className="space-y-3">
//         {allKpis.map((kpi, index) => (
//           <Card key={index} className="bg-white border border-slate-200">
//             <CardContent className="p-4">
//               <div className="flex items-center space-x-3">
//                 <div className={`w-12 h-12 ${kpi.color} rounded-lg flex items-center justify-center`}>
//                   <span className="text-xl font-bold text-slate-700">{kpi.value}</span>
//                 </div>
//                 <div className="flex-1">
//                   <h4 className="font-medium text-slate-800">{kpi.title}</h4>
//                   <p className="text-sm text-slate-500">{kpi.subtitle}</p>
//                 </div>
//               </div>
//             </CardContent>
//           </Card>
//         ))}
//       </div>
//     </div>
//   )
// }
