import type { DailyMenuEntry, DailyMenuItem } from "@/types/domain";

// === NEW: irie kitchen Daily Menu (meal category → recipe mapping) ===

export const DAILY_MENU_ENTRIES: DailyMenuEntry[] = [
  // ========== Aug 16 (Sat) ==========
  // Morning delivery
  { id: "dme-0816-01", date: "2026-08-16", mealCategorySlug: "irie-breakfast", recipeSlug: "masala-dosa", deliveryWindow: "morning", mealOccasion: "breakfast" },
  { id: "dme-0816-02", date: "2026-08-16", mealCategorySlug: "irie-lunch-thali", recipeSlug: "roti-sabzi-thali", deliveryWindow: "morning", mealOccasion: "lunch" },
  { id: "dme-0816-03", date: "2026-08-16", mealCategorySlug: "irie-biryani", recipeSlug: "veg-biryani", deliveryWindow: "morning", mealOccasion: "lunch" },
  { id: "dme-0816-04", date: "2026-08-16", mealCategorySlug: "signature-irie-salad-350", recipeSlug: "signature-irie-salad", deliveryWindow: "morning", mealOccasion: "lunch" },
  { id: "dme-0816-05", date: "2026-08-16", mealCategorySlug: "signature-irie-salad-500", recipeSlug: "signature-irie-salad", deliveryWindow: "morning", mealOccasion: "lunch" },
  { id: "dme-0816-06", date: "2026-08-16", mealCategorySlug: "tropical-smoothie-bowl", recipeSlug: "tropical-smoothie-bowl", deliveryWindow: "morning", mealOccasion: "breakfast" },
  { id: "dme-0816-07", date: "2026-08-16", mealCategorySlug: "coconut-overnight-oats", recipeSlug: "coconut-overnight-oats", deliveryWindow: "morning", mealOccasion: "breakfast" },
  { id: "dme-0816-08", date: "2026-08-16", mealCategorySlug: "fresh-detox-juice", recipeSlug: "fresh-detox-juice", deliveryWindow: "morning", mealOccasion: "breakfast" },
  // Evening delivery
  { id: "dme-0816-09", date: "2026-08-16", mealCategorySlug: "irie-evening-snack", recipeSlug: "sprout-chaat", deliveryWindow: "evening", mealOccasion: "evening-snack" },
  { id: "dme-0816-10", date: "2026-08-16", mealCategorySlug: "fresh-seasonal-fruit-bowl", recipeSlug: "fresh-fruit-bowl", deliveryWindow: "evening", mealOccasion: "evening-snack" },
  { id: "dme-0816-11", date: "2026-08-16", mealCategorySlug: "irie-dinner", recipeSlug: "light-khichdi", deliveryWindow: "evening", mealOccasion: "dinner" },
  { id: "dme-0816-12", date: "2026-08-16", mealCategorySlug: "irie-millet-dinner", recipeSlug: "bajra-roti-sabzi", deliveryWindow: "evening", mealOccasion: "dinner" },

  // ========== Aug 17 (Sun) ==========
  { id: "dme-0817-01", date: "2026-08-17", mealCategorySlug: "irie-breakfast", recipeSlug: "aloo-paratha", deliveryWindow: "morning", mealOccasion: "breakfast" },
  { id: "dme-0817-02", date: "2026-08-17", mealCategorySlug: "irie-lunch-thali", recipeSlug: "south-indian-thali", deliveryWindow: "morning", mealOccasion: "lunch" },
  { id: "dme-0817-03", date: "2026-08-17", mealCategorySlug: "irie-biryani", recipeSlug: "veg-pulao", deliveryWindow: "morning", mealOccasion: "lunch" },
  { id: "dme-0817-04", date: "2026-08-17", mealCategorySlug: "signature-irie-salad-350", recipeSlug: "signature-irie-salad", deliveryWindow: "morning", mealOccasion: "lunch" },
  { id: "dme-0817-05", date: "2026-08-17", mealCategorySlug: "signature-irie-salad-500", recipeSlug: "signature-irie-salad", deliveryWindow: "morning", mealOccasion: "lunch" },
  { id: "dme-0817-06", date: "2026-08-17", mealCategorySlug: "tropical-smoothie-bowl", recipeSlug: "tropical-smoothie-bowl", deliveryWindow: "morning", mealOccasion: "breakfast" },
  { id: "dme-0817-07", date: "2026-08-17", mealCategorySlug: "coconut-overnight-oats", recipeSlug: "coconut-overnight-oats", deliveryWindow: "morning", mealOccasion: "breakfast" },
  { id: "dme-0817-08", date: "2026-08-17", mealCategorySlug: "fresh-detox-juice", recipeSlug: "fresh-detox-juice", deliveryWindow: "morning", mealOccasion: "breakfast" },
  { id: "dme-0817-09", date: "2026-08-17", mealCategorySlug: "irie-evening-snack", recipeSlug: "dhokla", deliveryWindow: "evening", mealOccasion: "evening-snack" },
  { id: "dme-0817-10", date: "2026-08-17", mealCategorySlug: "fresh-seasonal-fruit-bowl", recipeSlug: "fresh-fruit-bowl", deliveryWindow: "evening", mealOccasion: "evening-snack" },
  { id: "dme-0817-11", date: "2026-08-17", mealCategorySlug: "irie-dinner", recipeSlug: "roti-dal-dinner", deliveryWindow: "evening", mealOccasion: "dinner" },
  { id: "dme-0817-12", date: "2026-08-17", mealCategorySlug: "irie-millet-dinner", recipeSlug: "ragi-roti-dinner", deliveryWindow: "evening", mealOccasion: "dinner" },

  // ========== Aug 18 (Mon) ==========
  { id: "dme-0818-01", date: "2026-08-18", mealCategorySlug: "irie-breakfast", recipeSlug: "idli-sambar", deliveryWindow: "morning", mealOccasion: "breakfast" },
  { id: "dme-0818-02", date: "2026-08-18", mealCategorySlug: "irie-lunch-thali", recipeSlug: "rajma-chawal", deliveryWindow: "morning", mealOccasion: "lunch" },
  { id: "dme-0818-03", date: "2026-08-18", mealCategorySlug: "irie-biryani", recipeSlug: "veg-biryani", deliveryWindow: "morning", mealOccasion: "lunch" },
  { id: "dme-0818-04", date: "2026-08-18", mealCategorySlug: "signature-irie-salad-350", recipeSlug: "signature-irie-salad", deliveryWindow: "morning", mealOccasion: "lunch" },
  { id: "dme-0818-05", date: "2026-08-18", mealCategorySlug: "signature-irie-salad-500", recipeSlug: "signature-irie-salad", deliveryWindow: "morning", mealOccasion: "lunch" },
  { id: "dme-0818-06", date: "2026-08-18", mealCategorySlug: "tropical-smoothie-bowl", recipeSlug: "tropical-smoothie-bowl", deliveryWindow: "morning", mealOccasion: "breakfast" },
  { id: "dme-0818-07", date: "2026-08-18", mealCategorySlug: "coconut-overnight-oats", recipeSlug: "coconut-overnight-oats", deliveryWindow: "morning", mealOccasion: "breakfast" },
  { id: "dme-0818-08", date: "2026-08-18", mealCategorySlug: "fresh-detox-juice", recipeSlug: "fresh-detox-juice", deliveryWindow: "morning", mealOccasion: "breakfast" },
  { id: "dme-0818-09", date: "2026-08-18", mealCategorySlug: "irie-evening-snack", recipeSlug: "evening-idli", deliveryWindow: "evening", mealOccasion: "evening-snack" },
  { id: "dme-0818-10", date: "2026-08-18", mealCategorySlug: "fresh-seasonal-fruit-bowl", recipeSlug: "fresh-fruit-bowl", deliveryWindow: "evening", mealOccasion: "evening-snack" },
  { id: "dme-0818-11", date: "2026-08-18", mealCategorySlug: "irie-dinner", recipeSlug: "dinner-dosa", deliveryWindow: "evening", mealOccasion: "dinner" },
  { id: "dme-0818-12", date: "2026-08-18", mealCategorySlug: "irie-millet-dinner", recipeSlug: "bajra-roti-sabzi", deliveryWindow: "evening", mealOccasion: "dinner" },

  // ========== Aug 19 (Tue) ==========
  { id: "dme-0819-01", date: "2026-08-19", mealCategorySlug: "irie-breakfast", recipeSlug: "ven-pongal", deliveryWindow: "morning", mealOccasion: "breakfast" },
  { id: "dme-0819-02", date: "2026-08-19", mealCategorySlug: "irie-lunch-thali", recipeSlug: "chole-rice", deliveryWindow: "morning", mealOccasion: "lunch" },
  { id: "dme-0819-03", date: "2026-08-19", mealCategorySlug: "irie-biryani", recipeSlug: "bisi-bele-bath", deliveryWindow: "morning", mealOccasion: "lunch" },
  { id: "dme-0819-04", date: "2026-08-19", mealCategorySlug: "signature-irie-salad-350", recipeSlug: "signature-irie-salad", deliveryWindow: "morning", mealOccasion: "lunch" },
  { id: "dme-0819-05", date: "2026-08-19", mealCategorySlug: "signature-irie-salad-500", recipeSlug: "signature-irie-salad", deliveryWindow: "morning", mealOccasion: "lunch" },
  { id: "dme-0819-06", date: "2026-08-19", mealCategorySlug: "tropical-smoothie-bowl", recipeSlug: "tropical-smoothie-bowl", deliveryWindow: "morning", mealOccasion: "breakfast" },
  { id: "dme-0819-07", date: "2026-08-19", mealCategorySlug: "coconut-overnight-oats", recipeSlug: "coconut-overnight-oats", deliveryWindow: "morning", mealOccasion: "breakfast" },
  { id: "dme-0819-08", date: "2026-08-19", mealCategorySlug: "fresh-detox-juice", recipeSlug: "fresh-detox-juice", deliveryWindow: "morning", mealOccasion: "breakfast" },
  { id: "dme-0819-09", date: "2026-08-19", mealCategorySlug: "irie-evening-snack", recipeSlug: "masala-corn-cup", deliveryWindow: "evening", mealOccasion: "evening-snack" },
  { id: "dme-0819-10", date: "2026-08-19", mealCategorySlug: "fresh-seasonal-fruit-bowl", recipeSlug: "fresh-fruit-bowl", deliveryWindow: "evening", mealOccasion: "evening-snack" },
  { id: "dme-0819-11", date: "2026-08-19", mealCategorySlug: "irie-dinner", recipeSlug: "rice-rasam", deliveryWindow: "evening", mealOccasion: "dinner" },
  { id: "dme-0819-12", date: "2026-08-19", mealCategorySlug: "irie-millet-dinner", recipeSlug: "ragi-roti-dinner", deliveryWindow: "evening", mealOccasion: "dinner" },

  // ========== Aug 20 (Wed) ==========
  { id: "dme-0820-01", date: "2026-08-20", mealCategorySlug: "irie-breakfast", recipeSlug: "poha", deliveryWindow: "morning", mealOccasion: "breakfast" },
  { id: "dme-0820-02", date: "2026-08-20", mealCategorySlug: "irie-lunch-thali", recipeSlug: "paneer-butter-masala-rice", deliveryWindow: "morning", mealOccasion: "lunch" },
  { id: "dme-0820-03", date: "2026-08-20", mealCategorySlug: "irie-biryani", recipeSlug: "veg-pulao", deliveryWindow: "morning", mealOccasion: "lunch" },
  { id: "dme-0820-04", date: "2026-08-20", mealCategorySlug: "signature-irie-salad-350", recipeSlug: "signature-irie-salad", deliveryWindow: "morning", mealOccasion: "lunch" },
  { id: "dme-0820-05", date: "2026-08-20", mealCategorySlug: "signature-irie-salad-500", recipeSlug: "signature-irie-salad", deliveryWindow: "morning", mealOccasion: "lunch" },
  { id: "dme-0820-06", date: "2026-08-20", mealCategorySlug: "tropical-smoothie-bowl", recipeSlug: "tropical-smoothie-bowl", deliveryWindow: "morning", mealOccasion: "breakfast" },
  { id: "dme-0820-07", date: "2026-08-20", mealCategorySlug: "coconut-overnight-oats", recipeSlug: "coconut-overnight-oats", deliveryWindow: "morning", mealOccasion: "breakfast" },
  { id: "dme-0820-08", date: "2026-08-20", mealCategorySlug: "fresh-detox-juice", recipeSlug: "fresh-detox-juice", deliveryWindow: "morning", mealOccasion: "breakfast" },
  { id: "dme-0820-09", date: "2026-08-20", mealCategorySlug: "irie-evening-snack", recipeSlug: "sundal", deliveryWindow: "evening", mealOccasion: "evening-snack" },
  { id: "dme-0820-10", date: "2026-08-20", mealCategorySlug: "fresh-seasonal-fruit-bowl", recipeSlug: "fresh-fruit-bowl", deliveryWindow: "evening", mealOccasion: "evening-snack" },
  { id: "dme-0820-11", date: "2026-08-20", mealCategorySlug: "irie-dinner", recipeSlug: "dinner-pongal", deliveryWindow: "evening", mealOccasion: "dinner" },
  { id: "dme-0820-12", date: "2026-08-20", mealCategorySlug: "irie-millet-dinner", recipeSlug: "bajra-roti-sabzi", deliveryWindow: "evening", mealOccasion: "dinner" },

  // ========== Aug 21 (Thu) ==========
  { id: "dme-0821-01", date: "2026-08-21", mealCategorySlug: "irie-breakfast", recipeSlug: "pesarattu", deliveryWindow: "morning", mealOccasion: "breakfast" },
  { id: "dme-0821-02", date: "2026-08-21", mealCategorySlug: "irie-lunch-thali", recipeSlug: "sambar-rice", deliveryWindow: "morning", mealOccasion: "lunch" },
  { id: "dme-0821-03", date: "2026-08-21", mealCategorySlug: "irie-biryani", recipeSlug: "veg-biryani", deliveryWindow: "morning", mealOccasion: "lunch" },
  { id: "dme-0821-04", date: "2026-08-21", mealCategorySlug: "signature-irie-salad-350", recipeSlug: "signature-irie-salad", deliveryWindow: "morning", mealOccasion: "lunch" },
  { id: "dme-0821-05", date: "2026-08-21", mealCategorySlug: "signature-irie-salad-500", recipeSlug: "signature-irie-salad", deliveryWindow: "morning", mealOccasion: "lunch" },
  { id: "dme-0821-06", date: "2026-08-21", mealCategorySlug: "tropical-smoothie-bowl", recipeSlug: "tropical-smoothie-bowl", deliveryWindow: "morning", mealOccasion: "breakfast" },
  { id: "dme-0821-07", date: "2026-08-21", mealCategorySlug: "coconut-overnight-oats", recipeSlug: "coconut-overnight-oats", deliveryWindow: "morning", mealOccasion: "breakfast" },
  { id: "dme-0821-08", date: "2026-08-21", mealCategorySlug: "fresh-detox-juice", recipeSlug: "fresh-detox-juice", deliveryWindow: "morning", mealOccasion: "breakfast" },
  { id: "dme-0821-09", date: "2026-08-21", mealCategorySlug: "irie-evening-snack", recipeSlug: "makhana-snack", deliveryWindow: "evening", mealOccasion: "evening-snack" },
  { id: "dme-0821-10", date: "2026-08-21", mealCategorySlug: "fresh-seasonal-fruit-bowl", recipeSlug: "fresh-fruit-bowl", deliveryWindow: "evening", mealOccasion: "evening-snack" },
  { id: "dme-0821-11", date: "2026-08-21", mealCategorySlug: "irie-dinner", recipeSlug: "chapati-sabzi-dinner", deliveryWindow: "evening", mealOccasion: "dinner" },
  { id: "dme-0821-12", date: "2026-08-21", mealCategorySlug: "irie-millet-dinner", recipeSlug: "ragi-roti-dinner", deliveryWindow: "evening", mealOccasion: "dinner" },

  // ========== Aug 22 (Fri) ==========
  { id: "dme-0822-01", date: "2026-08-22", mealCategorySlug: "irie-breakfast", recipeSlug: "mixed-veg-uttapam", deliveryWindow: "morning", mealOccasion: "breakfast" },
  { id: "dme-0822-02", date: "2026-08-22", mealCategorySlug: "irie-lunch-thali", recipeSlug: "dal-rice", deliveryWindow: "morning", mealOccasion: "lunch" },
  { id: "dme-0822-03", date: "2026-08-22", mealCategorySlug: "irie-biryani", recipeSlug: "bisi-bele-bath", deliveryWindow: "morning", mealOccasion: "lunch" },
  { id: "dme-0822-04", date: "2026-08-22", mealCategorySlug: "signature-irie-salad-350", recipeSlug: "signature-irie-salad", deliveryWindow: "morning", mealOccasion: "lunch" },
  { id: "dme-0822-05", date: "2026-08-22", mealCategorySlug: "signature-irie-salad-500", recipeSlug: "signature-irie-salad", deliveryWindow: "morning", mealOccasion: "lunch" },
  { id: "dme-0822-06", date: "2026-08-22", mealCategorySlug: "tropical-smoothie-bowl", recipeSlug: "tropical-smoothie-bowl", deliveryWindow: "morning", mealOccasion: "breakfast" },
  { id: "dme-0822-07", date: "2026-08-22", mealCategorySlug: "coconut-overnight-oats", recipeSlug: "coconut-overnight-oats", deliveryWindow: "morning", mealOccasion: "breakfast" },
  { id: "dme-0822-08", date: "2026-08-22", mealCategorySlug: "fresh-detox-juice", recipeSlug: "fresh-detox-juice", deliveryWindow: "morning", mealOccasion: "breakfast" },
  { id: "dme-0822-09", date: "2026-08-22", mealCategorySlug: "irie-evening-snack", recipeSlug: "samosa-chaat", deliveryWindow: "evening", mealOccasion: "evening-snack" },
  { id: "dme-0822-10", date: "2026-08-22", mealCategorySlug: "fresh-seasonal-fruit-bowl", recipeSlug: "fresh-fruit-bowl", deliveryWindow: "evening", mealOccasion: "evening-snack" },
  { id: "dme-0822-11", date: "2026-08-22", mealCategorySlug: "irie-dinner", recipeSlug: "curd-rice", deliveryWindow: "evening", mealOccasion: "dinner" },
  { id: "dme-0822-12", date: "2026-08-22", mealCategorySlug: "irie-millet-dinner", recipeSlug: "bajra-roti-sabzi", deliveryWindow: "evening", mealOccasion: "dinner" },
];

