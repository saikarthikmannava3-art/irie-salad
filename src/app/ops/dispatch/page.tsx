"use client";

import { useState } from "react";
import { Card, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge, StatusBadge } from "@/components/ui/badge";
import { StatCard } from "@/components/ui/stat-card";
import { DataTable } from "@/components/ui/data-table";
import { MapPin, Sun, Moon, Truck, Printer } from "lucide-react";
import type { DeliveryWindow } from "@/types/domain";

type WindowFilter = "all" | DeliveryWindow;

const MORNING_DISPATCHES = [
  { id: "D-M01", route: "R-03", driver: "Suresh K.", zone: "HSR Layout", packages: 8, status: "dispatched", eta: "7:15 AM" },
  { id: "D-M02", route: "R-07", driver: "Raju M.", zone: "Koramangala", packages: 12, status: "dispatched", eta: "7:30 AM" },
  { id: "D-M03", route: "R-05", driver: "Anil P.", zone: "Indiranagar", packages: 6, status: "loading", eta: "7:45 AM" },
  { id: "D-M04", route: "R-11", driver: "Mohan S.", zone: "JP Nagar", packages: 10, status: "loading", eta: "8:00 AM" },
  { id: "D-M05", route: "R-12", driver: "Ganesh R.", zone: "BTM Layout", packages: 9, status: "pending", eta: "8:15 AM" },
];

const EVENING_DISPATCHES = [
  { id: "D-E01", route: "R-03", driver: "Suresh K.", zone: "HSR Layout", packages: 6, status: "pending", eta: "5:00 PM" },
  { id: "D-E02", route: "R-07", driver: "Raju M.", zone: "Koramangala", packages: 8, status: "pending", eta: "5:15 PM" },
  { id: "D-E03", route: "R-05", driver: "Anil P.", zone: "Indiranagar", packages: 5, status: "pending", eta: "5:30 PM" },
  { id: "D-E04", route: "R-08", driver: "Vijay N.", zone: "Jayanagar", packages: 7, status: "pending", eta: "5:45 PM" },
];

export default function DispatchPage() {
  const [windowFilter, setWindowFilter] = useState<WindowFilter>("all");

  const allDispatches = [
    ...MORNING_DISPATCHES.map((d) => ({ ...d, window: "morning" as DeliveryWindow })),
    ...EVENING_DISPATCHES.map((d) => ({ ...d, window: "evening" as DeliveryWindow })),
  ];

  const filtered = windowFilter === "all" ? allDispatches : allDispatches.filter((d) => d.window === windowFilter);

  const morningPackages = MORNING_DISPATCHES.reduce((sum, d) => sum + d.packages, 0);
  const eveningPackages = EVENING_DISPATCHES.reduce((sum, d) => sum + d.packages, 0);

  const columns = [
    {
      key: "id",
      header: "Dispatch ID",
      render: (row: typeof allDispatches[0]) => <span className="font-mono text-sm font-medium">{row.id}</span>,
    },
    {
      key: "route",
      header: "Route",
      render: (row: typeof allDispatches[0]) => <Badge variant="default">{row.route}</Badge>,
    },
    { key: "driver", header: "Driver" },
    { key: "zone", header: "Zone" },
    {
      key: "window",
      header: "Window",
      render: (row: typeof allDispatches[0]) => (
        <Badge variant={row.window === "morning" ? "warning" : "info"}>
          {row.window === "morning" ? "Morning" : "Evening"}
        </Badge>
      ),
    },
    {
      key: "packages",
      header: "Packages",
      className: "text-right",
      render: (row: typeof allDispatches[0]) => <span className="font-bold text-forest">{row.packages}</span>,
    },
    { key: "eta", header: "ETA" },
    {
      key: "status",
      header: "Status",
      render: (row: typeof allDispatches[0]) => <StatusBadge status={row.status} />,
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Dispatch</h1>
          <p className="text-muted-foreground">Morning and evening delivery dispatch management</p>
        </div>
        <Button variant="outline" size="sm">
          <Printer size={16} /> Print Dispatch Sheet
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Total Routes" value={filtered.length} icon={<Truck size={20} />} />
        <StatCard title="Morning Packages" value={morningPackages} icon={<Sun size={20} />} subtitle="6:30 - 8:30 AM" />
        <StatCard title="Evening Packages" value={eveningPackages} icon={<Moon size={20} />} subtitle="4:30 - 6:30 PM" />
        <StatCard
          title="Total Packages"
          value={morningPackages + eveningPackages}
          icon={<MapPin size={20} />}
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

      {/* Dispatch Table */}
      <DataTable columns={columns} data={filtered} keyField="id" emptyMessage="No dispatch routes found." />
    </div>
  );
}
