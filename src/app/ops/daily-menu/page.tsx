"use client";

import { useState } from "react";
import { Card, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { DataTable } from "@/components/ui/data-table";
import { DAILY_MENU_ENTRIES } from "@/data/daily-menu";
import { MEAL_CATEGORIES } from "@/data/meal-categories";
import { RECIPES, getRecipeBySlug } from "@/data/recipes";
import { MEAL_OCCASIONS } from "@/lib/constants";
import { UtensilsCrossed, X } from "lucide-react";
import type { MealOccasion, Recipe } from "@/types/domain";

const STATUS_COLOR: Record<string, "success" | "warning" | "info" | "outline" | "danger"> = {
  active: "success",
  testing: "warning",
  draft: "info",
  approved: "info",
  retired: "outline",
};

export default function DailyMenuPage() {
  const [selectedDate, setSelectedDate] = useState("2026-08-16");
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);

  const entries = DAILY_MENU_ENTRIES.filter((e) => e.date === selectedDate);

  // Group entries by meal occasion
  const grouped = MEAL_OCCASIONS.map((mo) => {
    const occasionEntries = entries.filter((e) => e.mealOccasion === mo.occasion);
    return {
      ...mo,
      entries: occasionEntries.map((entry) => {
        const category = MEAL_CATEGORIES.find((mc) => mc.slug === entry.mealCategorySlug);
        const recipe = getRecipeBySlug(entry.recipeSlug);
        return { ...entry, category, recipe };
      }),
    };
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Daily Menu Management</h1>
          <p className="text-muted-foreground">Meal category to recipe assignments by occasion</p>
        </div>
        <div className="flex items-center gap-3">
          <label htmlFor="menu-date" className="text-sm text-muted-foreground">
            Date:
          </label>
          <input
            id="menu-date"
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="px-3 py-2 border border-border rounded-lg text-sm"
          />
        </div>
      </div>

      {/* Info Card */}
      <Card className="bg-forest/5 border-forest/20">
        <div className="flex items-center gap-3">
          <UtensilsCrossed size={20} className="text-forest" />
          <div>
            <p className="font-medium text-foreground">
              {new Date(selectedDate + "T00:00:00").toLocaleDateString("en-IN", {
                weekday: "long",
                month: "long",
                day: "numeric",
                year: "numeric",
              })}
            </p>
            <p className="text-sm text-muted-foreground">
              {entries.length} menu entries across {grouped.filter((g) => g.entries.length > 0).length} meal occasions
            </p>
          </div>
        </div>
      </Card>

      {/* Entries grouped by meal occasion */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {grouped.map((group) => (
          <Card key={group.occasion}>
            <CardTitle className="flex items-center justify-between mb-4">
              <span>{group.label}</span>
              <Badge variant={group.deliveryWindow === "morning" ? "warning" : "info"}>
                {group.deliveryWindow === "morning" ? "Morning Delivery" : "Evening Delivery"}
              </Badge>
            </CardTitle>

            {group.entries.length === 0 ? (
              <p className="text-sm text-muted-foreground">No entries for this date.</p>
            ) : (
              <div className="space-y-3">
                {group.entries.map((entry) => (
                  <div
                    key={entry.id}
                    className="flex items-center justify-between py-2 border-b border-border last:border-0 cursor-pointer hover:bg-muted/50 rounded px-2 -mx-2"
                    onClick={() => entry.recipe && setSelectedRecipe(entry.recipe)}
                  >
                    <div>
                      <p className="text-sm font-medium">{entry.category?.shortName || entry.mealCategorySlug}</p>
                      <p className="text-xs text-muted-foreground">
                        {entry.recipe?.name || entry.recipeSlug}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      {entry.recipe && (
                        <Badge variant={STATUS_COLOR[entry.recipe.status] || "outline"}>
                          {entry.recipe.status}
                        </Badge>
                      )}
                      {entry.recipe && (
                        <span className="text-xs text-muted-foreground">{entry.recipe.nutrition.calories} cal</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </Card>
        ))}
      </div>

      {/* Recipe Detail Panel */}
      {selectedRecipe && (
        <Card className="border-forest/30">
          <div className="flex items-center justify-between mb-4">
            <CardTitle>{selectedRecipe.name}</CardTitle>
            <button
              onClick={() => setSelectedRecipe(null)}
              className="p-1 hover:bg-muted rounded"
            >
              <X size={18} />
            </button>
          </div>
          <p className="text-sm text-muted-foreground mb-4">{selectedRecipe.description}</p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
            <div className="text-center p-3 bg-muted rounded-lg">
              <p className="text-lg font-bold text-forest">{selectedRecipe.nutrition.calories}</p>
              <p className="text-xs text-muted-foreground">Calories</p>
            </div>
            <div className="text-center p-3 bg-muted rounded-lg">
              <p className="text-lg font-bold text-forest">{selectedRecipe.nutrition.proteinG}g</p>
              <p className="text-xs text-muted-foreground">Protein</p>
            </div>
            <div className="text-center p-3 bg-muted rounded-lg">
              <p className="text-lg font-bold text-forest">{selectedRecipe.nutrition.carbsG}g</p>
              <p className="text-xs text-muted-foreground">Carbs</p>
            </div>
            <div className="text-center p-3 bg-muted rounded-lg">
              <p className="text-lg font-bold text-forest">{selectedRecipe.nutrition.fatG}g</p>
              <p className="text-xs text-muted-foreground">Fat</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-muted-foreground">Region</p>
              <p className="font-medium capitalize">{selectedRecipe.region}</p>
            </div>
            <div>
              <p className="text-muted-foreground">Cooking Method</p>
              <p className="font-medium capitalize">{selectedRecipe.cookingMethod}</p>
            </div>
            <div>
              <p className="text-muted-foreground">Portion Size</p>
              <p className="font-medium">{selectedRecipe.portionSize}</p>
            </div>
            <div>
              <p className="text-muted-foreground">Allergens</p>
              <p className="font-medium">
                {selectedRecipe.allergens.length > 0
                  ? selectedRecipe.allergens.join(", ")
                  : "None"}
              </p>
            </div>
          </div>

          <div className="flex flex-wrap gap-2 mt-4">
            {selectedRecipe.tags.map((tag) => (
              <Badge key={tag} variant="default">
                {tag}
              </Badge>
            ))}
          </div>
        </Card>
      )}
    </div>
  );
}
