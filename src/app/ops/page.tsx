"use client";

import { useState, useEffect } from "react";
import { StatCard } from "@/components/ui/stat-card";
import { Card, CardTitle } from "@/components/ui/card";
import { Badge, StatusBadge } from "@/components/ui/badge";
import { ShoppingBag, ChefHat, Package, Truck, AlertTriangle, Clock, Sun, Moon } from "lucide-react";
import Link from "next/link";
import { FULFILLMENT_WINDOWS, MEAL_OCCASIONS } from "@/lib/constants";

// Demo data for today's dual-window operations
const MORNING_WINDOW = {
  status: "in_production",
  mealOccasions: ["Breakfast", "Lunch"],
  orderCount: 86,
  packageCount: 142,
  deliveryTime: "6:30 AM - 8:30 AM",
};

const EVENING_WINDOW = {
  status: "scheduled",
  mealOccasions: ["Evening Snack", "Dinner"],
  orderCount: 64,
  packageCount: 98,
  deliveryTime: "4:30 PM - 6:30 PM",
};

const TODAY_STATS = {
  totalOrders: 150,
  morningPackages: 142,
  eveningPackages: 98,
  shortages: 3,
};

const RECENT_ORDERS = [
  { id: "ORD-HYD-20260814-0001", customer: "Priya Sharma", meal: "Masala Dosa with Chutneys", occasion: "Breakfast", window: "morning" },
  { id: "ORD-HYD-20260814-0002", customer: "Rahul Menon", meal: "Roti Sabzi Thali", occasion: "Lunch", window: "morning" },
  { id: "ORD-HYD-20260814-0003", customer: "Anita Das", meal: "Mixed Sprout Chaat", occasion: "Evening Snack", window: "evening" },
  { id: "ORD-HYD-20260814-0004", customer: "Vikram Singh", meal: "Light Moong Dal Khichdi", occasion: "Dinner", window: "evening" },
  { id: "ORD-HYD-20260814-0005", customer: "Meera Nair", meal: "Hyderabadi Veg Dum Biryani", occasion: "Lunch", window: "morning" },
];

const SHORTAGE_ALERTS = [
  { ingredient: "Organic Tofu", required: "4.8 kg", available: "1.5 kg", shortage: "3.3 kg" },
  { ingredient: "Paneer", required: "3.2 kg", available: "1.0 kg", shortage: "2.2 kg" },
  { ingredient: "Ragi Flour", required: "2.5 kg", available: "0.8 kg", shortage: "1.7 kg" },
];

function useCutoffCountdown(hour: number, minute: number, isMorningWindow: boolean) {
  const [display, setDisplay] = useState("");
  const [isLocked, setIsLocked] = useState(false);

  useEffect(() => {
    const calculate = () => {
      const now = new Date();
      const todayCutoff = new Date();
      todayCutoff.setHours(hour, minute, 0, 0);

      if (isMorningWindow) {
        // Morning: cutoff is TODAY at 6 PM for TOMORROW's morning delivery
        if (now >= todayCutoff) {
          // Past 6 PM, tomorrow's morning orders locked
          setIsLocked(true);
          setDisplay("LOCKED");
        } else {
          const diff = todayCutoff.getTime() - now.getTime();
          const h = Math.floor(diff / (1000 * 60 * 60));
          const m = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
          setIsLocked(false);
          setDisplay(`${h}h ${m}m remaining`);
        }
      } else {
        // Evening: cutoff is TODAY at 10 AM for TODAY's evening delivery
        if (now >= todayCutoff) {
          setIsLocked(true);
          setDisplay("LOCKED");
        } else {
          const diff = todayCutoff.getTime() - now.getTime();
          const h = Math.floor(diff / (1000 * 60 * 60));
          const m = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
          setIsLocked(false);
          setDisplay(`${h}h ${m}m remaining`);
        }
      }
    };

    calculate();
    const timer = setInterval(calculate, 30000);
    return () => clearInterval(timer);
  }, [hour, minute, isMorningWindow]);

  return { display, isLocked };
}

