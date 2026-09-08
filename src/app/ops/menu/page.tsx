"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import { Plus } from "lucide-react";
import { PRODUCTS } from "@/data/products";
import { getStartingPrice } from "@/data/pricing";

const MENU_ITEMS = PRODUCTS.map((p) => ({
  id: p.id,
  name: p.name,
  category: p.category,
  price: getStartingPrice(p.slug),
  calories: p.nutrition.calories,
  variants: p.variants.length,
  hasDailyMenu: p.hasDailyMenu,
  status: p.isActive ? "active" : "inactive",
  orders: [42, 18, 28, 14, 22, 10, 8][PRODUCTS.indexOf(p)] || 0,
}));

export default function OpsMenuPage() {
  const columns = [
    { key: "name", header: "Item", render: (row: typeof MENU_ITEMS[0]) => (
      <div>
        <span className="font-medium">{row.name}</span>
        {row.hasDailyMenu && (
          <Badge variant="outline" className="ml-2 text-[9px]">Daily Menu</Badge>
        )}
      </div>
    )},
    { key: "category", header: "Category", render: (row: typeof MENU_ITEMS[0]) => (
      <Badge variant="outline">{row.category}</Badge>
    )},
    { key: "variants", header: "Variants", className: "text-center" },
    { key: "price", header: "From", className: "text-right", render: (row: typeof MENU_ITEMS[0]) => (
      <span>₹{row.price}</span>
    )},
    { key: "calories", header: "Cal", className: "text-right" },
    { key: "orders", header: "Today's Orders", className: "text-right font-bold" },
    { key: "status", header: "Status", render: (row: typeof MENU_ITEMS[0]) => (
      <Badge variant="success">{row.status}</Badge>
    )},
    { key: "actions", header: "", render: () => (
      <Button variant="ghost" size="sm">Edit</Button>
    )},
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Menu Management</h1>
          <p className="text-muted-foreground">{MENU_ITEMS.length} products in catalog</p>
        </div>
        <Button size="sm"><Plus size={16} /> Add Item</Button>
      </div>
      <DataTable columns={columns} data={MENU_ITEMS} keyField="id" />
    </div>
  );
}
