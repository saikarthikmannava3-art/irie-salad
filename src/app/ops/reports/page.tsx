import { Card, CardTitle, CardDescription } from "@/components/ui/card";
import { BarChart3 } from "lucide-react";

export default function ReportsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Reports</h1>
        <p className="text-muted-foreground">Business intelligence and analytics</p>
      </div>
      <Card className="py-16 text-center">
        <BarChart3 size={48} className="mx-auto text-muted-foreground/30 mb-4" />
        <CardTitle className="text-muted-foreground">Coming Soon</CardTitle>
        <CardDescription className="mt-2">
          Comprehensive reporting dashboard with customizable analytics.
        </CardDescription>
        <ul className="mt-4 text-sm text-muted-foreground space-y-1">
          <li>• Sales and revenue reports (daily, weekly, monthly)</li>
          <li>• Customer acquisition and retention metrics</li>
          <li>• Product performance and popularity trends</li>
          <li>• Operational efficiency reports (production, delivery)</li>
          <li>• Inventory turnover and waste tracking</li>
          <li>• Custom report builder with export to Excel/PDF</li>
        </ul>
      </Card>
    </div>
  );
}
