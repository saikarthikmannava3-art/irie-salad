import { StatCard } from "@/components/ui/stat-card";
import { Card, CardTitle } from "@/components/ui/card";
import { StatusBadge } from "@/components/ui/badge";
import { ShoppingBag, ChefHat, Package, Truck, AlertTriangle, Clock } from "lucide-react";
import Link from "next/link";

// Demo data for today's KPIs
const TODAY_STATS = {
  totalOrders: 142,
  inProduction: 142,
  packed: 0,
  dispatched: 0,
  delivered: 0,
  shortages: 3,
};

const RECENT_ORDERS = [
  { id: "ORD-BLR-20260812-0001", customer: "Priya Sharma", salad: "Mediterranean Power Bowl", status: "locked" },
  { id: "ORD-BLR-20260812-0002", customer: "Rahul Menon", salad: "Caesar Supreme", status: "locked" },
  { id: "ORD-BLR-20260812-0003", customer: "Anita Das", salad: "Asian Sesame Crunch", status: "locked" },
  { id: "ORD-BLR-20260812-0004", customer: "Vikram Singh", salad: "Quinoa Superfood Bowl", status: "locked" },
  { id: "ORD-BLR-20260812-0005", customer: "Meera Nair", salad: "Grilled Paneer Tikka", status: "locked" },
];

const SHORTAGE_ALERTS = [
  { ingredient: "Baby Spinach", required: "5.2 kg", available: "2.1 kg", shortage: "3.1 kg" },
  { ingredient: "Feta Cheese", required: "1.8 kg", available: "0.5 kg", shortage: "1.3 kg" },
  { ingredient: "Quinoa", required: "3.0 kg", available: "1.5 kg", shortage: "1.5 kg" },
];

export default function OpsHomePage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Operations Dashboard</h1>
          <p className="text-muted-foreground">HSR Kitchen &middot; {new Date().toLocaleDateString("en-IN", { weekday: "long", month: "long", day: "numeric", year: "numeric" })}</p>
        </div>
        <div className="flex items-center gap-2 rounded-lg bg-mustard/10 border border-mustard/30 px-4 py-2">
          <Clock size={16} className="text-mustard" />
          <div>
            <p className="text-xs text-muted-foreground">Next cutoff</p>
            <p className="text-sm font-bold text-earth">6:00 PM today</p>
          </div>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Today's Orders"
          value={TODAY_STATS.totalOrders}
          subtitle="Tomorrow's delivery"
          icon={<ShoppingBag size={20} />}
        />
        <StatCard
          title="In Production"
          value={TODAY_STATS.inProduction}
          subtitle="After 6 PM snapshot"
          icon={<ChefHat size={20} />}
        />
        <StatCard
          title="Packed"
          value={TODAY_STATS.packed}
          subtitle="QC passed"
          icon={<Package size={20} />}
        />
        <StatCard
          title="Shortages"
          value={TODAY_STATS.shortages}
          subtitle="Ingredients below required"
          icon={<AlertTriangle size={20} />}
          className={TODAY_STATS.shortages > 0 ? "border-danger/30" : ""}
        />
      </div>

      {/* Two-column layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Orders */}
        <Card>
          <div className="flex items-center justify-between mb-4">
            <CardTitle>Recent Orders</CardTitle>
            <Link href="/ops/orders" className="text-sm text-forest font-medium hover:underline">View all</Link>
          </div>
          <div className="space-y-3">
            {RECENT_ORDERS.map((order) => (
              <div key={order.id} className="flex items-center justify-between py-2 border-b border-border last:border-0">
                <div>
                  <p className="text-sm font-medium">{order.customer}</p>
                  <p className="text-xs text-muted-foreground">{order.salad}</p>
                </div>
                <StatusBadge status={order.status} />
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
            <Link href="/ops/inventory" className="text-sm text-forest font-medium hover:underline">Inventory</Link>
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
              View today&apos;s production requirements, BOM breakdown, and ingredient needs
            </p>
          </div>
          <ChefHat size={32} className="text-forest/30" />
        </Link>
      </Card>
    </div>
  );
}
