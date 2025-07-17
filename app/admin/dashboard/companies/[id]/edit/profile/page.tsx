"use client"

import { useState } from "react"
import { useParams } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Calendar, Users, CreditCard, Globe } from "lucide-react"

export default function EditCompanyProfile() {
  const params = useParams()
  const companyId = params.id

  const [companyData, setCompanyData] = useState({
    name: "The Lost Tribe",
    email: "contact@losttribe.com",
    phone: "+1 (555) 123-4567",
    website: "https://losttribe.com",
    description: "A gaming company focused on creating immersive multiplayer experiences.",
    address: "123 Gaming Street, Tech City, TC 12345",
    industry: "Gaming",
    size: "50-100",
    plan: "Pro",
    status: "Active",
    dateJoined: "2024-01-15",
    lastLogin: "2024-07-14",
    totalUsers: 45,
    monthlyUsage: 1250,
    billingCycle: "Monthly",
  })

  const handleSave = () => {
    // Save company data
    console.log("Saving company data:", companyData)
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Company Overview */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Company Information</CardTitle>
            <CardDescription>Basic company details and contact information</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Company Name</Label>
                <Input
                  id="name"
                  value={companyData.name}
                  onChange={(e) => setCompanyData((prev) => ({ ...prev, name: e.target.value }))}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={companyData.email}
                  onChange={(e) => setCompanyData((prev) => ({ ...prev, email: e.target.value }))}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone</Label>
                <Input
                  id="phone"
                  value={companyData.phone}
                  onChange={(e) => setCompanyData((prev) => ({ ...prev, phone: e.target.value }))}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="website">Website</Label>
                <Input
                  id="website"
                  value={companyData.website}
                  onChange={(e) => setCompanyData((prev) => ({ ...prev, website: e.target.value }))}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="industry">Industry</Label>
                <Select
                  value={companyData.industry}
                  onValueChange={(value) => setCompanyData((prev) => ({ ...prev, industry: value }))}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Gaming">Gaming</SelectItem>
                    <SelectItem value="Technology">Technology</SelectItem>
                    <SelectItem value="Food & Beverage">Food & Beverage</SelectItem>
                    <SelectItem value="Healthcare">Healthcare</SelectItem>
                    <SelectItem value="Finance">Finance</SelectItem>
                    <SelectItem value="Education">Education</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="size">Company Size</Label>
                <Select
                  value={companyData.size}
                  onValueChange={(value) => setCompanyData((prev) => ({ ...prev, size: value }))}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1-10">1-10 employees</SelectItem>
                    <SelectItem value="11-50">11-50 employees</SelectItem>
                    <SelectItem value="51-100">51-100 employees</SelectItem>
                    <SelectItem value="101-500">101-500 employees</SelectItem>
                    <SelectItem value="500+">500+ employees</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="address">Address</Label>
              <Input
                id="address"
                value={companyData.address}
                onChange={(e) => setCompanyData((prev) => ({ ...prev, address: e.target.value }))}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={companyData.description}
                onChange={(e) => setCompanyData((prev) => ({ ...prev, description: e.target.value }))}
                rows={3}
              />
            </div>
          </CardContent>
        </Card>

        {/* Company Stats */}
        <Card>
          <CardHeader>
            <CardTitle>Company Stats</CardTitle>
            <CardDescription>Key metrics and information</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Status</span>
              <Badge variant={companyData.status === "Active" ? "default" : "secondary"}>{companyData.status}</Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Plan</span>
              <Badge variant="outline">{companyData.plan}</Badge>
            </div>
            <div className="flex items-center space-x-2">
              <Calendar className="h-4 w-4 text-gray-400" />
              <div className="flex-1">
                <p className="text-sm text-gray-600">Date Joined</p>
                <p className="text-sm font-medium">{new Date(companyData.dateJoined).toLocaleDateString()}</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Users className="h-4 w-4 text-gray-400" />
              <div className="flex-1">
                <p className="text-sm text-gray-600">Total Users</p>
                <p className="text-sm font-medium">{companyData.totalUsers}</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Globe className="h-4 w-4 text-gray-400" />
              <div className="flex-1">
                <p className="text-sm text-gray-600">Last Login</p>
                <p className="text-sm font-medium">{new Date(companyData.lastLogin).toLocaleDateString()}</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <CreditCard className="h-4 w-4 text-gray-400" />
              <div className="flex-1">
                <p className="text-sm text-gray-600">Monthly Usage</p>
                <p className="text-sm font-medium">{companyData.monthlyUsage} API calls</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Save Button */}
      <div className="flex justify-end">
        <Button onClick={handleSave} className="px-8">
          Save Changes
        </Button>
      </div>
    </div>
  )
}
