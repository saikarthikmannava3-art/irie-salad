import { createClient } from "@/lib/supabase/server";
import type {
  Subscription,
  SubscriptionWithPlan,
  Order,
  OrderWithDetails,
} from "@/types/domain";

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
 * Return the active subscription (with plan details) for a given user.
 * Returns null when Supabase is not configured or no active subscription
 * exists.
 */
export async function getUserSubscription(
  userId: string,
): Promise<SubscriptionWithPlan | null> {
  if (!isSupabaseConfigured()) {
    return null;
  }

  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("subscriptions")
      .select(
        `
        *,
        plan:plans(*),
        profile:profiles(id, full_name, email, phone)
      `,
      )
      .eq("profile_id", userId)
      .eq("status", "active")
      .order("created_at", { ascending: false })
      .limit(1)
      .single();

    if (error || !data) {
      return null;
    }

    return data as unknown as SubscriptionWithPlan;
  } catch {
    return null;
  }
}

/**
 * Return all subscriptions (any status) for a given user.
 */
export async function getUserSubscriptions(
  userId: string,
): Promise<Subscription[]> {
  if (!isSupabaseConfigured()) {
    return [];
  }

  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("subscriptions")
      .select("*")
      .eq("profile_id", userId)
      .order("created_at", { ascending: false });

    if (error || !data) {
      return [];
    }

    return data;
  } catch {
    return [];
  }
}

/**
 * Return recent orders for a user, optionally limited.
 */
export async function getUserOrders(
  userId: string,
  limit: number = 20,
): Promise<OrderWithDetails[]> {
  if (!isSupabaseConfigured()) {
    return [];
  }

  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("orders")
      .select(
        `
        *,
        menu_item:menu_items(*),
        profile:profiles(id, full_name, phone),
        address:addresses(*)
      `,
      )
      .eq("profile_id", userId)
      .order("delivery_date", { ascending: false })
      .limit(limit);

    if (error || !data) {
      return [];
    }

    return data as unknown as OrderWithDetails[];
  } catch {
    return [];
  }
}

/**
 * Return upcoming deliveries for a given subscription.
 * "Upcoming" means orders with delivery_date >= today and status in
 * ("scheduled", "locked", "in_production", "packed").
 */
export async function getUpcomingDeliveries(
  subscriptionId: string,
  limit: number = 14,
): Promise<Order[]> {
  if (!isSupabaseConfigured()) {
    return [];
  }

  try {
    const supabase = await createClient();
    const today = new Date().toISOString().split("T")[0];

    const { data, error } = await supabase
      .from("orders")
      .select("*")
      .eq("subscription_id", subscriptionId)
      .gte("delivery_date", today)
      .in("status", ["scheduled", "locked", "in_production", "packed"])
      .order("delivery_date", { ascending: true })
      .limit(limit);

    if (error || !data) {
      return [];
    }

    return data;
  } catch {
    return [];
  }
}
