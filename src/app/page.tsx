import type { Metadata } from "next";
import Link from "next/link";
import { MarketingHeader } from "@/components/layout/marketing-header";
import { MarketingFooter } from "@/components/layout/marketing-footer";
import { Button } from "@/components/ui/button";
import { OrganizationJsonLd } from "@/components/structured-data";
import { Truck, Calendar, Heart, ChefHat, Zap, Snowflake, UtensilsCrossed } from "lucide-react";

export const metadata: Metadata = {
  title: "irie kitchen | Indian Food. Made Better.",
  description:
    "Fresh Indian meals, breakfast, lunch, snacks and dinner, prepared with ancient wisdom and modern nutrition. Delivered daily in Hyderabad. Starting at ₹97/meal.",
  alternates: { canonical: "https://iriekitchen.in" },
};

const STEPS = [
  { icon: Calendar, title: "Choose Your Meals", desc: "Pick meals for breakfast, lunch, snack and dinner." },
  { icon: ChefHat, title: "We Cook Fresh", desc: "Prepared daily using traditional Indian techniques." },
  { icon: Snowflake, title: "Rapid Chill & Pack", desc: "Meals chilled for freshness, packed with care." },
  { icon: Truck, title: "Delivered to You", desc: "Morning and evening deliveries. Reheat and enjoy." },
];

const PLANS_PREVIEW = [
  {
    name: "Trial",
    days: 3,
    price: 747,
    perMeal: 249,
    features: ["3 fresh meals", "Free delivery", "Full menu access"],
    popular: false,
  },
  {
    name: "12-Day Plan",
    days: 12,
    price: 2688,
    perMeal: 224,
    features: ["12 fresh meals", "Free delivery", "Pause anytime", "Custom basket"],
    popular: true,
  },
  {
    name: "24-Day Plan",
    days: 24,
    price: 4776,
    perMeal: 199,
    features: ["24 fresh meals", "Free delivery", "Pause anytime", "Custom basket", "Priority support"],
    popular: false,
  },
];

const MEAL_OCCASIONS = [
  { name: "Breakfast", from: "₹112", image: "/images/products/coconut-overnight-oats.jpg" },
  { name: "Lunch", from: "₹187", image: "/images/meal-categories/irie-lunch-thali.jpg" },
  { name: "Evening Snack", from: "₹97", image: "/images/products/tropical-smoothie-bowl.jpg" },
  { name: "Dinner", from: "₹165", image: "/images/products/irie-millet-wellness-bowl.jpg" },
];

export default function HomePage() {
  return (
    <>
      <OrganizationJsonLd />
      <MarketingHeader />
      <main className="flex-1">
        {/* Hero */}
        <section className="relative overflow-hidden bg-cream">
          <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
            <div className="mx-auto max-w-3xl text-center">
              <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-forest/10 px-4 py-1.5 text-sm font-medium text-forest">
                <UtensilsCrossed size={16} />
                Indian Food. Made Better.
              </div>
              <h1 className="text-4xl font-bold tracking-tight text-forest sm:text-5xl lg:text-6xl">
                Indian Food.{" "}
                <span className="text-mustard">Made Better.</span>
              </h1>
              <p className="mt-6 text-lg text-earth/70 leading-relaxed">
                Fresh Indian meals for breakfast, lunch, snacks and dinner. Prepared with
                ancient wisdom and modern nutrition. Delivered daily in Hyderabad.
              </p>
              <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link href="/subscribe">
                  <Button size="lg" className="text-base px-8">
                    Start My Subscription
                  </Button>
                </Link>
                <Link href="/menu">
                  <Button variant="outline" size="lg" className="text-base px-8">
                    View Menu
                  </Button>
                </Link>
              </div>
              <p className="mt-4 text-sm text-muted-foreground">
                Starting at ₹97/meal. Pause anytime.
              </p>
            </div>
          </div>
          <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-white to-transparent" />
        </section>

        {/* How It Works */}
        <section className="py-20 bg-white">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-forest">How It Works</h2>
              <p className="mt-3 text-muted-foreground">Four simple steps to better Indian food every day</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {STEPS.map((step, i) => (
                <div key={i} className="text-center">
                  <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-cream text-forest">
                    <step.icon size={28} />
                  </div>
                  <div className="mb-2 text-sm font-bold text-mustard">Step {i + 1}</div>
                  <h3 className="text-lg font-semibold text-foreground">{step.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{step.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Menu Preview */}
        <section className="py-20 bg-cream/50">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-forest">Your Complete Day, Covered</h2>
              <p className="mt-3 text-muted-foreground">Fresh Indian meals for every occasion</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {MEAL_OCCASIONS.map((occasion) => (
                <Link key={occasion.name} href="/menu" className="group">
                  <div className="rounded-xl bg-white border border-border overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                    <div className="h-40 relative bg-muted overflow-hidden">
                      <img
                        src={occasion.image}
                        alt={`${occasion.name} meals by irie kitchen`}
                        className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <div className="p-4 text-center">
                      <h3 className="font-semibold text-foreground text-lg">{occasion.name}</h3>
                      <p className="mt-1 text-sm text-forest font-medium">From {occasion.from}</p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
            <div className="mt-10 text-center">
              <Link href="/menu">
                <Button variant="outline">View Full Menu</Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Plans Preview */}
        <section className="py-20 bg-white">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-forest">Simple, Flexible Plans</h2>
              <p className="mt-3 text-muted-foreground">Choose what works for you. Pause anytime.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              {PLANS_PREVIEW.map((plan) => (
                <div
                  key={plan.name}
                  className={`rounded-xl border-2 p-6 text-center ${
                    plan.popular
                      ? "border-forest bg-forest/5 shadow-lg relative"
                      : "border-border bg-white"
                  }`}
                >
                  {plan.popular && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-mustard px-3 py-0.5 text-xs font-bold text-white">
                      Most Popular
                    </div>
                  )}
                  <h3 className="text-lg font-bold text-foreground">{plan.name}</h3>
                  <div className="mt-4">
                    <span className="text-4xl font-bold text-forest">
                      ₹{plan.price.toLocaleString()}
                    </span>
                  </div>
                  <p className="mt-1 text-sm text-muted-foreground">
                    ₹{plan.perMeal}/meal
                  </p>
                  <ul className="mt-6 space-y-2 text-left">
                    {plan.features.map((f) => (
                      <li key={f} className="flex items-center gap-2 text-sm">
                        <Heart size={14} className="text-forest shrink-0" />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-6">
                    <Link href="/subscribe">
                      <Button
                        variant={plan.popular ? "primary" : "outline"}
                        className="w-full"
                      >
                        Get Started
                      </Button>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="bg-forest py-16">
          <div className="mx-auto max-w-3xl text-center px-4">
            <Zap size={32} className="mx-auto text-mustard mb-4" />
            <h2 className="text-3xl font-bold text-white">Ready for better Indian food?</h2>
            <p className="mt-3 text-white/70">
              Join hundreds who trust irie kitchen for their daily nutrition.
            </p>
            <div className="mt-8">
              <Link href="/subscribe">
                <Button size="lg" className="bg-mustard text-white hover:bg-mustard-light text-base px-8">
                  Start My Subscription
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>
      <MarketingFooter />
    </>
  );
}