export default function OpsHomePage() {
  const morningCutoff = useCutoffCountdown(18, 0, true);
  const eveningCutoff = useCutoffCountdown(10, 0, false);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Operations Dashboard</h1>
          <p className="text-muted-foreground">
            HSR Kitchen &middot;{" "}
            {new Date().toLocaleDateString("en-IN", {
              weekday: "long",
              month: "long",
              day: "numeric",
              year: "numeric",
            })}
          </p>
        </div>
      </div>

      {/* Cutoff Status */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className={morningCutoff.isLocked ? "bg-forest/5 border-forest/20" : "bg-mustard/5 border-mustard/20"}>
          <div className="flex items-center gap-3">
            <Sun size={20} className="text-mustard" />
            <div>
              <p className="text-sm text-muted-foreground">Morning Cutoff (6 PM today for tomorrow)</p>
              <p className={`text-lg font-bold ${morningCutoff.isLocked ? "text-forest" : "text-mustard"}`}>
                {morningCutoff.display}
              </p>
            </div>
          </div>
        </Card>
        <Card className={eveningCutoff.isLocked ? "bg-forest/5 border-forest/20" : "bg-mustard/5 border-mustard/20"}>
          <div className="flex items-center gap-3">
            <Moon size={20} className="text-indigo-500" />
            <div>
              <p className="text-sm text-muted-foreground">Evening Cutoff (10 AM today)</p>
              <p className={`text-lg font-bold ${eveningCutoff.isLocked ? "text-forest" : "text-mustard"}`}>
                {eveningCutoff.display}
              </p>
            </div>
          </div>
        </Card>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Total Orders Today"
          value={TODAY_STATS.totalOrders}
          subtitle="Morning + Evening"
          icon={<ShoppingBag size={20} />}
        />
        <StatCard
          title="Morning Packages"
          value={TODAY_STATS.morningPackages}
          subtitle="Breakfast + Lunch"
          icon={<Sun size={20} />}
        />
        <StatCard
          title="Evening Packages"
          value={TODAY_STATS.eveningPackages}
          subtitle="Snack + Dinner"
          icon={<Moon size={20} />}
        />
        <StatCard
          title="Shortages"
          value={TODAY_STATS.shortages}
          subtitle="Ingredients below required"
          icon={<AlertTriangle size={20} />}
          className={TODAY_STATS.shortages > 0 ? "border-danger/30" : ""}
        />
      </div>

      {/* Dual Fulfillment Windows */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Morning Fulfillment */}
        <Card>
          <div className="flex items-center justify-between mb-4">
            <CardTitle className="flex items-center gap-2">
              <Sun size={18} className="text-mustard" />
              Morning Fulfillment
            </CardTitle>
            <StatusBadge status={MORNING_WINDOW.status} />
          </div>
          <div className="space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Meal Occasions</span>
              <span className="font-medium">{MORNING_WINDOW.mealOccasions.join(", ")}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Delivery Time</span>
              <span className="font-medium">{MORNING_WINDOW.deliveryTime}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Orders</span>
              <span className="font-bold text-forest">{MORNING_WINDOW.orderCount}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Packages</span>
              <span className="font-bold text-forest">{MORNING_WINDOW.packageCount}</span>
            </div>
          </div>
          <div className="flex gap-2 mt-4 pt-4 border-t border-border">
            <Link href="/ops/production" className="text-sm text-forest font-medium hover:underline">Production</Link>
            <span className="text-muted-foreground">&middot;</span>
            <Link href="/ops/packing" className="text-sm text-forest font-medium hover:underline">Packing</Link>
            <span className="text-muted-foreground">&middot;</span>
            <Link href="/ops/dispatch" className="text-sm text-forest font-medium hover:underline">Dispatch</Link>
          </div>
        </Card>

        {/* Evening Fulfillment */}
        <Card>
          <div className="flex items-center justify-between mb-4">
            <CardTitle className="flex items-center gap-2">
              <Moon size={18} className="text-indigo-500" />
              Evening Fulfillment
            </CardTitle>
            <StatusBadge status={EVENING_WINDOW.status} />
          </div>
          <div className="space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Meal Occasions</span>
              <span className="font-medium">{EVENING_WINDOW.mealOccasions.join(", ")}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Delivery Time</span>
              <span className="font-medium">{EVENING_WINDOW.deliveryTime}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Orders</span>
              <span className="font-bold text-forest">{EVENING_WINDOW.orderCount}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Packages</span>
              <span className="font-bold text-forest">{EVENING_WINDOW.packageCount}</span>
            </div>
          </div>
          <div className="flex gap-2 mt-4 pt-4 border-t border-border">
            <Link href="/ops/production" className="text-sm text-forest font-medium hover:underline">Production</Link>
            <span className="text-muted-foreground">&middot;</span>
            <Link href="/ops/packing" className="text-sm text-forest font-medium hover:underline">Packing</Link>
            <span className="text-muted-foreground">&middot;</span>
            <Link href="/ops/dispatch" className="text-sm text-forest font-medium hover:underline">Dispatch</Link>
          </div>
        </Card>
      </div>

      {/* Two-column layout: Recent Orders + Shortage Alerts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Orders */}
        <Card>
          <div className="flex items-center justify-between mb-4">
            <CardTitle>Recent Orders</CardTitle>
            <Link href="/ops/orders" className="text-sm text-forest font-medium hover:underline">
              View all
            </Link>
          </div>
          <div className="space-y-3">
            {RECENT_ORDERS.map((order) => (
              <div key={order.id} className="flex items-center justify-between py-2 border-b border-border last:border-0">
                <div>
                  <p className="text-sm font-medium">{order.customer}</p>
                  <p className="text-xs text-muted-foreground">{order.meal}</p>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant={order.window === "morning" ? "warning" : "info"}>
                    {order.occasion}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Shortage Alerts */}
        <Card className={SHORTAGE_ALERTS.length > 0 ? "border-danger/30" : ""}>
          <div className="flex items-center justify-between mb-4">
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle size={16} className="text-danger" />
              Shortage Alerts
            </CardTitle>
            <Link href="/ops/inventory" className="text-sm text-forest font-medium hover:underline">
              Inventory
            </Link>
          </div>
          <div className="space-y-3">
            {SHORTAGE_ALERTS.map((item) => (
              <div key={item.ingredient} className="flex items-center justify-between py-2 border-b border-border last:border-0">
                <div>
                  <p className="text-sm font-medium text-foreground">{item.ingredient}</p>
                  <p className="text-xs text-muted-foreground">
                    Need: {item.required} &middot; Have: {item.available}
                  </p>
                </div>
                <span className="text-sm font-bold text-danger">-{item.shortage}</span>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Production Summary Link */}
      <Card hover className="bg-cream border-cream-dark">
        <Link href="/ops/production" className="flex items-center justify-between">
          <div>
            <CardTitle>Production Planning</CardTitle>
            <p className="text-sm text-muted-foreground mt-1">
              View today&apos;s production requirements by delivery window, ingredient needs, and customer allocations
            </p>
          </div>
          <ChefHat size={32} className="text-forest/30" />
        </Link>
      </Card>
    </div>
  );
}
