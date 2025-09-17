// "use client"

// import { useEffect, useState, useCallback } from "react"
// import { useToast } from "@/hooks/use-toast"
// import Cookies from "js-cookie"
// import { Card, CardContent } from "@/components/ui/card"
// import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
// import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
// import { Label } from "@/components/ui/label"
// import { Search } from "lucide-react"
// import PhoneInput from "react-phone-input-2"
// import "react-phone-input-2/lib/style.css"
// import { parsePhoneNumberFromString } from "libphonenumber-js"

// export default function CompaniesAssignPage() {
//   const [companies, setCompanies] = useState<any[]>([])
//   const [searchTerm, setSearchTerm] = useState("")
//   const [sortBy, setSortBy] = useState("name")
//   const [hoveredCompany, setHoveredCompany] = useState<number | null>(null)
//   const [assignDialogOpen, setAssignDialogOpen] = useState(false)
//   const [selectedCompany, setSelectedCompany] = useState<any>(null)
//   const [phoneNumber, setPhoneNumber] = useState("")
//   const { toast } = useToast()

//   const [numbersDialogOpen, setNumbersDialogOpen] = useState(false)
//   const [numbersToShow, setNumbersToShow] = useState<string[]>([])

//   // ⬇️ make fetchCompanies reusable
//   const fetchCompanies = useCallback(async () => {
//     const token = Cookies.get("adminToken")
//     try {
//       const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/companies/`, {
//         headers: {
//           "Content-Type": "application/json",
//           "Authorization": `Token ${token || ""}`,
//         },
//       })
//       const data = await res.json()
//       console.log("Fetched companies:", data)
//       if (Array.isArray(data)) setCompanies(data)
//       else if (Array.isArray(data.results)) setCompanies(data.results)
//     } catch (err) {
//       console.error("Failed to fetch companies", err)
//     }
//   }, [])

//   useEffect(() => {
//     fetchCompanies()
//   }, [fetchCompanies])

//   const filteredCompanies = companies
//     .filter((c) => {
//       const term = searchTerm.toLowerCase()
//       return (
//         c.name.toLowerCase().includes(term) ||
//         (c.twilio_phone_numbers &&
//           c.twilio_phone_numbers.some((num: string) =>
//             num.toString().includes(term)
//           ))
//       )
//     })
//     .sort((a, b) => {
//       switch (sortBy) {
//         case "name":
//           return a.name.localeCompare(b.name)
//         case "date":
//           return new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
//         default:
//           return 0
//       }
//     })

//   const handleAssign = async () => {
//     if (!phoneNumber || phoneNumber.length < 6) {
//       toast({
//         variant: "destructive",
//         title: "Invalid number",
//         description: "Please enter a valid phone number.",
//       })
//       return
//     }
//     try {
//       const token = Cookies.get("adminToken")
//       const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/public/company/twilio-phones/`, {
//         method: "PATCH",
//         headers: {
//           "Content-Type": "application/json",
//           "Authorization": `Token ${token || ""}`,
//         },
//         body: JSON.stringify({
//           company_email: selectedCompany?.email,
//           phone_numbers: [`+${phoneNumber}`],
//         }),
//       })

//       if (!res.ok) throw new Error("Request failed")

//       const data = await res.json()
//       console.log("Assign response:", data)

//       toast({
//         title: "Success",
//         description: "Phone numbers added successfully!",
//       })
//       setAssignDialogOpen(false)
//       setPhoneNumber("")

//       // 🔄 refresh the companies list
//       await fetchCompanies()
//     } catch (err) {
//       console.error("Assign failed", err)
//       toast({
//         variant: "destructive",
//         title: "Failed",
//         description: "Could not assign number. Please try again.",
//       })
//     }
//   }



//   // Helper: infer country from phone number
//   const getCountryFromPhone = (number: string) => {
//     try {
//       const parsed = parsePhoneNumberFromString("+" + number.replace(/^\+/, ""))
//       return parsed ? parsed.country : null
//     } catch {
//       return null
//     }
//   }

