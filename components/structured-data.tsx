import Script from "next/script"

interface StructuredDataProps {
  type: "organization" | "website" | "article" | "service" | "breadcrumb"
  data: any
}

export function StructuredData({ type, data }: StructuredDataProps) {
  const generateSchema = () => {
    switch (type) {
      case "organization":
        return {
          "@context": "https://schema.org",
          "@type": "Organization",
          name: "AJEx Tech Empire",
          description:
            "Leading digital growth and web development agency specializing in innovative solutions for modern businesses.",
          url: "https://ajextechempire.com",
          logo: "https://ajextechempire.com/logo.png",
          contactPoint: {
            "@type": "ContactPoint",
            telephone: "+1-555-123-4567",
            contactType: "customer service",
            availableLanguage: "English",
          },
          address: {
            "@type": "PostalAddress",
            streetAddress: "123 Innovation Drive",
            addressLocality: "San Francisco",
            addressRegion: "CA",
            postalCode: "94105",
            addressCountry: "US",
          },
          sameAs: [
            "https://twitter.com/ajextechempire",
            "https://linkedin.com/company/ajextechempire",
            "https://facebook.com/ajextechempire",
          ],
          foundingDate: "2020",
          numberOfEmployees: "25-50",
          industry: "Digital Growth, Web Development",
          ...data,
        }

      case "website":
        return {
          "@context": "https://schema.org",
          "@type": "WebSite",
          name: "AJEx Tech Empire",
          description: "Leading digital marketing and web development agency",
          url: "https://ajextechempire.com",
          potentialAction: {
            "@type": "SearchAction",
            target: "https://ajextechempire.com/search?q={search_term_string}",
            "query-input": "required name=search_term_string",
          },
          ...data,
        }

      case "article":
        return {
          "@context": "https://schema.org",
          "@type": "Article",
          headline: data.title,
          description: data.description,
          image: data.image,
          author: {
            "@type": "Person",
            name: data.author,
          },
          publisher: {
            "@type": "Organization",
            name: "AJEx Tech Empire",
            logo: {
              "@type": "ImageObject",
              url: "https://ajextechempire.com/logo.png",
            },
          },
          datePublished: data.datePublished,
          dateModified: data.dateModified || data.datePublished,
          mainEntityOfPage: {
            "@type": "WebPage",
            "@id": data.url,
          },
          ...data,
        }

      case "service":
        return {
          "@context": "https://schema.org",
          "@type": "Service",
          name: data.name,
          description: data.description,
          provider: {
            "@type": "Organization",
            name: "AJEx Tech Empire",
          },
          areaServed: "Worldwide",
          serviceType: data.serviceType,
          offers: {
            "@type": "Offer",
            availability: "https://schema.org/InStock",
            priceCurrency: "USD",
            price: data.price || "Contact for pricing",
          },
          ...data,
        }

      case "breadcrumb":
        return {
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: data.map((item: any, index: number) => ({
            "@type": "ListItem",
            position: index + 1,
            name: item.name,
            item: item.url,
          })),
        }

      default:
        return data
    }
  }

  return (
    <Script
      id={`structured-data-${type}`}
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(generateSchema()),
      }}
    />
  )
}
