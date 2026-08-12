export const CUTOFF_HOUR = 18; // 6 PM IST
export const CUTOFF_MINUTE = 0;

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
  name: "Irie Salad",
  tagline: "Making healthy eating easy, scalable, and consistent",
  description: "Farm-to-fork food company focused on healthy meal production and nutrition-led food systems",
} as const;

export const NAV_ITEMS = {
  marketing: [
    { label: "Menu", href: "/menu" },
    { label: "Plans", href: "/plans" },
    { label: "About", href: "/about" },
  ],
  customer: [
    { label: "Overview", href: "/dashboard" },
    { label: "My Orders", href: "/dashboard/orders" },
    { label: "Subscription", href: "/dashboard/subscription" },
    { label: "Profile", href: "/dashboard/profile" },
  ],
  ops: [
    { label: "Dashboard", href: "/ops", icon: "LayoutDashboard" },
    { label: "Orders", href: "/ops/orders", icon: "ShoppingBag" },
    { label: "Production", href: "/ops/production", icon: "ChefHat" },
    { label: "Inventory", href: "/ops/inventory", icon: "Package" },
    { label: "Menu", href: "/ops/menu", icon: "UtensilsCrossed" },
    { label: "Subscriptions", href: "/ops/subscriptions", icon: "Repeat" },
    { label: "Procurement", href: "/ops/procurement", icon: "Truck" },
    { label: "Packing", href: "/ops/packing", icon: "PackageCheck" },
    { label: "Dispatch", href: "/ops/dispatch", icon: "MapPin" },
    { label: "Settings", href: "/ops/settings", icon: "Settings" },
  ],
} as const;
