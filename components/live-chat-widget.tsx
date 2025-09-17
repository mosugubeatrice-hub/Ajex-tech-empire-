"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MessageCircle, X, Send, Minimize2, Maximize2, User, Bot, Phone, Mail, Clock } from "lucide-react"

interface Message {
  id: string
  text: string
  sender: "user" | "agent" | "bot"
  timestamp: Date
  senderName?: string
}

interface ChatAgent {
  id: string
  name: string
  role: string
  avatar: string
  status: "online" | "away" | "offline"
}

const mockAgents: ChatAgent[] = [
  {
    id: "sarah",
    name: "Sarah Johnson",
    role: "Digital Marketing Specialist",
    avatar: "/placeholder.svg?height=40&width=40",
    status: "online",
  },
  {
    id: "michael",
    name: "Michael Chen",
    role: "Technical Consultant",
    avatar: "/placeholder.svg?height=40&width=40",
    status: "online",
  },
  {
    id: "emily",
    name: "Emily Rodriguez",
    role: "Creative Director",
    avatar: "/placeholder.svg?height=40&width=40",
    status: "away",
  },
]

const quickReplies = [
  "I need help with my website",
  "Tell me about your services",
  "I want to schedule a consultation",
  "What are your pricing options?",
  "I have a technical question",
]

