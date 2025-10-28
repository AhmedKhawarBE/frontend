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
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

interface CallDaily {
  date: string
  calls: number
  total_duration_sec: number
}

interface CallStatsResponse {
  summary: Record<
    string,
    {
      total_calls: number
      total_duration: string
      average_duration_sec: number
      total_duration_sec: number
    }
  >
  daily: CallDaily[]
}

export function MetricsGrid() {
  const [allDailyData, setAllDailyData] = useState<CallDaily[]>([])
  const [callsData, setCallsData] = useState<number[]>([])
  const [durationData, setDurationData] = useState<number[]>([])
  const [dates, setDates] = useState<string[]>([])
  const [filterDays, setFilterDays] = useState<number>(7)

  const [openMetric, setOpenMetric] = useState<null | {
    title: string
    data: number[]
    dates: string[]
  }>(null)

  useEffect(() => {
    async function fetchCallStats() {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/conversations/messages/call_stats/`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Token ${Cookies.get("Token") || ""}`,
            },
          }
        )
        if (!res.ok) throw new Error("Failed to fetch call stats")

        const data: CallStatsResponse = await res.json()
        const sorted = data.daily.sort(
          (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
        )
        setAllDailyData(sorted)
        applyFilter(sorted, filterDays)
      } catch (err) {
        console.error("Error fetching call stats:", err)
      }
    }
    fetchCallStats()
  }, [])

  useEffect(() => {
    if (allDailyData.length > 0) applyFilter(allDailyData, filterDays)
  }, [filterDays])

  function applyFilter(data: CallDaily[], days: number) {
    const filtered = data.slice(-days)
    const datesArr = filtered.map((d) => d.date)
    const callsArr = filtered.map((d) => d.calls)
    const durationArr = filtered.map((d) => Math.round(d.total_duration_sec / 60))
    setDates(datesArr)
    setCallsData(callsArr)
    setDurationData(durationArr)
  }

  // Dynamically reduce cluttered date labels
  function getReducedDatesLabels(allDates: string[]): string[] {
    if (allDates.length <= 10) return allDates
    const step = Math.ceil(allDates.length / 10) // Always keep ~10 visible labels
    return allDates.map((d, i) => (i % step === 0 ? d : ""))
  }

  const metricsData = [
    {
      title: "Calls",
      description: "The number of calls received per day.",
      data: callsData.length ? callsData : Array(7).fill(0),
      dates: getReducedDatesLabels(dates),
      clickable: true,
    },
    {
      title: "Call Duration",
      description: "Total duration of calls (in minutes) per day.",
      data: durationData.length ? durationData : Array(7).fill(0),
      dates: getReducedDatesLabels(dates),
      clickable: true,
    },
    {
      title: "Transfers",
      description: "The number of calls transferred.",
      data: Array(7).fill(0),
      dates,
      clickable: false,
    },
    {
      title: "Transfer Duration",
      description: "Total duration (in minutes) of transferred calls.",
      data: Array(7).fill(0),
      dates,
      clickable: false,
    },
    {
      title: "Transfer Time",
      description: "The time (in seconds) until the call was transferred.",
      data: Array(7).fill(0),
      dates,
      clickable: false,
    },
    {
      title: "Transfer Rate",
      description: "Percentage of calls transferred.",
      data: Array(7).fill(0),
      dates,
      clickable: false,
    },
  ]

  return (
    <>
      {/* === Filters Section (Left-Aligned Dropdown) === */}
      <div className="flex justify-start mb-6">
        <div className="flex items-center gap-3">
          <span className="text-sm text-slate-600 font-medium">Filter by:</span>
          <Select
            value={filterDays.toString()}
            onValueChange={(v) => setFilterDays(Number(v))}
          >
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="Select range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7">Last 7 Days</SelectItem>
              <SelectItem value="10">Last 10 Days</SelectItem>
              <SelectItem value="30">Last 30 Days</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* === Metrics Grid === */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {metricsData.map((metric, index) => (
          <Card
            key={index}
            className={`bg-white border border-slate-200 transition hover:shadow-md ${
              metric.clickable ? "cursor-pointer" : ""
            }`}
            onClick={() => (metric.clickable ? setOpenMetric(metric) : null)}
          >
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-base font-medium text-slate-700">
                  {metric.title}
                </CardTitle>
              </div>
            </CardHeader>
            <CardContent className="pt-0 relative">
              <div className={`mb-4 ${filterDays > 10 ? "h-44" : "h-32"}`}>
                <MetricChart data={metric.data} dates={metric.dates} />
              </div>
              <p className="text-xs text-slate-500 leading-relaxed">
                {metric.description}
              </p>
              {metric.clickable && (
                <ArrowRight className="w-4 h-4 text-slate-400 absolute bottom-2 right-2" />
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* === Dialog (Expanded Chart View) === */}
      <Dialog open={!!openMetric} onOpenChange={() => setOpenMetric(null)}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>{openMetric?.title}</DialogTitle>
          </DialogHeader>
          <div className="h-96">
            {openMetric && (
              <MetricChart
                data={openMetric.data}
                dates={getReducedDatesLabels(openMetric.dates)}
              />
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
