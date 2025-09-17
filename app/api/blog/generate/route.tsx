import { type NextRequest, NextResponse } from "next/server"
import { createGroq } from "@ai-sdk/groq"
import { generateText } from "ai"

const groq = createGroq({
  apiKey: process.env.GROQ_API_KEY,
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { topic, category, tone = "professional", length = "medium", keywords = [] } = body

    if (!topic) {
      return NextResponse.json({ error: "Topic is required" }, { status: 400 })
    }

    const systemPrompt = `You are an expert content writer for AJEx Tech Empire, a premium digital agency. Create high-quality blog content that:

- Maintains a ${tone} tone throughout
- Focuses on ${category} topics
- Incorporates SEO best practices
- Provides actionable insights and value
- Uses engaging headlines and subheadings
- Includes relevant examples and case studies
- Maintains AJEx Tech Empire's premium brand voice

Content should be ${length === "short" ? "500-800" : length === "medium" ? "800-1200" : "1200-1800"} words.
${keywords.length > 0 ? `Include these keywords naturally: ${keywords.join(", ")}` : ""}

Format the response as JSON with:
- title: Compelling blog post title
- excerpt: 2-3 sentence summary
- content: Full HTML content with proper headings, paragraphs, and formatting
- tags: Array of relevant tags
- estimatedReadTime: Reading time in minutes
- seoTitle: SEO-optimized title (max 60 chars)
- metaDescription: SEO meta description (max 160 chars)`

    const { text: aiResponse } = await generateText({
      model: groq("llama-3.1-70b-versatile"),
      prompt: `${systemPrompt}\n\nTopic: ${topic}\nCategory: ${category}`,
      maxTokens: 2000,
      temperature: 0.7,
    })

    // Parse AI response as JSON
    let blogContent
    try {
      blogContent = JSON.parse(aiResponse)
    } catch (parseError) {
      // Fallback if AI doesn't return valid JSON
      blogContent = {
        title: `${topic}: A Comprehensive Guide`,
        excerpt: `Discover everything you need to know about ${topic} and how it can transform your business.`,
        content: `<h2>Introduction</h2><p>${aiResponse}</p>`,
        tags: [category, ...keywords.slice(0, 3)],
        estimatedReadTime: Math.ceil(aiResponse.length / 200),
        seoTitle: topic.substring(0, 60),
        metaDescription: `Learn about ${topic} with expert insights from AJEx Tech Empire.`.substring(0, 160),
      }
    }

    return NextResponse.json({
      success: true,
      content: blogContent,
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    console.error("Blog generation error:", error)
    return NextResponse.json({ error: "Failed to generate blog content" }, { status: 500 })
  }
}
