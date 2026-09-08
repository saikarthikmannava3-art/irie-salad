import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { PRODUCTS, getProductBySlug } from "@/data/products";
import { getStartingPrice, getPrice } from "@/data/pricing";
import { getAddOnsForProduct } from "@/data/addons";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ProductJsonLd, BreadcrumbJsonLd } from "@/components/structured-data";
import { buildMetadata, SITE_URL } from "@/lib/seo";
import { Flame, Leaf, Check } from "lucide-react";
import type { ProductSlug } from "@/types/domain";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return PRODUCTS.filter((p) => p.isActive).map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug as ProductSlug);
  if (!product) return {};

  const price = getStartingPrice(product.slug);
  return buildMetadata({
    title: `${product.name} | From ₹${price} | irie kitchen`,
    description: `${product.description} ${product.nutrition.calories} cal, ${product.nutrition.proteinG}g protein. Fresh daily delivery in Hyderabad.`,
    path: `/menu/${product.slug}`,
    ogImage: `${SITE_URL}${product.image}`,
  });
}

export default async function ProductPage({ params }: PageProps) {
  const { slug } = await params;
  const product = getProductBySlug(slug as ProductSlug);
  if (!product) notFound();

  const startingPrice = getStartingPrice(product.slug);
  const addOns = getAddOnsForProduct(product.slug);

  return (
    <>
      <ProductJsonLd product={product} />
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: SITE_URL },
          { name: "Menu", url: `${SITE_URL}/menu` },
          { name: product.name, url: `${SITE_URL}/menu/${product.slug}` },
        ]}
      />

      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="mb-8 text-sm text-muted-foreground">
          <Link href="/" className="hover:text-forest">Home</Link>
          <span className="mx-2">/</span>
          <Link href="/menu" className="hover:text-forest">Menu</Link>
          <span className="mx-2">/</span>
          <span className="text-foreground">{product.name}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Image */}
          <div className="relative aspect-square rounded-2xl overflow-hidden bg-muted">
            <Image
              src={product.image}
              alt={`${product.name} | fresh Indian meal by irie kitchen`}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
              priority
            />
            {product.hasDailyMenu && (
              <div className="absolute top-4 left-4">
                <Badge variant="warning" className="text-sm">Daily Special, flavor varies</Badge>
              </div>
            )}
          </div>

          {/* Details */}
          <div>
            <p className="text-sm font-medium text-sage uppercase tracking-wider mb-2">{product.category}</p>
            <h1 className="text-3xl font-bold text-forest">{product.name}</h1>
            <p className="mt-4 text-lg text-muted-foreground leading-relaxed">{product.description}</p>

            {/* Price */}
            <div className="mt-6 p-4 rounded-xl bg-cream">
              <p className="text-sm text-muted-foreground">Starting from</p>
              <p className="text-3xl font-bold text-forest">₹{startingPrice}<span className="text-base font-normal text-muted-foreground">/meal</span></p>
              <p className="text-sm text-muted-foreground mt-1">Subscription plans from ₹187/meal</p>
            </div>

            {/* Nutrition */}
            <div className="mt-6">
              <h2 className="text-lg font-semibold text-foreground mb-3">Nutrition Facts</h2>
              <div className="grid grid-cols-3 gap-4">
                <div className="rounded-lg border border-border p-3 text-center">
                  <Flame size={18} className="mx-auto text-orange-500 mb-1" />
                  <p className="text-2xl font-bold text-foreground">{product.nutrition.calories}</p>
                  <p className="text-xs text-muted-foreground">Calories</p>
                </div>
                <div className="rounded-lg border border-border p-3 text-center">
                  <span className="block text-lg font-bold text-forest mb-1">P</span>
                  <p className="text-2xl font-bold text-foreground">{product.nutrition.proteinG}g</p>
                  <p className="text-xs text-muted-foreground">Protein</p>
                </div>
                <div className="rounded-lg border border-border p-3 text-center">
                  <Leaf size={18} className="mx-auto text-sage mb-1" />
                  <p className="text-2xl font-bold text-foreground">{product.nutrition.fiberG}g</p>
                  <p className="text-xs text-muted-foreground">Fiber</p>
                </div>
              </div>
            </div>

            {/* Variants */}
            {product.variants.length > 1 && (
              <div className="mt-6">
                <h2 className="text-lg font-semibold text-foreground mb-3">Available Options</h2>
                <div className="space-y-2">
                  {product.variants.map((v) => {
                    const variantPrice = getPrice(product.slug, v.id, "single");
                    return (
                      <div key={v.id} className="flex items-center justify-between p-3 rounded-lg border border-border">
                        <span className="font-medium">{v.label}</span>
                        {variantPrice ? <span className="text-forest font-semibold">₹{variantPrice}</span> : null}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Add-ons */}
            {addOns.length > 0 && (
              <div className="mt-6">
                <h2 className="text-lg font-semibold text-foreground mb-3">Available Add-ons</h2>
                <div className="space-y-2">
                  {addOns.map((addon) => (
                    <div key={addon.id} className="flex items-center justify-between p-3 rounded-lg bg-cream/50">
                      <span className="font-medium">{addon.name}</span>
                      <span className="text-sm text-muted-foreground">
                        {addon.isMarketPrice ? "Market Price" : `₹${addon.price}`}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Tags */}
            <div className="mt-6 flex flex-wrap gap-2">
              {product.tags.map((tag) => (
                <Badge key={tag} variant="default">{tag}</Badge>
              ))}
            </div>

            {/* CTA */}
            <div className="mt-8 flex gap-3">
              <Link href="/subscribe" className="flex-1">
                <Button size="lg" className="w-full">Subscribe Now</Button>
              </Link>
              <Link href="/menu">
                <Button size="lg" variant="outline">View Full Menu</Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Why Subscribe */}
        <div className="mt-16 rounded-2xl bg-forest/5 border border-forest/20 p-8">
          <h2 className="text-2xl font-bold text-forest mb-6">Why Subscribe?</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              "Made fresh every morning",
              "Free daily delivery",
              "Pause or skip anytime",
              "Save up to 25% with plans",
            ].map((benefit) => (
              <div key={benefit} className="flex items-start gap-2">
                <Check size={18} className="text-forest shrink-0 mt-0.5" />
                <span className="text-sm text-foreground">{benefit}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