export function LiveChatWidget() {
  const [isOpen, setIsOpen] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  const [inputValue, setInputValue] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const [currentAgent, setCurrentAgent] = useState<ChatAgent | null>(null)
  const [chatStage, setChatStage] = useState<"initial" | "bot" | "agent">("initial")
  const [unreadCount, setUnreadCount] = useState(0)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  useEffect(() => {
    if (!isOpen && messages.length > 0) {
      const lastMessage = messages[messages.length - 1]
      if (lastMessage.sender !== "user") {
        setUnreadCount((prev) => prev + 1)
      }
    } else {
      setUnreadCount(0)
    }
  }, [messages, isOpen])

  const addMessage = (text: string, sender: "user" | "agent" | "bot", senderName?: string) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      text,
      sender,
      timestamp: new Date(),
      senderName,
    }
    setMessages((prev) => [...prev, newMessage])
  }

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return

    addMessage(inputValue, "user")
    const userMessage = inputValue
    setInputValue("")

    setIsTyping(true)
    try {
      const conversationHistory = messages.map((msg) => ({
        sender: msg.sender,
        text: msg.text,
      }))

      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: userMessage,
          sessionId: `session_${Date.now()}`,
          userId: "anonymous",
          conversationHistory,
        }),
      })

      const data = await response.json()

      if (data.success) {
        addMessage(data.response, "bot", "AJEx AI Assistant")
        setChatStage("bot")
      } else {
        addMessage(
          "I apologize, but I'm having trouble processing your request. Please try again or connect with one of our specialists.",
          "bot",
          "AJEx Assistant",
        )
      }
    } catch (error) {
      console.error("Chat error:", error)
      addMessage(
        "I'm experiencing some technical difficulties. Please try again in a moment or contact us directly.",
        "bot",
        "AJEx Assistant",
      )
    } finally {
      setIsTyping(false)
    }
  }

  const handleBotResponse = async (userMessage: string) => {
    const lowerMessage = userMessage.toLowerCase()
    let response = "Let me help you with that. What specific information are you looking for?"

    if (lowerMessage.includes("service") || lowerMessage.includes("what do you do")) {
      response =
        "We specialize in web development, digital marketing, brand design, and business consulting. Each service is tailored to help businesses achieve their digital transformation goals. Which area interests you most?"
    } else if (lowerMessage.includes("price") || lowerMessage.includes("cost") || lowerMessage.includes("pricing")) {
      response =
        "Our pricing is customized based on your specific needs and project scope. I'd recommend scheduling a free consultation where we can discuss your requirements and provide accurate pricing. Would you like me to connect you with a specialist?"
    }

    addMessage(response, "bot", "AJEx AI Assistant")
    setChatStage("bot")
  }

  const handleQuickReply = async (reply: string) => {
    addMessage(reply, "user")

    setIsTyping(true)
    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: reply,
          sessionId: `session_${Date.now()}`,
          userId: "anonymous",
          conversationHistory: messages.map((msg) => ({
            sender: msg.sender,
            text: msg.text,
          })),
        }),
      })

      const data = await response.json()

      if (data.success) {
        addMessage(data.response, "bot", "AJEx AI Assistant")
        setChatStage("bot")
      }
    } catch (error) {
      console.error("Quick reply error:", error)
      handleBotResponse(reply)
    } finally {
      setIsTyping(false)
    }
  }

  const connectToAgent = (agent: ChatAgent) => {
    setCurrentAgent(agent)
    setChatStage("agent")
    addMessage(`Hi! I'm ${agent.name}, your ${agent.role}. How can I help you today?`, "agent", agent.name)
  }

  const startChat = () => {
    if (messages.length === 0) {
      addMessage(
        "Hi there! 👋 I'm your AI assistant from AJEx Tech Empire. I'm here to help you learn about our services and connect you with the right specialists. How can I assist you today?",
        "bot",
        "AJEx AI Assistant",
      )
      setChatStage("bot")
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  if (!isOpen) {
    return (
      <div className="fixed bottom-6 right-6 z-50">
        <Button
          onClick={() => {
            setIsOpen(true)
            startChat()
          }}
          className="w-16 h-16 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white border-0 shadow-lg hover:shadow-xl transition-all duration-300 relative"
        >
          <MessageCircle className="w-6 h-6" />
          {unreadCount > 0 && (
            <Badge className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-red-500 text-white text-xs flex items-center justify-center">
              {unreadCount}
            </Badge>
          )}
        </Button>
      </div>
    )
  }

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <Card
        className={`bg-gradient-to-br from-white/95 to-white/90 backdrop-blur-sm border-white/20 shadow-2xl transition-all duration-300 ${
          isMinimized ? "w-80 h-16" : "w-96 h-[600px]"
        }`}
      >
        {/* Header */}
        <CardHeader className="p-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-t-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              {currentAgent ? (
                <>
                  <img
                    src={currentAgent.avatar || "/placeholder.svg"}
                    alt={currentAgent.name}
                    className="w-8 h-8 rounded-full"
                  />
                  <div>
                    <p className="font-medium text-sm">{currentAgent.name}</p>
                    <p className="text-xs opacity-90">{currentAgent.role}</p>
                  </div>
                </>
              ) : (
                <>
                  <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                    <Bot className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="font-medium text-sm">AJEx Support</p>
                    <p className="text-xs opacity-90">We're here to help!</p>
                  </div>
                </>
              )}
            </div>
            <div className="flex items-center gap-2">
              <Button
                size="sm"
                variant="ghost"
                onClick={() => setIsMinimized(!isMinimized)}
                className="text-white hover:bg-white/20 w-8 h-8 p-0"
              >
                {isMinimized ? <Maximize2 className="w-4 h-4" /> : <Minimize2 className="w-4 h-4" />}
              </Button>
              <Button
                size="sm"
                variant="ghost"
                onClick={() => setIsOpen(false)}
                className="text-white hover:bg-white/20 w-8 h-8 p-0"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </CardHeader>

        {!isMinimized && (
          <>
            {/* Messages */}
            <CardContent className="p-0 h-96 overflow-y-auto bg-gray-50">
              <div className="p-4 space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
                  >
                    <div className={`max-w-xs ${message.sender === "user" ? "order-2" : "order-1"}`}>
                      <div
                        className={`p-3 rounded-lg ${
                          message.sender === "user"
                            ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white"
                            : "bg-white border border-gray-200 text-gray-800"
                        }`}
                      >
                        {message.senderName && message.sender !== "user" && (
                          <p className="text-xs font-medium mb-1 opacity-70">{message.senderName}</p>
                        )}
                        <p className="text-sm">{message.text}</p>
                      </div>
                      <p className="text-xs text-gray-500 mt-1 px-1">
                        {message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                      </p>
                    </div>
                    {message.sender !== "user" && (
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center mr-2 ${message.sender === "bot" ? "bg-blue-100" : "bg-purple-100"} order-0`}
                      >
                        {message.sender === "bot" ? (
                          <Bot className="w-4 h-4 text-blue-600" />
                        ) : (
                          <User className="w-4 h-4 text-purple-600" />
                        )}
                      </div>
                    )}
                  </div>
                ))}

                {isTyping && (
                  <div className="flex justify-start">
                    <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center mr-2">
                      <Bot className="w-4 h-4 text-gray-600" />
                    </div>
                    <div className="bg-white border border-gray-200 rounded-lg p-3">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                        <div
                          className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                          style={{ animationDelay: "0.1s" }}
                        ></div>
                        <div
                          className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                          style={{ animationDelay: "0.2s" }}
                        ></div>
                      </div>
                    </div>
                  </div>
                )}

                <div ref={messagesEndRef} />
              </div>

              {/* Quick Replies */}
              {messages.length === 1 && chatStage === "bot" && (
                <div className="p-4 border-t bg-white">
                  <p className="text-xs text-gray-600 mb-2">Quick replies:</p>
                  <div className="flex flex-wrap gap-2">
                    {quickReplies.map((reply, index) => (
                      <Button
                        key={index}
                        size="sm"
                        variant="outline"
                        onClick={() => handleQuickReply(reply)}
                        className="text-xs border-gray-300 hover:bg-gray-50"
                      >
                        {reply}
                      </Button>
                    ))}
                  </div>
                </div>
              )}

              {/* Agent Selection */}
              {chatStage === "bot" && messages.length > 2 && !currentAgent && (
                <div className="p-4 border-t bg-white">
                  <p className="text-sm font-medium text-gray-800 mb-3">Connect with a specialist:</p>
                  <div className="space-y-2">
                    {mockAgents
                      .filter((agent) => agent.status === "online")
                      .map((agent) => (
                        <Button
                          key={agent.id}
                          onClick={() => connectToAgent(agent)}
                          variant="outline"
                          className="w-full justify-start text-left p-3 h-auto"
                        >
                          <div className="flex items-center gap-3">
                            <img
                              src={agent.avatar || "/placeholder.svg"}
                              alt={agent.name}
                              className="w-8 h-8 rounded-full"
                            />
                            <div>
                              <p className="font-medium text-sm">{agent.name}</p>
                              <p className="text-xs text-gray-600">{agent.role}</p>
                            </div>
                            <div className="ml-auto">
                              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                            </div>
                          </div>
                        </Button>
                      ))}
                  </div>
                </div>
              )}
            </CardContent>

            {/* Input */}
            <div className="p-4 border-t bg-white rounded-b-lg">
              <div className="flex gap-2">
                <Input
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Type your message..."
                  className="flex-1 border-gray-300 focus:border-blue-500"
                />
                <Button
                  onClick={handleSendMessage}
                  disabled={!inputValue.trim()}
                  className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white border-0"
                >
                  <Send className="w-4 h-4" />
                </Button>
              </div>

              {/* Contact Options */}
              <div className="flex items-center justify-center gap-4 mt-3 pt-3 border-t border-gray-200">
                <Button size="sm" variant="ghost" className="text-xs text-gray-600 hover:text-gray-800">
                  <Phone className="w-3 h-3 mr-1" />
                  Call Us
                </Button>
                <Button size="sm" variant="ghost" className="text-xs text-gray-600 hover:text-gray-800">
                  <Mail className="w-3 h-3 mr-1" />
                  Email
                </Button>
                <Button size="sm" variant="ghost" className="text-xs text-gray-600 hover:text-gray-800">
                  <Clock className="w-3 h-3 mr-1" />
                  Book Call
                </Button>
              </div>
            </div>
          </>
        )}
      </Card>
    </div>
  )
}
