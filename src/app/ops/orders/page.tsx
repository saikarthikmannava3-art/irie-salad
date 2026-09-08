"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge, StatusBadge } from "@/components/ui/badge";
import { DataTable } from "@/components/ui/data-table";
import { Input } from "@/components/ui/input";
import { Sun, Moon } from "lucide-react";
import type { DeliveryWindow } from "@/types/domain";

const MEAL_NAMES = [
  "Masala Dosa with Chutneys",
  "Roti Sabzi Thali",
  "Hyderabadi Veg Dum Biryani",
  "Tropical Smoothie Bowl",
  "signature irie salad (350g)",
  "Coconut Overnight Oats",
  "Indori Poha with Sev",
  "Mixed Sprout Chaat",
  "Light Moong Dal Khichdi",
  "Bajra Roti with Seasonal Sabzi",
  "Fresh Seasonal Fruit Bowl",
  "Set Dosa with Chutney Podi",
  "Khaman Dhokla with Green Chutney",
  "Ragi Roti with Palak Dal",
];

const OCCASIONS = [
  "Breakfast", "Lunch", "Lunch", "Breakfast", "Lunch", "Breakfast", "Breakfast",
  "Evening Snack", "Dinner", "Dinner", "Evening Snack", "Dinner", "Evening Snack", "Dinner",
];

const WINDOWS: DeliveryWindow[] = [
  "morning", "morning", "morning", "morning", "morning", "morning", "morning",
  "evening", "evening", "evening", "evening", "evening", "evening", "evening",
];

const CUSTOMERS = ["Priya Sharma", "Rahul Menon", "Anita Das", "Vikram Singh", "Meera Nair", "Arjun Patel", "Sneha Rao"];

const DEMO_ORDERS = Array.from({ length: 30 }, (_, i) => ({
  id: `ord-${i}`,
  order_no: `ORD-HYD-20260814-${String(i + 1).padStart(4, "0")}`,
  customer: CUSTOMERS[i % CUSTOMERS.length],
  meal: MEAL_NAMES[i % MEAL_NAMES.length],
  occasion: OCCASIONS[i % OCCASIONS.length],
  window: WINDOWS[i % WINDOWS.length],
  delivery_date: "2026-08-14",
  status: i < 20 ? "locked" : i < 25 ? "scheduled" : ["delivered", "packed", "skipped"][i % 3],
  slot: i % WINDOWS.length === 0 ? "6:30-8:30 AM" : "4:30-6:30 PM",
  zone: i % 2 === 0 ? "HSR 3km" : "Koramangala 5km",
}));

export default function OrdersPage() {
  const [dateFilter, setDateFilter] = useState("2026-08-14");
  const [statusFilter, setStatusFilter] = useState("all");
  const [windowFilter, setWindowFilter] = useState<"all" | DeliveryWindow>("all");

  const filtered = DEMO_ORDERS.filter((o) => {
    if (statusFilter !== "all" && o.status !== statusFilter) return false;
    if (windowFilter !== "all" && o.window !== windowFilter) return false;
    return true;
  });

  const columns = [
    {
      key: "order_no",
      header: "Order #",
      render: (row: typeof DEMO_ORDERS[0]) => <span className="font-mono text-xs">{row.order_no}</span>,
    },
    { key: "customer", header: "Customer" },
    { key: "meal", header: "Meal" },
    {
      key: "occasion",
      header: "Occasion",
      render: (row: typeof DEMO_ORDERS[0]) => <Badge variant="outline">{row.occasion}</Badge>,
    },
    {
      key: "window",
      header: "Window",
      render: (row: typeof DEMO_ORDERS[0]) => (
        <Badge variant={row.window === "morning" ? "warning" : "info"}>
          {row.window === "morning" ? "Morning" : "Evening"}
        </Badge>
      ),
    },
    { key: "slot", header: "Slot" },
    { key: "zone", header: "Zone" },
    {
      key: "status",
      header: "Status",
      render: (row: typeof DEMO_ORDERS[0]) => <StatusBadge status={row.status} />,
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Orders</h1>
        <p className="text-muted-foreground">Manage and track all orders</p>
      </div>

      {/* Filters */}
      <Card className="py-4">
        <div className="flex flex-wrap items-end gap-4">
          <div className="w-44">
            <Input label="Date" type="date" value={dateFilter} onChange={(e) => setDateFilter(e.target.value)} />
          </div>
          <div className="flex gap-2">
            {["all", "scheduled", "locked", "in_production", "packed", "delivered"].map((s) => (
              <Button key={s} variant={statusFilter === s ? "primary" : "ghost"} size="sm" onClick={() => setStatusFilter(s)}>
                {s === "all" ? "All" : s.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())}
              </Button>
            ))}
          </div>
          <div className="flex gap-2">
            {(["all", "morning", "evening"] as const).map((w) => (
              <Button key={w} variant={windowFilter === w ? "primary" : "ghost"} size="sm" onClick={() => setWindowFilter(w)}>
                {w === "morning" && <Sun size={14} />}
                {w === "evening" && <Moon size={14} />}
                {w === "all" ? "All Windows" : w === "morning" ? "Morning" : "Evening"}
              </Button>
            ))}
          </div>
        </div>
      </Card>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
        {[
          { label: "Total", count: filtered.length, color: "text-foreground" },
          { label: "Locked", count: filtered.filter((o) => o.status === "locked").length, color: "text-amber-600" },
          { label: "Scheduled", count: filtered.filter((o) => o.status === "scheduled").length, color: "text-blue-600" },
          { label: "Delivered", count: filtered.filter((o) => o.status === "delivered").length, color: "text-green-600" },
          { label: "Skipped", count: filtered.filter((o) => o.status === "skipped").length, color: "text-muted-foreground" },
        ].map((s) => (
          <div key={s.label} className="rounded-lg bg-white border border-border p-3 text-center">
            <p className={`text-2xl font-bold ${s.color}`}>{s.count}</p>
            <p className="text-xs text-muted-foreground">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Table */}
      <DataTable columns={columns} data={filtered} keyField="id" emptyMessage="No orders found for this filter" />
    </div>
  );
}
