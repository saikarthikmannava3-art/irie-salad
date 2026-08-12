"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function AddressPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    label: "Home",
    line1: "",
    line2: "",
    city: "Bangalore",
    state: "Karnataka",
    pincode: "",
  });

  function update(field: string, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  function handleContinue(e: React.FormEvent) {
    e.preventDefault();
    sessionStorage.setItem("irie_sub_address", JSON.stringify(form));
    router.push("/subscribe/checkout");
  }

  return (
    <div>
      {/* Progress */}
      <div className="mb-8">
        <div className="flex items-center justify-between text-xs font-medium text-muted-foreground mb-2">
          <span className="text-forest">1. Choose Plan</span>
          <span className="text-forest">2. Pick Salads</span>
          <span className="text-forest font-bold">3. Address</span>
          <span>4. Checkout</span>
        </div>
        <div className="h-2 rounded-full bg-border overflow-hidden">
          <div className="h-full w-3/4 bg-forest rounded-full transition-all" />
        </div>
      </div>

      <h1 className="text-2xl font-bold text-forest mb-2">Delivery Address</h1>
      <p className="text-muted-foreground mb-8">Where should we deliver your salads?</p>

      <form onSubmit={handleContinue} className="space-y-4 max-w-lg">
        <div className="flex gap-2">
          {["Home", "Work", "Other"].map((label) => (
            <button
              key={label}
              type="button"
              onClick={() => update("label", label)}
              className={`rounded-lg px-4 py-2 text-sm font-medium border-2 transition-colors ${
                form.label === label
                  ? "border-forest bg-forest/10 text-forest"
                  : "border-border text-muted-foreground hover:border-sage"
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        <Input
          label="Address Line 1"
          placeholder="Flat/Building, Street"
          value={form.line1}
          onChange={(e) => update("line1", e.target.value)}
          required
        />
        <Input
          label="Address Line 2"
          placeholder="Area, Landmark (optional)"
          value={form.line2}
          onChange={(e) => update("line2", e.target.value)}
        />
        <div className="grid grid-cols-2 gap-4">
          <Input
            label="City"
            value={form.city}
            onChange={(e) => update("city", e.target.value)}
            required
          />
          <Input
            label="State"
            value={form.state}
            onChange={(e) => update("state", e.target.value)}
            required
          />
        </div>
        <Input
          label="Pincode"
          placeholder="560001"
          value={form.pincode}
          onChange={(e) => update("pincode", e.target.value)}
          required
          maxLength={6}
          pattern="[0-9]{6}"
        />

        <div className="rounded-lg bg-cream p-4 text-sm">
          <p className="font-medium text-forest">Delivery Zone: HSR Kitchen Coverage</p>
          <p className="text-muted-foreground mt-1">Free delivery included with all plans</p>
        </div>

        <div className="flex justify-between pt-4">
          <Button type="button" variant="ghost" onClick={() => router.push("/subscribe/customize")}>
            Back
          </Button>
          <Button type="submit" size="lg">
            Continue to Checkout
          </Button>
        </div>
      </form>
    </div>
  );
}
