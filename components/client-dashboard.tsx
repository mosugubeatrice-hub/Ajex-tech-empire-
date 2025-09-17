"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Calendar, FileText, MessageSquare, Download, CreditCard, Settings, Bell, Folder, Upload } from "lucide-react"

// Mock data - in production this would come from your backend
const mockClient = {
  name: "John Smith",
  company: "Tech Innovations Inc.",
  email: "john@techinnovations.com",
  avatar: "/placeholder.svg?height=40&width=40",
  memberSince: "2023-06-15",
}

const mockProjects = [
  {
    id: 1,
    name: "E-commerce Website Redesign",
    status: "in-progress",
    progress: 75,
    startDate: "2024-01-15",
    deadline: "2024-03-01",
    budget: 25000,
    spent: 18750,
    description: "Complete redesign of the e-commerce platform with modern UI/UX",
  },
  {
    id: 2,
    name: "Mobile App Development",
    status: "planning",
    progress: 15,
    startDate: "2024-02-01",
    deadline: "2024-05-15",
    budget: 45000,
    spent: 6750,
    description: "Native iOS and Android app for customer engagement",
  },
  {
    id: 3,
    name: "Brand Identity Package",
    status: "completed",
    progress: 100,
    startDate: "2023-11-01",
    deadline: "2023-12-15",
    budget: 8000,
    spent: 8000,
    description: "Complete brand identity including logo, guidelines, and assets",
  },
]

const mockInvoices = [
  {
    id: "INV-001",
    date: "2024-01-15",
    amount: 12500,
    status: "paid",
    description: "E-commerce Website - Phase 1",
  },
  {
    id: "INV-002",
    date: "2024-02-01",
    amount: 6250,
    status: "pending",
    description: "E-commerce Website - Phase 2",
  },
  {
    id: "INV-003",
    date: "2024-02-15",
    amount: 6750,
    status: "overdue",
    description: "Mobile App - Initial Development",
  },
]

const mockMessages = [
  {
    id: 1,
    from: "Sarah Johnson",
    subject: "Project Update - E-commerce Redesign",
    date: "2024-01-20",
    preview: "Hi John, I wanted to update you on the progress of your e-commerce redesign...",
    unread: true,
  },
  {
    id: 2,
    from: "Michael Chen",
    subject: "Mobile App Wireframes Ready",
    date: "2024-01-18",
    preview: "The wireframes for your mobile app are ready for review...",
    unread: false,
  },
  {
    id: 3,
    from: "Emily Rodriguez",
    subject: "Brand Guidelines Delivered",
    date: "2024-01-15",
    preview: "Your complete brand guidelines package has been delivered...",
    unread: false,
  },
]

const mockFiles = [
  {
    id: 1,
    name: "Brand_Guidelines_Final.pdf",
    size: "2.4 MB",
    type: "PDF",
    uploadDate: "2024-01-15",
    category: "Brand Identity",
  },
  {
    id: 2,
    name: "Website_Mockups_v3.fig",
    size: "15.7 MB",
    type: "Figma",
    uploadDate: "2024-01-20",
    category: "E-commerce Redesign",
  },
  {
    id: 3,
    name: "App_Wireframes.pdf",
    size: "8.2 MB",
    type: "PDF",
    uploadDate: "2024-01-18",
    category: "Mobile App",
  },
]

