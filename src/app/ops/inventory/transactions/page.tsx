"use client";

import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { DataTable } from "@/components/ui/data-table";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

const TRANSACTIONS = [
  { id: "1", ingredient: "Chicken Breast", txType: "purchase", quantity: 10.0, unit: "kg", notes: "Vendor: Fresh Farm", createdBy: "Admin", createdAt: "2026-08-11 09:30" },
  { id: "2", ingredient: "Baby Spinach", txType: "production_use", quantity: -4.2, unit: "kg", notes: "Snapshot: 2026-08-11", createdBy: "System", createdAt: "2026-08-11 06:00" },
  { id: "3", ingredient: "Romaine Lettuce", txType: "production_use", quantity: -3.8, unit: "kg", notes: "Snapshot: 2026-08-11", createdBy: "System", createdAt: "2026-08-11 06:00" },
  { id: "4", ingredient: "Feta Cheese", txType: "waste", quantity: -0.3, unit: "kg", notes: "Expired batch", createdBy: "Kitchen Mgr", createdAt: "2026-08-10 17:00" },
  { id: "5", ingredient: "Cherry Tomatoes", txType: "purchase", quantity: 5.0, unit: "kg", notes: "Vendor: Local Farms", createdBy: "Admin", createdAt: "2026-08-10 08:00" },
  { id: "6", ingredient: "Quinoa", txType: "adjustment", quantity: -0.5, unit: "kg", notes: "Stock count correction", createdBy: "Kitchen Mgr", createdAt: "2026-08-10 16:30" },
  { id: "7", ingredient: "Paneer", txType: "purchase", quantity: 5.0, unit: "kg", notes: "Vendor: Dairy Fresh", createdBy: "Admin", createdAt: "2026-08-10 07:30" },
  { id: "8", ingredient: "Avocado", txType: "production_use", quantity: -1.2, unit: "kg", notes: "Snapshot: 2026-08-10", createdBy: "System", createdAt: "2026-08-10 06:00" },
];

const TX_BADGE: Record<string, { variant: "success" | "danger" | "warning" | "info" | "outline"; label: string }> = {
  purchase: { variant: "success", label: "Purchase" },
  production_use: { variant: "info", label: "Production" },
  adjustment: { variant: "warning", label: "Adjustment" },
  waste: { variant: "danger", label: "Waste" },
  return: { variant: "outline", label: "Return" },
};

export default function TransactionsPage() {
  const columns = [
    { key: "createdAt", header: "Date/Time", render: (row: typeof TRANSACTIONS[0]) => (
      <span className="text-xs font-mono">{row.createdAt}</span>
    )},
    { key: "ingredient", header: "Ingredient" },
    { key: "txType", header: "Type", render: (row: typeof TRANSACTIONS[0]) => {
      const badge = TX_BADGE[row.txType];
      return <Badge variant={badge?.variant || "outline"}>{badge?.label || row.txType}</Badge>;
    }},
    { key: "quantity", header: "Qty", className: "text-right", render: (row: typeof TRANSACTIONS[0]) => (
      <span className={`font-bold ${row.quantity > 0 ? "text-success" : "text-danger"}`}>
        {row.quantity > 0 ? "+" : ""}{row.quantity} {row.unit}
      </span>
    )},
    { key: "notes", header: "Notes", render: (row: typeof TRANSACTIONS[0]) => (
      <span className="text-xs text-muted-foreground">{row.notes}</span>
    )},
    { key: "createdBy", header: "By" },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/ops/inventory">
          <Button variant="ghost" size="sm"><ArrowLeft size={16} /></Button>
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-foreground">Inventory Transactions</h1>
          <p className="text-muted-foreground">Stock movement history</p>
        </div>
      </div>

      <DataTable
        columns={columns}
        data={TRANSACTIONS}
        keyField="id"
        emptyMessage="No transactions recorded"
      />
    </div>
  );
}
