import Head from "next/head"
import { StructuredData } from "./structured-data"

interface SEOHeadProps {
  title: string
  description: string
  keywords?: string
  image?: string
  url?: string
  type?: "website" | "article"
  author?: string
  publishedTime?: string
  modifiedTime?: string
  structuredData?: any
}

export function SEOHead({
  title,
  description,
  keywords,
  image = "/og-image.jpg",
  url = "https://ajextechempire.com",
  type = "website",
  author,
  publishedTime,
  modifiedTime,
  structuredData,
}: SEOHeadProps) {
  const fullTitle = title.includes("AJEx Tech Empire") ? title : `${title} | AJEx Tech Empire`
  const fullImage = image.startsWith("http") ? image : `https://ajextechempire.com${image}`

  return (
    <>
      <Head>
        {/* Basic Meta Tags */}
        <title>{fullTitle}</title>
        <meta name="description" content={description} />
        {keywords && <meta name="keywords" content={keywords} />}
        <meta name="robots" content="index, follow" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="canonical" href={url} />

        {/* Open Graph Tags */}
        <meta property="og:type" content={type} />
        <meta property="og:title" content={fullTitle} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content={fullImage} />
        <meta property="og:url" content={url} />
        <meta property="og:site_name" content="AJEx Tech Empire" />
        <meta property="og:locale" content="en_US" />

        {/* Twitter Card Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@ajextechempire" />
        <meta name="twitter:creator" content="@ajextechempire" />
        <meta name="twitter:title" content={fullTitle} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={fullImage} />

        {/* Article specific tags */}
        {type === "article" && author && (
          <>
            <meta property="article:author" content={author} />
            {publishedTime && <meta property="article:published_time" content={publishedTime} />}
            {modifiedTime && <meta property="article:modified_time" content={modifiedTime} />}
          </>
        )}

        {/* Favicon and Icons */}
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />

        {/* Additional SEO Tags */}
        <meta name="theme-color" content="#3b82f6" />
        <meta name="msapplication-TileColor" content="#3b82f6" />
        <meta name="application-name" content="AJEx Tech Empire" />
        <meta name="apple-mobile-web-app-title" content="AJEx Tech Empire" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
      </Head>

      {/* Structured Data */}
      {structuredData && <StructuredData type={structuredData.type} data={structuredData.data} />}
    </>
  )
}
