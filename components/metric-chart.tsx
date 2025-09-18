"use client"

import { Line, LineChart, ResponsiveContainer, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts"

interface MetricChartProps {
  data: number[]
  dates?: string[]
}

export function MetricChart({ data, dates }: MetricChartProps) {
  const chartData = data.map((value, index) => ({
    name: dates?.[index] || `Day ${index + 1}`,
    value,
  }))

  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart data={chartData}>
        {/* ✅ Grid */}
        <CartesianGrid strokeDasharray="3 3" />

        {/* ✅ Tilted x-axis */}
        <XAxis
          dataKey="name"
          axisLine={false}
          tickLine={false}
          tick={{ fontSize: 10, fill: "#64748b" }}
          angle={-30}
          textAnchor="end"
          interval={0}
          height={40}
        />
        <YAxis
          axisLine={false}
          tickLine={false}
          tick={{ fontSize: 10, fill: "#64748b" }}
        />

        {/* ✅ Tooltip on hover */}
        <Tooltip formatter={(val: number) => val.toString()} />

        <Line
          type="linear" // sharp edges
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
