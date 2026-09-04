import { Card } from "@/components/ui/card";
import { Badge, StatusBadge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Sun, Moon } from "lucide-react";

const ORDERS = [
  { id: "ORD-HYD-20260811-0001", date: "2026-08-11", meal: "Masala Dosa with Chutneys", occasion: "Breakfast", window: "morning", status: "delivered", slot: "6:30–8:30 AM" },
  { id: "ORD-HYD-20260811-0002", date: "2026-08-11", meal: "Roti Sabzi Thali", occasion: "Lunch", window: "morning", status: "delivered", slot: "6:30–8:30 AM" },
  { id: "ORD-HYD-20260811-0003", date: "2026-08-11", meal: "Mixed Sprout Chaat", occasion: "Evening Snack", window: "evening", status: "delivered", slot: "4:30–6:30 PM" },
  { id: "ORD-HYD-20260811-0004", date: "2026-08-11", meal: "Light Moong Dal Khichdi", occasion: "Dinner", window: "evening", status: "delivered", slot: "4:30–6:30 PM" },
  { id: "ORD-HYD-20260810-0001", date: "2026-08-10", meal: "Idli Sambar", occasion: "Breakfast", window: "morning", status: "delivered", slot: "6:30–8:30 AM" },
  { id: "ORD-HYD-20260810-0002", date: "2026-08-10", meal: "Rajma Chawal with Salad", occasion: "Lunch", window: "morning", status: "delivered", slot: "6:30–8:30 AM" },
  { id: "ORD-HYD-20260812-0001", date: "2026-08-12", meal: "Ven Pongal with Vadai", occasion: "Breakfast", window: "morning", status: "scheduled", slot: "6:30–8:30 AM" },
  { id: "ORD-HYD-20260812-0002", date: "2026-08-12", meal: "Paneer Butter Masala with Rice", occasion: "Lunch", window: "morning", status: "scheduled", slot: "6:30–8:30 AM" },
  { id: "ORD-HYD-20260812-0003", date: "2026-08-12", meal: "Khaman Dhokla with Green Chutney", occasion: "Evening Snack", window: "evening", status: "scheduled", slot: "4:30–6:30 PM" },
  { id: "ORD-HYD-20260812-0004", date: "2026-08-12", meal: "Roti with Dal Fry", occasion: "Dinner", window: "evening", status: "scheduled", slot: "4:30–6:30 PM" },
];

export default function OrdersPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">My Orders</h1>
        <p className="text-muted-foreground">Your delivery history and upcoming orders</p>
      </div>

      <div className="space-y-3">
        {ORDERS.map((order) => (
          <Card key={order.id} className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 py-4">
            <div className="flex items-center gap-4 min-w-0">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-cream shrink-0">
                <div className="text-center">
                  <p className="text-xs text-muted-foreground">
                    {new Date(order.date).toLocaleDateString("en-IN", { month: "short" })}
                  </p>
                  <p className="text-lg font-bold text-forest">{new Date(order.date).getDate()}</p>
                </div>
              </div>
              <div className="min-w-0">
                <p className="font-medium text-foreground truncate">{order.meal}</p>
                <div className="flex items-center gap-2 mt-0.5 flex-wrap">
                  <Badge variant="outline" className="text-xs">{order.occasion}</Badge>
                  <Badge variant={order.window === "morning" ? "warning" : "info"} className="text-xs">
                    {order.window === "morning" ? <Sun size={10} /> : <Moon size={10} />}
                    {order.slot}
                  </Badge>
                </div>
                <p className="text-xs text-muted-foreground mt-0.5">{order.id}</p>
              </div>
            </div>
            <div className="flex items-center gap-3 shrink-0 ml-16 sm:ml-0">
              <StatusBadge status={order.status} />
              {order.status === "scheduled" && (
                <div className="flex gap-2">
                  <Button variant="ghost" size="sm">Swap</Button>
                  <Button variant="ghost" size="sm" className="text-danger">Skip</Button>
                </div>
              )}
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
