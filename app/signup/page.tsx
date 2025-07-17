"use client"

import type React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { MessageSquare, Upload, Building, CheckCircle } from "lucide-react"
import { useAuth } from "@/components/auth-provider"

const countries = [
  "Afghanistan",
  "Albania",
  "Algeria",
  "Andorra",
  "Angola",
  "Antigua and Barbuda",
  "Argentina",
  "Armenia",
  "Australia",
  "Austria",
  "Azerbaijan",
  "Bahamas",
  "Bahrain",
  "Bangladesh",
  "Barbados",
  "Belarus",
  "Belgium",
  "Belize",
  "Benin",
  "Bhutan",
  "Bolivia",
  "Bosnia and Herzegovina",
  "Botswana",
  "Brazil",
  "Brunei",
  "Bulgaria",
  "Burkina Faso",
  "Burundi",
  "Cabo Verde",
  "Cambodia",
  "Cameroon",
  "Canada",
  "Central African Republic",
  "Chad",
  "Chile",
  "China",
  "Colombia",
  "Comoros",
  "Congo",
  "Costa Rica",
  "Croatia",
  "Cuba",
  "Cyprus",
  "Czech Republic",
  "Denmark",
  "Djibouti",
  "Dominica",
  "Dominican Republic",
  "Ecuador",
  "Egypt",
  "El Salvador",
  "Equatorial Guinea",
  "Eritrea",
  "Estonia",
  "Eswatini",
  "Ethiopia",
  "Fiji",
  "Finland",
  "France",
  "Gabon",
  "Gambia",
  "Georgia",
  "Germany",
  "Ghana",
  "Greece",
  "Grenada",
  "Guatemala",
  "Guinea",
  "Guinea-Bissau",
  "Guyana",
  "Haiti",
  "Honduras",
  "Hungary",
  "Iceland",
  "India",
  "Indonesia",
  "Iran",
  "Iraq",
  "Ireland",
  "Israel",
  "Italy",
  "Jamaica",
  "Japan",
  "Jordan",
  "Kazakhstan",
  "Kenya",
  "Kiribati",
  "Kuwait",
  "Kyrgyzstan",
  "Laos",
  "Latvia",
  "Lebanon",
  "Lesotho",
  "Liberia",
  "Libya",
  "Liechtenstein",
  "Lithuania",
  "Luxembourg",
  "Madagascar",
  "Malawi",
  "Malaysia",
  "Maldives",
  "Mali",
  "Malta",
  "Marshall Islands",
  "Mauritania",
  "Mauritius",
  "Mexico",
  "Micronesia",
  "Moldova",
  "Monaco",
  "Mongolia",
  "Montenegro",
  "Morocco",
  "Mozambique",
  "Myanmar",
  "Namibia",
  "Nauru",
  "Nepal",
  "Netherlands",
  "New Zealand",
  "Nicaragua",
  "Niger",
  "Nigeria",
  "North Korea",
  "North Macedonia",
  "Norway",
  "Oman",
  "Pakistan",
  "Palau",
  "Palestine",
  "Panama",
  "Papua New Guinea",
  "Paraguay",
  "Peru",
  "Philippines",
  "Poland",
  "Portugal",
  "Qatar",
  "Romania",
  "Russia",
  "Rwanda",
  "Saint Kitts and Nevis",
  "Saint Lucia",
  "Saint Vincent and the Grenadines",
  "Samoa",
  "San Marino",
  "Sao Tome and Principe",
  "Saudi Arabia",
  "Senegal",
  "Serbia",
  "Seychelles",
  "Sierra Leone",
  "Singapore",
  "Slovakia",
  "Slovenia",
  "Solomon Islands",
  "Somalia",
  "South Africa",
  "South Korea",
  "South Sudan",
  "Spain",
  "Sri Lanka",
  "Sudan",
  "Suriname",
  "Sweden",
  "Switzerland",
  "Syria",
  "Taiwan",
  "Tajikistan",
  "Tanzania",
  "Thailand",
  "Timor-Leste",
  "Togo",
  "Tonga",
  "Trinidad and Tobago",
  "Tunisia",
  "Turkey",
  "Turkmenistan",
  "Tuvalu",
  "Uganda",
  "Ukraine",
  "United Arab Emirates",
  "United Kingdom",
  "United States",
  "Uruguay",
  "Uzbekistan",
  "Vanuatu",
  "Vatican City",
  "Venezuela",
  "Vietnam",
  "Yemen",
  "Zambia",
  "Zimbabwe",
]

