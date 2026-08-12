import Link from "next/link";
import Image from "next/image";
import { MarketingHeader } from "@/components/layout/marketing-header";
import { MarketingFooter } from "@/components/layout/marketing-footer";
import { Button } from "@/components/ui/button";
import { Leaf, Truck, Calendar, Heart, ChefHat, Zap } from "lucide-react";

const STEPS = [
  { icon: Calendar, title: "Choose Your Plan", desc: "Pick a trial, 12, 24, or 48-day plan that fits your lifestyle." },
  { icon: ChefHat, title: "Pick Your Salads", desc: "Customize your daily meals from our chef-crafted menu." },
  { icon: Truck, title: "We Deliver Fresh", desc: "Freshly made salads delivered to your door every day." },
];

const PLANS_PREVIEW = [
  {
    name: "Trial",
    days: 3,
    price: 599,
    perMeal: 199,
    features: ["3 fresh salads", "Free delivery", "No commitment"],
    popular: false,
  },
  {
    name: "12-Day Plan",
    days: 12,
    price: 3999,
    perMeal: 333,
    features: ["12 fresh salads", "Free delivery", "Pause anytime", "Custom menu"],
    popular: true,
  },
  {
    name: "24-Day Plan",
    days: 24,
    price: 6999,
    perMeal: 291,
    features: ["24 fresh salads", "Free delivery", "Pause anytime", "Custom menu", "Priority support"],
    popular: false,
  },
];

const MENU_PREVIEW = [
  { name: "Mediterranean Power Bowl", cal: 380, tags: ["High Protein", "Keto"], image: "/images/salads/mediterranean-power-bowl.jpg" },
  { name: "Asian Sesame Crunch", cal: 320, tags: ["Vegan", "Gluten Free"], image: "/images/salads/asian-sesame-crunch.jpg" },
  { name: "Caesar Supreme", cal: 420, tags: ["Classic", "High Protein"], image: "/images/salads/caesar-supreme.jpg" },
  { name: "Tropical Mango Bliss", cal: 290, tags: ["Vegan", "Low Cal"], image: "/images/salads/tropical-mango-bliss.jpg" },
];

export default function HomePage() {
  return (
    <>
      <MarketingHeader />
      <main className="flex-1">
        {/* Hero */}
        <section className="relative overflow-hidden bg-cream">
          <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
            <div className="mx-auto max-w-3xl text-center">
              <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-forest/10 px-4 py-1.5 text-sm font-medium text-forest">
                <Leaf size={16} />
                Farm to Fork, Every Day
              </div>
              <h1 className="text-4xl font-bold tracking-tight text-forest sm:text-5xl lg:text-6xl">
                Fresh Salads,{" "}
                <span className="text-mustard">Delivered Daily</span>
              </h1>
              <p className="mt-6 text-lg text-earth/70 leading-relaxed">
                Premium subscription salads made fresh every morning in our kitchen.
                Nutrition-led, chef-crafted meals that make healthy eating effortless.
              </p>
              <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link href="/subscribe">
                  <Button size="lg" className="text-base px-8">
                    Start Your Plan
                  </Button>
                </Link>
                <Link href="/menu">
                  <Button variant="outline" size="lg" className="text-base px-8">
                    View Menu
                  </Button>
                </Link>
              </div>
              <p className="mt-4 text-sm text-muted-foreground">
                Starting at just Rs.199/meal. Cancel anytime.
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
              <p className="mt-3 text-muted-foreground">Three simple steps to a healthier you</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
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
              <h2 className="text-3xl font-bold text-forest">Chef-Crafted Menu</h2>
              <p className="mt-3 text-muted-foreground">Fresh ingredients, bold flavors, perfect nutrition</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {MENU_PREVIEW.map((item) => (
                <div key={item.name} className="rounded-xl bg-white border border-border overflow-hidden shadow-sm hover:shadow-md transition-shadow group">
                  <div className="h-40 relative bg-muted overflow-hidden">
                    <Image src={item.image} alt={item.name} fill className="object-cover group-hover:scale-105 transition-transform duration-300" sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw" />
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-foreground">{item.name}</h3>
                    <p className="mt-1 text-sm text-muted-foreground">{item.cal} cal</p>
                    <div className="mt-3 flex flex-wrap gap-1">
                      {item.tags.map((tag) => (
                        <span key={tag} className="rounded-full bg-forest/10 px-2 py-0.5 text-xs font-medium text-forest">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
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
              <p className="mt-3 text-muted-foreground">Choose what works for you. Pause or cancel anytime.</p>
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
                      Rs.{plan.price.toLocaleString()}
                    </span>
                  </div>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Rs.{plan.perMeal}/meal
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
            <h2 className="text-3xl font-bold text-white">Ready to eat healthier?</h2>
            <p className="mt-3 text-white/70">
              Join hundreds of health-conscious people who trust Irie Salad for their daily nutrition.
            </p>
            <div className="mt-8">
              <Link href="/subscribe">
                <Button size="lg" className="bg-mustard text-white hover:bg-mustard-light text-base px-8">
                  Start Your Free Trial
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
