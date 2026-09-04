"use client";

import { useState, useMemo } from "react";
import { Card, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { StatCard } from "@/components/ui/stat-card";
import { DataTable } from "@/components/ui/data-table";
import { Input } from "@/components/ui/input";
import { RECIPES } from "@/data/recipes";
import { MEAL_OCCASIONS } from "@/lib/constants";
import { BookOpen, X } from "lucide-react";
import type { MealOccasion, RecipeStatus, IndianRegion, Recipe } from "@/types/domain";

const STATUS_FILTERS: { value: RecipeStatus | "all"; label: string }[] = [
  { value: "all", label: "All" },
  { value: "active", label: "Active" },
  { value: "draft", label: "Draft" },
  { value: "testing", label: "Testing" },
  { value: "retired", label: "Retired" },
];

const OCCASION_FILTERS: { value: MealOccasion | "all"; label: string }[] = [
  { value: "all", label: "All Occasions" },
  ...MEAL_OCCASIONS.map((mo) => ({ value: mo.occasion, label: mo.label })),
];

const REGION_FILTERS: { value: IndianRegion | "all"; label: string }[] = [
  { value: "all", label: "All Regions" },
  { value: "north", label: "North" },
  { value: "south", label: "South" },
  { value: "east", label: "East" },
  { value: "west", label: "West" },
  { value: "central", label: "Central" },
  { value: "pan-indian", label: "Pan-Indian" },
];

const STATUS_COLOR: Record<string, "success" | "warning" | "info" | "outline" | "danger"> = {
  active: "success",
  testing: "warning",
  draft: "info",
  approved: "info",
  retired: "outline",
};

export default function RecipesPage() {
  const [statusFilter, setStatusFilter] = useState<RecipeStatus | "all">("all");
  const [occasionFilter, setOccasionFilter] = useState<MealOccasion | "all">("all");
  const [regionFilter, setRegionFilter] = useState<IndianRegion | "all">("all");
  const [search, setSearch] = useState("");
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);

  const filtered = useMemo(() => {
    return RECIPES.filter((r) => {
      if (statusFilter !== "all" && r.status !== statusFilter) return false;
      if (occasionFilter !== "all" && r.mealOccasion !== occasionFilter) return false;
      if (regionFilter !== "all" && r.region !== regionFilter) return false;
      if (search && !r.name.toLowerCase().includes(search.toLowerCase()) && !r.shortName.toLowerCase().includes(search.toLowerCase())) return false;
      return true;
    });
  }, [statusFilter, occasionFilter, regionFilter, search]);

  const stats = {
    total: RECIPES.length,
    active: RECIPES.filter((r) => r.status === "active").length,
    testing: RECIPES.filter((r) => r.status === "testing").length,
    draft: RECIPES.filter((r) => r.status === "draft").length,
  };

  const columns = [
    {
      key: "name",
      header: "Name",
      render: (row: Recipe) => (
        <button className="text-left hover:text-forest font-medium" onClick={() => setSelectedRecipe(row)}>
          {row.name}
        </button>
      ),
    },
    {
      key: "mealOccasion",
      header: "Meal Occasion",
      render: (row: Recipe) => {
        const label = MEAL_OCCASIONS.find((mo) => mo.occasion === row.mealOccasion)?.label || row.mealOccasion;
        return <Badge variant="outline">{label}</Badge>;
      },
    },
    {
      key: "region",
      header: "Region",
      render: (row: Recipe) => <span className="text-sm capitalize">{row.region}</span>,
    },
    {
      key: "cookingMethod",
      header: "Method",
      render: (row: Recipe) => <span className="text-sm capitalize">{row.cookingMethod}</span>,
    },
    {
      key: "status",
      header: "Status",
      render: (row: Recipe) => <Badge variant={STATUS_COLOR[row.status] || "outline"}>{row.status}</Badge>,
    },
    {
      key: "calories",
      header: "Calories",
      className: "text-right",
      render: (row: Recipe) => <span className="font-medium">{row.nutrition.calories}</span>,
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-foreground">Recipe Management</h1>
        <p className="text-muted-foreground">
          Complete recipe catalog with nutrition, allergens, and preparation details
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Total Recipes" value={stats.total} icon={<BookOpen size={20} />} />
        <StatCard title="Active" value={stats.active} className="border-success/30" />
        <StatCard title="Testing" value={stats.testing} className="border-warning/30" />
        <StatCard title="Draft" value={stats.draft} className="border-blue-200" />
      </div>

      {/* Filters */}
      <Card className="py-4">
        <div className="flex flex-wrap items-end gap-4">
          <div className="w-64">
            <Input
              label="Search"
              type="text"
              placeholder="Search recipes..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <div className="flex gap-2">
            {STATUS_FILTERS.map((sf) => (
              <Button
                key={sf.value}
                variant={statusFilter === sf.value ? "primary" : "ghost"}
                size="sm"
                onClick={() => setStatusFilter(sf.value)}
              >
                {sf.label}
              </Button>
            ))}
          </div>
          <div className="flex gap-2">
            <select
              value={occasionFilter}
              onChange={(e) => setOccasionFilter(e.target.value as MealOccasion | "all")}
              className="px-3 py-2 border border-border rounded-lg text-sm"
            >
              {OCCASION_FILTERS.map((of) => (
                <option key={of.value} value={of.value}>
                  {of.label}
                </option>
              ))}
            </select>
            <select
              value={regionFilter}
              onChange={(e) => setRegionFilter(e.target.value as IndianRegion | "all")}
              className="px-3 py-2 border border-border rounded-lg text-sm"
            >
              {REGION_FILTERS.map((rf) => (
                <option key={rf.value} value={rf.value}>
                  {rf.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </Card>

      {/* Results count */}
      <p className="text-sm text-muted-foreground">{filtered.length} recipes found</p>

      {/* Table */}
      <DataTable
        columns={columns as unknown as { key: string; header: string; render?: (row: Record<string, unknown>) => React.ReactNode; className?: string }[]}
        data={filtered as unknown as Record<string, unknown>[]}
        keyField="id"
        emptyMessage="No recipes match your filters."
      />

      {/* Recipe Detail Panel */}
      {selectedRecipe && (
        <Card className="border-forest/30">
          <div className="flex items-center justify-between mb-4">
            <CardTitle>{selectedRecipe.name}</CardTitle>
            <button onClick={() => setSelectedRecipe(null)} className="p-1 hover:bg-muted rounded">
              <X size={18} />
            </button>
          </div>
          <p className="text-sm text-muted-foreground mb-4">{selectedRecipe.description}</p>

          {/* Nutrition Grid */}
          <div className="grid grid-cols-5 gap-3 mb-4">
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
            <div className="text-center p-3 bg-muted rounded-lg">
              <p className="text-lg font-bold text-forest">{selectedRecipe.nutrition.fiberG}g</p>
              <p className="text-xs text-muted-foreground">Fiber</p>
            </div>
          </div>

          {/* Details Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm mb-4">
            <div>
              <p className="text-muted-foreground">Meal Occasion</p>
              <p className="font-medium">
                {MEAL_OCCASIONS.find((mo) => mo.occasion === selectedRecipe.mealOccasion)?.label || selectedRecipe.mealOccasion}
              </p>
            </div>
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
              <p className="text-muted-foreground">Status</p>
              <Badge variant={STATUS_COLOR[selectedRecipe.status] || "outline"}>{selectedRecipe.status}</Badge>
            </div>
            <div>
              <p className="text-muted-foreground">Vegetarian</p>
              <p className="font-medium">{selectedRecipe.isVegetarian ? "Yes" : "No"}</p>
            </div>
          </div>

          {/* Allergens */}
          <div className="mb-4">
            <p className="text-sm text-muted-foreground mb-1">Allergens</p>
            {selectedRecipe.allergens.length > 0 ? (
              <div className="flex flex-wrap gap-2">
                {selectedRecipe.allergens.map((a) => (
                  <Badge key={a} variant="danger">{a}</Badge>
                ))}
              </div>
            ) : (
              <p className="text-sm font-medium text-success">None</p>
            )}
          </div>

          {/* Tags */}
          <div className="mb-4">
            <p className="text-sm text-muted-foreground mb-1">Tags</p>
            <div className="flex flex-wrap gap-2">
              {selectedRecipe.tags.map((tag) => (
                <Badge key={tag} variant="default">{tag}</Badge>
              ))}
            </div>
          </div>

          {/* Instructions */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-muted-foreground">Reheating Instructions</p>
              <p className="font-medium">{selectedRecipe.reheatingInstructions}</p>
            </div>
            <div>
              <p className="text-muted-foreground">Storage Instructions</p>
              <p className="font-medium">{selectedRecipe.storageInstructions}</p>
            </div>
          </div>
        </Card>
      )}
    </div>
  );
}