const industries = [
  "Technology",
  "Healthcare",
  "Finance",
  "Education",
  "Retail",
  "Manufacturing",
  "Real Estate",
  "Automotive",
  "Food & Beverage",
  "Travel & Tourism",
  "Media & Entertainment",
  "Telecommunications",
  "Energy",
  "Construction",
  "Agriculture",
  "Transportation",
  "Legal Services",
  "Consulting",
  "Marketing & Advertising",
  "Non-profit",
  "Government",
  "Insurance",
  "Banking",
  "E-commerce",
  "Software Development",
  "Biotechnology",
  "Pharmaceuticals",
  "Fashion",
  "Sports & Recreation",
  "Beauty & Cosmetics",
  "Gaming",
  "Aerospace",
  "Mining",
  "Logistics",
  "Security",
  "Environmental Services",
  "Architecture",
  "Interior Design",
  "Photography",
  "Music",
  "Art & Design",
  "Publishing",
  "Research & Development",
  "Human Resources",
  "Customer Service",
  "Sales",
  "Operations",
  "Supply Chain",
  "Quality Assurance",
  "Data Analytics",
]

const companySizes = [
  { value: "1-10", label: "1-10 employees" },
  { value: "11-50", label: "11-50 employees" },
  { value: "51-100", label: "51-100 employees" },
  { value: "101-500", label: "101-500 employees" },
  { value: "500+", label: "500+ employees" },
]

const plans = [
  { value: "basic", label: "Basic Plan - $29/month", description: "Perfect for small teams" },
  { value: "premium", label: "Premium Plan - $79/month", description: "Great for growing businesses" },
  { value: "enterprise", label: "Enterprise Plan - $199/month", description: "For large organizations" },
  { value: "custom", label: "Custom Plan - Contact us", description: "Tailored to your needs" },
]

