"use client"

import {
  Line,
  LineChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts"

interface MetricChartProps {
  data: number[]
  dates?: string[]
}

export function MetricChart({ data, dates }: MetricChartProps) {
  // Build chart-friendly data
  const chartData = data.map((value, index) => ({
    name: dates?.[index] || `Day ${index + 1}`,
    value,
  }))

  // Dynamically control tick display for long date ranges
  const totalPoints = chartData.length
  const tickInterval =
    totalPoints <= 10 ? 0 : Math.ceil(totalPoints / 10) // show roughly 10 ticks max

  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart data={chartData} margin={{ top: 10, right: 10, left: 0, bottom: 10 }}>
        <CartesianGrid strokeDasharray="3 3" />

        <XAxis
          dataKey="name"
          axisLine={false}
          tickLine={false}
          tick={{ fontSize: 10, fill: "#64748b" }}
          angle={-30}
          textAnchor="end"
          interval={tickInterval} // ✅ dynamic label spacing
          height={40}
          minTickGap={20}
        />

        <YAxis
          axisLine={false}
          tickLine={false}
          tick={{ fontSize: 10, fill: "#64748b" }}
        />

        <Tooltip
          formatter={(val: number) => val.toString()}
          labelFormatter={(label) => `Date: ${label}`}
        />

        <Line
          type="linear"
          dataKey="value"
          stroke="#0d9488"
          strokeWidth={2}
          dot={totalPoints <= 15 ? { fill: "#0d9488", r: 3 } : false} // hide dots for long series
          activeDot={{ r: 4, fill: "#0d9488" }}
        />
      </LineChart>
    </ResponsiveContainer>
  )
}
