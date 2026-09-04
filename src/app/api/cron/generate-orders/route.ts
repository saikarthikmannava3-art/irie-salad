import { NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";

export async function GET(request: Request) {
  const authHeader = request.headers.get("authorization");
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const supabase = createAdminClient();
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const deliveryDate = tomorrow.toISOString().slice(0, 10);

  try {
    // Get active subscriptions where tomorrow is within their date range
    // and tomorrow is not in skip_dates or pause_dates
    const { data: subscriptions } = await supabase
      .from("subscriptions")
      .select("id, subscription_no, profile_id, kitchen_id, address_id, plan_id, skip_dates, preferences")
      .eq("status", "active")
      .lte("start_date", deliveryDate)
      .gte("end_date", deliveryDate);

    if (!subscriptions?.length) {
      return NextResponse.json({ message: "No active subscriptions for tomorrow", date: deliveryDate });
    }

    let created = 0;
    let skipped = 0;

    for (const sub of subscriptions) {
      // Check if date is skipped
      if (sub.skip_dates?.includes(deliveryDate)) {
        skipped++;
        continue;
      }

      // Check if order already exists for this subscription + date
      const { count } = await supabase
        .from("orders")
        .select("id", { count: "exact", head: true })
        .eq("subscription_id", sub.id)
        .eq("delivery_date", deliveryDate);

      if (count && count > 0) continue;

      // Get a menu item for this order
      // In production: use customer preferences, rotation schedule, etc.
      // For POC: pick first active menu item
      const { data: menuItems } = await supabase
        .from("menu_items")
        .select("id")
        .eq("is_active", true)
        .limit(10);

      if (!menuItems?.length) continue;

      // Rotate through menu items based on subscription sequence
      const itemIndex = created % menuItems.length;
      const menuItemId = menuItems[itemIndex].id;

      // Generate order number
      const orderNo = `ORD-HYD-${deliveryDate.replace(/-/g, "")}-${String(created + 1).padStart(4, "0")}`;

      const { error } = await supabase.from("orders").insert({
        order_no: orderNo,
        subscription_id: sub.id,
        profile_id: sub.profile_id,
        kitchen_id: sub.kitchen_id,
        address_id: sub.address_id,
        delivery_date: deliveryDate,
        menu_item_id: menuItemId,
        status: "scheduled",
        quantity: 1,
        delivery_slot: "12:00-13:00",
        customizations: {},
      });

      if (error) {
        console.error(`Failed to create order for sub ${sub.subscription_no}:`, error);
        continue;
      }

      created++;
    }

    return NextResponse.json({
      success: true,
      deliveryDate,
      ordersCreated: created,
      subscriptionsSkipped: skipped,
      totalSubscriptions: subscriptions.length,
    });
  } catch (error) {
    console.error("Order generation failed:", error);
    return NextResponse.json(
      { error: "Order generation failed", details: String(error) },
      { status: 500 }
    );
  }
}
