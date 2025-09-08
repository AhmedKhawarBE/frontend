"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import Cookies from "js-cookie"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Calendar, Users, CreditCard, Globe, Mail, Phone, MapPin, Building } from "lucide-react"

export default function EditCompanyProfile() {
  const { id: companyId } = useParams()
  const router = useRouter()

  const [companyData, setCompanyData] = useState<any | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchCompany = async () => {
      const token = Cookies.get("adminToken")
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/companies/${companyId}/`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${token || ""}`
          }
        })
        const data = await res.json()
        setCompanyData(data)
        console.log(data)
        setLoading(false)
      } catch (err) {
        console.error("Failed to fetch company", err)
        setLoading(false)
      }
    }

    fetchCompany()
  }, [companyId])

  const handleStatusChange = (status: string) => {
    setCompanyData((prev: any) => ({ ...prev, status }))
  }

  const handleSave = async () => {
    const token = Cookies.get("adminToken")
    try {
      await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/companies/${companyId}/`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${token || ""}`
        },
        body: JSON.stringify({ status: companyData.status })
      })
      alert("Status updated successfully!")
    } catch (err) {
      console.error("Failed to update status", err)
    }
  }

  const handleDelete = async () => {
    const confirmed = confirm("Are you sure you want to delete this company?")
    if (!confirmed) return

    const token = Cookies.get("adminToken")
    try {
      await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/companies/${companyId}/`, {
        method: "DELETE",
        headers: {
          Authorization: `Token ${token || ""}`
        }
      })
      alert("Company deleted successfully!")
      router.push("/admin/dashboard/companies")
    } catch (err) {
      console.error("Failed to delete company", err)
    }
  }

  if (loading || !companyData) {
    return <div>Loading...</div>
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
                <a href={companyData.website} className="text-lg text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">
                  {companyData.website}
                </a>
              </div>
              <div className="space-y-2">
                <span className="text-sm font-medium text-gray-600">Industry</span>
                <p className="text-lg">{companyData.industry}</p>
              </div>
              <div className="space-y-2">
                <span className="text-sm font-medium text-gray-600">Company Size</span>
                <p className="text-lg">{companyData.company_size} employees</p>
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
              <Select value={companyData.status} onValueChange={handleStatusChange}>
                <SelectTrigger className="w-[120px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="active">active</SelectItem>
                  <SelectItem value="inactive">inactive</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Plan</span>
              <Badge variant="outline">{companyData.plan}</Badge>
            </div>
            <div className="flex items-center space-x-2">
              <Calendar className="h-4 w-4 text-gray-400" />
              <div className="flex-1">
                <p className="text-sm text-gray-600">Date Joined</p>
                <p className="text-sm font-medium">{new Date(companyData.created_at || companyData.created_at).toLocaleDateString()}</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Users className="h-4 w-4 text-gray-400" />
              <div className="flex-1">
                <p className="text-sm text-gray-600">Total Users</p>
                <p className="text-sm font-medium">{companyData.users.length}</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Globe className="h-4 w-4 text-gray-400" />
              <div className="flex-1">
                <p className="text-sm text-gray-600">Last Login</p>
                <p className="text-sm font-medium">{companyData.last_login ? new Date(companyData.last_login).toLocaleDateString() : "N/A"}</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <CreditCard className="h-4 w-4 text-gray-400" />
              <div className="flex-1">
                <p className="text-sm text-gray-600">Monthly Usage</p>
                <p className="text-sm font-medium">1250 API calls</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Actions */}
      <div className="flex justify-between">
        <Button variant="destructive" onClick={handleDelete}>
          Delete Company
        </Button>
        <Button onClick={handleSave} className="px-8">
          Save Changes
        </Button>
      </div>
    </div>
  )
}
