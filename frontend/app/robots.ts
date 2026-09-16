import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/", "/admin/"],
    },
    sitemap: "https://glidecn.vercel.app/sitemap.xml",
    host: "https://glidecn.vercel.app",
  };
}