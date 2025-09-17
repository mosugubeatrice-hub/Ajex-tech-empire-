"use client"

import { useEffect } from "react"
import { usePathname } from "next/navigation"

interface SEOOptimizerProps {
  title?: string
  description?: string
  keywords?: string[]
  canonicalUrl?: string
}

export function SEOOptimizer({ title, description, keywords, canonicalUrl }: SEOOptimizerProps) {
  const pathname = usePathname()

  useEffect(() => {
    if (title) {
      document.title = `${title} | AJEx Tech Empire`
    }

    // Update meta description
    if (description) {
      let metaDescription = document.querySelector('meta[name="description"]')
      if (!metaDescription) {
        metaDescription = document.createElement("meta")
        metaDescription.setAttribute("name", "description")
        document.head.appendChild(metaDescription)
      }
      metaDescription.setAttribute("content", description)
    }

    // Update keywords
    if (keywords && keywords.length > 0) {
      let metaKeywords = document.querySelector('meta[name="keywords"]')
      if (!metaKeywords) {
        metaKeywords = document.createElement("meta")
        metaKeywords.setAttribute("name", "keywords")
        document.head.appendChild(metaKeywords)
      }
      metaKeywords.setAttribute("content", keywords.join(", "))
    }

    // Update canonical URL
    const canonical = canonicalUrl || `https://ajextechempire.com${pathname}`
    let linkCanonical = document.querySelector('link[rel="canonical"]')
    if (!linkCanonical) {
      linkCanonical = document.createElement("link")
      linkCanonical.setAttribute("rel", "canonical")
      document.head.appendChild(linkCanonical)
    }
    linkCanonical.setAttribute("href", canonical)

    // Update Open Graph tags
    const updateOGTag = (property: string, content: string) => {
      let ogTag = document.querySelector(`meta[property="${property}"]`)
      if (!ogTag) {
        ogTag = document.createElement("meta")
        ogTag.setAttribute("property", property)
        document.head.appendChild(ogTag)
      }
      ogTag.setAttribute("content", content)
    }

    if (title) updateOGTag("og:title", title)
    if (description) updateOGTag("og:description", description)
    updateOGTag("og:url", canonical)

    // Update Twitter Card tags
    const updateTwitterTag = (name: string, content: string) => {
      let twitterTag = document.querySelector(`meta[name="${name}"]`)
      if (!twitterTag) {
        twitterTag = document.createElement("meta")
        twitterTag.setAttribute("name", name)
        document.head.appendChild(twitterTag)
      }
      twitterTag.setAttribute("content", content)
    }

    if (title) updateTwitterTag("twitter:title", title)
    if (description) updateTwitterTag("twitter:description", description)
  }, [title, description, keywords, canonicalUrl, pathname])

  return null
}
