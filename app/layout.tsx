import type React from "react"
import type { Metadata } from "next"
import { Poppins, Montserrat, Inter } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { SpeedInsights } from "@vercel/speed-insights/next"
import { Suspense } from "react"
import { ThemeProvider } from "@/components/theme-provider"
import { PageTransition } from "@/components/page-transition"
import { FloatingCTA } from "@/components/floating-cta"
import { AnalyticsProvider } from "@/components/analytics-provider"
import { ScrollDepthTracker } from "@/components/scroll-depth-tracker"
import { EngagementTracker } from "@/components/engagement-tracker"
import { ConversionTracker } from "@/components/conversion-tracker"
import { FacebookPixel } from "@/components/facebook-pixel"
import { HeatmapTracker } from "@/components/heatmap-tracker"
import { LiveChatWidget } from "@/components/live-chat-widget"
import { StructuredData } from "@/components/structured-data"
import { LocalBusinessSchema } from "@/components/local-business-schema"
import { FAQSchema } from "@/components/faq-schema"
import { AccessibilityEnhancements } from "@/components/accessibility-enhancements"
import { PerformanceMonitor } from "@/components/performance-monitor"
import { WebVitalsTracker } from "@/components/web-vitals-tracker"
import { ResourcePreloader } from "@/components/resource-preloader"
import { FinalOptimizations } from "@/components/final-optimizations"
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
  generator: "AJEx Tech Empire",
  applicationName: "AJEx Tech Empire",
  keywords: [
    "digital growth",
    "web design",
    "SEO optimization",
    "performance marketing",
    "SaaS growth",
    "premium digital agency",
    "AI-powered marketing",
    "conversion optimization",
    "digital transformation",
    "business growth",
  ],
  authors: [{ name: "AJEx Tech Empire" }],
  creator: "AJEx Tech Empire",
  publisher: "AJEx Tech Empire",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://ajextechempire.com"),
  alternates: {
    canonical: "/",
  },
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 5,
  },
  openGraph: {
    title: "AJEx Tech Empire - Premium Digital Growth Agency",
    description:
      "Transform your digital presence into your most powerful growth engine. 247% average revenue growth for our clients.",
    type: "website",
    locale: "en_US",
    url: "https://ajextechempire.com",
    siteName: "AJEx Tech Empire",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "AJEx Tech Empire - Digital Growth Agency",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "AJEx Tech Empire - Premium Digital Growth Agency",
    description: "Transform your digital presence into your most powerful growth engine. 247% average revenue growth.",
    images: ["/twitter-image.jpg"],
    creator: "@ajextechempire",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "your-google-verification-code",
    yandex: "your-yandex-verification-code",
    yahoo: "your-yahoo-verification-code",
  },
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
        <link rel="preconnect" href="https://www.google-analytics.com" />
        <link rel="preconnect" href="https://www.googletagmanager.com" />

        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />

        <meta name="theme-color" content="#3b82f6" />
        <meta name="color-scheme" content="dark light" />
      </head>
      <body className={`${poppins.variable} ${montserrat.variable} ${inter.variable} font-inter antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange={false}>
          <AccessibilityEnhancements />
          <PerformanceMonitor />
          <WebVitalsTracker />
          <ResourcePreloader />
          <FinalOptimizations />

          <AnalyticsProvider>
            <ScrollDepthTracker />
            <EngagementTracker />
            <ConversionTracker />
            <FacebookPixel />
            <HeatmapTracker />
            <StructuredData />
            <LocalBusinessSchema />
            <FAQSchema />

            <PageTransition>
              <Suspense fallback={null}>{children}</Suspense>
              <FloatingCTA />
              <LiveChatWidget />
            </PageTransition>
          </AnalyticsProvider>
          <Analytics />
          <SpeedInsights />
        </ThemeProvider>
      </body>
    </html>
  )
}
