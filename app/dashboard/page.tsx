// "use client"

// import { useEffect, useState } from "react"
// import Cookies from "js-cookie"
// import { MetricsGrid } from "@/components/metrics-grid"
// import { KPICards } from "@/components/kpi-cards"
// import { MetricsHeader } from "@/components/metrics-header"
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
// import { Badge } from "@/components/ui/badge"
// import { Phone } from "lucide-react"

// export default function DashboardPage() {
//   const [twilioNumbers, setTwilioNumbers] = useState<string[]>([])
//   const [loading, setLoading] = useState(true)

//   useEffect(() => {
//     const fetchTwilioPhones = async () => {
//       try {
//         const res = await fetch(
//           `${process.env.NEXT_PUBLIC_BASE_URL}/public/company/get-twilio-phones`,
//           {
//             headers: {
//               "Content-Type": "application/json",
//               Authorization: `Token ${Cookies.get("Token") || ""}`,
//             },
//           }
//         )

//         const data = await res.json()

//         if (Array.isArray(data.twilio_phone_numbers)) {
//           setTwilioNumbers(data.twilio_phone_numbers)
//         }
//       } catch (error) {
//         console.error("Error fetching Twilio numbers:", error)
//       } finally {
//         setLoading(false)
//       }
//     }

//     fetchTwilioPhones()
//   }, [])

//   return (
//     <div className="p-6 space-y-6">
//       <MetricsHeader />

//       <div className="flex gap-6">
//         {/* Main metrics grid */}
//         <div className="flex-1 space-y-6">
//           <MetricsGrid />

//           {/* Twilio Numbers Section */}
//           <Card className="shadow-md border border-slate-200 rounded-2xl">
//             <CardHeader>
//               <CardTitle className="text-xl font-semibold text-slate-800 flex items-center gap-2">
//                 <Phone className="h-5 w-5 text-blue-600" />
//                 Assigned Twilio Numbers
//               </CardTitle>
//             </CardHeader>
//             <CardContent>
//               {loading ? (
//                 <p className="text-slate-500">Loading numbers...</p>
//               ) : twilioNumbers.length === 0 ? (
//                 <p className="italic text-slate-500">No numbers assigned</p>
//               ) : (
//                 <div className="flex flex-wrap gap-3">
//                   {twilioNumbers.map((num) => (
//                     <Badge
//                       key={num}
//                       variant="secondary"
//                       className="px-4 py-2 text-slate-700 bg-gradient-to-r from-blue-50 to-blue-100 border border-blue-200 rounded-xl shadow-sm hover:shadow-md transition"
//                     >
//                       {num}
//                     </Badge>
//                   ))}
//                 </div>
//               )}
//             </CardContent>
//           </Card>
//         </div>

//         {/* KPI Cards Sidebar */}
//         <div className="w-80">
//           <KPICards />
//         </div>
//       </div>
//     </div>
//   )
// }



"use client"

import { useEffect, useState } from "react"
import Cookies from "js-cookie"
import { MetricsGrid } from "@/components/metrics-grid"
import { KPICards } from "@/components/kpi-cards"
import { MetricsHeader } from "@/components/metrics-header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Phone } from "lucide-react"

// Cursor glow inside same file
function CursorGlow() {
  const [position, setPosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const updateMouse = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY })
    }
    window.addEventListener("mousemove", updateMouse)
    return () => window.removeEventListener("mousemove", updateMouse)
  }, [])

  return (
    <div
      className="fixed inset-0 z-40 pointer-events-none transition duration-300 ease-out"
      style={{
        background: `radial-gradient(250px at ${position.x}px ${position.y}px, rgba(22, 101, 52, 0.2), transparent 80%)`,
      }}
    />
  )
}

export default function DashboardPage() {
  const [twilioNumbers, setTwilioNumbers] = useState<string[]>([])
  const [loading, setLoading] = useState(true)

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
      } finally {
        setLoading(false)
      }
    }

    fetchTwilioPhones()
  }, [])

  return (
    <div className="relative">
      {/* Cinematic dark green glow */}
      <CursorGlow />

      <div className="relative z-50 p-6 space-y-6">
        <MetricsHeader />

        <div className="flex gap-6">
          {/* Main metrics grid */}
          <div className="flex-1 space-y-6">
            <MetricsGrid />

            {/* Twilio Numbers Section */}
            <Card className="shadow-md border border-slate-200 rounded-2xl bg-white/70 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-xl font-semibold text-slate-800 flex items-center gap-2">
                  <Phone className="h-5 w-5 text-green-600" />
                  Assigned Twilio Numbers
                </CardTitle>
              </CardHeader>
              <CardContent>
                {loading ? (
                  <p className="text-slate-500">Loading numbers...</p>
                ) : twilioNumbers.length === 0 ? (
                  <p className="italic text-slate-500">No numbers assigned</p>
                ) : (
                  <div className="flex flex-wrap gap-3">
                    {twilioNumbers.map((num) => (
                      <Badge
                        key={num}
                        variant="secondary"
                        className="px-4 py-2 text-slate-700 bg-gradient-to-r from-green-50 to-green-100 border border-green-200 rounded-xl shadow-sm hover:shadow-md transition"
                      >
                        {num}
                      </Badge>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* KPI Cards Sidebar */}
          <div className="w-80">
            <KPICards />
          </div>
        </div>
      </div>
    </div>
  )
}
