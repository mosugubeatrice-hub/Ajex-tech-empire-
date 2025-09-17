"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Target, Zap, TrendingUp, Eye, Copy, CheckCircle } from "lucide-react"

interface ContentAnalysis {
  overallScore: number
  readabilityScore: number
  persuasivenessScore: number
  seoScore: number
  suggestions: string[]
  optimizedVersion: string
  keywordOpportunities: string[]
  emotionalTriggers: string[]
}

interface HeadlineOptimization {
  originalScore: number
  variations: string[]
  explanations: string[]
  powerWords: string[]
  emotionalTriggers: string[]
  bestVariation: number
}

export function AIContentOptimizer() {
  const [activeTab, setActiveTab] = useState("analyze")
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [isOptimizingHeadline, setIsOptimizingHeadline] = useState(false)

  // Content Analysis States
  const [content, setContent] = useState("")
  const [contentType, setContentType] = useState("general")
  const [targetAudience, setTargetAudience] = useState("business professionals")
  const [analysis, setAnalysis] = useState<ContentAnalysis | null>(null)

  // Headline Optimization States
  const [headline, setHeadline] = useState("")
  const [headlineContext, setHeadlineContext] = useState("")
  const [headlineGoal, setHeadlineGoal] = useState("engagement")
  const [headlineOptimization, setHeadlineOptimization] = useState<HeadlineOptimization | null>(null)
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null)

  const contentTypes = [
    { value: "general", label: "General Content" },
    { value: "hero", label: "Hero Section" },
    { value: "cta", label: "Call-to-Action" },
    { value: "service", label: "Service Description" },
    { value: "about", label: "About Section" },
    { value: "testimonial", label: "Testimonial" },
  ]

  const audiences = [
    { value: "business professionals", label: "Business Professionals" },
    { value: "entrepreneurs", label: "Entrepreneurs" },
    { value: "startups", label: "Startups" },
    { value: "enterprise", label: "Enterprise" },
    { value: "small business", label: "Small Business" },
  ]

  const goals = [
    { value: "engagement", label: "Engagement" },
    { value: "conversion", label: "Conversion" },
    { value: "awareness", label: "Brand Awareness" },
    { value: "trust", label: "Trust Building" },
    { value: "urgency", label: "Create Urgency" },
  ]

  const handleAnalyzeContent = async () => {
    if (!content.trim()) return

    setIsAnalyzing(true)
    try {
      const response = await fetch("/api/content/analyze", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          content,
          contentType,
          targetAudience,
        }),
      })

      const data = await response.json()

      if (data.success) {
        setAnalysis(data.analysis)
      } else {
        console.error("Analysis failed:", data.error)
      }
    } catch (error) {
      console.error("Analysis error:", error)
    } finally {
      setIsAnalyzing(false)
    }
  }

  const handleOptimizeHeadline = async () => {
    if (!headline.trim()) return

    setIsOptimizingHeadline(true)
    try {
      const response = await fetch("/api/content/optimize-headlines", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          headline,
          context: headlineContext,
          goal: headlineGoal,
        }),
      })

      const data = await response.json()

      if (data.success) {
        setHeadlineOptimization(data.optimization)
      } else {
        console.error("Headline optimization failed:", data.error)
      }
    } catch (error) {
      console.error("Headline optimization error:", error)
    } finally {
      setIsOptimizingHeadline(false)
    }
  }

  const copyToClipboard = async (text: string, index: number) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopiedIndex(index)
      setTimeout(() => setCopiedIndex(null), 2000)
    } catch (error) {
      console.error("Failed to copy:", error)
    }
  }

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-green-400"
    if (score >= 60) return "text-yellow-400"
    return "text-red-400"
  }

  const getScoreBg = (score: number) => {
    if (score >= 80) return "bg-green-500"
    if (score >= 60) return "bg-yellow-500"
    return "bg-red-500"
  }

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <Card className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm border-white/20">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Target className="w-5 h-5" />
            AI Content Optimization Suite
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList className="bg-white/10 border-white/20">
              <TabsTrigger value="analyze" className="data-[state=active]:bg-white/20">
                <Eye className="w-4 h-4 mr-2" />
                Content Analysis
              </TabsTrigger>
              <TabsTrigger value="headlines" className="data-[state=active]:bg-white/20">
                <TrendingUp className="w-4 h-4 mr-2" />
                Headline Optimizer
              </TabsTrigger>
            </TabsList>

            <TabsContent value="analyze" className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <label className="text-white text-sm font-medium mb-2 block">Content to Analyze *</label>
                    <Textarea
                      value={content}
                      onChange={(e) => setContent(e.target.value)}
                      placeholder="Paste your content here for AI analysis..."
                      className="bg-white/10 border-white/20 text-white placeholder:text-gray-400 min-h-32"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-white text-sm font-medium mb-2 block">Content Type</label>
                      <Select value={contentType} onValueChange={setContentType}>
                        <SelectTrigger className="bg-white/10 border-white/20 text-white">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {contentTypes.map((type) => (
                            <SelectItem key={type.value} value={type.value}>
                              {type.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <label className="text-white text-sm font-medium mb-2 block">Target Audience</label>
                      <Select value={targetAudience} onValueChange={setTargetAudience}>
                        <SelectTrigger className="bg-white/10 border-white/20 text-white">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {audiences.map((audience) => (
                            <SelectItem key={audience.value} value={audience.value}>
                              {audience.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <Button
                    onClick={handleAnalyzeContent}
                    disabled={!content.trim() || isAnalyzing}
                    className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white border-0"
                  >
                    {isAnalyzing ? (
                      <>
                        <Target className="w-4 h-4 mr-2 animate-spin" />
                        Analyzing Content...
                      </>
                    ) : (
                      <>
                        <Target className="w-4 h-4 mr-2" />
                        Analyze Content
                      </>
                    )}
                  </Button>
                </div>

                {analysis && (
                  <div className="space-y-4">
                    <h3 className="text-white font-semibold text-lg">Analysis Results</h3>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="text-center">
                        <div className={`text-3xl font-bold ${getScoreColor(analysis.overallScore)}`}>
                          {analysis.overallScore}/100
                        </div>
                        <p className="text-gray-300 text-sm">Overall Score</p>
                      </div>
                      <div className="text-center">
                        <div className={`text-3xl font-bold ${getScoreColor(analysis.readabilityScore * 10)}`}>
                          {analysis.readabilityScore}/10
                        </div>
                        <p className="text-gray-300 text-sm">Readability</p>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span className="text-gray-300">SEO Score</span>
                          <span className="text-white">{analysis.seoScore}/100</span>
                        </div>
                        <Progress value={analysis.seoScore} className="h-2" />
                      </div>
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span className="text-gray-300">Persuasiveness</span>
                          <span className="text-white">{analysis.persuasivenessScore * 10}/100</span>
                        </div>
                        <Progress value={analysis.persuasivenessScore * 10} className="h-2" />
                      </div>
                    </div>

                    <div>
                      <h4 className="text-white font-medium mb-2">Keyword Opportunities</h4>
                      <div className="flex flex-wrap gap-2">
                        {analysis.keywordOpportunities.map((keyword, index) => (
                          <Badge key={index} variant="outline" className="border-blue-500/30 text-blue-300">
                            {keyword}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {analysis && (
                <div className="space-y-6">
                  <div>
                    <h4 className="text-white font-medium mb-3">Optimization Suggestions</h4>
                    <div className="space-y-2">
                      {analysis.suggestions.map((suggestion, index) => (
                        <div key={index} className="flex items-start gap-2 text-gray-300 text-sm">
                          <Zap className="w-4 h-4 text-yellow-400 mt-0.5 flex-shrink-0" />
                          {suggestion}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="text-white font-medium mb-3">Optimized Version</h4>
                    <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                      <p className="text-gray-300 text-sm leading-relaxed">{analysis.optimizedVersion}</p>
                    </div>
                  </div>
                </div>
              )}
            </TabsContent>

            <TabsContent value="headlines" className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <label className="text-white text-sm font-medium mb-2 block">Current Headline *</label>
                    <Input
                      value={headline}
                      onChange={(e) => setHeadline(e.target.value)}
                      placeholder="Enter your current headline"
                      className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
                    />
                  </div>

                  <div>
                    <label className="text-white text-sm font-medium mb-2 block">Context (Optional)</label>
                    <Textarea
                      value={headlineContext}
                      onChange={(e) => setHeadlineContext(e.target.value)}
                      placeholder="Provide context about where this headline will be used..."
                      className="bg-white/10 border-white/20 text-white placeholder:text-gray-400 h-20"
                    />
                  </div>

                  <div>
                    <label className="text-white text-sm font-medium mb-2 block">Optimization Goal</label>
                    <Select value={headlineGoal} onValueChange={setHeadlineGoal}>
                      <SelectTrigger className="bg-white/10 border-white/20 text-white">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {goals.map((goal) => (
                          <SelectItem key={goal.value} value={goal.value}>
                            {goal.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <Button
                    onClick={handleOptimizeHeadline}
                    disabled={!headline.trim() || isOptimizingHeadline}
                    className="w-full bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white border-0"
                  >
                    {isOptimizingHeadline ? (
                      <>
                        <TrendingUp className="w-4 h-4 mr-2 animate-spin" />
                        Optimizing Headlines...
                      </>
                    ) : (
                      <>
                        <TrendingUp className="w-4 h-4 mr-2" />
                        Generate Optimized Headlines
                      </>
                    )}
                  </Button>
                </div>

                {headlineOptimization && (
                  <div className="space-y-4">
                    <div className="text-center">
                      <div className={`text-2xl font-bold ${getScoreColor(headlineOptimization.originalScore)}`}>
                        {headlineOptimization.originalScore}/100
                      </div>
                      <p className="text-gray-300 text-sm">Original Headline Score</p>
                    </div>

                    <div>
                      <h4 className="text-white font-medium mb-2">Power Words Used</h4>
                      <div className="flex flex-wrap gap-2">
                        {headlineOptimization.powerWords.map((word, index) => (
                          <Badge key={index} className="bg-purple-500/20 text-purple-300 border-purple-500/30">
                            {word}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h4 className="text-white font-medium mb-2">Emotional Triggers</h4>
                      <div className="flex flex-wrap gap-2">
                        {headlineOptimization.emotionalTriggers.map((trigger, index) => (
                          <Badge key={index} className="bg-orange-500/20 text-orange-300 border-orange-500/30">
                            {trigger}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {headlineOptimization && (
                <div>
                  <h4 className="text-white font-medium mb-4">Optimized Headlines</h4>
                  <div className="space-y-3">
                    {headlineOptimization.variations.map((variation, index) => (
                      <div
                        key={index}
                        className={`p-4 rounded-lg border ${
                          index === headlineOptimization.bestVariation
                            ? "bg-green-500/10 border-green-500/30"
                            : "bg-white/5 border-white/10"
                        }`}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2">
                            {index === headlineOptimization.bestVariation && (
                              <Badge className="bg-green-500/20 text-green-300 border-green-500/30 text-xs">
                                Recommended
                              </Badge>
                            )}
                          </div>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => copyToClipboard(variation, index)}
                            className="text-gray-400 hover:text-white"
                          >
                            {copiedIndex === index ? <CheckCircle className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                          </Button>
                        </div>
                        <p className="text-white font-medium mb-2">{variation}</p>
                        <p className="text-gray-300 text-sm">{headlineOptimization.explanations[index]}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}
