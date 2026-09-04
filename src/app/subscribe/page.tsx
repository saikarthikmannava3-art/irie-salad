"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Check, X, Sun, Moon, Sunrise, Sunset } from "lucide-react";
import { getMealCategoriesByOccasion, isAddonOnly, getMealCategoryBySlug, ADDON_ONLY_SLUGS } from "@/data/meal-categories";
import { getMealCategoryStartingPrice } from "@/data/pricing";
import { MEAL_OCCASIONS } from "@/lib/constants";
import type { IrieDaySelection, MealOccasion } from "@/types/domain";

const OCCASION_ICONS: Record<MealOccasion, React.ReactNode> = {
  breakfast: <Sunrise size={20} />,
  lunch: <Sun size={20} />,
  "evening-snack": <Sunset size={20} />,
  dinner: <Moon size={20} />,
};

const OCCASION_EMOJIS: Record<MealOccasion, string> = {
  breakfast: "\u{1F305}",
  lunch: "\u{2600}\u{FE0F}",
  "evening-snack": "\u{1F306}",
  dinner: "\u{1F319}",
};

const PROGRESS_STEPS = [
  "1. Choose Meals",
  "2. Add-ons",
  "3. Choose Plan",
  "4. Address",
  "5. Checkout",
];

function ProgressBar({ currentStep }: { currentStep: number }) {
  const pct = (currentStep / PROGRESS_STEPS.length) * 100;
  return (
    <div className="mb-8">
      <div className="flex items-center justify-between text-xs font-medium text-muted-foreground mb-2">
        {PROGRESS_STEPS.map((label, i) => (
          <span
            key={label}
            className={
              i + 1 < currentStep
                ? "text-forest"
                : i + 1 === currentStep
                ? "text-forest font-bold"
                : ""
            }
          >
            {label}
          </span>
        ))}
      </div>
      <div className="h-2 rounded-full bg-border overflow-hidden">
        <div
          className="h-full bg-forest rounded-full transition-all"
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}

export { ProgressBar, PROGRESS_STEPS };

export default function BuildMyIrieDayPage() {
  const router = useRouter();
  const [selections, setSelections] = useState<IrieDaySelection[]>([]);
  const [extras, setExtras] = useState<IrieDaySelection[]>([]);

  useEffect(() => {
    const saved = sessionStorage.getItem("irie_day_selections");
    if (saved) {
      try {
        const parsed: IrieDaySelection[] = JSON.parse(saved);
        const mainMeals = parsed.filter(
          (s) => !(ADDON_ONLY_SLUGS as readonly string[]).includes(s.mealCategorySlug)
        );
        const extraMeals = parsed.filter(
          (s) => (ADDON_ONLY_SLUGS as readonly string[]).includes(s.mealCategorySlug)
        );
        setSelections(mainMeals);
        setExtras(extraMeals);
      } catch {
        // ignore
      }
    }
  }, []);

  const persist = useCallback(
    (main: IrieDaySelection[], extra: IrieDaySelection[]) => {
      sessionStorage.setItem(
        "irie_day_selections",
        JSON.stringify([...main, ...extra])
      );
    },
    []
  );

  function selectMeal(occasion: MealOccasion, slug: string) {
    const existing = selections.find((s) => s.mealOccasion === occasion);
    let updated: IrieDaySelection[];
    if (existing?.mealCategorySlug === slug) {
      // deselect
      updated = selections.filter((s) => s.mealOccasion !== occasion);
    } else {
      // select (replace for that occasion)
      updated = [
        ...selections.filter((s) => s.mealOccasion !== occasion),
        { mealOccasion: occasion, mealCategorySlug: slug, addOns: [] },
      ];
    }
    setSelections(updated);

    // Remove detox juice if no main meals remain
    let updatedExtras = extras;
    if (updated.length === 0) {
      updatedExtras = extras.filter((e) => e.mealCategorySlug !== "fresh-detox-juice");
      setExtras(updatedExtras);
    }

    persist(updated, updatedExtras);
  }

  function toggleExtra(slug: string) {
    const exists = extras.find((e) => e.mealCategorySlug === slug);
    let updated: IrieDaySelection[];
    if (exists) {
      updated = extras.filter((e) => e.mealCategorySlug !== slug);
    } else {
      // Detox juice rule: only if at least one other meal selected
      if (slug === "fresh-detox-juice" && selections.length === 0 && extras.length === 0) {
        return;
      }
      const mc = getMealCategoryBySlug(slug);
      updated = [
        ...extras,
        {
          mealOccasion: mc?.mealOccasion ?? "breakfast",
          mealCategorySlug: slug,
          addOns: [],
        },
      ];
    }
    setExtras(updated);
    persist(selections, updated);
  }

  const totalSelections = selections.length + extras.length;
  const hasMainMeal = selections.length > 0;

  // Calculate daily total at single-day pricing
  const dailyTotal = [...selections, ...extras].reduce((sum, s) => {
    return sum + (getMealCategoryStartingPrice(s.mealCategorySlug) || 0);
  }, 0);

  // Extra-only meal categories
  const extraCategories = (ADDON_ONLY_SLUGS as readonly string[])
    .map((slug) => getMealCategoryBySlug(slug))
    .filter(Boolean);

  function handleContinue() {
    router.push("/subscribe/customize");
  }

  return (
    <div>
      <ProgressBar currentStep={1} />

      <div className="flex items-start justify-between mb-6 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-forest mb-2">
            Choose Your Meals
          </h1>
          <p className="text-muted-foreground">
            Select a meal for each part of your day. Skip any you do not need.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-8">
          {/* Meal Occasions */}
          {MEAL_OCCASIONS.map(({ occasion, label, deliveryWindow }) => {
            const categories = getMealCategoriesByOccasion(occasion).filter(
              (mc) => !isAddonOnly(mc.slug)
            );
            const selected = selections.find(
              (s) => s.mealOccasion === occasion
            );

            return (
              <section key={occasion}>
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-forest">
                    {OCCASION_ICONS[occasion]}
                  </span>
                  <h2 className="text-lg font-bold text-foreground">
                    {OCCASION_EMOJIS[occasion]} {label}
                  </h2>
                  <Badge variant="outline" className="ml-auto text-[10px]">
                    {deliveryWindow === "morning"
                      ? "Morning Delivery"
                      : "Evening Delivery"}
                  </Badge>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {categories.map((mc) => {
                    const price = getMealCategoryStartingPrice(mc.slug);
                    const isSelected =
                      selected?.mealCategorySlug === mc.slug;

                    return (
                      <Card
                        key={mc.id}
                        hover
                        onClick={() => selectMeal(occasion, mc.slug)}
                        className={`relative cursor-pointer transition-all ${
                          isSelected
                            ? "ring-2 ring-forest border-forest"
                            : ""
                        }`}
                      >
                        <div className="relative h-36 w-full rounded-lg overflow-hidden mb-3">
                          <Image
                            src={mc.image}
                            alt={mc.name}
                            fill
                            className="object-cover"
                            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                          />
                          {isSelected && (
                            <div className="absolute top-2 right-2 rounded-full bg-forest text-white w-6 h-6 flex items-center justify-center">
                              <Check size={14} />
                            </div>
                          )}
                        </div>
                        <h3 className="font-bold text-foreground mb-1">
                          {mc.name}
                        </h3>
                        <p className="text-xs text-muted-foreground mb-2 line-clamp-2">
                          {mc.description}
                        </p>
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-semibold text-forest">
                            From Rs.{price}
                          </span>
                          <Button
                            size="sm"
                            variant={isSelected ? "outline" : "primary"}
                            onClick={(e) => {
                              e.stopPropagation();
                              selectMeal(occasion, mc.slug);
                            }}
                          >
                            {isSelected ? (
                              <>
                                <Check size={14} /> Selected
                              </>
                            ) : (
                              "Select"
                            )}
                          </Button>
                        </div>
                      </Card>
                    );
                  })}
                </div>
              </section>
            );
          })}

          {/* Extras Section */}
          <section>
            <div className="flex items-center gap-2 mb-4">
              <h2 className="text-lg font-bold text-foreground">
                Extras
              </h2>
              <Badge variant="outline" className="text-[10px]">
                Add-on only
              </Badge>
            </div>
            <p className="text-sm text-muted-foreground mb-4">
              Pair these with any meal above. Cannot be subscribed independently.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {extraCategories.map((mc) => {
                if (!mc) return null;
                const price = getMealCategoryStartingPrice(mc.slug);
                const isSelected = extras.some(
                  (e) => e.mealCategorySlug === mc.slug
                );
                const isDetoxJuice = mc.slug === "fresh-detox-juice";
                const detoxDisabled = isDetoxJuice && !hasMainMeal && !isSelected;

                return (
                  <Card
                    key={mc.id}
                    hover={!detoxDisabled}
                    onClick={() => {
                      if (!detoxDisabled) toggleExtra(mc.slug);
                    }}
                    className={`relative cursor-pointer transition-all ${
                      isSelected
                        ? "ring-2 ring-forest border-forest"
                        : detoxDisabled
                        ? "opacity-50 cursor-not-allowed"
                        : ""
                    }`}
                  >
                    <div className="relative h-36 w-full rounded-lg overflow-hidden mb-3">
                      <Image
                        src={mc.image}
                        alt={mc.name}
                        fill
                        className="object-cover"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      />
                      {isSelected && (
                        <div className="absolute top-2 right-2 rounded-full bg-forest text-white w-6 h-6 flex items-center justify-center">
                          <Check size={14} />
                        </div>
                      )}
                    </div>
                    <h3 className="font-bold text-foreground mb-1">
                      {mc.name}
                    </h3>
                    <p className="text-xs text-muted-foreground mb-2 line-clamp-2">
                      {mc.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-semibold text-forest">
                        Rs.{price}
                      </span>
                      {detoxDisabled ? (
                        <span className="text-xs text-muted-foreground">
                          Select a meal first
                        </span>
                      ) : (
                        <Button
                          size="sm"
                          variant={isSelected ? "outline" : "primary"}
                          onClick={(e) => {
                            e.stopPropagation();
                            if (!detoxDisabled) toggleExtra(mc.slug);
                          }}
                        >
                          {isSelected ? (
                            <>
                              <X size={14} /> Remove
                            </>
                          ) : (
                            "Add"
                          )}
                        </Button>
                      )}
                    </div>
                  </Card>
                );
              })}
            </div>
          </section>
        </div>

        {/* Sidebar: Your Meals */}
        <div className="lg:col-span-1">
          <div className="sticky top-4">
            <Card>
              <h2 className="font-bold text-foreground mb-4">
                Your Meals
              </h2>

              {totalSelections === 0 ? (
                <div className="text-center py-8 text-muted-foreground text-sm">
                  <p>No meals selected yet</p>
                  <p className="text-xs mt-1">
                    Choose at least one meal to continue
                  </p>
                </div>
              ) : (
                <div className="space-y-3 mb-4">
                  {/* Morning Delivery */}
                  {selections.some(
                    (s) =>
                      s.mealOccasion === "breakfast" ||
                      s.mealOccasion === "lunch"
                  ) && (
                    <div>
                      <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-1">
                        Morning Delivery
                      </p>
                      {selections
                        .filter(
                          (s) =>
                            s.mealOccasion === "breakfast" ||
                            s.mealOccasion === "lunch"
                        )
                        .map((s) => {
                          const mc = getMealCategoryBySlug(
                            s.mealCategorySlug
                          );
                          const price = getMealCategoryStartingPrice(
                            s.mealCategorySlug
                          );
                          return (
                            <div
                              key={s.mealOccasion}
                              className="flex items-center justify-between p-2 rounded-lg bg-cream/50"
                            >
                              <div className="min-w-0">
                                <p className="text-sm font-medium text-foreground truncate">
                                  {mc?.shortName}
                                </p>
                                <p className="text-xs text-muted-foreground capitalize">
                                  {s.mealOccasion.replace("-", " ")}
                                </p>
                              </div>
                              <span className="text-sm font-semibold text-forest whitespace-nowrap">
                                Rs.{price}
                              </span>
                            </div>
                          );
                        })}
                    </div>
                  )}

                  {/* Evening Delivery */}
                  {selections.some(
                    (s) =>
                      s.mealOccasion === "evening-snack" ||
                      s.mealOccasion === "dinner"
                  ) && (
                    <div>
                      <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-1">
                        Evening Delivery
                      </p>
                      {selections
                        .filter(
                          (s) =>
                            s.mealOccasion === "evening-snack" ||
                            s.mealOccasion === "dinner"
                        )
                        .map((s) => {
                          const mc = getMealCategoryBySlug(
                            s.mealCategorySlug
                          );
                          const price = getMealCategoryStartingPrice(
                            s.mealCategorySlug
                          );
                          return (
                            <div
                              key={s.mealOccasion}
                              className="flex items-center justify-between p-2 rounded-lg bg-cream/50"
                            >
                              <div className="min-w-0">
                                <p className="text-sm font-medium text-foreground truncate">
                                  {mc?.shortName}
                                </p>
                                <p className="text-xs text-muted-foreground capitalize">
                                  {s.mealOccasion.replace("-", " ")}
                                </p>
                              </div>
                              <span className="text-sm font-semibold text-forest whitespace-nowrap">
                                Rs.{price}
                              </span>
                            </div>
                          );
                        })}
                    </div>
                  )}

                  {/* Extras */}
                  {extras.length > 0 && (
                    <div>
                      <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-1">
                        Extras
                      </p>
                      {extras.map((s) => {
                        const mc = getMealCategoryBySlug(s.mealCategorySlug);
                        const price = getMealCategoryStartingPrice(
                          s.mealCategorySlug
                        );
                        return (
                          <div
                            key={s.mealCategorySlug}
                            className="flex items-center justify-between p-2 rounded-lg bg-cream/50"
                          >
                            <p className="text-sm font-medium text-foreground truncate">
                              {mc?.shortName}
                            </p>
                            <span className="text-sm font-semibold text-forest whitespace-nowrap">
                              Rs.{price}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  )}

                  {/* Daily Total */}
                  <div className="pt-3 border-t border-border flex items-center justify-between">
                    <span className="font-bold text-foreground">
                      Daily Total
                    </span>
                    <span className="text-lg font-bold text-forest">
                      Rs.{dailyTotal}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Single-day price. Plans offer discounts.
                  </p>
                </div>
              )}

              {totalSelections > 0 && (
                <Button
                  onClick={handleContinue}
                  size="lg"
                  className="w-full"
                  disabled={!hasMainMeal && extras.length === 0}
                >
                  Continue to Add-ons
                </Button>
              )}
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
