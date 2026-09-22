import { createClient } from "@/lib/supabase/server";
import {
  MEAL_CATEGORIES,
  getActiveMealCategories,
  getMealCategoryBySlug,
} from "@/data/meal-categories";
import {
  RECIPES,
  getActiveRecipes,
  getRecipeBySlug,
  getRecipesByMealOccasion,
} from "@/data/recipes";
import {
  getDailyMenuEntries as getStaticDailyMenuEntries,
} from "@/data/daily-menu";
import type {
  MealCategory,
  MealOccasion,
  Recipe,
  DailyMenuEntry,
} from "@/types/domain";
import type { Database } from "@/types/database";

type MenuCategoryRow = Database["public"]["Tables"]["menu_categories"]["Row"];
type MenuItemRow = Database["public"]["Tables"]["menu_items"]["Row"];

// ---------------------------------------------------------------------------
// Supabase availability check
// ---------------------------------------------------------------------------

function isSupabaseConfigured(): boolean {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  return !!url && url !== "your-project-url" && !url.includes("placeholder");
}

// ---------------------------------------------------------------------------
// Menu Categories
// ---------------------------------------------------------------------------

/**
 * Return all active meal categories, sorted by sort_order.
 * Falls back to static data when Supabase is unavailable.
 */
export async function getMenuCategories(): Promise<MealCategory[]> {
  if (!isSupabaseConfigured()) {
    return getActiveMealCategories();
  }

  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("menu_categories")
      .select("*")
      .eq("is_active", true)
      .order("sort_order", { ascending: true });

    if (error || !data || data.length === 0) {
      return getActiveMealCategories();
    }

    // Map DB rows to domain MealCategory shape.
    // The DB table has a simpler schema than the domain type, so we enrich
    // with defaults for fields that only exist in the static data.
    return (data as MenuCategoryRow[]).map((row) => {
      // Try to find a matching static entry to fill in extra fields
      const staticMatch = MEAL_CATEGORIES.find((mc) => mc.slug === row.slug);
      return {
        id: row.id,
        slug: row.slug,
        name: row.name,
        shortName: staticMatch?.shortName ?? row.name,
        description: staticMatch?.description ?? "",
        mealOccasion: staticMatch?.mealOccasion ?? ("lunch" as MealOccasion),
        deliveryWindow: staticMatch?.deliveryWindow ?? "morning",
        image: staticMatch?.image ?? "/images/meal-categories/default.jpg",
        isActive: row.is_active,
        sortOrder: row.sort_order,
      } satisfies MealCategory;
    });
  } catch {
    return getActiveMealCategories();
  }
}

/**
 * Return menu items (recipes) optionally filtered by a category slug.
 * When a categorySlug is provided, returns recipes whose mealOccasion
 * matches the category. Falls back to static data.
 */
export async function getMenuItems(
  categorySlug?: string,
): Promise<Recipe[]> {
  if (!isSupabaseConfigured()) {
    if (!categorySlug) return getActiveRecipes();
    const category = getMealCategoryBySlug(categorySlug);
    if (!category) return [];
    return getRecipesByMealOccasion(category.mealOccasion);
  }

  try {
    const supabase = await createClient();
    let query = supabase
      .from("menu_items")
      .select("*")
      .eq("is_active", true)
      .order("sort_order", { ascending: true });

    if (categorySlug) {
      // Resolve category to get its id
      const { data: catRow } = await supabase
        .from("menu_categories")
        .select("id")
        .eq("slug", categorySlug)
        .single();

      const catId = (catRow as MenuCategoryRow | null)?.id;
      if (catId) {
        query = query.eq("category_id", catId);
      }
    }

    const { data, error } = await query;

    if (error || !data || data.length === 0) {
      if (!categorySlug) return getActiveRecipes();
      const category = getMealCategoryBySlug(categorySlug);
      if (!category) return [];
      return getRecipesByMealOccasion(category.mealOccasion);
    }

    return (data as MenuItemRow[]).map((row) => {
      const staticMatch = RECIPES.find((r) => r.slug === row.slug);
      return mapMenuItemToRecipe(row, staticMatch);
    });
  } catch {
    if (!categorySlug) return getActiveRecipes();
    const category = getMealCategoryBySlug(categorySlug);
    if (!category) return [];
    return getRecipesByMealOccasion(category.mealOccasion);
  }
}

/**
 * Fetch recipes, optionally filtered by meal occasion.
 */
export async function getRecipes(
  occasion?: MealOccasion,
): Promise<Recipe[]> {
  if (!isSupabaseConfigured()) {
    if (!occasion) return getActiveRecipes();
    return getRecipesByMealOccasion(occasion);
  }

  try {
    const supabase = await createClient();
    let query = supabase
      .from("menu_items")
      .select("*")
      .eq("is_active", true)
      .order("sort_order", { ascending: true });

    // There is no direct meal_occasion column on menu_items, so we
    // resolve via the linked category or fall back to static lookup.
    const { data, error } = await query;

    if (error || !data || data.length === 0) {
      if (!occasion) return getActiveRecipes();
      return getRecipesByMealOccasion(occasion);
    }

    const recipes = (data as MenuItemRow[]).map((row) => {
      const staticMatch = RECIPES.find((r) => r.slug === row.slug);
      return mapMenuItemToRecipe(row, staticMatch);
    });

    if (occasion) {
      return recipes.filter((r) => r.mealOccasion === occasion);
    }
    return recipes;
  } catch {
    if (!occasion) return getActiveRecipes();
    return getRecipesByMealOccasion(occasion);
  }
}

