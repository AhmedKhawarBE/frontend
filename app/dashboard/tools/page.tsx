"use client"

import { useState, useEffect } from "react"
import Cookies from "js-cookie"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { useToast } from "@/hooks/use-toast"
import {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardDescription,
} from "@/components/ui/card"
import {
  Eye,
  Pencil,
  Trash2,
  Plus,
  Loader2,
  Globe,
  ChevronDown,
  ChevronUp,
} from "lucide-react"
import CustomToolsForm from "@/components/CustomToolsForm"

function jsonPretty(obj: any) {
  return JSON.stringify(obj, null, 2)
}

function MethodBadge({ method }: { method: string }) {
  const colors: Record<string, string> = {
    GET: "bg-green-100 text-green-700",
    POST: "bg-blue-100 text-blue-700",
    PUT: "bg-yellow-100 text-yellow-700",
    PATCH: "bg-purple-100 text-purple-700",
    DELETE: "bg-red-100 text-red-700",
  }
  return (
    <span
      className={`px-2 py-1 rounded-md text-xs font-semibold ${
        colors[method] || "bg-slate-100 text-slate-700"
      }`}
    >
      {method}
    </span>
  )
}

export default function ToolsPage() {
  const { toast } = useToast()
  const [showDialog, setShowDialog] = useState(false)
  const [viewTool, setViewTool] = useState<any>(null)
  const [editTool, setEditTool] = useState<any>(null)
  const [tools, setTools] = useState<any[]>([])
  const [loading, setLoading] = useState(false)
  const [refreshKey, setRefreshKey] = useState(0)
  const [expanded, setExpanded] = useState<string | null>(null)

  // Fetch tools
  useEffect(() => {
    const fetchTools = async () => {
      try {
        setLoading(true)
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/custom_feature/custom-features/`,
          {
            headers: {
              Authorization: `Token ${Cookies.get("Token") || ""}`,
            },
          }
        )
        if (!res.ok) throw new Error("Failed to fetch tools")
        const data = await res.json()
        setTools(Array.isArray(data) ? data : [])
      } catch (error) {
        console.error("Error fetching tools:", error)
        toast({
          title: "Error",
          description: "Failed to load tools.",
          variant: "destructive",
        })
      } finally {
        setLoading(false)
      }
    }

    fetchTools()
  }, [refreshKey])

  // Confirm delete via toast
  const confirmDelete = (id: string) => {
    toast({
      title: "Confirm Deletion",
      description: "This action cannot be undone.",
      variant: "destructive",
      action: (
        <Button
          variant="destructive"
          size="sm"
          onClick={() => handleDelete(id)}
        >
          Delete
        </Button>
      ),
    })
  }

  // Delete tool
  const handleDelete = async (id: string) => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/custom_feature/custom-features/${id}/`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Token ${Cookies.get("Token") || ""}`,
          },
        }
      )

      if (!res.ok) throw new Error("Failed to delete tool")

      toast({ title: "Deleted", description: "Tool removed successfully." })
      setRefreshKey((prev) => prev + 1)
    } catch (error) {
      console.error("Delete error:", error)
      toast({
        title: "Error",
        description: "Could not delete tool.",
        variant: "destructive",
      })
    }
  }

  const handleSuccess = () => {
    toast({
      title: "Success",
      description: editTool
        ? "Tool updated successfully."
        : "Tool created successfully.",
    })
    setShowDialog(false)
    setEditTool(null)
    setRefreshKey((prev) => prev + 1)
  }

  return (
    <div className="space-y-12 px-6 py-8">
      {/* Page Header */}
      <div className="text-center space-y-2">
        <h2 className="text-4xl font-extrabold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
          Tools
        </h2>
        <p className="text-slate-500">Manage, test, and configure your custom tools</p>
      </div>

      {/* Create Tool Button */}
      <div className="flex justify-center">
        <Button
          size="lg"
          className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-3 rounded-2xl shadow-lg hover:scale-105 transition-transform flex items-center gap-2"
          onClick={() => {
            setEditTool(null)
            setShowDialog(true)
          }}
        >
          <Plus className="w-5 h-5" /> Create Tool
        </Button>
      </div>

      {/* Tools Grid */}
      {loading ? (
        <div className="flex justify-center py-20">
          <Loader2 className="w-10 h-10 text-blue-600 animate-spin" />
        </div>
      ) : tools.length === 0 ? (
        <div className="text-center text-slate-500 italic py-20">
          No tools available. Create your first one!
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-start">
          {tools.map((tool) => (
            <Card
              key={tool.id}
              className="rounded-2xl shadow-md hover:shadow-xl transition-all border border-slate-200"
            >
              <CardHeader
                onClick={() => setExpanded(expanded === tool.id ? null : tool.id)}
                className="cursor-pointer"
              >
                <CardTitle className="flex items-center justify-between">
                  <span className="text-lg font-semibold">{tool.name}</span>
                  <div className="flex items-center gap-2">
                    <MethodBadge method={tool.method} />
                    {expanded === tool.id ? (
                      <ChevronUp className="w-4 h-4 text-slate-500" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-slate-500" />
                    )}
                  </div>
                </CardTitle>
                <CardDescription className="truncate text-slate-600">
                  {tool.description || "No description"}
                </CardDescription>
              </CardHeader>

              {/* Dropdown */}
              {expanded === tool.id && (
                <div className="px-6 pb-4">
                  <div className="border rounded-lg bg-slate-50 p-3">
                    <div className="space-y-4 text-sm">
                      <div className="flex items-center gap-2">
                        <Globe className="w-4 h-4 text-slate-500" />
                        <span className="truncate">{tool.url}</span>
                      </div>
                      <pre className="bg-slate-900 text-slate-100 p-3 rounded-lg text-xs overflow-x-auto max-h-60 overflow-y-auto">
                        {jsonPretty({
                          headers: tool.headers,
                          query: tool.query_template,
                          body: tool.body_template,
                          parameters: tool.parameters,
                          timeout: tool.timeout_ms,
                          speak_during_execution: tool.speak_during_execution,
                        })}
                      </pre>
                    </div>
                  </div>
                </div>
              )}

              <CardFooter className="flex justify-between gap-3">
                <Button
                  variant="outline"
                  size="sm"
                  className="flex-1"
                  onClick={() => setViewTool(tool)}
                >
                  <Eye className="w-4 h-4 mr-1" /> View
                </Button>
                <Button
                  variant="secondary"
                  size="sm"
                  className="flex-1"
                  onClick={() => {
                    setEditTool(tool)
                    setShowDialog(true)
                  }}
                >
                  <Pencil className="w-4 h-4 mr-1" /> Edit
                </Button>
                <Button
                  variant="destructive"
                  size="sm"
                  className="flex-1"
                  onClick={() => confirmDelete(tool.id)}
                >
                  <Trash2 className="w-4 h-4 mr-1" /> Delete
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}

      {/* Create / Edit Dialog */}
      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>
              {editTool ? "Edit Tool" : "Create Custom Tool"}
            </DialogTitle>
          </DialogHeader>
          <CustomToolsForm tool={editTool} onSuccess={handleSuccess} />
        </DialogContent>
      </Dialog>

      {/* View Dialog */}
    <Dialog open={!!viewTool} onOpenChange={() => setViewTool(null)}>
    <DialogContent className="max-w-3xl">
        <DialogHeader>
        <DialogTitle>Tool Preview: {viewTool?.name}</DialogTitle>
        </DialogHeader>
        {viewTool && (
        <div className="max-h-[70vh] overflow-y-auto">
            <pre className="bg-slate-900 text-slate-100 p-4 rounded-lg text-sm overflow-x-auto">
            {jsonPretty(viewTool)}
            </pre>
        </div>
        )}
    </DialogContent>
    </Dialog>

    </div>
  )
}
