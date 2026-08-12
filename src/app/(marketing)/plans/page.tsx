import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Check, Star } from "lucide-react";

const PLANS = [
  {
    name: "Trial",
    slug: "trial",
    days: 3,
    price: 599,
    perMeal: 199,
    discount: 0,
    description: "Perfect to try before you commit",
    features: [
      "3 fresh salads",
      "Free delivery",
      "Choose from full menu",
      "No commitment required",
    ],
    popular: false,
    cta: "Try Now",
  },
  {
    name: "12-Day Plan",
    slug: "12-day",
    days: 12,
    price: 3999,
    perMeal: 333,
    discount: 5,
    description: "Great for building the salad habit",
    features: [
      "12 fresh salads",
      "Free delivery",
      "Customize daily menu",
      "Pause anytime",
      "Skip individual days",
      "5% savings",
    ],
    popular: true,
    cta: "Get Started",
  },
  {
    name: "24-Day Plan",
    slug: "24-day",
    days: 24,
    price: 6999,
    perMeal: 291,
    discount: 17,
    description: "Best value for committed healthy eaters",
    features: [
      "24 fresh salads",
      "Free delivery",
      "Customize daily menu",
      "Pause anytime",
      "Skip individual days",
      "Priority support",
      "17% savings",
      "Vacation mode",
    ],
    popular: false,
    cta: "Get Started",
  },
  {
    name: "48-Day Plan",
    slug: "48-day",
    days: 48,
    price: 11999,
    perMeal: 249,
    discount: 29,
    description: "Maximum savings for the long haul",
    features: [
      "48 fresh salads",
      "Free delivery",
      "Customize daily menu",
      "Pause anytime",
      "Skip individual days",
      "Priority support",
      "29% savings",
      "Vacation mode",
      "Exclusive menu items",
    ],
    popular: false,
    cta: "Get Started",
  },
];

export default function PlansPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold text-forest">Choose Your Plan</h1>
        <p className="mt-3 text-lg text-muted-foreground">
          Flexible plans that fit your lifestyle. Pause or cancel anytime.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {PLANS.map((plan) => (
          <div
            key={plan.slug}
            className={`rounded-xl border-2 p-6 flex flex-col ${
              plan.popular
                ? "border-forest bg-forest/5 shadow-lg relative"
                : "border-border bg-white"
            }`}
          >
            {plan.popular && (
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-mustard px-3 py-0.5 text-xs font-bold text-white flex items-center gap-1">
                <Star size={12} /> Most Popular
              </div>
            )}

            <div>
              <h3 className="text-lg font-bold text-foreground">{plan.name}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{plan.description}</p>
            </div>

            <div className="mt-6">
              <div className="flex items-baseline gap-1">
                <span className="text-3xl font-bold text-forest">Rs.{plan.price.toLocaleString()}</span>
              </div>
              <p className="text-sm text-muted-foreground">Rs.{plan.perMeal}/meal</p>
              {plan.discount > 0 && (
                <p className="mt-1 text-xs font-medium text-success">Save {plan.discount}%</p>
              )}
            </div>

            <ul className="mt-6 space-y-2.5 flex-1">
              {plan.features.map((f) => (
                <li key={f} className="flex items-start gap-2 text-sm">
                  <Check size={16} className="text-forest shrink-0 mt-0.5" />
                  <span>{f}</span>
                </li>
              ))}
            </ul>

            <div className="mt-8">
              <Link href={`/subscribe?plan=${plan.slug}`}>
                <Button
                  variant={plan.popular ? "primary" : "outline"}
                  className="w-full"
                >
                  {plan.cta}
                </Button>
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* FAQ */}
      <div className="mt-20 max-w-3xl mx-auto">
        <h2 className="text-2xl font-bold text-center text-forest mb-8">Frequently Asked Questions</h2>
        <div className="space-y-4">
          {[
            {
              q: "Can I change my salad selection daily?",
              a: "Yes! You can customize your salad choice for each day until 6 PM the day before delivery.",
            },
            {
              q: "What if I need to skip a day?",
              a: "Simply skip any day from your dashboard before 6 PM cutoff. The day gets added back to your plan.",
            },
            {
              q: "Can I pause my subscription?",
              a: "Absolutely. Pause and resume anytime from your dashboard. Remaining meals stay safe.",
            },
            {
              q: "What areas do you deliver to?",
              a: "We currently deliver across Bangalore. Enter your pincode during checkout to confirm availability.",
            },
          ].map((faq) => (
            <div key={faq.q} className="rounded-lg border border-border p-4">
              <h3 className="font-semibold text-foreground">{faq.q}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{faq.a}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
