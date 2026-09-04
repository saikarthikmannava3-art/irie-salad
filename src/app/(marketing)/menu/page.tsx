"use client";

import { useState, useEffect, Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Search, Sun, Moon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MEAL_CATEGORIES, isAddonOnly } from "@/data/meal-categories";
import { getMealCategoryStartingPrice, getMealCategoryLowestPrice } from "@/data/pricing";
import { getRecipesByMealOccasion } from "@/data/recipes";
import type { MealOccasion } from "@/types/domain";

// Fresh & Wellness includes salads, fruit bowl, and addon-only items (smoothie bowl, overnight oats, detox juice)
const FRESH_WELLNESS_SLUGS = [
  "signature-irie-salad-350",
  "signature-irie-salad-500",
  "fresh-seasonal-fruit-bowl",
  "tropical-smoothie-bowl",
  "coconut-overnight-oats",
  "fresh-detox-juice",
];

type TabFilter = "all" | "breakfast" | "lunch" | "snacks" | "dinner" | "fresh-wellness";

const TABS: { value: TabFilter; label: string }[] = [
  { value: "all", label: "All" },
  { value: "breakfast", label: "Breakfast" },
  { value: "lunch", label: "Lunch" },
  { value: "snacks", label: "Snacks" },
  { value: "dinner", label: "Dinner" },
  { value: "fresh-wellness", label: "Fresh & Wellness" },
];

function matchesTab(mc: (typeof MEAL_CATEGORIES)[0], tab: TabFilter): boolean {
  if (tab === "all") return true;
  if (tab === "fresh-wellness") return FRESH_WELLNESS_SLUGS.includes(mc.slug);
  if (tab === "snacks") return mc.mealOccasion === "evening-snack";
  if (tab === "breakfast") return mc.mealOccasion === "breakfast" && !FRESH_WELLNESS_SLUGS.includes(mc.slug);
  if (tab === "lunch") return mc.mealOccasion === "lunch" && !FRESH_WELLNESS_SLUGS.includes(mc.slug);
  if (tab === "dinner") return mc.mealOccasion === "dinner";
  return false;
}

const VALID_TABS: TabFilter[] = ["all", "breakfast", "lunch", "snacks", "dinner", "fresh-wellness"];

