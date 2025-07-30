// "use client"

// import { useState } from "react"
// import { Button } from "@/components/ui/button"
// import { Textarea } from "@/components/ui/textarea"
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
// import { Play, Square, ChevronUp, Copy, History, WrapText } from "lucide-react"
// import { Input } from "@/components/ui/input"

// const tabs = [
//   { id: "voiceprint", label: "Voiceprint" },
//   { id: "voice-prompts", label: "Voice Prompts" },
//   { id: "agent-prompts", label: "Agent Prompts" },
//   { id: "voice-settings", label: "Voice Settings" },
//   { id: "additional-settings", label: "Additional Settings" },
// ]

// // Voiceprint Tab
// function VoiceprintTab() {
//   return (
//     <div className="space-y-6">
//       <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
//         <p className="text-blue-800">
//           Here's where you can manage the voice sample for your AI agent. Please select a default sample or upload your
//           own!
//         </p>
//       </div>

//       <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
//         <p className="text-yellow-800">
//           <strong>Active Voice:</strong> Marissa - Friendly and Sociable - american/casual/young/female/conversational
//         </p>
//       </div>

//       <div className="space-y-4">
//         <h3 className="text-lg font-medium text-slate-800">Select Voice</h3>
//         <div className="flex items-center space-x-4">
//           <Select defaultValue="marissa">
//             <SelectTrigger className="flex-1">
//               <SelectValue />
//             </SelectTrigger>
//             <SelectContent>
//               <SelectItem value="marissa">
//                 Marissa - Friendly and Sociable - american/casual/young/female/conversational
//               </SelectItem>
//             </SelectContent>
//           </Select>
//           <Button size="icon" variant="outline">
//             <Play className="w-4 h-4" />
//           </Button>
//           <Button size="icon" variant="outline">
//             <Square className="w-4 h-4" />
//           </Button>
//           <Button className="bg-teal-600 hover:bg-teal-700 text-white">Activate</Button>
//         </div>
//       </div>

//       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//         {/* Upload Voice Sample */}
//         <div className="space-y-4">
//           <h3 className="text-lg font-medium text-slate-800">Upload a Voice Sample</h3>
//           <div className="border-2 border-dashed border-slate-300 rounded-lg p-8 text-center">
//             <div className="space-y-4">
//               <div className="text-slate-400">
//                 <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth={2}
//                     d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
//                   />
//                 </svg>
//               </div>
//               <div>
//                 <p className="text-slate-600">
//                   Drag & drop files or <span className="text-blue-600 underline cursor-pointer">Browse</span>
//                 </p>
//                 <p className="text-sm text-slate-500 mt-2">Suggested format: Mp3. Maximum duration: 5 minute</p>
//               </div>
//             </div>
//           </div>
//           <Button className="w-full bg-slate-500 hover:bg-slate-600 text-white">Upload</Button>
//         </div>

//         {/* Create Voice Snippet */}
//         <div className="space-y-4">
//           <h3 className="text-lg font-medium text-slate-800">Create Voice Snippet</h3>
//           <p className="text-slate-600">Generate an example sound file with the selected voice.</p>
//           <Textarea placeholder="Type text to say..." className="min-h-[200px]" />
//           <Button className="w-full bg-slate-500 hover:bg-slate-600 text-white">Submit</Button>
//         </div>
//       </div>
//     </div>
//   )
// }

// // Voice Prompts Tab
// function VoicePromptsTab() {
//   const [expandedSections, setExpandedSections] = useState<string[]>(["welcome", "processing"])

//   const toggleSection = (section: string) => {
//     setExpandedSections((prev) => (prev.includes(section) ? prev.filter((s) => s !== section) : [...prev, section]))
//   }

//   return (
//     <div className="space-y-6">
//       <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
//         <p className="text-blue-800">
//           When your agent interacts with a caller, we have some standard phrases that we utilize throughout the
//           conversation. You can change these here.
//         </p>
//       </div>

//       <div className="space-y-4">
//         <h2 className="text-xl font-medium text-slate-800">Manage Voice Phrases</h2>

//         {/* Welcome Phrase */}
//         <div className="bg-white border border-slate-200 rounded-lg">
//           <div className="p-4 border-b border-slate-200 flex items-center justify-between">
//             <div>
//               <h3 className="font-medium text-slate-800">Welcome Phrase</h3>
//               <p className="text-sm text-slate-600">The greeting your agent uses when it answers a call.</p>
//             </div>
//             <div className="flex items-center space-x-2">
//               <Button size="icon" variant="outline">
//                 <Play className="w-4 h-4" />
//               </Button>
//               <Button size="icon" variant="outline">
//                 <Square className="w-4 h-4" />
//               </Button>
//               <Button size="icon" variant="outline" onClick={() => toggleSection("welcome")}>
//                 <ChevronUp
//                   className={`w-4 h-4 transition-transform ${expandedSections.includes("welcome") ? "rotate-180" : ""}`}
//                 />
//               </Button>
//             </div>
//           </div>
//           <div className="p-4">
//             <Textarea defaultValue="This is a virtual agent." className="min-h-[100px]" />
//           </div>
//         </div>

//         {/* Processing Phrases */}
//         <div className="bg-white border border-slate-200 rounded-lg">
//           <div className="p-4 border-b border-slate-200 flex items-center justify-between">
//             <div>
//               <h3 className="font-medium text-slate-800">Processing Phrases</h3>
//               <p className="text-sm text-slate-600">
//                 What the agent says when it's processing something the caller has said. It will choose one at random
//                 from the list.
//               </p>
//             </div>
//             <div className="flex items-center space-x-2">
//               <Button size="icon" variant="outline">
//                 <Play className="w-4 h-4" />
//               </Button>
//               <Button size="icon" variant="outline">
//                 <Square className="w-4 h-4" />
//               </Button>
//               <Button size="icon" variant="outline" onClick={() => toggleSection("processing")}>
//                 <ChevronUp
//                   className={`w-4 h-4 transition-transform ${expandedSections.includes("processing") ? "rotate-180" : ""}`}
//                 />
//               </Button>
//             </div>
//           </div>
//           <div className="p-4 space-y-4">
//             <Textarea
//               defaultValue={`Okay, give me just a minute.
// Great, just one second.
// Hold on a moment.`}
//               className="min-h-[120px]"
//             />
//             <Button variant="outline">Reset to default</Button>
//           </div>
//         </div>

//         {/* Voicemail Phrase */}
//         <div className="bg-white border border-slate-200 rounded-lg">
//           <div className="p-4 border-b border-slate-200 flex items-center justify-between">
//             <div>
//               <h3 className="font-medium text-slate-800">Voicemail Phrase</h3>
//               <p className="text-sm text-slate-600">
//                 The agent will say this after the caller has asked to leave a voicemail.
//               </p>
//             </div>
//             <div className="flex items-center space-x-2">
//               <Button size="icon" variant="outline">
//                 <Play className="w-4 h-4" />
//               </Button>
//               <Button size="icon" variant="outline">
//                 <Square className="w-4 h-4" />
//               </Button>
//               <Button size="icon" variant="outline" onClick={() => toggleSection("voicemail")}>
//                 <ChevronUp
//                   className={`w-4 h-4 transition-transform ${expandedSections.includes("voicemail") ? "rotate-180" : ""}`}
//                 />
//               </Button>
//             </div>
//           </div>
//           <div className="p-4">
//             <Textarea
//               defaultValue="Okay, please start your voicemail, and hangup when you're done."
//               className="min-h-[100px]"
//             />
//           </div>
//         </div>

//         {/* Extended Silence Phrase */}
//         <div className="bg-white border border-slate-200 rounded-lg">
//           <div className="p-4 border-b border-slate-200 flex items-center justify-between">
//             <div>
//               <h3 className="font-medium text-slate-800">Extended Silence Phrase</h3>
//               <p className="text-sm text-slate-600">The agent will say this after 15 seconds of silence.</p>
//             </div>
//             <div className="flex items-center space-x-2">
//               <Button size="icon" variant="outline">
//                 <Play className="w-4 h-4" />
//               </Button>
//               <Button size="icon" variant="outline">
//                 <Square className="w-4 h-4" />
//               </Button>
//               <Button size="icon" variant="outline" onClick={() => toggleSection("silence")}>
//                 <ChevronUp
//                   className={`w-4 h-4 transition-transform ${expandedSections.includes("silence") ? "rotate-180" : ""}`}
//                 />
//               </Button>
//             </div>
//           </div>
//           <div className="p-4">
//             <Textarea defaultValue="Are you still there? Maybe I missed what you said." className="min-h-[100px]" />
//           </div>
//         </div>

//         <div className="flex justify-between">
//           <Button variant="outline">Reset to default</Button>
//           <Button className="bg-teal-600 hover:bg-teal-700 text-white">Save</Button>
//         </div>
//       </div>
//     </div>
//   )
// }

// // Agent Prompts Tab
// function AgentPromptsTab() {
//   const [agentPrompt, setAgentPrompt] =
//     useState(`You are a virtual agent having a spoken conversation. This is who you are: Real estate agent who does resale and precon

// Ask them what kind of help they need, keeping your goal below in mind.

// GOAL: Your goal in this call is to collect the following information: Close/followup leads

// This is a spoken conversation. You should ask questions one at a time. You are having a colloquial, friendly conversation.`)

//   return (
//     <div className="space-y-6">
//       <h2 className="text-xl font-medium text-slate-800">Manage Agent Prompt</h2>

