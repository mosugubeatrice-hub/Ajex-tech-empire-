"use client"

import { useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { RefreshCw, Home, AlertTriangle } from "lucide-react"
import Link from "next/link"

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <Card className="glass-card max-w-md w-full text-center">
        <CardContent className="p-8">
          <div className="mb-6">
            <AlertTriangle className="h-16 w-16 text-destructive mx-auto mb-4" />
            <h1 className="text-3xl font-poppins font-bold mb-2">Something went wrong</h1>
            <p className="text-muted-foreground font-inter">
              We encountered an unexpected error. Please try again or contact support if the problem persists.
            </p>
          </div>

          <div className="space-y-4">
            <Button onClick={reset} className="w-full bg-primary hover:bg-primary/90 font-montserrat">
              <RefreshCw className="mr-2 h-4 w-4" />
              Try Again
            </Button>

            <Link href="/">
              <Button variant="outline" className="w-full font-montserrat bg-transparent">
                <Home className="mr-2 h-4 w-4" />
                Back to Home
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
