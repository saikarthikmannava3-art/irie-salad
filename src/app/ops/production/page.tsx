"use client";

import { useState } from "react";
import { Card, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge, StatusBadge } from "@/components/ui/badge";
import { StatCard } from "@/components/ui/stat-card";
import { DataTable } from "@/components/ui/data-table";
import { ChefHat, Clock, AlertTriangle, CheckCircle, Play, Printer, Sun, Moon } from "lucide-react";
import type { DeliveryWindow } from "@/types/domain";

// Demo snapshot data
const SNAPSHOT = {
  id: "snap-001",
  productionDate: "2026-08-16",
  snapshotTaken: "2026-08-15T18:00:00",
  status: "completed" as const,
  totalOrders: 150,
  lockedOrders: 146,
  skippedOrders: 4,
};

const PRODUCTION_REQUIREMENTS = [
  // Morning window
  { id: "1", menuItem: "Masala Dosa with Chutneys", occasion: "Breakfast", window: "morning" as DeliveryWindow, quantity: 28, status: "pending" },
  { id: "2", menuItem: "Tropical Smoothie Bowl", occasion: "Breakfast", window: "morning" as DeliveryWindow, quantity: 18, status: "pending" },
  { id: "3", menuItem: "Coconut Overnight Oats", occasion: "Breakfast", window: "morning" as DeliveryWindow, quantity: 14, status: "pending" },
  { id: "4", menuItem: "Fresh Detox Juice", occasion: "Breakfast", window: "morning" as DeliveryWindow, quantity: 10, status: "pending" },
  { id: "5", menuItem: "Roti Sabzi Thali", occasion: "Lunch", window: "morning" as DeliveryWindow, quantity: 24, status: "pending" },
  { id: "6", menuItem: "Hyderabadi Veg Dum Biryani", occasion: "Lunch", window: "morning" as DeliveryWindow, quantity: 20, status: "pending" },
  { id: "7", menuItem: "signature irie salad (350g)", occasion: "Lunch", window: "morning" as DeliveryWindow, quantity: 16, status: "pending" },
  { id: "8", menuItem: "signature irie salad (500g)", occasion: "Lunch", window: "morning" as DeliveryWindow, quantity: 12, status: "pending" },
  // Evening window
  { id: "9", menuItem: "Mixed Sprout Chaat", occasion: "Evening Snack", window: "evening" as DeliveryWindow, quantity: 18, status: "pending" },
  { id: "10", menuItem: "Fresh Seasonal Fruit Bowl", occasion: "Evening Snack", window: "evening" as DeliveryWindow, quantity: 14, status: "pending" },
  { id: "11", menuItem: "Light Moong Dal Khichdi", occasion: "Dinner", window: "evening" as DeliveryWindow, quantity: 22, status: "pending" },
  { id: "12", menuItem: "Bajra Roti with Seasonal Sabzi", occasion: "Dinner", window: "evening" as DeliveryWindow, quantity: 16, status: "pending" },
];

