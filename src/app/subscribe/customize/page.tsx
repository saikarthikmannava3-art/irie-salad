"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Minus, Plus } from "lucide-react";
import { getMealCategoryBySlug } from "@/data/meal-categories";
import { getAddOnsForMealCategory } from "@/data/addons";
import type { IrieDaySelection } from "@/types/domain";
import { ProgressBar } from "../page";

export default function CustomizePage() {
  const router = useRouter();
  const [selections, setSelections] = useState<IrieDaySelection[]>([]);

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
  }, [router]);

  function updateAddOn(selectionIndex: number, addOnSlug: string, delta: number) {
    const updated = [...selections];
    const item = updated[selectionIndex];
    const existing = item.addOns.find((a) => a.slug === addOnSlug);

    if (existing) {
      existing.quantity += delta;
      if (existing.quantity <= 0) {
        item.addOns = item.addOns.filter((a) => a.slug !== addOnSlug);
      }
    } else if (delta > 0) {
      item.addOns.push({ slug: addOnSlug, quantity: delta });
    }

    setSelections(updated);
    sessionStorage.setItem("irie_day_selections", JSON.stringify(updated));
  }

  function handleContinue() {
    router.push("/subscribe/plan");
  }

  if (selections.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground mb-4">No meals selected</p>
        <Button onClick={() => router.push("/subscribe")}>Choose Meals</Button>
      </div>
    );
  }

  // Filter selections that have available add-ons
  const selectionsWithAddOns = selections.map((sel, index) => ({
    sel,
    index,
    mc: getMealCategoryBySlug(sel.mealCategorySlug),
    addOns: getAddOnsForMealCategory(sel.mealCategorySlug),
  }));

  const hasAnyAddOns = selectionsWithAddOns.some((s) => s.addOns.length > 0);

  return (
    <div>
      <ProgressBar currentStep={2} />

      <h1 className="text-2xl font-bold text-forest mb-2">Customize Add-ons</h1>
      <p className="text-muted-foreground mb-6">
        Add extras to make each meal perfect
      </p>

      {!hasAnyAddOns ? (
        <Card className="text-center py-8 mb-6">
          <p className="text-muted-foreground">
            No add-ons available for your selected meals. You can continue to the next step.
          </p>
        </Card>
      ) : (
        <div className="space-y-6">
          {selectionsWithAddOns.map(({ sel, index, mc, addOns }) => {
            if (!mc || addOns.length === 0) return null;

            return (
              <Card key={index}>
                <div className="flex items-start gap-4 mb-4 pb-4 border-b border-border">
                  <div className="relative h-20 w-20 rounded-lg overflow-hidden shrink-0">
                    <Image
                      src={mc.image}
                      alt={mc.name}
                      fill
                      className="object-cover"
                      sizes="80px"
                    />
                  </div>
                  <div className="min-w-0">
                    <h3 className="font-bold text-foreground">{mc.name}</h3>
                    <p className="text-sm text-muted-foreground capitalize">
                      {sel.mealOccasion.replace("-", " ")}
                    </p>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-sm text-foreground mb-3">
                    Add-ons
                  </h4>
                  <div className="space-y-2">
                    {addOns.map((addOn) => {
                      const quantity =
                        sel.addOns.find((a) => a.slug === addOn.slug)?.quantity || 0;
                      return (
                        <div
                          key={addOn.slug}
                          className="flex items-center justify-between p-3 rounded-lg bg-cream/30"
                        >
                          <div>
                            <p className="text-sm font-medium text-foreground">
                              {addOn.name}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              {addOn.isMarketPrice
                                ? "Market Price"
                                : `Rs.${addOn.price}`}
                            </p>
                          </div>
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() =>
                                updateAddOn(index, addOn.slug, -1)
                              }
                              disabled={quantity === 0}
                              className="w-8 h-8 rounded-full border-2 border-forest text-forest hover:bg-forest hover:text-white disabled:opacity-30 disabled:pointer-events-none transition-colors flex items-center justify-center"
                            >
                              <Minus size={14} />
                            </button>
                            <span className="w-8 text-center font-medium">
                              {quantity}
                            </span>
                            <button
                              onClick={() =>
                                updateAddOn(index, addOn.slug, 1)
                              }
                              className="w-8 h-8 rounded-full border-2 border-forest bg-forest text-white hover:bg-forest-light transition-colors flex items-center justify-center"
                            >
                              <Plus size={14} />
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      )}

      <div className="mt-8 flex justify-between">
        <Button variant="ghost" onClick={() => router.push("/subscribe")}>
          Back to Meal Selection
        </Button>
        <Button onClick={handleContinue} size="lg">
          Continue to Plan
        </Button>
      </div>
    </div>
  );
}
