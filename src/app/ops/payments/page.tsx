import { Card, CardTitle, CardDescription } from "@/components/ui/card";
import { CreditCard } from "lucide-react";

export default function PaymentsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Payments</h1>
        <p className="text-muted-foreground">Payment tracking and reconciliation</p>
      </div>
      <Card className="py-16 text-center">
        <CreditCard size={48} className="mx-auto text-muted-foreground/30 mb-4" />
        <CardTitle className="text-muted-foreground">Coming Soon</CardTitle>
        <CardDescription className="mt-2">
          Payment tracking, invoice generation, and reconciliation dashboard.
        </CardDescription>
        <ul className="mt-4 text-sm text-muted-foreground space-y-1">
          <li>• Payment gateway integration (Razorpay, Stripe)</li>
          <li>• Auto-invoice generation for subscriptions</li>
          <li>• Payment reconciliation and failed payment recovery</li>
          <li>• Refund and adjustment management</li>
        </ul>
      </Card>
    </div>
  );
}
