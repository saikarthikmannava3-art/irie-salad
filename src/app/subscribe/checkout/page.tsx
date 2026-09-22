"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Shield, CreditCard, Check, AlertCircle } from "lucide-react";
import { getMealCategoryBySlug, ADDON_ONLY_SLUGS } from "@/data/meal-categories";
import { getMealCategoryPrice, getMealCategoryStartingPrice } from "@/data/pricing";
import { ADDONS } from "@/data/addons";
import type { IrieDaySelection, PlanDuration } from "@/types/domain";
import { ProgressBar } from "../page";

const PLAN_NAMES: Record<PlanDuration, { name: string; days: number }> = {
  single: { name: "Trial (3 days)", days: 3 },
  "12": { name: "12-Day Plan", days: 12 },
  "24": { name: "24-Day Plan", days: 24 },
  "48": { name: "48-Day Plan", days: 48 },
};

const RAZORPAY_KEY = process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID;

function loadRazorpayScript(): Promise<boolean> {
  return new Promise((resolve) => {
    if (window.Razorpay) {
      resolve(true);
      return;
    }
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
}

export default function CheckoutPage() {
  const router = useRouter();
  const [selections, setSelections] = useState<IrieDaySelection[]>([]);
  const [planDuration, setPlanDuration] = useState<PlanDuration>("12");
  const [address, setAddress] = useState<Record<string, string>>({});
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const savedSelections = sessionStorage.getItem("irie_day_selections");
    if (savedSelections) {
      try {
        setSelections(JSON.parse(savedSelections));
      } catch {
        // ignore
      }
    }

    const savedPlan = sessionStorage.getItem("irie_plan");
    if (savedPlan) setPlanDuration(savedPlan as PlanDuration);

    const savedAddr = sessionStorage.getItem("irie_sub_address");
    if (savedAddr) {
      try {
        setAddress(JSON.parse(savedAddr));
      } catch {
        // ignore
      }
    }
  }, []);

  function calculateItemPrice(sel: IrieDaySelection): number {
    let total = getMealCategoryPrice(sel.mealCategorySlug, planDuration) ?? getMealCategoryStartingPrice(sel.mealCategorySlug);

    sel.addOns.forEach((ao) => {
      const addOn = ADDONS.find((a) => a.slug === ao.slug);
      if (addOn && !addOn.isMarketPrice) {
        total += addOn.price * ao.quantity;
      }
    });

    return total;
  }

  function calculateDailyPrice(): number {
    return selections.reduce((sum, sel) => sum + calculateItemPrice(sel), 0);
  }

  const handleDemoPayment = useCallback(async () => {
    setProcessing(true);
    setError(null);

    try {
      // Step 1: Create order (demo mode on server)
      const createRes = await fetch("/api/checkout/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          planId: planDuration,
          mealSelections: selections,
          address: address.line1
            ? {
                label: address.label || "Home",
                line1: address.line1,
                line2: address.line2 || undefined,
                city: address.city,
                state: address.state,
                pincode: address.pincode,
              }
            : undefined,
          startDate: new Date().toISOString().split("T")[0],
        }),
      });

      const createData = await createRes.json();
      if (!createRes.ok) {
        throw new Error(createData.error || "Failed to create order");
      }

      // Step 2: Verify payment (demo mode)
      const verifyRes = await fetch("/api/checkout/verify-payment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          razorpay_order_id: createData.razorpayOrderId,
          razorpay_payment_id: `demo_pay_${Date.now()}`,
          razorpay_signature: "demo_signature",
        }),
      });

      const verifyData = await verifyRes.json();
      if (!verifyRes.ok) {
        throw new Error(verifyData.error || "Payment verification failed");
      }

      // Success
      sessionStorage.removeItem("irie_day_selections");
      sessionStorage.removeItem("irie_plan");
      sessionStorage.removeItem("irie_sub_address");
      router.push("/subscribe/success");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Payment failed. Please try again.");
      setProcessing(false);
    }
  }, [planDuration, selections, address, router]);

  const handleRazorpayPayment = useCallback(async () => {
    setProcessing(true);
    setError(null);

    try {
      // Load Razorpay script
      const loaded = await loadRazorpayScript();
      if (!loaded || !window.Razorpay) {
        throw new Error("Failed to load payment gateway. Please check your internet connection and try again.");
      }

      // Step 1: Create order on server
      const createRes = await fetch("/api/checkout/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          planId: planDuration,
          mealSelections: selections,
          address: address.line1
            ? {
                label: address.label || "Home",
                line1: address.line1,
                line2: address.line2 || undefined,
                city: address.city,
                state: address.state,
                pincode: address.pincode,
              }
            : undefined,
          startDate: new Date().toISOString().split("T")[0],
        }),
      });

      const createData = await createRes.json();
      if (!createRes.ok) {
        throw new Error(createData.error || "Failed to create order");
      }

      // Step 2: Open Razorpay checkout modal
      const options: RazorpayOptions = {
        key: createData.key,
        amount: createData.amount,
        currency: createData.currency,
        name: "irie kitchen",
        description: `${PLAN_NAMES[planDuration].name} - ${PLAN_NAMES[planDuration].days} deliveries`,
        order_id: createData.razorpayOrderId,
        theme: {
          color: "#2D5016",
        },
        handler: async (response: RazorpayResponse) => {
          try {
            // Step 3: Verify payment on server
            const verifyRes = await fetch("/api/checkout/verify-payment", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
              }),
            });

            const verifyData = await verifyRes.json();
            if (!verifyRes.ok) {
              throw new Error(verifyData.error || "Payment verification failed");
            }

            // Success
            sessionStorage.removeItem("irie_day_selections");
            sessionStorage.removeItem("irie_plan");
            sessionStorage.removeItem("irie_sub_address");
            router.push("/subscribe/success");
          } catch (err) {
            setError(err instanceof Error ? err.message : "Payment verification failed. Please contact support.");
            setProcessing(false);
          }
        },
        modal: {
          ondismiss: () => {
            setProcessing(false);
          },
          confirm_close: true,
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.on("payment.failed", () => {
        setError("Payment failed. Please try again or use a different payment method.");
        setProcessing(false);
      });
      rzp.open();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
      setProcessing(false);
    }
  }, [planDuration, selections, address, router]);

  function handlePay() {
    if (RAZORPAY_KEY) {
      handleRazorpayPayment();
    } else {
      handleDemoPayment();
    }
  }

  const plan = PLAN_NAMES[planDuration];
  const dailyPrice = calculateDailyPrice();
  const totalPrice = dailyPrice * plan.days;

  // Group by delivery window
  const morningMeals = selections.filter(
    (s) =>
      (s.mealOccasion === "breakfast" || s.mealOccasion === "lunch") &&
      !(ADDON_ONLY_SLUGS as readonly string[]).includes(s.mealCategorySlug)
  );
  const eveningMeals = selections.filter(
    (s) =>
      (s.mealOccasion === "evening-snack" || s.mealOccasion === "dinner") &&
      !(ADDON_ONLY_SLUGS as readonly string[]).includes(s.mealCategorySlug)
  );
  const extraMeals = selections.filter((s) =>
    (ADDON_ONLY_SLUGS as readonly string[]).includes(s.mealCategorySlug)
  );

  function renderMealItem(sel: IrieDaySelection) {
    const mc = getMealCategoryBySlug(sel.mealCategorySlug);
    const basePrice = getMealCategoryPrice(sel.mealCategorySlug, planDuration) ?? 0;
    if (!mc) return null;

    return (
      <div key={sel.mealCategorySlug} className="flex items-start gap-3 pb-3 border-b border-border last:border-0">
        <div className="relative h-12 w-12 rounded-lg overflow-hidden shrink-0">
          <Image
            src={mc.image}
            alt={mc.name}
            fill
            className="object-cover"
            sizes="48px"
          />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <div>
              <p className="text-sm font-medium text-foreground">{mc.name}</p>
              <p className="text-xs text-muted-foreground capitalize">
                {sel.mealOccasion.replace("-", " ")}
              </p>
            </div>
            <span className="text-sm font-semibold text-forest whitespace-nowrap">
              ₹{basePrice}
            </span>
          </div>
          {sel.addOns.length > 0 && (
            <div className="mt-1 space-y-0.5">
              {sel.addOns.map((ao) => {
                const addOn = ADDONS.find((a) => a.slug === ao.slug);
                return (
                  <div key={ao.slug} className="flex justify-between text-xs text-muted-foreground">
                    <span>+ {addOn?.name} x {ao.quantity}</span>
                    <span>
                      {addOn?.isMarketPrice
                        ? "Market Price"
                        : `₹${(addOn?.price ?? 0) * ao.quantity}`}
                    </span>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div>
      <ProgressBar currentStep={5} />

      <h1 className="text-2xl font-bold text-forest mb-6">Review & Pay</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Order Summary */}
        <div className="space-y-4">
          <Card>
            <h2 className="font-bold text-foreground mb-4">Your Meals</h2>

            {morningMeals.length > 0 && (
              <div className="mb-4">
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2">
                  Morning Delivery (6:30 - 8:30 AM)
                </p>
                <div className="space-y-3">
                  {morningMeals.map(renderMealItem)}
                </div>
              </div>
            )}

            {eveningMeals.length > 0 && (
              <div className="mb-4">
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2">
                  Evening Delivery (4:30 - 6:30 PM)
                </p>
                <div className="space-y-3">
                  {eveningMeals.map(renderMealItem)}
                </div>
              </div>
            )}

            {extraMeals.length > 0 && (
              <div className="mb-4">
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2">
                  Extras
                </p>
                <div className="space-y-3">
                  {extraMeals.map(renderMealItem)}
                </div>
              </div>
            )}

            <div className="pt-3 border-t border-border space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Daily Price</span>
                <span className="font-medium">₹{dailyPrice}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Plan</span>
                <span className="font-medium">{plan.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Duration</span>
                <span>{plan.days} deliveries</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Delivery</span>
                <span className="text-success font-medium">Free</span>
              </div>
              <div className="border-t border-border pt-2 mt-2 flex justify-between font-bold text-base">
                <span>Total Amount</span>
                <span className="text-forest">
                  ₹{totalPrice.toLocaleString()}
                </span>
              </div>
            </div>
          </Card>

          <Card>
            <h2 className="font-bold text-foreground mb-3">Delivery Address</h2>
            <div className="text-sm text-muted-foreground">
              <p className="font-medium text-foreground">
                {address.label || "Home"}
              </p>
              <p>{address.line1}</p>
              {address.line2 && <p>{address.line2}</p>}
              <p>
                {address.city}, {address.state} - {address.pincode}
              </p>
            </div>
          </Card>
        </div>

        {/* Payment */}
        <div className="space-y-4">
          <Card>
            <h2 className="font-bold text-foreground mb-4">Payment</h2>

            <div className="rounded-lg bg-cream p-4 mb-4">
              <div className="flex items-center gap-2 text-sm text-forest">
                <Shield size={16} />
                <span className="font-medium">
                  {RAZORPAY_KEY ? "Secure payment via Razorpay" : "Demo mode (no payment gateway configured)"}
                </span>
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                {RAZORPAY_KEY
                  ? "UPI, Credit/Debit Cards, Net Banking, Wallets"
                  : "Set NEXT_PUBLIC_RAZORPAY_KEY_ID to enable live payments"}
              </p>
            </div>

            <div className="space-y-3 mb-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Check size={14} className="text-success" />
                Pause or skip anytime
              </div>
              <div className="flex items-center gap-2">
                <Check size={14} className="text-success" />
                Morning meals: modify until 6 PM previous day
              </div>
              <div className="flex items-center gap-2">
                <Check size={14} className="text-success" />
                Evening meals: modify until 10 AM same day
              </div>
              <div className="flex items-center gap-2">
                <Check size={14} className="text-success" />
                Skipped days are added back
              </div>
            </div>

            <p className="text-xs text-muted-foreground mb-4 px-1">
              This is a fixed-duration prepaid plan. It does not automatically renew.
            </p>

            {error && (
              <div className="rounded-lg bg-red-50 border border-red-200 p-3 mb-4 flex items-start gap-2">
                <AlertCircle size={16} className="text-red-600 mt-0.5 shrink-0" />
                <p className="text-sm text-red-700">{error}</p>
              </div>
            )}

            <Button
              onClick={handlePay}
              loading={processing}
              size="lg"
              className="w-full"
            >
              <CreditCard size={18} />
              {RAZORPAY_KEY ? `Confirm & Pay ₹${totalPrice.toLocaleString()}` : `Pay ₹${totalPrice.toLocaleString()} (Demo)`}
            </Button>

            <p className="text-center text-xs text-muted-foreground mt-3">
              {RAZORPAY_KEY
                ? "Secure payment powered by Razorpay. Your subscription starts on your selected date."
                : "Demo mode: payment will be simulated. Your subscription starts on your selected date."}
            </p>
          </Card>
        </div>
      </div>

      <div className="mt-6">
        <Button variant="ghost" onClick={() => router.push("/subscribe/address")}>
          Back to Address
        </Button>
      </div>
    </div>
  );
}
