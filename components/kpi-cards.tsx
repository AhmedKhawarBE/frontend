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

const staticKpiData = [
  {
    title: "Total Calls",
    subtitle: "Number of Calls",
    value: "0",
    color: "bg-yellow-200",
  },
  {
    title: "Total Call Time",
    subtitle: "Length of Calls in Seconds",
    value: "0",
    color: "bg-yellow-200",
  },
  {
    title: "Average Call Time",
    subtitle: "Average Call Time in Seconds",
    value: "0",
    color: "bg-yellow-200",
  },
  {
    title: "Human Intervention",
    subtitle: "Number of Calls Transferred",
    value: "0",
    color: "bg-yellow-200",
  },
]

export function KPICards() {
  const [extraKpis, setExtraKpis] = useState<any[]>([])

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch("https://apii.pentagonai.co/api/reports/dashboard/", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${Cookies.get("Token") || ""}`,
          },
        })

        if (!res.ok) {
          throw new Error(`Failed to fetch KPIs: ${res.status}`)
        }

        const data = await res.json()

        // Build extra KPIs from API response
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

  const allKpis = [...staticKpiData, ...extraKpis]

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-slate-800">My KPIs</h3>
        <ChevronRight className="w-5 h-5 text-slate-400" />
      </div>

      <div className="space-y-3">
        {allKpis.map((kpi, index) => (
          <Card key={index} className="bg-white border border-slate-200">
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <div className={`w-12 h-12 ${kpi.color} rounded-lg flex items-center justify-center`}>
                  <span className="text-xl font-bold text-slate-700">{kpi.value}</span>
                </div>
                <div className="flex-1">
                  <h4 className="font-medium text-slate-800">{kpi.title}</h4>
                  <p className="text-sm text-slate-500">{kpi.subtitle}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
