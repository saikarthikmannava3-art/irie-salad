// LEGACY: This file is kept for backward compatibility during the IRIE Salad to IRIE Kitchen transition.
// New code should use recipes.ts and meal-categories.ts instead.
// Do not add new products here. Add recipes to src/data/recipes.ts and meal categories to src/data/meal-categories.ts.

import type { Product } from "@/types/domain";

export const PRODUCTS: Product[] = [
  {
    id: "prod-1",
    slug: "signature-irie-salad",
    name: "Signature IRIE Salad",
    shortName: "IRIE Salad",
    description: "Our signature fresh salad with your choice of protein: Tofu, Paneer, or Garden style. Made daily with locally sourced ingredients.",
    category: "Salads",
    image: "/images/salads/mediterranean-power-bowl.jpg",
    nutrition: { calories: 380, proteinG: 24, fiberG: 8 },
    tags: ["Signature", "Customizable"],
    variants: [
      { id: "salad-tofu-350", label: "Tofu 350g", slug: "tofu-350g", variantType: "tofu", size: "350g", isDailyMenu: false },
      { id: "salad-paneer-350", label: "Paneer 350g", slug: "paneer-350g", variantType: "paneer", size: "350g", isDailyMenu: false },
      { id: "salad-garden-350", label: "Garden 350g", slug: "garden-350g", variantType: "garden", size: "350g", isDailyMenu: false },
      { id: "salad-tofu-500", label: "Tofu 500g", slug: "tofu-500g", variantType: "tofu", size: "500g", isDailyMenu: false },
      { id: "salad-paneer-500", label: "Paneer 500g", slug: "paneer-500g", variantType: "paneer", size: "500g", isDailyMenu: false },
      { id: "salad-garden-500", label: "Garden 500g", slug: "garden-500g", variantType: "garden", size: "500g", isDailyMenu: false },
    ],
    hasDailyMenu: false,
    isActive: true,
    sortOrder: 1,
  },
  {
    id: "prod-2",
    slug: "coconut-overnight-oats",
    name: "Signature Coconut Overnight Oats",
    shortName: "Overnight Oats",
    description: "Creamy coconut-based overnight oats with your choice of Fruit, Chocolate, or Seasonal Specials. Prepared fresh every evening.",
    category: "Breakfast",
    image: "/images/products/coconut-overnight-oats.jpg",
    nutrition: { calories: 320, proteinG: 12, fiberG: 6 },
    tags: ["Breakfast", "Vegetarian"],
    variants: [
      { id: "oats-fruit", label: "Fruit Oats", slug: "fruit", variantType: "fruit", isDailyMenu: false },
      { id: "oats-chocolate", label: "Chocolate Oats", slug: "chocolate", variantType: "chocolate", isDailyMenu: false },
      { id: "oats-seasonal", label: "Seasonal Special", slug: "seasonal", variantType: "seasonal", isDailyMenu: false },
    ],
    hasDailyMenu: false,
    isActive: true,
    sortOrder: 2,
  },
  {
    id: "prod-3",
    slug: "tropical-smoothie-bowl",
    name: "Tropical Smoothie Bowl",
    shortName: "Smoothie Bowl",
    description: "Thick, creamy smoothie bowl topped with fresh fruits and granola. Daily flavor rotates based on seasonal availability.",
    category: "Bowls",
    image: "/images/products/tropical-smoothie-bowl.jpg",
    nutrition: { calories: 290, proteinG: 8, fiberG: 7 },
    tags: ["Vegan", "Daily Special"],
    variants: [
      { id: "smoothie-default", label: "Smoothie Bowl", slug: "default", isDailyMenu: true },
    ],
    hasDailyMenu: true,
    isActive: true,
    sortOrder: 3,
  },
  {
    id: "prod-4",
    slug: "fresh-seasonal-fruit-bowl",
    name: "Fresh Seasonal Fruit Bowl",
    shortName: "Fruit Bowl",
    description: "A generous bowl of hand-cut seasonal fruits. Composition changes daily based on what's freshest at the market.",
    category: "Bowls",
    image: "/images/products/fresh-seasonal-fruit-bowl.jpg",
    nutrition: { calories: 220, proteinG: 3, fiberG: 5 },
    tags: ["Vegan", "Low Cal", "Daily Special"],
    variants: [
      { id: "fruit-default", label: "Fruit Bowl", slug: "default", isDailyMenu: true },
    ],
    hasDailyMenu: true,
    isActive: true,
    sortOrder: 4,
  },
  {
    id: "prod-5",
    slug: "irie-millet-wellness-bowl",
    name: "IRIE Millet Wellness Bowl",
    shortName: "Millet Bowl",
    description: "Nutritious millet-based bowl with seasonal vegetables and house dressing. Recipe rotates daily for variety.",
    category: "Bowls",
    image: "/images/products/irie-millet-wellness-bowl.jpg",
    nutrition: { calories: 360, proteinG: 14, fiberG: 10 },
    tags: ["High Fiber", "Millet", "Daily Special"],
    variants: [
      { id: "millet-default", label: "Millet Bowl", slug: "default", isDailyMenu: true },
    ],
    hasDailyMenu: true,
    isActive: true,
    sortOrder: 5,
  },
  {
    id: "prod-6",
    slug: "irie-power-meal",
    name: "IRIE Power Meal",
    shortName: "Power Meal",
    description: "A complete high-protein meal with balanced macros. Daily composition designed by our nutritionist.",
    category: "Meals",
    image: "/images/products/irie-power-meal.jpg",
    nutrition: { calories: 480, proteinG: 32, fiberG: 8 },
    tags: ["High Protein", "Daily Special"],
    variants: [
      { id: "power-default", label: "Power Meal", slug: "default", isDailyMenu: true },
    ],
    hasDailyMenu: true,
    isActive: true,
    sortOrder: 6,
  },
  {
    id: "prod-7",
    slug: "fresh-detox-juice",
    name: "Fresh Detox Juice",
    shortName: "Detox Juice",
    description: "Cold-pressed detox juice made fresh every morning. Recipe changes daily. Always refreshing, always nutritious.",
    category: "Juices",
    image: "/images/products/fresh-detox-juice.jpg",
    nutrition: { calories: 90, proteinG: 1, fiberG: 2 },
    tags: ["Vegan", "Low Cal", "Daily Special"],
    variants: [
      { id: "juice-default", label: "Detox Juice 220ml", slug: "default", size: "220ml", isDailyMenu: true },
    ],
    hasDailyMenu: true,
    isActive: true,
    sortOrder: 7,
  },
];

/** @deprecated Use getRecipeBySlug or getMealCategoryBySlug */
export function getProductBySlug(slug: string): Product | undefined {
  return PRODUCTS.find((p) => p.slug === slug);
}

export function getActiveProducts(): Product[] {
  return PRODUCTS.filter((p) => p.isActive).sort((a, b) => a.sortOrder - b.sortOrder);
}

export function getProductsByCategory(category: string): Product[] {
  return PRODUCTS.filter((p) => p.isActive && p.category === category);
}

export const PRODUCT_CATEGORIES = [...new Set(PRODUCTS.map((p) => p.category))];
