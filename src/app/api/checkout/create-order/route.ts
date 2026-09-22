import { NextResponse } from "next/server";
import { z } from "zod";
import Razorpay from "razorpay";
import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { MEAL_CATEGORY_PRICING } from "@/data/pricing";
import { ADDONS } from "@/data/addons";
import type { PlanDuration } from "@/types/domain";

const PLAN_CONFIG: Record<string, { name: string; days: number; duration: PlanDuration }> = {
  single: { name: "Trial (3 days)", days: 3, duration: "single" },
  "12": { name: "12-Day Plan", days: 12, duration: "12" },
  "24": { name: "24-Day Plan", days: 24, duration: "24" },
  "48": { name: "48-Day Plan", days: 48, duration: "48" },
};

const addOnSchema = z.object({
  slug: z.string(),
  quantity: z.number().int().min(1).max(10),
});

const mealSelectionSchema = z.object({
  mealOccasion: z.enum(["breakfast", "lunch", "evening-snack", "dinner"]),
  mealCategorySlug: z.string(),
  addOns: z.array(addOnSchema),
});

const requestSchema = z.object({
  planId: z.enum(["single", "12", "24", "48"]),
  mealSelections: z.array(mealSelectionSchema).min(1),
  addOns: z.array(addOnSchema).optional(),
  addressId: z.string().uuid().optional(),
  address: z.object({
    label: z.string(),
    line1: z.string(),
    line2: z.string().optional(),
    city: z.string(),
    state: z.string(),
    pincode: z.string(),
  }).optional(),
  startDate: z.string(),
});

function calculateServerTotal(
  mealSelections: z.infer<typeof mealSelectionSchema>[],
  planDuration: PlanDuration,
  days: number,
): { dailyPrice: number; totalPrice: number } {
  let dailyPrice = 0;

  for (const sel of mealSelections) {
    const pricingEntry = MEAL_CATEGORY_PRICING.find(
      (p) => p.mealCategorySlug === sel.mealCategorySlug,
    );
    const basePrice = pricingEntry?.prices[planDuration] ?? 0;
    let itemPrice = basePrice;

    for (const ao of sel.addOns) {
      const addOn = ADDONS.find((a) => a.slug === ao.slug);
      if (addOn && !addOn.isMarketPrice) {
        itemPrice += addOn.price * ao.quantity;
      }
    }

    dailyPrice += itemPrice;
  }

  return { dailyPrice, totalPrice: dailyPrice * days };
}

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

    const { planId, mealSelections, startDate } = parsed.data;

    // Authenticate user
    const supabase = await createClient();
    const { data: { user }, error: authError } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    // Validate plan
    const plan = PLAN_CONFIG[planId];
    if (!plan) {
      return NextResponse.json({ error: "Invalid plan" }, { status: 400 });
    }

    // Server-side price calculation (never trust client)
    const { dailyPrice, totalPrice } = calculateServerTotal(
      mealSelections,
      plan.duration,
      plan.days,
    );

    if (totalPrice <= 0) {
      return NextResponse.json({ error: "Invalid total price" }, { status: 400 });
    }

    const amountInPaise = Math.round(totalPrice * 100);
    const isDemoMode = !process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || !process.env.RAZORPAY_KEY_SECRET;

    let razorpayOrderId: string;

    if (isDemoMode) {
      // Demo mode: generate a fake order ID
      razorpayOrderId = `demo_order_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`;
    } else {
      // Production: create real Razorpay order
      const razorpay = new Razorpay({
        key_id: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID!,
        key_secret: process.env.RAZORPAY_KEY_SECRET!,
      });

      const order = await razorpay.orders.create({
        amount: amountInPaise,
        currency: "INR",
        receipt: `irie_${user.id.slice(0, 8)}_${Date.now()}`,
        notes: {
          user_id: user.id,
          plan: planId,
          daily_price: String(dailyPrice),
        },
      });

      razorpayOrderId = order.id;
    }

    // Resolve or create address
    const admin = createAdminClient();
    let addressId = parsed.data.addressId;

    if (!addressId && parsed.data.address) {
      const { data: newAddr, error: addrError } = await admin
        .from("addresses")
        .insert({
          profile_id: user.id,
          label: parsed.data.address.label,
          line1: parsed.data.address.line1,
          line2: parsed.data.address.line2 ?? null,
          city: parsed.data.address.city,
          state: parsed.data.address.state,
          pincode: parsed.data.address.pincode,
        })
        .select("id")
        .single();

      if (addrError || !newAddr) {
        console.error("Address creation failed:", addrError);
        return NextResponse.json({ error: "Failed to save address" }, { status: 500 });
      }
      addressId = newAddr.id;
    }

    // Get default brand and kitchen for subscription creation
    const { data: brand } = await admin
      .from("brands")
      .select("id")
      .eq("is_active", true)
      .limit(1)
      .single();

    // Find or use a default plan record
    const { data: dbPlan } = await admin
      .from("plans")
      .select("id")
      .eq("duration_days", plan.days)
      .eq("is_active", true)
      .limit(1)
      .single();

    const planDbId = dbPlan?.id ?? crypto.randomUUID();
    const brandId = brand?.id ?? crypto.randomUUID();

    // Create subscription (pending_payment)
    const subscriptionNo = `IRE-${Date.now().toString(36).toUpperCase()}`;
    const endDate = new Date(startDate);
    endDate.setDate(endDate.getDate() + plan.days - 1);

    const { data: subscription, error: subError } = await admin
      .from("subscriptions")
      .insert({
        subscription_no: subscriptionNo,
        profile_id: user.id,
        plan_id: planDbId,
        brand_id: brandId,
        kitchen_id: brandId, // using brand as kitchen placeholder
        address_id: addressId ?? crypto.randomUUID(),
        status: "pending_payment",
        start_date: startDate,
        end_date: endDate.toISOString().split("T")[0],
        total_meals: plan.days,
        meals_remaining: plan.days,
        amount_paid: totalPrice,
        preferences: {
          mealSelections,
          dailyPrice,
        },
      })
      .select("id")
      .single();

    if (subError || !subscription) {
      console.error("Subscription creation failed:", subError);
      return NextResponse.json({ error: "Failed to create subscription" }, { status: 500 });
    }

    // Create payment record
    const { error: payError } = await admin
      .from("payments")
      .insert({
        subscription_id: subscription.id,
        profile_id: user.id,
        razorpay_order_id: razorpayOrderId,
        amount: totalPrice,
        currency: "INR",
        status: "created",
      });

    if (payError) {
      console.error("Payment record creation failed:", payError);
      return NextResponse.json({ error: "Failed to create payment record" }, { status: 500 });
    }

    return NextResponse.json({
      orderId: subscription.id,
      razorpayOrderId,
      amount: amountInPaise,
      currency: "INR",
      key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID ?? "",
      demoMode: isDemoMode,
    });
  } catch (error) {
    console.error("Create order error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
