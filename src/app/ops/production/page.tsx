"use client";

import { useState } from "react";
import { Card, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge, StatusBadge } from "@/components/ui/badge";
import { StatCard } from "@/components/ui/stat-card";
import { DataTable } from "@/components/ui/data-table";
import { ChefHat, Clock, AlertTriangle, CheckCircle, Play, Printer } from "lucide-react";

// Demo snapshot data
const SNAPSHOT = {
  id: "snap-001",
  productionDate: "2026-08-12",
  snapshotTaken: "2026-08-11T18:00:00",
  status: "completed" as const,
  totalOrders: 142,
  lockedOrders: 138,
  skippedOrders: 4,
};

const PRODUCTION_REQUIREMENTS = [
  { id: "1", menuItem: "Mediterranean Power Bowl", quantity: 28, status: "pending" },
  { id: "2", menuItem: "Caesar Supreme", quantity: 24, status: "pending" },
  { id: "3", menuItem: "Asian Sesame Crunch", quantity: 22, status: "pending" },
  { id: "4", menuItem: "Grilled Paneer Tikka", quantity: 20, status: "pending" },
  { id: "5", menuItem: "Quinoa Superfood Bowl", quantity: 16, status: "pending" },
  { id: "6", menuItem: "Greek Garden Fresh", quantity: 12, status: "pending" },
  { id: "7", menuItem: "Tropical Mango Bliss", quantity: 8, status: "pending" },
  { id: "8", menuItem: "Smoked Chicken & Avocado", quantity: 4, status: "pending" },
  { id: "9", menuItem: "Beetroot & Goat Cheese", quantity: 2, status: "pending" },
  { id: "10", menuItem: "Thai Peanut Crunch", quantity: 2, status: "pending" },
];

const INGREDIENT_REQUIREMENTS = [
  { id: "1", ingredient: "Baby Spinach", required: 5.2, available: 2.1, shortage: 3.1, unit: "kg" },
  { id: "2", ingredient: "Romaine Lettuce", required: 4.8, available: 6.0, shortage: 0, unit: "kg" },
  { id: "3", ingredient: "Chicken Breast", required: 8.4, available: 10.0, shortage: 0, unit: "kg" },
  { id: "4", ingredient: "Quinoa", required: 3.0, available: 1.5, shortage: 1.5, unit: "kg" },
  { id: "5", ingredient: "Feta Cheese", required: 1.8, available: 0.5, shortage: 1.3, unit: "kg" },
  { id: "6", ingredient: "Cherry Tomatoes", required: 3.2, available: 4.0, shortage: 0, unit: "kg" },
  { id: "7", ingredient: "Cucumber", required: 2.5, available: 3.0, shortage: 0, unit: "kg" },
  { id: "8", ingredient: "Olives", required: 1.2, available: 2.0, shortage: 0, unit: "kg" },
  { id: "9", ingredient: "Paneer", required: 4.0, available: 4.5, shortage: 0, unit: "kg" },
  { id: "10", ingredient: "Avocado", required: 1.6, available: 2.0, shortage: 0, unit: "kg" },
  { id: "11", ingredient: "Edamame", required: 2.2, available: 3.0, shortage: 0, unit: "kg" },
  { id: "12", ingredient: "Bell Pepper", required: 1.8, available: 2.5, shortage: 0, unit: "kg" },
  { id: "13", ingredient: "Beetroot", required: 0.4, available: 1.0, shortage: 0, unit: "kg" },
  { id: "14", ingredient: "Mango", required: 1.6, available: 2.0, shortage: 0, unit: "kg" },
  { id: "15", ingredient: "Sweet Potato", required: 1.6, available: 2.0, shortage: 0, unit: "kg" },
];

