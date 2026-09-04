import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { GoogleTagManager, GoogleTagManagerNoscript } from "@/components/analytics/gtm";
import { GoogleAnalytics } from "@/components/analytics/ga4";
import "./globals.css";

const SITE_URL = process.env.NEXT_PUBLIC_APP_URL || "https://iriekitchen.in";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "IRIE Kitchen | Indian Food. Made Better.",
    template: "%s | IRIE Kitchen",
  },
  description:
    "Fresh Indian meals, breakfast, lunch, snacks and dinner, prepared with ancient wisdom and modern nutrition. Delivered daily in Hyderabad. Starting at Rs.97/meal.",
  keywords: [
    "Indian food delivery",
    "Indian meal subscription",
    "vegetarian meal delivery",
    "healthy Indian food Hyderabad",
    "healthy meal subscription Hyderabad",
    "daily Indian meal delivery",
    "tiffin service",
    "home style Indian food",
    "fresh Indian meals",
    "pure vegetarian meals",
  ],
  authors: [{ name: "IRIE Kitchen" }],
  creator: "IRIE Kitchen",
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: SITE_URL,
    siteName: "IRIE Kitchen",
    title: "IRIE Kitchen | Indian Food. Made Better.",
    description:
      "Fresh Indian meals prepared daily with ancient food wisdom and modern nutrition. Breakfast, lunch, snacks and dinner delivered to your door in Hyderabad.",
    images: [
      {
        url: `/images/og-default.jpg`,
        width: 1200,
        height: 630,
        alt: "IRIE Kitchen | Indian Food. Made Better.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "IRIE Kitchen | Indian Food. Made Better.",
    description: "Fresh Indian meals prepared daily in Hyderabad. Starting at Rs.97/meal.",
  },
  alternates: {
    canonical: SITE_URL,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        <GoogleTagManager />
        <GoogleAnalytics />
      </head>
      <body className="min-h-full flex flex-col">
        <GoogleTagManagerNoscript />
        {children}
      </body>
    </html>
  );
}
