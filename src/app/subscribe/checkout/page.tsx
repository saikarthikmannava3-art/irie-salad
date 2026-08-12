"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Shield, CreditCard, Check } from "lucide-react";

const PLAN_DATA: Record<string, { name: string; days: number; price: number }> = {
  trial: { name: "Trial", days: 3, price: 599 },
  "12-day": { name: "12-Day Plan", days: 12, price: 3999 },
  "24-day": { name: "24-Day Plan", days: 24, price: 6999 },
  "48-day": { name: "48-Day Plan", days: 48, price: 11999 },
};

export default function CheckoutPage() {
  const router = useRouter();
  const [planSlug, setPlanSlug] = useState("12-day");
  const [salads, setSalads] = useState<string[]>([]);
  const [address, setAddress] = useState<Record<string, string>>({});
  const [processing, setProcessing] = useState(false);

  useEffect(() => {
    setPlanSlug(sessionStorage.getItem("irie_sub_plan") || "12-day");
    const savedSalads = sessionStorage.getItem("irie_sub_salads");
    if (savedSalads) setSalads(JSON.parse(savedSalads));
    const savedAddr = sessionStorage.getItem("irie_sub_address");
    if (savedAddr) setAddress(JSON.parse(savedAddr));
  }, []);

  const plan = PLAN_DATA[planSlug] || PLAN_DATA["12-day"];

  function handlePay() {
    setProcessing(true);
    // POC: Simulate payment — in production, integrate Razorpay
    setTimeout(() => {
      sessionStorage.removeItem("irie_sub_plan");
      sessionStorage.removeItem("irie_sub_salads");
      sessionStorage.removeItem("irie_sub_address");
      router.push("/subscribe/success");
    }, 2000);
  }

  return (
    <div>
      {/* Progress */}
      <div className="mb-8">
        <div className="flex items-center justify-between text-xs font-medium text-muted-foreground mb-2">
          <span className="text-forest">1. Choose Plan</span>
          <span className="text-forest">2. Pick Salads</span>
          <span className="text-forest">3. Address</span>
          <span className="text-forest font-bold">4. Checkout</span>
        </div>
        <div className="h-2 rounded-full bg-border overflow-hidden">
          <div className="h-full w-full bg-forest rounded-full transition-all" />
        </div>
      </div>

      <h1 className="text-2xl font-bold text-forest mb-6">Review & Pay</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Order Summary */}
        <div className="space-y-4">
          <Card>
            <h2 className="font-bold text-foreground mb-3">Order Summary</h2>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Plan</span>
                <span className="font-medium">{plan.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Duration</span>
                <span>{plan.days} days</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Salads selected</span>
                <span>{salads.length}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Delivery</span>
                <span className="text-success font-medium">Free</span>
              </div>
              <div className="border-t border-border pt-2 mt-2 flex justify-between font-bold text-base">
                <span>Total</span>
                <span className="text-forest">Rs.{plan.price.toLocaleString()}</span>
              </div>
            </div>
          </Card>

          <Card>
            <h2 className="font-bold text-foreground mb-3">Delivery Address</h2>
            <div className="text-sm text-muted-foreground">
              <p className="font-medium text-foreground">{address.label || "Home"}</p>
              <p>{address.line1}</p>
              {address.line2 && <p>{address.line2}</p>}
              <p>{address.city}, {address.state} - {address.pincode}</p>
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
                <span className="font-medium">Secure payment via Razorpay</span>
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                UPI, Credit/Debit Cards, Net Banking, Wallets
              </p>
            </div>

            <div className="space-y-3 mb-6 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Check size={14} className="text-success" />
                Cancel or pause anytime
              </div>
              <div className="flex items-center gap-2">
                <Check size={14} className="text-success" />
                Modify daily menu until 6 PM
              </div>
              <div className="flex items-center gap-2">
                <Check size={14} className="text-success" />
                Skipped days are added back
              </div>
            </div>

            <Button
              onClick={handlePay}
              loading={processing}
              size="lg"
              className="w-full"
            >
              <CreditCard size={18} />
              Pay Rs.{plan.price.toLocaleString()}
            </Button>

            <p className="text-center text-xs text-muted-foreground mt-3">
              POC: Payment is simulated. No actual charges.
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