const INGREDIENT_REQUIREMENTS = [
  { id: "1", ingredient: "Organic Tofu", required: 4.8, available: 1.5, shortage: 3.3, unit: "kg", window: "morning" as DeliveryWindow },
  { id: "2", ingredient: "Paneer", required: 3.2, available: 1.0, shortage: 2.2, unit: "kg", window: "morning" as DeliveryWindow },
  { id: "3", ingredient: "Dosa Batter", required: 8.0, available: 10.0, shortage: 0, unit: "kg", window: "morning" as DeliveryWindow },
  { id: "4", ingredient: "Basmati Rice", required: 6.5, available: 8.0, shortage: 0, unit: "kg", window: "morning" as DeliveryWindow },
  { id: "5", ingredient: "Ragi Flour", required: 2.5, available: 0.8, shortage: 1.7, unit: "kg", window: "evening" as DeliveryWindow },
  { id: "6", ingredient: "Bajra Flour", required: 3.0, available: 4.0, shortage: 0, unit: "kg", window: "evening" as DeliveryWindow },
  { id: "7", ingredient: "Moong Dal", required: 4.5, available: 6.0, shortage: 0, unit: "kg", window: "evening" as DeliveryWindow },
  { id: "8", ingredient: "Mixed Sprouts", required: 3.6, available: 5.0, shortage: 0, unit: "kg", window: "evening" as DeliveryWindow },
  { id: "9", ingredient: "Seasonal Fruits", required: 5.0, available: 5.5, shortage: 0, unit: "kg", window: "evening" as DeliveryWindow },
  { id: "10", ingredient: "Whole Wheat Flour", required: 4.0, available: 6.0, shortage: 0, unit: "kg", window: "morning" as DeliveryWindow },
  { id: "11", ingredient: "Coconut Milk", required: 3.5, available: 4.0, shortage: 0, unit: "l", window: "morning" as DeliveryWindow },
  { id: "12", ingredient: "Seasonal Vegetables", required: 8.0, available: 10.0, shortage: 0, unit: "kg", window: "evening" as DeliveryWindow },
];

const CUSTOMER_ALLOCATIONS = [
  { id: "1", customer: "Kiran", meal: "Masala Dosa with Chutneys", occasion: "Breakfast", window: "morning" as DeliveryWindow, addOns: [], packages: 1 },
  { id: "2", customer: "Kiran", meal: "Roti Sabzi Thali", occasion: "Lunch", window: "morning" as DeliveryWindow, addOns: ["Extra Paneer x 1"], packages: 1 },
  { id: "3", customer: "Kiran", meal: "Mixed Sprout Chaat", occasion: "Evening Snack", window: "evening" as DeliveryWindow, addOns: [], packages: 1 },
  { id: "4", customer: "Kiran", meal: "Light Moong Dal Khichdi", occasion: "Dinner", window: "evening" as DeliveryWindow, addOns: [], packages: 1 },
  { id: "5", customer: "Asha", meal: "Tropical Smoothie Bowl", occasion: "Breakfast", window: "morning" as DeliveryWindow, addOns: [], packages: 1 },
  { id: "6", customer: "Priya", meal: "Hyderabadi Veg Dum Biryani", occasion: "Lunch", window: "morning" as DeliveryWindow, addOns: ["Protein Tikki x 1"], packages: 1 },
  { id: "7", customer: "Rahul", meal: "signature irie salad (350g)", occasion: "Lunch", window: "morning" as DeliveryWindow, addOns: ["Extra Seeds Mix x 1"], packages: 1 },
  { id: "8", customer: "Meera", meal: "Bajra Roti with Seasonal Sabzi", occasion: "Dinner", window: "evening" as DeliveryWindow, addOns: [], packages: 1 },
  { id: "9", customer: "Vikram", meal: "Fresh Seasonal Fruit Bowl", occasion: "Evening Snack", window: "evening" as DeliveryWindow, addOns: [], packages: 1 },
  { id: "10", customer: "Anita", meal: "Coconut Overnight Oats", occasion: "Breakfast", window: "morning" as DeliveryWindow, addOns: [], packages: 1 },
  { id: "11", customer: "Arjun", meal: "Masala Dosa with Chutneys", occasion: "Breakfast", window: "morning" as DeliveryWindow, addOns: ["Fresh Detox Juice x 1"], packages: 1 },
  { id: "12", customer: "Deepa", meal: "Light Moong Dal Khichdi", occasion: "Dinner", window: "evening" as DeliveryWindow, addOns: ["Extra Seeds Mix x 1"], packages: 1 },
];

type WindowFilter = "all" | DeliveryWindow;

