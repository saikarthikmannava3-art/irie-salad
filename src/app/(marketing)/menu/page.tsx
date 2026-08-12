"use client";

import { useState } from "react";
import { ChefHat, Flame, Leaf, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

// Demo data — in production, fetched from Supabase
const CATEGORIES = ["All", "Signature Salads", "Protein Bowls", "Light & Fresh"];

const SALADS = [
  {
    id: "1", name: "Mediterranean Power Bowl", slug: "mediterranean-power-bowl",
    category: "Protein Bowls", description: "Grilled chicken, quinoa, roasted veggies, feta, olives, lemon herb dressing",
    price: 349, calories: 480, protein: 32, fiber: 8,
    tags: ["High Protein", "Gluten Free"], color: "bg-emerald-100",
  },
  {
    id: "2", name: "Asian Sesame Crunch", slug: "asian-sesame-crunch",
    category: "Signature Salads", description: "Edamame, purple cabbage, mandarin, crispy wontons, sesame ginger dressing",
    price: 299, calories: 320, protein: 14, fiber: 6,
    tags: ["Vegan", "Crunchy"], color: "bg-amber-100",
  },
  {
    id: "3", name: "Caesar Supreme", slug: "caesar-supreme",
    category: "Signature Salads", description: "Romaine, parmesan crisps, grilled chicken, house-made caesar dressing",
    price: 329, calories: 420, protein: 28, fiber: 4,
    tags: ["Classic", "High Protein"], color: "bg-green-100",
  },
  {
    id: "4", name: "Tropical Mango Bliss", slug: "tropical-mango-bliss",
    category: "Light & Fresh", description: "Mango, avocado, cherry tomatoes, microgreens, citrus vinaigrette",
    price: 279, calories: 290, protein: 8, fiber: 7,
    tags: ["Vegan", "Low Cal"], color: "bg-orange-100",
  },
  {
    id: "5", name: "Grilled Paneer Tikka Bowl", slug: "grilled-paneer-tikka",
    category: "Protein Bowls", description: "Tandoori paneer, chickpeas, cucumber raita, mint chutney dressing",
    price: 349, calories: 440, protein: 24, fiber: 9,
    tags: ["Vegetarian", "Indian"], color: "bg-red-100",
  },
  {
    id: "6", name: "Greek Garden Fresh", slug: "greek-garden-fresh",
    category: "Light & Fresh", description: "Cucumber, tomato, bell pepper, olives, feta, oregano vinaigrette",
    price: 269, calories: 260, protein: 10, fiber: 5,
    tags: ["Vegetarian", "Low Cal"], color: "bg-blue-100",
  },
  {
    id: "7", name: "Smoked Chicken & Avocado", slug: "smoked-chicken-avocado",
    category: "Protein Bowls", description: "Smoked chicken breast, avocado, corn, black beans, chipotle ranch",
    price: 379, calories: 510, protein: 36, fiber: 10,
    tags: ["High Protein", "Keto Friendly"], color: "bg-lime-100",
  },
  {
    id: "8", name: "Beetroot & Goat Cheese", slug: "beetroot-goat-cheese",
    category: "Signature Salads", description: "Roasted beetroot, goat cheese, walnuts, arugula, balsamic reduction",
    price: 319, calories: 340, protein: 12, fiber: 6,
    tags: ["Vegetarian", "Superfoods"], color: "bg-pink-100",
  },
  {
    id: "9", name: "Thai Peanut Crunch", slug: "thai-peanut-crunch",
    category: "Signature Salads", description: "Shredded cabbage, carrots, peanuts, cilantro, spicy peanut dressing",
    price: 289, calories: 350, protein: 14, fiber: 7,
    tags: ["Vegan", "Spicy"], color: "bg-yellow-100",
  },
  {
    id: "10", name: "Quinoa Superfood Bowl", slug: "quinoa-superfood-bowl",
    category: "Protein Bowls", description: "Tricolor quinoa, kale, sweet potato, pomegranate, tahini dressing",
    price: 359, calories: 410, protein: 18, fiber: 12,
    tags: ["Vegan", "Superfoods"], color: "bg-purple-100",
  },
];

export default function MenuPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [search, setSearch] = useState("");

  const filtered = SALADS.filter((s) => {
    const matchCategory = activeCategory === "All" || s.category === activeCategory;
    const matchSearch = s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.tags.some((t) => t.toLowerCase().includes(search.toLowerCase()));
    return matchCategory && matchSearch;
  });

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-forest">Our Menu</h1>
        <p className="mt-3 text-lg text-muted-foreground">
          Fresh, chef-crafted salads made with love every single day
        </p>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">
        <div className="flex gap-2 overflow-x-auto pb-2 sm:pb-0">
          {CATEGORIES.map((cat) => (
            <Button
              key={cat}
              variant={activeCategory === cat ? "primary" : "ghost"}
              size="sm"
              onClick={() => setActiveCategory(cat)}
            >
              {cat}
            </Button>
          ))}
        </div>
        <div className="relative w-full sm:w-72">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search salads or tags..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-lg border border-border bg-white py-2 pl-9 pr-3 text-sm focus:border-forest focus:outline-none focus:ring-2 focus:ring-forest/20"
          />
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((salad) => (
          <div key={salad.id} className="group rounded-xl bg-white border border-border overflow-hidden shadow-sm hover:shadow-md transition-all">
            <div className={`h-48 ${salad.color} flex items-center justify-center relative`}>
              <ChefHat size={56} className="text-forest/15" />
              <div className="absolute top-3 right-3">
                <span className="rounded-full bg-white/90 px-2.5 py-1 text-xs font-bold text-forest">
                  Rs.{salad.price}
                </span>
              </div>
            </div>
            <div className="p-5">
              <div className="text-xs font-medium text-sage uppercase tracking-wider">{salad.category}</div>
              <h3 className="mt-1 text-lg font-semibold text-foreground group-hover:text-forest transition-colors">
                {salad.name}
              </h3>
              <p className="mt-2 text-sm text-muted-foreground line-clamp-2">{salad.description}</p>

              {/* Nutrition */}
              <div className="mt-4 flex items-center gap-4 text-xs text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Flame size={12} className="text-orange-500" /> {salad.calories} cal
                </span>
                <span className="flex items-center gap-1">
                  <span className="font-bold text-forest">P</span> {salad.protein}g
                </span>
                <span className="flex items-center gap-1">
                  <Leaf size={12} className="text-sage" /> {salad.fiber}g fiber
                </span>
              </div>

              {/* Tags */}
              <div className="mt-3 flex flex-wrap gap-1.5">
                {salad.tags.map((tag) => (
                  <Badge key={tag} variant="default">{tag}</Badge>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-16 text-muted-foreground">
          No salads match your search. Try different keywords.
        </div>
      )}

      {/* CTA */}
      <div className="mt-16 text-center">
        <p className="text-muted-foreground mb-4">Found something you love?</p>
        <Link href="/subscribe">
          <Button size="lg">Start Your Subscription</Button>
        </Link>
      </div>
    </div>
  );
}
