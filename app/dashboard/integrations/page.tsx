// "use client"

// import { Button } from "@/components/ui/button"

// const integrations = [
//   {
//     name: "Leadconnector (GHL) v2 - Standard",
//     status: "Not Connected",
//     statusColor: "text-orange-600",
//   },
//   {
//     name: "Leadconnector (GHL) v2 - Whitelabel",
//     status: "Not Connected",
//     statusColor: "text-orange-600",
//   },
//   {
//     name: "Hubspot",
//     status: "Not Connected",
//     statusColor: "text-orange-600",
//   },
//   {
//     name: "Google",
//     status: "Not Connected",
//     statusColor: "text-orange-600",
//   },
//   {
//     name: "Microsoft - Delegated",
//     status: "Not Connected",
//     statusColor: "text-orange-600",
//   },
//   {
//     name: "Microsoft - Admin",
//     status: "Not Connected",
//     statusColor: "text-orange-600",
//   },
//   {
//     name: "Salesforce",
//     status: "Not Connected",
//     statusColor: "text-orange-600",
//     hasDocumentation: true,
//   },
//   {
//     name: "SmartSheets",
//     status: "Not Connected",
//     statusColor: "text-orange-600",
//   },
// ]

// export default function IntegrationsPage() {
//   return (
//     <div className="p-6 space-y-6">
//       {/* Header */}
//       <div className="flex items-center justify-between">
//         <h1 className="text-2xl font-semibold text-slate-800">Integrations</h1>
//       </div>

//       {/* External Integrations Section */}
//       <div className="space-y-4">
//         <h2 className="text-xl font-medium text-slate-700">External Integrations</h2>

//         {/* Integrations Table */}
//         <div className="bg-white rounded-lg border border-slate-200 overflow-hidden">
//           <table className="w-full">
//             <thead className="bg-slate-800 text-white">
//               <tr>
//                 <th className="text-left p-4 font-medium">Integration</th>
//                 <th className="text-left p-4 font-medium">Status</th>
//                 <th className="text-left p-4 font-medium">Action</th>
//               </tr>
//             </thead>
//             <tbody className="divide-y divide-slate-200">
//               {integrations.map((integration, index) => (
//                 <tr key={index} className="hover:bg-slate-50">
//                   <td className="p-4">
//                     <div className="flex items-center">
//                       <span className="text-slate-800">{integration.name}</span>
//                       {integration.hasDocumentation && (
//                         <span className="ml-2 text-blue-600 text-sm">(Documentation)</span>
//                       )}
//                     </div>
//                   </td>
//                   <td className="p-4">
//                     <span className={integration.statusColor}>{integration.status}</span>
//                   </td>
//                   <td className="p-4">
//                     <Button className="bg-green-600 hover:bg-green-700 text-white px-6 py-2">CONNECT</Button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </div>
//   )
// }




"use client"

import { Button } from "@/components/ui/button"
import React, { useState } from "react"
import Cookies from "js-cookie"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

const integrations = [
  {
    name: "Leadconnector (GHL) v2 - Standard",
    status: "Not Connected",
    statusColor: "text-orange-600",
  },
  {
    name: "Leadconnector (GHL) v2 - Whitelabel",
    status: "Not Connected",
    statusColor: "text-orange-600",
  },
  {
    name: "Hubspot",
    status: "Not Connected",
    statusColor: "text-orange-600",
  },
  {
    name: "Google",
    status: "Not Connected",
    statusColor: "text-orange-600",
  },
  {
    name: "Microsoft - Delegated",
    status: "Not Connected",
    statusColor: "text-orange-600",
  },
  {
    name: "Microsoft - Admin",
    status: "Not Connected",
    statusColor: "text-orange-600",
  },
  {
    name: "Salesforce",
    status: "Not Connected",
    statusColor: "text-orange-600",
    hasDocumentation: true,
  },
  {
    name: "Accesse 11",
    status: "Not Connected",
    statusColor: "text-orange-600",
    apiUrl: "https://apii.pentagonai.co/api/integrations/accesse11/connect/",
    requiresCredentials: true, // 👈 added flag
  },
  {
    name: "Clover",
    status: "Not Connected",
    statusColor: "text-orange-600",
    apiUrl: "https://apii.pentagonai.co/api/integrations/clover/connect/",
  },
]