export default function ProductionPage() {
  const [snapshotRun, setSnapshotRun] = useState(true);
  const [tab, setTab] = useState<"production" | "ingredients" | "allocation">("production");
  const [windowFilter, setWindowFilter] = useState<WindowFilter>("all");

  const filteredProduction = windowFilter === "all"
    ? PRODUCTION_REQUIREMENTS
    : PRODUCTION_REQUIREMENTS.filter((r) => r.window === windowFilter);

  const filteredIngredients = windowFilter === "all"
    ? INGREDIENT_REQUIREMENTS
    : INGREDIENT_REQUIREMENTS.filter((r) => r.window === windowFilter);

  const filteredAllocations = windowFilter === "all"
    ? CUSTOMER_ALLOCATIONS
    : CUSTOMER_ALLOCATIONS.filter((r) => r.window === windowFilter);

  const shortages = filteredIngredients.filter((i) => i.shortage > 0);

  const productionColumns = [
    { key: "menuItem", header: "Meal" },
    {
      key: "occasion",
      header: "Occasion",
      render: (row: typeof PRODUCTION_REQUIREMENTS[0]) => <Badge variant="outline">{row.occasion}</Badge>,
    },
    {
      key: "window",
      header: "Window",
      render: (row: typeof PRODUCTION_REQUIREMENTS[0]) => (
        <Badge variant={row.window === "morning" ? "warning" : "info"}>
          {row.window === "morning" ? "Morning" : "Evening"}
        </Badge>
      ),
    },
    {
      key: "quantity",
      header: "Qty",
      className: "text-right font-bold",
      render: (row: typeof PRODUCTION_REQUIREMENTS[0]) => (
        <span className="text-lg font-bold text-forest">{row.quantity}</span>
      ),
    },
    {
      key: "status",
      header: "Status",
      render: (row: typeof PRODUCTION_REQUIREMENTS[0]) => <StatusBadge status={row.status} />,
    },
  ];

  const ingredientColumns = [
    { key: "ingredient", header: "Ingredient" },
    {
      key: "window",
      header: "Window",
      render: (row: typeof INGREDIENT_REQUIREMENTS[0]) => (
        <Badge variant={row.window === "morning" ? "warning" : "info"}>
          {row.window === "morning" ? "Morning" : "Evening"}
        </Badge>
      ),
    },
    {
      key: "required",
      header: "Required",
      className: "text-right",
      render: (row: typeof INGREDIENT_REQUIREMENTS[0]) => (
        <span>
          {row.required} {row.unit}
        </span>
      ),
    },
    {
      key: "available",
      header: "Available",
      className: "text-right",
      render: (row: typeof INGREDIENT_REQUIREMENTS[0]) => (
        <span>
          {row.available} {row.unit}
        </span>
      ),
    },
    {
      key: "shortage",
      header: "Shortage",
      className: "text-right",
      render: (row: typeof INGREDIENT_REQUIREMENTS[0]) =>
        row.shortage > 0 ? (
          <span className="font-bold text-danger">
            -{row.shortage} {row.unit}
          </span>
        ) : (
          <span className="text-success">OK</span>
        ),
    },
  ];

  const allocationColumns = [
    { key: "customer", header: "Customer" },
    { key: "meal", header: "Meal" },
    {
      key: "occasion",
      header: "Occasion",
      render: (row: typeof CUSTOMER_ALLOCATIONS[0]) => <Badge variant="outline">{row.occasion}</Badge>,
    },
    {
      key: "window",
      header: "Window",
      render: (row: typeof CUSTOMER_ALLOCATIONS[0]) => (
        <Badge variant={row.window === "morning" ? "warning" : "info"}>
          {row.window === "morning" ? "Morning" : "Evening"}
        </Badge>
      ),
    },
    {
      key: "addOns",
      header: "Add-ons",
      render: (row: typeof CUSTOMER_ALLOCATIONS[0]) => (
        <div className="flex flex-wrap gap-1">
          {row.addOns.length > 0 ? (
            row.addOns.map((addon, i) => (
              <Badge key={i} variant="info" className="text-xs">
                {addon}
              </Badge>
            ))
          ) : (
            <span className="text-sm text-muted-foreground">&mdash;</span>
          )}
        </div>
      ),
    },
    {
      key: "packages",
      header: "# Packages",
      className: "text-right",
      render: (row: typeof CUSTOMER_ALLOCATIONS[0]) => <span className="font-bold text-forest">{row.packages}</span>,
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Production Planning</h1>
          <p className="text-muted-foreground">
            Production for{" "}
            {new Date(SNAPSHOT.productionDate).toLocaleDateString("en-IN", {
              weekday: "long",
              month: "long",
              day: "numeric",
            })}
          </p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" size="sm">
            <Printer size={16} /> Print Sheet
          </Button>
          <Button size="sm" disabled={snapshotRun} onClick={() => setSnapshotRun(true)}>
            <Play size={16} /> {snapshotRun ? "Snapshot Complete" : "Run Snapshot"}
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
                Snapshot completed at {new Date(SNAPSHOT.snapshotTaken).toLocaleTimeString("en-IN")}
              </p>
              <p className="text-sm text-muted-foreground">
                {SNAPSHOT.lockedOrders} orders locked &middot; {SNAPSHOT.skippedOrders} skipped &middot;{" "}
                {SNAPSHOT.totalOrders} total
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
          value={INGREDIENT_REQUIREMENTS.filter((i) => i.shortage > 0).length}
          icon={<AlertTriangle size={20} />}
          className={INGREDIENT_REQUIREMENTS.filter((i) => i.shortage > 0).length > 0 ? "border-danger/30" : ""}
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
                  Need: <strong>{s.required} {s.unit}</strong> &middot; Have:{" "}
                  <strong>{s.available} {s.unit}</strong> &middot; Short:{" "}
                  <strong className="text-danger">{s.shortage} {s.unit}</strong>
                </span>
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* Window Filter */}
      <div className="flex gap-2">
        {(["all", "morning", "evening"] as WindowFilter[]).map((w) => (
          <Button
            key={w}
            variant={windowFilter === w ? "primary" : "ghost"}
            size="sm"
            onClick={() => setWindowFilter(w)}
          >
            {w === "morning" && <Sun size={14} />}
            {w === "evening" && <Moon size={14} />}
            {w === "all" ? "All Windows" : w === "morning" ? "Morning" : "Evening"}
          </Button>
        ))}
      </div>

      {/* Tabs */}
      <div className="flex gap-2 border-b border-border">
        <button
          onClick={() => setTab("production")}
          className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
            tab === "production"
              ? "border-forest text-forest"
              : "border-transparent text-muted-foreground hover:text-foreground"
          }`}
        >
          Production Requirements ({filteredProduction.length})
        </button>
        <button
          onClick={() => setTab("ingredients")}
          className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
            tab === "ingredients"
              ? "border-forest text-forest"
              : "border-transparent text-muted-foreground hover:text-foreground"
          }`}
        >
          Ingredient Requirements ({filteredIngredients.length})
        </button>
        <button
          onClick={() => setTab("allocation")}
          className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
            tab === "allocation"
              ? "border-forest text-forest"
              : "border-transparent text-muted-foreground hover:text-foreground"
          }`}
        >
          Customer Allocation ({filteredAllocations.length})
        </button>
      </div>

      {/* Tables */}
      {tab === "production" ? (
        <DataTable
          columns={productionColumns}
          data={filteredProduction}
          keyField="id"
          emptyMessage="No production requirements for this window."
        />
      ) : tab === "ingredients" ? (
        <DataTable
          columns={ingredientColumns}
          data={filteredIngredients}
          keyField="id"
          emptyMessage="No ingredient requirements for this window."
        />
      ) : (
        <>
          <Card className="bg-forest/5 border-forest/20 text-sm">
            <p className="text-muted-foreground">
              <strong>Individual customer allocation</strong> &mdash; shows each customer&apos;s meal, occasion, and delivery window
            </p>
          </Card>
          <DataTable
            columns={allocationColumns}
            data={filteredAllocations}
            keyField="id"
            emptyMessage="No customer allocations for this window."
          />
        </>
      )}
    </div>
  );
}
