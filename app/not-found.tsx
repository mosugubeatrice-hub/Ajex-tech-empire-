import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Home, Search } from "lucide-react"

export default function NotFound() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <Card className="glass-card max-w-md w-full text-center">
        <CardContent className="p-8">
          <div className="mb-6">
            <h1 className="text-8xl font-poppins font-bold text-primary mb-4">404</h1>
            <h2 className="text-2xl font-poppins font-semibold mb-2">Page Not Found</h2>
            <p className="text-muted-foreground font-inter">
              The page you're looking for doesn't exist or has been moved.
            </p>
          </div>

          <div className="space-y-4">
            <Link href="/">
              <Button className="w-full bg-primary hover:bg-primary/90 font-montserrat">
                <Home className="mr-2 h-4 w-4" />
                Back to Home
              </Button>
            </Link>

            <Link href="/contact">
              <Button variant="outline" className="w-full font-montserrat bg-transparent">
                <Search className="mr-2 h-4 w-4" />
                Contact Support
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
