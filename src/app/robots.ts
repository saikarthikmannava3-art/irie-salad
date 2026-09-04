import type { MetadataRoute } from "next";

const SITE_URL = process.env.NEXT_PUBLIC_APP_URL || "https://iriekitchen.in";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/ops/",
          "/dashboard/",
          "/subscribe/customize",
          "/subscribe/basket",
          "/subscribe/plan",
          "/subscribe/address",
          "/subscribe/checkout",
          "/subscribe/success",
          "/login",
          "/signup",
          "/callback",
          "/api/",
        ],
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
