import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { ScrollToTop } from "@/components/scroll-to-top"
import { ScrollProgress } from "@/components/scroll-progress"
import { FloatingCTA } from "@/components/floating-cta"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Calendar, Clock, User, ArrowRight, Search, Filter } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const blogPosts = [
  {
    id: 1,
    title: `The Future of Growth Strategy: AI-Powered Strategies for ${new Date().getFullYear()}`,
    excerpt: `Discover how artificial intelligence is revolutionizing digital growth and learn the strategies that will dominate in ${new Date().getFullYear()}.`,
    author: "Sarah Johnson",
    date: new Date().toISOString().split("T")[0],
    readTime: "8 min read",
    category: "Growth Strategy",
    image: "/premium-laptop-mockup-showing-modern-website-desig.jpg",
    featured: true,
  },
  {
    id: 2,
    title: "Building Scalable Web Applications with Next.js 14",
    excerpt:
      "A comprehensive guide to leveraging Next.js 14's latest features for building high-performance, scalable web applications.",
    author: "Michael Chen",
    date: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
    readTime: "12 min read",
    category: "Web Development",
    image: "/modern-office-workspace-with-digital-growth-charts.jpg",
    featured: false,
  },
  {
    id: 3,
    title: "Brand Identity Design: Creating Memorable Visual Experiences",
    excerpt:
      "Learn the principles of effective brand identity design and how to create visual experiences that resonate with your audience.",
    author: "Emily Rodriguez",
    date: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
    readTime: "6 min read",
    category: "Design",
    image: "/abstract-geometric-shapes.png",
    featured: false,
  },
  {
    id: 4,
    title: "E-commerce Optimization: Converting Visitors into Customers",
    excerpt:
      "Proven strategies and techniques to optimize your e-commerce website for maximum conversions and revenue growth.",
    author: "David Park",
    date: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
    readTime: "10 min read",
    category: "E-commerce",
    image: "/premium-laptop-mockup-showing-modern-website-desig.jpg",
    featured: false,
  },
  {
    id: 5,
    title: "The Psychology of User Experience Design",
    excerpt:
      "Understanding user psychology is crucial for creating intuitive and engaging digital experiences that drive results.",
    author: "Lisa Thompson",
    date: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
    readTime: "7 min read",
    category: "UX Design",
    image: "/modern-office-workspace-with-digital-growth-charts.jpg",
    featured: false,
  },
  {
    id: 6,
    title: `SEO in ${new Date().getFullYear()}: Advanced Strategies for Organic Growth`,
    excerpt: `Stay ahead of the competition with cutting-edge SEO strategies that will boost your organic search rankings in ${new Date().getFullYear()}.`,
    author: "James Wilson",
    date: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
    readTime: "9 min read",
    category: "SEO",
    image: "/abstract-geometric-shapes.png",
    featured: false,
  },
]

const categories = ["All", "Growth Strategy", "Web Development", "Design", "E-commerce", "UX Design", "SEO"]

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <ScrollProgress />
      <Navigation />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20 backdrop-blur-3xl" />
        <div className="relative max-w-7xl mx-auto text-center">
          <Badge className="mb-6 bg-gradient-to-r from-blue-500 to-purple-500 text-white border-0 px-6 py-2 text-sm font-medium">
            Latest Insights
          </Badge>
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 text-balance">
            Growth Strategy
            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent"> Blog</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto text-pretty">
            Stay ahead of the curve with expert insights, industry trends, and actionable strategies from our team of
            growth strategy professionals.
          </p>
        </div>
      </section>

      {/* Search and Filter Section */}
      <section className="px-4 sm:px-6 lg:px-8 mb-16">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                placeholder="Search articles..."
                className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-gray-400"
              />
            </div>
            <div className="flex items-center gap-4">
              <Filter className="text-gray-400 w-5 h-5" />
              <Select>
                <SelectTrigger className="w-48 bg-white/10 border-white/20 text-white">
                  <SelectValue placeholder="All Categories" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category.toLowerCase()}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Article */}
      <section className="px-4 sm:px-6 lg:px-8 mb-20">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-white mb-8">Featured Article</h2>
          {blogPosts
            .filter((post) => post.featured)
            .map((post) => (
              <Card
                key={post.id}
                className="bg-gradient-to-r from-white/10 to-white/5 backdrop-blur-sm border-white/20 overflow-hidden group hover:scale-[1.02] transition-all duration-500"
              >
                <div className="md:flex">
                  <div className="md:w-1/2">
                    <img
                      src={post.image || "/placeholder.svg"}
                      alt={post.title}
                      className="w-full h-64 md:h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="md:w-1/2 p-8">
                    <Badge className="mb-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white border-0">
                      {post.category}
                    </Badge>
                    <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-blue-400 transition-colors">
                      {post.title}
                    </h3>
                    <p className="text-gray-300 mb-6 text-pretty">{post.excerpt}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4 text-sm text-gray-400">
                        <div className="flex items-center gap-2">
                          <User className="w-4 h-4" />
                          {post.author}
                        </div>
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4" />
                          {new Date(post.date).toLocaleDateString()}
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4" />
                          {post.readTime}
                        </div>
                      </div>
                      <Button className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white border-0 group">
                        Read More
                        <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
        </div>
      </section>

      {/* Blog Grid */}
      <section className="px-4 sm:px-6 lg:px-8 mb-20">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-white mb-8">Latest Articles</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts
              .filter((post) => !post.featured)
              .map((post) => (
                <Card
                  key={post.id}
                  className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm border-white/20 overflow-hidden group hover:scale-105 transition-all duration-500"
                >
                  <div className="relative overflow-hidden">
                    <img
                      src={post.image || "/placeholder.svg"}
                      alt={post.title}
                      className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute top-4 left-4">
                      <Badge className="bg-gradient-to-r from-blue-500 to-purple-500 text-white border-0">
                        {post.category}
                      </Badge>
                    </div>
                  </div>
                  <CardContent className="p-6">
                    <h3 className="text-xl font-bold text-white mb-3 group-hover:text-blue-400 transition-colors">
                      {post.title}
                    </h3>
                    <p className="text-gray-300 mb-4 text-sm text-pretty">{post.excerpt}</p>
                    <div className="flex items-center justify-between text-xs text-gray-400 mb-4">
                      <div className="flex items-center gap-2">
                        <User className="w-3 h-3" />
                        {post.author}
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="w-3 h-3" />
                        {post.readTime}
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-400">{new Date(post.date).toLocaleDateString()}</span>
                      <Button
                        size="sm"
                        className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white border-0 group"
                      >
                        Read More
                        <ArrowRight className="ml-1 w-3 h-3 group-hover:translate-x-1 transition-transform" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
          </div>
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="px-4 sm:px-6 lg:px-8 mb-20">
        <div className="max-w-4xl mx-auto">
          <Card className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 backdrop-blur-sm border-white/20 text-center p-12">
            <h2 className="text-3xl font-bold text-white mb-4">Stay Updated</h2>
            <p className="text-gray-300 mb-8 text-pretty">
              Subscribe to our newsletter and never miss the latest insights, trends, and strategies in growth and web
              development.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <Input
                placeholder="Enter your email"
                className="flex-1 bg-white/10 border-white/20 text-white placeholder:text-gray-400"
              />
              <Button className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white border-0 px-8">
                Subscribe
              </Button>
            </div>
          </Card>
        </div>
      </section>

      <Footer />
      <ScrollToTop />
      <FloatingCTA />
    </div>
  )
}
