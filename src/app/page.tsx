import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { MarketingHeader } from "@/components/layout/marketing-header";
import { MarketingFooter } from "@/components/layout/marketing-footer";
import { Button } from "@/components/ui/button";
import { OrganizationJsonLd } from "@/components/structured-data";
import { Droplets, Flame, Leaf, Scale, Timer, Truck, Snowflake, ChefHat, Sun, Moon } from "lucide-react";

export const metadata: Metadata = {
  title: "irie kitchen | Indian Food. Made Better.",
  description:
    "Fresh Indian meals for breakfast, lunch, snacks and dinner. Prepared with traditional techniques, minimal oil, no deep frying. Delivered daily in Hyderabad.",
  alternates: { canonical: "https://iriekitchen.in" },
};

const MEAL_OCCASIONS = [
  {
    name: "Breakfast",
    desc: "Pesarattu, idli, dosa, pongal, upma and more",
    from: "₹112",
    image: "/images/recipes/pesarattu.jpg",
    window: "Morning delivery",
  },
  {
    name: "Lunch",
    desc: "Dal, rice, millets, biryani, roti, paneer, tofu",
    from: "₹187",
    image: "/images/recipes/veg-biryani.jpg",
    window: "Morning delivery",
  },
  {
    name: "Evening Snack",
    desc: "Sundal, sprouts, chaat, makhana, tikkis",
    from: "₹97",
    image: "/images/recipes/sprout-chaat.jpg",
    window: "Evening delivery",
  },
  {
    name: "Dinner",
    desc: "Khichdi, dal, millet meals, paneer, roti",
    from: "₹165",
    image: "/images/recipes/light-khichdi.jpg",
    window: "Evening delivery",
  },
];

const SAMPLE_DAILY_MENU = {
  day: "Today's menu",
  morning: [
    { occasion: "Breakfast", meal: "Pesarattu with Ginger Chutney" },
    { occasion: "Lunch", meal: "Hyderabadi Veg Dum Biryani + Raita" },
  ],
  evening: [
    { occasion: "Evening Snack", meal: "Sprouted Moong Chaat" },
    { occasion: "Dinner", meal: "Millet Khichdi + Seasonal Sabzi" },
  ],
};

const WHY_BETTER = [
  { icon: Droplets, title: "Minimal oil", desc: "Just enough for flavour. Never excess." },
  { icon: Flame, title: "No deep frying", desc: "Baked, steamed, grilled or lightly sauteed." },
  { icon: Leaf, title: "Fresh ingredients", desc: "Sourced daily. Prepared the same day." },
  { icon: Scale, title: "Balanced portions", desc: "Right amount of protein, fibre and carbs." },
  { icon: ChefHat, title: "Traditional techniques", desc: "Tempering, slow cooking, stone grinding." },
];

const KITCHEN_PROCESS = [
  { icon: Leaf, label: "Fresh ingredients", desc: "Sourced daily from trusted suppliers" },
  { icon: ChefHat, label: "Cooked with care", desc: "Traditional Indian techniques, standardised recipes" },
  { icon: Snowflake, label: "Rapid chilled", desc: "Chilled immediately for safety and freshness" },
  { icon: Truck, label: "Delivered to you", desc: "Cold-chain delivery, morning and evening" },
];

const PLANS_PREVIEW = [
  { name: "12-Day", price: 2688, perMeal: 224, discount: 10, popular: true },
  { name: "24-Day", price: 4776, perMeal: 199, discount: 20, popular: false },
  { name: "48-Day", price: 8976, perMeal: 187, discount: 25, popular: false },
];

