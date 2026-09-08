import type { Product } from "@/types/domain";
import { getStartingPrice } from "@/data/pricing";

const SITE_URL = process.env.NEXT_PUBLIC_APP_URL || "https://iriekitchen.in";

interface JsonLdProps {
  data: Record<string, unknown>;
}

export function JsonLd({ data }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export function OrganizationJsonLd() {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "Organization",
        name: "irie kitchen",
        url: SITE_URL,
        logo: `${SITE_URL}/images/logo.png`,
        description:
          "Pure-vegetarian Indian food company delivering fresh meals daily in Hyderabad. Breakfast, lunch, snacks and dinner. Ancient food wisdom, modern kitchen.",
        contactPoint: {
          "@type": "ContactPoint",
          contactType: "customer service",
          availableLanguage: ["English", "Hindi"],
        },
        sameAs: [],
        areaServed: [
          { "@type": "City", name: "Hyderabad", addressCountry: "IN" },
        ],
      }}
    />
  );
}

export function LocalBusinessJsonLd(location: {
  name: string;
  city: string;
  state: string;
  postalCode?: string;
  streetAddress?: string;
  latitude?: number;
  longitude?: number;
}) {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "FoodEstablishment",
        "@id": `${SITE_URL}/#${location.city.toLowerCase()}`,
        name: `irie kitchen ${location.city}`,
        url: `${SITE_URL}/locations/${location.city.toLowerCase()}`,
        image: `${SITE_URL}/images/logo.png`,
        description: `Fresh Indian meals delivered daily in ${location.city}. Breakfast, lunch, snacks & dinner prepared with ancient food wisdom. Starting at ₹97/meal.`,
        address: {
          "@type": "PostalAddress",
          addressLocality: location.city,
          addressRegion: location.state,
          addressCountry: "IN",
          ...(location.postalCode && { postalCode: location.postalCode }),
          ...(location.streetAddress && { streetAddress: location.streetAddress }),
        },
        ...(location.latitude &&
          location.longitude && {
            geo: {
              "@type": "GeoCoordinates",
              latitude: location.latitude,
              longitude: location.longitude,
            },
          }),
        servesCuisine: ["Indian", "Vegetarian", "Healthy"],
        priceRange: "₹97 - ₹310",
        openingHoursSpecification: {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
          opens: "07:00",
          closes: "18:00",
        },
      }}
    />
  );
}

export function ProductJsonLd({ product }: { product: Product }) {
  const price = getStartingPrice(product.slug);
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "Product",
        name: product.name,
        description: product.description,
        image: `${SITE_URL}${product.image}`,
        url: `${SITE_URL}/menu/${product.slug}`,
        brand: { "@type": "Brand", name: "irie kitchen" },
        offers: {
          "@type": "Offer",
          priceCurrency: "INR",
          price: price.toString(),
          priceValidUntil: "2027-12-31",
          availability: "https://schema.org/InStock",
          url: `${SITE_URL}/subscribe`,
        },
        nutrition: {
          "@type": "NutritionInformation",
          calories: `${product.nutrition.calories} cal`,
          proteinContent: `${product.nutrition.proteinG}g`,
          fiberContent: `${product.nutrition.fiberG}g`,
        },
        category: product.category,
      }}
    />
  );
}

export function BreadcrumbJsonLd({ items }: { items: { name: string; url: string }[] }) {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: items.map((item, i) => ({
          "@type": "ListItem",
          position: i + 1,
          name: item.name,
          item: item.url,
        })),
      }}
    />
  );
}

export function FAQJsonLd({ faqs }: { faqs: { question: string; answer: string }[] }) {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: faqs.map((faq) => ({
          "@type": "Question",
          name: faq.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: faq.answer,
          },
        })),
      }}
    />
  );
}
