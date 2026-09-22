import { NextResponse } from "next/server";
import { z } from "zod";
import crypto from "crypto";
import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";

const requestSchema = z.object({
  razorpay_order_id: z.string(),
  razorpay_payment_id: z.string(),
  razorpay_signature: z.string(),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = requestSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid request", details: parsed.error.flatten() },
        { status: 400 },
      );
    }

    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = parsed.data;

    // Authenticate user
    const supabase = await createClient();
    const { data: { user }, error: authError } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    const isDemoMode = razorpay_order_id.startsWith("demo_order_");

    if (!isDemoMode) {
      // Verify HMAC signature
      const secret = process.env.RAZORPAY_KEY_SECRET;
      if (!secret) {
        return NextResponse.json({ error: "Payment verification unavailable" }, { status: 500 });
      }

      const expectedSignature = crypto
        .createHmac("sha256", secret)
        .update(`${razorpay_order_id}|${razorpay_payment_id}`)
        .digest("hex");

      if (razorpay_signature !== expectedSignature) {
        return NextResponse.json({ error: "Invalid payment signature" }, { status: 400 });
      }
    }

    const admin = createAdminClient();

    // Update payment record
    const { error: payUpdateError } = await admin
      .from("payments")
      .update({
        razorpay_payment_id,
        razorpay_signature,
        status: "captured" as const,
        method: isDemoMode ? "demo" : null,
      })
      .eq("razorpay_order_id", razorpay_order_id)
      .eq("profile_id", user.id);

    if (payUpdateError) {
      console.error("Payment update failed:", payUpdateError);
      return NextResponse.json({ error: "Failed to update payment" }, { status: 500 });
    }

    // Get the subscription ID from payment record
    const { data: paymentRecord, error: payFetchError } = await admin
      .from("payments")
      .select("subscription_id")
      .eq("razorpay_order_id", razorpay_order_id)
      .eq("profile_id", user.id)
      .single();

    if (payFetchError || !paymentRecord) {
      console.error("Payment record not found:", payFetchError);
      return NextResponse.json({ error: "Payment record not found" }, { status: 404 });
    }

    // Activate subscription
    const { error: subUpdateError } = await admin
      .from("subscriptions")
      .update({ status: "active" as const })
      .eq("id", paymentRecord.subscription_id)
      .eq("profile_id", user.id);

    if (subUpdateError) {
      console.error("Subscription activation failed:", subUpdateError);
      return NextResponse.json({ error: "Failed to activate subscription" }, { status: 500 });
    }

    // Generate delivery schedule
    const { data: subscription } = await admin
      .from("subscriptions")
      .select("start_date, end_date, total_meals, preferences")
      .eq("id", paymentRecord.subscription_id)
      .single();

    if (subscription) {
      const startDate = new Date(subscription.start_date);
      const totalDays = subscription.total_meals;

      // Get default brand/kitchen
      const { data: brand } = await admin
        .from("brands")
        .select("id")
        .eq("is_active", true)
        .limit(1)
        .single();

      const kitchenId = brand?.id ?? "";

      // Generate individual day orders
      for (let i = 0; i < totalDays; i++) {
        const deliveryDate = new Date(startDate);
        deliveryDate.setDate(deliveryDate.getDate() + i);
        const dateStr = deliveryDate.toISOString().split("T")[0];

        const orderNo = `ORD-${dateStr.replace(/-/g, "")}-${paymentRecord.subscription_id.slice(0, 6).toUpperCase()}`;

        // Create a placeholder order for each delivery day
        // Menu item will be assigned during daily menu cutoff
        await admin.from("orders").insert({
          order_no: `${orderNo}-${i + 1}`,
          subscription_id: paymentRecord.subscription_id,
          profile_id: user.id,
          kitchen_id: kitchenId,
          address_id: subscription.start_date, // will be resolved from subscription
          delivery_date: dateStr,
          menu_item_id: kitchenId, // placeholder, assigned at cutoff
          status: "scheduled" as const,
          delivery_slot: "morning",
          customizations: subscription.preferences ?? {},
        });
      }
    }

    return NextResponse.json({
      success: true,
      subscriptionId: paymentRecord.subscription_id,
    });
  } catch (error) {
    console.error("Verify payment error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
