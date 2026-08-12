"use client";

import { useState } from "react";
import { Card, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { StatusBadge } from "@/components/ui/badge";
import { DataTable } from "@/components/ui/data-table";
import { Input } from "@/components/ui/input";

const DEMO_ORDERS = Array.from({ length: 30 }, (_, i) => ({
  id: `ord-${i}`,
  order_no: `ORD-BLR-20260812-${String(i + 1).padStart(4, "0")}`,
  customer: ["Priya Sharma", "Rahul Menon", "Anita Das", "Vikram Singh", "Meera Nair", "Arjun Patel", "Sneha Rao"][i % 7],
  salad: ["Mediterranean Power Bowl", "Caesar Supreme", "Asian Sesame Crunch", "Quinoa Superfood Bowl", "Grilled Paneer Tikka", "Greek Garden Fresh", "Thai Peanut Crunch"][i % 7],
  delivery_date: "2026-08-12",
  status: i < 20 ? "locked" : i < 25 ? "scheduled" : ["delivered", "packed", "skipped"][i % 3],
  slot: "12:00-13:00",
  zone: i % 2 === 0 ? "HSR 3km" : "Koramangala 5km",
}));

export default function OrdersPage() {
  const [dateFilter, setDateFilter] = useState("2026-08-12");
  const [statusFilter, setStatusFilter] = useState("all");

  const filtered = DEMO_ORDERS.filter((o) => {
    if (statusFilter !== "all" && o.status !== statusFilter) return false;
    return true;
  });

  const columns = [
    { key: "order_no", header: "Order #", render: (row: typeof DEMO_ORDERS[0]) => (
      <span className="font-mono text-xs">{row.order_no}</span>
    )},
    { key: "customer", header: "Customer" },
    { key: "salad", header: "Salad" },
    { key: "slot", header: "Slot" },
    { key: "zone", header: "Zone" },
    { key: "status", header: "Status", render: (row: typeof DEMO_ORDERS[0]) => (
      <StatusBadge status={row.status} />
    )},
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
            <Input
              label="Date"
              type="date"
              value={dateFilter}
              onChange={(e) => setDateFilter(e.target.value)}
            />
          </div>
          <div className="flex gap-2">
            {["all", "scheduled", "locked", "in_production", "packed", "delivered"].map((s) => (
              <Button
                key={s}
                variant={statusFilter === s ? "primary" : "ghost"}
                size="sm"
                onClick={() => setStatusFilter(s)}
              >
                {s === "all" ? "All" : s.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())}
              </Button>
            ))}
          </div>
        </div>
      </Card>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
        {[
          { label: "Total", count: DEMO_ORDERS.length, color: "text-foreground" },
          { label: "Locked", count: DEMO_ORDERS.filter((o) => o.status === "locked").length, color: "text-amber-600" },
          { label: "Scheduled", count: DEMO_ORDERS.filter((o) => o.status === "scheduled").length, color: "text-blue-600" },
          { label: "Delivered", count: DEMO_ORDERS.filter((o) => o.status === "delivered").length, color: "text-green-600" },
          { label: "Skipped", count: DEMO_ORDERS.filter((o) => o.status === "skipped").length, color: "text-muted-foreground" },
        ].map((s) => (
          <div key={s.label} className="rounded-lg bg-white border border-border p-3 text-center">
            <p className={`text-2xl font-bold ${s.color}`}>{s.count}</p>
            <p className="text-xs text-muted-foreground">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Table */}
      <DataTable
        columns={columns}
        data={filtered}
        keyField="id"
        emptyMessage="No orders found for this filter"
      />
    </div>
  );
}