export function ClientDashboard() {
  const [activeTab, setActiveTab] = useState("overview")

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-500"
      case "in-progress":
        return "bg-blue-500"
      case "planning":
        return "bg-yellow-500"
      case "on-hold":
        return "bg-gray-500"
      default:
        return "bg-gray-500"
    }
  }

  const getInvoiceStatusColor = (status: string) => {
    switch (status) {
      case "paid":
        return "text-green-400 bg-green-500/20"
      case "pending":
        return "text-yellow-400 bg-yellow-500/20"
      case "overdue":
        return "text-red-400 bg-red-500/20"
      default:
        return "text-gray-400 bg-gray-500/20"
    }
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Welcome back, {mockClient.name}</h1>
            <p className="text-gray-300">
              {mockClient.company} • Member since {new Date(mockClient.memberSince).toLocaleDateString()}
            </p>
          </div>
          <div className="flex items-center gap-4">
            <Button size="sm" className="bg-white/10 hover:bg-white/20 text-white border-white/20">
              <Bell className="w-4 h-4 mr-2" />
              Notifications
            </Button>
            <Button size="sm" className="bg-white/10 hover:bg-white/20 text-white border-white/20">
              <Settings className="w-4 h-4 mr-2" />
              Settings
            </Button>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm border-white/20">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-300 text-sm">Active Projects</p>
                <p className="text-2xl font-bold text-white">2</p>
              </div>
              <Folder className="w-8 h-8 text-blue-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm border-white/20">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-300 text-sm">Total Spent</p>
                <p className="text-2xl font-bold text-white">$25,500</p>
              </div>
              <CreditCard className="w-8 h-8 text-green-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm border-white/20">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-300 text-sm">Pending Invoices</p>
                <p className="text-2xl font-bold text-white">1</p>
              </div>
              <FileText className="w-8 h-8 text-yellow-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm border-white/20">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-300 text-sm">Unread Messages</p>
                <p className="text-2xl font-bold text-white">1</p>
              </div>
              <MessageSquare className="w-8 h-8 text-purple-400" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="bg-white/10 border-white/20">
          <TabsTrigger value="overview" className="data-[state=active]:bg-white/20">
            Overview
          </TabsTrigger>
          <TabsTrigger value="projects" className="data-[state=active]:bg-white/20">
            Projects
          </TabsTrigger>
          <TabsTrigger value="invoices" className="data-[state=active]:bg-white/20">
            Invoices
          </TabsTrigger>
          <TabsTrigger value="messages" className="data-[state=active]:bg-white/20">
            Messages
          </TabsTrigger>
          <TabsTrigger value="files" className="data-[state=active]:bg-white/20">
            Files
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* Recent Activity */}
          <Card className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm border-white/20">
            <CardHeader>
              <CardTitle className="text-white">Recent Activity</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="w-2 h-2 bg-green-400 rounded-full mt-2"></div>
                <div>
                  <p className="text-white font-medium">Brand Guidelines Completed</p>
                  <p className="text-gray-300 text-sm">Your brand identity package has been delivered</p>
                  <p className="text-gray-400 text-xs">2 days ago</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-2 h-2 bg-blue-400 rounded-full mt-2"></div>
                <div>
                  <p className="text-white font-medium">E-commerce Redesign Progress</p>
                  <p className="text-gray-300 text-sm">Phase 2 development is 75% complete</p>
                  <p className="text-gray-400 text-xs">3 days ago</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-2 h-2 bg-yellow-400 rounded-full mt-2"></div>
                <div>
                  <p className="text-white font-medium">Mobile App Planning Started</p>
                  <p className="text-gray-300 text-sm">Initial wireframes and user flow completed</p>
                  <p className="text-gray-400 text-xs">1 week ago</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Upcoming Deadlines */}
          <Card className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm border-white/20">
            <CardHeader>
              <CardTitle className="text-white">Upcoming Deadlines</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-white/5 rounded-lg">
                <div className="flex items-center gap-3">
                  <Calendar className="w-5 h-5 text-blue-400" />
                  <div>
                    <p className="text-white font-medium">E-commerce Website Redesign</p>
                    <p className="text-gray-300 text-sm">Final delivery</p>
                  </div>
                </div>
                <Badge className="bg-blue-500/20 text-blue-300 border-blue-500/30">March 1, 2024</Badge>
              </div>
              <div className="flex items-center justify-between p-4 bg-white/5 rounded-lg">
                <div className="flex items-center gap-3">
                  <Calendar className="w-5 h-5 text-purple-400" />
                  <div>
                    <p className="text-white font-medium">Mobile App Development</p>
                    <p className="text-gray-300 text-sm">Beta version release</p>
                  </div>
                </div>
                <Badge className="bg-purple-500/20 text-purple-300 border-purple-500/30">May 15, 2024</Badge>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="projects" className="space-y-6">
          {mockProjects.map((project) => (
            <Card
              key={project.id}
              className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm border-white/20"
            >
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-white">{project.name}</CardTitle>
                  <Badge className={`${getStatusColor(project.status)} text-white border-0`}>
                    {project.status.replace("-", " ")}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-300">{project.description}</p>

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-300">Progress</span>
                    <span className="text-white">{project.progress}%</span>
                  </div>
                  <Progress value={project.progress} className="h-2" />
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                  <div>
                    <p className="text-gray-400">Start Date</p>
                    <p className="text-white">{new Date(project.startDate).toLocaleDateString()}</p>
                  </div>
                  <div>
                    <p className="text-gray-400">Deadline</p>
                    <p className="text-white">{new Date(project.deadline).toLocaleDateString()}</p>
                  </div>
                  <div>
                    <p className="text-gray-400">Budget</p>
                    <p className="text-white">${project.budget.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-gray-400">Spent</p>
                    <p className="text-white">${project.spent.toLocaleString()}</p>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button
                    size="sm"
                    className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white border-0"
                  >
                    View Details
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    className="border-white/20 text-white hover:bg-white/10 bg-transparent"
                  >
                    Download Files
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="invoices" className="space-y-6">
          <Card className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm border-white/20">
            <CardHeader>
              <CardTitle className="text-white">Invoices</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockInvoices.map((invoice) => (
                  <div key={invoice.id} className="flex items-center justify-between p-4 bg-white/5 rounded-lg">
                    <div className="flex items-center gap-4">
                      <FileText className="w-5 h-5 text-gray-400" />
                      <div>
                        <p className="text-white font-medium">{invoice.id}</p>
                        <p className="text-gray-300 text-sm">{invoice.description}</p>
                        <p className="text-gray-400 text-xs">{new Date(invoice.date).toLocaleDateString()}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <p className="text-white font-medium">${invoice.amount.toLocaleString()}</p>
                        <Badge className={`${getInvoiceStatusColor(invoice.status)} border-0 text-xs`}>
                          {invoice.status}
                        </Badge>
                      </div>
                      <Button
                        size="sm"
                        variant="outline"
                        className="border-white/20 text-white hover:bg-white/10 bg-transparent"
                      >
                        <Download className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="messages" className="space-y-6">
          <Card className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm border-white/20">
            <CardHeader>
              <CardTitle className="text-white">Messages</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockMessages.map((message) => (
                  <div
                    key={message.id}
                    className={`p-4 rounded-lg ${message.unread ? "bg-blue-500/10 border border-blue-500/20" : "bg-white/5"}`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-3">
                        <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white text-sm font-bold">
                          {message.from
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <p className="text-white font-medium">{message.from}</p>
                            {message.unread && <div className="w-2 h-2 bg-blue-400 rounded-full"></div>}
                          </div>
                          <p className="text-white text-sm mb-1">{message.subject}</p>
                          <p className="text-gray-300 text-sm">{message.preview}</p>
                        </div>
                      </div>
                      <p className="text-gray-400 text-xs">{new Date(message.date).toLocaleDateString()}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="files" className="space-y-6">
          <Card className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm border-white/20">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-white">Project Files</CardTitle>
                <Button
                  size="sm"
                  className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white border-0"
                >
                  <Upload className="w-4 h-4 mr-2" />
                  Upload File
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockFiles.map((file) => (
                  <div key={file.id} className="flex items-center justify-between p-4 bg-white/5 rounded-lg">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center text-white text-xs font-bold">
                        {file.type}
                      </div>
                      <div>
                        <p className="text-white font-medium">{file.name}</p>
                        <p className="text-gray-300 text-sm">{file.category}</p>
                        <p className="text-gray-400 text-xs">
                          {file.size} • Uploaded {new Date(file.uploadDate).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    <Button
                      size="sm"
                      variant="outline"
                      className="border-white/20 text-white hover:bg-white/10 bg-transparent"
                    >
                      <Download className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
