import type React from "react"
import type { Metadata } from "next"
import { Poppins, Montserrat, Inter } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { SpeedInsights } from "@vercel/speed-insights/next"
import { Suspense } from "react"
import { ThemeProvider } from "@/components/theme-provider"
import { Navigation } from "@/components/navigation"
import { PremiumFooter } from "@/components/premium-footer"
import "./globals.css"

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
  display: "swap",
})

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-montserrat",
  display: "swap",
})

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-inter",
  display: "swap",
})

export const metadata: Metadata = {
  title: {
    default: "AJEx Tech Empire - Premium Digital Growth Agency",
    template: "%s | AJEx Tech Empire",
  },
  description:
    "Transform your digital presence into your most powerful growth engine. We design, build, and optimize high-performance digital assets that drive revenue and establish market leadership.",
  keywords: [
    "digital growth",
    "web design",
    "SEO optimization",
    "performance marketing",
    "SaaS growth",
    "premium digital agency",
  ],
  openGraph: {
    title: "AJEx Tech Empire - Premium Digital Growth Agency",
    description: "Transform your digital presence into your most powerful growth engine.",
    type: "website",
    url: "https://ajextechempire.com",
  },
    generator: 'v0.app'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <meta name="theme-color" content="#3b82f6" />
      </head>
      <body className={`${poppins.variable} ${montserrat.variable} ${inter.variable} font-inter antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange={false}>
          <Navigation />
          <Suspense fallback={null}>
            <main className="min-h-screen">{children}</main>
          </Suspense>
          <PremiumFooter />
          <Analytics />
          <SpeedInsights />
        </ThemeProvider>
      </body>
    </html>
  )
}
