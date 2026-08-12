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
