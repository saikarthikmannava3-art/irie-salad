import type { MealCategoryPricingEntry, PlanDuration, PricingEntry } from "@/types/domain";

// === NEW: Meal Category Pricing (IRIE Kitchen) ===

export const MEAL_CATEGORY_PRICING: MealCategoryPricingEntry[] = [
  { mealCategorySlug: "irie-breakfast", prices: { single: 149, "12": 134, "24": 119, "48": 112 } },
  { mealCategorySlug: "irie-lunch-thali", prices: { single: 249, "12": 224, "24": 199, "48": 187 } },
  { mealCategorySlug: "irie-biryani", prices: { single: 279, "12": 251, "24": 223, "48": 209 } },
  { mealCategorySlug: "signature-irie-salad-350", prices: { single: 249, "12": 224, "24": 199, "48": 187 } },
  { mealCategorySlug: "signature-irie-salad-500", prices: { single: 299, "12": 269, "24": 239, "48": 224 } },
  { mealCategorySlug: "irie-evening-snack", prices: { single: 129, "12": 116, "24": 103, "48": 97 } },
  { mealCategorySlug: "fresh-seasonal-fruit-bowl", prices: { single: 249, "12": 224, "24": 199, "48": 187 } },
  { mealCategorySlug: "irie-dinner", prices: { single: 219, "12": 197, "24": 175, "48": 165 } },
  { mealCategorySlug: "irie-millet-dinner", prices: { single: 249, "12": 224, "24": 199, "48": 187 } },
  { mealCategorySlug: "tropical-smoothie-bowl", prices: { single: 249, "12": 224, "24": 199, "48": 187 } },
  { mealCategorySlug: "coconut-overnight-oats", prices: { single: 249, "12": 224, "24": 199, "48": 187 } },
  { mealCategorySlug: "fresh-detox-juice", prices: { single: 139, "12": 0, "24": 0, "48": 0 } },
];

export function getMealCategoryPrice(slug: string, planDuration: PlanDuration): number | undefined {
  const entry = MEAL_CATEGORY_PRICING.find((p) => p.mealCategorySlug === slug);
  return entry?.prices[planDuration];
}

export function getMealCategoryMenuPrice(slug: string): number | undefined {
  return getMealCategoryPrice(slug, "single");
}

export function getMealCategoryLowestPrice(slug: string): number {
  const entry = MEAL_CATEGORY_PRICING.find((p) => p.mealCategorySlug === slug);
  if (!entry) return 0;
  const nonZero = Object.values(entry.prices).filter((v) => v > 0);
  return nonZero.length > 0 ? Math.min(...nonZero) : 0;
}

export function getMealCategoryStartingPrice(slug: string): number {
  const entry = MEAL_CATEGORY_PRICING.find((p) => p.mealCategorySlug === slug);
  return entry?.prices.single ?? 0;
}

// === LEGACY: Product-based Pricing (backward compat) ===
// These exports are kept for existing pages that still use product slugs.

export const PRICING: PricingEntry[] = [
  // Signature IRIE Salad - Tofu/Paneer 350g
  { productSlug: "signature-irie-salad", variantId: "salad-tofu-350", prices: { single: 249, "12": 224, "24": 199, "48": 187 } },
  { productSlug: "signature-irie-salad", variantId: "salad-paneer-350", prices: { single: 249, "12": 224, "24": 199, "48": 187 } },
  // Signature IRIE Salad - Garden 350g
  { productSlug: "signature-irie-salad", variantId: "salad-garden-350", prices: { single: 229, "12": 206, "24": 183, "48": 172 } },
  // Signature IRIE Salad - Tofu/Paneer 500g
  { productSlug: "signature-irie-salad", variantId: "salad-tofu-500", prices: { single: 299, "12": 269, "24": 239, "48": 224 } },
  { productSlug: "signature-irie-salad", variantId: "salad-paneer-500", prices: { single: 299, "12": 269, "24": 239, "48": 224 } },
  // Signature IRIE Salad - Garden 500g
  { productSlug: "signature-irie-salad", variantId: "salad-garden-500", prices: { single: 279, "12": 251, "24": 223, "48": 209 } },

  // Signature Coconut Overnight Oats (all options same price)
  { productSlug: "coconut-overnight-oats", variantId: "oats-fruit", prices: { single: 249, "12": 224, "24": 199, "48": 187 } },
  { productSlug: "coconut-overnight-oats", variantId: "oats-chocolate", prices: { single: 249, "12": 224, "24": 199, "48": 187 } },
  { productSlug: "coconut-overnight-oats", variantId: "oats-seasonal", prices: { single: 249, "12": 224, "24": 199, "48": 187 } },

  // Tropical Smoothie Bowl
  { productSlug: "tropical-smoothie-bowl", variantId: "smoothie-default", prices: { single: 249, "12": 224, "24": 199, "48": 187 } },

  // Fresh Seasonal Fruit Bowl
  { productSlug: "fresh-seasonal-fruit-bowl", variantId: "fruit-default", prices: { single: 249, "12": 224, "24": 199, "48": 187 } },

  // IRIE Millet Wellness Bowl
  { productSlug: "irie-millet-wellness-bowl", variantId: "millet-default", prices: { single: 279, "12": 251, "24": 223, "48": 209 } },

  // IRIE Power Meal
  { productSlug: "irie-power-meal", variantId: "power-default", prices: { single: 310, "12": 279, "24": 248, "48": 233 } },

  // Fresh Detox Juice (single only, no subscription pricing yet)
  { productSlug: "fresh-detox-juice", variantId: "juice-default", prices: { single: 139, "12": 0, "24": 0, "48": 0 } },
];

/** @deprecated Use getMealCategoryPrice */
export function getPrice(productSlug: string, variantId: string, planDuration: PlanDuration): number | undefined {
  const entry = PRICING.find((p) => p.productSlug === productSlug && p.variantId === variantId);
  return entry?.prices[planDuration];
}

/** @deprecated Use getMealCategoryMenuPrice */
export function getMenuPrice(productSlug: string, variantId: string): number | undefined {
  return getPrice(productSlug, variantId, "single");
}

/** @deprecated Use getMealCategoryLowestPrice */
export function getLowestPrice(productSlug: string): number {
  const entries = PRICING.filter((p) => p.productSlug === productSlug);
  if (entries.length === 0) return 0;
  return Math.min(...entries.map((e) => Math.min(...Object.values(e.prices))));
}

/** @deprecated Use getMealCategoryStartingPrice */
export function getStartingPrice(productSlug: string): number {
  const entries = PRICING.filter((p) => p.productSlug === productSlug);
  if (entries.length === 0) return 0;
  return Math.min(...entries.map((e) => e.prices.single));
}
