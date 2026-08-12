"use client";

import { useState } from "react";
import { Card, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { DataTable } from "@/components/ui/data-table";
import { StatCard } from "@/components/ui/stat-card";
import { Package, AlertTriangle, TrendingDown, Plus, Search } from "lucide-react";
import Link from "next/link";

const INVENTORY = [
  { id: "1", ingredient: "Baby Spinach", sku: "ING-VEG-001", category: "Leafy Greens", qty: 2.1, unit: "kg", reorder: 5.0, storage: "refrigerated", lastRestocked: "2026-08-10" },
  { id: "2", ingredient: "Romaine Lettuce", sku: "ING-VEG-002", category: "Leafy Greens", qty: 6.0, unit: "kg", reorder: 4.0, storage: "refrigerated", lastRestocked: "2026-08-10" },
  { id: "3", ingredient: "Chicken Breast", sku: "ING-PRO-001", category: "Protein", qty: 10.0, unit: "kg", reorder: 8.0, storage: "refrigerated", lastRestocked: "2026-08-11" },
  { id: "4", ingredient: "Quinoa", sku: "ING-GRN-001", category: "Grains", qty: 1.5, unit: "kg", reorder: 3.0, storage: "ambient", lastRestocked: "2026-08-09" },
  { id: "5", ingredient: "Feta Cheese", sku: "ING-DAI-001", category: "Dairy", qty: 0.5, unit: "kg", reorder: 2.0, storage: "refrigerated", lastRestocked: "2026-08-09" },
  { id: "6", ingredient: "Cherry Tomatoes", sku: "ING-VEG-003", category: "Vegetables", qty: 4.0, unit: "kg", reorder: 3.0, storage: "refrigerated", lastRestocked: "2026-08-11" },
  { id: "7", ingredient: "Cucumber", sku: "ING-VEG-004", category: "Vegetables", qty: 3.0, unit: "kg", reorder: 2.5, storage: "refrigerated", lastRestocked: "2026-08-11" },
  { id: "8", ingredient: "Olives", sku: "ING-PRE-001", category: "Preserved", qty: 2.0, unit: "kg", reorder: 1.0, storage: "ambient", lastRestocked: "2026-08-08" },
  { id: "9", ingredient: "Paneer", sku: "ING-DAI-002", category: "Dairy", qty: 4.5, unit: "kg", reorder: 4.0, storage: "refrigerated", lastRestocked: "2026-08-11" },
  { id: "10", ingredient: "Avocado", sku: "ING-FRT-001", category: "Fruits", qty: 2.0, unit: "kg", reorder: 1.5, storage: "refrigerated", lastRestocked: "2026-08-10" },
  { id: "11", ingredient: "Edamame", sku: "ING-VEG-005", category: "Vegetables", qty: 3.0, unit: "kg", reorder: 2.0, storage: "frozen", lastRestocked: "2026-08-09" },
  { id: "12", ingredient: "Bell Pepper", sku: "ING-VEG-006", category: "Vegetables", qty: 2.5, unit: "kg", reorder: 2.0, storage: "refrigerated", lastRestocked: "2026-08-11" },
  { id: "13", ingredient: "Beetroot", sku: "ING-VEG-007", category: "Vegetables", qty: 1.0, unit: "kg", reorder: 0.5, storage: "refrigerated", lastRestocked: "2026-08-10" },
  { id: "14", ingredient: "Mango", sku: "ING-FRT-002", category: "Fruits", qty: 2.0, unit: "kg", reorder: 1.5, storage: "refrigerated", lastRestocked: "2026-08-11" },
  { id: "15", ingredient: "Sweet Potato", sku: "ING-VEG-008", category: "Vegetables", qty: 2.0, unit: "kg", reorder: 1.5, storage: "ambient", lastRestocked: "2026-08-10" },
];

export default function InventoryPage() {
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");

  const lowStock = INVENTORY.filter((i) => i.qty <= i.reorder);
  const categories = ["all", ...new Set(INVENTORY.map((i) => i.category))];

  const filtered = INVENTORY.filter((i) => {
    if (categoryFilter !== "all" && i.category !== categoryFilter) return false;
    if (search && !i.ingredient.toLowerCase().includes(search.toLowerCase()) && !i.sku.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  const columns = [
    { key: "ingredient", header: "Ingredient", render: (row: typeof INVENTORY[0]) => (
      <div>
        <p className="font-medium">{row.ingredient}</p>
        <p className="text-xs text-muted-foreground font-mono">{row.sku}</p>
      </div>
    )},
    { key: "category", header: "Category", render: (row: typeof INVENTORY[0]) => (
      <Badge variant="outline">{row.category}</Badge>
    )},
    { key: "qty", header: "Stock", className: "text-right", render: (row: typeof INVENTORY[0]) => (
      <span className={`font-bold ${row.qty <= row.reorder ? "text-danger" : "text-foreground"}`}>
        {row.qty} {row.unit}
      </span>
    )},
    { key: "reorder", header: "Reorder Level", className: "text-right", render: (row: typeof INVENTORY[0]) => (
      <span className="text-muted-foreground">{row.reorder} {row.unit}</span>
    )},
    { key: "storage", header: "Storage", render: (row: typeof INVENTORY[0]) => (
      <Badge variant={row.storage === "frozen" ? "info" : row.storage === "refrigerated" ? "default" : "outline"}>
        {row.storage}
      </Badge>
    )},
    { key: "status", header: "Status", render: (row: typeof INVENTORY[0]) => (
      row.qty <= row.reorder
        ? <Badge variant="danger">Low Stock</Badge>
        : <Badge variant="success">OK</Badge>
    )},
    { key: "actions", header: "", render: () => (
      <Button variant="ghost" size="sm">Adjust</Button>
    )},
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Inventory</h1>
          <p className="text-muted-foreground">HSR Kitchen stock levels</p>
        </div>
        <div className="flex gap-2">
          <Link href="/ops/inventory/transactions">
            <Button variant="outline" size="sm">Transaction Log</Button>
          </Link>
          <Button size="sm"><Plus size={16} /> Record Purchase</Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Total Items" value={INVENTORY.length} icon={<Package size={20} />} />
        <StatCard
          title="Low Stock"
          value={lowStock.length}
          icon={<AlertTriangle size={20} />}
          className={lowStock.length > 0 ? "border-danger/30" : ""}
        />
        <StatCard title="Categories" value={categories.length - 1} />
        <StatCard title="Last Updated" value="Today" subtitle="11:30 AM" />
      </div>

      {/* Filters */}
      <Card className="py-4">
        <div className="flex flex-wrap items-end gap-4">
          <div className="relative w-64">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search ingredients..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-lg border border-border bg-white py-2 pl-9 pr-3 text-sm focus:border-forest focus:outline-none focus:ring-2 focus:ring-forest/20"
            />
          </div>
          <div className="flex gap-2">
            {categories.map((cat) => (
              <Button
                key={cat}
                variant={categoryFilter === cat ? "primary" : "ghost"}
                size="sm"
                onClick={() => setCategoryFilter(cat)}
              >
                {cat === "all" ? "All" : cat}
              </Button>
            ))}
          </div>
        </div>
      </Card>

      {/* Low Stock Alert */}
      {lowStock.length > 0 && (
        <Card className="border-danger/30 bg-danger/5 py-4">
          <div className="flex items-center gap-2 mb-2">
            <TrendingDown size={16} className="text-danger" />
            <span className="font-semibold text-danger text-sm">
              {lowStock.length} items below reorder level
            </span>
          </div>
          <p className="text-xs text-muted-foreground">
            {lowStock.map((i) => i.ingredient).join(", ")}
          </p>
        </Card>
      )}

      {/* Table */}
      <DataTable
        columns={columns}
        data={filtered}
        keyField="id"
        emptyMessage="No inventory items found"
      />
    </div>
  );
}
