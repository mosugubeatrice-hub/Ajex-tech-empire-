import { type NextRequest, NextResponse } from "next/server"
import { createGroq } from "@ai-sdk/groq"
import { generateText } from "ai"

const groq = createGroq({
  apiKey: process.env.GROQ_API_KEY,
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { content, targetKeywords = [], currentTitle, currentMeta } = body

    if (!content) {
      return NextResponse.json({ error: "Content is required" }, { status: 400 })
    }

    const systemPrompt = `You are an SEO expert specializing in content optimization. Analyze the provided blog content and suggest improvements for:

1. SEO Title optimization (max 60 characters)
2. Meta description optimization (max 160 characters)  
3. Content structure improvements
4. Keyword density and placement
5. Internal linking opportunities
6. Readability enhancements

${targetKeywords.length > 0 ? `Target keywords: ${targetKeywords.join(", ")}` : ""}

Return JSON with:
- optimizedTitle: SEO-optimized title
- optimizedMeta: SEO-optimized meta description
- keywordDensity: Analysis of keyword usage
- suggestions: Array of specific improvement suggestions
- readabilityScore: Score from 1-10
- seoScore: Overall SEO score from 1-100`

    const { text: aiResponse } = await generateText({
      model: groq("llama-3.1-70b-versatile"),
      prompt: `${systemPrompt}\n\nCurrent Title: ${currentTitle}\nCurrent Meta: ${currentMeta}\nContent: ${content}`,
      maxTokens: 1000,
      temperature: 0.3,
    })

    let optimization
    try {
      optimization = JSON.parse(aiResponse)
    } catch (parseError) {
      optimization = {
        optimizedTitle: currentTitle,
        optimizedMeta: currentMeta,
        keywordDensity: "Analysis unavailable",
        suggestions: ["Content optimization analysis failed. Please try again."],
        readabilityScore: 7,
        seoScore: 75,
      }
    }

    return NextResponse.json({
      success: true,
      optimization,
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    console.error("Blog optimization error:", error)
    return NextResponse.json({ error: "Failed to optimize content" }, { status: 500 })
  }
}