export default function SignupPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    website: "",
    description: "",
    country: "",
    city: "",
    postalCode: "",
    address: "",
    industry: "",
    companySize: "",
    companySince: "",
    plan: "",
    logo: null as File | null,
  })
  const [isLoading, setIsLoading] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const router = useRouter()
  const { login } = useAuth()

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  const validatePhone = (phone: string) => {
    const phoneRegex = /^[+]?[1-9][\d]{0,15}$/
    return phoneRegex.test(phone.replace(/[\s\-$$$$]/g, ""))
  }

  const validateWebsite = (website: string) => {
    try {
      new URL(website.startsWith("http") ? website : `https://${website}`)
      return true
    } catch {
      return false
    }
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))

    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }))
    }

    // Real-time validation
    if (field === "email" && value && !validateEmail(value)) {
      setErrors((prev) => ({ ...prev, email: "Please enter a valid email address" }))
    }
    if (field === "phone" && value && !validatePhone(value)) {
      setErrors((prev) => ({ ...prev, phone: "Please enter a valid phone number" }))
    }
    if (field === "website" && value && !validateWebsite(value)) {
      setErrors((prev) => ({ ...prev, website: "Please enter a valid website URL" }))
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        // 5MB limit
        setErrors((prev) => ({ ...prev, logo: "File size must be less than 5MB" }))
        return
      }
      if (!file.type.startsWith("image/")) {
        setErrors((prev) => ({ ...prev, logo: "Please upload an image file" }))
        return
      }
      setFormData((prev) => ({ ...prev, logo: file }))
      setErrors((prev) => ({ ...prev, logo: "" }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Validation
    const newErrors: Record<string, string> = {}

    if (!formData.name.trim()) newErrors.name = "Company name is required"
    if (!formData.email.trim()) newErrors.email = "Email is required"
    else if (!validateEmail(formData.email)) newErrors.email = "Please enter a valid email"
    if (!formData.phone.trim()) newErrors.phone = "Phone number is required"
    else if (!validatePhone(formData.phone)) newErrors.phone = "Please enter a valid phone number"
    if (formData.website && !validateWebsite(formData.website)) newErrors.website = "Please enter a valid website URL"
    if (!formData.description.trim()) newErrors.description = "Company description is required"
    if (!formData.country.trim()) newErrors.country = "Country is required"
    if (!formData.city.trim()) newErrors.city = "City is required"
    if (!formData.postalCode.trim()) newErrors.postalCode = "Postal code is required"
    if (!formData.address.trim()) newErrors.address = "Address is required"
    if (!formData.industry) newErrors.industry = "Industry is required"
    if (!formData.companySize) newErrors.companySize = "Company size is required"
    if (!formData.companySince) newErrors.companySince = "Company founding year is required"
    else if (Number.parseInt(formData.companySince) > new Date().getFullYear()) {
      newErrors.companySince = "Founding year cannot be in the future"
    }
    if (!formData.plan) newErrors.plan = "Please select a plan"

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    setIsLoading(true)

    // Prepare data for backend
    const signupData = {
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      website: formData.website || null,
      description: formData.description,
      address: `${formData.address}, ${formData.city}, ${formData.postalCode}, ${formData.country}`,
      industry: formData.industry,
      company_size: formData.companySize,
      company_since: Number.parseInt(formData.companySince),
      plan: formData.plan,
      logo: formData.logo,
      // Default values (not shown in form)
      status: "Pending",
      last_login: null,
      users: [],
      monthly_usage: 0,
      created_at: null,
      updated_at: null,
    }

    // Simulate API call for 2 seconds
    await new Promise((resolve) => setTimeout(resolve, 2000))

    setIsLoading(false)
    setShowSuccess(true)

    // Show success message for 5 seconds then redirect to login
    setTimeout(() => {
      router.push("/login")
    }, 5000)
  }

  if (showSuccess) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 p-4">
        <Card className="w-full max-w-md shadow-xl border-0">
          <CardContent className="p-8 text-center">
            <div className="flex justify-center mb-6">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                <CheckCircle className="w-8 h-8 text-green-600" />
              </div>
            </div>
            <h2 className="text-2xl font-bold text-slate-800 mb-4">Request Submitted!</h2>
            <p className="text-slate-600 mb-6">
              Your company registration request is being processed. You will receive an email confirmation shortly.
            </p>
            <div className="flex items-center justify-center space-x-2 text-sm text-slate-500">
              <div className="w-4 h-4 border-2 border-teal-600 border-t-transparent rounded-full animate-spin"></div>
              <span>Redirecting to login page...</span>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 p-4">
      <Card className="w-full max-w-2xl shadow-xl border-0">
        <CardHeader className="space-y-4 text-center">
          <div className="flex items-center justify-center space-x-2">
            <div className="w-10 h-10 bg-gradient-to-br from-teal-600 to-teal-700 rounded-lg flex items-center justify-center">
              <MessageSquare className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold text-slate-800">Smart Convo</span>
          </div>
          <div>
            <CardTitle className="text-2xl text-slate-800 flex items-center justify-center gap-2">
              <Building className="w-6 h-6" />
              Create Company Account
            </CardTitle>
            <CardDescription className="text-slate-600">
              Register your company to get started with Smart Convo
            </CardDescription>
          </div>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Basic Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-slate-800 border-b pb-2">Basic Information</h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-slate-700">
                    Company Name *
                  </Label>
                  <Input
                    id="name"
                    placeholder="Enter company name"
                    value={formData.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                    className={`h-11 transition-all duration-200 ${errors.name ? "border-red-500 focus:border-red-500" : "focus:border-teal-500"}`}
                  />
                  {errors.name && <p className="text-sm text-red-500">{errors.name}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email" className="text-slate-700">
                    Company Email *
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="company@example.com"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    className={`h-11 transition-all duration-200 ${errors.email ? "border-red-500 focus:border-red-500" : "focus:border-teal-500"}`}
                  />
                  {errors.email && <p className="text-sm text-red-500">{errors.email}</p>}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="phone" className="text-slate-700">
                    Phone Number *
                  </Label>
                  <Input
                    id="phone"
                    placeholder="+1 (555) 123-4567"
                    value={formData.phone}
                    onChange={(e) => handleInputChange("phone", e.target.value)}
                    className={`h-11 transition-all duration-200 ${errors.phone ? "border-red-500 focus:border-red-500" : "focus:border-teal-500"}`}
                  />
                  {errors.phone && <p className="text-sm text-red-500">{errors.phone}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="website" className="text-slate-700">
                    Website
                  </Label>
                  <Input
                    id="website"
                    placeholder="https://www.company.com"
                    value={formData.website}
                    onChange={(e) => handleInputChange("website", e.target.value)}
                    className={`h-11 transition-all duration-200 ${errors.website ? "border-red-500 focus:border-red-500" : "focus:border-teal-500"}`}
                  />
                  {errors.website && <p className="text-sm text-red-500">{errors.website}</p>}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description" className="text-slate-700">
                  Company Description *
                </Label>
                <Textarea
                  id="description"
                  placeholder="Tell us about your company..."
                  value={formData.description}
                  onChange={(e) => handleInputChange("description", e.target.value)}
                  className={`min-h-[100px] transition-all duration-200 ${errors.description ? "border-red-500 focus:border-red-500" : "focus:border-teal-500"}`}
                />
                {errors.description && <p className="text-sm text-red-500">{errors.description}</p>}
              </div>
            </div>

            {/* Address Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-slate-800 border-b pb-2">Address Information</h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="country" className="text-slate-700">
                    Country *
                  </Label>
                  <Select value={formData.country} onValueChange={(value) => handleInputChange("country", value)}>
                    <SelectTrigger
                      className={`h-11 transition-all duration-200 ${errors.country ? "border-red-500 focus:border-red-500" : "focus:border-teal-500"}`}
                    >
                      <SelectValue placeholder="Select country" />
                    </SelectTrigger>
                    <SelectContent className="max-h-60">
                      {countries.map((country) => (
                        <SelectItem key={country} value={country}>
                          {country}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.country && <p className="text-sm text-red-500">{errors.country}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="city" className="text-slate-700">
                    City *
                  </Label>
                  <Input
                    id="city"
                    placeholder="New York"
                    value={formData.city}
                    onChange={(e) => handleInputChange("city", e.target.value)}
                    className={`h-11 transition-all duration-200 ${errors.city ? "border-red-500 focus:border-red-500" : "focus:border-teal-500"}`}
                  />
                  {errors.city && <p className="text-sm text-red-500">{errors.city}</p>}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="postalCode" className="text-slate-700">
                    Postal Code *
                  </Label>
                  <Input
                    id="postalCode"
                    placeholder="10001"
                    value={formData.postalCode}
                    onChange={(e) => handleInputChange("postalCode", e.target.value)}
                    className={`h-11 transition-all duration-200 ${errors.postalCode ? "border-red-500 focus:border-red-500" : "focus:border-teal-500"}`}
                  />
                  {errors.postalCode && <p className="text-sm text-red-500">{errors.postalCode}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="address" className="text-slate-700">
                    Street Address *
                  </Label>
                  <Input
                    id="address"
                    placeholder="123 Main Street"
                    value={formData.address}
                    onChange={(e) => handleInputChange("address", e.target.value)}
                    className={`h-11 transition-all duration-200 ${errors.address ? "border-red-500 focus:border-red-500" : "focus:border-teal-500"}`}
                  />
                  {errors.address && <p className="text-sm text-red-500">{errors.address}</p>}
                </div>
              </div>
            </div>

            {/* Company Details */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-slate-800 border-b pb-2">Company Details</h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="industry" className="text-slate-700">
                    Industry *
                  </Label>
                  <Select value={formData.industry} onValueChange={(value) => handleInputChange("industry", value)}>
                    <SelectTrigger
                      className={`h-11 transition-all duration-200 ${errors.industry ? "border-red-500 focus:border-red-500" : "focus:border-teal-500"}`}
                    >
                      <SelectValue placeholder="Select industry" />
                    </SelectTrigger>
                    <SelectContent className="max-h-60">
                      {industries.map((industry) => (
                        <SelectItem key={industry} value={industry}>
                          {industry}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.industry && <p className="text-sm text-red-500">{errors.industry}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="companySize" className="text-slate-700">
                    Company Size *
                  </Label>
                  <Select
                    value={formData.companySize}
                    onValueChange={(value) => handleInputChange("companySize", value)}
                  >
                    <SelectTrigger
                      className={`h-11 transition-all duration-200 ${errors.companySize ? "border-red-500 focus:border-red-500" : "focus:border-teal-500"}`}
                    >
                      <SelectValue placeholder="Select company size" />
                    </SelectTrigger>
                    <SelectContent>
                      {companySizes.map((size) => (
                        <SelectItem key={size.value} value={size.value}>
                          {size.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.companySize && <p className="text-sm text-red-500">{errors.companySize}</p>}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="companySince" className="text-slate-700">
                    Company Since *
                  </Label>
                  <Input
                    id="companySince"
                    type="number"
                    min="1800"
                    max={new Date().getFullYear()}
                    placeholder="2020"
                    value={formData.companySince}
                    onChange={(e) => handleInputChange("companySince", e.target.value)}
                    className={`h-11 transition-all duration-200 ${errors.companySince ? "border-red-500 focus:border-red-500" : "focus:border-teal-500"}`}
                  />
                  {errors.companySince && <p className="text-sm text-red-500">{errors.companySince}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="logo" className="text-slate-700">
                    Company Logo
                  </Label>
                  <div className="relative">
                    <Input id="logo" type="file" accept="image/*" onChange={handleFileChange} className="hidden" />
                    <Button
                      type="button"
                      variant="outline"
                      className="w-full h-11 justify-start bg-transparent"
                      onClick={() => document.getElementById("logo")?.click()}
                    >
                      <Upload className="w-4 h-4 mr-2" />
                      {formData.logo ? formData.logo.name : "Upload logo"}
                    </Button>
                  </div>
                  {errors.logo && <p className="text-sm text-red-500">{errors.logo}</p>}
                </div>
              </div>
            </div>

            {/* Plan Selection */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-slate-800 border-b pb-2">Select Plan</h3>

              <div className="space-y-2">
                <Label htmlFor="plan" className="text-slate-700">
                  Choose Your Plan *
                </Label>
                <Select value={formData.plan} onValueChange={(value) => handleInputChange("plan", value)}>
                  <SelectTrigger
                    className={`h-11 transition-all duration-200 ${errors.plan ? "border-red-500 focus:border-red-500" : "focus:border-teal-500"}`}
                  >
                    <SelectValue placeholder="Select a plan" />
                  </SelectTrigger>
                  <SelectContent>
                    {plans.map((plan) => (
                      <SelectItem key={plan.value} value={plan.value}>
                        <div className="flex flex-col">
                          <span className="font-medium">{plan.label}</span>
                          <span className="text-sm text-slate-500">{plan.description}</span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.plan && <p className="text-sm text-red-500">{errors.plan}</p>}
              </div>
            </div>

            <Button
              type="submit"
              className="w-full h-12 bg-teal-600 hover:bg-teal-700 text-white text-lg font-medium transition-all duration-200 transform hover:scale-[1.02]"
              disabled={isLoading}
            >
              {isLoading ? (
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Creating Account...</span>
                </div>
              ) : (
                "Create Company Account"
              )}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-slate-600">
              Already have an account?{" "}
              <Link
                href="/login"
                className="text-teal-600 hover:text-teal-700 font-medium transition-colors duration-200"
              >
                Sign in
              </Link>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
