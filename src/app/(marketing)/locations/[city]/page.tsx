import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { PRODUCTS } from "@/data/products";
import { getStartingPrice } from "@/data/pricing";
import { LocalBusinessJsonLd, BreadcrumbJsonLd, FAQJsonLd } from "@/components/structured-data";
import { buildMetadata, SITE_URL } from "@/lib/seo";
import { MapPin, Truck, Clock, Leaf, Check } from "lucide-react";

const LOCATIONS: Record<
  string,
  {
    city: string;
    state: string;
    heroTitle: string;
    heroDescription: string;
    areas: string[];
    deliveryNote: string;
    faqs: { question: string; answer: string }[];
  }
> = {
  hyderabad: {
    city: "Hyderabad",
    state: "Telangana",
    heroTitle: "Fresh Indian Meals Delivered Daily in Hyderabad",
    heroDescription:
      "IRIE Kitchen delivers fresh Indian meals to your doorstep in Hyderabad. Breakfast, lunch, snacks and dinner prepared with ancient food wisdom and modern nutrition. Starting at Rs.97/meal.",
    areas: [
      "Jubilee Hills",
      "Banjara Hills",
      "Madhapur",
      "Gachibowli",
      "Kondapur",
      "Hi-Tech City",
      "Kukatpally",
      "Miyapur",
      "Begumpet",
      "Secunderabad",
      "Ameerpet",
      "Somajiguda",
    ],
    deliveryNote: "Free delivery across Hyderabad. Orders placed before 6 PM IST are delivered next morning.",
    faqs: [
      { question: "What areas in Hyderabad does IRIE Kitchen deliver to?", answer: "We deliver across Hyderabad including Jubilee Hills, Banjara Hills, Madhapur, Gachibowli, Kondapur, Hi-Tech City, Kukatpally, Begumpet, Secunderabad, and surrounding areas." },
      { question: "What time are meals delivered in Hyderabad?", answer: "Meals are delivered fresh every morning between 7 AM and 10 AM. Orders must be placed before 6 PM the previous day." },
      { question: "Is there a minimum order for delivery in Hyderabad?", answer: "No minimum order required. All subscription plans include free delivery across Hyderabad." },
      { question: "Can I change my meal daily in Hyderabad?", answer: "Yes! You can customize your meal selection daily until 6 PM the day before delivery through your dashboard." },
    ],
  },
};

interface PageProps {
  params: Promise<{ city: string }>;
}