export default function IntegrationsPage() {
  const [isAccesseModalOpen, setIsAccesseModalOpen] = useState(false)
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [currentIntegration, setCurrentIntegration] = useState<any>(null)

  const handleConnect = async (integration: any) => {
    if (integration.requiresCredentials) {
      setCurrentIntegration(integration)
      setIsAccesseModalOpen(true)
      return
    }

    if (!integration.apiUrl) {
      console.log(`No API for ${integration.name}`)
      return
    }

    try {
      const token = Cookies.get("Token") || ""

      const res = await fetch(integration.apiUrl, {
        method: "GET",
        headers: {
          "Authorization": `Token ${token}`,
          "Content-Type": "application/json",
        },
      })

      if (!res.ok) {
        const errorData = await res.json()
        console.error("Failed to get connect URL", errorData)
        return
      }

      const data = await res.json()
      if (data.url) {
        window.location.href = data.url
      } else {
        console.error("No URL returned from backend")
      }
    } catch (error) {
      console.error("Error connecting integration:", error)
    }
  }

  const handleAccesseSubmit = async () => {
    if (!currentIntegration?.apiUrl) return

    try {
      const token = Cookies.get("Token") || ""

      const res = await fetch(currentIntegration.apiUrl, {
        method: "POST",
        headers: {
          "Authorization": `Token ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      })

      if (!res.ok) {
        const errorData = await res.json()
        console.error("Failed to connect Accesse11", errorData)
        return
      }

      const data = await res.json()
      if (data.url) {
        window.location.href = data.url
      } else {
        console.log("Connected successfully", data)
      }
    } catch (error) {
      console.error("Error connecting Accesse11:", error)
    } finally {
      setIsAccesseModalOpen(false)
      setUsername("")
      setPassword("")
    }
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-slate-800">Integrations</h1>
      </div>

      {/* External Integrations Section */}
      <div className="space-y-4">
        <h2 className="text-xl font-medium text-slate-700">External Integrations</h2>

        {/* Integrations Table */}
        <div className="bg-white rounded-lg border border-slate-200 overflow-hidden">
          <table className="w-full">
            <thead className="bg-slate-800 text-white">
              <tr>
                <th className="text-left p-4 font-medium">Integration</th>
                <th className="text-left p-4 font-medium">Status</th>
                <th className="text-left p-4 font-medium">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {integrations.map((integration, index) => (
                <tr key={index} className="hover:bg-slate-50">
                  <td className="p-4">
                    <div className="flex items-center">
                      <span className="text-slate-800">{integration.name}</span>
                      {integration.hasDocumentation && (
                        <span className="ml-2 text-blue-600 text-sm">(Documentation)</span>
                      )}
                    </div>
                  </td>
                  <td className="p-4">
                    <span className={integration.statusColor}>{integration.status}</span>
                  </td>
                  <td className="p-4">
                    <Button
                      className="bg-green-600 hover:bg-green-700 text-white px-6 py-2"
                      onClick={() => handleConnect(integration)}
                    >
                      CONNECT
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Accesse11 Modal */}
      <Dialog open={isAccesseModalOpen} onOpenChange={setIsAccesseModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Connect Accesse11</DialogTitle>
          </DialogHeader>

          <div className="space-y-4">
            <div>
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter username"
              />
            </div>
            <div>
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
              />
            </div>
          </div>

          <DialogFooter>
            <Button
              className="bg-slate-500 hover:bg-slate-600 text-white"
              onClick={() => setIsAccesseModalOpen(false)}
            >
              Cancel
            </Button>
            <Button
              className="bg-green-600 hover:bg-green-700 text-white"
              onClick={handleAccesseSubmit}
            >
              Connect
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}




// "use client"

// import { Button } from "@/components/ui/button"
// import React from "react"
// import Cookies from "js-cookie"

// const integrations = [
//   {
//     name: "Leadconnector (GHL) v2 - Standard",
//     status: "Not Connected",
//     statusColor: "text-orange-600",
//   },
//   {
//     name: "Leadconnector (GHL) v2 - Whitelabel",
//     status: "Not Connected",
//     statusColor: "text-orange-600",
//   },
//   {
//     name: "Hubspot",
//     status: "Not Connected",
//     statusColor: "text-orange-600",
//   },
//   {
//     name: "Google",
//     status: "Not Connected",
//     statusColor: "text-orange-600",
//   },
//   {
//     name: "Microsoft - Delegated",
//     status: "Not Connected",
//     statusColor: "text-orange-600",
//   },
//   {
//     name: "Microsoft - Admin",
//     status: "Not Connected",
//     statusColor: "text-orange-600",
//   },
//   {
//     name: "Salesforce",
//     status: "Not Connected",
//     statusColor: "text-orange-600",
//     hasDocumentation: true,
//   },
//   {
//     name: "Accesse 11",
//     status: "Not Connected",
//     statusColor: "text-orange-600",
//     apiUrl: "https://apii.pentagonai.co/api/integrations/accesse11/connect/",
//   },
//   {
//     name: "Clover",
//     status: "Not Connected",
//     statusColor: "text-orange-600",
//     apiUrl: "https://apii.pentagonai.co/api/integrations/clover/connect/",
//   },
// ]

// export default function IntegrationsPage() {
//   const handleConnect = async (integration: any) => {
//     if (!integration.apiUrl) {
//       console.log(`No API for ${integration.name}`)
//       return
//     }

//     try {
//       const token = Cookies.get("Token") || ""

//       const res = await fetch(integration.apiUrl, {
//         method: "GET",
//         headers: {
//           "Authorization": `Token ${token}`,
//           "Content-Type": "application/json",
//         },
//       })

//       if (!res.ok) {
//         const errorData = await res.json()
//         console.error("Failed to get connect URL", errorData)
//         return
//       }

//       const data = await res.json()
//       if (data.url) {
//         window.location.href = data.url
//       } else {
//         console.error("No URL returned from backend")
//       }
//     } catch (error) {
//       console.error("Error connecting integration:", error)
//     }
//   }
//   return (
//     <div className="p-6 space-y-6">
//       {/* Header */}
//       <div className="flex items-center justify-between">
//         <h1 className="text-2xl font-semibold text-slate-800">Integrations</h1>
//       </div>

//       {/* External Integrations Section */}
//       <div className="space-y-4">
//         <h2 className="text-xl font-medium text-slate-700">External Integrations</h2>

//         {/* Integrations Table */}
//         <div className="bg-white rounded-lg border border-slate-200 overflow-hidden">
//           <table className="w-full">
//             <thead className="bg-slate-800 text-white">
//               <tr>
//                 <th className="text-left p-4 font-medium">Integration</th>
//                 <th className="text-left p-4 font-medium">Status</th>
//                 <th className="text-left p-4 font-medium">Action</th>
//               </tr>
//             </thead>
//             <tbody className="divide-y divide-slate-200">
//               {integrations.map((integration, index) => (
//                 <tr key={index} className="hover:bg-slate-50">
//                   <td className="p-4">
//                     <div className="flex items-center">
//                       <span className="text-slate-800">{integration.name}</span>
//                       {integration.hasDocumentation && (
//                         <span className="ml-2 text-blue-600 text-sm">(Documentation)</span>
//                       )}
//                     </div>
//                   </td>
//                   <td className="p-4">
//                     <span className={integration.statusColor}>{integration.status}</span>
//                   </td>
//                   <td className="p-4">
//                     <Button
//                       className="bg-green-600 hover:bg-green-700 text-white px-6 py-2"
//                       onClick={() => handleConnect(integration)}
//                     >
//                       CONNECT
//                     </Button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </div>
//   )
// }
