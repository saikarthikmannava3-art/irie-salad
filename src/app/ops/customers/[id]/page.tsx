"use client";

import { use, useMemo } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Phone, Mail, MapPin, Calendar, Shield, Trash2, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { StatCard } from "@/components/ui/stat-card";
import { CUSTOMERS } from "@/data/customers";

const MEAL_NAMES = [
  "Masala Dosa with Chutneys",
  "Roti Sabzi Thali",
  "Hyderabadi Veg Dum Biryani",
  "Mixed Sprout Chaat",
  "Signature IRIE Salad (350g)",
  "Light Moong Dal Khichdi",
  "Coconut Overnight Oats",
  "Idli Sambar",
  "Fresh Seasonal Fruit Bowl",
  "Bajra Roti with Seasonal Sabzi",
];

const STATUSES = ["delivered", "delivered", "delivered", "delivered", "skipped", "cancelled"] as const;

function seededRandom(seed: number) {
  let s = seed;
  return () => {
    s = (s * 16807 + 0) % 2147483647;
    return s / 2147483647;
  };
}

function generateOrders(customerId: string, signInCount: number, registeredAt: string) {
  const hash = customerId.split("").reduce((a, c) => a + c.charCodeAt(0), 0);
  const rand = seededRandom(hash);
  const orderCount = Math.min(Math.max(Math.floor(signInCount * 0.6), 0), 50);

  const [datePart] = registeredAt.split(" ");
  const [day, month, year] = datePart.split("-").map(Number);
  const startDate = new Date(year, month - 1, day);

  const orders = [];
  for (let i = 0; i < orderCount; i++) {
    const daysOffset = Math.floor(rand() * 600);
    const orderDate = new Date(startDate.getTime() + daysOffset * 86400000);
    const statusIdx = Math.floor(rand() * STATUSES.length);
    const saladIdx = Math.floor(rand() * MEAL_NAMES.length);
    const price = 249 + Math.floor(rand() * 130);

    orders.push({
      id: `${customerId.slice(0, 8)}-${i}`,
      orderNo: `ORD-${orderDate.getFullYear()}${String(orderDate.getMonth() + 1).padStart(2, "0")}${String(orderDate.getDate()).padStart(2, "0")}-${String(i + 1).padStart(4, "0")}`,
      date: `${String(orderDate.getDate()).padStart(2, "0")}-${String(orderDate.getMonth() + 1).padStart(2, "0")}-${orderDate.getFullYear()}`,
      salad: MEAL_NAMES[saladIdx],
      status: STATUSES[statusIdx],
      amount: price,
    });
  }

  return orders.sort((a, b) => {
    const [ad, am, ay] = a.date.split("-").map(Number);
    const [bd, bm, by] = b.date.split("-").map(Number);
    return new Date(by, bm - 1, bd).getTime() - new Date(ay, am - 1, ad).getTime();
  });
}

function formatDate(d: string) {
  const [datePart, timePart] = d.split(" ");
  const [day, month, year] = datePart.split("-");
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  return `${parseInt(day)} ${months[parseInt(month) - 1]} ${year}${timePart ? ` ${timePart}` : ""}`;
}