/**
 * Fetch a single menu item / recipe by slug.
 */
export async function getMenuItemBySlug(
  slug: string,
): Promise<Recipe | null> {
  if (!isSupabaseConfigured()) {
    return getRecipeBySlug(slug) ?? null;
  }

  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("menu_items")
      .select("*")
      .eq("slug", slug)
      .single();

    if (error || !data) {
      return getRecipeBySlug(slug) ?? null;
    }

    const row = data as MenuItemRow;
    const staticMatch = RECIPES.find((r) => r.slug === row.slug);
    return mapMenuItemToRecipe(row, staticMatch);
  } catch {
    return getRecipeBySlug(slug) ?? null;
  }
}

/**
 * Get the daily menu for a given date.
 * Falls back to the static rotating daily menu entries when Supabase is
 * not configured or has no data for the requested date.
 */
export async function getDailyMenu(
  date?: Date,
): Promise<DailyMenuEntry[]> {
  const dateStr = (date ?? new Date()).toISOString().split("T")[0];

  if (!isSupabaseConfigured()) {
    return getStaticDailyMenuFallback(dateStr);
  }

  try {
    const supabase = await createClient();
    // Assumes a `daily_menu` table exists with columns matching DailyMenuEntry.
    // If the table does not exist or returns empty, fall back to static data.
    const { data, error } = await supabase
      .from("daily_menu" as string)
      .select("*")
      .eq("date", dateStr);

    if (error || !data || data.length === 0) {
      return getStaticDailyMenuFallback(dateStr);
    }

    return (data as Record<string, unknown>[]).map((row) => ({
      id: row.id as string,
      date: row.date as string,
      mealCategorySlug: (row.meal_category_slug ?? row.mealCategorySlug) as string,
      recipeSlug: (row.recipe_slug ?? row.recipeSlug) as string,
      deliveryWindow: (row.delivery_window ?? row.deliveryWindow) as DailyMenuEntry["deliveryWindow"],
      mealOccasion: (row.meal_occasion ?? row.mealOccasion) as DailyMenuEntry["mealOccasion"],
    }));
  } catch {
    return getStaticDailyMenuFallback(dateStr);
  }
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/**
 * When the exact date is not found in static data, rotate through the
 * 7-day static menu based on the day-of-week offset.
 */
function getStaticDailyMenuFallback(dateStr: string): DailyMenuEntry[] {
  // Try exact date match first
  const exact = getStaticDailyMenuEntries(dateStr);
  if (exact.length > 0) return exact;

  // Rotate: the static data covers Aug 16-22 (Sat-Fri, 7 days).
  // Map any date to one of those by day-of-week.
  const staticDates = [
    "2026-08-16", // Sat
    "2026-08-17", // Sun
    "2026-08-18", // Mon
    "2026-08-19", // Tue
    "2026-08-20", // Wed
    "2026-08-21", // Thu
    "2026-08-22", // Fri
  ];

  const targetDate = new Date(dateStr + "T00:00:00");
  const dayOfWeek = targetDate.getDay(); // 0=Sun..6=Sat
  // Map: Sun=0 -> index 1, Mon=1 -> 2, ... Sat=6 -> 0
  const index = dayOfWeek === 6 ? 0 : dayOfWeek + 1;
  const mappedDate = staticDates[index] ?? staticDates[0];

  return getStaticDailyMenuEntries(mappedDate).map((entry) => ({
    ...entry,
    date: dateStr,
  }));
}

/**
 * Map a Supabase menu_items row to the domain Recipe type, filling in
 * extra fields from the static data when available.
 */
function mapMenuItemToRecipe(
  row: MenuItemRow,
  staticMatch: Recipe | undefined,
): Recipe {
  return {
    id: row.id,
    slug: row.slug,
    name: row.name,
    shortName: staticMatch?.shortName ?? row.name,
    description: row.description ?? staticMatch?.description ?? "",
    mealOccasion: staticMatch?.mealOccasion ?? ("lunch" as MealOccasion),
    category: staticMatch?.category ?? "",
    region: staticMatch?.region ?? "pan-indian",
    cookingMethod: staticMatch?.cookingMethod ?? "raw",
    image: row.image_url ?? staticMatch?.image ?? "/images/recipes/default.jpg",
    nutrition: {
      calories: row.calories ?? staticMatch?.nutrition?.calories ?? 0,
      proteinG: row.protein_g ?? staticMatch?.nutrition?.proteinG ?? 0,
      fiberG: row.fiber_g ?? staticMatch?.nutrition?.fiberG ?? 0,
      carbsG: staticMatch?.nutrition?.carbsG ?? 0,
      fatG: staticMatch?.nutrition?.fatG ?? 0,
    },
    tags: row.tags ?? staticMatch?.tags ?? [],
    isVegetarian: staticMatch?.isVegetarian ?? true,
    allergens: staticMatch?.allergens ?? [],
    reheatingInstructions: staticMatch?.reheatingInstructions ?? "",
    storageInstructions: staticMatch?.storageInstructions ?? "",
    portionSize: staticMatch?.portionSize ?? "",
    status: staticMatch?.status ?? "active",
    sortOrder: row.sort_order ?? staticMatch?.sortOrder ?? 0,
  };
}