//       <div className="space-y-4">
//         <h3 className="text-lg font-medium text-slate-800">Agent Content Prompt</h3>
//         <p className="text-slate-600">
//           Let's give your virtual agent some personality. You'll tell the virtual agent how you want it to respond and
//           with what additional context.
//         </p>

//         <div className="bg-white border border-slate-200 rounded-lg">
//           <div className="flex items-center justify-between p-3 border-b border-slate-200">
//             <div className="flex items-center space-x-4">
//               <Button variant="outline" size="sm">
//                 <WrapText className="w-4 h-4 mr-2" />
//                 WORD WRAP: OFF
//               </Button>
//               <Button variant="outline" size="sm">
//                 <Copy className="w-4 h-4 mr-2" />
//                 COPY
//               </Button>
//               <Button variant="outline" size="sm">
//                 <History className="w-4 h-4 mr-2" />
//                 HISTORY
//               </Button>
//             </div>
//             <div className="text-sm text-slate-500">7 lines, 423 characters</div>
//           </div>

//           <div className="relative">
//             <div className="absolute left-0 top-0 bottom-0 w-12 bg-slate-50 border-r border-slate-200 flex flex-col text-xs text-slate-400 pt-4">
//               {Array.from({ length: 20 }, (_, i) => (
//                 <div key={i + 1} className="h-6 flex items-center justify-center">
//                   {i + 1}
//                 </div>
//               ))}
//             </div>
//             <Textarea
//               value={agentPrompt}
//               onChange={(e) => setAgentPrompt(e.target.value)}
//               className="pl-14 min-h-[400px] border-0 resize-none focus:ring-0 font-mono text-sm"
//               style={{ lineHeight: "1.5rem" }}
//             />
//           </div>
//         </div>

//         <div className="flex justify-end">
//           <Button className="bg-green-600 hover:bg-green-700 text-white px-8">SAVE ALL</Button>
//         </div>
//       </div>

//       {/* Footer */}
//       <div className="mt-16 pt-8 border-t border-slate-200">
//         <div className="text-center space-y-2">
//           <div className="text-sm text-slate-500">© 2025 All rights reserved.</div>
//           <div className="text-xs text-slate-400">Browser Session ID: f4f2fc7d-7161-4d53-ae5f-6bd14515f55b 🔒</div>
//         </div>
//       </div>
//     </div>
//   )
// }

// // Voice Settings Tab
// function VoiceSettingsTab() {
//   const [stability, setStability] = useState(50)
//   const [clarity, setClarity] = useState(75)
//   const [styleExaggeration, setStyleExaggeration] = useState(0)
//   const [speakerBoost, setSpeakerBoost] = useState(true)

//   return (
//     <div className="space-y-8">
//       <div className="space-y-4">
//         <h2 className="text-2xl font-medium text-slate-800 text-center">Manage Voice Generation Settings</h2>

//         <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
//           <p className="text-blue-800">
//             Here you can tweak the setting of voice generation. If you're not happy with how your agent sounds, feel
//             free to adjust settings and see how it changes.
//           </p>
//           <p className="text-blue-800 mt-2">Remember that the voice print quality will impact the voice the most.</p>
//         </div>
//       </div>

//       {/* Model Selection */}
//       <div className="space-y-4">
//         <div className="flex items-center space-x-2">
//           <h3 className="text-lg font-medium text-slate-800">Model</h3>
//           <div className="w-5 h-5 bg-slate-400 rounded-full flex items-center justify-center">
//             <span className="text-white text-xs">i</span>
//           </div>
//         </div>
//         <Select defaultValue="multilingual-v2">
//           <SelectTrigger className="w-64">
//             <SelectValue />
//           </SelectTrigger>
//           <SelectContent>
//             <SelectItem value="multilingual-v2">Multilingual V2</SelectItem>
//           </SelectContent>
//         </Select>
//       </div>

//       {/* Stability Slider */}
//       <div className="space-y-4">
//         <h3 className="text-lg font-medium text-slate-800">Stability</h3>
//         <div className="space-y-2">
//           <div className="text-sm text-slate-600">{stability}%</div>
//           <div className="relative">
//             <input
//               type="range"
//               min="0"
//               max="100"
//               value={stability}
//               onChange={(e) => setStability(Number(e.target.value))}
//               className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
//             />
//           </div>
//           <div className="flex justify-between text-sm text-slate-600">
//             <div className="flex items-center space-x-1">
//               <span>More variable</span>
//               <div className="w-4 h-4 bg-slate-400 rounded-full flex items-center justify-center">
//                 <span className="text-white text-xs">i</span>
//               </div>
//             </div>
//             <div className="flex items-center space-x-1">
//               <span>More stable</span>
//               <div className="w-4 h-4 bg-slate-400 rounded-full flex items-center justify-center">
//                 <span className="text-white text-xs">i</span>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Clarity + Similarity Enhancement Slider */}
//       <div className="space-y-4">
//         <h3 className="text-lg font-medium text-slate-800">Clarity + Similarity Enhancement</h3>
//         <div className="space-y-2">
//           <div className="text-sm text-slate-600">{clarity}%</div>
//           <div className="relative">
//             <input
//               type="range"
//               min="0"
//               max="100"
//               value={clarity}
//               onChange={(e) => setClarity(Number(e.target.value))}
//               className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
//             />
//           </div>
//           <div className="flex justify-between text-sm text-slate-600">
//             <div className="flex items-center space-x-1">
//               <span>Low</span>
//               <div className="w-4 h-4 bg-slate-400 rounded-full flex items-center justify-center">
//                 <span className="text-white text-xs">i</span>
//               </div>
//             </div>
//             <div className="flex items-center space-x-1">
//               <span>High</span>
//               <div className="w-4 h-4 bg-slate-400 rounded-full flex items-center justify-center">
//                 <span className="text-white text-xs">i</span>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Style Exaggeration Slider */}
//       <div className="space-y-4">
//         <h3 className="text-lg font-medium text-slate-800">Style Exaggeration</h3>
//         <div className="space-y-2">
//           <div className="text-sm text-slate-600">{styleExaggeration}%</div>
//           <div className="relative">
//             <input
//               type="range"
//               min="0"
//               max="100"
//               value={styleExaggeration}
//               onChange={(e) => setStyleExaggeration(Number(e.target.value))}
//               className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
//             />
//           </div>
//           <div className="flex justify-between text-sm text-slate-600">
//             <span>None (Fastest)</span>
//             <div className="flex items-center space-x-1">
//               <span>Exaggerated</span>
//               <div className="w-4 h-4 bg-slate-400 rounded-full flex items-center justify-center">
//                 <span className="text-white text-xs">i</span>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Speaker Boost */}
//       <div className="space-y-4">
//         <div className="flex items-center space-x-3">
//           <input
//             type="checkbox"
//             id="speaker-boost"
//             checked={speakerBoost}
//             onChange={(e) => setSpeakerBoost(e.target.checked)}
//             className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
//           />
//           <label htmlFor="speaker-boost" className="text-slate-800">
//             Speaker Boost
//           </label>
//           <div className="w-4 h-4 bg-slate-400 rounded-full flex items-center justify-center">
//             <span className="text-white text-xs">i</span>
//           </div>
//         </div>
//       </div>

//       {/* Action Buttons */}
//       <div className="flex justify-between items-center pt-6">
//         <Button variant="outline" className="text-blue-600 border-blue-600 bg-transparent">
//           RESET TO DEFAULT
//         </Button>
//         <div className="flex space-x-4">
//           <Button className="bg-blue-600 hover:bg-blue-700 text-white px-8">SAVE CHANGES</Button>
//           <Button variant="outline" className="text-blue-600 border-blue-600 bg-transparent">
//             PLAY TEST SAMPLE
//           </Button>
//         </div>
//       </div>

//       {/* Footer */}
//       <div className="mt-16 pt-8 border-t border-slate-200">
//         <div className="text-center space-y-2">
//           <div className="text-sm text-slate-500">© 2025 All rights reserved.</div>
//           <div className="text-xs text-slate-400">Browser Session ID: f4f2fc7d-7161-4d53-ae5f-6bd14515f55b 🔒</div>
//         </div>
//       </div>
//     </div>
//   )
// }

// // Additional Settings Tab
// function AdditionalSettingsTab() {
//   const [expandedSections, setExpandedSections] = useState<string[]>([
//     "location",
//     "business-hours",
//     "agent-settings",
//     "outbound-call",
//     "post-call",
//   ])
//   const [businessClosed, setBusinessClosed] = useState(false)
//   const [removeBusiness, setRemoveBusiness] = useState(false)
//   const [alwaysSendText, setAlwaysSendText] = useState(true)
//   const [enableTemplate, setEnableTemplate] = useState(false)
//   const [autogenerate, setAutogenerate] = useState(true)
//   const [enableInterruptions, setEnableInterruptions] = useState(false)
//   const [enableSMS, setEnableSMS] = useState(false)
//   const [enableHearDTMF, setEnableHearDTMF] = useState(false)
//   const [enableSendDTMF, setEnableSendDTMF] = useState(false)
//   const [allowContentSearch, setAllowContentSearch] = useState(false)
//   const [disableVoicemail, setDisableVoicemail] = useState(true)
//   const [disableSMSAgent, setDisableSMSAgent] = useState(true)
//   const [enableAnsweringMachine, setEnableAnsweringMachine] = useState(false)

//   const toggleSection = (section: string) => {
//     setExpandedSections((prev) => (prev.includes(section) ? prev.filter((s) => s !== section) : [...prev, section]))
//   }

//   return (
//     <div className="space-y-6">
//       <h2 className="text-2xl font-medium text-slate-800 text-center">Additional Settings</h2>

