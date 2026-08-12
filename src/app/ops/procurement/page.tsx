import { Card, CardTitle, CardDescription } from "@/components/ui/card";
import { Truck } from "lucide-react";

export default function ProcurementPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Procurement</h1>
        <p className="text-muted-foreground">Purchase orders and supplier management</p>
      </div>
      <Card className="py-16 text-center">
        <Truck size={48} className="mx-auto text-muted-foreground/30 mb-4" />
        <CardTitle className="text-muted-foreground">Coming Soon</CardTitle>
        <CardDescription className="mt-2">
          Auto-generated purchase recommendations based on inventory shortages and production requirements.
          Supplier management, purchase orders, and goods received tracking.
        </CardDescription>
      </Card>
    </div>
  );
}
