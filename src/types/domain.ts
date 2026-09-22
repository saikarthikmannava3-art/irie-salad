import type { Database } from "./database";

// Row type shortcuts
type Tables = Database["public"]["Tables"];

export type Organization = Tables["organizations"]["Row"];
export type Brand = Tables["brands"]["Row"];
export type Profile = Tables["profiles"]["Row"];
export type Address = Tables["addresses"]["Row"];
export type MenuCategory = Tables["menu_categories"]["Row"];
export type MenuItem = Tables["menu_items"]["Row"];
export type Plan = Tables["plans"]["Row"];
export type Subscription = Tables["subscriptions"]["Row"];
export type Order = Tables["orders"]["Row"];
export type DailySnapshot = Tables["daily_snapshots"]["Row"];
export type Ingredient = Tables["ingredients"]["Row"];
export type Inventory = Tables["inventory"]["Row"];
export type InventoryTransaction = Tables["inventory_transactions"]["Row"];
export type ProductionRequirement = Tables["production_requirements"]["Row"];
export type IngredientRequirement = Tables["ingredient_requirements"]["Row"];
export type Payment = Tables["payments"]["Row"];

// Extended types with joins
export type OrderWithDetails = Order & {
  menu_item: MenuItem;
  profile: Pick<Profile, "id" | "full_name" | "phone">;
  address: Address;
};

export type SubscriptionWithPlan = Subscription & {
  plan: Plan;
  profile: Pick<Profile, "id" | "full_name" | "email" | "phone">;
};

export type SnapshotWithRequirements = DailySnapshot & {
  production_requirements: (ProductionRequirement & { menu_item: MenuItem })[];
  ingredient_requirements: (IngredientRequirement & { ingredient: Ingredient })[];
};

export type InventoryWithIngredient = Inventory & {
  ingredient: Ingredient;
};

export type Role = Profile["role"];

// === IRIE Product Catalog Types (Phase 1: hardcoded data) - LEGACY ===
// These types are kept for backward compatibility during the irie salad to irie kitchen transition.
// New code should use the irie kitchen types below.

export type LegacyProductSlug =
  | "signature-irie-salad"
  | "coconut-overnight-oats"
  | "tropical-smoothie-bowl"
  | "fresh-seasonal-fruit-bowl"
  | "irie-millet-wellness-bowl"
  | "irie-power-meal"
  | "fresh-detox-juice";

/** @deprecated Use LegacyProductSlug for old code; new code uses string slugs from recipes/meal-categories */
export type ProductSlug = string;

export type PlanDuration = "single" | "12" | "24" | "48";

export interface ProductVariant {
  id: string;
  label: string;
  slug: string;
  variantType?: string;
  size?: string;
  isDailyMenu: boolean;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  shortName: string;
  description: string;
  category: string;
  image: string;
  nutrition: {
    calories: number;
    proteinG: number;
    fiberG: number;
  };
  tags: string[];
  variants: ProductVariant[];
  hasDailyMenu: boolean;
  isActive: boolean;
  sortOrder: number;
}

/** @deprecated Use the new AddOn interface below */
export interface LegacyAddOn {
  id: string;
  slug: string;
  name: string;
  price: number;
  isMarketPrice: boolean;
  compatibleProductSlugs: string[];
  isActive: boolean;
}

/** @deprecated Use MealCategoryPricingEntry */
export interface PricingEntry {
  productSlug: string;
  variantId: string;
  prices: Record<PlanDuration, number>;
}

export interface DailyMenuItem {
  id: string;
  date: string;
  productSlug: string;
  dailyName: string;
  dailyDescription: string;
  image?: string;
}

/** @deprecated Use the new OrderItem interface below */
export interface LegacyOrderItem {
  productSlug: string;
  variantId: string;
  quantity: number;
  addOns: { addOnSlug: string; quantity: number }[];
  menuPrice: number;
  billingPrice: number;
  packageId?: string;
}

// === irie kitchen types ===

export type MealOccasion = "breakfast" | "lunch" | "evening-snack" | "dinner";

export type DeliveryWindow = "morning" | "evening";

export type RecipeStatus = "draft" | "testing" | "approved" | "active" | "retired";

export type CookingMethod =
  | "steamed" | "tandoori" | "baked" | "sauteed" | "fermented"
  | "soaked" | "raw" | "roasted" | "slow-cooked" | "dum";

export type IndianRegion = "north" | "south" | "east" | "west" | "central" | "pan-indian";

export interface Recipe {
  id: string;
  slug: string;
  name: string;
  shortName: string;
  description: string;
  mealOccasion: MealOccasion;
  category: string;
  region: IndianRegion;
  cookingMethod: CookingMethod;
  image: string;
  nutrition: {
    calories: number;
    proteinG: number;
    fiberG: number;
    carbsG: number;
    fatG: number;
  };
  tags: string[];
  isVegetarian: boolean;
  allergens: string[];
  reheatingInstructions: string;
  storageInstructions: string;
  portionSize: string;
  status: RecipeStatus;
  sortOrder: number;
}

export interface MealCategory {
  id: string;
  slug: string;
  name: string;
  shortName: string;
  description: string;
  mealOccasion: MealOccasion;
  deliveryWindow: DeliveryWindow;
  image: string;
  isActive: boolean;
  sortOrder: number;
}

export interface DailyMenuEntry {
  id: string;
  date: string;
  mealCategorySlug: string;
  recipeSlug: string;
  deliveryWindow: DeliveryWindow;
  mealOccasion: MealOccasion;
}

export interface AddOn {
  id: string;
  slug: string;
  name: string;
  price: number;
  isMarketPrice: boolean;
  compatibleMealCategories: string[];
  isActive: boolean;
}

export interface MealCategoryPricingEntry {
  mealCategorySlug: string;
  prices: Record<PlanDuration, number>;
}

export interface FulfillmentWindow {
  window: DeliveryWindow;
  cutoffHour: number;
  cutoffMinute: number;
  cutoffDescription: string;
  mealOccasions: MealOccasion[];
  deliveryTimeRange: string;
}

export interface IrieDaySelection {
  mealOccasion: MealOccasion;
  mealCategorySlug: string;
  addOns: { slug: string; quantity: number }[];
}

export interface OrderItem {
  mealCategorySlug: string;
  recipeSlug?: string;
  mealOccasion: MealOccasion;
  deliveryWindow: DeliveryWindow;
  quantity: number;
  addOns: { addOnSlug: string; quantity: number }[];
  menuPrice: number;
  billingPrice: number;
  packageId?: string;
}

export interface PackageLabel {
  packageId: string;
  customerId: string;
  customerName: string;
  deliveryWindow: DeliveryWindow;
  mealOccasion: MealOccasion;
  recipeName: string;
  addOns: string[];
  packageNumber: number;
  totalPackages: number;
  route?: string;
  reheatingInstructions: string;
  storageInstructions: string;
}
