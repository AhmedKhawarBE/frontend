"use client"

import { Line, LineChart, ResponsiveContainer, XAxis, YAxis } from "recharts"

interface MetricChartProps {
  data: number[]
}

export function MetricChart({ data }: MetricChartProps) {
  const chartData = data.map((value, index) => ({
    name: `Day ${index + 1}`,
    value,
  }))

  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart data={chartData}>
        <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: "#64748b" }} />
        <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: "#64748b" }} />
        <Line
          type="monotone"
          dataKey="value"
          stroke="#0d9488"
          strokeWidth={2}
          dot={{ fill: "#0d9488", strokeWidth: 2, r: 3 }}
          activeDot={{ r: 4, fill: "#0d9488" }}
        />
      </LineChart>
    </ResponsiveContainer>
  )
}
