"use client"

import { useState } from "react"
import { useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useToast } from "@/hooks/use-toast"
import { cn } from "@/lib/utils"
import { Mail, CheckCircle, Copy } from "lucide-react"
import Cookies from "js-cookie"

interface UserData {
  id: string
  firstName: string
  lastName: string
  email: string
  role: "admin" | "member"
  status: "Active" | "Inactive" | "Pending"
  companyId: string // Assuming current company's ID
  profilePic: string | null
  lastLogin: string | null // ISO date string or null
  dateCreated: string // ISO date string
}

// Dummy data for users
const initialUsers: UserData[] = [
  {
    id: "user1",
    firstName: "Alice",
    lastName: "Smith",
    email: "alice@example.com",
    role: "admin",
    status: "Active",
    companyId: "company123",
    profilePic: "/placeholder.svg?height=64&width=64",
    lastLogin: "2024-07-14T10:00:00Z",
    dateCreated: "2024-01-10T09:00:00Z",
  },
  {
    id: "user2",
    firstName: "Bob",
    lastName: "Johnson",
    email: "bob@example.com",
    role: "member",
    status: "Pending",
    companyId: "company123",
    profilePic: null,
    lastLogin: null,
    dateCreated: "2024-07-15T11:30:00Z",
  },
  {
    id: "user3",
    firstName: "Charlie",
    lastName: "Brown",
    email: "charlie@example.com",
    role: "member",
    status: "Inactive",
    companyId: "company123",
    profilePic: "/placeholder.svg?height=64&width=64",
    lastLogin: "2024-06-20T14:00:00Z",
    dateCreated: "2024-03-01T10:00:00Z",
  },
]


