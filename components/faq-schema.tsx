import { StructuredData } from "./structured-data"

export function FAQSchema() {
  const faqData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "What services does AJEx Tech Empire offer?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "We offer comprehensive digital marketing services including web development, mobile app development, SEO, PPC advertising, social media marketing, brand design, and digital strategy consulting.",
        },
      },
      {
        "@type": "Question",
        name: "How long does it take to build a website?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Website development timelines vary based on complexity. A basic website typically takes 2-4 weeks, while complex e-commerce or custom applications can take 8-16 weeks. We provide detailed timelines during our consultation process.",
        },
      },
      {
        "@type": "Question",
        name: "Do you offer ongoing support and maintenance?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes, we offer comprehensive support and maintenance packages including security updates, content updates, performance monitoring, and technical support to ensure your digital assets continue to perform optimally.",
        },
      },
      {
        "@type": "Question",
        name: "What is your pricing structure?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Our pricing is project-based and depends on scope, complexity, and timeline. We offer transparent pricing with detailed proposals. Contact us for a free consultation and custom quote tailored to your specific needs.",
        },
      },
      {
        "@type": "Question",
        name: "Do you work with businesses of all sizes?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes, we work with startups, small businesses, and enterprise clients. Our scalable solutions and flexible approach allow us to deliver value regardless of company size or industry.",
        },
      },
    ],
  }

  return <StructuredData type="website" data={faqData} />
}