//       {/* Location Settings */}
//       <div className="bg-white border border-slate-200 rounded-lg">
//         <div className="p-4 border-b border-slate-200 flex items-center justify-between">
//           <h3 className="text-blue-600 font-medium">Location settings</h3>
//           <Button size="icon" variant="outline" onClick={() => toggleSection("location")}>
//             <ChevronUp
//               className={`w-4 h-4 transition-transform ${expandedSections.includes("location") ? "rotate-180" : ""}`}
//             />
//           </Button>
//         </div>
//         {expandedSections.includes("location") && (
//           <div className="p-4 space-y-4">
//             <div className="space-y-2">
//               <label className="text-slate-700 font-medium">Agent Locale*</label>
//               <Select defaultValue="english-us">
//                 <SelectTrigger>
//                   <SelectValue />
//                 </SelectTrigger>
//                 <SelectContent>
//                   <SelectItem value="english-us">English (United States)</SelectItem>
//                 </SelectContent>
//               </Select>
//             </div>

//             <div className="space-y-2">
//               <label className="text-slate-700 font-medium">Agent Location (street address or city & state)</label>
//               <Input placeholder="" />
//             </div>

//             <div className="space-y-2">
//               <label className="text-slate-700 font-medium">Agent Timezone (automatically set by Agent Location)</label>
//               <Select defaultValue="utc">
//                 <SelectTrigger>
//                   <SelectValue />
//                 </SelectTrigger>
//                 <SelectContent>
//                   <SelectItem value="utc">Etc/UTC: Coordinated Universal Time</SelectItem>
//                 </SelectContent>
//               </Select>
//             </div>
//           </div>
//         )}
//       </div>

//       {/* Business Hours */}
//       <div className="bg-white border border-slate-200 rounded-lg">
//         <div className="p-4 border-b border-slate-200 flex items-center justify-between">
//           <h3 className="text-blue-600 font-medium">Business Hours</h3>
//           <Button size="icon" variant="outline" onClick={() => toggleSection("business-hours")}>
//             <ChevronUp
//               className={`w-4 h-4 transition-transform ${expandedSections.includes("business-hours") ? "rotate-180" : ""}`}
//             />
//           </Button>
//         </div>
//         {expandedSections.includes("business-hours") && (
//           <div className="p-4 space-y-4">
//             <div className="space-y-2">
//               <label className="text-slate-700 font-medium">Current Generated business hours.</label>
//               <Textarea className="min-h-[120px]" />
//             </div>

//             <p className="text-slate-600 text-sm">This represents the agent's understanding of your business hours</p>

//             <div className="space-y-2">
//               <label className="text-slate-700 font-medium">Business Hours Source</label>
//               <Select defaultValue="plain-text">
//                 <SelectTrigger>
//                   <SelectValue />
//                 </SelectTrigger>
//                 <SelectContent>
//                   <SelectItem value="plain-text">Plain Text</SelectItem>
//                 </SelectContent>
//               </Select>
//             </div>

//             <div className="space-y-2">
//               <label className="text-slate-700 font-medium">Business Hours Description</label>
//               <Textarea className="min-h-[120px]" />
//             </div>

//             <p className="text-slate-600 text-sm">Holidays/Special Dates should be specified with the full date.</p>

//             <div className="flex items-center space-x-3">
//               <input
//                 type="checkbox"
//                 id="business-closed"
//                 checked={businessClosed}
//                 onChange={(e) => setBusinessClosed(e.target.checked)}
//                 className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
//               />
//               <label htmlFor="business-closed" className="text-slate-700">
//                 Toggle to enforce business as closed.
//               </label>
//             </div>

//             <div className="space-y-2">
//               <label className="text-slate-700 font-medium">Days business is closed.</label>
//               <Input defaultValue="0" />
//               <p className="text-slate-600 text-sm">If set to zero, a manual update is required to re-open.</p>
//             </div>

//             <div className="flex items-center space-x-3">
//               <input
//                 type="checkbox"
//                 id="remove-business"
//                 checked={removeBusiness}
//                 onChange={(e) => setRemoveBusiness(e.target.checked)}
//                 className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
//               />
//               <label htmlFor="remove-business" className="text-slate-700">
//                 Remove Business Hours
//               </label>
//             </div>
//             <p className="text-slate-600 text-sm">Removes all business hour data from agent and sets to default.</p>
//           </div>
//         )}
//       </div>

//       {/* Agent Settings */}
//       <div className="bg-white border border-slate-200 rounded-lg">
//         <div className="p-4 border-b border-slate-200 flex items-center justify-between">
//           <h3 className="text-blue-600 font-medium">Agent Settings</h3>
//           <Button size="icon" variant="outline" onClick={() => toggleSection("agent-settings")}>
//             <ChevronUp
//               className={`w-4 h-4 transition-transform ${expandedSections.includes("agent-settings") ? "rotate-180" : ""}`}
//             />
//           </Button>
//         </div>
//         {expandedSections.includes("agent-settings") && (
//           <div className="p-4 space-y-4">
//             <div className="space-y-2">
//               <label className="text-slate-700 font-medium">Pronunciation Dictionaries</label>
//               <Input />
//             </div>

//             <div className="space-y-2">
//               <label className="text-slate-700 font-medium">Initial Trigger</label>
//               <Input defaultValue="Start the goal" />
//               <p className="text-slate-600 text-sm">
//                 Instead of waiting for first response, this can trigger a specific task for each conversation.
//               </p>
//             </div>

//             <div className="flex items-center space-x-3">
//               <input
//                 type="checkbox"
//                 id="always-send-text"
//                 checked={alwaysSendText}
//                 onChange={(e) => setAlwaysSendText(e.target.checked)}
//                 className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
//               />
//               <label htmlFor="always-send-text" className="text-slate-700">
//                 Always send opening text
//               </label>
//             </div>
//             <p className="text-slate-600 text-sm">
//               If unchecked, opening texts still be triggered by 'openingsms:true' in API metadata. If no message
//               provided below, no text will be sent.
//             </p>

//             <div className="space-y-2">
//               <label className="text-slate-700 font-medium">Text message to send when call is answered.</label>
//               <Textarea className="min-h-[80px]" />
//             </div>

//             <div className="flex items-center space-x-3">
//               <input
//                 type="checkbox"
//                 id="enable-template"
//                 checked={enableTemplate}
//                 onChange={(e) => setEnableTemplate(e.target.checked)}
//                 className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
//               />
//               <label htmlFor="enable-template" className="text-slate-700">
//                 Enable Template Library
//               </label>
//             </div>

//             <div className="flex items-center space-x-3">
//               <input
//                 type="checkbox"
//                 id="autogenerate"
//                 checked={autogenerate}
//                 onChange={(e) => setAutogenerate(e.target.checked)}
//                 className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
//               />
//               <label htmlFor="autogenerate" className="text-slate-700">
//                 Autogenerate next action phrases
//               </label>
//             </div>
//             <p className="text-slate-600 text-sm">
//               The Agent will naturally generate phrases to continue the conversation.
//             </p>

//             <div className="flex items-center space-x-3">
//               <input
//                 type="checkbox"
//                 id="enable-interruptions"
//                 checked={enableInterruptions}
//                 onChange={(e) => setEnableInterruptions(e.target.checked)}
//                 className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
//               />
//               <label htmlFor="enable-interruptions" className="text-slate-700">
//                 Enable Interruptions.
//               </label>
//             </div>
//             <p className="text-slate-600 text-sm">Allow the agent to be interrupted mid-sentence.</p>

//             <div className="flex items-center space-x-3">
//               <input
//                 type="checkbox"
//                 id="enable-sms"
//                 checked={enableSMS}
//                 onChange={(e) => setEnableSMS(e.target.checked)}
//                 className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
//               />
//               <label htmlFor="enable-sms" className="text-slate-700">
//                 Enable SMS Channel During Calls
//               </label>
//             </div>
//             <p className="text-slate-600 text-sm">Allow agent to receive and read text messages during the call.</p>

//             <div className="flex items-center space-x-3">
//               <input
//                 type="checkbox"
//                 id="enable-hear-dtmf"
//                 checked={enableHearDTMF}
//                 onChange={(e) => setEnableHearDTMF(e.target.checked)}
//                 className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
//               />
//               <label htmlFor="enable-hear-dtmf" className="text-slate-700">
//                 Enable Agent to hear DTMF (dial tones)
//               </label>
//             </div>
//             <p className="text-slate-600 text-sm">
//               DTMF tones will be sent to the Agent. This is not necessary for tasks that are triggered by DTMF
//             </p>

//             <div className="flex items-center space-x-3">
//               <input
//                 type="checkbox"
//                 id="enable-send-dtmf"
//                 checked={enableSendDTMF}
//                 onChange={(e) => setEnableSendDTMF(e.target.checked)}
//                 className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
//               />
//               <label htmlFor="enable-send-dtmf" className="text-slate-700">
//                 Enable Agent to send DTMF (dial tones)
//               </label>
//             </div>
//             <p className="text-slate-600 text-sm">
//               Agent can send DTMF tones when contextually relevant, i.e. responding to an answering machine.
//             </p>

//             <div className="flex items-center space-x-3">
//               <input
//                 type="checkbox"
//                 id="allow-content-search"
//                 checked={allowContentSearch}
//                 onChange={(e) => setAllowContentSearch(e.target.checked)}
//                 className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
//               />
//               <label htmlFor="allow-content-search" className="text-slate-700">
//                 Allow Agent to independently search Content Library
//               </label>
//             </div>
//             <p className="text-slate-600 text-sm">
//               If checked, the Agent can search content library when deemed necessary. If unchecked, content library will
//               be searched for every response.
//             </p>