export default function UsersPage() {
  const [users, setUsers] = useState<UserData[]>([])
  const [isAddUserModalOpen, setIsAddUserModalOpen] = useState(false)
  const [isManageUserModalOpen, setIsManageUserModalOpen] = useState(false)
  const [selectedUser, setSelectedUser] = useState<UserData | null>(null)
  const { toast } = useToast()

  // State for Add User form
  const [newUserData, setNewUserData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    role: "member" as "admin" | "member",
  })
  const [otp, setOtp] = useState("")
  const [otpSent, setOtpSent] = useState(false)
  const [otpVerified, setOtpVerified] = useState(false)
  const [generatedPassword, setGeneratedPassword] = useState("")
  const [addUserLoading, setAddUserLoading] = useState(false)

  // State for Manage User form
  const [manageUserRole, setManageUserRole] = useState<"admin" | "member">("member")
  const [manageUserStatus, setManageUserStatus] = useState<"Active" | "Inactive">("Active")
  const [manageUserLoading, setManageUserLoading] = useState(false)

  useEffect(() => {
  const fetchUsers = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/company-users/`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Token ${Cookies.get("Token") || ""}`,
        },
      })

      if (!response.ok) {
        throw new Error("Failed to fetch users")
      }

      const data = await response.json()
      console.log("Fetched users:", data)
  

      const mappedUsers = data.map((user: any, index: number) => ({
        id: user.id || `user${index + 1}`,
        firstName: user.user_first_name,
        lastName: user.user_last_name,
        email: user.user_email,
        role: user.role,
        status: user.status || "Pending",
        companyId: user.user_company || "company123",
        profilePic: user.image || "/placeholder.svg?height=64&width=64",
        lastLogin: user.user_last_login || null,
        dateCreated: user.user_date_joined || new Date().toISOString(),
      }))

      console.log("Mapped users:", mappedUsers)

      setUsers(mappedUsers)
    } catch (error: any) {
      console.error("Error fetching users:", error.message)
      toast({
        title: "Error loading users",
        description: error.message || "Could not fetch users from server.",
        variant: "destructive",
      })
    }
  }

  fetchUsers()
}, [])


  const generateRandomPassword = (length = 12) => {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()"
    let password = ""
    for (let i = 0; i < length; i++) {
      password += chars.charAt(Math.floor(Math.random() * chars.length))
    }
    return password
  }

  const handleSendOtp = async () => {
    if (!newUserData.email || !/\S+@\S+\.\S+/.test(newUserData.email)) {
      toast({
        title: "Invalid Email",
        description: "Please enter a valid email address.",
        variant: "destructive",
      })
      return
    }
    setAddUserLoading(true)
    // Simulate OTP sending
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setOtpSent(true)
    toast({
      title: "OTP Sent",
      description: "A verification code has been sent to your email.",
    })
    setAddUserLoading(false)
  }

  const handleVerifyOtp = async () => {
    if (otp === "123456") {
      // Demo OTP
      setAddUserLoading(true)
      await new Promise((resolve) => setTimeout(resolve, 500))
      setOtpVerified(true)
      toast({
        title: "OTP Verified",
        description: "Email successfully verified.",
      })
      setAddUserLoading(false)
    } else {
      toast({
        title: "Invalid OTP",
        description: "Please enter the correct verification code.",
        variant: "destructive",
      })
    }

  }


  const handleAddUserSubmit = async () => {
  if (!newUserData.firstName || !newUserData.lastName || !newUserData.email || !otpVerified) {
    toast({
      title: "Missing Information",
      description: "Please fill all fields and verify email.",
      variant: "destructive",
    })
    return
  }

  setAddUserLoading(true)
  const newPassword = generateRandomPassword()
  setGeneratedPassword(newPassword)

  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/company-users/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Token ${Cookies.get("Token") || ""}`, // Use token from cookies
      },
      body: JSON.stringify({
        email: newUserData.email,
        password: newPassword,
        first_name: newUserData.firstName,
        last_name: newUserData.lastName,
        role: newUserData.role
      }),
    })
    const responseData = await response.json()

    if (!response.ok) {
      throw new Error(responseData.message || "Failed to create user")
    }

    if (responseData.role) {
      toast({
        title: "User Added Successfully!",
        description: "Random password generated. Please provide it to the user.",
      })
    }


    // Add to local UI state 
    const newUser: UserData = {
      id: `user${users.length + 1}`,
      firstName: newUserData.firstName,
      lastName: newUserData.lastName,
      email: newUserData.email,
      role: newUserData.role,
      status: "Pending",
      companyId: "company123",
      profilePic: null,
      lastLogin: null,
      dateCreated: new Date().toISOString(),
    }

    setUsers((prev) => [...prev, newUser])
    toast({
      title: "User Added Successfully!",
      description: "Random password generated. Please provide it to the user.",
    })
  } catch (error: any) {
    toast({
      title: "Error",
      description: error.message || "Something went wrong.",
      variant: "destructive",
    })
  }

  setAddUserLoading(false)
}


  const handleCopyPassword = () => {
    navigator.clipboard.writeText(generatedPassword)
    toast({
      title: "Password Copied!",
      description: "The generated password has been copied to your clipboard.",
    })
    setIsAddUserModalOpen(false)
    setNewUserData({ firstName: "", lastName: "", email: "", role: "member" })
    setOtp("")
    setOtpSent(false)
    setOtpVerified(false)
    setGeneratedPassword("")
  }

  const openManageUserModal = (user: UserData) => {
    setSelectedUser(user)
    setManageUserRole(user.role)
    setManageUserStatus(user.status === "Active" ? "Active" : "Inactive") // Only Active/Inactive for management
    setIsManageUserModalOpen(true)
  }

  const handleManageUserSubmit = async () => {
    if (!selectedUser) return

    try {
      setManageUserLoading(true)


      const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/company-users/${selectedUser.id}/`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Token ${Cookies.get("Token") || ""}`, // Use token from cookies
        },
        body: JSON.stringify({
          role: manageUserRole,
          status: manageUserStatus.toLowerCase(),
        }),
      })
      
      if (!response.ok) {
        throw new Error("Failed to update user")
      }

      const updatedUser = await response.json()

      setUsers((prev) =>
        prev.map((user) => (user.id === selectedUser.id ? { ...user, ...updatedUser } : user)),
      )

      toast({
        title: "User Updated",
        description: `${selectedUser.firstName} ${selectedUser.lastName}'s profile has been updated.`,
      })
    } catch (err) {
      console.error("Update user error:", err)
      toast({
        title: "Error",
        description: "Failed to update user. Please try again.",
        variant: "destructive",
      })
    } finally {
      setManageUserLoading(false)
      setIsManageUserModalOpen(false)
      setSelectedUser(null)
    }
  }


  const handleDeleteUser = async () => {
    if (!selectedUser) return

    const confirmed = window.confirm(
      `Are you sure you want to delete ${selectedUser.firstName} ${selectedUser.lastName}?`,
    )
    if (!confirmed) return

    try {
      setManageUserLoading(true)

      const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/company-users/${selectedUser.id}/`, {
        method: "DELETE",
        headers: {
        "Content-Type": "application/json",
        "Authorization": `Token ${Cookies.get("Token") || ""}`, // Use token from cookies
      },
      })

      if (!response.ok) {
        throw new Error("Failed to delete user")
      }

      setUsers((prev) => prev.filter((user) => user.id !== selectedUser.id))

      toast({
        title: "User Deleted",
        description: `${selectedUser.firstName} ${selectedUser.lastName} has been removed.`,
        variant: "destructive",
      })
    } catch (err) {
      console.error("Delete user error:", err)
      toast({
        title: "Error",
        description: "Failed to delete user. Please try again.",
        variant: "destructive",
      })
    } finally {
      setManageUserLoading(false)
      setIsManageUserModalOpen(false)
      setSelectedUser(null)
    }
  }


  const getStatusColor = (status: UserData["status"]) => {
    switch (status) {
      case "Active":
        return "bg-green-100 text-green-700"
      case "Inactive":
        return "bg-red-100 text-red-700"
      case "Pending":
        return "bg-yellow-100 text-yellow-700"
      default:
        return "bg-gray-100 text-gray-700"
    }
  }

  return (
    <div className="p-6 space-y-8 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">User Management</h1>
        <Dialog open={isAddUserModalOpen} onOpenChange={setIsAddUserModalOpen}>
          <DialogTrigger asChild>
            <Button className="bg-teal-600 hover:bg-teal-700 text-white px-6 py-3 text-base shadow-md">ADD USER</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold text-gray-900">Add New User</DialogTitle>
            </DialogHeader>
            {!generatedPassword ? (
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="firstName" className="text-right">
                    First Name
                  </Label>
                  <Input
                    id="firstName"
                    value={newUserData.firstName}
                    onChange={(e) => setNewUserData({ ...newUserData, firstName: e.target.value })}
                    className="col-span-3"
                    disabled={addUserLoading}
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="lastName" className="text-right">
                    Last Name
                  </Label>
                  <Input
                    id="lastName"
                    value={newUserData.lastName}
                    onChange={(e) => setNewUserData({ ...newUserData, lastName: e.target.value })}
                    className="col-span-3"
                    disabled={addUserLoading}
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="email" className="text-right">
                    Email
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    value={newUserData.email}
                    onChange={(e) => setNewUserData({ ...newUserData, email: e.target.value })}
                    className="col-span-3"
                    disabled={otpSent || addUserLoading}
                  />
                </div>
                {!otpVerified && (
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="otp" className="text-right">
                      OTP
                    </Label>
                    <Input
                      id="otp"
                      value={otp}
                      onChange={(e) => setOtp(e.target.value)}
                      className="col-span-2"
                      placeholder="Enter OTP"
                      disabled={!otpSent || otpVerified || addUserLoading}
                    />
                    {!otpSent ? (
                      <Button onClick={handleSendOtp} className="col-span-1" disabled={addUserLoading}>
                        {addUserLoading ? "Sending..." : "Send OTP"}
                      </Button>
                    ) : (
                      <Button onClick={handleVerifyOtp} className="col-span-1" disabled={otpVerified || addUserLoading}>
                        {addUserLoading ? "Verifying..." : "Verify"}
                      </Button>
                    )}
                  </div>
                )}
                {otpVerified && (
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="role" className="text-right">
                      Role
                    </Label>
                    <Select
                      value={newUserData.role}
                      onValueChange={(value: "admin" | "member") => setNewUserData({ ...newUserData, role: value })}
                      disabled={addUserLoading}
                    >
                      <SelectTrigger className="col-span-3">
                        <SelectValue placeholder="Select role" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="admin">Admin</SelectItem>
                        <SelectItem value="member">Member</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                )}
                <div className="flex justify-end mt-4">
                  <Button onClick={handleAddUserSubmit} disabled={!otpVerified || addUserLoading}>
                    {addUserLoading ? "Creating..." : "Create User"}
                  </Button>
                </div>
              </div>
            ) : (
              <div className="text-center py-8">
                <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">User Created Successfully!</h3>
                <p className="text-gray-600 mb-4">
                  Please provide the following password to the new user. They will be prompted to change it on first
                  login.
                </p>
                <div className="relative flex items-center border rounded-md p-3 bg-gray-100 mb-4">
                  <Input
                    type="text"
                    value={generatedPassword}
                    readOnly
                    className="flex-1 border-none bg-transparent focus-visible:ring-0"
                  />
                  <Button variant="ghost" size="sm" onClick={handleCopyPassword} className="ml-2">
                    <Copy className="h-4 w-4 mr-1" /> Copy
                  </Button>
                </div>
                <Button onClick={handleCopyPassword}>Done</Button>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>

      {/* User Flashcards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {users.map((user) => (
          <Card
            key={user.id}
            className="bg-white shadow-lg rounded-lg overflow-hidden transition-all duration-200 hover:shadow-xl"
          >
            <CardHeader className="flex flex-row items-center space-x-4 p-5 border-b border-gray-100">
              <Avatar className="h-16 w-16">
                <AvatarImage src={user.profilePic || undefined} alt={`${user.firstName} ${user.lastName}`} />
                <AvatarFallback className="bg-teal-100 text-teal-600 text-xl font-semibold">
                  {user.firstName.charAt(0)}
                  {user.lastName.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <CardTitle className="text-xl font-semibold text-gray-900">
                  {user.firstName} {user.lastName}
                </CardTitle>
                <p className="text-sm text-gray-600 flex items-center">
                  <Mail className="h-4 w-4 mr-1" /> {user.email}
                </p>
              </div>
            </CardHeader>
            <CardContent className="p-5 space-y-3">
              <div className="flex items-center justify-between text-sm text-gray-700">
                <span className="font-medium">Role:</span>
                <span className="capitalize">{user.role}</span>
              </div>
              <div className="flex items-center justify-between text-sm text-gray-700">
                <span className="font-medium">Status:</span>
                <span className={cn("px-2 py-1 rounded-full text-xs font-medium", getStatusColor(user.status))}>
                  {user.status}
                </span>
              </div>
              <div className="flex items-center justify-between text-sm text-gray-700">
                <span className="font-medium">Joined:</span>
                <span>{new Date(user.dateCreated).toLocaleDateString()}</span>
              </div>
              <div className="flex items-center justify-between text-sm text-gray-700">
                <span className="font-medium">Last Login:</span>
                <span>{user.lastLogin ? new Date(user.lastLogin).toLocaleDateString() : "Never"}</span>
              </div>
              <div className="pt-4 border-t border-gray-100">
                <Button
                  className="w-full bg-teal-600 hover:bg-teal-700 text-white shadow-md"
                  onClick={() => openManageUserModal(user)}
                >
                  Manage User
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {users.length === 0 && (
        <div className="text-center text-gray-500 py-10 border border-dashed border-gray-200 rounded-lg">
          <p className="text-lg font-medium">No users found.</p>
          <p className="text-sm">Click "ADD USER" to invite new team members.</p>
        </div>
      )}

      {/* Manage User Modal */}
      {selectedUser && (
        <Dialog open={isManageUserModalOpen} onOpenChange={setIsManageUserModalOpen}>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold text-gray-900">
                Manage {selectedUser.firstName} {selectedUser.lastName}
              </DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="manage-role" className="text-right">
                  Role
                </Label>
                <Select
                  value={manageUserRole}
                  onValueChange={(value: "admin" | "member") => setManageUserRole(value)}
                  disabled={manageUserLoading}
                >
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="admin">Admin</SelectItem>
                    <SelectItem value="member">Member</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="manage-status" className="text-right">
                  Status
                </Label>
                <Select
                  value={manageUserStatus}
                  onValueChange={(value: "Active" | "Inactive") => setManageUserStatus(value)}
                  disabled={manageUserLoading}
                >
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Active">Active</SelectItem>
                    <SelectItem value="Inactive">Inactive</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="flex justify-between mt-4">
              <Button variant="destructive" onClick={handleDeleteUser} disabled={manageUserLoading}>
                {manageUserLoading ? "Deleting..." : "Delete User"}
              </Button>
              <Button onClick={handleManageUserSubmit} disabled={manageUserLoading}>
                {manageUserLoading ? "Saving..." : "Save Changes"}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      )}

      {/* Footer */}
      <div className="mt-16 pt-8 border-t border-gray-200">
        <div className="text-center space-y-2">
          <div className="text-sm text-gray-500">© 2025 All rights reserved.</div>
          <div className="text-xs text-gray-400">Browser Session ID: f4f2fc7d-7161-4d53-ae5f-6bd14515f55b 🔒</div>
        </div>
      </div>
    </div>
  )
}
