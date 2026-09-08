import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { FAQJsonLd, BreadcrumbJsonLd } from "@/components/structured-data";
import { SITE_URL } from "@/lib/seo";
import { Check, Star } from "lucide-react";

export const metadata: Metadata = {
  title: "Plans & Pricing | Indian Meal Subscription Plans",
  description:
    "Choose your irie kitchen plan: 3-day trial, 12-day, 24-day, or 48-day plans. Save up to 25%. Pause anytime, free delivery, customize daily meals.",
  alternates: { canonical: "https://iriekitchen.in/plans" },
};

const PLANS = [
  {
    name: "Trial",
    slug: "trial",
    days: 3,
    price: 747,
    perMeal: 249,
    discount: 0,
    description: "Perfect to try before you commit",
    features: [
      "3 fresh meals",
      "Free delivery",
      "Choose from full menu",
      "Full menu access",
    ],
    popular: false,
    cta: "Try Now",
  },
  {
    name: "12-Day Plan",
    slug: "12-day",
    days: 12,
    price: 2688,
    perMeal: 224,
    discount: 10,
    description: "Great for building the healthy habit",
    features: [
      "12 fresh meals",
      "Free delivery",
      "Customize daily basket",
      "Pause anytime",
      "Skip individual days",
      "10% savings",
    ],
    popular: true,
    cta: "Get Started",
  },
  {
    name: "24-Day Plan",
    slug: "24-day",
    days: 24,
    price: 4776,
    perMeal: 199,
    discount: 20,
    description: "Best value for committed healthy eaters",
    features: [
      "24 fresh meals",
      "Free delivery",
      "Customize daily basket",
      "Pause anytime",
      "Skip individual days",
      "Priority support",
      "20% savings",
      "Vacation mode",
    ],
    popular: false,
    cta: "Get Started",
  },
  {
    name: "48-Day Plan",
    slug: "48-day",
    days: 48,
    price: 8976,
    perMeal: 187,
    discount: 25,
    description: "Maximum savings for the long haul",
    features: [
      "48 fresh meals",
      "Free delivery",
      "Customize daily basket",
      "Pause anytime",
      "Skip individual days",
      "Priority support",
      "25% savings",
      "Vacation mode",
      "Exclusive daily specials",
    ],
    popular: false,
    cta: "Get Started",
  },
];

const PLAN_FAQS = [
  { question: "Can I change my meal selection daily?", answer: "Yes! For morning meals (breakfast & lunch), modify by 6 PM the previous evening. For evening meals (snack & dinner), modify by 10 AM the same day." },
  { question: "What if I need to skip a day?", answer: "Skip any day from your dashboard before the cutoff: 6 PM (previous day) for morning delivery, or 10 AM (same day) for evening delivery. Skipped days are added back to your plan." },
  { question: "Can I pause my subscription?", answer: "Absolutely. Pause and resume anytime from your dashboard. Remaining meals stay safe." },
  { question: "What areas do you deliver to?", answer: "We currently deliver across Hyderabad. Enter your pincode during checkout to confirm availability." },
  { question: "When are meals delivered?", answer: "We deliver twice daily: Morning delivery (breakfast & lunch) between 6:30–8:30 AM, and Evening delivery (snack & dinner) between 4:30–6:30 PM." },
  { question: "Can I cancel my subscription?", answer: "To ensure the best experience, cancellations are handled by our support team. Please contact us and we will assist you." },
];

export default function PlansPage() {
  return (
    <>
    <BreadcrumbJsonLd items={[
      { name: "Home", url: SITE_URL },
      { name: "Plans & Pricing", url: `${SITE_URL}/plans` },
    ]} />
    <FAQJsonLd faqs={PLAN_FAQS} />
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold text-forest">Choose Your Plan</h1>
        <p className="mt-3 text-lg text-muted-foreground">
          Flexible plans that fit your lifestyle. Pause or skip anytime.
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
                <span className="text-3xl font-bold text-forest">₹{plan.price.toLocaleString()}</span>
              </div>
              <p className="text-sm text-muted-foreground">₹{plan.perMeal}/meal</p>
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
          {PLAN_FAQS.map((faq) => (
            <div key={faq.question} className="rounded-lg border border-border p-4">
              <h3 className="font-semibold text-foreground">{faq.question}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{faq.answer}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
    </>
  );
}
