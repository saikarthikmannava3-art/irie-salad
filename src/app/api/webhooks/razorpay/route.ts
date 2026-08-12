import { NextResponse } from "next/server";
import crypto from "crypto";
import { createAdminClient } from "@/lib/supabase/admin";

export async function POST(request: Request) {
  try {
    const body = await request.text();
    const signature = request.headers.get("x-razorpay-signature");

    if (!signature || !process.env.RAZORPAY_KEY_SECRET) {
      return NextResponse.json({ error: "Missing signature or secret" }, { status: 400 });
    }

    // Verify signature
    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(body)
      .digest("hex");

    if (signature !== expectedSignature) {
      return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
    }

    const payload = JSON.parse(body);
    const event = payload.event;

    if (event === "payment.captured") {
      const payment = payload.payload.payment.entity;
      const supabase = createAdminClient();

      // Update payment record
      await supabase
        .from("payments")
        .update({
          razorpay_payment_id: payment.id,
          status: "captured",
          method: payment.method,
        })
        .eq("razorpay_order_id", payment.order_id);

      // Activate subscription
      const { data: paymentRecord } = await supabase
        .from("payments")
        .select("subscription_id")
        .eq("razorpay_order_id", payment.order_id)
        .single();

      if (paymentRecord) {
        await supabase
          .from("subscriptions")
          .update({ status: "active" })
          .eq("id", paymentRecord.subscription_id);
      }
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error("Webhook error:", error);
    return NextResponse.json({ error: "Webhook processing failed" }, { status: 500 });
  }
}
