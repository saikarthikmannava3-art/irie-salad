import { Card, CardTitle, CardDescription } from "@/components/ui/card";
import { PackageCheck } from "lucide-react";

export default function PackingPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Packing & QC</h1>
        <p className="text-muted-foreground">Packing sheets and quality control</p>
      </div>
      <Card className="py-16 text-center">
        <PackageCheck size={48} className="mx-auto text-muted-foreground/30 mb-4" />
        <CardTitle className="text-muted-foreground">Coming Soon</CardTitle>
        <CardDescription className="mt-2">
          Printable A4 packing sheets organized by delivery zone. QC checklist with photo verification.
          Barcode scanning for order-level tracking.
        </CardDescription>
      </Card>
    </div>
  );
}
