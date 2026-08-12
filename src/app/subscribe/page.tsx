"use client";

import { useState, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Check, Star } from "lucide-react";

const PLANS = [
  { slug: "trial", name: "Trial", days: 3, price: 599, perMeal: 199, popular: false },
  { slug: "12-day", name: "12-Day Plan", days: 12, price: 3999, perMeal: 333, popular: true },
  { slug: "24-day", name: "24-Day Plan", days: 24, price: 6999, perMeal: 291, popular: false },
  { slug: "48-day", name: "48-Day Plan", days: 48, price: 11999, perMeal: 249, popular: false },
];

function SubscribeContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const preselected = searchParams.get("plan");
  const [selected, setSelected] = useState(preselected || "12-day");

  function handleContinue() {
    sessionStorage.setItem("irie_sub_plan", selected);
    router.push("/subscribe/customize");
  }

  return (
    <div>
      {/* Progress */}
      <div className="mb-8">
        <div className="flex items-center justify-between text-xs font-medium text-muted-foreground mb-2">
          <span className="text-forest font-bold">1. Choose Plan</span>
          <span>2. Pick Salads</span>
          <span>3. Address</span>
          <span>4. Checkout</span>
        </div>
        <div className="h-2 rounded-full bg-border overflow-hidden">
          <div className="h-full w-1/4 bg-forest rounded-full transition-all" />
        </div>
      </div>

      <h1 className="text-2xl font-bold text-forest mb-2">Choose Your Plan</h1>
      <p className="text-muted-foreground mb-8">Select the plan that fits your lifestyle</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {PLANS.map((plan) => (
          <button
            key={plan.slug}
            onClick={() => setSelected(plan.slug)}
            className={`rounded-xl border-2 p-5 text-left transition-all relative ${
              selected === plan.slug
                ? "border-forest bg-forest/5 shadow-md"
                : "border-border bg-white hover:border-sage"
            }`}
          >
            {plan.popular && (
              <div className="absolute -top-2.5 right-3 rounded-full bg-mustard px-2 py-0.5 text-[10px] font-bold text-white flex items-center gap-1">
                <Star size={10} /> Popular
              </div>
            )}
            <div className="flex items-start justify-between">
              <div>
                <h3 className="font-bold text-foreground">{plan.name}</h3>
                <p className="text-sm text-muted-foreground">{plan.days} meals</p>
              </div>
              <div className={`flex h-5 w-5 items-center justify-center rounded-full border-2 ${
                selected === plan.slug ? "border-forest bg-forest" : "border-border"
              }`}>
                {selected === plan.slug && <Check size={12} className="text-white" />}
              </div>
            </div>
            <div className="mt-3">
              <span className="text-2xl font-bold text-forest">Rs.{plan.price.toLocaleString()}</span>
              <span className="text-sm text-muted-foreground ml-2">Rs.{plan.perMeal}/meal</span>
            </div>
          </button>
        ))}
      </div>

      <div className="mt-8 flex justify-end">
        <Button onClick={handleContinue} size="lg">
          Continue to Menu Selection
        </Button>
      </div>
    </div>
  );
}

export default function SubscribePage() {
  return (
    <Suspense fallback={<div className="py-12 text-center text-muted-foreground">Loading...</div>}>
      <SubscribeContent />
    </Suspense>
  );
}
