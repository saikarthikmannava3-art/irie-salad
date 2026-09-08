"use client";

import { useState, useEffect } from "react";
import { Card, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge, StatusBadge } from "@/components/ui/badge";
import { StatCard } from "@/components/ui/stat-card";
import { DataTable } from "@/components/ui/data-table";
import { Clock, CheckCircle, AlertCircle, Play, Sun, Moon, Lock } from "lucide-react";
import { FULFILLMENT_WINDOWS } from "@/lib/constants";

// Demo data for morning window
const MORNING_ORDERS = [
  { id: "1", customer: "Aarav Patel", meal: "Masala Dosa with Chutneys", occasion: "Breakfast", status: "locked" },
  { id: "2", customer: "Priya Sharma", meal: "Roti Sabzi Thali", occasion: "Lunch", status: "locked" },
  { id: "3", customer: "Rohan Gupta", meal: "Hyderabadi Veg Dum Biryani", occasion: "Lunch", status: "locked" },
  { id: "4", customer: "Ananya Singh", meal: "Tropical Smoothie Bowl", occasion: "Breakfast", status: "locked" },
  { id: "5", customer: "Kabir Mehta", meal: "Coconut Overnight Oats", occasion: "Breakfast", status: "locked" },
  { id: "6", customer: "Ishaan Kumar", meal: "signature irie salad", occasion: "Lunch", status: "locked" },
];

const EVENING_ORDERS = [
  { id: "7", customer: "Meera Nair", meal: "Mixed Sprout Chaat", occasion: "Evening Snack", status: "scheduled" },
  { id: "8", customer: "Vikram Singh", meal: "Light Moong Dal Khichdi", occasion: "Dinner", status: "scheduled" },
  { id: "9", customer: "Arjun Patel", meal: "Bajra Roti with Seasonal Sabzi", occasion: "Dinner", status: "scheduled" },
  { id: "10", customer: "Sneha Rao", meal: "Fresh Seasonal Fruit Bowl", occasion: "Evening Snack", status: "scheduled" },
  { id: "11", customer: "Deepa Iyer", meal: "Set Dosa with Chutney Podi", occasion: "Dinner", status: "scheduled" },
  { id: "12", customer: "Ravi Kumar", meal: "Khaman Dhokla with Green Chutney", occasion: "Evening Snack", status: "scheduled" },
];

function useCountdown(hour: number, minute: number, isMorningWindow: boolean) {
  const [timeLeft, setTimeLeft] = useState("");
  const [isLocked, setIsLocked] = useState(false);
  const [targetLabel, setTargetLabel] = useState("");

  useEffect(() => {
    const calculate = () => {
      const now = new Date();

      if (isMorningWindow) {
        // Morning window: cutoff is TODAY at 6 PM for TOMORROW's morning delivery.
        // If past 6 PM today, tomorrow's morning orders are locked; countdown shows time to TOMORROW 6 PM (next day's orders).
        const todayCutoff = new Date();
        todayCutoff.setHours(hour, minute, 0, 0);

        if (now >= todayCutoff) {
          // Past today's 6 PM, tomorrow's morning delivery is locked
          // Show countdown to tomorrow's 6 PM (for day-after-tomorrow's orders)
          const nextCutoff = new Date(todayCutoff);
          nextCutoff.setDate(nextCutoff.getDate() + 1);
          const diff = nextCutoff.getTime() - now.getTime();
          const h = Math.floor(diff / (1000 * 60 * 60));
          const m = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
          const s = Math.floor((diff % (1000 * 60)) / 1000);
          setIsLocked(true);
          setTimeLeft(`LOCKED (next: ${h}h ${m}m ${s}s)`);
          setTargetLabel("Tomorrow's morning orders locked. Next cutoff counting down.");
        } else {
          // Before 6 PM, tomorrow's morning orders still open
          const diff = todayCutoff.getTime() - now.getTime();
          const h = Math.floor(diff / (1000 * 60 * 60));
          const m = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
          const s = Math.floor((diff % (1000 * 60)) / 1000);
          setIsLocked(false);
          setTimeLeft(`${h}h ${m}m ${s}s`);
          setTargetLabel("Tomorrow's morning orders close at 6:00 PM today.");
        }
      } else {
        // Evening window: cutoff is TODAY at 10 AM for TODAY's evening delivery.
        const todayCutoff = new Date();
        todayCutoff.setHours(hour, minute, 0, 0);

        if (now >= todayCutoff) {
          // Past 10 AM, today's evening orders locked
          // Show countdown to tomorrow's 10 AM
          const nextCutoff = new Date(todayCutoff);
          nextCutoff.setDate(nextCutoff.getDate() + 1);
          const diff = nextCutoff.getTime() - now.getTime();
          const h = Math.floor(diff / (1000 * 60 * 60));
          const m = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
          const s = Math.floor((diff % (1000 * 60)) / 1000);
          setIsLocked(true);
          setTimeLeft(`LOCKED (next: ${h}h ${m}m ${s}s)`);
          setTargetLabel("Today's evening orders locked. Next cutoff counting down.");
        } else {
          const diff = todayCutoff.getTime() - now.getTime();
          const h = Math.floor(diff / (1000 * 60 * 60));
          const m = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
          const s = Math.floor((diff % (1000 * 60)) / 1000);
          setIsLocked(false);
          setTimeLeft(`${h}h ${m}m ${s}s`);
          setTargetLabel("Today's evening orders close at 10:00 AM.");
        }
      }
    };

    calculate();
    const timer = setInterval(calculate, 1000);
    return () => clearInterval(timer);
  }, [hour, minute, isMorningWindow]);

  return { timeLeft, isLocked, targetLabel };
}

