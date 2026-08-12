import { Card } from "@/components/ui/card";
import { StatusBadge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const ORDERS = [
  { id: "ORD-BLR-20260811-0001", date: "2026-08-11", salad: "Mediterranean Power Bowl", status: "delivered", slot: "12:00-13:00" },
  { id: "ORD-BLR-20260810-0001", date: "2026-08-10", salad: "Caesar Supreme", status: "delivered", slot: "12:00-13:00" },
  { id: "ORD-BLR-20260809-0001", date: "2026-08-09", salad: "Asian Sesame Crunch", status: "delivered", slot: "12:00-13:00" },
  { id: "ORD-BLR-20260812-0001", date: "2026-08-12", salad: "Tropical Mango Bliss", status: "scheduled", slot: "12:00-13:00" },
  { id: "ORD-BLR-20260813-0001", date: "2026-08-13", salad: "Grilled Paneer Tikka", status: "scheduled", slot: "12:00-13:00" },
  { id: "ORD-BLR-20260814-0001", date: "2026-08-14", salad: "Greek Garden Fresh", status: "scheduled", slot: "12:00-13:00" },
  { id: "ORD-BLR-20260815-0001", date: "2026-08-15", salad: "Quinoa Superfood Bowl", status: "scheduled", slot: "12:00-13:00" },
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
          <Card key={order.id} className="flex items-center justify-between py-4">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-cream">
                <div className="text-center">
                  <p className="text-xs text-muted-foreground">
                    {new Date(order.date).toLocaleDateString("en-IN", { month: "short" })}
                  </p>
                  <p className="text-lg font-bold text-forest">{new Date(order.date).getDate()}</p>
                </div>
              </div>
              <div>
                <p className="font-medium text-foreground">{order.salad}</p>
                <p className="text-xs text-muted-foreground">{order.id} &middot; {order.slot}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
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
