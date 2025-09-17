"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Wand2, FileText, Search, Calendar, Target, Zap } from "lucide-react"

interface BlogContent {
  title: string
  excerpt: string
  content: string
  tags: string[]
  estimatedReadTime: number
  seoTitle: string
  metaDescription: string
}

export function AIBlogGenerator() {
  const [isGenerating, setIsGenerating] = useState(false)
  const [isOptimizing, setIsOptimizing] = useState(false)
  const [generatedContent, setGeneratedContent] = useState<BlogContent | null>(null)
  const [optimization, setOptimization] = useState<any>(null)

  // Form states
  const [topic, setTopic] = useState("")
  const [category, setCategory] = useState("")
  const [tone, setTone] = useState("professional")
  const [length, setLength] = useState("medium")
  const [keywords, setKeywords] = useState("")
  const [scheduledDate, setScheduledDate] = useState("")

  const categories = [
    "Digital Marketing",
    "Web Development",
    "Design",
    "E-commerce",
    "UX Design",
    "SEO",
    "AI & Technology",
    "Business Strategy",
  ]

  const tones = [
    { value: "professional", label: "Professional" },
    { value: "conversational", label: "Conversational" },
    { value: "authoritative", label: "Authoritative" },
    { value: "friendly", label: "Friendly" },
    { value: "technical", label: "Technical" },
  ]

  const lengths = [
    { value: "short", label: "Short (500-800 words)" },
    { value: "medium", label: "Medium (800-1200 words)" },
    { value: "long", label: "Long (1200-1800 words)" },
  ]

  const handleGenerate = async () => {
    if (!topic || !category) return

    setIsGenerating(true)
    try {
      const response = await fetch("/api/blog/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          topic,
          category,
          tone,
          length,
          keywords: keywords
            .split(",")
            .map((k) => k.trim())
            .filter((k) => k),
        }),
      })

      const data = await response.json()

      if (data.success) {
        setGeneratedContent(data.content)
      } else {
        console.error("Generation failed:", data.error)
      }
    } catch (error) {
      console.error("Generation error:", error)
    } finally {
      setIsGenerating(false)
    }
  }

  const handleOptimize = async () => {
    if (!generatedContent) return

    setIsOptimizing(true)
    try {
      const response = await fetch("/api/blog/optimize", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          content: generatedContent.content,
          targetKeywords: keywords
            .split(",")
            .map((k) => k.trim())
            .filter((k) => k),
          currentTitle: generatedContent.title,
          currentMeta: generatedContent.metaDescription,
        }),
      })

      const data = await response.json()

      if (data.success) {
        setOptimization(data.optimization)
      }
    } catch (error) {
      console.error("Optimization error:", error)
    } finally {
      setIsOptimizing(false)
    }
  }

  const handleSchedule = async () => {
    if (!generatedContent || !scheduledDate) return

    // In a real implementation, this would save to database
    console.log("Scheduling blog post for:", scheduledDate)
    alert(`Blog post scheduled for ${new Date(scheduledDate).toLocaleDateString()}`)
  }

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <Card className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm border-white/20">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Wand2 className="w-5 h-5" />
            AI Blog Content Generator
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <label className="text-white text-sm font-medium mb-2 block">Blog Topic *</label>
                <Input
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  placeholder="e.g., The Future of AI in Digital Marketing"
                  className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
                />
              </div>

              <div>
                <label className="text-white text-sm font-medium mb-2 block">Category *</label>
                <Select value={category} onValueChange={setCategory}>
                  <SelectTrigger className="bg-white/10 border-white/20 text-white">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((cat) => (
                      <SelectItem key={cat} value={cat}>
                        {cat}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-white text-sm font-medium mb-2 block">Tone</label>
                <Select value={tone} onValueChange={setTone}>
                  <SelectTrigger className="bg-white/10 border-white/20 text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {tones.map((t) => (
                      <SelectItem key={t.value} value={t.value}>
                        {t.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-white text-sm font-medium mb-2 block">Content Length</label>
                <Select value={length} onValueChange={setLength}>
                  <SelectTrigger className="bg-white/10 border-white/20 text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {lengths.map((l) => (
                      <SelectItem key={l.value} value={l.value}>
                        {l.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-white text-sm font-medium mb-2 block">Keywords (comma-separated)</label>
                <Input
                  value={keywords}
                  onChange={(e) => setKeywords(e.target.value)}
                  placeholder="AI, digital marketing, automation"
                  className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
                />
              </div>

              <div>
                <label className="text-white text-sm font-medium mb-2 block">Schedule Publication</label>
                <Input
                  type="datetime-local"
                  value={scheduledDate}
                  onChange={(e) => setScheduledDate(e.target.value)}
                  className="bg-white/10 border-white/20 text-white"
                />
              </div>
            </div>
          </div>

          <Button
            onClick={handleGenerate}
            disabled={!topic || !category || isGenerating}
            className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white border-0"
          >
            {isGenerating ? (
              <>
                <Wand2 className="w-4 h-4 mr-2 animate-spin" />
                Generating Content...
              </>
            ) : (
              <>
                <Wand2 className="w-4 h-4 mr-2" />
                Generate Blog Content
              </>
            )}
          </Button>
        </CardContent>
      </Card>

      {generatedContent && (
        <Tabs defaultValue="preview" className="space-y-6">
          <TabsList className="bg-white/10 border-white/20">
            <TabsTrigger value="preview" className="data-[state=active]:bg-white/20">
              <FileText className="w-4 h-4 mr-2" />
              Preview
            </TabsTrigger>
            <TabsTrigger value="seo" className="data-[state=active]:bg-white/20">
              <Search className="w-4 h-4 mr-2" />
              SEO Optimization
            </TabsTrigger>
            <TabsTrigger value="schedule" className="data-[state=active]:bg-white/20">
              <Calendar className="w-4 h-4 mr-2" />
              Schedule & Publish
            </TabsTrigger>
          </TabsList>

          <TabsContent value="preview">
            <Card className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm border-white/20">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-white">Generated Content</CardTitle>
                  <Badge className="bg-green-500/20 text-green-300 border-green-500/30">
                    {generatedContent.estimatedReadTime} min read
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h2 className="text-2xl font-bold text-white mb-2">{generatedContent.title}</h2>
                  <p className="text-gray-300 mb-4">{generatedContent.excerpt}</p>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {generatedContent.tags.map((tag, index) => (
                      <Badge key={index} variant="outline" className="border-white/20 text-gray-300">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div
                  className="prose prose-invert max-w-none"
                  dangerouslySetInnerHTML={{ __html: generatedContent.content }}
                />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="seo">
            <Card className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm border-white/20">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-white">SEO Optimization</CardTitle>
                  <Button
                    onClick={handleOptimize}
                    disabled={isOptimizing}
                    size="sm"
                    className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white border-0"
                  >
                    {isOptimizing ? (
                      <>
                        <Target className="w-4 h-4 mr-2 animate-spin" />
                        Optimizing...
                      </>
                    ) : (
                      <>
                        <Target className="w-4 h-4 mr-2" />
                        Optimize SEO
                      </>
                    )}
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="text-white text-sm font-medium mb-2 block">SEO Title</label>
                    <Input
                      value={optimization?.optimizedTitle || generatedContent.seoTitle}
                      readOnly
                      className="bg-white/10 border-white/20 text-white"
                    />
                    <p className="text-xs text-gray-400 mt-1">
                      {(optimization?.optimizedTitle || generatedContent.seoTitle).length}/60 characters
                    </p>
                  </div>
                  <div>
                    <label className="text-white text-sm font-medium mb-2 block">Meta Description</label>
                    <Textarea
                      value={optimization?.optimizedMeta || generatedContent.metaDescription}
                      readOnly
                      className="bg-white/10 border-white/20 text-white h-20"
                    />
                    <p className="text-xs text-gray-400 mt-1">
                      {(optimization?.optimizedMeta || generatedContent.metaDescription).length}/160 characters
                    </p>
                  </div>
                </div>

                {optimization && (
                  <div className="space-y-4">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="text-center">
                        <div className="text-3xl font-bold text-white mb-2">{optimization.seoScore}/100</div>
                        <p className="text-gray-300">SEO Score</p>
                      </div>
                      <div className="text-center">
                        <div className="text-3xl font-bold text-white mb-2">{optimization.readabilityScore}/10</div>
                        <p className="text-gray-300">Readability</p>
                      </div>
                    </div>

                    <div>
                      <h4 className="text-white font-medium mb-3">Optimization Suggestions</h4>
                      <div className="space-y-2">
                        {optimization.suggestions.map((suggestion: string, index: number) => (
                          <div key={index} className="flex items-start gap-2 text-gray-300 text-sm">
                            <Zap className="w-4 h-4 text-yellow-400 mt-0.5 flex-shrink-0" />
                            {suggestion}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="schedule">
            <Card className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm border-white/20">
              <CardHeader>
                <CardTitle className="text-white">Schedule & Publish</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="text-white text-sm font-medium mb-2 block">Publication Date</label>
                    <Input
                      type="datetime-local"
                      value={scheduledDate}
                      onChange={(e) => setScheduledDate(e.target.value)}
                      className="bg-white/10 border-white/20 text-white"
                    />
                  </div>
                  <div>
                    <label className="text-white text-sm font-medium mb-2 block">Status</label>
                    <Select defaultValue="draft">
                      <SelectTrigger className="bg-white/10 border-white/20 text-white">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="draft">Draft</SelectItem>
                        <SelectItem value="scheduled">Scheduled</SelectItem>
                        <SelectItem value="published">Publish Now</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="flex gap-4">
                  <Button
                    onClick={handleSchedule}
                    disabled={!scheduledDate}
                    className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white border-0"
                  >
                    <Calendar className="w-4 h-4 mr-2" />
                    Schedule Post
                  </Button>
                  <Button variant="outline" className="border-white/20 text-white hover:bg-white/10 bg-transparent">
                    Save as Draft
                  </Button>
                  <Button className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white border-0">
                    Publish Now
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      )}
    </div>
  )
}
