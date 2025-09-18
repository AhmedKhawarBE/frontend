"use client"

import { useEffect, useState } from "react"
import Cookies from "js-cookie"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { MetricChart } from "@/components/metric-chart"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { ArrowRight } from "lucide-react"

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

export function MetricsGrid() {
  const [callsData, setCallsData] = useState<number[]>([0, 0, 0, 0, 0, 0, 0])
  const [durationData, setDurationData] = useState<number[]>([0, 0, 0, 0, 0, 0, 0])
  const [dates, setDates] = useState<string[]>([])

  const [openMetric, setOpenMetric] = useState<null | {
    title: string
    data: number[]
    dates: string[]
  }>(null)

  useEffect(() => {
    async function fetchMessages() {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/conversations/messages/`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Token ${Cookies.get("Token") || ""}`,
            },
          }
        )
        if (!res.ok) throw new Error("Failed to fetch messages")
        const data: Message[] = await res.json()

        // group by session
        const grouped = data.reduce<Record<string, Message[]>>((acc, msg) => {
          if (!acc[msg.sessionID]) acc[msg.sessionID] = []
          acc[msg.sessionID].push(msg)
          return acc
        }, {})

        // build last 7 days buckets
        const today = new Date()
        const last7Days: string[] = []
        for (let i = 6; i >= 0; i--) {
          const d = new Date(today)
          d.setDate(today.getDate() - i)
          last7Days.push(d.toISOString().split("T")[0]) // YYYY-MM-DD
        }

        const callsCount: Record<string, number> = {}
        const durations: Record<string, number> = {}

        Object.values(grouped).forEach((msgs) => {
          const sorted = msgs.sort(
            (a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
          )
          const start = new Date(sorted[0].timestamp)
          const end = new Date(sorted[sorted.length - 1].timestamp)
          const duration = Math.max(0, (end.getTime() - start.getTime()) / 60000) // minutes
          const key = start.toISOString().split("T")[0]

          callsCount[key] = (callsCount[key] || 0) + 1
          durations[key] = (durations[key] || 0) + duration
        })

        // map into arrays for chart
        const callsArr = last7Days.map((d) => callsCount[d] || 0)
        const durationArr = last7Days.map((d) => durations[d] || 0)

        setCallsData(callsArr)
        setDurationData(durationArr)
        setDates(last7Days)
      } catch (err) {
        console.error(err)
      }
    }

    fetchMessages()
  }, [])

  const metricsData = [
    {
      title: "Calls",
      description: "The number of calls received.",
      data: callsData,
      dates,
      clickable: true,
    },
    {
      title: "Call Duration",
      description: "The amount of time, in minutes, the total call lasted.",
      data: durationData,
      dates,
      clickable: true,
    },
    {
      title: "Transfers",
      description: "The number of calls transferred.",
      data: [0, 0, 0, 0, 0, 0, 0],
      dates,
      clickable: false,
    },
    {
      title: "Transfer Duration",
      description: "The amount of time, in minutes, the transferred call lasted.",
      data: [0, 0, 0, 0, 0, 0, 0],
      dates,
      clickable: false,
    },
    {
      title: "Transfer Time",
      description: "The amount of time, in seconds, until the call was transferred.",
      data: [0, 0, 0, 0, 0, 0, 0],
      dates,
      clickable: false,
    },
    {
      title: "Transfer Rate",
      description: "The percentage of calls transferred.",
      data: [0, 0, 0, 0, 0, 0, 0],
      dates,
      clickable: false,
    },
  ]

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {metricsData.map((metric, index) => (
          <Card
            key={index}
            className={`bg-white border border-slate-200 ${
              metric.clickable ? "cursor-pointer" : ""
            }`}
            onClick={() =>
              metric.clickable ? setOpenMetric(metric) : null
            }
          >
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-base font-medium text-slate-700">
                  {metric.title}
                </CardTitle>
              </div>
            </CardHeader>
            <CardContent className="pt-0 relative">
              <div className="h-32 mb-4">
                <MetricChart data={metric.data} dates={metric.dates} />
              </div>
              <p className="text-xs text-slate-500 leading-relaxed">
                {metric.description}
              </p>
              {/* Arrow in bottom-right */}
              <ArrowRight className="w-4 h-4 text-slate-400 absolute bottom-2 right-2" />
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Dialog for big chart */}
      <Dialog open={!!openMetric} onOpenChange={() => setOpenMetric(null)}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>{openMetric?.title}</DialogTitle>
          </DialogHeader>
          <div className="h-96">
            {openMetric && (
              <MetricChart data={openMetric.data} dates={openMetric.dates} />
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
