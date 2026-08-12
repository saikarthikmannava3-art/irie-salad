"use client";

import { Card, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import { Plus } from "lucide-react";

const MENU_ITEMS = [
  { id: "1", name: "Mediterranean Power Bowl", category: "Protein Bowls", price: 349, calories: 480, status: "active", orders: 28 },
  { id: "2", name: "Asian Sesame Crunch", category: "Signature Salads", price: 299, calories: 320, status: "active", orders: 22 },
  { id: "3", name: "Caesar Supreme", category: "Signature Salads", price: 329, calories: 420, status: "active", orders: 24 },
  { id: "4", name: "Tropical Mango Bliss", category: "Light & Fresh", price: 279, calories: 290, status: "active", orders: 8 },
  { id: "5", name: "Grilled Paneer Tikka", category: "Protein Bowls", price: 349, calories: 440, status: "active", orders: 20 },
  { id: "6", name: "Greek Garden Fresh", category: "Light & Fresh", price: 269, calories: 260, status: "active", orders: 12 },
  { id: "7", name: "Smoked Chicken & Avocado", category: "Protein Bowls", price: 379, calories: 510, status: "active", orders: 4 },
  { id: "8", name: "Beetroot & Goat Cheese", category: "Signature Salads", price: 319, calories: 340, status: "active", orders: 2 },
  { id: "9", name: "Thai Peanut Crunch", category: "Signature Salads", price: 289, calories: 350, status: "active", orders: 2 },
  { id: "10", name: "Quinoa Superfood Bowl", category: "Protein Bowls", price: 359, calories: 410, status: "active", orders: 16 },
];

export default function OpsMenuPage() {
  const columns = [
    { key: "name", header: "Item", render: (row: typeof MENU_ITEMS[0]) => (
      <span className="font-medium">{row.name}</span>
    )},
    { key: "category", header: "Category", render: (row: typeof MENU_ITEMS[0]) => (
      <Badge variant="outline">{row.category}</Badge>
    )},
    { key: "price", header: "Price", className: "text-right", render: (row: typeof MENU_ITEMS[0]) => (
      <span>Rs.{row.price}</span>
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
          <p className="text-muted-foreground">{MENU_ITEMS.length} active items</p>
        </div>
        <Button size="sm"><Plus size={16} /> Add Item</Button>
      </div>
      <DataTable columns={columns} data={MENU_ITEMS} keyField="id" />
    </div>
  );
}
