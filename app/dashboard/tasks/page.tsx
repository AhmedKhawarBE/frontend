"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Settings, Trash2, Plus } from "lucide-react"
import { useRouter } from "next/navigation"
import Cookies from "js-cookie"

interface ActionLog {
  content_type: string
  user: string
  action: string
  timestamp: string
  object_id: string
  description: string
}

export default function ActionLogsPage() {
  const router = useRouter()
  const [logs, setLogs] = useState<ActionLog[]>([])
  const [loading, setLoading] = useState(true)
  const [showUnpublishedBanner, setShowUnpublishedBanner] = useState(true)

  useEffect(() => {
    const fetchLogs = async () => {
      try {   
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/reports/action-logs/`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${Cookies.get("Token") || ""}`,
          },
        })

        if (!res.ok) {
          throw new Error(`Error: ${res.status} ${res.statusText}`)
        }

        const data = await res.json()
        setLogs(data)
      } catch (error) {
        console.error("Error fetching logs:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchLogs()
  }, [])

  const deleteLog = (logId: number) => {
    if (confirm("Are you sure you want to delete this entry?")) {
      setLogs(logs.filter((log) => log.id !== logId))
    }
  }

  return (
    <div className="p-6 space-y-6">
      {/* Unpublished Changes Banner */}
      {showUnpublishedBanner && (
        <div className="bg-blue-50 border-l-4 border-blue-400 p-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="flex-shrink-0">
              <div className="w-5 h-5 bg-blue-400 rounded-full flex items-center justify-center">
                <span className="text-white text-xs font-bold">i</span>
              </div>
            </div>
            <p className="text-blue-700">You have unpublished changes that need to be published.</p>
            <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
              PUBLISH NOW
            </Button>
          </div>
          <button onClick={() => setShowUnpublishedBanner(false)} className="text-blue-400 hover:text-blue-600">
            ×
          </button>
        </div>
      )}

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Action Logs</h1>
          <p className="text-sm text-gray-500 mt-1">From API</p>
        </div>
        <div className="flex space-x-3">
          <Button className="bg-blue-600 hover:bg-blue-700">
            <Plus className="w-4 h-4 mr-2" />
            ADD
          </Button>
          <Button className="bg-green-600 hover:bg-green-700">
            📤 PUBLISH CHANGES
          </Button>
        </div>
      </div>

      {/* Logs Table */}
      <div className="bg-white rounded-lg border">
        <div className="px-6 py-4 border-b border-gray-200">
          <div className="grid grid-cols-6 gap-4 text-sm font-medium text-gray-500">
            <div>Description</div>
            <div>Content Type</div>
            <div>User</div>
            <div>Action</div>
            <div>Timestamp</div>
            <div>Actions</div>
          </div>
        </div>

        {loading ? (
          <div className="p-6 text-gray-500">Loading...</div>
        ) : (
          <div className="divide-y divide-gray-200">
            {logs.map((log) => (
              <div key={log.id} className="px-6 py-4">
                <div className="grid grid-cols-6 gap-4 items-center">
                  <div className="text-sm text-gray-700">{log.description}</div>
                  <div className="font-medium text-gray-900">{log.content_type}</div>
                  <div>{log.user}</div>
                  <div>
                    <Badge
                      className={`${
                        log.action === "create"
                          ? "bg-green-100 text-green-800"
                          : log.action === "delete"
                          ? "bg-red-100 text-red-800"
                          : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {log.action}
                    </Badge>
                  </div>
                  <div className="text-sm text-gray-500">
                    {new Date(log.timestamp).toLocaleString()}
                  </div>

                  <div className="flex space-x-2">
                    <Button size="sm" variant="outline" onClick={() => router.push(`/dashboard/tasks/${log.id}/settings`)}>
                      <Settings className="w-4 h-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => deleteLog(log.id)}
                      className="p-2 text-red-600 border-red-600 hover:bg-red-50"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
