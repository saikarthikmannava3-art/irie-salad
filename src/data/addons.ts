import type { AddOn } from "@/types/domain";

export const ADDONS: AddOn[] = [
  {
    id: "addon-1",
    slug: "extra-paneer",
    name: "Extra Paneer",
    price: 45,
    isMarketPrice: false,
    compatibleMealCategories: [
      "signature-irie-salad-350",
      "signature-irie-salad-500",
      "irie-lunch-thali",
      "irie-dinner",
    ],
    isActive: true,
  },
  {
    id: "addon-2",
    slug: "extra-tofu",
    name: "Extra Tofu",
    price: 45,
    isMarketPrice: false,
    compatibleMealCategories: [
      "signature-irie-salad-350",
      "signature-irie-salad-500",
    ],
    isActive: true,
  },
  {
    id: "addon-3",
    slug: "protein-tikki",
    name: "Protein Tikki (2 pcs)",
    price: 25,
    isMarketPrice: false,
    compatibleMealCategories: [
      "signature-irie-salad-350",
      "signature-irie-salad-500",
      "irie-lunch-thali",
      "irie-dinner",
    ],
    isActive: true,
  },
  {
    id: "addon-4",
    slug: "extra-seeds-mix",
    name: "Extra Seeds Mix",
    price: 25,
    isMarketPrice: false,
    compatibleMealCategories: [
      "signature-irie-salad-350",
      "signature-irie-salad-500",
      "coconut-overnight-oats",
      "irie-millet-dinner",
    ],
    isActive: true,
  },
  {
    id: "addon-5",
    slug: "extra-avocado",
    name: "Extra Avocado",
    price: 45,
    isMarketPrice: false,
    compatibleMealCategories: [
      "signature-irie-salad-350",
      "signature-irie-salad-500",
    ],
    isActive: true,
  },
  {
    id: "addon-6",
    slug: "extra-roti",
    name: "Extra Roti (2 pcs)",
    price: 15,
    isMarketPrice: false,
    compatibleMealCategories: [
      "irie-lunch-thali",
      "irie-dinner",
    ],
    isActive: true,
  },
  {
    id: "addon-7",
    slug: "extra-rice",
    name: "Extra Rice",
    price: 20,
    isMarketPrice: false,
    compatibleMealCategories: [
      "irie-lunch-thali",
      "irie-biryani",
      "irie-dinner",
    ],
    isActive: true,
  },
  {
    id: "addon-8",
    slug: "extra-dal",
    name: "Extra Dal",
    price: 30,
    isMarketPrice: false,
    compatibleMealCategories: [
      "irie-lunch-thali",
      "irie-dinner",
    ],
    isActive: true,
  },
  {
    id: "addon-9",
    slug: "extra-raita",
    name: "Extra Raita",
    price: 25,
    isMarketPrice: false,
    compatibleMealCategories: [
      "irie-lunch-thali",
      "irie-biryani",
      "irie-dinner",
    ],
    isActive: true,
  },
];

// === New helper using meal category slugs ===

export function getAddOnsForMealCategory(mealCategorySlug: string): AddOn[] {
  return ADDONS.filter(
    (a) => a.isActive && a.compatibleMealCategories.includes(mealCategorySlug),
  );
}

// === LEGACY: backward-compat helper for existing pages ===
// Maps old product slugs to new meal category slugs for add-on lookup

const PRODUCT_TO_MEAL_CATEGORY_MAP: Record<string, string[]> = {
  "signature-irie-salad": ["signature-irie-salad-350", "signature-irie-salad-500"],
  "coconut-overnight-oats": ["coconut-overnight-oats"],
  "irie-millet-wellness-bowl": ["irie-millet-dinner"],
  "irie-power-meal": ["irie-lunch-thali"],
  "fresh-detox-juice": ["fresh-detox-juice"],
  "tropical-smoothie-bowl": ["tropical-smoothie-bowl"],
  "fresh-seasonal-fruit-bowl": ["fresh-seasonal-fruit-bowl"],
};

/** @deprecated Use getAddOnsForMealCategory */
export function getAddOnsForProduct(productSlug: string): AddOn[] {
  const mealCategorySlugs = PRODUCT_TO_MEAL_CATEGORY_MAP[productSlug] ?? [];
  return ADDONS.filter(
    (a) =>
      a.isActive &&
      a.compatibleMealCategories.some((mc) => mealCategorySlugs.includes(mc)),
  );
}
