import type { DeliveryWindow, FulfillmentWindow, MealOccasion } from "@/types/domain";

// === Legacy cutoff (kept for backward compat) ===
export const CUTOFF_HOUR = 18; // 6 PM IST, morning delivery cutoff
export const CUTOFF_MINUTE = 0;

// === irie kitchen: Dual Fulfillment Windows ===

export const FULFILLMENT_WINDOWS: FulfillmentWindow[] = [
  {
    window: "morning",
    cutoffHour: 18,
    cutoffMinute: 0,
    cutoffDescription: "6:00 PM previous day",
    mealOccasions: ["breakfast", "lunch"],
    deliveryTimeRange: "6:30 AM – 8:30 AM",
  },
  {
    window: "evening",
    cutoffHour: 10,
    cutoffMinute: 0,
    cutoffDescription: "10:00 AM same day",
    mealOccasions: ["evening-snack", "dinner"],
    deliveryTimeRange: "4:30 PM – 6:30 PM",
  },
];

export function getCutoffForWindow(window: DeliveryWindow): { hour: number; minute: number } {
  const fw = FULFILLMENT_WINDOWS.find((f) => f.window === window);
  return { hour: fw?.cutoffHour ?? 18, minute: fw?.cutoffMinute ?? 0 };
}

export function getWindowForOccasion(occasion: MealOccasion): DeliveryWindow {
  const fw = FULFILLMENT_WINDOWS.find((f) => f.mealOccasions.includes(occasion));
  return fw?.window ?? "morning";
}

// === Meal Occasions ===

export const MEAL_OCCASIONS: { occasion: MealOccasion; label: string; deliveryWindow: DeliveryWindow }[] = [
  { occasion: "breakfast", label: "Breakfast", deliveryWindow: "morning" },
  { occasion: "lunch", label: "Lunch", deliveryWindow: "morning" },
  { occasion: "evening-snack", label: "Evening Snack", deliveryWindow: "evening" },
  { occasion: "dinner", label: "Dinner", deliveryWindow: "evening" },
];

export const ORDER_STATUSES = [
  "scheduled",
  "locked",
  "in_production",
  "packed",
  "dispatched",
  "delivered",
  "skipped",
  "paused",
  "cancelled",
] as const;

export const SUBSCRIPTION_STATUSES = [
  "pending_payment",
  "active",
  "paused",
  "completed",
  "cancelled",
  "expired",
] as const;

export const ROLES = [
  "super_admin",
  "org_admin",
  "kitchen_manager",
  "production_staff",
  "delivery_manager",
  "customer",
] as const;

export const STAFF_ROLES = [
  "super_admin",
  "org_admin",
  "kitchen_manager",
  "production_staff",
  "delivery_manager",
] as const;

export const PLAN_DURATIONS = [
  { days: 3, label: "Trial", isTrial: true },
  { days: 12, label: "12-Day Plan", isTrial: false },
  { days: 24, label: "24-Day Plan", isTrial: false },
  { days: 48, label: "48-Day Plan", isTrial: false },
] as const;

export const BRAND = {
  name: "irie kitchen",
  tagline: "Indian Food. Made Better.",
  description: "Pure vegetarian Indian food delivery focused on daily-rotating recipes, wholesome ingredients, and nutrition-led meal design",
} as const;

export const NAV_ITEMS = {
  marketing: [
    { label: "Menu", href: "/menu" },
    { label: "How It Works", href: "/how-it-works" },
    { label: "Subscriptions", href: "/plans" },
    { label: "Our Food Standard", href: "/food-standard" },
    { label: "About", href: "/about" },
  ],
  customer: [
    { label: "Overview", href: "/dashboard" },
    { label: "My Orders", href: "/dashboard/orders" },
    { label: "Subscription", href: "/dashboard/subscription" },
    { label: "Profile", href: "/dashboard/profile" },
  ],
} as const;

export const OPS_NAV_SECTIONS = [
  { section: "OVERVIEW", items: [
    { label: "Dashboard", href: "/ops", icon: "LayoutDashboard" },
  ]},
  { section: "CUSTOMERS", items: [
    { label: "Customers", href: "/ops/customers", icon: "Users" },
    { label: "Subscriptions", href: "/ops/subscriptions", icon: "Repeat" },
    { label: "Orders", href: "/ops/orders", icon: "ShoppingBag" },
    { label: "Payments", href: "/ops/payments", icon: "CreditCard" },
  ]},
  { section: "OPERATIONS", items: [
    { label: "Cutoffs (Morning/Evening)", href: "/ops/cutoff", icon: "Clock" },
    { label: "Daily Menu", href: "/ops/daily-menu", icon: "UtensilsCrossed" },
    { label: "Production", href: "/ops/production", icon: "ChefHat" },
    { label: "Packing", href: "/ops/packing", icon: "PackageCheck" },
    { label: "QC", href: "/ops/qc", icon: "CheckCircle" },
    { label: "Dispatch", href: "/ops/dispatch", icon: "MapPin" },
    { label: "Delivery", href: "/ops/delivery", icon: "Truck" },
    { label: "Routes", href: "/ops/routes", icon: "Route" },
  ]},
  { section: "SUPPLY", items: [
    { label: "Recipes & BOM", href: "/ops/recipes", icon: "BookOpen" },
    { label: "Inventory", href: "/ops/inventory", icon: "Package" },
    { label: "Procurement", href: "/ops/procurement", icon: "ShoppingCart" },
  ]},
  { section: "BUSINESS", items: [
    { label: "CRM / B2B", href: "/ops/crm", icon: "Building" },
    { label: "Reports", href: "/ops/reports", icon: "BarChart3" },
    { label: "Finance", href: "/ops/finance", icon: "IndianRupee" },
  ]},
  { section: "SYSTEM", items: [
    { label: "Settings", href: "/ops/settings", icon: "Settings" },
    { label: "Users & Permissions", href: "/ops/users", icon: "Shield" },
    { label: "Audit Log", href: "/ops/audit", icon: "FileText" },
  ]},
] as const;
