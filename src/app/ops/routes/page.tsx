import { Card, CardTitle, CardDescription } from "@/components/ui/card";
import { Route } from "lucide-react";

export default function RoutesPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Route Management</h1>
        <p className="text-muted-foreground">Delivery route optimization and zone mapping</p>
      </div>
      <Card className="py-16 text-center">
        <Route size={48} className="mx-auto text-muted-foreground/30 mb-4" />
        <CardTitle className="text-muted-foreground">Coming Soon</CardTitle>
        <CardDescription className="mt-2">
          Intelligent route planning and zone-based delivery optimization.
        </CardDescription>
        <ul className="mt-4 text-sm text-muted-foreground space-y-1">
          <li>• Delivery zone creation and management</li>
          <li>• Route optimization using Google Maps API</li>
          <li>• Multi-stop route planning for drivers</li>
          <li>• Zone-wise packing sheet generation</li>
          <li>• Route performance analytics (time, fuel, efficiency)</li>
        </ul>
      </Card>
    </div>
  );
}
