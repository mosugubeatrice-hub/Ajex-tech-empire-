"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"
import { cn } from "@/lib/utils"
import { Icons } from "@/components/icons"
import { useState, useEffect } from "react"

const Menu = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <line x1="3" y1="6" x2="21" y2="6" />
    <line x1="3" y1="12" x2="21" y2="12" />
    <line x1="3" y1="18" x2="21" y2="18" />
  </svg>
)

const X = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
)

const navigation = [
  { name: "Home", href: "/" },
  { name: "Our Solutions", href: "/services" },
  { name: "Proven Results", href: "/work" },
  { name: "Insights", href: "/blog" },
  { name: "Our Vision", href: "/about" },
  { name: "Start Your Project", href: "/contact" },
]

export function Navigation() {
  const pathname = usePathname()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled ? "bg-background/95 backdrop-blur-xl border-b border-border/50 shadow-lg" : "bg-transparent",
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="group flex items-center space-x-2">
            <img
              src="/logo.jpg"
              alt="AJEx Tech Empire Logo"
              className="h-10 w-10 rounded-lg object-cover hover:shadow-lg hover:shadow-blue-500/50 transition-all"
            />
            <span className="text-xl font-poppins font-bold text-foreground group-hover:text-primary transition-colors hidden sm:inline">
              Tech Empire
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navigation.map((item, index) => (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "relative text-sm font-montserrat font-medium transition-all duration-300 hover:text-primary group",
                  pathname === item.href ? "text-primary" : "text-muted-foreground",
                )}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {item.name}
                <span
                  className={cn(
                    "absolute -bottom-1 left-0 h-0.5 bg-gradient-to-r from-blue-600 to-purple-600 transition-all duration-300",
                    pathname === item.href ? "w-full" : "w-0 group-hover:w-full",
                  )}
                ></span>
              </Link>
            ))}
          </div>

          {/* Desktop Navigation Buttons Container */}
          <div className="hidden md:flex items-center space-x-3">
            <ThemeToggle />
            <Link href="/quote">
              <Button className="relative overflow-hidden bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-montserrat font-medium px-6 py-2 rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-lg group">
                <span className="relative z-10">Get a Quote</span>
                <div className="absolute inset-0 bg-white/20 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
              </Button>
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center space-x-2">
            <ThemeToggle />
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-foreground hover:bg-primary/10 transition-colors"
            >
              {mobileMenuOpen ? <Icons.X className="h-6 w-6" /> : <Icons.Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden border-t border-border/50 bg-background/98 backdrop-blur-xl animate-in slide-in-from-top-2 duration-300">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navigation.map((item, index) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    "block px-3 py-3 text-base font-montserrat font-medium transition-all duration-300 hover:text-primary hover:bg-primary/5 rounded-lg",
                    pathname === item.href ? "text-primary bg-primary/10" : "text-muted-foreground",
                  )}
                  onClick={() => setMobileMenuOpen(false)}
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  {item.name}
                </Link>
              ))}
              <div className="px-3 py-2">
                <Link href="/quote">
                  <Button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-montserrat font-medium py-3 rounded-lg transition-all duration-300">
                    Get a Quote
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
