"use client";

import { StatusBadge } from "@/components/ui/badge";
import { DataTable } from "@/components/ui/data-table";

const SUBSCRIPTIONS = [
  { id: "1", subNo: "SUB-BLR-20260801-001", customer: "Priya Sharma", plan: "12-Day", status: "active", start: "Aug 1", end: "Aug 15", remaining: 5 },
  { id: "2", subNo: "SUB-BLR-20260803-001", customer: "Rahul Menon", plan: "24-Day", status: "active", start: "Aug 3", end: "Sep 2", remaining: 18 },
  { id: "3", subNo: "SUB-BLR-20260805-001", customer: "Anita Das", plan: "Trial", status: "completed", start: "Aug 5", end: "Aug 8", remaining: 0 },
  { id: "4", subNo: "SUB-BLR-20260806-001", customer: "Vikram Singh", plan: "12-Day", status: "paused", start: "Aug 6", end: "Aug 20", remaining: 8 },
  { id: "5", subNo: "SUB-BLR-20260808-001", customer: "Meera Nair", plan: "48-Day", status: "active", start: "Aug 8", end: "Oct 5", remaining: 42 },
  { id: "6", subNo: "SUB-BLR-20260810-001", customer: "Arjun Patel", plan: "12-Day", status: "active", start: "Aug 10", end: "Aug 25", remaining: 9 },
];

export default function OpsSubscriptionsPage() {
  const columns = [
    { key: "subNo", header: "Subscription #", render: (row: typeof SUBSCRIPTIONS[0]) => (
      <span className="font-mono text-xs">{row.subNo}</span>
    )},
    { key: "customer", header: "Customer" },
    { key: "plan", header: "Plan" },
    { key: "start", header: "Start" },
    { key: "end", header: "End" },
    { key: "remaining", header: "Remaining", className: "text-right font-bold" },
    { key: "status", header: "Status", render: (row: typeof SUBSCRIPTIONS[0]) => (
      <StatusBadge status={row.status} />
    )},
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Subscriptions</h1>
        <p className="text-muted-foreground">All customer subscriptions</p>
      </div>
      <DataTable columns={columns} data={SUBSCRIPTIONS} keyField="id" />
    </div>
  );
}