//   return (
//     <div className="space-y-6">
//       <div className="flex items-center justify-between">
//         <h1 className="text-3xl font-bold text-gray-900">Companies</h1>
//         <div className="relative w-72">
//           <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
//           <Input
//             placeholder="Search companies..."
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//             className="pl-10"
//           />
//         </div>
//         <Select value={sortBy} onValueChange={setSortBy}>
//           <SelectTrigger className="w-40">
//             <SelectValue placeholder="Sort By" />
//           </SelectTrigger>
//           <SelectContent>
//             <SelectItem value="name">Sort by Name</SelectItem>
//             <SelectItem value="date">Sort by Date</SelectItem>
//           </SelectContent>
//         </Select>
//       </div>

//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
//         {filteredCompanies.map((company) => {
//           const numbers: string[] = company.twilio_phone_numbers || []
//           return (
//             <Card
//               key={company.id}
//               onMouseEnter={() => setHoveredCompany(company.id)}
//               onMouseLeave={() => setHoveredCompany(null)}
//               className="relative hover:shadow-lg transition-shadow group"
//             >
//               <CardContent className="p-6 flex flex-col items-center text-center space-y-3">
//                 <div className="w-20 h-20 bg-gray-200 rounded-lg flex items-center justify-center">
//                   <img
//                     src={company.logo || "/placeholder.svg"}
//                     alt={`${company.name} logo`}
//                     className="w-16 h-16 object-contain"
//                   />
//                 </div>
//                 <h3 className="font-semibold text-lg">{company.name}</h3>
//                 <p className="text-sm text-gray-500">{company.industry}</p>
//                 <p className="text-xs text-gray-400">
//                   Added: {new Date(company.created_at).toLocaleDateString()}
//                 </p>

//                 {numbers.length === 0 ? (
//                   <p className="text-sm text-red-500">No numbers assigned</p>
//                 ) : (
//                   <Button
//                     variant="outline"
//                     size="sm"
//                     onClick={() => {
//                       setNumbersToShow(numbers)
//                       setNumbersDialogOpen(true)
//                     }}
//                   >
//                     View {numbers.length} Number{numbers.length > 1 ? "s" : ""}
//                   </Button>
//                 )}

//                 {/* Assign Number Button (space reserved, fades in on hover) */}
//                 <div className="h-10 flex items-center">
//                   <Button
//                     variant="default"
//                     size="sm"
//                     className="opacity-0 group-hover:opacity-100 transition"
//                     onClick={() => {
//                       setSelectedCompany(company)
//                       setAssignDialogOpen(true)
//                     }}
//                   >
//                     Assign Number
//                   </Button>
//                 </div>
//               </CardContent>
//             </Card>
//           )
//         })}
//       </div>

//       {/* Assign Number Dialog */}
//       <Dialog open={assignDialogOpen} onOpenChange={setAssignDialogOpen}>
//         <DialogContent className="sm:max-w-md">
//           <DialogHeader>
//             <DialogTitle>Assign Number to {selectedCompany?.name}</DialogTitle>
//           </DialogHeader>
//           <div className="space-y-4 py-2">
//             <div>
//               <Label>Phone Number</Label>
//               <PhoneInput
//                 country={"us"}
//                 value={phoneNumber}
//                 onChange={(value) => setPhoneNumber(value)}
//                 inputClass="!w-full !h-10 !text-base !pl-12"
//                 dropdownClass="text-sm"
//                 enableSearch
//               />
//             </div>
//           </div>

//           <DialogFooter>
//             <Button onClick={handleAssign} className="w-full">
//               Assign
//             </Button>
//           </DialogFooter>
//         </DialogContent>
//       </Dialog>

//       {/* Numbers Dialog */}
//       <Dialog open={numbersDialogOpen} onOpenChange={setNumbersDialogOpen}>
//         <DialogContent className="sm:max-w-md">
//           <DialogHeader>
//             <DialogTitle>Assigned Numbers</DialogTitle>
//           </DialogHeader>
//           <div className="space-y-3">
//             {numbersToShow.map((num, idx) => {
//               const country = getCountryFromPhone(num)

