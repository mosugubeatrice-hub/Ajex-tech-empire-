import { type NextRequest, NextResponse } from "next/server"
import { createGroq } from "@ai-sdk/groq"
import { generateText } from "ai"

const groq = createGroq({
  apiKey: process.env.GROQ_API_KEY,
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { content, contentType = "general", targetAudience = "business professionals" } = body

    if (!content) {
      return NextResponse.json({ error: "Content is required" }, { status: 400 })
    }

    const systemPrompt = `You are an expert content optimization specialist for AJEx Tech Empire, a premium digital agency. Analyze the provided content and provide detailed optimization suggestions.

Content Type: ${contentType}
Target Audience: ${targetAudience}

Analyze for:
1. Clarity and readability
2. Emotional impact and persuasiveness
3. SEO optimization opportunities
4. Call-to-action effectiveness
5. Brand voice consistency (professional, innovative, results-driven)
6. Conversion optimization potential

Return JSON with:
- overallScore: Score from 1-100
- readabilityScore: Score from 1-10
- persuasivenessScore: Score from 1-10
- seoScore: Score from 1-100
- suggestions: Array of specific improvement recommendations
- optimizedVersion: Improved version of the content
- keywordOpportunities: Suggested keywords to incorporate
- emotionalTriggers: Emotional elements that could be enhanced`

    const { text: aiResponse } = await generateText({
      model: groq("llama-3.1-70b-versatile"),
      prompt: `${systemPrompt}\n\nContent to analyze: ${content}`,
      maxTokens: 1500,
      temperature: 0.3,
    })

    let analysis
    try {
      analysis = JSON.parse(aiResponse)
    } catch (parseError) {
      analysis = {
        overallScore: 75,
        readabilityScore: 7,
        persuasivenessScore: 6,
        seoScore: 70,
        suggestions: [
          "Content analysis completed but formatting failed. Please try again.",
          "Consider adding more specific value propositions",
          "Include stronger call-to-action elements",
        ],
        optimizedVersion: content,
        keywordOpportunities: ["digital transformation", "business growth", "technology solutions"],
        emotionalTriggers: ["success", "growth", "innovation"],
      }
    }

    return NextResponse.json({
      success: true,
      analysis,
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    console.error("Content analysis error:", error)
    return NextResponse.json({ error: "Failed to analyze content" }, { status: 500 })
  }
}