function MenuPageContent() {
  const searchParams = useSearchParams();
  const tabParam = searchParams.get("tab") as TabFilter | null;
  const [activeTab, setActiveTab] = useState<TabFilter>(
    tabParam && VALID_TABS.includes(tabParam) ? tabParam : "all",
  );
  const [search, setSearch] = useState("");

  useEffect(() => {
    if (tabParam && VALID_TABS.includes(tabParam)) {
      setActiveTab(tabParam);
    }
  }, [tabParam]);

  const filteredCategories = MEAL_CATEGORIES.filter((mc) => {
    if (!mc.isActive) return false;
    if (!matchesTab(mc, activeTab)) return false;
    if (search) {
      const q = search.toLowerCase();
      return mc.name.toLowerCase().includes(q) || mc.description.toLowerCase().includes(q);
    }
    return true;
  }).sort((a, b) => a.sortOrder - b.sortOrder);

  const mainCategories = filteredCategories.filter((mc) => !isAddonOnly(mc.slug));
  const addonCategories = filteredCategories.filter((mc) => isAddonOnly(mc.slug));

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-forest">Our Menu</h1>
        <p className="mt-3 text-lg text-muted-foreground">
          Fresh Indian meals for every occasion. Daily-rotating recipes, two deliveries per day.
        </p>
      </div>

      {/* Delivery Windows Info */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8 max-w-2xl mx-auto">
        <div className="flex items-center gap-3 rounded-lg border border-border p-3">
          <Sun size={18} className="text-mustard shrink-0" />
          <div>
            <p className="text-sm font-semibold text-foreground">Morning Delivery</p>
            <p className="text-xs text-muted-foreground">Breakfast + Lunch, 6:30-8:30 AM</p>
          </div>
        </div>
        <div className="flex items-center gap-3 rounded-lg border border-border p-3">
          <Moon size={18} className="text-indigo-500 shrink-0" />
          <div>
            <p className="text-sm font-semibold text-foreground">Evening Delivery</p>
            <p className="text-xs text-muted-foreground">Snacks + Dinner, 4:30-6:30 PM</p>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">
        <div className="flex gap-2 overflow-x-auto pb-2 sm:pb-0">
          {TABS.map((tab) => (
            <Button
              key={tab.value}
              variant={activeTab === tab.value ? "primary" : "ghost"}
              size="sm"
              onClick={() => setActiveTab(tab.value)}
            >
              {tab.label}
            </Button>
          ))}
        </div>
        <div className="relative w-full sm:w-72">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search meals..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-lg border border-border bg-white py-2 pl-9 pr-3 text-sm focus:border-forest focus:outline-none focus:ring-2 focus:ring-forest/20"
          />
        </div>
      </div>

      {/* Main Meal Categories Grid */}
      {mainCategories.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {mainCategories.map((mc) => {
            const startingPrice = getMealCategoryStartingPrice(mc.slug);
            const lowestPrice = getMealCategoryLowestPrice(mc.slug);
            const sampleRecipes = getRecipesByMealOccasion(mc.mealOccasion).slice(0, 3);

            return (
              <div key={mc.id} className="group rounded-xl bg-white border border-border overflow-hidden shadow-sm hover:shadow-md transition-all">
                <div className="h-48 relative bg-muted overflow-hidden">
                  <Image
                    src={mc.image}
                    alt={`${mc.name} | IRIE Kitchen`}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                  <div className="absolute top-3 right-3 z-10">
                    <span className="rounded-full bg-white/90 px-2.5 py-1 text-xs font-bold text-forest shadow-sm">
                      From Rs.{lowestPrice > 0 ? lowestPrice : startingPrice}
                    </span>
                  </div>
                  <div className="absolute top-3 left-3 z-10">
                    <Badge variant={mc.deliveryWindow === "morning" ? "warning" : "info"} className="text-xs">
                      {mc.deliveryWindow === "morning" ? "Morning" : "Evening"}
                    </Badge>
                  </div>
                </div>
                <div className="p-5">
                  <div className="text-xs font-medium text-sage uppercase tracking-wider">
                    {mc.mealOccasion === "evening-snack" ? "Snacks" : mc.mealOccasion.replace("-", " ")}
                  </div>
                  <h3 className="mt-1 text-lg font-semibold text-foreground group-hover:text-forest transition-colors">
                    {mc.name}
                  </h3>
                  <p className="mt-2 text-sm text-muted-foreground line-clamp-2">{mc.description}</p>

                  {/* Sample recipes */}
                  {sampleRecipes.length > 0 && (
                    <div className="mt-3">
                      <p className="text-xs text-muted-foreground mb-1">Sample recipes:</p>
                      <div className="flex flex-wrap gap-1">
                        {sampleRecipes.map((r) => (
                          <Badge key={r.slug} variant="default" className="text-xs">{r.shortName}</Badge>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Add-on Only Section */}
      {addonCategories.length > 0 && (
        <div className={mainCategories.length > 0 ? "mt-12" : ""}>
          <h2 className="text-2xl font-bold text-forest mb-2">
            {activeTab === "fresh-wellness" ? "Add-on Items" : "Extras"}
          </h2>
          <p className="text-muted-foreground mb-6">Add-on items. Pair with any meal subscription. Cannot be ordered separately.</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {addonCategories.map((mc) => {
              const price = getMealCategoryStartingPrice(mc.slug);
              return (
                <div key={mc.id} className="group rounded-xl bg-white border border-border overflow-hidden shadow-sm hover:shadow-md transition-all">
                  <div className="h-36 relative bg-muted overflow-hidden">
                    <Image
                      src={mc.image}
                      alt={`${mc.name} | IRIE Kitchen`}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                    <div className="absolute top-3 right-3 z-10">
                      <span className="rounded-full bg-white/90 px-2.5 py-1 text-xs font-bold text-forest shadow-sm">
                        Rs.{price}
                      </span>
                    </div>
                    <div className="absolute top-3 left-3 z-10">
                      <Badge variant="outline" className="text-xs bg-white/90">Add-on only</Badge>
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-foreground">{mc.name}</h3>
                    <p className="mt-1 text-sm text-muted-foreground line-clamp-2">{mc.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {mainCategories.length === 0 && addonCategories.length === 0 && (
        <div className="text-center py-16 text-muted-foreground">
          No meals match your search. Try different keywords.
        </div>
      )}

      {/* CTA */}
      <div className="mt-16 text-center">
        <p className="text-muted-foreground mb-4">Found something you love?</p>
        <Link href="/subscribe">
          <Button size="lg">Start My Subscription</Button>
        </Link>
      </div>
    </div>
  );
}

export default function MenuPage() {
  return (
    <Suspense>
      <MenuPageContent />
    </Suspense>
  );
}