export default function CustomerDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const router = useRouter();

  const customer = useMemo(() => CUSTOMERS.find((c) => c.id === id), [id]);

  const orders = useMemo(() => {
    if (!customer) return [];
    return generateOrders(customer.id, customer.signInCount, customer.registeredAt);
  }, [customer]);

  if (!customer) {
    return (
      <div className="text-center py-20">
        <p className="text-muted-foreground mb-4">Customer not found</p>
        <Button variant="ghost" onClick={() => router.push("/ops/customers")}>
          Back to Customers
        </Button>
      </div>
    );
  }

  const deliveredCount = orders.filter((o) => o.status === "delivered").length;
  const totalSpent = orders.filter((o) => o.status === "delivered").reduce((sum, o) => sum + o.amount, 0);
  const skippedCount = orders.filter((o) => o.status === "skipped").length;

  return (
    <div>
      {/* Back button */}
      <button
        onClick={() => router.push("/ops/customers")}
        className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-4 transition-colors"
      >
        <ArrowLeft size={16} /> Back to Customers
      </button>

      {/* Customer header */}
      <div className="rounded-xl border border-border bg-white p-6 mb-6">
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-2xl font-bold text-forest">{customer.name || "Unnamed Customer"}</h1>
              {customer.isBanned && <Badge variant="warning">Banned</Badge>}
              {customer.isDeleted && <Badge variant="warning">Deleted</Badge>}
              {!customer.isBanned && !customer.isDeleted && customer.signInCount > 1 && (
                <Badge variant="success">Active</Badge>
              )}
              {!customer.isBanned && !customer.isDeleted && customer.signInCount <= 1 && (
                <Badge variant="default">New</Badge>
              )}
            </div>
            <p className="text-sm text-muted-foreground font-mono mt-1">{customer.referralCode}</p>
          </div>
          <div className="text-sm text-muted-foreground text-right">
            <p>ID: <span className="font-mono text-xs">{customer.id}</span></p>
          </div>
        </div>

        {/* Contact details */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
          {customer.phone && (
            <div className="flex items-center gap-2 text-sm">
              <Phone size={14} className="text-muted-foreground shrink-0" />
              <span>{customer.phone}</span>
            </div>
          )}
          {customer.email && (
            <div className="flex items-center gap-2 text-sm">
              <Mail size={14} className="text-muted-foreground shrink-0" />
              <span>{customer.email}</span>
            </div>
          )}
          {customer.address && (
            <div className="flex items-start gap-2 text-sm sm:col-span-2 lg:col-span-1">
              <MapPin size={14} className="text-muted-foreground shrink-0 mt-0.5" />
              <span>
                {customer.address}
                {customer.addressCount > 1 && (
                  <Badge variant="default" className="ml-2 text-[9px]">+{customer.addressCount - 1} more</Badge>
                )}
              </span>
            </div>
          )}
          <div className="flex items-center gap-2 text-sm">
            <Calendar size={14} className="text-muted-foreground shrink-0" />
            <span>Registered {formatDate(customer.registeredAt)}</span>
          </div>
          {customer.lastSignIn && (
            <div className="flex items-center gap-2 text-sm">
              <Shield size={14} className="text-muted-foreground shrink-0" />
              <span>Last active {formatDate(customer.lastSignIn)}</span>
            </div>
          )}
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <StatCard title="Total Orders" value={orders.length} icon={<ShoppingBag size={20} />} />
        <StatCard title="Delivered" value={deliveredCount} icon={<Calendar size={20} />} />
        <StatCard title="Total Spent" value={`Rs.${totalSpent.toLocaleString()}`} icon={<Mail size={20} />} />
        <StatCard title="Sign-ins" value={customer.signInCount} icon={<Shield size={20} />} />
      </div>

      {/* Order history */}
      <div className="rounded-xl border border-border bg-white overflow-hidden">
        <div className="px-4 py-3 border-b border-border bg-muted/50">
          <h2 className="font-semibold text-foreground">Order History</h2>
          <p className="text-xs text-muted-foreground">{orders.length} orders total, {skippedCount} skipped</p>
        </div>
        {orders.length === 0 ? (
          <div className="text-center py-12 text-muted-foreground">No orders yet</div>
        ) : (
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-muted/30">
                <th className="px-4 py-2 text-left font-medium">Order #</th>
                <th className="px-4 py-2 text-left font-medium">Date</th>
                <th className="px-4 py-2 text-left font-medium">Salad</th>
                <th className="px-4 py-2 text-right font-medium">Amount</th>
                <th className="px-4 py-2 text-left font-medium">Status</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.id} className="border-b border-border last:border-0 hover:bg-muted/20 transition-colors">
                  <td className="px-4 py-3 font-mono text-xs">{order.orderNo}</td>
                  <td className="px-4 py-3 text-muted-foreground">{order.date}</td>
                  <td className="px-4 py-3">{order.salad}</td>
                  <td className="px-4 py-3 text-right font-medium">Rs.{order.amount}</td>
                  <td className="px-4 py-3">
                    <Badge
                      variant={order.status === "delivered" ? "success" : order.status === "skipped" ? "default" : "warning"}
                      className="text-[10px]"
                    >
                      {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                    </Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
