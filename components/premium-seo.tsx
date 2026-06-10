// This component must only be used in Server Components (like layout.tsx)
// Do not use in client components ("use client")
import Script from "next/script"

interface PremiumSEOProps {
  title?: string
  description?: string
  keywords?: string
  image?: string
  url?: string
  type?: string
}

export function PremiumSEO({
  title = "AJEx Tech Empire - Premium Digital Solutions",
  description = "Transform your business with cutting-edge technology solutions. Expert web development, AI integration, and digital transformation services.",
  keywords = "web development, AI integration, digital transformation, technology solutions, premium development",
  image = "/premium-laptop-mockup-showing-modern-website-desig.jpg",
  url = "https://ajex-tech-empire.com",
  type = "website",
}: PremiumSEOProps) {
  const fullTitle = title.includes("AJEx Tech Empire") ? title : `${title} | AJEx Tech Empire`

  return (
    <>
      {/* Primary Meta Tags - Use Metadata in layout instead */}
      {/* This component is deprecated - use layout.tsx metadata export instead */}

      {/* Structured Data using next/script */}
      <Script
        id="org-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            name: "AJEx Tech Empire",
            description: description,
            url: url,
            logo: `${url}/logo.png`,
            contactPoint: {
              "@type": "ContactPoint",
              telephone: "+1-555-0123",
              contactType: "customer service",
            },
            sameAs: ["https://linkedin.com/company/ajex-tech-empire", "https://twitter.com/ajextechempire"],
          }),
        }}
      />
    </>
  )
}
