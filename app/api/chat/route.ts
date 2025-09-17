import { type NextRequest, NextResponse } from "next/server"
import { createGroq } from "@ai-sdk/groq"
import { generateText } from "ai"

const groq = createGroq({
  apiKey: process.env.GROQ_API_KEY,
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { message, sessionId, userId, conversationHistory = [] } = body

    console.log("Chat message:", {
      message,
      sessionId,
      userId,
      timestamp: new Date().toISOString(),
    })

    const systemPrompt = `You are an AI assistant for AJEx Tech Empire, a premium digital agency specializing in web development, digital marketing, brand design, and consulting services. 

Key information about AJEx Tech Empire:
- Premium digital agency focused on innovative solutions
- Services: Web Development, Digital Marketing, Brand Design, Business Consulting
- Target clients: Businesses looking for high-quality digital transformation
- Tone: Professional, helpful, knowledgeable, and solution-oriented
- Always offer to connect users with specialists for detailed discussions
- Encourage scheduling consultations for complex needs

Guidelines:
- Keep responses concise but informative (2-3 sentences max)
- Always be helpful and professional
- Offer specific next steps when appropriate
- If asked about pricing, mention it varies by project scope and offer consultation
- For technical questions, offer to connect with technical specialists
- Maintain the premium, professional brand voice`

    // Build conversation context
    const conversationContext = conversationHistory
      .map((msg: any) => `${msg.sender === "user" ? "User" : "Assistant"}: ${msg.text}`)
      .join("\n")

    const fullPrompt = conversationContext
      ? `${systemPrompt}\n\nConversation history:\n${conversationContext}\n\nUser: ${message}\nAssistant:`
      : `${systemPrompt}\n\nUser: ${message}\nAssistant:`

    const { text: aiResponse } = await generateText({
      model: groq("llama-3.3-70b-versatile"),
      prompt: fullPrompt,
      maxTokens: 150,
      temperature: 0.7,
    })

    return NextResponse.json({
      success: true,
      response: aiResponse,
      timestamp: new Date().toISOString(),
      isAI: true,
    })
  } catch (error) {
    console.error("Chat error:", error)
    const body = await request.json() // Declare body variable here
    const lowerMessage = body.message?.toLowerCase() || ""
    let fallbackResponse = "Thanks for your message! One of our specialists will be with you shortly."

    if (lowerMessage.includes("price") || lowerMessage.includes("cost")) {
      fallbackResponse =
        "Our pricing varies based on project scope. I can connect you with a specialist for a detailed quote. Would you like to schedule a free consultation?"
    } else if (lowerMessage.includes("service")) {
      fallbackResponse =
        "We offer web development, digital marketing, brand design, and consulting services. Which service interests you most?"
    } else if (lowerMessage.includes("consultation") || lowerMessage.includes("meeting")) {
      fallbackResponse = "I'd be happy to help you schedule a consultation! What type of project are you working on?"
    }

    return NextResponse.json({
      success: true,
      response: fallbackResponse,
      timestamp: new Date().toISOString(),
      isAI: false,
    })
  }
}
