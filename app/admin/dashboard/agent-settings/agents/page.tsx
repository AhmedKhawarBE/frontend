"use client"

import { useEffect, useState } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { useToast } from "@/hooks/use-toast"
import Cookies from "js-cookie"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Slider } from "@/components/ui/slider"

// shadcn searchable dropdown
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command"

// Separate model groups
const AVAILABLE_MODELS = {
  llm: ["gpt-4", "gpt-3.5-turbo", "claude-3", "llama-2-70b", "mistral-7b"],
  stt: ["whisper-1", "deepgram-stt"],
  tts: ["coqui-tts"],
}

export default function CompanyAgentsPage() {
  const [agents, setAgents] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedAgentId, setSelectedAgentId] = useState<number | null>(null)
  const [agentConfig, setAgentConfig] = useState<any>(null)
  const { toast } = useToast()
  const searchParams = useSearchParams()
  const router = useRouter()
  const companyId = searchParams.get("companyId")

  // Fetch agents (already includes configs)
  useEffect(() => {
    const fetchAgents = async () => {
      setLoading(true)
      const token = Cookies.get("adminToken")
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/agents/agents/`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Token ${token || ""}`,
            },
          }
        )
        const data = await res.json()
        let fetchedAgents: any[] = []

        if (Array.isArray(data)) fetchedAgents = data
        else if (Array.isArray(data.results)) fetchedAgents = data.results

        if (companyId) {
          fetchedAgents = fetchedAgents.filter(
            (a) => String(a.company) === String(companyId)
          )
        }

        setAgents(fetchedAgents)
      } catch (err) {
        console.error("Failed to fetch agents", err)
        toast({
          variant: "destructive",
          title: "Error",
          description: "Failed to load agents",
        })
      } finally {
        setLoading(false)
      }
    }
    if (companyId) fetchAgents()
  }, [companyId, toast])

  // When selecting an agent, grab its config
  const openConfig = (agent: any) => {
    setSelectedAgentId(agent.id)
    setAgentConfig(agent.agent_config || {})
  }

  // Update field value
  const handleChange = (path: string[], value: any) => {
    setAgentConfig((prev: any) => {
      const updated = { ...prev }
      let obj = updated
      for (let i = 0; i < path.length - 1; i++) {
        obj = obj[path[i]]
      }
      obj[path[path.length - 1]] = value
      return updated
    })
  }

  // Save config
  const handleSave = async () => {
    const token = Cookies.get("adminToken")
    if (!selectedAgentId) return
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/agents/agents/${selectedAgentId}/`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${token || ""}`,
          },
          body: JSON.stringify({ agent_config: agentConfig }),
        }
      )

      if (!res.ok) throw new Error("Failed to save agent config")

      toast({
        title: "Success",
        description: "Agent config saved successfully.",
      })
    } catch (err: any) {
      toast({ title: "Error", description: err.message })
    }
  }

  // Render dynamic form fields
  const renderField = (path: string[], key: string, value: any) => {
    const fullPath = [...path, key]

    // Handle model dropdown for llm, stt, tts
    if (key === "model" && ["llm", "stt", "tts"].includes(path[0])) {
      const category = path[0] as "llm" | "stt" | "tts"
      return (
        <div
          key={fullPath.join(".")}
          className="p-4 bg-white rounded-xl shadow-sm border space-y-2"
        >
          <Label className="block text-slate-700 font-semibold">{key}</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="w-full justify-between">
                {value || "Select a model"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[300px] p-0">
              <Command>
                <CommandInput placeholder="Search models..." />
                <CommandEmpty>No model found.</CommandEmpty>
                <CommandGroup>
                  {AVAILABLE_MODELS[category].map((m) => (
                    <CommandItem
                      key={m}
                      onSelect={() => handleChange(fullPath, m)}
                    >
                      {m}
                    </CommandItem>
                  ))}
                </CommandGroup>
              </Command>
            </PopoverContent>
          </Popover>
        </div>
      )
    }

    if (typeof value === "boolean") {
      return (
        <div
          key={fullPath.join(".")}
          className="flex items-center justify-between bg-slate-50 px-4 py-3 rounded-xl shadow-sm"
        >
          <Label className="text-slate-700 font-medium">{key}</Label>
          <Switch
            checked={value}
            onCheckedChange={(val) => handleChange(fullPath, val)}
          />
        </div>
      )
    }

    if (typeof value === "number") {
      return (
        <div
          key={fullPath.join(".")}
          className="p-4 bg-white rounded-xl shadow-sm border space-y-3"
        >
          <Label className="block text-slate-700 font-semibold">{key}</Label>
          <Slider
            value={[value]}
            min={0}
            max={100}
            step={0.1}
            onValueChange={(val) => handleChange(fullPath, val[0])}
            className="w-full"
          />
          <div className="text-right text-xs text-slate-500">
            Current: {value}
          </div>
        </div>
      )
    }

    if (typeof value === "string" || value === null) {
      return (
        <div
          key={fullPath.join(".")}
          className="p-4 bg-white rounded-xl shadow-sm border space-y-2"
        >
          <Label className="block text-slate-700 font-semibold">{key}</Label>
          <Input
            value={value || ""}
            placeholder="Enter value"
            className="border-slate-300 focus:border-blue-500 focus:ring-blue-500 rounded-lg"
            onChange={(e) => handleChange(fullPath, e.target.value)}
          />
        </div>
      )
    }

    if (typeof value === "object" && value !== null) {
      // Reorder: provider first if exists
      const entries = Object.entries(value)
      const reordered = [
        ...entries.filter(([subKey]) => subKey === "provider"),
        ...entries.filter(([subKey]) => subKey !== "provider"),
      ]

      return (
        <div
          key={fullPath.join(".")}
          className="p-6 bg-gradient-to-br from-slate-50 to-white border rounded-2xl shadow-md space-y-5"
        >
          <h4 className="text-lg font-semibold text-slate-800 tracking-tight capitalize">
            {key}
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {reordered.map(([subKey, subVal]) =>
              renderField(fullPath, subKey, subVal)
            )}
          </div>
        </div>
      )
    }


    return null
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-extrabold tracking-tight text-gray-900">
          Agents for Company #{companyId}
        </h1>
        <Button
          variant="ghost"
          className="hover:bg-gray-100 transition"
          onClick={() => router.push("/admin/dashboard/agent-settings")}
        >
          ← Back
        </Button>
      </div>

      {/* Loader */}
      {loading ? (
        <div className="flex justify-center items-center h-40">
          <div className="w-10 h-10 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : agents.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {agents.map((agent) => (
            <Card
              key={agent.id}
              className="group relative hover:shadow-2xl transition-all rounded-2xl"
            >
              <CardContent className="p-8 flex flex-col items-center space-y-4 text-center">
                {/* Avatar */}
                <div className="w-24 h-24 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full flex items-center justify-center text-white text-4xl shadow-lg">
                  🤖
                </div>

                {/* Name */}
                <h3 className="font-semibold text-lg text-gray-900">
                  {agent.name}
                </h3>

                {/* Status */}
                <p className="text-sm text-gray-500">
                  Status:{" "}
                  <span
                    className={
                      agent.status === "active"
                        ? "text-green-600 font-medium"
                        : "text-red-500 font-medium"
                    }
                  >
                    {agent.status || "unknown"}
                  </span>
                </p>

                {/* Configure Button */}
                <Dialog>
                  <DialogTrigger asChild>
                    <Button
                      variant="default"
                      size="sm"
                      className="opacity-0 group-hover:opacity-100 transition-all duration-300"
                      onClick={() => openConfig(agent)}
                    >
                      Configure
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                    <DialogHeader>
                      <DialogTitle>
                        ⚙️ Manage Config for {agent.name}
                      </DialogTitle>
                    </DialogHeader>

                    {!agentConfig ? (
                      <div className="flex justify-center items-center py-20">
                        <p className="text-slate-600 animate-pulse">
                          Loading configuration...
                        </p>
                      </div>
                    ) : (
                      <div className="space-y-8">
                        <Accordion
                          type="single"
                          collapsible
                          className="w-full space-y-6"
                        >
                          {Object.entries(agentConfig).map(([key, val]) => (
                            <AccordionItem
                              key={key}
                              value={key}
                              className="border rounded-2xl shadow-lg overflow-hidden backdrop-blur-sm bg-white/80"
                            >
                              <AccordionTrigger className="px-6 py-4 font-semibold text-slate-800 bg-gradient-to-r from-slate-100 to-slate-50 hover:from-indigo-50 hover:to-blue-50 transition-colors duration-200">
                                {key.toUpperCase()}
                              </AccordionTrigger>
                              <AccordionContent className="p-8 bg-gradient-to-br from-white via-slate-50 to-white space-y-8">
                                {renderField([], key, val)}
                              </AccordionContent>
                            </AccordionItem>
                          ))}
                        </Accordion>

                        <div className="flex justify-end pt-6">
                          <Button
                            className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-lg text-white px-10 py-3 text-sm font-semibold rounded-xl transition-all duration-200"
                            onClick={handleSave}
                          >
                            💾 Save All Changes
                          </Button>
                        </div>
                      </div>
                    )}
                  </DialogContent>
                </Dialog>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <p className="text-gray-500 italic text-center">
          No agents found for this company.
        </p>
      )}
    </div>
  )
}
