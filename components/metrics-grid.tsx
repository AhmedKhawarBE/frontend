import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { MetricChart } from "@/components/metric-chart"

const metricsData = [
  {
    title: "Calls",
    description: "The number of calls received.",
    data: [0, 0, 0, 0, 0, 0, 0],
  },
  {
    title: "Call Duration",
    description: "The amount of time, in minutes, the total call lasted.",
    data: [0, 0, 0, 0, 0, 0, 0],
  },
  {
    title: "Transfers",
    description: "The number of calls transferred.",
    data: [0, 0, 0, 0, 0, 0, 0],
  },
  {
    title: "Transfer Duration",
    description: "The amount of time, in minutes, the transferred call lasted.",
    data: [0, 0, 0, 0, 0, 0, 0],
  },
  {
    title: "Transfer Time",
    description: "The amount of time, in seconds, until the call was transferred.",
    data: [0, 0, 0, 0, 0, 0, 0],
  },
  {
    title: "Transfer Rate",
    description: "The percentage of calls transferred.",
    data: [0, 0, 0, 0, 0, 0, 0],
  },
]

export function MetricsGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {metricsData.map((metric, index) => (
        <Card key={index} className="bg-white border border-slate-200">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-base font-medium text-slate-700">{metric.title}</CardTitle>
              <div className="flex space-x-1">
                <button className="w-2 h-2 bg-slate-300 rounded-full hover:bg-slate-400"></button>
                <button className="w-2 h-2 bg-slate-300 rounded-full hover:bg-slate-400"></button>
                <button className="w-2 h-2 bg-slate-300 rounded-full hover:bg-slate-400"></button>
              </div>
            </div>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="h-32 mb-4">
              <MetricChart data={metric.data} />
            </div>
            <p className="text-xs text-slate-500 leading-relaxed">{metric.description}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
