"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check } from "lucide-react";

const SALADS = [
  { id: "1", name: "Mediterranean Power Bowl", cal: 480, tags: ["High Protein"], image: "/images/salads/mediterranean-power-bowl.jpg" },
  { id: "2", name: "Asian Sesame Crunch", cal: 320, tags: ["Vegan"], image: "/images/salads/asian-sesame-crunch.jpg" },
  { id: "3", name: "Caesar Supreme", cal: 420, tags: ["Classic"], image: "/images/salads/caesar-supreme.jpg" },
  { id: "4", name: "Tropical Mango Bliss", cal: 290, tags: ["Vegan", "Low Cal"], image: "/images/salads/tropical-mango-bliss.jpg" },
  { id: "5", name: "Grilled Paneer Tikka", cal: 440, tags: ["Vegetarian"], image: "/images/salads/grilled-paneer-tikka.jpg" },
  { id: "6", name: "Greek Garden Fresh", cal: 260, tags: ["Low Cal"], image: "/images/salads/greek-garden-fresh.jpg" },
  { id: "7", name: "Smoked Chicken & Avocado", cal: 510, tags: ["High Protein"], image: "/images/salads/smoked-chicken-avocado.jpg" },
  { id: "8", name: "Beetroot & Goat Cheese", cal: 340, tags: ["Superfoods"], image: "/images/salads/beetroot-goat-cheese.jpg" },
  { id: "9", name: "Thai Peanut Crunch", cal: 350, tags: ["Vegan", "Spicy"], image: "/images/salads/thai-peanut-crunch.jpg" },
  { id: "10", name: "Quinoa Superfood Bowl", cal: 410, tags: ["Vegan", "Superfoods"], image: "/images/salads/quinoa-superfood-bowl.jpg" },
];

const PLAN_DAYS: Record<string, number> = {
  trial: 3,
  "12-day": 12,
  "24-day": 24,
  "48-day": 48,
};

export default function CustomizePage() {
  const router = useRouter();
  const [plan, setPlan] = useState("12-day");
  const [selected, setSelected] = useState<string[]>([]);

  useEffect(() => {
    const saved = sessionStorage.getItem("irie_sub_plan");
    if (saved) setPlan(saved);
  }, []);

  const maxPicks = Math.min(PLAN_DAYS[plan] || 12, SALADS.length);

  function toggleSalad(id: string) {
    setSelected((prev) =>
      prev.includes(id)
        ? prev.filter((s) => s !== id)
        : prev.length < maxPicks
        ? [...prev, id]
        : prev
    );
  }

  function handleContinue() {
    sessionStorage.setItem("irie_sub_salads", JSON.stringify(selected));
    router.push("/subscribe/address");
  }

  return (
    <div>
      {/* Progress */}
      <div className="mb-8">
        <div className="flex items-center justify-between text-xs font-medium text-muted-foreground mb-2">
          <span className="text-forest">1. Choose Plan</span>
          <span className="text-forest font-bold">2. Pick Salads</span>
          <span>3. Address</span>
          <span>4. Checkout</span>
        </div>
        <div className="h-2 rounded-full bg-border overflow-hidden">
          <div className="h-full w-2/4 bg-forest rounded-full transition-all" />
        </div>
      </div>

      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-forest">Pick Your Salads</h1>
          <p className="text-muted-foreground">
            Choose up to {maxPicks} favorites. We&apos;ll rotate them through your plan.
          </p>
        </div>
        <Badge variant={selected.length >= 3 ? "success" : "warning"}>
          {selected.length}/{maxPicks} selected
        </Badge>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {SALADS.map((salad) => {
          const isSelected = selected.includes(salad.id);
          return (
            <button
              key={salad.id}
              onClick={() => toggleSalad(salad.id)}
              className={`flex items-center gap-4 rounded-xl border-2 p-4 text-left transition-all ${
                isSelected
                  ? "border-forest bg-forest/5"
                  : "border-border bg-white hover:border-sage"
              }`}
            >
              <div className="h-16 w-16 rounded-lg overflow-hidden relative shrink-0">
                <Image src={salad.image} alt={salad.name} fill className="object-cover" sizes="64px" />
                {isSelected && (
                  <div className="absolute inset-0 bg-forest/60 flex items-center justify-center">
                    <Check size={20} className="text-white" />
                  </div>
                )}
              </div>
              <div className="min-w-0">
                <h3 className="font-semibold text-foreground truncate">{salad.name}</h3>
                <p className="text-sm text-muted-foreground">{salad.cal} cal</p>
                <div className="flex gap-1 mt-1">
                  {salad.tags.map((t) => (
                    <Badge key={t} variant="default" className="text-[10px]">{t}</Badge>
                  ))}
                </div>
              </div>
            </button>
          );
        })}
      </div>

      <div className="mt-8 flex justify-between">
        <Button variant="ghost" onClick={() => router.push("/subscribe")}>
          Back
        </Button>
        <Button onClick={handleContinue} size="lg" disabled={selected.length < 3}>
          Continue to Address
        </Button>
      </div>
    </div>
  );
}
