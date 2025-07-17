"use client"

import { useParams } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, Users, CreditCard, Globe, Mail, Phone, MapPin, Building } from "lucide-react"

export default function ViewCompanyProfile() {
  const params = useParams()
  const companyId = params.id

  const companyData = {
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
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Building className="h-4 w-4 text-gray-400" />
                  <span className="text-sm font-medium text-gray-600">Company Name</span>
                </div>
                <p className="text-lg font-semibold">{companyData.name}</p>
              </div>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Mail className="h-4 w-4 text-gray-400" />
                  <span className="text-sm font-medium text-gray-600">Email</span>
                </div>
                <p className="text-lg">{companyData.email}</p>
              </div>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Phone className="h-4 w-4 text-gray-400" />
                  <span className="text-sm font-medium text-gray-600">Phone</span>
                </div>
                <p className="text-lg">{companyData.phone}</p>
              </div>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Globe className="h-4 w-4 text-gray-400" />
                  <span className="text-sm font-medium text-gray-600">Website</span>
                </div>
                <a href={companyData.website} className="text-lg text-blue-600 hover:underline">
                  {companyData.website}
                </a>
              </div>
              <div className="space-y-2">
                <span className="text-sm font-medium text-gray-600">Industry</span>
                <p className="text-lg">{companyData.industry}</p>
              </div>
              <div className="space-y-2">
                <span className="text-sm font-medium text-gray-600">Company Size</span>
                <p className="text-lg">{companyData.size} employees</p>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <MapPin className="h-4 w-4 text-gray-400" />
                <span className="text-sm font-medium text-gray-600">Address</span>
              </div>
              <p className="text-lg">{companyData.address}</p>
            </div>
            <div className="space-y-2">
              <span className="text-sm font-medium text-gray-600">Description</span>
              <p className="text-gray-700 leading-relaxed">{companyData.description}</p>
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
    </div>
  )
}
