"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge, StatusBadge } from "@/components/ui/badge";
import { StatCard } from "@/components/ui/stat-card";
import { DataTable } from "@/components/ui/data-table";
import { PackageCheck, Printer, CheckCircle, Sun, Moon } from "lucide-react";
import type { DeliveryWindow } from "@/types/domain";

type PackageStatus = "pending" | "packed" | "verified";

interface PackageItem extends Record<string, unknown> {
  id: string;
  orderId: string;
  customer: string;
  packageNum: string;
  meal: string;
  occasion: string;
  window: DeliveryWindow;
  addOns: string[];
  route: string;
  status: PackageStatus;
  checklist: {
    mealPacked: boolean;
    addOnIncluded: boolean;
    labelAttached: boolean;
    packageVerified: boolean;
  };
}

// Demo data with IRIE Kitchen meal names
const INITIAL_PACKAGES: PackageItem[] = [
  {
    id: "IR1234-P01", orderId: "IR1234", customer: "Kiran", packageNum: "1/4",
    meal: "Masala Dosa with Chutneys", occasion: "Breakfast", window: "morning",
    addOns: [], route: "R-07", status: "pending",
    checklist: { mealPacked: false, addOnIncluded: true, labelAttached: false, packageVerified: false },
  },
  {
    id: "IR1234-P02", orderId: "IR1234", customer: "Kiran", packageNum: "2/4",
    meal: "Roti Sabzi Thali", occasion: "Lunch", window: "morning",
    addOns: ["Extra Paneer x 1"], route: "R-07", status: "pending",
    checklist: { mealPacked: false, addOnIncluded: false, labelAttached: false, packageVerified: false },
  },
  {
    id: "IR1234-P03", orderId: "IR1234", customer: "Kiran", packageNum: "3/4",
    meal: "Mixed Sprout Chaat", occasion: "Evening Snack", window: "evening",
    addOns: [], route: "R-07", status: "packed",
    checklist: { mealPacked: true, addOnIncluded: true, labelAttached: true, packageVerified: false },
  },
  {
    id: "IR1234-P04", orderId: "IR1234", customer: "Kiran", packageNum: "4/4",
    meal: "Light Moong Dal Khichdi", occasion: "Dinner", window: "evening",
    addOns: [], route: "R-07", status: "packed",
    checklist: { mealPacked: true, addOnIncluded: true, labelAttached: true, packageVerified: false },
  },
  {
    id: "IR1235-P01", orderId: "IR1235", customer: "Asha", packageNum: "1/2",
    meal: "Tropical Smoothie Bowl", occasion: "Breakfast", window: "morning",
    addOns: [], route: "R-03", status: "verified",
    checklist: { mealPacked: true, addOnIncluded: true, labelAttached: true, packageVerified: true },
  },
  {
    id: "IR1235-P02", orderId: "IR1235", customer: "Asha", packageNum: "2/2",
    meal: "Hyderabadi Veg Dum Biryani", occasion: "Lunch", window: "morning",
    addOns: ["Protein Tikki x 1"], route: "R-03", status: "verified",
    checklist: { mealPacked: true, addOnIncluded: true, labelAttached: true, packageVerified: true },
  },
  {
    id: "IR1236-P01", orderId: "IR1236", customer: "Priya", packageNum: "1/2",
    meal: "Signature IRIE Salad (350g)", occasion: "Lunch", window: "morning",
    addOns: ["Protein Tikki x 1"], route: "R-12", status: "pending",
    checklist: { mealPacked: false, addOnIncluded: false, labelAttached: false, packageVerified: false },
  },
  {
    id: "IR1236-P02", orderId: "IR1236", customer: "Priya", packageNum: "2/2",
    meal: "Set Dosa with Chutney Podi", occasion: "Dinner", window: "evening",
    addOns: [], route: "R-12", status: "pending",
    checklist: { mealPacked: false, addOnIncluded: true, labelAttached: false, packageVerified: false },
  },
  {
    id: "IR1237-P01", orderId: "IR1237", customer: "Rahul", packageNum: "1/1",
    meal: "Coconut Overnight Oats", occasion: "Breakfast", window: "morning",
    addOns: ["Extra Seeds Mix x 1"], route: "R-05", status: "packed",
    checklist: { mealPacked: true, addOnIncluded: true, labelAttached: true, packageVerified: false },
  },
  {
    id: "IR1238-P01", orderId: "IR1238", customer: "Meera", packageNum: "1/1",
    meal: "Bajra Roti with Seasonal Sabzi", occasion: "Dinner", window: "evening",
    addOns: [], route: "R-08", status: "pending",
    checklist: { mealPacked: false, addOnIncluded: true, labelAttached: false, packageVerified: false },
  },
  {
    id: "IR1239-P01", orderId: "IR1239", customer: "Vikram", packageNum: "1/1",
    meal: "Fresh Seasonal Fruit Bowl", occasion: "Evening Snack", window: "evening",
    addOns: [], route: "R-04", status: "verified",
    checklist: { mealPacked: true, addOnIncluded: true, labelAttached: true, packageVerified: true },
  },
  {
    id: "IR1240-P01", orderId: "IR1240", customer: "Anita", packageNum: "1/2",
    meal: "Idli Sambar", occasion: "Breakfast", window: "morning",
    addOns: ["Fresh Detox Juice x 1"], route: "R-11", status: "pending",
    checklist: { mealPacked: false, addOnIncluded: false, labelAttached: false, packageVerified: false },
  },
  {
    id: "IR1240-P02", orderId: "IR1240", customer: "Anita", packageNum: "2/2",
    meal: "Signature IRIE Salad (350g)", occasion: "Lunch", window: "morning",
    addOns: [], route: "R-11", status: "pending",
    checklist: { mealPacked: false, addOnIncluded: true, labelAttached: false, packageVerified: false },
  },
  {
    id: "IR1241-P01", orderId: "IR1241", customer: "Arjun", packageNum: "1/1",
    meal: "Khaman Dhokla with Green Chutney", occasion: "Evening Snack", window: "evening",
    addOns: [], route: "R-02", status: "packed",
    checklist: { mealPacked: true, addOnIncluded: true, labelAttached: true, packageVerified: false },
  },
  {
    id: "IR1242-P01", orderId: "IR1242", customer: "Sneha", packageNum: "1/1",
    meal: "Sambar Rice with Poriyal", occasion: "Lunch", window: "morning",
    addOns: [], route: "R-06", status: "pending",
    checklist: { mealPacked: false, addOnIncluded: true, labelAttached: false, packageVerified: false },
  },
  {
    id: "IR1243-P01", orderId: "IR1243", customer: "Deepa", packageNum: "1/1",
    meal: "Ragi Roti with Palak Dal", occasion: "Dinner", window: "evening",
    addOns: ["Extra Seeds Mix x 1"], route: "R-09", status: "pending",
    checklist: { mealPacked: false, addOnIncluded: false, labelAttached: false, packageVerified: false },
  },
];