//               const handleDelete = async () => {
//                 try {
//                   const token = Cookies.get("adminToken")
//                   console.log("Deleting number:", num, "for company:", selectedCompany?.email)
//                   const res = await fetch(
//                     `${process.env.NEXT_PUBLIC_BASE_URL}/public/company/twilio-phones/`,
//                     {
//                       method: "DELETE",
//                       headers: {
//                         "Content-Type": "application/json",
//                         "Authorization": `Token ${token || ""}`,
//                       },
//                       body: JSON.stringify({
//                         email: selectedCompany?.email,
//                         phone_number: num,
//                       }),
//                     }
//                   )

//                   if (!res.ok) throw new Error("Delete failed")

//                   toast({
//                     title: "Deleted",
//                     description: `Number ${num} removed successfully.`,
//                   })

//                   // update UI locally
//                   setNumbersToShow((prev) =>
//                     prev.filter((n) => n !== num)
//                   )
//                   await fetchCompanies()
//                 } catch (err) {
//                   console.error("Delete failed", err)
//                   toast({
//                     variant: "destructive",
//                     title: "Failed",
//                     description: "Could not delete number. Please try again.",
//                   })
//                 }
//               }

//               return (
//                 <div
//                   key={idx}
//                   className="flex items-center justify-between text-sm font-medium text-gray-700"
//                 >
//                   <span>
//                     📞 +{num} {country && `(${country})`}
//                   </span>
//                   <Button
//                     variant="destructive"
//                     size="sm"
//                     onClick={handleDelete}
//                   >
//                     Delete
//                   </Button>
//                 </div>
//               )
//             })}
//           </div>
//           <DialogFooter>
//             <Button onClick={() => setNumbersDialogOpen(false)}>Close</Button>
//           </DialogFooter>
//         </DialogContent>
//       </Dialog>

//     </div>
//   )
// }

"use client"

import { useEffect, useState, useCallback } from "react"
import { useToast } from "@/hooks/use-toast"
import Cookies from "js-cookie"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Search } from "lucide-react"
import PhoneInput from "react-phone-input-2"
import "react-phone-input-2/lib/style.css"
import { parsePhoneNumberFromString } from "libphonenumber-js"

