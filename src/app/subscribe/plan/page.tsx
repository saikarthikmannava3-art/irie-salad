"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Check, Star, TrendingDown } from "lucide-react";
import { getMealCategoryBySlug } from "@/data/meal-categories";
import { getMealCategoryPrice, getMealCategoryStartingPrice } from "@/data/pricing";
import { ADDONS } from "@/data/addons";
import { FULFILLMENT_WINDOWS } from "@/lib/constants";
import type { IrieDaySelection, PlanDuration } from "@/types/domain";
import { ProgressBar } from "../page";

const PLAN_OPTIONS: Array<{
  duration: PlanDuration;
  name: string;
  days: number;
  popular?: boolean;
}> = [
  { duration: "single", name: "Trial (3 days)", days: 3 },
  { duration: "12", name: "12-Day Plan", days: 12, popular: true },
  { duration: "24", name: "24-Day Plan", days: 24 },
  { duration: "48", name: "48-Day Plan", days: 48 },
];

export default function PlanPage() {
  const router = useRouter();
  const [selections, setSelections] = useState<IrieDaySelection[]>([]);
  const [selectedPlan, setSelectedPlan] = useState<PlanDuration>("12");

  useEffect(() => {
    const saved = sessionStorage.getItem("irie_day_selections");
    if (saved) {
      try {
        setSelections(JSON.parse(saved));
      } catch {
        router.push("/subscribe");
      }
    } else {
      router.push("/subscribe");
    }

    const savedPlan = sessionStorage.getItem("irie_plan");
    if (savedPlan) {
      setSelectedPlan(savedPlan as PlanDuration);
    }
  }, [router]);

  function calculateDailyPrice(planDuration: PlanDuration): number {
    let total = 0;
    selections.forEach((sel) => {
      const price = getMealCategoryPrice(sel.mealCategorySlug, planDuration);
      total += price ?? getMealCategoryStartingPrice(sel.mealCategorySlug);

      sel.addOns.forEach((ao) => {
        const addOn = ADDONS.find((a) => a.slug === ao.slug);
        if (addOn && !addOn.isMarketPrice) {
          total += addOn.price * ao.quantity;
        }
      });
    });
    return total;
  }

  function calculateSavings(planDuration: PlanDuration): number {
    const singlePrice = calculateDailyPrice("single");
    const planPrice = calculateDailyPrice(planDuration);
    return singlePrice - planPrice;
  }

  function handleContinue() {
    sessionStorage.setItem("irie_plan", selectedPlan);
    router.push("/subscribe/address");
  }

  if (selections.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground mb-4">No meals selected</p>
        <Button onClick={() => router.push("/subscribe")}>Choose Meals</Button>
      </div>
    );
  }

  // Group selections by delivery window
  const morningMeals = selections.filter(
    (s) => s.mealOccasion === "breakfast" || s.mealOccasion === "lunch"
  );
  const eveningMeals = selections.filter(
    (s) => s.mealOccasion === "evening-snack" || s.mealOccasion === "dinner"
  );

  return (
    <div>
      <ProgressBar currentStep={3} />

      <h1 className="text-2xl font-bold text-forest mb-2">Choose Your Plan</h1>
      <p className="text-muted-foreground mb-8">
        Longer plans mean bigger savings per day.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-3xl mx-auto">
        {PLAN_OPTIONS.map((plan) => {
          const dailyPrice = calculateDailyPrice(plan.duration);
          const totalPrice = dailyPrice * plan.days;
          const savings = calculateSavings(plan.duration);
          const singlePrice = calculateDailyPrice("single");
          const savingsPercent =
            singlePrice > 0
              ? ((savings / singlePrice) * 100).toFixed(0)
              : "0";

          return (
            <button
              key={plan.duration}
              onClick={() => setSelectedPlan(plan.duration)}
              className={`rounded-xl border-2 p-5 text-left transition-all relative ${
                selectedPlan === plan.duration
                  ? "border-forest bg-forest/5 shadow-md"
                  : "border-border bg-white hover:border-sage"
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-2.5 right-3 rounded-full bg-mustard px-2 py-0.5 text-[10px] font-bold text-white flex items-center gap-1">
                  <Star size={10} /> Popular
                </div>
              )}

              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="font-bold text-foreground">{plan.name}</h3>
                  <p className="text-sm text-muted-foreground">
                    {plan.days} deliveries
                  </p>
                </div>
                <div
                  className={`flex h-5 w-5 items-center justify-center rounded-full border-2 ${
                    selectedPlan === plan.duration
                      ? "border-forest bg-forest"
                      : "border-border"
                  }`}
                >
                  {selectedPlan === plan.duration && (
                    <Check size={12} className="text-white" />
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <div>
                  <span className="text-2xl font-bold text-forest">
                    Rs.{totalPrice.toLocaleString()}
                  </span>
                  <p className="text-sm text-muted-foreground mt-0.5">
                    Rs.{dailyPrice}/day
                  </p>
                </div>

                {savings > 0 && (
                  <Badge
                    variant="success"
                    className="flex items-center gap-1 w-fit"
                  >
                    <TrendingDown size={12} />
                    Save Rs.{savings}/day ({savingsPercent}%)
                  </Badge>
                )}
              </div>
            </button>
          );
        })}
      </div>

      {/* Your Meals breakdown */}
      <div className="mt-8 max-w-3xl mx-auto">
        <Card>
          <h3 className="font-bold text-foreground mb-4">Your Meals</h3>
          <div className="space-y-4">
            {morningMeals.length > 0 && (
              <div>
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2">
                  Morning Delivery (6:30 - 8:30 AM)
                </p>
                {morningMeals.map((sel) => {
                  const mc = getMealCategoryBySlug(sel.mealCategorySlug);
                  const price =
                    getMealCategoryPrice(sel.mealCategorySlug, selectedPlan) ?? 0;
                  return (
                    <div
                      key={sel.mealOccasion}
                      className="flex items-center justify-between py-1"
                    >
                      <div>
                        <span className="text-sm font-medium text-foreground">
                          {mc?.name}
                        </span>
                        <span className="text-xs text-muted-foreground ml-2 capitalize">
                          ({sel.mealOccasion.replace("-", " ")})
                        </span>
                      </div>
                      <span className="text-sm font-semibold text-forest">
                        Rs.{price}
                      </span>
                    </div>
                  );
                })}
              </div>
            )}

            {eveningMeals.length > 0 && (
              <div>
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2">
                  Evening Delivery (4:30 - 6:30 PM)
                </p>
                {eveningMeals.map((sel) => {
                  const mc = getMealCategoryBySlug(sel.mealCategorySlug);
                  const price =
                    getMealCategoryPrice(sel.mealCategorySlug, selectedPlan) ?? 0;
                  return (
                    <div
                      key={sel.mealOccasion}
                      className="flex items-center justify-between py-1"
                    >
                      <div>
                        <span className="text-sm font-medium text-foreground">
                          {mc?.name}
                        </span>
                        <span className="text-xs text-muted-foreground ml-2 capitalize">
                          ({sel.mealOccasion.replace("-", " ")})
                        </span>
                      </div>
                      <span className="text-sm font-semibold text-forest">
                        Rs.{price}
                      </span>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </Card>
      </div>

      {/* What's Included */}
      <div className="mt-4 max-w-3xl mx-auto">
        <div className="rounded-lg bg-cream/50 p-4 text-sm">
          <h3 className="font-semibold text-foreground mb-2">
            What is Included
          </h3>
          <ul className="space-y-1 text-muted-foreground">
            <li className="flex items-center gap-2">
              <Check size={14} className="text-forest shrink-0" />
              Your custom meal plan with all selected meals and add-ons
            </li>
            <li className="flex items-center gap-2">
              <Check size={14} className="text-forest shrink-0" />
              Free delivery to your doorstep
            </li>
            <li className="flex items-center gap-2">
              <Check size={14} className="text-forest shrink-0" />
              Morning delivery: modify until 6 PM previous day
            </li>
            <li className="flex items-center gap-2">
              <Check size={14} className="text-forest shrink-0" />
              Evening delivery: modify until 10 AM same day
            </li>
            <li className="flex items-center gap-2">
              <Check size={14} className="text-forest shrink-0" />
              Pause or skip days, unused days are added back
            </li>
          </ul>
        </div>
      </div>

      <div className="mt-8 flex justify-between max-w-3xl mx-auto">
        <Button variant="ghost" onClick={() => router.push("/subscribe/customize")}>
          Back to Add-ons
        </Button>
        <Button onClick={handleContinue} size="lg">
          Continue to Address
        </Button>
      </div>
    </div>
  );
}
