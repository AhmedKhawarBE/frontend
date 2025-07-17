"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Settings, Power, Trash2, Plus } from "lucide-react"
import { useRouter } from "next/navigation"

interface Task {
  id: string
  name: string
  type: string
  status: "active" | "inactive"
  lastModified: string
  description?: string
}

export default function TasksPage() {
  const router = useRouter()
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: "1",
      name: "Conversation to Webhook",
      type: "Conversation to Webhook",
      status: "inactive",
      lastModified: "7/4/2025, 5:29:35 PM",
      description: "<Not Set>",
    },
    {
      id: "2",
      name: "CALENDAR : Microsoft",
      type: "CALENDAR : Microsoft",
      status: "inactive",
      lastModified: "3/22/2025, 12:59:04 AM",
      description: "calendar-microsoft_0",
    },
    {
      id: "3",
      name: "Conversation To Transfer",
      type: "Conversation To Transfer",
      status: "inactive",
      lastModified: "3/22/2025, 1:02:49 AM",
      description: "<Not Set>",
    },
    {
      id: "4",
      name: "EmailValidator",
      type: "EmailValidator",
      status: "inactive",
      lastModified: "3/22/2025, 1:04:26 AM",
      description: "emailvalidator_0",
    },
    {
      id: "5",
      name: "Task Chain",
      type: "Task Chain",
      status: "inactive",
      lastModified: "3/22/2025, 1:05:02 AM",
      description: "<Not Set>",
    },
    {
      id: "6",
      name: "Voicemail",
      type: "Voicemail",
      status: "inactive",
      lastModified: "3/22/2025, 1:05:22 AM",
      description: "<Not Set>",
    },
  ])

  const [showUnpublishedBanner, setShowUnpublishedBanner] = useState(true)

  const toggleTaskStatus = (taskId: string) => {
    setTasks(
      tasks.map((task) =>
        task.id === taskId ? { ...task, status: task.status === "active" ? "inactive" : "active" } : task,
      ),
    )
  }

  const deleteTask = (taskId: string) => {
    if (confirm("Are you sure you want to delete this task?")) {
      setTasks(tasks.filter((task) => task.id !== taskId))
    }
  }

  const openSettings = (taskId: string) => {
    router.push(`/dashboard/tasks/${taskId}/settings`)
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
            <span className="sr-only">Dismiss</span>×
          </button>
        </div>
      )}

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Task Management</h1>
          <p className="text-sm text-gray-500 mt-1">Last Published: 1/1/1970, 5:00:00 AM</p>
        </div>
        <div className="flex space-x-3">
          <Button className="bg-blue-600 hover:bg-blue-700">
            <Plus className="w-4 h-4 mr-2" />
            ADD TASK
          </Button>
          <Button className="bg-green-600 hover:bg-green-700">
            <div className="w-4 h-4 mr-2">📤</div>
            PUBLISH CHANGES
          </Button>
        </div>
      </div>

      {/* Tasks Table */}
      <div className="bg-white rounded-lg border">
        <div className="px-6 py-4 border-b border-gray-200">
          <div className="grid grid-cols-4 gap-4 text-sm font-medium text-gray-500">
            <div>Task Type</div>
            <div>Status</div>
            <div>Last Modified</div>
            <div>Actions</div>
          </div>
        </div>

        <div className="divide-y divide-gray-200">
          {tasks.map((task) => (
            <div key={task.id} className="px-6 py-4">
              <div className="grid grid-cols-4 gap-4 items-center">
                <div>
                  <div className="font-medium text-gray-900">{task.name}</div>
                  <div className="text-sm text-gray-500 flex items-center space-x-2">
                    <span>⚡ {task.description}</span>
                    <span>❌ {task.description}</span>
                  </div>
                </div>

                <div>
                  <Badge
                    variant="secondary"
                    className={`${
                      task.status === "active" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    {task.status === "active" ? "Active" : "Inactive"}
                  </Badge>
                </div>

                <div className="text-sm text-gray-500">{task.lastModified}</div>

                <div className="flex space-x-2">
                  <Button size="sm" variant="outline" onClick={() => openSettings(task.id)} className="p-2">
                    <Settings className="w-4 h-4" />
                  </Button>

                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => toggleTaskStatus(task.id)}
                    className={`p-2 ${
                      task.status === "active" ? "text-green-600 border-green-600" : "text-gray-600 border-gray-600"
                    }`}
                  >
                    <Power className="w-4 h-4" />
                  </Button>

                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => deleteTask(task.id)}
                    className="p-2 text-red-600 border-red-600 hover:bg-red-50"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
