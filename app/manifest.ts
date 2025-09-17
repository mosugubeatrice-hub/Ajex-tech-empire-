import type { MetadataRoute } from "next"

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "AJEx Tech Empire - Premium Digital Growth Agency",
    short_name: "AJEx Tech Empire",
    description:
      "Leading digital growth and web development agency specializing in innovative solutions for modern businesses.",
    start_url: "/",
    display: "standalone",
    background_color: "#0f172a",
    theme_color: "#3b82f6",
    orientation: "portrait",
    icons: [
      {
        src: "/android-chrome-192x192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/android-chrome-512x512.png",
        sizes: "512x512",
        type: "image/png",
      },
      {
        src: "/apple-touch-icon.png",
        sizes: "180x180",
        type: "image/png",
      },
    ],
    categories: ["business", "productivity", "technology"],
    lang: "en",
    dir: "ltr",
  }
}
