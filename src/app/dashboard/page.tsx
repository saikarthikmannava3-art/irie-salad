import { Card, CardTitle } from "@/components/ui/card";
import { StatusBadge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, UtensilsCrossed, Clock, ArrowRight, Sun, Moon } from "lucide-react";
import Link from "next/link";

// Demo data
const SUBSCRIPTION = {
  plan: "12-Day Plan",
  status: "active" as const,
  startDate: "2026-08-10",
  endDate: "2026-08-25",
  mealsDelivered: 3,
  mealsRemaining: 9,
};

const UPCOMING_ORDERS = [
  { id: "1", date: "2026-08-12", meal: "Masala Dosa with Chutneys", occasion: "Breakfast", window: "morning", status: "scheduled" },
  { id: "2", date: "2026-08-12", meal: "Roti Sabzi Thali", occasion: "Lunch", window: "morning", status: "scheduled" },
  { id: "3", date: "2026-08-12", meal: "Chana Sundal", occasion: "Evening Snack", window: "evening", status: "scheduled" },
  { id: "4", date: "2026-08-12", meal: "Light Moong Dal Khichdi", occasion: "Dinner", window: "evening", status: "scheduled" },
];

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Welcome back!</h1>
        <p className="text-muted-foreground">Here&apos;s your subscription overview</p>
      </div>

      {/* Active Subscription Card */}
      <Card className="bg-forest text-white border-forest">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-white/70 text-sm">Active Plan</p>
            <h2 className="text-xl font-bold mt-1">{SUBSCRIPTION.plan}</h2>
            <StatusBadge status={SUBSCRIPTION.status} className="mt-2 bg-white/20 text-white" />
          </div>
          <div className="text-right">
            <div className="text-3xl font-bold">{SUBSCRIPTION.mealsRemaining}</div>
            <p className="text-white/70 text-sm">meals left</p>
          </div>
        </div>
        <div className="mt-6 grid grid-cols-3 gap-4 border-t border-white/20 pt-4">
          <div>
            <p className="text-white/50 text-xs">Start</p>
            <p className="text-sm font-medium">Aug 10</p>
          </div>
          <div>
            <p className="text-white/50 text-xs">End</p>
            <p className="text-sm font-medium">Aug 25</p>
          </div>
          <div>
            <p className="text-white/50 text-xs">Delivered</p>
            <p className="text-sm font-medium">{SUBSCRIPTION.mealsDelivered} meals</p>
          </div>
        </div>
      </Card>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { label: "Skip a Day", icon: Calendar, href: "/dashboard/subscription" },
          { label: "Swap Meal", icon: UtensilsCrossed, href: "/dashboard/orders" },
          { label: "Pause Plan", icon: Clock, href: "/dashboard/subscription" },
          { label: "Order History", icon: ArrowRight, href: "/dashboard/orders" },
        ].map((action) => (
          <Link key={action.label} href={action.href}>
            <Card hover className="text-center py-4">
              <action.icon size={20} className="mx-auto text-forest mb-2" />
              <p className="text-sm font-medium">{action.label}</p>
            </Card>
          </Link>
        ))}
      </div>

      {/* Upcoming Orders */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <CardTitle>Upcoming Deliveries</CardTitle>
          <Link href="/dashboard/orders" className="text-sm text-forest font-medium hover:underline">
            View all
          </Link>
        </div>
        <div className="space-y-3">
          {UPCOMING_ORDERS.map((order) => (
            <Card key={order.id} className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 py-4">
              <div className="flex items-center gap-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-cream text-forest font-bold text-sm shrink-0">
                  {new Date(order.date).getDate()}
                </div>
                <div className="min-w-0">
                  <p className="font-medium text-foreground truncate">{order.meal}</p>
                  <div className="flex items-center gap-2 mt-0.5 flex-wrap">
                    <Badge variant="outline" className="text-xs">{order.occasion}</Badge>
                    <Badge variant={order.window === "morning" ? "warning" : "info"} className="text-xs">
                      {order.window === "morning" ? <Sun size={10} /> : <Moon size={10} />}
                      {order.window === "morning" ? "Morning" : "Evening"}
                    </Badge>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-3 shrink-0">
                <StatusBadge status={order.status} />
                <Button variant="ghost" size="sm">Swap</Button>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Cutoff Notice */}
      <div className="rounded-lg bg-mustard/10 border border-mustard/30 p-4 text-sm space-y-2">
        <p className="font-medium text-earth">
          <Clock size={14} className="inline mr-1" />
          Dual Cutoff Times
        </p>
        <div className="flex flex-col gap-1 text-muted-foreground">
          <p>
            <Sun size={12} className="inline mr-1 text-mustard" />
            <strong>Morning delivery</strong> (breakfast &amp; lunch): order by 6:00 PM the previous evening.
          </p>
          <p>
            <Moon size={12} className="inline mr-1 text-indigo-500" />
            <strong>Evening delivery</strong> (snack &amp; dinner): order by 10:00 AM the same day.
          </p>
        </div>
      </div>
    </div>
  );
}