//             <div className="flex items-center space-x-3">
//               <input
//                 type="checkbox"
//                 id="disable-voicemail"
//                 checked={disableVoicemail}
//                 onChange={(e) => setDisableVoicemail(e.target.checked)}
//                 className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
//               />
//               <label htmlFor="disable-voicemail" className="text-slate-700">
//                 Disable voicemail request detection.
//               </label>
//             </div>
//             <p className="text-slate-600 text-sm">Prevent the agent from automatically offering to take a voicemail</p>

//             <div className="flex items-center space-x-3">
//               <input
//                 type="checkbox"
//                 id="disable-sms-agent"
//                 checked={disableSMSAgent}
//                 onChange={(e) => setDisableSMSAgent(e.target.checked)}
//                 className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
//               />
//               <label htmlFor="disable-sms-agent" className="text-slate-700">
//                 Disable SMS.
//               </label>
//             </div>
//             <p className="text-slate-600 text-sm">Prevent the agent from being able to send SMS messages.</p>
//           </div>
//         )}
//       </div>

//       {/* Outbound Call Settings */}
//       <div className="bg-white border border-slate-200 rounded-lg">
//         <div className="p-4 border-b border-slate-200 flex items-center justify-between">
//           <h3 className="text-blue-600 font-medium">Outbound Call Settings</h3>
//           <Button size="icon" variant="outline" onClick={() => toggleSection("outbound-call")}>
//             <ChevronUp
//               className={`w-4 h-4 transition-transform ${expandedSections.includes("outbound-call") ? "rotate-180" : ""}`}
//             />
//           </Button>
//         </div>
//         {expandedSections.includes("outbound-call") && (
//           <div className="p-4 space-y-4">
//             <div className="flex items-center space-x-3">
//               <input
//                 type="checkbox"
//                 id="enable-answering-machine"
//                 checked={enableAnsweringMachine}
//                 onChange={(e) => setEnableAnsweringMachine(e.target.checked)}
//                 className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
//               />
//               <label htmlFor="enable-answering-machine" className="text-slate-700">
//                 Enable answering machine detection
//               </label>
//             </div>

//             <div className="space-y-2">
//               <label className="text-slate-700 font-medium">Greeting Delay</label>
//               <Input defaultValue="0" />
//               <p className="text-slate-600 text-sm">
//                 The delay, in seconds, the agent will wait before saying its Hello Prompt. Set to 0 to allow agent to
//                 determine if human or machine answered.
//               </p>
//             </div>
//           </div>
//         )}
//       </div>

//       {/* Post Call Settings */}
//       <div className="bg-white border border-slate-200 rounded-lg">
//         <div className="p-4 border-b border-slate-200 flex items-center justify-between">
//           <h3 className="text-blue-600 font-medium">Post Call Settings</h3>
//           <Button size="icon" variant="outline" onClick={() => toggleSection("post-call")}>
//             <ChevronUp
//               className={`w-4 h-4 transition-transform ${expandedSections.includes("post-call") ? "rotate-180" : ""}`}
//             />
//           </Button>
//         </div>
//         {expandedSections.includes("post-call") && (
//           <div className="p-4">
//             <p className="text-slate-600">Post call settings will be configured here.</p>
//           </div>
//         )}
//       </div>
//     </div>
//   )
// }

// export default function AgentSettingsPage() {
//   const [activeTab, setActiveTab] = useState("voiceprint")

//   const renderTabContent = () => {
//     switch (activeTab) {
//       case "voiceprint":
//         return <VoiceprintTab />
//       case "voice-prompts":
//         return <VoicePromptsTab />
//       case "agent-prompts":
//         return <AgentPromptsTab />
//       case "voice-settings":
//         return <VoiceSettingsTab />
//       case "additional-settings":
//         return <AdditionalSettingsTab />
//       default:
//         return <VoiceprintTab />
//     }
//   }

//   return (
//     <div className="p-6 space-y-6">
//       {/* Header */}
//       <div className="flex items-center justify-between">
//         <h1 className="text-2xl font-semibold text-slate-800">Agent Settings</h1>
//       </div>

//       {/* Tabs */}
//       <div className="border-b border-slate-200">
//         <div className="flex space-x-8">
//           {tabs.map((tab) => (
//             <button
//               key={tab.id}
//               onClick={() => setActiveTab(tab.id)}
//               className={`pb-4 px-1 text-sm font-medium border-b-2 transition-colors ${
//                 tab.id === activeTab
//                   ? "border-blue-500 text-blue-600"
//                   : "border-transparent text-slate-500 hover:text-slate-700"
//               }`}
//             >
//               {tab.label}
//             </button>
//           ))}
//         </div>
//       </div>

//       {/* Tab Content */}
//       {renderTabContent()}
//     </div>
//   )
// }


"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Play, Square, ChevronUp, Copy, History, WrapText, Plus, Upload, FileText, Trash2 } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Cookies from "js-cookie"
import { useToast } from "@/hooks/use-toast"
import { UploadCloud, Loader2 } from "lucide-react"




const tabs = [
  { id: "voiceprint", label: "Voiceprint" },
  { id: "voice-prompts", label: "Voice Prompts" },
  { id: "agent-prompts", label: "Agent Prompts" },
  { id: "voice-settings", label: "Voice Settings" },
  { id: "faq", label: "FAQ" },
]