export default function HomePage() {
  return (
    <>
      <OrganizationJsonLd />
      <MarketingHeader />
      <main className="flex-1">
        {/* Hero — food-first */}
        <section className="relative overflow-hidden bg-cream">
          <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <p className="text-sm font-medium tracking-wide text-terracotta uppercase mb-4">
                  Freshly prepared in Hyderabad
                </p>
                <h1 className="text-4xl font-bold tracking-tight text-forest sm:text-5xl lg:text-6xl leading-tight">
                  Indian Food.{" "}
                  <span className="text-turmeric">Made Better.</span>
                </h1>
                <p className="mt-6 text-lg text-earth-light leading-relaxed max-w-lg">
                  Familiar Indian meals for breakfast, lunch, snacks and dinner.
                  Less oil, no deep frying, balanced portions. Delivered to your
                  door every morning and evening.
                </p>
                <div className="mt-8 flex flex-col sm:flex-row gap-4">
                  <Link href="/menu">
                    <Button size="lg" className="text-base px-8 w-full sm:w-auto">
                      Explore the menu
                    </Button>
                  </Link>
                  <Link href="/plans">
                    <Button variant="outline" size="lg" className="text-base px-8 w-full sm:w-auto">
                      See plans
                    </Button>
                  </Link>
                </div>
                <p className="mt-4 text-sm text-muted-foreground">
                  Morning and evening delivery across Hyderabad
                </p>
              </div>
              {/* Hero food grid */}
              <div className="grid grid-cols-2 gap-3">
                <div className="rounded-2xl overflow-hidden aspect-square relative shadow-lg">
                  <Image
                    src="/images/recipes/pesarattu.jpg"
                    alt="Pesarattu breakfast by irie kitchen"
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 45vw, 25vw"
                    priority
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-3">
                    <span className="text-white text-xs font-medium">Breakfast</span>
                  </div>
                </div>
                <div className="rounded-2xl overflow-hidden aspect-square relative shadow-lg mt-8">
                  <Image
                    src="/images/recipes/veg-biryani.jpg"
                    alt="Hyderabadi Veg Biryani by irie kitchen"
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 45vw, 25vw"
                    priority
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-3">
                    <span className="text-white text-xs font-medium">Lunch</span>
                  </div>
                </div>
                <div className="rounded-2xl overflow-hidden aspect-square relative shadow-lg -mt-4">
                  <Image
                    src="/images/recipes/sprout-chaat.jpg"
                    alt="Sprouted Moong Chaat by irie kitchen"
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 45vw, 25vw"
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-3">
                    <span className="text-white text-xs font-medium">Evening Snack</span>
                  </div>
                </div>
                <div className="rounded-2xl overflow-hidden aspect-square relative shadow-lg mt-4">
                  <Image
                    src="/images/recipes/light-khichdi.jpg"
                    alt="Millet Khichdi dinner by irie kitchen"
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 45vw, 25vw"
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-3">
                    <span className="text-white text-xs font-medium">Dinner</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Daily Menu — makes the site feel alive */}
        <section className="py-16 bg-white">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-forest">What's cooking today</h2>
              <p className="mt-2 text-muted-foreground">Fresh menu, every day. Here's a taste.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
              {/* Morning */}
              <div className="rounded-2xl border border-border bg-cream-light p-6">
                <div className="flex items-center gap-2 mb-4">
                  <Sun size={20} className="text-turmeric" />
                  <h3 className="font-semibold text-forest">Morning delivery</h3>
                  <span className="text-xs text-muted-foreground ml-auto">6:30 - 8:30 AM</span>
                </div>
                <div className="space-y-3">
                  {SAMPLE_DAILY_MENU.morning.map((item) => (
                    <div key={item.occasion} className="flex items-start gap-3 bg-white rounded-xl p-3">
                      <span className="text-xs font-medium text-terracotta uppercase tracking-wide min-w-[70px] pt-0.5">
                        {item.occasion}
                      </span>
                      <span className="text-sm text-foreground font-medium">{item.meal}</span>
                    </div>
                  ))}
                </div>
              </div>
              {/* Evening */}
              <div className="rounded-2xl border border-border bg-cream-light p-6">
                <div className="flex items-center gap-2 mb-4">
                  <Moon size={20} className="text-sage" />
                  <h3 className="font-semibold text-forest">Evening delivery</h3>
                  <span className="text-xs text-muted-foreground ml-auto">4:30 - 6:30 PM</span>
                </div>
                <div className="space-y-3">
                  {SAMPLE_DAILY_MENU.evening.map((item) => (
                    <div key={item.occasion} className="flex items-start gap-3 bg-white rounded-xl p-3">
                      <span className="text-xs font-medium text-terracotta uppercase tracking-wide min-w-[70px] pt-0.5">
                        {item.occasion}
                      </span>
                      <span className="text-sm text-foreground font-medium">{item.meal}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="mt-8 text-center">
              <Link href="/menu">
                <Button variant="outline">Explore full menu</Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Four Occasions */}
        <section className="py-16 bg-cream-light">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-forest">Your complete day, covered</h2>
              <p className="mt-2 text-muted-foreground">Fresh Indian meals for every eating occasion</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {MEAL_OCCASIONS.map((occasion) => (
                <Link key={occasion.name} href="/menu" className="group">
                  <div className="rounded-2xl bg-white border border-border overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300">
                    <div className="h-48 relative overflow-hidden">
                      <Image
                        src={occasion.image}
                        alt={`${occasion.name} meals by irie kitchen`}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      />
                      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent p-4">
                        <h3 className="font-bold text-white text-lg">{occasion.name}</h3>
                        <p className="text-white/80 text-xs mt-0.5">{occasion.window}</p>
                      </div>
                    </div>
                    <div className="p-4">
                      <p className="text-sm text-muted-foreground">{occasion.desc}</p>
                      <p className="mt-2 text-sm font-semibold text-forest">From {occasion.from}/meal</p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Why our food is better */}
        <section className="py-16 bg-white">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-forest">What makes our food better</h2>
              <p className="mt-2 text-muted-foreground max-w-lg mx-auto">
                Indian food is already one of the richest cuisines in the world.
                It just needs a lighter touch.
              </p>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6">
              {WHY_BETTER.map((item) => (
                <div key={item.title} className="text-center group">
                  <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-2xl bg-cream text-forest group-hover:bg-forest group-hover:text-cream transition-colors duration-300">
                    <item.icon size={24} />
                  </div>
                  <h3 className="font-semibold text-foreground text-sm">{item.title}</h3>
                  <p className="mt-1 text-xs text-muted-foreground">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* From our kitchen — process */}
        <section className="py-16 bg-forest">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-white">From our kitchen to your door</h2>
              <p className="mt-2 text-white/60">
                Cook. Rapid chill. Pack. Cold-chain deliver. Reheat. Enjoy.
              </p>
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
              {KITCHEN_PROCESS.map((step, i) => (
                <div key={step.label} className="text-center">
                  <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-2xl bg-white/10 text-turmeric">
                    <step.icon size={24} />
                  </div>
                  <div className="text-xs font-bold text-turmeric mb-1">Step {i + 1}</div>
                  <h3 className="font-semibold text-white text-sm">{step.label}</h3>
                  <p className="mt-1 text-xs text-white/50">{step.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Delivery windows */}
        <section className="py-16 bg-cream-light">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-forest">Two deliveries, every day</h2>
              <p className="mt-2 text-muted-foreground">Customize your meals before the cutoff. We handle the rest.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
              <div className="rounded-2xl bg-white border border-border p-6 text-center">
                <Sun size={28} className="mx-auto text-turmeric mb-3" />
                <h3 className="font-bold text-forest text-lg">Morning delivery</h3>
                <p className="mt-1 text-sm text-muted-foreground">Breakfast + Lunch</p>
                <p className="mt-3 text-sm text-foreground">6:30 - 8:30 AM</p>
                <div className="mt-3 inline-flex items-center rounded-full bg-cream px-3 py-1 text-xs font-medium text-forest">
                  Cutoff: 6 PM previous day
                </div>
              </div>
              <div className="rounded-2xl bg-white border border-border p-6 text-center">
                <Moon size={28} className="mx-auto text-sage mb-3" />
                <h3 className="font-bold text-forest text-lg">Evening delivery</h3>
                <p className="mt-1 text-sm text-muted-foreground">Evening Snack + Dinner</p>
                <p className="mt-3 text-sm text-foreground">4:30 - 6:30 PM</p>
                <div className="mt-3 inline-flex items-center rounded-full bg-cream px-3 py-1 text-xs font-medium text-forest">
                  Cutoff: 10 AM same day
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Plans */}
        <section className="py-16 bg-white">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-forest">Eat better every day</h2>
              <p className="mt-2 text-muted-foreground">Choose what works for you. Pause anytime.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto">
              {PLANS_PREVIEW.map((plan) => (
                <div
                  key={plan.name}
                  className={`rounded-2xl border-2 p-6 text-center transition-shadow ${
                    plan.popular
                      ? "border-forest bg-forest/5 shadow-lg relative"
                      : "border-border bg-white hover:shadow-md"
                  }`}
                >
                  {plan.popular && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-turmeric px-3 py-0.5 text-xs font-bold text-white">
                      Most Popular
                    </div>
                  )}
                  <h3 className="text-lg font-bold text-foreground">{plan.name}</h3>
                  <div className="mt-4">
                    <span className="text-3xl font-bold text-forest">
                      ₹{plan.price.toLocaleString()}
                    </span>
                  </div>
                  <p className="mt-1 text-sm text-muted-foreground">₹{plan.perMeal}/meal</p>
                  {plan.discount > 0 && (
                    <p className="mt-1 text-xs font-medium text-success">Save {plan.discount}%</p>
                  )}
                  <div className="mt-6">
                    <Link href="/subscribe">
                      <Button
                        variant={plan.popular ? "primary" : "outline"}
                        className="w-full"
                      >
                        Get started
                      </Button>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-8 text-center">
              <Link href="/plans" className="text-sm text-forest font-medium hover:underline">
                See all plans and pricing
              </Link>
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="bg-cream py-16">
          <div className="mx-auto max-w-3xl text-center px-4">
            <h2 className="text-3xl font-bold text-forest">
              Ready to eat better?
            </h2>
            <p className="mt-3 text-earth-light">
              Indian food you genuinely want to eat. Prepared in a better way.
              Delivered to your door in Hyderabad.
            </p>
            <div className="mt-8">
              <Link href="/subscribe">
                <Button size="lg" className="text-base px-8">
                  Start your plan
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
