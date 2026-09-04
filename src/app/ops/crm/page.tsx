import { Card, CardTitle, CardDescription } from "@/components/ui/card";
import { Building } from "lucide-react";

export default function CRMPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">CRM / B2B</h1>
        <p className="text-muted-foreground">Customer relationship and B2B account management</p>
      </div>
      <Card className="py-16 text-center">
        <Building size={48} className="mx-auto text-muted-foreground/30 mb-4" />
        <CardTitle className="text-muted-foreground">Coming Soon</CardTitle>
        <CardDescription className="mt-2">
          B2B customer management, corporate accounts, and relationship tracking.
        </CardDescription>
        <ul className="mt-4 text-sm text-muted-foreground space-y-1">
          <li>• Corporate account management</li>
          <li>• Bulk order and catering requests</li>
          <li>• Custom pricing and contract management</li>
          <li>• Lead tracking and sales pipeline</li>
          <li>• Customer communication history</li>
          <li>• Account health scoring and retention metrics</li>
        </ul>
      </Card>
    </div>
  );
}