type WindowFilter = "all" | DeliveryWindow;

export default function PackingPage() {
  const [packages, setPackages] = useState<PackageItem[]>(INITIAL_PACKAGES);
  const [statusFilter, setStatusFilter] = useState<PackageStatus | "all">("all");
  const [windowFilter, setWindowFilter] = useState<WindowFilter>("all");

  const filteredPackages = packages.filter((p) => {
    if (statusFilter !== "all" && p.status !== statusFilter) return false;
    if (windowFilter !== "all" && p.window !== windowFilter) return false;
    return true;
  });

  const stats = {
    total: packages.length,
    pending: packages.filter((p) => p.status === "pending").length,
    packed: packages.filter((p) => p.status === "packed").length,
    verified: packages.filter((p) => p.status === "verified").length,
  };

  const handleMarkPacked = (packageId: string) => {
    setPackages((prev) =>
      prev.map((pkg) =>
        pkg.id === packageId
          ? {
              ...pkg,
              status: "packed" as PackageStatus,
              checklist: { ...pkg.checklist, mealPacked: true, labelAttached: true },
            }
          : pkg,
      ),
    );
  };

  const handlePrintLabel = (packageId: string) => {
    const pkg = packages.find((p) => p.id === packageId);
    alert(`Printing label for ${pkg?.id}\n${pkg?.customer} - ${pkg?.meal}`);
  };

  const columns = [
    {
      key: "id",
      header: "Package ID",
      render: (row: PackageItem) => <div className="font-mono text-sm font-medium">{row.id}</div>,
    },
    { key: "customer", header: "Customer" },
    {
      key: "packageNum",
      header: "#",
      render: (row: PackageItem) => <Badge variant="outline">{row.packageNum}</Badge>,
    },
    { key: "meal", header: "Meal" },
    {
      key: "occasion",
      header: "Occasion",
      render: (row: PackageItem) => <Badge variant="outline">{row.occasion}</Badge>,
    },
    {
      key: "window",
      header: "Window",
      render: (row: PackageItem) => (
        <Badge variant={row.window === "morning" ? "warning" : "info"}>
          {row.window === "morning" ? "Morning" : "Evening"}
        </Badge>
      ),
    },
    {
      key: "addOns",
      header: "Add-ons",
      render: (row: PackageItem) => (
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
      key: "route",
      header: "Route",
      render: (row: PackageItem) => <Badge variant="default">{row.route}</Badge>,
    },
    {
      key: "status",
      header: "Status",
      render: (row: PackageItem) => <StatusBadge status={row.status} />,
    },
    {
      key: "actions",
      header: "Actions",
      render: (row: PackageItem) => (
        <div className="flex gap-2">
          <Button size="sm" variant="outline" onClick={() => handleMarkPacked(row.id)} disabled={row.status !== "pending"}>
            <CheckCircle size={14} /> Pack
          </Button>
          <Button size="sm" variant="ghost" onClick={() => handlePrintLabel(row.id)}>
            <Printer size={14} />
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Packing</h1>
          <p className="text-muted-foreground">Package-based packing workflow with delivery window tracking</p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Total Packages" value={stats.total} icon={<PackageCheck size={20} />} />
        <StatCard title="Packed" value={stats.packed} className="border-blue-200" />
        <StatCard title="Verified" value={stats.verified} className="border-green-200" />
        <StatCard title="Pending" value={stats.pending} className="border-amber-200" />
      </div>

      {/* Window Filter */}
      <div className="flex gap-2">
        {(["all", "morning", "evening"] as WindowFilter[]).map((w) => (
          <Button key={w} variant={windowFilter === w ? "primary" : "ghost"} size="sm" onClick={() => setWindowFilter(w)}>
            {w === "morning" && <Sun size={14} />}
            {w === "evening" && <Moon size={14} />}
            {w === "all" ? "All Windows" : w === "morning" ? "Morning" : "Evening"}
          </Button>
        ))}
      </div>

      {/* Status Filter Tabs */}
      <div className="flex gap-2 border-b border-border">
        {(["all", "pending", "packed", "verified"] as const).map((s) => (
          <button
            key={s}
            onClick={() => setStatusFilter(s)}
            className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
              statusFilter === s
                ? "border-forest text-forest"
                : "border-transparent text-muted-foreground hover:text-foreground"
            }`}
          >
            {s === "all" ? `All (${stats.total})` : `${s.charAt(0).toUpperCase() + s.slice(1)} (${stats[s]})`}
          </button>
        ))}
      </div>

      {/* Packages Table */}
      <DataTable columns={columns} data={filteredPackages} keyField="id" emptyMessage="No packages found for this filter." />
    </div>
  );
}
