"use client"

import { useParams } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"

export default function ViewCompanyAgentSettings() {
  const params = useParams()
  const companyId = params.id

  const voiceprintSettings = {
    enabled: true,
    sensitivity: 75,
    language: "English",
    accent: "American",
    speed: 1.0,
    pitch: 1.0,
  }

  const voicePrompts = {
    greeting: "Hello! How can I assist you today?",
    fallback: "I'm sorry, I didn't understand that. Could you please rephrase?",
    goodbye: "Thank you for contacting us. Have a great day!",
    hold: "Please hold while I process your request.",
    transfer: "I'm transferring you to a specialist who can better assist you.",
  }

  const agentPrompts = {
    systemPrompt: "You are a helpful customer service agent. Be polite, professional, and concise in your responses.",
    personality: "Professional and friendly",
    responseStyle: "Conversational",
    maxTokens: 150,
    temperature: 0.7,
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Agent Settings</h2>
          <p className="text-gray-600 mt-1">View AI agent behavior and voice settings</p>
        </div>
        <Badge variant={voiceprintSettings.enabled ? "default" : "secondary"}>
          {voiceprintSettings.enabled ? "Voice Enabled" : "Voice Disabled"}
        </Badge>
      </div>

      <Tabs defaultValue="voiceprint" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="voiceprint">Voiceprint</TabsTrigger>
          <TabsTrigger value="voice-prompts">Voice Prompts</TabsTrigger>
          <TabsTrigger value="agent-prompts">Agent Prompts</TabsTrigger>
        </TabsList>

        <TabsContent value="voiceprint" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Voiceprint Configuration</CardTitle>
              <CardDescription>Voice recognition and synthesis settings</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium">Voiceprint Status</h4>
                  <p className="text-sm text-gray-600">Voice-based interactions</p>
                </div>
                <Badge variant={voiceprintSettings.enabled ? "default" : "secondary"}>
                  {voiceprintSettings.enabled ? "Enabled" : "Disabled"}
                </Badge>
              </div>

              {voiceprintSettings.enabled && (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <h4 className="font-medium">Language</h4>
                      <p className="text-gray-600">{voiceprintSettings.language}</p>
                    </div>

                    <div className="space-y-2">
                      <h4 className="font-medium">Accent</h4>
                      <p className="text-gray-600">{voiceprintSettings.accent}</p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <h4 className="font-medium">Voice Sensitivity</h4>
                        <span className="text-sm text-gray-600">{voiceprintSettings.sensitivity}%</span>
                      </div>
                      <Progress value={voiceprintSettings.sensitivity} className="w-full" />
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <h4 className="font-medium">Speech Speed</h4>
                        <span className="text-sm text-gray-600">{voiceprintSettings.speed}x</span>
                      </div>
                      <Progress value={voiceprintSettings.speed * 50} className="w-full" />
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <h4 className="font-medium">Voice Pitch</h4>
                        <span className="text-sm text-gray-600">{voiceprintSettings.pitch}x</span>
                      </div>
                      <Progress value={voiceprintSettings.pitch * 50} className="w-full" />
                    </div>
                  </div>
                </>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="voice-prompts" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Voice Prompts</CardTitle>
              <CardDescription>Voice responses for different scenarios</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div>
                  <h4 className="font-medium text-gray-700 mb-1">Greeting Message</h4>
                  <p className="text-gray-600 bg-gray-50 p-3 rounded-md">{voicePrompts.greeting}</p>
                </div>

                <div>
                  <h4 className="font-medium text-gray-700 mb-1">Fallback Message</h4>
                  <p className="text-gray-600 bg-gray-50 p-3 rounded-md">{voicePrompts.fallback}</p>
                </div>

                <div>
                  <h4 className="font-medium text-gray-700 mb-1">Goodbye Message</h4>
                  <p className="text-gray-600 bg-gray-50 p-3 rounded-md">{voicePrompts.goodbye}</p>
                </div>

                <div>
                  <h4 className="font-medium text-gray-700 mb-1">Hold Message</h4>
                  <p className="text-gray-600 bg-gray-50 p-3 rounded-md">{voicePrompts.hold}</p>
                </div>

                <div>
                  <h4 className="font-medium text-gray-700 mb-1">Transfer Message</h4>
                  <p className="text-gray-600 bg-gray-50 p-3 rounded-md">{voicePrompts.transfer}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="agent-prompts" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Agent Prompts</CardTitle>
              <CardDescription>AI agent behavior and response settings</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h4 className="font-medium text-gray-700 mb-2">System Prompt</h4>
                <p className="text-gray-600 bg-gray-50 p-3 rounded-md">{agentPrompts.systemPrompt}</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-medium text-gray-700 mb-1">Personality</h4>
                  <p className="text-gray-600">{agentPrompts.personality}</p>
                </div>

                <div>
                  <h4 className="font-medium text-gray-700 mb-1">Response Style</h4>
                  <p className="text-gray-600">{agentPrompts.responseStyle}</p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <h4 className="font-medium text-gray-700">Max Response Length</h4>
                    <span className="text-sm text-gray-600">{agentPrompts.maxTokens} tokens</span>
                  </div>
                  <Progress value={(agentPrompts.maxTokens / 500) * 100} className="w-full" />
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between">
                    <h4 className="font-medium text-gray-700">Creativity Level</h4>
                    <span className="text-sm text-gray-600">{agentPrompts.temperature}</span>
                  </div>
                  <Progress value={agentPrompts.temperature * 100} className="w-full" />
                  <p className="text-xs text-gray-500">
                    Lower values make responses more focused, higher values more creative
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
