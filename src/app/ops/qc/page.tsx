"use client";

import { useState } from "react";
import { Card, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge, StatusBadge } from "@/components/ui/badge";
import { StatCard } from "@/components/ui/stat-card";
import { DataTable } from "@/components/ui/data-table";
import { CheckCircle, XCircle, Package, Sun, Moon } from "lucide-react";
import type { DeliveryWindow } from "@/types/domain";

type WindowFilter = "all" | DeliveryWindow;

// Demo QC data with Indian meal names and delivery windows
const INITIAL_PACKAGES = [
  { id: "PKG-001", orderId: "ORD-142", customer: "Aarav Patel", meal: "Masala Dosa with Chutneys", occasion: "Breakfast", window: "morning" as DeliveryWindow, status: "pending" },
  { id: "PKG-002", orderId: "ORD-143", customer: "Priya Sharma", meal: "Tropical Smoothie Bowl", occasion: "Breakfast", window: "morning" as DeliveryWindow, status: "pending" },
  { id: "PKG-003", orderId: "ORD-144", customer: "Rohan Gupta", meal: "Roti Sabzi Thali", occasion: "Lunch", window: "morning" as DeliveryWindow, status: "pending" },
  { id: "PKG-004", orderId: "ORD-145", customer: "Ananya Singh", meal: "Hyderabadi Veg Dum Biryani", occasion: "Lunch", window: "morning" as DeliveryWindow, status: "pending" },
  { id: "PKG-005", orderId: "ORD-146", customer: "Kabir Mehta", meal: "Signature IRIE Salad (350g)", occasion: "Lunch", window: "morning" as DeliveryWindow, status: "pending" },
  { id: "PKG-006", orderId: "ORD-147", customer: "Ishaan Kumar", meal: "Coconut Overnight Oats", occasion: "Breakfast", window: "morning" as DeliveryWindow, status: "pending" },
  { id: "PKG-007", orderId: "ORD-148", customer: "Zara Khan", meal: "Aloo Paratha with Curd & Pickle + Detox Juice", occasion: "Breakfast", window: "morning" as DeliveryWindow, status: "pending" },
  { id: "PKG-008", orderId: "ORD-149", customer: "Dev Sharma", meal: "Mixed Sprout Chaat", occasion: "Evening Snack", window: "evening" as DeliveryWindow, status: "pending" },
  { id: "PKG-009", orderId: "ORD-150", customer: "Maya Reddy", meal: "Khaman Dhokla with Green Chutney", occasion: "Evening Snack", window: "evening" as DeliveryWindow, status: "pending" },
  { id: "PKG-010", orderId: "ORD-151", customer: "Arjun Nair", meal: "Fresh Seasonal Fruit Bowl", occasion: "Evening Snack", window: "evening" as DeliveryWindow, status: "pending" },
  { id: "PKG-011", orderId: "ORD-152", customer: "Sneha Iyer", meal: "Light Moong Dal Khichdi", occasion: "Dinner", window: "evening" as DeliveryWindow, status: "pending" },
  { id: "PKG-012", orderId: "ORD-153", customer: "Ravi Kumar", meal: "Set Dosa with Chutney Podi", occasion: "Dinner", window: "evening" as DeliveryWindow, status: "pending" },
  { id: "PKG-013", orderId: "ORD-154", customer: "Neha Joshi", meal: "Bajra Roti with Seasonal Sabzi", occasion: "Dinner", window: "evening" as DeliveryWindow, status: "pending" },
  { id: "PKG-014", orderId: "ORD-155", customer: "Vikram Singh", meal: "Ragi Roti with Palak Dal", occasion: "Dinner", window: "evening" as DeliveryWindow, status: "pending" },
  { id: "PKG-015", orderId: "ORD-156", customer: "Diya Kapoor", meal: "Sambar Rice with Poriyal", occasion: "Lunch", window: "morning" as DeliveryWindow, status: "pending" },
];

export default function QCPage() {
  const [packages, setPackages] = useState(INITIAL_PACKAGES);
  const [windowFilter, setWindowFilter] = useState<WindowFilter>("all");

  const handleQC = (packageId: string, result: "passed" | "failed") => {
    setPackages((prev) =>
      prev.map((pkg) => (pkg.id === packageId ? { ...pkg, status: result } : pkg)),
    );
  };

  const filteredPackages = windowFilter === "all"
    ? packages
    : packages.filter((p) => p.window === windowFilter);

  const totalPackages = filteredPackages.length;
  const passedPackages = filteredPackages.filter((p) => p.status === "passed").length;
  const failedPackages = filteredPackages.filter((p) => p.status === "failed").length;
  const pendingPackages = filteredPackages.filter((p) => p.status === "pending").length;

  const columns = [
    {
      key: "id",
      header: "Package ID",
      render: (row: typeof packages[0]) => <span className="font-mono text-sm font-medium">{row.id}</span>,
    },
    { key: "orderId", header: "Order #", className: "text-sm font-mono" },
    { key: "customer", header: "Customer" },
    { key: "meal", header: "Meal" },
    {
      key: "occasion",
      header: "Occasion",
      render: (row: typeof packages[0]) => <Badge variant="outline">{row.occasion}</Badge>,
    },
    {
      key: "window",
      header: "Window",
      render: (row: typeof packages[0]) => (
        <Badge variant={row.window === "morning" ? "warning" : "info"}>
          {row.window === "morning" ? "Morning" : "Evening"}
        </Badge>
      ),
    },
    {
      key: "status",
      header: "Status",
      render: (row: typeof packages[0]) => <StatusBadge status={row.status} />,
    },
    {
      key: "actions",
      header: "QC Action",
      render: (row: typeof packages[0]) => {
        if (row.status === "passed") {
          return (
            <Badge variant="success">
              <CheckCircle size={14} /> Passed
            </Badge>
          );
        }
        if (row.status === "failed") {
          return (
            <Badge variant="danger">
              <XCircle size={14} /> Failed
            </Badge>
          );
        }
        return (
          <div className="flex gap-2">
            <Button size="sm" variant="outline" onClick={() => handleQC(row.id, "passed")}>
              <CheckCircle size={14} /> Pass
            </Button>
            <Button size="sm" variant="outline" onClick={() => handleQC(row.id, "failed")}>
              <XCircle size={14} /> Fail
            </Button>
          </div>
        );
      },
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-foreground">Quality Control</h1>
        <p className="text-muted-foreground">Package inspection and quality verification</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Total Packages" value={totalPackages} icon={<Package size={20} />} />
        <StatCard
          title="Passed"
          value={passedPackages}
          icon={<CheckCircle size={20} className="text-success" />}
          className="border-success/30"
        />
        <StatCard
          title="Failed"
          value={failedPackages}
          icon={<XCircle size={20} className="text-danger" />}
          className={failedPackages > 0 ? "border-danger/30" : ""}
        />
        <StatCard
          title="Pending"
          value={pendingPackages}
          icon={<Package size={20} className="text-warning" />}
          className={pendingPackages > 0 ? "border-warning/30" : ""}
        />
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

      {/* QC Table */}
      <Card>
        <CardTitle className="mb-4">Packages Awaiting QC</CardTitle>
        <DataTable columns={columns} data={filteredPackages} keyField="id" emptyMessage="No packages pending quality control." />
      </Card>
    </div>
  );
}
