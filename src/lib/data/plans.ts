import { createClient } from "@/lib/supabase/server";
import {
  MEAL_CATEGORY_PRICING,
  getMealCategoryPrice,
} from "@/data/pricing";
import type {
  MealCategoryPricingEntry,
  PlanDuration,
} from "@/types/domain";
import type { Plan } from "@/types/domain";

// ---------------------------------------------------------------------------
// Supabase availability check
// ---------------------------------------------------------------------------

function isSupabaseConfigured(): boolean {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  return !!url && url !== "your-project-url" && !url.includes("placeholder");
}

// ---------------------------------------------------------------------------
// Static fallback helpers
// ---------------------------------------------------------------------------

const STATIC_PLANS: Plan[] = [
  {
    id: "plan-single",
    brand_id: "",
    name: "Single Meal",
    slug: "single",
    duration_days: 1,
    meals_per_day: 1,
    price_per_meal: 0,
    total_price: 0,
    discount_pct: 0,
    description: "Try any meal once. No commitment.",
    features: ["Any meal category", "No subscription required", "Order on demand"],
    is_trial: true,
    is_active: true,
    sort_order: 1,
    created_at: "",
  },
  {
    id: "plan-12",
    brand_id: "",
    name: "12-Meal Plan",
    slug: "12",
    duration_days: 12,
    meals_per_day: 1,
    price_per_meal: 0,
    total_price: 0,
    discount_pct: 10,
    description: "Perfect for trying out irie kitchen for a couple of weeks.",
    features: ["10% off menu price", "Pause or skip anytime", "Choose your meals daily"],
    is_trial: false,
    is_active: true,
    sort_order: 2,
    created_at: "",
  },
  {
    id: "plan-24",
    brand_id: "",
    name: "24-Meal Plan",
    slug: "24",
    duration_days: 24,
    meals_per_day: 1,
    price_per_meal: 0,
    total_price: 0,
    discount_pct: 20,
    description: "Our most popular plan. Great savings for a month of healthy eating.",
    features: ["20% off menu price", "Pause or skip anytime", "Priority delivery slots"],
    is_trial: false,
    is_active: true,
    sort_order: 3,
    created_at: "",
  },
  {
    id: "plan-48",
    brand_id: "",
    name: "48-Meal Plan",
    slug: "48",
    duration_days: 48,
    meals_per_day: 1,
    price_per_meal: 0,
    total_price: 0,
    discount_pct: 25,
    description: "Best value. Commit to two months and save the most.",
    features: ["25% off menu price", "Pause or skip anytime", "Priority delivery slots", "Free add-on per week"],
    is_trial: false,
    is_active: true,
    sort_order: 4,
    created_at: "",
  },
];

// ---------------------------------------------------------------------------
// Data-fetching functions
// ---------------------------------------------------------------------------

/**
 * Return all active plans, sorted by sort_order.
 */
export async function getPlans(): Promise<Plan[]> {
  if (!isSupabaseConfigured()) {
    return STATIC_PLANS;
  }

  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("plans")
      .select("*")
      .eq("is_active", true)
      .order("sort_order", { ascending: true });

    if (error || !data || data.length === 0) {
      return STATIC_PLANS;
    }

    return data;
  } catch {
    return STATIC_PLANS;
  }
}

/**
 * Return a single plan by ID.
 */
export async function getPlanById(id: string): Promise<Plan | null> {
  if (!isSupabaseConfigured()) {
    return STATIC_PLANS.find((p) => p.id === id || p.slug === id) ?? null;
  }

  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("plans")
      .select("*")
      .eq("id", id)
      .single();

    if (error || !data) {
      // Try slug match as a fallback
      const { data: slugData } = await supabase
        .from("plans")
        .select("*")
        .eq("slug", id)
        .single();

      if (slugData) return slugData;

      return STATIC_PLANS.find((p) => p.id === id || p.slug === id) ?? null;
    }

    return data;
  } catch {
    return STATIC_PLANS.find((p) => p.id === id || p.slug === id) ?? null;
  }
}

/**
 * Calculate pricing for a selection of meal categories under a given plan
 * duration. Returns per-category prices and a total.
 */
export async function getPlanPricing(
  planDuration: PlanDuration,
  mealCategorySlugs: string[],
): Promise<{
  items: { mealCategorySlug: string; pricePerMeal: number; total: number }[];
  totalPerDay: number;
  grandTotal: number;
  durationDays: number;
}> {
  const durationDays = planDuration === "single" ? 1 : parseInt(planDuration, 10);

  // Try Supabase first for pricing
  if (isSupabaseConfigured()) {
    try {
      const supabase = await createClient();
      // Check if there is a pricing table. In the current schema, pricing
      // lives on the plan itself (price_per_meal, total_price). Per-category
      // pricing is not yet normalised in the DB, so we fall through to
      // static pricing data.
      const { data: _planData } = await supabase
        .from("plans")
        .select("*")
        .eq("slug", planDuration === "single" ? "single" : planDuration)
        .single();

      // Even if we found a plan, per-category pricing still comes from
      // the static pricing table for now.
    } catch {
      // Fall through to static
    }
  }

  // Use static pricing data
  const items = mealCategorySlugs.map((slug) => {
    const price = getMealCategoryPrice(slug, planDuration) ?? 0;
    return {
      mealCategorySlug: slug,
      pricePerMeal: price,
      total: price * durationDays,
    };
  });

  const totalPerDay = items.reduce((sum, item) => sum + item.pricePerMeal, 0);
  const grandTotal = items.reduce((sum, item) => sum + item.total, 0);

  return {
    items,
    totalPerDay,
    grandTotal,
    durationDays,
  };
}

/**
 * Return all meal-category pricing entries.
 */
export async function getMealCategoryPricingEntries(): Promise<
  MealCategoryPricingEntry[]
> {
  // No DB table for per-category pricing yet; always return static data.
  return MEAL_CATEGORY_PRICING;
}