// Agent Selection Component
function AgentSelection({ onSelectAgent }: { onSelectAgent: (agent: any) => void }) {
  const [agents, setAgents] = useState([])
  const [loading, setLoading] = useState(true)
  const { toast } = useToast()

  useEffect(() => {
    fetchAgents()
  }, [])

  const fetchAgents = async () => {
    try {
      const response = await fetch("http://127.0.0.1:8000/api/agents/agents/", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${Cookies.get("Token") || ""}`,
        },
      })
      const data = await response.json()
      const enriched = Array.isArray(data)
        ? data.map((agent) => ({
            id: agent.id,
            name: agent.name,
            status: agent.status === "Active" || agent.status === "active" ? "Active" : "Inactive",
            persona: agent.persona || "Unknown",
            description: agent.description || "No description available",
          }))
        : []
      setAgents(enriched)
    } catch (error) {
      console.error("Error fetching agents:", error)
      toast({
        title: "Error",
        description: "Failed to fetch agents",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-slate-600">Loading agents...</div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="text-center space-y-4">
        <h2 className="text-2xl font-semibold text-slate-800">Select an Agent</h2>
        <p className="text-slate-600">Choose an agent to configure its settings</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-6xl mx-auto">
        {agents.map((agent: any) => (
          <Card
            key={agent.id}
            className="cursor-pointer hover:shadow-lg transition-shadow"
            onClick={() => onSelectAgent(agent)}
          >
            <CardHeader>
              <CardTitle className="text-lg">{agent.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-slate-600 text-sm mb-4">{agent.description || "No description available"}</p>
              <div className="flex items-center justify-between text-sm text-slate-500">
                <span>Status: {agent.status || "Active"}</span>
                <Button size="sm">Configure</Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

// FAQ Tab Component
// function FAQTab({ agentId }: { agentId: string }) {
//   const [faqs, setFaqs] = useState([])
//   const [documents, setDocuments] = useState([])
//   const [newQuestion, setNewQuestion] = useState("")
//   const [newAnswer, setNewAnswer] = useState("")
//   const [showAddForm, setShowAddForm] = useState(false)
//   const [loading, setLoading] = useState(true)

//   useEffect(() => {
//     fetchFAQs()
//     fetchDocuments()
//   }, [agentId])

//   const fetchFAQs = async () => {
//     try {
//       const response = await fetch(`/api/agents/${agentId}/faqs`)
//       const data = await response.json()
//       setFaqs(data)
//     } catch (error) {
//       console.error("Error fetching FAQs:", error)
//     }
//   }

//   const fetchDocuments = async () => {
//     try {
//       const response = await fetch(`/api/agents/${agentId}/documents`)
//       const data = await response.json()
//       setDocuments(data)
//     } catch (error) {
//       console.error("Error fetching documents:", error)
//     } finally {
//       setLoading(false)
//     }
//   }

//   const handleAddFAQ = async () => {
//     if (!newQuestion.trim() || !newAnswer.trim()) return

//     try {
//       const response = await fetch(`/api/agents/${agentId}/faqs`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           question: newQuestion,
//           answer: newAnswer,
//         }),
//       })

//       if (response.ok) {
//         setNewQuestion("")
//         setNewAnswer("")
//         setShowAddForm(false)
//         fetchFAQs()
//       }
//     } catch (error) {
//       console.error("Error adding FAQ:", error)
//     }
//   }

//   const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
//     const file = event.target.files?.[0]
//     if (!file) return

//     const formData = new FormData()
//     formData.append("document", file)

//     try {
//       const response = await fetch(`/api/agents/${agentId}/documents`, {
//         method: "POST",
//         body: formData,
//       })

//       if (response.ok) {
//         fetchDocuments()
//       }
//     } catch (error) {
//       console.error("Error uploading document:", error)
//     }
//   }

//   const handleDeleteFAQ = async (faqId: string) => {
//     try {
//       const response = await fetch(`/api/agents/${agentId}/faqs/${faqId}`, {
//         method: "DELETE",
//       })

//       if (response.ok) {
//         fetchFAQs()
//       }
//     } catch (error) {
//       console.error("Error deleting FAQ:", error)
//     }
//   }

//   const handleDeleteDocument = async (docId: string) => {
//     try {
//       const response = await fetch(`/api/agents/${agentId}/documents/${docId}`, {
//         method: "DELETE",
//       })

//       if (response.ok) {
//         fetchDocuments()
//       }
//     } catch (error) {
//       console.error("Error deleting document:", error)
//     }
//   }

//   if (loading) {
//     return (
//       <div className="flex items-center justify-center min-h-[400px]">
//         <div className="text-slate-600">Loading FAQ data...</div>
//       </div>
//     )
//   }

//   return (
//     <div className="space-y-6">
//       <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
//         <p className="text-blue-800">
//           Manage frequently asked questions for your agent. Upload documents containing FAQs or add them manually.
//         </p>
//       </div>

//       {/* Upload Documents Section */}
//       <div className="bg-white border border-slate-200 rounded-lg p-6">
//         <h3 className="text-lg font-medium text-slate-800 mb-4">Upload FAQ Documents</h3>
//         <div className="border-2 border-dashed border-slate-300 rounded-lg p-8 text-center">
//           <div className="space-y-4">
//             <div className="text-slate-400">
//               <Upload className="w-12 h-12 mx-auto" />
//             </div>
//             <div>
//               <label htmlFor="document-upload" className="cursor-pointer">
//                 <span className="text-blue-600 underline">Browse files</span> or drag & drop
//               </label>
//               <input
//                 id="document-upload"
//                 type="file"
//                 accept=".pdf,.doc,.docx"
//                 onChange={handleFileUpload}
//                 className="hidden"
//               />
//               <p className="text-sm text-slate-500 mt-2">Supported formats: PDF, DOC, DOCX</p>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Uploaded Documents */}
//       {documents.length > 0 && (
//         <div className="bg-white border border-slate-200 rounded-lg p-6">
//           <h3 className="text-lg font-medium text-slate-800 mb-4">Uploaded Documents</h3>
//           <div className="space-y-3">
//             {documents.map((doc: any) => (
//               <div key={doc.id} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
//                 <div className="flex items-center space-x-3">
//                   <FileText className="w-5 h-5 text-slate-500" />
//                   <div>
//                     <p className="font-medium text-slate-800">{doc.name}</p>
//                     <p className="text-sm text-slate-500">Uploaded on {new Date(doc.createdAt).toLocaleDateString()}</p>
//                   </div>
//                 </div>
//                 <Button
//                   size="icon"
//                   variant="outline"
//                   onClick={() => handleDeleteDocument(doc.id)}
//                   className="text-red-600 hover:text-red-700"
//                 >
//                   <Trash2 className="w-4 h-4" />
//                 </Button>
//               </div>
//             ))}
//           </div>
//         </div>
//       )}

//       {/* Manual FAQ Entry */}
//       <div className="bg-white border border-slate-200 rounded-lg p-6">
//         <div className="flex items-center justify-between mb-4">
//           <h3 className="text-lg font-medium text-slate-800">Manual FAQ Entry</h3>
//           <Button onClick={() => setShowAddForm(!showAddForm)} className="bg-teal-600 hover:bg-teal-700 text-white">
//             <Plus className="w-4 h-4 mr-2" />
//             Add FAQ
//           </Button>
//         </div>

//         {showAddForm && (
//           <div className="space-y-4 p-4 bg-slate-50 rounded-lg mb-6">
//             <div className="space-y-2">
//               <label className="text-slate-700 font-medium">Question</label>
//               <Input
//                 value={newQuestion}
//                 onChange={(e) => setNewQuestion(e.target.value)}
//                 placeholder="Enter the question..."
//               />
//             </div>
//             <div className="space-y-2">
//               <label className="text-slate-700 font-medium">Answer</label>
//               <Textarea
//                 value={newAnswer}
//                 onChange={(e) => setNewAnswer(e.target.value)}
//                 placeholder="Enter the answer..."
//                 className="min-h-[100px]"
//               />
//             </div>
//             <div className="flex space-x-3">
//               <Button onClick={handleAddFAQ} className="bg-green-600 hover:bg-green-700 text-white">
//                 Save FAQ
//               </Button>
//               <Button variant="outline" onClick={() => setShowAddForm(false)}>
//                 Cancel
//               </Button>
//             </div>
//           </div>
//         )}

//         {/* FAQ List */}
//         <div className="space-y-4">
//           <h4 className="font-medium text-slate-800">Existing FAQs ({faqs.length})</h4>
//           {faqs.length === 0 ? (
//             <p className="text-slate-500 text-center py-8">No FAQs added yet. Add your first FAQ above.</p>
//           ) : (
//             <div className="space-y-3">
//               {faqs.map((faq: any) => (
//                 <div key={faq.id} className="border border-slate-200 rounded-lg p-4">
//                   <div className="flex items-start justify-between">
//                     <div className="flex-1">
//                       <h5 className="font-medium text-slate-800 mb-2">{faq.question}</h5>
//                       <p className="text-slate-600">{faq.answer}</p>
//                     </div>
//                     <Button
//                       size="icon"
//                       variant="outline"
//                       onClick={() => handleDeleteFAQ(faq.id)}
//                       className="text-red-600 hover:text-red-700 ml-4"
//                     >
//                       <Trash2 className="w-4 h-4" />
//                     </Button>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   )
// }


function FAQTab({ agentId }: { agentId: string }) {
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [faqs, setFaqs] = useState<any[]>([])
  const [docs, setDocs] = useState<any[]>([])
  const [newQuestion, setNewQuestion] = useState("")
  const [newAnswer, setNewAnswer] = useState("")
  const [showAddForm, setShowAddForm] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [loading, setLoading] = useState(true)
  const [successMessage, setSuccessMessage] = useState("")
  const [errorMessage, setErrorMessage] = useState("")
  const token = Cookies.get("Token") || ""

  useEffect(() => {
    fetchFAQs()
    fetchDocuments()
  }, [agentId])

  const fetchFAQs = async () => {
    try {
      const response = await fetch(`/api/agents/${agentId}/faqs`)
      const data = await response.json()
      setFaqs(data)
    } catch (error) {
      console.error("Error fetching FAQs:", error)
    }
  }

  const fetchDocuments = async () => {
    try {
      const res = await fetch(`http://127.0.0.1:8000/api/documents/documents/?agent_id=${agentId}`, {
        headers: { Authorization: `Token ${token}` }
      })
      const data = await res.json()
      setDocs(data)
    } catch (error) {
      console.error("Failed to fetch documents:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleUpload = async () => {
    const file = fileInputRef.current?.files?.[0]
    if (!file) {
      setErrorMessage("Please select a file.")
      setTimeout(() => setErrorMessage(""), 4000)
      return
    }

    setUploading(true)
    try {
      const presignedRes = await fetch("http://127.0.0.1:8000/api/documents/s3/presigned-url/", {
        method: "POST",
        headers: {
          Authorization: `Token ${token}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          file_name: file.name,
          content_type: file.type
        })
      })

      const presignedData = await presignedRes.json()
      const uploadUrl = presignedData.url
      const s3Key = presignedData.file_key

      const s3Res = await fetch(uploadUrl, {
        method: "PUT",
        headers: { "Content-Type": file.type },
        body: file
      })

      if (!s3Res.ok) throw new Error("S3 upload failed")

      const response = await fetch("http://127.0.0.1:8000/api/documents/documents/", {
        method: "POST",
        headers: {
          Authorization: `Token ${token}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          title: file.name,
          description: "FAQ Document",
          s3_url: uploadUrl.split("?")[0],
          file_key: s3Key,
          agent_id: agentId,
        })
      })

      if (response.ok) {
        setSuccessMessage("File uploaded successfully!")
        setTimeout(() => setSuccessMessage(""), 3000)
        fetchDocuments()
      } else {
        setErrorMessage("Upload metadata failed")
      }
    } catch (err) {
      console.error("Upload failed:", err)
      setErrorMessage("Upload failed.")
    } finally {
      setUploading(false)
    }
  }

  const handleAddFAQ = async () => {
    if (!newQuestion.trim() || !newAnswer.trim()) return
    try {
      const res = await fetch(`/api/agents/${agentId}/faqs`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question: newQuestion, answer: newAnswer })
      })
      if (res.ok) {
        setNewQuestion("")
        setNewAnswer("")
        setShowAddForm(false)
        fetchFAQs()
      }
    } catch (err) {
      console.error("Error adding FAQ:", err)
    }
  }

  const handleDeleteFAQ = async (id: string) => {
    try {
      const res = await fetch(`/api/agents/${agentId}/faqs/${id}`, { method: "DELETE" })
      if (res.ok) fetchFAQs()
    } catch (err) {
      console.error("Error deleting FAQ:", err)
    }
  }

  if (loading) return <div className="text-center p-10 text-slate-600">Loading FAQ data...</div>

  return (
    <div className="space-y-6">
      {successMessage && <div className="p-4 bg-green-50 border border-green-200 text-green-700">{successMessage}</div>}
      {errorMessage && <div className="p-4 bg-red-50 border border-red-200 text-red-700">{errorMessage}</div>}

      <div className="bg-white p-6 rounded-lg border border-gray-200">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">📁 Upload FAQ Documents</h2>
        <input type="file" ref={fileInputRef} className="mb-4" />
        <Button onClick={handleUpload} disabled={uploading} className="mb-2">
          {uploading ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : <UploadCloud className="w-4 h-4 mr-2" />} Upload
        </Button>

        <div className="mt-6">
          <h3 className="text-lg font-medium text-slate-800 mb-2">Uploaded Files</h3>
          {docs.length === 0 ? <p className="text-slate-500">No documents uploaded yet.</p> : (
            <ul className="space-y-3">
              {docs.map((doc) => (
                <li key={doc.id} className="flex items-center gap-2 text-blue-700 hover:underline">
                  <FileText className="w-4 h-4 text-blue-600" />
                  <button
                    onClick={async () => {
                      try {
                        const res = await fetch(`http://127.0.0.1:8000/api/documents/presigned-view-url/?file_key=${encodeURIComponent(doc.title)}`, {
                          headers: { Authorization: `Token ${token}` }
                        })
                        const data = await res.json()
                        window.open(data.presigned_url, "_blank")
                      } catch {
                        alert("Could not open document.")
                      }
                    }}
                  >
                    {doc.title}
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

  
    </div>
  )
}


// Voiceprint Tab (keeping existing)
function VoiceprintTab() {
  return (
    <div className="space-y-6">
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <p className="text-blue-800">
          Here's where you can manage the voice sample for your AI agent. Please select a default sample or upload your
          own!
        </p>
      </div>

      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
        <p className="text-yellow-800">
          <strong>Active Voice:</strong> Marissa - Friendly and Sociable - american/casual/young/female/conversational
        </p>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-medium text-slate-800">Select Voice</h3>
        <div className="flex items-center space-x-4">
          <Select defaultValue="marissa">
            <SelectTrigger className="flex-1">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="marissa">
                Marissa - Friendly and Sociable - american/casual/young/female/conversational
              </SelectItem>
            </SelectContent>
          </Select>
          <Button size="icon" variant="outline">
            <Play className="w-4 h-4" />
          </Button>
          <Button size="icon" variant="outline">
            <Square className="w-4 h-4" />
          </Button>
          <Button className="bg-teal-600 hover:bg-teal-700 text-white">Activate</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Upload Voice Sample */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium text-slate-800">Upload a Voice Sample</h3>
          <div className="border-2 border-dashed border-slate-300 rounded-lg p-8 text-center">
            <div className="space-y-4">
              <div className="text-slate-400">
                <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                  />
                </svg>
              </div>
              <div>
                <p className="text-slate-600">
                  Drag & drop files or <span className="text-blue-600 underline cursor-pointer">Browse</span>
                </p>
                <p className="text-sm text-slate-500 mt-2">Suggested format: Mp3. Maximum duration: 5 minute</p>
              </div>
            </div>
          </div>
          <Button className="w-full bg-slate-500 hover:bg-slate-600 text-white">Upload</Button>
        </div>

        {/* Create Voice Snippet */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium text-slate-800">Create Voice Snippet</h3>
          <p className="text-slate-600">Generate an example sound file with the selected voice.</p>
          <Textarea placeholder="Type text to say..." className="min-h-[200px]" />
          <Button className="w-full bg-slate-500 hover:bg-slate-600 text-white">Submit</Button>
        </div>
      </div>
    </div>
  )
}

// Voice Prompts Tab (keeping existing)
function VoicePromptsTab() {
  const [expandedSections, setExpandedSections] = useState<string[]>(["welcome", "processing"])

  const toggleSection = (section: string) => {
    setExpandedSections((prev) => (prev.includes(section) ? prev.filter((s) => s !== section) : [...prev, section]))
  }

  return (
    <div className="space-y-6">
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <p className="text-blue-800">
          When your agent interacts with a caller, we have some standard phrases that we utilize throughout the
          conversation. You can change these here.
        </p>
      </div>

      <div className="space-y-4">
        <h2 className="text-xl font-medium text-slate-800">Manage Voice Phrases</h2>

        {/* Welcome Phrase */}
        <div className="bg-white border border-slate-200 rounded-lg">
          <div className="p-4 border-b border-slate-200 flex items-center justify-between">
            <div>
              <h3 className="font-medium text-slate-800">Welcome Phrase</h3>
              <p className="text-sm text-slate-600">The greeting your agent uses when it answers a call.</p>
            </div>
            <div className="flex items-center space-x-2">
              <Button size="icon" variant="outline">
                <Play className="w-4 h-4" />
              </Button>
              <Button size="icon" variant="outline">
                <Square className="w-4 h-4" />
              </Button>
              <Button size="icon" variant="outline" onClick={() => toggleSection("welcome")}>
                <ChevronUp
                  className={`w-4 h-4 transition-transform ${expandedSections.includes("welcome") ? "rotate-180" : ""}`}
                />
              </Button>
            </div>
          </div>
          <div className="p-4">
            <Textarea defaultValue="This is a virtual agent." className="min-h-[100px]" />
          </div>
        </div>

        {/* Processing Phrases */}
        <div className="bg-white border border-slate-200 rounded-lg">
          <div className="p-4 border-b border-slate-200 flex items-center justify-between">
            <div>
              <h3 className="font-medium text-slate-800">Processing Phrases</h3>
              <p className="text-sm text-slate-600">
                What the agent says when it's processing something the caller has said. It will choose one at random
                from the list.
              </p>
            </div>
            <div className="flex items-center space-x-2">
              <Button size="icon" variant="outline">
                <Play className="w-4 h-4" />
              </Button>
              <Button size="icon" variant="outline">
                <Square className="w-4 h-4" />
              </Button>
              <Button size="icon" variant="outline" onClick={() => toggleSection("processing")}>
                <ChevronUp
                  className={`w-4 h-4 transition-transform ${expandedSections.includes("processing") ? "rotate-180" : ""}`}
                />
              </Button>
            </div>
          </div>
          <div className="p-4 space-y-4">
            <Textarea
              defaultValue={`Okay, give me just a minute.
Great, just one second.
Hold on a moment.`}
              className="min-h-[120px]"
            />
            <Button variant="outline">Reset to default</Button>
          </div>
        </div>

        {/* Voicemail Phrase */}
        <div className="bg-white border border-slate-200 rounded-lg">
          <div className="p-4 border-b border-slate-200 flex items-center justify-between">
            <div>
              <h3 className="font-medium text-slate-800">Voicemail Phrase</h3>
              <p className="text-sm text-slate-600">
                The agent will say this after the caller has asked to leave a voicemail.
              </p>
            </div>
            <div className="flex items-center space-x-2">
              <Button size="icon" variant="outline">
                <Play className="w-4 h-4" />
              </Button>
              <Button size="icon" variant="outline">
                <Square className="w-4 h-4" />
              </Button>
              <Button size="icon" variant="outline" onClick={() => toggleSection("voicemail")}>
                <ChevronUp
                  className={`w-4 h-4 transition-transform ${expandedSections.includes("voicemail") ? "rotate-180" : ""}`}
                />
              </Button>
            </div>
          </div>
          <div className="p-4">
            <Textarea
              defaultValue="Okay, please start your voicemail, and hangup when you're done."
              className="min-h-[100px]"
            />
          </div>
        </div>

        {/* Extended Silence Phrase */}
        <div className="bg-white border border-slate-200 rounded-lg">
          <div className="p-4 border-b border-slate-200 flex items-center justify-between">
            <div>
              <h3 className="font-medium text-slate-800">Extended Silence Phrase</h3>
              <p className="text-sm text-slate-600">The agent will say this after 15 seconds of silence.</p>
            </div>
            <div className="flex items-center space-x-2">
              <Button size="icon" variant="outline">
                <Play className="w-4 h-4" />
              </Button>
              <Button size="icon" variant="outline">
                <Square className="w-4 h-4" />
              </Button>
              <Button size="icon" variant="outline" onClick={() => toggleSection("silence")}>
                <ChevronUp
                  className={`w-4 h-4 transition-transform ${expandedSections.includes("silence") ? "rotate-180" : ""}`}
                />
              </Button>
            </div>
          </div>
          <div className="p-4">
            <Textarea defaultValue="Are you still there? Maybe I missed what you said." className="min-h-[100px]" />
          </div>
        </div>

        <div className="flex justify-between">
          <Button variant="outline">Reset to default</Button>
          <Button className="bg-teal-600 hover:bg-teal-700 text-white">Save</Button>
        </div>
      </div>
    </div>
  )
}

// Agent Prompts Tab (keeping existing)
function AgentPromptsTab() {
  const [agentPrompt, setAgentPrompt] =
    useState(`You are a virtual agent having a spoken conversation. This is who you are: Real estate agent who does resale and precon

Ask them what kind of help they need, keeping your goal below in mind.

GOAL: Your goal in this call is to collect the following information: Close/followup leads

This is a spoken conversation. You should ask questions one at a time. You are having a colloquial, friendly conversation.`)

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-medium text-slate-800">Manage Agent Prompt</h2>

      <div className="space-y-4">
        <h3 className="text-lg font-medium text-slate-800">Agent Content Prompt</h3>
        <p className="text-slate-600">
          Let's give your virtual agent some personality. You'll tell the virtual agent how you want it to respond and
          with what additional context.
        </p>

        <div className="bg-white border border-slate-200 rounded-lg">
          <div className="flex items-center justify-between p-3 border-b border-slate-200">
            <div className="flex items-center space-x-4">
              <Button variant="outline" size="sm">
                <WrapText className="w-4 h-4 mr-2" />
                WORD WRAP: OFF
              </Button>
              <Button variant="outline" size="sm">
                <Copy className="w-4 h-4 mr-2" />
                COPY
              </Button>
              <Button variant="outline" size="sm">
                <History className="w-4 h-4 mr-2" />
                HISTORY
              </Button>
            </div>
            <div className="text-sm text-slate-500">7 lines, 423 characters</div>
          </div>

          <div className="relative">
            <div className="absolute left-0 top-0 bottom-0 w-12 bg-slate-50 border-r border-slate-200 flex flex-col text-xs text-slate-400 pt-4">
              {Array.from({ length: 20 }, (_, i) => (
                <div key={i + 1} className="h-6 flex items-center justify-center">
                  {i + 1}
                </div>
              ))}
            </div>
            <Textarea
              value={agentPrompt}
              onChange={(e) => setAgentPrompt(e.target.value)}
              className="pl-14 min-h-[400px] border-0 resize-none focus:ring-0 font-mono text-sm"
              style={{ lineHeight: "1.5rem" }}
            />
          </div>
        </div>

        <div className="flex justify-end">
          <Button className="bg-green-600 hover:bg-green-700 text-white px-8">SAVE ALL</Button>
        </div>
      </div>
    </div>
  )
}

// Voice Settings Tab (keeping existing)
function VoiceSettingsTab() {
  const [stability, setStability] = useState(50)
  const [clarity, setClarity] = useState(75)
  const [styleExaggeration, setStyleExaggeration] = useState(0)
  const [speakerBoost, setSpeakerBoost] = useState(true)

  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <h2 className="text-2xl font-medium text-slate-800 text-center">Manage Voice Generation Settings</h2>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <p className="text-blue-800">
            Here you can tweak the setting of voice generation. If you're not happy with how your agent sounds, feel
            free to adjust settings and see how it changes.
          </p>
          <p className="text-blue-800 mt-2">Remember that the voice print quality will impact the voice the most.</p>
        </div>
      </div>

      {/* Model Selection */}
      <div className="space-y-4">
        <div className="flex items-center space-x-2">
          <h3 className="text-lg font-medium text-slate-800">Model</h3>
          <div className="w-5 h-5 bg-slate-400 rounded-full flex items-center justify-center">
            <span className="text-white text-xs">i</span>
          </div>
        </div>
        <Select defaultValue="multilingual-v2">
          <SelectTrigger className="w-64">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="multilingual-v2">Multilingual V2</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Stability Slider */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium text-slate-800">Stability</h3>
        <div className="space-y-2">
          <div className="text-sm text-slate-600">{stability}%</div>
          <div className="relative">
            <input
              type="range"
              min="0"
              max="100"
              value={stability}
              onChange={(e) => setStability(Number(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
            />
          </div>
          <div className="flex justify-between text-sm text-slate-600">
            <div className="flex items-center space-x-1">
              <span>More variable</span>
              <div className="w-4 h-4 bg-slate-400 rounded-full flex items-center justify-center">
                <span className="text-white text-xs">i</span>
              </div>
            </div>
            <div className="flex items-center space-x-1">
              <span>More stable</span>
              <div className="w-4 h-4 bg-slate-400 rounded-full flex items-center justify-center">
                <span className="text-white text-xs">i</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Clarity + Similarity Enhancement Slider */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium text-slate-800">Clarity + Similarity Enhancement</h3>
        <div className="space-y-2">
          <div className="text-sm text-slate-600">{clarity}%</div>
          <div className="relative">
            <input
              type="range"
              min="0"
              max="100"
              value={clarity}
              onChange={(e) => setClarity(Number(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
            />
          </div>
          <div className="flex justify-between text-sm text-slate-600">
            <div className="flex items-center space-x-1">
              <span>Low</span>
              <div className="w-4 h-4 bg-slate-400 rounded-full flex items-center justify-center">
                <span className="text-white text-xs">i</span>
              </div>
            </div>
            <div className="flex items-center space-x-1">
              <span>High</span>
              <div className="w-4 h-4 bg-slate-400 rounded-full flex items-center justify-center">
                <span className="text-white text-xs">i</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Style Exaggeration Slider */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium text-slate-800">Style Exaggeration</h3>
        <div className="space-y-2">
          <div className="text-sm text-slate-600">{styleExaggeration}%</div>
          <div className="relative">
            <input
              type="range"
              min="0"
              max="100"
              value={styleExaggeration}
              onChange={(e) => setStyleExaggeration(Number(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
            />
          </div>
          <div className="flex justify-between text-sm text-slate-600">
            <span>None (Fastest)</span>
            <div className="flex items-center space-x-1">
              <span>Exaggerated</span>
              <div className="w-4 h-4 bg-slate-400 rounded-full flex items-center justify-center">
                <span className="text-white text-xs">i</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Speaker Boost */}
      <div className="space-y-4">
        <div className="flex items-center space-x-3">
          <input
            type="checkbox"
            id="speaker-boost"
            checked={speakerBoost}
            onChange={(e) => setSpeakerBoost(e.target.checked)}
            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
          />
          <label htmlFor="speaker-boost" className="text-slate-800">
            Speaker Boost
          </label>
          <div className="w-4 h-4 bg-slate-400 rounded-full flex items-center justify-center">
            <span className="text-white text-xs">i</span>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-between items-center pt-6">
        <Button variant="outline" className="text-blue-600 border-blue-600 bg-transparent">
          RESET TO DEFAULT
        </Button>
        <div className="flex space-x-4">
          <Button className="bg-blue-600 hover:bg-blue-700 text-white px-8">SAVE CHANGES</Button>
          <Button variant="outline" className="text-blue-600 border-blue-600 bg-transparent">
            PLAY TEST SAMPLE
          </Button>
        </div>
      </div>
    </div>
  )
}

// Additional Settings Tab
function AdditionalSettingsTab() {
  const [expandedSections, setExpandedSections] = useState<string[]>([
    "location",
    "business-hours",
    "agent-settings",
    "outbound-call",
    "post-call",
  ])
  const [businessClosed, setBusinessClosed] = useState(false)
  const [removeBusiness, setRemoveBusiness] = useState(false)
  const [alwaysSendText, setAlwaysSendText] = useState(true)
  const [enableTemplate, setEnableTemplate] = useState(false)
  const [autogenerate, setAutogenerate] = useState(true)
  const [enableInterruptions, setEnableInterruptions] = useState(false)
  const [enableSMS, setEnableSMS] = useState(false)
  const [enableHearDTMF, setEnableHearDTMF] = useState(false)
  const [enableSendDTMF, setEnableSendDTMF] = useState(false)
  const [allowContentSearch, setAllowContentSearch] = useState(false)
  const [disableVoicemail, setDisableVoicemail] = useState(true)
  const [disableSMSAgent, setDisableSMSAgent] = useState(true)
  const [enableAnsweringMachine, setEnableAnsweringMachine] = useState(false)

  const toggleSection = (section: string) => {
    setExpandedSections((prev) => (prev.includes(section) ? prev.filter((s) => s !== section) : [...prev, section]))
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-medium text-slate-800 text-center">Additional Settings</h2>

      {/* Location Settings */}
      <div className="bg-white border border-slate-200 rounded-lg">
        <div className="p-4 border-b border-slate-200 flex items-center justify-between">
          <h3 className="text-blue-600 font-medium">Location settings</h3>
          <Button size="icon" variant="outline" onClick={() => toggleSection("location")}>
            <ChevronUp
              className={`w-4 h-4 transition-transform ${expandedSections.includes("location") ? "rotate-180" : ""}`}
            />
          </Button>
        </div>
        {expandedSections.includes("location") && (
          <div className="p-4 space-y-4">
            <div className="space-y-2">
              <label className="text-slate-700 font-medium">Agent Locale*</label>
              <Select defaultValue="english-us">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="english-us">English (United States)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-slate-700 font-medium">Agent Location (street address or city & state)</label>
              <Input placeholder="" />
            </div>

            <div className="space-y-2">
              <label className="text-slate-700 font-medium">Agent Timezone (automatically set by Agent Location)</label>
              <Select defaultValue="utc">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="utc">Etc/UTC: Coordinated Universal Time</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        )}
      </div>

      {/* Business Hours */}
      <div className="bg-white border border-slate-200 rounded-lg">
        <div className="p-4 border-b border-slate-200 flex items-center justify-between">
          <h3 className="text-blue-600 font-medium">Business Hours</h3>
          <Button size="icon" variant="outline" onClick={() => toggleSection("business-hours")}>
            <ChevronUp
              className={`w-4 h-4 transition-transform ${expandedSections.includes("business-hours") ? "rotate-180" : ""}`}
            />
          </Button>
        </div>
        {expandedSections.includes("business-hours") && (
          <div className="p-4 space-y-4">
            <div className="space-y-2">
              <label className="text-slate-700 font-medium">Current Generated business hours.</label>
              <Textarea className="min-h-[120px]" />
            </div>

            <p className="text-slate-600 text-sm">This represents the agent's understanding of your business hours</p>

            <div className="space-y-2">
              <label className="text-slate-700 font-medium">Business Hours Source</label>
              <Select defaultValue="plain-text">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="plain-text">Plain Text</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-slate-700 font-medium">Business Hours Description</label>
              <Textarea className="min-h-[120px]" />
            </div>

            <p className="text-slate-600 text-sm">Holidays/Special Dates should be specified with the full date.</p>

            <div className="flex items-center space-x-3">
              <input
                type="checkbox"
                id="business-closed"
                checked={businessClosed}
                onChange={(e) => setBusinessClosed(e.target.checked)}
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
              />
              <label htmlFor="business-closed" className="text-slate-700">
                Toggle to enforce business as closed.
              </label>
            </div>

            <div className="space-y-2">
              <label className="text-slate-700 font-medium">Days business is closed.</label>
              <Input defaultValue="0" />
              <p className="text-slate-600 text-sm">If set to zero, a manual update is required to re-open.</p>
            </div>

            <div className="flex items-center space-x-3">
              <input
                type="checkbox"
                id="remove-business"
                checked={removeBusiness}
                onChange={(e) => setRemoveBusiness(e.target.checked)}
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
              />
              <label htmlFor="remove-business" className="text-slate-700">
                Remove Business Hours
              </label>
            </div>
            <p className="text-slate-600 text-sm">Removes all business hour data from agent and sets to default.</p>
          </div>
        )}
      </div>

      {/* Agent Settings */}
      <div className="bg-white border border-slate-200 rounded-lg">
        <div className="p-4 border-b border-slate-200 flex items-center justify-between">
          <h3 className="text-blue-600 font-medium">Agent Settings</h3>
          <Button size="icon" variant="outline" onClick={() => toggleSection("agent-settings")}>
            <ChevronUp
              className={`w-4 h-4 transition-transform ${expandedSections.includes("agent-settings") ? "rotate-180" : ""}`}
            />
          </Button>
        </div>
        {expandedSections.includes("agent-settings") && (
          <div className="p-4 space-y-4">
            <div className="space-y-2">
              <label className="text-slate-700 font-medium">Pronunciation Dictionaries</label>
              <Input />
            </div>

            <div className="space-y-2">
              <label className="text-slate-700 font-medium">Initial Trigger</label>
              <Input defaultValue="Start the goal" />
              <p className="text-slate-600 text-sm">
                Instead of waiting for first response, this can trigger a specific task for each conversation.
              </p>
            </div>

            <div className="flex items-center space-x-3">
              <input
                type="checkbox"
                id="always-send-text"
                checked={alwaysSendText}
                onChange={(e) => setAlwaysSendText(e.target.checked)}
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
              />
              <label htmlFor="always-send-text" className="text-slate-700">
                Always send opening text
              </label>
            </div>
            <p className="text-slate-600 text-sm">
              If unchecked, opening texts still be triggered by 'openingsms:true' in API metadata. If no message
              provided below, no text will be sent.
            </p>

            <div className="space-y-2">
              <label className="text-slate-700 font-medium">Text message to send when call is answered.</label>
              <Textarea className="min-h-[80px]" />
            </div>

            <div className="flex items-center space-x-3">
              <input
                type="checkbox"
                id="enable-template"
                checked={enableTemplate}
                onChange={(e) => setEnableTemplate(e.target.checked)}
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
              />
              <label htmlFor="enable-template" className="text-slate-700">
                Enable Template Library
              </label>
            </div>

            <div className="flex items-center space-x-3">
              <input
                type="checkbox"
                id="autogenerate"
                checked={autogenerate}
                onChange={(e) => setAutogenerate(e.target.checked)}
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
              />
              <label htmlFor="autogenerate" className="text-slate-700">
                Autogenerate next action phrases
              </label>
            </div>
            <p className="text-slate-600 text-sm">
              The Agent will naturally generate phrases to continue the conversation.
            </p>

            <div className="flex items-center space-x-3">
              <input
                type="checkbox"
                id="enable-interruptions"
                checked={enableInterruptions}
                onChange={(e) => setEnableInterruptions(e.target.checked)}
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
              />
              <label htmlFor="enable-interruptions" className="text-slate-700">
                Enable Interruptions.
              </label>
            </div>
            <p className="text-slate-600 text-sm">Allow the agent to be interrupted mid-sentence.</p>

            <div className="flex items-center space-x-3">
              <input
                type="checkbox"
                id="enable-sms"
                checked={enableSMS}
                onChange={(e) => setEnableSMS(e.target.checked)}
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
              />
              <label htmlFor="enable-sms" className="text-slate-700">
                Enable SMS Channel During Calls
              </label>
            </div>
            <p className="text-slate-600 text-sm">Allow agent to receive and read text messages during the call.</p>

            <div className="flex items-center space-x-3">
              <input
                type="checkbox"
                id="enable-hear-dtmf"
                checked={enableHearDTMF}
                onChange={(e) => setEnableHearDTMF(e.target.checked)}
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
              />
              <label htmlFor="enable-hear-dtmf" className="text-slate-700">
                Enable Agent to hear DTMF (dial tones)
              </label>
            </div>
            <p className="text-slate-600 text-sm">
              DTMF tones will be sent to the Agent. This is not necessary for tasks that are triggered by DTMF
            </p>

            <div className="flex items-center space-x-3">
              <input
                type="checkbox"
                id="enable-send-dtmf"
                checked={enableSendDTMF}
                onChange={(e) => setEnableSendDTMF(e.target.checked)}
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
              />
              <label htmlFor="enable-send-dtmf" className="text-slate-700">
                Enable Agent to send DTMF (dial tones)
              </label>
            </div>
            <p className="text-slate-600 text-sm">
              Agent can send DTMF tones when contextually relevant, i.e. responding to an answering machine.
            </p>

            <div className="flex items-center space-x-3">
              <input
                type="checkbox"
                id="allow-content-search"
                checked={allowContentSearch}
                onChange={(e) => setAllowContentSearch(e.target.checked)}
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
              />
              <label htmlFor="allow-content-search" className="text-slate-700">
                Allow Agent to independently search Content Library
              </label>
            </div>
            <p className="text-slate-600 text-sm">
              If checked, the Agent can search content library when deemed necessary. If unchecked, content library will
              be searched for every response.
            </p>

            <div className="flex items-center space-x-3">
              <input
                type="checkbox"
                id="disable-voicemail"
                checked={disableVoicemail}
                onChange={(e) => setDisableVoicemail(e.target.checked)}
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
              />
              <label htmlFor="disable-voicemail" className="text-slate-700">
                Disable voicemail request detection.
              </label>
            </div>
            <p className="text-slate-600 text-sm">Prevent the agent from automatically offering to take a voicemail</p>

            <div className="flex items-center space-x-3">
              <input
                type="checkbox"
                id="disable-sms-agent"
                checked={disableSMSAgent}
                onChange={(e) => setDisableSMSAgent(e.target.checked)}
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
              />
              <label htmlFor="disable-sms-agent" className="text-slate-700">
                Disable SMS.
              </label>
            </div>
            <p className="text-slate-600 text-sm">Prevent the agent from being able to send SMS messages.</p>
          </div>
        )}
      </div>

      {/* Outbound Call Settings */}
      <div className="bg-white border border-slate-200 rounded-lg">
        <div className="p-4 border-b border-slate-200 flex items-center justify-between">
          <h3 className="text-blue-600 font-medium">Outbound Call Settings</h3>
          <Button size="icon" variant="outline" onClick={() => toggleSection("outbound-call")}>
            <ChevronUp
              className={`w-4 h-4 transition-transform ${expandedSections.includes("outbound-call") ? "rotate-180" : ""}`}
            />
          </Button>
        </div>
        {expandedSections.includes("outbound-call") && (
          <div className="p-4 space-y-4">
            <div className="flex items-center space-x-3">
              <input
                type="checkbox"
                id="enable-answering-machine"
                checked={enableAnsweringMachine}
                onChange={(e) => setEnableAnsweringMachine(e.target.checked)}
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
              />
              <label htmlFor="enable-answering-machine" className="text-slate-700">
                Enable answering machine detection
              </label>
            </div>

            <div className="space-y-2">
              <label className="text-slate-700 font-medium">Greeting Delay</label>
              <Input defaultValue="0" />
              <p className="text-slate-600 text-sm">
                The delay, in seconds, the agent will wait before saying its Hello Prompt. Set to 0 to allow agent to
                determine if human or machine answered.
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Post Call Settings */}
      <div className="bg-white border border-slate-200 rounded-lg">
        <div className="p-4 border-b border-slate-200 flex items-center justify-between">
          <h3 className="text-blue-600 font-medium">Post Call Settings</h3>
          <Button size="icon" variant="outline" onClick={() => toggleSection("post-call")}>
            <ChevronUp
              className={`w-4 h-4 transition-transform ${expandedSections.includes("post-call") ? "rotate-180" : ""}`}
            />
          </Button>
        </div>
        {expandedSections.includes("post-call") && (
          <div className="p-4">
            <p className="text-slate-600">Post call settings will be configured here.</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default function AgentSettingsPage() {
  const [selectedAgent, setSelectedAgent] = useState(null)
  const [activeTab, setActiveTab] = useState("voiceprint")

  const handleSelectAgent = (agent: any) => {
    setSelectedAgent(agent)
  }

  const handleBackToAgents = () => {
    setSelectedAgent(null)
    setActiveTab("voiceprint")
  }

  const renderTabContent = () => {
    if (!selectedAgent) return null

    switch (activeTab) {
      case "voiceprint":
        return <VoiceprintTab />
      case "voice-prompts":
        return <VoicePromptsTab />
      case "agent-prompts":
        return <AgentPromptsTab />
      case "voice-settings":
        return <VoiceSettingsTab />
      case "faq":
        return <FAQTab agentId={selectedAgent.id} />
      default:
        return <VoiceprintTab />
    }
  }

  if (!selectedAgent) {
    return (
      <div className="p-6">
        <AgentSelection onSelectAgent={handleSelectAgent} />
      </div>
    )
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button variant="outline" onClick={handleBackToAgents}>
            ← Back to Agents
          </Button>
          <div>
            <h1 className="text-2xl font-semibold text-slate-800">Agent Settings</h1>
            <p className="text-slate-600">Configuring: {selectedAgent.name}</p>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-slate-200">
        <div className="flex space-x-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`pb-4 px-1 text-sm font-medium border-b-2 transition-colors ${
                tab.id === activeTab
                  ? "border-blue-500 text-blue-600"
                  : "border-transparent text-slate-500 hover:text-slate-700"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Tab Content */}
      {renderTabContent()}
    </div>
  )
}
