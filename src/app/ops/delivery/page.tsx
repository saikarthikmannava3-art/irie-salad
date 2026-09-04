import { Card, CardTitle, CardDescription } from "@/components/ui/card";
import { Truck } from "lucide-react";

export default function DeliveryPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Delivery Tracking</h1>
        <p className="text-muted-foreground">Live delivery status and driver management</p>
      </div>
      <Card className="py-16 text-center">
        <Truck size={48} className="mx-auto text-muted-foreground/30 mb-4" />
        <CardTitle className="text-muted-foreground">Coming Soon</CardTitle>
        <CardDescription className="mt-2">
          Real-time delivery tracking with driver assignments and GPS monitoring.
        </CardDescription>
        <ul className="mt-4 text-sm text-muted-foreground space-y-1">
          <li>• Live GPS tracking of delivery vehicles</li>
          <li>• Driver assignment and shift management</li>
          <li>• Customer delivery notifications (SMS/WhatsApp)</li>
          <li>• Proof of delivery with photo capture</li>
          <li>• Delivery exceptions and failed delivery handling</li>
        </ul>
      </Card>
    </div>
  );
}