export default function CompaniesAssignPage() {
  const [companies, setCompanies] = useState<any[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [sortBy, setSortBy] = useState("name")
  const [hoveredCompany, setHoveredCompany] = useState<number | null>(null)
  const [assignDialogOpen, setAssignDialogOpen] = useState(false)
  const [selectedCompany, setSelectedCompany] = useState<any>(null)
  const [phoneNumber, setPhoneNumber] = useState("")
  const { toast } = useToast()

  const [numbersDialogOpen, setNumbersDialogOpen] = useState(false)
  const [numbersToShow, setNumbersToShow] = useState<string[]>([])

  // ⬇️ make fetchCompanies reusable
  const fetchCompanies = useCallback(async () => {
    const token = Cookies.get("adminToken")
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/companies/`, {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Token ${token || ""}`,
        },
      })
      const data = await res.json()
      console.log("Fetched companies:", data)
      if (Array.isArray(data)) setCompanies(data)
      else if (Array.isArray(data.results)) setCompanies(data.results)
    } catch (err) {
      console.error("Failed to fetch companies", err)
    }
  }, [])

  useEffect(() => {
    fetchCompanies()
  }, [fetchCompanies])

  const filteredCompanies = companies
    .filter((c) => {
      const term = searchTerm.toLowerCase()
      return (
        c.name.toLowerCase().includes(term) ||
        (c.twilio_phone_numbers &&
          c.twilio_phone_numbers.some((num: string) =>
            num.toString().includes(term)
          ))
      )
    })
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

  const handleAssign = async () => {
    if (!phoneNumber || phoneNumber.length < 6) {
      toast({
        variant: "destructive",
        title: "Invalid number",
        description: "Please enter a valid phone number.",
      })
      return
    }
    try {
      const token = Cookies.get("adminToken")
      const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/public/company/twilio-phones/`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Token ${token || ""}`,
        },
        body: JSON.stringify({
          company_email: selectedCompany?.email,
          phone_numbers: [`+${phoneNumber}`],
        }),
      })

      if (!res.ok) throw new Error("Request failed")

      const data = await res.json()
      console.log("Assign response:", data)

      toast({
        title: "Success",
        description: "Phone numbers added successfully!",
      })
      setAssignDialogOpen(false)
      setPhoneNumber("")

      // 🔄 refresh the companies list
      await fetchCompanies()
    } catch (err) {
      console.error("Assign failed", err)
      toast({
        variant: "destructive",
        title: "Failed",
        description: "Could not assign number. Please try again.",
      })
    }
  }

  // ⬇️ DELETE handler moved here
  const handleDeleteNumber = async (num: string) => {
    try {
      const token = Cookies.get("adminToken")
      console.log("Deleting number:", num, "for company:", selectedCompany?.email)
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/public/company/twilio-phones/`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Token ${token || ""}`,
          },
          body: JSON.stringify({
            email: selectedCompany?.email,
            phone_number: num,
          }),
        }
      )

      if (!res.ok) throw new Error("Delete failed")

      toast({
        title: "Deleted",
        description: `Number ${num} removed successfully.`,
      })

      // update UI locally
      setNumbersToShow((prev) => prev.filter((n) => n !== num))
      await fetchCompanies()
    } catch (err) {
      console.error("Delete failed", err)
      toast({
        variant: "destructive",
        title: "Failed",
        description: "Could not delete number. Please try again.",
      })
    }
  }

  // Helper: infer country from phone number
  const getCountryFromPhone = (number: string) => {
    try {
      const parsed = parsePhoneNumberFromString("+" + number.replace(/^\+/, ""))
      return parsed ? parsed.country : null
    } catch {
      return null
    }
  }

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
        {filteredCompanies.map((company) => {
          const numbers: string[] = company.twilio_phone_numbers || []
          return (
            <Card
              key={company.id}
              onMouseEnter={() => setHoveredCompany(company.id)}
              onMouseLeave={() => setHoveredCompany(null)}
              className="relative hover:shadow-lg transition-shadow group"
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

                {numbers.length === 0 ? (
                  <p className="text-sm text-red-500">No numbers assigned</p>
                ) : (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setSelectedCompany(company)
                      setNumbersToShow(numbers)
                      setNumbersDialogOpen(true)
                    }}
                  >
                    View {numbers.length} Number{numbers.length > 1 ? "s" : ""}
                  </Button>
                )}

                {/* Assign Number Button (space reserved, fades in on hover) */}
                <div className="h-10 flex items-center">
                  <Button
                    variant="default"
                    size="sm"
                    className="opacity-0 group-hover:opacity-100 transition"
                    onClick={() => {
                      setSelectedCompany(company)
                      setAssignDialogOpen(true)
                    }}
                  >
                    Add Number
                  </Button>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Assign Number Dialog */}
      <Dialog open={assignDialogOpen} onOpenChange={setAssignDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Assign Number to {selectedCompany?.name}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div>
              <Label>Phone Number</Label>
              <PhoneInput
                country={"us"}
                value={phoneNumber}
                onChange={(value) => setPhoneNumber(value)}
                inputClass="!w-full !h-10 !text-base !pl-12"
                dropdownClass="text-sm"
                enableSearch
              />
            </div>
          </div>

          <DialogFooter>
            <Button onClick={handleAssign} className="w-full">
              Assign
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Numbers Dialog */}
      <Dialog open={numbersDialogOpen} onOpenChange={setNumbersDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Assigned Numbers</DialogTitle>
          </DialogHeader>
          <div className="space-y-3">
            {numbersToShow.map((num, idx) => {
              const country = getCountryFromPhone(num)
              return (
                <div
                  key={idx}
                  className="flex items-center justify-between text-sm font-medium text-gray-700"
                >
                  <span>
                    📞 +{num} {country && `(${country})`}
                  </span>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => handleDeleteNumber(num)}
                  >
                    Delete
                  </Button>
                </div>
              )
            })}
          </div>
          <DialogFooter>
            <Button onClick={() => setNumbersDialogOpen(false)}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