// === New helpers ===

export function getDailyMenuEntries(date: string, mealCategorySlug?: string): DailyMenuEntry[] {
  return DAILY_MENU_ENTRIES.filter((item) => {
    if (item.date !== date) return false;
    if (mealCategorySlug && item.mealCategorySlug !== mealCategorySlug) return false;
    return true;
  });
}

export function getDailyMenuEntriesByWindow(date: string, window: "morning" | "evening"): DailyMenuEntry[] {
  return DAILY_MENU_ENTRIES.filter((item) => item.date === date && item.deliveryWindow === window);
}

export function getTodayMenuEntries(): DailyMenuEntry[] {
  const today = new Date().toISOString().split("T")[0];
  return getDailyMenuEntries(today);
}

// === LEGACY: Old DailyMenuItem format for backward compat ===
// The ops daily-menu page still imports getDailyMenu.

export const DAILY_MENU: DailyMenuItem[] = [
  // Aug 16 (Sat)
  { id: "dm-0816-smoothie", date: "2026-08-16", productSlug: "tropical-smoothie-bowl", dailyName: "Chikoo Cashew Bowl", dailyDescription: "Sapota, cashew milk, dates, topped with toasted coconut" },
  { id: "dm-0816-fruit", date: "2026-08-16", productSlug: "fresh-seasonal-fruit-bowl", dailyName: "Mixed Berry Bonanza", dailyDescription: "Strawberry, raspberry, blueberry, blackberry, honey drizzle" },
  { id: "dm-0816-millet", date: "2026-08-16", productSlug: "irie-millet-wellness-bowl", dailyName: "Pearl Millet Khichdi Bowl", dailyDescription: "Pearl millet khichdi, dal tadka, pickled onions, papad" },
  { id: "dm-0816-power", date: "2026-08-16", productSlug: "irie-power-meal", dailyName: "Paneer Butter Masala Thali", dailyDescription: "Paneer butter masala, roti, rice, dal, salad" },
  { id: "dm-0816-juice", date: "2026-08-16", productSlug: "fresh-detox-juice", dailyName: "Watermelon Rose Refresh", dailyDescription: "Watermelon, rose water, lime, chia seeds" },

  // Aug 17 (Sun)
  { id: "dm-0817-smoothie", date: "2026-08-17", productSlug: "tropical-smoothie-bowl", dailyName: "Avocado Matcha Bowl", dailyDescription: "Avocado, matcha, banana, topped with hemp seeds and berries" },
  { id: "dm-0817-fruit", date: "2026-08-17", productSlug: "fresh-seasonal-fruit-bowl", dailyName: "Dragon Fruit Delight", dailyDescription: "Dragon fruit, kiwi, starfruit, passion fruit" },
  { id: "dm-0817-millet", date: "2026-08-17", productSlug: "irie-millet-wellness-bowl", dailyName: "Jowar Tikki Bowl", dailyDescription: "Sorghum tikkis, mixed greens, beetroot hummus, tahini" },
  { id: "dm-0817-power", date: "2026-08-17", productSlug: "irie-power-meal", dailyName: "South Indian Thali", dailyDescription: "Sambar, rasam, poriyal, rice, papad, curd" },
  { id: "dm-0817-juice", date: "2026-08-17", productSlug: "fresh-detox-juice", dailyName: "Karela Amla Shot", dailyDescription: "Bitter gourd, amla, ginger, lemon, honey" },

  // Aug 18 (Mon)
  { id: "dm-0818-smoothie", date: "2026-08-18", productSlug: "tropical-smoothie-bowl", dailyName: "Mango Passion Smoothie Bowl", dailyDescription: "Alphonso mango, passion fruit, coconut flakes, chia seeds" },
  { id: "dm-0818-fruit", date: "2026-08-18", productSlug: "fresh-seasonal-fruit-bowl", dailyName: "Monsoon Mango Medley", dailyDescription: "Alphonso mango, papaya, pomegranate, fresh mint" },
  { id: "dm-0818-millet", date: "2026-08-18", productSlug: "irie-millet-wellness-bowl", dailyName: "Ragi Mushroom Bowl", dailyDescription: "Finger millet with sauteed mushrooms, baby spinach, tahini dressing" },
  { id: "dm-0818-power", date: "2026-08-18", productSlug: "irie-power-meal", dailyName: "Rajma Chawal Thali", dailyDescription: "Rajma, rice, salad, pickle, papad" },
  { id: "dm-0818-juice", date: "2026-08-18", productSlug: "fresh-detox-juice", dailyName: "Green Goddess Cleanse", dailyDescription: "Cucumber, celery, green apple, ginger, lemon" },

  // Aug 19 (Tue)
  { id: "dm-0819-smoothie", date: "2026-08-19", productSlug: "tropical-smoothie-bowl", dailyName: "Berry Blast Smoothie Bowl", dailyDescription: "Mixed berries, banana, acai, granola, honey" },
  { id: "dm-0819-fruit", date: "2026-08-19", productSlug: "fresh-seasonal-fruit-bowl", dailyName: "Tropical Citrus Mix", dailyDescription: "Orange, grapefruit, kiwi, pineapple, fresh basil" },
  { id: "dm-0819-millet", date: "2026-08-19", productSlug: "irie-millet-wellness-bowl", dailyName: "Foxtail Millet Veggie Bowl", dailyDescription: "Foxtail millet, roasted sweet potato, chickpeas, lemon herb dressing" },
  { id: "dm-0819-power", date: "2026-08-19", productSlug: "irie-power-meal", dailyName: "Chole Rice Thali", dailyDescription: "Chole, jeera rice, pickled onion, papad" },
  { id: "dm-0819-juice", date: "2026-08-19", productSlug: "fresh-detox-juice", dailyName: "Beetroot Ginger Blast", dailyDescription: "Beetroot, carrot, ginger, orange, turmeric" },

  // Aug 20 (Wed)
  { id: "dm-0820-smoothie", date: "2026-08-20", productSlug: "tropical-smoothie-bowl", dailyName: "Papaya Sunrise Bowl", dailyDescription: "Fresh papaya, banana, coconut milk, almonds, seeds" },
  { id: "dm-0820-fruit", date: "2026-08-20", productSlug: "fresh-seasonal-fruit-bowl", dailyName: "Watermelon & Berry Splash", dailyDescription: "Watermelon, strawberry, blueberry, fresh mint leaves" },
  { id: "dm-0820-millet", date: "2026-08-20", productSlug: "irie-millet-wellness-bowl", dailyName: "Barnyard Millet Curry Bowl", dailyDescription: "Barnyard millet, seasonal curry, raita, crunchy papad" },
  { id: "dm-0820-power", date: "2026-08-20", productSlug: "irie-power-meal", dailyName: "Paneer Butter Masala with Rice", dailyDescription: "Paneer butter masala, basmati rice, salad" },
  { id: "dm-0820-juice", date: "2026-08-20", productSlug: "fresh-detox-juice", dailyName: "Pineapple Mint Cooler", dailyDescription: "Pineapple, mint, cucumber, lime, black salt" },

  // Aug 21 (Thu)
  { id: "dm-0821-smoothie", date: "2026-08-21", productSlug: "tropical-smoothie-bowl", dailyName: "Muskmelon Dream Bowl", dailyDescription: "Sweet muskmelon, dates, cardamom, pistachios" },
  { id: "dm-0821-fruit", date: "2026-08-21", productSlug: "fresh-seasonal-fruit-bowl", dailyName: "Stone Fruit Harvest", dailyDescription: "Peach, plum, grapes, pomegranate arils" },
  { id: "dm-0821-millet", date: "2026-08-21", productSlug: "irie-millet-wellness-bowl", dailyName: "Kodo Millet Stir-fry Bowl", dailyDescription: "Kodo millet, Asian vegetables, peanut sauce, crispy onions" },
  { id: "dm-0821-power", date: "2026-08-21", productSlug: "irie-power-meal", dailyName: "Sambar Rice Thali", dailyDescription: "Sambar, rice, poriyal, rasam, papad" },
  { id: "dm-0821-juice", date: "2026-08-21", productSlug: "fresh-detox-juice", dailyName: "ABC Immunity Boost", dailyDescription: "Apple, beetroot, carrot, amla, black pepper" },

  // Aug 22 (Fri)
  { id: "dm-0822-smoothie", date: "2026-08-22", productSlug: "tropical-smoothie-bowl", dailyName: "Banana Cacao Bowl", dailyDescription: "Banana, raw cacao, almond butter, cacao nibs" },
  { id: "dm-0822-fruit", date: "2026-08-22", productSlug: "fresh-seasonal-fruit-bowl", dailyName: "Indian Summer Platter", dailyDescription: "Mango, litchi, custard apple, sapota" },
  { id: "dm-0822-millet", date: "2026-08-22", productSlug: "irie-millet-wellness-bowl", dailyName: "Little Millet Pongal Bowl", dailyDescription: "Little millet pongal, coconut chutney, mixed vegetables" },
  { id: "dm-0822-power", date: "2026-08-22", productSlug: "irie-power-meal", dailyName: "Dal Rice Thali", dailyDescription: "Dal tadka, steamed rice, papad, salad" },
  { id: "dm-0822-juice", date: "2026-08-22", productSlug: "fresh-detox-juice", dailyName: "Citrus Glow", dailyDescription: "Orange, lemon, grapefruit, raw honey, turmeric" },
];

/** @deprecated Use getDailyMenuEntries */
export function getDailyMenu(date: string, productSlug?: string): DailyMenuItem[] {
  return DAILY_MENU.filter((item) => {
    if (item.date !== date) return false;
    if (productSlug && item.productSlug !== productSlug) return false;
    return true;
  });
}

/** @deprecated Use getTodayMenuEntries */
export function getTodayMenu(): DailyMenuItem[] {
  const today = new Date().toISOString().split("T")[0];
  return getDailyMenu(today);
}
