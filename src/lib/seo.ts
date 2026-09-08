import type { Metadata } from "next";

const SITE_URL = process.env.NEXT_PUBLIC_APP_URL || "https://iriekitchen.in";
const SITE_NAME = "irie kitchen";
const DEFAULT_DESCRIPTION =
  "Fresh Indian meals, breakfast, lunch, snacks and dinner, prepared with ancient wisdom and modern nutrition. Delivered daily in Hyderabad. Starting at ₹97/meal.";

export function buildMetadata(options: {
  title: string;
  description?: string;
  path?: string;
  noIndex?: boolean;
  ogImage?: string;
  type?: "website" | "article";
}): Metadata {
  const { title, description = DEFAULT_DESCRIPTION, path = "", noIndex = false, ogImage, type = "website" } = options;
  const url = `${SITE_URL}${path}`;

  return {
    title,
    description,
    ...(noIndex && { robots: { index: false, follow: false } }),
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      siteName: SITE_NAME,
      locale: "en_IN",
      type,
      ...(ogImage && { images: [{ url: ogImage, width: 1200, height: 630, alt: title }] }),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      ...(ogImage && { images: [ogImage] }),
    },
  };
}

export { SITE_URL, SITE_NAME, DEFAULT_DESCRIPTION };
