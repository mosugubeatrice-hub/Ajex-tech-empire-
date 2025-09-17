import { type NextRequest, NextResponse } from "next/server"
import { createGroq } from "@ai-sdk/groq"
import { generateText } from "ai"

const groq = createGroq({
  apiKey: process.env.GROQ_API_KEY,
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { headline, context = "", goal = "engagement" } = body

    if (!headline) {
      return NextResponse.json({ error: "Headline is required" }, { status: 400 })
    }

    const systemPrompt = `You are a headline optimization expert for AJEx Tech Empire. Create compelling, high-converting headlines that maintain the premium brand voice.

Current headline: "${headline}"
Context: ${context}
Goal: ${goal}

Generate 5 optimized headline variations that:
1. Increase click-through rates
2. Improve emotional impact
3. Maintain professional tone
4. Include power words
5. Are optimized for the specified goal

Return JSON with:
- originalScore: Score the original headline 1-100
- variations: Array of 5 optimized headlines
- explanations: Why each variation is better
- powerWords: Power words used in optimizations
- emotionalTriggers: Emotional elements incorporated
- bestVariation: Index of the recommended best option`

    const { text: aiResponse } = await generateText({
      model: groq("llama-3.1-70b-versatile"),
      prompt: systemPrompt,
      maxTokens: 1000,
      temperature: 0.7,
    })

    let optimization
    try {
      optimization = JSON.parse(aiResponse)
    } catch (parseError) {
      optimization = {
        originalScore: 65,
        variations: [
          `${headline} - Proven Results`,
          `Transform Your Business: ${headline}`,
          `${headline} That Drives Growth`,
          `Unlock Success: ${headline}`,
          `${headline} - Start Today`,
        ],
        explanations: [
          "Added social proof element",
          "Included transformation promise",
          "Focused on growth outcome",
          "Used unlock trigger word",
          "Added urgency element",
        ],
        powerWords: ["Transform", "Proven", "Unlock", "Success", "Growth"],
        emotionalTriggers: ["achievement", "transformation", "urgency"],
        bestVariation: 1,
      }
    }

    return NextResponse.json({
      success: true,
      optimization,
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    console.error("Headline optimization error:", error)
    return NextResponse.json({ error: "Failed to optimize headline" }, { status: 500 })
  }
}
