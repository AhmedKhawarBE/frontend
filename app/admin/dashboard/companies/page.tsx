"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Search, Edit, Eye } from "lucide-react"

const companies = [
  {
    id: 1,
    name: "The Lost Tribe",
    logo: "/placeholder.svg?height=80&width=80",
    category: "Gaming",
    users: 45,
    dateAdded: "2024-01-15",
    status: "Active",
  },
  {
    id: 2,
    name: "Burger o Clock",
    logo: "/placeholder.svg?height=80&width=80",
    category: "Food & Beverage",
    users: 23,
    dateAdded: "2024-02-20",
    status: "Active",
  },
  {
    id: 3,
    name: "Ranchers",
    logo: "/placeholder.svg?height=80&width=80",
    category: "Agriculture",
    users: 67,
    dateAdded: "2024-01-08",
    status: "Active",
  },
  {
    id: 4,
    name: "Layers",
    logo: "/placeholder.svg?height=80&width=80",
    category: "Design",
    users: 34,
    dateAdded: "2024-03-12",
    status: "Inactive",
  },
  {
    id: 5,
    name: "TechStart Inc",
    logo: "/placeholder.svg?height=80&width=80",
    category: "Technology",
    users: 89,
    dateAdded: "2024-02-05",
    status: "Active",
  },
  {
    id: 6,
    name: "Green Solutions",
    logo: "/placeholder.svg?height=80&width=80",
    category: "Environment",
    users: 12,
    dateAdded: "2024-03-18",
    status: "Pending",
  },
]

export default function CompaniesPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [sortBy, setSortBy] = useState("name")
  const [filterCategory, setFilterCategory] = useState("all")
  const router = useRouter()

  const filteredCompanies = companies
    .filter(
      (company) =>
        company.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
        (filterCategory === "all" || company.category === filterCategory),
    )
    .sort((a, b) => {
      switch (sortBy) {
        case "name":
          return a.name.localeCompare(b.name)
        case "dateAdded":
          return new Date(b.dateAdded).getTime() - new Date(a.dateAdded).getTime()
        case "users":
          return b.users - a.users
        default:
          return 0
      }
    })

  const categories = ["all", ...Array.from(new Set(companies.map((c) => c.category)))]

  const handleViewCompany = (companyId: number) => {
    router.push(`/admin/dashboard/companies/${companyId}/view/profile`)
  }

  const handleEditCompany = (companyId: number) => {
    router.push(`/admin/dashboard/companies/${companyId}/edit/profile`)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Companies</h1>
          <p className="text-gray-600 mt-2">Manage all registered companies on your platform</p>
        </div>
        <div className="flex items-center space-x-2 text-sm text-gray-600">
          <span className="text-yellow-500 font-medium">Active Agent:</span>
          <span>Primary</span>
          <div className="flex items-center space-x-2 ml-4">
            <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
              <span className="text-xs">SY</span>
            </div>
            <span>syed.abd1997@gmail.com</span>
          </div>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Search companies..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={sortBy} onValueChange={setSortBy}>
          <SelectTrigger className="w-48">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="name">Sort by Name</SelectItem>
            <SelectItem value="dateAdded">Sort by Date Added</SelectItem>
            <SelectItem value="users">Sort by Users</SelectItem>
          </SelectContent>
        </Select>
        <Select value={filterCategory} onValueChange={setFilterCategory}>
          <SelectTrigger className="w-48">
            <SelectValue placeholder="Filter by Category" />
          </SelectTrigger>
          <SelectContent>
            {categories.map((category) => (
              <SelectItem key={category} value={category}>
                {category === "all" ? "All Categories" : category}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Companies Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredCompanies.map((company) => (
          <Card key={company.id} className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex flex-col items-center text-center space-y-4">
                <div className="w-20 h-20 bg-gray-200 rounded-lg flex items-center justify-center">
                  <img
                    src={company.logo || "/placeholder.svg"}
                    alt={`${company.name} logo`}
                    className="w-16 h-16 object-contain"
                  />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">{company.name}</h3>
                  <p className="text-sm text-gray-500">{company.category}</p>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge
                    variant={
                      company.status === "Active" ? "default" : company.status === "Inactive" ? "secondary" : "outline"
                    }
                  >
                    {company.status}
                  </Badge>
                  <span className="text-xs text-gray-500">{company.users} users</span>
                </div>
                <div className="text-xs text-gray-400">Added: {new Date(company.dateAdded).toLocaleDateString()}</div>
                <div className="flex space-x-2 w-full">
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1 bg-transparent"
                    onClick={() => handleViewCompany(company.id)}
                  >
                    <Eye className="h-4 w-4 mr-1" />
                    View
                  </Button>
                  <Button variant="default" size="sm" className="flex-1" onClick={() => handleEditCompany(company.id)}>
                    <Edit className="h-4 w-4 mr-1" />
                    Edit
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredCompanies.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">No companies found matching your criteria.</p>
        </div>
      )}
    </div>
  )
}
