"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Accessibility, Minus, Plus, RotateCcw } from "lucide-react"

export function AccessibilityEnhancer() {
  const [isOpen, setIsOpen] = useState(false)
  const [fontSize, setFontSize] = useState(100)
  const [highContrast, setHighContrast] = useState(false)
  const [reducedMotion, setReducedMotion] = useState(false)

  useEffect(() => {
    document.documentElement.style.fontSize = `${fontSize}%`

    if (highContrast) {
      document.documentElement.classList.add("high-contrast")
    } else {
      document.documentElement.classList.remove("high-contrast")
    }

    if (reducedMotion) {
      document.documentElement.classList.add("reduce-motion")
    } else {
      document.documentElement.classList.remove("reduce-motion")
    }
  }, [fontSize, highContrast, reducedMotion])

  const resetSettings = () => {
    setFontSize(100)
    setHighContrast(false)
    setReducedMotion(false)
  }

  return (
    <>
      <Button
        onClick={() => setIsOpen(!isOpen)}
        size="sm"
        variant="outline"
        className="fixed top-4 right-4 z-50 bg-background/80 backdrop-blur-sm"
        aria-label="Accessibility Options"
      >
        <Accessibility className="h-4 w-4" />
      </Button>

      {isOpen && (
        <Card className="fixed top-16 right-4 z-50 w-64 bg-background/95 backdrop-blur-sm shadow-xl">
          <CardContent className="p-4 space-y-4">
            <h3 className="font-semibold text-sm">Accessibility Options</h3>

            <div className="space-y-3">
              <div>
                <label className="text-sm font-medium">Font Size</label>
                <div className="flex items-center gap-2 mt-1">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => setFontSize(Math.max(80, fontSize - 10))}
                    disabled={fontSize <= 80}
                  >
                    <Minus className="h-3 w-3" />
                  </Button>
                  <span className="text-sm min-w-12 text-center">{fontSize}%</span>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => setFontSize(Math.min(150, fontSize + 10))}
                    disabled={fontSize >= 150}
                  >
                    <Plus className="h-3 w-3" />
                  </Button>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <label className="text-sm font-medium">High Contrast</label>
                <Button
                  size="sm"
                  variant={highContrast ? "default" : "outline"}
                  onClick={() => setHighContrast(!highContrast)}
                >
                  {highContrast ? "On" : "Off"}
                </Button>
              </div>

              <div className="flex items-center justify-between">
                <label className="text-sm font-medium">Reduce Motion</label>
                <Button
                  size="sm"
                  variant={reducedMotion ? "default" : "outline"}
                  onClick={() => setReducedMotion(!reducedMotion)}
                >
                  {reducedMotion ? "On" : "Off"}
                </Button>
              </div>

              <Button size="sm" variant="outline" onClick={resetSettings} className="w-full bg-transparent">
                <RotateCcw className="h-3 w-3 mr-2" />
                Reset
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </>
  )
}
