import { StructuredData } from "./structured-data"

export function LocalBusinessSchema() {
  const localBusinessData = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: "AJEx Tech Empire",
    description:
      "Leading digital marketing and web development agency specializing in innovative solutions for modern businesses.",
    url: "https://ajextechempire.com",
    telephone: "+1-555-123-4567",
    email: "hello@ajextechempire.com",
    address: {
      "@type": "PostalAddress",
      streetAddress: "123 Innovation Drive",
      addressLocality: "San Francisco",
      addressRegion: "CA",
      postalCode: "94105",
      addressCountry: "US",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: "37.7749",
      longitude: "-122.4194",
    },
    openingHours: ["Mo-Fr 09:00-18:00"],
    priceRange: "$$",
    image: "https://ajextechempire.com/office-image.jpg",
    logo: "https://ajextechempire.com/logo.png",
    foundingDate: "2020",
    founder: {
      "@type": "Person",
      name: "Alex Johnson",
    },
    numberOfEmployees: "25-50",
    areaServed: [
      {
        "@type": "Country",
        name: "United States",
      },
      {
        "@type": "Country",
        name: "Canada",
      },
      "Worldwide",
    ],
    serviceArea: {
      "@type": "GeoCircle",
      geoMidpoint: {
        "@type": "GeoCoordinates",
        latitude: "37.7749",
        longitude: "-122.4194",
      },
      geoRadius: "50000",
    },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Digital Services",
      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Web Development",
            description: "Custom website development and web applications",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Growth Strategy",
            description: "SEO, PPC, social media marketing, and content marketing",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Brand Design",
            description: "Logo design, brand identity, and visual design services",
          },
        },
      ],
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.9",
      reviewCount: "127",
      bestRating: "5",
      worstRating: "1",
    },
    review: [
      {
        "@type": "Review",
        author: {
          "@type": "Person",
          name: "Sarah Mitchell",
        },
        reviewRating: {
          "@type": "Rating",
          ratingValue: "5",
          bestRating: "5",
        },
        reviewBody:
          "AJEx Tech Empire transformed our online presence completely. Their team is professional, creative, and delivers exceptional results.",
      },
    ],
    sameAs: [
      "https://twitter.com/ajextechempire",
      "https://linkedin.com/company/ajextechempire",
      "https://facebook.com/ajextechempire",
      "https://instagram.com/ajextechempire",
    ],
  }

  return <StructuredData type="organization" data={localBusinessData} />
}