export default function CutoffPage() {
  const morningCutoff = useCountdown(18, 0, true);
  const eveningCutoff = useCountdown(10, 0, false);

  const [morningSnapshotRun, setMorningSnapshotRun] = useState(morningCutoff.isLocked);
  const [eveningSnapshotRun, setEveningSnapshotRun] = useState(eveningCutoff.isLocked);

  const morningTotal = MORNING_ORDERS.length;
  const morningLocked = MORNING_ORDERS.filter((o) => o.status === "locked").length;
  const morningPending = MORNING_ORDERS.filter((o) => o.status === "scheduled").length;

  const eveningTotal = EVENING_ORDERS.length;
  const eveningLocked = EVENING_ORDERS.filter((o) => o.status === "locked").length;
  const eveningPending = EVENING_ORDERS.filter((o) => o.status === "scheduled").length;

  const columns = [
    { key: "customer", header: "Customer" },
    { key: "meal", header: "Meal" },
    {
      key: "occasion",
      header: "Occasion",
      render: (row: { occasion: string }) => <Badge variant="outline">{row.occasion}</Badge>,
    },
    {
      key: "status",
      header: "Status",
      render: (row: { status: string }) => <StatusBadge status={row.status} />,
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-foreground">Dual Cutoff Management</h1>
        <p className="text-muted-foreground">
          Independent cutoffs for morning and evening fulfillment windows
        </p>
      </div>

      {/* Two side-by-side cutoff sections */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Morning Fulfillment (6 PM Cutoff) */}
        <div className="space-y-4">
          <Card className={morningCutoff.isLocked ? "bg-forest/5 border-forest/20" : "bg-mustard/5 border-mustard/20"}>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Sun size={24} className="text-mustard" />
                <div>
                  <p className="text-sm text-muted-foreground">Morning Fulfillment &middot; 6 PM Cutoff (Previous Day)</p>
                  <p className="text-3xl font-bold text-forest flex items-center gap-2">
                    {morningCutoff.isLocked && <Lock size={20} />}
                    {morningCutoff.timeLeft}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">Covers: Breakfast + Lunch</p>
                  {morningCutoff.targetLabel && (
                    <p className="text-xs text-muted-foreground mt-0.5">{morningCutoff.targetLabel}</p>
                  )}
                </div>
              </div>
              <Button
                size="sm"
                disabled={morningSnapshotRun || !morningCutoff.isLocked}
                onClick={() => setMorningSnapshotRun(true)}
              >
                <Play size={14} />
                {morningSnapshotRun ? "Snapshot Done" : "Run Snapshot"}
              </Button>
            </div>
          </Card>

          {morningSnapshotRun && (
            <Card className="bg-success/5 border-success/20">
              <div className="flex items-center gap-3">
                <CheckCircle size={18} className="text-success" />
                <p className="text-sm text-foreground">
                  Morning snapshot completed. All orders locked for production.
                </p>
              </div>
            </Card>
          )}

          <div className="grid grid-cols-3 gap-3">
            <StatCard title="Total" value={morningTotal} />
            <StatCard title="Locked" value={morningLocked} className="border-success/30" />
            <StatCard title="Pending" value={morningPending} className={morningPending > 0 ? "border-warning/30" : ""} />
          </div>

          <Card>
            <CardTitle className="mb-3 text-sm">Morning Orders</CardTitle>
            <DataTable columns={columns} data={MORNING_ORDERS} keyField="id" emptyMessage="No morning orders." />
          </Card>
        </div>

        {/* Evening Fulfillment (10 AM Cutoff) */}
        <div className="space-y-4">
          <Card className={eveningCutoff.isLocked ? "bg-forest/5 border-forest/20" : "bg-indigo-50 border-indigo-200"}>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Moon size={24} className="text-indigo-500" />
                <div>
                  <p className="text-sm text-muted-foreground">Evening Fulfillment &middot; 10 AM Cutoff (Same Day)</p>
                  <p className={`text-3xl font-bold flex items-center gap-2 ${eveningCutoff.isLocked ? "text-forest" : "text-indigo-600"}`}>
                    {eveningCutoff.isLocked && <Lock size={20} />}
                    {eveningCutoff.timeLeft}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">Covers: Evening Snack + Dinner</p>
                  {eveningCutoff.targetLabel && (
                    <p className="text-xs text-muted-foreground mt-0.5">{eveningCutoff.targetLabel}</p>
                  )}
                </div>
              </div>
              <Button
                size="sm"
                disabled={eveningSnapshotRun || !eveningCutoff.isLocked}
                onClick={() => setEveningSnapshotRun(true)}
              >
                <Play size={14} />
                {eveningSnapshotRun ? "Snapshot Done" : "Run Snapshot"}
              </Button>
            </div>
          </Card>

          {eveningSnapshotRun && (
            <Card className="bg-success/5 border-success/20">
              <div className="flex items-center gap-3">
                <CheckCircle size={18} className="text-success" />
                <p className="text-sm text-foreground">
                  Evening snapshot completed. All orders locked for production.
                </p>
              </div>
            </Card>
          )}

          <div className="grid grid-cols-3 gap-3">
            <StatCard title="Total" value={eveningTotal} />
            <StatCard title="Locked" value={eveningLocked} className="border-success/30" />
            <StatCard title="Pending" value={eveningPending} className={eveningPending > 0 ? "border-warning/30" : ""} />
          </div>

          <Card>
            <CardTitle className="mb-3 text-sm">Evening Orders</CardTitle>
            <DataTable columns={columns} data={EVENING_ORDERS} keyField="id" emptyMessage="No evening orders." />
          </Card>
        </div>
      </div>
    </div>
  );
}
