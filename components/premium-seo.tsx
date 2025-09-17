import Head from "next/head"

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
    <Head>
      {/* Primary Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="title" content={fullTitle} />
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="robots" content="index, follow" />
      <meta name="language" content="English" />
      <meta name="author" content="AJEx Tech Empire" />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:site_name" content="AJEx Tech Empire" />

      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={url} />
      <meta property="twitter:title" content={fullTitle} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content={image} />

      {/* Additional Meta Tags */}
      <meta name="theme-color" content="#2563eb" />
      <meta name="msapplication-TileColor" content="#2563eb" />
      <link rel="canonical" href={url} />

      {/* Structured Data */}
      <script
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
    </Head>
  )
}
