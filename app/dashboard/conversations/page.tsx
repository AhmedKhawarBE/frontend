"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Search, Filter, Download, Archive, ChevronDown, ArrowUpDown } from "lucide-react"

const tabs = [
  { id: "calls", label: "Calls" },
  { id: "sms", label: "SMS" },
  { id: "emails", label: "Emails" },
  { id: "web-chats", label: "Web Chats" },
]

// Calls Tab Content
function CallsTab() {
  return (
    <div className="space-y-6">
      {/* Filters */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Select defaultValue="agents">
            <SelectTrigger className="w-32">
              <SelectValue placeholder="Agents" />
              <ChevronDown className="w-4 h-4 ml-2" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="agents">Agents</SelectItem>
              <SelectItem value="all">All</SelectItem>
            </SelectContent>
          </Select>

          <Select defaultValue="primary">
            <SelectTrigger className="w-32">
              <SelectValue placeholder="Primary" />
              <ChevronDown className="w-4 h-4 ml-2" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="primary">Primary</SelectItem>
              <SelectItem value="secondary">Secondary</SelectItem>
            </SelectContent>
          </Select>

          <Select defaultValue="by-day">
            <SelectTrigger className="w-32">
              <SelectValue placeholder="By Day" />
              <ChevronDown className="w-4 h-4 ml-2" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="by-day">By Day</SelectItem>
              <SelectItem value="by-week">By Week</SelectItem>
            </SelectContent>
          </Select>

          <Select defaultValue="quick-filter">
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Quick Filter" />
              <ChevronDown className="w-4 h-4 ml-2" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="quick-filter">Quick Filter</SelectItem>
              <SelectItem value="custom">Custom</SelectItem>
            </SelectContent>
          </Select>

          <Select defaultValue="last-4-weeks">
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Last 4 weeks" />
              <ChevronDown className="w-4 h-4 ml-2" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="last-4-weeks">Last 4 weeks</SelectItem>
              <SelectItem value="last-week">Last week</SelectItem>
            </SelectContent>
          </Select>

          <Button variant="ghost" size="icon">
            <Filter className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Search and Actions */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
            <Input placeholder="Search by Phone Number" className="pl-10 w-64" />
          </div>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
            <Input placeholder="Search by Id" className="pl-10 w-64" />
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <Button variant="outline" className="bg-slate-500 text-white hover:bg-slate-600">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
          <Button variant="outline" className="bg-slate-500 text-white hover:bg-slate-600">
            <Archive className="w-4 h-4 mr-2" />
            Archive
          </Button>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-lg border border-slate-200">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-100 border-b border-slate-200">
              <tr>
                <th className="text-left p-4 w-12">
                  <Checkbox />
                </th>
                <th className="text-left p-4 font-medium text-slate-700">Phone Number</th>
                <th className="text-left p-4 font-medium text-slate-700">Call Direction</th>
                <th className="text-left p-4 font-medium text-slate-700">
                  <div className="flex items-center space-x-1">
                    <span className="text-blue-600">Start Time</span>
                    <ArrowUpDown className="w-4 h-4 text-blue-600" />
                  </div>
                </th>
                <th className="text-left p-4 font-medium text-slate-700">
                  <div className="flex items-center space-x-1">
                    <span>Duration</span>
                    <ArrowUpDown className="w-4 h-4" />
                  </div>
                </th>
                <th className="text-left p-4 font-medium text-slate-700">Transferred</th>
                <th className="text-left p-4 font-medium text-slate-700">Transfer Ring Duration</th>
                <th className="text-left p-4 font-medium text-slate-700">Transfer Status</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td colSpan={8} className="text-center p-8 text-slate-500">
                  No calls found
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between">
        <div className="text-sm text-slate-600">Showing 0 to 0 of 0 calls</div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm" className="bg-slate-500 text-white">
            <ChevronDown className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}

// SMS Tab Content
function SMSTab() {
  return (
    <div className="space-y-6">
      {/* Filters */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Select defaultValue="all-contacts">
            <SelectTrigger className="w-40">
              <SelectValue placeholder="All Contacts" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all-contacts">All Contacts</SelectItem>
              <SelectItem value="recent">Recent</SelectItem>
            </SelectContent>
          </Select>

          <Select defaultValue="last-30-days">
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Last 30 days" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="last-30-days">Last 30 days</SelectItem>
              <SelectItem value="last-week">Last week</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Search */}
      <div className="flex items-center justify-between">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
          <Input placeholder="Search by Phone Number or Message" className="pl-10 w-80" />
        </div>

        <div className="flex items-center space-x-2">
          <Button variant="outline" className="bg-slate-500 text-white hover:bg-slate-600">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-lg border border-slate-200">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-100 border-b border-slate-200">
              <tr>
                <th className="text-left p-4 w-12">
                  <Checkbox />
                </th>
                <th className="text-left p-4 font-medium text-slate-700">Phone Number</th>
                <th className="text-left p-4 font-medium text-slate-700">Direction</th>
                <th className="text-left p-4 font-medium text-slate-700">Message</th>
                <th className="text-left p-4 font-medium text-slate-700">
                  <div className="flex items-center space-x-1">
                    <span className="text-blue-600">Timestamp</span>
                    <ArrowUpDown className="w-4 h-4 text-blue-600" />
                  </div>
                </th>
                <th className="text-left p-4 font-medium text-slate-700">Status</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td colSpan={6} className="text-center p-8 text-slate-500">
                  No SMS messages found
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div className="text-sm text-slate-600">Showing 0 to 0 of 0 messages</div>
    </div>
  )
}

// Emails Tab Content
function EmailsTab() {
  return (
    <div className="space-y-6">
      {/* Filters */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Select defaultValue="all-folders">
            <SelectTrigger className="w-40">
              <SelectValue placeholder="All Folders" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all-folders">All Folders</SelectItem>
              <SelectItem value="inbox">Inbox</SelectItem>
              <SelectItem value="sent">Sent</SelectItem>
            </SelectContent>
          </Select>

          <Select defaultValue="all-status">
            <SelectTrigger className="w-40">
              <SelectValue placeholder="All Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all-status">All Status</SelectItem>
              <SelectItem value="read">Read</SelectItem>
              <SelectItem value="unread">Unread</SelectItem>
            </SelectContent>
          </Select>

          <Select defaultValue="last-30-days">
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Last 30 days" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="last-30-days">Last 30 days</SelectItem>
              <SelectItem value="last-week">Last week</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Search */}
      <div className="flex items-center justify-between">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
          <Input placeholder="Search by Email Address or Subject" className="pl-10 w-80" />
        </div>

        <div className="flex items-center space-x-2">
          <Button variant="outline" className="bg-slate-500 text-white hover:bg-slate-600">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-lg border border-slate-200">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-100 border-b border-slate-200">
              <tr>
                <th className="text-left p-4 w-12">
                  <Checkbox />
                </th>
                <th className="text-left p-4 font-medium text-slate-700">From/To</th>
                <th className="text-left p-4 font-medium text-slate-700">Subject</th>
                <th className="text-left p-4 font-medium text-slate-700">
                  <div className="flex items-center space-x-1">
                    <span className="text-blue-600">Date</span>
                    <ArrowUpDown className="w-4 h-4 text-blue-600" />
                  </div>
                </th>
                <th className="text-left p-4 font-medium text-slate-700">Status</th>
                <th className="text-left p-4 font-medium text-slate-700">Size</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td colSpan={6} className="text-center p-8 text-slate-500">
                  No emails found
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div className="text-sm text-slate-600">Showing 0 to 0 of 0 emails</div>
    </div>
  )
}

// Web Chats Tab Content
function WebChatsTab() {
  return (
    <div className="space-y-6">
      {/* Filters */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Select defaultValue="all-agents">
            <SelectTrigger className="w-40">
              <SelectValue placeholder="All Agents" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all-agents">All Agents</SelectItem>
              <SelectItem value="primary">Primary</SelectItem>
            </SelectContent>
          </Select>

          <Select defaultValue="all-status">
            <SelectTrigger className="w-40">
              <SelectValue placeholder="All Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all-status">All Status</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="closed">Closed</SelectItem>
            </SelectContent>
          </Select>

          <Select defaultValue="today">
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Today" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="today">Today</SelectItem>
              <SelectItem value="yesterday">Yesterday</SelectItem>
              <SelectItem value="last-week">Last week</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Search */}
      <div className="flex items-center justify-between">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
          <Input placeholder="Search by Visitor ID or Message" className="pl-10 w-80" />
        </div>

        <div className="flex items-center space-x-2">
          <Button variant="outline" className="bg-slate-500 text-white hover:bg-slate-600">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-lg border border-slate-200">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-100 border-b border-slate-200">
              <tr>
                <th className="text-left p-4 w-12">
                  <Checkbox />
                </th>
                <th className="text-left p-4 font-medium text-slate-700">Visitor ID</th>
                <th className="text-left p-4 font-medium text-slate-700">Agent</th>
                <th className="text-left p-4 font-medium text-slate-700">
                  <div className="flex items-center space-x-1">
                    <span className="text-blue-600">Start Time</span>
                    <ArrowUpDown className="w-4 h-4 text-blue-600" />
                  </div>
                </th>
                <th className="text-left p-4 font-medium text-slate-700">Duration</th>
                <th className="text-left p-4 font-medium text-slate-700">Messages</th>
                <th className="text-left p-4 font-medium text-slate-700">Status</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td colSpan={7} className="text-center p-8 text-slate-500">
                  No web chats found
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div className="text-sm text-slate-600">Showing 0 to 0 of 0 chats</div>
    </div>
  )
}

export default function ConversationsPage() {
  const [activeTab, setActiveTab] = useState("calls")

  const renderTabContent = () => {
    switch (activeTab) {
      case "calls":
        return <CallsTab />
      case "sms":
        return <SMSTab />
      case "emails":
        return <EmailsTab />
      case "web-chats":
        return <WebChatsTab />
      default:
        return <CallsTab />
    }
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-slate-800">Conversations</h1>
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