export async function generateStaticParams() {
  return Object.keys(LOCATIONS).map((city) => ({ city }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { city } = await params;
  const location = LOCATIONS[city];
  if (!location) return {};

  return buildMetadata({
    title: `Indian Meal Delivery in ${location.city} | IRIE Kitchen | From Rs.97/meal`,
    description: location.heroDescription,
    path: `/locations/${city}`,
  });
}

export default async function LocationPage({ params }: PageProps) {
  const { city } = await params;
  const location = LOCATIONS[city];
  if (!location) notFound();

  const activeProducts = PRODUCTS.filter((p) => p.isActive);

  return (
    <>
      <LocalBusinessJsonLd name={`IRIE Kitchen ${location.city}`} city={location.city} state={location.state} />
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: SITE_URL },
          { name: "Locations", url: `${SITE_URL}/locations` },
          { name: location.city, url: `${SITE_URL}/locations/${city}` },
        ]}
      />
      <FAQJsonLd faqs={location.faqs} />

      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="mb-8 text-sm text-muted-foreground">
          <Link href="/" className="hover:text-forest">Home</Link>
          <span className="mx-2">/</span>
          <span className="text-foreground">{location.city}</span>
        </nav>

        {/* Hero */}
        <div className="text-center mb-16">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-forest/10 px-4 py-1.5 text-sm font-medium text-forest">
            <MapPin size={16} />
            Now Serving {location.city}
          </div>
          <h1 className="text-4xl font-bold text-forest sm:text-5xl">{location.heroTitle}</h1>
          <p className="mt-6 text-lg text-muted-foreground max-w-3xl mx-auto">{location.heroDescription}</p>
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/subscribe">
              <Button size="lg" className="text-base px-8">Start Your Plan</Button>
            </Link>
            <Link href="/menu">
              <Button variant="outline" size="lg" className="text-base px-8">View Menu</Button>
            </Link>
          </div>
        </div>

        {/* Key Benefits */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          <div className="rounded-xl border border-border bg-white p-6 text-center">
            <Truck size={28} className="mx-auto text-forest mb-3" />
            <h3 className="font-semibold text-foreground">Free Daily Delivery</h3>
            <p className="mt-2 text-sm text-muted-foreground">Fresh Indian meals delivered to your door daily across {location.city}</p>
          </div>
          <div className="rounded-xl border border-border bg-white p-6 text-center">
            <Clock size={28} className="mx-auto text-forest mb-3" />
            <h3 className="font-semibold text-foreground">Order Before 6 PM</h3>
            <p className="mt-2 text-sm text-muted-foreground">Place or modify your order by 6 PM for next-morning delivery</p>
          </div>
          <div className="rounded-xl border border-border bg-white p-6 text-center">
            <Leaf size={28} className="mx-auto text-forest mb-3" />
            <h3 className="font-semibold text-foreground">Farm to Fork</h3>
            <p className="mt-2 text-sm text-muted-foreground">Locally sourced ingredients, prepared fresh in our kitchen daily</p>
          </div>
        </div>

        {/* Menu in this city */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-forest text-center mb-8">Our Menu in {location.city}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {activeProducts.slice(0, 6).map((product) => {
              const price = getStartingPrice(product.slug);
              return (
                <Link key={product.id} href={`/menu/${product.slug}`} className="group">
                  <div className="rounded-xl bg-white border border-border overflow-hidden shadow-sm hover:shadow-md transition-all">
                    <div className="h-40 relative bg-muted overflow-hidden">
                      <Image
                        src={product.image}
                        alt={`${product.name} delivery in ${location.city}`}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="font-semibold text-foreground">{product.name}</h3>
                      <p className="mt-1 text-sm text-forest font-medium">From Rs.{price}/meal</p>
                      <div className="mt-2 flex flex-wrap gap-1">
                        {product.tags.slice(0, 2).map((tag) => (
                          <Badge key={tag} variant="outline" className="text-xs">{tag}</Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
          <div className="mt-8 text-center">
            <Link href="/menu">
              <Button variant="outline">View Full Menu</Button>
            </Link>
          </div>
        </div>

        {/* Delivery Areas */}
        <div className="mb-16 rounded-2xl bg-cream p-8">
          <h2 className="text-2xl font-bold text-forest mb-6">Delivery Areas in {location.city}</h2>
          <p className="text-muted-foreground mb-6">{location.deliveryNote}</p>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            {location.areas.map((area) => (
              <div key={area} className="flex items-center gap-2 text-sm">
                <Check size={14} className="text-forest shrink-0" />
                <span>{area}</span>
              </div>
            ))}
          </div>
        </div>

        {/* FAQ */}
        <div className="mb-16 max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold text-forest text-center mb-8">
            Frequently Asked Questions: {location.city}
          </h2>
          <div className="space-y-4">
            {location.faqs.map((faq) => (
              <div key={faq.question} className="rounded-lg border border-border p-5">
                <h3 className="font-semibold text-foreground">{faq.question}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center rounded-2xl bg-forest py-12 px-6">
          <h2 className="text-2xl font-bold text-white mb-3">Ready for better Indian food in {location.city}?</h2>
          <p className="text-white/70 mb-6">Join hundreds who trust IRIE Kitchen for their daily nutrition in {location.city}</p>
          <Link href="/subscribe">
            <Button size="lg" className="bg-mustard text-white hover:bg-mustard-light text-base px-8">
              Start My Subscription - From Rs.97/meal
            </Button>
          </Link>
        </div>
      </div>
    </>
  );
}
