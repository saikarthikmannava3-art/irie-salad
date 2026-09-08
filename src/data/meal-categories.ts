import type { DeliveryWindow, MealCategory, MealOccasion } from "@/types/domain";

export const MEAL_CATEGORIES: MealCategory[] = [
  // === BREAKFAST (Morning Delivery) ===
  {
    id: "mc-01",
    slug: "irie-breakfast",
    name: "irie breakfast",
    shortName: "Breakfast",
    description: "A different wholesome Indian breakfast every day. Idli, dosa, paratha, pongal and more. Chef-curated daily menu.",
    mealOccasion: "breakfast",
    deliveryWindow: "morning",
    image: "/images/meal-categories/irie-breakfast.jpg",
    isActive: true,
    sortOrder: 1,
  },

  // === LUNCH (Morning Delivery) ===
  {
    id: "mc-02",
    slug: "irie-lunch-thali",
    name: "irie lunch thali",
    shortName: "Lunch Thali",
    description: "A complete Indian thali with dal, sabzi, rice, roti and accompaniments. Daily recipe rotates across regions.",
    mealOccasion: "lunch",
    deliveryWindow: "morning",
    image: "/images/meal-categories/irie-lunch-thali.jpg",
    isActive: true,
    sortOrder: 2,
  },
  {
    id: "mc-03",
    slug: "irie-biryani",
    name: "irie biryani",
    shortName: "Biryani",
    description: "Aromatic vegetable biryani or pulao, slow-cooked daily. Served with raita and accompaniments.",
    mealOccasion: "lunch",
    deliveryWindow: "morning",
    image: "/images/meal-categories/irie-biryani.jpg",
    isActive: true,
    sortOrder: 3,
  },
  {
    id: "mc-04",
    slug: "signature-irie-salad-350",
    name: "signature irie salad (350g)",
    shortName: "Salad 350g",
    description: "Our signature fresh salad with your choice of Tofu, Paneer, or Garden style. 350g portion.",
    mealOccasion: "lunch",
    deliveryWindow: "morning",
    image: "/images/meal-categories/signature-irie-salad.jpg",
    isActive: true,
    sortOrder: 4,
  },
  {
    id: "mc-05",
    slug: "signature-irie-salad-500",
    name: "signature irie salad (500g)",
    shortName: "Salad 500g",
    description: "Our signature fresh salad with your choice of Tofu, Paneer, or Garden style. Generous 500g portion.",
    mealOccasion: "lunch",
    deliveryWindow: "morning",
    image: "/images/meal-categories/signature-irie-salad.jpg",
    isActive: true,
    sortOrder: 5,
  },

  // === EVENING SNACK (Evening Delivery) ===
  {
    id: "mc-06",
    slug: "irie-evening-snack",
    name: "irie evening snack",
    shortName: "Eve Snack",
    description: "A healthy Indian snack for your evening. Chaat, dhokla, sundal and more. Changes daily.",
    mealOccasion: "evening-snack",
    deliveryWindow: "evening",
    image: "/images/meal-categories/irie-evening-snack.jpg",
    isActive: true,
    sortOrder: 6,
  },
  {
    id: "mc-07",
    slug: "fresh-seasonal-fruit-bowl",
    name: "Fresh Seasonal Fruit Bowl",
    shortName: "Fruit Bowl",
    description: "Hand-cut seasonal fruits, freshly assembled daily based on market availability.",
    mealOccasion: "evening-snack",
    deliveryWindow: "evening",
    image: "/images/meal-categories/fresh-seasonal-fruit-bowl.jpg",
    isActive: true,
    sortOrder: 7,
  },

  // === DINNER (Evening Delivery) ===
  {
    id: "mc-08",
    slug: "irie-dinner",
    name: "irie dinner",
    shortName: "Dinner",
    description: "A light, balanced Indian dinner. Khichdi, roti-dal, dosa, soup and more. Daily recipe rotates.",
    mealOccasion: "dinner",
    deliveryWindow: "evening",
    image: "/images/meal-categories/irie-dinner.jpg",
    isActive: true,
    sortOrder: 8,
  },
  {
    id: "mc-09",
    slug: "irie-millet-dinner",
    name: "irie millet dinner",
    shortName: "Millet Dinner",
    description: "Nutritious millet-based dinner. Bajra roti, ragi roti, jowar preparations. High fiber, gluten-free options.",
    mealOccasion: "dinner",
    deliveryWindow: "evening",
    image: "/images/meal-categories/irie-millet-dinner.jpg",
    isActive: true,
    sortOrder: 9,
  },

  // === ADD-ON ONLY (not subscribable alone) ===
  {
    id: "mc-10",
    slug: "tropical-smoothie-bowl",
    name: "Tropical Smoothie Bowl",
    shortName: "Smoothie Bowl",
    description: "Thick, creamy smoothie bowl topped with fresh fruits and granola. Add-on only. Pair with a breakfast or lunch subscription.",
    mealOccasion: "breakfast",
    deliveryWindow: "morning",
    image: "/images/meal-categories/tropical-smoothie-bowl.jpg",
    isActive: true,
    sortOrder: 10,
  },
  {
    id: "mc-11",
    slug: "coconut-overnight-oats",
    name: "Coconut Overnight Oats",
    shortName: "Overnight Oats",
    description: "Creamy coconut-based overnight oats in Fruit, Chocolate, or Seasonal varieties. Add-on only.",
    mealOccasion: "breakfast",
    deliveryWindow: "morning",
    image: "/images/meal-categories/coconut-overnight-oats.jpg",
    isActive: true,
    sortOrder: 11,
  },
  {
    id: "mc-12",
    slug: "fresh-detox-juice",
    name: "Fresh Detox Juice",
    shortName: "Detox Juice",
    description: "Cold-pressed detox juice made fresh every morning. Add-on only. Must be ordered with another meal.",
    mealOccasion: "breakfast",
    deliveryWindow: "morning",
    image: "/images/meal-categories/fresh-detox-juice.jpg",
    isActive: true,
    sortOrder: 12,
  },
];

/** Meal category slugs that cannot be subscribed to independently */
export const ADDON_ONLY_SLUGS = [
  "tropical-smoothie-bowl",
  "coconut-overnight-oats",
  "fresh-detox-juice",
] as const;

// === Helper Functions ===

export function getMealCategoryBySlug(slug: string): MealCategory | undefined {
  return MEAL_CATEGORIES.find((mc) => mc.slug === slug);
}

export function getActiveMealCategories(): MealCategory[] {
  return MEAL_CATEGORIES.filter((mc) => mc.isActive).sort((a, b) => a.sortOrder - b.sortOrder);
}

export function getMealCategoriesByOccasion(occasion: MealOccasion): MealCategory[] {
  return MEAL_CATEGORIES.filter((mc) => mc.isActive && mc.mealOccasion === occasion)
    .sort((a, b) => a.sortOrder - b.sortOrder);
}

export function getMealCategoriesByDeliveryWindow(window: DeliveryWindow): MealCategory[] {
  return MEAL_CATEGORIES.filter((mc) => mc.isActive && mc.deliveryWindow === window)
    .sort((a, b) => a.sortOrder - b.sortOrder);
}

export function isAddonOnly(slug: string): boolean {
  return (ADDON_ONLY_SLUGS as readonly string[]).includes(slug);
}
