import { Card, CardTitle } from "@/components/ui/card";
import { StatusBadge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, Salad, Clock, ArrowRight } from "lucide-react";
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
  { id: "1", date: "2026-08-12", salad: "Mediterranean Power Bowl", status: "scheduled" },
  { id: "2", date: "2026-08-13", salad: "Asian Sesame Crunch", status: "scheduled" },
  { id: "3", date: "2026-08-14", salad: "Caesar Supreme", status: "scheduled" },
  { id: "4", date: "2026-08-15", salad: "Tropical Mango Bliss", status: "scheduled" },
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
          { label: "Swap Salad", icon: Salad, href: "/dashboard/orders" },
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
            <Card key={order.id} className="flex items-center justify-between py-4">
              <div className="flex items-center gap-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-cream text-forest font-bold text-sm">
                  {new Date(order.date).getDate()}
                </div>
                <div>
                  <p className="font-medium text-foreground">{order.salad}</p>
                  <p className="text-sm text-muted-foreground">
                    {new Date(order.date).toLocaleDateString("en-IN", { weekday: "long", month: "short", day: "numeric" })}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <StatusBadge status={order.status} />
                <Button variant="ghost" size="sm">Swap</Button>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Cutoff Notice */}
      <div className="rounded-lg bg-mustard/10 border border-mustard/30 p-4 text-sm">
        <p className="font-medium text-earth">
          <Clock size={14} className="inline mr-1" />
          Daily cutoff: 6:00 PM
        </p>
        <p className="text-muted-foreground mt-1">
          Changes to tomorrow&apos;s order must be made before 6 PM today.
        </p>
      </div>
    </div>
  );
}