export default function ProductionPage() {
  const [snapshotRun, setSnapshotRun] = useState(true); // pretend snapshot has run
  const [tab, setTab] = useState<"production" | "ingredients">("production");

  const shortages = INGREDIENT_REQUIREMENTS.filter((i) => i.shortage > 0);

  const productionColumns = [
    { key: "menuItem", header: "Salad" },
    { key: "quantity", header: "Qty", className: "text-right font-bold", render: (row: typeof PRODUCTION_REQUIREMENTS[0]) => (
      <span className="text-lg font-bold text-forest">{row.quantity}</span>
    )},
    { key: "status", header: "Status", render: (row: typeof PRODUCTION_REQUIREMENTS[0]) => (
      <StatusBadge status={row.status} />
    )},
  ];

  const ingredientColumns = [
    { key: "ingredient", header: "Ingredient" },
    { key: "required", header: "Required", className: "text-right", render: (row: typeof INGREDIENT_REQUIREMENTS[0]) => (
      <span>{row.required} {row.unit}</span>
    )},
    { key: "available", header: "Available", className: "text-right", render: (row: typeof INGREDIENT_REQUIREMENTS[0]) => (
      <span>{row.available} {row.unit}</span>
    )},
    { key: "shortage", header: "Shortage", className: "text-right", render: (row: typeof INGREDIENT_REQUIREMENTS[0]) => (
      row.shortage > 0
        ? <span className="font-bold text-danger">-{row.shortage} {row.unit}</span>
        : <span className="text-success">OK</span>
    )},
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Production Planning</h1>
          <p className="text-muted-foreground">
            Production for {new Date(SNAPSHOT.productionDate).toLocaleDateString("en-IN", { weekday: "long", month: "long", day: "numeric" })}
          </p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" size="sm">
            <Printer size={16} /> Print Sheet
          </Button>
          <Button
            size="sm"
            disabled={snapshotRun}
            onClick={() => setSnapshotRun(true)}
          >
            <Play size={16} /> {snapshotRun ? "Snapshot Complete" : "Run 6 PM Snapshot"}
          </Button>
        </div>
      </div>

      {/* Snapshot Status */}
      {snapshotRun && (
        <Card className="bg-forest/5 border-forest/20">
          <div className="flex items-center gap-3">
            <CheckCircle size={20} className="text-success" />
            <div>
              <p className="font-medium text-foreground">
                6 PM Snapshot completed at {new Date(SNAPSHOT.snapshotTaken).toLocaleTimeString("en-IN")}
              </p>
              <p className="text-sm text-muted-foreground">
                {SNAPSHOT.lockedOrders} orders locked &middot; {SNAPSHOT.skippedOrders} skipped &middot; {SNAPSHOT.totalOrders} total
              </p>
            </div>
          </div>
        </Card>
      )}

      {/* KPI Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Total Orders" value={SNAPSHOT.totalOrders} icon={<ChefHat size={20} />} />
        <StatCard title="Locked" value={SNAPSHOT.lockedOrders} icon={<Clock size={20} />} />
        <StatCard title="Skipped" value={SNAPSHOT.skippedOrders} />
        <StatCard
          title="Shortages"
          value={shortages.length}
          icon={<AlertTriangle size={20} />}
          className={shortages.length > 0 ? "border-danger/30" : ""}
        />
      </div>

      {/* Shortage Alerts */}
      {shortages.length > 0 && (
        <Card className="border-danger/30 bg-danger/5">
          <CardTitle className="flex items-center gap-2 text-danger mb-3">
            <AlertTriangle size={18} /> Ingredient Shortages
          </CardTitle>
          <div className="space-y-2">
            {shortages.map((s) => (
              <div key={s.id} className="flex items-center justify-between text-sm">
                <span className="font-medium">{s.ingredient}</span>
                <span>
                  Need: <strong>{s.required} {s.unit}</strong> &middot;
                  Have: <strong>{s.available} {s.unit}</strong> &middot;
                  Short: <strong className="text-danger">{s.shortage} {s.unit}</strong>
                </span>
              </div>
            ))}
          </div>
          <p className="text-xs text-muted-foreground mt-3">
            Recommendation: Create procurement order for shortage items before production begins.
          </p>
        </Card>
      )}

      {/* Tabs */}
      <div className="flex gap-2 border-b border-border">
        <button
          onClick={() => setTab("production")}
          className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
            tab === "production" ? "border-forest text-forest" : "border-transparent text-muted-foreground hover:text-foreground"
          }`}
        >
          Production Requirements ({PRODUCTION_REQUIREMENTS.length})
        </button>
        <button
          onClick={() => setTab("ingredients")}
          className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
            tab === "ingredients" ? "border-forest text-forest" : "border-transparent text-muted-foreground hover:text-foreground"
          }`}
        >
          Ingredient Requirements ({INGREDIENT_REQUIREMENTS.length})
        </button>
      </div>

      {/* Tables */}
      {tab === "production" ? (
        <DataTable
          columns={productionColumns}
          data={PRODUCTION_REQUIREMENTS}
          keyField="id"
          emptyMessage="No production requirements. Run the 6 PM snapshot first."
        />
      ) : (
        <DataTable
          columns={ingredientColumns}
          data={INGREDIENT_REQUIREMENTS}
          keyField="id"
          emptyMessage="No ingredient requirements calculated yet."
        />
      )}
    </div>
  );
}
