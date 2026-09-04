import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Calendar, ChefHat, Snowflake, Truck, Clock, Thermometer, UtensilsCrossed } from "lucide-react";

export const metadata: Metadata = {
  title: "How It Works | IRIE Kitchen Chilled Meal Delivery",
  description:
    "Learn how IRIE Kitchen works: choose your meals, we cook fresh using traditional Indian techniques, rapid chill for safety, and deliver to your door. Two daily deliveries in Hyderabad.",
  alternates: { canonical: "https://iriekitchen.in/how-it-works" },
};

const STEPS = [
  {
    icon: Calendar,
    title: "Choose Your Meals",
    desc: "Choose meals for each occasion: breakfast, lunch, evening snack, dinner. Mix and match from our daily-rotating menu. Customize portions and add extras.",
  },
  {
    icon: ChefHat,
    title: "We Cook Fresh",
    desc: "Our kitchen team prepares every meal using traditional Indian techniques: steaming, roasting, fermenting, slow cooking. Fresh ingredients, minimal oil, no deep frying.",
  },
  {
    icon: Snowflake,
    title: "Rapid Chill",
    desc: "Immediately after cooking, meals are rapidly chilled to safe temperatures. This locks in freshness, flavor, and nutrition while ensuring food safety.",
  },
  {
    icon: Truck,
    title: "Cold-Chain Delivery",
    desc: "Meals travel in insulated, temperature-controlled packaging. Our delivery partners ensure the cold chain is maintained from our kitchen to your doorstep.",
  },
  {
    icon: UtensilsCrossed,
    title: "Reheat & Enjoy",
    desc: "Simple reheat instructions on every package. A few minutes on the stove or in the microwave, and you have a fresh, home-style Indian meal ready to eat.",
  },
];

export default function HowItWorksPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      {/* Hero */}
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold text-forest sm:text-5xl">How IRIE Kitchen Works</h1>
        <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
          From our kitchen to your table. A step-by-step look at how we deliver
          better Indian food every day.
        </p>
      </div>

      {/* Steps */}
      <div className="max-w-3xl mx-auto mb-20">
        <div className="space-y-8">
          {STEPS.map((step, i) => (
            <div key={i} className="flex gap-6">
              <div className="shrink-0">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-cream text-forest">
                  <step.icon size={26} />
                </div>
                <div className="mt-1 text-center text-xs font-bold text-mustard">Step {i + 1}</div>
              </div>
              <div className="pt-1">
                <h3 className="text-lg font-semibold text-foreground">{step.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Two Daily Deliveries */}
      <div className="mb-20 max-w-4xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-2xl font-bold text-forest">Two Daily Deliveries</h2>
          <p className="mt-3 text-muted-foreground">
            We deliver twice a day so your meals are always fresh.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="rounded-xl border border-border bg-white p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-mustard/10 text-mustard">
                <Clock size={20} />
              </div>
              <h3 className="text-lg font-semibold text-foreground">Morning Delivery</h3>
            </div>
            <p className="text-sm text-muted-foreground mb-3">
              Delivered between 6:30 AM and 8:30 AM
            </p>
            <ul className="space-y-2 text-sm text-foreground/80">
              <li className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-forest shrink-0" />
                Breakfast meals
              </li>
              <li className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-forest shrink-0" />
                Lunch meals
              </li>
            </ul>
          </div>
          <div className="rounded-xl border border-border bg-white p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-mustard/10 text-mustard">
                <Clock size={20} />
              </div>
              <h3 className="text-lg font-semibold text-foreground">Evening Delivery</h3>
            </div>
            <p className="text-sm text-muted-foreground mb-3">
              Delivered between 4:30 PM and 6:30 PM
            </p>
            <ul className="space-y-2 text-sm text-foreground/80">
              <li className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-forest shrink-0" />
                Evening snacks
              </li>
              <li className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-forest shrink-0" />
                Dinner meals
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Cutoff Times */}
      <div className="mb-20 max-w-3xl mx-auto">
        <div className="rounded-2xl bg-cream p-8 md:p-12">
          <h2 className="text-2xl font-bold text-forest mb-6">Our Cutoff Times</h2>
          <div className="space-y-4">
            <div className="flex items-start gap-4 p-4 rounded-lg bg-white">
              <Clock size={20} className="text-forest shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-foreground">Morning Delivery Cutoff: 6:00 PM (previous day)</p>
                <p className="text-sm text-muted-foreground mt-1">
                  Place or modify your breakfast and lunch orders by 6 PM the evening before.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4 p-4 rounded-lg bg-white">
              <Clock size={20} className="text-forest shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-foreground">Evening Delivery Cutoff: 10:00 AM (same day)</p>
                <p className="text-sm text-muted-foreground mt-1">
                  Place or modify your snack and dinner orders by 10 AM the same day.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Storage & Reheating */}
      <div className="mb-20 max-w-3xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-2xl font-bold text-forest">Storage & Reheating</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="rounded-xl border border-border bg-white p-6 text-center">
            <Thermometer size={28} className="mx-auto text-forest mb-3" />
            <h3 className="font-semibold text-foreground mb-2">Refrigerate on Receipt</h3>
            <p className="text-sm text-muted-foreground">
              Place meals in the refrigerator as soon as they arrive.
            </p>
          </div>
          <div className="rounded-xl border border-border bg-white p-6 text-center">
            <Clock size={28} className="mx-auto text-forest mb-3" />
            <h3 className="font-semibold text-foreground mb-2">Consume Within 24 Hours</h3>
            <p className="text-sm text-muted-foreground">
              For best taste and safety, consume within 24 hours of delivery.
            </p>
          </div>
          <div className="rounded-xl border border-border bg-white p-6 text-center">
            <UtensilsCrossed size={28} className="mx-auto text-forest mb-3" />
            <h3 className="font-semibold text-foreground mb-2">Reheat & Enjoy</h3>
            <p className="text-sm text-muted-foreground">
              Follow the instructions on each package. Stove or microwave, 2-3 minutes.
            </p>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="text-center rounded-2xl bg-forest py-12 px-6">
        <h2 className="text-2xl font-bold text-white mb-3">Ready for better Indian food?</h2>
        <p className="text-white/70 mb-6">Fresh Indian meals, delivered daily. Start with a 3-day trial.</p>
        <Link href="/subscribe">
          <Button size="lg" className="bg-mustard text-white hover:bg-mustard-light text-base px-8">
            Start My Subscription
          </Button>
        </Link>
      </div>
    </div>
  );
}
