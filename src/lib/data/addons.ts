import { createClient } from "@/lib/supabase/server";
import {
  ADDONS,
  getAddOnsForMealCategory as getStaticAddOnsForMealCategory,
} from "@/data/addons";
import type { AddOn } from "@/types/domain";

// ---------------------------------------------------------------------------
// Supabase availability check
// ---------------------------------------------------------------------------

function isSupabaseConfigured(): boolean {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  return !!url && url !== "your-project-url" && !url.includes("placeholder");
}

// ---------------------------------------------------------------------------
// Data-fetching functions
// ---------------------------------------------------------------------------

/**
 * Return active add-ons, optionally filtered by compatible meal category slug.
 * Falls back to static data when Supabase is unavailable.
 */
export async function getAddons(
  mealCategorySlug?: string,
): Promise<AddOn[]> {
  if (!isSupabaseConfigured()) {
    if (mealCategorySlug) {
      return getStaticAddOnsForMealCategory(mealCategorySlug);
    }
    return ADDONS.filter((a) => a.isActive);
  }

  try {
    const supabase = await createClient();
    // Assumes an `addons` table with columns: id, slug, name, price,
    // is_market_price, compatible_meal_categories (text[]), is_active.
    // If the table doesn't exist or is empty, fall back to static data.
    const { data, error } = await supabase
      .from("addons" as string)
      .select("*")
      .eq("is_active", true);

    if (error || !data || data.length === 0) {
      if (mealCategorySlug) {
        return getStaticAddOnsForMealCategory(mealCategorySlug);
      }
      return ADDONS.filter((a) => a.isActive);
    }

    const addons: AddOn[] = (data as Record<string, unknown>[]).map((row) => ({
      id: row.id as string,
      slug: row.slug as string,
      name: row.name as string,
      price: row.price as number,
      isMarketPrice: (row.is_market_price ?? false) as boolean,
      compatibleMealCategories: (row.compatible_meal_categories ?? []) as string[],
      isActive: (row.is_active ?? true) as boolean,
    }));

    if (mealCategorySlug) {
      return addons.filter((a) =>
        a.compatibleMealCategories.includes(mealCategorySlug),
      );
    }

    return addons;
  } catch {
    if (mealCategorySlug) {
      return getStaticAddOnsForMealCategory(mealCategorySlug);
    }
    return ADDONS.filter((a) => a.isActive);
  }
}
