"use client"

import { useEffect, useState, useCallback } from "react"
import { useRouter } from "next/navigation"
import { useToast } from "@/hooks/use-toast"
import Cookies from "js-cookie"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search } from "lucide-react"

export default function CompaniesPage() {
  const [companies, setCompanies] = useState<any[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [sortBy, setSortBy] = useState("name")
  const { toast } = useToast()
  const router = useRouter()

  const fetchCompanies = useCallback(async () => {
    const token = Cookies.get("adminToken")
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/companies/`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${token || ""}`,
        },
      })
      const data = await res.json()
      if (Array.isArray(data)) setCompanies(data)
      else if (Array.isArray(data.results)) setCompanies(data.results)
    } catch (err) {
      console.error("Failed to fetch companies", err)
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to load companies",
      })
    }
  }, [toast])

  useEffect(() => {
    fetchCompanies()
  }, [fetchCompanies])

  const filteredCompanies = companies
    .filter((c) => c.name.toLowerCase().includes(searchTerm.toLowerCase()))
    .sort((a, b) => {
      switch (sortBy) {
        case "name":
          return a.name.localeCompare(b.name)
        case "date":
          return new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
        default:
          return 0
      }
    })

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Companies</h1>
        <div className="relative w-72">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Search companies..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={sortBy} onValueChange={setSortBy}>
          <SelectTrigger className="w-40">
            <SelectValue placeholder="Sort By" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="name">Sort by Name</SelectItem>
            <SelectItem value="date">Sort by Date</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredCompanies.map((company) => (
          <Card
            key={company.id}
            onClick={() =>
                router.push(`/admin/dashboard/agent-settings/agents?companyId=${company.id}`)
            }
            className="cursor-pointer relative hover:shadow-lg transition-shadow group"
            >
            <CardContent className="p-6 flex flex-col items-center text-center space-y-3">
                <div className="w-20 h-20 bg-gray-200 rounded-lg flex items-center justify-center">
                <img
                    src={company.logo || "/placeholder.svg"}
                    alt={`${company.name} logo`}
                    className="w-16 h-16 object-contain"
                />
                </div>
                <h3 className="font-semibold text-lg">{company.name}</h3>
                <p className="text-sm text-gray-500">{company.industry}</p>
                <p className="text-xs text-gray-400">
                Added: {new Date(company.created_at).toLocaleDateString()}
                </p>
            </CardContent>
            </Card>

        ))}
      </div>
    </div>
  )
}
